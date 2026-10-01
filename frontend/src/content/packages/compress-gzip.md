# package gzip

```vertex
import "compress/gzip"
```

## Index

- [`func ChecksumCRC32(_ data: [uint8]) -> uint32`](#func-ChecksumCRC32)
- [`func Compress(_ data: [uint8], name: string = "") -> [uint8]`](#func-Compress)
- [`func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]`](#func-Decompress)
- [`func UpdateCRC32(_ crc: uint32, _ data: [uint8]) -> uint32`](#func-UpdateCRC32)
- [`enum GzipError: Error, Equatable, CustomStringConvertible`](#enum-GzipError)
  - [`var description: string { get }`](#GzipError.description)
- [`struct Header: Equatable`](#struct-Header)
  - [`init(name: string = "", comment: string = "", modTime: int64 = 0, os: uint8 = 3 // 3 = Unix)`](#Header.init)
  - [`var Name: string`](#Header.Name)
  - [`var Comment: string`](#Header.Comment)
  - [`var ModTime: int64`](#Header.ModTime)
  - [`var OS: uint8`](#Header.OS)
- [`struct Reader<R: io.Reader>: io.Reader`](#struct-Reader)
  - [`init(_ inner: R)`](#Reader.init)
  - [`var Header: Header = gzip.Header()`](#Reader.Header)
  - [`var Inner: R { get }`](#Reader.Inner)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
- [`struct Writer<W: io.Writer>: io.Writer, io.Closer`](#struct-Writer)
  - [`init(_ inner: W, name: string = "")`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)
  - [`mutating func Close() throws`](#Writer.Close)

## Functions

### func ChecksumCRC32 <a id="func-ChecksumCRC32"></a>

```vertex
public func ChecksumCRC32(_ data: [uint8]) -> uint32
```

### func Compress <a id="func-Compress"></a>

```vertex
public func Compress(_ data: [uint8], name: string = "") -> [uint8]
```

Compresses uncompressed bytes into an RFC 1952 gzip stream.

### func Decompress <a id="func-Decompress"></a>

```vertex
public func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]
```

Decompresses an RFC 1952 gzip stream into raw uncompressed bytes.

### func UpdateCRC32 <a id="func-UpdateCRC32"></a>

```vertex
public func UpdateCRC32(_ crc: uint32, _ data: [uint8]) -> uint32
```

## Types

### enum GzipError <a id="enum-GzipError"></a>

```vertex
public enum GzipError: Error, Equatable, CustomStringConvertible
```

Errors encountered while decompressing or validating RFC 1952 gzip streams.

#### Cases

<a id="GzipError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

<a id="GzipError.badHeader"></a>

```vertex
case badHeader(string)
```

<a id="GzipError.unsupportedCompression"></a>

```vertex
case unsupportedCompression(uint8)
```

<a id="GzipError.checksumMismatch"></a>

```vertex
case checksumMismatch(expected: uint32, got: uint32)
```

<a id="GzipError.sizeMismatch"></a>

```vertex
case sizeMismatch(expected: uint32, got: uint32)
```

#### Properties

<a id="GzipError.description"></a>

```vertex
public var description: string { get }
```

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header: Equatable
```

Metadata from the 10-byte RFC 1952 header.

#### Initializers

<a id="Header.init"></a>

```vertex
public init(
    name: string = "",
    comment: string = "",
    modTime: int64 = 0,
    os: uint8 = 3 // 3 = Unix
)
```

#### Properties

<a id="Header.Name"></a>

```vertex
public var Name: string
```

<a id="Header.Comment"></a>

```vertex
public var Comment: string
```

<a id="Header.ModTime"></a>

```vertex
public var ModTime: int64
```

<a id="Header.OS"></a>

```vertex
public var OS: uint8
```

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader<R: io.Reader>: io.Reader
```

Reader decompresses an RFC 1952 gzip stream as it is read: memory
stays at the inflater's window however big the stream is. Each
member's CRC-32 and size are checked as its end is reached, and
members written one after another (`cat a.gz b.gz`) read as one.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ inner: R)
```

#### Properties

<a id="Reader.Header"></a>

```vertex
public var Header: Header = gzip.Header()
```

The first member's header, once Read has started.

<a id="Reader.Inner"></a>

```vertex
public var Inner: R { get }
```

#### Methods

<a id="Reader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer<W: io.Writer>: io.Writer, io.Closer
```

Writer compresses uncompressed bytes into an RFC 1952 gzip stream.

#### Initializers

<a id="Writer.init"></a>

```vertex
public init(_ inner: W, name: string = "")
```

#### Properties

<a id="Writer.Inner"></a>

```vertex
public var Inner: W
```

#### Methods

<a id="Writer.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="Writer.Flush"></a>

```vertex
public mutating func Flush() throws
```

<a id="Writer.Close"></a>

```vertex
public mutating func Close() throws
```

## Files

- crc32.vs
- error.vs
- gzip.vs
- header.vs
- reader.vs
- writer.vs
