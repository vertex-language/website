# package llama

```vertex
import "llm/llama"
```

Package llama is the Llama family: Llama 1 and 2, and the models that
share their architecture (LlamaForCausalLM on the Hugging Face Hub,
general.architecture "llama" in GGUF: TinyLlama, SmolLM2, most
fine-tunes) -- an embedding, blocks of RMSNorm, grouped-query attention
with rotary position embeddings, RMSNorm and a SwiGLU MLP, each added
back to what went in, then a final RMSNorm and the head to logits.

The family is written once, against model.Checkpoint: the same code
loads a Hugging Face snapshot (safetensors) or a GGUF file. The one thing
it must tell apart is the layout of Q and K: llama.cpp permutes their
rows for interleaved RoPE when it writes a llama GGUF, and Hugging
Face's are in halves.

It runs one token at a time, greedily; batching and sampling
(llm/decoder, llm/generate) grow out of it as more families come.

## Index

- [Constants](#constants)
- [`func Argmax(_ xs: [float32]) -> int`](#func-Argmax)
- [`func WriteGGUF(_ ck: model.Checkpoint, to path: fs.Path) throws`](#func-WriteGGUF)
- [`final class Block`](#class-Block)
  - [`let AttnNorm: nn.RMSNorm`](#Block.AttnNorm)
  - [`let Attention: nn.Attention`](#Block.Attention)
  - [`let FFNNorm: nn.RMSNorm`](#Block.FFNNorm)
  - [`let MLP: nn.GatedMLP`](#Block.MLP)
- [`struct Config`](#struct-Config)
  - [`var Layers: int`](#Config.Layers)
  - [`var Dim: int`](#Config.Dim)
  - [`var Hidden: int`](#Config.Hidden)
  - [`var Heads: int`](#Config.Heads)
  - [`var KVHeads: int`](#Config.KVHeads)
  - [`var HeadDim: int`](#Config.HeadDim)
  - [`var Vocab: int`](#Config.Vocab)
  - [`var Context: int`](#Config.Context)
  - [`var Eps: float32`](#Config.Eps)
  - [`var RopeBase: float32`](#Config.RopeBase)
  - [`var TiedEmbeddings: bool`](#Config.TiedEmbeddings)
  - [`static func Read(_ ck: model.Checkpoint) throws -> Config`](#Config.Read)
- [`enum LoadError: Error, CustomStringConvertible`](#enum-LoadError)
  - [`var Message: string { get }`](#LoadError.Message)
  - [`var description: string { get }`](#LoadError.description)
- [`final class Model: arch.Model`](#class-Model)
  - [`let Config: Config`](#Model.Config)
  - [`let Tokenizer: tokenizer.Tokenizer`](#Model.Tokenizer)
  - [`let Device: gpu.Device`](#Model.Device)
  - [`let Embed: nn.Embedding`](#Model.Embed)
  - [`let Blocks: [Block]`](#Model.Blocks)
  - [`let Norm: nn.RMSNorm`](#Model.Norm)
  - [`let Output: nn.Linear`](#Model.Output)
  - [`var Context: int { get }`](#Model.Context)
  - [`static func Load(_ path: fs.Path, on d: gpu.Device) async throws -> Model`](#Model.Load)
  - [`static func Load(_ ck: model.Checkpoint, on d: gpu.Device) async throws -> Model`](#Model.Load-2)
  - [`func Forward(_ token: int, position: int) async throws -> gpu.Buffer<float32>`](#Model.Forward)
  - [`func Generate(_ prompt: string, tokens n: int) async throws -> [int]`](#Model.Generate)

## Constants

<a id="let-Family"></a>

```vertex
public let Family
```

Family is the Llama family, for llm.Register and the facade's list.

<a id="let-Names"></a>

```vertex
public let Names = ["LlamaForCausalLM", "llama"]
```

Names are the architecture names this family loads: Hugging Face's and
GGUF's.

## Functions

### func Argmax <a id="func-Argmax"></a>

```vertex
public func Argmax(_ xs: [float32]) -> int
```

Argmax is the index of the largest value, the first of equals.

### func WriteGGUF <a id="func-WriteGGUF"></a>

```vertex
public func WriteGGUF(_ ck: model.Checkpoint, to path: fs.Path) throws
```

WriteGGUF writes a llama checkpoint as a GGUF file llama.cpp loads:
its config under llama.*, its SentencePiece vocabulary under
tokenizer.ggml.*, and its tensors under GGUF's names, weights in their
own dtype (f32, f16 or bf16) and norms as f32. The rows of Q and K are
permuted for interleaved RoPE, as llama.cpp's converter permutes them.
A GGUF checkpoint is written as it is.

## Types

### class Block <a id="class-Block"></a>

```vertex
public final class Block
```

Block is one transformer layer.

#### Properties

<a id="Block.AttnNorm"></a>

```vertex
public let AttnNorm: nn.RMSNorm
```

<a id="Block.Attention"></a>

```vertex
public let Attention: nn.Attention
```

<a id="Block.FFNNorm"></a>

```vertex
public let FFNNorm: nn.RMSNorm
```

<a id="Block.MLP"></a>

```vertex
public let MLP: nn.GatedMLP
```

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Config is a llama's shape.

#### Properties

<a id="Config.Layers"></a>

```vertex
public var Layers: int
```

<a id="Config.Dim"></a>

```vertex
public var Dim: int
```

<a id="Config.Hidden"></a>

```vertex
public var Hidden: int
```

<a id="Config.Heads"></a>

```vertex
public var Heads: int
```

<a id="Config.KVHeads"></a>

```vertex
public var KVHeads: int
```

<a id="Config.HeadDim"></a>

```vertex
public var HeadDim: int
```

<a id="Config.Vocab"></a>

```vertex
public var Vocab: int
```

<a id="Config.Context"></a>

```vertex
public var Context: int
```

<a id="Config.Eps"></a>

```vertex
public var Eps: float32
```

<a id="Config.RopeBase"></a>

```vertex
public var RopeBase: float32
```

<a id="Config.TiedEmbeddings"></a>

```vertex
public var TiedEmbeddings: bool
```

TiedEmbeddings is whether the head is the embedding.

#### Methods

<a id="Config.Read"></a>

```vertex
public static func Read(_ ck: model.Checkpoint) throws -> Config
```

Read is a checkpoint's llama config, asked in config.json's keys.

### enum LoadError <a id="enum-LoadError"></a>

```vertex
public enum LoadError: Error, CustomStringConvertible
```

LoadError is a checkpoint that is not a llama this can run, and says why.

#### Cases

<a id="LoadError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="LoadError.Message"></a>

```vertex
public var Message: string { get }
```

<a id="LoadError.description"></a>

```vertex
public var description: string { get }
```

### class Model <a id="class-Model"></a>

```vertex
public final class Model: arch.Model
```

Model is a llama on a device, with a KV cache for one sequence.

#### Properties

<a id="Model.Config"></a>

```vertex
public let Config: Config
```

<a id="Model.Tokenizer"></a>

```vertex
public let Tokenizer: tokenizer.Tokenizer
```

<a id="Model.Device"></a>

```vertex
public let Device: gpu.Device
```

<a id="Model.Embed"></a>

```vertex
public let Embed: nn.Embedding
```

<a id="Model.Blocks"></a>

```vertex
public let Blocks: [Block]
```

<a id="Model.Norm"></a>

```vertex
public let Norm: nn.RMSNorm
```

<a id="Model.Output"></a>

```vertex
public let Output: nn.Linear
```

<a id="Model.Context"></a>

```vertex
public var Context: int { get }
```

Context is how many positions the cache holds.

#### Methods

<a id="Model.Load"></a>

```vertex
public static func Load(_ path: fs.Path, on d: gpu.Device) async throws -> Model
```

Load reads the llama at path -- a GGUF file, or a Hugging Face
snapshot directory -- onto device d.

<a id="Model.Load-2"></a>

```vertex
public static func Load(_ ck: model.Checkpoint, on d: gpu.Device) async throws -> Model
```

Load reads a llama checkpoint onto device d. Weights stay in the
file's format -- f32, f16, bf16 or quantized -- and where the device
reads the file's mapping in place, nothing is copied.

<a id="Model.Forward"></a>

```vertex
public func Forward(_ token: int, position: int) async throws -> gpu.Buffer<float32>
```

Forward runs token at position through the model, adding it to the
cache, and is its logits over the vocabulary.

<a id="Model.Generate"></a>

```vertex
public func Generate(_ prompt: string, tokens n: int) async throws -> [int]
```

Generate continues prompt greedily for at most n tokens, stopping at
the end-of-sequence token, and is the tokens it made.

## Files

- gguf.vs
- llama.vs
