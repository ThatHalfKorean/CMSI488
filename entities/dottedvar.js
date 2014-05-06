function DottedVar(struct, property) {
  this.struct = struct
  this.property = property
}

DottedVar.prototype.toString = function () {
  return '(' + this.struct + ' ' + this.property + ')'
}

DottedVar.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.struct)
  //this.type.mustBeObject("Must be an Object")
}

module.exports = DottedVar