var Type = require('./type')

function FunctionDeclaration(type, id, params, body) {
  this.id = id
  this.params = params
  this.body = body
}

FunctionDeclaration.prototype.toString = function () {
  return '( (' + this.type
               + this.id.lexeme
               + this.params +
         ' ) ( '+ this.body + ' ))'
}

FunctionDeclaration.prototype.analyze = function(context) {
  //this.id.analyze(context)
  //this.type.analyze(context)
  context.variableMustNotBeAlreadyDeclared(this.id)
  this.params.analyze(context)
  this.body.analyze(context)

  // HC I think something else needs to go here, but I'm not sure what yet. 
  // Must look into later. 
}

module.exports = FunctionDeclaration