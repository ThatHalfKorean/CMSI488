function DottedVar(struct, property) {
  this.struct = struct
  this.property = property
}

DottedVar.prototype.toString = function () {
  return '(' + this.struct + ' ' + this.property + ')'
}

DottedVar.prototype.analyze = function (context) {

  this.struct.analyze(context)
  console.log(this.struct.type)
  console.log(this.property)
  this.property.analyze(context)
  this.type = this.struct.type

}

module.exports = DottedVar