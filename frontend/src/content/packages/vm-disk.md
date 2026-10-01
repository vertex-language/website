# package disk

```vertex
import "vm/disk"
```

Package disk is what a disk device reads and writes: the Image protocol,
and raw files. Formats with structure (qcow2, vhdx) are the packages
under it and return Images too.

## Index

- [Constants](#constants)
- [`func CheckRange(_ image: any Image, _ offset: uint64, _ count: uint64) throws`](#func-CheckRange)
- [`func CreateRaw(_ path: fs.Path, size: uint64) throws -> Raw`](#func-CreateRaw)
- [`func ExtractIsoFile(from file: fs.File, entry: IsoEntry, to destination: fs.Path) throws`](#func-ExtractIsoFile)
- [`func FindIsoBootFiles(from file: fs.File, rootLba: uint32, rootLength: uint32) throws -> IsoBootFiles?`](#func-FindIsoBootFiles)
- [`func FindIsoEntry(from file: fs.File, rootLba: uint32, rootLength: uint32, path: string) throws -> IsoEntry?`](#func-FindIsoEntry)
- [`func NormalizeIsoName(_ bytes: [uint8]) -> string`](#func-NormalizeIsoName)
- [`func OpenRaw(_ path: fs.Path, readOnly: bool = false) throws -> Raw`](#func-OpenRaw)
- [`func ParseIsoPvd(_ b: [uint8]) throws -> IsoInfo`](#func-ParseIsoPvd)
- [`func ReadIsoDirectory(from file: fs.File, at lba: uint32, length: uint32) throws -> [IsoEntry]`](#func-ReadIsoDirectory)
- [`func ReadIsoFile(from file: fs.File, entry: IsoEntry) throws -> [uint8]`](#func-ReadIsoFile)
- [`func ReadIsoInfo(from file: fs.File) throws -> IsoInfo?`](#func-ReadIsoInfo)
- [`enum DiskError: Error, CustomStringConvertible`](#enum-DiskError)
  - [`var description: string { get }`](#DiskError.description)
- [`protocol Image: AnyObject`](#protocol-Image)
  - [`var Size: uint64 { get }`](#Image.Size)
  - [`var ReadOnly: bool { get }`](#Image.ReadOnly)
  - [`func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws`](#Image.ReadAt)
  - [`func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws`](#Image.WriteAt)
  - [`func Flush() async throws`](#Image.Flush)
  - [`func Discard(_ offset: uint64, count: uint64) async throws`](#Image.Discard)
  - [`func Close()`](#Image.Close)
- [`struct IsoBootFiles`](#struct-IsoBootFiles)
  - [`init(kernel: IsoEntry, initrd: IsoEntry?, kernelPath: string, initrdPath: string?, recommendedCmdline: string)`](#IsoBootFiles.init)
  - [`let Kernel: IsoEntry`](#IsoBootFiles.Kernel)
  - [`let Initrd: IsoEntry?`](#IsoBootFiles.Initrd)
  - [`let KernelPath: string`](#IsoBootFiles.KernelPath)
  - [`let InitrdPath: string?`](#IsoBootFiles.InitrdPath)
  - [`let RecommendedCmdline: string`](#IsoBootFiles.RecommendedCmdline)
- [`struct IsoEntry: Equatable`](#struct-IsoEntry)
  - [`init(name: string, rawName: string, lba: uint32, size: uint32, isDirectory: bool)`](#IsoEntry.init)
  - [`let Name: string`](#IsoEntry.Name)
  - [`let RawName: string`](#IsoEntry.RawName)
  - [`let Lba: uint32`](#IsoEntry.Lba)
  - [`let Size: uint32`](#IsoEntry.Size)
  - [`let IsDirectory: bool`](#IsoEntry.IsDirectory)
- [`struct IsoInfo`](#struct-IsoInfo)
  - [`init(volumeId: string, systemId: string, volumeSpaceSize: uint32, logicalBlockSize: uint16, publisher: string, application: string, isBootable: bool = false, rootLba: uint32 = 0, rootLength: uint32 = 0)`](#IsoInfo.init)
  - [`let VolumeId: string`](#IsoInfo.VolumeId)
  - [`let SystemId: string`](#IsoInfo.SystemId)
  - [`let VolumeSpaceSize: uint32`](#IsoInfo.VolumeSpaceSize)
  - [`let LogicalBlockSize: uint16`](#IsoInfo.LogicalBlockSize)
  - [`let Publisher: string`](#IsoInfo.Publisher)
  - [`let Application: string`](#IsoInfo.Application)
  - [`let IsBootable: bool`](#IsoInfo.IsBootable)
  - [`let RootLba: uint32`](#IsoInfo.RootLba)
  - [`let RootLength: uint32`](#IsoInfo.RootLength)
- [`final class MemoryImage: Image`](#class-MemoryImage)
  - [`init(size: int, readOnly: bool = false)`](#MemoryImage.init)
  - [`init(bytes: [uint8], readOnly: bool = false)`](#MemoryImage.init-2)
  - [`let ReadOnly: bool`](#MemoryImage.ReadOnly)
  - [`var Size: uint64 { get }`](#MemoryImage.Size)
  - [`func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws`](#MemoryImage.ReadAt)
  - [`func WriteAt(_ offset: uint64, _ data: borrowing [uint8]) async throws`](#MemoryImage.WriteAt)
  - [`func Flush() async throws`](#MemoryImage.Flush)
  - [`func Discard(_ offset: uint64, count: uint64) async throws`](#MemoryImage.Discard)
  - [`func Close()`](#MemoryImage.Close)
- [`final class Raw: Image`](#class-Raw)
  - [`let Size: uint64`](#Raw.Size)
  - [`let ReadOnly: bool`](#Raw.ReadOnly)
  - [`func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws`](#Raw.ReadAt)
  - [`func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws`](#Raw.WriteAt)
  - [`func Flush() async throws`](#Raw.Flush)
  - [`func Discard(_ offset: uint64, count: uint64) async throws`](#Raw.Discard)
  - [`func Close()`](#Raw.Close)

## Constants

<a id="let-IsoPvdOffset"></a>

```vertex
public let IsoPvdOffset: uint64 = 32768
```

ISO 9660 primary volume descriptor sector offset (Sector 16 * 2048 bytes).

<a id="let-IsoSectorSize"></a>

```vertex
public let IsoSectorSize: uint64 = 2048
```

## Functions

### func CheckRange <a id="func-CheckRange"></a>

```vertex
public func CheckRange(_ image: any Image, _ offset: uint64, _ count: uint64) throws
```

Checks that a request lies inside an image.

### func CreateRaw <a id="func-CreateRaw"></a>

```vertex
public func CreateRaw(_ path: fs.Path, size: uint64) throws -> Raw
```

Creates a sparse raw disk of `size` bytes, replacing any file there.

### func ExtractIsoFile <a id="func-ExtractIsoFile"></a>

```vertex
public func ExtractIsoFile(from file: fs.File, entry: IsoEntry, to destination: fs.Path) throws
```

Extracts an ISO entry to a local destination file path in 4 MB chunks.

### func FindIsoBootFiles <a id="func-FindIsoBootFiles"></a>

```vertex
public func FindIsoBootFiles(from file: fs.File, rootLba: uint32, rootLength: uint32) throws -> IsoBootFiles?
```

Automatically scans well-known distribution paths in an ISO image to detect kernel and initrd.

### func FindIsoEntry <a id="func-FindIsoEntry"></a>

```vertex
public func FindIsoEntry(from file: fs.File, rootLba: uint32, rootLength: uint32, path: string) throws -> IsoEntry?
```

Finds a file or directory entry by hierarchical path (e.g. "casper/vmlinuz" or "linux").

### func NormalizeIsoName <a id="func-NormalizeIsoName"></a>

```vertex
public func NormalizeIsoName(_ bytes: [uint8]) -> string
```

Normalizes ISO 9660 identifiers: strips version suffix ';1', trailing dots, and converts to lowercase.

### func OpenRaw <a id="func-OpenRaw"></a>

```vertex
public func OpenRaw(_ path: fs.Path, readOnly: bool = false) throws -> Raw
```

Opens a file as a raw disk.

### func ParseIsoPvd <a id="func-ParseIsoPvd"></a>

```vertex
public func ParseIsoPvd(_ b: [uint8]) throws -> IsoInfo
```

Parses an ISO 9660 Primary Volume Descriptor from sector 16 (2048 bytes).

### func ReadIsoDirectory <a id="func-ReadIsoDirectory"></a>

```vertex
public func ReadIsoDirectory(from file: fs.File, at lba: uint32, length: uint32) throws -> [IsoEntry]
```

Reads all directory entries from an ISO 9660 extent at `lba`.

### func ReadIsoFile <a id="func-ReadIsoFile"></a>

```vertex
public func ReadIsoFile(from file: fs.File, entry: IsoEntry) throws -> [uint8]
```

Reads file bytes for an ISO entry in 4 MB chunks.

### func ReadIsoInfo <a id="func-ReadIsoInfo"></a>

```vertex
public func ReadIsoInfo(from file: fs.File) throws -> IsoInfo?
```

Reads ISO 9660 information and scans for El Torito boot record from an open file.

## Types

### enum DiskError <a id="enum-DiskError"></a>

```vertex
public enum DiskError: Error, CustomStringConvertible
```

DiskError is every way an image refuses.

#### Cases

<a id="DiskError.badFormat"></a>

```vertex
case badFormat(string)
```

The bytes aren't the format they were opened as.

<a id="DiskError.unsupported"></a>

```vertex
case unsupported(string)
```

A feature of the format this package doesn't implement.

<a id="DiskError.readOnly"></a>

```vertex
case readOnly(string)
```

<a id="DiskError.outOfRange"></a>

```vertex
case outOfRange(offset: uint64, count: uint64)
```

<a id="DiskError.corrupt"></a>

```vertex
case corrupt(string)
```

The image's own structures disagree with each other.

<a id="DiskError.io"></a>

```vertex
case io(string)
```

#### Properties

<a id="DiskError.description"></a>

```vertex
public var description: string { get }
```

### protocol Image <a id="protocol-Image"></a>

```vertex
public protocol Image: AnyObject
```

A virtual disk's bytes, however they're stored.

Offsets and counts are in bytes. Devices address sectors, so they
multiply by 512 (or their logical block size) before calling.

#### Properties

<a id="Image.Size"></a>

```vertex
var Size: uint64 { get }
```

The size the guest sees, in bytes.

<a id="Image.ReadOnly"></a>

```vertex
var ReadOnly: bool { get }
```

#### Methods

<a id="Image.ReadAt"></a>

```vertex
func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws
```

Reads buffer.count bytes at offset. Unallocated parts of a sparse
image read as zeroes.

<a id="Image.WriteAt"></a>

```vertex
func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws
```

<a id="Image.Flush"></a>

```vertex
func Flush() async throws
```

Makes everything written so far durable.

<a id="Image.Discard"></a>

```vertex
func Discard(_ offset: uint64, count: uint64) async throws
```

The guest no longer needs these bytes (TRIM / DISCARD / DEALLOCATE).
An image may free the space, or do nothing.

<a id="Image.Close"></a>

```vertex
func Close()
```

### struct IsoBootFiles <a id="struct-IsoBootFiles"></a>

```vertex
public struct IsoBootFiles
```

Boot files detected within an ISO installer distribution.

#### Initializers

<a id="IsoBootFiles.init"></a>

```vertex
public init(kernel: IsoEntry, initrd: IsoEntry?, kernelPath: string, initrdPath: string?, recommendedCmdline: string)
```

#### Properties

<a id="IsoBootFiles.Kernel"></a>

```vertex
public let Kernel: IsoEntry
```

<a id="IsoBootFiles.Initrd"></a>

```vertex
public let Initrd: IsoEntry?
```

<a id="IsoBootFiles.KernelPath"></a>

```vertex
public let KernelPath: string
```

<a id="IsoBootFiles.InitrdPath"></a>

```vertex
public let InitrdPath: string?
```

<a id="IsoBootFiles.RecommendedCmdline"></a>

```vertex
public let RecommendedCmdline: string
```

### struct IsoEntry <a id="struct-IsoEntry"></a>

```vertex
public struct IsoEntry: Equatable
```

An entry (file or subdirectory) in an ISO 9660 filesystem.

#### Initializers

<a id="IsoEntry.init"></a>

```vertex
public init(name: string, rawName: string, lba: uint32, size: uint32, isDirectory: bool)
```

#### Properties

<a id="IsoEntry.Name"></a>

```vertex
public let Name: string
```

<a id="IsoEntry.RawName"></a>

```vertex
public let RawName: string
```

<a id="IsoEntry.Lba"></a>

```vertex
public let Lba: uint32
```

<a id="IsoEntry.Size"></a>

```vertex
public let Size: uint32
```

<a id="IsoEntry.IsDirectory"></a>

```vertex
public let IsDirectory: bool
```

### struct IsoInfo <a id="struct-IsoInfo"></a>

```vertex
public struct IsoInfo
```

Metadata parsed from an ISO 9660 Primary Volume Descriptor (ECMA-119).

#### Initializers

<a id="IsoInfo.init"></a>

```vertex
public init(
    volumeId: string,
    systemId: string,
    volumeSpaceSize: uint32,
    logicalBlockSize: uint16,
    publisher: string,
    application: string,
    isBootable: bool = false,
    rootLba: uint32 = 0,
    rootLength: uint32 = 0
)
```

#### Properties

<a id="IsoInfo.VolumeId"></a>

```vertex
public let VolumeId: string
```

<a id="IsoInfo.SystemId"></a>

```vertex
public let SystemId: string
```

<a id="IsoInfo.VolumeSpaceSize"></a>

```vertex
public let VolumeSpaceSize: uint32
```

<a id="IsoInfo.LogicalBlockSize"></a>

```vertex
public let LogicalBlockSize: uint16
```

<a id="IsoInfo.Publisher"></a>

```vertex
public let Publisher: string
```

<a id="IsoInfo.Application"></a>

```vertex
public let Application: string
```

<a id="IsoInfo.IsBootable"></a>

```vertex
public let IsBootable: bool
```

<a id="IsoInfo.RootLba"></a>

```vertex
public let RootLba: uint32
```

<a id="IsoInfo.RootLength"></a>

```vertex
public let RootLength: uint32
```

### class MemoryImage <a id="class-MemoryImage"></a>

```vertex
public final class MemoryImage: Image
```

A disk held in memory, for tests and scratch space.

#### Initializers

<a id="MemoryImage.init"></a>

```vertex
public init(size: int, readOnly: bool = false)
```

<a id="MemoryImage.init-2"></a>

```vertex
public init(bytes: [uint8], readOnly: bool = false)
```

#### Properties

<a id="MemoryImage.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

<a id="MemoryImage.Size"></a>

```vertex
public var Size: uint64 { get }
```

#### Methods

<a id="MemoryImage.ReadAt"></a>

```vertex
public func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws
```

<a id="MemoryImage.WriteAt"></a>

```vertex
public func WriteAt(_ offset: uint64, _ data: borrowing [uint8]) async throws
```

<a id="MemoryImage.Flush"></a>

```vertex
public func Flush() async throws
```

<a id="MemoryImage.Discard"></a>

```vertex
public func Discard(_ offset: uint64, count: uint64) async throws
```

<a id="MemoryImage.Close"></a>

```vertex
public func Close()
```

### class Raw <a id="class-Raw"></a>

```vertex
public final class Raw: Image
```

A disk that is a plain file, byte for byte. ISOs are raw images opened
read-only.

#### Properties

<a id="Raw.Size"></a>

```vertex
public let Size: uint64
```

<a id="Raw.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

#### Methods

<a id="Raw.ReadAt"></a>

```vertex
public func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws
```

<a id="Raw.WriteAt"></a>

```vertex
public func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws
```

<a id="Raw.Flush"></a>

```vertex
public func Flush() async throws
```

<a id="Raw.Discard"></a>

```vertex
public func Discard(_ offset: uint64, count: uint64) async throws
```

<a id="Raw.Close"></a>

```vertex
public func Close()
```

## Files

- image.vs
- iso.vs
- raw.vs
