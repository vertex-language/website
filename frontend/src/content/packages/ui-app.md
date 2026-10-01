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
handlers they run write state; and the root is rendered again and the
page patched once the event is done (proposed_vsx.md §8.1). This is the
first form of app.Run: one window, and styles given as a string until
.vss files are compiled. `--snapshot out.png` on the command line draws
the first frame into a PNG and quits; `--dark` and `--light` show the app
in that appearance, whatever the system's.

## Index

- [`func Run(title: string, width: float32 = 800, height: float32 = 600, css: string = "", _ root: () -> component.Node) async -> int32`](#func-Run)

## Functions

### func Run <a id="func-Run"></a>

```vertex
@MainActor
public func Run(title: string, width: float32 = 800, height: float32 = 600, css: string = "", _ root: () -> component.Node) async -> int32
```

Opens a window titled title, mounts root in it, and runs until the
window is closed. Answers the program's exit status.

## Files

- app.vs
