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
var CallExpression = require('./entities/callexpression')
var ForStatement = require('./entities/forstatement')
var NumericLiteral = require('./entities/numericliteral')
var BooleanLiteral = require('./entities/booleanliteral')
var StringLiteral = require('./entities/stringliteral')
var NullLiteral = require('./entities/nullliteral')
var BinaryExpression = require('./entities/binaryexpression')
var UnaryExpression = require('./entities/unaryexpression')
var BasicVar = require('./entities/basicvar')
var IndexVar = require('./entities/indexvar')
var DottedVar = require('./entities/dottedvar')
var IncrementStatement = require('./entities/incrementstatement')
var ObjectDeclaration = require('./entities/objectdeclaration')
var PropertyDeclaration = require('./entities/propertydeclaration')
var ArrayEntity = require('./entities/arrayentity')
var FunctionDeclaration = require('./entities/functiondeclaration')
var Params = require('./entities/params')




var tokens
var startingTokens = ['nom', 'buul', 'eef', 'elsheef', 'elsh', 'werd', 'dile', 'fer', 'ID', 'pront', 'herez', 'thang', 'funk']

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
  } while (at(startingTokens))
  return new Script(statements)
}

function parseBlock() {
  match('dur')
  var statements = []
  do {
    statements.push(parseStatement())
  } while (at(startingTokens))
  match('urp')
  return new Block(statements)
}

// Have to figure out how to differentiate statements that start with ID.
function parseStatement() {
  if (at(['nom','buul','werd'])) {
    return parseVariableDeclaration()
  } else if (at('thang')) {
    return parseObjectDeclaration()
  } else if (at('ID')) {
    return idChecker()
  } else if (at('pront')) {
    return parseWriteStatement()
  } else if (at('eef')) {
    return parseIfStatement()
  } else if (at('dile')) {
    return parseWhileStatement()
  } else if (at('fer')) {
    return parseForStatement()
  } else if (at('herez')) {
    return parseReturnStatement()
  }else if (at('funk')){
    return parseFunctionDeclaration()
  } else {
    error('Statement expected', tokens[0])
  }
}


function idChecker() {
  var name = parseVar()
  if (at('=')) {
    return parseAssignmentStatement(name)
  } else if (at(['++','--'])) {
    return parseIncrementStatement(name)
  } else {
    return name
  }
}

// Needs to be Derpodiled. Need to figure out optional var dec.
//also should consider default value.
function parseVariableDeclaration() {
  var type = parseType()
  var id,
  value

  if (at('[')){
    match('[')
    match(']')
    id = match('ID')
    match('=')
    value = parseArray(type)
    match('derp')
  } else {
    id = match('ID')
    if(at('=')){
      match('=')
      value = parseExpression()
    }
	match('derp')
  }
  return new VariableDeclaration(id, type, value)
}

function parseType() {
  if (at(['nom','buul','werd','thang'])) {
    return Type.forName(match().lexeme)
  } else {
    error('Type expected', tokens[0])
  }
}
//must parse type!!! 

function parsePropertyDeclaration() {
  var type,
      id,
      value

  type = parseType()
	  
  if(at('[')){
    match('[')
    match(']')
    id = match('ID')
    match(':')
    value = parseArray(type)
    match('derp')
  } else {
    id = match('ID')
    match(':')
    value = parseExpression()
    match('derp')
  }
  return new PropertyDeclaration(id, type, value)
}

function parseArray(type){
  match('[')
  var elements = []
  if(!at(']')){
    elements.push(parseExpression())
  }
  while(at(',')){
    match()
    elements.push(parseExpression())
  }
  match(']')
  return new ArrayEntity(type, elements)
}

function parseFunctionDeclaration(){
  match();
  var type = parseType();
  var id = match('ID');
  var params = parseParams();
  //match('dur');
  var body = parseBlock();
  //match('urp');
  return new FunctionDeclaration(type, id, params, body);
}

function parseParams(){
  match('(');
  var paramIds = [],
      paramTypes = [];
  if (at(['nom', 'werd', 'buul'])){
    paramTypes.push(parseType())
	paramIds.push(match('ID'))
  }
  while (at(',')){
    match()
    paramTypes.push(parseType())
	paramIds.push(match('ID'))
  }
  match(')');
  return new Params(paramTypes, paramIds);
}

//needs to be fixed.  What about arrays being passed in? should just push varDecs...
function parseObjectDeclaration() {
  var type = match('thang')
  var id = match('ID')
  match('=')
  match('dur')
  var properties = []
  do {
    properties.push(parsePropertyDeclaration())
  } while (at(['nom','werd','buul']))
  match('urp')
  return new ObjectDeclaration(id, properties)
}

//probably should be tweaked..
function parseAssignmentStatement(target) {
  match('=')
  var source = parseExpression()
  match('derp')
  return new AssignmentStatement(target, source)
}

//plus plus or minus minus?
function parseIncrementStatement(target) {
  var positive;
  if (at('++')) {
    positive = true;
    match('++')
  } else if (at('--')) {
    match('--')
  }
  match('derp')
  return new IncrementStatement(target, (positive ? "++" : "--") )
}

function parseVar() {
  function gather (base) {
    if (at('.')) {
      return parseDottedVar(base)
    } else if (at('[')) {
      return parseIndexVar(base)
    } else if (at('(')) {
      return parseCallExpression(base)
    }
  }

  var result = parseBasicVar()
  while (at(['[','.','('])) {
    result = gather(result)
  }
  return result
}

function parseBasicVar () {
  return new BasicVar(match('ID'))
}

function parseDottedVar (struct) {
  match('.')
  return new DottedVar(struct, parseBasicVar())
}

function parseIndexVar (array) {
  match('[')
  var indexVar = new IndexVar(array, parseExpression())
  match(']')
  return indexVar
}

function parseCallExpression(fn) {
  match('(')
  var expressions = []
  if(!at(')'))
  expressions.push(parseExpression())
  while (at(',')) {
    match()
    expressions.push(parseExpression())
  }
  match(')')
  //match('derp')
  return new CallExpression(fn, expressions)

}
//how to check for derps when needed...

function parseReturnStatement() {
  match('herez')
  var expression = parseExpression()
  match('derp')
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
  match('derp')
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
  var declaration = parseVariableDeclaration()
  var condition = parseExpression()
  match();
  var assignment = idChecker()
  var body = parseBlock()
  return new ForStatement(declaration, condition, assignment, body)
}

// Not working correctly
function parseIfStatement() {
  match('eef')
  var conditions = []
  var bodies = []
  var elseBody = null
  conditions.push(parseExpression())
  bodies.push(parseBlock())
  
  while (at('elsheef')) {
    match('elsheef')
    conditions.push(parseExpression())
    bodies.push(parseBlock())
  }
 
  if (at('elsh')) {
    match('elsh')
    elseBody = parseBlock()
  }
  return new IfStatement(conditions, bodies, elseBody)
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
    return new BooleanLiteral(match().lexeme)
  } else if (at('NUMLIT')) {
    return new NumericLiteral(match())
  }else if (at('NULLLIT')) {
    return new NullLiteral(match())
  } else if (at('STRLIT')) {
    return new StringLiteral(match())
  } else if (at('ID')) {
    return parseVar()
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
