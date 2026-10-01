# package planar

```vertex
import "remote/rdp/codec/planar"
```

Package planar decodes the RDP 6.0 Bitmap Compressed Stream
([MS-RDPEGDI] 2.2.2.5.1, 3.1.9), which Windows uses for compressed
bitmap updates at 32 bpp. The stream carries a format header, then one
8-bit plane per channel -- optionally alpha, then R/Y, G/Co, B/Cg --
each either raw or run-length coded with a per-scanline delta
transform, and optionally in the YCoCg colour space with colour-loss
reduction. Decode returns RGB24 rows (red first) in the stream's own
row order, which for bitmap updates is bottom-up.

## Index

- [`func Decode(_ src: [uint8], width: int, height: int) throws -> [uint8]`](#func-Decode)
- [`enum PlanarError: Error`](#enum-PlanarError)
  - [`var Message: string { get }`](#PlanarError.Message)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ src: [uint8], width: int, height: int) throws -> [uint8]
```

Decode expands a planar stream for a width * height bitmap into
width * height * 3 bytes of RGB.

## Types

### enum PlanarError <a id="enum-PlanarError"></a>

```vertex
public enum PlanarError: Error
```

PlanarError is a malformed planar stream.

#### Cases

<a id="PlanarError.truncated"></a>

```vertex
case truncated
```

<a id="PlanarError.badSegment"></a>

```vertex
case badSegment
```

<a id="PlanarError.badScanline"></a>

```vertex
case badScanline
```

<a id="PlanarError.empty"></a>

```vertex
case empty
```

#### Properties

<a id="PlanarError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- planar.vs
