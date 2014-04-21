function CallStatement(target, expressions) {
  this.target = target
  this.expressions = expressions
}

CallStatement.prototype.toString = function () {
  return '( Call ' +this.target +' '+ this.expressions.join(' ') + ')'
}

// CallStatement.prototype.analyze = function (context) {
  // this.expressions.forEach(function (e) {
    // e.analyze(context)
    // e.type.mustBeInteger('Expressions in "write" statement must have type integer')
  // })
// }

module.exports = CallStatement