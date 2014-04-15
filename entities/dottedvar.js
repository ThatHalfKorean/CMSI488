function DottedVar(struct, property) {
	this.struct = struct
	this.property = property
}

DottedVar.prototype.toString = function () {
	return '(' + this.struct + ' ' + this.property + ')'
}

DottedVar.prototype.analyze = function (context) {
	this.structure.analyze(context)
}

module.exports = DottedVar