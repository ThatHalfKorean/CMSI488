function IfStatement(conditions, bodies, elseBody) {
  this.conditions = conditions
  this.bodies = bodies
  this.elseBody = elseBody
  
}

IfStatement.prototype.toString = function () {
  var printedTree = ' (Eff ';
  for(var i = 0; i < this.conditions.length; i++){
    printedTree = printedTree +'( ( ' + this.conditions[i] + ' )' + '( ' + this.bodies[i] + ' ) )'
  }
  if(this.elseBody){
    printedTree = printedTree + ' Elsh (' + this.elseBody + ')'
  }
  printedTree = printedTree + ' )'
  return printedTree
}

// WhileStatement.prototype.analyze = function (context) {
  // this.condition.analyze(context)
  // this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
  // this.body.analyze(context)
// }

module.exports = IfStatement
