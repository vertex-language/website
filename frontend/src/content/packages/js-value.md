# package value

```vertex
import "js/value"
```

Package value is the engine's primitive layer: symbols, property keys,
BigInts, and the conversions between numbers and strings that the
language defines exactly (ECMA-262 §6.1, §7.1).

The Value type itself lives in js/object beside JSObject, so that an
object held in a Value needs no downcast.

## Index

- [Constants](#constants)
- [`func ArrayIndex(_ s: str.JSString) -> uint32?`](#func-ArrayIndex)
- [`func DoubleToInt32(_ d: float64) -> int32`](#func-DoubleToInt32)
- [`func DoubleToUint32(_ d: float64) -> uint32`](#func-DoubleToUint32)
- [`func IsIntegral(_ d: float64) -> bool`](#func-IsIntegral)
- [`func NumberToJSString(_ x: float64) -> str.JSString`](#func-NumberToJSString)
- [`func NumberToRadixString(_ value: float64, _ radix: int) -> string`](#func-NumberToRadixString)
- [`func NumberToString(_ x: float64) -> string`](#func-NumberToString)
- [`func ParseFloat(_ s: str.JSString) -> float64`](#func-ParseFloat)
- [`func ParseInt(_ s: str.JSString, _ radixIn: int) -> float64`](#func-ParseInt)
- [`func StringToNumber(_ s: str.JSString) -> float64`](#func-StringToNumber)
- [`func ToExponential(_ x: float64, _ f: int) -> string`](#func-ToExponential)
- [`func ToFixed(_ x: float64, _ f: int) -> string`](#func-ToFixed)
- [`func ToIntegerOrInfinity(_ d: float64) -> float64`](#func-ToIntegerOrInfinity)
- [`func ToPrecision(_ x: float64, _ p: int) -> string`](#func-ToPrecision)
- [`func TrimSpace(_ u: [uint16]) -> [uint16]`](#func-TrimSpace)
- [`final class BigInt`](#class-BigInt)
  - [`init(_ i: big.Integer)`](#BigInt.init)
  - [`let I: big.Integer`](#BigInt.I)
  - [`static let Zero = BigInt(big.Integer())`](#BigInt.Zero)
  - [`static let One = BigInt(big.Integer(1))`](#BigInt.One)
  - [`var IsZero: bool { get }`](#BigInt.IsZero)
  - [`var Negative: bool { get }`](#BigInt.Negative)
  - [`var JSString: str.JSString { get }`](#BigInt.JSString)
  - [`static func FromInt(_ v: int64) -> BigInt`](#BigInt.FromInt)
  - [`static func FromDouble(_ d: float64) -> BigInt`](#BigInt.FromDouble)
  - [`static func Parse(_ text: string) -> BigInt?`](#BigInt.Parse)
  - [`static func ParseLiteral(_ text: string) -> BigInt`](#BigInt.ParseLiteral)
  - [`func ToString(_ radix: int = 10) -> string`](#BigInt.ToString)
  - [`func ToDouble() -> float64`](#BigInt.ToDouble)
  - [`static func Compare(_ a: BigInt, _ b: BigInt) -> int`](#BigInt.Compare)
  - [`static func Equal(_ a: BigInt, _ b: BigInt) -> bool`](#BigInt.Equal)
  - [`func Negate() -> BigInt`](#BigInt.Negate)
  - [`func BitNot() -> BigInt`](#BigInt.BitNot)
  - [`static func Add(_ a: BigInt, _ b: BigInt) -> BigInt`](#BigInt.Add)
  - [`static func Sub(_ a: BigInt, _ b: BigInt) -> BigInt`](#BigInt.Sub)
  - [`static func Mul(_ a: BigInt, _ b: BigInt) -> BigInt`](#BigInt.Mul)
  - [`static func Div(_ a: BigInt, _ b: BigInt) -> BigInt`](#BigInt.Div)
  - [`static func Rem(_ a: BigInt, _ b: BigInt) -> BigInt`](#BigInt.Rem)
  - [`static func Pow(_ a: BigInt, _ e: BigInt) -> BigInt`](#BigInt.Pow)
  - [`static func BitOp(_ a: BigInt, _ b: BigInt, _ op: int) -> BigInt`](#BigInt.BitOp)
  - [`static func ShiftLeft(_ a: BigInt, _ n: int) -> BigInt`](#BigInt.ShiftLeft)
  - [`static func AsUintN(_ bits: int, _ a: BigInt) -> BigInt`](#BigInt.AsUintN)
  - [`static func AsIntN(_ bits: int, _ a: BigInt) -> BigInt`](#BigInt.AsIntN)
  - [`func ToInt64() -> int64`](#BigInt.ToInt64)
  - [`func ToUInt64() -> uint64`](#BigInt.ToUInt64)
- [`enum PropertyKey: Hashable`](#enum-PropertyKey)
  - [`var IsSymbol: bool { get }`](#PropertyKey.IsSymbol)
  - [`var IsPrivate: bool { get }`](#PropertyKey.IsPrivate)
  - [`var AsString: str.JSString { get }`](#PropertyKey.AsString)
  - [`var Debug: string { get }`](#PropertyKey.Debug)
  - [`static func ==(a: PropertyKey, b: PropertyKey) -> bool`](#PropertyKey.op61op61)
  - [`func hash(into hasher: inout Hasher)`](#PropertyKey.hash)
  - [`static func FromString(_ s: str.JSString) -> PropertyKey`](#PropertyKey.FromString)
  - [`static func Named(_ s: string) -> PropertyKey`](#PropertyKey.Named)
  - [`static func FromNumber(_ d: float64) -> PropertyKey`](#PropertyKey.FromNumber)
- [`final class Symbol: Hashable`](#class-Symbol)
  - [`init(_ description: str.JSString?, isPrivate: bool = false)`](#Symbol.init)
  - [`let Description: str.JSString?`](#Symbol.Description)
  - [`let ID: int`](#Symbol.ID)
  - [`let IsPrivate: bool`](#Symbol.IsPrivate)
  - [`var RegistryKey: str.JSString? = nil`](#Symbol.RegistryKey)
  - [`var DescriptiveString: string { get }`](#Symbol.DescriptiveString)
  - [`static func ==(a: Symbol, b: Symbol) -> bool`](#Symbol.op61op61)
  - [`func hash(into hasher: inout Hasher)`](#Symbol.hash)

## Constants

<a id="let-SymAsyncDispose"></a>

```vertex
public let SymAsyncDispose = Symbol(str.JSString.From("Symbol.asyncDispose"))
```

<a id="let-SymAsyncIterator"></a>

```vertex
public let SymAsyncIterator = Symbol(str.JSString.From("Symbol.asyncIterator"))
```

The well-known symbols (§6.1.5.1), shared by every realm.

<a id="let-SymDispose"></a>

```vertex
public let SymDispose = Symbol(str.JSString.From("Symbol.dispose"))
```

<a id="let-SymHasInstance"></a>

```vertex
public let SymHasInstance = Symbol(str.JSString.From("Symbol.hasInstance"))
```

<a id="let-SymIsConcatSpreadable"></a>

```vertex
public let SymIsConcatSpreadable = Symbol(str.JSString.From("Symbol.isConcatSpreadable"))
```

<a id="let-SymIterator"></a>

```vertex
public let SymIterator = Symbol(str.JSString.From("Symbol.iterator"))
```

<a id="let-SymMatch"></a>

```vertex
public let SymMatch = Symbol(str.JSString.From("Symbol.match"))
```

<a id="let-SymMatchAll"></a>

```vertex
public let SymMatchAll = Symbol(str.JSString.From("Symbol.matchAll"))
```

<a id="let-SymReplace"></a>

```vertex
public let SymReplace = Symbol(str.JSString.From("Symbol.replace"))
```

<a id="let-SymSearch"></a>

```vertex
public let SymSearch = Symbol(str.JSString.From("Symbol.search"))
```

<a id="let-SymSpecies"></a>

```vertex
public let SymSpecies = Symbol(str.JSString.From("Symbol.species"))
```

<a id="let-SymSplit"></a>

```vertex
public let SymSplit = Symbol(str.JSString.From("Symbol.split"))
```

<a id="let-SymToPrimitive"></a>

```vertex
public let SymToPrimitive = Symbol(str.JSString.From("Symbol.toPrimitive"))
```

<a id="let-SymToStringTag"></a>

```vertex
public let SymToStringTag = Symbol(str.JSString.From("Symbol.toStringTag"))
```

<a id="let-SymUnscopables"></a>

```vertex
public let SymUnscopables = Symbol(str.JSString.From("Symbol.unscopables"))
```

## Functions

### func ArrayIndex <a id="func-ArrayIndex"></a>

```vertex
public func ArrayIndex(_ s: str.JSString) -> uint32?
```

ArrayIndex parses a canonical array index: "0" or digits without a
leading zero, below 2^32 - 1.

### func DoubleToInt32 <a id="func-DoubleToInt32"></a>

```vertex
public func DoubleToInt32(_ d: float64) -> int32
```

ToInt32 wraps a double modulo 2^32 into the signed range.

### func DoubleToUint32 <a id="func-DoubleToUint32"></a>

```vertex
public func DoubleToUint32(_ d: float64) -> uint32
```

### func IsIntegral <a id="func-IsIntegral"></a>

```vertex
public func IsIntegral(_ d: float64) -> bool
```

IsIntegral says whether a double is an integer (Number.isInteger).

### func NumberToJSString <a id="func-NumberToJSString"></a>

```vertex
public func NumberToJSString(_ x: float64) -> str.JSString
```

NumberToJSString is NumberToString as a JSString.

### func NumberToRadixString <a id="func-NumberToRadixString"></a>

```vertex
public func NumberToRadixString(_ value: float64, _ radix: int) -> string
```

NumberToRadixString is Number.prototype.toString(radix) for radix != 10,
after V8's DoubleToRadixCString.

### func NumberToString <a id="func-NumberToString"></a>

```vertex
public func NumberToString(_ x: float64) -> string
```

NumberToString is Number::toString(x) in radix 10.

### func ParseFloat <a id="func-ParseFloat"></a>

```vertex
public func ParseFloat(_ s: str.JSString) -> float64
```

ParseFloat is the global parseFloat: the longest prefix that is a
StrDecimalLiteral.

### func ParseInt <a id="func-ParseInt"></a>

```vertex
public func ParseInt(_ s: str.JSString, _ radixIn: int) -> float64
```

ParseInt is the global parseInt.

### func StringToNumber <a id="func-StringToNumber"></a>

```vertex
public func StringToNumber(_ s: str.JSString) -> float64
```

StringToNumber converts a string by the StringNumericLiteral grammar:
NaN if it doesn't match.

### func ToExponential <a id="func-ToExponential"></a>

```vertex
public func ToExponential(_ x: float64, _ f: int) -> string
```

ToExponential is Number.prototype.toExponential; f < 0 means as many
digits as needed (the shortest form).

### func ToFixed <a id="func-ToFixed"></a>

```vertex
public func ToFixed(_ x: float64, _ f: int) -> string
```

ToFixed is Number.prototype.toFixed for 0 <= f <= 100, x finite and
below 1e21 in magnitude.

### func ToIntegerOrInfinity <a id="func-ToIntegerOrInfinity"></a>

```vertex
public func ToIntegerOrInfinity(_ d: float64) -> float64
```

ToIntegerOrInfinity (§7.1.5).

### func ToPrecision <a id="func-ToPrecision"></a>

```vertex
public func ToPrecision(_ x: float64, _ p: int) -> string
```

ToPrecision is Number.prototype.toPrecision for 1 <= p <= 100.

### func TrimSpace <a id="func-TrimSpace"></a>

```vertex
public func TrimSpace(_ u: [uint16]) -> [uint16]
```

TrimSpace removes leading and trailing WhiteSpace and line terminators.

## Types

### class BigInt <a id="class-BigInt"></a>

```vertex
public final class BigInt
```

BigInt is ECMAScript's BigInt (§6.1.6.2): an immutable
arbitrary-precision integer over math/big.Integer, with the operations
the language defines on it.

#### Initializers

<a id="BigInt.init"></a>

```vertex
public init(_ i: big.Integer)
```

#### Properties

<a id="BigInt.I"></a>

```vertex
public let I: big.Integer
```

<a id="BigInt.Zero"></a>

```vertex
public static let Zero = BigInt(big.Integer())
```

<a id="BigInt.One"></a>

```vertex
public static let One = BigInt(big.Integer(1))
```

<a id="BigInt.IsZero"></a>

```vertex
public var IsZero: bool { get }
```

<a id="BigInt.Negative"></a>

```vertex
public var Negative: bool { get }
```

<a id="BigInt.JSString"></a>

```vertex
public var JSString: str.JSString { get }
```

#### Methods

<a id="BigInt.FromInt"></a>

```vertex
public static func FromInt(_ v: int64) -> BigInt
```

<a id="BigInt.FromDouble"></a>

```vertex
public static func FromDouble(_ d: float64) -> BigInt
```

FromDouble converts an integral double exactly.

<a id="BigInt.Parse"></a>

```vertex
public static func Parse(_ text: string) -> BigInt?
```

Parse reads a StringIntegerLiteral (whitespace already trimmed):
decimal with an optional sign, or 0x, 0o and 0b without one; the
empty string is 0. Nil if it doesn't match.

<a id="BigInt.ParseLiteral"></a>

```vertex
public static func ParseLiteral(_ text: string) -> BigInt
```

ParseLiteral reads a BigInt literal's digits as the scanner wrote
them (with its 0x, 0o or 0b prefix).

<a id="BigInt.ToString"></a>

```vertex
public func ToString(_ radix: int = 10) -> string
```

<a id="BigInt.ToDouble"></a>

```vertex
public func ToDouble() -> float64
```

<a id="BigInt.Compare"></a>

```vertex
public static func Compare(_ a: BigInt, _ b: BigInt) -> int
```

<a id="BigInt.Equal"></a>

```vertex
public static func Equal(_ a: BigInt, _ b: BigInt) -> bool
```

<a id="BigInt.Negate"></a>

```vertex
public func Negate() -> BigInt
```

<a id="BigInt.BitNot"></a>

```vertex
public func BitNot() -> BigInt
```

<a id="BigInt.Add"></a>

```vertex
public static func Add(_ a: BigInt, _ b: BigInt) -> BigInt
```

<a id="BigInt.Sub"></a>

```vertex
public static func Sub(_ a: BigInt, _ b: BigInt) -> BigInt
```

<a id="BigInt.Mul"></a>

```vertex
public static func Mul(_ a: BigInt, _ b: BigInt) -> BigInt
```

<a id="BigInt.Div"></a>

```vertex
public static func Div(_ a: BigInt, _ b: BigInt) -> BigInt
```

Div truncates toward zero; b must not be zero.

<a id="BigInt.Rem"></a>

```vertex
public static func Rem(_ a: BigInt, _ b: BigInt) -> BigInt
```

Rem takes a's sign; b must not be zero.

<a id="BigInt.Pow"></a>

```vertex
public static func Pow(_ a: BigInt, _ e: BigInt) -> BigInt
```

Pow raises to a non-negative exponent that fits an int.

<a id="BigInt.BitOp"></a>

```vertex
public static func BitOp(_ a: BigInt, _ b: BigInt, _ op: int) -> BigInt
```

BitOp is & (0), | (1) or ^ (2) on two's complement.

<a id="BigInt.ShiftLeft"></a>

```vertex
public static func ShiftLeft(_ a: BigInt, _ n: int) -> BigInt
```

ShiftLeft shifts by a signed amount; negative shifts right, rounding
toward negative infinity.

<a id="BigInt.AsUintN"></a>

```vertex
public static func AsUintN(_ bits: int, _ a: BigInt) -> BigInt
```

<a id="BigInt.AsIntN"></a>

```vertex
public static func AsIntN(_ bits: int, _ a: BigInt) -> BigInt
```

<a id="BigInt.ToInt64"></a>

```vertex
public func ToInt64() -> int64
```

ToInt64 wraps modulo 2^64 (BigInt64Array's conversion).

<a id="BigInt.ToUInt64"></a>

```vertex
public func ToUInt64() -> uint64
```

### enum PropertyKey <a id="enum-PropertyKey"></a>

```vertex
public enum PropertyKey: Hashable
```

PropertyKey is a property's name: an array index, a string, or a
symbol. A string that is a canonical array index is always stored as
.index, so the two spellings of one key are one key.

#### Cases

<a id="PropertyKey.index"></a>

```vertex
case index(uint32)
```

<a id="PropertyKey.string"></a>

```vertex
case string(str.JSString)
```

<a id="PropertyKey.symbol"></a>

```vertex
case symbol(Symbol)
```

#### Properties

<a id="PropertyKey.IsSymbol"></a>

```vertex
public var IsSymbol: bool { get }
```

<a id="PropertyKey.IsPrivate"></a>

```vertex
public var IsPrivate: bool { get }
```

<a id="PropertyKey.AsString"></a>

```vertex
public var AsString: str.JSString { get }
```

AsString is the key as a string (a symbol's description for symbols).

<a id="PropertyKey.Debug"></a>

```vertex
public var Debug: string { get }
```

Debug is a readable form of the key.

#### Methods

<a id="PropertyKey.op61op61"></a>

```vertex
public static func ==(a: PropertyKey, b: PropertyKey) -> bool
```

<a id="PropertyKey.hash"></a>

```vertex
public func hash(into hasher: inout Hasher)
```

<a id="PropertyKey.FromString"></a>

```vertex
public static func FromString(_ s: str.JSString) -> PropertyKey
```

FromString canonicalizes a string key.

<a id="PropertyKey.Named"></a>

```vertex
public static func Named(_ s: string) -> PropertyKey
```

Named makes a key from a UTF-8 name, interned.

<a id="PropertyKey.FromNumber"></a>

```vertex
public static func FromNumber(_ d: float64) -> PropertyKey
```

FromNumber is ToPropertyKey of a number.

### class Symbol <a id="class-Symbol"></a>

```vertex
public final class Symbol: Hashable
```

Symbol is an ECMAScript symbol. Private names (#x) are symbols too,
marked private, so they share property storage but never show up in
reflection.

#### Initializers

<a id="Symbol.init"></a>

```vertex
public init(_ description: str.JSString?, isPrivate: bool = false)
```

#### Properties

<a id="Symbol.Description"></a>

```vertex
public let Description: str.JSString?
```

<a id="Symbol.ID"></a>

```vertex
public let ID: int
```

<a id="Symbol.IsPrivate"></a>

```vertex
public let IsPrivate: bool
```

<a id="Symbol.RegistryKey"></a>

```vertex
public var RegistryKey: str.JSString? = nil
```

RegistryKey is set for symbols from Symbol.for.

<a id="Symbol.DescriptiveString"></a>

```vertex
public var DescriptiveString: string { get }
```

DescriptiveString is Symbol(description).

#### Methods

<a id="Symbol.op61op61"></a>

```vertex
public static func ==(a: Symbol, b: Symbol) -> bool
```

<a id="Symbol.hash"></a>

```vertex
public func hash(into hasher: inout Hasher)
```

## Files

- bigint.vs
- number.vs
- value.vs
