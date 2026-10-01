# package zlib

```vertex
import "compress/zlib"
```

## Index

- [`func Adler32(_ data: [uint8]) -> uint32`](#func-Adler32)
- [`func Compress(_ data: [uint8]) -> [uint8]`](#func-Compress)
- [`func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]`](#func-Decompress)
- [`func UpdateAdler32(_ initial: uint32, _ data: [uint8]) -> uint32`](#func-UpdateAdler32)
- [`struct Reader<R: io.Reader>: io.Reader`](#struct-Reader)
  - [`init(_ inner: R)`](#Reader.init)
  - [`var Inner: R { get }`](#Reader.Inner)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
- [`struct Writer<W: io.Writer>: io.Writer, io.Closer`](#struct-Writer)
  - [`init(_ inner: W)`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)
  - [`mutating func Close() throws`](#Writer.Close)
- [`enum ZlibError: Error, Equatable, CustomStringConvertible`](#enum-ZlibError)
  - [`var description: string { get }`](#ZlibError.description)

## Functions

### func Adler32 <a id="func-Adler32"></a>

```vertex
public func Adler32(_ data: [uint8]) -> uint32
```

Computes the RFC 1950 Adler-32 checksum of data.

### func Compress <a id="func-Compress"></a>

```vertex
public func Compress(_ data: [uint8]) -> [uint8]
```

Compresses uncompressed bytes into an RFC 1950 zlib stream.

### func Decompress <a id="func-Decompress"></a>

```vertex
public func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]
```

Decompresses an RFC 1950 zlib stream into raw uncompressed bytes.

### func UpdateAdler32 <a id="func-UpdateAdler32"></a>

```vertex
public func UpdateAdler32(_ initial: uint32, _ data: [uint8]) -> uint32
```

Updates a running Adler-32 checksum with additional bytes.

## Types

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader<R: io.Reader>: io.Reader
```

Reader decompresses an RFC 1950 zlib stream as it is read, holding
the inflater's 32 KiB window rather than the whole output. The
Adler-32 is checked when the end is reached.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ inner: R)
```

#### Properties

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

Writer compresses uncompressed bytes into an RFC 1950 zlib stream.

#### Initializers

<a id="Writer.init"></a>

```vertex
public init(_ inner: W)
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

### enum ZlibError <a id="enum-ZlibError"></a>

```vertex
public enum ZlibError: Error, Equatable, CustomStringConvertible
```

Errors encountered while processing RFC 1950 zlib streams.

#### Cases

<a id="ZlibError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

<a id="ZlibError.badHeader"></a>

```vertex
case badHeader(string)
```

<a id="ZlibError.unsupportedMethod"></a>

```vertex
case unsupportedMethod(int)
```

<a id="ZlibError.presetDictionaryUnsupported"></a>

```vertex
case presetDictionaryUnsupported
```

<a id="ZlibError.checksumMismatch"></a>

```vertex
case checksumMismatch(expected: uint32, got: uint32)
```

#### Properties

<a id="ZlibError.description"></a>

```vertex
public var description: string { get }
```

## Files

- adler32.vs
- error.vs
- reader.vs
- writer.vs
- zlib.vs
