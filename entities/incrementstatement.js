function IncrementStatement(target, symbol) {
  this.target = target
  this.symbol = symbol
}

IncrementStatement.prototype.toString = function () {
  return '( ' +this.symbol +' '+ this.target + ')'
}

IncrementStatement.prototype.analyze = function (context) {
	context.lookupVariable(target)
}

module.exports = IncrementStatement