var error = require('../error')

var cache = {}

function Type(name) {
  this.name = name
  cache[name] = this
}

Type.prototype.toString = function () {
  return this.name
}

Type.BOOL = new Type('buul')
Type.NUM = new Type('nom')
Type.STR = new Type('werd')
Type.NUL = new Type('nurr')
Type.OBJ = new Type('thang')
Type.ARBITRARY = new Type('<arbitrary_type>')


Type.prototype.mustBeInteger = function (message, location) {
  this.mustBeCompatibleWith(Type.NUM, message)
}

Type.prototype.mustBeBoolean = function (message, location) {
  this.mustBeCompatibleWith(Type.BOOL, message)
}

Type.prototype.mustBeString = function (message, location) {
  this.mustBeCompatibleWith(Type.STR, message)
}

Type.prototype.mustBeNull = function (message, location) {
 this.mustBeCompatibleWith(Type.NUL, message)
}

Type.prototype.mustBeObject = function (message, location) {
  this.mustBeCompatibleWith(Type.OBJ, message)
}

Type.prototype.isCompatibleWith = function (otherType) {
  // In more sophisticated languages, comapatibility would be more complex
  return (this === otherType) || (this === Type.ARBITRARY) || (otherType === Type.ARBITRARY)  
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}

module.exports = {
  BOOL: Type.BOOL,
  NUM: Type.NUM,
  STR: Type.STR,
  NUL: Type.NUL,
  OBJ: Type.OBJ,
  ARBITRARY: Type.ARBITRARY,
  forName : function (name) {return cache[name]}
}
