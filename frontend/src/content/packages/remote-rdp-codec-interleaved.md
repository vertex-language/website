# package interleaved

```vertex
import "remote/rdp/codec/interleaved"
```

Package interleaved decodes the Interleaved RLE bitmap codec
([MS-RDPBCGR] 2.2.9.1.1.3.1.2.4 and the pseudo-code in 3.1.9), which
Windows uses for compressed bitmap updates at 8, 15, 16 and 24 bpp. The
output is the raw pixel rows in the source's own format, bottom-up,
exactly as the uncompressed form of the bitmap would be: 1, 2 or 3 bytes
per pixel, little-endian, no row padding.

## Index

- [`func Decode(_ src: [uint8], width: int, height: int, bpp: int) throws -> [uint8]`](#func-Decode)
- [`enum InterleavedError: Error`](#enum-InterleavedError)
  - [`var Message: string { get }`](#InterleavedError.Message)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ src: [uint8], width: int, height: int, bpp: int) throws -> [uint8]
```

Decode expands an RLE stream into width * height pixels of bpp bits
each (8, 15, 16 or 24). Rows come out bottom-up, as encoded.

## Types

### enum InterleavedError <a id="enum-InterleavedError"></a>

```vertex
public enum InterleavedError: Error
```

InterleavedError is a malformed or unsupported RLE stream.

#### Cases

<a id="InterleavedError.badOrder"></a>

```vertex
case badOrder(uint8)
```

<a id="InterleavedError.truncated"></a>

```vertex
case truncated
```

<a id="InterleavedError.overflow"></a>

```vertex
case overflow
```

<a id="InterleavedError.badDepth"></a>

```vertex
case badDepth(int)
```

<a id="InterleavedError.empty"></a>

```vertex
case empty
```

#### Properties

<a id="InterleavedError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- interleaved.vs
