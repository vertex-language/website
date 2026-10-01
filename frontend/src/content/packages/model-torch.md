# package torch

```vertex
import "model/torch"
```

Package torch reads PyTorch checkpoints -- the zip files torch.save
writes (.pth, .pt, pytorch_model.bin) -- as tensors by name, the file
mapped and nothing copied.

A checkpoint is data.pkl, a pickle describing the saved object, beside
data/0, data/1, …, each tensor storage's raw bytes, stored uncompressed.
The pickle is read by a restricted unpickler: the opcodes torch.save
emits, and only the globals that rebuild tensors and state dicts
(collections.OrderedDict, torch._utils._rebuild_tensor_v2 and
_rebuild_parameter, and the storage types). Anything else is refused --
the line PyTorch draws with weights_only=True -- so opening a checkpoint
never runs code.

Nested dictionaries flatten to dotted names, as a state dict's are:
{"decoder": {"conv.weight": t}} is "decoder.conv.weight". A file holding
one tensor (torch.save(t)) has one, named "".

## Index

- [`func Open(_ path: fs.Path) throws -> File`](#func-Open)
- [`enum DType: Equatable`](#enum-DType)
  - [`var Name: string { get }`](#DType.Name)
  - [`var Size: int { get }`](#DType.Size)
- [`final class File`](#class-File)
  - [`let Tensors: [TensorInfo]`](#File.Tensors)
  - [`var Mapping: mmap.Mapping { get }`](#File.Mapping)
  - [`func Tensor(_ name: string) -> TensorInfo?`](#File.Tensor)
  - [`func Bytes(_ t: TensorInfo) -> UnsafePointer<uint8>`](#File.Bytes)
  - [`func Copy(_ t: TensorInfo) -> [uint8]`](#File.Copy)
- [`enum FormatError: Error, CustomStringConvertible`](#enum-FormatError)
  - [`var Message: string { get }`](#FormatError.Message)
  - [`var description: string { get }`](#FormatError.description)
- [`struct TensorInfo`](#struct-TensorInfo)
  - [`let Name: string`](#TensorInfo.Name)
  - [`let Shape: [int]`](#TensorInfo.Shape)
  - [`let DType: DType`](#TensorInfo.DType)
  - [`let Offset: int`](#TensorInfo.Offset)
  - [`let Size: int`](#TensorInfo.Size)
  - [`var Count: int { get }`](#TensorInfo.Count)

## Functions

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ path: fs.Path) throws -> File
```

Open maps a PyTorch checkpoint and reads its tensors' names, shapes and
places; no tensor byte is read.

## Types

### enum DType <a id="enum-DType"></a>

```vertex
public enum DType: Equatable
```

DType is a storage's element type.

#### Cases

<a id="DType.F64"></a>

```vertex
case F64
```

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

<a id="DType.I64"></a>

```vertex
case I64
```

<a id="DType.I32"></a>

```vertex
case I32
```

<a id="DType.I16"></a>

```vertex
case I16
```

<a id="DType.I8"></a>

```vertex
case I8
```

<a id="DType.U8"></a>

```vertex
case U8
```

<a id="DType.Bool"></a>

```vertex
case Bool
```

#### Properties

<a id="DType.Name"></a>

```vertex
public var Name: string { get }
```

Name is PyTorch's: "float32".

<a id="DType.Size"></a>

```vertex
public var Size: int { get }
```

Size is an element's bytes.

### class File <a id="class-File"></a>

```vertex
public final class File
```

File is an opened checkpoint.

#### Properties

<a id="File.Tensors"></a>

```vertex
public let Tensors: [TensorInfo]
```

Tensors are the file's tensors, in the order the pickle names them.

<a id="File.Mapping"></a>

```vertex
public var Mapping: mmap.Mapping { get }
```

Mapping is the file's bytes.

#### Methods

<a id="File.Tensor"></a>

```vertex
public func Tensor(_ name: string) -> TensorInfo?
```

Tensor is the named tensor, or nil.

<a id="File.Bytes"></a>

```vertex
public func Bytes(_ t: TensorInfo) -> UnsafePointer<uint8>
```

Bytes is where a tensor's bytes lie in the mapping.

<a id="File.Copy"></a>

```vertex
public func Copy(_ t: TensorInfo) -> [uint8]
```

Copy is a tensor's bytes, copied out.

### enum FormatError <a id="enum-FormatError"></a>

```vertex
public enum FormatError: Error, CustomStringConvertible
```

FormatError is a file that is not a checkpoint this reads, and why.

#### Cases

<a id="FormatError.invalid"></a>

```vertex
case invalid(string)
```

<a id="FormatError.refused"></a>

```vertex
case refused(string)
```

#### Properties

<a id="FormatError.Message"></a>

```vertex
public var Message: string { get }
```

<a id="FormatError.description"></a>

```vertex
public var description: string { get }
```

### struct TensorInfo <a id="struct-TensorInfo"></a>

```vertex
public struct TensorInfo
```

TensorInfo is a tensor in the file: its name, shape (outermost first),
element type, and where its bytes lie in the file.

#### Properties

<a id="TensorInfo.Name"></a>

```vertex
public let Name: string
```

<a id="TensorInfo.Shape"></a>

```vertex
public let Shape: [int]
```

<a id="TensorInfo.DType"></a>

```vertex
public let DType: DType
```

<a id="TensorInfo.Offset"></a>

```vertex
public let Offset: int
```

Offset is the tensor's first byte in the file.

<a id="TensorInfo.Size"></a>

```vertex
public let Size: int
```

Size is the tensor's bytes.

<a id="TensorInfo.Count"></a>

```vertex
public var Count: int { get }
```

Count is the tensor's elements.

## Files

- torch.vs
