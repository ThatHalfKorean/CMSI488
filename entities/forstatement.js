function ForStatement(declaration, condition, assignment, body) {
  this.declaration = declaration
  this.condition = condition
  this.assignment = assignment
  this.body = body 
}

ForStatement.prototype.toString = function () {
  return '(Fer ' + this.declaration + 'derp' + this.condition + 
  		  'derp' + this.assignment + ' ' + this.body + ')'
}

ForStatement.prototype.analyze = function (context) {
  this.declaration.analyze(context)
  this.condition.analyze(context)
  this.assignment.analyze(context)
  this.body.analyze(context)
}

module.exports = ForStatement