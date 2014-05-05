function Params(paramTypes, paramIds){
  this.paramTypes = paramTypes
  this.paramIds = paramIds
}

Params.prototype.toString = function(){
  var result = ' (Params '
  for (var i = 0; i < this.paramTypes.length; i++) {
    result += this.paramTypes[i] + ' ' + this.paramIds[i].lexeme + ((i === this.paramTypes.length - 1) ? '' : ', ')
  }
  return result + ')'
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