# package safetensors

```vertex
import "model/safetensors"
```

Package safetensors reads safetensors, the Hugging Face Hub's canonical
weight format: an 8-byte little-endian header length, a JSON header
naming each tensor's dtype, shape and byte range, then the tensors' raw
little-endian bytes. The file is mapped, not read: a tensor's bytes are
used where they lie.

The rules are the Rust safetensors crate's (safetensors/src/tensor.rs),
so a file it refuses this refuses: the header must fit the file, every
tensor's byte range must match its shape and dtype, and the ranges must
tile the data exactly -- no gaps, no overlaps, nothing after.

The package knows nothing about models: names are what the file says,
and sharding (model.safetensors.index.json) is the repository's
convention, which model/checkpoint reads.

## Index

- [`func Encode(_ entries: [Entry], metadata: [string: string] = [:]) throws -> [uint8]`](#func-Encode)
- [`func Open(_ path: fs.Path) throws -> File`](#func-Open)
- [`func Save(_ entries: [Entry], to path: fs.Path, metadata: [string: string] = [:]) throws`](#func-Save)
- [`enum DType: Equatable`](#enum-DType)
  - [`var Name: string { get }`](#DType.Name)
  - [`var Bits: int { get }`](#DType.Bits)
  - [`static func Parse(_ name: string) -> DType?`](#DType.Parse)
- [`struct Entry`](#struct-Entry)
  - [`init(name: string, dtype: DType, shape: [int], bytes: [uint8])`](#Entry.init)
  - [`var Name: string`](#Entry.Name)
  - [`var DType: DType`](#Entry.DType)
  - [`var Shape: [int]`](#Entry.Shape)
  - [`var Bytes: [uint8]`](#Entry.Bytes)
- [`final class File`](#class-File)
  - [`let Tensors: [TensorInfo]`](#File.Tensors)
  - [`let Metadata: [string: string]`](#File.Metadata)
  - [`let DataOffset: int`](#File.DataOffset)
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

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ entries: [Entry], metadata: [string: string] = [:]) throws -> [uint8]
```

Encode is a safetensors file of entries, in their order, and metadata.
The header is padded with spaces to a multiple of 8 bytes, as the Rust
crate pads it, so every tensor's bytes start as aligned as the file.

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ path: fs.Path) throws -> File
```

Open maps the safetensors file at path and reads its header. Tensor
bytes are not read until they are used.

### func Save <a id="func-Save"></a>

```vertex
public func Save(_ entries: [Entry], to path: fs.Path, metadata: [string: string] = [:]) throws
```

Save writes entries to path as a safetensors file.

## Types

### enum DType <a id="enum-DType"></a>

```vertex
public enum DType: Equatable
```

DType is a tensor's element type, as the format names it.

#### Cases

<a id="DType.BOOL"></a>

```vertex
case BOOL
```

<a id="DType.U8"></a>

```vertex
case U8
```

<a id="DType.I8"></a>

```vertex
case I8
```

<a id="DType.F8_E5M2"></a>

```vertex
case F8_E5M2
```

<a id="DType.F8_E4M3"></a>

```vertex
case F8_E4M3
```

<a id="DType.F8_E8M0"></a>

```vertex
case F8_E8M0
```

<a id="DType.I16"></a>

```vertex
case I16
```

<a id="DType.U16"></a>

```vertex
case U16
```

<a id="DType.F16"></a>

```vertex
case F16
```

<a id="DType.BF16"></a>

```vertex
case BF16
```

<a id="DType.I32"></a>

```vertex
case I32
```

<a id="DType.U32"></a>

```vertex
case U32
```

<a id="DType.F32"></a>

```vertex
case F32
```

<a id="DType.F64"></a>

```vertex
case F64
```

<a id="DType.I64"></a>

```vertex
case I64
```

<a id="DType.U64"></a>

```vertex
case U64
```

<a id="DType.F4"></a>

```vertex
case F4
```

Sub-byte floats, packed: 4 and 6 bits an element.

<a id="DType.F6_E2M3"></a>

```vertex
case F6_E2M3
```

<a id="DType.F6_E3M2"></a>

```vertex
case F6_E3M2
```

#### Properties

<a id="DType.Name"></a>

```vertex
public var Name: string { get }
```

Name is the format's spelling: "BF16".

<a id="DType.Bits"></a>

```vertex
public var Bits: int { get }
```

Bits is how many bits an element takes.

#### Methods

<a id="DType.Parse"></a>

```vertex
public static func Parse(_ name: string) -> DType?
```

Parse is the dtype a header names, or nil.

### struct Entry <a id="struct-Entry"></a>

```vertex
public struct Entry
```

Entry is a tensor to write: its name, dtype, shape and bytes.

#### Initializers

<a id="Entry.init"></a>

```vertex
public init(name: string, dtype: DType, shape: [int], bytes: [uint8])
```

#### Properties

<a id="Entry.Name"></a>

```vertex
public var Name: string
```

<a id="Entry.DType"></a>

```vertex
public var DType: DType
```

<a id="Entry.Shape"></a>

```vertex
public var Shape: [int]
```

<a id="Entry.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

### class File <a id="class-File"></a>

```vertex
public final class File
```

File is an open safetensors file: its tensors, its metadata, and the
mapping their bytes are read from, held as long as the File is.

#### Properties

<a id="File.Tensors"></a>

```vertex
public let Tensors: [TensorInfo]
```

Tensors are the file's tensors, in the order of their bytes.

<a id="File.Metadata"></a>

```vertex
public let Metadata: [string: string]
```

Metadata is the header's __metadata__: free-form strings, often
just {"format": "pt"}.

<a id="File.DataOffset"></a>

```vertex
public let DataOffset: int
```

DataOffset is where the tensor data begins: 8 + the header's length.

<a id="File.Mapping"></a>

```vertex
public var Mapping: mmap.Mapping { get }
```

Mapping is the file's bytes in memory, which tensors are read from
in place: a device can take all of it as one buffer (gpu.Device.Wrap).

#### Methods

<a id="File.Tensor"></a>

```vertex
public func Tensor(_ name: string) -> TensorInfo?
```

Tensor is the tensor named name, or nil.

<a id="File.Bytes"></a>

```vertex
public func Bytes(_ t: TensorInfo) -> UnsafePointer<uint8>
```

Bytes is where a tensor's bytes lie, in the mapping: valid as long
as this File is.

<a id="File.Copy"></a>

```vertex
public func Copy(_ t: TensorInfo) -> [uint8]
```

Copy is a tensor's bytes, copied out.

### enum FormatError <a id="enum-FormatError"></a>

```vertex
public enum FormatError: Error, CustomStringConvertible
```

FormatError is a file this refuses, and why.

#### Cases

<a id="FormatError.malformed"></a>

```vertex
case malformed(string)
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

TensorInfo is where a tensor is and what it holds.

#### Properties

<a id="TensorInfo.Name"></a>

```vertex
public let Name: string
```

<a id="TensorInfo.Shape"></a>

```vertex
public let Shape: [int]
```

Shape is outermost first, as PyTorch has it: a Linear's weight is
[out, in], each of its out rows in elements lying together.

<a id="TensorInfo.DType"></a>

```vertex
public let DType: DType
```

<a id="TensorInfo.Offset"></a>

```vertex
public let Offset: int
```

Offset is where the tensor's bytes begin, from the file's start.

<a id="TensorInfo.Size"></a>

```vertex
public let Size: int
```

Size is how many bytes the tensor takes.

<a id="TensorInfo.Count"></a>

```vertex
public var Count: int { get }
```

Count is how many elements the tensor holds.

## Files

- file.vs
