# package random

```vertex
import "gpu/random"
```

## Index

- [`@inlinable func Below(_ key: Key, _ i: uint64, _ bound: uint32) -> uint32`](#func-Below)
- [`@inlinable func Bernoulli(_ key: Key, _ i: uint64, _ p: float32) -> bool`](#func-Bernoulli)
- [`@inlinable func Bits(_ key: Key, _ i: uint64) -> (uint32, uint32, uint32, uint32)`](#func-Bits)
- [`@inlinable func Block(_ key: Key, _ c0: uint32, _ c1: uint32, _ c2: uint32, _ c3: uint32) -> (uint32, uint32, uint32, uint32)`](#func-Block)
- [`func Fill(_ b: gpu.Buffer<float32>, _ key: Key, start: uint64 = 0) async throws`](#func-Fill)
- [`func Fill(_ b: gpu.Buffer<uint32>, _ key: Key, start: uint64 = 0) async throws`](#func-Fill-2)
- [`func FillNormal(_ b: gpu.Buffer<float32>, _ key: Key, start: uint64 = 0) async throws`](#func-FillNormal)
- [`@inlinable func Fold(_ key: Key, _ data: uint32) -> Key`](#func-Fold)
- [`@inlinable func Normal(_ key: Key, _ i: uint64) -> float32`](#func-Normal)
- [`@inlinable func Split(_ key: Key) -> (Key, Key)`](#func-Split)
- [`@inlinable func Uint32(_ key: Key, _ i: uint64) -> uint32`](#func-Uint32)
- [`@inlinable func Uniform(_ key: Key, _ i: uint64) -> float32`](#func-Uniform)
- [`@inlinable func _mulhilo(_ a: uint32, _ b: uint32) -> (uint32, uint32)`](#func-_mulhilo)
- [`struct Key`](#struct-Key)
  - [`@inlinable init(lo: uint32, hi: uint32)`](#Key.init)
  - [`@inlinable init(seed: uint64)`](#Key.init-2)
  - [`let lo: uint32`](#Key.lo)
  - [`let hi: uint32`](#Key.hi)

## Functions

### func Below <a id="func-Below"></a>

```vertex
@inlinable public func Below(_ key: Key, _ i: uint64, _ bound: uint32) -> uint32
```

Below is element i of key's stream as an integer in [0, bound), by
Lemire's multiply-and-shift. For a bound far below 2^32 the bias is
negligible (at most bound / 2^32).

### func Bernoulli <a id="func-Bernoulli"></a>

```vertex
@inlinable public func Bernoulli(_ key: Key, _ i: uint64, _ p: float32) -> bool
```

Bernoulli is element i of key's stream as true with probability p.

### func Bits <a id="func-Bits"></a>

```vertex
@inlinable public func Bits(_ key: Key, _ i: uint64) -> (uint32, uint32, uint32, uint32)
```

Bits is element i of key's stream, as four random words.

### func Block <a id="func-Block"></a>

```vertex
@inlinable public func Block(_ key: Key, _ c0: uint32, _ c1: uint32, _ c2: uint32, _ c3: uint32) -> (uint32, uint32, uint32, uint32)
```

Block is Philox4x32-10 itself: four random words for a key and a
four-word counter. Stream elements use counters with c2 and c3 zero;
Split and Fold use c3 = 0xFFFFFFFF and 0xFFFFFFFE, which no element
reaches.

### func Fill <a id="func-Fill"></a>

```vertex
public func Fill(_ b: gpu.Buffer<float32>, _ key: Key, start: uint64 = 0) async throws
```

Fill writes elements start, start+1, ... of key's stream into b, as
uniform float32s in [0, 1).

### func Fill <a id="func-Fill-2"></a>

```vertex
public func Fill(_ b: gpu.Buffer<uint32>, _ key: Key, start: uint64 = 0) async throws
```

Fill writes elements start, start+1, ... of key's stream into b, as
random words.

### func FillNormal <a id="func-FillNormal"></a>

```vertex
public func FillNormal(_ b: gpu.Buffer<float32>, _ key: Key, start: uint64 = 0) async throws
```

FillNormal writes elements start, start+1, ... of key's stream into b,
as standard normal deviates.

### func Fold <a id="func-Fold"></a>

```vertex
@inlinable public func Fold(_ key: Key, _ data: uint32) -> Key
```

Fold makes the key for one of many users of key: a layer, a step, a
device. Folding in the same data gives the same key.

### func Normal <a id="func-Normal"></a>

```vertex
@inlinable public func Normal(_ key: Key, _ i: uint64) -> float32
```

Normal is element i of key's stream as a standard normal deviate (mean
0, variance 1), by the Box–Muller transform of the element's first two
words.

### func Split <a id="func-Split"></a>

```vertex
@inlinable public func Split(_ key: Key) -> (Key, Key)
```

Split makes two keys whose streams are unrelated to each other and to
key's own. Splitting again gives the same two.

### func Uint32 <a id="func-Uint32"></a>

```vertex
@inlinable public func Uint32(_ key: Key, _ i: uint64) -> uint32
```

Uint32 is element i of key's stream as one random word.

### func Uniform <a id="func-Uniform"></a>

```vertex
@inlinable public func Uniform(_ key: Key, _ i: uint64) -> float32
```

Uniform is element i of key's stream as a float32 in [0, 1): 24 random
bits, so every value it takes is equally likely.

### func _mulhilo <a id="func-_mulhilo"></a>

```vertex
@inlinable public func _mulhilo(_ a: uint32, _ b: uint32) -> (uint32, uint32)
```

_mulhilo is a 32-by-32-bit product's high and low words.

## Types

### struct Key <a id="struct-Key"></a>

```vertex
public struct Key
```

Key names one stream of random numbers. It is two words, a plain
value, so a kernel can take one (as its two words) and make it again.

#### Initializers

<a id="Key.init"></a>

```vertex
@inlinable public init(lo: uint32, hi: uint32)
```

<a id="Key.init-2"></a>

```vertex
@inlinable public init(seed: uint64)
```

A key from a seed. Different seeds give unrelated streams.

#### Properties

<a id="Key.lo"></a>

```vertex
public let lo: uint32
```

<a id="Key.hi"></a>

```vertex
public let hi: uint32
```

## Files

- random.vs
