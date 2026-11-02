# package app

```vertex
import "ui/app"
```

Package app runs a .vsx program as a desktop app: a window, a page in
it drawn by the engine, and a root of markup mounted into the page.

```vertex
func main() async -> int32 {
    return await app.Run(title: "Counter", css: styles) { <Counter start={5} /> }
}
```

A click, a key or typing reaches the page's elements as events; the
handlers they run set state; and what that changes is rendered again and
the page patched once the event is done (docs/vsx.md in vsc). This is the
first form of app.Run: one window, and styles given as a string until
.vss files are compiled. `--snapshot out.png` on the command line draws
the first frame into a PNG and quits (`--snapshot-after 2`: the first
frame two seconds in); `--dark` and `--light` show the app
in that appearance, whatever the system's.

## Index

- [`func Beep()`](#func-Beep)
- [`func IsDark() -> bool`](#func-IsDark)
- [`func IsFullscreen() -> bool`](#func-IsFullscreen)
- [`func Minimize()`](#func-Minimize)
- [`func OnCloseRequest(f: (() -> bool)?)`](#func-OnCloseRequest)
- [`func Quit()`](#func-Quit)
- [`func RequestFrame()`](#func-RequestFrame)
- [`func Run(title: string, width: float32 = 800, height: float32 = 600, css: string = "", unifiedTitlebar: bool = false, root: () -> component.Node) async -> int32`](#func-Run)
- [`func SetAlwaysOnTop(on: bool)`](#func-SetAlwaysOnTop)
- [`func SetFullscreen(on: bool)`](#func-SetFullscreen)
- [`func SetOpacity(opacity: float32)`](#func-SetOpacity)
- [`func SetSize(width: float32, height: float32)`](#func-SetSize)
- [`func SetTitle(title: string)`](#func-SetTitle)
- [`func SetTitlebarBand(x: float32, band: float32)`](#func-SetTitlebarBand)
- [`func StartWindowDrag()`](#func-StartWindowDrag)
- [`func TitlebarDoubleClick()`](#func-TitlebarDoubleClick)

## Functions

### func Beep <a id="func-Beep"></a>

```vertex
public func Beep()
```

Beep plays the system's alert sound.

### func IsDark <a id="func-IsDark"></a>

```vertex
@MainActor
public func IsDark() -> bool
```

IsDark is whether the running app is shown in a dark color scheme:
the system's appearance, or what --dark or --light asked for. What a
viewport that draws itself follows, as the page's prefers-color-scheme
does.

### func IsFullscreen <a id="func-IsFullscreen"></a>

```vertex
@MainActor
public func IsFullscreen() -> bool
```

IsFullscreen is whether the window fills the screen.

### func Minimize <a id="func-Minimize"></a>

```vertex
@MainActor
public func Minimize()
```

Minimize puts the window in the Dock.

### func OnCloseRequest <a id="func-OnCloseRequest"></a>

```vertex
@MainActor
public func OnCloseRequest(f: (() -> bool)?)
```

OnCloseRequest gives a function asked when the user closes the window
(its close button, ⌘Q): true lets it close, false keeps it open (to
ask first, and Quit later).

### func Quit <a id="func-Quit"></a>

```vertex
public func Quit()
```

Quit ends the running app after the event or frame being handled, as
closing its window would.

### func RequestFrame <a id="func-RequestFrame"></a>

```vertex
@MainActor
public func RequestFrame()
```

RequestFrame asks for a frame of the running app: what a task that
changed state outside an event (data that arrived, a timer) calls so
the change is shown. Events and viewports' Invalidate ask by
themselves.

### func Run <a id="func-Run"></a>

```vertex
@MainActor
public func Run(title: string, width: float32 = 800, height: float32 = 600, css: string = "", unifiedTitlebar: bool = false,
                root: () -> component.Node) async -> int32
```

Opens a window titled title, mounts root in it, and runs until the
window is closed. Answers the program's exit status.

### func SetAlwaysOnTop <a id="func-SetAlwaysOnTop"></a>

```vertex
@MainActor
public func SetAlwaysOnTop(on: bool)
```

SetAlwaysOnTop keeps the window over other apps' windows, or not.

### func SetFullscreen <a id="func-SetFullscreen"></a>

```vertex
@MainActor
public func SetFullscreen(on: bool)
```

SetFullscreen puts the window on its own space, filling the screen,
or back.

### func SetOpacity <a id="func-SetOpacity"></a>

```vertex
@MainActor
public func SetOpacity(opacity: float32)
```

SetOpacity makes the whole window translucent, 0.05 to 1.

### func SetSize <a id="func-SetSize"></a>

```vertex
@MainActor
public func SetSize(width: float32, height: float32)
```

SetSize resizes the window's content, in points.

### func SetTitle <a id="func-SetTitle"></a>

```vertex
@MainActor
public func SetTitle(title: string)
```

SetTitle changes the running app's window title.

### func SetTitlebarBand <a id="func-SetTitlebarBand"></a>

```vertex
@MainActor
public func SetTitlebarBand(x: float32, band: float32)
```

SetTitlebarBand places the window buttons, with a unified title bar:
x points from the left, centered in a band band points tall.

### func StartWindowDrag <a id="func-StartWindowDrag"></a>

```vertex
@MainActor
public func StartWindowDrag()
```

StartWindowDrag moves the window with the pointer, from the press in
progress: for a page that draws its own title bar (`unifiedTitlebar`),
called when an empty part of it is pressed.

### func TitlebarDoubleClick <a id="func-TitlebarDoubleClick"></a>

```vertex
@MainActor
public func TitlebarDoubleClick()
```

TitlebarDoubleClick zooms or minimizes the window, as the user set a
title bar's double-click to.

## Files

- app.vs
