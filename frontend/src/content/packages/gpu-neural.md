# package neural

```vertex
import "gpu/neural"
```

## Index

- [Constants](#constants)
- [`func Activate(_ x: gpu.Buffer<float32>, _ a: Activation, into y: gpu.Buffer<float32>) async throws`](#func-Activate)
- [`@inlinable func Apply(_ a: int32, _ x: float32) -> float32`](#func-Apply)
- [`func Axpby(_ a: float32, _ x: gpu.Buffer<float32>, _ b: float32, _ y: gpu.Buffer<float32>, into out: gpu.Buffer<float32>) async throws`](#func-Axpby)
- [`func ChannelNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>?, bias: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-5) async throws`](#func-ChannelNorm)
- [`func Conv1d(_ x: gpu.Buffer<float32>, weight w: gpu.Buffer<float32>, bias b: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, _ s: Conv1dShape) async throws`](#func-Conv1d)
- [`func Conv1dLength(_ tin: int, kernel k: int, stride: int = 1, padding: int = 0, dilation: int = 1) -> int`](#func-Conv1dLength)
- [`func ConvTranspose1d(_ x: gpu.Buffer<float32>, weight w: gpu.Buffer<float32>, bias b: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, _ s: Conv1dShape) async throws`](#func-ConvTranspose1d)
- [`func ConvTranspose1dLength(_ tin: int, kernel k: int, stride: int = 1, padding: int = 0, outputPadding: int = 0, dilation: int = 1) -> int`](#func-ConvTranspose1dLength)
- [`func CrossEntropy(_ logits: gpu.Buffer<float32>, targets: gpu.Buffer<int32>, rows: int, cols: int) async throws -> gpu.Buffer<float32>`](#func-CrossEntropy)
- [`func CumSum(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws`](#func-CumSum)
- [`func Gated(_ x: gpu.Buffer<float32>, gate: gpu.Buffer<float32>, _ a: Activation, into y: gpu.Buffer<float32>) async throws`](#func-Gated)
- [`func GatherColumns(_ x: gpu.Buffer<float32>, index: gpu.Buffer<int32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws`](#func-GatherColumns)
- [`func HannWindow(_ n: int) -> [float32]`](#func-HannWindow)
- [`func ISTFT(magnitude mag: gpu.Buffer<float32>, phase: gpu.Buffer<float32>, frames: int, n: int, hop: int, into y: gpu.Buffer<float32>) async throws`](#func-ISTFT)
- [`func ISTFTLength(_ frames: int, hop: int) -> int`](#func-ISTFTLength)
- [`func InstanceNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>?, bias: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-5) async throws`](#func-InstanceNorm)
- [`func LSTMCell(gates: gpu.Buffer<float32>, cell c: gpu.Buffer<float32>, into h: gpu.Buffer<float32>, hidden: int, first: bool) async throws`](#func-LSTMCell)
- [`func LayerNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>, bias: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-5) async throws`](#func-LayerNorm)
- [`func LeakyReLU(_ x: gpu.Buffer<float32>, slope: float32, into y: gpu.Buffer<float32>) async throws`](#func-LeakyReLU)
- [`func LogSoftmax(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws`](#func-LogSoftmax)
- [`func LogSumExp(_ x: gpu.Buffer<float32>, rows: int, cols: int) async throws -> gpu.Buffer<float32>`](#func-LogSumExp)
- [`func MergeHeads(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, heads: int, dim: int) async throws`](#func-MergeHeads)
- [`func Modulate(_ x: gpu.Buffer<float32>, gamma: gpu.Buffer<float32>, beta: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, cols: int) async throws`](#func-Modulate)
- [`func Pad(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, left: int, right: int, reflect: bool = false) async throws`](#func-Pad)
- [`func RMSNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-6) async throws`](#func-RMSNorm)
- [`func RoPE(_ x: gpu.Buffer<float32>, position: int, heads: int, dim: int, base: float32 = 10000, layout: RopeLayout = .interleaved) async throws`](#func-RoPE)
- [`func RoPE(_ x: gpu.Buffer<float32>, positions: gpu.Buffer<int32>, heads: int, dim: int, base: float32 = 10000, layout: RopeLayout = .interleaved) async throws`](#func-RoPE-2)
- [`func STFT(_ x: gpu.Buffer<float32>, length: int, n: int, hop: int, magnitude mag: gpu.Buffer<float32>, phase: gpu.Buffer<float32>) async throws`](#func-STFT)
- [`func STFTFrames(_ length: int, hop: int) -> int`](#func-STFTFrames)
- [`func Snake(_ x: gpu.Buffer<float32>, alpha: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, cols: int) async throws`](#func-Snake)
- [`func Softmax(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws`](#func-Softmax)
- [`func SplitHeads(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, heads: int, dim: int) async throws`](#func-SplitHeads)
- [`func Upsample(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, length tin: int, factor: float64, mode: Resize) async throws`](#func-Upsample)
- [`func UpsampleLength(_ tin: int, factor: float64) -> int`](#func-UpsampleLength)
- [`func WeightNorm(g: gpu.Buffer<float32>, v: gpu.Buffer<float32>, into w: gpu.Buffer<float32>, rows: int) async throws`](#func-WeightNorm)
- [`enum Activation`](#enum-Activation)
  - [`var _code: int32 { get }`](#Activation._code)
- [`struct Conv1dShape`](#struct-Conv1dShape)
  - [`init(in cin: int, out cout: int, length: int, kernel: int, stride: int = 1, padding: int = 0, dilation: int = 1, groups: int = 1, outputPadding: int = 0)`](#Conv1dShape.init)
  - [`var In: int`](#Conv1dShape.In)
  - [`var Out: int`](#Conv1dShape.Out)
  - [`var Length: int`](#Conv1dShape.Length)
  - [`var Kernel: int`](#Conv1dShape.Kernel)
  - [`var Stride: int`](#Conv1dShape.Stride)
  - [`var Padding: int`](#Conv1dShape.Padding)
  - [`var Dilation: int`](#Conv1dShape.Dilation)
  - [`var Groups: int`](#Conv1dShape.Groups)
  - [`var OutputPadding: int`](#Conv1dShape.OutputPadding)
  - [`var OutLength: int { get }`](#Conv1dShape.OutLength)
  - [`var TransposedOutLength: int { get }`](#Conv1dShape.TransposedOutLength)
- [`enum Resize: Equatable`](#enum-Resize)
  - [`var _code: int32 { get }`](#Resize._code)
- [`enum RopeLayout: Equatable`](#enum-RopeLayout)

## Constants

<a id="let-RowGroup"></a>

```vertex
public let RowGroup = 256
```

RowGroup is how many work-items share one row of a row-wise op.

## Functions

### func Activate <a id="func-Activate"></a>

```vertex
public func Activate(_ x: gpu.Buffer<float32>, _ a: Activation, into y: gpu.Buffer<float32>) async throws
```

Activate writes a(x) into y, element by element: .ReLU, .GELU (with
erf), .GELUTanh (the tanh approximation), .SiLU, .Sigmoid, .Tanh, and
.Exp and .Sin (a vocoder's magnitude and phase).

### func Apply <a id="func-Apply"></a>

```vertex
@inlinable public func Apply(_ a: int32, _ x: float32) -> float32
```

Apply is activation a of x, as a device function any kernel can call.

### func Axpby <a id="func-Axpby"></a>

```vertex
public func Axpby(_ a: float32, _ x: gpu.Buffer<float32>, _ b: float32, _ y: gpu.Buffer<float32>, into out: gpu.Buffer<float32>) async throws
```

Axpby writes a·x + b·y into out, element by element: a residual sum,
an average, a difference.

### func ChannelNorm <a id="func-ChannelNorm"></a>

```vertex
public func ChannelNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>?, bias: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>,
                        rows: int, cols: int, eps: float32 = 1e-5) async throws
```

ChannelNorm is layer norm across channels: each column of x (rows
channels x cols positions) normalized over its rows, then scaled and
shifted by each row's weight and bias if given. It is F.layer_norm
over the channels of an NCL tensor, taken without transposing it.

### func Conv1d <a id="func-Conv1d"></a>

```vertex
public func Conv1d(_ x: gpu.Buffer<float32>, weight w: gpu.Buffer<float32>, bias b: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, _ s: Conv1dShape) async throws
```

Conv1d writes torch.nn.functional.conv1d(x, w, b, stride, padding,
dilation, groups) into y: x is [In, Length], w [Out, In/Groups,
Kernel], b [Out] or nil, y [Out, s.OutLength].

### func Conv1dLength <a id="func-Conv1dLength"></a>

```vertex
public func Conv1dLength(_ tin: int, kernel k: int, stride: int = 1, padding: int = 0, dilation: int = 1) -> int
```

Conv1dLength is the output length of a Conv1d over tin samples.

### func ConvTranspose1d <a id="func-ConvTranspose1d"></a>

```vertex
public func ConvTranspose1d(_ x: gpu.Buffer<float32>, weight w: gpu.Buffer<float32>, bias b: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>, _ s: Conv1dShape) async throws
```

ConvTranspose1d writes torch.nn.functional.conv_transpose1d(x, w, b,
stride, padding, output_padding, groups, dilation) into y: x is
[In, Length], w [In, Out/Groups, Kernel], y [Out, s.TransposedOutLength].

### func ConvTranspose1dLength <a id="func-ConvTranspose1dLength"></a>

```vertex
public func ConvTranspose1dLength(_ tin: int, kernel k: int, stride: int = 1, padding: int = 0, outputPadding: int = 0, dilation: int = 1) -> int
```

ConvTranspose1dLength is the output length of a ConvTranspose1d over
tin samples.

### func CrossEntropy <a id="func-CrossEntropy"></a>

```vertex
public func CrossEntropy(_ logits: gpu.Buffer<float32>, targets: gpu.Buffer<int32>, rows: int, cols: int) async throws -> gpu.Buffer<float32>
```

CrossEntropy is each row's loss against its target class: log Σe^x -
x[target], the softmax and the log fused. logits is rows x cols.

### func CumSum <a id="func-CumSum"></a>

```vertex
public func CumSum(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws
```

CumSum writes each row's running sum into y: torch.cumsum along the
length, a row a work-item.

### func Gated <a id="func-Gated"></a>

```vertex
public func Gated(_ x: gpu.Buffer<float32>, gate: gpu.Buffer<float32>, _ a: Activation, into y: gpu.Buffer<float32>) async throws
```

Gated writes x · a(gate) into y: SwiGLU is Gated(up, gate, .SiLU),
GeGLU is Gated(up, gate, .GELU).

### func GatherColumns <a id="func-GatherColumns"></a>

```vertex
public func GatherColumns(_ x: gpu.Buffer<float32>, index: gpu.Buffer<int32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws
```

GatherColumns writes y[r, c] = x[r, index[c]] for x of rows x cols and
index of out columns: x times a one-hot alignment matrix, taken
without one -- a duration model's token features, each repeated for
its frames.

### func HannWindow <a id="func-HannWindow"></a>

```vertex
public func HannWindow(_ n: int) -> [float32]
```

HannWindow is torch.hann_window(n) (periodic): 0.5 - 0.5·cos(2πk/n).

### func ISTFT <a id="func-ISTFT"></a>

```vertex
public func ISTFT(magnitude mag: gpu.Buffer<float32>, phase: gpu.Buffer<float32>, frames: int, n: int, hop: int, into y: gpu.Buffer<float32>) async throws
```

ISTFT writes torch.istft(mag · e^(i·phase), n, hop, window: hann(n),
center: true) into y: mag and phase are (n/2 + 1) bins x frames,
row-major by bin, and y is ISTFTLength(frames, hop) samples: each
frame inverted, windowed and overlap-added, divided by the window's
squared sum where they overlap.

### func ISTFTLength <a id="func-ISTFTLength"></a>

```vertex
public func ISTFTLength(_ frames: int, hop: int) -> int
```

ISTFTLength is how many samples ISTFT makes of frames frames:
hop · (frames - 1), the centered padding taken off.

### func InstanceNorm <a id="func-InstanceNorm"></a>

```vertex
public func InstanceNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>?, bias: gpu.Buffer<float32>?, into y: gpu.Buffer<float32>,
                         rows: int, cols: int, eps: float32 = 1e-5) async throws
```

InstanceNorm writes each row of x (rows x cols) normalized to zero
mean and unit variance (biased, as InstanceNorm1d's) into y, then
scaled and shifted by that row's weight and bias if given.

### func LSTMCell <a id="func-LSTMCell"></a>

```vertex
public func LSTMCell(gates: gpu.Buffer<float32>, cell c: gpu.Buffer<float32>, into h: gpu.Buffer<float32>, hidden: int, first: bool) async throws
```

LSTMCell is one step of torch.nn.LSTM's recurrence, from gates already
holding W_ih·x + b_ih + W_hh·h + b_hh (4·hidden: input, forget, cell,
output, PyTorch's order): c = f·c + i·g, h = o·tanh(c). On the first
step c starts at zero.

### func LayerNorm <a id="func-LayerNorm"></a>

```vertex
public func LayerNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>, bias: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-5) async throws
```

LayerNorm writes each row of x normalized to zero mean and unit
variance, then scaled and shifted: y = (x - mean) / sqrt(var + eps) ·
weight + bias.

### func LeakyReLU <a id="func-LeakyReLU"></a>

```vertex
public func LeakyReLU(_ x: gpu.Buffer<float32>, slope: float32, into y: gpu.Buffer<float32>) async throws
```

LeakyReLU writes x where it is positive and slope · x elsewhere.

### func LogSoftmax <a id="func-LogSoftmax"></a>

```vertex
public func LogSoftmax(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws
```

LogSoftmax writes each row's log-softmax: x - max - log Σe^(x - max).

### func LogSumExp <a id="func-LogSumExp"></a>

```vertex
public func LogSumExp(_ x: gpu.Buffer<float32>, rows: int, cols: int) async throws -> gpu.Buffer<float32>
```

LogSumExp is log Σ e^x of each row, one value a row.

### func MergeHeads <a id="func-MergeHeads"></a>

```vertex
public func MergeHeads(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, heads: int, dim: int) async throws
```

MergeHeads is SplitHeads undone: heads x rows x dim into rows x
(heads · dim).

### func Modulate <a id="func-Modulate"></a>

```vertex
public func Modulate(_ x: gpu.Buffer<float32>, gamma: gpu.Buffer<float32>, beta: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, cols: int) async throws
```

Modulate writes (1 + gamma[row]) · x + beta[row] into y, for x of
rows x cols: how AdaIN and adaptive layer norm apply a style's scale
and shift after normalizing.

### func Pad <a id="func-Pad"></a>

```vertex
public func Pad(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, left: int, right: int, reflect: bool = false) async throws
```

Pad writes each of x's rows (rows x cols) padded along its length into
y (rows x (left + cols + right)): with zeros, or reflected about the
row's first and last samples as ReflectionPad1d does (left and right
less than cols).

### func RMSNorm <a id="func-RMSNorm"></a>

```vertex
public func RMSNorm(_ x: gpu.Buffer<float32>, weight: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int, eps: float32 = 1e-6) async throws
```

RMSNorm writes each row of x scaled to unit root-mean-square and then
by weight (cols elements): y = x / sqrt(mean(x²) + eps) · weight.

### func RoPE <a id="func-RoPE"></a>

```vertex
public func RoPE(_ x: gpu.Buffer<float32>, position: int, heads: int, dim: int, base: float32 = 10000,
                 layout: RopeLayout = .interleaved) async throws
```

RoPE rotates one token's heads in place (heads x dim), all at position:
RoPE(x, positions:) for a single token, the position passed as a value.

### func RoPE <a id="func-RoPE-2"></a>

```vertex
public func RoPE(_ x: gpu.Buffer<float32>, positions: gpu.Buffer<int32>, heads: int, dim: int, base: float32 = 10000,
                 layout: RopeLayout = .interleaved) async throws
```

RoPE rotates x in place (tokens x heads x dim, row-major, one position
per token) by rotary position embeddings: each pair p of a head turned
by position · base^(-2p/dim), the pairs as layout says.

### func STFT <a id="func-STFT"></a>

```vertex
public func STFT(_ x: gpu.Buffer<float32>, length: int, n: int, hop: int, magnitude mag: gpu.Buffer<float32>, phase: gpu.Buffer<float32>) async throws
```

STFT writes torch.stft(x, n, hop, window: hann(n), center: true,
return_complex: true)'s magnitude and angle into mag and phase: each
(n/2 + 1) bins x STFTFrames(length, hop) frames, row-major by bin. The
DFT is taken directly: this is for the short windows (n of 16 to 64)
of vocoders like iSTFTNet.

### func STFTFrames <a id="func-STFTFrames"></a>

```vertex
public func STFTFrames(_ length: int, hop: int) -> int
```

STFTFrames is how many frames STFT makes of length samples: centered,
1 + length / hop.

### func Snake <a id="func-Snake"></a>

```vertex
public func Snake(_ x: gpu.Buffer<float32>, alpha: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, cols: int) async throws
```

Snake writes x + sin²(α·x)/α into y, α a row's (rows x cols): the
periodic activation of BigVGAN and iSTFTNet's resblocks.

### func Softmax <a id="func-Softmax"></a>

```vertex
public func Softmax(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, cols: int) async throws
```

Softmax writes each row of x (rows x cols, row-major) as its softmax
into y: e^x / Σe^x, computed from x minus the row's greatest element so
that nothing overflows.

### func SplitHeads <a id="func-SplitHeads"></a>

```vertex
public func SplitHeads(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, heads: int, dim: int) async throws
```

SplitHeads writes x, rows x (heads · dim) -- a projection's output,
each row's heads side by side -- into y as heads x rows x dim, the
layout attention takes.

### func Upsample <a id="func-Upsample"></a>

```vertex
public func Upsample(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, rows: int, length tin: int, factor: float64, mode: Resize) async throws
```

Upsample writes each of x's rows (rows x tin) resampled along its
length by factor into y, as torch.nn.functional.interpolate(x,
scale_factor: factor, mode) does -- factor below 1 shrinks. The output
is UpsampleLength(tin, factor) long, and positions map through
1/factor, not tin/tout, as PyTorch's do when given a scale factor.

### func UpsampleLength <a id="func-UpsampleLength"></a>

```vertex
public func UpsampleLength(_ tin: int, factor: float64) -> int
```

UpsampleLength is the length interpolate(scale_factor: factor) makes
of tin samples: floor(tin · factor), in double as PyTorch takes it.

### func WeightNorm <a id="func-WeightNorm"></a>

```vertex
public func WeightNorm(g: gpu.Buffer<float32>, v: gpu.Buffer<float32>, into w: gpu.Buffer<float32>, rows: int) async throws
```

WeightNorm writes the weight torch.nn.utils.weight_norm (dim 0) makes
of its parameters into w: w = g · v / ‖v‖, each of v's rows (its first
dimension, rows of it) normalized over the rest. g has one element a
row.

## Types

### enum Activation <a id="enum-Activation"></a>

```vertex
public enum Activation
```

Activation is an elementwise function Activate applies.

#### Cases

<a id="Activation.ReLU"></a>

```vertex
case ReLU
```

<a id="Activation.GELU"></a>

```vertex
case GELU
```

<a id="Activation.GELUTanh"></a>

```vertex
case GELUTanh
```

<a id="Activation.SiLU"></a>

```vertex
case SiLU
```

<a id="Activation.Sigmoid"></a>

```vertex
case Sigmoid
```

<a id="Activation.Tanh"></a>

```vertex
case Tanh
```

<a id="Activation.Exp"></a>

```vertex
case Exp
```

<a id="Activation.Sin"></a>

```vertex
case Sin
```

#### Properties

<a id="Activation._code"></a>

```vertex
public var _code: int32 { get }
```

### struct Conv1dShape <a id="struct-Conv1dShape"></a>

```vertex
public struct Conv1dShape
```

Conv1dShape is a one-dimensional convolution's problem: channels in
and out, the input's length, the kernel's taps, and how they stride,
pad, dilate and group, as torch.nn.Conv1d and ConvTranspose1d take
them. OutputPadding is ConvTranspose1d's alone.

#### Initializers

<a id="Conv1dShape.init"></a>

```vertex
public init(in cin: int, out cout: int, length: int, kernel: int, stride: int = 1, padding: int = 0,
            dilation: int = 1, groups: int = 1, outputPadding: int = 0)
```

#### Properties

<a id="Conv1dShape.In"></a>

```vertex
public var In: int
```

<a id="Conv1dShape.Out"></a>

```vertex
public var Out: int
```

<a id="Conv1dShape.Length"></a>

```vertex
public var Length: int
```

<a id="Conv1dShape.Kernel"></a>

```vertex
public var Kernel: int
```

<a id="Conv1dShape.Stride"></a>

```vertex
public var Stride: int
```

<a id="Conv1dShape.Padding"></a>

```vertex
public var Padding: int
```

<a id="Conv1dShape.Dilation"></a>

```vertex
public var Dilation: int
```

<a id="Conv1dShape.Groups"></a>

```vertex
public var Groups: int
```

<a id="Conv1dShape.OutputPadding"></a>

```vertex
public var OutputPadding: int
```

<a id="Conv1dShape.OutLength"></a>

```vertex
public var OutLength: int { get }
```

OutLength is a Conv1d's output length.

<a id="Conv1dShape.TransposedOutLength"></a>

```vertex
public var TransposedOutLength: int { get }
```

TransposedOutLength is a ConvTranspose1d's output length.

### enum Resize <a id="enum-Resize"></a>

```vertex
public enum Resize: Equatable
```

Resize is how Upsample maps output positions to input ones: .nearest
or .linear, as torch.nn.functional.interpolate's modes of those names
(align_corners false).

#### Cases

<a id="Resize.nearest"></a>

```vertex
case nearest
```

<a id="Resize.linear"></a>

```vertex
case linear
```

#### Properties

<a id="Resize._code"></a>

```vertex
public var _code: int32 { get }
```

### enum RopeLayout <a id="enum-RopeLayout"></a>

```vertex
public enum RopeLayout: Equatable
```

RopeLayout is which elements of a head RoPE turns together. It is a
property of the weights: the rows of Q and K a checkpoint holds are laid
out for one or the other.

#### Cases

<a id="RopeLayout.interleaved"></a>

```vertex
case interleaved
```

(x[2p], x[2p+1]): GPT-J's, and llama.cpp's for the llama GGUFs it
converts (it permutes Q and K for this).

<a id="RopeLayout.halves"></a>

```vertex
case halves
```

(x[p], x[p + dim/2]): rotate_half, as Hugging Face's Llama, Qwen,
Gemma and Phi have it (NeoX's; llama.cpp's ROPE_TYPE_NEOX).

## Files

- conv.vs
- layout.vs
- neural.vs
- signal.vs
