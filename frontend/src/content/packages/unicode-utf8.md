# package utf8

```vertex
import "unicode/utf8"
```

Package utf8 encodes and decodes UTF-8 (RFC 3629), the encoding of
Vertex's strings.

Decoding is lossy: malformed input, a surrogate or an overlong form
reads as U+FFFD, one byte wide, so a decoder always moves forward.

## Index

- [`func Append(out: inout [uint8], cp: uint32)`](#func-Append)
- [`func CodePoints(s: string) -> [uint32]`](#func-CodePoints)
- [`func Decode(b: [uint8], from: int = 0, to: int = -1) -> string`](#func-Decode)
- [`func DecodeAt(b: [uint8], i: int) -> (codePoint: uint32, width: int)`](#func-DecodeAt)
- [`func DecodeCodePoints(b: [uint8]) -> [uint32]`](#func-DecodeCodePoints)
- [`func Encode(cps: [uint32]) -> [uint8]`](#func-Encode)
- [`func FromCodePoints(cps: [uint32]) -> string`](#func-FromCodePoints)
- [`func IsValid(b: [uint8], from: int = 0, to: int = -1) -> bool`](#func-IsValid)
- [`func Width(cp: uint32) -> int`](#func-Width)

## Functions

### func Append <a id="func-Append"></a>

```vertex
public func Append(out: inout [uint8], cp: uint32)
```

Append appends a code point's encoding. A surrogate or a value past
U+10FFFF, which UTF-8 can't carry, appends U+FFFD.

### func CodePoints <a id="func-CodePoints"></a>

```vertex
public func CodePoints(s: string) -> [uint32]
```

CodePoints are a string's code points.

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(b: [uint8], from: int = 0, to: int = -1) -> string
```

Decode is the string b[from..<to] spells, made without first copying
the span into an array of its own. Malformed input decodes lossily.

### func DecodeAt <a id="func-DecodeAt"></a>

```vertex
public func DecodeAt(b: [uint8], i: int) -> (codePoint: uint32, width: int)
```

DecodeAt reads the code point whose encoding starts at b[i], and how
many bytes it took.

### func DecodeCodePoints <a id="func-DecodeCodePoints"></a>

```vertex
public func DecodeCodePoints(b: [uint8]) -> [uint32]
```

DecodeCodePoints reads all of b's code points.

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(cps: [uint32]) -> [uint8]
```

Encode is the encoding of a sequence of code points.

### func FromCodePoints <a id="func-FromCodePoints"></a>

```vertex
public func FromCodePoints(cps: [uint32]) -> string
```

FromCodePoints is a string of code points.

### func IsValid <a id="func-IsValid"></a>

```vertex
public func IsValid(b: [uint8], from: int = 0, to: int = -1) -> bool
```

IsValid says whether b[from..<to] is well-formed UTF-8.

### func Width <a id="func-Width"></a>

```vertex
public func Width(cp: uint32) -> int
```

Width is how many bytes a code point takes: 1 to 4. A surrogate or a
value past U+10FFFF takes 3, the width of U+FFFD, which is written
in its place.

## Files

- utf8.vs
