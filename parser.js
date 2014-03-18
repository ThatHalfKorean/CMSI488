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
var IncrementStatement = require('./entities/incrementstatement')

var tokens
var startingTokens = ['nom', 'buul', 'eef', 'elsheef', 'elsh', 'werd', 'dile', 'fer', 'tri', 'ketch', 'ID', 'pront', 'herez', 'thang']

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
  return new Script(statements)
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
  if (at(['nom','buul','werd'])) {
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
  } else if (at(['++','--'])){
    return parseIncrementStatement(target)
  } else if (at(['[','.','('])){
    return parseVariableExpression(target)
  }
}

// Needs to be Derpodiled. Need to figure out optional var dec.
function parseVariableDeclaration() {
  if (at(['nom'])) {
	var type = match('nom')
  } else if (at(['werd'])) {
	var type = match('werd')
  } else if (at(['buul'])){
	var type = match('buul')
  }
  var id = match('ID')
  if (at('=')) {
    match('=')
    parseExpression()
  }
  return new VariableDeclaration(id, type)
}

function parseAssignmentStatement(target) {
  match('=')
  var source = parseExpression()
  return new AssignmentStatement(target, source)
}

function parseIncrementStatement(target) {
  if (at('++')) {
    match('++')
  } else if (at('--')) {
    match('--')
  }
  return new IncrementStatement(target)
}

function parseVariableExpression(target) {
  var expressions = []
  var additionalIDs = []
  var args = []
  do {
    if (at('[')) {
      match('[')
	  expressions.push(parseExpression())
	  match(']')
    } else if (at('.')) {
      match('.')
	  additionalIDs.push(match('ID'))
    } else if (at('(')) {
	  match('(')
	  args.push(parseExpression())
	  while (at(',')) {
		match()
		args.push(parseExpression())
	  }
	  match(')')
	}
  } while (at(['[','.','(']))
  return new VariableExpression(target)
}

function parseCallStatement(target) {
  match('(')
  var expressions = []
  expressions.push(parseExpression())
  while (at(',')) {
    match()
    expressions.push(parseExpression())
  }
  match(')')
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
  conditions.push(parseIncrementStatement())
  return new ForStatement(conditions, body)
}

// Not working correctly
function parseIfStatement() {
  match('eef')
  
  ifCondition = parseExpression()
  ifBody = parseBlock()
  
  var elseIfConditions = []
  var elseIfBodies = []
  while (at('elsheef')) {
    match('elsheef')
	elseIfConditions.push(parseExpression())
	elseIfBodies.push(parseBlock())
  }
  
  var elseCondition
  var elseBody
  if (at('elsh')) {
    match('elsh')
	elseCondition = parseExpression()
    elseBody = parseBlock()
  }
  return new IfStatement(ifCondition, ifBody, elseIfConditions, elseIfBodies, elseCondition, elseBody)
}
//Not working correctly
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
  while (at(['||','&&'])) {
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
