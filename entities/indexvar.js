function IndexVar(array, index) {
  this.array = array
  this.index = index
}

IndexVar.prototype.toString = function () {
  return '([]' + this.array + ' ' + this.index + ')'
}

IndexVar.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.array)
  this.index.analyze(context)
}

module.exports = IndexVar