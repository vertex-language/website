# package gfx

```vertex
import "remote/rdp/gfx"
```

Package gfx holds the client-side picture of the remote desktop: a
premultiplied RGBA framebuffer (alpha 255, red first, top row first --
the layout ui/window's Surface.Present takes) and the rectangles the
codecs and the session use to describe damage. Codecs decode into raw
pixel rows; the Blit* functions here convert those rows into the
framebuffer. Legacy bitmap updates ([MS-RDPBCGR] 2.2.9.1.1.3.1.2) are
bottom-up, so every blit takes the source's row order as a flag.

## Index

- [`struct Framebuffer`](#struct-Framebuffer)
  - [`init(width: int, height: int)`](#Framebuffer.init)
  - [`var Width: int`](#Framebuffer.Width)
  - [`var Height: int`](#Framebuffer.Height)
  - [`var Pixels: [uint8]`](#Framebuffer.Pixels)
  - [`var Bounds: Rect { get }`](#Framebuffer.Bounds)
  - [`mutating func Resize(width: int, height: int)`](#Framebuffer.Resize)
  - [`mutating func Blit16(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.Blit16)
  - [`mutating func Blit15(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.Blit15)
  - [`mutating func BlitBGR24(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.BlitBGR24)
  - [`mutating func BlitRGB24(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.BlitRGB24)
  - [`mutating func BlitBGRX32(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.BlitBGRX32)
  - [`mutating func BlitPalette8(_ src: [uint8], srcWidth: int, palette: [uint8], into dst: Rect, bottomUp: bool) -> Rect`](#Framebuffer.BlitPalette8)
  - [`mutating func Fill(_ rect: Rect, r: uint8, g: uint8, b: uint8) -> Rect`](#Framebuffer.Fill)
- [`struct Rect`](#struct-Rect)
  - [`init(x: int, y: int, width: int, height: int)`](#Rect.init)
  - [`var X: int`](#Rect.X)
  - [`var Y: int`](#Rect.Y)
  - [`var Width: int`](#Rect.Width)
  - [`var Height: int`](#Rect.Height)
  - [`var Right: int { get }`](#Rect.Right)
  - [`var Bottom: int { get }`](#Rect.Bottom)
  - [`var IsEmpty: bool { get }`](#Rect.IsEmpty)
  - [`func Intersect(_ o: Rect) -> Rect`](#Rect.Intersect)
  - [`func Union(_ o: Rect) -> Rect`](#Rect.Union)

## Types

### struct Framebuffer <a id="struct-Framebuffer"></a>

```vertex
public struct Framebuffer
```

Framebuffer is the remote desktop's pixels: Width * Height * 4 bytes of
premultiplied RGBA, top row first.

#### Initializers

<a id="Framebuffer.init"></a>

```vertex
public init(width: int, height: int)
```

#### Properties

<a id="Framebuffer.Width"></a>

```vertex
public var Width: int
```

<a id="Framebuffer.Height"></a>

```vertex
public var Height: int
```

<a id="Framebuffer.Pixels"></a>

```vertex
public var Pixels: [uint8]
```

<a id="Framebuffer.Bounds"></a>

```vertex
public var Bounds: Rect { get }
```

#### Methods

<a id="Framebuffer.Resize"></a>

```vertex
public mutating func Resize(width: int, height: int)
```

Resize replaces the pixels with an opaque black buffer of a new size.

<a id="Framebuffer.Blit16"></a>

```vertex
public mutating func Blit16(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect
```

Blit16 writes 16bpp RGB565 rows (2 bytes per pixel, little-endian,
srcWidth pixels per row) into dst. Rows are bottom-up when bottomUp.

<a id="Framebuffer.Blit15"></a>

```vertex
public mutating func Blit15(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect
```

Blit15 writes 15bpp RGB555 rows.

<a id="Framebuffer.BlitBGR24"></a>

```vertex
public mutating func BlitBGR24(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect
```

BlitBGR24 writes 24bpp rows whose bytes are blue, green, red (the
order Windows uses for uncompressed and interleaved bitmaps).

<a id="Framebuffer.BlitRGB24"></a>

```vertex
public mutating func BlitRGB24(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect
```

BlitRGB24 writes 24bpp rows whose bytes are red, green, blue (what
the planar codec produces).

<a id="Framebuffer.BlitBGRX32"></a>

```vertex
public mutating func BlitBGRX32(_ src: [uint8], srcWidth: int, into dst: Rect, bottomUp: bool) -> Rect
```

BlitBGRX32 writes 32bpp rows whose bytes are blue, green, red, pad
(uncompressed 32bpp bitmap data).

<a id="Framebuffer.BlitPalette8"></a>

```vertex
public mutating func BlitPalette8(_ src: [uint8], srcWidth: int, palette: [uint8], into dst: Rect, bottomUp: bool) -> Rect
```

BlitPalette8 writes 8bpp indexed rows through a 256-entry RGB palette
(3 bytes per entry, red first).

<a id="Framebuffer.Fill"></a>

```vertex
public mutating func Fill(_ rect: Rect, r: uint8, g: uint8, b: uint8) -> Rect
```

Fill paints a rectangle a solid opaque color.

### struct Rect <a id="struct-Rect"></a>

```vertex
public struct Rect
```

Rect is a rectangle in framebuffer pixels: X/Y is its top-left corner,
the far edges are exclusive.

#### Initializers

<a id="Rect.init"></a>

```vertex
public init(x: int, y: int, width: int, height: int)
```

#### Properties

<a id="Rect.X"></a>

```vertex
public var X: int
```

<a id="Rect.Y"></a>

```vertex
public var Y: int
```

<a id="Rect.Width"></a>

```vertex
public var Width: int
```

<a id="Rect.Height"></a>

```vertex
public var Height: int
```

<a id="Rect.Right"></a>

```vertex
public var Right: int { get }
```

<a id="Rect.Bottom"></a>

```vertex
public var Bottom: int { get }
```

<a id="Rect.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

#### Methods

<a id="Rect.Intersect"></a>

```vertex
public func Intersect(_ o: Rect) -> Rect
```

Intersect clips the rectangle to another.

<a id="Rect.Union"></a>

```vertex
public func Union(_ o: Rect) -> Rect
```

Union is the smallest rectangle containing both.

## Files

- gfx.vs
