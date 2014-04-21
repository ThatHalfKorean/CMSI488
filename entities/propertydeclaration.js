function PropertyDeclaration(id, type) {
  this.id = id
  this.type = type
}

PropertyDeclaration.prototype.toString = function () {
  return '(' + this.type.lexeme + ' ' + this.id.lexeme + ')'
}

PropertyDeclaration.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

module.exports = PropertyDeclaration
