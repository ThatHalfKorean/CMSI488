CMSI488
=======

**Summary**

Derpodile is created with the intention of sounding like an idiot when you verbally describe your program. Inspired by general internet memes, along with associated spellings and onomatopeoias that indicate a lack of intelligence. However, this language is strong and statically typed and is not intended for idiot use.

**Microsyntax**

Script   ::=  Stmt+

Stmt     ::=  Declaration
          |   Increment  'derp'
          |   'pront'  Exp  'derp'
          |   AssignmentStmt
          |   IfStmt
          |   WhileStmt
          |   TryStmt
          |   CallStmt

Block    ::=  'dur'  Stmt+  'urp'

Declaration ::= VarDec | TypeDec | FunDec

VarDec  ::= Type  Id  ('iz'  Exp)?  'derp'

TypeDec ::= 'thang'  Id  'dur' (Type  id  derp)+ 'urp'

FunDec  ::= Type  Id  Params  Block

Increment  ::=  Var  ('++' | '--')

Type     ::=  'ent'
          |   'floatie'
          |   'buul'
          |   'werd'
          |   Id
          |   Type  '[]'

AssignmentStmt ::= Var  'iz'  Exp
IfStmt         ::= 'eef'  Exp  Block  ('elsheef' Exp Block)*  ('elsh'  Block)?
WhileStmt      ::= 'dile'  Exp  Block
TryStmt        ::= 'tri'  Block  'ketch' '(' Id ')' Block
CallStmt       ::= Id  Args

Args           ::=  '('  Exp  (',' Exp)*  ')'

Exp      ::=  UnaryOp  Exp
          |   Exp  BinaryOp  Exp
          |   '('  Exp  ')'
          |   IntLit | StringLit | 'tru' | 'nuhuh' | FloatLit | Call

UnaryOp  ::=  '-' | 'nawt'

BinaryOp ::=  '&&' | '||' | 'pwns' | 'izrpwns' | 'izz' | 'izznt' | 'pwndby' | 'izrpwndby' | ...
