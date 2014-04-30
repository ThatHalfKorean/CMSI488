function WriteStatement(expressions) {
  this.expressions = expressions
}

WriteStatement.prototype.toString = function () {
  return '(Pront ' + this.expressions.join(' ') + ')'
}

WriteStatement.prototype.analyze = function (context) {
  this.expressions.forEach(function (e) {
    e.analyze(context)
  })
}

module.exports = WriteStatement
