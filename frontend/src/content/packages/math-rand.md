# package rand

```vertex
import "math/rand"
```

Package rand is fast, reproducible pseudo-random generators: not for
secrets (crypto/rand is), but for simulations, tests, shuffles, and
JavaScript's Math.random.

## Index

- [`struct SplitMix64`](#struct-SplitMix64)
  - [`init(seed: uint64)`](#SplitMix64.init)
  - [`mutating func Next() -> uint64`](#SplitMix64.Next)
- [`struct Xorshift128Plus`](#struct-Xorshift128Plus)
  - [`init(seed: uint64)`](#Xorshift128Plus.init)
  - [`mutating func Next() -> uint64`](#Xorshift128Plus.Next)
  - [`mutating func Float64() -> float64`](#Xorshift128Plus.Float64)
  - [`mutating func Below(_ n: uint64) -> uint64`](#Xorshift128Plus.Below)

## Types

### struct SplitMix64 <a id="struct-SplitMix64"></a>

```vertex
public struct SplitMix64
```

SplitMix64 is Steele, Lea and Flood's generator: every seed is good,
so it is also how the other generators turn one seed into their state.

#### Initializers

<a id="SplitMix64.init"></a>

```vertex
public init(seed: uint64)
```

#### Methods

<a id="SplitMix64.Next"></a>

```vertex
public mutating func Next() -> uint64
```

### struct Xorshift128Plus <a id="struct-Xorshift128Plus"></a>

```vertex
public struct Xorshift128Plus
```

Xorshift128Plus is Vigna's xorshift128+, the generator behind V8's and
SpiderMonkey's Math.random.

#### Initializers

<a id="Xorshift128Plus.init"></a>

```vertex
public init(seed: uint64)
```

#### Methods

<a id="Xorshift128Plus.Next"></a>

```vertex
public mutating func Next() -> uint64
```

<a id="Xorshift128Plus.Float64"></a>

```vertex
public mutating func Float64() -> float64
```

Float64 is uniform in [0, 1), from the top 53 bits.

<a id="Xorshift128Plus.Below"></a>

```vertex
public mutating func Below(_ n: uint64) -> uint64
```

Below is uniform in [0, n), without modulo bias; n > 0.

## Files

- rand.vs
