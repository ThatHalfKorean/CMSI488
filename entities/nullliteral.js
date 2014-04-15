var Type = require('./type')

var cache = {}

function BooleanLiteral(name) {
  this.name = name
  cache[name] = this
}

BooleanLiteral.prototype.toString = function () {
  return this.name
}

BooleanLiteral.prototype.analyze = function (context) {
  this.type = Type.NURR
}

module.exports = NullLiteral
