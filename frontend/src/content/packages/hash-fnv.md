# package fnv

```vertex
import "hash/fnv"
```

## Index

- [`func New32() -> Digest32`](#func-New32)
- [`func New32a() -> Digest32a`](#func-New32a)
- [`func New64() -> Digest64`](#func-New64)
- [`func New64a() -> Digest64a`](#func-New64a)
- [`func Sum32(_ data: [uint8]) -> uint32`](#func-Sum32)
- [`func Sum32String(_ s: string) -> uint32`](#func-Sum32String)
- [`func Sum32a(_ data: [uint8]) -> uint32`](#func-Sum32a)
- [`func Sum32aString(_ s: string) -> uint32`](#func-Sum32aString)
- [`func Sum64(_ data: [uint8]) -> uint64`](#func-Sum64)
- [`func Sum64String(_ s: string) -> uint64`](#func-Sum64String)
- [`func Sum64a(_ data: [uint8]) -> uint64`](#func-Sum64a)
- [`func Sum64aString(_ s: string) -> uint64`](#func-Sum64aString)
- [`struct Digest32`](#struct-Digest32)
  - [`init()`](#Digest32.init)
  - [`var hash: uint32`](#Digest32.hash)
  - [`var Size: int { get }`](#Digest32.Size)
  - [`var BlockSize: int { get }`](#Digest32.BlockSize)
  - [`mutating func Reset()`](#Digest32.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest32.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest32.WriteString)
  - [`func Sum32() -> uint32`](#Digest32.Sum32)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest32.Sum)
- [`struct Digest32a`](#struct-Digest32a)
  - [`init()`](#Digest32a.init)
  - [`var hash: uint32`](#Digest32a.hash)
  - [`var Size: int { get }`](#Digest32a.Size)
  - [`var BlockSize: int { get }`](#Digest32a.BlockSize)
  - [`mutating func Reset()`](#Digest32a.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest32a.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest32a.WriteString)
  - [`func Sum32() -> uint32`](#Digest32a.Sum32)
  - [`func Sum32a() -> uint32`](#Digest32a.Sum32a)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest32a.Sum)
- [`struct Digest64`](#struct-Digest64)
  - [`init()`](#Digest64.init)
  - [`var hash: uint64`](#Digest64.hash)
  - [`var Size: int { get }`](#Digest64.Size)
  - [`var BlockSize: int { get }`](#Digest64.BlockSize)
  - [`mutating func Reset()`](#Digest64.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest64.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest64.WriteString)
  - [`func Sum64() -> uint64`](#Digest64.Sum64)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest64.Sum)
- [`struct Digest64a`](#struct-Digest64a)
  - [`init()`](#Digest64a.init)
  - [`var hash: uint64`](#Digest64a.hash)
  - [`var Size: int { get }`](#Digest64a.Size)
  - [`var BlockSize: int { get }`](#Digest64a.BlockSize)
  - [`mutating func Reset()`](#Digest64a.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest64a.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest64a.WriteString)
  - [`func Sum64() -> uint64`](#Digest64a.Sum64)
  - [`func Sum64a() -> uint64`](#Digest64a.Sum64a)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest64a.Sum)

## Functions

### func New32 <a id="func-New32"></a>

```vertex
public func New32() -> Digest32
```

Creates a new Hasher calculating 32-bit FNV-1.

### func New32a <a id="func-New32a"></a>

```vertex
public func New32a() -> Digest32a
```

Creates a new Hasher calculating 32-bit FNV-1a.

### func New64 <a id="func-New64"></a>

```vertex
public func New64() -> Digest64
```

Creates a new Hasher calculating 64-bit FNV-1.

### func New64a <a id="func-New64a"></a>

```vertex
public func New64a() -> Digest64a
```

Creates a new Hasher calculating 64-bit FNV-1a.

### func Sum32 <a id="func-Sum32"></a>

```vertex
public func Sum32(_ data: [uint8]) -> uint32
```

Calculates 32-bit FNV-1 hash of data.

### func Sum32String <a id="func-Sum32String"></a>

```vertex
public func Sum32String(_ s: string) -> uint32
```

Calculates 32-bit FNV-1 hash of a string.

### func Sum32a <a id="func-Sum32a"></a>

```vertex
public func Sum32a(_ data: [uint8]) -> uint32
```

Calculates 32-bit FNV-1a hash of data.

### func Sum32aString <a id="func-Sum32aString"></a>

```vertex
public func Sum32aString(_ s: string) -> uint32
```

Calculates 32-bit FNV-1a hash of a string.

### func Sum64 <a id="func-Sum64"></a>

```vertex
public func Sum64(_ data: [uint8]) -> uint64
```

Calculates 64-bit FNV-1 hash of data.

### func Sum64String <a id="func-Sum64String"></a>

```vertex
public func Sum64String(_ s: string) -> uint64
```

Calculates 64-bit FNV-1 hash of a string.

### func Sum64a <a id="func-Sum64a"></a>

```vertex
public func Sum64a(_ data: [uint8]) -> uint64
```

Calculates 64-bit FNV-1a hash of data.

### func Sum64aString <a id="func-Sum64aString"></a>

```vertex
public func Sum64aString(_ s: string) -> uint64
```

Calculates 64-bit FNV-1a hash of a string.

## Types

### struct Digest32 <a id="struct-Digest32"></a>

```vertex
public struct Digest32
```

Digest32 implements 32-bit FNV-1.

#### Initializers

<a id="Digest32.init"></a>

```vertex
public init()
```

#### Properties

<a id="Digest32.hash"></a>

```vertex
public var hash: uint32
```

<a id="Digest32.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest32.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest32.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest32.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest32.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest32.Sum32"></a>

```vertex
public func Sum32() -> uint32
```

<a id="Digest32.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

### struct Digest32a <a id="struct-Digest32a"></a>

```vertex
public struct Digest32a
```

Digest32a implements 32-bit FNV-1a.

#### Initializers

<a id="Digest32a.init"></a>

```vertex
public init()
```

#### Properties

<a id="Digest32a.hash"></a>

```vertex
public var hash: uint32
```

<a id="Digest32a.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest32a.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest32a.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest32a.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest32a.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest32a.Sum32"></a>

```vertex
public func Sum32() -> uint32
```

<a id="Digest32a.Sum32a"></a>

```vertex
public func Sum32a() -> uint32
```

<a id="Digest32a.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

### struct Digest64 <a id="struct-Digest64"></a>

```vertex
public struct Digest64
```

Digest64 implements 64-bit FNV-1.

#### Initializers

<a id="Digest64.init"></a>

```vertex
public init()
```

#### Properties

<a id="Digest64.hash"></a>

```vertex
public var hash: uint64
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

### struct Digest64a <a id="struct-Digest64a"></a>

```vertex
public struct Digest64a
```

Digest64a implements 64-bit FNV-1a.

#### Initializers

<a id="Digest64a.init"></a>

```vertex
public init()
```

#### Properties

<a id="Digest64a.hash"></a>

```vertex
public var hash: uint64
```

<a id="Digest64a.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest64a.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest64a.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest64a.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest64a.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest64a.Sum64"></a>

```vertex
public func Sum64() -> uint64
```

<a id="Digest64a.Sum64a"></a>

```vertex
public func Sum64a() -> uint64
```

<a id="Digest64a.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

## Files

- fnv.vs
