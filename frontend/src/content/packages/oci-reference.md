# package reference

```vertex
import "oci/reference"
```

Package reference parses image names the way Docker does:

```vertex
alpine                      docker.io/library/alpine:latest
alpine:3.20                 docker.io/library/alpine:3.20
user/app                    docker.io/user/app:latest
ghcr.io/owner/app:v1        ghcr.io/owner/app:v1
localhost:5000/app@sha256:… a digest instead of a tag
```

## Index

- [`struct Reference: Equatable, Hashable, CustomStringConvertible`](#struct-Reference)
  - [`init(registry: string, repository: string, tag: string, digest: string = "")`](#Reference.init)
  - [`let Registry: string`](#Reference.Registry)
  - [`let Repository: string`](#Reference.Repository)
  - [`let Tag: string`](#Reference.Tag)
  - [`let Digest: string`](#Reference.Digest)
  - [`var ApiHost: string { get }`](#Reference.ApiHost)
  - [`var Target: string { get }`](#Reference.Target)
  - [`var description: string { get }`](#Reference.description)
  - [`var Familiar: string { get }`](#Reference.Familiar)
  - [`static func Parse(_ text: string) throws -> Reference`](#Reference.Parse)
- [`enum ReferenceError: Error, CustomStringConvertible`](#enum-ReferenceError)
  - [`var description: string { get }`](#ReferenceError.description)

## Types

### struct Reference <a id="struct-Reference"></a>

```vertex
public struct Reference: Equatable, Hashable, CustomStringConvertible
```

#### Initializers

<a id="Reference.init"></a>

```vertex
public init(registry: string, repository: string, tag: string, digest: string = "")
```

#### Properties

<a id="Reference.Registry"></a>

```vertex
public let Registry: string
```

The registry as named: "docker.io", "ghcr.io", "localhost:5000".

<a id="Reference.Repository"></a>

```vertex
public let Repository: string
```

"library/alpine", "owner/app".

<a id="Reference.Tag"></a>

```vertex
public let Tag: string
```

The tag, or "" when the reference names a digest only.

<a id="Reference.Digest"></a>

```vertex
public let Digest: string
```

"sha256:…", or "".

<a id="Reference.ApiHost"></a>

```vertex
public var ApiHost: string { get }
```

Where the registry's API is: Docker Hub's isn't at docker.io.

<a id="Reference.Target"></a>

```vertex
public var Target: string { get }
```

The tag or digest to ask the registry for.

<a id="Reference.description"></a>

```vertex
public var description: string { get }
```

The full name: "docker.io/library/alpine:3.20".

<a id="Reference.Familiar"></a>

```vertex
public var Familiar: string { get }
```

The short name Docker shows: "alpine:3.20", "ghcr.io/owner/app:v1".

#### Methods

<a id="Reference.Parse"></a>

```vertex
public static func Parse(_ text: string) throws -> Reference
```

Parses `text`, filling in Docker's defaults.

### enum ReferenceError <a id="enum-ReferenceError"></a>

```vertex
public enum ReferenceError: Error, CustomStringConvertible
```

#### Cases

<a id="ReferenceError.invalid"></a>

```vertex
case invalid(string)
```

#### Properties

<a id="ReferenceError.description"></a>

```vertex
public var description: string { get }
```

## Files

- reference.vs
