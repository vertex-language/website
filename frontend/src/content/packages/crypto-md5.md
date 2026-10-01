# package md5

```vertex
import "crypto/md5"
```

## Index

- [Constants](#constants)
- [`func New() -> Digest`](#func-New)
- [`func Sum(_ data: [uint8]) -> [uint8]`](#func-Sum)
- [`func SumString(_ s: string) -> [uint8]`](#func-SumString)
- [`func ToHex(_ d: [uint8]) -> string`](#func-ToHex)
- [`struct Digest`](#struct-Digest)
  - [`init()`](#Digest.init)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ p: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`mutating func Checksum() -> [uint8]`](#Digest.Checksum)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 64
```

The blocksize of MD5 in bytes.

<a id="let-Size"></a>

```vertex
public let Size: int = 16
```

The size of an MD5 checksum in bytes.

## Functions

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

Creates a new Digest instance.

### func Sum <a id="func-Sum"></a>

```vertex
public func Sum(_ data: [uint8]) -> [uint8]
```

Computes the MD5 checksum of the given data.

### func SumString <a id="func-SumString"></a>

```vertex
public func SumString(_ s: string) -> [uint8]
```

Computes the MD5 checksum of a string.

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

Digest represents the partial evaluation of an MD5 checksum.

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
public mutating func Checksum() -> [uint8]
```

Checksum finalizes the MD5 hash and returns the 16-byte digest.

## Files

- md5.vs
