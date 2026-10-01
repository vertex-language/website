# package gputest

```vertex
import "gpu/gputest"
```

## Index

- [Constants](#constants)
- [`func Close(_ what: string, _ d: gpu.Device, _ got: [float32], _ want: [float32], ulps: int)`](#func-Close)
- [`func Devices() -> [gpu.Device]`](#func-Devices)
- [`func Done()`](#func-Done)
- [`func Equal<T: Equatable>(_ what: string, _ d: gpu.Device, _ got: [T], _ want: [T])`](#func-Equal)
- [`func Near(_ what: string, _ d: gpu.Device, _ got: [float32], _ want: [float64], bound: [float64])`](#func-Near)
- [`func _record(_ what: string, _ d: gpu.Device, _ why: string)`](#func-_record)
- [`struct Random`](#struct-Random)
  - [`init(seed: uint64)`](#Random.init)
  - [`mutating func Next() -> uint64`](#Random.Next)
  - [`mutating func Uint32() -> uint32`](#Random.Uint32)
  - [`mutating func Int32() -> int32`](#Random.Int32)
  - [`mutating func Float32() -> float32`](#Random.Float32)

## Constants

<a id="let-Sizes"></a>

```vertex
public let Sizes = [0, 1, 2, 255, 256, 257, 1000, 65535, 65536, 65537, 300000]
```

Sizes are the element counts a check should try: the empty case, one,
either side of a group and of a group of groups, and a large one.

## Functions

### func Close <a id="func-Close"></a>

```vertex
public func Close(_ what: string, _ d: gpu.Device, _ got: [float32], _ want: [float32], ulps: int)
```

Close checks that each element of got is within ulps units in the last
place of want: for sums whose order differs from the reference's.

### func Devices <a id="func-Devices"></a>

```vertex
public func Devices() -> [gpu.Device]
```

Devices is the CPU device first, then every other device there is: what
a check runs on. The CPU device's answer is the oracle for the rest.

### func Done <a id="func-Done"></a>

```vertex
public func Done()
```

Done prints how many checks ran, and stops the program with a failure
if any of them failed.

### func Equal <a id="func-Equal"></a>

```vertex
public func Equal<T: Equatable>(_ what: string, _ d: gpu.Device, _ got: [T], _ want: [T])
```

Equal checks that got is want, element for element.

### func Near <a id="func-Near"></a>

```vertex
public func Near(_ what: string, _ d: gpu.Device, _ got: [float32], _ want: [float64], bound: [float64])
```

Near checks that each element of got is within bound[i] of want[i]:
for a result whose error is bounded by what it was computed from rather
than by its own size, as a dot product's is by k·ε·Σ|a·b| however much
its terms cancel.

### func _record <a id="func-_record"></a>

```vertex
public func _record(_ what: string, _ d: gpu.Device, _ why: string)
```

_record counts one check, and prints why it failed if it did: why is
empty for a pass.

## Types

### struct Random <a id="struct-Random"></a>

```vertex
public struct Random
```

Random is a reproducible stream of test inputs: xorshift64*, the same
sequence on every run.

#### Initializers

<a id="Random.init"></a>

```vertex
public init(seed: uint64)
```

#### Methods

<a id="Random.Next"></a>

```vertex
public mutating func Next() -> uint64
```

<a id="Random.Uint32"></a>

```vertex
public mutating func Uint32() -> uint32
```

<a id="Random.Int32"></a>

```vertex
public mutating func Int32() -> int32
```

<a id="Random.Float32"></a>

```vertex
public mutating func Float32() -> float32
```

Float32 is uniform in [-1, 1).

## Files

- gputest.vs
