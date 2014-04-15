var Type = require('./type')

function NullLiteral(name) {
  this.name = name
}

NullLiteral.prototype.toString = function () {
  return this.name
}

NullLiteral.prototype.analyze = function (context) {
  this.type = Type.NURR
}

module.exports = NullLiteral
