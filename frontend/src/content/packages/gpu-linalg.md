# package linalg

```vertex
import "gpu/linalg"
```

## Index

- [`@inlinable func Gemv<T: dtype.Number>(a: gpu.Buffer<T>, x: gpu.Buffer<T>, into y: gpu.Buffer<T>, m: int, k: int, accumulate: bool = false) async throws`](#func-Gemv)
- [`func Gemv(parts: [gpu.Buffer<float32>], rows: [int], x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, k: int, accumulate: bool = false) async throws`](#func-Gemv-2)
- [`@inlinable func Gemv<B: dtype.Block>(w: gpu.Buffer<uint8>, format: B, x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, m: int, k: int, accumulate: bool = false) async throws`](#func-Gemv-3)
- [`@inlinable func Gemv<B: dtype.Block>(parts: [gpu.Buffer<uint8>], rows: [int], format: B, x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, k: int, accumulate: bool = false) async throws`](#func-Gemv-4)
- [`@inlinable func Matmul<T: dtype.Number>(a: gpu.Buffer<T>, b: gpu.Buffer<T>, into c: gpu.Buffer<T>, shape: Shape) async throws`](#func-Matmul)
- [`@inlinable func Matmul<T: dtype.Number>(a: gpu.Buffer<T>, b: gpu.Buffer<T>, into c: gpu.Buffer<T>, s: Shape, e: Epilogue<T>) async throws`](#func-Matmul-2)
- [`@inlinable func Transpose<T: dtype.Number>(x: gpu.Buffer<T>, into y: gpu.Buffer<T>, rows: int, cols: int) async throws`](#func-Transpose)
- [`@inlinable func _at<T: dtype.Number>(x: gpu.Span<T>, base: int, row: int, col: int, rows: int, cols: int, t: bool) -> T`](#func-_at)
- [`_ m0: int, m1: int, m: int, k: int, per: int, accumulate: bool) kernel`](#func-_gemvBlockKernel)
- [`_ m0: int, m1: int, m: int, k: int, per: int, accumulate: bool) kernel`](#func-_gemvF32Kernel)
- [`@inlinable func _gemvKernel<T: dtype.Number>(a: gpu.Span<T>, x: gpu.Span<T>, y: gpu.MutableSpan<T>, m: int, k: int, accumulate: bool) kernel`](#func-_gemvKernel)
- [`_ m0: int, m1: int, m: int, k: int, accumulate: bool) kernel`](#func-_gemvQ4_0Kernel)
- [`_ m0: int, m1: int, m: int, k: int, accumulate: bool) kernel`](#func-_gemvQ4_KKernel)
- [`_ m0: int, m1: int, m: int, k: int, accumulate: bool) kernel`](#func-_gemvQ6_KKernel)
- [`_ m0: int, m1: int, m: int, k: int, accumulate: bool) kernel`](#func-_gemvQ8_0Kernel)
- [`@inlinable func _lanes(units: int, wave: int) -> int`](#func-_lanes)
- [`_ a: gpu.Span<T>, b: gpu.Span<T>, c: gpu.MutableSpan<T>, bias: gpu.Span<T>, residual: gpu.Span<T>, m: int, n: int, k: int, strideA: int, strideB: int, strideC: int, ta: bool, tb: bool, scale: T, hasBias: bool, hasResidual: bool, activation: int32) kernel`](#func-_matmulKernel)
- [`_ a10: float32, a11: float32, a12: float32, a13: float32, a20: float32, a21: float32, a22: float32, a23: float32, sy0: float32, sy1: float32, sy2: float32, sy3: float32) -> float32`](#func-_q4KBlock)
- [`@inlinable func _reduce(v: float32, per: int) -> float32`](#func-_reduce)
- [`@inlinable func _rowAt<E>(w0: gpu.Span<E>, w1: gpu.Span<E>, w2: gpu.Span<E>, r: int, m0: int, m1: int, m: int, row: int) -> UnsafeMutablePointer<E>`](#func-_rowAt)
- [`func _stack(counts: [int], rows: [int], k: int, bytesPerRow: int, xCount: int, yCount: int) throws -> (int, int, int)`](#func-_stack)
- [`@inlinable func _transposeKernel<T: dtype.Number>(x: gpu.Span<T>, y: gpu.MutableSpan<T>, rows: int, cols: int) kernel`](#func-_transposeKernel)
- [`enum Activation`](#enum-Activation)
  - [`var _code: int32 { get }`](#Activation._code)
- [`struct Epilogue<T: dtype.Number>`](#struct-Epilogue)
  - [`init(scale: T, bias: gpu.Buffer<T>?, residual: gpu.Buffer<T>?, activation: Activation)`](#Epilogue.init)
  - [`var scale: T`](#Epilogue.scale)
  - [`var bias: gpu.Buffer<T>?`](#Epilogue.bias)
  - [`var residual: gpu.Buffer<T>?`](#Epilogue.residual)
  - [`var activation: Activation`](#Epilogue.activation)
- [`struct Shape`](#struct-Shape)
  - [`init(m: int, n: int, k: int, batch: int = 1, transposeA: bool = false, transposeB: bool = false)`](#Shape.init)
  - [`var m: int`](#Shape.m)
  - [`var n: int`](#Shape.n)
  - [`var k: int`](#Shape.k)
  - [`var batch: int`](#Shape.batch)
  - [`var transposeA: bool`](#Shape.transposeA)
  - [`var transposeB: bool`](#Shape.transposeB)

## Functions

### func Gemv <a id="func-Gemv"></a>

```vertex
@inlinable public func Gemv<T: dtype.Number>(a: gpu.Buffer<T>, x: gpu.Buffer<T>, into y: gpu.Buffer<T>, m: int, k: int, accumulate: bool = false) async throws
```

Gemv is y = A · x: A is m x k, row-major; x has k elements and y m.
With accumulate, y = A · x + y: a residual added in the same pass.
The matrix-vector product decoding a model is made of.

### func Gemv <a id="func-Gemv-2"></a>

```vertex
public func Gemv(parts: [gpu.Buffer<float32>], rows: [int], x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, k: int, accumulate: bool = false) async throws
```

Gemv is y = [A0; A1; A2] · x for float32 weights stacked by rows: parts
holds one to three weights of rows[i] rows of k each.

### func Gemv <a id="func-Gemv-3"></a>

```vertex
@inlinable public func Gemv<B: dtype.Block>(w: gpu.Buffer<uint8>, format: B, x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, m: int, k: int, accumulate: bool = false) async throws
```

Gemv is y = W · x with W block-quantized: m rows of k elements, each
row k / format.Size() blocks of the format, one after another -- a GGUF
tensor's bytes as they are. x and y are float32; the sum is taken in
float32. With accumulate, y = W · x + y. What decoding a quantized
model is made of.

### func Gemv <a id="func-Gemv-4"></a>

```vertex
@inlinable public func Gemv<B: dtype.Block>(parts: [gpu.Buffer<uint8>], rows: [int], format: B, x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, k: int, accumulate: bool = false) async throws
```

Gemv is y = [W0; W1; W2] · x for block-quantized weights of one format
stacked by rows: parts holds one to three weights of rows[i] rows of k.
On a GPU with waves of 32, q4_0 and q8_0 take kernels tuned to them
after llama.cpp's; every format takes the kernel over its Block.

### func Matmul <a id="func-Matmul"></a>

```vertex
@inlinable public func Matmul<T: dtype.Number>(a: gpu.Buffer<T>, b: gpu.Buffer<T>, into c: gpu.Buffer<T>, shape: Shape) async throws
```

Matmul is C = A · B for the problem shape: all row-major.

### func Matmul <a id="func-Matmul-2"></a>

```vertex
@inlinable public func Matmul<T: dtype.Number>(a: gpu.Buffer<T>, b: gpu.Buffer<T>, into c: gpu.Buffer<T>, s: Shape, e: Epilogue<T>) async throws
```

Matmul is C = epilogue(A · B) for the problem shape.

### func Transpose <a id="func-Transpose"></a>

```vertex
@inlinable public func Transpose<T: dtype.Number>(x: gpu.Buffer<T>, into y: gpu.Buffer<T>, rows: int, cols: int) async throws
```

Transpose writes the rows x cols row-major matrix x into y as its
cols x rows transpose.

### func _at <a id="func-_at"></a>

```vertex
@inlinable public func _at<T: dtype.Number>(x: gpu.Span<T>, base: int, row: int, col: int, rows: int, cols: int, t: bool) -> T
```

_at is element (row, col) of a row-major matrix with cols columns,
read transposed where t holds.

### func _gemvBlockKernel <a id="func-_gemvBlockKernel"></a>

```vertex
@inlinable public func _gemvBlockKernel<B: dtype.Block>(f: B, w0: gpu.Span<uint8>, w1: gpu.Span<uint8>, w2: gpu.Span<uint8>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                                        m0: int, m1: int, m: int, k: int, per: int, accumulate: bool) kernel
```

### func _gemvF32Kernel <a id="func-_gemvF32Kernel"></a>

```vertex
@inlinable public func _gemvF32Kernel(a0: gpu.Span<float32>, a1: gpu.Span<float32>, a2: gpu.Span<float32>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                      m0: int, m1: int, m: int, k: int, per: int, accumulate: bool) kernel
```

### func _gemvKernel <a id="func-_gemvKernel"></a>

```vertex
@inlinable public func _gemvKernel<T: dtype.Number>(a: gpu.Span<T>, x: gpu.Span<T>, y: gpu.MutableSpan<T>, m: int, k: int, accumulate: bool) kernel
```

### func _gemvQ4_0Kernel <a id="func-_gemvQ4_0Kernel"></a>

```vertex
@inlinable public func _gemvQ4_0Kernel(w0: gpu.Span<uint8>, w1: gpu.Span<uint8>, w2: gpu.Span<uint8>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                       m0: int, m1: int, m: int, k: int, accumulate: bool) kernel
```

### func _gemvQ4_KKernel <a id="func-_gemvQ4_KKernel"></a>

```vertex
@inlinable public func _gemvQ4_KKernel(w0: gpu.Span<uint8>, w1: gpu.Span<uint8>, w2: gpu.Span<uint8>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                       m0: int, m1: int, m: int, k: int, accumulate: bool) kernel
```

### func _gemvQ6_KKernel <a id="func-_gemvQ6_KKernel"></a>

```vertex
@inlinable public func _gemvQ6_KKernel(w0: gpu.Span<uint8>, w1: gpu.Span<uint8>, w2: gpu.Span<uint8>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                       m0: int, m1: int, m: int, k: int, accumulate: bool) kernel
```

### func _gemvQ8_0Kernel <a id="func-_gemvQ8_0Kernel"></a>

```vertex
@inlinable public func _gemvQ8_0Kernel(w0: gpu.Span<uint8>, w1: gpu.Span<uint8>, w2: gpu.Span<uint8>, x: gpu.Span<float32>, y: gpu.MutableSpan<float32>,
                                       m0: int, m1: int, m: int, k: int, accumulate: bool) kernel
```

### func _lanes <a id="func-_lanes"></a>

```vertex
@inlinable public func _lanes(units: int, wave: int) -> int
```

_lanes is how many lanes of a wave a row of n units takes: about two
units each, a power of 2, at most a wave -- so a short row leaves few
lanes idle.

### func _matmulKernel <a id="func-_matmulKernel"></a>

```vertex
@inlinable public func _matmulKernel<T: dtype.Number>(
    a: gpu.Span<T>, b: gpu.Span<T>, c: gpu.MutableSpan<T>,
    bias: gpu.Span<T>, residual: gpu.Span<T>,
    m: int, n: int, k: int,
    strideA: int, strideB: int, strideC: int,
    ta: bool, tb: bool,
    scale: T, hasBias: bool, hasResidual: bool, activation: int32
) kernel
```

### func _q4KBlock <a id="func-_q4KBlock"></a>

```vertex
@inlinable public func _q4KBlock(block: UnsafeMutablePointer<uint8>, iq: int,
                                 a10: float32, a11: float32, a12: float32, a13: float32,
                                 a20: float32, a21: float32, a22: float32, a23: float32,
                                 sy0: float32, sy1: float32, sy2: float32, sy3: float32) -> float32
```

_q4KBlock is a lane's part of a q4_K block's dot product: its sums,
scaled by the four sub-blocks' scales and mins, unpacked as llama.cpp's
kernel does.

### func _reduce <a id="func-_reduce"></a>

```vertex
@inlinable public func _reduce(v: float32, per: int) -> float32
```

_reduce adds a row's parts across the `per` lanes that hold them.

### func _rowAt <a id="func-_rowAt"></a>

```vertex
@inlinable public func _rowAt<E>(w0: gpu.Span<E>, w1: gpu.Span<E>, w2: gpu.Span<E>, r: int, m0: int, m1: int, m: int, row: int) -> UnsafeMutablePointer<E>
```

_rowAt is where row r of the stacked parts begins; a row past m reads
row m - 1 again (and writes nothing).

### func _stack <a id="func-_stack"></a>

```vertex
public func _stack(counts: [int], rows: [int], k: int, bytesPerRow: int, xCount: int, yCount: int) throws -> (int, int, int)
```

_stack checks stacked parts of rows[i] rows, each row `unit` elements
per k, against x and y, and is (m0, m1, m).

### func _transposeKernel <a id="func-_transposeKernel"></a>

```vertex
@inlinable public func _transposeKernel<T: dtype.Number>(x: gpu.Span<T>, y: gpu.MutableSpan<T>, rows: int, cols: int) kernel
```

## Types

### enum Activation <a id="enum-Activation"></a>

```vertex
public enum Activation
```

Activation is applied to each element of a Matmul's result, after
scale, bias and residual. GELU and SiLU wait on math inside kernels.

#### Cases

<a id="Activation.None"></a>

```vertex
case None
```

<a id="Activation.ReLU"></a>

```vertex
case ReLU
```

#### Properties

<a id="Activation._code"></a>

```vertex
public var _code: int32 { get }
```

### struct Epilogue <a id="struct-Epilogue"></a>

```vertex
public struct Epilogue<T: dtype.Number>
```

Epilogue is what Matmul does to each element of A · B before it writes
it: C = activation(scale · (A · B) + bias[column] + residual). It is
applied inside the kernel that computes the product, so it costs no
extra pass over C.

#### Initializers

<a id="Epilogue.init"></a>

```vertex
public init(scale: T, bias: gpu.Buffer<T>?, residual: gpu.Buffer<T>?, activation: Activation)
```

#### Properties

<a id="Epilogue.scale"></a>

```vertex
public var scale: T
```

<a id="Epilogue.bias"></a>

```vertex
public var bias: gpu.Buffer<T>?
```

<a id="Epilogue.residual"></a>

```vertex
public var residual: gpu.Buffer<T>?
```

<a id="Epilogue.activation"></a>

```vertex
public var activation: Activation
```

### struct Shape <a id="struct-Shape"></a>

```vertex
public struct Shape
```

Shape is a matrix product's problem: C (m x n) = A (m x k) · B (k x n),
batch of them laid end to end, with A or B read transposed -- stored
k x m, or n x k.

#### Initializers

<a id="Shape.init"></a>

```vertex
public init(m: int, n: int, k: int, batch: int = 1, transposeA: bool = false, transposeB: bool = false)
```

#### Properties

<a id="Shape.m"></a>

```vertex
public var m: int
```

<a id="Shape.n"></a>

```vertex
public var n: int
```

<a id="Shape.k"></a>

```vertex
public var k: int
```

<a id="Shape.batch"></a>

```vertex
public var batch: int
```

<a id="Shape.transposeA"></a>

```vertex
public var transposeA: bool
```

<a id="Shape.transposeB"></a>

```vertex
public var transposeB: bool
```

## Files

- matmul.vs
