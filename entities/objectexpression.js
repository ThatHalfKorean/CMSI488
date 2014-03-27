function ObjectExpression(names,values) {
  this.names = names
  this.values = values
}

ObjectExpression.prototype.toString = function () {
  return '( ObjExp' + this.names.join(', ')+'  '+this.values.join(', ') ')'
}

module.exports = ObjectExpression