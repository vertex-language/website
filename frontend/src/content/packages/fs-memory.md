# package memory

```vertex
import "fs/memory"
```

## Index

- [`class MemoryFileSystem: fs.FileSystem`](#class-MemoryFileSystem)
  - [`init()`](#MemoryFileSystem.init)
  - [`func AddFile(_ path: fs.Path, data: [uint8])`](#MemoryFileSystem.AddFile)
  - [`func AddText(_ path: fs.Path, text: string)`](#MemoryFileSystem.AddText)
  - [`func ReadFile(_ path: fs.Path) throws -> [uint8]`](#MemoryFileSystem.ReadFile)
  - [`func ReadDir(_ path: fs.Path) throws -> [fs.DirEntry]`](#MemoryFileSystem.ReadDir)
  - [`func Metadata(_ path: fs.Path) throws -> fs.FileMetadata`](#MemoryFileSystem.Metadata)

## Types

### class MemoryFileSystem <a id="class-MemoryFileSystem"></a>

```vertex
public class MemoryFileSystem: fs.FileSystem
```

An in-memory mock file system implementing fs.FileSystem.

#### Initializers

<a id="MemoryFileSystem.init"></a>

```vertex
public init()
```

#### Methods

<a id="MemoryFileSystem.AddFile"></a>

```vertex
public func AddFile(_ path: fs.Path, data: [uint8])
```

Adds or replaces a file in the in-memory file system.

<a id="MemoryFileSystem.AddText"></a>

```vertex
public func AddText(_ path: fs.Path, text: string)
```

Adds or replaces a text file in the in-memory file system.

<a id="MemoryFileSystem.ReadFile"></a>

```vertex
public func ReadFile(_ path: fs.Path) throws -> [uint8]
```

<a id="MemoryFileSystem.ReadDir"></a>

```vertex
public func ReadDir(_ path: fs.Path) throws -> [fs.DirEntry]
```

<a id="MemoryFileSystem.Metadata"></a>

```vertex
public func Metadata(_ path: fs.Path) throws -> fs.FileMetadata
```

## Files

- memory_fs.vs
