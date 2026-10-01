# package vhdx

```vertex
import "vm/disk/vhdx"
```

Package vhdx reads and writes VHDX images: the format Hyper-V uses, and
the one Windows images and Windows' own tools produce.

[MS-VHDX]: a file type identifier, two headers (the current one has the
higher sequence number), a region table naming the BAT and the metadata
region, and a log to replay before trusting either.

## Index

- [`func Create(_ path: fs.Path, size: uint64, blockSize: uint32 = 32 << 20) throws -> Image`](#func-Create)
- [`func Open(_ file: fs.File, readOnly: bool = false) throws -> Image`](#func-Open)
- [`final class Image: disk.Image`](#class-Image)
  - [`let Metadata: Metadata`](#Image.Metadata)
  - [`let ReadOnly: bool`](#Image.ReadOnly)
  - [`var Size: uint64 { get }`](#Image.Size)
  - [`func ReadAt(_ offset: uint64, into buffer: inout [uint8]) async throws`](#Image.ReadAt)
  - [`func WriteAt(_ offset: uint64, _ bytes: borrowing [uint8]) async throws`](#Image.WriteAt)
  - [`func Flush() async throws`](#Image.Flush)
  - [`func Discard(_ offset: uint64, count: uint64) async throws`](#Image.Discard)
  - [`func Close()`](#Image.Close)
- [`struct Metadata`](#struct-Metadata)
  - [`var BlockSize: uint32`](#Metadata.BlockSize)
  - [`var LogicalSectorSize: uint32`](#Metadata.LogicalSectorSize)
  - [`var PhysicalSectorSize: uint32`](#Metadata.PhysicalSectorSize)
  - [`var VirtualDiskSize: uint64`](#Metadata.VirtualDiskSize)
  - [`var HasParent: bool`](#Metadata.HasParent)

## Functions

### func Create <a id="func-Create"></a>

```vertex
public func Create(_ path: fs.Path, size: uint64, blockSize: uint32 = 32 << 20) throws -> Image
```

Creates a dynamic VHDX of `size` bytes.

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ file: fs.File, readOnly: bool = false) throws -> Image
```

Opens a VHDX image.

## Types

### class Image <a id="class-Image"></a>

```vertex
public final class Image: disk.Image
```

An open VHDX image.

#### Properties

<a id="Image.Metadata"></a>

```vertex
public let Metadata: Metadata
```

<a id="Image.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

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

### struct Metadata <a id="struct-Metadata"></a>

```vertex
public struct Metadata
```

The parts of the metadata region this package needs.

#### Properties

<a id="Metadata.BlockSize"></a>

```vertex
public var BlockSize: uint32
```

<a id="Metadata.LogicalSectorSize"></a>

```vertex
public var LogicalSectorSize: uint32
```

<a id="Metadata.PhysicalSectorSize"></a>

```vertex
public var PhysicalSectorSize: uint32
```

<a id="Metadata.VirtualDiskSize"></a>

```vertex
public var VirtualDiskSize: uint64
```

<a id="Metadata.HasParent"></a>

```vertex
public var HasParent: bool
```

A differencing disk reads unallocated blocks from its parent.

## Files

- vhdx.vs
