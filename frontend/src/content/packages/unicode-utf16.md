# package utf16

```vertex
import "unicode/utf16"
```

Package utf16 encodes and decodes UTF-16, the encoding of JavaScript,
Java, Windows and JSON's \u escapes.

UTF-16 in the wild may hold unpaired surrogates. CodePoints keeps them
(a lone surrogate is its own code point); Decode, whose result is a
UTF-8 string that can't carry one, writes U+FFFD in its place.

## Index

- [`func Append(_ out: inout [uint16], _ cp: uint32)`](#func-Append)
- [`func CodePoints(_ u: [uint16]) -> [uint32]`](#func-CodePoints)
- [`func Combine(_ high: uint16, _ low: uint16) -> uint32`](#func-Combine)
- [`func Decode(_ u: [uint16]) -> string`](#func-Decode)
- [`func DecodeAt(_ u: [uint16], _ i: int) -> (codePoint: uint32, width: int)`](#func-DecodeAt)
- [`func DecodeRange(_ u: [uint16], _ from: int, _ to: int) -> string`](#func-DecodeRange)
- [`func Encode(_ s: string) -> [uint16]`](#func-Encode)
- [`func FromCodePoints(_ cps: [uint32]) -> [uint16]`](#func-FromCodePoints)
- [`func IsHighSurrogate(_ u: uint16) -> bool`](#func-IsHighSurrogate)
- [`func IsLowSurrogate(_ u: uint16) -> bool`](#func-IsLowSurrogate)
- [`func Surrogates(_ cp: uint32) -> (high: uint16, low: uint16)`](#func-Surrogates)
- [`func UTF8Bytes(_ u: [uint16], _ from: int = 0, _ to: int = -1) -> [uint8]`](#func-UTF8Bytes)
- [`func Width(_ cp: uint32) -> int`](#func-Width)

## Functions

### func Append <a id="func-Append"></a>

```vertex
public func Append(_ out: inout [uint16], _ cp: uint32)
```

Append appends a code point's units. A surrogate code point is
appended as itself; one past U+10FFFF as U+FFFD.

### func CodePoints <a id="func-CodePoints"></a>

```vertex
public func CodePoints(_ u: [uint16]) -> [uint32]
```

CodePoints reads all of u's code points, keeping lone surrogates.

### func Combine <a id="func-Combine"></a>

```vertex
public func Combine(_ high: uint16, _ low: uint16) -> uint32
```

Combine joins a surrogate pair into its code point; units that aren't
a pair give U+FFFD.

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ u: [uint16]) -> string
```

Decode is the string u spells; a lone surrogate becomes U+FFFD.

### func DecodeAt <a id="func-DecodeAt"></a>

```vertex
public func DecodeAt(_ u: [uint16], _ i: int) -> (codePoint: uint32, width: int)
```

DecodeAt reads the code point at u[i]: a pair is joined, anything else
(a lone surrogate too) is its own unit.

### func DecodeRange <a id="func-DecodeRange"></a>

```vertex
public func DecodeRange(_ u: [uint16], _ from: int, _ to: int) -> string
```

DecodeRange decodes u[from..<to].

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ s: string) -> [uint16]
```

Encode is a string's UTF-16 encoding.

### func FromCodePoints <a id="func-FromCodePoints"></a>

```vertex
public func FromCodePoints(_ cps: [uint32]) -> [uint16]
```

FromCodePoints is the encoding of a sequence of code points.

### func IsHighSurrogate <a id="func-IsHighSurrogate"></a>

```vertex
public func IsHighSurrogate(_ u: uint16) -> bool
```

IsHighSurrogate: U+D800...U+DBFF, the first unit of a pair.

### func IsLowSurrogate <a id="func-IsLowSurrogate"></a>

```vertex
public func IsLowSurrogate(_ u: uint16) -> bool
```

IsLowSurrogate: U+DC00...U+DFFF, the second unit of a pair.

### func Surrogates <a id="func-Surrogates"></a>

```vertex
public func Surrogates(_ cp: uint32) -> (high: uint16, low: uint16)
```

Surrogates splits a code point above U+FFFF into its pair.

### func UTF8Bytes <a id="func-UTF8Bytes"></a>

```vertex
public func UTF8Bytes(_ u: [uint16], _ from: int = 0, _ to: int = -1) -> [uint8]
```

UTF8Bytes is the UTF-8 encoding of u[from..<to], for writing text out
without making a string; a lone surrogate becomes U+FFFD.

### func Width <a id="func-Width"></a>

```vertex
public func Width(_ cp: uint32) -> int
```

Width is how many units a code point takes: 1, or 2 above U+FFFF.

## Files

- utf16.vs
