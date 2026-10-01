# package token

```vertex
import "js/token"
```

## Index

- [`func HexValue(_ c: uint32) -> int`](#func-HexValue)
- [`func IsIdentifierPart(_ c: uint32) -> bool`](#func-IsIdentifierPart)
- [`func IsIdentifierStart(_ c: uint32) -> bool`](#func-IsIdentifierStart)
- [`func IsLineTerminator(_ c: uint32) -> bool`](#func-IsLineTerminator)
- [`func IsSpace(_ c: uint32) -> bool`](#func-IsSpace)
- [`func IsWhiteSpace(_ c: uint32) -> bool`](#func-IsWhiteSpace)
- [`func LookupKeyword(_ name: string) -> TokenKind?`](#func-LookupKeyword)
- [`func Precedence(_ kind: TokenKind) -> int`](#func-Precedence)
- [`struct Position: CustomStringConvertible, Equatable`](#struct-Position)
  - [`init(Filename: string = "", Line: int = 1, Column: int = 1, Offset: int = 0)`](#Position.init)
  - [`var Filename: string`](#Position.Filename)
  - [`var Line: int`](#Position.Line)
  - [`var Column: int`](#Position.Column)
  - [`var Offset: int`](#Position.Offset)
  - [`var description: string { get }`](#Position.description)
- [`final class SourceFile`](#class-SourceFile)
  - [`init(Filename: string, Source: string)`](#SourceFile.init)
  - [`let Filename: string`](#SourceFile.Filename)
  - [`let Source: string`](#SourceFile.Source)
  - [`var LineOffsets: [int]`](#SourceFile.LineOffsets)
  - [`func PositionAt(offset: int) -> Position`](#SourceFile.PositionAt)
- [`struct Token`](#struct-Token)
  - [`init(Kind: TokenKind, Text: string = "", Pos: int = 0, EndPos: int = 0, HasPrecedingLineBreak: bool = false)`](#Token.init)
  - [`var Kind: TokenKind`](#Token.Kind)
  - [`var Text: string`](#Token.Text)
  - [`var Value: [uint16]`](#Token.Value)
  - [`var Raw: string`](#Token.Raw)
  - [`var Number: float64`](#Token.Number)
  - [`var Pos: int`](#Token.Pos)
  - [`var EndPos: int`](#Token.EndPos)
  - [`var Line: int`](#Token.Line)
  - [`var HasPrecedingLineBreak: bool`](#Token.HasPrecedingLineBreak)
  - [`var Escaped: bool`](#Token.Escaped)
  - [`var InvalidEscape: bool`](#Token.InvalidEscape)
  - [`var LegacyOctal: bool`](#Token.LegacyOctal)
  - [`var IsAssignment: bool { get }`](#Token.IsAssignment)
  - [`var IsBinaryOperator: bool { get }`](#Token.IsBinaryOperator)
  - [`var IsIdentifierName: bool { get }`](#Token.IsIdentifierName)
  - [`var IsContextualKeyword: bool { get }`](#Token.IsContextualKeyword)
- [`enum TokenKind: Equatable`](#enum-TokenKind)

## Functions

### func HexValue <a id="func-HexValue"></a>

```vertex
public func HexValue(_ c: uint32) -> int
```

HexValue is a HexDigit's value, or -1.

### func IsIdentifierPart <a id="func-IsIdentifierPart"></a>

```vertex
public func IsIdentifierPart(_ c: uint32) -> bool
```

IsIdentifierPart is IdentifierPartChar (§12.7): ID_Continue, $, ZWNJ or ZWJ.

### func IsIdentifierStart <a id="func-IsIdentifierStart"></a>

```vertex
public func IsIdentifierStart(_ c: uint32) -> bool
```

IsIdentifierStart is IdentifierStartChar (§12.7): ID_Start, $ or _.

### func IsLineTerminator <a id="func-IsLineTerminator"></a>

```vertex
public func IsLineTerminator(_ c: uint32) -> bool
```

IsLineTerminator is LineTerminator (§12.3): LF, CR, LS and PS.

### func IsSpace <a id="func-IsSpace"></a>

```vertex
public func IsSpace(_ c: uint32) -> bool
```

IsSpace is StrWhiteSpaceChar (§7.1.4.1): WhiteSpace or LineTerminator,
what String.prototype.trim removes and \s matches.

### func IsWhiteSpace <a id="func-IsWhiteSpace"></a>

```vertex
public func IsWhiteSpace(_ c: uint32) -> bool
```

IsWhiteSpace is WhiteSpace (§12.2): TAB, VT, FF, SP, NBSP, ZWNBSP and
the Zs category.

### func LookupKeyword <a id="func-LookupKeyword"></a>

```vertex
public func LookupKeyword(_ name: string) -> TokenKind?
```

LookupKeyword looks up a reserved or contextual keyword by name.

### func Precedence <a id="func-Precedence"></a>

```vertex
public func Precedence(_ kind: TokenKind) -> int
```

Precedence returns the binary operator precedence (higher binds tighter).
Returns 0 for non-binary operators.

## Types

### struct Position <a id="struct-Position"></a>

```vertex
public struct Position: CustomStringConvertible, Equatable
```

Position represents a source location in line and column coordinates.

#### Initializers

<a id="Position.init"></a>

```vertex
public init(Filename: string = "", Line: int = 1, Column: int = 1, Offset: int = 0)
```

#### Properties

<a id="Position.Filename"></a>

```vertex
public var Filename: string
```

<a id="Position.Line"></a>

```vertex
public var Line: int
```

<a id="Position.Column"></a>

```vertex
public var Column: int
```

<a id="Position.Offset"></a>

```vertex
public var Offset: int
```

<a id="Position.description"></a>

```vertex
public var description: string { get }
```

### class SourceFile <a id="class-SourceFile"></a>

```vertex
public final class SourceFile
```

SourceFile records source text and line offset boundaries for fast coordinate resolution.

#### Initializers

<a id="SourceFile.init"></a>

```vertex
public init(Filename: string, Source: string)
```

#### Properties

<a id="SourceFile.Filename"></a>

```vertex
public let Filename: string
```

<a id="SourceFile.Source"></a>

```vertex
public let Source: string
```

<a id="SourceFile.LineOffsets"></a>

```vertex
public var LineOffsets: [int]
```

#### Methods

<a id="SourceFile.PositionAt"></a>

```vertex
public func PositionAt(offset: int) -> Position
```

PositionAt returns the line and column for a given byte offset.

### struct Token <a id="struct-Token"></a>

```vertex
public struct Token
```

Token is a scanned token with its position and, for literals, its value.

#### Initializers

<a id="Token.init"></a>

```vertex
public init(Kind: TokenKind, Text: string = "", Pos: int = 0, EndPos: int = 0, HasPrecedingLineBreak: bool = false)
```

#### Properties

<a id="Token.Kind"></a>

```vertex
public var Kind: TokenKind
```

<a id="Token.Text"></a>

```vertex
public var Text: string
```

Text is an identifier's or keyword's name (escapes resolved), a
number's or regular expression's source, or a punctuator.

<a id="Token.Value"></a>

```vertex
public var Value: [uint16]
```

Value is a string literal's or template part's cooked UTF-16 value.

<a id="Token.Raw"></a>

```vertex
public var Raw: string
```

Raw is a template part's raw text, or a regular expression's flags.

<a id="Token.Number"></a>

```vertex
public var Number: float64
```

<a id="Token.Pos"></a>

```vertex
public var Pos: int
```

<a id="Token.EndPos"></a>

```vertex
public var EndPos: int
```

<a id="Token.Line"></a>

```vertex
public var Line: int
```

<a id="Token.HasPrecedingLineBreak"></a>

```vertex
public var HasPrecedingLineBreak: bool
```

<a id="Token.Escaped"></a>

```vertex
public var Escaped: bool
```

Escaped is set when an identifier or keyword was spelled with a
\u escape, which keeps it from being a keyword.

<a id="Token.InvalidEscape"></a>

```vertex
public var InvalidEscape: bool
```

InvalidEscape is set on a template part whose cooked value is
undefined (allowed only in tagged templates).

<a id="Token.LegacyOctal"></a>

```vertex
public var LegacyOctal: bool
```

LegacyOctal is set on a number like 017 or a string with \07, which
strict mode forbids.

<a id="Token.IsAssignment"></a>

```vertex
public var IsAssignment: bool { get }
```

<a id="Token.IsBinaryOperator"></a>

```vertex
public var IsBinaryOperator: bool { get }
```

<a id="Token.IsIdentifierName"></a>

```vertex
public var IsIdentifierName: bool { get }
```

<a id="Token.IsContextualKeyword"></a>

```vertex
public var IsContextualKeyword: bool { get }
```

### enum TokenKind <a id="enum-TokenKind"></a>

```vertex
public enum TokenKind: Equatable
```

TokenKind represents the category of a lexical token in ECMAScript.

#### Cases

<a id="TokenKind.eof"></a>

```vertex
case eof
```

<a id="TokenKind.illegal"></a>

```vertex
case illegal
```

<a id="TokenKind.identifier"></a>

```vertex
case identifier
```

Literals and identifiers

<a id="TokenKind.number"></a>

```vertex
case number
```

<a id="TokenKind.bigint"></a>

```vertex
case bigint
```

<a id="TokenKind.string"></a>

```vertex
case string
```

<a id="TokenKind.regexLiteral"></a>

```vertex
case regexLiteral
```

<a id="TokenKind.templateHead"></a>

```vertex
case templateHead
```

<a id="TokenKind.templateMiddle"></a>

```vertex
case templateMiddle
```

<a id="TokenKind.templateTail"></a>

```vertex
case templateTail
```

<a id="TokenKind.templateNoSub"></a>

```vertex
case templateNoSub
```

<a id="TokenKind.kAwait"></a>

```vertex
case kAwait
```

Reserved Keywords (ECMA-262 §12.6.2)

<a id="TokenKind.kAsync"></a>

```vertex
case kAsync
```

<a id="TokenKind.kBreak"></a>

```vertex
case kBreak
```

<a id="TokenKind.kCase"></a>

```vertex
case kCase
```

<a id="TokenKind.kCatch"></a>

```vertex
case kCatch
```

<a id="TokenKind.kClass"></a>

```vertex
case kClass
```

<a id="TokenKind.kConst"></a>

```vertex
case kConst
```

<a id="TokenKind.kContinue"></a>

```vertex
case kContinue
```

<a id="TokenKind.kDebugger"></a>

```vertex
case kDebugger
```

<a id="TokenKind.kDefault"></a>

```vertex
case kDefault
```

<a id="TokenKind.kDelete"></a>

```vertex
case kDelete
```

<a id="TokenKind.kDo"></a>

```vertex
case kDo
```

<a id="TokenKind.kElse"></a>

```vertex
case kElse
```

<a id="TokenKind.kExport"></a>

```vertex
case kExport
```

<a id="TokenKind.kExtends"></a>

```vertex
case kExtends
```

<a id="TokenKind.kFinally"></a>

```vertex
case kFinally
```

<a id="TokenKind.kFor"></a>

```vertex
case kFor
```

<a id="TokenKind.kFunction"></a>

```vertex
case kFunction
```

<a id="TokenKind.kIf"></a>

```vertex
case kIf
```

<a id="TokenKind.kImport"></a>

```vertex
case kImport
```

<a id="TokenKind.kIn"></a>

```vertex
case kIn
```

<a id="TokenKind.kInstanceof"></a>

```vertex
case kInstanceof
```

<a id="TokenKind.kLet"></a>

```vertex
case kLet
```

<a id="TokenKind.kNew"></a>

```vertex
case kNew
```

<a id="TokenKind.kReturn"></a>

```vertex
case kReturn
```

<a id="TokenKind.kSuper"></a>

```vertex
case kSuper
```

<a id="TokenKind.kSwitch"></a>

```vertex
case kSwitch
```

<a id="TokenKind.kThis"></a>

```vertex
case kThis
```

<a id="TokenKind.kThrow"></a>

```vertex
case kThrow
```

<a id="TokenKind.kTry"></a>

```vertex
case kTry
```

<a id="TokenKind.kTypeof"></a>

```vertex
case kTypeof
```

<a id="TokenKind.kVar"></a>

```vertex
case kVar
```

<a id="TokenKind.kVoid"></a>

```vertex
case kVoid
```

<a id="TokenKind.kWhile"></a>

```vertex
case kWhile
```

<a id="TokenKind.kWith"></a>

```vertex
case kWith
```

<a id="TokenKind.kYield"></a>

```vertex
case kYield
```

<a id="TokenKind.kNull"></a>

```vertex
case kNull
```

Literal Keywords

<a id="TokenKind.kTrue"></a>

```vertex
case kTrue
```

<a id="TokenKind.kFalse"></a>

```vertex
case kFalse
```

<a id="TokenKind.kOf"></a>

```vertex
case kOf
```

Contextual Keywords

<a id="TokenKind.kAs"></a>

```vertex
case kAs
```

<a id="TokenKind.kFrom"></a>

```vertex
case kFrom
```

<a id="TokenKind.kGet"></a>

```vertex
case kGet
```

<a id="TokenKind.kSet"></a>

```vertex
case kSet
```

<a id="TokenKind.kTarget"></a>

```vertex
case kTarget
```

<a id="TokenKind.kStatic"></a>

```vertex
case kStatic
```

<a id="TokenKind.lParen"></a>

```vertex
case lParen
```

Punctuators

<a id="TokenKind.rParen"></a>

```vertex
case rParen
```

(

<a id="TokenKind.lBrace"></a>

```vertex
case lBrace
```

)

<a id="TokenKind.rBrace"></a>

```vertex
case rBrace
```

{

<a id="TokenKind.lBracket"></a>

```vertex
case lBracket
```

}

<a id="TokenKind.rBracket"></a>

```vertex
case rBracket
```

[

<a id="TokenKind.semi"></a>

```vertex
case semi
```

]

<a id="TokenKind.comma"></a>

```vertex
case comma
```

;

<a id="TokenKind.colon"></a>

```vertex
case colon
```

,

<a id="TokenKind.dot"></a>

```vertex
case dot
```

:

<a id="TokenKind.dotDotDot"></a>

```vertex
case dotDotDot
```

.

<a id="TokenKind.question"></a>

```vertex
case question
```

...

<a id="TokenKind.questionDot"></a>

```vertex
case questionDot
```

?

<a id="TokenKind.arrow"></a>

```vertex
case arrow
```

?.

<a id="TokenKind.hash"></a>

```vertex
case hash
```

=>

<a id="TokenKind.privateName"></a>

```vertex
case privateName
```

#

<a id="TokenKind.assign"></a>

```vertex
case assign
```

Assignment Operators

<a id="TokenKind.addAssign"></a>

```vertex
case addAssign
```

=

<a id="TokenKind.subAssign"></a>

```vertex
case subAssign
```

+=

<a id="TokenKind.mulAssign"></a>

```vertex
case mulAssign
```

-=

<a id="TokenKind.divAssign"></a>

```vertex
case divAssign
```

*=

<a id="TokenKind.modAssign"></a>

```vertex
case modAssign
```

/=

<a id="TokenKind.expAssign"></a>

```vertex
case expAssign
```

%=

<a id="TokenKind.shlAssign"></a>

```vertex
case shlAssign
```

**=

<a id="TokenKind.shrAssign"></a>

```vertex
case shrAssign
```

<<=

<a id="TokenKind.ushrAssign"></a>

```vertex
case ushrAssign
```

>>=

<a id="TokenKind.andAssign"></a>

```vertex
case andAssign
```

>>>=

<a id="TokenKind.orAssign"></a>

```vertex
case orAssign
```

&=

<a id="TokenKind.xorAssign"></a>

```vertex
case xorAssign
```

|=

<a id="TokenKind.logicalAndAssign"></a>

```vertex
case logicalAndAssign
```

^=

<a id="TokenKind.logicalOrAssign"></a>

```vertex
case logicalOrAssign
```

&&=

<a id="TokenKind.nullishAssign"></a>

```vertex
case nullishAssign
```

||=

<a id="TokenKind.eq"></a>

```vertex
case eq
```

Equality

<a id="TokenKind.notEq"></a>

```vertex
case notEq
```

==

<a id="TokenKind.strictEq"></a>

```vertex
case strictEq
```

!=

<a id="TokenKind.strictNotEq"></a>

```vertex
case strictNotEq
```

===

<a id="TokenKind.less"></a>

```vertex
case less
```

Relational

<a id="TokenKind.lessEq"></a>

```vertex
case lessEq
```

<

<a id="TokenKind.greater"></a>

```vertex
case greater
```

<=

<a id="TokenKind.greaterEq"></a>

```vertex
case greaterEq
```

>

<a id="TokenKind.add"></a>

```vertex
case add
```

Arithmetic and Bitwise

<a id="TokenKind.sub"></a>

```vertex
case sub
```

+

<a id="TokenKind.mul"></a>

```vertex
case mul
```

-

<a id="TokenKind.div"></a>

```vertex
case div
```

*

<a id="TokenKind.mod"></a>

```vertex
case mod
```

/

<a id="TokenKind.exp"></a>

```vertex
case exp
```

%

<a id="TokenKind.bitAnd"></a>

```vertex
case bitAnd
```

**

<a id="TokenKind.bitOr"></a>

```vertex
case bitOr
```

&

<a id="TokenKind.bitXor"></a>

```vertex
case bitXor
```

|

<a id="TokenKind.bitNot"></a>

```vertex
case bitNot
```

^

<a id="TokenKind.shl"></a>

```vertex
case shl
```

~

<a id="TokenKind.shr"></a>

```vertex
case shr
```

<<

<a id="TokenKind.ushr"></a>

```vertex
case ushr
```

>>

<a id="TokenKind.logicalAnd"></a>

```vertex
case logicalAnd
```

Logical

<a id="TokenKind.logicalOr"></a>

```vertex
case logicalOr
```

&&

<a id="TokenKind.nullishCoalesce"></a>

```vertex
case nullishCoalesce
```

||

<a id="TokenKind.logicalNot"></a>

```vertex
case logicalNot
```

??

<a id="TokenKind.inc"></a>

```vertex
case inc
```

Unary update

<a id="TokenKind.dec"></a>

```vertex
case dec
```

++

## Files

- token.vs
