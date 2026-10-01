# package tensor

```vertex
import "tensor"
```

Package tensor is the n-d array: a shape, an element type, and bytes on
a device. Weights are Tensors whatever their format -- float32 or
block-quantized -- and the layers in nn dispatch on DType.

This is the first cut, grown from what running a llama needs: a weight
tensor made from a file's bytes, read as floats or as quantized blocks,
and elementwise addition. Views, strides and the eager op set of
proposed_ai_packages.md §6.1 come as the models ahead need them.

## Index

- [`func Add(_ a: gpu.Buffer<float32>, _ b: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws`](#func-Add)
- [`func ConcatRows(_ parts: [Tensor]) async throws -> Tensor`](#func-ConcatRows)
- [`enum DType`](#enum-DType)
  - [`var Name: string { get }`](#DType.Name)
  - [`var BlockSize: int { get }`](#DType.BlockSize)
  - [`var BlockBytes: int { get }`](#DType.BlockBytes)
  - [`func Bytes(_ n: int) -> int`](#DType.Bytes)
- [`enum ShapeError: Error`](#enum-ShapeError)
  - [`var Message: string { get }`](#ShapeError.Message)
- [`final class Tensor`](#class-Tensor)
  - [`init(shape: [int], dtype: DType, storage: gpu.Buffer<uint8>) throws`](#Tensor.init)
  - [`let Shape: [int]`](#Tensor.Shape)
  - [`let DType: DType`](#Tensor.DType)
  - [`let Storage: gpu.Buffer<uint8>`](#Tensor.Storage)
  - [`var Count: int { get }`](#Tensor.Count)
  - [`var Device: gpu.Device { get }`](#Tensor.Device)
  - [`var RowBytes: int { get }`](#Tensor.RowBytes)
  - [`func Floats() throws -> gpu.Buffer<float32>`](#Tensor.Floats)
  - [`static func FromBytes(_ bytes: UnsafePointer<uint8>, shape: [int], dtype: DType, on d: gpu.Device) async throws -> Tensor`](#Tensor.FromBytes)
  - [`func ToF32() async throws -> Tensor`](#Tensor.ToF32)
  - [`static func Zeros(_ shape: [int], on d: gpu.Device) async throws -> Tensor`](#Tensor.Zeros)

## Functions

### func Add <a id="func-Add"></a>

```vertex
public func Add(_ a: gpu.Buffer<float32>, _ b: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws
```

Add writes a + b into y, element by element; y may be a or b. The
residual connection of every transformer block.

### func ConcatRows <a id="func-ConcatRows"></a>

```vertex
public func ConcatRows(_ parts: [Tensor]) async throws -> Tensor
```

ConcatRows is one tensor of parts' rows, one part after another: the
weights of several projections of the same input fused into one, so
one product makes them all. The parts share their dtype, device and
row length; for a block format rows are whole blocks, so their bytes
just follow each other.

## Types

### enum DType <a id="enum-DType"></a>

```vertex
public enum DType
```

DType is how a tensor's elements are stored: plain, or one of ggml's
block formats, laid out as ggml lays them.

#### Cases

<a id="DType.F32"></a>

```vertex
case F32
```

<a id="DType.F16"></a>

```vertex
case F16
```

<a id="DType.BF16"></a>

```vertex
case BF16
```

<a id="DType.Q4_0"></a>

```vertex
case Q4_0
```

<a id="DType.Q8_0"></a>

```vertex
case Q8_0
```

<a id="DType.Q4_K"></a>

```vertex
case Q4_K
```

<a id="DType.Q6_K"></a>

```vertex
case Q6_K
```

#### Properties

<a id="DType.Name"></a>

```vertex
public var Name: string { get }
```

Name is ggml's name for it: "f32", "q4_0".

<a id="DType.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

BlockSize is how many elements share a block: 1 for a scalar type.

<a id="DType.BlockBytes"></a>

```vertex
public var BlockBytes: int { get }
```

BlockBytes is how many bytes a block takes.

#### Methods

<a id="DType.Bytes"></a>

```vertex
public func Bytes(_ n: int) -> int
```

Bytes is how many bytes n elements take; n is a multiple of
BlockSize.

### enum ShapeError <a id="enum-ShapeError"></a>

```vertex
public enum ShapeError: Error
```

ShapeError is a tensor made or used with a shape that does not fit.

#### Cases

<a id="ShapeError.mismatch"></a>

```vertex
case mismatch(string)
```

#### Properties

<a id="ShapeError.Message"></a>

```vertex
public var Message: string { get }
```

### class Tensor <a id="class-Tensor"></a>

```vertex
public final class Tensor
```

Tensor is an n-d array on a device, row-major: Shape is outermost
first, as PyTorch writes it, so a [out, in] weight is out rows of in
elements. It is a handle; its bytes go with the last reference.

#### Initializers

<a id="Tensor.init"></a>

```vertex
public init(shape: [int], dtype: DType, storage: gpu.Buffer<uint8>) throws
```

#### Properties

<a id="Tensor.Shape"></a>

```vertex
public let Shape: [int]
```

<a id="Tensor.DType"></a>

```vertex
public let DType: DType
```

<a id="Tensor.Storage"></a>

```vertex
public let Storage: gpu.Buffer<uint8>
```

Storage is the tensor's bytes, as the format lays them out.

<a id="Tensor.Count"></a>

```vertex
public var Count: int { get }
```

Count is how many elements the tensor holds.

<a id="Tensor.Device"></a>

```vertex
public var Device: gpu.Device { get }
```

Device is where the tensor's bytes are.

<a id="Tensor.RowBytes"></a>

```vertex
public var RowBytes: int { get }
```

RowBytes is the bytes of one innermost row.

#### Methods

<a id="Tensor.Floats"></a>

```vertex
public func Floats() throws -> gpu.Buffer<float32>
```

Floats is a float32 tensor's elements, the same memory.

<a id="Tensor.FromBytes"></a>

```vertex
public static func FromBytes(_ bytes: UnsafePointer<uint8>, shape: [int], dtype: DType, on d: gpu.Device) async throws -> Tensor
```

FromBytes is a tensor of shape and dtype on device d, its bytes
copied from host memory laid out as the format lays them: a mapped
file's tensor.

<a id="Tensor.ToF32"></a>

```vertex
public func ToF32() async throws -> Tensor
```

ToF32 is the tensor as float32, on its device: itself when it is
float32, else its elements decoded into a new one -- what a norm's
weight in a bfloat16 checkpoint becomes, since norms take float32.

<a id="Tensor.Zeros"></a>

```vertex
public static func Zeros(_ shape: [int], on d: gpu.Device) async throws -> Tensor
```

Zeros is a float32 tensor of shape, every element 0.

## Files

- tensor.vs
