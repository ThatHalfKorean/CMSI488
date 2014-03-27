var Type = require('./type')

function ObjectDeclaration(id, type, propertyTypes, propertyIDs, propertyExpressions) {
  this.id = id
}

ObjectDeclaration.prototype.toString = function () {
  return '(Object ' + this.id + ')'
}


module.exports = ObjectDeclaration