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
  if (this !== Type.NUM) {
    error(message, location)
  }
}

Type.prototype.mustBeBoolean = function (message, location) {
  if (this !== Type.BOOL) {
    error(message, location)
  }
}

Type.prototype.mustBeString = function (message, location) {
  if (this !== Type.STR) {
    error(message, location)
  }
}

Type.prototype.mustBeNull = function (message, location) {
  if (this !== Type.NUL) {
    error(message, location)
  }
}

Type.prototype.mustBeObject = function (message, location) {
  if (this !== Type.OBJ) {
    error(message, location)
  }
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
