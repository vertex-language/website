# package qcow2

```vertex
import "vm/disk/qcow2"
```

Package qcow2 reads and writes QCOW2 images (versions 2 and 3):
sparse, copy-on-write, with an optional read-only backing image.

## Index

- [`func Open(_ file: fs.File, readOnly: bool = false, openBacking: ((string) throws -> any disk.Image)? = nil) throws -> Image`](#func-Open)
- [`func ParseHeader(_ b: [uint8]) throws -> Header`](#func-ParseHeader)
- [`struct Header`](#struct-Header)
  - [`var Version: uint32`](#Header.Version)
  - [`var BackingFileOffset: uint64`](#Header.BackingFileOffset)
  - [`var BackingFileSize: uint32`](#Header.BackingFileSize)
  - [`var ClusterBits: uint32`](#Header.ClusterBits)
  - [`var Size: uint64`](#Header.Size)
  - [`var CryptMethod: uint32`](#Header.CryptMethod)
  - [`var L1Size: uint32`](#Header.L1Size)
  - [`var L1TableOffset: uint64`](#Header.L1TableOffset)
  - [`var RefcountTableOffset: uint64`](#Header.RefcountTableOffset)
  - [`var RefcountTableClusters: uint32`](#Header.RefcountTableClusters)
  - [`var SnapshotCount: uint32`](#Header.SnapshotCount)
  - [`var SnapshotsOffset: uint64`](#Header.SnapshotsOffset)
  - [`var IncompatibleFeatures: uint64 = 0`](#Header.IncompatibleFeatures)
  - [`var CompatibleFeatures: uint64 = 0`](#Header.CompatibleFeatures)
  - [`var AutoclearFeatures: uint64 = 0`](#Header.AutoclearFeatures)
  - [`var RefcountOrder: uint32 = 4`](#Header.RefcountOrder)
  - [`var HeaderLength: uint32 = 72`](#Header.HeaderLength)
  - [`var ClusterSize: uint64 { get }`](#Header.ClusterSize)
  - [`var L2Entries: uint64 { get }`](#Header.L2Entries)
- [`final class Image: disk.Image`](#class-Image)
  - [`let Header: Header`](#Image.Header)
  - [`let ReadOnly: bool`](#Image.ReadOnly)
  - [`let Backing: (any disk.Image)?`](#Image.Backing)
  - [`var Size: uint64 { get }`](#Image.Size)
  - [`func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws`](#Image.ReadAt)
  - [`func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws`](#Image.WriteAt)
  - [`func Flush() async throws`](#Image.Flush)
  - [`func Discard(_ offset: uint64, count: uint64) async throws`](#Image.Discard)
  - [`func Close()`](#Image.Close)

## Functions

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ file: fs.File, readOnly: bool = false,
                 openBacking: ((string) throws -> any disk.Image)? = nil) throws -> Image
```

Opens a QCOW2 image. The backing file, if the header names one, is
opened read-only by `openBacking`, since only the caller knows where
relative names resolve and which formats to allow.

### func ParseHeader <a id="func-ParseHeader"></a>

```vertex
public func ParseHeader(_ b: [uint8]) throws -> Header
```

Parses a header from the first bytes of an image.

## Types

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header
```

The QCOW2 header: the fields of version 2, and the version 3 extras.

#### Properties

<a id="Header.Version"></a>

```vertex
public var Version: uint32
```

<a id="Header.BackingFileOffset"></a>

```vertex
public var BackingFileOffset: uint64
```

<a id="Header.BackingFileSize"></a>

```vertex
public var BackingFileSize: uint32
```

<a id="Header.ClusterBits"></a>

```vertex
public var ClusterBits: uint32
```

<a id="Header.Size"></a>

```vertex
public var Size: uint64
```

The virtual disk's size in bytes.

<a id="Header.CryptMethod"></a>

```vertex
public var CryptMethod: uint32
```

<a id="Header.L1Size"></a>

```vertex
public var L1Size: uint32
```

<a id="Header.L1TableOffset"></a>

```vertex
public var L1TableOffset: uint64
```

<a id="Header.RefcountTableOffset"></a>

```vertex
public var RefcountTableOffset: uint64
```

<a id="Header.RefcountTableClusters"></a>

```vertex
public var RefcountTableClusters: uint32
```

<a id="Header.SnapshotCount"></a>

```vertex
public var SnapshotCount: uint32
```

<a id="Header.SnapshotsOffset"></a>

```vertex
public var SnapshotsOffset: uint64
```

<a id="Header.IncompatibleFeatures"></a>

```vertex
public var IncompatibleFeatures: uint64 = 0
```

Version 3.

<a id="Header.CompatibleFeatures"></a>

```vertex
public var CompatibleFeatures: uint64 = 0
```

<a id="Header.AutoclearFeatures"></a>

```vertex
public var AutoclearFeatures: uint64 = 0
```

<a id="Header.RefcountOrder"></a>

```vertex
public var RefcountOrder: uint32 = 4
```

<a id="Header.HeaderLength"></a>

```vertex
public var HeaderLength: uint32 = 72
```

<a id="Header.ClusterSize"></a>

```vertex
public var ClusterSize: uint64 { get }
```

<a id="Header.L2Entries"></a>

```vertex
public var L2Entries: uint64 { get }
```

How many 8-byte entries an L2 table holds.

### class Image <a id="class-Image"></a>

```vertex
public final class Image: disk.Image
```

An open QCOW2 image.

#### Properties

<a id="Image.Header"></a>

```vertex
public let Header: Header
```

<a id="Image.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

<a id="Image.Backing"></a>

```vertex
public let Backing: (any disk.Image)?
```

The image unallocated clusters read through to, if any.

<a id="Image.Size"></a>

```vertex
public var Size: uint64 { get }
```

#### Methods

<a id="Image.ReadAt"></a>

```vertex
public func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws
```

<a id="Image.WriteAt"></a>

```vertex
public func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws
```

<a id="Image.Flush"></a>

```vertex
public func Flush() async throws
```

<a id="Image.Discard"></a>

```vertex
public func Discard(_ offset: uint64, count: uint64) async throws
```

<a id="Image.Close"></a>

```vertex
public func Close()
```

## Files

- header.vs
- qcow2.vs
