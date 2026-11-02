# package image

```vertex
import "image"
```

Package image holds the pixel buffers that the still-image codecs
(image/png, …) decode into and encode from. It does no I/O and knows
nothing about windows or screens, so a server or a command-line tool
can use it without touching ui.

## Index

- [`struct RGBA`](#struct-RGBA)
  - [`init(width: int, height: int)`](#RGBA.init)
  - [`init(width: int, height: int, pixels: [uint8])`](#RGBA.init-2)
  - [`var Width: int`](#RGBA.Width)
  - [`var Height: int`](#RGBA.Height)
  - [`var Pixels: [uint8]`](#RGBA.Pixels)
  - [`var Stride: int { get }`](#RGBA.Stride)
  - [`var IsOpaque: bool { get }`](#RGBA.IsOpaque)

## Types

### struct RGBA <a id="struct-RGBA"></a>

```vertex
public struct RGBA
```

RGBA is an image of 8-bit red, green, blue and alpha samples, top row
first, four bytes per pixel with no padding between rows. Colors are
premultiplied by alpha: the layout ui/draw and ui/window use.

#### Initializers

<a id="RGBA.init"></a>

```vertex
public init(width: int, height: int)
```

A transparent black image.

<a id="RGBA.init-2"></a>

```vertex
public init(width: int, height: int, pixels: [uint8])
```

An image over existing pixels; pixels must hold width * height * 4 bytes.

#### Properties

<a id="RGBA.Width"></a>

```vertex
public var Width: int
```

<a id="RGBA.Height"></a>

```vertex
public var Height: int
```

<a id="RGBA.Pixels"></a>

```vertex
public var Pixels: [uint8]
```

<a id="RGBA.Stride"></a>

```vertex
public var Stride: int { get }
```

Stride is the number of bytes from one row to the next.

<a id="RGBA.IsOpaque"></a>

```vertex
public var IsOpaque: bool { get }
```

IsOpaque reports whether every pixel has alpha 255.

## Files

- image.vs
