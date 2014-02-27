/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var script = parse(tokens)
 */

var scanner = require('./scanner')
var error = require('./error')

var Script = require('./entities/script')
var Block = require('./entities/block')
var Type = require('./entities/type')
var VariableDeclaration = require('./entities/variabledeclaration')
var AssignmentStatement = require('./entities/assignmentstatement')
var WriteStatement = require('./entities/writestatement')
var ReturnStatement = require('./entities/returnstatement')
var IfStatement = require('./entities/ifstatement')
var WhileStatement = require('./entities/whilestatement')
var CallStatement = require('./entities/callstatement')
var ForStatement = require('./entities/forloop')
var TryStatement = require('./entities/trystatement')
var NumericLiteral = require('./entities/numericliteral')
var BooleanLiteral = require('./entities/booleanliteral')
var VariableReference = require('./entities/variablereference')
var BinaryExpression = require('./entities/binaryexpression')
var UnaryExpression = require('./entities/unaryexpression')
var VariableExpression = require('./entities/variableexpression')

var tokens

module.exports = function (scannerOutput) {
  tokens = scannerOutput
  var script= parseScript()
  match('EOF')
  return script
}

function parseScript() {
  var statements = []
  do {
    statements.push(parseStatement())
    match(';')
  } while (at(['var','ID','write','while']))
  return new Block(statements)
}

function parseBlock() {
  match('dur')
  var statements = []
  do {
    statements.push(parseStatement())
    match(';')
  } while (at(['var','ID','write','while']))
  match('urp')
  return new Block(statements)
}

function parseStatement() {
  if (at('nom','buul','werd')) {
    return parseVariableDeclaration()
  } else if (at('ID')) {
    return parseAssignmentStatement()
  } else if (at('pront')) {
    return parseWriteStatement()
  } else if (at('dile')) {
    return parseWhileStatement()
  } else if (at('tri')) {
    return parseTryStatement()
  } else if (at('fer')) {
    return parseForLoop()
  } else if (at('herez')) {
    return parseReturnStatement()
  } else {
    error('Statement expected', tokens[0])
  }
}

function parseVariableDeclaration() {
  match('var')
  var id = match('ID')
  match(':')
  var type = parseType()
  return new VariableDeclaration(id, type)
}

function parseType() {
  if (at(['int','bool'])) {
    return Type.forName(match().lexeme)
  } else {
    error('Type expected', tokens[0])
  }
}

function parseAssignmentStatement() {
  var target = new VariableReference(match('ID'))
  match('=')
  var source = parseExpression()
  return new AssignmentStatement(target, source)
}

function parseWriteStatement() {
  match('pront')
  var expressions = []
  expressions.push(parseExpression())
  while (at(',')) {
    match()
    expressions.push(parseExpression())
  }
  return new WriteStatement(expressions)
}

function parseWhileStatement() {
  match('dile')
  var condition = parseExpression()
  var body = parseBlock()
  return new WhileStatement(condition, body)
}

function parseTryStatement() {
  match('tri')
  var body = parseBlock()
  match('ketch')
  var body2 = parseBlock()
  return new TryStatement(body, body2)
}

function parseExpression() {
  var left = parseExp1()
  while (at('||','&&')) {
    var op = match()
    var right = parseExp1()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp1() {
  var left = parseExp2()
  if (at(['<','<=','==','!=','>=','>'])) {
    var op = match()
    var right = parseExp3()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp2() {
  var left = parseExp3()
  while (at(['+','-'])) {
    var op = match()
    var right = parseExp4()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp3() {
  var left = parseExp4()
  while (at(['*','/'])) {
    op = match()
    right = parseExp5()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp4() {
  if (at(['-','!'])) {
    op = match()
    operand = parseExp5()
    return new UnaryExpression(op, operand)
  } else {
    return parseExp6()
  }
}

function parseExp5() {
  if (at(['tru','foos'])) {
    return new BooleanLiteral.forName(match().lexeme)
  } else if (at('NUMLIT')) {
    return new NumericLiteral(match())
  } else if (at('ID')) {
    return new VariableReference(match())
  } else if (at('(')) {
    match()
    var expression = parseExpression()
    match(')')
    return expression
  } else {
    error('Illegal start of expression', tokens[0])
  }
}

function at(symbol) {
  if (tokens.length === 0) {
    return false
  } else if (Array.isArray(symbol)) {
    return symbol.some(function (s) {return at(s)})
  } else {
    return symbol === tokens[0].kind
  }  
}

function match(symbol) {
  if (tokens.length === 0) {
    error('Unexpected end of input')
  } else if (symbol === undefined || symbol === tokens[0].kind) {
    return tokens.shift()
  } else {
    error('Expected ' + symbol + ' but found ' + tokens[0].kind, tokens[0])
  }
}
