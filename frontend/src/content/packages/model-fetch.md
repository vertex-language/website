# package fetch

```vertex
import "model/fetch"
```

Package fetch opens a model by reference: a local file or directory, or
a Hugging Face Hub reference whose files are fetched into the Hugging
Face cache first. It is the only package under model that reaches the
network, so a family, which imports model and never fetch, builds and
runs offline. Task facades (llm.Load, tts.Load) call it.

```vertex
let ck = try await fetch.Open("hf.co/HuggingFaceTB/SmolLM2-135M")
let ck = try await fetch.Open("hf.co/unsloth/Qwen3-0.6B-GGUF:Q4_K_M")
let ck = try await fetch.Open("./stories15M-q4_0.gguf")
```

Choosing a format for a Hub repository is its job: the files are listed
first (hub.Resolve moves no bytes), and only the chosen format's are
downloaded.

## Index

- [`func Choose(_ files: [hub.RepoFile], ref: hub.Ref) throws -> Choice`](#func-Choose)
- [`func Inspect(_ ref: string, keys: [string] = [], aliases: model.Aliases = model.Aliases()) async throws -> Info`](#func-Inspect)
- [`func IsLocal(_ ref: string) -> bool`](#func-IsLocal)
- [`func Open(_ ref: string, hub h: hub.Hub = hub.Hub()) async throws -> model.Checkpoint`](#func-Open)
- [`struct Choice`](#struct-Choice)
  - [`var Format: model.Format`](#Choice.Format)
  - [`var Include: [string]`](#Choice.Include)
- [`enum FetchError: Error, CustomStringConvertible`](#enum-FetchError)
  - [`var description: string { get }`](#FetchError.description)
- [`struct Info`](#struct-Info)
  - [`var Architecture: string`](#Info.Architecture)
  - [`var Format: model.Format`](#Info.Format)
  - [`var Tensors: int`](#Info.Tensors)
  - [`var Bytes: int64`](#Info.Bytes)
  - [`var Config: [(string, string)]`](#Info.Config)

## Functions

### func Choose <a id="func-Choose"></a>

```vertex
public func Choose(_ files: [hub.RepoFile], ref: hub.Ref) throws -> Choice
```

Choose picks a Hub repository's format from its file list: GGUF for a
quant tag or a repository of nothing else; else safetensors, fetching
the top-level config, weights and tokenizer files only -- not a
PyTorch copy, ONNX, or Meta's original/ -- which is all a checkpoint
reads.

### func Inspect <a id="func-Inspect"></a>

```vertex
public func Inspect(_ ref: string, keys: [string] = [], aliases: model.Aliases = model.Aliases()) async throws -> Info
```

Inspect opens a reference -- fetching its files if it is on the Hub --
and says what it is: architecture, format, size and the config keys
asked for, read through aliases (a task's spellings for a GGUF), with
nothing put on a device.

### func IsLocal <a id="func-IsLocal"></a>

```vertex
public func IsLocal(_ ref: string) -> bool
```

IsLocal is whether a reference is a path on this machine rather than a
Hub reference: it starts with "/", "./", "../" or "~", or names
something that exists.

### func Open <a id="func-Open"></a>

```vertex
public func Open(_ ref: string, hub h: hub.Hub = hub.Hub()) async throws -> model.Checkpoint
```

Open is the checkpoint a reference names, its files fetched when it is
a Hub reference.

## Types

### struct Choice <a id="struct-Choice"></a>

```vertex
public struct Choice
```

Choice is the format chosen for a Hub repository and the file patterns
that fetch it.

#### Properties

<a id="Choice.Format"></a>

```vertex
public var Format: model.Format
```

<a id="Choice.Include"></a>

```vertex
public var Include: [string]
```

Include is hub.Hub's Include: empty to let the hub pick (a quant,
a file the reference names).

### enum FetchError <a id="enum-FetchError"></a>

```vertex
public enum FetchError: Error, CustomStringConvertible
```

FetchError is a reference that could not be opened, and why.

#### Cases

<a id="FetchError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="FetchError.description"></a>

```vertex
public var description: string { get }
```

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

## Files

- fetch.vs
