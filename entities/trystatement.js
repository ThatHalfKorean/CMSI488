function TryStatement(tryBody, id, catchBody) {
  this.tryBody = tryBody
  this.id = id
  this.catchBody = catchBody
}

TryStatement.prototype.toString = function () {
  return '(Tri ' + this.tryBody + ' Ketch ' + this.id + ' ' + this.catchBody + ')'
}

// WhileStatement.prototype.analyze = function (context) {
  // this.condition.analyze(context)
  // this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
  // this.body.analyze(context)
// }

module.exports = TryStatement