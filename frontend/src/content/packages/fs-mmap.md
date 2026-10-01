# package mmap

```vertex
import "fs/mmap"
```

Package mmap maps a file into memory, read-only: its bytes are read in
place, without copying, and pages come in from disk as they are touched.
What model weights are loaded through.

## Index

- [`func Anonymous(_ count: int) throws -> Mapping`](#func-Anonymous)
- [`func Map(_ path: fs.Path) throws -> Mapping`](#func-Map)
- [`enum MapError: Error`](#enum-MapError)
  - [`var Message: string { get }`](#MapError.Message)
- [`final class Mapping`](#class-Mapping)
  - [`let Count: int`](#Mapping.Count)
  - [`var RawPointer: UnsafeMutableRawPointer? { get }`](#Mapping.RawPointer)
  - [`var Bytes: UnsafePointer<uint8>? { get }`](#Mapping.Bytes)
  - [`func Copy(from offset: int, count: int) -> [uint8]`](#Mapping.Copy)

## Functions

### func Anonymous <a id="func-Anonymous"></a>

```vertex
public func Anonymous(_ count: int) throws -> Mapping
```

Anonymous maps count bytes of writable, zero-initialized anonymous memory.

### func Map <a id="func-Map"></a>

```vertex
public func Map(_ path: fs.Path) throws -> Mapping
```

Map maps the whole file at path, read-only.

## Types

### enum MapError <a id="enum-MapError"></a>

```vertex
public enum MapError: Error
```

MapError is a mapping the operating system refused.

#### Cases

<a id="MapError.failed"></a>

```vertex
case failed(code: int32, path: string)
```

#### Properties

<a id="MapError.Message"></a>

```vertex
public var Message: string { get }
```

### class Mapping <a id="class-Mapping"></a>

```vertex
public final class Mapping
```

Mapping is a file's bytes in memory, valid until the last reference to
it goes: then the pages are unmapped. An empty file maps to no bytes.

#### Properties

<a id="Mapping.Count"></a>

```vertex
public let Count: int
```

Count is how many bytes are mapped: the file's size.

<a id="Mapping.RawPointer"></a>

```vertex
public var RawPointer: UnsafeMutableRawPointer? { get }
```

RawPointer is the mutable base address of the mapping.

<a id="Mapping.Bytes"></a>

```vertex
public var Bytes: UnsafePointer<uint8>? { get }
```

Bytes is the first mapped byte, or nil for an empty file. Reading
past Count is out of the mapping.

#### Methods

<a id="Mapping.Copy"></a>

```vertex
public func Copy(from offset: int, count: int) -> [uint8]
```

Copy is count bytes from offset, copied out; a range outside the
mapping traps.

## Files

- mmap.vs
