# package parallel

```vertex
import "gpu/parallel"
```

## Index

- [Constants](#constants)
- [`@inlinable func Count<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> int`](#func-Count)
- [`@inlinable func Gather<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>) async throws -> gpu.Buffer<T>`](#func-Gather)
- [`@inlinable func GroupCount() -> int`](#func-GroupCount)
- [`@inlinable func GroupExclusiveScan<T: dtype.Number>(_ x: T) -> (prefix: T, total: T)`](#func-GroupExclusiveScan)
- [`@inlinable func GroupMax<T: dtype.Number>(_ x: T) -> T`](#func-GroupMax)
- [`@inlinable func GroupMin<T: dtype.Number>(_ x: T) -> T`](#func-GroupMin)
- [`@inlinable func GroupRank() -> int`](#func-GroupRank)
- [`@inlinable func GroupScan<T: dtype.Number>(_ x: T) -> T`](#func-GroupScan)
- [`@inlinable func GroupSum<T: dtype.Number>(_ x: T) -> T`](#func-GroupSum)
- [`func Histogram(_ b: gpu.Buffer<uint32>, bins: int) async throws -> gpu.Buffer<uint32>`](#func-Histogram)
- [`func Iota(_ d: gpu.Device, count: int, from start: uint32 = 0) async throws -> gpu.Buffer<uint32>`](#func-Iota)
- [`@inlinable func Reduce<T: dtype.Number>(_ b: gpu.Buffer<T>, _ op: Reduction) async throws -> T`](#func-Reduce)
- [`@inlinable func Scan<T: dtype.Number>(_ b: gpu.Buffer<T>, exclusive: bool = false) async throws`](#func-Scan)
- [`@inlinable func Scatter<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>, into dst: gpu.Buffer<T>) async throws`](#func-Scatter)
- [`@inlinable func ScatterAdd<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>, into dst: gpu.Buffer<T>) async throws`](#func-ScatterAdd)
- [`@inlinable func Select<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> gpu.Buffer<T>`](#func-Select)
- [`@inlinable func SelectIndices<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> gpu.Buffer<uint32>`](#func-SelectIndices)
- [`@inlinable func Sort<T: dtype.Number>(_ keys: gpu.Buffer<T>) async throws`](#func-Sort)
- [`@inlinable func Sort<T: dtype.Number>(_ keys: gpu.Buffer<T>, values: gpu.Buffer<uint32>) async throws`](#func-Sort-2)
- [`@inlinable func TopK<T: dtype.Number>(_ b: gpu.Buffer<T>, k: int) async throws -> (values: gpu.Buffer<T>, indices: gpu.Buffer<uint32>)`](#func-TopK)
- [`@inlinable func _addOffsets<T: dtype.Number>(_ x: gpu.MutableSpan<T>, _ offsets: gpu.Span<T>, _ n: int) kernel`](#func-_addOffsets)
- [`@inlinable func _compact<T: dtype.Number>(_ x: gpu.Span<T>, _ at: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>, _ indices: gpu.MutableSpan<uint32>, _ op: int32, _ v: T, _ values: bool) kernel`](#func-_compact)
- [`@inlinable func _flag<T: dtype.Number>(_ x: gpu.Span<T>, _ flags: gpu.MutableSpan<uint32>, _ op: int32, _ v: T) kernel`](#func-_flag)
- [`@inlinable func _fromOrderKeys<T: dtype.Number>(_ k: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>) kernel`](#func-_fromOrderKeys)
- [`@inlinable func _gather<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>) kernel`](#func-_gather)
- [`@inlinable func _groupReduce<T: dtype.Number>(_ x: T, _ op: int32) -> T`](#func-_groupReduce)
- [`@inlinable func _groupScan<T: dtype.Number>(_ x: T) -> (inclusive: T, exclusive: T, total: T)`](#func-_groupScan)
- [`@inlinable func _identity<T: dtype.Number>(_ op: int32, _ of: T.Type) -> T`](#func-_identity)
- [`@inlinable func _keeps<T: dtype.Number>(_ x: T, _ op: int32, _ v: T) -> bool`](#func-_keeps)
- [`@inlinable func _op<T: dtype.Number>(_ w: Where, _ of: T.Type) -> (int32, T)`](#func-_op)
- [`@inlinable func _pow2(_ n: int) -> int`](#func-_pow2)
- [`func _radixSort(_ keys: gpu.Buffer<uint32>, _ values: gpu.Buffer<uint32>, _ withValues: bool) async throws`](#func-_radixSort)
- [`@inlinable func _reduceKernel<T: dtype.Number>(_ x: gpu.Span<T>, _ out: gpu.MutableSpan<T>, _ n: int, _ op: int32) kernel`](#func-_reduceKernel)
- [`@inlinable func _scanBlocks<T: dtype.Number>(_ x: gpu.MutableSpan<T>, _ sums: gpu.MutableSpan<T>, _ n: int, _ exclusive: bool) kernel`](#func-_scanBlocks)
- [`@inlinable func _scatter<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ dst: gpu.MutableSpan<T>) kernel`](#func-_scatter)
- [`@inlinable func _scatterAdd<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ dst: gpu.MutableSpan<T>) kernel`](#func-_scatterAdd)
- [`@inlinable func _sortBy<T: dtype.Number>(_ keys: gpu.Buffer<T>, _ values: gpu.Buffer<uint32>, _ withValues: bool) async throws`](#func-_sortBy)
- [`@inlinable func _toOrderKeys<T: dtype.Number>(_ x: gpu.Span<T>, _ out: gpu.MutableSpan<uint32>, _ descending: bool) kernel`](#func-_toOrderKeys)
- [`func _topIndices(_ bits: gpu.Buffer<uint32>, _ k: int) async throws -> gpu.Buffer<uint32>`](#func-_topIndices)
- [`@inlinable func _where<T: dtype.Number>(_ b: gpu.Buffer<T>, _ op: int32, _ v: T) async throws -> (gpu.Buffer<uint32>, int)`](#func-_where)
- [`enum Reduction`](#enum-Reduction)
  - [`var _code: int32 { get }`](#Reduction._code)
- [`enum Where`](#enum-Where)
  - [`var _code: int32 { get }`](#Where._code)
  - [`var _value: float64 { get }`](#Where._value)
  - [`func _bounds(_ lo: float64, _ hi: float64) -> (int32, float64)`](#Where._bounds)

## Constants

<a id="let-MaxGroup"></a>

```vertex
public let MaxGroup = 1024
```

MaxGroup is the most work-items a group-scope function supports.

<a id="let-SharedBins"></a>

```vertex
public let SharedBins = 4096
```

SharedBins is the most bins Histogram counts in shared storage.

## Functions

### func Count <a id="func-Count"></a>

```vertex
@inlinable public func Count<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> int
```

Count is how many elements of b satisfy w.

### func Gather <a id="func-Gather"></a>

```vertex
@inlinable public func Gather<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>) async throws -> gpu.Buffer<T>
```

Gather is src at each of indices: out[i] = src[indices[i]].

### func GroupCount <a id="func-GroupCount"></a>

```vertex
@inlinable public func GroupCount() -> int
```

GroupCount is how many work-items the workgroup has.

### func GroupExclusiveScan <a id="func-GroupExclusiveScan"></a>

```vertex
@inlinable public func GroupExclusiveScan<T: dtype.Number>(_ x: T) -> (prefix: T, total: T)
```

GroupExclusiveScan is the prefix sum of x before this work-item, and
the whole group's total.

### func GroupMax <a id="func-GroupMax"></a>

```vertex
@inlinable public func GroupMax<T: dtype.Number>(_ x: T) -> T
```

GroupMax is the greatest x in the workgroup.

### func GroupMin <a id="func-GroupMin"></a>

```vertex
@inlinable public func GroupMin<T: dtype.Number>(_ x: T) -> T
```

GroupMin is the least x in the workgroup.

### func GroupRank <a id="func-GroupRank"></a>

```vertex
@inlinable public func GroupRank() -> int
```

GroupRank is this work-item's index within its workgroup, counting x
fastest: the order the group-scope functions reduce and scan in.

### func GroupScan <a id="func-GroupScan"></a>

```vertex
@inlinable public func GroupScan<T: dtype.Number>(_ x: T) -> T
```

GroupScan is the inclusive prefix sum of x up to and including this
work-item, in GroupRank order.

### func GroupSum <a id="func-GroupSum"></a>

```vertex
@inlinable public func GroupSum<T: dtype.Number>(_ x: T) -> T
```

GroupSum is the sum of x over the workgroup, added in a fixed tree
order; an integer sum wraps.

### func Histogram <a id="func-Histogram"></a>

```vertex
public func Histogram(_ b: gpu.Buffer<uint32>, bins: int) async throws -> gpu.Buffer<uint32>
```

Histogram counts the values of b in bins 0..<bins: counts[v] is how many
elements equal v. A value of bins or more is not counted.

### func Iota <a id="func-Iota"></a>

```vertex
public func Iota(_ d: gpu.Device, count: int, from start: uint32 = 0) async throws -> gpu.Buffer<uint32>
```

Iota is count consecutive integers from start, on d.

### func Reduce <a id="func-Reduce"></a>

```vertex
@inlinable public func Reduce<T: dtype.Number>(_ b: gpu.Buffer<T>, _ op: Reduction) async throws -> T
```

Reduce combines every element of b with op: its sum (wrapping, for an
integer type), least or greatest element. An empty buffer's is op's
identity.

### func Scan <a id="func-Scan"></a>

```vertex
@inlinable public func Scan<T: dtype.Number>(_ b: gpu.Buffer<T>, exclusive: bool = false) async throws
```

Scan replaces each element of b with the sum of the elements up to
it: including itself (inclusive, the default), or before it
(exclusive, whose first element is zero). An integer sum wraps.

### func Scatter <a id="func-Scatter"></a>

```vertex
@inlinable public func Scatter<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>, into dst: gpu.Buffer<T>) async throws
```

Scatter writes each element of src to dst at its index: dst[indices[i]]
= src[i]. Where two indices are the same, which write lands is not
defined.

### func ScatterAdd <a id="func-ScatterAdd"></a>

```vertex
@inlinable public func ScatterAdd<T: dtype.Number>(_ src: gpu.Buffer<T>, _ indices: gpu.Buffer<uint32>, into dst: gpu.Buffer<T>) async throws
```

ScatterAdd adds each element of src into dst at its index, atomically:
dst[indices[i]] += src[i]. An integer sum is exact whatever the order; a
float one is not deterministic, as the order of the additions is not.

### func Select <a id="func-Select"></a>

```vertex
@inlinable public func Select<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> gpu.Buffer<T>
```

Select is the elements of b that satisfy w, in their order in b.

### func SelectIndices <a id="func-SelectIndices"></a>

```vertex
@inlinable public func SelectIndices<T: dtype.Number>(_ b: gpu.Buffer<T>, where w: Where) async throws -> gpu.Buffer<uint32>
```

SelectIndices is where in b the elements that satisfy w are, in
ascending order.

### func Sort <a id="func-Sort"></a>

```vertex
@inlinable public func Sort<T: dtype.Number>(_ keys: gpu.Buffer<T>) async throws
```

Sort puts keys in ascending order, in place: for floats, IEEE 754's
total order, -0 before +0 and NaNs at the ends by sign. The sort is
stable.

### func Sort <a id="func-Sort-2"></a>

```vertex
@inlinable public func Sort<T: dtype.Number>(_ keys: gpu.Buffer<T>, values: gpu.Buffer<uint32>) async throws
```

Sort puts keys in ascending order and moves each value with its key:
values[i] ends up beside the key it started beside. Equal keys keep
their order.

### func TopK <a id="func-TopK"></a>

```vertex
@inlinable public func TopK<T: dtype.Number>(_ b: gpu.Buffer<T>, k: int) async throws -> (values: gpu.Buffer<T>, indices: gpu.Buffer<uint32>)
```

TopK is b's k greatest elements, greatest first, and their positions
in b. Equal elements come in the order they were in b; for floats, NaNs
rank above every number, as in the total order Sort uses. k is at most
b.count.

### func _addOffsets <a id="func-_addOffsets"></a>

```vertex
@inlinable public func _addOffsets<T: dtype.Number>(_ x: gpu.MutableSpan<T>, _ offsets: gpu.Span<T>, _ n: int) kernel
```

### func _compact <a id="func-_compact"></a>

```vertex
@inlinable public func _compact<T: dtype.Number>(_ x: gpu.Span<T>, _ at: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>, _ indices: gpu.MutableSpan<uint32>, _ op: int32, _ v: T, _ values: bool) kernel
```

### func _flag <a id="func-_flag"></a>

```vertex
@inlinable public func _flag<T: dtype.Number>(_ x: gpu.Span<T>, _ flags: gpu.MutableSpan<uint32>, _ op: int32, _ v: T) kernel
```

### func _fromOrderKeys <a id="func-_fromOrderKeys"></a>

```vertex
@inlinable public func _fromOrderKeys<T: dtype.Number>(_ k: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>) kernel
```

### func _gather <a id="func-_gather"></a>

```vertex
@inlinable public func _gather<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ out: gpu.MutableSpan<T>) kernel
```

### func _groupReduce <a id="func-_groupReduce"></a>

```vertex
@inlinable public func _groupReduce<T: dtype.Number>(_ x: T, _ op: int32) -> T
```

_groupReduce combines x over the workgroup: op 0 sums (Plus), 1 takes
the least, 2 the greatest.

### func _groupScan <a id="func-_groupScan"></a>

```vertex
@inlinable public func _groupScan<T: dtype.Number>(_ x: T) -> (inclusive: T, exclusive: T, total: T)
```

_groupScan is the inclusive and exclusive prefix sums of x at this
work-item, and the group's total, which is the last inclusive sum
exactly: the order a sum is taken in is the same for all three.

### func _identity <a id="func-_identity"></a>

```vertex
@inlinable public func _identity<T: dtype.Number>(_ op: int32, _ of: T.Type) -> T
```

_identity is op's identity for T: the value that changes nothing.

### func _keeps <a id="func-_keeps"></a>

```vertex
@inlinable public func _keeps<T: dtype.Number>(_ x: T, _ op: int32, _ v: T) -> bool
```

### func _op <a id="func-_op"></a>

```vertex
@inlinable public func _op<T: dtype.Number>(_ w: Where, _ of: T.Type) -> (int32, T)
```

_op is w as an operator and a value of T.

### func _pow2 <a id="func-_pow2"></a>

```vertex
@inlinable public func _pow2(_ n: int) -> int
```

_pow2 is the least power of two no smaller than n.

### func _radixSort <a id="func-_radixSort"></a>

```vertex
public func _radixSort(_ keys: gpu.Buffer<uint32>, _ values: gpu.Buffer<uint32>, _ withValues: bool) async throws
```

_radixSort sorts keys, and values with them where withValues holds, in
place. The generic Sort calls it for every key type.

### func _reduceKernel <a id="func-_reduceKernel"></a>

```vertex
@inlinable public func _reduceKernel<T: dtype.Number>(_ x: gpu.Span<T>, _ out: gpu.MutableSpan<T>, _ n: int, _ op: int32) kernel
```

### func _scanBlocks <a id="func-_scanBlocks"></a>

```vertex
@inlinable public func _scanBlocks<T: dtype.Number>(_ x: gpu.MutableSpan<T>, _ sums: gpu.MutableSpan<T>, _ n: int, _ exclusive: bool) kernel
```

### func _scatter <a id="func-_scatter"></a>

```vertex
@inlinable public func _scatter<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ dst: gpu.MutableSpan<T>) kernel
```

### func _scatterAdd <a id="func-_scatterAdd"></a>

```vertex
@inlinable public func _scatterAdd<T: dtype.Number>(_ src: gpu.Span<T>, _ indices: gpu.Span<uint32>, _ dst: gpu.MutableSpan<T>) kernel
```

### func _sortBy <a id="func-_sortBy"></a>

```vertex
@inlinable public func _sortBy<T: dtype.Number>(_ keys: gpu.Buffer<T>, _ values: gpu.Buffer<uint32>, _ withValues: bool) async throws
```

_sortBy sorts keys as their order keys, moving values with them where
withValues holds.

### func _toOrderKeys <a id="func-_toOrderKeys"></a>

```vertex
@inlinable public func _toOrderKeys<T: dtype.Number>(_ x: gpu.Span<T>, _ out: gpu.MutableSpan<uint32>, _ descending: bool) kernel
```

### func _topIndices <a id="func-_topIndices"></a>

```vertex
public func _topIndices(_ bits: gpu.Buffer<uint32>, _ k: int) async throws -> gpu.Buffer<uint32>
```

_topIndices is the positions of the k greatest of b.

### func _where <a id="func-_where"></a>

```vertex
@inlinable public func _where<T: dtype.Number>(_ b: gpu.Buffer<T>, _ op: int32, _ v: T) async throws -> (gpu.Buffer<uint32>, int)
```

_where is where each kept element of b goes, and how many there are.

## Types

### enum Reduction <a id="enum-Reduction"></a>

```vertex
public enum Reduction
```

Reduction is what Reduce combines elements with.

#### Cases

<a id="Reduction.Sum"></a>

```vertex
case Sum
```

<a id="Reduction.Min"></a>

```vertex
case Min
```

<a id="Reduction.Max"></a>

```vertex
case Max
```

#### Properties

<a id="Reduction._code"></a>

```vertex
public var _code: int32 { get }
```

### enum Where <a id="enum-Where"></a>

```vertex
public enum Where
```

Where is the condition Select, SelectIndices and Count keep an element
by: how it compares with a value. For integer elements the comparison
is exact -- Less(0.5) keeps 0 and below, Less(-1) keeps no uint32 --
and for float ones the value is rounded to the element type first.

#### Cases

<a id="Where.Less"></a>

```vertex
case Less(float64)
```

<a id="Where.LessEqual"></a>

```vertex
case LessEqual(float64)
```

<a id="Where.Greater"></a>

```vertex
case Greater(float64)
```

<a id="Where.GreaterEqual"></a>

```vertex
case GreaterEqual(float64)
```

<a id="Where.Equal"></a>

```vertex
case Equal(float64)
```

<a id="Where.NotEqual"></a>

```vertex
case NotEqual(float64)
```

#### Properties

<a id="Where._code"></a>

```vertex
public var _code: int32 { get }
```

<a id="Where._value"></a>

```vertex
public var _value: float64 { get }
```

#### Methods

<a id="Where._bounds"></a>

```vertex
public func _bounds(_ lo: float64, _ hi: float64) -> (int32, float64)
```

_bounds is the comparison for an integer type whose values run
from lo to hi: an operator and an integral value in that range, or
6 (always) or 7 (never) where the value is outside it.

## Files

- gather.vs
- group.vs
- histogram.vs
- reduce.vs
- scan.vs
- select.vs
- sort.vs
- topk.vs
