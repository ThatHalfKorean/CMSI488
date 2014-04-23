var Type = require('./type')

function VariableDeclaration(id, type, value) {
  this.id = id
  this.type = type
  this.value = value
}

VariableDeclaration.prototype.toString = function () {
  return '(VarDec ' + this.type.lexeme + ' ' + this.id.lexeme +' '+this.value + ')'
}

VariableDeclaration.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

VariableDeclaration.ARBITRARY = new VariableDeclaration('<arbitrary>', Type.ARBITRARY)

module.exports = VariableDeclaration
