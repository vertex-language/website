# package webview

```vertex
import "ui/webview"
```

Pages from the network: the page and what it refers to are fetched
before the page is shown, and handed to it from memory. The report
says what came back and what the engine couldn't use -- the list of
what a site still needs.

## Index

- [`func CodeName(_ code: window.KeyCode) -> string`](#func-CodeName)
- [`struct LoadReport`](#struct-LoadReport)
  - [`var URL: string`](#LoadReport.URL)
  - [`var Status: int32`](#LoadReport.Status)
  - [`var ContentType: string`](#LoadReport.ContentType)
  - [`var Error: string`](#LoadReport.Error)
  - [`var Bytes: int`](#LoadReport.Bytes)
  - [`var Resources: int`](#LoadReport.Resources)
  - [`var Milliseconds: int`](#LoadReport.Milliseconds)
  - [`var Stylesheets: int`](#LoadReport.Stylesheets)
  - [`var StylesheetsLoaded: int`](#LoadReport.StylesheetsLoaded)
  - [`var Images: int`](#LoadReport.Images)
  - [`var ImagesDecoded: int`](#LoadReport.ImagesDecoded)
  - [`var Fonts: int`](#LoadReport.Fonts)
  - [`var FontsLoaded: int = 0`](#LoadReport.FontsLoaded)
  - [`var FontsWoff2: int = 0`](#LoadReport.FontsWoff2)
  - [`var Failed: [string]`](#LoadReport.Failed)
  - [`var Undecodable: [string]`](#LoadReport.Undecodable)
  - [`var Coverage: css.Coverage`](#LoadReport.Coverage)
  - [`func Text() -> string`](#LoadReport.Text)
- [`final class WebView`](#class-WebView)
  - [`init(page: web.Page? = nil)`](#WebView.init)
  - [`let Page: web.Page`](#WebView.Page)
  - [`var StartPage: string = ""`](#WebView.StartPage)
  - [`var RecordInto: string? = nil`](#WebView.RecordInto)
  - [`var URL: string { get }`](#WebView.URL)
  - [`var IsLoading: bool { get }`](#WebView.IsLoading)
  - [`var CanGoBack: bool { get }`](#WebView.CanGoBack)
  - [`var CanGoForward: bool { get }`](#WebView.CanGoForward)
  - [`func SetBounds(origin: window.Point, size: window.Size)`](#WebView.SetBounds)
  - [`func Bounds() -> (origin: window.Point, size: window.Size)`](#WebView.Bounds)
  - [`func Handle(_ event: window.Event) -> web.EventResult`](#WebView.Handle)
  - [`func Input(_ event: window.Event) -> web.Input?`](#WebView.Input)
  - [`func ElementAt(_ p: window.Point) -> html.Node?`](#WebView.ElementAt)
  - [`func Draw(into pixels: inout [uint8], canvasSize: window.PixelSize, scale: float32)`](#WebView.Draw)
  - [`func NeedsRepaint() -> bool`](#WebView.NeedsRepaint)
  - [`func NeedsAnimation() -> bool`](#WebView.NeedsAnimation)
  - [`func Advance(time: float64) -> bool`](#WebView.Advance)
  - [`func DesiredCursor() -> window.Cursor`](#WebView.DesiredCursor)
  - [`func OnLoadStarted(_ handler: (string) -> Void)`](#WebView.OnLoadStarted)
  - [`func OnLoadFinished(_ handler: (LoadReport) -> Void)`](#WebView.OnLoadFinished)
  - [`func OnNeedsDisplay(_ handler: () -> Void)`](#WebView.OnNeedsDisplay)
  - [`func Navigate(_ address: string)`](#WebView.Navigate)
  - [`func Back()`](#WebView.Back)
  - [`func Forward()`](#WebView.Forward)
  - [`func Reload()`](#WebView.Reload)
  - [`func MarkVisited(_ address: string)`](#WebView.MarkVisited)

## Functions

### func CodeName <a id="func-CodeName"></a>

```vertex
public func CodeName(_ code: window.KeyCode) -> string
```

A key's W3C `KeyboardEvent.code` name: "KeyA", "Digit1", "ArrowLeft".

## Types

### struct LoadReport <a id="struct-LoadReport"></a>

```vertex
public struct LoadReport
```

What a load brought back, and what the engine couldn't use: the list
of what a site still needs.

#### Properties

<a id="LoadReport.URL"></a>

```vertex
public var URL: string
```

Where the page ended up, after redirects.

<a id="LoadReport.Status"></a>

```vertex
public var Status: int32
```

The page's HTTP status; 0 where it failed before one (Error says
why), 200 for a file.

<a id="LoadReport.ContentType"></a>

```vertex
public var ContentType: string
```

<a id="LoadReport.Error"></a>

```vertex
public var Error: string
```

<a id="LoadReport.Bytes"></a>

```vertex
public var Bytes: int
```

<a id="LoadReport.Resources"></a>

```vertex
public var Resources: int
```

<a id="LoadReport.Milliseconds"></a>

```vertex
public var Milliseconds: int
```

<a id="LoadReport.Stylesheets"></a>

```vertex
public var Stylesheets: int
```

<a id="LoadReport.StylesheetsLoaded"></a>

```vertex
public var StylesheetsLoaded: int
```

<a id="LoadReport.Images"></a>

```vertex
public var Images: int
```

<a id="LoadReport.ImagesDecoded"></a>

```vertex
public var ImagesDecoded: int
```

<a id="LoadReport.Fonts"></a>

```vertex
public var Fonts: int
```

Web fonts @font-face names; those fetched, and those left out as
WOFF2, which isn't unpacked yet.

<a id="LoadReport.FontsLoaded"></a>

```vertex
public var FontsLoaded: int = 0
```

<a id="LoadReport.FontsWoff2"></a>

```vertex
public var FontsWoff2: int = 0
```

<a id="LoadReport.Failed"></a>

```vertex
public var Failed: [string]
```

"stylesheet URL: why" for each that failed.

<a id="LoadReport.Undecodable"></a>

```vertex
public var Undecodable: [string]
```

"URL: content type" for each image nothing here decodes.

<a id="LoadReport.Coverage"></a>

```vertex
public var Coverage: css.Coverage
```

What the stylesheets declare, and what the engine applies.

#### Methods

<a id="LoadReport.Text"></a>

```vertex
public func Text() -> string
```

The report as text, for a terminal.

### class WebView <a id="class-WebView"></a>

```vertex
@MainActor
public final class WebView
```

A web page inside a window: the part of the window it covers, the
window's events turned into the page's input, the page's cursor, the
system clipboard, and navigation -- files, and pages from the network
with what they refer to, history, and what links lead to
(navigation.vs). The page itself -- styles, layout, forms, selection
-- is `Page`, a `web.Page`, which needs no window.

Everything here runs on the main thread, where the window is.

#### Initializers

<a id="WebView.init"></a>

```vertex
public init(page: web.Page? = nil)
```

#### Properties

<a id="WebView.Page"></a>

```vertex
public let Page: web.Page
```

The page this view shows.

<a id="WebView.StartPage"></a>

```vertex
public var StartPage: string = ""
```

Where "about:home" goes, and "" does: a file path or URL.

<a id="WebView.RecordInto"></a>

```vertex
public var RecordInto: string? = nil
```

A folder each page from the network is recorded into, with what it
refers to, for web/cmd/snapshot --archive to show offline.

<a id="WebView.URL"></a>

```vertex
public var URL: string { get }
```

The address the view shows, after redirects: a URL or a path.

<a id="WebView.IsLoading"></a>

```vertex
public var IsLoading: bool { get }
```

Whether a page is on its way from the network.

<a id="WebView.CanGoBack"></a>

```vertex
public var CanGoBack: bool { get }
```

<a id="WebView.CanGoForward"></a>

```vertex
public var CanGoForward: bool { get }
```

#### Methods

<a id="WebView.SetBounds"></a>

```vertex
public func SetBounds(origin: window.Point, size: window.Size)
```

Where the view sits in the window, and how big it is, in points.

<a id="WebView.Bounds"></a>

```vertex
public func Bounds() -> (origin: window.Point, size: window.Size)
```

<a id="WebView.Handle"></a>

```vertex
public func Handle(_ event: window.Event) -> web.EventResult
```

Takes a window event: pointer events inside the view's bounds,
scrolling, and keys while something in the page has focus are
handled; the rest is ignored and left to the host.

<a id="WebView.Input"></a>

```vertex
public func Input(_ event: window.Event) -> web.Input?
```

The page's input for a window event, in the page's coordinates;
nil for events a page doesn't take.

<a id="WebView.ElementAt"></a>

```vertex
public func ElementAt(_ p: window.Point) -> html.Node?
```

The element under a point in the window, or nil.

<a id="WebView.Draw"></a>

```vertex
public func Draw(into pixels: inout [uint8], canvasSize: window.PixelSize, scale: float32)
```

Paints the page into the window's pixels at the view's bounds.

<a id="WebView.NeedsRepaint"></a>

```vertex
public func NeedsRepaint() -> bool
```

<a id="WebView.NeedsAnimation"></a>

```vertex
public func NeedsAnimation() -> bool
```

<a id="WebView.Advance"></a>

```vertex
public func Advance(time: float64) -> bool
```

<a id="WebView.DesiredCursor"></a>

```vertex
public func DesiredCursor() -> window.Cursor
```

The window cursor for what the pointer is over.

<a id="WebView.OnLoadStarted"></a>

```vertex
public func OnLoadStarted(_ handler: (string) -> Void)
```

Called as a load starts, with its address.

<a id="WebView.OnLoadFinished"></a>

```vertex
public func OnLoadFinished(_ handler: (LoadReport) -> Void)
```

Called once a page is shown, or has failed, with what came back:
the host redraws, and may print the report.

<a id="WebView.OnNeedsDisplay"></a>

```vertex
public func OnNeedsDisplay(_ handler: () -> Void)
```

Called when the view changed on its own and wants drawing again:
a page shown before its images, and again as they arrive.

<a id="WebView.Navigate"></a>

```vertex
public func Navigate(_ address: string)
```

Shows an address, adding it to the history: http(s) URLs from the
network, file: URLs and paths from disk, and "about:home" (or "")
the start page.

<a id="WebView.Back"></a>

```vertex
public func Back()
```

<a id="WebView.Forward"></a>

```vertex
public func Forward()
```

<a id="WebView.Reload"></a>

```vertex
public func Reload()
```

Shows the current address again, from the network or disk.

<a id="WebView.MarkVisited"></a>

```vertex
public func MarkVisited(_ address: string)
```

Marks an address visited, for :visited.

## Files

- load.vs
- navigation.vs
- webview.vs
