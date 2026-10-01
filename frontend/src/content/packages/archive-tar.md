# package tar

```vertex
import "archive/tar"
```

## Index

- [`enum FileType: Equatable, CustomStringConvertible`](#enum-FileType)
  - [`var description: string { get }`](#FileType.description)
  - [`var typeflagByte: uint8 { get }`](#FileType.typeflagByte)
  - [`static func fromByte(_ b: uint8) -> FileType`](#FileType.fromByte)
- [`struct Header: Equatable`](#struct-Header)
  - [`init(name: string, size: int64 = 0, mode: int64 = 0o644, typeflag: FileType = .regular, modTime: int64 = 0, uid: int = 0, gid: int = 0, linkname: string = "", uname: string = "", gname: string = "", devmajor: int64 = 0, devminor: int64 = 0, prefix: string = "")`](#Header.init)
  - [`var Name: string`](#Header.Name)
  - [`var Mode: int64`](#Header.Mode)
  - [`var Uid: int`](#Header.Uid)
  - [`var Gid: int`](#Header.Gid)
  - [`var Size: int64`](#Header.Size)
  - [`var ModTime: int64`](#Header.ModTime)
  - [`var Typeflag: FileType`](#Header.Typeflag)
  - [`var Linkname: string`](#Header.Linkname)
  - [`var Uname: string`](#Header.Uname)
  - [`var Gname: string`](#Header.Gname)
  - [`var Devmajor: int64`](#Header.Devmajor)
  - [`var Devminor: int64`](#Header.Devminor)
  - [`var Prefix: string`](#Header.Prefix)
  - [`func serialize() -> [uint8]`](#Header.serialize)
  - [`static func parse(_ block: [uint8]) throws -> Header`](#Header.parse)
- [`struct Reader<R: io.Reader>: io.Reader`](#struct-Reader)
  - [`init(_ inner: R)`](#Reader.init)
  - [`var Inner: R`](#Reader.Inner)
  - [`mutating func Next() throws -> Header?`](#Reader.Next)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
  - [`mutating func ReadAll() throws -> [uint8]`](#Reader.ReadAll)
- [`enum TarError: Error, Equatable, CustomStringConvertible`](#enum-TarError)
  - [`var description: string { get }`](#TarError.description)
- [`struct Writer<W: io.Writer>: io.Writer, io.Closer`](#struct-Writer)
  - [`init(_ inner: W)`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func WriteHeader(_ header: Header) throws`](#Writer.WriteHeader)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)
  - [`mutating func Close() throws`](#Writer.Close)

## Types

### enum FileType <a id="enum-FileType"></a>

```vertex
public enum FileType: Equatable, CustomStringConvertible
```

The type of file entry stored in a TAR archive.

#### Cases

<a id="FileType.regular"></a>

```vertex
case regular
```

<a id="FileType.link"></a>

```vertex
case link
```

<a id="FileType.symlink"></a>

```vertex
case symlink
```

<a id="FileType.characterDevice"></a>

```vertex
case characterDevice
```

<a id="FileType.blockDevice"></a>

```vertex
case blockDevice
```

<a id="FileType.directory"></a>

```vertex
case directory
```

<a id="FileType.fifo"></a>

```vertex
case fifo
```

<a id="FileType.contiguous"></a>

```vertex
case contiguous
```

<a id="FileType.paxHeader"></a>

```vertex
case paxHeader
```

A PAX extended header (POSIX.1-2001 'x'): records for the next entry.

<a id="FileType.paxGlobal"></a>

```vertex
case paxGlobal
```

A PAX global header ('g'): records for every entry after it.

<a id="FileType.gnuLongName"></a>

```vertex
case gnuLongName
```

A GNU long name ('L') or long link target ('K') for the next entry.

<a id="FileType.gnuLongLink"></a>

```vertex
case gnuLongLink
```

#### Properties

<a id="FileType.description"></a>

```vertex
public var description: string { get }
```

<a id="FileType.typeflagByte"></a>

```vertex
public var typeflagByte: uint8 { get }
```

#### Methods

<a id="FileType.fromByte"></a>

```vertex
public static func fromByte(_ b: uint8) -> FileType
```

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header: Equatable
```

A 512-byte POSIX.1-1988 USTAR TAR file header.

#### Initializers

<a id="Header.init"></a>

```vertex
public init(
    name: string,
    size: int64 = 0,
    mode: int64 = 0o644,
    typeflag: FileType = .regular,
    modTime: int64 = 0,
    uid: int = 0,
    gid: int = 0,
    linkname: string = "",
    uname: string = "",
    gname: string = "",
    devmajor: int64 = 0,
    devminor: int64 = 0,
    prefix: string = ""
)
```

#### Properties

<a id="Header.Name"></a>

```vertex
public var Name: string
```

<a id="Header.Mode"></a>

```vertex
public var Mode: int64
```

<a id="Header.Uid"></a>

```vertex
public var Uid: int
```

<a id="Header.Gid"></a>

```vertex
public var Gid: int
```

<a id="Header.Size"></a>

```vertex
public var Size: int64
```

<a id="Header.ModTime"></a>

```vertex
public var ModTime: int64
```

<a id="Header.Typeflag"></a>

```vertex
public var Typeflag: FileType
```

<a id="Header.Linkname"></a>

```vertex
public var Linkname: string
```

<a id="Header.Uname"></a>

```vertex
public var Uname: string
```

<a id="Header.Gname"></a>

```vertex
public var Gname: string
```

<a id="Header.Devmajor"></a>

```vertex
public var Devmajor: int64
```

<a id="Header.Devminor"></a>

```vertex
public var Devminor: int64
```

<a id="Header.Prefix"></a>

```vertex
public var Prefix: string
```

#### Methods

<a id="Header.serialize"></a>

```vertex
public func serialize() -> [uint8]
```

Serializes this header into a standard 512-byte USTAR block.

<a id="Header.parse"></a>

```vertex
public static func parse(_ block: [uint8]) throws -> Header
```

Parses a 512-byte block into a TAR Header.

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader<R: io.Reader>: io.Reader
```

Reader provides streaming access to the entries of a TAR archive.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ inner: R)
```

#### Properties

<a id="Reader.Inner"></a>

```vertex
public var Inner: R
```

#### Methods

<a id="Reader.Next"></a>

```vertex
public mutating func Next() throws -> Header?
```

Advances to the next entry in the TAR stream.
Returns the entry's Header, or nil if the end of the archive is reached.

<a id="Reader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

Reads up to buffer.count bytes from the currently active entry.
Returns 0 when the entry has been completely read.

<a id="Reader.ReadAll"></a>

```vertex
public mutating func ReadAll() throws -> [uint8]
```

Reads the entire payload of the currently active entry as bytes.

### enum TarError <a id="enum-TarError"></a>

```vertex
public enum TarError: Error, Equatable, CustomStringConvertible
```

Errors encountered while reading or writing TAR archives.

#### Cases

<a id="TarError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

The archive stream ended prematurely before a complete block or entry could be read.

<a id="TarError.badHeader"></a>

```vertex
case badHeader(string)
```

The 512-byte header block is corrupted, malformed, or has an invalid magic identifier.

<a id="TarError.badChecksum"></a>

```vertex
case badChecksum(expected: int64, got: int64)
```

The unsigned octal checksum in the header does not match the computed block checksum.

<a id="TarError.writePastSize"></a>

```vertex
case writePastSize(expected: int64, got: int64)
```

An attempt was made to write more bytes than declared in the header's Size field.

<a id="TarError.writeIncomplete"></a>

```vertex
case writeIncomplete(expected: int64, got: int64)
```

The entry was closed before the declared number of bytes were written.

#### Properties

<a id="TarError.description"></a>

```vertex
public var description: string { get }
```

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer<W: io.Writer>: io.Writer, io.Closer
```

Writer provides streaming construction of a TAR archive.

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

<a id="Writer.WriteHeader"></a>

```vertex
public mutating func WriteHeader(_ header: Header) throws
```

Emits a 512-byte header block for a new entry.
If a previous entry was active, pads it to a 512-byte boundary.

<a id="Writer.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

Writes payload bytes for the currently active entry.

<a id="Writer.Flush"></a>

```vertex
public mutating func Flush() throws
```

<a id="Writer.Close"></a>

```vertex
public mutating func Close() throws
```

Finalizes the archive by padding the last entry and writing the dual 512-byte zero terminator blocks.

## Files

- error.vs
- header.vs
- reader.vs
- writer.vs
