function IncrementStatement(target) {
  this.target = target
}

IncrementStatement.prototype.toString = function () {
  return '( Increment ' + this.target + ')'
}

// CallStatement.prototype.analyze = function (context) {
  // this.expressions.forEach(function (e) {
    // e.analyze(context)
    // e.type.mustBeInteger('Expressions in "write" statement must have type integer')
  // })
// }

module.exports = IncrementStatement