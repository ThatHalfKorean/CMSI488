function IndexVar(source, index) {
  this.source = source
  this.index = index
}

IndexVar.prototype.toString = function () {
  return '([]' + this.source + ' ' + this.index + ')'
}

IndexVar.prototype.analyze = function (context) {
  
  this.source.analyze(context)
  this.type = this.source.type
  
}

module.exports = IndexVar