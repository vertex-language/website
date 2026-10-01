# package wav

```vertex
import "media/wav"
```

Package wav reads and writes RIFF/WAVE files: the header, a `fmt `
chunk saying how samples are stored, and a `data` chunk holding them,
little-endian. It writes 16, 24 and 32-bit integer PCM and 32-bit
float; it reads those, 8-bit unsigned PCM, 64-bit float, and
WAVE_FORMAT_EXTENSIBLE's spelling of any of them. Chunks it does not
need (LIST, fact, PEAK, cue ...) are skipped.

Integer samples scale as libsndfile's do, so a file round-trips
through it unchanged: read as n / 2^(bits-1); written as libsndfile
writes them, x·2^31 rounded to a 32-bit integer (clamped, so 1.0 is
the largest) and its top bits kept.

## Index

- [`func Decode(_ bytes: [uint8]) throws -> (audio.Buffer, Info)`](#func-Decode)
- [`func Encode(_ b: audio.Buffer, format: Format = .pcm16) -> [uint8]`](#func-Encode)
- [`enum Format: Equatable`](#enum-Format)
  - [`var Bits: int { get }`](#Format.Bits)
  - [`var IsFloat: bool { get }`](#Format.IsFloat)
- [`enum FormatError: Error, CustomStringConvertible`](#enum-FormatError)
  - [`var description: string { get }`](#FormatError.description)
- [`struct Info`](#struct-Info)
  - [`let Format: Format`](#Info.Format)
  - [`let Rate: int`](#Info.Rate)
  - [`let Channels: int`](#Info.Channels)
  - [`let Frames: int`](#Info.Frames)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ bytes: [uint8]) throws -> (audio.Buffer, Info)
```

Decode reads a WAV file's bytes into a buffer, along with how the
file stored them.

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ b: audio.Buffer, format: Format = .pcm16) -> [uint8]
```

Encode is the buffer as a WAV file's bytes. More than two channels,
or samples wider than 16 bits, are written WAVE_FORMAT_EXTENSIBLE, as
the format's rules ask; float adds the `fact` chunk they ask for too.

## Types

### enum Format <a id="enum-Format"></a>

```vertex
public enum Format: Equatable
```

Format is how a file stores its samples.

#### Cases

<a id="Format.pcm8"></a>

```vertex
case pcm8
```

<a id="Format.pcm16"></a>

```vertex
case pcm16
```

unsigned

<a id="Format.pcm24"></a>

```vertex
case pcm24
```

<a id="Format.pcm32"></a>

```vertex
case pcm32
```

<a id="Format.float32"></a>

```vertex
case float32
```

<a id="Format.float64"></a>

```vertex
case float64
```

#### Properties

<a id="Format.Bits"></a>

```vertex
public var Bits: int { get }
```

Bits is a sample's size in the file.

<a id="Format.IsFloat"></a>

```vertex
public var IsFloat: bool { get }
```

### enum FormatError <a id="enum-FormatError"></a>

```vertex
public enum FormatError: Error, CustomStringConvertible
```

FormatError is a file this cannot read, and why.

#### Cases

<a id="FormatError.malformed"></a>

```vertex
case malformed(string)
```

<a id="FormatError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="FormatError.description"></a>

```vertex
public var description: string { get }
```

### struct Info <a id="struct-Info"></a>

```vertex
public struct Info
```

Info is what a file's `fmt ` chunk says.

#### Properties

<a id="Info.Format"></a>

```vertex
public let Format: Format
```

<a id="Info.Rate"></a>

```vertex
public let Rate: int
```

<a id="Info.Channels"></a>

```vertex
public let Channels: int
```

<a id="Info.Frames"></a>

```vertex
public let Frames: int
```

## Files

- wav.vs
