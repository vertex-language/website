# package digest

```vertex
import "oci/digest"
```

Package digest names content by its hash, as OCI does everywhere:
"sha256:" and 64 hex digits. A blob is trusted once its bytes hash to
the digest it was asked for.

## Index

- [`struct Digest: Equatable, Hashable, CustomStringConvertible`](#struct-Digest)
  - [`init(algorithm: string, hex: string)`](#Digest.init)
  - [`let Algorithm: string`](#Digest.Algorithm)
  - [`let Hex: string`](#Digest.Hex)
  - [`var description: string { get }`](#Digest.description)
  - [`var Short: string { get }`](#Digest.Short)
  - [`static func Parse(_ text: string) throws -> Digest`](#Digest.Parse)
  - [`static func Of(_ data: [uint8]) -> Digest`](#Digest.Of)
  - [`func Verify(_ data: [uint8]) throws`](#Digest.Verify)
- [`enum DigestError: Error, CustomStringConvertible`](#enum-DigestError)
  - [`var description: string { get }`](#DigestError.description)

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest: Equatable, Hashable, CustomStringConvertible
```

"sha256:<64 hex digits>".

#### Initializers

<a id="Digest.init"></a>

```vertex
public init(algorithm: string, hex: string)
```

#### Properties

<a id="Digest.Algorithm"></a>

```vertex
public let Algorithm: string
```

<a id="Digest.Hex"></a>

```vertex
public let Hex: string
```

<a id="Digest.description"></a>

```vertex
public var description: string { get }
```

<a id="Digest.Short"></a>

```vertex
public var Short: string { get }
```

The first 12 hex digits: how `docker images` shows an ID.

#### Methods

<a id="Digest.Parse"></a>

```vertex
public static func Parse(_ text: string) throws -> Digest
```

Parses and checks "algorithm:hex".

<a id="Digest.Of"></a>

```vertex
public static func Of(_ data: [uint8]) -> Digest
```

The SHA-256 digest of `data`.

<a id="Digest.Verify"></a>

```vertex
public func Verify(_ data: [uint8]) throws
```

Checks that `data` is what this digest names.

### enum DigestError <a id="enum-DigestError"></a>

```vertex
public enum DigestError: Error, CustomStringConvertible
```

#### Cases

<a id="DigestError.malformed"></a>

```vertex
case malformed(string)
```

<a id="DigestError.unsupported"></a>

```vertex
case unsupported(string)
```

<a id="DigestError.mismatch"></a>

```vertex
case mismatch(expected: string, got: string)
```

#### Properties

<a id="DigestError.description"></a>

```vertex
public var description: string { get }
```

## Files

- digest.vs
