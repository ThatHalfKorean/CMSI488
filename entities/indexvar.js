function IndexVar(token, index) {
  this.token = token
  this.index = index
}

IndexVar.prototype.toString = function () {
  return '([]' + this.token + ' ' + this.index + ')'
}

IndexVar.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.token)
  this.index.analyze(context)
}

module.exports = IndexVar