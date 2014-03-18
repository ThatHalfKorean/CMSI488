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
  this.type = Type.BUUL
}

exports.TRUE = new BooleanLiteral('tru')
exports.FALSE = new BooleanLiteral('foos')
exports.forName = function (name) {return cache[name]}
