function ReturnStatement(expression) {
  this.expression = expression
}

ReturnStatement.prototype.toString = function () {
  return '(Herez ' + this.expression + ')'
}

ReturnStatement.prototype.analyze = function (context) {
  this.expression.analyze(context)
}
module.exports = ReturnStatement;