# package io

```vertex
import "io"
```

## Index

- [Constants](#constants)
- [Variables](#variables)
- [`func Bytes(_ text: string) -> [uint8]`](#func-Bytes)
- [`func Chain<A: Reader, B: Reader>(_ first: A, _ second: B) -> ChainReader<A, B>`](#func-Chain)
- [`func Copy<R: Reader, W: Writer>(from r: inout R, to w: inout W) throws -> int64`](#func-Copy)
- [`func Copy<R: AsyncReader, W: AsyncWriter>(from r: inout R, to w: inout W) async throws -> int64`](#func-Copy-2)
- [`func Copy<R: AsyncReader, W: Writer>(from r: inout R, to w: inout W) async throws -> int64`](#func-Copy-3)
- [`func Copy<R: Reader, W: AsyncWriter>(from r: inout R, to w: inout W) async throws -> int64`](#func-Copy-4)
- [`func Limit<R: Reader>(_ r: R, _ limit: int) -> LimitReader<R>`](#func-Limit)
- [`func ReadFull<R: Reader>(_ r: inout R, into buffer: inout [uint8]) throws`](#func-ReadFull)
- [`func ReadFull<R: AsyncReader>(_ r: inout R, into buffer: inout [uint8]) async throws`](#func-ReadFull-2)
- [`func ReadText<R: Reader>(_ r: inout R, limit: int = 64 * 1024 * 1024) throws -> string`](#func-ReadText)
- [`func ReadText<R: AsyncReader>(_ r: inout R, limit: int = 64 * 1024 * 1024) async throws -> string`](#func-ReadText-2)
- [`func ReadToEnd<R: Reader>(_ r: inout R, limit: int = 64 * 1024 * 1024) throws -> [uint8]`](#func-ReadToEnd)
- [`func ReadToEnd<R: AsyncReader>(_ r: inout R, limit: int = 64 * 1024 * 1024) async throws -> [uint8]`](#func-ReadToEnd-2)
- [`func Tee<R: Reader, W: Writer>(_ r: R, to w: W) -> TeeReader<R, W>`](#func-Tee)
- [`func Text(_ bytes: [uint8]) -> string`](#func-Text)
- [`func WriteText<W: Writer>(_ w: inout W, _ text: string) throws`](#func-WriteText)
- [`func WriteText<W: AsyncWriter>(_ w: inout W, _ text: string) async throws`](#func-WriteText-2)
- [`struct AsyncBufferedReader<R: AsyncReader>: AsyncReader`](#struct-AsyncBufferedReader)
  - [`init(_ inner: R, capacity: int = 65536)`](#AsyncBufferedReader.init)
  - [`var Inner: R`](#AsyncBufferedReader.Inner)
  - [`var Buffered: int { get }`](#AsyncBufferedReader.Buffered)
  - [`mutating func Read(into buffer: inout [uint8]) async throws -> int`](#AsyncBufferedReader.Read)
  - [`mutating func Peek(_ n: int) async throws -> [uint8]`](#AsyncBufferedReader.Peek)
  - [`mutating func ReadUntil(_ delimiter: uint8) async throws -> [uint8]?`](#AsyncBufferedReader.ReadUntil)
  - [`mutating func ReadLine() async throws -> string?`](#AsyncBufferedReader.ReadLine)
- [`struct AsyncBufferedWriter<W: AsyncWriter>: AsyncWriter`](#struct-AsyncBufferedWriter)
  - [`init(_ inner: W, capacity: int = 65536)`](#AsyncBufferedWriter.init)
  - [`var Inner: W`](#AsyncBufferedWriter.Inner)
  - [`mutating func Write(_ bytes: borrowing [uint8]) async throws`](#AsyncBufferedWriter.Write)
  - [`mutating func Flush() async throws`](#AsyncBufferedWriter.Flush)
- [`struct AsyncLines<R: AsyncReader>: AsyncSequence, AsyncIteratorProtocol`](#struct-AsyncLines)
  - [`init(_ inner: R)`](#AsyncLines.init)
  - [`mutating func next() async throws -> string?`](#AsyncLines.next)
  - [`func makeAsyncIterator() -> AsyncLines<R>`](#AsyncLines.makeAsyncIterator)
- [`protocol AsyncReader`](#protocol-AsyncReader)
  - [`mutating func Read(into buffer: inout [uint8]) async throws -> int`](#AsyncReader.Read)
- [`protocol AsyncWriter`](#protocol-AsyncWriter)
  - [`mutating func Write(_ bytes: borrowing [uint8]) async throws`](#AsyncWriter.Write)
  - [`mutating func Flush() async throws`](#AsyncWriter.Flush)
- [`struct BufferedReader<R: Reader>: Reader`](#struct-BufferedReader)
  - [`init(_ inner: R, capacity: int = 65536)`](#BufferedReader.init)
  - [`var Inner: R`](#BufferedReader.Inner)
  - [`var Buffered: int { get }`](#BufferedReader.Buffered)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#BufferedReader.Read)
  - [`mutating func Peek(_ n: int) throws -> [uint8]`](#BufferedReader.Peek)
  - [`mutating func ReadUntil(_ delimiter: uint8) throws -> [uint8]?`](#BufferedReader.ReadUntil)
  - [`mutating func ReadLine() throws -> string?`](#BufferedReader.ReadLine)
- [`struct BufferedWriter<W: Writer>: Writer`](#struct-BufferedWriter)
  - [`init(_ inner: W, capacity: int = 65536)`](#BufferedWriter.init)
  - [`var Inner: W`](#BufferedWriter.Inner)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#BufferedWriter.Write)
  - [`mutating func Flush() throws`](#BufferedWriter.Flush)
- [`struct ChainReader<A: Reader, B: Reader>: Reader`](#struct-ChainReader)
  - [`init(_ first: A, _ second: B)`](#ChainReader.init)
  - [`var First: A`](#ChainReader.First)
  - [`var Second: B`](#ChainReader.Second)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#ChainReader.Read)
- [`protocol Closer`](#protocol-Closer)
  - [`mutating func Close() throws`](#Closer.Close)
- [`struct Cursor: Reader, Writer, Seeker`](#struct-Cursor)
  - [`init()`](#Cursor.init)
  - [`init(_ bytes: [uint8])`](#Cursor.init-2)
  - [`var Bytes: [uint8]`](#Cursor.Bytes)
  - [`var Position: int`](#Cursor.Position)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Cursor.Read)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Cursor.Write)
  - [`mutating func Flush() throws`](#Cursor.Flush)
  - [`mutating func Seek(_ to: SeekFrom) throws -> int64`](#Cursor.Seek)
- [`struct DiscardWriter: Writer`](#struct-DiscardWriter)
  - [`init()`](#DiscardWriter.init)
  - [`var Count: int64`](#DiscardWriter.Count)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#DiscardWriter.Write)
  - [`mutating func Flush() throws`](#DiscardWriter.Flush)
- [`enum IoError: Error, Equatable, CustomStringConvertible`](#enum-IoError)
  - [`var description: string { get }`](#IoError.description)
- [`struct LimitReader<R: Reader>: Reader`](#struct-LimitReader)
  - [`init(_ inner: R, _ limit: int)`](#LimitReader.init)
  - [`var Inner: R`](#LimitReader.Inner)
  - [`var Remaining: int`](#LimitReader.Remaining)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#LimitReader.Read)
- [`protocol Reader`](#protocol-Reader)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#Reader.Read)
- [`enum SeekFrom: Equatable`](#enum-SeekFrom)
- [`protocol Seeker`](#protocol-Seeker)
  - [`mutating func Seek(_ to: SeekFrom) throws -> int64`](#Seeker.Seek)
- [`struct TeeReader<R: Reader, W: Writer>: Reader`](#struct-TeeReader)
  - [`init(_ inner: R, to writer: W)`](#TeeReader.init)
  - [`var Inner: R`](#TeeReader.Inner)
  - [`var Output: W`](#TeeReader.Output)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#TeeReader.Read)
- [`protocol Writer`](#protocol-Writer)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#Writer.Write)
  - [`mutating func Flush() throws`](#Writer.Flush)

## Constants

<a id="let-DefaultLimit"></a>

```vertex
public let DefaultLimit: int = 64 * 1024 * 1024
```

The limit `ReadToEnd` and `ReadText` use when none is given: 64 MiB.
A peer that never stops sending is a denial of service, so reading to
the end always has one.

## Variables

<a id="var-Discard"></a>

```vertex
public var Discard: DiscardWriter { get }
```

A writer that drops what it is given.

## Functions

### func Bytes <a id="func-Bytes"></a>

```vertex
public func Bytes(_ text: string) -> [uint8]
```

The UTF-8 bytes of `text`.

### func Chain <a id="func-Chain"></a>

```vertex
public func Chain<A: Reader, B: Reader>(_ first: A, _ second: B) -> ChainReader<A, B>
```

A reader of `first` and then `second`.

### func Copy <a id="func-Copy"></a>

```vertex
public func Copy<R: Reader, W: Writer>(from r: inout R, to w: inout W) throws -> int64
```

Copies everything from `r` to `w` until `r` ends, a chunk at a time,
and returns how many bytes it copied. It does not flush `w`.

### func Copy <a id="func-Copy-2"></a>

```vertex
public func Copy<R: AsyncReader, W: AsyncWriter>(from r: inout R, to w: inout W) async throws -> int64
```

Copies an async stream to an async sink: a socket to a pipe.

### func Copy <a id="func-Copy-3"></a>

```vertex
public func Copy<R: AsyncReader, W: Writer>(from r: inout R, to w: inout W) async throws -> int64
```

Copies an async stream to a sync sink: hashing or saving a download.

### func Copy <a id="func-Copy-4"></a>

```vertex
public func Copy<R: Reader, W: AsyncWriter>(from r: inout R, to w: inout W) async throws -> int64
```

Copies a sync stream to an async sink: sending a file down a socket.

### func Limit <a id="func-Limit"></a>

```vertex
public func Limit<R: Reader>(_ r: R, _ limit: int) -> LimitReader<R>
```

A reader of at most `limit` bytes of `r`.

### func ReadFull <a id="func-ReadFull"></a>

```vertex
public func ReadFull<R: Reader>(_ r: inout R, into buffer: inout [uint8]) throws
```

Fills all of `buffer`, reading as many times as it takes. Throws
`IoError.unexpectedEnd` where the stream ends first.

### func ReadFull <a id="func-ReadFull-2"></a>

```vertex
public func ReadFull<R: AsyncReader>(_ r: inout R, into buffer: inout [uint8]) async throws
```

Fills all of `buffer` from an async stream; see the sync form.

### func ReadText <a id="func-ReadText"></a>

```vertex
public func ReadText<R: Reader>(_ r: inout R, limit: int = 64 * 1024 * 1024) throws -> string
```

Everything until the end of the stream, as UTF-8 text.

### func ReadText <a id="func-ReadText-2"></a>

```vertex
public func ReadText<R: AsyncReader>(_ r: inout R, limit: int = 64 * 1024 * 1024) async throws -> string
```

Everything until the end of an async stream, as UTF-8 text.

### func ReadToEnd <a id="func-ReadToEnd"></a>

```vertex
public func ReadToEnd<R: Reader>(_ r: inout R, limit: int = 64 * 1024 * 1024) throws -> [uint8]
```

Everything until the end of the stream. Throws `IoError.tooLarge` past
`limit` bytes (64 MiB where none is given).

### func ReadToEnd <a id="func-ReadToEnd-2"></a>

```vertex
public func ReadToEnd<R: AsyncReader>(_ r: inout R, limit: int = 64 * 1024 * 1024) async throws -> [uint8]
```

Everything until the end of an async stream; see the sync form.

### func Tee <a id="func-Tee"></a>

```vertex
public func Tee<R: Reader, W: Writer>(_ r: R, to w: W) -> TeeReader<R, W>
```

A reader of `r` that also writes what it reads to `w`.

### func Text <a id="func-Text"></a>

```vertex
public func Text(_ bytes: [uint8]) -> string
```

`bytes` as UTF-8 text.

### func WriteText <a id="func-WriteText"></a>

```vertex
public func WriteText<W: Writer>(_ w: inout W, _ text: string) throws
```

Writes `text` as UTF-8.

### func WriteText <a id="func-WriteText-2"></a>

```vertex
public func WriteText<W: AsyncWriter>(_ w: inout W, _ text: string) async throws
```

Writes `text` as UTF-8 to an async stream.

## Types

### struct AsyncBufferedReader <a id="struct-AsyncBufferedReader"></a>

```vertex
public struct AsyncBufferedReader<R: AsyncReader>: AsyncReader
```

AsyncBufferedReader is `BufferedReader` over an `AsyncReader`: what
reads a socket or a pipe a line at a time.

#### Initializers

<a id="AsyncBufferedReader.init"></a>

```vertex
public init(_ inner: R, capacity: int = 65536)
```

#### Properties

<a id="AsyncBufferedReader.Inner"></a>

```vertex
public var Inner: R
```

<a id="AsyncBufferedReader.Buffered"></a>

```vertex
public var Buffered: int { get }
```

#### Methods

<a id="AsyncBufferedReader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) async throws -> int
```

<a id="AsyncBufferedReader.Peek"></a>

```vertex
public mutating func Peek(_ n: int) async throws -> [uint8]
```

<a id="AsyncBufferedReader.ReadUntil"></a>

```vertex
public mutating func ReadUntil(_ delimiter: uint8) async throws -> [uint8]?
```

<a id="AsyncBufferedReader.ReadLine"></a>

```vertex
public mutating func ReadLine() async throws -> string?
```

### struct AsyncBufferedWriter <a id="struct-AsyncBufferedWriter"></a>

```vertex
public struct AsyncBufferedWriter<W: AsyncWriter>: AsyncWriter
```

AsyncBufferedWriter is `BufferedWriter` over an `AsyncWriter`.

#### Initializers

<a id="AsyncBufferedWriter.init"></a>

```vertex
public init(_ inner: W, capacity: int = 65536)
```

#### Properties

<a id="AsyncBufferedWriter.Inner"></a>

```vertex
public var Inner: W
```

#### Methods

<a id="AsyncBufferedWriter.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) async throws
```

<a id="AsyncBufferedWriter.Flush"></a>

```vertex
public mutating func Flush() async throws
```

### struct AsyncLines <a id="struct-AsyncLines"></a>

```vertex
public struct AsyncLines<R: AsyncReader>: AsyncSequence, AsyncIteratorProtocol
```

AsyncLines is a reader's lines, one at a time, without their line
endings: `for try await line in io.AsyncLines(reader) { … }`.

#### Initializers

<a id="AsyncLines.init"></a>

```vertex
public init(_ inner: R)
```

#### Methods

<a id="AsyncLines.next"></a>

```vertex
public mutating func next() async throws -> string?
```

The next line, or nil at the end of the stream.

<a id="AsyncLines.makeAsyncIterator"></a>

```vertex
public func makeAsyncIterator() -> AsyncLines<R>
```

### protocol AsyncReader <a id="protocol-AsyncReader"></a>

```vertex
public protocol AsyncReader
```

AsyncReader is a source of bytes whose reads may have to wait -- a
socket, a pipe -- and park the task while they do.

#### Methods

<a id="AsyncReader.Read"></a>

```vertex
mutating func Read(into buffer: inout [uint8]) async throws -> int
```

As `Reader.Read`: 0 is the end of the stream.

### protocol AsyncWriter <a id="protocol-AsyncWriter"></a>

```vertex
public protocol AsyncWriter
```

AsyncWriter is a sink of bytes whose writes may have to wait.

#### Methods

<a id="AsyncWriter.Write"></a>

```vertex
mutating func Write(_ bytes: borrowing [uint8]) async throws
```

Writes all of `bytes`, or throws.

<a id="AsyncWriter.Flush"></a>

```vertex
mutating func Flush() async throws
```

Sends on whatever is buffered.

### struct BufferedReader <a id="struct-BufferedReader"></a>

```vertex
public struct BufferedReader<R: Reader>: Reader
```

BufferedReader reads the stream it wraps a large chunk at a time, and
hands it out in the pieces asked for: a line, up to a delimiter, a
peek at what comes next. Rust's `BufReader`, Go's `bufio.Reader`.

```vertex
var r = io.BufferedReader(file)
while let line = try r.ReadLine() { … }
```

#### Initializers

<a id="BufferedReader.init"></a>

```vertex
public init(_ inner: R, capacity: int = 65536)
```

Wraps `inner`, reading `capacity` bytes at a time (64 KiB by default).

#### Properties

<a id="BufferedReader.Inner"></a>

```vertex
public var Inner: R
```

The stream underneath.

<a id="BufferedReader.Buffered"></a>

```vertex
public var Buffered: int { get }
```

How many bytes are read ahead and waiting.

#### Methods

<a id="BufferedReader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

<a id="BufferedReader.Peek"></a>

```vertex
public mutating func Peek(_ n: int) throws -> [uint8]
```

The next `n` bytes without consuming them: fewer only at the end of
the stream. `n` is at most the capacity.

<a id="BufferedReader.ReadUntil"></a>

```vertex
public mutating func ReadUntil(_ delimiter: uint8) throws -> [uint8]?
```

The bytes up to and including `delimiter`, or what is left where the
stream ends first; nil at the end of the stream.

<a id="BufferedReader.ReadLine"></a>

```vertex
public mutating func ReadLine() throws -> string?
```

The next line, without its "\n" or "\r\n"; nil at the end of the
stream. A last line with no newline is still a line.

### struct BufferedWriter <a id="struct-BufferedWriter"></a>

```vertex
public struct BufferedWriter<W: Writer>: Writer
```

BufferedWriter gathers small writes and passes them on a large chunk at
a time. `Flush` passes on what is gathered, and flushes the stream
underneath. Rust's `BufWriter`, Go's `bufio.Writer`.

#### Initializers

<a id="BufferedWriter.init"></a>

```vertex
public init(_ inner: W, capacity: int = 65536)
```

#### Properties

<a id="BufferedWriter.Inner"></a>

```vertex
public var Inner: W
```

The stream underneath.

#### Methods

<a id="BufferedWriter.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="BufferedWriter.Flush"></a>

```vertex
public mutating func Flush() throws
```

### struct ChainReader <a id="struct-ChainReader"></a>

```vertex
public struct ChainReader<A: Reader, B: Reader>: Reader
```

ChainReader reads one stream to its end and then the other: Go's
`io.MultiReader` for two, Rust's `chain`.

#### Initializers

<a id="ChainReader.init"></a>

```vertex
public init(_ first: A, _ second: B)
```

#### Properties

<a id="ChainReader.First"></a>

```vertex
public var First: A
```

<a id="ChainReader.Second"></a>

```vertex
public var Second: B
```

#### Methods

<a id="ChainReader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### protocol Closer <a id="protocol-Closer"></a>

```vertex
public protocol Closer
```

Closer is something holding a handle to release.

#### Methods

<a id="Closer.Close"></a>

```vertex
mutating func Close() throws
```

Releases the handle. Closing twice is not an error.

### struct Cursor <a id="struct-Cursor"></a>

```vertex
public struct Cursor: Reader, Writer, Seeker
```

Cursor is an array of bytes with a position: a Reader, Writer and
Seeker over memory. Reading takes from the position on; writing
overwrites from the position and grows the array past its end.

```vertex
var mem = io.Cursor()
try io.WriteText(&mem, "hello")
mem.Position = 0
let back = try io.ReadText(&mem)
```

Rust's `io::Cursor<Vec<u8>>`; Go splits it into `bytes.Buffer` and
`bytes.Reader`.

#### Initializers

<a id="Cursor.init"></a>

```vertex
public init()
```

An empty cursor, to write into.

<a id="Cursor.init-2"></a>

```vertex
public init(_ bytes: [uint8])
```

A cursor over `bytes`, at their start: to read them.

#### Properties

<a id="Cursor.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

The bytes.

<a id="Cursor.Position"></a>

```vertex
public var Position: int
```

Where the next read or write starts.

#### Methods

<a id="Cursor.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

<a id="Cursor.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="Cursor.Flush"></a>

```vertex
public mutating func Flush() throws
```

<a id="Cursor.Seek"></a>

```vertex
public mutating func Seek(_ to: SeekFrom) throws -> int64
```

### struct DiscardWriter <a id="struct-DiscardWriter"></a>

```vertex
public struct DiscardWriter: Writer
```

DiscardWriter accepts everything and keeps nothing, counting as it
goes: Go's `io.Discard`, Rust's `io::sink()`.

#### Initializers

<a id="DiscardWriter.init"></a>

```vertex
public init()
```

#### Properties

<a id="DiscardWriter.Count"></a>

```vertex
public var Count: int64
```

How many bytes it has been given.

#### Methods

<a id="DiscardWriter.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="DiscardWriter.Flush"></a>

```vertex
public mutating func Flush() throws
```

### enum IoError <a id="enum-IoError"></a>

```vertex
public enum IoError: Error, Equatable, CustomStringConvertible
```

IoError is how the functions and adapters in this package fail. The
streams underneath fail their own way (fs.FsError, tcp.TcpError), and
those errors pass through unchanged.

#### Cases

<a id="IoError.unexpectedEnd"></a>

```vertex
case unexpectedEnd(got: int)
```

The stream ended before as many bytes as were asked for arrived:
`ReadFull`'s error. `got` is how many did.

<a id="IoError.tooLarge"></a>

```vertex
case tooLarge(limit: int)
```

More than `limit` bytes: `ReadToEnd` and `ReadText` stop there.

<a id="IoError.invalidSeek"></a>

```vertex
case invalidSeek(int64)
```

A seek to before the start.

#### Properties

<a id="IoError.description"></a>

```vertex
public var description: string { get }
```

### struct LimitReader <a id="struct-LimitReader"></a>

```vertex
public struct LimitReader<R: Reader>: Reader
```

LimitReader reads at most `Remaining` more bytes of the stream it
wraps, and then reports the end: Go's `io.LimitReader`, Rust's `take`.

#### Initializers

<a id="LimitReader.init"></a>

```vertex
public init(_ inner: R, _ limit: int)
```

#### Properties

<a id="LimitReader.Inner"></a>

```vertex
public var Inner: R
```

The stream underneath.

<a id="LimitReader.Remaining"></a>

```vertex
public var Remaining: int
```

How many bytes may still be read.

#### Methods

<a id="LimitReader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### protocol Reader <a id="protocol-Reader"></a>

```vertex
public protocol Reader
```

Reader is a source of bytes that answers without waiting: a file, an
array in memory, a decompressor over one of those.

#### Methods

<a id="Reader.Read"></a>

```vertex
mutating func Read(into buffer: inout [uint8]) throws -> int
```

Fills the start of `buffer` and returns how many bytes it filled.
0 is the end of the stream (or an empty buffer); it is never
returned while there is more to come.

### enum SeekFrom <a id="enum-SeekFrom"></a>

```vertex
public enum SeekFrom: Equatable
```

Where a seek is measured from.

#### Cases

<a id="SeekFrom.start"></a>

```vertex
case start(int64)
```

This many bytes from the start.

<a id="SeekFrom.current"></a>

```vertex
case current(int64)
```

This many bytes from where the position is now; negative goes back.

<a id="SeekFrom.end"></a>

```vertex
case end(int64)
```

This many bytes from the end; negative is before it.

### protocol Seeker <a id="protocol-Seeker"></a>

```vertex
public protocol Seeker
```

Seeker is a stream with a position that can be moved.

#### Methods

<a id="Seeker.Seek"></a>

```vertex
mutating func Seek(_ to: SeekFrom) throws -> int64
```

Moves the position, and returns where it now is from the start.

### struct TeeReader <a id="struct-TeeReader"></a>

```vertex
public struct TeeReader<R: Reader, W: Writer>: Reader
```

TeeReader writes everything it reads from one stream to a writer as
well: Go's `io.TeeReader`. The writer is its own, and read back from
`Output` once reading is done.

#### Initializers

<a id="TeeReader.init"></a>

```vertex
public init(_ inner: R, to writer: W)
```

#### Properties

<a id="TeeReader.Inner"></a>

```vertex
public var Inner: R
```

<a id="TeeReader.Output"></a>

```vertex
public var Output: W
```

#### Methods

<a id="TeeReader.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### protocol Writer <a id="protocol-Writer"></a>

```vertex
public protocol Writer
```

Writer is a sink of bytes that answers without waiting.

#### Methods

<a id="Writer.Write"></a>

```vertex
mutating func Write(_ bytes: borrowing [uint8]) throws
```

Writes all of `bytes`, or throws: there is no partial write.

<a id="Writer.Flush"></a>

```vertex
mutating func Flush() throws
```

Sends on whatever is buffered. A writer that buffers nothing does
nothing.

## Files

- adapters.vs
- buffered.vs
- bytes.vs
- cursor.vs
- error.vs
- protocols.vs
- read.vs
