# package svg

```vertex
import "web/svg"
```

Package svg draws SVG: an inline <svg> element's shapes, or an SVG
file's (read with encoding/xml) that an <img> shows, filled into the
box it lays out as. What it reads: <path> (every command, arcs
too), <rect>, <circle>, <ellipse>, <polygon> and <polyline>, grouped
by <g> and moved by `transform`; fills by attribute or style
(colors, none, currentColor, the first stop of a gradient), fill-rule,
fill-opacity and opacity; and the viewBox with preserveAspectRatio.
Strokes, <use>, clipping, masks, filters and text aren't drawn yet.

## Index

- [`func HasRatioOnly(_ root: html.Node) -> bool`](#func-HasRatioOnly)
- [`func IntrinsicSize(_ root: html.Node) -> (width: float32, height: float32)`](#func-IntrinsicSize)
- [`func Parse(_ root: html.Node) -> Drawing`](#func-Parse)
- [`func ParseDocument(_ bytes: [uint8]) -> Document?`](#func-ParseDocument)
- [`final class Document`](#class-Document)
  - [`let Drawing: Drawing`](#Document.Drawing)
  - [`let Width: float32`](#Document.Width)
  - [`let Height: float32`](#Document.Height)
- [`final class Drawing`](#class-Drawing)
  - [`let ViewBox: draw.Rect?`](#Drawing.ViewBox)
  - [`var IsEmpty: bool { get }`](#Drawing.IsEmpty)
  - [`func Render(on canvas: draw.Canvas, into r: draw.Rect, scale: float32, currentColor: draw.Color, fill: draw.Color?, fillNone: bool)`](#Drawing.Render)
- [`struct Matrix`](#struct-Matrix)
  - [`init(_ a: float32, _ b: float32, _ c: float32, _ d: float32, _ e: float32, _ f: float32)`](#Matrix.init)
  - [`var A: float32`](#Matrix.A)
  - [`var B: float32`](#Matrix.B)
  - [`var C: float32`](#Matrix.C)
  - [`var D: float32`](#Matrix.D)
  - [`var E: float32`](#Matrix.E)
  - [`var F: float32`](#Matrix.F)
  - [`static let identity = Matrix(1, 0, 0, 1, 0, 0)`](#Matrix.identity)
  - [`func Times(_ o: Matrix) -> Matrix`](#Matrix.Times)
  - [`func Apply(_ x: float32, _ y: float32) -> (x: float32, y: float32)`](#Matrix.Apply)

## Functions

### func HasRatioOnly <a id="func-HasRatioOnly"></a>

```vertex
public func HasRatioOnly(_ root: html.Node) -> bool
```

The size an <svg> lays out at before CSS: its width and height
attributes in pixels; one of them and the viewBox's proportions; or
300 by 150, as for any replaced element, shaped by the viewBox.
Whether an <svg> has a ratio from its viewBox but neither a width nor
a height: CSS then sizes it to the room it has, not to 300 by 150.

### func IntrinsicSize <a id="func-IntrinsicSize"></a>

```vertex
public func IntrinsicSize(_ root: html.Node) -> (width: float32, height: float32)
```

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ root: html.Node) -> Drawing
```

What an <svg> element draws.

### func ParseDocument <a id="func-ParseDocument"></a>

```vertex
public func ParseDocument(_ bytes: [uint8]) -> Document?
```

Reads bytes that are an SVG file, or nil where they aren't one: not
well-formed XML (a raster image, say), or a root that isn't <svg>.

## Types

### class Document <a id="class-Document"></a>

```vertex
public final class Document
```

An SVG file shown as an image, as <img src=logo.svg> shows one: what
it draws, and the size it lays out at before CSS. It is a document of
its own, so the page's CSS doesn't reach into it: its fill and color
are its own.

#### Properties

<a id="Document.Drawing"></a>

```vertex
public let Drawing: Drawing
```

<a id="Document.Width"></a>

```vertex
public let Width: float32
```

<a id="Document.Height"></a>

```vertex
public let Height: float32
```

### class Drawing <a id="class-Drawing"></a>

```vertex
public final class Drawing
```

An <svg> element's shapes, ready to draw into a box.

#### Properties

<a id="Drawing.ViewBox"></a>

```vertex
public let ViewBox: draw.Rect?
```

The viewBox, or nil where it has none.

<a id="Drawing.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

#### Methods

<a id="Drawing.Render"></a>

```vertex
public func Render(on canvas: draw.Canvas, into r: draw.Rect, scale: float32, currentColor: draw.Color, fill: draw.Color?, fillNone: bool)
```

Draws into a rectangle in device pixels: the viewBox fitted to it
(centered, keeping its proportions, unless stretched); without one,
user units at `scale` device pixels each. `fill` is what the
<svg> element's own CSS fill resolved to, nil for the default.

### struct Matrix <a id="struct-Matrix"></a>

```vertex
public struct Matrix
```

A 2D affine transform: x' = a x + c y + e, y' = b x + d y + f.

#### Initializers

<a id="Matrix.init"></a>

```vertex
public init(_ a: float32, _ b: float32, _ c: float32, _ d: float32, _ e: float32, _ f: float32)
```

#### Properties

<a id="Matrix.A"></a>

```vertex
public var A: float32
```

<a id="Matrix.B"></a>

```vertex
public var B: float32
```

<a id="Matrix.C"></a>

```vertex
public var C: float32
```

<a id="Matrix.D"></a>

```vertex
public var D: float32
```

<a id="Matrix.E"></a>

```vertex
public var E: float32
```

<a id="Matrix.F"></a>

```vertex
public var F: float32
```

<a id="Matrix.identity"></a>

```vertex
public static let identity = Matrix(1, 0, 0, 1, 0, 0)
```

#### Methods

<a id="Matrix.Times"></a>

```vertex
public func Times(_ o: Matrix) -> Matrix
```

This transform after another: other first, then self.

<a id="Matrix.Apply"></a>

```vertex
public func Apply(_ x: float32, _ y: float32) -> (x: float32, y: float32)
```

## Files

- element.vs
- path.vs
- svg.vs
