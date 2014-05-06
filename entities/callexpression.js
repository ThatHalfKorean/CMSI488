function CallExpression(target, expressions) {
  this.target = target
  this.expressions = expressions
}

CallExpression.prototype.toString = function () {
  return '( Call ' + this.target + ' ' + this.expressions.join(' ') + ')'
}

CallExpression.prototype.analyze = function (context) {
  this.target.analyze(context)
  this.expressions.forEach(function (e) {
    e.analyze(context)
    e.type.mustBeNumber('Expressions in "call" statement must have type Number')
  })
}

module.exports = CallExpression