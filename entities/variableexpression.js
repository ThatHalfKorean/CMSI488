function VariableExpression(id) {
  this.id = id
}

VariableExpression.prototype.toString = function () {
  return '( VarExp' + this.id+ ')'
}

module.exports = VariableExpression