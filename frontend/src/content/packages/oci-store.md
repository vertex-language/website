# package store

```vertex
import "oci/store"
```

Package store keeps images on disk as an OCI image layout
(image-spec, image-layout.md): content-addressed blobs, and an index
naming the images that are kept.

```vertex
<root>/oci-layout              {"imageLayoutVersion": "1.0.0"}
<root>/index.json              one descriptor per name
<root>/blobs/sha256/<hex>      manifests, configs, layers, files
<root>/ingest/                 blobs being written
```

Any tool that reads an image layout -- skopeo, crane, containerd's
import -- reads this directory as it is. A name is kept as the
`org.opencontainers.image.ref.name` annotation, spelled in full
("docker.io/library/alpine:3.20").

## Index

- [Constants](#constants)
- [`func DefaultRoot() -> string`](#func-DefaultRoot)
- [`struct Image`](#struct-Image)
  - [`var Name: string`](#Image.Name)
  - [`var ManifestDigest: digest.Digest`](#Image.ManifestDigest)
  - [`var Manifest: spec.Manifest`](#Image.Manifest)
  - [`var Config: spec.Config`](#Image.Config)
  - [`var Size: int64 { get }`](#Image.Size)
- [`final class Ingest`](#class-Ingest)
  - [`private(set) var Written: int64 = 0`](#Ingest.Written)
  - [`var Digest: digest.Digest { get }`](#Ingest.Digest)
  - [`func Write(_ bytes: [uint8]) throws`](#Ingest.Write)
  - [`func Commit(expected: digest.Digest? = nil, size: int64 = -1) throws -> digest.Digest`](#Ingest.Commit)
  - [`func Abort()`](#Ingest.Abort)
- [`struct Record`](#struct-Record)
  - [`var Name: string`](#Record.Name)
  - [`var Descriptor: spec.Descriptor`](#Record.Descriptor)
- [`final class Store`](#class-Store)
  - [`init(root: string? = nil) throws`](#Store.init)
  - [`let Root: fs.Path`](#Store.Root)
  - [`var Records: [Record] { get }`](#Store.Records)
  - [`func BlobPath(_ d: digest.Digest) -> fs.Path`](#Store.BlobPath)
  - [`func HasBlob(_ d: digest.Digest) -> bool`](#Store.HasBlob)
  - [`func ReadBlob(_ d: digest.Digest) throws -> [uint8]`](#Store.ReadBlob)
  - [`func WriteBlob(_ bytes: [uint8]) throws -> digest.Digest`](#Store.WriteBlob)
  - [`func BeginIngest(_ name: string) throws -> Ingest`](#Store.BeginIngest)
  - [`func BlobSize(_ d: digest.Digest) throws -> int64`](#Store.BlobSize)
  - [`func Tag(_ name: string, _ d: spec.Descriptor) throws`](#Store.Tag)
  - [`func Untag(_ name: string) throws`](#Store.Untag)
  - [`func Resolve(_ name: string) -> Record?`](#Store.Resolve)
  - [`func Image(_ name: string, platform: spec.Platform = spec.Platform.Default) throws -> Image`](#Store.Image)
  - [`func Prune() throws -> int64`](#Store.Prune)
- [`enum StoreError: Error, CustomStringConvertible`](#enum-StoreError)
  - [`var description: string { get }`](#StoreError.description)

## Constants

<a id="let-RefNameAnnotation"></a>

```vertex
public let RefNameAnnotation = "org.opencontainers.image.ref.name"
```

The annotation an image layout names its images by.

## Functions

### func DefaultRoot <a id="func-DefaultRoot"></a>

```vertex
public func DefaultRoot() -> string
```

Where images are kept unless a root is given: $VERTEX_OCI_ROOT, else
"vertex/oci" under the user's data directory (~/Library/Application
Support on macOS, ~/.local/share on Linux, %APPDATA% on Windows).

## Types

### struct Image <a id="struct-Image"></a>

```vertex
public struct Image
```

An image read out of the store: its manifest, its config, and the
digest it was found under.

#### Properties

<a id="Image.Name"></a>

```vertex
public var Name: string
```

<a id="Image.ManifestDigest"></a>

```vertex
public var ManifestDigest: digest.Digest
```

<a id="Image.Manifest"></a>

```vertex
public var Manifest: spec.Manifest
```

<a id="Image.Config"></a>

```vertex
public var Config: spec.Config
```

<a id="Image.Size"></a>

```vertex
public var Size: int64 { get }
```

The total compressed size of the layers.

### class Ingest <a id="class-Ingest"></a>

```vertex
public final class Ingest
```

A blob being written a piece at a time -- a layer as it downloads --
hashed as it goes. Commit checks it is what was asked for and moves
it into place; until then nothing in the store has changed.

#### Properties

<a id="Ingest.Written"></a>

```vertex
public private(set) var Written: int64 = 0
```

<a id="Ingest.Digest"></a>

```vertex
public var Digest: digest.Digest { get }
```

The digest of what has been written.

#### Methods

<a id="Ingest.Write"></a>

```vertex
public func Write(_ bytes: [uint8]) throws
```

<a id="Ingest.Commit"></a>

```vertex
@discardableResult
public func Commit(expected: digest.Digest? = nil, size: int64 = -1) throws -> digest.Digest
```

Checks the blob against `expected` (and `size`, when not -1) and
stores it.

<a id="Ingest.Abort"></a>

```vertex
public func Abort()
```

Gives up, removing what was written.

### struct Record <a id="struct-Record"></a>

```vertex
public struct Record
```

A name the store keeps, and what it names.

#### Properties

<a id="Record.Name"></a>

```vertex
public var Name: string
```

<a id="Record.Descriptor"></a>

```vertex
public var Descriptor: spec.Descriptor
```

### class Store <a id="class-Store"></a>

```vertex
public final class Store
```

An image layout on disk.

#### Initializers

<a id="Store.init"></a>

```vertex
public init(root: string? = nil) throws
```

Opens the layout at `root` (DefaultRoot when nil), making it if
it isn't there.

#### Properties

<a id="Store.Root"></a>

```vertex
public let Root: fs.Path
```

<a id="Store.Records"></a>

```vertex
public var Records: [Record] { get }
```

Every name kept, in the order they were added.

#### Methods

<a id="Store.BlobPath"></a>

```vertex
public func BlobPath(_ d: digest.Digest) -> fs.Path
```

Where a blob is, whether or not it is there.

<a id="Store.HasBlob"></a>

```vertex
public func HasBlob(_ d: digest.Digest) -> bool
```

<a id="Store.ReadBlob"></a>

```vertex
public func ReadBlob(_ d: digest.Digest) throws -> [uint8]
```

A blob's bytes, checked against its digest.

<a id="Store.WriteBlob"></a>

```vertex
@discardableResult
public func WriteBlob(_ bytes: [uint8]) throws -> digest.Digest
```

Stores `bytes`, returning their digest.

<a id="Store.BeginIngest"></a>

```vertex
public func BeginIngest(_ name: string) throws -> Ingest
```

Starts writing a blob too big to hold: see Ingest.

<a id="Store.BlobSize"></a>

```vertex
public func BlobSize(_ d: digest.Digest) throws -> int64
```

Size of a stored blob.

<a id="Store.Tag"></a>

```vertex
public func Tag(_ name: string, _ d: spec.Descriptor) throws
```

Names `d` as `name`, replacing what the name meant before.

<a id="Store.Untag"></a>

```vertex
public func Untag(_ name: string) throws
```

Forgets a name. The blobs stay until Prune.

<a id="Store.Resolve"></a>

```vertex
public func Resolve(_ name: string) -> Record?
```

The descriptor a name stands for. "alpine", "alpine:3.20" and
"docker.io/library/alpine:3.20" are one name; a digest prefix of
at least 6 hex digits finds an image by its manifest.

<a id="Store.Image"></a>

```vertex
public func Image(_ name: string, platform: spec.Platform = spec.Platform.Default) throws -> Image
```

The image a name stands for, for `platform`: through an index to
the platform's manifest, then its config.

<a id="Store.Prune"></a>

```vertex
@discardableResult
public func Prune() throws -> int64
```

Removes every blob no name reaches, and anything left in ingest.
Returns how many bytes were freed.

### enum StoreError <a id="enum-StoreError"></a>

```vertex
public enum StoreError: Error, CustomStringConvertible
```

#### Cases

<a id="StoreError.notFound"></a>

```vertex
case notFound(string)
```

<a id="StoreError.corrupt"></a>

```vertex
case corrupt(string)
```

<a id="StoreError.sizeMismatch"></a>

```vertex
case sizeMismatch(digest: string, expected: int64, got: int64)
```

<a id="StoreError.noPlatform"></a>

```vertex
case noPlatform(name: string, platform: string)
```

#### Properties

<a id="StoreError.description"></a>

```vertex
public var description: string { get }
```

## Files

- store.vs
