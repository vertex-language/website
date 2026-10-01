# package dtype

```vertex
import "gpu/dtype"
```

## Index

- [`@inlinable func Dequantize<B: Block>(_ b: gpu.Buffer<uint8>, _ format: B, at: int = 0, count: int, into y: gpu.Buffer<float32>) async throws`](#func-Dequantize)
- [`@inlinable func _dequantizeKernel<B: Block>(_ f: B, _ b: gpu.Span<uint8>, _ at: int, _ y: gpu.MutableSpan<float32>, _ n: int) kernel`](#func-_dequantizeKernel)
- [`@inlinable func _scale(_ b: gpu.Span<uint8>, _ at: int) -> float32`](#func-_scale)
- [`@inlinable func _scaleAt(_ p: UnsafeMutablePointer<uint8>) -> float32`](#func-_scaleAt)
- [`@inlinable func _scaleMinK4(_ j: int, _ q: UnsafeMutablePointer<uint8>) -> (int32, int32)`](#func-_scaleMinK4)
- [`struct BF16: Block`](#struct-BF16)
  - [`init()`](#BF16.init)
  - [`@inlinable static func GGMLType() -> int`](#BF16.GGMLType)
  - [`@inlinable static func Size() -> int`](#BF16.Size)
  - [`@inlinable static func Bytes() -> int`](#BF16.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32`](#BF16.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#BF16.Dot)
- [`protocol Block`](#protocol-Block)
  - [`init()`](#Block.init)
  - [`static func GGMLType() -> int`](#Block.GGMLType)
  - [`static func Size() -> int`](#Block.Size)
  - [`static func Bytes() -> int`](#Block.Bytes)
  - [`static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32`](#Block.Decode)
  - [`static func Dot(_ block: UnsafeMutablePointer<uint8>, _ x: UnsafeMutablePointer<float32>) -> float32`](#Block.Dot)
- [`struct F16: Block`](#struct-F16)
  - [`init()`](#F16.init)
  - [`@inlinable static func GGMLType() -> int`](#F16.GGMLType)
  - [`@inlinable static func Size() -> int`](#F16.Size)
  - [`@inlinable static func Bytes() -> int`](#F16.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32`](#F16.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#F16.Dot)
- [`protocol Number: Numeric, Comparable`](#protocol-Number)
  - [`static func Lowest() -> Self`](#Number.Lowest)
  - [`static func Highest() -> Self`](#Number.Highest)
  - [`static func Plus(_ a: Self, _ b: Self) -> Self`](#Number.Plus)
  - [`static func OrderKey(_ x: Self) -> uint32`](#Number.OrderKey)
  - [`static func FromOrderKey(_ k: uint32) -> Self`](#Number.FromOrderKey)
  - [`static func AtomicAdd(_ p: UnsafeMutablePointer<Self>, _ v: Self) -> Self`](#Number.AtomicAdd)
  - [`static func IsInteger() -> bool`](#Number.IsInteger)
  - [`static func ToFloat64(_ x: Self) -> float64`](#Number.ToFloat64)
  - [`static func FromFloat64(_ x: float64) -> Self`](#Number.FromFloat64)
  - [`static func Widen(_ x: Self) -> Accumulator`](#Number.Widen)
  - [`static func Narrow(_ x: Accumulator) -> Self`](#Number.Narrow)
  - [`associatedtype Accumulator: Number`](#Number.Accumulator)
- [`struct Q4_0: Block`](#struct-Q4_0)
  - [`init()`](#Q4_0.init)
  - [`@inlinable static func GGMLType() -> int`](#Q4_0.GGMLType)
  - [`@inlinable static func Size() -> int`](#Q4_0.Size)
  - [`@inlinable static func Bytes() -> int`](#Q4_0.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32`](#Q4_0.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#Q4_0.Dot)
- [`struct Q4_K: Block`](#struct-Q4_K)
  - [`init()`](#Q4_K.init)
  - [`@inlinable static func GGMLType() -> int`](#Q4_K.GGMLType)
  - [`@inlinable static func Size() -> int`](#Q4_K.Size)
  - [`@inlinable static func Bytes() -> int`](#Q4_K.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ e: int) -> float32`](#Q4_K.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#Q4_K.Dot)
- [`struct Q6_K: Block`](#struct-Q6_K)
  - [`init()`](#Q6_K.init)
  - [`@inlinable static func GGMLType() -> int`](#Q6_K.GGMLType)
  - [`@inlinable static func Size() -> int`](#Q6_K.Size)
  - [`@inlinable static func Bytes() -> int`](#Q6_K.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ e: int) -> float32`](#Q6_K.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#Q6_K.Dot)
- [`struct Q8_0: Block`](#struct-Q8_0)
  - [`init()`](#Q8_0.init)
  - [`@inlinable static func GGMLType() -> int`](#Q8_0.GGMLType)
  - [`@inlinable static func Size() -> int`](#Q8_0.Size)
  - [`@inlinable static func Bytes() -> int`](#Q8_0.Bytes)
  - [`@inlinable static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32`](#Q8_0.Decode)
  - [`@inlinable static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32`](#Q8_0.Dot)
- [`extension bfloat16`](#extension-bfloat16)
- [`extension float16`](#extension-float16)
- [`extension float32`](#extension-float32)
- [`extension int32`](#extension-int32)
- [`extension uint32`](#extension-uint32)

## Functions

### func Dequantize <a id="func-Dequantize"></a>

```vertex
@inlinable public func Dequantize<B: Block>(_ b: gpu.Buffer<uint8>, _ format: B, at: int = 0, count: int, into y: gpu.Buffer<float32>) async throws
```

Dequantize decodes count elements of the format, starting at byte `at`
of b (a block boundary), into y. count is a multiple of the format's
Size(). What an embedding lookup of quantized rows is:
`dtype.Dequantize(w, dtype.Q4_0(), at: row * rowBytes, count: n, into: x)`.

### func _dequantizeKernel <a id="func-_dequantizeKernel"></a>

```vertex
@inlinable public func _dequantizeKernel<B: Block>(_ f: B, _ b: gpu.Span<uint8>, _ at: int, _ y: gpu.MutableSpan<float32>, _ n: int) kernel
```

### func _scale <a id="func-_scale"></a>

```vertex
@inlinable public func _scale(_ b: gpu.Span<uint8>, _ at: int) -> float32
```

_scale is the float16 scale at a block's first two bytes.

### func _scaleAt <a id="func-_scaleAt"></a>

```vertex
@inlinable public func _scaleAt(_ p: UnsafeMutablePointer<uint8>) -> float32
```

_scaleAt is the float16 scale at a block's first two bytes, which lie
2-byte aligned: every block format's size is even.

### func _scaleMinK4 <a id="func-_scaleMinK4"></a>

```vertex
@inlinable public func _scaleMinK4(_ j: int, _ q: UnsafeMutablePointer<uint8>) -> (int32, int32)
```

_scaleMinK4 is the 6-bit scale and min of sub-block j (0 to 7) of a
k-quant block, packed in its 12 scale bytes (ggml's get_scale_min_k4).

## Types

### struct BF16 <a id="struct-BF16"></a>

```vertex
public struct BF16: Block
```

BF16 is bfloat16 as a Block: the high half of a float32, 16 of them in
32 bytes -- the dtype most checkpoints on the Hugging Face Hub hold.
Widening is exact.

#### Initializers

<a id="BF16.init"></a>

```vertex
public init()
```

#### Methods

<a id="BF16.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="BF16.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="BF16.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="BF16.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32
```

<a id="BF16.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

### protocol Block <a id="protocol-Block"></a>

```vertex
public protocol Block
```

Block is a block-quantized format. A row of n elements (n a multiple of
Size) is n / Size blocks, one after another.

#### Initializers

<a id="Block.init"></a>

```vertex
init()
```

#### Methods

<a id="Block.GGMLType"></a>

```vertex
static func GGMLType() -> int
```

GGMLType is the format's number in ggml and GGUF (2 for q4_0, 8 for
q8_0): what picks a kernel tuned to it.

<a id="Block.Size"></a>

```vertex
static func Size() -> int
```

Size is how many elements a block holds.

<a id="Block.Bytes"></a>

```vertex
static func Bytes() -> int
```

Bytes is how many bytes a block takes.

<a id="Block.Decode"></a>

```vertex
static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32
```

Decode is element j of the block whose first byte is at.

<a id="Block.Dot"></a>

```vertex
static func Dot(_ block: UnsafeMutablePointer<uint8>, _ x: UnsafeMutablePointer<float32>) -> float32
```

Dot is the block whose first byte is at block dotted with the
Size() floats from x, the scale applied once: the inner step of a
quantized Gemv. It reads unchecked; the caller has checked that the
block and the floats are there.

### struct F16 <a id="struct-F16"></a>

```vertex
public struct F16: Block
```

F16 is IEEE half floats as a Block: 16 of them, 32 bytes, no scale --
so that a float16 weight (safetensors' F16, GGUF's type 1) runs through
the same Gemv and Dequantize as the quantized ones.

#### Initializers

<a id="F16.init"></a>

```vertex
public init()
```

#### Methods

<a id="F16.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="F16.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="F16.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="F16.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32
```

<a id="F16.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

### protocol Number <a id="protocol-Number"></a>

```vertex
public protocol Number: Numeric, Comparable
```

Number is a type a kernel computes with: float32, float16, bfloat16,
int32 or uint32. A function written once
over a Number -- gpu/parallel's reductions, scans and sorts -- is built
for each type it is used at, on the device and on the host.

#### Methods

<a id="Number.Lowest"></a>

```vertex
static func Lowest() -> Self
```

Lowest is the least value: the identity of a maximum.

<a id="Number.Highest"></a>

```vertex
static func Highest() -> Self
```

Highest is the greatest value: the identity of a minimum.

<a id="Number.Plus"></a>

```vertex
static func Plus(_ a: Self, _ b: Self) -> Self
```

Plus is a + b, wrapping around for an integer type rather than
trapping, as a sum on a GPU does.

<a id="Number.OrderKey"></a>

```vertex
static func OrderKey(_ x: Self) -> uint32
```

OrderKey is the uint32 whose unsigned order is this type's total
order: what a radix sort sorts. For a float, IEEE 754's total order
(-NaN < -inf < ... < -0 < +0 < ... < +inf < +NaN).

<a id="Number.FromOrderKey"></a>

```vertex
static func FromOrderKey(_ k: uint32) -> Self
```

FromOrderKey is the value OrderKey made k from.

<a id="Number.AtomicAdd"></a>

```vertex
static func AtomicAdd(_ p: UnsafeMutablePointer<Self>, _ v: Self) -> Self
```

AtomicAdd adds v to *p as one indivisible step, and returns what
*p was.

<a id="Number.IsInteger"></a>

```vertex
static func IsInteger() -> bool
```

IsInteger is whether the type holds whole numbers only.

<a id="Number.ToFloat64"></a>

```vertex
static func ToFloat64(_ x: Self) -> float64
```

ToFloat64 and FromFloat64 are conversions for the host: a device
may have no float64.

<a id="Number.FromFloat64"></a>

```vertex
static func FromFloat64(_ x: float64) -> Self
```

<a id="Number.Widen"></a>

```vertex
static func Widen(_ x: Self) -> Accumulator
```

<a id="Number.Narrow"></a>

```vertex
static func Narrow(_ x: Accumulator) -> Self
```

#### Associated types and aliases

<a id="Number.Accumulator"></a>

```vertex
associatedtype Accumulator: Number
```

Accumulator is what a long sum of this type is taken in -- a dot
product's, a matmul's: float32 for a half, which would lose the
sum's low bits after a few hundred terms, and the type itself
otherwise. Widen and Narrow go to it and back, Narrow rounding once.

### struct Q4_0 <a id="struct-Q4_0"></a>

```vertex
public struct Q4_0: Block
```

Q4_0 is ggml's q4_0: a float16 scale d, then 16 bytes of 4-bit
quants. Element j < 16 is (low nibble of byte j - 8)·d, and element
j + 16 is (high nibble of byte j - 8)·d.

#### Initializers

<a id="Q4_0.init"></a>

```vertex
public init()
```

#### Methods

<a id="Q4_0.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="Q4_0.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="Q4_0.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="Q4_0.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32
```

<a id="Q4_0.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

### struct Q4_K <a id="struct-Q4_K"></a>

```vertex
public struct Q4_K: Block
```

Q4_K is ggml's q4_K: 256 elements in 144 bytes -- a float16 scale d and
min dmin, 12 bytes of 6-bit scales and mins for 8 sub-blocks of 32,
then 128 bytes of 4-bit quants. Sub-block pair j (0 to 3) is 32 bytes of
quants: element l of the first is (low nibble of byte l)·d·sc - dmin·m,
of the second (its high nibble)·d·sc' - dmin·m'.

#### Initializers

<a id="Q4_K.init"></a>

```vertex
public init()
```

#### Methods

<a id="Q4_K.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="Q4_K.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="Q4_K.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="Q4_K.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ e: int) -> float32
```

<a id="Q4_K.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

### struct Q6_K <a id="struct-Q6_K"></a>

```vertex
public struct Q6_K: Block
```

Q6_K is ggml's q6_K: 256 elements in 210 bytes -- 128 bytes of each
quant's low 4 bits, 64 of its high 2, 16 int8 scales (one a sub-block
of 16), and a float16 scale d last. An element is d·sc·(q - 32).

#### Initializers

<a id="Q6_K.init"></a>

```vertex
public init()
```

#### Methods

<a id="Q6_K.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="Q6_K.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="Q6_K.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="Q6_K.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ e: int) -> float32
```

<a id="Q6_K.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

### struct Q8_0 <a id="struct-Q8_0"></a>

```vertex
public struct Q8_0: Block
```

Q8_0 is ggml's q8_0: a float16 scale d, then 32 int8 quants. Element
j is q[j]·d.

#### Initializers

<a id="Q8_0.init"></a>

```vertex
public init()
```

#### Methods

<a id="Q8_0.GGMLType"></a>

```vertex
@inlinable public static func GGMLType() -> int
```

<a id="Q8_0.Size"></a>

```vertex
@inlinable public static func Size() -> int
```

<a id="Q8_0.Bytes"></a>

```vertex
@inlinable public static func Bytes() -> int
```

<a id="Q8_0.Decode"></a>

```vertex
@inlinable public static func Decode(_ b: gpu.Span<uint8>, _ at: int, _ j: int) -> float32
```

<a id="Q8_0.Dot"></a>

```vertex
@inlinable public static func Dot(_ block: UnsafeMutablePointer<uint8>, _ v: UnsafeMutablePointer<float32>) -> float32
```

## Extensions

### extension bfloat16 <a id="extension-bfloat16"></a>

```vertex
extension bfloat16
```

Conforms by extension to: `Number`

#### Methods

<a id="bfloat16.Lowest"></a>

```vertex
@inlinable public static func Lowest() -> bfloat16
```

<a id="bfloat16.Highest"></a>

```vertex
@inlinable public static func Highest() -> bfloat16
```

<a id="bfloat16.Plus"></a>

```vertex
@inlinable public static func Plus(_ a: bfloat16, _ b: bfloat16) -> bfloat16
```

<a id="bfloat16.OrderKey"></a>

```vertex
@inlinable public static func OrderKey(_ x: bfloat16) -> uint32
```

A half's total order is float32's on its 16 bits.

<a id="bfloat16.FromOrderKey"></a>

```vertex
@inlinable public static func FromOrderKey(_ k: uint32) -> bfloat16
```

<a id="bfloat16.AtomicAdd"></a>

```vertex
@inlinable public static func AtomicAdd(_ p: UnsafeMutablePointer<bfloat16>, _ v: bfloat16) -> bfloat16
```

<a id="bfloat16.IsInteger"></a>

```vertex
@inlinable public static func IsInteger() -> bool
```

<a id="bfloat16.ToFloat64"></a>

```vertex
@inlinable public static func ToFloat64(_ x: bfloat16) -> float64
```

<a id="bfloat16.FromFloat64"></a>

```vertex
@inlinable public static func FromFloat64(_ x: float64) -> bfloat16
```

<a id="bfloat16.Widen"></a>

```vertex
@inlinable public static func Widen(_ x: bfloat16) -> float32
```

<a id="bfloat16.Narrow"></a>

```vertex
@inlinable public static func Narrow(_ x: float32) -> bfloat16
```

#### Associated types and aliases

<a id="bfloat16.Accumulator"></a>

```vertex
public typealias Accumulator = float32
```

### extension float16 <a id="extension-float16"></a>

```vertex
extension float16
```

Conforms by extension to: `Number`

#### Methods

<a id="float16.Lowest"></a>

```vertex
@inlinable public static func Lowest() -> float16
```

<a id="float16.Highest"></a>

```vertex
@inlinable public static func Highest() -> float16
```

<a id="float16.Plus"></a>

```vertex
@inlinable public static func Plus(_ a: float16, _ b: float16) -> float16
```

<a id="float16.OrderKey"></a>

```vertex
@inlinable public static func OrderKey(_ x: float16) -> uint32
```

A half's total order is float32's on its 16 bits.

<a id="float16.FromOrderKey"></a>

```vertex
@inlinable public static func FromOrderKey(_ k: uint32) -> float16
```

<a id="float16.AtomicAdd"></a>

```vertex
@inlinable public static func AtomicAdd(_ p: UnsafeMutablePointer<float16>, _ v: float16) -> float16
```

<a id="float16.IsInteger"></a>

```vertex
@inlinable public static func IsInteger() -> bool
```

<a id="float16.ToFloat64"></a>

```vertex
@inlinable public static func ToFloat64(_ x: float16) -> float64
```

<a id="float16.FromFloat64"></a>

```vertex
@inlinable public static func FromFloat64(_ x: float64) -> float16
```

<a id="float16.Widen"></a>

```vertex
@inlinable public static func Widen(_ x: float16) -> float32
```

<a id="float16.Narrow"></a>

```vertex
@inlinable public static func Narrow(_ x: float32) -> float16
```

#### Associated types and aliases

<a id="float16.Accumulator"></a>

```vertex
public typealias Accumulator = float32
```

### extension float32 <a id="extension-float32"></a>

```vertex
extension float32
```

Conforms by extension to: `Number`

#### Methods

<a id="float32.Lowest"></a>

```vertex
@inlinable public static func Lowest() -> float32
```

<a id="float32.Highest"></a>

```vertex
@inlinable public static func Highest() -> float32
```

<a id="float32.Plus"></a>

```vertex
@inlinable public static func Plus(_ a: float32, _ b: float32) -> float32
```

<a id="float32.OrderKey"></a>

```vertex
@inlinable public static func OrderKey(_ x: float32) -> uint32
```

<a id="float32.FromOrderKey"></a>

```vertex
@inlinable public static func FromOrderKey(_ k: uint32) -> float32
```

<a id="float32.AtomicAdd"></a>

```vertex
@inlinable public static func AtomicAdd(_ p: UnsafeMutablePointer<float32>, _ v: float32) -> float32
```

<a id="float32.IsInteger"></a>

```vertex
@inlinable public static func IsInteger() -> bool
```

<a id="float32.ToFloat64"></a>

```vertex
@inlinable public static func ToFloat64(_ x: float32) -> float64
```

<a id="float32.FromFloat64"></a>

```vertex
@inlinable public static func FromFloat64(_ x: float64) -> float32
```

<a id="float32.Widen"></a>

```vertex
@inlinable public static func Widen(_ x: float32) -> float32
```

<a id="float32.Narrow"></a>

```vertex
@inlinable public static func Narrow(_ x: float32) -> float32
```

#### Associated types and aliases

<a id="float32.Accumulator"></a>

```vertex
public typealias Accumulator = float32
```

### extension int32 <a id="extension-int32"></a>

```vertex
extension int32
```

Conforms by extension to: `Number`

#### Methods

<a id="int32.Lowest"></a>

```vertex
@inlinable public static func Lowest() -> int32
```

<a id="int32.Highest"></a>

```vertex
@inlinable public static func Highest() -> int32
```

<a id="int32.Plus"></a>

```vertex
@inlinable public static func Plus(_ a: int32, _ b: int32) -> int32
```

<a id="int32.OrderKey"></a>

```vertex
@inlinable public static func OrderKey(_ x: int32) -> uint32
```

<a id="int32.FromOrderKey"></a>

```vertex
@inlinable public static func FromOrderKey(_ k: uint32) -> int32
```

<a id="int32.AtomicAdd"></a>

```vertex
@inlinable public static func AtomicAdd(_ p: UnsafeMutablePointer<int32>, _ v: int32) -> int32
```

<a id="int32.IsInteger"></a>

```vertex
@inlinable public static func IsInteger() -> bool
```

<a id="int32.ToFloat64"></a>

```vertex
@inlinable public static func ToFloat64(_ x: int32) -> float64
```

<a id="int32.FromFloat64"></a>

```vertex
@inlinable public static func FromFloat64(_ x: float64) -> int32
```

<a id="int32.Widen"></a>

```vertex
@inlinable public static func Widen(_ x: int32) -> int32
```

<a id="int32.Narrow"></a>

```vertex
@inlinable public static func Narrow(_ x: int32) -> int32
```

#### Associated types and aliases

<a id="int32.Accumulator"></a>

```vertex
public typealias Accumulator = int32
```

### extension uint32 <a id="extension-uint32"></a>

```vertex
extension uint32
```

Conforms by extension to: `Number`

#### Methods

<a id="uint32.Lowest"></a>

```vertex
@inlinable public static func Lowest() -> uint32
```

<a id="uint32.Highest"></a>

```vertex
@inlinable public static func Highest() -> uint32
```

<a id="uint32.Plus"></a>

```vertex
@inlinable public static func Plus(_ a: uint32, _ b: uint32) -> uint32
```

<a id="uint32.OrderKey"></a>

```vertex
@inlinable public static func OrderKey(_ x: uint32) -> uint32
```

<a id="uint32.FromOrderKey"></a>

```vertex
@inlinable public static func FromOrderKey(_ k: uint32) -> uint32
```

<a id="uint32.AtomicAdd"></a>

```vertex
@inlinable public static func AtomicAdd(_ p: UnsafeMutablePointer<uint32>, _ v: uint32) -> uint32
```

<a id="uint32.IsInteger"></a>

```vertex
@inlinable public static func IsInteger() -> bool
```

<a id="uint32.ToFloat64"></a>

```vertex
@inlinable public static func ToFloat64(_ x: uint32) -> float64
```

<a id="uint32.FromFloat64"></a>

```vertex
@inlinable public static func FromFloat64(_ x: float64) -> uint32
```

<a id="uint32.Widen"></a>

```vertex
@inlinable public static func Widen(_ x: uint32) -> uint32
```

<a id="uint32.Narrow"></a>

```vertex
@inlinable public static func Narrow(_ x: uint32) -> uint32
```

#### Associated types and aliases

<a id="uint32.Accumulator"></a>

```vertex
public typealias Accumulator = uint32
```

## Files

- block.vs
- number.vs
