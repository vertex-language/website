# package llm

```vertex
import "llm"
```

Package llm is text generation: a language model by reference -- a
local path or a Hugging Face Hub reference -- loaded onto a device by
whichever of its families claims the checkpoint.

```vertex
let m = try await llm.Load("hf.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0")
let m = try await llm.Load("hf.co/unsloth/Qwen3-0.6B-GGUF:Q4_K_M")
let m = try await llm.Load("./stories15M-q4_0.gguf")
```

It is the facade: it imports the standard families and model/fetch.
The families import llm/arch, the contract, and never this package, so a
program that wants one family imports it (llm/llama) and links nothing
else and no network.

## Index

- [`func Families() -> [Family]`](#func-Families)
- [`func FamilyOf(_ ck: model.Checkpoint) -> Family?`](#func-FamilyOf)
- [`func Generate(_ m: any Model, _ prompt: string, tokens n: int) async throws -> [int]`](#func-Generate)
- [`func Inspect(_ ref: string) async throws -> Info`](#func-Inspect)
- [`func Load(_ ref: string, on d: gpu.Device? = nil) async throws -> any Model`](#func-Load)
- [`func Load(_ ck: model.Checkpoint, on d: gpu.Device? = nil) async throws -> any Model`](#func-Load-2)
- [`func Register(_ f: Family)`](#func-Register)
- [`typealias Family = arch.Family`](#typealias-Family)
- [`struct Info`](#struct-Info)
  - [`var Architecture: string`](#Info.Architecture)
  - [`var Family: string?`](#Info.Family)
  - [`var Format: model.Format`](#Info.Format)
  - [`var Tensors: int`](#Info.Tensors)
  - [`var Bytes: int64`](#Info.Bytes)
  - [`var Config: [(string, string)]`](#Info.Config)
- [`enum LoadError: Error, CustomStringConvertible`](#enum-LoadError)
  - [`var description: string { get }`](#LoadError.description)
- [`typealias Model = arch.Model`](#typealias-Model)

## Functions

### func Families <a id="func-Families"></a>

```vertex
public func Families() -> [Family]
```

Families are the families this program can load: registered, then
built in.

### func FamilyOf <a id="func-FamilyOf"></a>

```vertex
public func FamilyOf(_ ck: model.Checkpoint) -> Family?
```

FamilyOf is the first family that claims a checkpoint, or nil.

### func Generate <a id="func-Generate"></a>

```vertex
public func Generate(_ m: any Model, _ prompt: string, tokens n: int) async throws -> [int]
```

Generate continues prompt greedily for at most n tokens, stopping at
the end-of-sequence token, and is the tokens it made. (llm/generate,
with sampling and streaming, replaces this.)

### func Inspect <a id="func-Inspect"></a>

```vertex
public func Inspect(_ ref: string) async throws -> Info
```

Inspect opens a reference -- fetching its files if it is on the Hub --
and says what it is: architecture, family, format, size and shape,
with nothing put on a device.

### func Load <a id="func-Load"></a>

```vertex
public func Load(_ ref: string, on d: gpu.Device? = nil) async throws -> any Model
```

Load reads a model onto device d (the default device when nil): a local
file or directory, or a Hub reference downloaded into the Hugging Face
cache first.

### func Load <a id="func-Load-2"></a>

```vertex
public func Load(_ ck: model.Checkpoint, on d: gpu.Device? = nil) async throws -> any Model
```

Load reads an opened checkpoint onto device d, with the family that
claims it.

### func Register <a id="func-Register"></a>

```vertex
public func Register(_ f: Family)
```

Register adds a family -- a third-party one, or one not built in --
ahead of the built-in ones.

## Types

### typealias Family <a id="typealias-Family"></a>

```vertex
public typealias Family = arch.Family
```

Family is a text-generation family.

### struct Info <a id="struct-Info"></a>

```vertex
public struct Info
```

Info is what a reference is, read without loading it.

#### Properties

<a id="Info.Architecture"></a>

```vertex
public var Architecture: string
```

<a id="Info.Family"></a>

```vertex
public var Family: string?
```

<a id="Info.Format"></a>

```vertex
public var Format: model.Format
```

<a id="Info.Tensors"></a>

```vertex
public var Tensors: int
```

<a id="Info.Bytes"></a>

```vertex
public var Bytes: int64
```

<a id="Info.Config"></a>

```vertex
public var Config: [(string, string)]
```

### enum LoadError <a id="enum-LoadError"></a>

```vertex
public enum LoadError: Error, CustomStringConvertible
```

LoadError is a reference that could not be loaded, and why.

#### Cases

<a id="LoadError.unknownFamily"></a>

```vertex
case unknownFamily(string, [string])
```

<a id="LoadError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="LoadError.description"></a>

```vertex
public var description: string { get }
```

### typealias Model <a id="typealias-Model"></a>

```vertex
public typealias Model = arch.Model
```

Model is a loaded language model, whatever its family.

## Files

- llm.vs
