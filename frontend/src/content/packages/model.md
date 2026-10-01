# package model

```vertex
import "model"
```

Package model is what every model shares, and no model: a model's files
seen one way whatever their format -- a configuration, tensors by name, a
tokenizer and a chat template. Open reads a Hugging Face snapshot
directory (config.json and safetensors, sharded or not) or a GGUF file,
offline; model/fetch gets a Hub reference's files first.

A checkpoint answers in Hugging Face's vocabulary -- config keys, tensor
names, shapes outermost first -- whatever the format, so a family is
written once for all of them. How a task's names are spelled in a GGUF
is the task's to say (Aliases): llm/arch gives llama.cpp's decoder
tables. Architecture is config.json's architectures (or model_type), or
a GGUF's general.architecture; a family decides whether it claims one.

The formats are its subpackages: model/safetensors, model/gguf.

## Index

- [`func Open(_ path: fs.Path) throws -> Checkpoint`](#func-Open)
- [`struct Aliases`](#struct-Aliases)
  - [`init(configKeys: [string: string] = [:], tensorName: @escaping (string) -> string? = { _ in nil })`](#Aliases.init)
  - [`var ConfigKeys: [string: string]`](#Aliases.ConfigKeys)
  - [`var TensorName: (string) -> string?`](#Aliases.TensorName)
- [`final class Checkpoint`](#class-Checkpoint)
  - [`let Format: Format`](#Checkpoint.Format)
  - [`let Path: fs.Path`](#Checkpoint.Path)
  - [`let Architecture: string`](#Checkpoint.Architecture)
  - [`var Aliases: model.Aliases = model.Aliases()`](#Checkpoint.Aliases)
  - [`var Config: Config { get }`](#Checkpoint.Config)
  - [`var Dir: fs.Path? { get }`](#Checkpoint.Dir)
  - [`var Names: [string] { get }`](#Checkpoint.Names)
  - [`var GGUF: gguf.File? { get }`](#Checkpoint.GGUF)
  - [`var ChatTemplate: string? { get }`](#Checkpoint.ChatTemplate)
  - [`func Info(_ name: string, gguf: string? = nil) -> TensorInfo?`](#Checkpoint.Info)
  - [`func Has(_ name: string, gguf: string? = nil) -> bool`](#Checkpoint.Has)
  - [`func Tensor(_ name: string, gguf: string? = nil, on d: gpu.Device) async throws -> tensor.Tensor`](#Checkpoint.Tensor)
  - [`func Float32(_ name: string, gguf: string? = nil, on d: gpu.Device) async throws -> tensor.Tensor`](#Checkpoint.Float32)
  - [`func Copy(_ t: TensorInfo) -> [uint8]`](#Checkpoint.Copy)
  - [`func Tokenizer() throws -> tokenizer.Tokenizer`](#Checkpoint.Tokenizer)
- [`struct Config`](#struct-Config)
  - [`var Raw: json.Value? { get }`](#Config.Raw)
  - [`func Has(_ key: string, gguf: string? = nil) -> bool`](#Config.Has)
  - [`func Int(_ key: string, gguf: string? = nil) -> int?`](#Config.Int)
  - [`func Double(_ key: string, gguf: string? = nil) -> float64?`](#Config.Double)
  - [`func Bool(_ key: string, gguf: string? = nil) -> bool?`](#Config.Bool)
  - [`func String(_ key: string, gguf: string? = nil) -> string?`](#Config.String)
  - [`func Ints(_ key: string, gguf: string? = nil) -> [int]?`](#Config.Ints)
- [`enum Format: Equatable`](#enum-Format)
  - [`var Name: string { get }`](#Format.Name)
- [`enum OpenError: Error, CustomStringConvertible`](#enum-OpenError)
  - [`var description: string { get }`](#OpenError.description)
- [`struct TensorInfo`](#struct-TensorInfo)
  - [`let Name: string`](#TensorInfo.Name)
  - [`let Shape: [int]`](#TensorInfo.Shape)
  - [`let DType: tensor.DType?`](#TensorInfo.DType)
  - [`let SourceType: string`](#TensorInfo.SourceType)
  - [`let Size: int`](#TensorInfo.Size)

## Functions

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ path: fs.Path) throws -> Checkpoint
```

Open opens a checkpoint: a GGUF file; a safetensors file (with the
config.json beside it); or a directory holding config.json and
safetensors -- one file, shards with model.safetensors.index.json, or
shards without -- or else one GGUF file.

## Types

### struct Aliases <a id="struct-Aliases"></a>

```vertex
public struct Aliases
```

Aliases are a task's spellings of its Hugging Face names in a GGUF
file: config.json keys as GGUF keys (under the architecture unless they
start "general." or "tokenizer."), and tensor names. llama.cpp's
converter renames both, and each task's GGUFs follow their own table.

#### Initializers

<a id="Aliases.init"></a>

```vertex
public init(configKeys: [string: string] = [:], tensorName: @escaping (string) -> string? = { _ in nil })
```

#### Properties

<a id="Aliases.ConfigKeys"></a>

```vertex
public var ConfigKeys: [string: string]
```

<a id="Aliases.TensorName"></a>

```vertex
public var TensorName: (string) -> string?
```

### class Checkpoint <a id="class-Checkpoint"></a>

```vertex
public final class Checkpoint
```

Checkpoint is a model's files, opened.

#### Properties

<a id="Checkpoint.Format"></a>

```vertex
public let Format: Format
```

<a id="Checkpoint.Path"></a>

```vertex
public let Path: fs.Path
```

Path is what was opened: a directory, or a file.

<a id="Checkpoint.Architecture"></a>

```vertex
public let Architecture: string
```

Architecture is the family's name for it: "LlamaForCausalLM", or
a GGUF's "llama".

<a id="Checkpoint.Aliases"></a>

```vertex
public var Aliases: model.Aliases = model.Aliases()
```

Aliases are how the task reading this checkpoint spells its
Hugging Face names in a GGUF; a family sets its task's before it
reads (llm/arch's DecoderAliases). Empty, only names a GGUF has
answer.

<a id="Checkpoint.Config"></a>

```vertex
public var Config: Config { get }
```

Config is the checkpoint's configuration, asked in Hugging Face's
keys, through Aliases for a GGUF.

<a id="Checkpoint.Dir"></a>

```vertex
public var Dir: fs.Path? { get }
```

Dir is the directory the checkpoint's files are in: where a family
finds what else it reads (Kokoro's voices/).

<a id="Checkpoint.Names"></a>

```vertex
public var Names: [string] { get }
```

Names are the tensors' names in their files, in file order.

<a id="Checkpoint.GGUF"></a>

```vertex
public var GGUF: gguf.File? { get }
```

GGUF is the file, for a GGUF checkpoint: its metadata beyond the
config view.

<a id="Checkpoint.ChatTemplate"></a>

```vertex
public var ChatTemplate: string? { get }
```

ChatTemplate is the model's Jinja chat template: a GGUF's
tokenizer.chat_template, or chat_template.jinja, or
tokenizer_config.json's chat_template (the default one, where it
holds several).

#### Methods

<a id="Checkpoint.Info"></a>

```vertex
public func Info(_ name: string, gguf: string? = nil) -> TensorInfo?
```

Info is the tensor a Hugging Face name means -- for a GGUF through
Aliases, or the GGUF name given -- or nil where there is none.

<a id="Checkpoint.Has"></a>

```vertex
public func Has(_ name: string, gguf: string? = nil) -> bool
```

Has is whether the tensor is there.

<a id="Checkpoint.Tensor"></a>

```vertex
public func Tensor(_ name: string, gguf: string? = nil, on d: gpu.Device) async throws -> tensor.Tensor
```

Tensor is the named tensor on device d. Where the device can read
the file's mapping in place (unified memory), the tensor is a slice
of it and nothing is copied; else its bytes are uploaded.

<a id="Checkpoint.Float32"></a>

```vertex
public func Float32(_ name: string, gguf: string? = nil, on d: gpu.Device) async throws -> tensor.Tensor
```

Float32 is the named tensor as float32 on d, decoded if it is not:
what a norm's weight is.

<a id="Checkpoint.Copy"></a>

```vertex
public func Copy(_ t: TensorInfo) -> [uint8]
```

Copy is a tensor's bytes as its file holds them, copied out.

<a id="Checkpoint.Tokenizer"></a>

```vertex
public func Tokenizer() throws -> tokenizer.Tokenizer
```

Tokenizer is the model's tokenizer, from wherever its files keep it:
a GGUF's tokenizer.ggml.* keys (SentencePiece or byte-level BPE);
else a SentencePiece tokenizer.model, with tokenizer_config.json's say
on BOS and EOS; else a byte-level BPE tokenizer.json.

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Config is a checkpoint's configuration, asked for in Hugging Face's
vocabulary (config.json's keys) whatever the format. For a GGUF file a
key is translated through the checkpoint's Aliases (llm/arch's for a
decoder); a family's own keys name their GGUF spelling themselves:

```vertex
c.Int("num_hidden_layers")                       // llama.block_count in a GGUF
c.Double("query_pre_attn_scalar", gguf: "attention.query_pre_attn_scalar")
```

A GGUF key without a "general." or "tokenizer." prefix is under the
architecture's: "block_count" is "llama.block_count".

#### Properties

<a id="Config.Raw"></a>

```vertex
public var Raw: json.Value? { get }
```

Raw is config.json itself, for what only it has (rope_scaling's
object, a quantization_config); nil for a GGUF file.

#### Methods

<a id="Config.Has"></a>

```vertex
public func Has(_ key: string, gguf: string? = nil) -> bool
```

Has is whether the key is set.

<a id="Config.Int"></a>

```vertex
public func Int(_ key: string, gguf: string? = nil) -> int?
```

<a id="Config.Double"></a>

```vertex
public func Double(_ key: string, gguf: string? = nil) -> float64?
```

<a id="Config.Bool"></a>

```vertex
public func Bool(_ key: string, gguf: string? = nil) -> bool?
```

<a id="Config.String"></a>

```vertex
public func String(_ key: string, gguf: string? = nil) -> string?
```

<a id="Config.Ints"></a>

```vertex
public func Ints(_ key: string, gguf: string? = nil) -> [int]?
```

Ints is an integer list: config.json's eos_token_id may be one.

### enum Format <a id="enum-Format"></a>

```vertex
public enum Format: Equatable
```

Format is what a checkpoint's weights are stored as.

#### Cases

<a id="Format.safetensors"></a>

```vertex
case safetensors
```

<a id="Format.gguf"></a>

```vertex
case gguf
```

<a id="Format.torch"></a>

```vertex
case torch
```

A PyTorch checkpoint (.pth, .pt, pytorch_model.bin), read through
model/torch's restricted unpickler.

#### Properties

<a id="Format.Name"></a>

```vertex
public var Name: string { get }
```

### enum OpenError <a id="enum-OpenError"></a>

```vertex
public enum OpenError: Error, CustomStringConvertible
```

OpenError is a checkpoint that could not be opened or read, and why.

#### Cases

<a id="OpenError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="OpenError.description"></a>

```vertex
public var description: string { get }
```

### struct TensorInfo <a id="struct-TensorInfo"></a>

```vertex
public struct TensorInfo
```

TensorInfo is what a checkpoint says of a tensor, before any byte of it
is read: its name in the file, shape (outermost first), dtype, size.

#### Properties

<a id="TensorInfo.Name"></a>

```vertex
public let Name: string
```

Name is the tensor's name in its file: "blk.0.attn_q.weight" in a GGUF.

<a id="TensorInfo.Shape"></a>

```vertex
public let Shape: [int]
```

<a id="TensorInfo.DType"></a>

```vertex
public let DType: tensor.DType?
```

DType is the element type as tensor has it, or nil where tensor has
none for it yet.

<a id="TensorInfo.SourceType"></a>

```vertex
public let SourceType: string
```

SourceType is the file's own name for the dtype: "BF16", "q4_K".

<a id="TensorInfo.Size"></a>

```vertex
public let Size: int
```

## Files

- checkpoint.vs
- config.vs
