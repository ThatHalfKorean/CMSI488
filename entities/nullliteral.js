var Type = require('./type')

function BooleanLiteral(name) {
  this.name = name
  cache[name] = this
}

NullLiteral.prototype.toString = function () {
  return this.name
}

NullLiteral.prototype.analyze = function (context) {
  this.type = Type.NURR
}

module.exports = NullLiteral
