# gpu/random

Philox4x32-10: `Key`, `Split`, `Fold`, `Block`, `Bits`, `Uint32`, `Uniform`, `Normal` (Box–Muller), `Below`, `Bernoulli`; `Fill` for `float32` and `uint32` buffers, `FillNormal`

```vertex
import "gpu/random"
```

## Types

- **`Key`** (struct): Key names one stream of random numbers. It is two words, a plain value, so a kernel can take one (as its two words) and make it again.

## Functions

- `func Split(key: Key) -> (Key, Key)`: Split makes two keys whose streams are unrelated to each other and to key's own. Splitting again gives the same two.
- `func Fold(key: Key, data: uint32) -> Key`: Fold makes the key for one of many users of key: a layer, a step, a device. Folding in the same data gives the same key.
- `func Block(key: Key, c0: uint32, c1: uint32, c2: uint32, c3: uint32) -> (uint32, uint32, uint32, uint32)`: Block is Philox4x32-10 itself: four random words for a key and a four-word counter.
- `func Bits(key: Key, i: uint64) -> (uint32, uint32, uint32, uint32)`: Bits is element i of key's stream, as four random words.
- `func Uint32(key: Key, i: uint64) -> uint32`: Uint32 is element i of key's stream as one random word.
- `func Uniform(key: Key, i: uint64) -> float32`: Uniform is element i of key's stream as a float32 in [0, 1): 24 random bits, so every value it takes is equally likely.
- `func Below(key: Key, i: uint64, bound: uint32) -> uint32`: Below is element i of key's stream as an integer in [0, bound), by Lemire's multiply-and-shift.
- `func Bernoulli(key: Key, i: uint64, p: float32) -> bool`: Bernoulli is element i of key's stream as true with probability p.
- `func Fill(b: gpu.Buffer<float32>, key: Key, start: uint64 = 0) async throws`: Fill writes elements start, start+1, ... of key's stream into b, as uniform float32s in [0, 1).
- `func Fill(b: gpu.Buffer<uint32>, key: Key, start: uint64 = 0) async throws`: Fill writes elements start, start+1, ... of key's stream into b, as random words.
- and 2 more

Part of the [`gpu`](https://github.com/vertex-language/gpu) repository.
