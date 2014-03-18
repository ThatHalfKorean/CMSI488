function ForStatement(conditions, body) {
  this.conditions = conditions
  this.expressions = expressions
}

ForStatement.prototype.toString = function () {
  return '(Fer ' + this.conditions.join(' ') + ' ' + this.body + ')'
}

// ForStatement.prototype.analyze = function (context) {
  // this.expressions.forEach(function (e) {
    // e.analyze(context)
    // e.type.mustBeInteger('Expressions in "write" statement must have type integer')
  // })
// }

module.exports = ForStatement