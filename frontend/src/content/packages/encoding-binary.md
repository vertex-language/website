# package binary

```vertex
import "encoding/binary"
```

## Index

- [`func DecodeUTF16LE(_ b: [uint8]) -> string`](#func-DecodeUTF16LE)
- [`func EncodeUTF16LE(_ s: string) -> [uint8]`](#func-EncodeUTF16LE)
- [`struct BigEndian`](#struct-BigEndian)
  - [`static func Uint16(_ b: [uint8], from: int = 0) -> uint16`](#BigEndian.Uint16)
  - [`static func PutUint16(_ b: inout [uint8], _ v: uint16, at: int = 0)`](#BigEndian.PutUint16)
  - [`static func AppendUint16(_ b: inout [uint8], _ v: uint16)`](#BigEndian.AppendUint16)
  - [`static func Uint24(_ b: [uint8], from: int = 0) -> uint32`](#BigEndian.Uint24)
  - [`static func PutUint24(_ b: inout [uint8], _ v: uint32, at: int = 0)`](#BigEndian.PutUint24)
  - [`static func AppendUint24(_ b: inout [uint8], _ v: uint32)`](#BigEndian.AppendUint24)
  - [`static func Uint32(_ b: [uint8], from: int = 0) -> uint32`](#BigEndian.Uint32)
  - [`static func PutUint32(_ b: inout [uint8], _ v: uint32, at: int = 0)`](#BigEndian.PutUint32)
  - [`static func AppendUint32(_ b: inout [uint8], _ v: uint32)`](#BigEndian.AppendUint32)
  - [`static func Uint64(_ b: [uint8], from: int = 0) -> uint64`](#BigEndian.Uint64)
  - [`static func PutUint64(_ b: inout [uint8], _ v: uint64, at: int = 0)`](#BigEndian.PutUint64)
  - [`static func AppendUint64(_ b: inout [uint8], _ v: uint64)`](#BigEndian.AppendUint64)
- [`enum BinaryError: Error`](#enum-BinaryError)
  - [`var Message: string { get }`](#BinaryError.Message)
- [`enum ByteOrder`](#enum-ByteOrder)
- [`struct LittleEndian`](#struct-LittleEndian)
  - [`static func Uint16(_ b: [uint8], from: int = 0) -> uint16`](#LittleEndian.Uint16)
  - [`static func PutUint16(_ b: inout [uint8], _ v: uint16, at: int = 0)`](#LittleEndian.PutUint16)
  - [`static func AppendUint16(_ b: inout [uint8], _ v: uint16)`](#LittleEndian.AppendUint16)
  - [`static func Uint32(_ b: [uint8], from: int = 0) -> uint32`](#LittleEndian.Uint32)
  - [`static func PutUint32(_ b: inout [uint8], _ v: uint32, at: int = 0)`](#LittleEndian.PutUint32)
  - [`static func AppendUint32(_ b: inout [uint8], _ v: uint32)`](#LittleEndian.AppendUint32)
  - [`static func Uint64(_ b: [uint8], from: int = 0) -> uint64`](#LittleEndian.Uint64)
  - [`static func PutUint64(_ b: inout [uint8], _ v: uint64, at: int = 0)`](#LittleEndian.PutUint64)
  - [`static func AppendUint64(_ b: inout [uint8], _ v: uint64)`](#LittleEndian.AppendUint64)
- [`struct Reader`](#struct-Reader)
  - [`init(_ data: [uint8])`](#Reader.init)
  - [`init(_ data: [uint8], from: int, to: int)`](#Reader.init-2)
  - [`var Data: [uint8]`](#Reader.Data)
  - [`var Offset: int = 0`](#Reader.Offset)
  - [`var Limit: int`](#Reader.Limit)
  - [`var Remaining: int { get }`](#Reader.Remaining)
  - [`var AtEnd: bool { get }`](#Reader.AtEnd)
  - [`mutating func U8() throws -> uint8`](#Reader.U8)
  - [`func PeekU8() throws -> uint8`](#Reader.PeekU8)
  - [`mutating func U16LE() throws -> uint16`](#Reader.U16LE)
  - [`mutating func U16BE() throws -> uint16`](#Reader.U16BE)
  - [`mutating func U24BE() throws -> uint32`](#Reader.U24BE)
  - [`mutating func U32LE() throws -> uint32`](#Reader.U32LE)
  - [`mutating func U32BE() throws -> uint32`](#Reader.U32BE)
  - [`mutating func U64LE() throws -> uint64`](#Reader.U64LE)
  - [`mutating func U64BE() throws -> uint64`](#Reader.U64BE)
  - [`mutating func I16LE() throws -> int16`](#Reader.I16LE)
  - [`mutating func I32LE() throws -> int32`](#Reader.I32LE)
  - [`mutating func Bytes(_ n: int) throws -> [uint8]`](#Reader.Bytes)
  - [`mutating func Rest() -> [uint8]`](#Reader.Rest)
  - [`mutating func Skip(_ n: int) throws`](#Reader.Skip)
  - [`mutating func Sub(_ n: int) throws -> Reader`](#Reader.Sub)
  - [`mutating func UTF16LE(bytes n: int) throws -> string`](#Reader.UTF16LE)
- [`struct Writer`](#struct-Writer)
  - [`init()`](#Writer.init)
  - [`init(capacity: int)`](#Writer.init-2)
  - [`var Bytes: [uint8] = []`](#Writer.Bytes)
  - [`var Count: int { get }`](#Writer.Count)
  - [`mutating func U8(_ v: uint8)`](#Writer.U8)
  - [`mutating func U16LE(_ v: uint16)`](#Writer.U16LE)
  - [`mutating func U16BE(_ v: uint16)`](#Writer.U16BE)
  - [`mutating func U24BE(_ v: uint32)`](#Writer.U24BE)
  - [`mutating func U32LE(_ v: uint32)`](#Writer.U32LE)
  - [`mutating func U32BE(_ v: uint32)`](#Writer.U32BE)
  - [`mutating func U64LE(_ v: uint64)`](#Writer.U64LE)
  - [`mutating func U64BE(_ v: uint64)`](#Writer.U64BE)
  - [`mutating func I16LE(_ v: int16)`](#Writer.I16LE)
  - [`mutating func I32LE(_ v: int32)`](#Writer.I32LE)
  - [`mutating func Append(_ b: [uint8])`](#Writer.Append)
  - [`mutating func Zeros(_ n: int)`](#Writer.Zeros)
  - [`mutating func UTF16LE(_ s: string, terminate: bool = false)`](#Writer.UTF16LE)
  - [`mutating func Patch16LE(at: int, _ v: uint16)`](#Writer.Patch16LE)
  - [`mutating func Patch16BE(at: int, _ v: uint16)`](#Writer.Patch16BE)
  - [`mutating func Patch32LE(at: int, _ v: uint32)`](#Writer.Patch32LE)

## Functions

### func DecodeUTF16LE <a id="func-DecodeUTF16LE"></a>

```vertex
public func DecodeUTF16LE(_ b: [uint8]) -> string
```

DecodeUTF16LE decodes UTF-16LE bytes, stopping at the first NUL unit.

### func EncodeUTF16LE <a id="func-EncodeUTF16LE"></a>

```vertex
public func EncodeUTF16LE(_ s: string) -> [uint8]
```

EncodeUTF16LE is the UTF-16LE encoding of s, without a terminator.

## Types

### struct BigEndian <a id="struct-BigEndian"></a>

```vertex
public struct BigEndian
```

BigEndian is the big-endian implementation of byte-order encoding.

#### Methods

<a id="BigEndian.Uint16"></a>

```vertex
public static func Uint16(_ b: [uint8], from: int = 0) -> uint16
```

<a id="BigEndian.PutUint16"></a>

```vertex
public static func PutUint16(_ b: inout [uint8], _ v: uint16, at: int = 0)
```

<a id="BigEndian.AppendUint16"></a>

```vertex
public static func AppendUint16(_ b: inout [uint8], _ v: uint16)
```

<a id="BigEndian.Uint24"></a>

```vertex
public static func Uint24(_ b: [uint8], from: int = 0) -> uint32
```

Uint24 reads 3 big-endian bytes (common in TLS record and handshake headers).

<a id="BigEndian.PutUint24"></a>

```vertex
public static func PutUint24(_ b: inout [uint8], _ v: uint32, at: int = 0)
```

<a id="BigEndian.AppendUint24"></a>

```vertex
public static func AppendUint24(_ b: inout [uint8], _ v: uint32)
```

<a id="BigEndian.Uint32"></a>

```vertex
public static func Uint32(_ b: [uint8], from: int = 0) -> uint32
```

<a id="BigEndian.PutUint32"></a>

```vertex
public static func PutUint32(_ b: inout [uint8], _ v: uint32, at: int = 0)
```

<a id="BigEndian.AppendUint32"></a>

```vertex
public static func AppendUint32(_ b: inout [uint8], _ v: uint32)
```

<a id="BigEndian.Uint64"></a>

```vertex
public static func Uint64(_ b: [uint8], from: int = 0) -> uint64
```

<a id="BigEndian.PutUint64"></a>

```vertex
public static func PutUint64(_ b: inout [uint8], _ v: uint64, at: int = 0)
```

<a id="BigEndian.AppendUint64"></a>

```vertex
public static func AppendUint64(_ b: inout [uint8], _ v: uint64)
```

### enum BinaryError <a id="enum-BinaryError"></a>

```vertex
public enum BinaryError: Error
```

BinaryError is what a Reader throws when a field runs past the bytes it
was given. Nothing is read out of bounds: a short read throws instead.

#### Cases

<a id="BinaryError.short"></a>

```vertex
case short(want: int, have: int)
```

<a id="BinaryError.invalid"></a>

```vertex
case invalid(string)
```

#### Properties

<a id="BinaryError.Message"></a>

```vertex
public var Message: string { get }
```

### enum ByteOrder <a id="enum-ByteOrder"></a>

```vertex
public enum ByteOrder
```

#### Cases

<a id="ByteOrder.bigEndian"></a>

```vertex
case bigEndian
```

<a id="ByteOrder.littleEndian"></a>

```vertex
case littleEndian
```

### struct LittleEndian <a id="struct-LittleEndian"></a>

```vertex
public struct LittleEndian
```

LittleEndian is the little-endian implementation of byte-order encoding.

#### Methods

<a id="LittleEndian.Uint16"></a>

```vertex
public static func Uint16(_ b: [uint8], from: int = 0) -> uint16
```

<a id="LittleEndian.PutUint16"></a>

```vertex
public static func PutUint16(_ b: inout [uint8], _ v: uint16, at: int = 0)
```

<a id="LittleEndian.AppendUint16"></a>

```vertex
public static func AppendUint16(_ b: inout [uint8], _ v: uint16)
```

<a id="LittleEndian.Uint32"></a>

```vertex
public static func Uint32(_ b: [uint8], from: int = 0) -> uint32
```

<a id="LittleEndian.PutUint32"></a>

```vertex
public static func PutUint32(_ b: inout [uint8], _ v: uint32, at: int = 0)
```

<a id="LittleEndian.AppendUint32"></a>

```vertex
public static func AppendUint32(_ b: inout [uint8], _ v: uint32)
```

<a id="LittleEndian.Uint64"></a>

```vertex
public static func Uint64(_ b: [uint8], from: int = 0) -> uint64
```

<a id="LittleEndian.PutUint64"></a>

```vertex
public static func PutUint64(_ b: inout [uint8], _ v: uint64, at: int = 0)
```

<a id="LittleEndian.AppendUint64"></a>

```vertex
public static func AppendUint64(_ b: inout [uint8], _ v: uint64)
```

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader
```

Reader walks a byte array front to back, decoding fixed-width fields
in either byte order. Every read is bounds-checked and throws
`BinaryError.short` rather than reading past the end, which is what
makes parsers built on it safe to feed hostile input.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ data: [uint8])
```

<a id="Reader.init-2"></a>

```vertex
public init(_ data: [uint8], from: int, to: int)
```

#### Properties

<a id="Reader.Data"></a>

```vertex
public var Data: [uint8]
```

<a id="Reader.Offset"></a>

```vertex
public var Offset: int = 0
```

Offset of the next unread byte.

<a id="Reader.Limit"></a>

```vertex
public var Limit: int
```

One past the last byte this reader may consume.

<a id="Reader.Remaining"></a>

```vertex
public var Remaining: int { get }
```

Bytes left to read.

<a id="Reader.AtEnd"></a>

```vertex
public var AtEnd: bool { get }
```

#### Methods

<a id="Reader.U8"></a>

```vertex
public mutating func U8() throws -> uint8
```

<a id="Reader.PeekU8"></a>

```vertex
public func PeekU8() throws -> uint8
```

<a id="Reader.U16LE"></a>

```vertex
public mutating func U16LE() throws -> uint16
```

<a id="Reader.U16BE"></a>

```vertex
public mutating func U16BE() throws -> uint16
```

<a id="Reader.U24BE"></a>

```vertex
public mutating func U24BE() throws -> uint32
```

<a id="Reader.U32LE"></a>

```vertex
public mutating func U32LE() throws -> uint32
```

<a id="Reader.U32BE"></a>

```vertex
public mutating func U32BE() throws -> uint32
```

<a id="Reader.U64LE"></a>

```vertex
public mutating func U64LE() throws -> uint64
```

<a id="Reader.U64BE"></a>

```vertex
public mutating func U64BE() throws -> uint64
```

<a id="Reader.I16LE"></a>

```vertex
public mutating func I16LE() throws -> int16
```

<a id="Reader.I32LE"></a>

```vertex
public mutating func I32LE() throws -> int32
```

<a id="Reader.Bytes"></a>

```vertex
public mutating func Bytes(_ n: int) throws -> [uint8]
```

Bytes copies the next n bytes out.

<a id="Reader.Rest"></a>

```vertex
public mutating func Rest() -> [uint8]
```

Rest copies everything left.

<a id="Reader.Skip"></a>

```vertex
public mutating func Skip(_ n: int) throws
```

<a id="Reader.Sub"></a>

```vertex
public mutating func Sub(_ n: int) throws -> Reader
```

Sub is a reader over the next n bytes, which this reader skips.
Nested structures read through a Sub cannot overrun their length.

<a id="Reader.UTF16LE"></a>

```vertex
public mutating func UTF16LE(bytes n: int) throws -> string
```

UTF16LE decodes n bytes of UTF-16LE text, stopping at the first NUL.

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer
```

Writer appends fixed-width fields to a growing byte array.

#### Initializers

<a id="Writer.init"></a>

```vertex
public init()
```

<a id="Writer.init-2"></a>

```vertex
public init(capacity: int)
```

#### Properties

<a id="Writer.Bytes"></a>

```vertex
public var Bytes: [uint8] = []
```

<a id="Writer.Count"></a>

```vertex
public var Count: int { get }
```

#### Methods

<a id="Writer.U8"></a>

```vertex
public mutating func U8(_ v: uint8)
```

<a id="Writer.U16LE"></a>

```vertex
public mutating func U16LE(_ v: uint16)
```

<a id="Writer.U16BE"></a>

```vertex
public mutating func U16BE(_ v: uint16)
```

<a id="Writer.U24BE"></a>

```vertex
public mutating func U24BE(_ v: uint32)
```

<a id="Writer.U32LE"></a>

```vertex
public mutating func U32LE(_ v: uint32)
```

<a id="Writer.U32BE"></a>

```vertex
public mutating func U32BE(_ v: uint32)
```

<a id="Writer.U64LE"></a>

```vertex
public mutating func U64LE(_ v: uint64)
```

<a id="Writer.U64BE"></a>

```vertex
public mutating func U64BE(_ v: uint64)
```

<a id="Writer.I16LE"></a>

```vertex
public mutating func I16LE(_ v: int16)
```

<a id="Writer.I32LE"></a>

```vertex
public mutating func I32LE(_ v: int32)
```

<a id="Writer.Append"></a>

```vertex
public mutating func Append(_ b: [uint8])
```

<a id="Writer.Zeros"></a>

```vertex
public mutating func Zeros(_ n: int)
```

<a id="Writer.UTF16LE"></a>

```vertex
public mutating func UTF16LE(_ s: string, terminate: bool = false)
```

UTF16LE appends text as UTF-16LE, with a NUL terminator when asked.

<a id="Writer.Patch16LE"></a>

```vertex
public mutating func Patch16LE(at: int, _ v: uint16)
```

Patch16LE overwrites two bytes already written, for length fields
that are only known once what follows them has been written.

<a id="Writer.Patch16BE"></a>

```vertex
public mutating func Patch16BE(at: int, _ v: uint16)
```

<a id="Writer.Patch32LE"></a>

```vertex
public mutating func Patch32LE(at: int, _ v: uint32)
```

## Files

- binary.vs
- cursor.vs
