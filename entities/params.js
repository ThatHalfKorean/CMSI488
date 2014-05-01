function Params(paramTypes, params){
  this.paramTypes = paramTypes
  this.params = params
}

Params.prototype.toString = function(){
  return '(Params ' + JSON.stringify(this.params.lexeme) + ' )'
}

Params.prototype.analyze = function (context) {
  this.paramTypes.analyze(context)
  this.params.analyze(context)
}

module.exports = Params