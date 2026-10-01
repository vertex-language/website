# package paint

```vertex
import "web/paint"
```

## Index

- [`func Build(_ root: layout.Box, state: State, viewportWidth: float32, viewportHeight: float32, background: draw.Color) -> [PaintItem]`](#func-Build)
- [`func Rasterize(_ items: [PaintItem], on base: draw.Canvas, scale: float32, originX: float32, originY: float32, scrollX: float32, scrollY: float32)`](#func-Rasterize)
- [`func ReadsAttribute(_ name: string) -> bool`](#func-ReadsAttribute)
- [`func SelectedPart(_ f: layout.Fragment, _ node: html.Node, _ range: (start: dom.TextPosition, end: dom.TextPosition), _ order: [int64: int]) -> (from: int, to: int)?`](#func-SelectedPart)
- [`struct PaintItem`](#struct-PaintItem)
  - [`var Kind: PaintKind`](#PaintItem.Kind)
  - [`var Rect: draw.Rect`](#PaintItem.Rect)
  - [`var Color: draw.Color`](#PaintItem.Color)
  - [`var Radii: draw.Radii`](#PaintItem.Radii)
  - [`var Widths: draw.Edges`](#PaintItem.Widths)
  - [`var Colors: [draw.Color]`](#PaintItem.Colors)
  - [`var X: float32`](#PaintItem.X)
  - [`var Y: float32`](#PaintItem.Y)
  - [`var Run: font.Run`](#PaintItem.Run)
  - [`var LetterSpacing: float32`](#PaintItem.LetterSpacing)
  - [`var Image: draw.Image?`](#PaintItem.Image)
  - [`var Opacity: float32`](#PaintItem.Opacity)
  - [`var TileWidth: float32`](#PaintItem.TileWidth)
  - [`var TileHeight: float32`](#PaintItem.TileHeight)
  - [`var RepeatX: bool`](#PaintItem.RepeatX)
  - [`var RepeatY: bool`](#PaintItem.RepeatY)
  - [`var Gradient: draw.LinearGradient?`](#PaintItem.Gradient)
  - [`var Vector: svg.Drawing?`](#PaintItem.Vector)
  - [`var Fill: draw.Color?`](#PaintItem.Fill)
  - [`var FillNone: bool`](#PaintItem.FillNone)
  - [`var Blur: float32`](#PaintItem.Blur)
- [`enum PaintKind: Equatable`](#enum-PaintKind)
- [`struct State`](#struct-State)
  - [`init()`](#State.init)
  - [`var Focused: int64 = 0`](#State.Focused)
  - [`var Caret: int = -1`](#State.Caret)
  - [`var CaretVisible: bool = true`](#State.CaretVisible)
  - [`var FieldSelectionStart: int = -1`](#State.FieldSelectionStart)
  - [`var FieldSelectionEnd: int = -1`](#State.FieldSelectionEnd)
  - [`var Images: [string: draw.Image] = [:]`](#State.Images)
  - [`var SelectionStart: dom.TextPosition? = nil`](#State.SelectionStart)
  - [`var SelectionEnd: dom.TextPosition? = nil`](#State.SelectionEnd)
  - [`var TextOrder: [int64: int] = [:]`](#State.TextOrder)

## Functions

### func Build <a id="func-Build"></a>

```vertex
public func Build(_ root: layout.Box, state: State, viewportWidth: float32, viewportHeight: float32, background: draw.Color) -> [PaintItem]
```

The display list for a laid-out box tree: what to paint, in the
order CSS paints it, in page coordinates.

### func Rasterize <a id="func-Rasterize"></a>

```vertex
public func Rasterize(_ items: [PaintItem], on base: draw.Canvas, scale: float32, originX: float32, originY: float32,
               scrollX: float32, scrollY: float32)
```

Paints a display list onto a canvas: page coordinates are scaled by
the device scale and shifted by the view's origin and scroll.

### func ReadsAttribute <a id="func-ReadsAttribute"></a>

```vertex
public func ReadsAttribute(_ name: string) -> bool
```

Whether painting reads an attribute itself, as a checkbox's check
or a field's placeholder. `web/cmd/check-deps` keeps this in step
with the code.

### func SelectedPart <a id="func-SelectedPart"></a>

```vertex
public func SelectedPart(_ f: layout.Fragment, _ node: html.Node, _ range: (start: dom.TextPosition, end: dom.TextPosition),
                  _ order: [int64: int]) -> (from: int, to: int)?
```

The part of a text fragment inside a selection, as byte offsets
into the fragment's text, or nil for none.

## Types

### struct PaintItem <a id="struct-PaintItem"></a>

```vertex
public struct PaintItem
```

One thing to paint, in CSS pixels on the page: a filled rectangle, a
border, a run of text at a baseline, an image, or a change of clip.

#### Properties

<a id="PaintItem.Kind"></a>

```vertex
public var Kind: PaintKind
```

<a id="PaintItem.Rect"></a>

```vertex
public var Rect: draw.Rect
```

<a id="PaintItem.Color"></a>

```vertex
public var Color: draw.Color
```

<a id="PaintItem.Radii"></a>

```vertex
public var Radii: draw.Radii
```

<a id="PaintItem.Widths"></a>

```vertex
public var Widths: draw.Edges
```

A border's widths and its four colors.

<a id="PaintItem.Colors"></a>

```vertex
public var Colors: [draw.Color]
```

<a id="PaintItem.X"></a>

```vertex
public var X: float32
```

Text: the pen's start and baseline, the run, and letter-spacing.

<a id="PaintItem.Y"></a>

```vertex
public var Y: float32
```

<a id="PaintItem.Run"></a>

```vertex
public var Run: font.Run
```

<a id="PaintItem.LetterSpacing"></a>

```vertex
public var LetterSpacing: float32
```

<a id="PaintItem.Image"></a>

```vertex
public var Image: draw.Image?
```

<a id="PaintItem.Opacity"></a>

```vertex
public var Opacity: float32
```

<a id="PaintItem.TileWidth"></a>

```vertex
public var TileWidth: float32
```

An image's tile size and whether it repeats each way; the rect is
the area it covers.

<a id="PaintItem.TileHeight"></a>

```vertex
public var TileHeight: float32
```

<a id="PaintItem.RepeatX"></a>

```vertex
public var RepeatX: bool
```

<a id="PaintItem.RepeatY"></a>

```vertex
public var RepeatY: bool
```

<a id="PaintItem.Gradient"></a>

```vertex
public var Gradient: draw.LinearGradient?
```

<a id="PaintItem.Vector"></a>

```vertex
public var Vector: svg.Drawing?
```

An <svg>'s shapes; Color is its current color, and Fill what its
CSS fill resolved to (nil for the default, black).

<a id="PaintItem.Fill"></a>

```vertex
public var Fill: draw.Color?
```

<a id="PaintItem.FillNone"></a>

```vertex
public var FillNone: bool
```

<a id="PaintItem.Blur"></a>

```vertex
public var Blur: float32
```

A layer's blur radius, in CSS pixels.

### enum PaintKind <a id="enum-PaintKind"></a>

```vertex
public enum PaintKind: Equatable
```

#### Cases

<a id="PaintKind.fill"></a>

```vertex
case fill
```

<a id="PaintKind.border"></a>

```vertex
case border
```

<a id="PaintKind.text"></a>

```vertex
case text
```

<a id="PaintKind.image"></a>

```vertex
case image
```

<a id="PaintKind.gradient"></a>

```vertex
case gradient
```

<a id="PaintKind.clip"></a>

```vertex
case clip
```

<a id="PaintKind.unclip"></a>

```vertex
case unclip
```

<a id="PaintKind.vector"></a>

```vertex
case vector
```

An <svg>'s shapes, fitted to Rect.

<a id="PaintKind.layer"></a>

```vertex
case layer
```

What follows, to the matching unlayer, is painted apart, then
blurred by Blur and put back: filter: blur(). Rect is the box
the filter is on.

<a id="PaintKind.unlayer"></a>

```vertex
case unlayer
```

### struct State <a id="struct-State"></a>

```vertex
public struct State
```

Builds the list of what to paint from a laid-out box tree, in the
order CSS paints: block backgrounds and borders, then floats, then
inline content, with positioned boxes after their siblings.
What the painter needs from the page besides its boxes: focus, the
caret, selections and images.

#### Initializers

<a id="State.init"></a>

```vertex
public init()
```

#### Properties

<a id="State.Focused"></a>

```vertex
public var Focused: int64 = 0
```

The focused element's node id, or 0.

<a id="State.Caret"></a>

```vertex
public var Caret: int = -1
```

The caret's byte offset in the focused field, or -1.

<a id="State.CaretVisible"></a>

```vertex
public var CaretVisible: bool = true
```

<a id="State.FieldSelectionStart"></a>

```vertex
public var FieldSelectionStart: int = -1
```

The focused field's selected bytes, or -1 for none.

<a id="State.FieldSelectionEnd"></a>

```vertex
public var FieldSelectionEnd: int = -1
```

<a id="State.Images"></a>

```vertex
public var Images: [string: draw.Image] = [:]
```

The page's images by URL, for backgrounds.

<a id="State.SelectionStart"></a>

```vertex
public var SelectionStart: dom.TextPosition? = nil
```

The selection, if any, and each text node's place in the document.

<a id="State.SelectionEnd"></a>

```vertex
public var SelectionEnd: dom.TextPosition? = nil
```

<a id="State.TextOrder"></a>

```vertex
public var TextOrder: [int64: int] = [:]
```

## Files

- paint.vs
- util.vs
