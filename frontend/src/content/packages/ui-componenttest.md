# package componenttest

```vertex
import "ui/componenttest"
```

Package componenttest tests .vsx components as a user meets them:
mounted headless in a real page, found by role, label, text or
placeholder, clicked and typed into through the page's own input, and
looked at -- their computed styles, and their pixels against a golden
image (proposed_vsx.md §11).

```vertex
let screen = componenttest.Mount(width: 420, height: 600) { <App store={store} /> }
screen.Type(into: screen.ByPlaceholder("What needs doing?"), "buy milk")
screen.Press("Enter")
check(screen.ByRole("listitem").Count == 1, "adds one item")
screen.Click(screen.ByRole("checkbox"))
check(screen.Pixels().Matches(golden: "testdata/done.png"), "pixels")
```

A query finds what an assistive technology would: an element's role is
its `role` attribute or the one its tag implies (a button, a link, a
checkbox, a list item, a heading), so a test that finds a control by
role finds what VoiceOver will.

## Index

- [`func Mount(width: int32 = 800, height: int32 = 600, css: string = "", _ root: () -> component.Node) -> Screen`](#func-Mount)
- [`struct Found`](#struct-Found)
  - [`let Nodes: [html.Node]`](#Found.Nodes)
  - [`var Count: int { get }`](#Found.Count)
  - [`var Exists: bool { get }`](#Found.Exists)
  - [`var First: html.Node? { get }`](#Found.First)
  - [`var Text: string { get }`](#Found.Text)
  - [`var Value: string { get }`](#Found.Value)
  - [`var Style: cascade.ComputedStyle? { get }`](#Found.Style)
  - [`func Attribute(_ name: string) -> string?`](#Found.Attribute)
  - [`func HasClass(_ name: string) -> bool`](#Found.HasClass)
- [`struct Pixels`](#struct-Pixels)
  - [`init(image: image.RGBA)`](#Pixels.init)
  - [`let Image: image.RGBA`](#Pixels.Image)
  - [`func At(_ x: int, _ y: int) -> draw.Color`](#Pixels.At)
  - [`func Matches(golden path: string) -> bool`](#Pixels.Matches)
  - [`func Write(_ path: string)`](#Pixels.Write)
- [`final class Screen`](#class-Screen)
  - [`let Page: web.Page`](#Screen.Page)
  - [`let Mounted: component.Mounted`](#Screen.Mounted)
  - [`func WaitFor(timeout: int = 2000, _ query: () -> Found) async -> Found`](#Screen.WaitFor)
  - [`func ByRole(_ role: string) -> Found`](#Screen.ByRole)
  - [`func ByText(_ text: string) -> Found`](#Screen.ByText)
  - [`func ByLabel(_ text: string) -> Found`](#Screen.ByLabel)
  - [`func ByPlaceholder(_ text: string) -> Found`](#Screen.ByPlaceholder)
  - [`func ByTestId(_ id: string) -> Found`](#Screen.ByTestId)
  - [`func Query(_ selector: string) -> Found`](#Screen.Query)
  - [`func Click(_ found: Found) -> bool`](#Screen.Click)
  - [`func Hover(_ found: Found) -> bool`](#Screen.Hover)
  - [`func DoubleClick(_ found: Found) -> bool`](#Screen.DoubleClick)
  - [`func RightClick(_ found: Found) -> bool`](#Screen.RightClick)
  - [`func Type(into found: Found, _ text: string)`](#Screen.Type)
  - [`func Replace(in found: Found, _ text: string)`](#Screen.Replace)
  - [`func Press(_ key: string)`](#Screen.Press)
  - [`func SetDark(_ dark: bool)`](#Screen.SetDark)
  - [`func Pixels() -> Pixels`](#Screen.Pixels)

## Functions

### func Mount <a id="func-Mount"></a>

```vertex
@MainActor
public func Mount(width: int32 = 800, height: int32 = 600, css: string = "", _ root: () -> component.Node) -> Screen
```

Mounts root headless in a page of a size, with its packages' styles.

## Types

### struct Found <a id="struct-Found"></a>

```vertex
@MainActor
public struct Found
```

What a query found: none, one, or more elements.

#### Properties

<a id="Found.Nodes"></a>

```vertex
public let Nodes: [html.Node]
```

<a id="Found.Count"></a>

```vertex
public var Count: int { get }
```

<a id="Found.Exists"></a>

```vertex
public var Exists: bool { get }
```

<a id="Found.First"></a>

```vertex
public var First: html.Node? { get }
```

<a id="Found.Text"></a>

```vertex
public var Text: string { get }
```

The first element's text, whitespace collapsed.

<a id="Found.Value"></a>

```vertex
public var Value: string { get }
```

The first element's value, for a field: what the user sees in it.

<a id="Found.Style"></a>

```vertex
public var Style: cascade.ComputedStyle? { get }
```

The first element's computed style, as laid out now.

#### Methods

<a id="Found.Attribute"></a>

```vertex
public func Attribute(_ name: string) -> string?
```

The first element's attribute.

<a id="Found.HasClass"></a>

```vertex
public func HasClass(_ name: string) -> bool
```

### struct Pixels <a id="struct-Pixels"></a>

```vertex
public struct Pixels
```

A screen's pixels.

#### Initializers

<a id="Pixels.init"></a>

```vertex
public init(image: image.RGBA)
```

#### Properties

<a id="Pixels.Image"></a>

```vertex
public let Image: image.RGBA
```

#### Methods

<a id="Pixels.At"></a>

```vertex
public func At(_ x: int, _ y: int) -> draw.Color
```

The color at a point.

<a id="Pixels.Matches"></a>

```vertex
public func Matches(golden path: string) -> bool
```

Whether the pixels are the golden image's. A golden that does not
exist yet is written, and matches: the first run records what the
screen looks like, and later runs hold it to that. Delete the file
to record it again.

<a id="Pixels.Write"></a>

```vertex
public func Write(_ path: string)
```

Writes the pixels as a PNG, to look at.

### class Screen <a id="class-Screen"></a>

```vertex
@MainActor
public final class Screen
```

A mounted component and the page it is in.

#### Properties

<a id="Screen.Page"></a>

```vertex
public let Page: web.Page
```

<a id="Screen.Mounted"></a>

```vertex
public let Mounted: component.Mounted
```

#### Methods

<a id="Screen.WaitFor"></a>

```vertex
public func WaitFor(timeout: int = 2000, _ query: () -> Found) async -> Found
```

Waits for what query finds to exist -- a resource loaded, a task
finished -- letting tasks run meanwhile, and gives it; or gives
what it finds at the end of timeout (milliseconds), none.

```vertex
let name = await screen.WaitFor { screen.ByText("Ada") }
```

<a id="Screen.ByRole"></a>

```vertex
public func ByRole(_ role: string) -> Found
```

Elements whose role -- written, or the one their tag implies -- is
role: "button", "link", "checkbox", "textbox", "listitem",
"heading", "list", "img", "navigation", "main".

<a id="Screen.ByText"></a>

```vertex
public func ByText(_ text: string) -> Found
```

Elements whose own text, whitespace collapsed, is text.

<a id="Screen.ByLabel"></a>

```vertex
public func ByLabel(_ text: string) -> Found
```

Controls labelled text: by aria-label, or by a <label> around them
or pointing at them with `for`.

<a id="Screen.ByPlaceholder"></a>

```vertex
public func ByPlaceholder(_ text: string) -> Found
```

<a id="Screen.ByTestId"></a>

```vertex
public func ByTestId(_ id: string) -> Found
```

Elements marked `data-testid="id"`.

<a id="Screen.Query"></a>

```vertex
public func Query(_ selector: string) -> Found
```

Elements matching a CSS selector.

<a id="Screen.Click"></a>

```vertex
@discardableResult
public func Click(_ found: Found) -> bool
```

Clicks the first element found, where the page hit-tests to it: a
press and release, through the page's input, as a user's would.
Answers whether there was somewhere to click.

<a id="Screen.Hover"></a>

```vertex
@discardableResult
public func Hover(_ found: Found) -> bool
```

Moves the pointer onto the first element found: mouseenter to it,
mouseleave to what the pointer left.

<a id="Screen.DoubleClick"></a>

```vertex
@discardableResult
public func DoubleClick(_ found: Found) -> bool
```

Double-clicks the first element found: two clicks, and a dblclick.

<a id="Screen.RightClick"></a>

```vertex
@discardableResult
public func RightClick(_ found: Found) -> bool
```

Presses the secondary button on the first element found: a
contextmenu.

<a id="Screen.Type"></a>

```vertex
public func Type(into found: Found, _ text: string)
```

Clicks a field to focus it, and types text at the end of what it
holds, as a user who clicks into a field and types does.

<a id="Screen.Replace"></a>

```vertex
public func Replace(in found: Found, _ text: string)
```

Selects everything in a field and types text in its place.

<a id="Screen.Press"></a>

```vertex
public func Press(_ key: string)
```

Presses a key where the focus is: "Enter", "Tab", "Backspace",
"Escape", "ArrowDown", or a character.

<a id="Screen.SetDark"></a>

```vertex
public func SetDark(_ dark: bool)
```

Shows the screen in a dark or a light color scheme, as the system's
appearance would.

<a id="Screen.Pixels"></a>

```vertex
public func Pixels() -> Pixels
```

The screen's pixels, drawn at scale 1.

## Files

- componenttest.vs
