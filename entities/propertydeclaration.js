var util = require('util')
var Type = require('./type')

function PropertyDeclaration(id, type, value) {
  this.id = id
  this.type = type
  this.value = value
}

PropertyDeclaration.prototype.toString = function () {
  return '(' + this.type.lexeme + ' ' + this.id.lexeme +' '+this.value + ')'
}

PropertyDeclaration.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
  this.value.analyze(context)
  this.value.type.mustBeCompatibleWith(this.type, 
  util.format('Type mismatch in assignment: %j = %j', this.value.type, this.type))
}

module.exports = PropertyDeclaration
