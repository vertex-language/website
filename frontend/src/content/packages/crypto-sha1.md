# package sha1

```vertex
import "crypto/sha1"
```

## Index

- [Constants](#constants)
- [`func New() -> Digest`](#func-New)
- [`func Sum1(_ data: [uint8]) -> [uint8]`](#func-Sum1)
- [`func Sum1String(_ s: string) -> [uint8]`](#func-Sum1String)
- [`func ToHex(_ d: [uint8]) -> string`](#func-ToHex)
- [`struct Digest`](#struct-Digest)
  - [`init()`](#Digest.init)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ p: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Checksum() -> [uint8]`](#Digest.Checksum)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 64
```

The blocksize of SHA-1 in bytes.

<a id="let-Size"></a>

```vertex
public let Size: int = 20
```

The size of a SHA-1 checksum in bytes.

## Functions

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

Creates a new Digest instance.

### func Sum1 <a id="func-Sum1"></a>

```vertex
public func Sum1(_ data: [uint8]) -> [uint8]
```

Computes the SHA-1 checksum of the given data.

### func Sum1String <a id="func-Sum1String"></a>

```vertex
public func Sum1String(_ s: string) -> [uint8]
```

Computes the SHA-1 checksum of a string.

### func ToHex <a id="func-ToHex"></a>

```vertex
public func ToHex(_ d: [uint8]) -> string
```

Converts a byte array to its lowercase hexadecimal string representation.

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

Digest represents the partial evaluation of a SHA-1 checksum.

#### Initializers

<a id="Digest.init"></a>

```vertex
public init()
```

#### Methods

<a id="Digest.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest.Write"></a>

```vertex
public mutating func Write(_ p: [uint8])
```

<a id="Digest.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest.Checksum"></a>

```vertex
public func Checksum() -> [uint8]
```

Finalize and return the 20-byte digest.

## Files

- sha1.vs
