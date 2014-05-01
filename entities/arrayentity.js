function ArrayEntity(elements) {
  this.elements = elements
}

ArrayEntity.prototype.toString = function () {
  return '(Array (' + this.elements.join(', ') + '))'
}

module.exports = ArrayEntity