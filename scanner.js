/*
 * Scanner module
 *
 *   var scan = require('./scanner')
 *
 *   scan(filename, function (tokens) {processTheTokens(tokens)})
 */

var fs = require('fs')
var byline = require('byline')
var error = require('./error')

module.exports = function (filename, callback) {
  var baseStream = fs.createReadStream(filename, {encoding: 'utf8'})
  baseStream.on('error', function (err) {error(err)})

  var stream = byline(baseStream, {keepEmptyLines: true})
  var tokens = []
  var linenumber = 0
  stream.on('readable', function () {
    scan(stream.read(), ++linenumber, tokens)
  })
  stream.once('end', function () {
    tokens.push({kind: 'EOF', lexeme: 'EOF'})
    callback(tokens)
  })
}

function scan(line, linenumber, tokens) {
  if (!line) return

  var start, pos = 0

  function emit(kind, lexeme) {
    tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1})
  }

  while (true) {
    // Skip spaces
    while (/\s/.test(line[pos])) pos++
    start = pos

    // Nothing on the line
    if (pos >= line.length) break

    // Comment
    if (line[pos] == '~' && line[pos+1] == 'o' && line[pos+2] == '<') break

    // Two-character tokens
    if (/==|!=|\+\+|\-\-|<=|>=|\|\||&&/.test(line.substring(pos, pos+2))) {
      emit(line.substring(pos, pos+2))
      pos += 2

    // One-character tokens
    } else if (/[+\-*\/(),<>!=]/.test(line[pos])) {
      emit(line[pos++])

    // Reserved words or identifiers
    } else if (/[A-Za-z]/.test(line[pos])) {
      while (/\w/.test(line[pos]) && pos < line.length) pos++
      var word = line.substring(start, pos)
      if (/^(?:nom|buul|werd|dile|eef|tru|foos|derp|elsheef|elsh|herez|fer|dur|urp|pront|thang)$/.test(word)) {
        emit(word)
      } else {
        emit('ID', word)
      }
    
    // String Literals
    } else if (/"/.test(line[pos])) {
      while (/[^"]/.test(line[pos]) && pos < line.length) pos++
      if(/"/.test(line[pos])){
        emit('STRLIT', line.substring(start, pos))
      } else {
        error('Expected a " but got: ', line[pos], {line: linenumber, col: pos})
      }
    
    // Numeric literals
    } else if (/\d/.test(line[pos])) {
      while (/\d/.test(line[pos])) pos++
      if(/\./.test(line[pos])){
        pos++
        while(/\d/.test(line[pos])) pos++
      }
      emit('NUMLIT', line.substring(start, pos))
    
    } else {
      error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1})
      pos++
    }
  }
}
