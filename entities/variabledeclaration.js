function VariableDeclaration(id, type) {
  this.id = id
  this.type = type
}

VariableDeclaration.prototype.toString = function () {
  return '(' + this.type + ' ' + this.id.lexeme + ')'
}

VariableDeclaration.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

module.exports = VariableDeclaration
