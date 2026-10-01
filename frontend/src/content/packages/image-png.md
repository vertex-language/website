# package png

```vertex
import "image/png"
```

Package png reads and writes PNG images (RFC 2083, PNG 1.2): every
color type and bit depth, palettes with transparency, and Adam7
interlacing on the way in; 8-bit RGB or RGBA with per-row filters and
zlib compression on the way out. Pure Vertex, no I/O.

## Index

- [`func Decode(_ data: [uint8]) throws -> image.RGBA`](#func-Decode)
- [`func DecodeConfig(_ data: [uint8]) throws -> Config`](#func-DecodeConfig)
- [`func Encode(_ img: image.RGBA) -> [uint8]`](#func-Encode)
- [`struct Config`](#struct-Config)
  - [`var Width: int`](#Config.Width)
  - [`var Height: int`](#Config.Height)
  - [`var BitDepth: int`](#Config.BitDepth)
  - [`var ColorType: int`](#Config.ColorType)
  - [`var Interlaced: bool`](#Config.Interlaced)
- [`enum PngError: Error`](#enum-PngError)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ data: [uint8]) throws -> image.RGBA
```

Decode reads a PNG into premultiplied RGBA. 16-bit samples keep their
high byte; gamma and color profiles are not applied.

### func DecodeConfig <a id="func-DecodeConfig"></a>

```vertex
public func DecodeConfig(_ data: [uint8]) throws -> Config
```

DecodeConfig reads only the header.

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ img: image.RGBA) -> [uint8]
```

Encode writes an image as a PNG. Opaque images are stored as RGB,
others as RGBA with the color un-premultiplied.

## Types

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Config is what the header says about an image.

#### Properties

<a id="Config.Width"></a>

```vertex
public var Width: int
```

<a id="Config.Height"></a>

```vertex
public var Height: int
```

<a id="Config.BitDepth"></a>

```vertex
public var BitDepth: int
```

<a id="Config.ColorType"></a>

```vertex
public var ColorType: int
```

<a id="Config.Interlaced"></a>

```vertex
public var Interlaced: bool
```

### enum PngError <a id="enum-PngError"></a>

```vertex
public enum PngError: Error
```

PngError is why bytes could not be decoded.

#### Cases

<a id="PngError.notPNG"></a>

```vertex
case notPNG
```

<a id="PngError.truncated"></a>

```vertex
case truncated
```

<a id="PngError.badChunk"></a>

```vertex
case badChunk(string)
```

<a id="PngError.badData"></a>

```vertex
case badData(string)
```

<a id="PngError.unsupported"></a>

```vertex
case unsupported(string)
```

## Files

- png.vs
- zlib.vs
