# package gguf

```vertex
import "model/gguf"
```

Package gguf reads GGUF, the self-contained weight format of llama.cpp:
metadata (architecture, hyperparameters, the tokenizer, the chat
template) and tensors, quantized or not, in one file. The file is
mapped, not read: a tensor's bytes are used where they lie.

The rules are llama.cpp's (ggml/src/gguf.cpp), so a file it refuses
this refuses. One more is refused here: a tensor that runs past the end
of the file, which llama.cpp's header reader lets through and its loader
finds later. A mapped tensor is read in place, so that is checked first.

## Index

- [`func Encode(metadata: [(string, Value)], tensors: [Tensor]) throws -> [uint8]`](#func-Encode)
- [`func Header(metadata: [(string, Value)], tensors: [Layout]) throws -> [uint8]`](#func-Header)
- [`func Open(_ path: fs.Path) throws -> File`](#func-Open)
- [`func Save(metadata: [(string, Value)], tensors: [Tensor], to path: fs.Path) throws`](#func-Save)
- [`func Save(metadata: [(string, Value)], tensors: [Layout], to path: fs.Path, bytes: (int) throws -> [uint8]) throws`](#func-Save-2)
- [`final class File`](#class-File)
  - [`let Version: int`](#File.Version)
  - [`let Keys: [string]`](#File.Keys)
  - [`let Tensors: [TensorInfo]`](#File.Tensors)
  - [`let Alignment: int`](#File.Alignment)
  - [`let DataOffset: int`](#File.DataOffset)
  - [`var Architecture: string? { get }`](#File.Architecture)
  - [`var Mapping: mmap.Mapping { get }`](#File.Mapping)
  - [`func Value(_ key: string) -> Value?`](#File.Value)
  - [`func Text(_ key: string) -> string?`](#File.Text)
  - [`func Integer(_ key: string) -> int?`](#File.Integer)
  - [`func Number(_ key: string) -> float64?`](#File.Number)
  - [`func Flag(_ key: string) -> bool?`](#File.Flag)
  - [`func Texts(_ key: string) -> [string]?`](#File.Texts)
  - [`func Integers(_ key: string) -> [int]?`](#File.Integers)
  - [`func Numbers(_ key: string) -> [float64]?`](#File.Numbers)
  - [`func Tensor(_ name: string) -> TensorInfo?`](#File.Tensor)
  - [`func Bytes(_ t: TensorInfo) -> UnsafePointer<uint8>`](#File.Bytes)
  - [`func Copy(_ t: TensorInfo) -> [uint8]`](#File.Copy)
- [`enum FormatError: Error`](#enum-FormatError)
  - [`var Message: string { get }`](#FormatError.Message)
- [`struct Layout`](#struct-Layout)
  - [`init(name: string, type: TensorType, shape: [int])`](#Layout.init)
  - [`var Name: string`](#Layout.Name)
  - [`var Type: TensorType`](#Layout.Type)
  - [`var Shape: [int]`](#Layout.Shape)
  - [`var Size: int { get }`](#Layout.Size)
- [`struct Tensor`](#struct-Tensor)
  - [`init(name: string, type: TensorType, shape: [int], bytes: [uint8])`](#Tensor.init)
  - [`var Name: string`](#Tensor.Name)
  - [`var Type: TensorType`](#Tensor.Type)
  - [`var Shape: [int]`](#Tensor.Shape)
  - [`var Bytes: [uint8]`](#Tensor.Bytes)
- [`struct TensorInfo`](#struct-TensorInfo)
  - [`let Name: string`](#TensorInfo.Name)
  - [`let Shape: [int]`](#TensorInfo.Shape)
  - [`let Type: TensorType`](#TensorInfo.Type)
  - [`let Offset: int`](#TensorInfo.Offset)
  - [`let Size: int`](#TensorInfo.Size)
  - [`var Count: int { get }`](#TensorInfo.Count)
- [`enum TensorType: uint32`](#enum-TensorType)
  - [`var Name: string { get }`](#TensorType.Name)
  - [`var BlockSize: int { get }`](#TensorType.BlockSize)
  - [`var TypeSize: int { get }`](#TensorType.TypeSize)
  - [`var IsQuantized: bool { get }`](#TensorType.IsQuantized)
  - [`func RowSize(_ n: int) -> int`](#TensorType.RowSize)
- [`enum Value`](#enum-Value)
  - [`var Type: ValueType { get }`](#Value.Type)
  - [`var AsInteger: int? { get }`](#Value.AsInteger)
  - [`var AsNumber: float64? { get }`](#Value.AsNumber)
  - [`var AsText: string? { get }`](#Value.AsText)
  - [`var AsFlag: bool? { get }`](#Value.AsFlag)
- [`enum ValueType: uint32`](#enum-ValueType)

## Functions

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(metadata: [(string, Value)], tensors: [Tensor]) throws -> [uint8]
```

Encode is a GGUF v3 file of metadata and tensors, in memory.

### func Header <a id="func-Header"></a>

```vertex
public func Header(metadata: [(string, Value)], tensors: [Layout]) throws -> [uint8]
```

Header is a GGUF v3 file's header -- metadata (in order), then each
tensor's name, shape, type and offset -- padded to where the data
begins. The tensors' data follows, each padded to 32 bytes.

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ path: fs.Path) throws -> File
```

Open maps the GGUF file at path and reads its header. Tensor bytes are
not read until they are used.

### func Save <a id="func-Save"></a>

```vertex
public func Save(metadata: [(string, Value)], tensors: [Tensor], to path: fs.Path) throws
```

Save writes a GGUF file.

### func Save <a id="func-Save-2"></a>

```vertex
public func Save(metadata: [(string, Value)], tensors: [Layout], to path: fs.Path, bytes: (int) throws -> [uint8]) throws
```

Save writes a GGUF file a tensor at a time: bytes(i) is tensor i's data,
asked for as it is written, so a model larger than memory converts.

## Types

### class File <a id="class-File"></a>

```vertex
public final class File
```

File is an open GGUF file: its metadata, its tensors, and the mapping
their bytes are read from, held as long as the File is.

#### Properties

<a id="File.Version"></a>

```vertex
public let Version: int
```

<a id="File.Keys"></a>

```vertex
public let Keys: [string]
```

Keys are the metadata keys, in the order the file has them.

<a id="File.Tensors"></a>

```vertex
public let Tensors: [TensorInfo]
```

Tensors are the file's tensors, in the order it has them.

<a id="File.Alignment"></a>

```vertex
public let Alignment: int
```

Alignment is what every tensor's offset is a multiple of.

<a id="File.DataOffset"></a>

```vertex
public let DataOffset: int
```

DataOffset is where the tensor data begins.

<a id="File.Architecture"></a>

```vertex
public var Architecture: string? { get }
```

Architecture is general.architecture: "llama", "qwen3", "gemma3".

<a id="File.Mapping"></a>

```vertex
public var Mapping: mmap.Mapping { get }
```

Mapping is the file's bytes in memory, which tensors are read from
in place: a device can take all of it as one buffer (gpu.Device.Wrap).

#### Methods

<a id="File.Value"></a>

```vertex
public func Value(_ key: string) -> Value?
```

Value is the metadata value under key, or nil.

<a id="File.Text"></a>

```vertex
public func Text(_ key: string) -> string?
```

Text is the string under key, or nil where there is none.

<a id="File.Integer"></a>

```vertex
public func Integer(_ key: string) -> int?
```

Integer is the integer under key, of any width, or nil.

<a id="File.Number"></a>

```vertex
public func Number(_ key: string) -> float64?
```

Number is the number under key, float or integer, or nil.

<a id="File.Flag"></a>

```vertex
public func Flag(_ key: string) -> bool?
```

Flag is the bool under key, or nil.

<a id="File.Texts"></a>

```vertex
public func Texts(_ key: string) -> [string]?
```

Texts is the array of strings under key, or nil.

<a id="File.Integers"></a>

```vertex
public func Integers(_ key: string) -> [int]?
```

Integers is the array of integers under key, or nil.

<a id="File.Numbers"></a>

```vertex
public func Numbers(_ key: string) -> [float64]?
```

Numbers is the array of numbers under key, or nil.

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
public enum FormatError: Error
```

FormatError is a file that is not well-formed GGUF, and says where.

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

### struct Layout <a id="struct-Layout"></a>

```vertex
public struct Layout
```

Layout is a tensor as the header describes it: its bytes come later.

#### Initializers

<a id="Layout.init"></a>

```vertex
public init(name: string, type: TensorType, shape: [int])
```

#### Properties

<a id="Layout.Name"></a>

```vertex
public var Name: string
```

<a id="Layout.Type"></a>

```vertex
public var Type: TensorType
```

<a id="Layout.Shape"></a>

```vertex
public var Shape: [int]
```

<a id="Layout.Size"></a>

```vertex
public var Size: int { get }
```

Size is how many bytes its data takes.

### struct Tensor <a id="struct-Tensor"></a>

```vertex
public struct Tensor
```

Tensor is a tensor to write: its name, type, shape in ggml's order
(innermost first) and its bytes, laid out as the type lays them.

#### Initializers

<a id="Tensor.init"></a>

```vertex
public init(name: string, type: TensorType, shape: [int], bytes: [uint8])
```

#### Properties

<a id="Tensor.Name"></a>

```vertex
public var Name: string
```

<a id="Tensor.Type"></a>

```vertex
public var Type: TensorType
```

<a id="Tensor.Shape"></a>

```vertex
public var Shape: [int]
```

<a id="Tensor.Bytes"></a>

```vertex
public var Bytes: [uint8]
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

Name is the tensor's name in the file: "blk.0.attn_q.weight".

<a id="TensorInfo.Shape"></a>

```vertex
public let Shape: [int]
```

Shape is ggml's order, innermost first: Shape[0] is the length of a
row, the elements that lie next to each other.

<a id="TensorInfo.Type"></a>

```vertex
public let Type: TensorType
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

### enum TensorType <a id="enum-TensorType"></a>

```vertex
public enum TensorType: uint32
```

TensorType is how a tensor's elements are stored: a plain scalar, or a
quantized block of BlockSize elements in TypeSize bytes.

#### Cases

<a id="TensorType.F32"></a>

```vertex
case F32 = 0
```

<a id="TensorType.F16"></a>

```vertex
case F16 = 1
```

<a id="TensorType.Q4_0"></a>

```vertex
case Q4_0 = 2
```

<a id="TensorType.Q4_1"></a>

```vertex
case Q4_1 = 3
```

<a id="TensorType.Q5_0"></a>

```vertex
case Q5_0 = 6
```

<a id="TensorType.Q5_1"></a>

```vertex
case Q5_1 = 7
```

<a id="TensorType.Q8_0"></a>

```vertex
case Q8_0 = 8
```

<a id="TensorType.Q8_1"></a>

```vertex
case Q8_1 = 9
```

<a id="TensorType.Q2_K"></a>

```vertex
case Q2_K = 10
```

<a id="TensorType.Q3_K"></a>

```vertex
case Q3_K = 11
```

<a id="TensorType.Q4_K"></a>

```vertex
case Q4_K = 12
```

<a id="TensorType.Q5_K"></a>

```vertex
case Q5_K = 13
```

<a id="TensorType.Q6_K"></a>

```vertex
case Q6_K = 14
```

<a id="TensorType.Q8_K"></a>

```vertex
case Q8_K = 15
```

<a id="TensorType.IQ2_XXS"></a>

```vertex
case IQ2_XXS = 16
```

<a id="TensorType.IQ2_XS"></a>

```vertex
case IQ2_XS = 17
```

<a id="TensorType.IQ3_XXS"></a>

```vertex
case IQ3_XXS = 18
```

<a id="TensorType.IQ1_S"></a>

```vertex
case IQ1_S = 19
```

<a id="TensorType.IQ4_NL"></a>

```vertex
case IQ4_NL = 20
```

<a id="TensorType.IQ3_S"></a>

```vertex
case IQ3_S = 21
```

<a id="TensorType.IQ2_S"></a>

```vertex
case IQ2_S = 22
```

<a id="TensorType.IQ4_XS"></a>

```vertex
case IQ4_XS = 23
```

<a id="TensorType.I8"></a>

```vertex
case I8 = 24
```

<a id="TensorType.I16"></a>

```vertex
case I16 = 25
```

<a id="TensorType.I32"></a>

```vertex
case I32 = 26
```

<a id="TensorType.I64"></a>

```vertex
case I64 = 27
```

<a id="TensorType.F64"></a>

```vertex
case F64 = 28
```

<a id="TensorType.IQ1_M"></a>

```vertex
case IQ1_M = 29
```

<a id="TensorType.BF16"></a>

```vertex
case BF16 = 30
```

<a id="TensorType.TQ1_0"></a>

```vertex
case TQ1_0 = 34
```

<a id="TensorType.TQ2_0"></a>

```vertex
case TQ2_0 = 35
```

<a id="TensorType.MXFP4"></a>

```vertex
case MXFP4 = 39
```

<a id="TensorType.NVFP4"></a>

```vertex
case NVFP4 = 40
```

<a id="TensorType.Q1_0"></a>

```vertex
case Q1_0 = 41
```

<a id="TensorType.Q2_0"></a>

```vertex
case Q2_0 = 42
```

#### Properties

<a id="TensorType.Name"></a>

```vertex
public var Name: string { get }
```

Name is ggml's name for the type: "f32", "q4_0", "q4_K".

<a id="TensorType.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

BlockSize is how many elements one block holds: 1 for a scalar.

<a id="TensorType.TypeSize"></a>

```vertex
public var TypeSize: int { get }
```

TypeSize is how many bytes one block takes.

<a id="TensorType.IsQuantized"></a>

```vertex
public var IsQuantized: bool { get }
```

IsQuantized is whether elements are stored in blocks with a scale.

#### Methods

<a id="TensorType.RowSize"></a>

```vertex
public func RowSize(_ n: int) -> int
```

RowSize is the bytes a row of n elements takes; n is a multiple of
BlockSize.

### enum Value <a id="enum-Value"></a>

```vertex
public enum Value
```

Value is one metadata value: a scalar, a string, or an array of either.
Arrays do not nest, as llama.cpp's reader requires.

#### Cases

<a id="Value.U8"></a>

```vertex
case U8(uint8)
```

<a id="Value.I8"></a>

```vertex
case I8(int8)
```

<a id="Value.U16"></a>

```vertex
case U16(uint16)
```

<a id="Value.I16"></a>

```vertex
case I16(int16)
```

<a id="Value.U32"></a>

```vertex
case U32(uint32)
```

<a id="Value.I32"></a>

```vertex
case I32(int32)
```

<a id="Value.F32"></a>

```vertex
case F32(float32)
```

<a id="Value.Bool"></a>

```vertex
case Bool(bool)
```

<a id="Value.Text"></a>

```vertex
case Text(string)
```

<a id="Value.U64"></a>

```vertex
case U64(uint64)
```

<a id="Value.I64"></a>

```vertex
case I64(int64)
```

<a id="Value.F64"></a>

```vertex
case F64(float64)
```

<a id="Value.Array"></a>

```vertex
case Array(ValueType, [Value])
```

#### Properties

<a id="Value.Type"></a>

```vertex
public var Type: ValueType { get }
```

Type is the value's GGUF type.

<a id="Value.AsInteger"></a>

```vertex
public var AsInteger: int? { get }
```

AsInteger is an integer value of any width, or nil for anything
else (a u64 above int's range too).

<a id="Value.AsNumber"></a>

```vertex
public var AsNumber: float64? { get }
```

AsNumber is a float value, or an integer's, as a float64.

<a id="Value.AsText"></a>

```vertex
public var AsText: string? { get }
```

AsText is a string value, or nil.

<a id="Value.AsFlag"></a>

```vertex
public var AsFlag: bool? { get }
```

AsFlag is a bool value, or nil.

### enum ValueType <a id="enum-ValueType"></a>

```vertex
public enum ValueType: uint32
```

ValueType is the type of a metadata value, by GGUF's numbers.

#### Cases

<a id="ValueType.U8"></a>

```vertex
case U8 = 0
```

<a id="ValueType.I8"></a>

```vertex
case I8 = 1
```

<a id="ValueType.U16"></a>

```vertex
case U16 = 2
```

<a id="ValueType.I16"></a>

```vertex
case I16 = 3
```

<a id="ValueType.U32"></a>

```vertex
case U32 = 4
```

<a id="ValueType.I32"></a>

```vertex
case I32 = 5
```

<a id="ValueType.F32"></a>

```vertex
case F32 = 6
```

<a id="ValueType.Bool"></a>

```vertex
case Bool = 7
```

<a id="ValueType.Text"></a>

```vertex
case Text = 8
```

<a id="ValueType.Array"></a>

```vertex
case Array = 9
```

<a id="ValueType.U64"></a>

```vertex
case U64 = 10
```

<a id="ValueType.I64"></a>

```vertex
case I64 = 11
```

<a id="ValueType.F64"></a>

```vertex
case F64 = 12
```

## Files

- file.vs
- reader.vs
- types.vs
- value.vs
- writer.vs
