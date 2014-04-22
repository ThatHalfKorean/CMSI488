var util = require('util')
var HashMap = require('hashmap').HashMap

module.exports = function (program) {
  gen(program)  
}

var indentPadding = 4
var indentLevel = 0

function emit(line) {
  var pad = indentPadding * indentLevel
  console.log(Array(pad+1).join(' ') + line)
}

function makeOp(op) {
  return {not: '!', and: '&&', or: '||'}[op] || op
}

var makeVariable = (function () {
  var lastId = 0
  var map = new HashMap()
  return function (v) {
    if (!map.has(v)) map.set(v, ++lastId)
    return '_v' + map.get(v)
  }
}())

function gen(e) {
  return generator[e.constructor.name](e)
}

var generator = {

  'Script': function (program) {
    indentLevel = 0
    emit('(function () {')
    script.statements.forEach(function (statement) {
      gen(statement)
    })
    emit('}());')
  },

  'Block': function (block) {
    indentLevel++
    block.statements.forEach(function (statement) {
      gen(statement)
    })
    indentLevel--
  },

  'VariableDeclaration': function (v) {
    var initializer = {'int': '0', 'bool': 'false'}[v.type];
    emit(util.format('var %s = %s;', makeVariable(v), initializer))
  },
  
  'FunctionDeclaration': function (f) {
    emit('function ' + f.id + '(' + gen(s.parameters) + ') {')
    gen(s.body)
    emit('}')
  },
  
  'ObjectDeclaration': function (o) {
    emit('while (' + gen(s.condition) + ') {')
    o.properties.forEach(function (property) {
      var initializer = {'int': '0', 'bool': 'false'}[v.type];
      emit(util.format('%s : %s,', property.id, initializer))
    })
    emit('}')
  },

  'AssignmentStatement': function (s) {
    emit(util.format('%s = %s;', gen(s.target), gen(s.source)))
  },

  'ReadStatement': function (s) {
    s.varrefs.forEach(function (v) {
      emit(util.format('%s = prompt();', makeVariable(v.referent)))
    })
  },
  
  'CallStatement': function (s) {
    emit(util.format('%s = %s;', gen(s.target), gen(s.expressions)))
  },
  
  'ForStatement': function (s) {
    emit('for (' + gen(s.declaration) + ',' + gen(s.condition) + ',' gen(s.assignment) ') {')
    gen(s.body)
    emit('}')
  },
  
  'IfStatement': function (s) {
    emit('if (' + gen(s.conditions[0]) + ') {')
    gen(s.bodies[0])
    emit('}')
    for (var i = 1; i < s.conditions.length; i++) {
      emit('else if (' + gen(s.conditions[i]) + ') {')
      gen(s.bodies[i])
      emit('}')
    }
    if (elseBody !== null) {
      emit('else {')
      gen(s.elseBody)
      emit('}')
    }
  },
  
  'IncrementStatement': function (s) {
    emit(util.format(makeVariable(s.target) + s.operator))
  },
  
  'ReturnStatement': function (e) {
    emit(util.format('alert(%s);', gen(e)))
  },

  'WriteStatement': function (s) {
    s.expressions.forEach(function (e) {
      emit(util.format('alert(%s);', gen(e)))
    })
  },

  'WhileStatement': function (s) {
    emit('while (' + gen(s.condition) + ') {')
    gen(s.body)
    emit('}')
  },

  'NumericLiteral': function (literal) {
    return literal.toString()
  },

  'BooleanLiteral': function (literal) {
    return literal.toString()
  },
  
  'StringLiteral': function (literal) {
    return literal.toString()
  },
  
  'NullLiteral': function (literal) {
    return literal.toString()
  },

  'UnaryExpression': function (e) {
    return util.format('(%s %s)', makeOp(e.op.lexeme), gen(e.operand))
  },

  'BinaryExpression': function (e) {
    return util.format('(%s %s %s)', gen(e.left), makeOp(e.op.lexeme), gen(e.right))
  }
}
