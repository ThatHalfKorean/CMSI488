function BasicVar (token) {
  this.token = token
}

BasicVar.prototype.toString = function () {
  return '(BasicVar ' + this.token.lexeme + ')'
}

BasicVar.prototype.analyze = function (context) {
  
  this.referent = context.lookupVariable(this.token)
  this.type = this.referent.type
}

module.exports = BasicVar