var initialContext = require('../analyzer').initialContext
var HashMap = require('hashmap').HashMap

function Script(statements) {
  this.statements = statements
}

Script.prototype.toString = function () {
  return '(Script ' + this.statements.join(' ') + ')' 
}

Script.prototype.analyze = function () {
  var context = initialContext();
  this.statements.forEach(function (statement) {
    statement.analyze(context)
  })
}

Script.prototype.optimize = function () {
  console.log('Optimization is not yet implemented')
  return this
}

Script.prototype.showSemanticGraph = function () {
  var tag = 0
  var seenEntities = new HashMap();

  function dump(e, tag) {
    var props = {}
    for (var p in e) {
      var value = rep(e[p])
      if (value !== undefined) props[p] = value
    }
    console.log("%d %s %j", tag, e.constructor.name, props)
  }

  function rep(e) {
    if (/undefined|function/.test(typeof e)) {
      return undefined
    } else if (/number|string|boolean/.test(typeof e)) {
      return e
    } else if (Array.isArray(e)) {
      return e.map(rep)
    } else if (e.kind) {
      return e.lexeme
    } else {
      if (!seenEntities.has(e)) {
        seenEntities.set(e, ++tag)
        dump(e, tag)
      }
      return seenEntities.get(e)
    }
  }

  dump(this, 0)
}

module.exports = Script
