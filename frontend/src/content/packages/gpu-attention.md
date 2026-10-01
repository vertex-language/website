# package attention

```vertex
import "gpu/attention"
```

## Index

- [Constants](#constants)
- [`func Forward(q: gpu.Buffer<float32>, k: gpu.Buffer<float32>, v: gpu.Buffer<float32>, into o: gpu.Buffer<float32>, _ shape: Shape, mask: Mask = .None) async throws`](#func-Forward)
- [`enum Mask`](#enum-Mask)
  - [`var _causal: bool { get }`](#Mask._causal)
  - [`var _window: int { get }`](#Mask._window)
- [`struct Shape`](#struct-Shape)
  - [`init(batch: int = 1, heads: int, kvHeads: int = 0, queries: int, keys: int, headDim: int, scale: float32 = 0, keyCapacity: int = 0)`](#Shape.init)
  - [`var batch: int`](#Shape.batch)
  - [`var heads: int`](#Shape.heads)
  - [`var kvHeads: int`](#Shape.kvHeads)
  - [`var queries: int`](#Shape.queries)
  - [`var keys: int`](#Shape.keys)
  - [`var headDim: int`](#Shape.headDim)
  - [`var scale: float32`](#Shape.scale)
  - [`var keyCapacity: int`](#Shape.keyCapacity)

## Constants

<a id="let-DecodeKeys"></a>

```vertex
public let DecodeKeys = 4096
```

DecodeKeys is the most keys the one-query kernel holds scores for.

<a id="let-MaxHeadDim"></a>

```vertex
public let MaxHeadDim = 128
```

MaxHeadDim is the largest head dimension Forward takes.

## Functions

### func Forward <a id="func-Forward"></a>

```vertex
public func Forward(q: gpu.Buffer<float32>, k: gpu.Buffer<float32>, v: gpu.Buffer<float32>, into o: gpu.Buffer<float32>,
                    _ shape: Shape, mask: Mask = .None) async throws
```

Forward is softmax(scale · Q·Kᵀ + mask) · V, written into o. scale is
usually 1/√d. A query that may attend to no key gets zeros.

## Types

### enum Mask <a id="enum-Mask"></a>

```vertex
public enum Mask
```

Mask is which keys a query may attend to.

#### Cases

<a id="Mask.None"></a>

```vertex
case None
```

Every key.

<a id="Mask.Causal"></a>

```vertex
case Causal
```

Keys at or before the query's position. With a KV cache, the
queries are the last of the keys: query i is at position
keys - queries + i.

<a id="Mask.SlidingWindow"></a>

```vertex
case SlidingWindow(int)
```

Causal, and at most window keys back, the query's own included.

#### Properties

<a id="Mask._causal"></a>

```vertex
public var _causal: bool { get }
```

<a id="Mask._window"></a>

```vertex
public var _window: int { get }
```

### struct Shape <a id="struct-Shape"></a>

```vertex
public struct Shape
```

Shape is an attention problem: batch, query heads, key/value heads
(fewer for grouped-query attention), queries and keys per sequence,
the head dimension, and the score scale (0 for 1/√headDim).
keyCapacity is how many keys each head's rows of K and V have room
for: a KV cache allocated for the whole context holds keys of them so
far. 0 means keys, rows packed.

#### Initializers

<a id="Shape.init"></a>

```vertex
public init(batch: int = 1, heads: int, kvHeads: int = 0, queries: int, keys: int, headDim: int, scale: float32 = 0, keyCapacity: int = 0)
```

#### Properties

<a id="Shape.batch"></a>

```vertex
public var batch: int
```

<a id="Shape.heads"></a>

```vertex
public var heads: int
```

<a id="Shape.kvHeads"></a>

```vertex
public var kvHeads: int
```

<a id="Shape.queries"></a>

```vertex
public var queries: int
```

<a id="Shape.keys"></a>

```vertex
public var keys: int
```

<a id="Shape.headDim"></a>

```vertex
public var headDim: int
```

<a id="Shape.scale"></a>

```vertex
public var scale: float32
```

<a id="Shape.keyCapacity"></a>

```vertex
public var keyCapacity: int
```

## Files

- attention.vs
