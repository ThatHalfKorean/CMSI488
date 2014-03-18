function IncrementStatement(target, expressions) {
  this.target = target
  this.expressions = expressions
}

CallStatement.prototype.toString = function () {
  return '( Increment' + this.target.lexeme + ')'
}

// CallStatement.prototype.analyze = function (context) {
  // this.expressions.forEach(function (e) {
    // e.analyze(context)
    // e.type.mustBeInteger('Expressions in "write" statement must have type integer')
  // })
// }

module.exports = IncrementStatement