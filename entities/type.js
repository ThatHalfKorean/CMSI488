var error = require('../error')

var cache = {}

function Type(name) {
  this.name = name
  cache[name] = this
}

Type.prototype.toString = function () {
  return this.name
}

exports.BOOL = Type.BOOL = new Type('buul')
exports.NUM = Type.NUM = new Type('nom')
exports.STR = Type.STR = new Type('werd')
exports.NUL = Type.NUL = new Type('nurr')
exports.OBJ = Type.OBJ = new Type('thang')
exports.forName = function (name) {return cache[name]}

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
  return (this == otherType) || (this == null) || (otherType == null)  
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}
