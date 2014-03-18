function ReturnStatement(expression) {
  this.expression = expression
}

ReturnStatement.prototype.toString = function () {
  return '(Herez ' + this.expression.toString() + ')'
}

module.exports = ReturnStatement;