# package window

```vertex
import "ui/window"
```

## Index

- [`func Blit(source: borrowing [uint8], sourceSize: PixelSize, destination: inout [uint8], destinationSize: PixelSize, at origin: Point, scale: float32 = 1.0)`](#func-Blit)
- [`func ClipboardText() -> string`](#func-ClipboardText)
- [`func Create(title: string, size: Size = Size(1280, 720), options: Options = .default) throws -> Window`](#func-Create)
- [`func SetClipboardText(_ text: string)`](#func-SetClipboardText)
- [`enum Cursor: Equatable`](#enum-Cursor)
- [`enum Event`](#enum-Event)
- [`struct Frame`](#struct-Frame)
  - [`let Time: float64`](#Frame.Time)
  - [`let Interval: float64`](#Frame.Interval)
- [`enum KeyCode: int32`](#enum-KeyCode)
- [`struct KeyEvent`](#struct-KeyEvent)
  - [`init(Code: KeyCode, Key: string, Modifiers: Modifiers, Repeat: bool)`](#KeyEvent.init)
  - [`let Code: KeyCode`](#KeyEvent.Code)
  - [`let Key: string`](#KeyEvent.Key)
  - [`let Modifiers: Modifiers`](#KeyEvent.Modifiers)
  - [`let Repeat: bool`](#KeyEvent.Repeat)
- [`struct Modifiers`](#struct-Modifiers)
  - [`init()`](#Modifiers.init)
  - [`var Shift: bool`](#Modifiers.Shift)
  - [`var Control: bool`](#Modifiers.Control)
  - [`var Alt: bool`](#Modifiers.Alt)
  - [`var Meta: bool`](#Modifiers.Meta)
  - [`var CapsLock: bool`](#Modifiers.CapsLock)
- [`struct Options`](#struct-Options)
  - [`init()`](#Options.init)
  - [`var Resizable: bool = true`](#Options.Resizable)
  - [`var Decorated: bool = true`](#Options.Decorated)
  - [`var Visible: bool = true`](#Options.Visible)
  - [`var MinSize: Size? = nil`](#Options.MinSize)
  - [``static let `default` = Options()``](#Options.default)
- [`struct PixelSize`](#struct-PixelSize)
  - [`init(_ width: int32, _ height: int32)`](#PixelSize.init)
  - [`var Width: int32`](#PixelSize.Width)
  - [`var Height: int32`](#PixelSize.Height)
- [`struct Point`](#struct-Point)
  - [`init(_ x: float32, _ y: float32)`](#Point.init)
  - [`var X: float32`](#Point.X)
  - [`var Y: float32`](#Point.Y)
- [`struct Pointer`](#struct-Pointer)
  - [`init(Position: Point, Kind: PointerKind, Pressure: float32, Modifiers: Modifiers, Clicks: int32 = 1)`](#Pointer.init)
  - [`init(Position: Point, Clicks: int32 = 1)`](#Pointer.init-2)
  - [`let Position: Point`](#Pointer.Position)
  - [`let Kind: PointerKind`](#Pointer.Kind)
  - [`let Pressure: float32`](#Pointer.Pressure)
  - [`let Modifiers: Modifiers`](#Pointer.Modifiers)
  - [`let Clicks: int32`](#Pointer.Clicks)
- [`enum PointerButton`](#enum-PointerButton)
- [`enum PointerKind`](#enum-PointerKind)
- [`enum ScalingMode: int32`](#enum-ScalingMode)
- [`struct Scroll`](#struct-Scroll)
  - [`init(Delta: Point, Precise: bool, Modifiers: Modifiers)`](#Scroll.init)
  - [`init(Delta: Point, Precise: bool)`](#Scroll.init-2)
  - [`let Delta: Point`](#Scroll.Delta)
  - [`let Precise: bool`](#Scroll.Precise)
  - [`let Modifiers: Modifiers`](#Scroll.Modifiers)
- [`struct Size`](#struct-Size)
  - [`init(_ width: float32, _ height: float32)`](#Size.init)
  - [`var Width: float32`](#Size.Width)
  - [`var Height: float32`](#Size.Height)
- [`struct Surface`](#struct-Surface)
  - [`func (s: borrowing Surface) Present(_ pixels: borrowing [uint8], size: PixelSize) throws`](#Surface.Present)
  - [`func (s: borrowing Surface) SetScaling(_ mode: ScalingMode)`](#Surface.SetScaling)
  - [`func (s: borrowing Surface) RawParts() -> (kind: SurfaceKind, window: uint64, view: uint64)`](#Surface.RawParts)
- [`enum SurfaceKind`](#enum-SurfaceKind)
- [`enum Theme`](#enum-Theme)
- [`struct Window`](#struct-Window)
  - [`let Id: int32`](#Window.Id)
  - [`func (w: borrowing Window) Surface() -> Surface`](#Window.Surface)
  - [`func (w: borrowing Window) WaitEvent() async -> Event?`](#Window.WaitEvent)
  - [`func (w: borrowing Window) PollEvent() -> Event?`](#Window.PollEvent)
  - [`func (w: borrowing Window) RequestFrame()`](#Window.RequestFrame)
  - [`func (w: borrowing Window) Size() -> Size`](#Window.Size)
  - [`func (w: borrowing Window) PixelSize() -> PixelSize`](#Window.PixelSize)
  - [`func (w: borrowing Window) ScaleFactor() -> float32`](#Window.ScaleFactor)
  - [`func (w: borrowing Window) Theme() -> Theme`](#Window.Theme)
  - [`func (w: borrowing Window) Focused() -> bool`](#Window.Focused)
  - [`func (w: borrowing Window) SetTitle(_ title: string)`](#Window.SetTitle)
  - [`func (w: borrowing Window) SetSize(_ size: Size)`](#Window.SetSize)
  - [`func (w: borrowing Window) SetMinSize(_ size: Size)`](#Window.SetMinSize)
  - [`func (w: borrowing Window) SetVisible(_ visible: bool)`](#Window.SetVisible)
  - [`func (w: borrowing Window) SetFullscreen(_ fullscreen: bool)`](#Window.SetFullscreen)
  - [`func (w: borrowing Window) SetCursor(_ cursor: Cursor)`](#Window.SetCursor)
  - [`func (w: borrowing Window) SetCursorImage(_ pixels: borrowing [uint8], width: int32, height: int32, hotX: int32, hotY: int32, scale: float32 = 1) throws`](#Window.SetCursorImage)
  - [`func (w: consuming Window) Close()`](#Window.Close)
- [`enum WindowError: Error`](#enum-WindowError)
  - [`var Message: string { get }`](#WindowError.Message)

## Functions

### func Blit <a id="func-Blit"></a>

```vertex
public func Blit(
    source: borrowing [uint8],
    sourceSize: PixelSize,
    destination: inout [uint8],
    destinationSize: PixelSize,
    at origin: Point,
    scale: float32 = 1.0
)
```

Copies a rectangular block of premultiplied RGBA8 pixels from `source` into `destination`.
`origin` specifies the top-left offset in destination pixels where the source will be placed.

### func ClipboardText <a id="func-ClipboardText"></a>

```vertex
public func ClipboardText() -> string
```

The text on the system clipboard, or "" where it holds none.

### func Create <a id="func-Create"></a>

```vertex
public func Create(title: string, size: Size = Size(1280, 720),
                   options: Options = .default) throws -> Window
```

Makes a window with a title and a content size in points, centred on the
main display.

Must be called from the program's main thread, which is where `main` and
its tasks run.

### func SetClipboardText <a id="func-SetClipboardText"></a>

```vertex
public func SetClipboardText(_ text: string)
```

Puts text on the system clipboard, replacing what was there.

## Types

### enum Cursor <a id="enum-Cursor"></a>

```vertex
public enum Cursor: Equatable
```

The system mouse cursor shape.

#### Cases

<a id="Cursor.arrow"></a>

```vertex
case arrow
```

<a id="Cursor.pointingHand"></a>

```vertex
case pointingHand
```

<a id="Cursor.iBeam"></a>

```vertex
case iBeam
```

<a id="Cursor.crosshair"></a>

```vertex
case crosshair
```

<a id="Cursor.resizeLeftRight"></a>

```vertex
case resizeLeftRight
```

<a id="Cursor.resizeUpDown"></a>

```vertex
case resizeUpDown
```

<a id="Cursor.hidden"></a>

```vertex
case hidden
```

No cursor over this window.

### enum Event <a id="enum-Event"></a>

```vertex
public enum Event
```

Something that happened to a window.

#### Cases

<a id="Event.closeRequested"></a>

```vertex
case closeRequested
```

The user asked to close the window: the close button, or Quit. A
request -- nothing closes until the program calls `Close`, and a
program with unsaved work is free not to.

<a id="Event.focusChanged"></a>

```vertex
case focusChanged(bool)
```

The window became, or stopped being, the one keyboard input goes to.

<a id="Event.resized"></a>

```vertex
case resized(Size)
```

The window's content area is this size now.

<a id="Event.moved"></a>

```vertex
case moved(Point)
```

The window's top-left corner is here now, on its screen.

<a id="Event.scaleFactorChanged"></a>

```vertex
case scaleFactorChanged(float32)
```

Device pixels per point changed: the window moved to another display.

<a id="Event.pointerMoved"></a>

```vertex
case pointerMoved(Pointer)
```

<a id="Event.pointerDown"></a>

```vertex
case pointerDown(Pointer, PointerButton)
```

<a id="Event.pointerUp"></a>

```vertex
case pointerUp(Pointer, PointerButton)
```

<a id="Event.pointerLeft"></a>

```vertex
case pointerLeft
```

The pointer left the window's content area.

<a id="Event.scrolled"></a>

```vertex
case scrolled(Scroll)
```

<a id="Event.keyDown"></a>

```vertex
case keyDown(KeyEvent)
```

<a id="Event.keyUp"></a>

```vertex
case keyUp(KeyEvent)
```

<a id="Event.modifiersChanged"></a>

```vertex
case modifiersChanged(Modifiers)
```

<a id="Event.text"></a>

```vertex
case text(string)
```

Text the user typed, after the keyboard layout and any input method
have had their say. Not one character per key: a dead key types
nothing, and an input method commits a word at once.

<a id="Event.composition"></a>

```vertex
case composition(string)
```

Text an input method is composing and has not committed, to show in
place; "" when composition ends.

<a id="Event.frame"></a>

```vertex
case frame(Frame)
```

The display is about to show a frame: draw it now. Delivered once per
`RequestFrame`.

<a id="Event.themeChanged"></a>

```vertex
case themeChanged(Theme)
```

The system appearance changed.

### struct Frame <a id="struct-Frame"></a>

```vertex
public struct Frame
```

When a frame will be shown.

#### Properties

<a id="Frame.Time"></a>

```vertex
public let Time: float64
```

The time the frame is for, in seconds on the system's monotonic
clock -- what an animation should be computed at.

<a id="Frame.Interval"></a>

```vertex
public let Interval: float64
```

The display's current refresh interval, in seconds.

### enum KeyCode <a id="enum-KeyCode"></a>

```vertex
public enum KeyCode: int32
```

Where a key is on the keyboard, whatever the layout says it means: the
key labelled W on a US keyboard is `.w` under AZERTY too, where it types
Z. What a game binds, and what a shortcut should not.

The W3C calls this `KeyboardEvent.code`. What the key means is
`KeyEvent.Key`, and what it types arrives as `.text`.

#### Cases

<a id="KeyCode.unknown"></a>

```vertex
case unknown = 0
```

<a id="KeyCode.a"></a>

```vertex
case a = 1
```

<a id="KeyCode.b"></a>

```vertex
case b = 2
```

<a id="KeyCode.c"></a>

```vertex
case c = 3
```

<a id="KeyCode.d"></a>

```vertex
case d = 4
```

<a id="KeyCode.e"></a>

```vertex
case e = 5
```

<a id="KeyCode.f"></a>

```vertex
case f = 6
```

<a id="KeyCode.g"></a>

```vertex
case g = 7
```

<a id="KeyCode.h"></a>

```vertex
case h = 8
```

<a id="KeyCode.i"></a>

```vertex
case i = 9
```

<a id="KeyCode.j"></a>

```vertex
case j = 10
```

<a id="KeyCode.k"></a>

```vertex
case k = 11
```

<a id="KeyCode.l"></a>

```vertex
case l = 12
```

<a id="KeyCode.m"></a>

```vertex
case m = 13
```

<a id="KeyCode.n"></a>

```vertex
case n = 14
```

<a id="KeyCode.o"></a>

```vertex
case o = 15
```

<a id="KeyCode.p"></a>

```vertex
case p = 16
```

<a id="KeyCode.q"></a>

```vertex
case q = 17
```

<a id="KeyCode.r"></a>

```vertex
case r = 18
```

<a id="KeyCode.s"></a>

```vertex
case s = 19
```

<a id="KeyCode.t"></a>

```vertex
case t = 20
```

<a id="KeyCode.u"></a>

```vertex
case u = 21
```

<a id="KeyCode.v"></a>

```vertex
case v = 22
```

<a id="KeyCode.w"></a>

```vertex
case w = 23
```

<a id="KeyCode.x"></a>

```vertex
case x = 24
```

<a id="KeyCode.y"></a>

```vertex
case y = 25
```

<a id="KeyCode.z"></a>

```vertex
case z = 26
```

<a id="KeyCode.digit0"></a>

```vertex
case digit0 = 27
```

<a id="KeyCode.digit1"></a>

```vertex
case digit1 = 28
```

<a id="KeyCode.digit2"></a>

```vertex
case digit2 = 29
```

<a id="KeyCode.digit3"></a>

```vertex
case digit3 = 30
```

<a id="KeyCode.digit4"></a>

```vertex
case digit4 = 31
```

<a id="KeyCode.digit5"></a>

```vertex
case digit5 = 32
```

<a id="KeyCode.digit6"></a>

```vertex
case digit6 = 33
```

<a id="KeyCode.digit7"></a>

```vertex
case digit7 = 34
```

<a id="KeyCode.digit8"></a>

```vertex
case digit8 = 35
```

<a id="KeyCode.digit9"></a>

```vertex
case digit9 = 36
```

<a id="KeyCode.escape"></a>

```vertex
case escape = 40
```

<a id="KeyCode.enter"></a>

```vertex
case enter = 41
```

<a id="KeyCode.tab"></a>

```vertex
case tab = 42
```

<a id="KeyCode.space"></a>

```vertex
case space = 43
```

<a id="KeyCode.backspace"></a>

```vertex
case backspace = 44
```

<a id="KeyCode.delete"></a>

```vertex
case delete = 45
```

<a id="KeyCode.arrowLeft"></a>

```vertex
case arrowLeft = 46
```

<a id="KeyCode.arrowRight"></a>

```vertex
case arrowRight = 47
```

<a id="KeyCode.arrowUp"></a>

```vertex
case arrowUp = 48
```

<a id="KeyCode.arrowDown"></a>

```vertex
case arrowDown = 49
```

<a id="KeyCode.home"></a>

```vertex
case home = 50
```

<a id="KeyCode.end"></a>

```vertex
case end = 51
```

<a id="KeyCode.pageUp"></a>

```vertex
case pageUp = 52
```

<a id="KeyCode.pageDown"></a>

```vertex
case pageDown = 53
```

<a id="KeyCode.shiftLeft"></a>

```vertex
case shiftLeft = 60
```

<a id="KeyCode.shiftRight"></a>

```vertex
case shiftRight = 61
```

<a id="KeyCode.controlLeft"></a>

```vertex
case controlLeft = 62
```

<a id="KeyCode.controlRight"></a>

```vertex
case controlRight = 63
```

<a id="KeyCode.altLeft"></a>

```vertex
case altLeft = 64
```

<a id="KeyCode.altRight"></a>

```vertex
case altRight = 65
```

<a id="KeyCode.metaLeft"></a>

```vertex
case metaLeft = 66
```

<a id="KeyCode.metaRight"></a>

```vertex
case metaRight = 67
```

<a id="KeyCode.capsLock"></a>

```vertex
case capsLock = 68
```

<a id="KeyCode.f1"></a>

```vertex
case f1 = 70
```

<a id="KeyCode.f2"></a>

```vertex
case f2 = 71
```

<a id="KeyCode.f3"></a>

```vertex
case f3 = 72
```

<a id="KeyCode.f4"></a>

```vertex
case f4 = 73
```

<a id="KeyCode.f5"></a>

```vertex
case f5 = 74
```

<a id="KeyCode.f6"></a>

```vertex
case f6 = 75
```

<a id="KeyCode.f7"></a>

```vertex
case f7 = 76
```

<a id="KeyCode.f8"></a>

```vertex
case f8 = 77
```

<a id="KeyCode.f9"></a>

```vertex
case f9 = 78
```

<a id="KeyCode.f10"></a>

```vertex
case f10 = 79
```

<a id="KeyCode.f11"></a>

```vertex
case f11 = 80
```

<a id="KeyCode.f12"></a>

```vertex
case f12 = 81
```

<a id="KeyCode.minus"></a>

```vertex
case minus = 90
```

<a id="KeyCode.equal"></a>

```vertex
case equal = 91
```

<a id="KeyCode.bracketLeft"></a>

```vertex
case bracketLeft = 92
```

<a id="KeyCode.bracketRight"></a>

```vertex
case bracketRight = 93
```

<a id="KeyCode.backslash"></a>

```vertex
case backslash = 94
```

<a id="KeyCode.semicolon"></a>

```vertex
case semicolon = 95
```

<a id="KeyCode.quote"></a>

```vertex
case quote = 96
```

<a id="KeyCode.backquote"></a>

```vertex
case backquote = 97
```

<a id="KeyCode.comma"></a>

```vertex
case comma = 98
```

<a id="KeyCode.period"></a>

```vertex
case period = 99
```

<a id="KeyCode.slash"></a>

```vertex
case slash = 100
```

### struct KeyEvent <a id="struct-KeyEvent"></a>

```vertex
public struct KeyEvent
```

A key press or release.

#### Initializers

<a id="KeyEvent.init"></a>

```vertex
public init(Code: KeyCode, Key: string, Modifiers: Modifiers, Repeat: bool)
```

#### Properties

<a id="KeyEvent.Code"></a>

```vertex
public let Code: KeyCode
```

Where the key is.

<a id="KeyEvent.Key"></a>

```vertex
public let Key: string
```

What it means under the current layout, as the W3C writes it: "a",
"A", "Enter", "ArrowLeft", "F5".

<a id="KeyEvent.Modifiers"></a>

```vertex
public let Modifiers: Modifiers
```

<a id="KeyEvent.Repeat"></a>

```vertex
public let Repeat: bool
```

Whether this is the key repeating while it is held.

### struct Modifiers <a id="struct-Modifiers"></a>

```vertex
public struct Modifiers
```

The modifier keys held down.

#### Initializers

<a id="Modifiers.init"></a>

```vertex
public init()
```

#### Properties

<a id="Modifiers.Shift"></a>

```vertex
public var Shift: bool
```

<a id="Modifiers.Control"></a>

```vertex
public var Control: bool
```

<a id="Modifiers.Alt"></a>

```vertex
public var Alt: bool
```

<a id="Modifiers.Meta"></a>

```vertex
public var Meta: bool
```

Command on a Mac, the Windows key elsewhere.

<a id="Modifiers.CapsLock"></a>

```vertex
public var CapsLock: bool
```

### struct Options <a id="struct-Options"></a>

```vertex
public struct Options
```

How a window is made, for the cases where the defaults are not wanted.

#### Initializers

<a id="Options.init"></a>

```vertex
public init()
```

#### Properties

<a id="Options.Resizable"></a>

```vertex
public var Resizable: bool = true
```

The user can resize it. On by default.

<a id="Options.Decorated"></a>

```vertex
public var Decorated: bool = true
```

It has a title bar and a border. On by default.

<a id="Options.Visible"></a>

```vertex
public var Visible: bool = true
```

It is shown as soon as it is made. On by default.

<a id="Options.MinSize"></a>

```vertex
public var MinSize: Size? = nil
```

The smallest content size the user can resize it to.

<a id="Options.default"></a>

```vertex
public static let `default` = Options()
```

What `Create` uses when it is not given anything else.

### struct PixelSize <a id="struct-PixelSize"></a>

```vertex
public struct PixelSize
```

A size in device pixels: what a surface is measured in. Kept a
different type from `Size` so that the two cannot be mixed up.

#### Initializers

<a id="PixelSize.init"></a>

```vertex
public init(_ width: int32, _ height: int32)
```

#### Properties

<a id="PixelSize.Width"></a>

```vertex
public var Width: int32
```

<a id="PixelSize.Height"></a>

```vertex
public var Height: int32
```

### struct Point <a id="struct-Point"></a>

```vertex
public struct Point
```

A position in points, from the top-left corner.

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

### struct Pointer <a id="struct-Pointer"></a>

```vertex
public struct Pointer
```

A mouse, a pen or a finger.

#### Initializers

<a id="Pointer.init"></a>

```vertex
public init(Position: Point, Kind: PointerKind, Pressure: float32, Modifiers: Modifiers, Clicks: int32 = 1)
```

<a id="Pointer.init-2"></a>

```vertex
public init(Position: Point, Clicks: int32 = 1)
```

#### Properties

<a id="Pointer.Position"></a>

```vertex
public let Position: Point
```

In points, from the content area's top-left corner.

<a id="Pointer.Kind"></a>

```vertex
public let Kind: PointerKind
```

<a id="Pointer.Pressure"></a>

```vertex
public let Pressure: float32
```

0 to 1 for a device that measures it, and 0 for one that does not.

<a id="Pointer.Modifiers"></a>

```vertex
public let Modifiers: Modifiers
```

<a id="Pointer.Clicks"></a>

```vertex
public let Clicks: int32
```

How many presses in quick succession this is part of, on a press
or release: 2 for a double click, 3 for a triple. 1 otherwise.

### enum PointerButton <a id="enum-PointerButton"></a>

```vertex
public enum PointerButton
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

### enum PointerKind <a id="enum-PointerKind"></a>

```vertex
public enum PointerKind
```

#### Cases

<a id="PointerKind.mouse"></a>

```vertex
case mouse
```

<a id="PointerKind.pen"></a>

```vertex
case pen
```

<a id="PointerKind.touch"></a>

```vertex
case touch
```

### enum ScalingMode <a id="enum-ScalingMode"></a>

```vertex
public enum ScalingMode: int32
```

Content scaling mode for a surface.

#### Cases

<a id="ScalingMode.aspectFit"></a>

```vertex
case aspectFit = 0
```

<a id="ScalingMode.stretch"></a>

```vertex
case stretch = 1
```

<a id="ScalingMode.center"></a>

```vertex
case center = 2
```

<a id="ScalingMode.topLeft"></a>

```vertex
case topLeft = 3
```

### struct Scroll <a id="struct-Scroll"></a>

```vertex
public struct Scroll
```

A scroll gesture's movement.

#### Initializers

<a id="Scroll.init"></a>

```vertex
public init(Delta: Point, Precise: bool, Modifiers: Modifiers)
```

<a id="Scroll.init-2"></a>

```vertex
public init(Delta: Point, Precise: bool)
```

#### Properties

<a id="Scroll.Delta"></a>

```vertex
public let Delta: Point
```

How far, in points where `Precise` and in lines where not.

<a id="Scroll.Precise"></a>

```vertex
public let Precise: bool
```

A trackpad scrolls precisely; a wheel scrolls in lines.

<a id="Scroll.Modifiers"></a>

```vertex
public let Modifiers: Modifiers
```

### struct Size <a id="struct-Size"></a>

```vertex
public struct Size
```

A size in points: what a window is measured in, and what input arrives
in. A point is a pixel on a standard display and more than one on a
high-density one; `Window.ScaleFactor` says how many.

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

### struct Surface <a id="struct-Surface"></a>

```vertex
public struct Surface
```

What a window shows.

#### Methods

<a id="Surface.Present"></a>

```vertex
public func (s: borrowing Surface) Present(_ pixels: borrowing [uint8], size: PixelSize) throws
```

Shows pixels: `size.Width * size.Height` of them, four bytes each --
red, green, blue, alpha, premultiplied -- top row first. They are
copied, so the buffer is the caller's again as soon as this returns.

Size them with `Window.PixelSize` to fill the window at full resolution.

<a id="Surface.SetScaling"></a>

```vertex
public func (s: borrowing Surface) SetScaling(_ mode: ScalingMode)
```

Sets the surface content scaling mode.

<a id="Surface.RawParts"></a>

```vertex
public func (s: borrowing Surface) RawParts() -> (kind: SurfaceKind, window: uint64, view: uint64)
```

The native objects behind the surface, for a renderer that binds its own
swapchain to them and for nothing else. Application code draws with
`Present`, or with such a renderer, and never needs this.

### enum SurfaceKind <a id="enum-SurfaceKind"></a>

```vertex
public enum SurfaceKind
```

What kind of native objects `RawParts` hands back.

#### Cases

<a id="SurfaceKind.appKit"></a>

```vertex
case appKit
```

An NSWindow and the NSView that is its content.

### enum Theme <a id="enum-Theme"></a>

```vertex
public enum Theme
```

#### Cases

<a id="Theme.light"></a>

```vertex
case light
```

<a id="Theme.dark"></a>

```vertex
case dark
```

### struct Window <a id="struct-Window"></a>

```vertex
public struct Window
```

A native window.

Waiting for what happens to it is `async`: `WaitEvent` parks the task it
is called on until the window has an event, and everything else the
program has going runs meanwhile, on the same thread. Everything else here
is immediate.

A window does not close itself. `.closeRequested` asks; `Close` does it.

#### Properties

<a id="Window.Id"></a>

```vertex
public let Id: int32
```

The window's number, for code that has to reach past this package.

#### Methods

<a id="Window.Surface"></a>

```vertex
public func (w: borrowing Window) Surface() -> Surface
```

The window's surface.

<a id="Window.WaitEvent"></a>

```vertex
public func (w: borrowing Window) WaitEvent() async -> Event?
```

Waits for the next event and returns it, or nil once the window is
closed.

On a task this parks that task: other tasks run, and the thread sleeps in
the window system's own wait when nothing at all can run.

<a id="Window.PollEvent"></a>

```vertex
public func (w: borrowing Window) PollEvent() -> Event?
```

The next event if one is already queued, and nil if none is. Never waits.

<a id="Window.RequestFrame"></a>

```vertex
public func (w: borrowing Window) RequestFrame()
```

Asks for one `.frame` event, at the display's next refresh. Ask again
from the frame to keep animating; stop asking to stop.

<a id="Window.Size"></a>

```vertex
public func (w: borrowing Window) Size() -> Size
```

The content area's size in points.

<a id="Window.PixelSize"></a>

```vertex
public func (w: borrowing Window) PixelSize() -> PixelSize
```

The content area's size in device pixels: what to size pixels for.

<a id="Window.ScaleFactor"></a>

```vertex
public func (w: borrowing Window) ScaleFactor() -> float32
```

Device pixels per point on the display the window is on.

<a id="Window.Theme"></a>

```vertex
public func (w: borrowing Window) Theme() -> Theme
```

The appearance the window is drawn in.

<a id="Window.Focused"></a>

```vertex
public func (w: borrowing Window) Focused() -> bool
```

Whether keyboard input goes to this window.

<a id="Window.SetTitle"></a>

```vertex
public func (w: borrowing Window) SetTitle(_ title: string)
```

<a id="Window.SetSize"></a>

```vertex
public func (w: borrowing Window) SetSize(_ size: Size)
```

Resizes the content area, in points.

<a id="Window.SetMinSize"></a>

```vertex
public func (w: borrowing Window) SetMinSize(_ size: Size)
```

<a id="Window.SetVisible"></a>

```vertex
public func (w: borrowing Window) SetVisible(_ visible: bool)
```

<a id="Window.SetFullscreen"></a>

```vertex
public func (w: borrowing Window) SetFullscreen(_ fullscreen: bool)
```

<a id="Window.SetCursor"></a>

```vertex
public func (w: borrowing Window) SetCursor(_ cursor: Cursor)
```

Changes the mouse cursor shape when hovered over this window.

<a id="Window.SetCursorImage"></a>

```vertex
public func (w: borrowing Window) SetCursorImage(_ pixels: borrowing [uint8], width: int32, height: int32,
                                                  hotX: int32, hotY: int32, scale: float32 = 1) throws
```

Shows a cursor drawn by the program over this window: `width * height`
pixels, four bytes each -- red, green, blue, alpha, premultiplied -- top
row first, `scale` pixels per point (2 for pixels drawn for Retina),
with the click point at pixel (hotX, hotY). It stays until the next
`SetCursor` or `SetCursorImage`.

<a id="Window.Close"></a>

```vertex
public func (w: consuming Window) Close()
```

Closes the window. It is consumed: nothing can be asked of it afterwards,
and a task waiting on it gets nil.

### enum WindowError <a id="enum-WindowError"></a>

```vertex
public enum WindowError: Error
```

Every way an operation in this package fails.

#### Cases

<a id="WindowError.unsupported"></a>

```vertex
case unsupported(string)
```

There is no window system here to ask.

<a id="WindowError.noDisplay"></a>

```vertex
case noDisplay(string)
```

There is a window system but no session to show a window in, or this
is not the thread it has to be asked from.

<a id="WindowError.invalidArgument"></a>

```vertex
case invalidArgument(string)
```

An argument the window system cannot use.

<a id="WindowError.systemError"></a>

```vertex
case systemError(code: int32, context: string)
```

Anything else, with what was being attempted.

#### Properties

<a id="WindowError.Message"></a>

```vertex
public var Message: string { get }
```

A sentence naming what failed.

## Files

- clipboard.vs
- decode.vs
- error.vs
- event.vs
- geometry.vs
- key.vs
- surface.vs
- window.vs
