# package spec

```vertex
import "oci/spec"
```

Package spec is the OCI image format (image-spec v1.1): descriptors,
manifests, indexes and image configs, read from and written to JSON.
Docker's v2 schema 2 media types are the same shapes and are read too.

```vertex
index ──► manifest (per platform) ──► config   (env, cmd, rootfs.diff_ids)
                                 └──► layers   (tar, usually gzipped)
```

## Index

- [`struct Config`](#struct-Config)
  - [`init(platform: Platform = .Default)`](#Config.init)
  - [`var Architecture: string`](#Config.Architecture)
  - [`var OS: string`](#Config.OS)
  - [`var Env: [string]`](#Config.Env)
  - [`var Entrypoint: [string]`](#Config.Entrypoint)
  - [`var Cmd: [string]`](#Config.Cmd)
  - [`var WorkingDir: string`](#Config.WorkingDir)
  - [`var User: string`](#Config.User)
  - [`var ExposedPorts: [string]`](#Config.ExposedPorts)
  - [`var Labels: [string: string]`](#Config.Labels)
  - [`var DiffIds: [string]`](#Config.DiffIds)
  - [`var Command: [string] { get }`](#Config.Command)
  - [`static func Parse(_ bytes: [uint8]) throws -> Config`](#Config.Parse)
  - [`func Encode() -> [uint8]`](#Config.Encode)
  - [`func Getenv(_ name: string) -> string?`](#Config.Getenv)
  - [`mutating func Setenv(_ name: string, _ value: string)`](#Config.Setenv)
- [`struct Descriptor: Equatable`](#struct-Descriptor)
  - [`init(mediaType: string, digest: string, size: int64, platform: Platform? = nil, annotations: [string: string] = [:], artifactType: string = "")`](#Descriptor.init)
  - [`var MediaType: string`](#Descriptor.MediaType)
  - [`var Digest: string`](#Descriptor.Digest)
  - [`var Size: int64`](#Descriptor.Size)
  - [`var Platform: Platform?`](#Descriptor.Platform)
  - [`var Annotations: [string: string]`](#Descriptor.Annotations)
  - [`var ArtifactType: string`](#Descriptor.ArtifactType)
  - [`static func FromJson(_ v: json.Value) throws -> Descriptor`](#Descriptor.FromJson)
  - [`func ToJson() -> json.Value`](#Descriptor.ToJson)
- [`enum ImageError: Error, CustomStringConvertible`](#enum-ImageError)
  - [`var description: string { get }`](#ImageError.description)
- [`struct Index`](#struct-Index)
  - [`init(manifests: [Descriptor], mediaType: string = spec.MediaType.index)`](#Index.init)
  - [`var MediaType: string`](#Index.MediaType)
  - [`var Manifests: [Descriptor]`](#Index.Manifests)
  - [`static func Parse(_ bytes: [uint8]) throws -> Index`](#Index.Parse)
  - [`func Encode() -> [uint8]`](#Index.Encode)
  - [`func Select(_ platform: Platform) -> Descriptor?`](#Index.Select)
- [`struct Manifest`](#struct-Manifest)
  - [`init(config: Descriptor, layers: [Descriptor], mediaType: string = spec.MediaType.manifest, annotations: [string: string] = [:], artifactType: string = "")`](#Manifest.init)
  - [`var MediaType: string`](#Manifest.MediaType)
  - [`var Config: Descriptor`](#Manifest.Config)
  - [`var Layers: [Descriptor]`](#Manifest.Layers)
  - [`var Annotations: [string: string]`](#Manifest.Annotations)
  - [`var ArtifactType: string`](#Manifest.ArtifactType)
  - [`static func Parse(_ bytes: [uint8]) throws -> Manifest`](#Manifest.Parse)
  - [`func Encode() -> [uint8]`](#Manifest.Encode)
- [`enum MediaType`](#enum-MediaType)
  - [`static let index = "application/vnd.oci.image.index.v1+json"`](#MediaType.index)
  - [`static let manifest = "application/vnd.oci.image.manifest.v1+json"`](#MediaType.manifest)
  - [`static let config = "application/vnd.oci.image.config.v1+json"`](#MediaType.config)
  - [`static let layerTar = "application/vnd.oci.image.layer.v1.tar"`](#MediaType.layerTar)
  - [`static let layerGzip = "application/vnd.oci.image.layer.v1.tar+gzip"`](#MediaType.layerGzip)
  - [`static let dockerList = "application/vnd.docker.distribution.manifest.list.v2+json"`](#MediaType.dockerList)
  - [`static let dockerManifest = "application/vnd.docker.distribution.manifest.v2+json"`](#MediaType.dockerManifest)
  - [`static let dockerConfig = "application/vnd.docker.container.image.v1+json"`](#MediaType.dockerConfig)
  - [`static let dockerLayerGzip = "application/vnd.docker.image.rootfs.diff.tar.gzip"`](#MediaType.dockerLayerGzip)
  - [`static let file = "application/octet-stream"`](#MediaType.file)
  - [`static func IsIndex(_ t: string) -> bool`](#MediaType.IsIndex)
  - [`static func IsManifest(_ t: string) -> bool`](#MediaType.IsManifest)
  - [`static func IsGzipLayer(_ t: string) -> bool`](#MediaType.IsGzipLayer)
- [`struct Platform: Equatable, CustomStringConvertible`](#struct-Platform)
  - [`init(os: string, architecture: string, variant: string = "")`](#Platform.init)
  - [`var OS: string`](#Platform.OS)
  - [`var Architecture: string`](#Platform.Architecture)
  - [`var Variant: string`](#Platform.Variant)
  - [`static var Default: Platform { get }`](#Platform.Default)
  - [`var description: string { get }`](#Platform.description)
  - [`static func Parse(_ text: string) -> Platform`](#Platform.Parse)
  - [`func Matches(_ other: Platform) -> bool`](#Platform.Matches)

## Types

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

How to run an image, and the layers' uncompressed digests. Fields this
package doesn't model (history, healthcheck, …) are kept as they were.

#### Initializers

<a id="Config.init"></a>

```vertex
public init(platform: Platform = .Default)
```

#### Properties

<a id="Config.Architecture"></a>

```vertex
public var Architecture: string
```

<a id="Config.OS"></a>

```vertex
public var OS: string
```

<a id="Config.Env"></a>

```vertex
public var Env: [string]
```

<a id="Config.Entrypoint"></a>

```vertex
public var Entrypoint: [string]
```

<a id="Config.Cmd"></a>

```vertex
public var Cmd: [string]
```

<a id="Config.WorkingDir"></a>

```vertex
public var WorkingDir: string
```

<a id="Config.User"></a>

```vertex
public var User: string
```

<a id="Config.ExposedPorts"></a>

```vertex
public var ExposedPorts: [string]
```

<a id="Config.Labels"></a>

```vertex
public var Labels: [string: string]
```

<a id="Config.DiffIds"></a>

```vertex
public var DiffIds: [string]
```

The digest of each layer uncompressed, bottom first.

<a id="Config.Command"></a>

```vertex
public var Command: [string] { get }
```

The command a container runs: entrypoint, then cmd.

#### Methods

<a id="Config.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) throws -> Config
```

<a id="Config.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

<a id="Config.Getenv"></a>

```vertex
public func Getenv(_ name: string) -> string?
```

An environment variable's value, or nil.

<a id="Config.Setenv"></a>

```vertex
public mutating func Setenv(_ name: string, _ value: string)
```

Sets an environment variable, replacing an earlier value.

### struct Descriptor <a id="struct-Descriptor"></a>

```vertex
public struct Descriptor: Equatable
```

A pointer to content: its type, digest and size.

#### Initializers

<a id="Descriptor.init"></a>

```vertex
public init(mediaType: string, digest: string, size: int64, platform: Platform? = nil,
            annotations: [string: string] = [:], artifactType: string = "")
```

#### Properties

<a id="Descriptor.MediaType"></a>

```vertex
public var MediaType: string
```

<a id="Descriptor.Digest"></a>

```vertex
public var Digest: string
```

<a id="Descriptor.Size"></a>

```vertex
public var Size: int64
```

<a id="Descriptor.Platform"></a>

```vertex
public var Platform: Platform?
```

<a id="Descriptor.Annotations"></a>

```vertex
public var Annotations: [string: string]
```

<a id="Descriptor.ArtifactType"></a>

```vertex
public var ArtifactType: string
```

#### Methods

<a id="Descriptor.FromJson"></a>

```vertex
public static func FromJson(_ v: json.Value) throws -> Descriptor
```

<a id="Descriptor.ToJson"></a>

```vertex
public func ToJson() -> json.Value
```

### enum ImageError <a id="enum-ImageError"></a>

```vertex
public enum ImageError: Error, CustomStringConvertible
```

#### Cases

<a id="ImageError.malformed"></a>

```vertex
case malformed(string)
```

#### Properties

<a id="ImageError.description"></a>

```vertex
public var description: string { get }
```

### struct Index <a id="struct-Index"></a>

```vertex
public struct Index
```

Manifests for several platforms (a "manifest list" in Docker's words),
or, in an image layout, the images a store holds.

#### Initializers

<a id="Index.init"></a>

```vertex
public init(manifests: [Descriptor], mediaType: string = spec.MediaType.index)
```

#### Properties

<a id="Index.MediaType"></a>

```vertex
public var MediaType: string
```

<a id="Index.Manifests"></a>

```vertex
public var Manifests: [Descriptor]
```

#### Methods

<a id="Index.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) throws -> Index
```

<a id="Index.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

<a id="Index.Select"></a>

```vertex
public func Select(_ platform: Platform) -> Descriptor?
```

The manifest for `platform`, preferring an exact variant match.

### struct Manifest <a id="struct-Manifest"></a>

```vertex
public struct Manifest
```

An image for one platform: its config and its layers, bottom first.

#### Initializers

<a id="Manifest.init"></a>

```vertex
public init(config: Descriptor, layers: [Descriptor], mediaType: string = spec.MediaType.manifest,
            annotations: [string: string] = [:], artifactType: string = "")
```

#### Properties

<a id="Manifest.MediaType"></a>

```vertex
public var MediaType: string
```

<a id="Manifest.Config"></a>

```vertex
public var Config: Descriptor
```

<a id="Manifest.Layers"></a>

```vertex
public var Layers: [Descriptor]
```

<a id="Manifest.Annotations"></a>

```vertex
public var Annotations: [string: string]
```

<a id="Manifest.ArtifactType"></a>

```vertex
public var ArtifactType: string
```

#### Methods

<a id="Manifest.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) throws -> Manifest
```

<a id="Manifest.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

### enum MediaType <a id="enum-MediaType"></a>

```vertex
public enum MediaType
```

#### Properties

<a id="MediaType.index"></a>

```vertex
public static let index = "application/vnd.oci.image.index.v1+json"
```

<a id="MediaType.manifest"></a>

```vertex
public static let manifest = "application/vnd.oci.image.manifest.v1+json"
```

<a id="MediaType.config"></a>

```vertex
public static let config = "application/vnd.oci.image.config.v1+json"
```

<a id="MediaType.layerTar"></a>

```vertex
public static let layerTar = "application/vnd.oci.image.layer.v1.tar"
```

<a id="MediaType.layerGzip"></a>

```vertex
public static let layerGzip = "application/vnd.oci.image.layer.v1.tar+gzip"
```

<a id="MediaType.dockerList"></a>

```vertex
public static let dockerList = "application/vnd.docker.distribution.manifest.list.v2+json"
```

<a id="MediaType.dockerManifest"></a>

```vertex
public static let dockerManifest = "application/vnd.docker.distribution.manifest.v2+json"
```

<a id="MediaType.dockerConfig"></a>

```vertex
public static let dockerConfig = "application/vnd.docker.container.image.v1+json"
```

<a id="MediaType.dockerLayerGzip"></a>

```vertex
public static let dockerLayerGzip = "application/vnd.docker.image.rootfs.diff.tar.gzip"
```

<a id="MediaType.file"></a>

```vertex
public static let file = "application/octet-stream"
```

What a fetched file is stored as: see oci/fetch.

#### Methods

<a id="MediaType.IsIndex"></a>

```vertex
public static func IsIndex(_ t: string) -> bool
```

<a id="MediaType.IsManifest"></a>

```vertex
public static func IsManifest(_ t: string) -> bool
```

<a id="MediaType.IsGzipLayer"></a>

```vertex
public static func IsGzipLayer(_ t: string) -> bool
```

### struct Platform <a id="struct-Platform"></a>

```vertex
public struct Platform: Equatable, CustomStringConvertible
```

An OS and CPU an image is for.

#### Initializers

<a id="Platform.init"></a>

```vertex
public init(os: string, architecture: string, variant: string = "")
```

#### Properties

<a id="Platform.OS"></a>

```vertex
public var OS: string
```

<a id="Platform.Architecture"></a>

```vertex
public var Architecture: string
```

<a id="Platform.Variant"></a>

```vertex
public var Variant: string
```

<a id="Platform.Default"></a>

```vertex
public static var Default: Platform { get }
```

What a VM on this machine runs: Linux on the host's CPU.

<a id="Platform.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="Platform.Parse"></a>

```vertex
public static func Parse(_ text: string) -> Platform
```

"linux/arm64/v8" or "linux/amd64".

<a id="Platform.Matches"></a>

```vertex
public func Matches(_ other: Platform) -> bool
```

Whether an image for `other` runs here: OS and CPU agree, and the
variant does where both name one.

## Files

- spec.vs
