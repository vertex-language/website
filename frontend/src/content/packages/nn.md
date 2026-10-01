# package nn

```vertex
import "nn"
```

Package nn is the layers models are made of, over tensor: each holds its
weights as Tensors whatever their format, and runs on the device they
are on.

This is the first cut, grown from what decoding a llama one token at a
time needs: Linear (dense or block-quantized behind one interface),
Embedding, RMSNorm, GatedMLP, and Attention with its KV Cache. A layer
takes and writes float32 activations in gpu buffers, and keeps what it
needs between its steps, so that a token's forward pass allocates
nothing. Batches, prefill and training come with the models that need
them (proposed_ai_packages.md §6.2).

## Index

- [`func Forward(_ linears: [Linear], _ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws`](#func-Forward)
- [`func Stacked(_ weights: [Linear]) throws -> [Linear]`](#func-Stacked)
- [`func WeightNormed(g: tensor.Tensor, v: tensor.Tensor) async throws -> tensor.Tensor`](#func-WeightNormed)
- [`final class AdaIN1d`](#class-AdaIN1d)
  - [`init(fc: Dense, norm: InstanceNorm1d? = nil) throws`](#AdaIN1d.init)
  - [`let FC: Dense`](#AdaIN1d.FC)
  - [`let Norm: InstanceNorm1d`](#AdaIN1d.Norm)
  - [`var Channels: int { get }`](#AdaIN1d.Channels)
  - [`func Forward(_ x: gpu.Buffer<float32>, style: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws`](#AdaIN1d.Forward)
- [`final class AdaLayerNorm`](#class-AdaLayerNorm)
  - [`init(fc: Dense, eps: float32 = 1e-5)`](#AdaLayerNorm.init)
  - [`let FC: Dense`](#AdaLayerNorm.FC)
  - [`let Eps: float32`](#AdaLayerNorm.Eps)
  - [`var Channels: int { get }`](#AdaLayerNorm.Channels)
  - [`func Forward(_ x: gpu.Buffer<float32>, style: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws`](#AdaLayerNorm.Forward)
- [`final class Attention`](#class-Attention)
  - [`init(qkv: [Linear], o: Linear, heads: int, kvHeads: int, headDim: int, rope: Rope) throws`](#Attention.init)
  - [`let QKV: [Linear]`](#Attention.QKV)
  - [`let O: Linear`](#Attention.O)
  - [`let Heads: int`](#Attention.Heads)
  - [`let KVHeads: int`](#Attention.KVHeads)
  - [`let HeadDim: int`](#Attention.HeadDim)
  - [`let Rope: Rope`](#Attention.Rope)
  - [`static func Fused(q: Linear, k: Linear, v: Linear, o: Linear, heads: int, kvHeads: int, rope: Rope) throws -> Attention`](#Attention.Fused)
  - [`func Forward(_ x: gpu.Buffer<float32>, position: int, cache: Cache, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws`](#Attention.Forward)
- [`final class Cache`](#class-Cache)
  - [`init(on d: gpu.Device, kvHeads: int, headDim: int, capacity: int) throws`](#Cache.init)
  - [`let K: gpu.Buffer<float32>`](#Cache.K)
  - [`let V: gpu.Buffer<float32>`](#Cache.V)
  - [`let Capacity: int`](#Cache.Capacity)
  - [`let KVHeads: int`](#Cache.KVHeads)
  - [`let HeadDim: int`](#Cache.HeadDim)
- [`final class ChannelNorm`](#class-ChannelNorm)
  - [`init(gamma: tensor.Tensor? = nil, beta: tensor.Tensor? = nil, eps: float32 = 1e-5) throws`](#ChannelNorm.init)
  - [`let Gamma: gpu.Buffer<float32>?`](#ChannelNorm.Gamma)
  - [`let Beta: gpu.Buffer<float32>?`](#ChannelNorm.Beta)
  - [`let Eps: float32`](#ChannelNorm.Eps)
  - [`func Forward(_ x: gpu.Buffer<float32>, channels: int, length: int, into y: gpu.Buffer<float32>) async throws`](#ChannelNorm.Forward)
- [`final class Conv1d`](#class-Conv1d)
  - [`init(weight: tensor.Tensor, bias: tensor.Tensor? = nil, stride: int = 1, padding: int = 0, dilation: int = 1, groups: int = 1) throws`](#Conv1d.init)
  - [`let Weight: gpu.Buffer<float32>`](#Conv1d.Weight)
  - [`let Bias: gpu.Buffer<float32>?`](#Conv1d.Bias)
  - [`let In: int`](#Conv1d.In)
  - [`let Out: int`](#Conv1d.Out)
  - [`let Kernel: int`](#Conv1d.Kernel)
  - [`let Stride: int`](#Conv1d.Stride)
  - [`let Padding: int`](#Conv1d.Padding)
  - [`let Dilation: int`](#Conv1d.Dilation)
  - [`let Groups: int`](#Conv1d.Groups)
  - [`func OutLength(_ length: int) -> int`](#Conv1d.OutLength)
  - [`func Forward(_ x: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws`](#Conv1d.Forward)
- [`final class ConvTranspose1d`](#class-ConvTranspose1d)
  - [`init(weight: tensor.Tensor, bias: tensor.Tensor? = nil, stride: int = 1, padding: int = 0, outputPadding: int = 0, groups: int = 1) throws`](#ConvTranspose1d.init)
  - [`let Weight: gpu.Buffer<float32>`](#ConvTranspose1d.Weight)
  - [`let Bias: gpu.Buffer<float32>?`](#ConvTranspose1d.Bias)
  - [`let In: int`](#ConvTranspose1d.In)
  - [`let Out: int`](#ConvTranspose1d.Out)
  - [`let Kernel: int`](#ConvTranspose1d.Kernel)
  - [`let Stride: int`](#ConvTranspose1d.Stride)
  - [`let Padding: int`](#ConvTranspose1d.Padding)
  - [`let OutputPadding: int`](#ConvTranspose1d.OutputPadding)
  - [`let Groups: int`](#ConvTranspose1d.Groups)
  - [`func OutLength(_ length: int) -> int`](#ConvTranspose1d.OutLength)
  - [`func Forward(_ x: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws`](#ConvTranspose1d.Forward)
- [`final class Dense`](#class-Dense)
  - [`init(weight: tensor.Tensor, bias: tensor.Tensor? = nil) throws`](#Dense.init)
  - [`let Weight: gpu.Buffer<float32>`](#Dense.Weight)
  - [`let Bias: gpu.Buffer<float32>?`](#Dense.Bias)
  - [`let In: int`](#Dense.In)
  - [`let Out: int`](#Dense.Out)
  - [`func Forward(_ x: gpu.Buffer<float32>, rows: int = 1, into y: gpu.Buffer<float32>) async throws`](#Dense.Forward)
- [`struct Embedding`](#struct-Embedding)
  - [`init(_ weight: tensor.Tensor) throws`](#Embedding.init)
  - [`let Weight: tensor.Tensor`](#Embedding.Weight)
  - [`var Dim: int { get }`](#Embedding.Dim)
  - [`func Lookup(_ token: int, into x: gpu.Buffer<float32>) async throws`](#Embedding.Lookup)
- [`final class GatedMLP`](#class-GatedMLP)
  - [`init(gateUp: [Linear], down: Linear, activation: neural.Activation) throws`](#GatedMLP.init)
  - [`let GateUp: [Linear]`](#GatedMLP.GateUp)
  - [`let Down: Linear`](#GatedMLP.Down)
  - [`let Activation: neural.Activation`](#GatedMLP.Activation)
  - [`static func Fused(gate: Linear, up: Linear, down: Linear, activation: neural.Activation) throws -> GatedMLP`](#GatedMLP.Fused)
  - [`func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws`](#GatedMLP.Forward)
- [`final class InstanceNorm1d`](#class-InstanceNorm1d)
  - [`init(weight: tensor.Tensor? = nil, bias: tensor.Tensor? = nil, eps: float32 = 1e-5) throws`](#InstanceNorm1d.init)
  - [`let Weight: gpu.Buffer<float32>?`](#InstanceNorm1d.Weight)
  - [`let Bias: gpu.Buffer<float32>?`](#InstanceNorm1d.Bias)
  - [`let Eps: float32`](#InstanceNorm1d.Eps)
  - [`func Forward(_ x: gpu.Buffer<float32>, channels: int, length: int, into y: gpu.Buffer<float32>) async throws`](#InstanceNorm1d.Forward)
- [`final class LSTM`](#class-LSTM)
  - [`init(weightIH: tensor.Tensor, weightHH: tensor.Tensor, biasIH: tensor.Tensor, biasHH: tensor.Tensor, reverse: [tensor.Tensor] = []) throws`](#LSTM.init)
  - [`let Input: int`](#LSTM.Input)
  - [`let Hidden: int`](#LSTM.Hidden)
  - [`let Directions: int`](#LSTM.Directions)
  - [`var Out: int { get }`](#LSTM.Out)
  - [`func Forward(_ x: gpu.Buffer<float32>, steps: int, into y: gpu.Buffer<float32>) async throws`](#LSTM.Forward)
- [`enum LayerError: Error`](#enum-LayerError)
  - [`var Message: string { get }`](#LayerError.Message)
- [`struct Linear`](#struct-Linear)
  - [`init(_ weight: tensor.Tensor) throws`](#Linear.init)
  - [`init(stacking parts: [tensor.Tensor]) throws`](#Linear.init-2)
  - [`let Parts: [tensor.Tensor]`](#Linear.Parts)
  - [`var Weight: tensor.Tensor { get }`](#Linear.Weight)
  - [`var Device: gpu.Device { get }`](#Linear.Device)
  - [`var In: int { get }`](#Linear.In)
  - [`var Out: int { get }`](#Linear.Out)
  - [`func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws`](#Linear.Forward)
- [`struct RMSNorm`](#struct-RMSNorm)
  - [`init(_ weight: tensor.Tensor, eps: float32)`](#RMSNorm.init)
  - [`let Weight: tensor.Tensor`](#RMSNorm.Weight)
  - [`let Eps: float32`](#RMSNorm.Eps)
  - [`func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws`](#RMSNorm.Forward)
- [`struct Rope`](#struct-Rope)
  - [`init(base: float32 = 10000, layout: neural.RopeLayout = .halves)`](#Rope.init)
  - [`var Base: float32`](#Rope.Base)
  - [`var Layout: neural.RopeLayout`](#Rope.Layout)

## Functions

### func Forward <a id="func-Forward"></a>

```vertex
public func Forward(_ linears: [Linear], _ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws
```

Forward runs Linears of one input into consecutive slices of y: what
Stacked makes of several projections, as one.

### func Stacked <a id="func-Stacked"></a>

```vertex
public func Stacked(_ weights: [Linear]) throws -> [Linear]
```

Stacked is Linears for weights of one input, in order: neighbours of
one format stacked into one (one product for them), so that together
they write the weights' outputs one after another. Q and K of q4_K
with V of q6_K -- a Q4_K_M file's attention -- are two.

### func WeightNormed <a id="func-WeightNormed"></a>

```vertex
public func WeightNormed(g: tensor.Tensor, v: tensor.Tensor) async throws -> tensor.Tensor
```

WeightNormed is the weight torch.nn.utils.weight_norm keeps as
weight_g and weight_v: g · v / ‖v‖, over v's dimensions after the
first. Checkpoints store the two; a layer is built from this.

## Types

### class AdaIN1d <a id="class-AdaIN1d"></a>

```vertex
public final class AdaIN1d
```

AdaIN1d is adaptive instance norm (StyleTTS2's): a style vector's
Dense makes a gamma and beta a channel, and the instance-normalized
input becomes (1 + gamma) · x + beta.

#### Initializers

<a id="AdaIN1d.init"></a>

```vertex
public init(fc: Dense, norm: InstanceNorm1d? = nil) throws
```

init takes the style Dense, and the norm's affine weights if the
checkpoint has them (Kokoro's have none: PyTorch's defaults, 1 and 0).

#### Properties

<a id="AdaIN1d.FC"></a>

```vertex
public let FC: Dense
```

<a id="AdaIN1d.Norm"></a>

```vertex
public let Norm: InstanceNorm1d
```

<a id="AdaIN1d.Channels"></a>

```vertex
public var Channels: int { get }
```

#### Methods

<a id="AdaIN1d.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, style: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws
```

Forward writes [Channels, length] into y from x of that shape and
the style vector (FC.In).

### class AdaLayerNorm <a id="class-AdaLayerNorm"></a>

```vertex
public final class AdaLayerNorm
```

AdaLayerNorm is StyleTTS2's adaptive layer norm: ChannelNorm without
its own scale, then a style's gamma and beta, (1 + gamma) · x + beta.

#### Initializers

<a id="AdaLayerNorm.init"></a>

```vertex
public init(fc: Dense, eps: float32 = 1e-5)
```

#### Properties

<a id="AdaLayerNorm.FC"></a>

```vertex
public let FC: Dense
```

<a id="AdaLayerNorm.Eps"></a>

```vertex
public let Eps: float32
```

<a id="AdaLayerNorm.Channels"></a>

```vertex
public var Channels: int { get }
```

#### Methods

<a id="AdaLayerNorm.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, style: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws
```

### class Attention <a id="class-Attention"></a>

```vertex
public final class Attention
```

Attention is a transformer's self-attention for one token at a time:
the Q, K and V projections -- one Linear, QKV, their rows one after the
other, so one product makes all three -- rotary position embeddings,
the keys and values so far from a Cache, and the output projection.
Heads a multiple of KVHeads is grouped-query attention.

#### Initializers

<a id="Attention.init"></a>

```vertex
public init(qkv: [Linear], o: Linear, heads: int, kvHeads: int, headDim: int, rope: Rope) throws
```

#### Properties

<a id="Attention.QKV"></a>

```vertex
public let QKV: [Linear]
```

QKV is the Q, K and V projections, as Stacked makes them.

<a id="Attention.O"></a>

```vertex
public let O: Linear
```

<a id="Attention.Heads"></a>

```vertex
public let Heads: int
```

<a id="Attention.KVHeads"></a>

```vertex
public let KVHeads: int
```

<a id="Attention.HeadDim"></a>

```vertex
public let HeadDim: int
```

<a id="Attention.Rope"></a>

```vertex
public let Rope: Rope
```

#### Methods

<a id="Attention.Fused"></a>

```vertex
public static func Fused(q: Linear, k: Linear, v: Linear, o: Linear, heads: int, kvHeads: int, rope: Rope) throws -> Attention
```

Fused is an Attention of separate Q, K and V weights, stacked: one
product makes all three, and no weight is copied.

<a id="Attention.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, position: int, cache: Cache, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws
```

Forward attends x, the token at position, to itself and the tokens
before it in cache, adds it to the cache, and writes the output
projection into y -- or with accumulate adds it to y.

### class Cache <a id="class-Cache"></a>

```vertex
public final class Cache
```

Cache is the keys and values of the tokens so far, for one layer:
[kvHeads, capacity, headDim] each, the first Count rows of a head used.

#### Initializers

<a id="Cache.init"></a>

```vertex
public init(on d: gpu.Device, kvHeads: int, headDim: int, capacity: int) throws
```

#### Properties

<a id="Cache.K"></a>

```vertex
public let K: gpu.Buffer<float32>
```

<a id="Cache.V"></a>

```vertex
public let V: gpu.Buffer<float32>
```

<a id="Cache.Capacity"></a>

```vertex
public let Capacity: int
```

<a id="Cache.KVHeads"></a>

```vertex
public let KVHeads: int
```

<a id="Cache.HeadDim"></a>

```vertex
public let HeadDim: int
```

### class ChannelNorm <a id="class-ChannelNorm"></a>

```vertex
public final class ChannelNorm
```

ChannelNorm is layer norm across the channels of [channels, length]
(StyleTTS2's LayerNorm module: F.layer_norm over the channel axis),
scaled by gamma and shifted by beta a channel when it has them.

#### Initializers

<a id="ChannelNorm.init"></a>

```vertex
public init(gamma: tensor.Tensor? = nil, beta: tensor.Tensor? = nil, eps: float32 = 1e-5) throws
```

#### Properties

<a id="ChannelNorm.Gamma"></a>

```vertex
public let Gamma: gpu.Buffer<float32>?
```

<a id="ChannelNorm.Beta"></a>

```vertex
public let Beta: gpu.Buffer<float32>?
```

<a id="ChannelNorm.Eps"></a>

```vertex
public let Eps: float32
```

#### Methods

<a id="ChannelNorm.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, channels: int, length: int, into y: gpu.Buffer<float32>) async throws
```

### class Conv1d <a id="class-Conv1d"></a>

```vertex
public final class Conv1d
```

Conv1d is torch.nn.Conv1d: weight [out, in/groups, kernel], bias [out]
or nil.

#### Initializers

<a id="Conv1d.init"></a>

```vertex
public init(weight: tensor.Tensor, bias: tensor.Tensor? = nil, stride: int = 1, padding: int = 0, dilation: int = 1, groups: int = 1) throws
```

#### Properties

<a id="Conv1d.Weight"></a>

```vertex
public let Weight: gpu.Buffer<float32>
```

<a id="Conv1d.Bias"></a>

```vertex
public let Bias: gpu.Buffer<float32>?
```

<a id="Conv1d.In"></a>

```vertex
public let In: int
```

<a id="Conv1d.Out"></a>

```vertex
public let Out: int
```

<a id="Conv1d.Kernel"></a>

```vertex
public let Kernel: int
```

<a id="Conv1d.Stride"></a>

```vertex
public let Stride: int
```

<a id="Conv1d.Padding"></a>

```vertex
public let Padding: int
```

<a id="Conv1d.Dilation"></a>

```vertex
public let Dilation: int
```

<a id="Conv1d.Groups"></a>

```vertex
public let Groups: int
```

#### Methods

<a id="Conv1d.OutLength"></a>

```vertex
public func OutLength(_ length: int) -> int
```

OutLength is how long the output of length samples is.

<a id="Conv1d.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws
```

Forward writes [Out, OutLength(length)] into y from [In, length].

### class ConvTranspose1d <a id="class-ConvTranspose1d"></a>

```vertex
public final class ConvTranspose1d
```

ConvTranspose1d is torch.nn.ConvTranspose1d: weight [in, out/groups,
kernel], bias [out] or nil.

#### Initializers

<a id="ConvTranspose1d.init"></a>

```vertex
public init(weight: tensor.Tensor, bias: tensor.Tensor? = nil, stride: int = 1, padding: int = 0, outputPadding: int = 0, groups: int = 1) throws
```

#### Properties

<a id="ConvTranspose1d.Weight"></a>

```vertex
public let Weight: gpu.Buffer<float32>
```

<a id="ConvTranspose1d.Bias"></a>

```vertex
public let Bias: gpu.Buffer<float32>?
```

<a id="ConvTranspose1d.In"></a>

```vertex
public let In: int
```

<a id="ConvTranspose1d.Out"></a>

```vertex
public let Out: int
```

<a id="ConvTranspose1d.Kernel"></a>

```vertex
public let Kernel: int
```

<a id="ConvTranspose1d.Stride"></a>

```vertex
public let Stride: int
```

<a id="ConvTranspose1d.Padding"></a>

```vertex
public let Padding: int
```

<a id="ConvTranspose1d.OutputPadding"></a>

```vertex
public let OutputPadding: int
```

<a id="ConvTranspose1d.Groups"></a>

```vertex
public let Groups: int
```

#### Methods

<a id="ConvTranspose1d.OutLength"></a>

```vertex
public func OutLength(_ length: int) -> int
```

<a id="ConvTranspose1d.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, length: int, into y: gpu.Buffer<float32>) async throws
```

Forward writes [Out, OutLength(length)] into y from [In, length].

### class Dense <a id="class-Dense"></a>

```vertex
public final class Dense
```

Dense is torch.nn.Linear: y = x·Wᵀ + b over rows of x, W [out, in]
float32 and b [out] or nil.

#### Initializers

<a id="Dense.init"></a>

```vertex
public init(weight: tensor.Tensor, bias: tensor.Tensor? = nil) throws
```

#### Properties

<a id="Dense.Weight"></a>

```vertex
public let Weight: gpu.Buffer<float32>
```

<a id="Dense.Bias"></a>

```vertex
public let Bias: gpu.Buffer<float32>?
```

<a id="Dense.In"></a>

```vertex
public let In: int
```

<a id="Dense.Out"></a>

```vertex
public let Out: int
```

#### Methods

<a id="Dense.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, rows: int = 1, into y: gpu.Buffer<float32>) async throws
```

Forward writes rows x Out into y from rows x In of x.

### struct Embedding <a id="struct-Embedding"></a>

```vertex
public struct Embedding
```

Embedding is a table of vectors, one a token: a [count, dim] weight,
float32, a half type or block-quantized.

#### Initializers

<a id="Embedding.init"></a>

```vertex
public init(_ weight: tensor.Tensor) throws
```

#### Properties

<a id="Embedding.Weight"></a>

```vertex
public let Weight: tensor.Tensor
```

<a id="Embedding.Dim"></a>

```vertex
public var Dim: int { get }
```

#### Methods

<a id="Embedding.Lookup"></a>

```vertex
public func Lookup(_ token: int, into x: gpu.Buffer<float32>) async throws
```

Lookup writes token's vector into x.

### class GatedMLP <a id="class-GatedMLP"></a>

```vertex
public final class GatedMLP
```

GatedMLP is Down(a(Gate·x) ⊙ Up·x): SwiGLU with .SiLU, the MLP of
Llama, Mistral, Qwen and most decoders since. Gate and Up are one
Linear, GateUp, their rows one after the other: one product makes both.

#### Initializers

<a id="GatedMLP.init"></a>

```vertex
public init(gateUp: [Linear], down: Linear, activation: neural.Activation) throws
```

#### Properties

<a id="GatedMLP.GateUp"></a>

```vertex
public let GateUp: [Linear]
```

GateUp is the gate and up projections, as Stacked makes them.

<a id="GatedMLP.Down"></a>

```vertex
public let Down: Linear
```

<a id="GatedMLP.Activation"></a>

```vertex
public let Activation: neural.Activation
```

#### Methods

<a id="GatedMLP.Fused"></a>

```vertex
public static func Fused(gate: Linear, up: Linear, down: Linear, activation: neural.Activation) throws -> GatedMLP
```

Fused is a GatedMLP of separate gate and up weights, stacked: one
product makes both, and no weight is copied.

<a id="GatedMLP.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws
```

Forward writes the MLP of x into y, or with accumulate adds it.

### class InstanceNorm1d <a id="class-InstanceNorm1d"></a>

```vertex
public final class InstanceNorm1d
```

InstanceNorm1d is torch.nn.InstanceNorm1d: each channel normalized
over its length, then scaled and shifted by weight and bias if it has
them (affine).

#### Initializers

<a id="InstanceNorm1d.init"></a>

```vertex
public init(weight: tensor.Tensor? = nil, bias: tensor.Tensor? = nil, eps: float32 = 1e-5) throws
```

#### Properties

<a id="InstanceNorm1d.Weight"></a>

```vertex
public let Weight: gpu.Buffer<float32>?
```

<a id="InstanceNorm1d.Bias"></a>

```vertex
public let Bias: gpu.Buffer<float32>?
```

<a id="InstanceNorm1d.Eps"></a>

```vertex
public let Eps: float32
```

#### Methods

<a id="InstanceNorm1d.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, channels: int, length: int, into y: gpu.Buffer<float32>) async throws
```

### class LSTM <a id="class-LSTM"></a>

```vertex
public final class LSTM
```

LSTM is torch.nn.LSTM, one layer, batch_first, forward only or
bidirectional: weights as PyTorch names them (weight_ih_l0 [4H, in],
weight_hh_l0 [4H, H], bias_ih_l0 and bias_hh_l0 [4H], and the same
with _reverse). The gates are input, forget, cell, output.

#### Initializers

<a id="LSTM.init"></a>

```vertex
public init(weightIH: tensor.Tensor, weightHH: tensor.Tensor, biasIH: tensor.Tensor, biasHH: tensor.Tensor,
            reverse: [tensor.Tensor] = []) throws
```

init takes the forward direction's weights, and the reverse
direction's for a bidirectional LSTM.

#### Properties

<a id="LSTM.Input"></a>

```vertex
public let Input: int
```

<a id="LSTM.Hidden"></a>

```vertex
public let Hidden: int
```

<a id="LSTM.Directions"></a>

```vertex
public let Directions: int
```

Directions is 1, or 2 for a bidirectional LSTM.

<a id="LSTM.Out"></a>

```vertex
public var Out: int { get }
```

Out is how many features a step's output has: Hidden a direction.

#### Methods

<a id="LSTM.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, steps: int, into y: gpu.Buffer<float32>) async throws
```

Forward runs the LSTM over steps rows of x (steps x Input) from a
zero state, writing steps x Out into y: the forward direction's
output, then the reverse's, in each row.

### enum LayerError <a id="enum-LayerError"></a>

```vertex
public enum LayerError: Error
```

LayerError is a layer given what it cannot take.

#### Cases

<a id="LayerError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="LayerError.Message"></a>

```vertex
public var Message: string { get }
```

### struct Linear <a id="struct-Linear"></a>

```vertex
public struct Linear
```

Linear is y = W·x, W a [out, in] weight: float32, float16 or bfloat16,
or q4_0, q8_0, q4_K or q6_K blocks, decoded in place as the product is
taken. W may be stacked from
up to three weights of the same format and input -- a model's Q, K and V
projections, or gate and up -- which one product computes together,
with no copy of the weights made.

#### Initializers

<a id="Linear.init"></a>

```vertex
public init(_ weight: tensor.Tensor) throws
```

<a id="Linear.init-2"></a>

```vertex
public init(stacking parts: [tensor.Tensor]) throws
```

#### Properties

<a id="Linear.Parts"></a>

```vertex
public let Parts: [tensor.Tensor]
```

Parts are W's weights, stacked by rows: one, for a plain Linear.

<a id="Linear.Weight"></a>

```vertex
public var Weight: tensor.Tensor { get }
```

Weight is the first part: the whole weight of a plain Linear.

<a id="Linear.Device"></a>

```vertex
public var Device: gpu.Device { get }
```

<a id="Linear.In"></a>

```vertex
public var In: int { get }
```

<a id="Linear.Out"></a>

```vertex
public var Out: int { get }
```

#### Methods

<a id="Linear.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>, accumulate: bool = false) async throws
```

Forward writes W·x into y: x has In elements, y Out. With
accumulate it adds W·x to what y holds: a residual connection in the
same pass.

### struct RMSNorm <a id="struct-RMSNorm"></a>

```vertex
public struct RMSNorm
```

RMSNorm scales x to unit root-mean-square, then by a float32 weight.

#### Initializers

<a id="RMSNorm.init"></a>

```vertex
public init(_ weight: tensor.Tensor, eps: float32)
```

#### Properties

<a id="RMSNorm.Weight"></a>

```vertex
public let Weight: tensor.Tensor
```

<a id="RMSNorm.Eps"></a>

```vertex
public let Eps: float32
```

#### Methods

<a id="RMSNorm.Forward"></a>

```vertex
public func Forward(_ x: gpu.Buffer<float32>, into y: gpu.Buffer<float32>) async throws
```

### struct Rope <a id="struct-Rope"></a>

```vertex
public struct Rope
```

Rope is how an Attention turns its queries and keys by position: the
frequency base, and which elements of a head pair up -- a property of
the checkpoint's Q and K weights (neural.RopeLayout).

#### Initializers

<a id="Rope.init"></a>

```vertex
public init(base: float32 = 10000, layout: neural.RopeLayout = .halves)
```

#### Properties

<a id="Rope.Base"></a>

```vertex
public var Base: float32
```

<a id="Rope.Layout"></a>

```vertex
public var Layout: neural.RopeLayout
```

## Files

- attention.vs
- conv.vs
- layers.vs
