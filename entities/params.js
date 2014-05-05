function Params(paramTypes, paramIds){
  this.paramTypes = paramTypes
  this.paramIds = paramIds
}

Params.prototype.toString = function(){
  return '(Params '+ this.paramIds.join(' ') +  ' )'
}

Params.prototype.analyze = function (context) {
  this.paramTypes.forEach(function (paramTypes) {
    paramTypes.analyze(context)
  })
   this.paramIds.forEach(function (paramIds) {
	 paramIds.analyze(context)
  })
}

module.exports = Params