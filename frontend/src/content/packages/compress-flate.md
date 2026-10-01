# package flate

```vertex
import "compress/flate"
```

## Index

- [`func Compress(_ data: [uint8]) -> [uint8]`](#func-Compress)
- [`func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]`](#func-Decompress)
- [`final class Decoder`](#class-Decoder)
  - [`init()`](#Decoder.init)
  - [`static let lowWater: int = 1024`](#Decoder.lowWater)
  - [`var Buffered: int { get }`](#Decoder.Buffered)
  - [`var InputEnded: bool { get }`](#Decoder.InputEnded)
  - [`var Done: bool { get }`](#Decoder.Done)
  - [`var Written: int { get }`](#Decoder.Written)
  - [`func Feed(_ bytes: [uint8], count n: int)`](#Decoder.Feed)
  - [`func EndInput()`](#Decoder.EndInput)
  - [`func Reset()`](#Decoder.Reset)
  - [`func ReadByte() -> uint8?`](#Decoder.ReadByte)
  - [`func Read(into buffer: inout [uint8]) throws -> int`](#Decoder.Read)
- [`enum FlateError: Error, Equatable, CustomStringConvertible`](#enum-FlateError)
  - [`var description: string { get }`](#FlateError.description)
- [`struct Inflater<R: io.Reader>: io.Reader`](#struct-Inflater)
  - [`init(_ inner: R)`](#Inflater.init)
  - [`var Inner: R`](#Inflater.Inner)
  - [`let Decoder: Decoder`](#Inflater.Decoder)
  - [`var Written: int { get }`](#Inflater.Written)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Inflater.Read)
  - [`mutating func ReadByte() throws -> uint8?`](#Inflater.ReadByte)
  - [`mutating func Reset()`](#Inflater.Reset)
- [`struct Reader<R: io.Reader>: io.Reader`](#struct-Reader)
  - [`init(_ inner: R)`](#Reader.init)
  - [`var Inner: R { get }`](#Reader.Inner)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
- [`struct Writer<W: io.Writer>: io.Writer, io.Closer`](#struct-Writer)
  - [`init(_ inner: W)`](#Writer.init)
  - [`var Inner: W`](#Writer.Inner)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)
  - [`mutating func Close() throws`](#Writer.Close)

## Functions

### func Compress <a id="func-Compress"></a>

```vertex
public func Compress(_ data: [uint8]) -> [uint8]
```

Compresses uncompressed data into raw RFC 1951 DEFLATE bytes using fixed Huffman codes.

### func Decompress <a id="func-Decompress"></a>

```vertex
public func Decompress(_ data: [uint8], sizeHint: int = 0) throws -> [uint8]
```

Decompresses raw RFC 1951 DEFLATE bytes into uncompressed data.

## Types

### class Decoder <a id="class-Decoder"></a>

```vertex
public final class Decoder
```

Decoder decompresses raw DEFLATE fed to it a piece at a time, keeping
only the last 32 KiB of output -- the most a back-reference reaches --
so memory stays the same however long the stream is.

Feed it input and Read output. Read stops while less than `lowWater`
bytes of input are buffered, so that no step it takes -- a symbol, a
block's code tables -- runs out part way; once EndInput says no more
is coming it decodes to the end, and running out is then an error.
Inflater does the feeding from an io.Reader.

#### Initializers

<a id="Decoder.init"></a>

```vertex
public init()
```

#### Properties

<a id="Decoder.lowWater"></a>

```vertex
public static let lowWater: int = 1024
```

What Read wants buffered before each step, unless the input has
ended: more than a dynamic block's tables can take.

<a id="Decoder.Buffered"></a>

```vertex
public var Buffered: int { get }
```

Input buffered and not yet decoded, in bytes.

<a id="Decoder.InputEnded"></a>

```vertex
public var InputEnded: bool { get }
```

Whether EndInput has been called.

<a id="Decoder.Done"></a>

```vertex
public var Done: bool { get }
```

Whether the final block has been decoded.

<a id="Decoder.Written"></a>

```vertex
public var Written: int { get }
```

How many bytes this stream has decompressed to so far.

#### Methods

<a id="Decoder.Feed"></a>

```vertex
public func Feed(_ bytes: [uint8], count n: int)
```

Adds the first `n` bytes of `bytes` to the input.

<a id="Decoder.EndInput"></a>

```vertex
public func EndInput()
```

Says no more input is coming.

<a id="Decoder.Reset"></a>

```vertex
public func Reset()
```

Starts a new stream where this one ended, on the input after it:
the next member of a multi-member gzip file.

<a id="Decoder.ReadByte"></a>

```vertex
public func ReadByte() -> uint8?
```

The next input byte outside the compressed stream -- before it
starts (a header) or after it ends (a trailer) -- or nil where
none is buffered.

<a id="Decoder.Read"></a>

```vertex
public func Read(into buffer: inout [uint8]) throws -> int
```

Decodes into `buffer`, returning how many bytes it wrote: fewer
than it holds where the stream is done or more input is wanted.

### enum FlateError <a id="enum-FlateError"></a>

```vertex
public enum FlateError: Error, Equatable, CustomStringConvertible
```

Errors encountered while decompressing or compressing RFC 1951 raw DEFLATE streams.

#### Cases

<a id="FlateError.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

<a id="FlateError.badData"></a>

```vertex
case badData(string)
```

<a id="FlateError.reservedBlockType"></a>

```vertex
case reservedBlockType
```

<a id="FlateError.badHuffmanCode"></a>

```vertex
case badHuffmanCode
```

<a id="FlateError.distanceOutOfBounds"></a>

```vertex
case distanceOutOfBounds
```

#### Properties

<a id="FlateError.description"></a>

```vertex
public var description: string { get }
```

### struct Inflater <a id="struct-Inflater"></a>

```vertex
public struct Inflater<R: io.Reader>: io.Reader
```

Inflater decompresses a raw DEFLATE stream as it is read from `Inner`,
with a Decoder's constant memory. Once the stream's final block is
done Read returns 0, and the bytes after it -- a gzip trailer, the
next member -- are what ReadByte gives.

#### Initializers

<a id="Inflater.init"></a>

```vertex
public init(_ inner: R)
```

#### Properties

<a id="Inflater.Inner"></a>

```vertex
public var Inner: R
```

<a id="Inflater.Decoder"></a>

```vertex
public let Decoder: Decoder
```

<a id="Inflater.Written"></a>

```vertex
public var Written: int { get }
```

How many bytes this stream has decompressed to so far.

#### Methods

<a id="Inflater.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

<a id="Inflater.ReadByte"></a>

```vertex
public mutating func ReadByte() throws -> uint8?
```

The next byte of input outside the compressed stream, or nil at
the end of the input.

<a id="Inflater.Reset"></a>

```vertex
public mutating func Reset()
```

Starts a new stream on the input after this one.

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader<R: io.Reader>: io.Reader
```

Reader decompresses an RFC 1951 raw DEFLATE stream as it is read,
holding a 32 KiB window rather than the whole output: see Inflater.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ inner: R)
```

#### Properties

<a id="Reader.Inner"></a>

```vertex
public var Inner: R { get }
```

#### Methods

<a id="Reader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer<W: io.Writer>: io.Writer, io.Closer
```

Writer compresses uncompressed bytes into an RFC 1951 raw DEFLATE stream.

#### Initializers

<a id="Writer.init"></a>

```vertex
public init(_ inner: W)
```

#### Properties

<a id="Writer.Inner"></a>

```vertex
public var Inner: W
```

#### Methods

<a id="Writer.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="Writer.Flush"></a>

```vertex
public mutating func Flush() throws
```

<a id="Writer.Close"></a>

```vertex
public mutating func Close() throws
```

## Files

- deflate.vs
- error.vs
- inflate.vs
- reader.vs
- stream.vs
- writer.vs
