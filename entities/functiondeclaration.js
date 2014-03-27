var Type = require('./type')

function FunctionDeclaration(id, type, parameters, body) {
  this.id = id
  this.parameters = parameters
  this.body = body
}

FunctionDeclaration.prototype.toString = function () {
  return '(Function ' + this.id + this.parameters.join(', ') +'  '+ this.body ')'
}


module.exports = FunctionDeclaration