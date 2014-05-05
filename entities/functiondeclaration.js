var Type = require('./type')

function FunctionDeclaration(type, id, params, body) {
  this.type = type
  this.id = id
  this.params = params
  this.body = body
}

FunctionDeclaration.prototype.toString = function () {
  return '( (' + this.type
               + this.id
               + this.params +
         ' ) ( '+ this.body + ' ))'
}

FunctionDeclaration.prototype.analyze = function(context) {
  this.type.analyze(context)
  this.id.analyze(context)
  this.params.analyze(context)
  this.body.analyze(context)

  // HC I think something else needs to go here, but I'm not sure what yet. 
  // Must look into later. 
}

module.exports = FunctionDeclaration