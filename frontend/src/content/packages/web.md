# package web

```vertex
import "web"
```

## Index

- [`protocol Clipboard`](#protocol-Clipboard)
  - [`func ReadText() -> string`](#Clipboard.ReadText)
  - [`func WriteText(_ text: string)`](#Clipboard.WriteText)
- [`struct Config`](#struct-Config)
  - [`init(baseURL: string? = nil, backgroundColor: draw.Color = draw.Color.white, fetcher: fetch.Fetcher = fetch.Fetcher(), defersImages: bool = false)`](#Config.init)
  - [`var BaseURL: string?`](#Config.BaseURL)
  - [`var BackgroundColor: draw.Color`](#Config.BackgroundColor)
  - [`var Fetcher: fetch.Fetcher`](#Config.Fetcher)
  - [`var DefersImages: bool`](#Config.DefersImages)
- [`enum Cursor: Equatable`](#enum-Cursor)
- [`enum EventResult: Equatable`](#enum-EventResult)
- [`enum Input`](#enum-Input)
- [`struct Key`](#struct-Key)
  - [`init(Key: string, Code: string, Shift: bool = false, Control: bool = false, Alt: bool = false, Meta: bool = false)`](#Key.init)
  - [`var Key: string`](#Key.Key)
  - [`var Code: string`](#Key.Code)
  - [`var Shift: bool`](#Key.Shift)
  - [`var Control: bool`](#Key.Control)
  - [`var Alt: bool`](#Key.Alt)
  - [`var Meta: bool`](#Key.Meta)
  - [`var Shortcut: bool { get }`](#Key.Shortcut)
- [`final class Page`](#class-Page)
  - [`init(configuration: Config? = nil)`](#Page.init)
  - [`var Configuration: Config`](#Page.Configuration)
  - [`internal(set) var Document: dom.Document?`](#Page.Document)
  - [`var Clipboard: Clipboard? = nil`](#Page.Clipboard)
  - [`var Title: string { get }`](#Page.Title)
  - [`var PendingImages: [string] { get }`](#Page.PendingImages)
  - [`var ViewportSize: draw.Size { get }`](#Page.ViewportSize)
  - [`var IsDark: bool { get }`](#Page.IsDark)
  - [`var RootBox: layout.Box? { get }`](#Page.RootBox)
  - [`var FocusedElement: html.Node? { get }`](#Page.FocusedElement)
  - [`var HasSelection: bool { get }`](#Page.HasSelection)
  - [`func LoadHTML(_ source: string, baseURL: string? = nil)`](#Page.LoadHTML)
  - [`func LoadFile(_ path: string) throws`](#Page.LoadFile)
  - [`func LoadBytes(_ bytes: [uint8], contentType: string? = nil, baseURL: string? = nil)`](#Page.LoadBytes)
  - [`func SetStyleSheets(_ sheets: [string])`](#Page.SetStyleSheets)
  - [`func Resolve(_ url: string) -> string`](#Page.Resolve)
  - [`func SetImage(_ url: string, _ image: draw.Image)`](#Page.SetImage)
  - [`func LoadImages() async -> [string]`](#Page.LoadImages)
  - [`func SetColorScheme(dark: bool)`](#Page.SetColorScheme)
  - [`func SetViewportSize(_ size: draw.Size)`](#Page.SetViewportSize)
  - [`func ScrollOffset() -> draw.Point`](#Page.ScrollOffset)
  - [`func SetScrollOffset(_ offset: draw.Point)`](#Page.SetScrollOffset)
  - [`func ContentSize() -> draw.Size`](#Page.ContentSize)
  - [`func NeedsRepaint() -> bool`](#Page.NeedsRepaint)
  - [`func NeedsAnimation() -> bool`](#Page.NeedsAnimation)
  - [`func Advance(time: float64) -> bool`](#Page.Advance)
  - [`func DesiredCursor() -> Cursor`](#Page.DesiredCursor)
  - [`func OnNavigate(_ handler: (string) -> Void)`](#Page.OnNavigate)
  - [`func OnSubmit(_ handler: (dom.Submission) -> Void)`](#Page.OnSubmit)
  - [`func OnAction(_ handler: (string, string) -> Void)`](#Page.OnAction)
  - [`func OnTitleChanged(_ handler: (string) -> Void)`](#Page.OnTitleChanged)
  - [`func OnHoverLink(_ handler: (string?) -> Void)`](#Page.OnHoverLink)
  - [`func IsVisited(_ handler: (string) -> bool)`](#Page.IsVisited)
  - [`func VisitedChanged()`](#Page.VisitedChanged)
  - [`func Draw(into pixels: inout [uint8], width: int32, height: int32, scale: float32, at origin: draw.Point = draw.Point.zero)`](#Page.Draw)
  - [`func ElementAt(_ p: draw.Point) -> html.Node?`](#Page.ElementAt)
  - [`func BoxFor(_ node: html.Node) -> layout.Box?`](#Page.BoxFor)
  - [`func QuerySelector(_ sel: string) -> html.Node?`](#Page.QuerySelector)
  - [`func QuerySelectorAll(_ sel: string) -> [html.Node]`](#Page.QuerySelectorAll)
  - [`func SelectedText() -> string`](#Page.SelectedText)
  - [`func ClearSelection()`](#Page.ClearSelection)
  - [`func SelectAll()`](#Page.SelectAll)
  - [`func Focus(_ node: html.Node?)`](#Page.Focus)
  - [`func ScrollTo(_ node: html.Node)`](#Page.ScrollTo)
  - [`func ScrollIntoViewIfNeeded(_ node: html.Node)`](#Page.ScrollIntoViewIfNeeded)
  - [`func ValueOf(_ node: html.Node) -> string`](#Page.ValueOf)
  - [`func Handle(_ input: Input) -> EventResult`](#Page.Handle)
- [`struct Pointer`](#struct-Pointer)
  - [`init(_ position: draw.Point, button: PointerButton = PointerButton.primary, clicks: int32 = 1)`](#Pointer.init)
  - [`var Position: draw.Point`](#Pointer.Position)
  - [`var Button: PointerButton`](#Pointer.Button)
  - [`var Clicks: int32`](#Pointer.Clicks)
- [`enum PointerButton: Equatable`](#enum-PointerButton)
- [`struct Wheel`](#struct-Wheel)
  - [`init(_ delta: draw.Point, precise: bool = false)`](#Wheel.init)
  - [`var Delta: draw.Point`](#Wheel.Delta)
  - [`var Precise: bool`](#Wheel.Precise)

## Types

### protocol Clipboard <a id="protocol-Clipboard"></a>

```vertex
public protocol Clipboard
```

The system clipboard, as the host provides it. Without one, copy and
paste do nothing.

#### Methods

<a id="Clipboard.ReadText"></a>

```vertex
func ReadText() -> string
```

<a id="Clipboard.WriteText"></a>

```vertex
func WriteText(_ text: string)
```

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

How a page is set up.

#### Initializers

<a id="Config.init"></a>

```vertex
public init(baseURL: string? = nil, backgroundColor: draw.Color = draw.Color.white, fetcher: fetch.Fetcher = fetch.Fetcher(),
            defersImages: bool = false)
```

#### Properties

<a id="Config.BaseURL"></a>

```vertex
public var BaseURL: string?
```

Where relative URLs in the page are resolved from: a directory
path or a file URL. Nil resolves nothing.

<a id="Config.BackgroundColor"></a>

```vertex
public var BackgroundColor: draw.Color
```

What shows behind a page that sets no background.

<a id="Config.Fetcher"></a>

```vertex
public var Fetcher: fetch.Fetcher
```

Where the page's resources come from: stylesheets, images, fonts.
By default, file paths under BaseURL are read from disk.

<a id="Config.DefersImages"></a>

```vertex
public var DefersImages: bool
```

Whether loading leaves the page's images for LoadImages, which
decodes them off the main thread, instead of decoding each as it
loads -- which a window's page wants, and a headless render
doesn't need.

### enum Cursor <a id="enum-Cursor"></a>

```vertex
public enum Cursor: Equatable
```

The pointer shape the page asks for where the pointer is.

#### Cases

<a id="Cursor.default"></a>

```vertex
case `default`
```

<a id="Cursor.pointer"></a>

```vertex
case pointer
```

<a id="Cursor.text"></a>

```vertex
case text
```

<a id="Cursor.crosshair"></a>

```vertex
case crosshair
```

<a id="Cursor.ewResize"></a>

```vertex
case ewResize
```

<a id="Cursor.nsResize"></a>

```vertex
case nsResize
```

### enum EventResult <a id="enum-EventResult"></a>

```vertex
public enum EventResult: Equatable
```

Whether the page took an input.

#### Cases

<a id="EventResult.handled"></a>

```vertex
case handled
```

<a id="EventResult.ignored"></a>

```vertex
case ignored
```

### enum Input <a id="enum-Input"></a>

```vertex
public enum Input
```

Something the user did to a page, in the page's coordinates. A host
turns its window's events into these (`ui/webview` does), or a test
makes them itself.

#### Cases

<a id="Input.pointerMoved"></a>

```vertex
case pointerMoved(draw.Point)
```

<a id="Input.pointerDown"></a>

```vertex
case pointerDown(Pointer)
```

<a id="Input.pointerUp"></a>

```vertex
case pointerUp(Pointer)
```

<a id="Input.pointerLeft"></a>

```vertex
case pointerLeft
```

The pointer left the page.

<a id="Input.wheel"></a>

```vertex
case wheel(Wheel)
```

<a id="Input.keyDown"></a>

```vertex
case keyDown(Key)
```

<a id="Input.text"></a>

```vertex
case text(string)
```

Text the user typed, after the keyboard layout and input method.

### struct Key <a id="struct-Key"></a>

```vertex
public struct Key
```

A key press, as the W3C's KeyboardEvent describes it.

#### Initializers

<a id="Key.init"></a>

```vertex
public init(Key: string, Code: string, Shift: bool = false, Control: bool = false, Alt: bool = false, Meta: bool = false)
```

#### Properties

<a id="Key.Key"></a>

```vertex
public var Key: string
```

What the key means: "a", "A", "Enter", "ArrowLeft", " ".

<a id="Key.Code"></a>

```vertex
public var Code: string
```

Where the key is, whatever the layout: "KeyA", "Enter", "Space".

<a id="Key.Shift"></a>

```vertex
public var Shift: bool
```

<a id="Key.Control"></a>

```vertex
public var Control: bool
```

<a id="Key.Alt"></a>

```vertex
public var Alt: bool
```

<a id="Key.Meta"></a>

```vertex
public var Meta: bool
```

Command on a Mac, the Windows key elsewhere.

<a id="Key.Shortcut"></a>

```vertex
public var Shortcut: bool { get }
```

Whether the platform's shortcut modifier is held: Command or Control.

### class Page <a id="class-Page"></a>

```vertex
@MainActor
public final class Page
```

An HTML page: parses, styles, lays out and paints what it is given,
takes input in its own coordinates, and tells its host what the user
did. It needs no window: a host puts it on screen (`ui/webview`), or
renders it into pixels itself.

Coordinates are CSS pixels from the top-left corner of the viewport.
Everything here runs on the main thread.

#### Initializers

<a id="Page.init"></a>

```vertex
public init(configuration: Config? = nil)
```

#### Properties

<a id="Page.Configuration"></a>

```vertex
public var Configuration: Config
```

<a id="Page.Document"></a>

```vertex
public internal(set) var Document: dom.Document?
```

The live document. Change it through its methods (or an
`Element`'s), which journal what they do: the next frame restyles
from the journal.

<a id="Page.Clipboard"></a>

```vertex
public var Clipboard: Clipboard? = nil
```

Where copy and paste go. Nil keeps them inside the page.

<a id="Page.Title"></a>

```vertex
public var Title: string { get }
```

The page's title, from <title>.

<a id="Page.PendingImages"></a>

```vertex
public var PendingImages: [string] { get }
```

The images the page names that it hasn't decoded yet (see
Config.DefersImages), as the page writes them.

<a id="Page.ViewportSize"></a>

```vertex
public var ViewportSize: draw.Size { get }
```

How big the viewport is, in CSS pixels.

<a id="Page.IsDark"></a>

```vertex
public var IsDark: bool { get }
```

Whether the page is shown in a dark color scheme.

<a id="Page.RootBox"></a>

```vertex
public var RootBox: layout.Box? { get }
```

The root of the layout tree.

<a id="Page.FocusedElement"></a>

```vertex
public var FocusedElement: html.Node? { get }
```

The element with keyboard focus.

<a id="Page.HasSelection"></a>

```vertex
public var HasSelection: bool { get }
```

Whether any text is selected.

#### Methods

<a id="Page.LoadHTML"></a>

```vertex
public func LoadHTML(_ source: string, baseURL: string? = nil)
```

Shows an HTML page. Its <style> elements and <link rel=stylesheet>
references are read; relative references resolve against baseURL
or the configuration's.

<a id="Page.LoadFile"></a>

```vertex
public func LoadFile(_ path: string) throws
```

Shows an HTML file from disk; its folder is the base for what it
refers to.

<a id="Page.LoadBytes"></a>

```vertex
public func LoadBytes(_ bytes: [uint8], contentType: string? = nil, baseURL: string? = nil)
```

Shows an HTML page from its bytes, decoded as the HTML standard
says: by a byte order mark, the Content-Type's charset, a <meta
charset>, or as UTF-8.

<a id="Page.SetStyleSheets"></a>

```vertex
public func SetStyleSheets(_ sheets: [string])
```

Sets the stylesheets the program gives the page, after the
document's own: a .vsx app's compiled .vss, in cascade order. The
page restyles; setting the sheets it has costs nothing.

<a id="Page.Resolve"></a>

```vertex
public func Resolve(_ url: string) -> string
```

A URL made absolute against the page's base: absolute ones and
fragments are left alone.

<a id="Page.SetImage"></a>

```vertex
public func SetImage(_ url: string, _ image: draw.Image)
```

Adds an image the page may refer to by URL, as when the host
fetches it; the page is laid out again with it.

<a id="Page.LoadImages"></a>

```vertex
public func LoadImages() async -> [string]
```

Decodes the images loading left (Config.DefersImages) on
sync.ThreadPoolExecutor.Shared, several at once, and gives them to
the page: a big image decodes without holding the main thread, or
a worker of the pool. Answers the URLs, resolved, of those that
didn't decode.

<a id="Page.SetColorScheme"></a>

```vertex
public func SetColorScheme(dark: bool)
```

Shows the page in a dark or a light color scheme, which is what
`@media (prefers-color-scheme: dark)` asks: the host sets it from
the system's appearance, and again when that changes.

<a id="Page.SetViewportSize"></a>

```vertex
public func SetViewportSize(_ size: draw.Size)
```

Resizes the viewport.

<a id="Page.ScrollOffset"></a>

```vertex
public func ScrollOffset() -> draw.Point
```

<a id="Page.SetScrollOffset"></a>

```vertex
public func SetScrollOffset(_ offset: draw.Point)
```

<a id="Page.ContentSize"></a>

```vertex
public func ContentSize() -> draw.Size
```

The size of the whole page.

<a id="Page.NeedsRepaint"></a>

```vertex
public func NeedsRepaint() -> bool
```

<a id="Page.NeedsAnimation"></a>

```vertex
public func NeedsAnimation() -> bool
```

Whether the page has something moving on its own -- a blinking
caret -- and wants frames while it does. A host that gets true
calls `Advance` with each frame's time and keeps requesting frames.

<a id="Page.Advance"></a>

```vertex
public func Advance(time: float64) -> bool
```

Moves the page's own animation to a time in seconds: the caret
blinks at a second per cycle. Answers whether a repaint is needed.

<a id="Page.DesiredCursor"></a>

```vertex
public func DesiredCursor() -> Cursor
```

The pointer shape for where the pointer is.

<a id="Page.OnNavigate"></a>

```vertex
public func OnNavigate(_ handler: (string) -> Void)
```

Called with the resolved URL when the user follows a link.

<a id="Page.OnSubmit"></a>

```vertex
public func OnSubmit(_ handler: (dom.Submission) -> Void)
```

Called when a form is submitted: by its button, or Enter in a field.

<a id="Page.OnAction"></a>

```vertex
public func OnAction(_ handler: (string, string) -> Void)
```

Called when a button outside a form is pressed, with its name and value.

<a id="Page.OnTitleChanged"></a>

```vertex
public func OnTitleChanged(_ handler: (string) -> Void)
```

<a id="Page.OnHoverLink"></a>

```vertex
public func OnHoverLink(_ handler: (string?) -> Void)
```

Called with a link's URL as the pointer moves onto it, and nil off it.

<a id="Page.IsVisited"></a>

```vertex
public func IsVisited(_ handler: (string) -> bool)
```

Asked whether a resolved URL has been visited, for `:visited`.
Call `VisitedChanged()` when an answer changes.

<a id="Page.VisitedChanged"></a>

```vertex
public func VisitedChanged()
```

The host's visited set changed: links are matched again.

<a id="Page.Draw"></a>

```vertex
public func Draw(into pixels: inout [uint8], width: int32, height: int32, scale: float32, at origin: draw.Point = draw.Point.zero)
```

Paints the page into premultiplied RGBA pixels, `width` by `height`
device pixels, with its viewport's top-left corner at `origin` (in
CSS pixels) and `scale` device pixels to the CSS pixel.

<a id="Page.ElementAt"></a>

```vertex
public func ElementAt(_ p: draw.Point) -> html.Node?
```

The element under a point in the viewport, or nil.

<a id="Page.BoxFor"></a>

```vertex
public func BoxFor(_ node: html.Node) -> layout.Box?
```

The layout box of an element, once laid out.

<a id="Page.QuerySelector"></a>

```vertex
public func QuerySelector(_ sel: string) -> html.Node?
```

<a id="Page.QuerySelectorAll"></a>

```vertex
public func QuerySelectorAll(_ sel: string) -> [html.Node]
```

<a id="Page.SelectedText"></a>

```vertex
public func SelectedText() -> string
```

The selected text, with a line break where the selection spans lines.

<a id="Page.ClearSelection"></a>

```vertex
public func ClearSelection()
```

Clears the selection.

<a id="Page.SelectAll"></a>

```vertex
public func SelectAll()
```

Selects all the text on the page.

<a id="Page.Focus"></a>

```vertex
public func Focus(_ node: html.Node?)
```

Gives an element focus, as clicking it or tabbing to it would.

<a id="Page.ScrollTo"></a>

```vertex
public func ScrollTo(_ node: html.Node)
```

Scrolls so that an element is at the top of the viewport.

<a id="Page.ScrollIntoViewIfNeeded"></a>

```vertex
public func ScrollIntoViewIfNeeded(_ node: html.Node)
```

Scrolls just enough to show an element.

<a id="Page.ValueOf"></a>

```vertex
public func ValueOf(_ node: html.Node) -> string
```

The text a form control holds now.

<a id="Page.Handle"></a>

```vertex
public func Handle(_ input: Input) -> EventResult
```

Takes an input. Pointer input inside the viewport, scrolling, and
keys while something in the page has focus are handled; the rest
is ignored and left to the host.

### struct Pointer <a id="struct-Pointer"></a>

```vertex
public struct Pointer
```

A button pressed or released.

#### Initializers

<a id="Pointer.init"></a>

```vertex
public init(_ position: draw.Point, button: PointerButton = PointerButton.primary, clicks: int32 = 1)
```

#### Properties

<a id="Pointer.Position"></a>

```vertex
public var Position: draw.Point
```

<a id="Pointer.Button"></a>

```vertex
public var Button: PointerButton
```

<a id="Pointer.Clicks"></a>

```vertex
public var Clicks: int32
```

2 for the press of a double click, 3 for a triple.

### enum PointerButton <a id="enum-PointerButton"></a>

```vertex
public enum PointerButton: Equatable
```

#### Cases

<a id="PointerButton.primary"></a>

```vertex
case primary
```

<a id="PointerButton.secondary"></a>

```vertex
case secondary
```

<a id="PointerButton.middle"></a>

```vertex
case middle
```

<a id="PointerButton.other"></a>

```vertex
case other
```

### struct Wheel <a id="struct-Wheel"></a>

```vertex
public struct Wheel
```

A scroll wheel or trackpad: `Delta` in lines, or in CSS pixels when
`Precise`.

#### Initializers

<a id="Wheel.init"></a>

```vertex
public init(_ delta: draw.Point, precise: bool = false)
```

#### Properties

<a id="Wheel.Delta"></a>

```vertex
public var Delta: draw.Point
```

<a id="Wheel.Precise"></a>

```vertex
public var Precise: bool
```

## Files

- input.vs
- page.vs
- util.vs
