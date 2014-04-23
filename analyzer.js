var error = require('./error')
var VariableDeclaration = require('./entities/VariableDeclaration')

function AnalysisContext(parent) {
  this.parent = parent
  this.symbolTable = {}
}

AnalysisContext.initialContext = function () {
  return new AnalysisContext(null)
}

AnalysisContext.prototype.createChildContext = function () {
  return new AnalysisContext(this)
}

AnalysisContext.prototype.variableMustNotBeAlreadyDeclared = function (token) {
  if (this.symbolTable[token.lexeme]) {
    error('Variable ' + token.lexeme + ' already declared', token)
  }
}

AnalysisContext.prototype.addVariable = function (name, entity) {
  this.symbolTable[name] = entity
}

AnalysisContext.prototype.lookupVariable = function (name) {
  var variable = this.symbolTable[name]
  if (variable) {
    return variable
  } else if (!this.parent) {
    error('Variable ' + name + ' not found')
    return VariableDeclaration.ARBITRARY
  } else {
    return this.parent.lookupVariable(name)
  }
}

exports.initialContext = AnalysisContext.initialContext
