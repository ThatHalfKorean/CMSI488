var util = require('util')
var Type = require('./type')

function ArrayEntity(arrType, elements) {
  this.elements = elements
  this.arrType = arrType
}

ArrayEntity.prototype.toString = function () {
  return '(Array (' + this.elements.join(', ') + '))'
}

ArrayEntity.prototype.analyze = function (context) {
  this.type = this.arrType
  typeOfArray = this.type
  this.elements.forEach(function (element) {
  	element.analyze(context)
  	element.type.mustBeCompatibleWith(typeOfArray, 
    util.format('Type mismatch in assignment: %j = %j', element.type, typeOfArray))
  })
}

module.exports = ArrayEntity