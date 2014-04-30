function ForStatement(conditions, body) {
  this.conditions = conditions
  this.body = body 
}

ForStatement.prototype.toString = function () {
  return '((Conditions ' + this.conditions + 
  		  ')(Body ' + this.body + '))'
}

ForStatement.prototype.analyze = function (context) {
  

  this.conditions.forEach(function (conditions) {
    conditions.analyze(context)
  })
  //this.conditions.analyze(context)
  this.body.analyze(context)
}

module.exports = ForStatement
