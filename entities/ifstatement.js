function IfStatement(ifCondition, ifBody, elseIfConditions, elseIfBodies, elseCondition, elseBody) {
  this.ifCondition = ifCondition
  this.ifBody = ifBody
  this.elseIfConditions = elseIfConditions
  this.elseIfBodies = elseIfBodies
  this.elseCondition = elseCondition
  this.elseBody = elseBody
}

IfStatement.prototype.toString = function () {
  return '(Eef ' + this.ifCondition + ' ' + this.ifBody + ' ElshEef ' + this.elseIfConditions.join(' ') + ' ' + this.elseIfBodies.join(' ') + ' Elsh ' + this.elseCondition + ' ' + this.elseBody +')'
}

// WhileStatement.prototype.analyze = function (context) {
  // this.condition.analyze(context)
  // this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
  // this.body.analyze(context)
// }

module.exports = IfStatement