# package component

```vertex
import "ui/component"
```

Package component is what markup in a .vsx file lowers to, and what
puts it in a document (proposed_vsx.md §9.2, §10).

```vertex
<p class="x" class:on={on} onClick={n += 1}>Hi {name}</p>
```

is checked and lowered as

```vertex
component.Element("p", [
    component.Attribute.Static("class", "x"),
    component.Attribute.LiveClass("on") { on },
    component.Attribute.On("click", dom.MouseEvent.self, { _ in n += 1 }),
], ["Hi ", component.Live { name }])
```

Element and Fragment make Nodes, a description; Mount makes them real,
once. What the markup wrote in braces -- `{name}`, `class:on={on}` -- is
live: Mount runs it as its own effect, which updates its own text or
attribute when a signal it read changes, and nothing else. Components
run once, untracked (`Component`), so a component's body is never run
again by a change it read; `@State` in it is made once.

## Index

- [`func Component<T>(_ f: () -> T) -> T`](#func-Component)
- [`func Element(_ tag: string, _ attributes: [Attribute], _ children: [any Renderable]) -> Node`](#func-Element)
- [`func Focus(_ node: html.Node?)`](#func-Focus)
- [`func For<T>(each: () -> [T], key: ((T) -> int)? = nil, children: (state.Readable<T>) -> Node) -> Node`](#func-For)
- [`func Fragment(_ children: [any Renderable]) -> Node`](#func-Fragment)
- [`func Live<V: Renderable>(_ f: () -> V) -> Node`](#func-Live)
- [`func Mount(_ root: () -> Node, into doc: dom.Document, at parent: html.Node, styles: (([string]) -> void)? = nil, focus: ((html.Node?) -> void)? = nil) -> Mounted`](#func-Mount)
- [`func OnMount(_ f: () -> void)`](#func-OnMount)
- [`func RenderHTML(_ node: Node) -> string`](#func-RenderHTML)
- [`func Text(_ s: string) -> Node`](#func-Text)
- [`struct Attribute`](#struct-Attribute)
  - [`init(_ kind: AttributeKind)`](#Attribute.init)
  - [`let Kind: AttributeKind`](#Attribute.Kind)
  - [`static func Static(_ name: string, _ value: string) -> Attribute`](#Attribute.Static)
  - [`static func Value<V>(_ name: string, _ value: V) -> Attribute`](#Attribute.Value)
  - [`static func Live<V>(_ name: string, _ f: () -> V) -> Attribute`](#Attribute.Live)
  - [`static func On<E: dom.Event>(_ event: string, _ type: E.Type, _ handler: (E) -> void) -> Attribute`](#Attribute.On)
  - [`static func Class(_ name: string, _ on: bool) -> Attribute`](#Attribute.Class)
  - [`static func LiveClass(_ name: string, _ on: () -> bool) -> Attribute`](#Attribute.LiveClass)
  - [`static func Style<V>(_ property: string, _ value: V) -> Attribute`](#Attribute.Style)
  - [`static func LiveStyle<V>(_ property: string, _ f: () -> V) -> Attribute`](#Attribute.LiveStyle)
  - [`static func Ref<V>(_ ref: V) -> Attribute`](#Attribute.Ref)
  - [`static func Spread(_ attrs: [string: string]) -> Attribute`](#Attribute.Spread)
  - [`static func Package(_ sheet: Sheet) -> Attribute`](#Attribute.Package)
- [`enum AttributeKind`](#enum-AttributeKind)
- [`typealias Children = () -> Node`](#typealias-Children)
- [`struct Context<T>`](#struct-Context)
  - [`init(_ fallback: T)`](#Context.init)
  - [`var Value: T { get }`](#Context.Value)
  - [`func Provider(value: T, children: Children) -> Node`](#Context.Provider)
- [`final class Mounted`](#class-Mounted)
  - [`internal(set) var Renders = 0`](#Mounted.Renders)
  - [`internal(set) var Updates = 0`](#Mounted.Updates)
  - [`func Unmount()`](#Mounted.Unmount)
- [`final class Node: Renderable`](#class-Node)
  - [`internal(set) var Tag: string = ""`](#Node.Tag)
  - [`internal(set) var Text: string = ""`](#Node.Text)
  - [`internal(set) var Children: [Node] = []`](#Node.Children)
  - [`func Nodes() -> [Node]`](#Node.Nodes)
  - [`func Html() -> string`](#Node.Html)
- [`typealias Ref = html.Node?`](#typealias-Ref)
- [`protocol Renderable`](#protocol-Renderable)
  - [`func Nodes() -> [Node]`](#Renderable.Nodes)
- [`final class Sheet`](#class-Sheet)
  - [`init(package: string, css: string, after: [Sheet])`](#Sheet.init)
  - [`let Package: string`](#Sheet.Package)
  - [`let CSS: string`](#Sheet.CSS)
  - [`let After: [Sheet]`](#Sheet.After)
- [`struct Token`](#struct-Token)
  - [`init(name: string, syntax: string)`](#Token.init)
  - [`let Name: string`](#Token.Name)
  - [`let Syntax: string`](#Token.Syntax)
- [`extension Array`](#extension-Array)
- [`extension Optional`](#extension-Optional)
- [`extension bool`](#extension-bool)
- [`extension float64`](#extension-float64)
- [`extension int`](#extension-int)
- [`extension string`](#extension-string)

## Functions

### func Component <a id="func-Component"></a>

```vertex
public func Component<T>(_ f: () -> T) -> T
```

A component's call, `<Card …/>`: run once, untracked, so a change to
what its body read does not run it again -- its own live parts follow
what they read.

### func Element <a id="func-Element"></a>

```vertex
public func Element(_ tag: string, _ attributes: [Attribute], _ children: [any Renderable]) -> Node
```

An HTML element.

### func Focus <a id="func-Focus"></a>

```vertex
public func Focus(_ node: html.Node?)
```

Moves the page's focus to node -- a field a ref holds -- or, given
nil, takes it away. Called from a component's code: OnMount, a
handler, an effect.

### func For <a id="func-For"></a>

```vertex
public func For<T>(each: () -> [T], key: ((T) -> int)? = nil, children: (state.Readable<T>) -> Node) -> Node
```

The keyed list (proposed_vsx.md §5.4): each item's row is made once,
and kept -- with its elements, their focus and their state -- as long
as its key is in the list, moved where the key moves. A row is given
its item as a Readable, which follows the item when it changes under
the same key. Without a key, an item's index is its key.

### func Fragment <a id="func-Fragment"></a>

```vertex
public func Fragment(_ children: [any Renderable]) -> Node
```

`<>…</>`: children with no element around them.

### func Live <a id="func-Live"></a>

```vertex
public func Live<V: Renderable>(_ f: () -> V) -> Node
```

`{expr}` among an element's children: a region Mount keeps equal to
what expr is, running it again -- and only it -- when a signal it read
changes.

### func Mount <a id="func-Mount"></a>

```vertex
public func Mount(_ root: () -> Node, into doc: dom.Document, at parent: html.Node, styles: (([string]) -> void)? = nil, focus: ((html.Node?) -> void)? = nil) -> Mounted
```

Puts what root makes into a document, as the children of parent. The
root runs once; its live parts keep themselves up to date. styles is
given the stylesheets the nodes' packages carry, in cascade order,
whenever they change: a page sets them (web.Page.SetStyleSheets).

focus, where given, is how Focus moves the page's focus
(web.Page.Focus).

### func OnMount <a id="func-OnMount"></a>

```vertex
public func OnMount(_ f: () -> void)
```

Runs f once the nodes the component running now makes are in the
document -- to focus a field, measure a box, start a timer. What f
makes, and OnCleanup inside it, belong to the component: they end
when it is gone.

```vertex
@state.State var field: html.Node? = nil
OnMount { component.Focus(field) }
return <input ref={$field} />
```

### func RenderHTML <a id="func-RenderHTML"></a>

```vertex
public func RenderHTML(_ node: Node) -> string
```

A node as HTML, for a static page: a report, an email.

### func Text <a id="func-Text"></a>

```vertex
public func Text(_ s: string) -> Node
```

## Types

### struct Attribute <a id="struct-Attribute"></a>

```vertex
public struct Attribute
```

One attribute of an element, as markup writes it.

#### Initializers

<a id="Attribute.init"></a>

```vertex
public init(_ kind: AttributeKind)
```

#### Properties

<a id="Attribute.Kind"></a>

```vertex
public let Kind: AttributeKind
```

#### Methods

<a id="Attribute.Static"></a>

```vertex
public static func Static(_ name: string, _ value: string) -> Attribute
```

`name="text"`.

<a id="Attribute.Value"></a>

```vertex
public static func Value<V>(_ name: string, _ value: V) -> Attribute
```

`name={value}`, taken once: a Bool is the attribute's presence,
anything else its text; a signal is bound both ways.

<a id="Attribute.Live"></a>

```vertex
public static func Live<V>(_ name: string, _ f: () -> V) -> Attribute
```

`name={expr}`, live: the attribute follows expr. `value={$draft}`
is bound both ways.

<a id="Attribute.On"></a>

```vertex
public static func On<E: dom.Event>(_ event: string, _ type: E.Type, _ handler: (E) -> void) -> Attribute
```

`onX={…}`: a handler, given the event as the type it is.

<a id="Attribute.Class"></a>

```vertex
public static func Class(_ name: string, _ on: bool) -> Attribute
```

`class:name={on}`, taken once.

<a id="Attribute.LiveClass"></a>

```vertex
public static func LiveClass(_ name: string, _ on: () -> bool) -> Attribute
```

`class:name={on}`, live.

<a id="Attribute.Style"></a>

```vertex
public static func Style<V>(_ property: string, _ value: V) -> Attribute
```

`style:property={value}`, taken once.

<a id="Attribute.LiveStyle"></a>

```vertex
public static func LiveStyle<V>(_ property: string, _ f: () -> V) -> Attribute
```

`style:property={value}`, live.

<a id="Attribute.Ref"></a>

```vertex
public static func Ref<V>(_ ref: V) -> Attribute
```

`ref={$el}`: el, an `html.Node?` state, is the element while it
is in the document, and nil once it is gone.

<a id="Attribute.Spread"></a>

```vertex
public static func Spread(_ attrs: [string: string]) -> Attribute
```

`{...attrs}`.

<a id="Attribute.Package"></a>

```vertex
public static func Package(_ sheet: Sheet) -> Attribute
```

The package the element's markup is in, where that package has
styles: the element is stamped `data-p="package"`, which scopes
them, and carries the sheet to the page. The compiler adds it.

### enum AttributeKind <a id="enum-AttributeKind"></a>

```vertex
public enum AttributeKind
```

How an attribute is given.

#### Cases

<a id="AttributeKind.text"></a>

```vertex
case text(string, string)
```

<a id="AttributeKind.flag"></a>

```vertex
case flag(string, bool)
```

<a id="AttributeKind.classFlag"></a>

```vertex
case classFlag(string, bool)
```

<a id="AttributeKind.style"></a>

```vertex
case style(string, string)
```

<a id="AttributeKind.handler"></a>

```vertex
case handler(string, (dom.Event) -> void)
```

<a id="AttributeKind.liveText"></a>

```vertex
case liveText(string, () -> string?)
```

<a id="AttributeKind.liveClass"></a>

```vertex
case liveClass(string, () -> bool)
```

<a id="AttributeKind.liveStyle"></a>

```vertex
case liveStyle(string, () -> string)
```

<a id="AttributeKind.bound"></a>

```vertex
case bound(string, () -> string?, string, (dom.Event) -> void)
```

An attribute bound both ways: its live value, and the event and
handler that write what the user did back.

<a id="AttributeKind.spread"></a>

```vertex
case spread([string: string])
```

<a id="AttributeKind.sheet"></a>

```vertex
case sheet(Sheet)
```

<a id="AttributeKind.ref"></a>

```vertex
case ref((html.Node?) -> void)
```

`ref={$el}`: given the element when it is made, and nil when it goes.

<a id="AttributeKind.none"></a>

```vertex
case none
```

### typealias Children <a id="typealias-Children"></a>

```vertex
public typealias Children = () -> Node
```

A component's children: made when the component asks, inside it, as
one fragment.

### struct Context <a id="struct-Context"></a>

```vertex
public struct Context<T>
```

A value given to everything below a point in the tree -- a theme, a
store, the signed-in user -- without passing it through each component
between.

```vertex
let Theme = component.Context<string>("light")

<Theme.Provider value="dark">
    <Toolbar />             // and anything Toolbar makes:
</Theme.Provider>

func Button() -> Node {
    let theme = Theme.Value  // "dark" here, "light" outside any Provider
    …
}
```

A component reads it when it runs. What a live part (`{if …}`, a
`<For>` row) makes later, when a signal changes, sees the values given
where the part was written: Mount runs it inside them. The value is
given once; to give a changing one, give a signal, a Readable or a
model object, and read through it.

#### Initializers

<a id="Context.init"></a>

```vertex
public init(_ fallback: T)
```

A context, and what reading it outside any Provider gives.

#### Properties

<a id="Context.Value"></a>

```vertex
public var Value: T { get }
```

The value given by the nearest Provider around the code running
now, or the fallback.

#### Methods

<a id="Context.Provider"></a>

```vertex
public func Provider(value: T, children: Children) -> Node
```

Gives value to what children makes.

### class Mounted <a id="class-Mounted"></a>

```vertex
public final class Mounted
```

A root put into a document: its nodes are made once, as the children
of the element it was mounted at, and each live part keeps itself up
to date -- a live text its text, a live attribute its value, a live
region its nodes, a list its rows -- until the root is unmounted.

#### Properties

<a id="Mounted.Renders"></a>

```vertex
public internal(set) var Renders = 0
```

How many times the root has run: once.

<a id="Mounted.Updates"></a>

```vertex
public internal(set) var Updates = 0
```

How many times a live part has run, the first time included.

#### Methods

<a id="Mounted.Unmount"></a>

```vertex
public func Unmount()
```

Disposes every binding, and takes the root's nodes out of the
document.

### class Node <a id="class-Node"></a>

```vertex
public final class Node: Renderable
```

What an element, a text, a fragment, a live region or a keyed list is:
a description, which Mount makes real.

#### Properties

<a id="Node.Tag"></a>

```vertex
public internal(set) var Tag: string = ""
```

<a id="Node.Text"></a>

```vertex
public internal(set) var Text: string = ""
```

<a id="Node.Children"></a>

```vertex
public internal(set) var Children: [Node] = []
```

#### Methods

<a id="Node.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

<a id="Node.Html"></a>

```vertex
public func Html() -> string
```

The node as HTML, as it is now: what RenderHTML writes for a report
or an email.

### typealias Ref <a id="typealias-Ref"></a>

```vertex
public typealias Ref = html.Node?
```

What `ref={$el}` fills: the element, while it is in the document.

```vertex
@state.State var field: Ref = nil
<input ref={$field} />
```

(A .vsx file need not import web/html for it, whose Node would be
taken for a component's Node.)

### protocol Renderable <a id="protocol-Renderable"></a>

```vertex
public protocol Renderable
```

What a child of an element may be: an element, text, a number, or an
array or optional of them. A Bool is nothing, so `{flag && …}` reads
as it does in JSX.

#### Methods

<a id="Renderable.Nodes"></a>

```vertex
func Nodes() -> [Node]
```

### class Sheet <a id="class-Sheet"></a>

```vertex
public final class Sheet
```

A package's compiled stylesheet: its .vss files as one sheet, in its
own cascade layer and scoped to its elements (proposed_vsx.md §7). The
compiler generates one for each package with .vss files, as
`__vssSheet`, after the sheets of the styled packages it imports.

#### Initializers

<a id="Sheet.init"></a>

```vertex
public init(package: string, css: string, after: [Sheet])
```

#### Properties

<a id="Sheet.Package"></a>

```vertex
public let Package: string
```

<a id="Sheet.CSS"></a>

```vertex
public let CSS: string
```

<a id="Sheet.After"></a>

```vertex
public let After: [Sheet]
```

The sheets of the styled packages this package imports, which come
before it in the cascade.

### struct Token <a id="struct-Token"></a>

```vertex
public struct Token
```

A style token: a custom property a package registers with @property
in its .vss, which a program sets to theme it. The compiler generates
them as the package's `Tokens`: `kit.Tokens.Accent`.

#### Initializers

<a id="Token.init"></a>

```vertex
public init(name: string, syntax: string)
```

#### Properties

<a id="Token.Name"></a>

```vertex
public let Name: string
```

The custom property: `--kit-accent`.

<a id="Token.Syntax"></a>

```vertex
public let Syntax: string
```

What it holds, as @property says: `<color>`, `<length>`, `*`.

## Extensions

### extension Array <a id="extension-Array"></a>

```vertex
extension Array
```

Conforms by extension to: `Renderable`

#### Methods

<a id="Array.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

### extension Optional <a id="extension-Optional"></a>

```vertex
extension Optional
```

Conforms by extension to: `Renderable`

#### Methods

<a id="Optional.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

### extension bool <a id="extension-bool"></a>

```vertex
extension bool
```

Conforms by extension to: `Renderable`

#### Methods

<a id="bool.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

### extension float64 <a id="extension-float64"></a>

```vertex
extension float64
```

Conforms by extension to: `Renderable`

#### Methods

<a id="float64.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

### extension int <a id="extension-int"></a>

```vertex
extension int
```

Conforms by extension to: `Renderable`

#### Methods

<a id="int.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

### extension string <a id="extension-string"></a>

```vertex
extension string
```

Conforms by extension to: `Renderable`

#### Methods

<a id="string.Nodes"></a>

```vertex
public func Nodes() -> [Node]
```

## Files

- component.vs
- context.vs
- mount.vs
