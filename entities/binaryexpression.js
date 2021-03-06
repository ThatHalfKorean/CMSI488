var Type = require('./type')
var NumericLiteral = require('./numericliteral')
var BooleanLiteral = require('./booleanliteral')

function BinaryExpression(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinaryExpression.prototype.toString = function () {
  return '(' + this.op.lexeme + ' ' + this.left + ' ' + this.right + ')'
}

BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context)
  this.right.analyze(context)
  op = this.op.lexeme
  if (/<=?|>=?/.test(op)) {
    this.mustHaveIntegerOperands()
    this.type = Type.BOOL
  } else if (/==|!=/.test(op)) {
    this.mustHaveCompatibleOperands()
    this.type = Type.BOOL
  } else if (/\&\&|\|\|/.test(op)) {
    this.mustHaveBooleanOperands()
    this.type = Type.BOOL
  } else {
    // All other binary operators are arithmetic
    this.mustHaveIntegerOperands()
    this.type = Type.NUM
  }
}

BinaryExpression.prototype.mustHaveIntegerOperands = function () {
  var error = this.op.lexeme + ' must have integer operands'
  this.left.type.mustBeCompatibleWith(Type.NUM, error, this.op)
  this.right.type.mustBeCompatibleWith(Type.NUM, error, this.op)
}

BinaryExpression.prototype.mustHaveBooleanOperands = function () {
  var error = this.op.lexeme + ' must have boolean operands'
  this.left.type.mustBeCompatibleWith(Type.BOOL, error, this.op)
  this.right.type.mustBeCompatibleWith(Type.BOOL, error, this.op)
}

BinaryExpression.prototype.mustHaveCompatibleOperands = function () {
  var error = this.op.lexeme + ' must have mutually compatible operands'
  this.left.type.mustBeCompatibleWith(this.right.type, error, this.op)
}

function isIntegerLiteral(operand, value) {
  return operand instanceof IntegerLiteral && operand.value === value
}

function foldIntegerConstants(op, x, y) {
  switch (op) {
    case '+': return new IntegerLiteral(x + y)
    case '-': return new IntegerLiteral(x - y)
    case '*': return new IntegerLiteral(x * y)
    case '/': if (y !== 0) return new IntegerLiteral(x / y)
    case '<': return new BooleanLiteral(x < y)
    case '<=': return new BooleanLiteral(x <= y)
    case '==': return new BooleanLiteral(x === y)
    case '!=': return new BooleanLiteral(x !== y)
    case '>=': return new BooleanLiteral(x >= y)
    case '>': return new BooleanLiteral(x > y)
  }
}

function foldBooleanConstants(op, x, y) {
  switch (op) {
    case '==': return new BooleanLiteral(x === y)
    case '!=': return new BooleanLiteral(x !== y)
    case 'and': return new BooleanLiteral(x && y)
    case 'or': return new BooleanLiteral(x || y)
  }
}

module.exports = BinaryExpression