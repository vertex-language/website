# package draw

```vertex
import "image/draw"
```

## Index

- [`func RoundToInt(_ v: float32) -> int32`](#func-RoundToInt)
- [`func WithCanvas(_ pixels: inout [uint8], width: int32, height: int32, _ body: (Canvas) -> Void)`](#func-WithCanvas)
- [`struct Canvas`](#struct-Canvas)
  - [`init(base: UnsafeMutablePointer<uint8>, width: int32, height: int32, stride: int32)`](#Canvas.init)
  - [`let Width: int32`](#Canvas.Width)
  - [`let Height: int32`](#Canvas.Height)
  - [`let Stride: int32`](#Canvas.Stride)
  - [`var Clip: IRect`](#Canvas.Clip)
  - [`var Bounds: IRect { get }`](#Canvas.Bounds)
  - [`mutating func ClipTo(_ r: IRect)`](#Canvas.ClipTo)
  - [`func Pixel(_ x: int32, _ y: int32) -> uint32`](#Canvas.Pixel)
  - [`func Clear(_ color: Color)`](#Canvas.Clear)
  - [`func Fill(_ r: IRect, _ color: Color)`](#Canvas.Fill)
  - [`func FillRounded(_ r: IRect, radii: Radii, _ color: Color)`](#Canvas.FillRounded)
  - [`func FillRing(_ outer: IRect, radii: Radii, widths: Edges, colors: [Color])`](#Canvas.FillRing)
  - [`func DrawMask(_ m: Mask, x: int32, y: int32, _ color: Color)`](#Canvas.DrawMask)
  - [`func DrawImage(_ img: Image, into dst: IRect, opacity: float32 = 1, shape: IRect? = nil, radii: Radii? = nil)`](#Canvas.DrawImage)
  - [`func FillGradient(_ r: IRect, radii: Radii, _ g: LinearGradient)`](#Canvas.FillGradient)
  - [`func FillPath(_ path: Path, rule: FillRule = .nonZero, _ color: Color)`](#Canvas.FillPath)
- [`struct Color: Equatable`](#struct-Color)
  - [`init(_ r: uint8, _ g: uint8, _ b: uint8, _ a: uint8 = 255)`](#Color.init)
  - [`var R: uint8`](#Color.R)
  - [`var G: uint8`](#Color.G)
  - [`var B: uint8`](#Color.B)
  - [`var A: uint8`](#Color.A)
  - [`static let transparent = Color(0, 0, 0, 0)`](#Color.transparent)
  - [`static let black = Color(0, 0, 0)`](#Color.black)
  - [`static let white = Color(255, 255, 255)`](#Color.white)
  - [`var IsOpaque: bool { get }`](#Color.IsOpaque)
  - [`var IsTransparent: bool { get }`](#Color.IsTransparent)
  - [`func Faded(_ opacity: float32) -> Color`](#Color.Faded)
  - [`func Premultiplied() -> uint32`](#Color.Premultiplied)
- [`struct Edges: Equatable`](#struct-Edges)
  - [`init(_ top: float32, _ right: float32, _ bottom: float32, _ left: float32)`](#Edges.init)
  - [`init(all: float32)`](#Edges.init-2)
  - [`var Top: float32`](#Edges.Top)
  - [`var Right: float32`](#Edges.Right)
  - [`var Bottom: float32`](#Edges.Bottom)
  - [`var Left: float32`](#Edges.Left)
  - [`static let zero = Edges(0, 0, 0, 0)`](#Edges.zero)
  - [`var Horizontal: float32 { get }`](#Edges.Horizontal)
  - [`var Vertical: float32 { get }`](#Edges.Vertical)
- [`enum FillRule: Equatable`](#enum-FillRule)
- [`struct GradientStop`](#struct-GradientStop)
  - [`init(_ color: Color, at position: float32)`](#GradientStop.init)
  - [`var Color: Color`](#GradientStop.Color)
  - [`var Position: float32`](#GradientStop.Position)
- [`struct IRect: Equatable`](#struct-IRect)
  - [`init(_ x: int32, _ y: int32, _ width: int32, _ height: int32)`](#IRect.init)
  - [`var X: int32`](#IRect.X)
  - [`var Y: int32`](#IRect.Y)
  - [`var Width: int32`](#IRect.Width)
  - [`var Height: int32`](#IRect.Height)
  - [`static let zero = IRect(0, 0, 0, 0)`](#IRect.zero)
  - [`var Right: int32 { get }`](#IRect.Right)
  - [`var Bottom: int32 { get }`](#IRect.Bottom)
  - [`var IsEmpty: bool { get }`](#IRect.IsEmpty)
  - [`func Contains(_ px: int32, _ py: int32) -> bool`](#IRect.Contains)
  - [`func Intersect(_ o: IRect) -> IRect`](#IRect.Intersect)
  - [`func Union(_ o: IRect) -> IRect`](#IRect.Union)
- [`final class Image`](#class-Image)
  - [`init(width: int32, height: int32, pixels: [uint8])`](#Image.init)
  - [`let Width: int32`](#Image.Width)
  - [`let Height: int32`](#Image.Height)
  - [`var Pixels: [uint8]`](#Image.Pixels)
- [`struct Layer`](#struct-Layer)
  - [`init(_ r: IRect)`](#Layer.init)
  - [`let Rect: IRect`](#Layer.Rect)
  - [`var Canvas: Canvas`](#Layer.Canvas)
  - [`func Free()`](#Layer.Free)
  - [`func Blur(_ sigma: float32)`](#Layer.Blur)
  - [`func Composite(onto c: Canvas)`](#Layer.Composite)
- [`struct LinearGradient`](#struct-LinearGradient)
  - [`init(angle: float32, stops: [GradientStop])`](#LinearGradient.init)
  - [`var Angle: float32`](#LinearGradient.Angle)
  - [`var Stops: [GradientStop]`](#LinearGradient.Stops)
  - [`var Radial: RadialShape? = nil`](#LinearGradient.Radial)
- [`struct Mask`](#struct-Mask)
  - [`init(width: int32, height: int32, data: [uint8])`](#Mask.init)
  - [`var Width: int32`](#Mask.Width)
  - [`var Height: int32`](#Mask.Height)
  - [`var Data: [uint8]`](#Mask.Data)
- [`struct Path`](#struct-Path)
  - [`init()`](#Path.init)
  - [`var Points: [Point] = []`](#Path.Points)
  - [`var Starts: [int] = []`](#Path.Starts)
  - [`var IsEmpty: bool { get }`](#Path.IsEmpty)
  - [`var Current: Point { get }`](#Path.Current)
  - [`var Bounds: Rect { get }`](#Path.Bounds)
  - [`mutating func MoveTo(_ x: float32, _ y: float32)`](#Path.MoveTo)
  - [`mutating func LineTo(_ x: float32, _ y: float32)`](#Path.LineTo)
  - [`mutating func QuadTo(_ cx: float32, _ cy: float32, _ x: float32, _ y: float32)`](#Path.QuadTo)
  - [`mutating func CubicTo(_ c1x: float32, _ c1y: float32, _ c2x: float32, _ c2y: float32, _ x: float32, _ y: float32)`](#Path.CubicTo)
  - [`mutating func Close()`](#Path.Close)
- [`struct Point: Equatable`](#struct-Point)
  - [`init(_ x: float32, _ y: float32)`](#Point.init)
  - [`var X: float32`](#Point.X)
  - [`var Y: float32`](#Point.Y)
  - [`static let zero = Point(0, 0)`](#Point.zero)
- [`enum RadialExtent: Equatable`](#enum-RadialExtent)
- [`struct RadialShape`](#struct-RadialShape)
  - [`init()`](#RadialShape.init)
  - [`var Circle: bool = false`](#RadialShape.Circle)
  - [`var Extent: RadialExtent = .farthestCorner`](#RadialShape.Extent)
  - [`var SizeX: float32 = 0`](#RadialShape.SizeX)
  - [`var SizeY: float32 = 0`](#RadialShape.SizeY)
  - [`var CenterX: float32 = 0.5`](#RadialShape.CenterX)
  - [`var CenterY: float32 = 0.5`](#RadialShape.CenterY)
  - [`var OffsetX: float32 = 0`](#RadialShape.OffsetX)
  - [`var OffsetY: float32 = 0`](#RadialShape.OffsetY)
  - [`func Scaled(_ k: float32) -> RadialShape`](#RadialShape.Scaled)
- [`struct Radii: Equatable`](#struct-Radii)
  - [`init(_ tl: float32, _ tr: float32, _ br: float32, _ bl: float32)`](#Radii.init)
  - [`init(all: float32)`](#Radii.init-2)
  - [`var TopLeft: float32`](#Radii.TopLeft)
  - [`var TopRight: float32`](#Radii.TopRight)
  - [`var BottomRight: float32`](#Radii.BottomRight)
  - [`var BottomLeft: float32`](#Radii.BottomLeft)
  - [`static let zero = Radii(0, 0, 0, 0)`](#Radii.zero)
  - [`var IsZero: bool { get }`](#Radii.IsZero)
  - [`func Scaled(_ s: float32) -> Radii`](#Radii.Scaled)
  - [`func Inset(_ e: Edges) -> Radii`](#Radii.Inset)
  - [`func Fitted(_ w: float32, _ h: float32) -> Radii`](#Radii.Fitted)
- [`struct Rect: Equatable`](#struct-Rect)
  - [`init(_ x: float32, _ y: float32, _ width: float32, _ height: float32)`](#Rect.init)
  - [`var X: float32`](#Rect.X)
  - [`var Y: float32`](#Rect.Y)
  - [`var Width: float32`](#Rect.Width)
  - [`var Height: float32`](#Rect.Height)
  - [`static let zero = Rect(0, 0, 0, 0)`](#Rect.zero)
  - [`var Right: float32 { get }`](#Rect.Right)
  - [`var Bottom: float32 { get }`](#Rect.Bottom)
  - [`var IsEmpty: bool { get }`](#Rect.IsEmpty)
  - [`func Contains(_ px: float32, _ py: float32) -> bool`](#Rect.Contains)
  - [`func Offset(_ dx: float32, _ dy: float32) -> Rect`](#Rect.Offset)
  - [`func Intersect(_ o: Rect) -> Rect`](#Rect.Intersect)
  - [`func Union(_ o: Rect) -> Rect`](#Rect.Union)
  - [`func Snapped(scale: float32) -> IRect`](#Rect.Snapped)
- [`struct Size: Equatable`](#struct-Size)
  - [`init(_ width: float32, _ height: float32)`](#Size.init)
  - [`var Width: float32`](#Size.Width)
  - [`var Height: float32`](#Size.Height)

## Functions

### func RoundToInt <a id="func-RoundToInt"></a>

```vertex
public func RoundToInt(_ v: float32) -> int32
```

The nearest whole number, halves rounding to even.

### func WithCanvas <a id="func-WithCanvas"></a>

```vertex
public func WithCanvas(_ pixels: inout [uint8], width: int32, height: int32, _ body: (Canvas) -> Void)
```

Runs body with a canvas over pixels, which must hold width * height
premultiplied RGBA pixels.

## Types

### struct Canvas <a id="struct-Canvas"></a>

```vertex
public struct Canvas
```

Somewhere to draw: premultiplied RGBA8 pixels, red first, top row
first, which is what a window surface presents. A canvas borrows its
pixels for the length of one `WithCanvas`; everything drawn is kept to
its `Clip`, which starts as the whole surface.

#### Initializers

<a id="Canvas.init"></a>

```vertex
public init(base: UnsafeMutablePointer<uint8>, width: int32, height: int32, stride: int32)
```

#### Properties

<a id="Canvas.Width"></a>

```vertex
public let Width: int32
```

<a id="Canvas.Height"></a>

```vertex
public let Height: int32
```

<a id="Canvas.Stride"></a>

```vertex
public let Stride: int32
```

Bytes from one row to the next.

<a id="Canvas.Clip"></a>

```vertex
public var Clip: IRect
```

<a id="Canvas.Bounds"></a>

```vertex
public var Bounds: IRect { get }
```

#### Methods

<a id="Canvas.ClipTo"></a>

```vertex
public mutating func ClipTo(_ r: IRect)
```

Narrows the clip to its intersection with r.

<a id="Canvas.Pixel"></a>

```vertex
public func Pixel(_ x: int32, _ y: int32) -> uint32
```

The pixel at (x, y), or 0 outside the canvas.

<a id="Canvas.Clear"></a>

```vertex
public func Clear(_ color: Color)
```

Paints every pixel the color, clip and all.

<a id="Canvas.Fill"></a>

```vertex
public func Fill(_ r: IRect, _ color: Color)
```

Fills a rectangle, blending where the color is translucent.

<a id="Canvas.FillRounded"></a>

```vertex
public func FillRounded(_ r: IRect, radii: Radii, _ color: Color)
```

Fills a rectangle whose corners are rounded, with the curves
anti-aliased. Radii are in device pixels.

<a id="Canvas.FillRing"></a>

```vertex
public func FillRing(_ outer: IRect, radii: Radii, widths: Edges, colors: [Color])
```

Fills the area inside `outer` and outside `inner`, both rounded:
a border. Colors one side at a time: the part of the ring nearest
each edge takes that edge's color, meeting the next on the
diagonal, as CSS joins borders of different colors.

<a id="Canvas.DrawMask"></a>

```vertex
public func DrawMask(_ m: Mask, x: int32, y: int32, _ color: Color)
```

Blends a color through a mask, whose top-left corner lands at (x, y).

<a id="Canvas.DrawImage"></a>

```vertex
public func DrawImage(_ img: Image, into dst: IRect, opacity: float32 = 1, shape: IRect? = nil, radii: Radii? = nil)
```

Draws an image into a rectangle, resampling where the sizes
differ: box-filtered when shrinking, bilinear when growing. With
a shape, only the part of the image inside that rounded
rectangle shows, its curves anti-aliased.

<a id="Canvas.FillGradient"></a>

```vertex
public func FillGradient(_ r: IRect, radii: Radii, _ g: LinearGradient)
```

Fills a rectangle, its corners rounded, with a linear gradient.
The gradient line runs through the rectangle's centre at the
angle, long enough that the first stop touches one corner and
the last the opposite, as CSS lays it.

<a id="Canvas.FillPath"></a>

```vertex
public func FillPath(_ path: Path, rule: FillRule = .nonZero, _ color: Color)
```

Fills a path in a color, anti-aliased, kept to the clip.

### struct Color <a id="struct-Color"></a>

```vertex
public struct Color: Equatable
```

A color: red, green, blue and alpha, each 0 to 255, not premultiplied.

#### Initializers

<a id="Color.init"></a>

```vertex
public init(_ r: uint8, _ g: uint8, _ b: uint8, _ a: uint8 = 255)
```

#### Properties

<a id="Color.R"></a>

```vertex
public var R: uint8
```

<a id="Color.G"></a>

```vertex
public var G: uint8
```

<a id="Color.B"></a>

```vertex
public var B: uint8
```

<a id="Color.A"></a>

```vertex
public var A: uint8
```

<a id="Color.transparent"></a>

```vertex
public static let transparent = Color(0, 0, 0, 0)
```

<a id="Color.black"></a>

```vertex
public static let black = Color(0, 0, 0)
```

<a id="Color.white"></a>

```vertex
public static let white = Color(255, 255, 255)
```

<a id="Color.IsOpaque"></a>

```vertex
public var IsOpaque: bool { get }
```

<a id="Color.IsTransparent"></a>

```vertex
public var IsTransparent: bool { get }
```

#### Methods

<a id="Color.Faded"></a>

```vertex
public func Faded(_ opacity: float32) -> Color
```

The color with its alpha multiplied by a factor from 0 to 1.

<a id="Color.Premultiplied"></a>

```vertex
public func Premultiplied() -> uint32
```

The pixel the color is on a canvas: premultiplied, R in the low byte.

### struct Edges <a id="struct-Edges"></a>

```vertex
public struct Edges: Equatable
```

Four lengths, one per side, in the order CSS writes them.

#### Initializers

<a id="Edges.init"></a>

```vertex
public init(_ top: float32, _ right: float32, _ bottom: float32, _ left: float32)
```

<a id="Edges.init-2"></a>

```vertex
public init(all: float32)
```

#### Properties

<a id="Edges.Top"></a>

```vertex
public var Top: float32
```

<a id="Edges.Right"></a>

```vertex
public var Right: float32
```

<a id="Edges.Bottom"></a>

```vertex
public var Bottom: float32
```

<a id="Edges.Left"></a>

```vertex
public var Left: float32
```

<a id="Edges.zero"></a>

```vertex
public static let zero = Edges(0, 0, 0, 0)
```

<a id="Edges.Horizontal"></a>

```vertex
public var Horizontal: float32 { get }
```

<a id="Edges.Vertical"></a>

```vertex
public var Vertical: float32 { get }
```

### enum FillRule <a id="enum-FillRule"></a>

```vertex
public enum FillRule: Equatable
```

Which parts of a path a fill covers where contours overlap: nonzero
winding (SVG's and canvas's default), or even-odd, which makes holes
of overlaps whichever way they wind.

#### Cases

<a id="FillRule.nonZero"></a>

```vertex
case nonZero
```

<a id="FillRule.evenOdd"></a>

```vertex
case evenOdd
```

### struct GradientStop <a id="struct-GradientStop"></a>

```vertex
public struct GradientStop
```

One color of a gradient, at a fraction of its length.

#### Initializers

<a id="GradientStop.init"></a>

```vertex
public init(_ color: Color, at position: float32)
```

#### Properties

<a id="GradientStop.Color"></a>

```vertex
public var Color: Color
```

<a id="GradientStop.Position"></a>

```vertex
public var Position: float32
```

### struct IRect <a id="struct-IRect"></a>

```vertex
public struct IRect: Equatable
```

A rectangle in device pixels: what a canvas is measured in.

#### Initializers

<a id="IRect.init"></a>

```vertex
public init(_ x: int32, _ y: int32, _ width: int32, _ height: int32)
```

#### Properties

<a id="IRect.X"></a>

```vertex
public var X: int32
```

<a id="IRect.Y"></a>

```vertex
public var Y: int32
```

<a id="IRect.Width"></a>

```vertex
public var Width: int32
```

<a id="IRect.Height"></a>

```vertex
public var Height: int32
```

<a id="IRect.zero"></a>

```vertex
public static let zero = IRect(0, 0, 0, 0)
```

<a id="IRect.Right"></a>

```vertex
public var Right: int32 { get }
```

<a id="IRect.Bottom"></a>

```vertex
public var Bottom: int32 { get }
```

<a id="IRect.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

#### Methods

<a id="IRect.Contains"></a>

```vertex
public func Contains(_ px: int32, _ py: int32) -> bool
```

<a id="IRect.Intersect"></a>

```vertex
public func Intersect(_ o: IRect) -> IRect
```

<a id="IRect.Union"></a>

```vertex
public func Union(_ o: IRect) -> IRect
```

### class Image <a id="class-Image"></a>

```vertex
public final class Image
```

Pixels of an image: premultiplied RGBA, red first, top row first.

#### Initializers

<a id="Image.init"></a>

```vertex
public init(width: int32, height: int32, pixels: [uint8])
```

#### Properties

<a id="Image.Width"></a>

```vertex
public let Width: int32
```

<a id="Image.Height"></a>

```vertex
public let Height: int32
```

<a id="Image.Pixels"></a>

```vertex
public var Pixels: [uint8]
```

### struct Layer <a id="struct-Layer"></a>

```vertex
public struct Layer
```

Pixels painted apart from a canvas and then put back onto it, for
effects that apply to what's drawn as a whole, like a blur. A layer
covers a rectangle of the canvas it was made for, and its Canvas
takes the same coordinates, so drawing into it needs no offset.

#### Initializers

<a id="Layer.init"></a>

```vertex
public init(_ r: IRect)
```

A transparent layer over r, which must not be empty.

#### Properties

<a id="Layer.Rect"></a>

```vertex
public let Rect: IRect
```

<a id="Layer.Canvas"></a>

```vertex
public var Canvas: Canvas
```

#### Methods

<a id="Layer.Free"></a>

```vertex
public func Free()
```

Gives the layer's memory back; it isn't used after.

<a id="Layer.Blur"></a>

```vertex
public func Blur(_ sigma: float32)
```

Blurs the layer as a Gaussian of standard deviation sigma pixels
would, near enough: three box blurs each way.

<a id="Layer.Composite"></a>

```vertex
public func Composite(onto c: Canvas)
```

Paints the layer onto a canvas, over what's there, inside its clip.

### struct LinearGradient <a id="struct-LinearGradient"></a>

```vertex
public struct LinearGradient
```

A linear gradient as CSS describes one: an angle in degrees, where 0
points up and 90 to the right, and stops from 0 to 1. With Radial
set it's a radial gradient instead, the stops running from its
centre out to its ending shape.

#### Initializers

<a id="LinearGradient.init"></a>

```vertex
public init(angle: float32, stops: [GradientStop])
```

#### Properties

<a id="LinearGradient.Angle"></a>

```vertex
public var Angle: float32
```

<a id="LinearGradient.Stops"></a>

```vertex
public var Stops: [GradientStop]
```

<a id="LinearGradient.Radial"></a>

```vertex
public var Radial: RadialShape? = nil
```

### struct Mask <a id="struct-Mask"></a>

```vertex
public struct Mask
```

An 8-bit coverage mask: a glyph, or any shape to paint in one color.

#### Initializers

<a id="Mask.init"></a>

```vertex
public init(width: int32, height: int32, data: [uint8])
```

#### Properties

<a id="Mask.Width"></a>

```vertex
public var Width: int32
```

<a id="Mask.Height"></a>

```vertex
public var Height: int32
```

<a id="Mask.Data"></a>

```vertex
public var Data: [uint8]
```

### struct Path <a id="struct-Path"></a>

```vertex
public struct Path
```

A shape of straight segments, in device pixels: curves are flattened
as they are added. Each contour is closed when filled.

#### Initializers

<a id="Path.init"></a>

```vertex
public init()
```

#### Properties

<a id="Path.Points"></a>

```vertex
public var Points: [Point] = []
```

The points, contour after contour.

<a id="Path.Starts"></a>

```vertex
public var Starts: [int] = []
```

Where each contour starts in Points.

<a id="Path.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

<a id="Path.Current"></a>

```vertex
public var Current: Point { get }
```

Where the pen is.

<a id="Path.Bounds"></a>

```vertex
public var Bounds: Rect { get }
```

Its bounds, in device pixels.

#### Methods

<a id="Path.MoveTo"></a>

```vertex
public mutating func MoveTo(_ x: float32, _ y: float32)
```

<a id="Path.LineTo"></a>

```vertex
public mutating func LineTo(_ x: float32, _ y: float32)
```

<a id="Path.QuadTo"></a>

```vertex
public mutating func QuadTo(_ cx: float32, _ cy: float32, _ x: float32, _ y: float32)
```

A quadratic Bézier curve to (x, y) with control point (cx, cy).

<a id="Path.CubicTo"></a>

```vertex
public mutating func CubicTo(_ c1x: float32, _ c1y: float32, _ c2x: float32, _ c2y: float32, _ x: float32, _ y: float32)
```

A cubic Bézier curve to (x, y) with control points (c1x, c1y) and
(c2x, c2y).

<a id="Path.Close"></a>

```vertex
public mutating func Close()
```

Ends the contour, back at its start.

### struct Point <a id="struct-Point"></a>

```vertex
public struct Point: Equatable
```

A position in CSS pixels, from the top-left corner.

#### Initializers

<a id="Point.init"></a>

```vertex
public init(_ x: float32, _ y: float32)
```

#### Properties

<a id="Point.X"></a>

```vertex
public var X: float32
```

<a id="Point.Y"></a>

```vertex
public var Y: float32
```

<a id="Point.zero"></a>

```vertex
public static let zero = Point(0, 0)
```

### enum RadialExtent <a id="enum-RadialExtent"></a>

```vertex
public enum RadialExtent: Equatable
```

How big a radial gradient's ending shape is, as CSS names it.

#### Cases

<a id="RadialExtent.closestSide"></a>

```vertex
case closestSide
```

<a id="RadialExtent.closestCorner"></a>

```vertex
case closestCorner
```

<a id="RadialExtent.farthestSide"></a>

```vertex
case farthestSide
```

<a id="RadialExtent.farthestCorner"></a>

```vertex
case farthestCorner
```

<a id="RadialExtent.sized"></a>

```vertex
case sized
```

SizeX and SizeY, in pixels.

### struct RadialShape <a id="struct-RadialShape"></a>

```vertex
public struct RadialShape
```

A radial gradient's centre and ending shape, resolved against the
rectangle it fills: the centre at a fraction of its size and then
moved by pixels, as background positions are.

#### Initializers

<a id="RadialShape.init"></a>

```vertex
public init()
```

#### Properties

<a id="RadialShape.Circle"></a>

```vertex
public var Circle: bool = false
```

<a id="RadialShape.Extent"></a>

```vertex
public var Extent: RadialExtent = .farthestCorner
```

<a id="RadialShape.SizeX"></a>

```vertex
public var SizeX: float32 = 0
```

<a id="RadialShape.SizeY"></a>

```vertex
public var SizeY: float32 = 0
```

<a id="RadialShape.CenterX"></a>

```vertex
public var CenterX: float32 = 0.5
```

<a id="RadialShape.CenterY"></a>

```vertex
public var CenterY: float32 = 0.5
```

<a id="RadialShape.OffsetX"></a>

```vertex
public var OffsetX: float32 = 0
```

<a id="RadialShape.OffsetY"></a>

```vertex
public var OffsetY: float32 = 0
```

#### Methods

<a id="RadialShape.Scaled"></a>

```vertex
public func Scaled(_ k: float32) -> RadialShape
```

The same shape at a scale: its pixel lengths multiplied.

### struct Radii <a id="struct-Radii"></a>

```vertex
public struct Radii: Equatable
```

The radius of each corner, clockwise from the top left.

#### Initializers

<a id="Radii.init"></a>

```vertex
public init(_ tl: float32, _ tr: float32, _ br: float32, _ bl: float32)
```

<a id="Radii.init-2"></a>

```vertex
public init(all: float32)
```

#### Properties

<a id="Radii.TopLeft"></a>

```vertex
public var TopLeft: float32
```

<a id="Radii.TopRight"></a>

```vertex
public var TopRight: float32
```

<a id="Radii.BottomRight"></a>

```vertex
public var BottomRight: float32
```

<a id="Radii.BottomLeft"></a>

```vertex
public var BottomLeft: float32
```

<a id="Radii.zero"></a>

```vertex
public static let zero = Radii(0, 0, 0, 0)
```

<a id="Radii.IsZero"></a>

```vertex
public var IsZero: bool { get }
```

#### Methods

<a id="Radii.Scaled"></a>

```vertex
public func Scaled(_ s: float32) -> Radii
```

<a id="Radii.Inset"></a>

```vertex
public func Inset(_ e: Edges) -> Radii
```

Each radius shrunk by the border on its two sides, which is the
curve of the padding edge inside a rounded border.

<a id="Radii.Fitted"></a>

```vertex
public func Fitted(_ w: float32, _ h: float32) -> Radii
```

Radii that fit the rectangle: where the sum of two along a side
exceeds it, all are scaled down together, as CSS does.

### struct Rect <a id="struct-Rect"></a>

```vertex
public struct Rect: Equatable
```

A rectangle in CSS pixels: what layout measures in.

#### Initializers

<a id="Rect.init"></a>

```vertex
public init(_ x: float32, _ y: float32, _ width: float32, _ height: float32)
```

#### Properties

<a id="Rect.X"></a>

```vertex
public var X: float32
```

<a id="Rect.Y"></a>

```vertex
public var Y: float32
```

<a id="Rect.Width"></a>

```vertex
public var Width: float32
```

<a id="Rect.Height"></a>

```vertex
public var Height: float32
```

<a id="Rect.zero"></a>

```vertex
public static let zero = Rect(0, 0, 0, 0)
```

<a id="Rect.Right"></a>

```vertex
public var Right: float32 { get }
```

<a id="Rect.Bottom"></a>

```vertex
public var Bottom: float32 { get }
```

<a id="Rect.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

#### Methods

<a id="Rect.Contains"></a>

```vertex
public func Contains(_ px: float32, _ py: float32) -> bool
```

<a id="Rect.Offset"></a>

```vertex
public func Offset(_ dx: float32, _ dy: float32) -> Rect
```

<a id="Rect.Intersect"></a>

```vertex
public func Intersect(_ o: Rect) -> Rect
```

The rectangle both cover; empty where they do not meet.

<a id="Rect.Union"></a>

```vertex
public func Union(_ o: Rect) -> Rect
```

The smallest rectangle covering both.

<a id="Rect.Snapped"></a>

```vertex
public func Snapped(scale: float32) -> IRect
```

Scaled by a factor, with its edges snapped to whole device pixels
the way a browser snaps a box: the edges round, so that two boxes
that abut in CSS pixels abut on the screen.

### struct Size <a id="struct-Size"></a>

```vertex
public struct Size: Equatable
```

A size in CSS pixels.

#### Initializers

<a id="Size.init"></a>

```vertex
public init(_ width: float32, _ height: float32)
```

#### Properties

<a id="Size.Width"></a>

```vertex
public var Width: float32
```

<a id="Size.Height"></a>

```vertex
public var Height: float32
```

## Files

- canvas.vs
- color.vs
- geometry.vs
- gradient.vs
- layer.vs
- path.vs
