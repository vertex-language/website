# package kokoro

```vertex
import "tts/kokoro"
```

Package kokoro is Kokoro-82M (hexgrad/Kokoro-82M): StyleTTS 2's
inference path with an iSTFTNet vocoder. Phoneme ids and a voice's
256-float style vector in, 24 kHz audio out. The modules are the
reference implementation's (the kokoro package, 0.9.4), each loading
its weights from the checkpoint under the names that implementation
gives them, and each checked against it stage by stage
(cmd/test-kokoro).

Activations are float32 device buffers: [channels, length] for the
convolutional modules, [length, features] for ALBERT, the LSTMs and
Dense layers, as the reference transposes between them.

## Index

- [Constants](#constants)
- [`func Alignment(_ durations: [int]) -> [int32]`](#func-Alignment)
- [`final class Albert`](#class-Albert)
  - [`let Hidden: int`](#Albert.Hidden)
  - [`let Heads: int`](#Albert.Heads)
  - [`let Layers: int`](#Albert.Layers)
  - [`func Forward(_ ids: [int]) async throws -> gpu.Buffer<float32>`](#Albert.Forward)
- [`final class Decoder`](#class-Decoder)
  - [`let Generator: Generator`](#Decoder.Generator)
  - [`func Features(asr: gpu.Buffer<float32>, f0: gpu.Buffer<float32>, n: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int) async throws -> [gpu.Buffer<float32>]`](#Decoder.Features)
- [`final class Generator`](#class-Generator)
  - [`var Scale: int { get }`](#Generator.Scale)
  - [`func Source(_ f0: gpu.Buffer<float32>, frames: int, key: random.Key?) async throws -> gpu.Buffer<float32>`](#Generator.Source)
  - [`func Harmonics(_ source: gpu.Buffer<float32>) async throws -> (gpu.Buffer<float32>, int)`](#Generator.Harmonics)
  - [`func Stage(_ i: int, _ input: gpu.Buffer<float32>, length: int, har: gpu.Buffer<float32>, harFrames: int, style s: gpu.Buffer<float32>) async throws -> (gpu.Buffer<float32>, int)`](#Generator.Stage)
  - [`func Post(_ x: gpu.Buffer<float32>, length: int) async throws -> gpu.Buffer<float32>`](#Generator.Post)
  - [`func Samples(_ post: gpu.Buffer<float32>, frames: int) async throws -> gpu.Buffer<float32>`](#Generator.Samples)
  - [`func Forward(_ x: gpu.Buffer<float32>, f0: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int, key: random.Key?) async throws -> gpu.Buffer<float32>`](#Generator.Forward)
- [`enum LoadError: Error, CustomStringConvertible`](#enum-LoadError)
  - [`var description: string { get }`](#LoadError.description)
- [`final class Model`](#class-Model)
  - [`let Vocab: [string: int]`](#Model.Vocab)
  - [`let Context: int`](#Model.Context)
  - [`let Albert: Albert`](#Model.Albert)
  - [`let BertEncoder: nn.Dense`](#Model.BertEncoder)
  - [`let Predictor: Predictor`](#Model.Predictor)
  - [`let TextEncoder: TextEncoder`](#Model.TextEncoder)
  - [`let Decoder: Decoder`](#Model.Decoder)
  - [`let Device: gpu.Device`](#Model.Device)
  - [`static func Load(_ ck: model.Checkpoint, on d: gpu.Device) async throws -> Model`](#Model.Load)
  - [`func Tokens(_ phonemes: string) -> [int]`](#Model.Tokens)
  - [`func Synthesize(tokens ids: [int], style: [float32], speed: float32 = 1, seed: uint64? = nil) async throws -> Speech`](#Model.Synthesize)
- [`final class Predictor`](#class-Predictor)
  - [`func Encode(_ dEn: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, tokens: int) async throws -> gpu.Buffer<float32>`](#Predictor.Encode)
  - [`func DurationLogits(_ d: gpu.Buffer<float32>, tokens: int) async throws -> gpu.Buffer<float32>`](#Predictor.DurationLogits)
  - [`func Durations(_ logits: gpu.Buffer<float32>, tokens: int, speed: float32) async throws -> [int]`](#Predictor.Durations)
  - [`func Prosody(_ en: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int) async throws -> (gpu.Buffer<float32>, gpu.Buffer<float32>)`](#Predictor.Prosody)
- [`struct Speech`](#struct-Speech)
  - [`let Samples: [float32]`](#Speech.Samples)
  - [`let Durations: [int]`](#Speech.Durations)
- [`final class TextEncoder`](#class-TextEncoder)
  - [`func Forward(_ ids: [int]) async throws -> gpu.Buffer<float32>`](#TextEncoder.Forward)
- [`struct Voice`](#struct-Voice)
  - [`let Styles: [float32]`](#Voice.Styles)
  - [`let Count: int`](#Voice.Count)
  - [`static func Open(_ path: fs.Path) throws -> Voice`](#Voice.Open)
  - [`func Style(phonemes: int) -> [float32]`](#Voice.Style)

## Constants

<a id="let-Rate"></a>

```vertex
public let Rate = 24000
```

Rate is the sample rate Kokoro speaks at.

## Functions

### func Alignment <a id="func-Alignment"></a>

```vertex
public func Alignment(_ durations: [int]) -> [int32]
```

Alignment is the frame-to-token index durations make: token t
repeated durations[t] times, torch.repeat_interleave's.

## Types

### class Albert <a id="class-Albert"></a>

```vertex
public final class Albert
```

Albert is the phoneme-level BERT: ids in, a 768-float feature a
token out, [tokens, 768].

#### Properties

<a id="Albert.Hidden"></a>

```vertex
public let Hidden: int
```

<a id="Albert.Heads"></a>

```vertex
public let Heads: int
```

<a id="Albert.Layers"></a>

```vertex
public let Layers: int
```

#### Methods

<a id="Albert.Forward"></a>

```vertex
public func Forward(_ ids: [int]) async throws -> gpu.Buffer<float32>
```

Forward is the last hidden state for ids, every token attending to
every other: [ids.count, Hidden].

### class Decoder <a id="class-Decoder"></a>

```vertex
public final class Decoder
```

Decoder is StyleTTS 2's iSTFTNet decoder.

#### Properties

<a id="Decoder.Generator"></a>

```vertex
public let Generator: Generator
```

#### Methods

<a id="Decoder.Features"></a>

```vertex
public func Features(asr: gpu.Buffer<float32>, f0: gpu.Buffer<float32>, n: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int) async throws -> [gpu.Buffer<float32>]
```

Features is the decoder before its generator: asr [channels,
frames] and the F0 and N curves (2 · frames) to [channels, 2 ·
frames]. It also returns the F0 and N convolutions, which are
what cmd/test-kokoro checks first.

### class Generator <a id="class-Generator"></a>

```vertex
public final class Generator
```

Generator is iSTFTNet's generator (Kokoro's `decoder.generator`).

#### Properties

<a id="Generator.Scale"></a>

```vertex
public var Scale: int { get }
```

Scale is how many samples a frame of the F0 curve makes.

#### Methods

<a id="Generator.Source"></a>

```vertex
public func Source(_ f0: gpu.Buffer<float32>, frames: int, key: random.Key?) async throws -> gpu.Buffer<float32>
```

Source is the harmonic source SineGen and SourceModuleHnNSF make
of the F0 curve (length frames): the curve upsampled to samples,
its fundamental and eight overtones as sines, voiced where F0
exceeds 10 Hz, merged by a Dense and tanh. With a key, the
overtones start at random phases and noise is added, as the
reference's torch.rand and randn_like do; without one, neither.

<a id="Generator.Harmonics"></a>

```vertex
public func Harmonics(_ source: gpu.Buffer<float32>) async throws -> (gpu.Buffer<float32>, int)
```

Harmonics is the source's STFT: magnitudes then phases, [n_fft + 2,
frames].

<a id="Generator.Stage"></a>

```vertex
public func Stage(_ i: int, _ input: gpu.Buffer<float32>, length: int, har: gpu.Buffer<float32>, harFrames: int, style s: gpu.Buffer<float32>) async throws -> (gpu.Buffer<float32>, int)
```

Stage is upsampling stage i: x [channels, length] and the
harmonics [n_fft + 2, harFrames] to [channels / 2, its new length].

<a id="Generator.Post"></a>

```vertex
public func Post(_ x: gpu.Buffer<float32>, length: int) async throws -> gpu.Buffer<float32>
```

Post is LeakyReLU(0.01) and conv_post: [n_fft + 2, length].

<a id="Generator.Samples"></a>

```vertex
public func Samples(_ post: gpu.Buffer<float32>, frames: int) async throws -> gpu.Buffer<float32>
```

Samples is the inverse STFT of conv_post's output: e^x as the
magnitudes, sin(x) as the phases.

<a id="Generator.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, f0: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int, key: random.Key?) async throws -> gpu.Buffer<float32>
```

Forward is the generator over x [channels, frames] and the F0
curve (frames): the samples.

### enum LoadError <a id="enum-LoadError"></a>

```vertex
public enum LoadError: Error, CustomStringConvertible
```

LoadError is a checkpoint or input Kokoro cannot take.

#### Cases

<a id="LoadError.notKokoro"></a>

```vertex
case notKokoro(string)
```

<a id="LoadError.tooLong"></a>

```vertex
case tooLong(string)
```

#### Properties

<a id="LoadError.description"></a>

```vertex
public var description: string { get }
```

### class Model <a id="class-Model"></a>

```vertex
public final class Model
```

Model is Kokoro-82M loaded.

#### Properties

<a id="Model.Vocab"></a>

```vertex
public let Vocab: [string: int]
```

Vocab maps each phoneme (a character) to its id.

<a id="Model.Context"></a>

```vertex
public let Context: int
```

Context is how many tokens ALBERT takes, the two pads included.

<a id="Model.Albert"></a>

```vertex
public let Albert: Albert
```

<a id="Model.BertEncoder"></a>

```vertex
public let BertEncoder: nn.Dense
```

<a id="Model.Predictor"></a>

```vertex
public let Predictor: Predictor
```

<a id="Model.TextEncoder"></a>

```vertex
public let TextEncoder: TextEncoder
```

<a id="Model.Decoder"></a>

```vertex
public let Decoder: Decoder
```

<a id="Model.Device"></a>

```vertex
public let Device: gpu.Device
```

#### Methods

<a id="Model.Load"></a>

```vertex
public static func Load(_ ck: model.Checkpoint, on d: gpu.Device) async throws -> Model
```

Load reads Kokoro from a checkpoint -- the hexgrad/Kokoro-82M
snapshot's config.json and kokoro-v1_0.pth, as model.Open opens
them -- onto d.

<a id="Model.Tokens"></a>

```vertex
public func Tokens(_ phonemes: string) -> [int]
```

Tokens is the ids of phonemes between the pads ALBERT expects;
characters the vocabulary does not have are left out, as the
reference leaves them.

<a id="Model.Synthesize"></a>

```vertex
public func Synthesize(tokens ids: [int], style: [float32], speed: float32 = 1, seed: uint64? = nil) async throws -> Speech
```

Synthesize speaks tokens (Tokens' ids, pads included) in a voice's
style (256 floats: the decoder's 128, then the predictor's) at a
speed, 1 being the voice's own. With a seed the harmonic source
has the reference's random phases and noise, from gpu/random; with
none it has neither, and the run is exactly repeatable.

### class Predictor <a id="class-Predictor"></a>

```vertex
public final class Predictor
```

Predictor is the prosody predictor: its duration encoder (LSTMs with
adaptive layer norm, the style beside every frame), the duration
LSTM and projection, and the shared LSTM with the F0 and N stacks.

#### Methods

<a id="Predictor.Encode"></a>

```vertex
public func Encode(_ dEn: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, tokens: int) async throws -> gpu.Buffer<float32>
```

Encode is the duration encoder over dEn [hidden, tokens] with the
style s (styleDim): [tokens, hidden + styleDim], each token's
features and then the style.

<a id="Predictor.DurationLogits"></a>

```vertex
public func DurationLogits(_ d: gpu.Buffer<float32>, tokens: int) async throws -> gpu.Buffer<float32>
```

DurationLogits is the duration LSTM and projection over d
[tokens, hidden + styleDim]: [tokens, maxDur].

<a id="Predictor.Durations"></a>

```vertex
public func Durations(_ logits: gpu.Buffer<float32>, tokens: int, speed: float32) async throws -> [int]
```

Durations is how many frames each token lasts, from its logits:
the sigmoids summed, divided by speed, rounded half to even as
torch.round does, and at least one.

<a id="Predictor.Prosody"></a>

```vertex
public func Prosody(_ en: gpu.Buffer<float32>, style s: gpu.Buffer<float32>, frames: int) async throws -> (gpu.Buffer<float32>, gpu.Buffer<float32>)
```

Prosody is the F0 and N curves over en [hidden + styleDim, frames]:
each 2 · frames long.

### struct Speech <a id="struct-Speech"></a>

```vertex
public struct Speech
```

Speech is what Synthesize makes: 24 kHz samples, and how many frames
(of 600 samples) each token lasted.

#### Properties

<a id="Speech.Samples"></a>

```vertex
public let Samples: [float32]
```

<a id="Speech.Durations"></a>

```vertex
public let Durations: [int]
```

### class TextEncoder <a id="class-TextEncoder"></a>

```vertex
public final class TextEncoder
```

TextEncoder is StyleTTS 2's: an embedding, convolutions each with
channel layer norm and LeakyReLU(0.2), and a bidirectional LSTM.

#### Methods

<a id="TextEncoder.Forward"></a>

```vertex
public func Forward(_ ids: [int]) async throws -> gpu.Buffer<float32>
```

Forward is the encoding of ids: [channels, ids.count].

### struct Voice <a id="struct-Voice"></a>

```vertex
public struct Voice
```

Voice is a voice pack (voices/<name>.pt: [510, 1, 256]): one style
vector for each utterance length.

#### Properties

<a id="Voice.Styles"></a>

```vertex
public let Styles: [float32]
```

<a id="Voice.Count"></a>

```vertex
public let Count: int
```

#### Methods

<a id="Voice.Open"></a>

```vertex
public static func Open(_ path: fs.Path) throws -> Voice
```

Open reads a voice pack.

<a id="Voice.Style"></a>

```vertex
public func Style(phonemes: int) -> [float32]
```

Style is the vector for an utterance of so many phonemes (tokens
less the two pads), as KPipeline picks it.

## Files

- albert.vs
- decoder.vs
- kokoro.vs
- predictor.vs
- weights.vs
