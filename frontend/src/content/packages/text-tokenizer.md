# package tokenizer

```vertex
import "text/tokenizer"
```

Package tokenizer turns text into a model's token ids and back. It is
data-driven: a vocabulary read from a model's files (a GGUF's
tokenizer.ggml.* keys, a tokenizer.json) says everything, and no model
family has code here.

SentencePiece is the tokenizer of Llama 1 and 2, Mistral's first models
and many more: score-ordered merges of adjacent pieces, with bytes as
the fallback. It is llama.cpp's llm_tokenizer_spm, rule for rule.

## Index

- [`func ReadSentencePieceModel(_ bytes: [uint8]) throws -> Vocabulary`](#func-ReadSentencePieceModel)
- [`func ReadTokenizerJSON(_ bytes: [uint8], config: [uint8]? = nil) throws -> Tokenizer`](#func-ReadTokenizerJSON)
- [`enum Algorithm`](#enum-Algorithm)
- [`final class BPE`](#class-BPE)
  - [`init(_ vocab: Vocabulary, split: Split, ignoreMerges: bool? = nil)`](#BPE.init)
  - [`let Vocab: Vocabulary`](#BPE.Vocab)
  - [`let Split: Split`](#BPE.Split)
  - [`let IgnoreMerges: bool`](#BPE.IgnoreMerges)
  - [`var Count: int { get }`](#BPE.Count)
  - [`func Encode(_ text: string, addSpecial: bool = true) -> [int]`](#BPE.Encode)
  - [`func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string`](#BPE.Decode)
- [`enum Kind: int`](#enum-Kind)
- [`enum ModelError: Error, CustomStringConvertible`](#enum-ModelError)
  - [`var description: string { get }`](#ModelError.description)
- [`final class SentencePiece`](#class-SentencePiece)
  - [`init(_ vocab: Vocabulary)`](#SentencePiece.init)
  - [`let Vocab: Vocabulary`](#SentencePiece.Vocab)
  - [`var Count: int { get }`](#SentencePiece.Count)
  - [`func Token(_ text: string) -> int?`](#SentencePiece.Token)
  - [`func Encode(_ text: string, addSpecial: bool = true) -> [int]`](#SentencePiece.Encode)
  - [`func Piece(_ id: int, special: bool = false) -> [uint8]`](#SentencePiece.Piece)
  - [`func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string`](#SentencePiece.Decode)
- [`enum Split: Equatable`](#enum-Split)
  - [`static func Named(_ pre: string) -> Split?`](#Split.Named)
- [`final class Tokenizer`](#class-Tokenizer)
  - [`init(_ algorithm: Algorithm)`](#Tokenizer.init)
  - [`let Algorithm: Algorithm`](#Tokenizer.Algorithm)
  - [`var Vocab: Vocabulary { get }`](#Tokenizer.Vocab)
  - [`var Count: int { get }`](#Tokenizer.Count)
  - [`static func SentencePiece(_ vocab: Vocabulary) -> Tokenizer`](#Tokenizer.SentencePiece)
  - [`static func BPE(_ vocab: Vocabulary, split: Split, ignoreMerges: bool? = nil) -> Tokenizer`](#Tokenizer.BPE)
  - [`func Encode(_ text: string, addSpecial: bool = true) -> [int]`](#Tokenizer.Encode)
  - [`func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string`](#Tokenizer.Decode)
- [`struct Vocabulary`](#struct-Vocabulary)
  - [`init(tokens: [string], scores: [float32], kinds: [Kind], bos: int? = nil, eos: int? = nil, unknown: int? = nil, addBos: bool = true, addEos: bool = false, addSpacePrefix: bool = true)`](#Vocabulary.init)
  - [`var Tokens: [string]`](#Vocabulary.Tokens)
  - [`var Scores: [float32]`](#Vocabulary.Scores)
  - [`var Kinds: [Kind]`](#Vocabulary.Kinds)
  - [`var Bos: int?`](#Vocabulary.Bos)
  - [`var Eos: int?`](#Vocabulary.Eos)
  - [`var Unknown: int?`](#Vocabulary.Unknown)
  - [`var AddBos: bool`](#Vocabulary.AddBos)
  - [`var AddEos: bool`](#Vocabulary.AddEos)
  - [`var AddSpacePrefix: bool`](#Vocabulary.AddSpacePrefix)
  - [`var Merges: [string] = []`](#Vocabulary.Merges)

## Functions

### func ReadSentencePieceModel <a id="func-ReadSentencePieceModel"></a>

```vertex
public func ReadSentencePieceModel(_ bytes: [uint8]) throws -> Vocabulary
```

ReadSentencePieceModel is the vocabulary in a SentencePiece model file
(tokenizer.model: a ModelProto, protobuf): each piece's text, score and
type, the unknown, BOS and EOS ids from its trainer spec, and whether
its normalizer adds the dummy prefix. Adding BOS and EOS is not in the
file; the defaults are Llama's (BOS, no EOS), and a caller with a
tokenizer_config.json sets them from it.

### func ReadTokenizerJSON <a id="func-ReadTokenizerJSON"></a>

```vertex
public func ReadTokenizerJSON(_ bytes: [uint8], config: [uint8]? = nil) throws -> Tokenizer
```

ReadTokenizerJSON is the tokenizer a Hugging Face tokenizer.json holds,
with what tokenizer_config.json (when given) says of BOS, EOS and adding
them. It reads byte-level BPE -- the tokenizer of GPT-2, Llama 3, Qwen,
SmolLM and most models since -- with the pre-tokenizers Split names;
anything else is refused, saying what it is.

## Types

### enum Algorithm <a id="enum-Algorithm"></a>

```vertex
public enum Algorithm
```

Algorithm is how a vocabulary turns text into tokens.

#### Cases

<a id="Algorithm.sentencePiece"></a>

```vertex
case sentencePiece(SentencePiece)
```

SentencePiece's score-ordered merges with byte fallback: Llama 1
and 2, Mistral's first models, T5.

<a id="Algorithm.bpe"></a>

```vertex
case bpe(BPE)
```

Byte-level BPE, GPT-2's: GPT-2, Llama 3, Qwen, SmolLM, Mistral's
newer models, most models since.

### class BPE <a id="class-BPE"></a>

```vertex
public final class BPE
```

BPE is byte-level byte-pair encoding, GPT-2's: text cut into words by
its Split, each word's bytes spelled as printable characters (GPT-2's
bytes_to_unicode), then merged pairwise, the lowest-ranked merge first,
into the vocabulary's tokens. It is llama.cpp's llm_tokenizer_bpe, rule
for rule, for the splits it names.

#### Initializers

<a id="BPE.init"></a>

```vertex
public init(_ vocab: Vocabulary, split: Split, ignoreMerges: bool? = nil)
```

#### Properties

<a id="BPE.Vocab"></a>

```vertex
public let Vocab: Vocabulary
```

<a id="BPE.Split"></a>

```vertex
public let Split: Split
```

<a id="BPE.IgnoreMerges"></a>

```vertex
public let IgnoreMerges: bool
```

IgnoreMerges takes a word that is a token whole, without merging:
Llama 3's tokenizer.json "ignore_merges".

<a id="BPE.Count"></a>

```vertex
public var Count: int { get }
```

#### Methods

<a id="BPE.Encode"></a>

```vertex
public func Encode(_ text: string, addSpecial: bool = true) -> [int]
```

Encode is text's tokens; with addSpecial, the Bos and Eos the
vocabulary says to add go around them.

<a id="BPE.Decode"></a>

```vertex
public func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string
```

Decode is the text of ids: each token's characters taken back to
the bytes they spell. With removeSpecial, the Bos and Eos encoding
added are dropped; control tokens are skipped unless special.

### enum Kind <a id="enum-Kind"></a>

```vertex
public enum Kind: int
```

Kind is what a token is, by the numbers GGUF's tokenizer.ggml.token_type
and SentencePiece's model give them.

#### Cases

<a id="Kind.Normal"></a>

```vertex
case Normal = 1
```

<a id="Kind.Unknown"></a>

```vertex
case Unknown = 2
```

<a id="Kind.Control"></a>

```vertex
case Control = 3
```

<a id="Kind.UserDefined"></a>

```vertex
case UserDefined = 4
```

<a id="Kind.Unused"></a>

```vertex
case Unused = 5
```

<a id="Kind.Byte"></a>

```vertex
case Byte = 6
```

### enum ModelError <a id="enum-ModelError"></a>

```vertex
public enum ModelError: Error, CustomStringConvertible
```

ModelError is a tokenizer file that could not be read, and why.

#### Cases

<a id="ModelError.malformed"></a>

```vertex
case malformed(string)
```

#### Properties

<a id="ModelError.description"></a>

```vertex
public var description: string { get }
```

### class SentencePiece <a id="class-SentencePiece"></a>

```vertex
public final class SentencePiece
```

SentencePiece encodes and decodes with a vocabulary.

#### Initializers

<a id="SentencePiece.init"></a>

```vertex
public init(_ vocab: Vocabulary)
```

#### Properties

<a id="SentencePiece.Vocab"></a>

```vertex
public let Vocab: Vocabulary
```

<a id="SentencePiece.Count"></a>

```vertex
public var Count: int { get }
```

Count is how many tokens the vocabulary has.

#### Methods

<a id="SentencePiece.Token"></a>

```vertex
public func Token(_ text: string) -> int?
```

Token is the id whose text is exactly text, or nil.

<a id="SentencePiece.Encode"></a>

```vertex
public func Encode(_ text: string, addSpecial: bool = true) -> [int]
```

Encode is text's tokens. With addSpecial, the vocabulary's Bos and
Eos go around them as it says to add them. Special tokens written in
the text are text, not tokens.

<a id="SentencePiece.Piece"></a>

```vertex
public func Piece(_ id: int, special: bool = false) -> [uint8]
```

Piece is a token's bytes as text: '▁' a space, a byte token its
byte. A control or unknown token is nothing unless special, and then
its text. Bytes, since one character may take several byte tokens.

<a id="SentencePiece.Decode"></a>

```vertex
public func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string
```

Decode is the text of tokens, as llama.cpp's llama_detokenize makes
it: the dummy prefix's space is taken off the first piece, and with
removeSpecial a leading Bos (and trailing Eos) that encoding added
are dropped.

### enum Split <a id="enum-Split"></a>

```vertex
public enum Split: Equatable
```

Split is how text is cut into words before byte-level BPE merges
within each: the pre-tokenizer regex of the model's tokenizer.json,
as llama.cpp implements each by hand (src/unicode.cpp).

#### Cases

<a id="Split.gpt2"></a>

```vertex
case gpt2
```

GPT-2's: 's|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)
(GPT-2, OLMo, MPT, …).

<a id="Split.digitsThenGPT2"></a>

```vertex
case digitsThenGPT2
```

GPT-2's after each digit is cut off alone (\p{N} first): SmolLM,
StarCoder, Command R, ….

<a id="Split.llama3"></a>

```vertex
case llama3
```

Llama 3's: case-insensitive contractions, [^\r\n\p{L}\p{N}]?\p{L}+,
\p{N}{1,3}, ?[^\s\p{L}\p{N}]+[\r\n]*, \s*[\r\n]+, \s+(?!\S), \s+.

<a id="Split.qwen2"></a>

```vertex
case qwen2
```

Qwen 2's: Llama 3's with one digit at a time.

#### Methods

<a id="Split.Named"></a>

```vertex
public static func Named(_ pre: string) -> Split?
```

Named is the Split for a GGUF tokenizer.ggml.pre, or nil for one this
does not implement.

### class Tokenizer <a id="class-Tokenizer"></a>

```vertex
public final class Tokenizer
```

Tokenizer is a model's tokenizer, whatever its algorithm: what a model
holds, and never asks which. (Byte-level BPE and WordPiece join
Algorithm as models need them.)

#### Initializers

<a id="Tokenizer.init"></a>

```vertex
public init(_ algorithm: Algorithm)
```

#### Properties

<a id="Tokenizer.Algorithm"></a>

```vertex
public let Algorithm: Algorithm
```

<a id="Tokenizer.Vocab"></a>

```vertex
public var Vocab: Vocabulary { get }
```

Vocab is its tokens and special ids.

<a id="Tokenizer.Count"></a>

```vertex
public var Count: int { get }
```

Count is how many tokens there are.

#### Methods

<a id="Tokenizer.SentencePiece"></a>

```vertex
public static func SentencePiece(_ vocab: Vocabulary) -> Tokenizer
```

SentencePiece is a SentencePiece tokenizer of vocab.

<a id="Tokenizer.BPE"></a>

```vertex
public static func BPE(_ vocab: Vocabulary, split: Split, ignoreMerges: bool? = nil) -> Tokenizer
```

BPE is a byte-level BPE tokenizer of vocab, its words cut by split.

<a id="Tokenizer.Encode"></a>

```vertex
public func Encode(_ text: string, addSpecial: bool = true) -> [int]
```

Encode is text's tokens; with addSpecial, the Bos and Eos the
vocabulary says to add go around them.

<a id="Tokenizer.Decode"></a>

```vertex
public func Decode(_ ids: [int], removeSpecial: bool = false, special: bool = false) -> string
```

Decode is the text of ids. With removeSpecial, the Bos and Eos that
encoding added are dropped; with special, control tokens are
written out rather than skipped.

### struct Vocabulary <a id="struct-Vocabulary"></a>

```vertex
public struct Vocabulary
```

Vocabulary is a tokenizer's data: each token's text, score and kind by
id, the special tokens, and what encoding adds around the text.

#### Initializers

<a id="Vocabulary.init"></a>

```vertex
public init(tokens: [string], scores: [float32], kinds: [Kind], bos: int? = nil, eos: int? = nil,
            unknown: int? = nil, addBos: bool = true, addEos: bool = false, addSpacePrefix: bool = true)
```

#### Properties

<a id="Vocabulary.Tokens"></a>

```vertex
public var Tokens: [string]
```

<a id="Vocabulary.Scores"></a>

```vertex
public var Scores: [float32]
```

<a id="Vocabulary.Kinds"></a>

```vertex
public var Kinds: [Kind]
```

<a id="Vocabulary.Bos"></a>

```vertex
public var Bos: int?
```

<a id="Vocabulary.Eos"></a>

```vertex
public var Eos: int?
```

<a id="Vocabulary.Unknown"></a>

```vertex
public var Unknown: int?
```

<a id="Vocabulary.AddBos"></a>

```vertex
public var AddBos: bool
```

AddBos is whether Encode puts Bos first (when it adds specials).

<a id="Vocabulary.AddEos"></a>

```vertex
public var AddEos: bool
```

AddEos is whether Encode puts Eos last (when it adds specials).

<a id="Vocabulary.AddSpacePrefix"></a>

```vertex
public var AddSpacePrefix: bool
```

AddSpacePrefix is SentencePiece's dummy prefix: a space before the
text, so a first word is spelled as every other word is.

<a id="Vocabulary.Merges"></a>

```vertex
public var Merges: [string] = []
```

Merges are BPE's merge rules, "left right", in rank order; empty for
SentencePiece.

## Files

- bpe.vs
- hfjson.vs
- sentencepiece.vs
- spmodel.vs
- tokenizer.vs
- vocabulary.vs
