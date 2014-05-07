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
  
  for(var i = 0; i < this.paramIds.length; i++){
    context.variableMustNotBeAlreadyDeclared(this.paramIds[i])
    context.addVariable(this.paramIds[i].lexeme, this.paramIds[i])
  }
  console.log(this.paramIds[0])
}

module.exports = Params