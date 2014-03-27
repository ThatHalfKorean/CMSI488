function IfStatement(conditions, bodies, elseBody) {
  this.conditions = conditions
  this.bodies = bodies
  this.elseBody = elseBody
}

IfStatement.prototype.toString = function () {
  return '(Eef ' + this.conditions.join(', ') + ' ' + this.bodies.join(', ') + ' Elsh ' + this.elseBody +')'
}

// WhileStatement.prototype.analyze = function (context) {
  // this.condition.analyze(context)
  // this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
  // this.body.analyze(context)
// }

module.exports = IfStatement
