function BasicVar (name) {
	this.name = name
}

BasicVar.prototype.toString = function () {
	return '(BasicVar ' + this.name + ')'
}

BasicVar.prototype.analyze = function (context) {
	this.referent = context.lookupVariable(this.name)
    this.type = this.referent.type
}

module.exports = BasicVar