var util = require('util')
var Type = require('./type')

function AssignmentStatement(target, source) {
  this.target = target
  this.source = source
}

AssignmentStatement.prototype.toString = function () {
  return '(= ' + this.target + ' ' + this.source + ')'
}

AssignmentStatement.prototype.analyze = function (context) {
  this.target.analyze(context)
  this.source.analyze(context)
  this.source.type.mustBeCompatibleWith(this.target.type, 
  util.format('Type mismatch in assignment: %j = %j', this.target.type, this.source.type))
}

module.exports = AssignmentStatement