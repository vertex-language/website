# package xxh3

```vertex
import "hash/xxh3"
```

## Index

- [`func Hash128(_ data: [uint8], seed: uint64 = 0) -> (low: uint64, high: uint64)`](#func-Hash128)
- [`func Hash128String(_ s: string, seed: uint64 = 0) -> (low: uint64, high: uint64)`](#func-Hash128String)
- [`func Hash64(_ data: [uint8], seed: uint64 = 0) -> uint64`](#func-Hash64)
- [`func Hash64String(_ s: string, seed: uint64 = 0) -> uint64`](#func-Hash64String)
- [`func New64(seed: uint64 = 0) -> Digest64`](#func-New64)
- [`struct Digest64`](#struct-Digest64)
  - [`init(seed: uint64 = 0)`](#Digest64.init)
  - [`var buffer: [uint8]`](#Digest64.buffer)
  - [`var seed: uint64`](#Digest64.seed)
  - [`var Size: int { get }`](#Digest64.Size)
  - [`var BlockSize: int { get }`](#Digest64.BlockSize)
  - [`mutating func Reset()`](#Digest64.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest64.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest64.WriteString)
  - [`func Sum64() -> uint64`](#Digest64.Sum64)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest64.Sum)

## Functions

### func Hash128 <a id="func-Hash128"></a>

```vertex
public func Hash128(_ data: [uint8], seed: uint64 = 0) -> (low: uint64, high: uint64)
```

Computes 128-bit XXH3 hash of input data.

### func Hash128String <a id="func-Hash128String"></a>

```vertex
public func Hash128String(_ s: string, seed: uint64 = 0) -> (low: uint64, high: uint64)
```

Computes 128-bit XXH3 hash of a string.

### func Hash64 <a id="func-Hash64"></a>

```vertex
public func Hash64(_ data: [uint8], seed: uint64 = 0) -> uint64
```

Computes 64-bit XXH3 hash of input data.

### func Hash64String <a id="func-Hash64String"></a>

```vertex
public func Hash64String(_ s: string, seed: uint64 = 0) -> uint64
```

Computes 64-bit XXH3 hash of a string.

### func New64 <a id="func-New64"></a>

```vertex
public func New64(seed: uint64 = 0) -> Digest64
```

Creates a new Digest64 streaming hasher.

## Types

### struct Digest64 <a id="struct-Digest64"></a>

```vertex
public struct Digest64
```

Digest64 provides a streaming 64-bit XXH3 hasher.

#### Initializers

<a id="Digest64.init"></a>

```vertex
public init(seed: uint64 = 0)
```

#### Properties

<a id="Digest64.buffer"></a>

```vertex
public var buffer: [uint8]
```

<a id="Digest64.seed"></a>

```vertex
public var seed: uint64
```

<a id="Digest64.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest64.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest64.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest64.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest64.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest64.Sum64"></a>

```vertex
public func Sum64() -> uint64
```

<a id="Digest64.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

## Files

- xxh3.vs
