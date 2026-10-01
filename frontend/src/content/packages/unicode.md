# package unicode

```vertex
import "unicode"
```

Package unicode is the Unicode Character Database's properties of code
points: general category, the binary properties (White_Space,
Alphabetic, ID_Start, ...), scripts, and case mapping and folding.

A code point is a uint32 from 0 to 0x10FFFF. The tables are generated
from the UCD files in ucd/ by cmd/gen; Version says which Unicode.

The encodings live beside it: unicode/utf8 and unicode/utf16.

## Index

- [Constants](#constants)
- [Variables](#variables)
- [`func CaseFold(_ cp: uint32) -> uint32`](#func-CaseFold)
- [`func CaseFoldMapping(_ cp: uint32) -> [uint32]`](#func-CaseFoldMapping)
- [`func CaseFolded(_ cps: [uint32]) -> [uint32]`](#func-CaseFolded)
- [`func CaseFoldedString(_ s: string) -> string`](#func-CaseFoldedString)
- [`func Category(_ cp: uint32) -> GeneralCategory`](#func-Category)
- [`func CategoryAbbreviation(_ name: string) -> string?`](#func-CategoryAbbreviation)
- [`func CategoryRanges(_ name: string) -> PropertySet?`](#func-CategoryRanges)
- [`func EqualFold(_ a: string, _ b: string) -> bool`](#func-EqualFold)
- [`func IsAlphabetic(_ cp: uint32) -> bool`](#func-IsAlphabetic)
- [`func IsAssigned(_ cp: uint32) -> bool`](#func-IsAssigned)
- [`func IsCaseIgnorable(_ cp: uint32) -> bool`](#func-IsCaseIgnorable)
- [`func IsCased(_ cp: uint32) -> bool`](#func-IsCased)
- [`func IsControl(_ cp: uint32) -> bool`](#func-IsControl)
- [`func IsDigit(_ cp: uint32) -> bool`](#func-IsDigit)
- [`func IsIDContinue(_ cp: uint32) -> bool`](#func-IsIDContinue)
- [`func IsIDStart(_ cp: uint32) -> bool`](#func-IsIDStart)
- [`func IsLetter(_ cp: uint32) -> bool`](#func-IsLetter)
- [`func IsLowercase(_ cp: uint32) -> bool`](#func-IsLowercase)
- [`func IsMark(_ cp: uint32) -> bool`](#func-IsMark)
- [`func IsNumber(_ cp: uint32) -> bool`](#func-IsNumber)
- [`func IsPunctuation(_ cp: uint32) -> bool`](#func-IsPunctuation)
- [`func IsSeparator(_ cp: uint32) -> bool`](#func-IsSeparator)
- [`func IsSurrogate(_ cp: uint32) -> bool`](#func-IsSurrogate)
- [`func IsSymbol(_ cp: uint32) -> bool`](#func-IsSymbol)
- [`func IsUppercase(_ cp: uint32) -> bool`](#func-IsUppercase)
- [`func IsValid(_ cp: uint32) -> bool`](#func-IsValid)
- [`func IsWhitespace(_ cp: uint32) -> bool`](#func-IsWhitespace)
- [`func LowercaseMapping(_ cp: uint32) -> [uint32]`](#func-LowercaseMapping)
- [`func Lowercased(_ cps: [uint32]) -> [uint32]`](#func-Lowercased)
- [`func LowercasedString(_ s: string) -> string`](#func-LowercasedString)
- [`func Property(_ name: string) -> PropertySet?`](#func-Property)
- [`func Script(_ cp: uint32) -> string`](#func-Script)
- [`func ScriptExtensions(_ cp: uint32) -> [string]`](#func-ScriptExtensions)
- [`func ScriptName(_ name: string) -> string?`](#func-ScriptName)
- [`func ScriptRanges(_ name: string, extensions: bool = false) -> PropertySet`](#func-ScriptRanges)
- [`func TitlecaseMapping(_ cp: uint32) -> [uint32]`](#func-TitlecaseMapping)
- [`func ToLower(_ cp: uint32) -> uint32`](#func-ToLower)
- [`func ToTitle(_ cp: uint32) -> uint32`](#func-ToTitle)
- [`func ToUpper(_ cp: uint32) -> uint32`](#func-ToUpper)
- [`func UppercaseMapping(_ cp: uint32) -> [uint32]`](#func-UppercaseMapping)
- [`func Uppercased(_ cps: [uint32]) -> [uint32]`](#func-Uppercased)
- [`func UppercasedString(_ s: string) -> string`](#func-UppercasedString)
- [`enum GeneralCategory: Equatable`](#enum-GeneralCategory)
  - [`var Abbreviation: string { get }`](#GeneralCategory.Abbreviation)
  - [`var Index: int { get }`](#GeneralCategory.Index)
  - [`static func FromIndex(_ i: int) -> GeneralCategory`](#GeneralCategory.FromIndex)
- [`struct PropertySet`](#struct-PropertySet)
  - [`init(ranges: [uint32])`](#PropertySet.init)
  - [`let Ranges: [uint32]`](#PropertySet.Ranges)
  - [`func Contains(_ cp: uint32) -> bool`](#PropertySet.Contains)

## Constants

<a id="let-MaxCodePoint"></a>

```vertex
public let MaxCodePoint: uint32 = 0x10FFFF
```

MaxCodePoint is the largest code point, U+10FFFF.

<a id="let-ReplacementCharacter"></a>

```vertex
public let ReplacementCharacter: uint32 = 0xFFFD
```

ReplacementCharacter is U+FFFD, what malformed input decodes to.

<a id="let-Version"></a>

```vertex
public let Version = "17.0.0"
```

Version is the version of the Unicode Standard the tables follow.

## Variables

<a id="var-PropertyNames"></a>

```vertex
public var PropertyNames: [string] { get }
```

PropertyNames lists the binary properties Property knows.

## Functions

### func CaseFold <a id="func-CaseFold"></a>

```vertex
public func CaseFold(_ cp: uint32) -> uint32
```

CaseFold is cp's simple case folding: the one code point that stands
for its case-insensitive class.

### func CaseFoldMapping <a id="func-CaseFoldMapping"></a>

```vertex
public func CaseFoldMapping(_ cp: uint32) -> [uint32]
```

CaseFoldMapping is cp's full case folding.

### func CaseFolded <a id="func-CaseFolded"></a>

```vertex
public func CaseFolded(_ cps: [uint32]) -> [uint32]
```

CaseFolded applies full case folding to text.

### func CaseFoldedString <a id="func-CaseFoldedString"></a>

```vertex
public func CaseFoldedString(_ s: string) -> string
```

### func Category <a id="func-Category"></a>

```vertex
public func Category(_ cp: uint32) -> GeneralCategory
```

Category is cp's General_Category.

### func CategoryAbbreviation <a id="func-CategoryAbbreviation"></a>

```vertex
public func CategoryAbbreviation(_ name: string) -> string?
```

CategoryAbbreviation resolves a general category's or group's name
("Letter", "Lu", "Uppercase_Letter", "digit") to its abbreviation, or nil.

### func CategoryRanges <a id="func-CategoryRanges"></a>

```vertex
public func CategoryRanges(_ name: string) -> PropertySet?
```

CategoryRanges is the set of code points in a general category, or in
a group of them (L, M, N, P, S, Z, C, or LC), by any of its names.

### func EqualFold <a id="func-EqualFold"></a>

```vertex
public func EqualFold(_ a: string, _ b: string) -> bool
```

EqualFold says whether two strings are equal under simple case folding.

### func IsAlphabetic <a id="func-IsAlphabetic"></a>

```vertex
public func IsAlphabetic(_ cp: uint32) -> bool
```

IsAlphabetic is the Alphabetic property: letters, and marks and
numbers that behave as letters.

### func IsAssigned <a id="func-IsAssigned"></a>

```vertex
public func IsAssigned(_ cp: uint32) -> bool
```

IsAssigned: anything but Cn.

### func IsCaseIgnorable <a id="func-IsCaseIgnorable"></a>

```vertex
public func IsCaseIgnorable(_ cp: uint32) -> bool
```

IsCaseIgnorable is the Case_Ignorable property.

### func IsCased <a id="func-IsCased"></a>

```vertex
public func IsCased(_ cp: uint32) -> bool
```

IsCased is the Cased property.

### func IsControl <a id="func-IsControl"></a>

```vertex
public func IsControl(_ cp: uint32) -> bool
```

IsControl: Cc.

### func IsDigit <a id="func-IsDigit"></a>

```vertex
public func IsDigit(_ cp: uint32) -> bool
```

IsDigit: Nd, a decimal digit in any script.

### func IsIDContinue <a id="func-IsIDContinue"></a>

```vertex
public func IsIDContinue(_ cp: uint32) -> bool
```

IsIDContinue is ID_Continue (UAX #31): what may follow in one.

### func IsIDStart <a id="func-IsIDStart"></a>

```vertex
public func IsIDStart(_ cp: uint32) -> bool
```

IsIDStart is ID_Start (UAX #31): what may begin an identifier.

### func IsLetter <a id="func-IsLetter"></a>

```vertex
public func IsLetter(_ cp: uint32) -> bool
```

IsLetter: L (Lu, Ll, Lt, Lm, Lo).

### func IsLowercase <a id="func-IsLowercase"></a>

```vertex
public func IsLowercase(_ cp: uint32) -> bool
```

IsLowercase is the Lowercase property (Ll and Other_Lowercase).

### func IsMark <a id="func-IsMark"></a>

```vertex
public func IsMark(_ cp: uint32) -> bool
```

IsMark: M (Mn, Mc, Me).

### func IsNumber <a id="func-IsNumber"></a>

```vertex
public func IsNumber(_ cp: uint32) -> bool
```

IsNumber: N (Nd, Nl, No).

### func IsPunctuation <a id="func-IsPunctuation"></a>

```vertex
public func IsPunctuation(_ cp: uint32) -> bool
```

IsPunctuation: P (Pc, Pd, Ps, Pe, Pi, Pf, Po).

### func IsSeparator <a id="func-IsSeparator"></a>

```vertex
public func IsSeparator(_ cp: uint32) -> bool
```

IsSeparator: Z (Zs, Zl, Zp).

### func IsSurrogate <a id="func-IsSurrogate"></a>

```vertex
public func IsSurrogate(_ cp: uint32) -> bool
```

IsSurrogate says whether cp is in U+D800...U+DFFF, the range UTF-16
reserves for pairs.

### func IsSymbol <a id="func-IsSymbol"></a>

```vertex
public func IsSymbol(_ cp: uint32) -> bool
```

IsSymbol: S (Sm, Sc, Sk, So).

### func IsUppercase <a id="func-IsUppercase"></a>

```vertex
public func IsUppercase(_ cp: uint32) -> bool
```

IsUppercase is the Uppercase property (Lu and Other_Uppercase).

### func IsValid <a id="func-IsValid"></a>

```vertex
public func IsValid(_ cp: uint32) -> bool
```

IsValid says whether cp is a code point that can be encoded: in range
and not a surrogate.

### func IsWhitespace <a id="func-IsWhitespace"></a>

```vertex
public func IsWhitespace(_ cp: uint32) -> bool
```

IsWhitespace is the White_Space property.

### func LowercaseMapping <a id="func-LowercaseMapping"></a>

```vertex
public func LowercaseMapping(_ cp: uint32) -> [uint32]
```

LowercaseMapping is cp's full lowercase mapping, without the
context-dependent Final_Sigma rule (Lowercased applies it).

### func Lowercased <a id="func-Lowercased"></a>

```vertex
public func Lowercased(_ cps: [uint32]) -> [uint32]
```

Lowercased applies the full lowercase mapping to text, with the
Final_Sigma rule: Σ becomes ς at the end of a word.

### func LowercasedString <a id="func-LowercasedString"></a>

```vertex
public func LowercasedString(_ s: string) -> string
```

### func Property <a id="func-Property"></a>

```vertex
public func Property(_ name: string) -> PropertySet?
```

Property is the set for a binary property by any of its names: long
("White_Space"), short ("WSpace") or other alias ("space"). Nil if
there is no such binary property.

### func Script <a id="func-Script"></a>

```vertex
public func Script(_ cp: uint32) -> string
```

Script is cp's Script property, by its long name ("Latin", "Greek",
"Common", "Unknown").

### func ScriptExtensions <a id="func-ScriptExtensions"></a>

```vertex
public func ScriptExtensions(_ cp: uint32) -> [string]
```

ScriptExtensions is cp's Script_Extensions, as long names: the scripts
a shared character is used with.

### func ScriptName <a id="func-ScriptName"></a>

```vertex
public func ScriptName(_ name: string) -> string?
```

ScriptName resolves a script's long or short name ("Greek" or "Grek")
to its long name, or nil.

### func ScriptRanges <a id="func-ScriptRanges"></a>

```vertex
public func ScriptRanges(_ name: string, extensions: bool = false) -> PropertySet
```

ScriptRanges is the set of code points of one script (by long name),
or with extensions, the ones whose Script_Extensions include it.

### func TitlecaseMapping <a id="func-TitlecaseMapping"></a>

```vertex
public func TitlecaseMapping(_ cp: uint32) -> [uint32]
```

TitlecaseMapping is cp's full titlecase mapping.

### func ToLower <a id="func-ToLower"></a>

```vertex
public func ToLower(_ cp: uint32) -> uint32
```

ToLower is cp's simple lowercase mapping.

### func ToTitle <a id="func-ToTitle"></a>

```vertex
public func ToTitle(_ cp: uint32) -> uint32
```

ToTitle is cp's simple titlecase mapping.

### func ToUpper <a id="func-ToUpper"></a>

```vertex
public func ToUpper(_ cp: uint32) -> uint32
```

ToUpper is cp's simple uppercase mapping.

### func UppercaseMapping <a id="func-UppercaseMapping"></a>

```vertex
public func UppercaseMapping(_ cp: uint32) -> [uint32]
```

UppercaseMapping is cp's full uppercase mapping, which may be more
than one code point.

### func Uppercased <a id="func-Uppercased"></a>

```vertex
public func Uppercased(_ cps: [uint32]) -> [uint32]
```

Uppercased applies the full uppercase mapping to text.

### func UppercasedString <a id="func-UppercasedString"></a>

```vertex
public func UppercasedString(_ s: string) -> string
```

UppercasedString, LowercasedString and CaseFoldedString are the text
forms for Vertex strings.

## Types

### enum GeneralCategory <a id="enum-GeneralCategory"></a>

```vertex
public enum GeneralCategory: Equatable
```

GeneralCategory is a code point's General_Category (UAX #44).

#### Cases

<a id="GeneralCategory.unassigned"></a>

```vertex
case unassigned
```

<a id="GeneralCategory.uppercaseLetter"></a>

```vertex
case uppercaseLetter
```

Cn

<a id="GeneralCategory.lowercaseLetter"></a>

```vertex
case lowercaseLetter
```

Lu

<a id="GeneralCategory.titlecaseLetter"></a>

```vertex
case titlecaseLetter
```

Ll

<a id="GeneralCategory.modifierLetter"></a>

```vertex
case modifierLetter
```

Lt

<a id="GeneralCategory.otherLetter"></a>

```vertex
case otherLetter
```

Lm

<a id="GeneralCategory.nonspacingMark"></a>

```vertex
case nonspacingMark
```

Lo

<a id="GeneralCategory.spacingMark"></a>

```vertex
case spacingMark
```

Mn

<a id="GeneralCategory.enclosingMark"></a>

```vertex
case enclosingMark
```

Mc

<a id="GeneralCategory.decimalNumber"></a>

```vertex
case decimalNumber
```

Me

<a id="GeneralCategory.letterNumber"></a>

```vertex
case letterNumber
```

Nd

<a id="GeneralCategory.otherNumber"></a>

```vertex
case otherNumber
```

Nl

<a id="GeneralCategory.connectorPunctuation"></a>

```vertex
case connectorPunctuation
```

No

<a id="GeneralCategory.dashPunctuation"></a>

```vertex
case dashPunctuation
```

Pc

<a id="GeneralCategory.openPunctuation"></a>

```vertex
case openPunctuation
```

Pd

<a id="GeneralCategory.closePunctuation"></a>

```vertex
case closePunctuation
```

Ps

<a id="GeneralCategory.initialPunctuation"></a>

```vertex
case initialPunctuation
```

Pe

<a id="GeneralCategory.finalPunctuation"></a>

```vertex
case finalPunctuation
```

Pi

<a id="GeneralCategory.otherPunctuation"></a>

```vertex
case otherPunctuation
```

Pf

<a id="GeneralCategory.mathSymbol"></a>

```vertex
case mathSymbol
```

Po

<a id="GeneralCategory.currencySymbol"></a>

```vertex
case currencySymbol
```

Sm

<a id="GeneralCategory.modifierSymbol"></a>

```vertex
case modifierSymbol
```

Sc

<a id="GeneralCategory.otherSymbol"></a>

```vertex
case otherSymbol
```

Sk

<a id="GeneralCategory.spaceSeparator"></a>

```vertex
case spaceSeparator
```

So

<a id="GeneralCategory.lineSeparator"></a>

```vertex
case lineSeparator
```

Zs

<a id="GeneralCategory.paragraphSeparator"></a>

```vertex
case paragraphSeparator
```

Zl

<a id="GeneralCategory.control"></a>

```vertex
case control
```

Zp

<a id="GeneralCategory.format"></a>

```vertex
case format
```

Cc

<a id="GeneralCategory.surrogate"></a>

```vertex
case surrogate
```

Cf

<a id="GeneralCategory.privateUse"></a>

```vertex
case privateUse
```

Cs

#### Properties

<a id="GeneralCategory.Abbreviation"></a>

```vertex
public var Abbreviation: string { get }
```

Abbreviation is the two-letter short name, as in "Lu".

<a id="GeneralCategory.Index"></a>

```vertex
public var Index: int { get }
```

Index is the category's position in the generated tables.

#### Methods

<a id="GeneralCategory.FromIndex"></a>

```vertex
public static func FromIndex(_ i: int) -> GeneralCategory
```

FromIndex is the category at a table index.

### struct PropertySet <a id="struct-PropertySet"></a>

```vertex
public struct PropertySet
```

PropertySet is the code points that have one binary property, as
sorted ranges.

#### Initializers

<a id="PropertySet.init"></a>

```vertex
public init(ranges: [uint32])
```

#### Properties

<a id="PropertySet.Ranges"></a>

```vertex
public let Ranges: [uint32]
```

Ranges is flat [first, last, first, last, ...], ascending.

#### Methods

<a id="PropertySet.Contains"></a>

```vertex
public func Contains(_ cp: uint32) -> bool
```

Contains says whether cp has the property.

## Files

- case.vs
- tables.vs
- unicode.vs
