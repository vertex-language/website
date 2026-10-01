# package css

```vertex
import "web/css"
```

## Index

- [Variables](#variables)
- [`func AppliedPropertyNames() -> [string]`](#func-AppliedPropertyNames)
- [`func IsKnownProperty(_ name: string) -> bool`](#func-IsKnownProperty)
- [`func Longhands(_ d: Declaration) -> [Longhand]`](#func-Longhands)
- [`func LonghandsOf(_ name: string) -> [Prop]`](#func-LonghandsOf)
- [`func Parse(_ source: string) -> StyleSheet`](#func-Parse)
- [`func Parse(_ sourceBytes: borrowing [uint8]) -> StyleSheet`](#func-Parse-2)
- [`func ParseColor(_ text: string) -> draw.Color?`](#func-ParseColor)
- [`func ParseDeclarations(_ inlineStyle: string) -> [Declaration]`](#func-ParseDeclarations)
- [`func Serialize(_ tokens: [Token]) -> string`](#func-Serialize)
- [`func UnappliedPropertyNames() -> [string]`](#func-UnappliedPropertyNames)
- [`struct AtRule`](#struct-AtRule)
  - [`init(name: string, params: string, rules: [Rule], declarations: [Declaration] = [], atRules: [AtRule] = [])`](#AtRule.init)
  - [`var Name: string`](#AtRule.Name)
  - [`var Params: string`](#AtRule.Params)
  - [`var Rules: [Rule]`](#AtRule.Rules)
  - [`var Declarations: [Declaration]`](#AtRule.Declarations)
  - [`var AtRules: [AtRule]`](#AtRule.AtRules)
  - [`var Position: int = 0`](#AtRule.Position)
- [`struct CalcTerm`](#struct-CalcTerm)
  - [`var Number: float32`](#CalcTerm.Number)
  - [`var Unit: Unit?`](#CalcTerm.Unit)
- [`struct Coverage`](#struct-Coverage)
  - [`init()`](#Coverage.init)
  - [`var Declarations: int = 0`](#Coverage.Declarations)
  - [`var Applied: int = 0`](#Coverage.Applied)
  - [`var UnknownProperties: [string: int] = [:]`](#Coverage.UnknownProperties)
  - [`var UnparsedValues: [string: int] = [:]`](#Coverage.UnparsedValues)
  - [`var CustomProperties: int = 0`](#Coverage.CustomProperties)
  - [`var UsesVar: int = 0`](#Coverage.UsesVar)
  - [`var DroppedAtRules: [string: int] = [:]`](#Coverage.DroppedAtRules)
  - [`var RulesInDroppedAtRules: int = 0`](#Coverage.RulesInDroppedAtRules)
  - [`var Rules: int = 0`](#Coverage.Rules)
  - [`mutating func Add(_ sheet: StyleSheet)`](#Coverage.Add)
  - [`func Report(top: int = 15) -> string`](#Coverage.Report)
- [`struct Declaration`](#struct-Declaration)
  - [`init(property: string, value: string, important: bool = false, tokens: [Token] = [])`](#Declaration.init)
  - [`var Property: string`](#Declaration.Property)
  - [`var Value: string`](#Declaration.Value)
  - [`var Important: bool`](#Declaration.Important)
  - [`var Tokens: [Token]`](#Declaration.Tokens)
- [`struct GridPlacement: Equatable`](#struct-GridPlacement)
  - [`init(start: int32 = 0, span: int32 = 1)`](#GridPlacement.init)
  - [`var Start: int32`](#GridPlacement.Start)
  - [`var Span: int32`](#GridPlacement.Span)
  - [`var End: int32 = 0`](#GridPlacement.End)
  - [`static let auto = GridPlacement(start: 0, span: 1)`](#GridPlacement.auto)
  - [`func Resolved(explicitTracks: int32) -> GridPlacement`](#GridPlacement.Resolved)
- [`enum GridTrack: Equatable`](#enum-GridTrack)
- [`enum Length: Equatable`](#enum-Length)
  - [`var IsAuto: bool { get }`](#Length.IsAuto)
  - [`var IsNone: bool { get }`](#Length.IsNone)
  - [`var Pixels: float32? { get }`](#Length.Pixels)
  - [`func Resolve(_ base: float32) -> float32?`](#Length.Resolve)
  - [`func Or(_ fallback: float32, base: float32) -> float32`](#Length.Or)
- [`struct Longhand`](#struct-Longhand)
  - [`init(_ prop: Prop, _ value: Value, important: bool = false)`](#Longhand.init)
  - [`var Prop: Prop`](#Longhand.Prop)
  - [`var Value: Value`](#Longhand.Value)
  - [`var Important: bool`](#Longhand.Important)
- [`class Parser`](#class-Parser)
  - [`init(scanner: Scanner)`](#Parser.init)
  - [`func Parse() -> StyleSheet`](#Parser.Parse)
- [`enum Prop: int32`](#enum-Prop)
- [`struct Rule`](#struct-Rule)
  - [`init(selectors: [string], declarations: [Declaration])`](#Rule.init)
  - [`var Selectors: [string]`](#Rule.Selectors)
  - [`var Declarations: [Declaration]`](#Rule.Declarations)
  - [`var Position: int = 0`](#Rule.Position)
  - [`func GetDeclaration(_ property: string) -> Declaration?`](#Rule.GetDeclaration)
- [`class Scanner`](#class-Scanner)
  - [`init(bytes: [uint8])`](#Scanner.init)
  - [`init(source: string)`](#Scanner.init-2)
  - [`func Next() -> Token`](#Scanner.Next)
- [`struct ShadowValue`](#struct-ShadowValue)
  - [`var X: Value`](#ShadowValue.X)
  - [`var Y: Value`](#ShadowValue.Y)
  - [`var Blur: Value`](#ShadowValue.Blur)
  - [`var Spread: Value`](#ShadowValue.Spread)
  - [`var Color: draw.Color?`](#ShadowValue.Color)
  - [`var Inset: bool`](#ShadowValue.Inset)
- [`class StyleSheet`](#class-StyleSheet)
  - [`init(rules: [Rule] = [], atRules: [AtRule] = [])`](#StyleSheet.init)
  - [`var Rules: [Rule]`](#StyleSheet.Rules)
  - [`var AtRules: [AtRule]`](#StyleSheet.AtRules)
- [`struct Token`](#struct-Token)
  - [`init(kind: TokenKind, value: string = "", unit: string = "", numberVal: float32 = 0.0, spaceBefore: bool = false)`](#Token.init)
  - [`var Kind: TokenKind`](#Token.Kind)
  - [`var Value: string`](#Token.Value)
  - [`var Unit: string`](#Token.Unit)
  - [`var NumberVal: float32`](#Token.NumberVal)
  - [`var SpaceBefore: bool`](#Token.SpaceBefore)
- [`enum TokenKind: Equatable`](#enum-TokenKind)
- [`enum Unit: Equatable`](#enum-Unit)
- [`enum Value`](#enum-Value)

## Variables

<a id="var-SystemAccent"></a>

```vertex
public var SystemAccent = draw.Color(0x00, 0x7A, 0xFF)
```

The accent color the system uses, which `AccentColor` is: set by the
host from the platform's (macOS's is its blue by default).

## Functions

### func AppliedPropertyNames <a id="func-AppliedPropertyNames"></a>

```vertex
public func AppliedPropertyNames() -> [string]
```

Every property name the engine applies: its longhands, and the
shorthands and logical names it expands. Sorted.

### func IsKnownProperty <a id="func-IsKnownProperty"></a>

```vertex
public func IsKnownProperty(_ name: string) -> bool
```

Whether the engine knows a property: a longhand it computes, or a
shorthand it expands.

### func Longhands <a id="func-Longhands"></a>

```vertex
public func Longhands(_ d: Declaration) -> [Longhand]
```

Parses a declaration from a stylesheet into the longhands it sets.
A property the engine does not know, or a value it cannot read,
sets nothing, which is how a browser treats them too.

### func LonghandsOf <a id="func-LonghandsOf"></a>

```vertex
public func LonghandsOf(_ name: string) -> [Prop]
```

The longhands a property sets: itself, or a shorthand's parts.
Empty for a property the engine doesn't know.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ source: string) -> StyleSheet
```

Parses a CSS stylesheet string into a StyleSheet struct.

### func Parse <a id="func-Parse-2"></a>

```vertex
public func Parse(_ sourceBytes: borrowing [uint8]) -> StyleSheet
```

Parses CSS bytes into a StyleSheet struct.

### func ParseColor <a id="func-ParseColor"></a>

```vertex
public func ParseColor(_ text: string) -> draw.Color?
```

Parses a CSS color: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`,
`rgb()`, `rgba()`, `hsl()`, `hsla()`, `transparent` and the named
colors. Nil for anything else (including `currentcolor`, which
the caller knows and this does not).

### func ParseDeclarations <a id="func-ParseDeclarations"></a>

```vertex
public func ParseDeclarations(_ inlineStyle: string) -> [Declaration]
```

Parses an inline CSS style attribute (e.g. `color: red; font-size: 14px;`).

### func Serialize <a id="func-Serialize"></a>

```vertex
public func Serialize(_ tokens: [Token]) -> string
```

The text a run of tokens spells, with a space wherever the source had
one and strings quoted again.

### func UnappliedPropertyNames <a id="func-UnappliedPropertyNames"></a>

```vertex
public func UnappliedPropertyNames() -> [string]
```

Every property name the engine knows but does not apply yet. Sorted.

## Types

### struct AtRule <a id="struct-AtRule"></a>

```vertex
public struct AtRule
```

An at-rule, such as `@media (min-width: 600px) { ... }`, which holds
rules, or `@font-face { ... }`, which holds declarations.

#### Initializers

<a id="AtRule.init"></a>

```vertex
public init(name: string, params: string, rules: [Rule], declarations: [Declaration] = [], atRules: [AtRule] = [])
```

#### Properties

<a id="AtRule.Name"></a>

```vertex
public var Name: string
```

<a id="AtRule.Params"></a>

```vertex
public var Params: string
```

<a id="AtRule.Rules"></a>

```vertex
public var Rules: [Rule]
```

<a id="AtRule.Declarations"></a>

```vertex
public var Declarations: [Declaration]
```

<a id="AtRule.AtRules"></a>

```vertex
public var AtRules: [AtRule]
```

At-rules inside this one's block, in order: `@media` inside
`@layer`, `@supports` inside `@media`.

<a id="AtRule.Position"></a>

```vertex
public var Position: int = 0
```

Where the at-rule stands in source order; see Rule.Position.

### struct CalcTerm <a id="struct-CalcTerm"></a>

```vertex
public struct CalcTerm
```

One term of a calc(): a number in a unit, or unitless.

#### Properties

<a id="CalcTerm.Number"></a>

```vertex
public var Number: float32
```

<a id="CalcTerm.Unit"></a>

```vertex
public var Unit: Unit?
```

### struct Coverage <a id="struct-Coverage"></a>

```vertex
public struct Coverage
```

What the engine makes of a stylesheet: how many declarations it
applies, and, by name, what it drops. The list of what real pages
still need.

#### Initializers

<a id="Coverage.init"></a>

```vertex
public init()
```

#### Properties

<a id="Coverage.Declarations"></a>

```vertex
public var Declarations: int = 0
```

<a id="Coverage.Applied"></a>

```vertex
public var Applied: int = 0
```

Declarations that turned into longhands the cascade applies, and
those using var() on known properties, parsed per element.

<a id="Coverage.UnknownProperties"></a>

```vertex
public var UnknownProperties: [string: int] = [:]
```

Properties the engine has never heard of, by name.

<a id="Coverage.UnparsedValues"></a>

```vertex
public var UnparsedValues: [string: int] = [:]
```

Properties it knows whose value didn't parse, by name.

<a id="Coverage.CustomProperties"></a>

```vertex
public var CustomProperties: int = 0
```

Custom properties (--x) declared, which nothing reads yet.

<a id="Coverage.UsesVar"></a>

```vertex
public var UsesVar: int = 0
```

Declarations whose value uses var().

<a id="Coverage.DroppedAtRules"></a>

```vertex
public var DroppedAtRules: [string: int] = [:]
```

At-rules the cascade doesn't read, by name, with the rules and
declarations inside them that go with them.

<a id="Coverage.RulesInDroppedAtRules"></a>

```vertex
public var RulesInDroppedAtRules: int = 0
```

<a id="Coverage.Rules"></a>

```vertex
public var Rules: int = 0
```

#### Methods

<a id="Coverage.Add"></a>

```vertex
public mutating func Add(_ sheet: StyleSheet)
```

Adds a sheet's declarations and rules.

<a id="Coverage.Report"></a>

```vertex
public func Report(top: int = 15) -> string
```

A report: the counts, then each list most frequent first, up to
`top` of each.

### struct Declaration <a id="struct-Declaration"></a>

```vertex
public struct Declaration
```

A single CSS property declaration, such as `color: red !important;`.
`Value` is the value's text, spaced as the source spaced it; `Tokens`
is the same as the scanner read it, for a reader that wants the
structure rather than the text.

#### Initializers

<a id="Declaration.init"></a>

```vertex
public init(property: string, value: string, important: bool = false, tokens: [Token] = [])
```

#### Properties

<a id="Declaration.Property"></a>

```vertex
public var Property: string
```

<a id="Declaration.Value"></a>

```vertex
public var Value: string
```

<a id="Declaration.Important"></a>

```vertex
public var Important: bool
```

<a id="Declaration.Tokens"></a>

```vertex
public var Tokens: [Token]
```

### struct GridPlacement <a id="struct-GridPlacement"></a>

```vertex
public struct GridPlacement: Equatable
```

Where a grid item is put: a line, a span, or automatic.

#### Initializers

<a id="GridPlacement.init"></a>

```vertex
public init(start: int32 = 0, span: int32 = 1)
```

#### Properties

<a id="GridPlacement.Start"></a>

```vertex
public var Start: int32
```

1-based start line, 0 for auto.

<a id="GridPlacement.Span"></a>

```vertex
public var Span: int32
```

Lines spanned.

<a id="GridPlacement.End"></a>

```vertex
public var End: int32 = 0
```

The end line where one was named: 1-based, or counted back from
the last explicit line when negative (-1 is the last); 0 for none.

<a id="GridPlacement.auto"></a>

```vertex
public static let auto = GridPlacement(start: 0, span: 1)
```

#### Methods

<a id="GridPlacement.Resolved"></a>

```vertex
public func Resolved(explicitTracks: int32) -> GridPlacement
```

The placement with its end line made a span, for a grid with so
many explicit tracks.

### enum GridTrack <a id="enum-GridTrack"></a>

```vertex
public enum GridTrack: Equatable
```

One track of a grid: a fixed length, a share of the free space, or
what its items need.

#### Cases

<a id="GridTrack.length"></a>

```vertex
case length(Length)
```

<a id="GridTrack.fr"></a>

```vertex
case fr(float32)
```

<a id="GridTrack.auto"></a>

```vertex
case auto
```

<a id="GridTrack.minmax"></a>

```vertex
case minmax(float32, float32, float32)
```

minmax(min, max): the minimum in pixels, the maximum in pixels
(0 for none), and the maximum's fr where a share (0 for none).

### enum Length <a id="enum-Length"></a>

```vertex
public enum Length: Equatable
```

A CSS length as the cascade leaves it: resolved to pixels where the
unit allowed, a percentage where only layout can resolve it, or a
keyword.

#### Cases

<a id="Length.auto"></a>

```vertex
case auto
```

<a id="Length.none"></a>

```vertex
case none
```

<a id="Length.px"></a>

```vertex
case px(float32)
```

<a id="Length.percent"></a>

```vertex
case percent(float32)
```

<a id="Length.calc"></a>

```vertex
case calc(float32, float32)
```

calc(): so many pixels plus so much of the base.

<a id="Length.minContent"></a>

```vertex
case minContent
```

<a id="Length.maxContent"></a>

```vertex
case maxContent
```

<a id="Length.fitContent"></a>

```vertex
case fitContent
```

#### Properties

<a id="Length.IsAuto"></a>

```vertex
public var IsAuto: bool { get }
```

<a id="Length.IsNone"></a>

```vertex
public var IsNone: bool { get }
```

<a id="Length.Pixels"></a>

```vertex
public var Pixels: float32? { get }
```

The length in pixels where it needs no base, or nil.

#### Methods

<a id="Length.Resolve"></a>

```vertex
public func Resolve(_ base: float32) -> float32?
```

The length in pixels against a base for percentages; nil where it
is a keyword.

<a id="Length.Or"></a>

```vertex
public func Or(_ fallback: float32, base: float32) -> float32
```

The length in pixels, or a fallback where it is a keyword.

### struct Longhand <a id="struct-Longhand"></a>

```vertex
public struct Longhand
```

One longhand and its value, as the cascade applies it.

#### Initializers

<a id="Longhand.init"></a>

```vertex
public init(_ prop: Prop, _ value: Value, important: bool = false)
```

#### Properties

<a id="Longhand.Prop"></a>

```vertex
public var Prop: Prop
```

<a id="Longhand.Value"></a>

```vertex
public var Value: Value
```

<a id="Longhand.Important"></a>

```vertex
public var Important: bool
```

### class Parser <a id="class-Parser"></a>

```vertex
public class Parser
```

Parser that converts CSS tokens into a StyleSheet or Declaration list.

#### Initializers

<a id="Parser.init"></a>

```vertex
public init(scanner: Scanner)
```

#### Methods

<a id="Parser.Parse"></a>

```vertex
public func Parse() -> StyleSheet
```

Parses the entire CSS stream into a StyleSheet.

### enum Prop <a id="enum-Prop"></a>

```vertex
public enum Prop: int32
```

The properties the engine knows, each a longhand. Shorthands are
expanded into these when a declaration is parsed.

#### Cases

<a id="Prop.display"></a>

```vertex
case display = 1
```

<a id="Prop.position"></a>

```vertex
case position
```

<a id="Prop.float"></a>

```vertex
case float
```

<a id="Prop.clear"></a>

```vertex
case clear
```

<a id="Prop.top"></a>

```vertex
case top
```

<a id="Prop.right"></a>

```vertex
case right
```

<a id="Prop.bottom"></a>

```vertex
case bottom
```

<a id="Prop.left"></a>

```vertex
case left
```

<a id="Prop.zIndex"></a>

```vertex
case zIndex
```

<a id="Prop.width"></a>

```vertex
case width
```

<a id="Prop.height"></a>

```vertex
case height
```

<a id="Prop.minWidth"></a>

```vertex
case minWidth
```

<a id="Prop.minHeight"></a>

```vertex
case minHeight
```

<a id="Prop.maxWidth"></a>

```vertex
case maxWidth
```

<a id="Prop.maxHeight"></a>

```vertex
case maxHeight
```

<a id="Prop.boxSizing"></a>

```vertex
case boxSizing
```

<a id="Prop.marginTop"></a>

```vertex
case marginTop
```

<a id="Prop.marginRight"></a>

```vertex
case marginRight
```

<a id="Prop.marginBottom"></a>

```vertex
case marginBottom
```

<a id="Prop.marginLeft"></a>

```vertex
case marginLeft
```

<a id="Prop.paddingTop"></a>

```vertex
case paddingTop
```

<a id="Prop.paddingRight"></a>

```vertex
case paddingRight
```

<a id="Prop.paddingBottom"></a>

```vertex
case paddingBottom
```

<a id="Prop.paddingLeft"></a>

```vertex
case paddingLeft
```

<a id="Prop.borderTopWidth"></a>

```vertex
case borderTopWidth
```

<a id="Prop.borderRightWidth"></a>

```vertex
case borderRightWidth
```

<a id="Prop.borderBottomWidth"></a>

```vertex
case borderBottomWidth
```

<a id="Prop.borderLeftWidth"></a>

```vertex
case borderLeftWidth
```

<a id="Prop.borderTopStyle"></a>

```vertex
case borderTopStyle
```

<a id="Prop.borderRightStyle"></a>

```vertex
case borderRightStyle
```

<a id="Prop.borderBottomStyle"></a>

```vertex
case borderBottomStyle
```

<a id="Prop.borderLeftStyle"></a>

```vertex
case borderLeftStyle
```

<a id="Prop.borderTopColor"></a>

```vertex
case borderTopColor
```

<a id="Prop.borderRightColor"></a>

```vertex
case borderRightColor
```

<a id="Prop.borderBottomColor"></a>

```vertex
case borderBottomColor
```

<a id="Prop.borderLeftColor"></a>

```vertex
case borderLeftColor
```

<a id="Prop.borderTopLeftRadius"></a>

```vertex
case borderTopLeftRadius
```

<a id="Prop.borderTopRightRadius"></a>

```vertex
case borderTopRightRadius
```

<a id="Prop.borderBottomRightRadius"></a>

```vertex
case borderBottomRightRadius
```

<a id="Prop.borderBottomLeftRadius"></a>

```vertex
case borderBottomLeftRadius
```

<a id="Prop.backgroundColor"></a>

```vertex
case backgroundColor
```

<a id="Prop.backgroundImage"></a>

```vertex
case backgroundImage
```

<a id="Prop.backgroundRepeat"></a>

```vertex
case backgroundRepeat
```

<a id="Prop.backgroundSize"></a>

```vertex
case backgroundSize
```

<a id="Prop.backgroundPosition"></a>

```vertex
case backgroundPosition
```

<a id="Prop.opacity"></a>

```vertex
case opacity
```

<a id="Prop.overflowX"></a>

```vertex
case overflowX
```

<a id="Prop.overflowY"></a>

```vertex
case overflowY
```

<a id="Prop.boxShadow"></a>

```vertex
case boxShadow
```

<a id="Prop.filter"></a>

```vertex
case filter
```

<a id="Prop.outlineWidth"></a>

```vertex
case outlineWidth
```

<a id="Prop.outlineColor"></a>

```vertex
case outlineColor
```

<a id="Prop.verticalAlign"></a>

```vertex
case verticalAlign
```

<a id="Prop.textDecorationLine"></a>

```vertex
case textDecorationLine
```

<a id="Prop.textDecorationColor"></a>

```vertex
case textDecorationColor
```

<a id="Prop.flexDirection"></a>

```vertex
case flexDirection
```

<a id="Prop.flexWrap"></a>

```vertex
case flexWrap
```

<a id="Prop.justifyContent"></a>

```vertex
case justifyContent
```

<a id="Prop.alignItems"></a>

```vertex
case alignItems
```

<a id="Prop.alignSelf"></a>

```vertex
case alignSelf
```

<a id="Prop.alignContent"></a>

```vertex
case alignContent
```

<a id="Prop.flexGrow"></a>

```vertex
case flexGrow
```

<a id="Prop.flexShrink"></a>

```vertex
case flexShrink
```

<a id="Prop.flexBasis"></a>

```vertex
case flexBasis
```

<a id="Prop.order"></a>

```vertex
case order
```

<a id="Prop.rowGap"></a>

```vertex
case rowGap
```

<a id="Prop.columnGap"></a>

```vertex
case columnGap
```

<a id="Prop.tableLayout"></a>

```vertex
case tableLayout
```

<a id="Prop.gridTemplateColumns"></a>

```vertex
case gridTemplateColumns
```

<a id="Prop.gridTemplateRows"></a>

```vertex
case gridTemplateRows
```

<a id="Prop.gridAutoRows"></a>

```vertex
case gridAutoRows
```

<a id="Prop.gridColumnStart"></a>

```vertex
case gridColumnStart
```

<a id="Prop.gridColumnEnd"></a>

```vertex
case gridColumnEnd
```

<a id="Prop.gridRowStart"></a>

```vertex
case gridRowStart
```

<a id="Prop.gridRowEnd"></a>

```vertex
case gridRowEnd
```

<a id="Prop.gridAutoColumns"></a>

```vertex
case gridAutoColumns
```

<a id="Prop.gridAutoFlow"></a>

```vertex
case gridAutoFlow
```

<a id="Prop.aspectRatio"></a>

```vertex
case aspectRatio
```

<a id="Prop.gridColumn"></a>

```vertex
case gridColumn
```

<a id="Prop.gridRow"></a>

```vertex
case gridRow
```

<a id="Prop.color"></a>

```vertex
case color
```

<a id="Prop.fontFamily"></a>

```vertex
case fontFamily
```

<a id="Prop.fontSize"></a>

```vertex
case fontSize
```

<a id="Prop.fontWeight"></a>

```vertex
case fontWeight
```

<a id="Prop.fontStyle"></a>

```vertex
case fontStyle
```

<a id="Prop.lineHeight"></a>

```vertex
case lineHeight
```

<a id="Prop.textAlign"></a>

```vertex
case textAlign
```

<a id="Prop.textTransform"></a>

```vertex
case textTransform
```

<a id="Prop.textIndent"></a>

```vertex
case textIndent
```

<a id="Prop.letterSpacing"></a>

```vertex
case letterSpacing
```

<a id="Prop.wordSpacing"></a>

```vertex
case wordSpacing
```

<a id="Prop.whiteSpace"></a>

```vertex
case whiteSpace
```

<a id="Prop.overflowWrap"></a>

```vertex
case overflowWrap
```

<a id="Prop.wordBreak"></a>

```vertex
case wordBreak
```

<a id="Prop.textOverflow"></a>

```vertex
case textOverflow
```

<a id="Prop.listStyleType"></a>

```vertex
case listStyleType
```

<a id="Prop.listStylePosition"></a>

```vertex
case listStylePosition
```

<a id="Prop.cursor"></a>

```vertex
case cursor
```

<a id="Prop.visibility"></a>

```vertex
case visibility
```

<a id="Prop.borderCollapse"></a>

```vertex
case borderCollapse
```

<a id="Prop.borderSpacing"></a>

```vertex
case borderSpacing
```

<a id="Prop.tabSize"></a>

```vertex
case tabSize
```

<a id="Prop.content"></a>

```vertex
case content
```

<a id="Prop.fill"></a>

```vertex
case fill
```

### struct Rule <a id="struct-Rule"></a>

```vertex
public struct Rule
```

A standard CSS rule with a list of selectors and declarations.

#### Initializers

<a id="Rule.init"></a>

```vertex
public init(selectors: [string], declarations: [Declaration])
```

#### Properties

<a id="Rule.Selectors"></a>

```vertex
public var Selectors: [string]
```

<a id="Rule.Declarations"></a>

```vertex
public var Declarations: [Declaration]
```

<a id="Rule.Position"></a>

```vertex
public var Position: int = 0
```

Where the rule stands among the rules and at-rules of its sheet,
in source order: a sheet keeps the two apart, and the cascade
needs them in the order they were written.

#### Methods

<a id="Rule.GetDeclaration"></a>

```vertex
public func GetDeclaration(_ property: string) -> Declaration?
```

Looks up a declaration for a specific property name.

### class Scanner <a id="class-Scanner"></a>

```vertex
public class Scanner
```

Tokenizer that scans CSS source bytes into a CSS Token stream, as CSS
Syntax Level 3 tokenizes: numbers with their sign, unit or percent
sign; identifiers that may start with `-`; functions with their
paren; `url()` whole; strings with their escapes.

#### Initializers

<a id="Scanner.init"></a>

```vertex
public init(bytes: [uint8])
```

<a id="Scanner.init-2"></a>

```vertex
public init(source: string)
```

#### Methods

<a id="Scanner.Next"></a>

```vertex
public func Next() -> Token
```

Fetches the next token from the CSS stream.

### struct ShadowValue <a id="struct-ShadowValue"></a>

```vertex
public struct ShadowValue
```

A box-shadow before its lengths are resolved.

#### Properties

<a id="ShadowValue.X"></a>

```vertex
public var X: Value
```

<a id="ShadowValue.Y"></a>

```vertex
public var Y: Value
```

<a id="ShadowValue.Blur"></a>

```vertex
public var Blur: Value
```

<a id="ShadowValue.Spread"></a>

```vertex
public var Spread: Value
```

<a id="ShadowValue.Color"></a>

```vertex
public var Color: draw.Color?
```

<a id="ShadowValue.Inset"></a>

```vertex
public var Inset: bool
```

### class StyleSheet <a id="class-StyleSheet"></a>

```vertex
public class StyleSheet
```

A parsed CSS stylesheet containing rules and at-rules.

#### Initializers

<a id="StyleSheet.init"></a>

```vertex
public init(rules: [Rule] = [], atRules: [AtRule] = [])
```

#### Properties

<a id="StyleSheet.Rules"></a>

```vertex
public var Rules: [Rule]
```

<a id="StyleSheet.AtRules"></a>

```vertex
public var AtRules: [AtRule]
```

### struct Token <a id="struct-Token"></a>

```vertex
public struct Token
```

A CSS token emitted by the scanner.

#### Initializers

<a id="Token.init"></a>

```vertex
public init(kind: TokenKind, value: string = "", unit: string = "", numberVal: float32 = 0.0, spaceBefore: bool = false)
```

#### Properties

<a id="Token.Kind"></a>

```vertex
public var Kind: TokenKind
```

<a id="Token.Value"></a>

```vertex
public var Value: string
```

<a id="Token.Unit"></a>

```vertex
public var Unit: string
```

<a id="Token.NumberVal"></a>

```vertex
public var NumberVal: float32
```

<a id="Token.SpaceBefore"></a>

```vertex
public var SpaceBefore: bool
```

Whether whitespace or a comment came before it: what separates
`a b` from `ab` and `1px 2px` from `1px2px`.

### enum TokenKind <a id="enum-TokenKind"></a>

```vertex
public enum TokenKind: Equatable
```

The kind of CSS token produced by the scanner.

#### Cases

<a id="TokenKind.eof"></a>

```vertex
case eof
```

<a id="TokenKind.ident"></a>

```vertex
case ident
```

<a id="TokenKind.function"></a>

```vertex
case function
```

An identifier followed by `(`: `rgb(`, `calc(`. The value is the
name; the arguments follow as tokens up to the closing paren.

<a id="TokenKind.url"></a>

```vertex
case url
```

`url(...)` with an unquoted argument; the value is the URL.

<a id="TokenKind.hash"></a>

```vertex
case hash
```

<a id="TokenKind.string"></a>

```vertex
case string
```

<a id="TokenKind.number"></a>

```vertex
case number
```

<a id="TokenKind.dimension"></a>

```vertex
case dimension
```

<a id="TokenKind.percentage"></a>

```vertex
case percentage
```

<a id="TokenKind.colon"></a>

```vertex
case colon
```

<a id="TokenKind.semicolon"></a>

```vertex
case semicolon
```

<a id="TokenKind.comma"></a>

```vertex
case comma
```

<a id="TokenKind.openBrace"></a>

```vertex
case openBrace
```

<a id="TokenKind.closeBrace"></a>

```vertex
case closeBrace
```

<a id="TokenKind.openParen"></a>

```vertex
case openParen
```

<a id="TokenKind.closeParen"></a>

```vertex
case closeParen
```

<a id="TokenKind.openBracket"></a>

```vertex
case openBracket
```

<a id="TokenKind.closeBracket"></a>

```vertex
case closeBracket
```

<a id="TokenKind.atKeyword"></a>

```vertex
case atKeyword
```

<a id="TokenKind.delim"></a>

```vertex
case delim
```

### enum Unit <a id="enum-Unit"></a>

```vertex
public enum Unit: Equatable
```

A unit a length was written in.

#### Cases

<a id="Unit.px"></a>

```vertex
case px
```

<a id="Unit.em"></a>

```vertex
case em
```

<a id="Unit.rem"></a>

```vertex
case rem
```

<a id="Unit.ex"></a>

```vertex
case ex
```

<a id="Unit.ch"></a>

```vertex
case ch
```

<a id="Unit.vw"></a>

```vertex
case vw
```

<a id="Unit.vh"></a>

```vertex
case vh
```

<a id="Unit.vmin"></a>

```vertex
case vmin
```

<a id="Unit.vmax"></a>

```vertex
case vmax
```

<a id="Unit.percent"></a>

```vertex
case percent
```

### enum Value <a id="enum-Value"></a>

```vertex
public enum Value
```

A declaration's value as parsed: typed, but with lengths still in
their units, since em and rem depend on the element it lands on.

#### Cases

<a id="Value.auto"></a>

```vertex
case auto
```

<a id="Value.none"></a>

```vertex
case none
```

<a id="Value.normal"></a>

```vertex
case normal
```

<a id="Value.length"></a>

```vertex
case length(float32, Unit)
```

<a id="Value.calc"></a>

```vertex
case calc([CalcTerm])
```

calc(): terms in their units, summed at apply time.

<a id="Value.number"></a>

```vertex
case number(float32)
```

<a id="Value.keyword"></a>

```vertex
case keyword(string)
```

<a id="Value.color"></a>

```vertex
case color(draw.Color)
```

<a id="Value.currentColor"></a>

```vertex
case currentColor
```

<a id="Value.string"></a>

```vertex
case string(string)
```

<a id="Value.families"></a>

```vertex
case families([string])
```

<a id="Value.url"></a>

```vertex
case url(string)
```

<a id="Value.gradient"></a>

```vertex
case gradient(draw.LinearGradient)
```

<a id="Value.shadows"></a>

```vertex
case shadows([ShadowValue])
```

<a id="Value.tracks"></a>

```vertex
case tracks([GridTrack])
```

<a id="Value.placement"></a>

```vertex
case placement(GridPlacement)
```

<a id="Value.inherit"></a>

```vertex
case inherit
```

<a id="Value.initial"></a>

```vertex
case initial
```

## Files

- audit.vs
- color.vs
- css.vs
- declaration.vs
- names.vs
- parser.vs
- properties.vs
- rule.vs
- scanner.vs
- token.vs
- util.vs
- values.vs
