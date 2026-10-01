# package fetch

```vertex
import "oci/fetch"
```

Package fetch brings large files into the store from a URL pinned to
its SHA-256: a kernel, firmware, a disk image. Whatever needs such a
file names it, and fetch downloads it once and checks it, rather than
a repository carrying the bytes.

A fetched file is kept as an OCI 1.1 artifact -- a manifest whose one
layer is the file -- named "vertex.local/files/<name>:<version>", so
the store lists, keeps and prunes it as it does an image, and any
tool that reads an image layout sees what it is.

## Index

- [Constants](#constants)
- [`func Fetch(_ f: File, into st: store.Store, progress: (int64, int64) -> Void = { _, _ in }) async throws -> fs.Path`](#func-Fetch)
- [`func Path(_ f: File, in st: store.Store) -> fs.Path?`](#func-Path)
- [`enum Catalog`](#enum-Catalog)
  - [`static let alpineKernel`](#Catalog.alpineKernel)
  - [`static let alpineInitramfs`](#Catalog.alpineInitramfs)
  - [`static let alpineModloop`](#Catalog.alpineModloop)
  - [`static let alpineBusybox`](#Catalog.alpineBusybox)
  - [`static var All: [File] { get }`](#Catalog.All)
  - [`static func Named(_ name: string) -> File?`](#Catalog.Named)
- [`enum FetchError: Error, CustomStringConvertible`](#enum-FetchError)
  - [`var description: string { get }`](#FetchError.description)
- [`struct File`](#struct-File)
  - [`init(name: string, version: string, url: string, digest: string, size: int64, mediaType: string = spec.MediaType.file)`](#File.init)
  - [`var Name: string`](#File.Name)
  - [`var Version: string`](#File.Version)
  - [`var URL: string`](#File.URL)
  - [`var Digest: string`](#File.Digest)
  - [`var Size: int64`](#File.Size)
  - [`var MediaType: string`](#File.MediaType)
  - [`var Reference: string { get }`](#File.Reference)

## Constants

<a id="let-ArtifactType"></a>

```vertex
public let ArtifactType = "application/vnd.vertex.file.v1"
```

The artifact type a fetched file's manifest has.

<a id="let-SourceAnnotation"></a>

```vertex
public let SourceAnnotation = "org.opencontainers.image.source"
```

Where a file came from.

<a id="let-TitleAnnotation"></a>

```vertex
public let TitleAnnotation = "org.opencontainers.image.title"
```

The annotation a file's own name is kept in.

## Functions

### func Fetch <a id="func-Fetch"></a>

```vertex
@discardableResult
public func Fetch(_ f: File, into st: store.Store, progress: (int64, int64) -> Void = { _, _ in }) async throws -> fs.Path
```

Makes sure the store has `f`, downloading and checking it if not, and
returns where it is.

### func Path <a id="func-Path"></a>

```vertex
public func Path(_ f: File, in st: store.Store) -> fs.Path?
```

Where a fetched file is on disk, if the store has it.

## Types

### enum Catalog <a id="enum-Catalog"></a>

```vertex
public enum Catalog
```

Files vm needs, pinned. A name here is what `oci fetch <name>` takes.

#### Properties

<a id="Catalog.alpineKernel"></a>

```vertex
public static let alpineKernel
```

Alpine 3.20's linux-virt 6.6 kernel for arm64, as an EFI zboot
image: what vm boots a container image's tree with.

<a id="Catalog.alpineInitramfs"></a>

```vertex
public static let alpineInitramfs
```

Its initramfs: busybox, musl and the kernel's virtio modules.

<a id="Catalog.alpineModloop"></a>

```vertex
public static let alpineModloop
```

The kernel's full module set, as a squashfs.

<a id="Catalog.alpineBusybox"></a>

```vertex
public static let alpineBusybox
```

Alpine's statically linked busybox (an .apk: gzipped tars one
after another), which runs in any image whatever its libc: what
vm's init for a container image is written in.

<a id="Catalog.All"></a>

```vertex
public static var All: [File] { get }
```

#### Methods

<a id="Catalog.Named"></a>

```vertex
public static func Named(_ name: string) -> File?
```

### enum FetchError <a id="enum-FetchError"></a>

```vertex
public enum FetchError: Error, CustomStringConvertible
```

#### Cases

<a id="FetchError.status"></a>

```vertex
case status(code: int32, url: string)
```

<a id="FetchError.tooManyRedirects"></a>

```vertex
case tooManyRedirects(string)
```

<a id="FetchError.notAFile"></a>

```vertex
case notAFile(string)
```

<a id="FetchError.unknown"></a>

```vertex
case unknown(string)
```

#### Properties

<a id="FetchError.description"></a>

```vertex
public var description: string { get }
```

### struct File <a id="struct-File"></a>

```vertex
public struct File
```

A file pinned by URL and digest.

#### Initializers

<a id="File.init"></a>

```vertex
public init(name: string, version: string, url: string, digest: string, size: int64,
            mediaType: string = spec.MediaType.file)
```

#### Properties

<a id="File.Name"></a>

```vertex
public var Name: string
```

What it's called in the store, and the name it is found by.

<a id="File.Version"></a>

```vertex
public var Version: string
```

<a id="File.URL"></a>

```vertex
public var URL: string
```

<a id="File.Digest"></a>

```vertex
public var Digest: string
```

"sha256:…"

<a id="File.Size"></a>

```vertex
public var Size: int64
```

<a id="File.MediaType"></a>

```vertex
public var MediaType: string
```

What the file is, for whoever reads the store.

<a id="File.Reference"></a>

```vertex
public var Reference: string { get }
```

Its name in the store: "vertex.local/files/<name>:<version>".

## Files

- fetch.vs
