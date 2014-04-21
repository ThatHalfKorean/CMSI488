function ObjectDeclaration(id, properties) {
  this.id = id
  this.properties = properties
}

ObjectDeclaration.prototype.toString = function () {
  var propList = '(Properties '
  for(var i = 0; i < this.properties.length; i++){
    propList = propList + '( ' + this.properties[i]+ ' )'
  }
  propList = '(Object '+ this.id.lexeme + propList + '))'
  return propList
}


module.exports = ObjectDeclaration