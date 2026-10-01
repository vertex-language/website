# package cpio

```vertex
import "archive/cpio"
```

Package cpio reads and writes cpio archives in the "newc" format (SVR4,
magic 070701): what a Linux initramfs is. Each entry is a 110-byte
ASCII header, its NUL-terminated name and then its data, both padded
to four bytes; the archive ends with an entry named TRAILER!!!.

Unlike tar, newc carries the whole of what a Linux file is -- owner,
mode, device numbers, inode for hard links -- in fixed fields, so an
image's files go into one exactly as the kernel will unpack them.

## Index

- [Constants](#constants)
- [`func Padding(_ n: int64) -> int`](#func-Padding)
- [`enum CpioError: Error, Equatable, CustomStringConvertible`](#enum-CpioError)
  - [`var description: string { get }`](#CpioError.description)
- [`struct Header: Equatable`](#struct-Header)
  - [`init(name: string, mode: uint32, uid: uint32 = 0, gid: uint32 = 0, nlink: uint32 = 1, modTime: int64 = 0, size: int64 = 0, inode: uint32 = 0, rdevMajor: uint32 = 0, rdevMinor: uint32 = 0)`](#Header.init)
  - [`var Name: string`](#Header.Name)
  - [`var Mode: uint32`](#Header.Mode)
  - [`var Uid: uint32`](#Header.Uid)
  - [`var Gid: uint32`](#Header.Gid)
  - [`var Nlink: uint32`](#Header.Nlink)
  - [`var ModTime: int64`](#Header.ModTime)
  - [`var Size: int64`](#Header.Size)
  - [`var Inode: uint32`](#Header.Inode)
  - [`var DevMajor: uint32`](#Header.DevMajor)
  - [`var DevMinor: uint32`](#Header.DevMinor)
  - [`var RdevMajor: uint32`](#Header.RdevMajor)
  - [`var RdevMinor: uint32`](#Header.RdevMinor)
  - [`var Kind: uint32 { get }`](#Header.Kind)
  - [`func Encode() -> [uint8]`](#Header.Encode)
  - [`static func Parse(_ b: [uint8]) throws -> (Header, int)`](#Header.Parse)
- [`enum ModeType`](#enum-ModeType)
  - [`static let mask: uint32 = 0o170000`](#ModeType.mask)
  - [`static let socket: uint32 = 0o140000`](#ModeType.socket)
  - [`static let symlink: uint32 = 0o120000`](#ModeType.symlink)
  - [`static let regular: uint32 = 0o100000`](#ModeType.regular)
  - [`static let blockDevice: uint32 = 0o060000`](#ModeType.blockDevice)
  - [`static let directory: uint32 = 0o040000`](#ModeType.directory)
  - [`static let charDevice: uint32 = 0o020000`](#ModeType.charDevice)
  - [`static let fifo: uint32 = 0o010000`](#ModeType.fifo)
- [`struct Reader<R: io.Reader>: io.Reader`](#struct-Reader)
  - [`init(_ inner: R)`](#Reader.init)
  - [`var Inner: R`](#Reader.Inner)
  - [`mutating func Next() throws -> Header?`](#Reader.Next)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
  - [`mutating func ReadAll() throws -> [uint8]`](#Reader.ReadAll)
- [`struct Writer<W: io.Writer>: io.Writer, io.Closer`](#struct-Writer)
  - [`init(_ inner: W)`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func WriteHeader(_ header: Header) throws`](#Writer.WriteHeader)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)
  - [`mutating func Close() throws`](#Writer.Close)

## Constants

<a id="let-Trailer"></a>

```vertex
public let Trailer = "TRAILER!!!"
```

The name of the entry that ends an archive.

## Functions

### func Padding <a id="func-Padding"></a>

```vertex
public func Padding(_ n: int64) -> int
```

Zero bytes that bring `n` up to a multiple of four.

## Types

### enum CpioError <a id="enum-CpioError"></a>

```vertex
public enum CpioError: Error, Equatable, CustomStringConvertible
```

#### Cases

<a id="CpioError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

<a id="CpioError.badHeader"></a>

```vertex
case badHeader(string)
```

<a id="CpioError.writePastSize"></a>

```vertex
case writePastSize(expected: int64, got: int64)
```

<a id="CpioError.writeIncomplete"></a>

```vertex
case writeIncomplete(expected: int64, got: int64)
```

#### Properties

<a id="CpioError.description"></a>

```vertex
public var description: string { get }
```

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header: Equatable
```

One entry's metadata.

#### Initializers

<a id="Header.init"></a>

```vertex
public init(name: string, mode: uint32, uid: uint32 = 0, gid: uint32 = 0, nlink: uint32 = 1,
            modTime: int64 = 0, size: int64 = 0, inode: uint32 = 0,
            rdevMajor: uint32 = 0, rdevMinor: uint32 = 0)
```

#### Properties

<a id="Header.Name"></a>

```vertex
public var Name: string
```

The path inside the archive, without a leading "/": "bin/sh".

<a id="Header.Mode"></a>

```vertex
public var Mode: uint32
```

Type bits and permission bits together: 0o100755 is an
executable regular file.

<a id="Header.Uid"></a>

```vertex
public var Uid: uint32
```

<a id="Header.Gid"></a>

```vertex
public var Gid: uint32
```

<a id="Header.Nlink"></a>

```vertex
public var Nlink: uint32
```

<a id="Header.ModTime"></a>

```vertex
public var ModTime: int64
```

<a id="Header.Size"></a>

```vertex
public var Size: int64
```

The data's length: a file's contents, a symlink's target.

<a id="Header.Inode"></a>

```vertex
public var Inode: uint32
```

<a id="Header.DevMajor"></a>

```vertex
public var DevMajor: uint32
```

<a id="Header.DevMinor"></a>

```vertex
public var DevMinor: uint32
```

<a id="Header.RdevMajor"></a>

```vertex
public var RdevMajor: uint32
```

What a device node stands for.

<a id="Header.RdevMinor"></a>

```vertex
public var RdevMinor: uint32
```

<a id="Header.Kind"></a>

```vertex
public var Kind: uint32 { get }
```

The type bits alone: one of ModeType's.

#### Methods

<a id="Header.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

The header and name as written, padded to four bytes.

<a id="Header.Parse"></a>

```vertex
public static func Parse(_ b: [uint8]) throws -> (Header, int)
```

Parses the 110 fixed bytes of a header; the name follows them.
Returns the header (with an empty Name) and the name's size.

### enum ModeType <a id="enum-ModeType"></a>

```vertex
public enum ModeType
```

The file type bits of a Mode (`S_IFMT` and its values).

#### Properties

<a id="ModeType.mask"></a>

```vertex
public static let mask: uint32 = 0o170000
```

<a id="ModeType.socket"></a>

```vertex
public static let socket: uint32 = 0o140000
```

<a id="ModeType.symlink"></a>

```vertex
public static let symlink: uint32 = 0o120000
```

<a id="ModeType.regular"></a>

```vertex
public static let regular: uint32 = 0o100000
```

<a id="ModeType.blockDevice"></a>

```vertex
public static let blockDevice: uint32 = 0o060000
```

<a id="ModeType.directory"></a>

```vertex
public static let directory: uint32 = 0o040000
```

<a id="ModeType.charDevice"></a>

```vertex
public static let charDevice: uint32 = 0o020000
```

<a id="ModeType.fifo"></a>

```vertex
public static let fifo: uint32 = 0o010000
```

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader<R: io.Reader>: io.Reader
```

Reader reads a newc archive: Next for each entry's header, then Read
its data. Next returns nil at the trailer.

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

<a id="Reader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

<a id="Reader.ReadAll"></a>

```vertex
public mutating func ReadAll() throws -> [uint8]
```

The rest of the current entry's data.

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer<W: io.Writer>: io.Writer, io.Closer
```

Writer writes a newc archive: WriteHeader for each entry, then Write
its Size bytes of data; Close writes the trailer.

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

Starts an entry. An Inode of 0 is given the next unused number.

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

Ends the last entry and writes the trailer. The archive is then
complete; Inner is not closed.

## Files

- cpio.vs
