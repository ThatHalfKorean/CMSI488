//var Type = require('./type')

function NullLiteral(token) {
  this.token = token
}

NullLiteral.prototype.toString = function () {
  return this.token.lexeme
}

NullLiteral.prototype.analyze = function (context) {
  this.type = Type.NULL
}

module.exports = NullLiteral
