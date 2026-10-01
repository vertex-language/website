# package lz4

```vertex
import "compress/lz4"
```

## Index

- [`func Compress(_ data: [uint8]) -> [uint8]`](#func-Compress)
- [`func CompressBlock(_ data: [uint8]) -> [uint8]`](#func-CompressBlock)
- [`func Decompress(_ data: [uint8]) throws -> [uint8]`](#func-Decompress)
- [`func DecompressBlock(_ data: [uint8], uncompressedSize: int) throws -> [uint8]`](#func-DecompressBlock)
- [`enum Lz4Error: Error, Equatable, CustomStringConvertible`](#enum-Lz4Error)
  - [`var description: string { get }`](#Lz4Error.description)

## Functions

### func Compress <a id="func-Compress"></a>

```vertex
public func Compress(_ data: [uint8]) -> [uint8]
```

Compresses an uncompressed byte buffer using LZ4 block compression, prepending a 4-byte size header.

### func CompressBlock <a id="func-CompressBlock"></a>

```vertex
public func CompressBlock(_ data: [uint8]) -> [uint8]
```

Compresses raw bytes into an LZ4 block.

### func Decompress <a id="func-Decompress"></a>

```vertex
public func Decompress(_ data: [uint8]) throws -> [uint8]
```

Decompresses an LZ4 block with a 4-byte uncompressed size prefix.

### func DecompressBlock <a id="func-DecompressBlock"></a>

```vertex
public func DecompressBlock(_ data: [uint8], uncompressedSize: int) throws -> [uint8]
```

Decompresses a raw LZ4 block where the uncompressed size is known.

## Types

### enum Lz4Error <a id="enum-Lz4Error"></a>

```vertex
public enum Lz4Error: Error, Equatable, CustomStringConvertible
```

Errors encountered while compressing or decompressing LZ4 blocks.

#### Cases

<a id="Lz4Error.unexpectedEOF"></a>

```vertex
case unexpectedEOF
```

<a id="Lz4Error.badData"></a>

```vertex
case badData(string)
```

<a id="Lz4Error.offsetOutOfBounds"></a>

```vertex
case offsetOutOfBounds
```

#### Properties

<a id="Lz4Error.description"></a>

```vertex
public var description: string { get }
```

## Files

- error.vs
- lz4.vs
