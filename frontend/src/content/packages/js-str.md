# package str

```vertex
import "js/str"
```

Package str is ECMAScript's String type: a sequence of UTF-16 code
units (ECMA-262 §6.1.4).

Concatenation builds a rope, so a loop that appends to a string costs
linear time; the rope is flattened the first time its units are read.

## Index

- [Constants](#constants)
- [`func Name(s: string) -> JSString`](#func-Name)
- [`final class AtomTable`](#class-AtomTable)
  - [`init()`](#AtomTable.init)
  - [`func Intern(text: string) -> JSString`](#AtomTable.Intern)
- [`struct Builder`](#struct-Builder)
  - [`init()`](#Builder.init)
  - [`var Units: [uint16] = []`](#Builder.Units)
  - [`mutating func Append(s: JSString)`](#Builder.Append)
  - [`mutating func AppendASCII(s: string)`](#Builder.AppendASCII)
  - [`mutating func AppendString(s: string)`](#Builder.AppendString)
  - [`mutating func AppendUnit(u: uint16)`](#Builder.AppendUnit)
  - [`mutating func AppendCodePoint(cp: uint32)`](#Builder.AppendCodePoint)
  - [`func Build() -> JSString`](#Builder.Build)
- [`final class JSString: Hashable, CustomStringConvertible`](#class-JSString)
  - [`init(units: [uint16])`](#JSString.init)
  - [`let Length: int`](#JSString.Length)
  - [`static let Empty = JSString([])`](#JSString.Empty)
  - [`var Units: [uint16] { get }`](#JSString.Units)
  - [`var IsEmpty: bool { get }`](#JSString.IsEmpty)
  - [`var HashCode: int { get }`](#JSString.HashCode)
  - [`var String: string { get }`](#JSString.String)
  - [`var description: string { get }`](#JSString.description)
  - [`var IsASCIIDigits: bool { get }`](#JSString.IsASCIIDigits)
  - [`static func From(s: string) -> JSString`](#JSString.From)
  - [`func At(i: int) -> uint16`](#JSString.At)
  - [`func CodePointAt(i: int) -> (cp: uint32, width: int)`](#JSString.CodePointAt)
  - [`func Concat(other: JSString) -> JSString`](#JSString.Concat)
  - [`func Slice(from: int, to: int) -> JSString`](#JSString.Slice)
  - [`func IndexOf(needle: JSString, from: int) -> int`](#JSString.IndexOf)
  - [`func LastIndexOf(needle: JSString, from: int) -> int`](#JSString.LastIndexOf)
  - [`func StartsWith(p: JSString, at: int) -> bool`](#JSString.StartsWith)
  - [`func Compare(other: JSString) -> int`](#JSString.Compare)
  - [`func Equals(other: JSString) -> bool`](#JSString.Equals)
  - [`func EqualsASCII(s: string) -> bool`](#JSString.EqualsASCII)
  - [`static func ==(lhs: JSString, rhs: JSString) -> bool`](#JSString.op61op61)
  - [`func hash(into hasher: inout Hasher)`](#JSString.hash)

## Constants

<a id="let-Atoms"></a>

```vertex
public let Atoms = AtomTable()
```

Atoms is the process-wide table.

## Functions

### func Name <a id="func-Name"></a>

```vertex
public func Name(s: string) -> JSString
```

Name interns a UTF-8 name.

## Types

### class AtomTable <a id="class-AtomTable"></a>

```vertex
public final class AtomTable
```

Intern returns the one JSString for an ASCII or UTF-8 name, so names
the compiler and the built-ins share are the same object and compare
by identity first.

#### Initializers

<a id="AtomTable.init"></a>

```vertex
public init()
```

#### Methods

<a id="AtomTable.Intern"></a>

```vertex
public func Intern(text: string) -> JSString
```

### struct Builder <a id="struct-Builder"></a>

```vertex
public struct Builder
```

Builder accumulates code units.

#### Initializers

<a id="Builder.init"></a>

```vertex
public init()
```

#### Properties

<a id="Builder.Units"></a>

```vertex
public var Units: [uint16] = []
```

#### Methods

<a id="Builder.Append"></a>

```vertex
public mutating func Append(s: JSString)
```

<a id="Builder.AppendASCII"></a>

```vertex
public mutating func AppendASCII(s: string)
```

<a id="Builder.AppendString"></a>

```vertex
public mutating func AppendString(s: string)
```

<a id="Builder.AppendUnit"></a>

```vertex
public mutating func AppendUnit(u: uint16)
```

<a id="Builder.AppendCodePoint"></a>

```vertex
public mutating func AppendCodePoint(cp: uint32)
```

<a id="Builder.Build"></a>

```vertex
public func Build() -> JSString
```

### class JSString <a id="class-JSString"></a>

```vertex
public final class JSString: Hashable, CustomStringConvertible
```

JSString is an immutable string of UTF-16 code units.

#### Initializers

<a id="JSString.init"></a>

```vertex
public init(units: [uint16])
```

#### Properties

<a id="JSString.Length"></a>

```vertex
public let Length: int
```

<a id="JSString.Empty"></a>

```vertex
public static let Empty = JSString([])
```

<a id="JSString.Units"></a>

```vertex
public var Units: [uint16] { get }
```

Units are the code units, flattening a rope.

<a id="JSString.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

<a id="JSString.HashCode"></a>

```vertex
public var HashCode: int { get }
```

HashCode is FNV-1a over the code units, cached.

<a id="JSString.String"></a>

```vertex
public var String: string { get }
```

String is the UTF-8 form (lone surrogates become U+FFFD).

<a id="JSString.description"></a>

```vertex
public var description: string { get }
```

<a id="JSString.IsASCIIDigits"></a>

```vertex
public var IsASCIIDigits: bool { get }
```

IsASCIIDigits says whether the string is non-empty decimal digits.

#### Methods

<a id="JSString.From"></a>

```vertex
public static func From(s: string) -> JSString
```

From makes a JSString from a UTF-8 string.

<a id="JSString.At"></a>

```vertex
public func At(i: int) -> uint16
```

At is the code unit at i, which must be in range.

<a id="JSString.CodePointAt"></a>

```vertex
public func CodePointAt(i: int) -> (cp: uint32, width: int)
```

CodePointAt joins a surrogate pair at i.

<a id="JSString.Concat"></a>

```vertex
public func Concat(other: JSString) -> JSString
```

Concat joins two strings.

<a id="JSString.Slice"></a>

```vertex
public func Slice(from: int, to: int) -> JSString
```

Slice is the substring [from, to).

<a id="JSString.IndexOf"></a>

```vertex
public func IndexOf(needle: JSString, from: int) -> int
```

IndexOf finds needle at or after from, or returns -1.

<a id="JSString.LastIndexOf"></a>

```vertex
public func LastIndexOf(needle: JSString, from: int) -> int
```

LastIndexOf finds needle at or before from, or returns -1.

<a id="JSString.StartsWith"></a>

```vertex
public func StartsWith(p: JSString, at: int) -> bool
```

<a id="JSString.Compare"></a>

```vertex
public func Compare(other: JSString) -> int
```

Compare orders by code units, as the < operator does.

<a id="JSString.Equals"></a>

```vertex
public func Equals(other: JSString) -> bool
```

Equals compares code units.

<a id="JSString.EqualsASCII"></a>

```vertex
public func EqualsASCII(s: string) -> bool
```

EqualsASCII compares with an ASCII literal without allocating.

<a id="JSString.op61op61"></a>

```vertex
public static func ==(lhs: JSString, rhs: JSString) -> bool
```

<a id="JSString.hash"></a>

```vertex
public func hash(into hasher: inout Hasher)
```

## Files

- str.vs
