# package sha512

```vertex
import "crypto/sha512"
```

Package sha512 implements SHA-512 and SHA-384 (FIPS 180-4). SHA-384 is
SHA-512 with a different initial state, truncated to 48 bytes. RDP needs
SHA-384 for the TLS_..._SHA384 cipher suites Schannel prefers and their
HMAC/PRF.

## Index

- [Constants](#constants)
- [`func New() -> Digest`](#func-New)
- [`func New384() -> Digest`](#func-New384)
- [`func Sum384(_ data: [uint8]) -> [uint8]`](#func-Sum384)
- [`func Sum512(_ data: [uint8]) -> [uint8]`](#func-Sum512)
- [`func ToHex(_ bytes: [uint8]) -> string`](#func-ToHex)
- [`struct Digest`](#struct-Digest)
  - [`init(is384: bool = false)`](#Digest.init)
  - [`var is384: bool = false`](#Digest.is384)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ p: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Checksum() -> [uint8]`](#Digest.Checksum)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 128
```

<a id="let-Size"></a>

```vertex
public let Size: int = 64
```

<a id="let-Size384"></a>

```vertex
public let Size384: int = 48
```

## Functions

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

### func New384 <a id="func-New384"></a>

```vertex
public func New384() -> Digest
```

### func Sum384 <a id="func-Sum384"></a>

```vertex
public func Sum384(_ data: [uint8]) -> [uint8]
```

### func Sum512 <a id="func-Sum512"></a>

```vertex
public func Sum512(_ data: [uint8]) -> [uint8]
```

### func ToHex <a id="func-ToHex"></a>

```vertex
public func ToHex(_ bytes: [uint8]) -> string
```

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

#### Initializers

<a id="Digest.init"></a>

```vertex
public init(is384: bool = false)
```

#### Properties

<a id="Digest.is384"></a>

```vertex
public var is384: bool = false
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

## Files

- sha512.vs
