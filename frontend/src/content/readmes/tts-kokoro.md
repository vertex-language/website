# tts/kokoro

Kokoro-82M (hexgrad/Kokoro-82M): StyleTTS 2's inference path with an iSTFTNet vocoder. Phoneme ids and a voice's 256-float style vector in, 24 kHz audio out.

```vertex
import "tts/kokoro"
```

## Types

- **`Albert`** (class): Albert is the phoneme-level BERT: ids in, a 768-float feature a token out, [tokens, 768].
- **`TextEncoder`** (class): TextEncoder is StyleTTS 2's: an embedding, convolutions each with channel layer norm and LeakyReLU(0.2), and a bidirectional LSTM.
- **`Decoder`** (class): Decoder is StyleTTS 2's iSTFTNet decoder.
- **`Generator`** (class): Generator is iSTFTNet's generator (Kokoro's `decoder.generator`).
- **`Model`** (class): Model is Kokoro-82M loaded.
- **`Speech`** (struct): Speech is what Synthesize makes: 24 kHz samples, and how many frames (of 600 samples) each token lasted.
- **`Voice`** (struct): Voice is a voice pack (voices/<name>.pt: [510, 1, 256]): one style vector for each utterance length.
- **`LoadError`** (enum): LoadError is a checkpoint or input Kokoro cannot take.
- **`Predictor`** (class): Predictor is the prosody predictor: its duration encoder (LSTMs with adaptive layer norm, the style beside every frame), the duration LSTM and projection, and the shared LSTM with the F0 and N stacks.

## Functions

- `func Alignment(_ durations: [int]) -> [int32]`: Alignment is the frame-to-token index durations make: token t repeated durations[t] times, torch.repeat_interleave's.

Part of the [`tts`](https://github.com/vertex-language/tts) repository.
