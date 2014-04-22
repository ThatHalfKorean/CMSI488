function Params(paramTypes, params){
  this.paramTypes = paramTypes
  this.params = params
}
Params.prototype.toString = function(){
  return '( ' +this.params.join(' ')+ ' )'
}
module.exports = Params