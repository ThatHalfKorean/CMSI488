function IfStatement(conditions, bodies, elseBody) {
  this.conditions = conditions
  this.bodies = bodies
  this.elseBody = elseBody
  
}

IfStatement.prototype.toString = function () {
  var printedTree = ' (eff ';
  for(var i = 0; i < this.conditions.length; i++){
    printedTree = printedTree +'( ( ' + this.conditions[i] + ' )' + '( ' + this.bodies[i] + ' ) )'
  }
  if(this.elseBody){
    printedTree = printedTree + ' elsh (' + this.elseBody + ')'
  }
  printedTree = printedTree + ' )'
  return printedTree
}

IfStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.body.analyze(context)
  if (this.elseBody) {this.elseBody.analyze(context)}
}

module.exports = IfStatement
