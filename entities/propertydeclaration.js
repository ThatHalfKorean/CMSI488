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
}

module.exports = PropertyDeclaration
