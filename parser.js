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
var IfStatement = require('./entities/ifstatement') //gotta figure out the entities for eefs
var WhileStatement = require('./entities/whilestatement')
var CallStatement = require('./entities/callstatement')
var ForStatement = require('./entities/forstatement')
var TryStatement = require('./entities/trystatement')
var NumericLiteral = require('./entities/numericliteral')
var BooleanLiteral = require('./entities/booleanliteral')
var StringLiteral = require('./entities/stringliteral')
var VariableReference = require('./entities/variablereference')
var BinaryExpression = require('./entities/binaryexpression')
var UnaryExpression = require('./entities/unaryexpression')
var VariableExpression = require('./entities/variableexpression')

var tokens
var startingTokens = ['nom', 'buul', 'werd', 'dile', 'fer', 'tri', 'ID', 'pront', 'herez', 'thang']

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
    match('derp')
  } while (at(startingTokens))
  return new Block(statements)
}

function parseBlock() {
  match('dur')
  var statements = []
  do {
    statements.push(parseStatement())
    match('derp')
  } while (at(startingTokens))
  match('urp')
  return new Block(statements)
}

// Have to figure out how to differentiate statements that start with ID.
function parseStatement() {
  if (at('nom','buul','werd')) {
    return parseVariableDeclaration()
  } else if (at('ID')) {
    return idChecker()
  } else if (at('pront')) {
    return parseWriteStatement()
  } else if (at('eef')) {
    return parseIfStatement()
  } else if (at('dile')) {
    return parseWhileStatement()
  } else if (at('tri')) {
    return parseTryStatement()
  } else if (at('fer')) {
    return parseForStatement()
  } else if (at('herez')) {
    return parseReturnStatement()
  } else {
    error('Statement expected', tokens[0])
  }
}

function idChecker() {
  var target = new VariableReference(match('ID'))
  if (at('=')) {
    return parseAssignmentStatement(target)
  } else if (at('(')){
    return parseCallStatement(target)
  } else if (at('+','-')){
    return parseIncrementStatement(target)
  }
}

// Needs to be Derpodiled. Need to figure out optional var dec.
function parseVariableDeclaration() {
  var type = match('nom','buul','werd')
  var id = match('ID')
  if (at('=')) {
    match('=')
    parseExpression()
  }
  return new VariableDeclaration(type, id)
}

function parseAssignmentStatement(target) {
  match('=')
  var source = parseExpression()
  return new AssignmentStatement(target, source)
}

function parseIncrementStatement(target) {
  match('++','--')
  return new IncrementStatement(target, source)
}

function parseCallStatement(target) {
  match('(')
  var expressions = []
  expressions.push(parseExpression())
  while (at(',')) {
    match()
    expressions.push(parseExpression())
  }
  return new CallStatement(target, expressions)
}

function parseReturnStatement() {
  match('herez')
  var expression = parseExpression()
  return new ReturnStatement(expression)
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

// Needs work.
function parseForStatement() {
  match('fer')
  var conditions = []
  conditions.push(parseVariableDeclaration())
  match('derp')
  conditions.push(parseExpression())
  match('derp')
  conditions.push(
  return new ForStatement(conditions, body)
}

// Also needs work.
function parseIfStatement() {
  match('eef')
  var conditions = []
  conditions.push(parseExpression())
  var bodies = []
  while (at('elsheef')) {
    match()
	conditions.push(parseExpression())
	bodies.push(parseBlock())
  }
  bodies.push(parseBlock())
  if (at('elsh')) {
    match('elsh')
    bodies.push(parseBlock())
  }
  return new IfStatement(conditions, bodies)
}

function parseTryStatement() {
  match('tri')
  var tryBody = parseBlock()
  match('ketch')
  match('(')
  var id = match('ID')
  match(')')
  var catchBody = parseBlock()
  return new TryStatement(tryBody, id, catchBody)
}

// Expressions appear to be fine.
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
    return parseExp5()
  }
}

function parseExp5() {
  if (at(['tru','foos'])) {
    return new BooleanLiteral.forName(match().lexeme)
  } else if (at('NUMLIT')) {
    return new NumericLiteral(match())
  } else if (at('STRLIT')) {
    return new StringLiteral(match())
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
