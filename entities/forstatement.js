function ForStatement(conditions, body) {
  this.conditions = conditions
  this.body = body 
}

ForStatement.prototype.toString = function () {
  return '((Conditions ' + this.conditions + 
  		  ')(Body ' + this.body + '))'
}

ForStatement.prototype.analyze = function (context) {
  
  var localContext = context.createChildContext()
  this.conditions.forEach(function (conditions) {
    conditions.analyze(localContext)
  })
  //this.conditions.analyze(context)
  this.body.analyze(context)
}

module.exports = ForStatement
