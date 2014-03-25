Derpodile
=======

![Nur-hur the Crocodile](http://assets.nydailynews.com/polopoly_fs/1.1096989!/img/httpImage/image.jpg_gen/derivatives/landscape_635/croc17n-1-web.jpg "Nur-hur the Crocodile")


Summary
=======
To the untrained ear (i.e. communications and history majors), describing a programming language aloud sounds like a foreign language. Derpodile is created with the intention of sounding like an idiot when you verbally describe your program, help you to make friends with these "high level users", and confuse your enemies. As a consequence, coding in this language will make you wish for your head to be inside a crocodiles mouth (your brain will self destruct anyway so might as well feed a hungry croc). Inspired by general internet memes, along with associated spellings and onomatopeoias that indicate a lack of intelligence, Derpodile sounds dumb but has a powerful bite! This language is strongly and statically typed and is not intended for your average idiot.

**"Hello World" Example**

Ah, the classic "Hello, World" example. Even this masterpiece can be massacred with enough poor spelling and grammar. 

          pront "Hello, World" derp                         console.log("Hello, World");
          
In general, speaking in such a formal fashion is not the way of the derpodile. Throws off his groove, man. The following code is more appropriate for the average derp.

          pront "Halloh, wherlds" derp                      console.log("Halloh, wherlds");
          
Remember, try to sound like a 13 year old who is trying really hard to be funny but everyone wants him/her to be eaten by a crocodile. If you don't want to sound like a 13 year old, use JavaScript. No one is making you do this.

![Nur-hur the Crocodile](http://4.bp.blogspot.com/-S7-rwJLxkiw/TwBi-bRsnQI/AAAAAAAABr0/au90p6D5vYc/s1600/Funny%2BCrocodile.jpg "Derpodile eating an obnoxious user")

This one doesn't seem to be 13 yet, but probably still delicious. 

**For-Loop Example**

The Derpodile for-loop utilizes the same bad grammar and cringe-worthy spelling to make the eloquent and efficient for-loop as much as an eye-sore as possible. To make things slightly less painful, we chose to use the ">" and "<" signs for "greater than" and "less than" only because they look like crocodile mouths. 
          
          ~o< Dis be comment                                          // This is a comment.
          fer nom i = 1 derp i <= 10 derp i++ dur                     for ( var i = 1; i <= 10; i++ ) {
                    pront i*i derp                                              console.log(i*i);
          urp                                                         }
          
This snippet of code prints out perfect squares using numbers between 1 and 10. Crocodiles like perfect squares. 

**Function Example**

As with most creatures, crocodiles like to multiply. It comes in handy when ordering large shipments of yoga mats or figuring out how to tip the waiter (s)he just ate. 
          
          nom tipCalculator (nom amount, nom tip) dur                 func tipCalculator (num amount, num tip) {
                    herez amount * (tip/100) derp                               return amount * (tip/100);
          urp                                                         }

Granted, this function will not return a neat value rounded to two decimal points. However, if a croc is smart enough to use a tip calculator it should be smart enough to do basic rounding.

**Syntax**

          Script         ::=  Stmt+
          
          Stmt           ::=  Declaration
                          |   Increment  
                          |   WriteStmt
                          |   AssignmentStmt
                          |   IfStmt
                          |   WhileStmt
                          |   CallStmt
                          |   ForStmt
                          |   ReturnStmt
          
          Block          ::=  'dur'  Stmt+  'urp'
          
          Declaration    ::= VarDec | ObjDec | FunDec
          
          VarDec         ::= Type  Id  ('='  Exp)?  'derp'
          
          ObjDec        ::= 'dur' (Type  Id  ':' Exp 'derp')+ 'urp'
          
          FunDec         ::= Type  Id  Params  Block
          
          Increment      ::= VarExp  ('++' | '--') 'derp'
          
          Type           ::= ( 'nom' | 'buul' | 'werd' | 'thang' )( [] )*

          Params         ::= '(' Type Id (',' Type Id)* ')'  
                    
          AssignmentStmt ::= VarExp '='  Exp 'derp'
          
          IfStmt         ::= 'eef'  Exp  Block  ('elsheef' Exp Block)*  ('elsh'  Block)?
          
          WhileStmt      ::= 'dile'  Exp  Block
          
          CallStmt       ::= VarExp  '('Args')' 'derp'
          
          ReturnStmt     ::= 'herez' Exp 'derp'
          
          ForStmt        ::= 'fer' (VarDec)? 'derp'  Exp  'derp'  Increment  Block
          
          WriteStmt      ::= 'pront' Exp 'derp'
          
          Args           ::=  '('  (Exp  (',' Exp)*)?  ')'
          
          Exp            ::=  Exp1 (LogicalOp Exp1)*
          Exp1           ::=  Exp2 (ComparisonOp Exp2)*
          Exp2           ::=  Exp3 (AddOp Exp3)?
          Exp3           ::=  Exp4 (MultOp Exp4)*
          Exp4           ::=  UnaryOp? Exp5
          Exp5           ::=  NumLit | StringLit | 'tru' | 'foos' | Id VarExp | objDec | '(' Exp ')' | ArrayExp
          
          VarExp         ::= Id ( '[' Exp ']' | '.' Id | Args )*
          
          ArrayExp       ::= '[' Exp | (Exp ',')+ Exp | '' ']'
          
          UnaryOp        ::=  '-' | '!'
          
          LogicalOp      ::=  '&&' | '||' 
          
          ComparisonOp   ::= '>' | '>=' | '<' | '<=' | '==' | '!='
          
          AddOp          ::= '+' | '-'
          
          MultOp         ::= '*' | '/'
          
          
