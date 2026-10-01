# package zip

```vertex
import "archive/zip"
```

## Index

- [Constants](#constants)
- [`func Checksum(_ data: [uint8]) -> uint32`](#func-Checksum)
- [`func ChecksumString(_ s: string) -> uint32`](#func-ChecksumString)
- [`func Deflate(_ data: [uint8]) -> [uint8]`](#func-Deflate)
- [`func Inflate(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]`](#func-Inflate)
- [`func Update(_ crc: uint32, _ data: [uint8]) -> uint32`](#func-Update)
- [`struct File`](#struct-File)
  - [`var Header: FileHeader`](#File.Header)
  - [`var Name: string { get }`](#File.Name)
  - [`var Comment: string { get }`](#File.Comment)
  - [`var Method: Method { get }`](#File.Method)
  - [`var CRC32: uint32 { get }`](#File.CRC32)
  - [`var CompressedSize: int64 { get }`](#File.CompressedSize)
  - [`var UncompressedSize: int64 { get }`](#File.UncompressedSize)
  - [`var IsDir: bool { get }`](#File.IsDir)
  - [`func Read() throws -> [uint8]`](#File.Read)
  - [`func Open() throws -> io.Cursor`](#File.Open)
- [`struct FileHeader: Equatable`](#struct-FileHeader)
  - [`init(name: string, method: Method = .deflate, uncompressedSize: int64 = 0, compressedSize: int64 = 0, crc32: uint32 = 0, comment: string = "", modifiedTime: uint16 = 0, modifiedDate: uint16 = 0, externalAttributes: uint32 = 0, localHeaderOffset: int64 = 0, isDir: bool = false)`](#FileHeader.init)
  - [`var Name: string`](#FileHeader.Name)
  - [`var Comment: string`](#FileHeader.Comment)
  - [`var Method: Method`](#FileHeader.Method)
  - [`var CRC32: uint32`](#FileHeader.CRC32)
  - [`var CompressedSize: int64`](#FileHeader.CompressedSize)
  - [`var UncompressedSize: int64`](#FileHeader.UncompressedSize)
  - [`var ModifiedTime: uint16`](#FileHeader.ModifiedTime)
  - [`var ModifiedDate: uint16`](#FileHeader.ModifiedDate)
  - [`var ExternalAttributes: uint32`](#FileHeader.ExternalAttributes)
  - [`var LocalHeaderOffset: int64`](#FileHeader.LocalHeaderOffset)
  - [`var IsDir: bool`](#FileHeader.IsDir)
- [`enum Method: Equatable, CustomStringConvertible`](#enum-Method)
  - [`var rawValue: uint16 { get }`](#Method.rawValue)
  - [`var description: string { get }`](#Method.description)
  - [`static func fromRaw(_ val: uint16) -> Method?`](#Method.fromRaw)
- [`struct Reader`](#struct-Reader)
  - [`init(_ bytes: [uint8]) throws`](#Reader.init)
  - [`var Files: [File]`](#Reader.Files)
  - [`var Comment: string`](#Reader.Comment)
  - [`func Find(_ name: string) -> File?`](#Reader.Find)
- [`struct Writer<W: io.Writer>: io.Closer`](#struct-Writer)
  - [`init(_ inner: W)`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func Add(name: string, data: [uint8], method: Method = .deflate, comment: string = "") throws`](#Writer.Add)
  - [`mutating func AddDir(name: string) throws`](#Writer.AddDir)
  - [`mutating func Close() throws`](#Writer.Close)
- [`enum ZipError: Error, Equatable, CustomStringConvertible`](#enum-ZipError)
  - [`var description: string { get }`](#ZipError.description)

## Constants

<a id="let-IEEE"></a>

```vertex
public let IEEE: uint32 = 0xEDB88320
```

IEEE 802.3 CRC-32 polynomial, standard for ZIP, Ethernet, PNG, etc.

## Functions

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ data: [uint8]) -> uint32
```

Returns the IEEE 802.3 CRC-32 checksum of the given bytes.

### func ChecksumString <a id="func-ChecksumString"></a>

```vertex
public func ChecksumString(_ s: string) -> uint32
```

Returns the IEEE 802.3 CRC-32 checksum of a UTF-8 string.

### func Deflate <a id="func-Deflate"></a>

```vertex
public func Deflate(_ data: [uint8]) -> [uint8]
```

Compresses uncompressed data into raw RFC 1951 DEFLATE bytes using fixed Huffman codes.

### func Inflate <a id="func-Inflate"></a>

```vertex
public func Inflate(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]
```

Decompresses raw RFC 1951 DEFLATE bytes into uncompressed data.

### func Update <a id="func-Update"></a>

```vertex
public func Update(_ crc: uint32, _ data: [uint8]) -> uint32
```

Updates a running CRC-32 with additional data bytes using the IEEE 802.3 polynomial.

## Types

### struct File <a id="struct-File"></a>

```vertex
public struct File
```

An individual file entry inside a ZIP archive.

#### Properties

<a id="File.Header"></a>

```vertex
public var Header: FileHeader
```

<a id="File.Name"></a>

```vertex
public var Name: string { get }
```

<a id="File.Comment"></a>

```vertex
public var Comment: string { get }
```

<a id="File.Method"></a>

```vertex
public var Method: Method { get }
```

<a id="File.CRC32"></a>

```vertex
public var CRC32: uint32 { get }
```

<a id="File.CompressedSize"></a>

```vertex
public var CompressedSize: int64 { get }
```

<a id="File.UncompressedSize"></a>

```vertex
public var UncompressedSize: int64 { get }
```

<a id="File.IsDir"></a>

```vertex
public var IsDir: bool { get }
```

#### Methods

<a id="File.Read"></a>

```vertex
public func Read() throws -> [uint8]
```

Reads and decompresses the payload, validating the CRC-32 checksum and size.

<a id="File.Open"></a>

```vertex
public func Open() throws -> io.Cursor
```

Returns an io.Cursor over the decompressed bytes of this entry.

### struct FileHeader <a id="struct-FileHeader"></a>

```vertex
public struct FileHeader: Equatable
```

Metadata describing a file entry within a ZIP archive.

#### Initializers

<a id="FileHeader.init"></a>

```vertex
public init(
    name: string,
    method: Method = .deflate,
    uncompressedSize: int64 = 0,
    compressedSize: int64 = 0,
    crc32: uint32 = 0,
    comment: string = "",
    modifiedTime: uint16 = 0,
    modifiedDate: uint16 = 0,
    externalAttributes: uint32 = 0,
    localHeaderOffset: int64 = 0,
    isDir: bool = false
)
```

#### Properties

<a id="FileHeader.Name"></a>

```vertex
public var Name: string
```

<a id="FileHeader.Comment"></a>

```vertex
public var Comment: string
```

<a id="FileHeader.Method"></a>

```vertex
public var Method: Method
```

<a id="FileHeader.CRC32"></a>

```vertex
public var CRC32: uint32
```

<a id="FileHeader.CompressedSize"></a>

```vertex
public var CompressedSize: int64
```

<a id="FileHeader.UncompressedSize"></a>

```vertex
public var UncompressedSize: int64
```

<a id="FileHeader.ModifiedTime"></a>

```vertex
public var ModifiedTime: uint16
```

<a id="FileHeader.ModifiedDate"></a>

```vertex
public var ModifiedDate: uint16
```

<a id="FileHeader.ExternalAttributes"></a>

```vertex
public var ExternalAttributes: uint32
```

<a id="FileHeader.LocalHeaderOffset"></a>

```vertex
public var LocalHeaderOffset: int64
```

<a id="FileHeader.IsDir"></a>

```vertex
public var IsDir: bool
```

### enum Method <a id="enum-Method"></a>

```vertex
public enum Method: Equatable, CustomStringConvertible
```

The compression method applied to an entry in a ZIP archive.

#### Cases

<a id="Method.store"></a>

```vertex
case store
```

Uncompressed raw bytes.

<a id="Method.deflate"></a>

```vertex
case deflate
```

RFC 1951 DEFLATE compressed bytes.

#### Properties

<a id="Method.rawValue"></a>

```vertex
public var rawValue: uint16 { get }
```

<a id="Method.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="Method.fromRaw"></a>

```vertex
public static func fromRaw(_ val: uint16) -> Method?
```

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader
```

Reader provides random-access inspection and extraction of ZIP archives.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ bytes: [uint8]) throws
```

#### Properties

<a id="Reader.Files"></a>

```vertex
public var Files: [File]
```

<a id="Reader.Comment"></a>

```vertex
public var Comment: string
```

#### Methods

<a id="Reader.Find"></a>

```vertex
public func Find(_ name: string) -> File?
```

Finds a file entry by name in the archive.

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer<W: io.Writer>: io.Closer
```

Writer creates and formats ZIP archives streaming into an underlying io.Writer.

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

<a id="Writer.Add"></a>

```vertex
public mutating func Add(
    name: string,
    data: [uint8],
    method: Method = .deflate,
    comment: string = ""
) throws
```

Adds a file entry with the given uncompressed payload and compression method.

<a id="Writer.AddDir"></a>

```vertex
public mutating func AddDir(name: string) throws
```

Adds a directory entry to the ZIP archive.

<a id="Writer.Close"></a>

```vertex
public mutating func Close() throws
```

Finalizes the ZIP archive by writing central directory file headers and the EOCD record.

### enum ZipError <a id="enum-ZipError"></a>

```vertex
public enum ZipError: Error, Equatable, CustomStringConvertible
```

Errors encountered while parsing, extracting, or creating ZIP archives.

#### Cases

<a id="ZipError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

The archive stream ended before expected headers, records, or payloads were complete.

<a id="ZipError.badZip"></a>

```vertex
case badZip(string)
```

The archive structure is corrupted or fails specification invariants.

<a id="ZipError.checksumMismatch"></a>

```vertex
case checksumMismatch(expected: uint32, got: uint32)
```

The computed CRC-32 checksum did not match the entry's header value.

<a id="ZipError.sizeMismatch"></a>

```vertex
case sizeMismatch(expected: int64, got: int64)
```

The decompressed byte count does not match the header's declared uncompressed size.

<a id="ZipError.unsupportedCompression"></a>

```vertex
case unsupportedCompression(uint16)
```

An entry uses a compression method other than Store (0) or Deflate (8).

<a id="ZipError.fileNotFound"></a>

```vertex
case fileNotFound(string)
```

A file was requested that is not present in the archive's central directory.

#### Properties

<a id="ZipError.description"></a>

```vertex
public var description: string { get }
```

## Files

- crc32.vs
- deflate.vs
- error.vs
- header.vs
- reader.vs
- writer.vs
