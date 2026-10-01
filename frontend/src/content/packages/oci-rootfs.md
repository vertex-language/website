# package rootfs

```vertex
import "oci/rootfs"
```

Package rootfs makes an image's layers into one filesystem tree.

Layers are tars applied bottom first; a layer removes what is below it
with whiteouts (`.wh.<name>` deletes <name>, `.wh..wh..opq` empties
its directory of what lower layers put there). Merge reads the layers'
headers and works out the tree that results -- which entry, from which
layer, is at each path -- without writing anything. Emit then streams
the layers once more and hands each surviving entry to a Sink:

- CpioSink writes a newc archive: the tree exactly, owners, modes and

```vertex
device nodes included -- what a VM boots as its initramfs.
```

- DirSink writes the tree into a host directory, as far as the host

```vertex
allows: owners and device nodes need root, and a case-insensitive
filesystem can't hold names that differ only by case.
```

A Sink is given directories first, then links and special files, then
the files' contents a layer at a time, and hard links last -- so a
parent is always there before what is in it.

## Index

- [`func Clean(_ name: string) throws -> string`](#func-Clean)
- [`func Layers(of img: store.Image, in st: store.Store) throws -> [Layer]`](#func-Layers)
- [`func Merge(_ layers: [Layer]) throws -> Plan`](#func-Merge)
- [`func Merge(_ img: store.Image, in st: store.Store) throws -> Plan`](#func-Merge-2)
- [`final class CpioSink: Sink`](#class-CpioSink)
  - [`init(path: fs.Path, plan: Plan) throws`](#CpioSink.init)
  - [`private(set) var Count: int = 0`](#CpioSink.Count)
  - [`func Add(_ e: Entry, _ data: [uint8]) throws`](#CpioSink.Add)
  - [`func AddFile(_ path: string, _ data: [uint8], mode: uint32 = 0o755) throws`](#CpioSink.AddFile)
  - [`func AddEntry(_ e: Entry) throws`](#CpioSink.AddEntry)
  - [`func Finish() throws`](#CpioSink.Finish)
- [`final class DirSink: Sink`](#class-DirSink)
  - [`init(root: fs.Path) throws`](#DirSink.init)
  - [`let Root: fs.Path`](#DirSink.Root)
  - [`private(set) var Skipped: int = 0`](#DirSink.Skipped)
  - [`private(set) var Count: int = 0`](#DirSink.Count)
  - [`func Add(_ e: Entry, _ data: [uint8]) throws`](#DirSink.Add)
  - [`func Finish() throws`](#DirSink.Finish)
- [`struct Entry`](#struct-Entry)
  - [`var Path: string`](#Entry.Path)
  - [`var Kind: Kind`](#Entry.Kind)
  - [`var Mode: uint32`](#Entry.Mode)
  - [`var Uid: uint32`](#Entry.Uid)
  - [`var Gid: uint32`](#Entry.Gid)
  - [`var ModTime: int64`](#Entry.ModTime)
  - [`var Size: int64`](#Entry.Size)
  - [`var Linkname: string`](#Entry.Linkname)
  - [`var DevMajor: uint32`](#Entry.DevMajor)
  - [`var DevMinor: uint32`](#Entry.DevMinor)
  - [`var Layer: int`](#Entry.Layer)
- [`enum Kind: Equatable, CustomStringConvertible`](#enum-Kind)
  - [`var description: string { get }`](#Kind.description)
- [`struct Layer`](#struct-Layer)
  - [`init(path: fs.Path, mediaType: string)`](#Layer.init)
  - [`var Path: fs.Path`](#Layer.Path)
  - [`var MediaType: string`](#Layer.MediaType)
- [`struct LayerStream: io.Reader`](#struct-LayerStream)
  - [`init(path: fs.Path, mediaType: string) throws`](#LayerStream.init)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#LayerStream.Read)
  - [`func Close()`](#LayerStream.Close)
- [`final class Plan`](#class-Plan)
  - [`let Layers: [Layer]`](#Plan.Layers)
  - [`private(set) var Whiteouts: int = 0`](#Plan.Whiteouts)
  - [`var Entries: [Entry] { get }`](#Plan.Entries)
  - [`var Count: int { get }`](#Plan.Count)
  - [`var LinkCounts: [string: int] { get }`](#Plan.LinkCounts)
  - [`var FileBytes: int64 { get }`](#Plan.FileBytes)
  - [`func Lookup(_ path: string) -> Entry?`](#Plan.Lookup)
  - [`func Emit(to sink: Sink) throws`](#Plan.Emit)
- [`enum RootfsError: Error, CustomStringConvertible`](#enum-RootfsError)
  - [`var description: string { get }`](#RootfsError.description)
- [`protocol Sink: AnyObject`](#protocol-Sink)
  - [`func Add(_ e: Entry, _ data: [uint8]) throws`](#Sink.Add)
  - [`func Finish() throws`](#Sink.Finish)

## Functions

### func Clean <a id="func-Clean"></a>

```vertex
public func Clean(_ name: string) throws -> string
```

A path from a tar as a path in the tree: no "./", no leading or
trailing "/", and nothing that climbs out. "" is the root itself.

### func Layers <a id="func-Layers"></a>

```vertex
public func Layers(of img: store.Image, in st: store.Store) throws -> [Layer]
```

The layers of an image in a store, bottom first.

### func Merge <a id="func-Merge"></a>

```vertex
public func Merge(_ layers: [Layer]) throws -> Plan
```

Reads the layers' headers and works out the tree they make.

### func Merge <a id="func-Merge-2"></a>

```vertex
public func Merge(_ img: store.Image, in st: store.Store) throws -> Plan
```

Merge for an image in a store.

## Types

### class CpioSink <a id="class-CpioSink"></a>

```vertex
public final class CpioSink: Sink
```

Writes the tree as a newc cpio archive -- a Linux initramfs -- with
every owner, mode, device node and hard link as the image has them.

#### Initializers

<a id="CpioSink.init"></a>

```vertex
public init(path: fs.Path, plan: Plan) throws
```

Writes to `path`. `plan` says which files have hard links, which
the kernel needs to know at the first of them.

#### Properties

<a id="CpioSink.Count"></a>

```vertex
public private(set) var Count: int = 0
```

Entries written.

#### Methods

<a id="CpioSink.Add"></a>

```vertex
public func Add(_ e: Entry, _ data: [uint8]) throws
```

<a id="CpioSink.AddFile"></a>

```vertex
public func AddFile(_ path: string, _ data: [uint8], mode: uint32 = 0o755) throws
```

Adds a file the image doesn't have -- an /init, a module -- owned
by root.

<a id="CpioSink.AddEntry"></a>

```vertex
public func AddEntry(_ e: Entry) throws
```

Adds a directory, a symlink or a device node the image doesn't have.

<a id="CpioSink.Finish"></a>

```vertex
public func Finish() throws
```

### class DirSink <a id="class-DirSink"></a>

```vertex
public final class DirSink: Sink
```

Writes the tree into a directory on this machine, as far as it can:
owners are not set and device nodes are skipped (they need root), and
on a case-insensitive filesystem the later of two names that differ
only by case wins.

#### Initializers

<a id="DirSink.init"></a>

```vertex
public init(root: fs.Path) throws
```

#### Properties

<a id="DirSink.Root"></a>

```vertex
public let Root: fs.Path
```

<a id="DirSink.Skipped"></a>

```vertex
public private(set) var Skipped: int = 0
```

Device nodes and fifos not made.

<a id="DirSink.Count"></a>

```vertex
public private(set) var Count: int = 0
```

#### Methods

<a id="DirSink.Add"></a>

```vertex
public func Add(_ e: Entry, _ data: [uint8]) throws
```

<a id="DirSink.Finish"></a>

```vertex
public func Finish() throws
```

### struct Entry <a id="struct-Entry"></a>

```vertex
public struct Entry
```

One path of the merged tree.

#### Properties

<a id="Entry.Path"></a>

```vertex
public var Path: string
```

Relative to the root, no leading "/": "usr/bin/env".

<a id="Entry.Kind"></a>

```vertex
public var Kind: Kind
```

<a id="Entry.Mode"></a>

```vertex
public var Mode: uint32
```

Permission bits, setuid/setgid/sticky included (no type bits).

<a id="Entry.Uid"></a>

```vertex
public var Uid: uint32
```

<a id="Entry.Gid"></a>

```vertex
public var Gid: uint32
```

<a id="Entry.ModTime"></a>

```vertex
public var ModTime: int64
```

<a id="Entry.Size"></a>

```vertex
public var Size: int64
```

<a id="Entry.Linkname"></a>

```vertex
public var Linkname: string
```

A symlink's target, or the path a hard link shares a file with.

<a id="Entry.DevMajor"></a>

```vertex
public var DevMajor: uint32
```

<a id="Entry.DevMinor"></a>

```vertex
public var DevMinor: uint32
```

<a id="Entry.Layer"></a>

```vertex
public var Layer: int
```

Which layer it came from, bottom 0.

### enum Kind <a id="enum-Kind"></a>

```vertex
public enum Kind: Equatable, CustomStringConvertible
```

#### Cases

<a id="Kind.file"></a>

```vertex
case file
```

<a id="Kind.directory"></a>

```vertex
case directory
```

<a id="Kind.symlink"></a>

```vertex
case symlink
```

<a id="Kind.hardlink"></a>

```vertex
case hardlink
```

<a id="Kind.charDevice"></a>

```vertex
case charDevice
```

<a id="Kind.blockDevice"></a>

```vertex
case blockDevice
```

<a id="Kind.fifo"></a>

```vertex
case fifo
```

#### Properties

<a id="Kind.description"></a>

```vertex
public var description: string { get }
```

### struct Layer <a id="struct-Layer"></a>

```vertex
public struct Layer
```

A layer's blob and type.

#### Initializers

<a id="Layer.init"></a>

```vertex
public init(path: fs.Path, mediaType: string)
```

#### Properties

<a id="Layer.Path"></a>

```vertex
public var Path: fs.Path
```

<a id="Layer.MediaType"></a>

```vertex
public var MediaType: string
```

### struct LayerStream <a id="struct-LayerStream"></a>

```vertex
public struct LayerStream: io.Reader
```

A layer as a stream of tar bytes, decompressed if it is gzipped.

#### Initializers

<a id="LayerStream.init"></a>

```vertex
public init(path: fs.Path, mediaType: string) throws
```

#### Methods

<a id="LayerStream.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

<a id="LayerStream.Close"></a>

```vertex
public func Close()
```

### class Plan <a id="class-Plan"></a>

```vertex
public final class Plan
```

The tree a stack of layers makes.

#### Properties

<a id="Plan.Layers"></a>

```vertex
public let Layers: [Layer]
```

<a id="Plan.Whiteouts"></a>

```vertex
public private(set) var Whiteouts: int = 0
```

Whiteouts applied, for a summary.

<a id="Plan.Entries"></a>

```vertex
public var Entries: [Entry] { get }
```

Every entry, parents before children.

<a id="Plan.Count"></a>

```vertex
public var Count: int { get }
```

<a id="Plan.LinkCounts"></a>

```vertex
public var LinkCounts: [string: int] { get }
```

Bytes of file contents in the tree.
How many hard links the tree has to each file that has any.

<a id="Plan.FileBytes"></a>

```vertex
public var FileBytes: int64 { get }
```

#### Methods

<a id="Plan.Lookup"></a>

```vertex
public func Lookup(_ path: string) -> Entry?
```

The entry at a path, if the tree has one.

<a id="Plan.Emit"></a>

```vertex
public func Emit(to sink: Sink) throws
```

Hands the tree to `sink`: directories, then symlinks and special
files, then each layer's files as it is read, then hard links.

### enum RootfsError <a id="enum-RootfsError"></a>

```vertex
public enum RootfsError: Error, CustomStringConvertible
```

#### Cases

<a id="RootfsError.unsafePath"></a>

```vertex
case unsafePath(string)
```

<a id="RootfsError.unsupportedLayer"></a>

```vertex
case unsupportedLayer(string)
```

#### Properties

<a id="RootfsError.description"></a>

```vertex
public var description: string { get }
```

### protocol Sink <a id="protocol-Sink"></a>

```vertex
public protocol Sink: AnyObject
```

What receives the merged tree.

#### Methods

<a id="Sink.Add"></a>

```vertex
func Add(_ e: Entry, _ data: [uint8]) throws
```

One entry. `data` is a file's contents; empty for anything else.

<a id="Sink.Finish"></a>

```vertex
func Finish() throws
```

Called once every entry has been added.

## Files

- rootfs.vs
- sinks.vs
