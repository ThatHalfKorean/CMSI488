var Type = require('./type')

function FunctionDeclaration(id, type, parameters, body) {
  this.id = id
  this.type = type
  this.parameters = parameters
  this.body = body
}

FunctionDeclaration.prototype.toString = function () {
  return '(' +  this.type + ' ' + this.id + this.parameters.join(', ') +
         ' '+ this.body ')'
}

FunctionDeclaration.prototype.analyze = function(context) {
  this.parameters.analyze(context)
  this.body.analyze(context)

  // HC I think something else needs to go here, but I'm not sure what yet. 
  // Must look into later. 
}

module.exports = FunctionDeclaration