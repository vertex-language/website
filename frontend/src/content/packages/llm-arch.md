# package arch

```vertex
import "llm/arch"
```

Package arch is the contract every text-generation family implements,
standard or third-party: a Family says whether it claims a checkpoint and
loads one onto a device, as a Model the facade (llm) and the generation
loop drive without knowing the family.

Families import this package, never the facade, so the facade can
import the families: database/sql's driver split. It also holds the
decoder conventions a family reads a GGUF through: llama.cpp's config
and tensor-name tables (DecoderAliases).

## Index

- [Constants](#constants)
- [`func GGUFName(_ hf: string) -> string?`](#func-GGUFName)
- [`struct Family`](#struct-Family)
  - [`init(name: string, names: [string], load: @escaping (model.Checkpoint, gpu.Device) async throws -> any Model)`](#Family.init)
  - [`init(name: string, claims: @escaping (model.Checkpoint) -> bool, load: @escaping (model.Checkpoint, gpu.Device) async throws -> any Model)`](#Family.init-2)
  - [`let Name: string`](#Family.Name)
  - [`let Names: [string]`](#Family.Names)
  - [`let Claims: (model.Checkpoint) -> bool`](#Family.Claims)
  - [`let Load: (model.Checkpoint, gpu.Device) async throws -> any Model`](#Family.Load)
- [`protocol Model: AnyObject`](#protocol-Model)
  - [`var Tokenizer: tokenizer.Tokenizer { get }`](#Model.Tokenizer)
  - [`var Device: gpu.Device { get }`](#Model.Device)
  - [`var Context: int { get }`](#Model.Context)
  - [`func Forward(_ token: int, position: int) async throws -> gpu.Buffer<float32>`](#Model.Forward)

## Constants

<a id="let-DecoderAliases"></a>

```vertex
public let DecoderAliases
```

DecoderAliases are llama.cpp's spellings of the names every decoder
shares, for reading a GGUF in Hugging Face's vocabulary: a family sets
them on its checkpoint before it reads (ck.Aliases = DecoderAliases).

## Functions

### func GGUFName <a id="func-GGUFName"></a>

```vertex
public func GGUFName(_ hf: string) -> string?
```

GGUFName is the GGUF name llama.cpp's converter gives a Hugging Face
tensor name, by the table most decoders share (gguf-py's
tensor_mapping.py): "model.layers.3.self_attn.q_proj.weight" is
"blk.3.attn_q.weight". nil for a name outside the table: a family asks
for such a tensor with its GGUF name given.

## Types

### struct Family <a id="struct-Family"></a>

```vertex
public struct Family
```

Family is a model family: its name, whether it claims a checkpoint,
and how it loads one.

#### Initializers

<a id="Family.init"></a>

```vertex
public init(name: string, names: [string], load: @escaping (model.Checkpoint, gpu.Device) async throws -> any Model)
```

A family that claims the checkpoints whose architecture is one of
names.

<a id="Family.init-2"></a>

```vertex
public init(name: string, claims: @escaping (model.Checkpoint) -> bool,
            load: @escaping (model.Checkpoint, gpu.Device) async throws -> any Model)
```

A family that decides by what else a checkpoint holds.

#### Properties

<a id="Family.Name"></a>

```vertex
public let Name: string
```

Name is the family's own: "llama".

<a id="Family.Names"></a>

```vertex
public let Names: [string]
```

Names are the architecture names it claims, where it claims by name
(Hugging Face's "LlamaForCausalLM", GGUF's "llama"): what an error
lists as known.

<a id="Family.Claims"></a>

```vertex
public let Claims: (model.Checkpoint) -> bool
```

<a id="Family.Load"></a>

```vertex
public let Load: (model.Checkpoint, gpu.Device) async throws -> any Model
```

### protocol Model <a id="protocol-Model"></a>

```vertex
public protocol Model: AnyObject
```

Model is a family's model loaded on a device, with its KV cache: what
runs, whatever the family.

#### Properties

<a id="Model.Tokenizer"></a>

```vertex
var Tokenizer: tokenizer.Tokenizer { get }
```

<a id="Model.Device"></a>

```vertex
var Device: gpu.Device { get }
```

<a id="Model.Context"></a>

```vertex
var Context: int { get }
```

Context is how many positions the cache holds.

#### Methods

<a id="Model.Forward"></a>

```vertex
func Forward(_ token: int, position: int) async throws -> gpu.Buffer<float32>
```

Forward runs token at position through the model, adding it to the
cache, and is its logits over the vocabulary, on the device.

## Files

- arch.vs
- names.vs
