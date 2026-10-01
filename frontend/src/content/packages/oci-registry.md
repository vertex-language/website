# package registry

```vertex
import "oci/registry"
```

Package registry pulls images from a registry that speaks the OCI
distribution API (Docker Hub, ghcr.io, quay.io, a local registry:2).

```vertex
GET /v2/<repo>/manifests/<tag or digest>   an index or a manifest
GET /v2/<repo>/blobs/<digest>              a config or a layer
```

A registry that wants a token answers 401 with a challenge
(`WWW-Authenticate: Bearer realm=…,service=…,scope=…`); the token is
fetched from the realm -- anonymously, or with credentials from
~/.docker/config.json -- and the request is made again with it.
Blobs are usually a redirect away, to a CDN; credentials stay behind.

## Index

- [`func Pull(_ name: string, into st: store.Store, platform: spec.Platform = spec.Platform.Default, progress: (Progress) -> Void = { _ in }) async throws -> store.Image`](#func-Pull)
- [`func parseChallenge(_ header: string) -> (string, [string: string])`](#func-parseChallenge)
- [`final class Client`](#class-Client)
  - [`init(registry: string, host: string, insecure: bool = false, credentials: Credentials? = nil)`](#Client.init)
  - [`let Host: string`](#Client.Host)
  - [`let Registry: string`](#Client.Registry)
  - [`let Insecure: bool`](#Client.Insecure)
  - [`var Credentials: Credentials?`](#Client.Credentials)
  - [`static func For(_ ref: reference.Reference) -> Client`](#Client.For)
  - [`func Manifest(_ repo: string, _ ref: string) async throws -> Fetched`](#Client.Manifest)
  - [`func OpenBlob(_ repo: string, _ d: digest.Digest) async throws -> http.ResponseStream`](#Client.OpenBlob)
  - [`func FetchBlob(_ repo: string, _ desc: spec.Descriptor, into st: store.Store, progress: (Progress) -> Void = { _ in }) async throws`](#Client.FetchBlob)
- [`struct Credentials`](#struct-Credentials)
  - [`init(username: string, password: string)`](#Credentials.init)
  - [`var Username: string`](#Credentials.Username)
  - [`var Password: string`](#Credentials.Password)
  - [`static func FromDockerConfig(_ registry: string) -> Credentials?`](#Credentials.FromDockerConfig)
- [`struct Fetched`](#struct-Fetched)
  - [`var Bytes: [uint8]`](#Fetched.Bytes)
  - [`var MediaType: string`](#Fetched.MediaType)
  - [`var Digest: digest.Digest`](#Fetched.Digest)
- [`struct Progress`](#struct-Progress)
  - [`var What: string`](#Progress.What)
  - [`var Done: int64`](#Progress.Done)
  - [`var Total: int64`](#Progress.Total)
- [`enum RegistryError: Error, CustomStringConvertible`](#enum-RegistryError)
  - [`var description: string { get }`](#RegistryError.description)

## Functions

### func Pull <a id="func-Pull"></a>

```vertex
@discardableResult
public func Pull(_ name: string, into st: store.Store, platform: spec.Platform = spec.Platform.Default,
                 progress: (Progress) -> Void = { _ in }) async throws -> store.Image
```

Pulls `name` for `platform` into `st` and names it there: the index
(if the name is multi-platform), the platform's manifest, its config
and layers. Blobs already in the store aren't fetched again.

### func parseChallenge <a id="func-parseChallenge"></a>

```vertex
public func parseChallenge(_ header: string) -> (string, [string: string])
```

"Bearer realm="…",service="…"" as its scheme and parameters.

## Types

### class Client <a id="class-Client"></a>

```vertex
public final class Client
```

One registry, reached at its API host.

#### Initializers

<a id="Client.init"></a>

```vertex
public init(registry: string, host: string, insecure: bool = false, credentials: Credentials? = nil)
```

#### Properties

<a id="Client.Host"></a>

```vertex
public let Host: string
```

The host the API is at: "registry-1.docker.io", "localhost:5000".

<a id="Client.Registry"></a>

```vertex
public let Registry: string
```

The registry as images name it, for credentials: "docker.io".

<a id="Client.Insecure"></a>

```vertex
public let Insecure: bool
```

Plain HTTP, for a registry on this machine.

<a id="Client.Credentials"></a>

```vertex
public var Credentials: Credentials?
```

#### Methods

<a id="Client.For"></a>

```vertex
public static func For(_ ref: reference.Reference) -> Client
```

The client for where `ref` lives. A registry on localhost or
127.0.0.1 is spoken to over plain HTTP, as Docker does.

<a id="Client.Manifest"></a>

```vertex
public func Manifest(_ repo: string, _ ref: string) async throws -> Fetched
```

The manifest or index `ref` names -- tag or digest -- as the
registry has it; a digest is checked.

<a id="Client.OpenBlob"></a>

```vertex
public func OpenBlob(_ repo: string, _ d: digest.Digest) async throws -> http.ResponseStream
```

Opens a blob for reading, following its redirect to wherever it is
kept. The caller reads the stream and closes it.

<a id="Client.FetchBlob"></a>

```vertex
public func FetchBlob(_ repo: string, _ desc: spec.Descriptor, into st: store.Store,
                      progress: (Progress) -> Void = { _ in }) async throws
```

Fetches a blob into `st` unless it is there already, checking its
digest and size as it lands.

### struct Credentials <a id="struct-Credentials"></a>

```vertex
public struct Credentials
```

A user name and password (or token) for a registry.

#### Initializers

<a id="Credentials.init"></a>

```vertex
public init(username: string, password: string)
```

#### Properties

<a id="Credentials.Username"></a>

```vertex
public var Username: string
```

<a id="Credentials.Password"></a>

```vertex
public var Password: string
```

#### Methods

<a id="Credentials.FromDockerConfig"></a>

```vertex
public static func FromDockerConfig(_ registry: string) -> Credentials?
```

What `docker login` saved for `registry`, from
$DOCKER_CONFIG/config.json or ~/.docker/config.json -- its "auth"
entries; credential helpers aren't run.

### struct Fetched <a id="struct-Fetched"></a>

```vertex
public struct Fetched
```

A manifest or index as the registry sent it.

#### Properties

<a id="Fetched.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

<a id="Fetched.MediaType"></a>

```vertex
public var MediaType: string
```

<a id="Fetched.Digest"></a>

```vertex
public var Digest: digest.Digest
```

### struct Progress <a id="struct-Progress"></a>

```vertex
public struct Progress
```

What a fetch is doing, for a progress display.

#### Properties

<a id="Progress.What"></a>

```vertex
public var What: string
```

"manifest", "config", or a layer's short digest.

<a id="Progress.Done"></a>

```vertex
public var Done: int64
```

<a id="Progress.Total"></a>

```vertex
public var Total: int64
```

### enum RegistryError <a id="enum-RegistryError"></a>

```vertex
public enum RegistryError: Error, CustomStringConvertible
```

#### Cases

<a id="RegistryError.status"></a>

```vertex
case status(code: int32, what: string, body: string)
```

<a id="RegistryError.auth"></a>

```vertex
case auth(string)
```

<a id="RegistryError.tooManyRedirects"></a>

```vertex
case tooManyRedirects(string)
```

<a id="RegistryError.malformed"></a>

```vertex
case malformed(string)
```

#### Properties

<a id="RegistryError.description"></a>

```vertex
public var description: string { get }
```

## Files

- registry.vs
