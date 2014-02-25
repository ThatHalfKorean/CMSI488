var should = require('should');
var scan = require('../scanner')
var error = require('../error')
var i = require('util').inspect

describe('The scanner', function () {
     it('scans the simplest program', function (done) {
    scan('./data/good-programs/hello.derp', function (tokens) {
      tokens.length.should.equal(4)
      i(tokens[0]).should.equal(i({kind:'pront',lexeme:'pront',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'INTLIT',lexeme:'0',line:1,col:7}))
      i(tokens[2]).should.equal(i({kind:'derp',lexeme:'derp',line:1,col:8}))
      i(tokens[3]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('properly handles comments and blank lines', function (done) {
    scan('./data/token-tests/comments-and-blank-lines', function (tokens) {
      tokens.length.should.equal(4)
      i(tokens[0]).should.equal(i({kind:'nom',lexeme:'nom',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'ID',lexeme:'x',line:3,col:3}))
      i(tokens[2]).should.equal(i({kind:'derp',lexeme:'derp',line:5,col:7}))
      i(tokens[3]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })
  
  it('reads symbolic tokens properly', function (done) {
    scan('./data/token-tests/symbols', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'<=',lexeme:'<=',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'<',lexeme:'<',line:1,col:3}))
      i(tokens[2]).should.equal(i({kind:',',lexeme:',',line:1,col:4}))
      i(tokens[3]).should.equal(i({kind:'==',lexeme:'==',line:1,col:5}))
      i(tokens[4]).should.equal(i({kind:'=',lexeme:'=',line:1,col:7}))
      i(tokens[5]).should.equal(i({kind:'>=',lexeme:'>=',line:1,col:8}))
      i(tokens[6]).should.equal(i({kind:'>',lexeme:'>',line:1,col:10}))
      i(tokens[7]).should.equal(i({kind:'!=',lexeme:'!=',line:1,col:11}))
      i(tokens[8]).should.equal(i({kind:':',lexeme:':',line:1,col:13}))
      i(tokens[9]).should.equal(i({kind:';',lexeme:';',line:1,col:14}))
      i(tokens[10]).should.equal(i({kind:'(',lexeme:'(',line:1,col:15}))
      i(tokens[11]).should.equal(i({kind:')',lexeme:')',line:1,col:16}))
      done()
    })
  })

  it('distinguishes reserved words and identifiers', function (done) {
    scan('./data/token-tests/words', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'dilexy',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'dile',lexeme:'dile',line:1,col:9}))
      i(tokens[2]).should.equal(i({kind:'ID',lexeme:'dil',line:1,col:15}))
      i(tokens[3]).should.equal(i({kind:'urp',lexeme:'urp',line:1,col:20}))
      i(tokens[4]).should.equal(i({kind:'dur',lexeme:'dur',line:1,col:24}))
      i(tokens[5]).should.equal(i({kind:'nom',lexeme:'nom',line:1,col:29}))
      i(tokens[6]).should.equal(i({kind:'ID',lexeme:'and',line:1,col:33}))
      i(tokens[7]).should.equal(i({kind:'ID',lexeme:'or',line:1,col:37}))
      i(tokens[8]).should.equal(i({kind:'ID',lexeme:'ore',line:1,col:40}))
      i(tokens[11]).should.equal(i({kind:'ID',lexeme:'nombuul',line:1,col:48}))
      i(tokens[13]).should.equal(i({kind:'nom',lexeme:'nom',line:1,col:56}))
      i(tokens[15]).should.equal(i({kind:'buul',lexeme:'buul',line:1,col:60}))
      i(tokens[17]).should.equal(i({kind:'ID',lexeme:'read',line:1,col:65}))
      i(tokens[19]).should.equal(i({kind:'pront',lexeme:'write',line:1,col:70}))
      i(tokens[21]).should.equal(i({kind:'tru',lexeme:'tru',line:1,col:76}))
      i(tokens[23]).should.equal(i({kind:'foos',lexeme:'foos',line:1,col:81}))
      done()
    })
  })

  it('scans numbers properly', function (done) {
    scan('./data/token-tests/numbers', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'dur89x7',line:1,col:1}))
      i(tokens[2]).should.equal(i({kind:'INTLIT',lexeme:'222289',line:1,col:10}))
      i(tokens[3]).should.equal(i({kind:'ID',lexeme:'dile9',line:1,col:16}))
      i(tokens[4]).should.equal(i({kind:'INTLIT',lexeme:'02',line:1,col:23}))
      done()
    })
  })

  it('detects illegal characters', function (done) {
    scan('./data/token-tests/illegal-char', function () {
      error.count.should.equal(1)
      done()
    })
})})
