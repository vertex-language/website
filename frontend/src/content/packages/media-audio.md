# package audio

```vertex
import "media/audio"
```

Package audio is sound in memory: a Buffer of float32 samples in
[-1, 1], interleaved by frame, with its rate and channel count. What a
synthesizer produces, a file format stores and a device plays is a
Buffer; converting between rates, channel counts and integer samples
is here, so none of them does it twice.

## Index

- [`func FromPCM16(_ s: [int16], rate: int, channels: int = 1) -> Buffer`](#func-FromPCM16)
- [`func PCM16(_ b: Buffer) -> [int16]`](#func-PCM16)
- [`func Resample(_ b: Buffer, to rate: int, taps: int = 16) -> Buffer`](#func-Resample)
- [`struct Buffer`](#struct-Buffer)
  - [`init(samples: [float32], rate: int, channels: int = 1)`](#Buffer.init)
  - [`init(frames: int, rate: int, channels: int = 1)`](#Buffer.init-2)
  - [`var Samples: [float32]`](#Buffer.Samples)
  - [`let Rate: int`](#Buffer.Rate)
  - [`let Channels: int`](#Buffer.Channels)
  - [`var Frames: int { get }`](#Buffer.Frames)
  - [`var Seconds: float64 { get }`](#Buffer.Seconds)
  - [`var Peak: float32 { get }`](#Buffer.Peak)
  - [`func Channel(_ c: int) -> [float32]`](#Buffer.Channel)
  - [`func Mono() -> Buffer`](#Buffer.Mono)
  - [`func WithChannels(_ n: int) -> Buffer`](#Buffer.WithChannels)
  - [`func Appending(_ b: Buffer) -> Buffer`](#Buffer.Appending)
  - [`func Slice(from: int, to: int) -> Buffer`](#Buffer.Slice)

## Functions

### func FromPCM16 <a id="func-FromPCM16"></a>

```vertex
public func FromPCM16(_ s: [int16], rate: int, channels: int = 1) -> Buffer
```

FromPCM16 is 16-bit integer samples as a buffer, divided by 32768 as
libsndfile reads them.

### func PCM16 <a id="func-PCM16"></a>

```vertex
public func PCM16(_ b: Buffer) -> [int16]
```

PCM16 is the samples as 16-bit integers as libsndfile makes them:
x·2^31 rounded to 32 bits, clamped, and its top 16 bits kept.

### func Resample <a id="func-Resample"></a>

```vertex
public func Resample(_ b: Buffer, to rate: int, taps: int = 16) -> Buffer
```

Resample is the buffer at another rate: band-limited interpolation
with a Hann-windowed sinc, `taps` zero crossings each side, cut off
below the lower rate's Nyquist frequency so that downsampling does
not alias.

## Types

### struct Buffer <a id="struct-Buffer"></a>

```vertex
public struct Buffer
```

Buffer is interleaved float32 samples: frame 0's channels, then frame
1's, and so on. A sample is nominally in [-1, 1].

#### Initializers

<a id="Buffer.init"></a>

```vertex
public init(samples: [float32], rate: int, channels: int = 1)
```

init makes a buffer of samples already interleaved.

<a id="Buffer.init-2"></a>

```vertex
public init(frames: int, rate: int, channels: int = 1)
```

init makes a silent buffer of so many frames.

#### Properties

<a id="Buffer.Samples"></a>

```vertex
public var Samples: [float32]
```

<a id="Buffer.Rate"></a>

```vertex
public let Rate: int
```

<a id="Buffer.Channels"></a>

```vertex
public let Channels: int
```

<a id="Buffer.Frames"></a>

```vertex
public var Frames: int { get }
```

Frames is how many sample instants the buffer holds.

<a id="Buffer.Seconds"></a>

```vertex
public var Seconds: float64 { get }
```

Seconds is the buffer's duration.

<a id="Buffer.Peak"></a>

```vertex
public var Peak: float32 { get }
```

Peak is the largest sample magnitude.

#### Methods

<a id="Buffer.Channel"></a>

```vertex
public func Channel(_ c: int) -> [float32]
```

Channel is one channel's samples.

<a id="Buffer.Mono"></a>

```vertex
public func Mono() -> Buffer
```

Mono averages the channels into one.

<a id="Buffer.WithChannels"></a>

```vertex
public func WithChannels(_ n: int) -> Buffer
```

WithChannels is the buffer as so many channels: mono spread to
each, or anything averaged to mono first.

<a id="Buffer.Appending"></a>

```vertex
public func Appending(_ b: Buffer) -> Buffer
```

Appending is this buffer followed by another of the same rate and
channel count.

<a id="Buffer.Slice"></a>

```vertex
public func Slice(from: int, to: int) -> Buffer
```

Slice is frames [from, to).

## Files

- audio.vs
