# package adler32

```vertex
import "hash/adler32"
```

## Index

- [`func Checksum(_ data: [uint8]) -> uint32`](#func-Checksum)
- [`func ChecksumString(_ s: string) -> uint32`](#func-ChecksumString)
- [`func New() -> Digest`](#func-New)
- [`func Update(_ d: uint32, _ data: [uint8]) -> uint32`](#func-Update)
- [`struct Digest`](#struct-Digest)
  - [`init()`](#Digest.init)
  - [`var s1: uint32`](#Digest.s1)
  - [`var s2: uint32`](#Digest.s2)
  - [`var Size: int { get }`](#Digest.Size)
  - [`var BlockSize: int { get }`](#Digest.BlockSize)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Sum32() -> uint32`](#Digest.Sum32)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest.Sum)

## Functions

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ data: [uint8]) -> uint32
```

Checksum returns the Adler-32 checksum of data.

### func ChecksumString <a id="func-ChecksumString"></a>

```vertex
public func ChecksumString(_ s: string) -> uint32
```

ChecksumString returns the Adler-32 checksum of a string.

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

Creates a new streaming Adler-32 Digest.

### func Update <a id="func-Update"></a>

```vertex
public func Update(_ d: uint32, _ data: [uint8]) -> uint32
```

Update updates the running Adler-32 checksum with data.

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

Digest calculates a streaming Adler-32 checksum (RFC 1950).

#### Initializers

<a id="Digest.init"></a>

```vertex
public init()
```

#### Properties

<a id="Digest.s1"></a>

```vertex
public var s1: uint32
```

<a id="Digest.s2"></a>

```vertex
public var s2: uint32
```

<a id="Digest.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest.Sum32"></a>

```vertex
public func Sum32() -> uint32
```

<a id="Digest.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

## Files

- adler32.vs
