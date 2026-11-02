# package viewport

```vertex
import "ui/viewport"
```

Package viewport is a box in a .vsx page that something else fills: a
web view, a remote desktop, a virtual machine's screen, a canvas, a 3D
view, a terminal. The box is laid out, styled and sized by the page's
CSS like any element; a Source makes its pixels at the box's size each
frame it wants one, and is given what the user does in the box.

```vertex
<Viewport source={screen} class="screen" focusable />
```

What the page paints over the box (a toolbar, a status line positioned
on top) is painted again over each frame, so overlays work; the page
itself is painted only when it changes. ui/app is the host: on the GPU
where the platform has one (Accelerator, accel.vs), and otherwise it
calls Composite after drawing the page, as componenttest does. A source
draws with Draw (pixels, which every host takes) and, to skip the copy
through the host on the GPU, DrawTexture.

## Index

- [`func Composite(page: web.Page, pixels: inout [uint8], width: int, height: int, scale: float32, time: float64, all: bool = true) -> bool`](#func-Composite)
- [`func SetWaker(wake: (() -> void)?)`](#func-SetWaker)
- [`func Viewport(source: Source, class: string = "viewport", live: bool = false, focusable: bool = false) -> component.Node`](#func-Viewport)
- [`func Wanted() -> bool`](#func-Wanted)
- [`final class Accelerator`](#class-Accelerator)
  - [`let Device: gpu.Device`](#Accelerator.Device)
  - [`static func Make(view: uint64, width: int, height: int, scale: float64) -> Accelerator?`](#Accelerator.Make)
  - [`static func Offscreen(width: int, height: int) -> Accelerator?`](#Accelerator.Offscreen)
  - [`func Resize(width: int, height: int, scale: float64)`](#Accelerator.Resize)
  - [`func Present(page: web.Page, pagePixels: [uint8], repainted: bool, scale: float32, time: float64) -> bool`](#Accelerator.Present)
  - [`func Capture() -> [uint8]?`](#Accelerator.Capture)
  - [`func ReadBack() -> [uint8]`](#Accelerator.ReadBack)
  - [`func Draw(page: web.Page, into target: gpu.Texture, width: int, height: int, scale: float32, time: float64, all: bool) -> bool`](#Accelerator.Draw)
- [`final class Drawing: Source`](#class-Drawing)
  - [`init(draw: @escaping (int, int, float64) -> [uint8])`](#Drawing.init)
  - [`override func Draw(frame: Frame) -> [uint8]`](#Drawing.Draw)
- [`struct Frame`](#struct-Frame)
  - [`init(width: int, height: int, scale: float32, time: float64)`](#Frame.init)
  - [`let Width: int`](#Frame.Width)
  - [`let Height: int`](#Frame.Height)
  - [`let Scale: float32`](#Frame.Scale)
  - [`let Time: float64`](#Frame.Time)
- [`final class Handle`](#class-Handle)
  - [`var Origin: (X: float32, Y: float32) { get }`](#Handle.Origin)
  - [`var Size: (Width: float32, Height: float32) { get }`](#Handle.Size)
  - [`var Live: bool { get set }`](#Handle.Live)
  - [`var Cursor: string { get set }`](#Handle.Cursor)
  - [`func Invalidate()`](#Handle.Invalidate)
  - [`func Focus()`](#Handle.Focus)
- [`class Source`](#class-Source)
  - [`init()`](#Source.init)
  - [`func Draw(frame: Frame) -> [uint8]`](#Source.Draw)
  - [`func DrawTexture(frame: Frame, device: gpu.Device) -> gpu.Texture?`](#Source.DrawTexture)
  - [`func Attached(handle: Handle)`](#Source.Attached)
  - [`func Detached()`](#Source.Detached)
  - [`func PointerDown(e: dom.PointerEvent, x: float32, y: float32)`](#Source.PointerDown)
  - [`func PointerMove(e: dom.PointerEvent, x: float32, y: float32)`](#Source.PointerMove)
  - [`func PointerUp(e: dom.PointerEvent, x: float32, y: float32)`](#Source.PointerUp)
  - [`func PointerLeave()`](#Source.PointerLeave)
  - [`func Wheel(e: dom.WheelEvent, x: float32, y: float32)`](#Source.Wheel)
  - [`func KeyDown(e: dom.KeyboardEvent)`](#Source.KeyDown)
  - [`func KeyUp(e: dom.KeyboardEvent)`](#Source.KeyUp)
  - [`func Text(e: dom.InputEvent)`](#Source.Text)
  - [`func Composition(e: dom.CompositionEvent)`](#Source.Composition)
  - [`func Focus(focused: bool)`](#Source.Focus)

## Functions

### func Composite <a id="func-Composite"></a>

```vertex
@MainActor
@discardableResult
public func Composite(page: web.Page, pixels: inout [uint8], width: int, height: int, scale: float32, time: float64,
                      all: bool = true) -> bool
```

Composite draws the page's viewports into the pixels the page was
drawn into (canvas size in device pixels, scale device pixels per CSS
pixel), each clipped to the canvas. With all false only the ones that
want a frame (live, or invalidated) are drawn; the host passes true
when it has just painted the page over them. Answers whether it drew
any.

### func SetWaker <a id="func-SetWaker"></a>

```vertex
public func SetWaker(wake: (() -> void)?)
```

SetWaker gives the host's way of asking for a frame, which Invalidate
calls, so a viewport invalidated outside an event (by a task) is drawn.
ui/app sets it.

### func Viewport <a id="func-Viewport"></a>

```vertex
@MainActor
public func Viewport(source: Source, class: string = "viewport", live: bool = false, focusable: bool = false) -> component.Node
```

Viewport is the element a source fills: a div with the given class,
drawn by `source`, given the pointer over it and, `focusable`, the
keyboard once clicked. `live` draws it every frame.

```vertex
<Viewport source={screen} class="screen" live />
```

### func Wanted <a id="func-Wanted"></a>

```vertex
public func Wanted() -> bool
```

Wanted is whether any viewport in the page wants a frame: a live one,
or one invalidated since it was last drawn.

## Types

### class Accelerator <a id="class-Accelerator"></a>

```vertex
@MainActor
public final class Accelerator
```

The GPU host of a window's page and viewports.

#### Properties

<a id="Accelerator.Device"></a>

```vertex
public let Device: gpu.Device
```

#### Methods

<a id="Accelerator.Make"></a>

```vertex
public static func Make(view: uint64, width: int, height: int, scale: float64) -> Accelerator?
```

Make lays a GPU layer over a window's native view (window.Surface's
RawParts().view) for frames width × height pixels, or answers nil
where there is no GPU to draw with: no Metal device, a view the
layer can't attach to, or VSX_NO_GPU set in the environment. The
host then draws on the CPU.

<a id="Accelerator.Offscreen"></a>

```vertex
public static func Offscreen(width: int, height: int) -> Accelerator?
```

Offscreen is an accelerator with no window: frames are composed
on the device and read back with ReadBack, for tests and
snapshots. Nil where there is no GPU.

<a id="Accelerator.Resize"></a>

```vertex
public func Resize(width: int, height: int, scale: float64)
```

Resize follows the window: new textures at its size, which the
next frame fills (the host paints the page again after a resize).

<a id="Accelerator.Present"></a>

```vertex
@discardableResult
public func Present(page: web.Page, pagePixels: [uint8], repainted: bool, scale: float32, time: float64) -> bool
```

Present shows the page and its viewports. pagePixels is the page as
painted, width × height; with repainted it changed (or this is
the first frame) and goes up to the device, every viewport is
drawn again, and the overlay is made again. Otherwise only the
viewports that want a frame are drawn. Answers whether anything
was shown.

<a id="Accelerator.Capture"></a>

```vertex
public func Capture() -> [uint8]?
```

Capture is what the last frame showed, read back: the page, its
viewports and what is painted over them (a snapshot). Nil where
the layer can't read back.

<a id="Accelerator.ReadBack"></a>

```vertex
public func ReadBack() -> [uint8]
```

ReadBack is the composed frame read from the device: the scene,
with the overlay put over it on the host. Width × Height RGBA.

<a id="Accelerator.Draw"></a>

```vertex
@discardableResult
public func Draw(page: web.Page, into target: gpu.Texture, width: int, height: int, scale: float32, time: float64, all: bool) -> bool
```

Draw puts the viewports' frames into their boxes in a texture the
page's size (with all, every one; else those that want a frame),
on the device. Answers whether it drew any. What Present does
between uploading the page and showing it; a test calls it on a
texture of its own.

### class Drawing <a id="class-Drawing"></a>

```vertex
@MainActor
public final class Drawing: Source
```

A source that only draws, through a function of the frame's width,
height (device pixels) and time.

#### Initializers

<a id="Drawing.init"></a>

```vertex
public init(draw: @escaping (int, int, float64) -> [uint8])
```

#### Methods

<a id="Drawing.Draw"></a>

```vertex
public override func Draw(frame: Frame) -> [uint8]
```

### struct Frame <a id="struct-Frame"></a>

```vertex
public struct Frame
```

One frame a source is asked for: its box's size in device pixels, the
device pixels to a CSS pixel, and the frame's time in seconds.

#### Initializers

<a id="Frame.init"></a>

```vertex
public init(width: int, height: int, scale: float32, time: float64)
```

#### Properties

<a id="Frame.Width"></a>

```vertex
public let Width: int
```

<a id="Frame.Height"></a>

```vertex
public let Height: int
```

<a id="Frame.Scale"></a>

```vertex
public let Scale: float32
```

<a id="Frame.Time"></a>

```vertex
public let Time: float64
```

### class Handle <a id="class-Handle"></a>

```vertex
public final class Handle
```

Handle is a source's view of its box: to ask for a frame, to know where
the box is, to set the pointer's shape over it, and to take the
keyboard.

#### Properties

<a id="Handle.Origin"></a>

```vertex
public var Origin: (X: float32, Y: float32) { get }
```

Where the box was last drawn, in CSS pixels from the page
viewport's corner: what a page's pointer events are measured from.

<a id="Handle.Size"></a>

```vertex
public var Size: (Width: float32, Height: float32) { get }
```

The box's size when last drawn, in CSS pixels.

<a id="Handle.Live"></a>

```vertex
public var Live: bool { get set }
```

Whether the source is drawn every frame (an animation, a video) or
only when invalidated.

<a id="Handle.Cursor"></a>

```vertex
public var Cursor: string { get set }
```

The pointer's shape over the box, as CSS names it: "default",
"pointer", "text", "crosshair", "ew-resize", "ns-resize"; "" for
what the page's styles say.

#### Methods

<a id="Handle.Invalidate"></a>

```vertex
public func Invalidate()
```

Asks for a new frame from the source.

<a id="Handle.Focus"></a>

```vertex
public func Focus()
```

Gives the box the keyboard.

### class Source <a id="class-Source"></a>

```vertex
@MainActor
open class Source
```

What fills a viewport. A subclass overrides Draw, and what else it
takes: pointer positions are in CSS pixels from the box's corner.
Everything is called on the UI thread: a source is @MainActor, and so
is a subclass of it.

#### Initializers

<a id="Source.init"></a>

```vertex
public init()
```

#### Methods

<a id="Source.Draw"></a>

```vertex
open func Draw(frame: Frame) -> [uint8]
```

The frame's RGBA pixels, premultiplied, top row first, Width ×
Height of them. Fewer leaves the box as the page painted it.

<a id="Source.DrawTexture"></a>

```vertex
open func DrawTexture(frame: Frame, device: gpu.Device) -> gpu.Texture?
```

The frame drawn on the GPU, where the host draws with one: a
texture on `device`, Width × Height, premultiplied RGBA, shown in
the box with no copy through the host. Nil (the default) has the
host take Draw's pixels instead. A source that overrides this
still answers Draw, which is what a host without a GPU shows.

<a id="Source.Attached"></a>

```vertex
open func Attached(handle: Handle)
```

The source is in the document, in the box `handle` is; Detached,
it is not, and is drawn no more.

<a id="Source.Detached"></a>

```vertex
open func Detached()
```

<a id="Source.PointerDown"></a>

```vertex
open func PointerDown(e: dom.PointerEvent, x: float32, y: float32)
```

<a id="Source.PointerMove"></a>

```vertex
open func PointerMove(e: dom.PointerEvent, x: float32, y: float32)
```

<a id="Source.PointerUp"></a>

```vertex
open func PointerUp(e: dom.PointerEvent, x: float32, y: float32)
```

<a id="Source.PointerLeave"></a>

```vertex
open func PointerLeave()
```

<a id="Source.Wheel"></a>

```vertex
open func Wheel(e: dom.WheelEvent, x: float32, y: float32)
```

<a id="Source.KeyDown"></a>

```vertex
open func KeyDown(e: dom.KeyboardEvent)
```

<a id="Source.KeyUp"></a>

```vertex
open func KeyUp(e: dom.KeyboardEvent)
```

<a id="Source.Text"></a>

```vertex
open func Text(e: dom.InputEvent)
```

Text typed while the box has the keyboard, after the keyboard
layout and input method: `e.Data`.

<a id="Source.Composition"></a>

```vertex
open func Composition(e: dom.CompositionEvent)
```

An input method composing text while the box has the keyboard:
compositionstart, compositionupdate (`e.Data`, what it has so far),
compositionend; what it commits comes as Text.

<a id="Source.Focus"></a>

```vertex
open func Focus(focused: bool)
```

The box took the keyboard, or lost it.

## Files

- accel.vs
- viewport.vs
