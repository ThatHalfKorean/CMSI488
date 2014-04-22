function IncrementStatement(target) {
  this.target = target
}

IncrementStatement.prototype.toString = function () {
  return '( Increment ' + this.target + ')'
}

IncrementStatement.prototype.toString = function (context) {
	context.lookupVariable(target)
}

module.exports = IncrementStatement