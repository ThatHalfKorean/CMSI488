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
  return {'!=': '!==', '==': '==='}[op] || op
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

  'Script': function (script) {
    indentLevel = 0
    emit('(function () {')
    indentLevel++
    script.statements.forEach(function (statement) {
      gen(statement)
    })
    indentLevel--
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
    emit(util.format('var %s = %s;', makeVariable(v), v.value ? gen(v.value) : 'undefined'))
  },
  
  'FunctionDeclaration': function (f) {
    /*var result = ('function ' + makeVariable(f) + '(' )
    f.params.paramIds.forEach(function (v) {
      result += (util.format('var %s ', makeVariable(v.referent)))
    })
	result += (') {')
	emit(result)*/
	emit('function ' + makeVariable(f) + ' (' + gen(f.params) + ') {')
    gen(f.body)
    emit('}')
  },
  
  'Params': function (p) {
    var result = ''/*
    p.paramIds.forEach(function (v) {
      result += (util.format('var %s, ', makeVariable(v.referent)))
    })*/
	for (var i = 0; i < p.paramIds.length; i++) {
	  result += util.format('var %s', makeVariable(p.paramIds[i]) + ((i === p.paramIds.length - 1) ? '' : ', '))
	}
	return result
  },
  
  'ObjectDeclaration': function (o) {
    // TODO: Most likely this is whacked
    emit('var ' + makeVariable(o) + ' = {' + o.properties.map(gen).join(', ') + '}')
  },
  
  'PropertyDeclaration': function (p) {
    return util.format('%s: %s', makeVariable(p), p.value ? gen(p.value) : 'undefined')
  },

  'AssignmentStatement': function (s) {
    emit(util.format('%s = %s;', gen(s.target), gen(s.source)))
  },

  'ReadStatement': function (s) {
    s.varrefs.forEach(function (v) {
      emit(util.format('%s = prompt();', makeVariable(v.referent)))
    })
  },
  
  'ForStatement': function (s) {
    function initializer(v) {
      return util.format('var %s = %s', makeVariable(v), v.value ? gen(v.value) : 'undefined')
    }
    function increment(v) {
      return util.format('%s', gen(v.target) + v.symbol)
    }
    emit(util.format('for (%s; %s; %s) {',
        initializer(s.declaration),
        gen(s.condition),
        increment(s.assignment)))
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
    if (s.elseBody !== null) {
      emit('else {')
      gen(s.elseBody)
      emit('}')
    }
  },
  
  'IncrementStatement': function (s) {
    emit(util.format('%s', gen(s.target) + s.symbol))
  },
  
  'ReturnStatement': function (e) {
    emit(util.format('return %s;', gen(e.expression)))
  },

  'WriteStatement': function (s) {
    s.expressions.forEach(function (e) {
      emit(util.format('alert(%s);', gen(e)))
    })
  },

  'WhileStatement': function (s) {
    emit('while ' + gen(s.condition) + ' {')
    gen(s.body)
    emit('}')
  },
  
  'ArrayEntity': function (a) {
    return '[' + a.elements.join(',') + ']'
  },

  'NumericLiteral': function (literal) {
    return literal.toString()
  },

  'BooleanLiteral': function (literal) {
    return {'tru':'true', 'foos':'false'}[literal.toString()]
  },
  
  'StringLiteral': function (literal) {
    return literal.toString()
  },
  
  'NullLiteral': function (literal) {
    return 'null'
  },
  
  'BasicVar': function (v) {
    return makeVariable(v.referent)
  },
  
  'CallExpression': function (s) {
    // TODO: This needs major fixing
    emit(util.format('%s = %s;', gen(s.target), gen(s.expressions)))
  },
  
  'IndexVar': function (v) {
    return gen(v.array) + '[' + gen(v.index) + ']'
  },
  
  'DottedVar': function (v) {
    return gen(v.struct) + '.' + v.property
  },

  'UnaryExpression': function (e) {
    return util.format('(%s %s)', makeOp(e.op.lexeme), gen(e.operand))
  },

  'BinaryExpression': function (e) {
    return util.format('(%s %s %s)', gen(e.left), makeOp(e.op.lexeme), gen(e.right))
  }
}
