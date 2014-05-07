function ArrayEntity(elements) {
  this.elements = elements
}

ArrayEntity.prototype.toString = function () {
  return '(Array (' + this.elements.join(', ') + '))'
}

ArrayEntity.prorotype.analyze = function () {
  this.elements.forEach(function (elements) {
  	analyze.elements(context)
  })
}

module.exports = ArrayEntity