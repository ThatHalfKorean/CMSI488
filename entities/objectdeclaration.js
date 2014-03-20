var Type = require('./type')

function ObjectDeclaration(id, type, propertyTypes, propertyIDs, propertyExpressions) {
  this.propertyIDs = propertyIDs
}

ObjectDeclaration.prototype.toString = function () {
  return '(Object ' + this.propertyIDs.join(', ') + ')'
}


module.exports = ObjectDeclaration