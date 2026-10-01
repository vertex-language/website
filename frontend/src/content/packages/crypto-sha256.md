# package sha256

```vertex
import "crypto/sha256"
```

## Index

- [Constants](#constants)
- [`func New() -> Digest`](#func-New)
- [`func New224() -> Digest`](#func-New224)
- [`func Sum224(_ data: [uint8]) -> [uint8]`](#func-Sum224)
- [`func Sum224(_ text: string) -> [uint8]`](#func-Sum224-2)
- [`func Sum256(_ data: [uint8]) -> [uint8]`](#func-Sum256)
- [`func Sum256(_ text: string) -> [uint8]`](#func-Sum256-2)
- [`func ToHex(_ bytes: [uint8]) -> string`](#func-ToHex)
- [`struct Digest`](#struct-Digest)
  - [`init(is224: bool = false)`](#Digest.init)
  - [`var is224: bool = false`](#Digest.is224)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ p: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Checksum() -> [uint8]`](#Digest.Checksum)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 64
```

The blocksize of SHA-256 and SHA-224 in bytes.

<a id="let-Size"></a>

```vertex
public let Size: int = 32
```

The size of a SHA-256 checksum in bytes.

<a id="let-Size224"></a>

```vertex
public let Size224: int = 28
```

The size of a SHA-224 checksum in bytes.

## Functions

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

New returns a new Digest computing the SHA-256 checksum.

### func New224 <a id="func-New224"></a>

```vertex
public func New224() -> Digest
```

New224 returns a new Digest computing the SHA-224 checksum.

### func Sum224 <a id="func-Sum224"></a>

```vertex
public func Sum224(_ data: [uint8]) -> [uint8]
```

Sum224 returns the SHA-224 checksum of the data.

### func Sum224 <a id="func-Sum224-2"></a>

```vertex
public func Sum224(_ text: string) -> [uint8]
```

Sum224 returns the SHA-224 checksum of the UTF-8 string.

### func Sum256 <a id="func-Sum256"></a>

```vertex
public func Sum256(_ data: [uint8]) -> [uint8]
```

Sum256 returns the SHA-256 checksum of the data.

### func Sum256 <a id="func-Sum256-2"></a>

```vertex
public func Sum256(_ text: string) -> [uint8]
```

Sum256 returns the SHA-256 checksum of the UTF-8 string.

### func ToHex <a id="func-ToHex"></a>

```vertex
public func ToHex(_ bytes: [uint8]) -> string
```

ToHex converts a byte slice into a lowercase hexadecimal string.

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

Digest represents the partial evaluation of a SHA-256 or SHA-224 checksum.

#### Initializers

<a id="Digest.init"></a>

```vertex
public init(is224: bool = false)
```

#### Properties

<a id="Digest.is224"></a>

```vertex
public var is224: bool = false
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

Finalize and return the digest.

## Files

- sha256.vs
