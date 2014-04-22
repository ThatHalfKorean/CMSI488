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
    
  },
  
  'ObjectDeclaration': function (o) {
    
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
    
  },
  
  'ForStatement': function (s) {
    emit('for (' + gen(s.declaration) + ',' + gen(s.condition) + ',' gen(s.assignment) ') {')
    gen(s.body);
    emit('}');
  },
  
  'IfStatement': function (s) {
    
  },
  
  'IncrementStatement': function (s) {
    
  },
  
  'ReturnStatement': function (s) {
    
  },

  'WriteStatement': function (s) {
    s.expressions.forEach(function (e) {
      emit(util.format('alert(%s);', gen(e)))
    })
  },

  'WhileStatement': function (s) {
    emit('while (' + gen(s.condition) + ') {')
    gen(s.body);
    emit('}');
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

  'VariableReference': function (v) {
    return makeVariable(v.referent)
  },

  'UnaryExpression': function (e) {
    return util.format('(%s %s)', makeOp(e.op.lexeme), gen(e.operand))
  },

  'BinaryExpression': function (e) {
    return util.format('(%s %s %s)', gen(e.left), makeOp(e.op.lexeme), gen(e.right))
  }
}
