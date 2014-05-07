function IndexVar(array, index) {
  this.array = array
  this.index = index
}

IndexVar.prototype.toString = function () {
  return '([]' + this.array + ' ' + this.index + ')'
}

IndexVar.prototype.analyze = function (context) {
  
  //this.referent = context.lookupVariable(this.array)
  //console.log(this.array)
  this.array.analyze(context)
}

module.exports = IndexVar