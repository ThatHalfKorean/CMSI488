function Params(paramTypes, params){
  this.paramTypes = paramTypes
  this.params = params
}

Params.prototype.toString = function(){
  return '(Params ' + JSON.stringify(this.params.lexeme) + ' )'
}

module.exports = Params