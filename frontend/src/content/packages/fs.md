# package fs

```vertex
import "fs"
```

## Index

- [`func AppendFile(_ path: Path, _ data: borrowing [uint8]) throws`](#func-AppendFile)
- [`func Canonical(_ path: Path) throws -> Path`](#func-Canonical)
- [`func Copy(_ from: Path, _ to: Path, _ options: CopyOptions = CopyOptions()) throws`](#func-Copy)
- [`func Create(_ path: Path) throws -> File`](#func-Create)
- [`func CreateDir(_ path: Path, all: bool = false) throws`](#func-CreateDir)
- [`func Exists(_ path: Path, followSymlinks: bool = false) -> bool`](#func-Exists)
- [`func HardLink(_ existing: Path, at link: Path) throws`](#func-HardLink)
- [`func Metadata(_ path: Path, followSymlinks: bool = true) throws -> FileMetadata`](#func-Metadata)
- [`func Open(_ path: Path, _ options: OpenOptions = OpenOptions()) throws -> File`](#func-Open)
- [`func OpenDir(_ path: Path, confined: bool = false) throws -> Dir`](#func-OpenDir)
- [`func ReadDir(_ path: Path) throws -> [DirEntry]`](#func-ReadDir)
- [`func ReadFile(_ path: Path) throws -> [uint8]`](#func-ReadFile)
- [`func ReadLink(_ path: Path) throws -> Path`](#func-ReadLink)
- [`func ReadText(_ path: Path) throws -> string`](#func-ReadText)
- [`func Remove(_ path: Path) throws`](#func-Remove)
- [`func RemoveAll(_ path: Path) throws`](#func-RemoveAll)
- [`func Rename(_ from: Path, _ to: Path, replace: bool = true) throws`](#func-Rename)
- [`func SetModTime(_ path: Path, seconds: int64, nanoseconds: int32 = 0, followSymlinks: bool = true) throws`](#func-SetModTime)
- [`func SetPermissions(_ path: Path, _ mode: uint32, followSymlinks: bool = true) throws`](#func-SetPermissions)
- [`func Stat(_ path: Path, followSymlinks: bool = true) throws -> FileMetadata`](#func-Stat)
- [`func Symlink(_ target: Path, at link: Path) throws`](#func-Symlink)
- [`func TempDir(prefix: string = "vertex_fs_") throws -> Path`](#func-TempDir)
- [`func Walk(_ root: Path, _ visit: (DirEntry) throws -> WalkAction) throws`](#func-Walk)
- [`func WriteFile(_ path: Path, _ data: borrowing [uint8], atomic: bool = false) throws`](#func-WriteFile)
- [`func WriteText(_ path: Path, _ text: string, atomic: bool = false) throws`](#func-WriteText)
- [`struct CopyOptions`](#struct-CopyOptions)
  - [`init(overwrite: bool = true, recursive: bool = false)`](#CopyOptions.init)
  - [`var Overwrite: bool = true`](#CopyOptions.Overwrite)
  - [`var Recursive: bool = false`](#CopyOptions.Recursive)
- [`enum CreateMode: Hashable, Equatable`](#enum-CreateMode)
- [`struct Dir`](#struct-Dir)
  - [`init(fd: int32, rootPath: Path, confined: bool = false)`](#Dir.init)
  - [`let Fd: int32`](#Dir.Fd)
  - [`let RootPath: Path`](#Dir.RootPath)
  - [`let Confined: bool`](#Dir.Confined)
  - [`func Open(_ name: Path, _ options: OpenOptions = OpenOptions()) throws -> File`](#Dir.Open)
  - [`func ReadFile(_ name: Path) throws -> [uint8]`](#Dir.ReadFile)
  - [`func WriteFile(_ name: Path, _ data: borrowing [uint8], atomic: bool = false) throws`](#Dir.WriteFile)
  - [`func ReadDir(_ name: Path = ".") throws -> [DirEntry]`](#Dir.ReadDir)
  - [`func CreateDir(_ name: Path, all: bool = false) throws`](#Dir.CreateDir)
  - [`func Remove(_ name: Path) throws`](#Dir.Remove)
  - [`func Close()`](#Dir.Close)
- [`struct DirEntry`](#struct-DirEntry)
  - [`init(path: Path, name: string, kind: FileKind)`](#DirEntry.init)
  - [`let Path: Path`](#DirEntry.Path)
  - [`let Name: string`](#DirEntry.Name)
  - [`let Kind: FileKind`](#DirEntry.Kind)
  - [`func Metadata() throws -> FileMetadata`](#DirEntry.Metadata)
  - [`func Stat() throws -> FileMetadata`](#DirEntry.Stat)
- [`struct File`](#struct-File)
  - [`init(fd: int32, path: Path)`](#File.init)
  - [`let Fd: int32`](#File.Fd)
  - [`let Path: Path`](#File.Path)
  - [`func Read(into buffer: inout [uint8]) throws -> int`](#File.Read)
  - [`func Read(into buffer: inout [uint8], at offset: int64) throws -> int`](#File.Read-2)
  - [`func ReadToEnd(limit: int = 100 * 1024 * 1024) throws -> [uint8]`](#File.ReadToEnd)
  - [`func Write(_ data: borrowing [uint8]) throws`](#File.Write)
  - [`func Write(_ data: borrowing [uint8], at offset: int64) throws`](#File.Write-2)
  - [`func WriteText(_ text: string) throws`](#File.WriteText)
  - [`func Seek(_ to: SeekFrom) throws -> int64`](#File.Seek)
  - [`func SetLength(_ length: int64) throws`](#File.SetLength)
  - [`func Sync(dataOnly: bool = false) throws`](#File.Sync)
  - [`func Metadata() throws -> FileMetadata`](#File.Metadata)
  - [`func Stat() throws -> FileMetadata`](#File.Stat)
  - [`func Flush() throws`](#File.Flush)
  - [`func Close() throws`](#File.Close)
- [`enum FileKind: Hashable, Equatable, CustomStringConvertible`](#enum-FileKind)
  - [`var description: string { get }`](#FileKind.description)
- [`struct FileMetadata`](#struct-FileMetadata)
  - [`init(kind: FileKind, size: int64, modified: Timestamp, accessed: Timestamp, created: Timestamp?, readOnly: bool, unix: UnixMetadata?)`](#FileMetadata.init)
  - [`let Kind: FileKind`](#FileMetadata.Kind)
  - [`let Size: int64`](#FileMetadata.Size)
  - [`let Modified: Timestamp`](#FileMetadata.Modified)
  - [`let Accessed: Timestamp`](#FileMetadata.Accessed)
  - [`let Created: Timestamp?`](#FileMetadata.Created)
  - [`let ReadOnly: bool`](#FileMetadata.ReadOnly)
  - [`let Unix: UnixMetadata?`](#FileMetadata.Unix)
  - [`func IsFile() -> bool`](#FileMetadata.IsFile)
  - [`func IsDir() -> bool`](#FileMetadata.IsDir)
  - [`func IsSymlink() -> bool`](#FileMetadata.IsSymlink)
- [`protocol FileSystem`](#protocol-FileSystem)
  - [`func ReadFile(_ path: Path) throws -> [uint8]`](#FileSystem.ReadFile)
  - [`func ReadDir(_ path: Path) throws -> [DirEntry]`](#FileSystem.ReadDir)
  - [`func Metadata(_ path: Path) throws -> FileMetadata`](#FileSystem.Metadata)
- [`enum FsError: Error`](#enum-FsError)
  - [`var Message: string { get }`](#FsError.Message)
- [`struct Local: FileSystem`](#struct-Local)
  - [`init(root: Path)`](#Local.init)
  - [`let Root: Path`](#Local.Root)
  - [`func ReadFile(_ path: Path) throws -> [uint8]`](#Local.ReadFile)
  - [`func ReadDir(_ path: Path) throws -> [DirEntry]`](#Local.ReadDir)
  - [`func Metadata(_ path: Path) throws -> FileMetadata`](#Local.Metadata)
- [`struct OpenOptions`](#struct-OpenOptions)
  - [`init()`](#OpenOptions.init)
  - [`var Read: bool = true`](#OpenOptions.Read)
  - [`var Write: bool = false`](#OpenOptions.Write)
  - [`var Append: bool = false`](#OpenOptions.Append)
  - [`var Create: CreateMode = .never`](#OpenOptions.Create)
  - [`var Truncate: bool = false`](#OpenOptions.Truncate)
  - [`var Mode: uint32 = 0`](#OpenOptions.Mode)
  - [`static var read: OpenOptions { get }`](#OpenOptions.read)
  - [`static var write: OpenOptions { get }`](#OpenOptions.write)
  - [`static var append: OpenOptions { get }`](#OpenOptions.append)
- [`struct Path: Hashable, CustomStringConvertible, Equatable`](#struct-Path)
  - [`init(_ text: string)`](#Path.init)
  - [`init(stringLiteral value: string)`](#Path.init-2)
  - [`init(bytes: [uint8])`](#Path.init-3)
  - [`let Value: string`](#Path.Value)
  - [`var description: string { get }`](#Path.description)
  - [`var Bytes: [uint8] { get }`](#Path.Bytes)
  - [`func String() -> string`](#Path.String)
  - [`func IsAbsolute() -> bool`](#Path.IsAbsolute)
  - [`func Name() -> string?`](#Path.Name)
  - [`func Parent() -> Path?`](#Path.Parent)
  - [`func Extension() -> string?`](#Path.Extension)
  - [`func Stem() -> string?`](#Path.Stem)
  - [`func WithExtension(_ ext: string) -> Path`](#Path.WithExtension)
  - [`func Join(_ other: Path) -> Path`](#Path.Join)
  - [`func Lexically() -> Path`](#Path.Lexically)
  - [`func Relative(to base: Path) -> Path?`](#Path.Relative)
  - [`func StartsWith(_ prefix: Path) -> bool`](#Path.StartsWith)
  - [`static func / (lhs: Path, rhs: string) -> Path`](#Path.op47)
  - [`static func / (lhs: Path, rhs: Path) -> Path`](#Path.op47-2)
  - [`static func == (lhs: Path, rhs: Path) -> bool`](#Path.op61op61)
- [`typealias SeekFrom = io.SeekFrom`](#typealias-SeekFrom)
- [`struct Timestamp: Hashable, Comparable, CustomStringConvertible`](#struct-Timestamp)
  - [`init(unixSeconds: int64, nanoseconds: int64 = 0)`](#Timestamp.init)
  - [`let UnixSeconds: int64`](#Timestamp.UnixSeconds)
  - [`let Nanoseconds: int32`](#Timestamp.Nanoseconds)
  - [`static let UnixEpoch = Timestamp(unixSeconds: 0)`](#Timestamp.UnixEpoch)
  - [`var description: string { get }`](#Timestamp.description)
  - [`static func Now() -> Timestamp`](#Timestamp.Now)
  - [`static func < (lhs: Timestamp, rhs: Timestamp) -> bool`](#Timestamp.op60)
  - [`static func == (lhs: Timestamp, rhs: Timestamp) -> bool`](#Timestamp.op61op61)
- [`struct UnixMetadata`](#struct-UnixMetadata)
  - [`init(mode: uint32, uid: uint32, gid: uint32, inode: uint64, device: uint64)`](#UnixMetadata.init)
  - [`let Mode: uint32`](#UnixMetadata.Mode)
  - [`let Uid: uint32`](#UnixMetadata.Uid)
  - [`let Gid: uint32`](#UnixMetadata.Gid)
  - [`let Inode: uint64`](#UnixMetadata.Inode)
  - [`let Device: uint64`](#UnixMetadata.Device)
- [`enum WalkAction`](#enum-WalkAction)

## Functions

### func AppendFile <a id="func-AppendFile"></a>

```vertex
public func AppendFile(_ path: Path, _ data: borrowing [uint8]) throws
```

Appends bytes to the end of an existing file or creates it.

### func Canonical <a id="func-Canonical"></a>

```vertex
public func Canonical(_ path: Path) throws -> Path
```

Resolves all symlinks and relative path components to produce a canonical absolute path.

### func Copy <a id="func-Copy"></a>

```vertex
public func Copy(_ from: Path, _ to: Path, _ options: CopyOptions = CopyOptions()) throws
```

Copies a file or directory.

### func Create <a id="func-Create"></a>

```vertex
public func Create(_ path: Path) throws -> File
```

Creates or truncates a file at path for writing.

### func CreateDir <a id="func-CreateDir"></a>

```vertex
public func CreateDir(_ path: Path, all: bool = false) throws
```

Creates a new directory. If all is true, creates parent directories as needed.

### func Exists <a id="func-Exists"></a>

```vertex
public func Exists(_ path: Path, followSymlinks: bool = false) -> bool
```

Fetches metadata for a path.
Whether anything is at `path`: a file, a directory, or a symlink
(dangling or not, unless `followSymlinks`).

### func HardLink <a id="func-HardLink"></a>

```vertex
public func HardLink(_ existing: Path, at link: Path) throws
```

Gives an existing file a second name (a hard link): both names are the
same file.

### func Metadata <a id="func-Metadata"></a>

```vertex
public func Metadata(_ path: Path, followSymlinks: bool = true) throws -> FileMetadata
```

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ path: Path, _ options: OpenOptions = OpenOptions()) throws -> File
```

Opens a file at path with options.

### func OpenDir <a id="func-OpenDir"></a>

```vertex
public func OpenDir(_ path: Path, confined: bool = false) throws -> Dir
```

Opens a directory capability handle.
When confined is true, operations cannot escape the directory via '..' or absolute paths.

### func ReadDir <a id="func-ReadDir"></a>

```vertex
public func ReadDir(_ path: Path) throws -> [DirEntry]
```

Reads all entries in a directory, sorted lexicographically by name.

### func ReadFile <a id="func-ReadFile"></a>

```vertex
public func ReadFile(_ path: Path) throws -> [uint8]
```

Reads an entire file into memory as bytes.

### func ReadLink <a id="func-ReadLink"></a>

```vertex
public func ReadLink(_ path: Path) throws -> Path
```

Reads the target path of a symbolic link.

### func ReadText <a id="func-ReadText"></a>

```vertex
public func ReadText(_ path: Path) throws -> string
```

Reads an entire UTF-8 text file.

### func Remove <a id="func-Remove"></a>

```vertex
public func Remove(_ path: Path) throws
```

Removes a file, symlink, or empty directory.

### func RemoveAll <a id="func-RemoveAll"></a>

```vertex
public func RemoveAll(_ path: Path) throws
```

Recursively removes a path and all of its contents.

### func Rename <a id="func-Rename"></a>

```vertex
public func Rename(_ from: Path, _ to: Path, replace: bool = true) throws
```

Renames or moves a file or directory from one path to another.

### func SetModTime <a id="func-SetModTime"></a>

```vertex
public func SetModTime(_ path: Path, seconds: int64, nanoseconds: int32 = 0, followSymlinks: bool = true) throws
```

Sets a file's modification time (and its access time to the same), in
seconds and nanoseconds since 1970.

### func SetPermissions <a id="func-SetPermissions"></a>

```vertex
public func SetPermissions(_ path: Path, _ mode: uint32, followSymlinks: bool = true) throws
```

Sets a file's permission bits (the low 12 of `mode`: rwx for owner,
group, others, and setuid / setgid / sticky). On Windows only "read-only"
exists: it is set when no one may write. `followSymlinks: false` changes
a symlink itself where the platform can, and is a no-op where it can't.

### func Stat <a id="func-Stat"></a>

```vertex
public func Stat(_ path: Path, followSymlinks: bool = true) throws -> FileMetadata
```

Convenience alias for Metadata, matching standard POSIX/Go terminology.

### func Symlink <a id="func-Symlink"></a>

```vertex
public func Symlink(_ target: Path, at link: Path) throws
```

Creates a symbolic link pointing to target at link path.

### func TempDir <a id="func-TempDir"></a>

```vertex
public func TempDir(prefix: string = "vertex_fs_") throws -> Path
```

Creates a unique temporary directory with the given prefix.

### func Walk <a id="func-Walk"></a>

```vertex
public func Walk(_ root: Path, _ visit: (DirEntry) throws -> WalkAction) throws
```

Recursively walks a directory tree calling visit on each entry.

### func WriteFile <a id="func-WriteFile"></a>

```vertex
public func WriteFile(_ path: Path, _ data: borrowing [uint8], atomic: bool = false) throws
```

Writes byte data to a file. If atomic is true, writes to a temporary file and renames it.

### func WriteText <a id="func-WriteText"></a>

```vertex
public func WriteText(_ path: Path, _ text: string, atomic: bool = false) throws
```

Writes a string to a file as UTF-8.

## Types

### struct CopyOptions <a id="struct-CopyOptions"></a>

```vertex
public struct CopyOptions
```

Options controlling file and directory copy behavior.

#### Initializers

<a id="CopyOptions.init"></a>

```vertex
public init(overwrite: bool = true, recursive: bool = false)
```

#### Properties

<a id="CopyOptions.Overwrite"></a>

```vertex
public var Overwrite: bool = true
```

<a id="CopyOptions.Recursive"></a>

```vertex
public var Recursive: bool = false
```

### enum CreateMode <a id="enum-CreateMode"></a>

```vertex
public enum CreateMode: Hashable, Equatable
```

When a file should be created during an open operation.

#### Cases

<a id="CreateMode.never"></a>

```vertex
case never
```

<a id="CreateMode.ifMissing"></a>

```vertex
case ifMissing
```

<a id="CreateMode.always"></a>

```vertex
case always
```

<a id="CreateMode.new"></a>

```vertex
case new
```

### struct Dir <a id="struct-Dir"></a>

```vertex
public struct Dir
```

A capability handle representing an open directory.

#### Initializers

<a id="Dir.init"></a>

```vertex
public init(fd: int32, rootPath: Path, confined: bool = false)
```

#### Properties

<a id="Dir.Fd"></a>

```vertex
public let Fd: int32
```

<a id="Dir.RootPath"></a>

```vertex
public let RootPath: Path
```

<a id="Dir.Confined"></a>

```vertex
public let Confined: bool
```

#### Methods

<a id="Dir.Open"></a>

```vertex
public func Open(_ name: Path, _ options: OpenOptions = OpenOptions()) throws -> File
```

Opens a file relative to this directory.

<a id="Dir.ReadFile"></a>

```vertex
public func ReadFile(_ name: Path) throws -> [uint8]
```

Reads an entire file relative to this directory.

<a id="Dir.WriteFile"></a>

```vertex
public func WriteFile(_ name: Path, _ data: borrowing [uint8], atomic: bool = false) throws
```

Writes data to a file relative to this directory.

<a id="Dir.ReadDir"></a>

```vertex
public func ReadDir(_ name: Path = ".") throws -> [DirEntry]
```

Reads directory entries relative to this directory.

<a id="Dir.CreateDir"></a>

```vertex
public func CreateDir(_ name: Path, all: bool = false) throws
```

Creates a directory relative to this directory.

<a id="Dir.Remove"></a>

```vertex
public func Remove(_ name: Path) throws
```

Removes a file or empty directory relative to this directory.

<a id="Dir.Close"></a>

```vertex
public func Close()
```

Closes the directory descriptor.

### struct DirEntry <a id="struct-DirEntry"></a>

```vertex
public struct DirEntry
```

A single entry within a directory.

#### Initializers

<a id="DirEntry.init"></a>

```vertex
public init(path: Path, name: string, kind: FileKind)
```

#### Properties

<a id="DirEntry.Path"></a>

```vertex
public let Path: Path
```

<a id="DirEntry.Name"></a>

```vertex
public let Name: string
```

<a id="DirEntry.Kind"></a>

```vertex
public let Kind: FileKind
```

#### Methods

<a id="DirEntry.Metadata"></a>

```vertex
public func Metadata() throws -> FileMetadata
```

Fetches full metadata for this entry.

<a id="DirEntry.Stat"></a>

```vertex
public func Stat() throws -> FileMetadata
```

### struct File <a id="struct-File"></a>

```vertex
public struct File
```

An open file handle.

Conforms by extension to: `io.Reader, io.Writer, io.Seeker, io.Closer`

#### Initializers

<a id="File.init"></a>

```vertex
public init(fd: int32, path: Path)
```

#### Properties

<a id="File.Fd"></a>

```vertex
public let Fd: int32
```

<a id="File.Path"></a>

```vertex
public let Path: Path
```

#### Methods

<a id="File.Read"></a>

```vertex
public func Read(into buffer: inout [uint8]) throws -> int
```

Reads up to buffer.count bytes into buffer. Returns number of bytes read (0 at EOF).

<a id="File.Read-2"></a>

```vertex
public func Read(into buffer: inout [uint8], at offset: int64) throws -> int
```

Reads up to buffer.count bytes starting at offset without changing the file position.

<a id="File.ReadToEnd"></a>

```vertex
public func ReadToEnd(limit: int = 100 * 1024 * 1024) throws -> [uint8]
```

Reads all remaining bytes from the file up to limit.

<a id="File.Write"></a>

```vertex
public func Write(_ data: borrowing [uint8]) throws
```

Writes every byte of data to the file.

<a id="File.Write-2"></a>

```vertex
public func Write(_ data: borrowing [uint8], at offset: int64) throws
```

Writes data starting at offset without changing the file position.

<a id="File.WriteText"></a>

```vertex
public func WriteText(_ text: string) throws
```

Writes text as UTF-8.

<a id="File.Seek"></a>

```vertex
public func Seek(_ to: SeekFrom) throws -> int64
```

Seeks to a new position.

<a id="File.SetLength"></a>

```vertex
public func SetLength(_ length: int64) throws
```

Truncates or extends the file to length bytes.

<a id="File.Sync"></a>

```vertex
public func Sync(dataOnly: bool = false) throws
```

Flushes unwritten data and metadata to disk.

<a id="File.Metadata"></a>

```vertex
public func Metadata() throws -> FileMetadata
```

Inspects file metadata from the open file descriptor.

<a id="File.Stat"></a>

```vertex
public func Stat() throws -> FileMetadata
```

<a id="File.Flush"></a>

```vertex
public func Flush() throws
```

Nothing: a File keeps no buffer in the process, so every Write has
reached the operating system when it returns. It is here so that a
File is an io.Writer; `Sync` is what makes the data durable.

<a id="File.Close"></a>

```vertex
public func Close() throws
```

Closes the open file handle.

### enum FileKind <a id="enum-FileKind"></a>

```vertex
public enum FileKind: Hashable, Equatable, CustomStringConvertible
```

The kind of file system entry.

#### Cases

<a id="FileKind.file"></a>

```vertex
case file
```

<a id="FileKind.directory"></a>

```vertex
case directory
```

<a id="FileKind.symlink"></a>

```vertex
case symlink
```

<a id="FileKind.other"></a>

```vertex
case other
```

#### Properties

<a id="FileKind.description"></a>

```vertex
public var description: string { get }
```

### struct FileMetadata <a id="struct-FileMetadata"></a>

```vertex
public struct FileMetadata
```

File system item metadata.

#### Initializers

<a id="FileMetadata.init"></a>

```vertex
public init(kind: FileKind, size: int64, modified: Timestamp, accessed: Timestamp,
            created: Timestamp?, readOnly: bool, unix: UnixMetadata?)
```

#### Properties

<a id="FileMetadata.Kind"></a>

```vertex
public let Kind: FileKind
```

<a id="FileMetadata.Size"></a>

```vertex
public let Size: int64
```

<a id="FileMetadata.Modified"></a>

```vertex
public let Modified: Timestamp
```

<a id="FileMetadata.Accessed"></a>

```vertex
public let Accessed: Timestamp
```

<a id="FileMetadata.Created"></a>

```vertex
public let Created: Timestamp?
```

<a id="FileMetadata.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

<a id="FileMetadata.Unix"></a>

```vertex
public let Unix: UnixMetadata?
```

#### Methods

<a id="FileMetadata.IsFile"></a>

```vertex
public func IsFile() -> bool
```

<a id="FileMetadata.IsDir"></a>

```vertex
public func IsDir() -> bool
```

<a id="FileMetadata.IsSymlink"></a>

```vertex
public func IsSymlink() -> bool
```

### protocol FileSystem <a id="protocol-FileSystem"></a>

```vertex
public protocol FileSystem
```

A read-only file system abstraction.

#### Methods

<a id="FileSystem.ReadFile"></a>

```vertex
func ReadFile(_ path: Path) throws -> [uint8]
```

<a id="FileSystem.ReadDir"></a>

```vertex
func ReadDir(_ path: Path) throws -> [DirEntry]
```

<a id="FileSystem.Metadata"></a>

```vertex
func Metadata(_ path: Path) throws -> FileMetadata
```

### enum FsError <a id="enum-FsError"></a>

```vertex
public enum FsError: Error
```

FsError represents every way a file system operation can fail.

#### Cases

<a id="FsError.notFound"></a>

```vertex
case notFound(string)
```

<a id="FsError.alreadyExists"></a>

```vertex
case alreadyExists(string)
```

<a id="FsError.permissionDenied"></a>

```vertex
case permissionDenied(string)
```

<a id="FsError.notADirectory"></a>

```vertex
case notADirectory(string)
```

<a id="FsError.isADirectory"></a>

```vertex
case isADirectory(string)
```

<a id="FsError.directoryNotEmpty"></a>

```vertex
case directoryNotEmpty(string)
```

<a id="FsError.readOnly"></a>

```vertex
case readOnly(string)
```

<a id="FsError.noSpace"></a>

```vertex
case noSpace(string)
```

<a id="FsError.tooManyOpenFiles"></a>

```vertex
case tooManyOpenFiles(string)
```

<a id="FsError.crossesDevices"></a>

```vertex
case crossesDevices(string)
```

<a id="FsError.invalidPath"></a>

```vertex
case invalidPath(string)
```

<a id="FsError.interrupted"></a>

```vertex
case interrupted(string)
```

<a id="FsError.generic"></a>

```vertex
case generic(string)
```

<a id="FsError.systemError"></a>

```vertex
case systemError(code: int32, context: string)
```

#### Properties

<a id="FsError.Message"></a>

```vertex
public var Message: string { get }
```

Formatted message describing what failed and why.

### struct Local <a id="struct-Local"></a>

```vertex
public struct Local: FileSystem
```

A FileSystem backed by the local operating system directory tree.

#### Initializers

<a id="Local.init"></a>

```vertex
public init(root: Path)
```

#### Properties

<a id="Local.Root"></a>

```vertex
public let Root: Path
```

#### Methods

<a id="Local.ReadFile"></a>

```vertex
public func ReadFile(_ path: Path) throws -> [uint8]
```

<a id="Local.ReadDir"></a>

```vertex
public func ReadDir(_ path: Path) throws -> [DirEntry]
```

<a id="Local.Metadata"></a>

```vertex
public func Metadata(_ path: Path) throws -> FileMetadata
```

### struct OpenOptions <a id="struct-OpenOptions"></a>

```vertex
public struct OpenOptions
```

Options configuring how a file is opened.

#### Initializers

<a id="OpenOptions.init"></a>

```vertex
public init()
```

#### Properties

<a id="OpenOptions.Read"></a>

```vertex
public var Read: bool = true
```

<a id="OpenOptions.Write"></a>

```vertex
public var Write: bool = false
```

<a id="OpenOptions.Append"></a>

```vertex
public var Append: bool = false
```

<a id="OpenOptions.Create"></a>

```vertex
public var Create: CreateMode = .never
```

<a id="OpenOptions.Truncate"></a>

```vertex
public var Truncate: bool = false
```

<a id="OpenOptions.Mode"></a>

```vertex
public var Mode: uint32 = 0
```

<a id="OpenOptions.read"></a>

```vertex
public static var read: OpenOptions { get }
```

<a id="OpenOptions.write"></a>

```vertex
public static var write: OpenOptions { get }
```

<a id="OpenOptions.append"></a>

```vertex
public static var append: OpenOptions { get }
```

### struct Path <a id="struct-Path"></a>

```vertex
public struct Path: Hashable, CustomStringConvertible, Equatable
```

A strongly-typed representation of a file system path.

#### Initializers

<a id="Path.init"></a>

```vertex
public init(_ text: string)
```

<a id="Path.init-2"></a>

```vertex
public init(stringLiteral value: string)
```

<a id="Path.init-3"></a>

```vertex
public init(bytes: [uint8])
```

#### Properties

<a id="Path.Value"></a>

```vertex
public let Value: string
```

<a id="Path.description"></a>

```vertex
public var description: string { get }
```

<a id="Path.Bytes"></a>

```vertex
public var Bytes: [uint8] { get }
```

#### Methods

<a id="Path.String"></a>

```vertex
public func String() -> string
```

<a id="Path.IsAbsolute"></a>

```vertex
public func IsAbsolute() -> bool
```

<a id="Path.Name"></a>

```vertex
public func Name() -> string?
```

The trailing name component of the path.

<a id="Path.Parent"></a>

```vertex
public func Parent() -> Path?
```

The parent directory component of the path.

<a id="Path.Extension"></a>

```vertex
public func Extension() -> string?
```

The file extension, excluding the leading dot.

<a id="Path.Stem"></a>

```vertex
public func Stem() -> string?
```

The file stem: the Name excluding its Extension.

<a id="Path.WithExtension"></a>

```vertex
public func WithExtension(_ ext: string) -> Path
```

Returns a new Path with the extension replaced or appended.

<a id="Path.Join"></a>

```vertex
public func Join(_ other: Path) -> Path
```

Joins another Path to this one.

<a id="Path.Lexically"></a>

```vertex
public func Lexically() -> Path
```

Lexically normalizes the path without touching the disk.

<a id="Path.Relative"></a>

```vertex
public func Relative(to base: Path) -> Path?
```

Computes the relative path from base to this path.

<a id="Path.StartsWith"></a>

```vertex
public func StartsWith(_ prefix: Path) -> bool
```

Checks if this path starts with the given prefix path.

<a id="Path.op47"></a>

```vertex
public static func / (lhs: Path, rhs: string) -> Path
```

<a id="Path.op47-2"></a>

```vertex
public static func / (lhs: Path, rhs: Path) -> Path
```

<a id="Path.op61op61"></a>

```vertex
public static func == (lhs: Path, rhs: Path) -> bool
```

### typealias SeekFrom <a id="typealias-SeekFrom"></a>

```vertex
public typealias SeekFrom = io.SeekFrom
```

The reference position for a file seek operation: io's, so a File
seeks as any io.Seeker does.

### struct Timestamp <a id="struct-Timestamp"></a>

```vertex
public struct Timestamp: Hashable, Comparable, CustomStringConvertible
```

A moment on the wall clock, measured in seconds and nanoseconds since the Unix epoch.

#### Initializers

<a id="Timestamp.init"></a>

```vertex
public init(unixSeconds: int64, nanoseconds: int64 = 0)
```

#### Properties

<a id="Timestamp.UnixSeconds"></a>

```vertex
public let UnixSeconds: int64
```

<a id="Timestamp.Nanoseconds"></a>

```vertex
public let Nanoseconds: int32
```

<a id="Timestamp.UnixEpoch"></a>

```vertex
public static let UnixEpoch = Timestamp(unixSeconds: 0)
```

<a id="Timestamp.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="Timestamp.Now"></a>

```vertex
public static func Now() -> Timestamp
```

<a id="Timestamp.op60"></a>

```vertex
public static func < (lhs: Timestamp, rhs: Timestamp) -> bool
```

<a id="Timestamp.op61op61"></a>

```vertex
public static func == (lhs: Timestamp, rhs: Timestamp) -> bool
```

### struct UnixMetadata <a id="struct-UnixMetadata"></a>

```vertex
public struct UnixMetadata
```

Platform-specific Unix metadata fields.

#### Initializers

<a id="UnixMetadata.init"></a>

```vertex
public init(mode: uint32, uid: uint32, gid: uint32, inode: uint64, device: uint64)
```

#### Properties

<a id="UnixMetadata.Mode"></a>

```vertex
public let Mode: uint32
```

<a id="UnixMetadata.Uid"></a>

```vertex
public let Uid: uint32
```

<a id="UnixMetadata.Gid"></a>

```vertex
public let Gid: uint32
```

<a id="UnixMetadata.Inode"></a>

```vertex
public let Inode: uint64
```

<a id="UnixMetadata.Device"></a>

```vertex
public let Device: uint64
```

### enum WalkAction <a id="enum-WalkAction"></a>

```vertex
public enum WalkAction
```

Control action for recursive directory traversal.

#### Cases

<a id="WalkAction.continue"></a>

```vertex
case `continue`
```

<a id="WalkAction.skipDir"></a>

```vertex
case skipDir
```

<a id="WalkAction.stop"></a>

```vertex
case stop
```

## Files

- dir.vs
- entries.vs
- error.vs
- file.vs
- filesystem.vs
- io.vs
- metadata.vs
- operations.vs
- options.vs
- path.vs
