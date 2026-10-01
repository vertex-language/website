# package layout

```vertex
import "web/layout"
```

## Index

- [`func HitTest(_ box: Box, _ px: float32, _ py: float32, originX: float32, originY: float32) -> Hit?`](#func-HitTest)
- [`func IsBlank(_ s: string) -> bool`](#func-IsBlank)
- [`func PagePosition(_ box: Box) -> (x: float32, y: float32)`](#func-PagePosition)
- [`func ReadsAttribute(_ name: string) -> bool`](#func-ReadsAttribute)
- [`final class Box`](#class-Box)
  - [`init(kind: BoxKind, style: cascade.ComputedStyle, node: html.Node?)`](#Box.init)
  - [`let Id: int`](#Box.Id)
  - [`weak var Node: html.Node?`](#Box.Node)
  - [`var Kind: BoxKind`](#Box.Kind)
  - [`var Style: cascade.ComputedStyle`](#Box.Style)
  - [`var Children: [Box] = []`](#Box.Children)
  - [`weak var Parent: Box?`](#Box.Parent)
  - [`var IsAnonymous: bool = false`](#Box.IsAnonymous)
  - [`var X: float32 = 0`](#Box.X)
  - [`var Y: float32 = 0`](#Box.Y)
  - [`var Width: float32 = 0`](#Box.Width)
  - [`var Height: float32 = 0`](#Box.Height)
  - [`var Margin: draw.Edges = draw.Edges.zero`](#Box.Margin)
  - [`var Border: draw.Edges = draw.Edges.zero`](#Box.Border)
  - [`var Padding: draw.Edges = draw.Edges.zero`](#Box.Padding)
  - [`var Lines: [Line] = []`](#Box.Lines)
  - [`var Text: string = ""`](#Box.Text)
  - [`var Replaced: ReplacedKind = .none`](#Box.Replaced)
  - [`var Marker: string = ""`](#Box.Marker)
  - [`var Vector: svg.Drawing? = nil`](#Box.Vector)
  - [`var VectorIsDocument: bool = false`](#Box.VectorIsDocument)
  - [`var IntrinsicWidth: float32 = 0`](#Box.IntrinsicWidth)
  - [`var IntrinsicHeight: float32 = 0`](#Box.IntrinsicHeight)
  - [`var RatioOnly: bool = false`](#Box.RatioOnly)
  - [`var PlaceholderStyle: cascade.ComputedStyle? = nil`](#Box.PlaceholderStyle)
  - [`var Image: draw.Image? = nil`](#Box.Image)
  - [`var Baseline: float32? = nil`](#Box.Baseline)
  - [`var ContentWidth: float32 = 0`](#Box.ContentWidth)
  - [`var ContentHeight: float32 = 0`](#Box.ContentHeight)
  - [`var ScrollX: float32 = 0`](#Box.ScrollX)
  - [`var ScrollY: float32 = 0`](#Box.ScrollY)
  - [`var OffsetX: float32 = 0`](#Box.OffsetX)
  - [`var OffsetY: float32 = 0`](#Box.OffsetY)
  - [`var Positioned: [Box] = []`](#Box.Positioned)
  - [`var DefiniteInnerHeight: float32? = nil`](#Box.DefiniteInnerHeight)
  - [`var IsBlockLevel: bool { get }`](#Box.IsBlockLevel)
  - [`var IsInlineLevel: bool { get }`](#Box.IsInlineLevel)
  - [`var IsReplaced: bool { get }`](#Box.IsReplaced)
  - [`var IsAtomicInline: bool { get }`](#Box.IsAtomicInline)
  - [`var ContentX: float32 { get }`](#Box.ContentX)
  - [`var ContentY: float32 { get }`](#Box.ContentY)
  - [`var InnerWidth: float32 { get }`](#Box.InnerWidth)
  - [`var InnerHeight: float32 { get }`](#Box.InnerHeight)
  - [`var PaddingBoxX: float32 { get }`](#Box.PaddingBoxX)
  - [`var PaddingBoxY: float32 { get }`](#Box.PaddingBoxY)
  - [`var PaddingBoxWidth: float32 { get }`](#Box.PaddingBoxWidth)
  - [`var PaddingBoxHeight: float32 { get }`](#Box.PaddingBoxHeight)
  - [`var Rect: draw.Rect { get }`](#Box.Rect)
  - [`var OuterHeight: float32 { get }`](#Box.OuterHeight)
  - [`var OuterWidth: float32 { get }`](#Box.OuterWidth)
  - [`var IsFormattingRoot: bool { get }`](#Box.IsFormattingRoot)
  - [`var HasInlineChildren: bool { get }`](#Box.HasInlineChildren)
  - [`var ElementBox: Box? { get }`](#Box.ElementBox)
  - [`var Element: html.Node? { get }`](#Box.Element)
  - [`func AppendChild(_ child: Box)`](#Box.AppendChild)
- [`enum BoxKind: Equatable`](#enum-BoxKind)
- [`final class BoxTreeBuilder`](#class-BoxTreeBuilder)
  - [`init(resolver: cascade.StyleResolver, context: selector.MatchContext)`](#BoxTreeBuilder.init)
  - [`var Images: [string: draw.Image] = [:]`](#BoxTreeBuilder.Images)
  - [`var Vectors: [string: svg.Document] = [:]`](#BoxTreeBuilder.Vectors)
  - [`var Values: [int64: string] = [:]`](#BoxTreeBuilder.Values)
  - [`var byNode: [int64: Box] = [:]`](#BoxTreeBuilder.byNode)
  - [`var textOrder: [int64: int] = [:]`](#BoxTreeBuilder.textOrder)
  - [`func Build(_ doc: html.Document) -> Box?`](#BoxTreeBuilder.Build)
- [`struct ContainingBlock`](#struct-ContainingBlock)
  - [`init(width: float32, height: float32?)`](#ContainingBlock.init)
  - [`var Width: float32`](#ContainingBlock.Width)
  - [`var Height: float32?`](#ContainingBlock.Height)
- [`struct Fragment`](#struct-Fragment)
  - [`init(kind: FragmentKind, box: Box, owner: Box)`](#Fragment.init)
  - [`var Kind: FragmentKind`](#Fragment.Kind)
  - [`var Box: Box`](#Fragment.Box)
  - [`var Owner: Box`](#Fragment.Owner)
  - [`var X: float32`](#Fragment.X)
  - [`var Y: float32`](#Fragment.Y)
  - [`var Width: float32`](#Fragment.Width)
  - [`var Height: float32`](#Fragment.Height)
  - [`var Ascent: float32`](#Fragment.Ascent)
  - [`var Text: string`](#Fragment.Text)
  - [`var Run: font.Run`](#Fragment.Run)
  - [`var Offset: int`](#Fragment.Offset)
  - [`var Decoration: cascade.TextDecoration`](#Fragment.Decoration)
  - [`var DecorationColor: draw.Color`](#Fragment.DecorationColor)
- [`enum FragmentKind: Equatable`](#enum-FragmentKind)
- [`struct Hit`](#struct-Hit)
  - [`var Box: Box`](#Hit.Box)
  - [`var Node: html.Node?`](#Hit.Node)
  - [`var TextBox: Box?`](#Hit.TextBox)
  - [`var TextOffset: int`](#Hit.TextOffset)
  - [`var PageX: float32`](#Hit.PageX)
  - [`var PageY: float32`](#Hit.PageY)
- [`final class Layout`](#class-Layout)
  - [`init(viewportWidth: float32, viewportHeight: float32)`](#Layout.init)
  - [`var ViewportWidth: float32`](#Layout.ViewportWidth)
  - [`var ViewportHeight: float32`](#Layout.ViewportHeight)
  - [`var Sticky: [Box] = []`](#Layout.Sticky)
  - [`func Run(_ root: Box)`](#Layout.Run)
  - [`func UpdateSticky(scrollY: float32, viewportHeight: float32) -> bool`](#Layout.UpdateSticky)
- [`struct Line`](#struct-Line)
  - [`init(x: float32, y: float32, width: float32)`](#Line.init)
  - [`var X: float32`](#Line.X)
  - [`var Y: float32`](#Line.Y)
  - [`var Width: float32`](#Line.Width)
  - [`var Height: float32`](#Line.Height)
  - [`var Baseline: float32`](#Line.Baseline)
  - [`var Fragments: [Fragment]`](#Line.Fragments)
  - [`var Spans: [Span]`](#Line.Spans)
- [`enum ReplacedKind: Equatable`](#enum-ReplacedKind)
- [`struct Span`](#struct-Span)
  - [`var Box: Box`](#Span.Box)
  - [`var X: float32`](#Span.X)
  - [`var Y: float32`](#Span.Y)
  - [`var Width: float32`](#Span.Width)
  - [`var Height: float32`](#Span.Height)
  - [`var IsFirst: bool`](#Span.IsFirst)
  - [`var IsLast: bool`](#Span.IsLast)

## Functions

### func HitTest <a id="func-HitTest"></a>

```vertex
public func HitTest(_ box: Box, _ px: float32, _ py: float32, originX: float32, originY: float32) -> Hit?
```

The innermost box under a page point.

### func IsBlank <a id="func-IsBlank"></a>

```vertex
public func IsBlank(_ s: string) -> bool
```

### func PagePosition <a id="func-PagePosition"></a>

```vertex
public func PagePosition(_ box: Box) -> (x: float32, y: float32)
```

The page position of a box: its corner with every ancestor's added.

### func ReadsAttribute <a id="func-ReadsAttribute"></a>

```vertex
public func ReadsAttribute(_ name: string) -> bool
```

Whether building or laying out boxes reads an attribute itself, as
an image's source or a cell's span: a change to it rebuilds the
element's boxes. `web/cmd/check-deps` keeps this in step with the
code.

## Types

### class Box <a id="class-Box"></a>

```vertex
public final class Box
```

#### Initializers

<a id="Box.init"></a>

```vertex
public init(kind: BoxKind, style: cascade.ComputedStyle, node: html.Node?)
```

#### Properties

<a id="Box.Id"></a>

```vertex
public let Id: int
```

A number of its own, for telling boxes apart.

<a id="Box.Node"></a>

```vertex
public weak var Node: html.Node?
```

<a id="Box.Kind"></a>

```vertex
public var Kind: BoxKind
```

<a id="Box.Style"></a>

```vertex
public var Style: cascade.ComputedStyle
```

<a id="Box.Children"></a>

```vertex
public var Children: [Box] = []
```

<a id="Box.Parent"></a>

```vertex
public weak var Parent: Box?
```

<a id="Box.IsAnonymous"></a>

```vertex
public var IsAnonymous: bool = false
```

A box layout made with no element of its own: a block wrapping
inline content beside blocks, or a list marker.

<a id="Box.X"></a>

```vertex
public var X: float32 = 0
```

<a id="Box.Y"></a>

```vertex
public var Y: float32 = 0
```

<a id="Box.Width"></a>

```vertex
public var Width: float32 = 0
```

<a id="Box.Height"></a>

```vertex
public var Height: float32 = 0
```

<a id="Box.Margin"></a>

```vertex
public var Margin: draw.Edges = draw.Edges.zero
```

<a id="Box.Border"></a>

```vertex
public var Border: draw.Edges = draw.Edges.zero
```

<a id="Box.Padding"></a>

```vertex
public var Padding: draw.Edges = draw.Edges.zero
```

<a id="Box.Lines"></a>

```vertex
public var Lines: [Line] = []
```

The lines of a block container holding inline content.

<a id="Box.Text"></a>

```vertex
public var Text: string = ""
```

The text of a text box, whitespace as the source has it.

<a id="Box.Replaced"></a>

```vertex
public var Replaced: ReplacedKind = .none
```

<a id="Box.Marker"></a>

```vertex
public var Marker: string = ""
```

The marker text of a list item: "•", "3.", "iv.".

<a id="Box.Vector"></a>

```vertex
public var Vector: svg.Drawing? = nil
```

A replaced box's own size, before CSS: an image's pixels, a
control's default.
An <svg> box's shapes.

<a id="Box.VectorIsDocument"></a>

```vertex
public var VectorIsDocument: bool = false
```

Whether Vector is an SVG file an <img> shows, which the page's CSS
doesn't style, rather than an inline <svg>.

<a id="Box.IntrinsicWidth"></a>

```vertex
public var IntrinsicWidth: float32 = 0
```

<a id="Box.IntrinsicHeight"></a>

```vertex
public var IntrinsicHeight: float32 = 0
```

<a id="Box.RatioOnly"></a>

```vertex
public var RatioOnly: bool = false
```

A replaced box with a ratio but no size of its own (an <svg> with
only a viewBox): its automatic width is the room it has.

<a id="Box.PlaceholderStyle"></a>

```vertex
public var PlaceholderStyle: cascade.ComputedStyle? = nil
```

A field's ::placeholder style, for the text shown while it's empty.

<a id="Box.Image"></a>

```vertex
public var Image: draw.Image? = nil
```

The image a replaced image box shows, once loaded.

<a id="Box.Baseline"></a>

```vertex
public var Baseline: float32? = nil
```

The baseline of the box's first line, from its top, for aligning
it in a line of its parent's; nil where it has no line.

<a id="Box.ContentWidth"></a>

```vertex
public var ContentWidth: float32 = 0
```

How far the box's content reaches past its padding box, for
scrolling: the far edges of what it holds.

<a id="Box.ContentHeight"></a>

```vertex
public var ContentHeight: float32 = 0
```

<a id="Box.ScrollX"></a>

```vertex
public var ScrollX: float32 = 0
```

Where a scroll container is scrolled to.

<a id="Box.ScrollY"></a>

```vertex
public var ScrollY: float32 = 0
```

<a id="Box.OffsetX"></a>

```vertex
public var OffsetX: float32 = 0
```

The offset position: relative gives, sticky gives, the rest is 0.

<a id="Box.OffsetY"></a>

```vertex
public var OffsetY: float32 = 0
```

<a id="Box.Positioned"></a>

```vertex
public var Positioned: [Box] = []
```

Boxes positioned absolutely against this one, laid out after it.

<a id="Box.DefiniteInnerHeight"></a>

```vertex
public var DefiniteInnerHeight: float32? = nil
```

The content height known before the content is laid out, when
the height is given: what children's percentages measure against.

<a id="Box.IsBlockLevel"></a>

```vertex
public var IsBlockLevel: bool { get }
```

A block box, or a replaced element displayed as a block: an
<img style="display:block"> takes a line of its own.

<a id="Box.IsInlineLevel"></a>

```vertex
public var IsInlineLevel: bool { get }
```

<a id="Box.IsReplaced"></a>

```vertex
public var IsReplaced: bool { get }
```

<a id="Box.IsAtomicInline"></a>

```vertex
public var IsAtomicInline: bool { get }
```

<a id="Box.ContentX"></a>

```vertex
public var ContentX: float32 { get }
```

The content box, relative to the border-box corner.

<a id="Box.ContentY"></a>

```vertex
public var ContentY: float32 { get }
```

<a id="Box.InnerWidth"></a>

```vertex
public var InnerWidth: float32 { get }
```

<a id="Box.InnerHeight"></a>

```vertex
public var InnerHeight: float32 { get }
```

<a id="Box.PaddingBoxX"></a>

```vertex
public var PaddingBoxX: float32 { get }
```

<a id="Box.PaddingBoxY"></a>

```vertex
public var PaddingBoxY: float32 { get }
```

<a id="Box.PaddingBoxWidth"></a>

```vertex
public var PaddingBoxWidth: float32 { get }
```

<a id="Box.PaddingBoxHeight"></a>

```vertex
public var PaddingBoxHeight: float32 { get }
```

<a id="Box.Rect"></a>

```vertex
public var Rect: draw.Rect { get }
```

The border box as a rect at the box's position.

<a id="Box.OuterHeight"></a>

```vertex
public var OuterHeight: float32 { get }
```

The margin box's height: what the box takes up in a block flow.

<a id="Box.OuterWidth"></a>

```vertex
public var OuterWidth: float32 { get }
```

<a id="Box.IsFormattingRoot"></a>

```vertex
public var IsFormattingRoot: bool { get }
```

Whether the box establishes a new block formatting context: its
margins do not collapse through it and floats stay inside.

<a id="Box.HasInlineChildren"></a>

```vertex
public var HasInlineChildren: bool { get }
```

Whether the children flow as lines rather than blocks.

<a id="Box.ElementBox"></a>

```vertex
public var ElementBox: Box? { get }
```

The nearest ancestor that is an element's box, for text and
anonymous boxes.

<a id="Box.Element"></a>

```vertex
public var Element: html.Node? { get }
```

The element node the box or its nearest non-anonymous ancestor
belongs to.

#### Methods

<a id="Box.AppendChild"></a>

```vertex
public func AppendChild(_ child: Box)
```

### enum BoxKind <a id="enum-BoxKind"></a>

```vertex
public enum BoxKind: Equatable
```

What kind of box a layout box is.

#### Cases

<a id="BoxKind.block"></a>

```vertex
case block
```

A block-level container: its children are blocks, or lines.

<a id="BoxKind.inline"></a>

```vertex
case inline
```

An inline element's box: its children flow in its parent's lines.

<a id="BoxKind.text"></a>

```vertex
case text
```

A run of text, which inline layout splits into fragments.

<a id="BoxKind.inlineBlock"></a>

```vertex
case inlineBlock
```

An inline-level box laid out as a block inside: inline-block,
inline-flex, inline-table.

<a id="BoxKind.replaced"></a>

```vertex
case replaced
```

An image or a form control: a box with a size of its own.

<a id="BoxKind.lineBreak"></a>

```vertex
case lineBreak
```

A <br>.

### class BoxTreeBuilder <a id="class-BoxTreeBuilder"></a>

```vertex
public final class BoxTreeBuilder
```

What the box tree builder needs from the view: styles, the page's
state, and images.

#### Initializers

<a id="BoxTreeBuilder.init"></a>

```vertex
public init(resolver: cascade.StyleResolver, context: selector.MatchContext)
```

#### Properties

<a id="BoxTreeBuilder.Images"></a>

```vertex
public var Images: [string: draw.Image] = [:]
```

Images by URL, for <img> boxes; missing ones are laid out with
their attributes' size, or none.

<a id="BoxTreeBuilder.Vectors"></a>

```vertex
public var Vectors: [string: svg.Document] = [:]
```

The images that are SVG files, by the src that names them: drawn
as vectors, sharp at any size.

<a id="BoxTreeBuilder.Values"></a>

```vertex
public var Values: [int64: string] = [:]
```

The text a form control holds, by node, where the user has typed
into it; otherwise the DOM's value.

<a id="BoxTreeBuilder.byNode"></a>

```vertex
public var byNode: [int64: Box] = [:]
```

Every box made, by node id, for the view to find an element's box.

<a id="BoxTreeBuilder.textOrder"></a>

```vertex
public var textOrder: [int64: int] = [:]
```

Each text node's place in document order, for ordering selections.

#### Methods

<a id="BoxTreeBuilder.Build"></a>

```vertex
public func Build(_ doc: html.Document) -> Box?
```

The box tree of a document: the root element's box, or nil for a
document with no element.

### struct ContainingBlock <a id="struct-ContainingBlock"></a>

```vertex
public struct ContainingBlock
```

What a box is laid out against: the width of the containing block,
and its height where that is known.

#### Initializers

<a id="ContainingBlock.init"></a>

```vertex
public init(width: float32, height: float32?)
```

#### Properties

<a id="ContainingBlock.Width"></a>

```vertex
public var Width: float32
```

<a id="ContainingBlock.Height"></a>

```vertex
public var Height: float32?
```

### struct Fragment <a id="struct-Fragment"></a>

```vertex
public struct Fragment
```

A piece of a line: a run of text in one style, or an atomic box.

#### Initializers

<a id="Fragment.init"></a>

```vertex
public init(kind: FragmentKind, box: Box, owner: Box)
```

#### Properties

<a id="Fragment.Kind"></a>

```vertex
public var Kind: FragmentKind
```

<a id="Fragment.Box"></a>

```vertex
public var Box: Box
```

The text box, or the atomic box.

<a id="Fragment.Owner"></a>

```vertex
public var Owner: Box
```

The nearest element box, whose style the text is set in.

<a id="Fragment.X"></a>

```vertex
public var X: float32
```

<a id="Fragment.Y"></a>

```vertex
public var Y: float32
```

<a id="Fragment.Width"></a>

```vertex
public var Width: float32
```

<a id="Fragment.Height"></a>

```vertex
public var Height: float32
```

<a id="Fragment.Ascent"></a>

```vertex
public var Ascent: float32
```

The baseline from the fragment's top.

<a id="Fragment.Text"></a>

```vertex
public var Text: string
```

<a id="Fragment.Run"></a>

```vertex
public var Run: font.Run
```

<a id="Fragment.Offset"></a>

```vertex
public var Offset: int
```

Where the fragment's text starts in the box's text, in bytes,
for editing and hit testing.

<a id="Fragment.Decoration"></a>

```vertex
public var Decoration: cascade.TextDecoration
```

<a id="Fragment.DecorationColor"></a>

```vertex
public var DecorationColor: draw.Color
```

### enum FragmentKind <a id="enum-FragmentKind"></a>

```vertex
public enum FragmentKind: Equatable
```

#### Cases

<a id="FragmentKind.text"></a>

```vertex
case text
```

<a id="FragmentKind.atomic"></a>

```vertex
case atomic
```

<a id="FragmentKind.marker"></a>

```vertex
case marker
```

### struct Hit <a id="struct-Hit"></a>

```vertex
public struct Hit
```

What lies under a point: the deepest box, the element it belongs
to, and for text, where in the text.

#### Properties

<a id="Hit.Box"></a>

```vertex
public var Box: Box
```

<a id="Hit.Node"></a>

```vertex
public var Node: html.Node?
```

<a id="Hit.TextBox"></a>

```vertex
public var TextBox: Box?
```

The text box hit, if the point was on text.

<a id="Hit.TextOffset"></a>

```vertex
public var TextOffset: int
```

Where in the text box's text the point falls, in bytes.

<a id="Hit.PageX"></a>

```vertex
public var PageX: float32
```

The box's border-box corner in page coordinates.

<a id="Hit.PageY"></a>

```vertex
public var PageY: float32
```

### class Layout <a id="class-Layout"></a>

```vertex
public final class Layout
```

Lays out a box tree: block flow, lines, flex, positioned boxes.
Positions come out relative to each box's parent; the root's are
relative to the viewport.

#### Initializers

<a id="Layout.init"></a>

```vertex
public init(viewportWidth: float32, viewportHeight: float32)
```

#### Properties

<a id="Layout.ViewportWidth"></a>

```vertex
public var ViewportWidth: float32
```

<a id="Layout.ViewportHeight"></a>

```vertex
public var ViewportHeight: float32
```

<a id="Layout.Sticky"></a>

```vertex
public var Sticky: [Box] = []
```

Boxes with position: sticky, whose offsets follow the scroll.

#### Methods

<a id="Layout.Run"></a>

```vertex
public func Run(_ root: Box)
```

Lays out the whole tree from the root. The root box fills the
viewport's width; its height is its content's.

<a id="Layout.UpdateSticky"></a>

```vertex
public func UpdateSticky(scrollY: float32, viewportHeight: float32) -> bool
```

Moves sticky boxes to follow a scroll: a box with `top` stays
that far below the viewport's top while its container is in
view, and likewise for `bottom`. Answers whether any moved.

### struct Line <a id="struct-Line"></a>

```vertex
public struct Line
```

One line of a block container's inline content.

#### Initializers

<a id="Line.init"></a>

```vertex
public init(x: float32, y: float32, width: float32)
```

#### Properties

<a id="Line.X"></a>

```vertex
public var X: float32
```

The line box, relative to the container's border-box corner.

<a id="Line.Y"></a>

```vertex
public var Y: float32
```

<a id="Line.Width"></a>

```vertex
public var Width: float32
```

<a id="Line.Height"></a>

```vertex
public var Height: float32
```

<a id="Line.Baseline"></a>

```vertex
public var Baseline: float32
```

The baseline, from the line's top.

<a id="Line.Fragments"></a>

```vertex
public var Fragments: [Fragment]
```

Text and atomic boxes on the line, in order.

<a id="Line.Spans"></a>

```vertex
public var Spans: [Span]
```

The stretch of each inline element on the line, for its
background and border, in tree order: outer before inner.

### enum ReplacedKind <a id="enum-ReplacedKind"></a>

```vertex
public enum ReplacedKind: Equatable
```

What a replaced box shows.

#### Cases

<a id="ReplacedKind.none"></a>

```vertex
case none
```

<a id="ReplacedKind.image"></a>

```vertex
case image
```

<a id="ReplacedKind.textInput"></a>

```vertex
case textInput
```

<a id="ReplacedKind.textArea"></a>

```vertex
case textArea
```

<a id="ReplacedKind.button"></a>

```vertex
case button
```

<a id="ReplacedKind.checkbox"></a>

```vertex
case checkbox
```

<a id="ReplacedKind.radio"></a>

```vertex
case radio
```

<a id="ReplacedKind.select"></a>

```vertex
case select
```

<a id="ReplacedKind.progress"></a>

```vertex
case progress
```

<a id="ReplacedKind.placeholder"></a>

```vertex
case placeholder
```

<a id="ReplacedKind.svg"></a>

```vertex
case svg
```

An inline <svg>, drawn from its shapes (web/svg).

### struct Span <a id="struct-Span"></a>

```vertex
public struct Span
```

The stretch of an inline element's box along one line.

#### Properties

<a id="Span.Box"></a>

```vertex
public var Box: Box
```

<a id="Span.X"></a>

```vertex
public var X: float32
```

<a id="Span.Y"></a>

```vertex
public var Y: float32
```

<a id="Span.Width"></a>

```vertex
public var Width: float32
```

<a id="Span.Height"></a>

```vertex
public var Height: float32
```

<a id="Span.IsFirst"></a>

```vertex
public var IsFirst: bool
```

Whether this is the element's first or last line, which is where
its left and right padding, border and margin go.

<a id="Span.IsLast"></a>

```vertex
public var IsLast: bool
```

## Files

- box.vs
- boxtree.vs
- flex.vs
- floats.vs
- grid.vs
- hittest.vs
- inline.vs
- layout.vs
- table.vs
- util.vs
