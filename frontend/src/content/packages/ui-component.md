# package component

```vertex
import "ui/component"
```

Package component is what markup in a .vsx file lowers to, and what
puts it in a document (docs/vsx.md in vsc).

```vertex
<p className={on ? "x on" : "x"} onClick={setN(n + 1)}>Hi {name}</p>
```

is checked and lowered as

```vertex
component.Element("p", [
    component.Attribute.Live("class", { on ? "x on" : "x" }),
    component.Attribute.On("click", dom.MouseEvent.self, { _ in setN(n + 1) }),
], ["Hi ", component.Live({ name })])
```

and `<Counter start={5} />` as `component.Call("main.Counter", { Counter(start: 5) })`.
Element, Fragment and Component make Nodes, a description; Mount makes
them real and keeps them so: a component renders again when its state
is set (useState) or its parent renders, and the new description is
applied to what is in the document -- elements kept and patched, keyed
rows moved, components keeping their hooks. What the markup wrote in
braces is live besides: it follows the signals it read (an @Observable
model's properties) by itself, without its component rendering again.

## Index

- [`func Bounds(of node: html.Node?) -> draw.Rect?`](#func-Bounds)
- [`func Bounds<T>(of ref: Ref<T>) -> draw.Rect?`](#func-Bounds-2)
- [`func Call(type: string, f: @escaping () -> Node) -> Node`](#func-Call)
- [`func Element(tag: string, attributes: [Attribute], children: [any Renderable]) -> Node`](#func-Element)
- [`func Focus(node: html.Node?)`](#func-Focus)
- [`func Focus<T>(ref: Ref<T>)`](#func-Focus-2)
- [`func ForwardRef<T>(ref: Ref<T>, node: Node) -> Node`](#func-ForwardRef)
- [`func ForwardRef<T>(setter: SetState<T?>, node: Node) -> Node`](#func-ForwardRef-2)
- [`func ForwardRef(callback: @escaping (HTMLElement?) -> void, node: Node) -> Node`](#func-ForwardRef-3)
- [`func Fragment(children: [any Renderable]) -> Node`](#func-Fragment)
- [`func Key<K>(key: K, type: string, f: @escaping () -> Node) -> Node`](#func-Key)
- [`func Live<V: Renderable>(f: () -> V) -> Node`](#func-Live)
- [`func Mount(root: () -> Node, into doc: dom.Document, at parent: html.Node, styles: (([string]) -> void)? = nil, focus: ((html.Node?) -> void)? = nil, measure: ((html.Node) -> draw.Rect?)? = nil) -> Mounted`](#func-Mount)
- [`func MountClass<C: AnyObject, P>(type: string, inst: C, props: P, mount: @escaping (C, P) -> Node) -> Node`](#func-MountClass)
- [`func MountClass<K, C: AnyObject, P>(key: K, type: string, inst: C, props: P, mount: @escaping (C, P) -> Node) -> Node`](#func-MountClass-2)
- [`func Profiler(id: string, onRender: ((string, string, float64) -> void)? = nil, children: Node = nil) -> Node`](#func-Profiler)
- [`func RenderHTML(node: Node) -> string`](#func-RenderHTML)
- [`func StrictMode(children: Node = nil) -> Node`](#func-StrictMode)
- [`func Styled(sheet: Sheet, content: any Renderable) -> Node`](#func-Styled)
- [`func Suspense(fallback: Node = nil, children: Node = nil) -> Node`](#func-Suspense)
- [`func Text(s: string) -> Node`](#func-Text)
- [`func createContext<T>(fallback: T) -> Context<T>`](#func-createContext)
- [`func renderToString(node: Node) -> string`](#func-renderToString)
- [`func startTransition(scope: () -> void)`](#func-startTransition)
- [`func use<T>(ctx: Context<T>) -> T`](#func-use)
- [`func useCallback<F>(callback: F, deps: [any Equatable]? = nil) -> F`](#func-useCallback)
- [`func useContext<T>(ctx: Context<T>) -> T`](#func-useContext)
- [`func useDeferredValue<T>(value: T) -> T`](#func-useDeferredValue)
- [`func useEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)`](#func-useEffect)
- [`func useEffect(effect: @escaping () -> (() -> void), deps: [any Equatable]? = nil)`](#func-useEffect-2)
- [`func useId() -> string`](#func-useId)
- [`func useInsertionEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)`](#func-useInsertionEffect)
- [`func useLayoutEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)`](#func-useLayoutEffect)
- [`func useMemo<T>(compute: () -> T, deps: [any Equatable]? = nil) -> T`](#func-useMemo)
- [`func useReducer<S, A>(reducer: @escaping (S, A) -> S, initial: S) -> (S, (A) -> void)`](#func-useReducer)
- [`func useReducer<S, A>(reducer: @escaping (S, A) -> S, initialState: S) -> (S, (A) -> void)`](#func-useReducer-2)
- [`func useRef<T>(initial: T? = nil) -> Ref<T>`](#func-useRef)
- [`func useState<T>(initial: T) -> (T, SetState<T>)`](#func-useState)
- [`func useState<T>(initial: () -> T) -> (T, SetState<T>)`](#func-useState-2)
- [`func useTransition() -> (bool, (@escaping () -> void) -> void)`](#func-useTransition)
- [`struct Attribute`](#struct-Attribute)
  - [`init(kind: AttributeKind)`](#Attribute.init)
  - [`let Kind: AttributeKind`](#Attribute.Kind)
  - [`static func Static(name: string, value: string) -> Attribute`](#Attribute.Static)
  - [`static func Value<V>(name: string, value: V) -> Attribute`](#Attribute.Value)
  - [`static func Live<V>(name: string, f: () -> V) -> Attribute`](#Attribute.Live)
  - [`static func On<E: dom.Event>(event: string, type: E.Type, handler: (E) -> void) -> Attribute`](#Attribute.On)
  - [`static func OnCapture<E: dom.Event>(event: string, type: E.Type, handler: (E) -> void) -> Attribute`](#Attribute.OnCapture)
  - [`static func Key<V>(key: V) -> Attribute`](#Attribute.Key)
  - [`static func Ref<T>(ref: Ref<T>) -> Attribute`](#Attribute.Ref)
  - [`static func Ref<T>(setter: SetState<T?>) -> Attribute`](#Attribute.Ref-2)
  - [`static func Ref(callback: @escaping (HTMLElement?) -> void) -> Attribute`](#Attribute.Ref-3)
  - [`static func Spread(attrs: [string: string]) -> Attribute`](#Attribute.Spread)
  - [`static func Package(sheet: Sheet) -> Attribute`](#Attribute.Package)
- [`enum AttributeKind`](#enum-AttributeKind)
- [`struct CSSValue`](#struct-CSSValue)
  - [`init(value: string)`](#CSSValue.init)
  - [`init(value: int)`](#CSSValue.init-2)
  - [`init(value: float64)`](#CSSValue.init-3)
  - [`init(value: CSSValue)`](#CSSValue.init-4)
  - [`init(stringLiteral value: string)`](#CSSValue.init-5)
  - [`init(integerLiteral value: int)`](#CSSValue.init-6)
  - [`init(floatLiteral value: float64)`](#CSSValue.init-7)
  - [`init(nilLiteral: ())`](#CSSValue.init-8)
  - [`var raw: string = ""`](#CSSValue.raw)
- [`typealias Children = () -> Node`](#typealias-Children)
- [`class Component<P, S>`](#class-Component)
  - [`init()`](#Component.init)
  - [`var props: P! = nil`](#Component.props)
  - [`var state: S! = nil`](#Component.state)
  - [`func setState(next: S)`](#Component.setState)
  - [`func render() -> Node`](#Component.render)
  - [`func componentDidMount()`](#Component.componentDidMount)
  - [`func componentDidUpdate(prevProps: P, prevState: S)`](#Component.componentDidUpdate)
  - [`func componentWillUnmount()`](#Component.componentWillUnmount)
  - [`func _mount(props: P, renderFn: () -> Node) -> Node`](#Component._mount)
- [`final class ComponentFiber`](#class-ComponentFiber)
- [`struct Context<T>`](#struct-Context)
  - [`init(fallback: T)`](#Context.init)
  - [`var Value: T { get }`](#Context.Value)
  - [`func Provider(value: T, children: Children) -> Node`](#Context.Provider)
- [`struct EmptyProps: Props`](#struct-EmptyProps)
  - [`init()`](#EmptyProps.init)
- [`struct EmptyState`](#struct-EmptyState)
  - [`init()`](#EmptyState.init)
- [`typealias HTMLButtonElement = html.Node`](#typealias-HTMLButtonElement)
- [`typealias HTMLDivElement = html.Node`](#typealias-HTMLDivElement)
- [`typealias HTMLElement = html.Node`](#typealias-HTMLElement)
- [`typealias HTMLFormElement = html.Node`](#typealias-HTMLFormElement)
- [`typealias HTMLInputElement = html.Node`](#typealias-HTMLInputElement)
- [`typealias HTMLSpanElement = html.Node`](#typealias-HTMLSpanElement)
- [`final class Mounted`](#class-Mounted)
  - [`internal(set) var Renders = 0`](#Mounted.Renders)
  - [`internal(set) var Updates = 0`](#Mounted.Updates)
  - [`func Unmount()`](#Mounted.Unmount)
- [`class Node`](#class-Node)
  - [`init()`](#Node.init)
  - [`convenience init(nilLiteral: ())`](#Node.init-2)
  - [`convenience init(stringLiteral value: string)`](#Node.init-3)
  - [`convenience init(integerLiteral value: int)`](#Node.init-4)
  - [`convenience init(floatLiteral value: float64)`](#Node.init-5)
  - [`convenience init(booleanLiteral value: bool)`](#Node.init-6)
  - [`internal(set) var Tag: string = ""`](#Node.Tag)
  - [`internal(set) var Text: string = ""`](#Node.Text)
  - [`internal(set) var Children: [Node] = []`](#Node.Children)
  - [`func Nodes() -> [Node]`](#Node.Nodes)
  - [`func Html() -> string`](#Node.Html)
- [`protocol Props`](#protocol-Props)
- [`final class Ref<T>`](#class-Ref)
  - [`init(current: T? = nil)`](#Ref.init)
  - [`var current: T?`](#Ref.current)
- [`protocol Renderable`](#protocol-Renderable)
  - [`func Nodes() -> [Node]`](#Renderable.Nodes)
- [`struct SetState<T>`](#struct-SetState)
  - [`init(cell: StateCell<T>)`](#SetState.init)
  - [`func callAsFunction(next: T)`](#SetState.callAsFunction)
  - [`func callAsFunction(fn: (T) -> T)`](#SetState.callAsFunction-2)
- [`final class Sheet`](#class-Sheet)
  - [`init(package: string, css: string, after: [Sheet])`](#Sheet.init)
  - [`let Package: string`](#Sheet.Package)
  - [`let CSS: string`](#Sheet.CSS)
  - [`let After: [Sheet]`](#Sheet.After)
- [`final class StateCell<T>`](#class-StateCell)
  - [`internal(set) var value: T`](#StateCell.value)
  - [`func set(next: T)`](#StateCell.set)
  - [`func update(fn: (T) -> T)`](#StateCell.update)
- [`struct Style`](#struct-Style)
  - [`init(color: CSSValue = "", backgroundColor: CSSValue = "", background: CSSValue = "", display: CSSValue = "", position: CSSValue = "", top: CSSValue = "", right: CSSValue = "", bottom: CSSValue = "", left: CSSValue = "", width: CSSValue = "", height: CSSValue = "", minWidth: CSSValue = "", minHeight: CSSValue = "", maxWidth: CSSValue = "", maxHeight: CSSValue = "", margin: CSSValue = "", marginTop: CSSValue = "", marginRight: CSSValue = "", marginBottom: CSSValue = "", marginLeft: CSSValue = "", padding: CSSValue = "", paddingTop: CSSValue = "", paddingRight: CSSValue = "", paddingBottom: CSSValue = "", paddingLeft: CSSValue = "", flex: CSSValue = "", flexDirection: CSSValue = "", alignItems: CSSValue = "", justifyContent: CSSValue = "", gap: CSSValue = "", border: CSSValue = "", borderRadius: CSSValue = "", borderColor: CSSValue = "", fontSize: CSSValue = "", fontWeight: CSSValue = "", lineHeight: CSSValue = "", textAlign: CSSValue = "", textDecoration: CSSValue = "", opacity: CSSValue = "", overflow: CSSValue = "", cursor: CSSValue = "", zIndex: CSSValue = "", transform: CSSValue = "", transition: CSSValue = "", boxShadow: CSSValue = "")`](#Style.init)
  - [`var color: CSSValue = ""`](#Style.color)
  - [`var backgroundColor: CSSValue = ""`](#Style.backgroundColor)
  - [`var background: CSSValue = ""`](#Style.background)
  - [`var display: CSSValue = ""`](#Style.display)
  - [`var position: CSSValue = ""`](#Style.position)
  - [`var top: CSSValue = ""`](#Style.top)
  - [`var right: CSSValue = ""`](#Style.right)
  - [`var bottom: CSSValue = ""`](#Style.bottom)
  - [`var left: CSSValue = ""`](#Style.left)
  - [`var width: CSSValue = ""`](#Style.width)
  - [`var height: CSSValue = ""`](#Style.height)
  - [`var minWidth: CSSValue = ""`](#Style.minWidth)
  - [`var minHeight: CSSValue = ""`](#Style.minHeight)
  - [`var maxWidth: CSSValue = ""`](#Style.maxWidth)
  - [`var maxHeight: CSSValue = ""`](#Style.maxHeight)
  - [`var margin: CSSValue = ""`](#Style.margin)
  - [`var marginTop: CSSValue = ""`](#Style.marginTop)
  - [`var marginRight: CSSValue = ""`](#Style.marginRight)
  - [`var marginBottom: CSSValue = ""`](#Style.marginBottom)
  - [`var marginLeft: CSSValue = ""`](#Style.marginLeft)
  - [`var padding: CSSValue = ""`](#Style.padding)
  - [`var paddingTop: CSSValue = ""`](#Style.paddingTop)
  - [`var paddingRight: CSSValue = ""`](#Style.paddingRight)
  - [`var paddingBottom: CSSValue = ""`](#Style.paddingBottom)
  - [`var paddingLeft: CSSValue = ""`](#Style.paddingLeft)
  - [`var flex: CSSValue = ""`](#Style.flex)
  - [`var flexDirection: CSSValue = ""`](#Style.flexDirection)
  - [`var alignItems: CSSValue = ""`](#Style.alignItems)
  - [`var justifyContent: CSSValue = ""`](#Style.justifyContent)
  - [`var gap: CSSValue = ""`](#Style.gap)
  - [`var border: CSSValue = ""`](#Style.border)
  - [`var borderRadius: CSSValue = ""`](#Style.borderRadius)
  - [`var borderColor: CSSValue = ""`](#Style.borderColor)
  - [`var fontSize: CSSValue = ""`](#Style.fontSize)
  - [`var fontWeight: CSSValue = ""`](#Style.fontWeight)
  - [`var lineHeight: CSSValue = ""`](#Style.lineHeight)
  - [`var textAlign: CSSValue = ""`](#Style.textAlign)
  - [`var textDecoration: CSSValue = ""`](#Style.textDecoration)
  - [`var opacity: CSSValue = ""`](#Style.opacity)
  - [`var overflow: CSSValue = ""`](#Style.overflow)
  - [`var cursor: CSSValue = ""`](#Style.cursor)
  - [`var zIndex: CSSValue = ""`](#Style.zIndex)
  - [`var transform: CSSValue = ""`](#Style.transform)
  - [`var transition: CSSValue = ""`](#Style.transition)
  - [`var boxShadow: CSSValue = ""`](#Style.boxShadow)
  - [`func pairs() -> [(string, string)]`](#Style.pairs)
  - [`func cssText() -> string`](#Style.cssText)
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

### func Bounds <a id="func-Bounds"></a>

```vertex
public func Bounds(of node: html.Node?) -> draw.Rect?
```

Where an element a ref holds is in the page's view, as laid out now:
to drag it, or to place something beside it. nil when it isn't laid
out, or the page can't say.

### func Bounds <a id="func-Bounds-2"></a>

```vertex
public func Bounds<T>(of ref: Ref<T>) -> draw.Rect?
```

### func Call <a id="func-Call"></a>

```vertex
public func Call(type: string, f: @escaping () -> Node) -> Node
```

A component's call, `<Counter start={5} />`, lowered as
`component.Call("main.Counter", { Counter(start: 5) })`: rendered by a
fiber the mount keeps while the same component stays in its place,
inside the context values given where the call was written. type is
the component's identity: another component in that place next time
is a new one there.

### func Element <a id="func-Element"></a>

```vertex
public func Element(tag: string, attributes: [Attribute], children: [any Renderable]) -> Node
```

An HTML element.

### func Focus <a id="func-Focus"></a>

```vertex
public func Focus(node: html.Node?)
```

Moves the page's focus to node -- a field a ref holds -- or, given
nil, takes it away. Called from a component's code: an effect, a
handler; from a task, it is the last mounted root's page.

### func Focus <a id="func-Focus-2"></a>

```vertex
public func Focus<T>(ref: Ref<T>)
```

### func ForwardRef <a id="func-ForwardRef"></a>

```vertex
public func ForwardRef<T>(ref: Ref<T>, node: Node) -> Node
```

`<Comp ref={el} />`: a ref on a component holds the first element it
renders while it is in the document.

### func ForwardRef <a id="func-ForwardRef-2"></a>

```vertex
public func ForwardRef<T>(setter: SetState<T?>, node: Node) -> Node
```

`<Comp ref={setEl} />`: a setter given the component's first element.

### func ForwardRef <a id="func-ForwardRef-3"></a>

```vertex
public func ForwardRef(callback: @escaping (HTMLElement?) -> void, node: Node) -> Node
```

`<Comp ref={el in …} />`: called with the component's first element
once it is in the document, and with nil when it goes.

### func Fragment <a id="func-Fragment"></a>

```vertex
public func Fragment(children: [any Renderable]) -> Node
```

`<>…</>`: children with no element around them.

### func Key <a id="func-Key"></a>

```vertex
public func Key<K>(key: K, type: string, f: @escaping () -> Node) -> Node
```

A keyed component's call, `<TabItem key={t.ID} … />`: among its
siblings, its fiber (its state, its elements) goes with its key.

### func Live <a id="func-Live"></a>

```vertex
public func Live<V: Renderable>(f: () -> V) -> Node
```

`{expr}` among an element's children: a region Mount keeps equal to
what expr is, running it again -- and only it -- when a signal it read
changes.

### func Mount <a id="func-Mount"></a>

```vertex
public func Mount(root: () -> Node, into doc: dom.Document, at parent: html.Node, styles: (([string]) -> void)? = nil, focus: ((html.Node?) -> void)? = nil,
                  measure: ((html.Node) -> draw.Rect?)? = nil) -> Mounted
```

Puts what root makes into a document, as the children of parent. The
root runs once; its components and live parts keep themselves up to
date. styles is given the stylesheets the nodes' packages carry, in
cascade order, whenever they change: a page sets them
(web.Page.SetStyleSheets).

focus, where given, is how Focus moves the page's focus
(web.Page.Focus); measure, how Bounds finds where an element is
(web.Page.BoundsOf).

### func MountClass <a id="func-MountClass"></a>

```vertex
public func MountClass<C: AnyObject, P>(type: string, inst: C, props: P, mount: @escaping (C, P) -> Node) -> Node
```

A class component's call: the instance made where the call was
written the first time, kept after that, given its props and rendered.

### func MountClass <a id="func-MountClass-2"></a>

```vertex
public func MountClass<K, C: AnyObject, P>(key: K, type: string, inst: C, props: P, mount: @escaping (C, P) -> Node) -> Node
```

A keyed class component's call.

### func Profiler <a id="func-Profiler"></a>

```vertex
public func Profiler(id: string, onRender: ((string, string, float64) -> void)? = nil, children: Node = nil) -> Node
```

### func RenderHTML <a id="func-RenderHTML"></a>

```vertex
public func RenderHTML(node: Node) -> string
```

A node as HTML, for a static page: a report, an email.

### func StrictMode <a id="func-StrictMode"></a>

```vertex
public func StrictMode(children: Node = nil) -> Node
```

### func Styled <a id="func-Styled"></a>

```vertex
public func Styled(sheet: Sheet, content: any Renderable) -> Node
```

content, carrying a package's sheet: what vsc wraps a component call in
when the package making the call has styles, so its sheet reaches the
page even where all it makes is another package's component (a
program whose root is a library's window, whose document rules would
otherwise never apply).

### func Suspense <a id="func-Suspense"></a>

```vertex
public func Suspense(fallback: Node = nil, children: Node = nil) -> Node
```

### func Text <a id="func-Text"></a>

```vertex
public func Text(s: string) -> Node
```

### func createContext <a id="func-createContext"></a>

```vertex
public func createContext<T>(fallback: T) -> Context<T>
```

### func renderToString <a id="func-renderToString"></a>

```vertex
public func renderToString(node: Node) -> string
```

### func startTransition <a id="func-startTransition"></a>

```vertex
public func startTransition(scope: () -> void)
```

### func use <a id="func-use"></a>

```vertex
public func use<T>(ctx: Context<T>) -> T
```

### func useCallback <a id="func-useCallback"></a>

```vertex
public func useCallback<F>(callback: F, deps: [any Equatable]? = nil) -> F
```

### func useContext <a id="func-useContext"></a>

```vertex
public func useContext<T>(ctx: Context<T>) -> T
```

### func useDeferredValue <a id="func-useDeferredValue"></a>

```vertex
public func useDeferredValue<T>(value: T) -> T
```

### func useEffect <a id="func-useEffect"></a>

```vertex
public func useEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)
```

Runs effect after the render that called it is in the document, its
refs given: on the first render, and on each after it whose deps
differ from the last (every render where deps is nil).

```vertex
useEffect({ Focus(field) }, [])
```

### func useEffect <a id="func-useEffect-2"></a>

```vertex
public func useEffect(effect: @escaping () -> (() -> void), deps: [any Equatable]? = nil)
```

An effect that returns its cleanup, run before it runs again and when
the component is gone (`state.OnCleanup` inside an effect is one too):

```vertex
useEffect({
    let t = startTimer()
    return { t.Cancel() }
}, [])
```

### func useId <a id="func-useId"></a>

```vertex
public func useId() -> string
```

An id unique in the program and kept across renders: to tie a
`<label htmlFor>` to its field.

### func useInsertionEffect <a id="func-useInsertionEffect"></a>

```vertex
public func useInsertionEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)
```

### func useLayoutEffect <a id="func-useLayoutEffect"></a>

```vertex
public func useLayoutEffect(effect: @escaping () -> void, deps: [any Equatable]? = nil)
```

### func useMemo <a id="func-useMemo"></a>

```vertex
public func useMemo<T>(compute: () -> T, deps: [any Equatable]? = nil) -> T
```

compute's value, computed again only when deps differ from the last
render's (every render where deps is nil).

### func useReducer <a id="func-useReducer"></a>

```vertex
public func useReducer<S, A>(reducer: @escaping (S, A) -> S, initial: S) -> (S, (A) -> void)
```

State changed through a reducer: `dispatch(.increment(by: 5))`.

### func useReducer <a id="func-useReducer-2"></a>

```vertex
public func useReducer<S, A>(reducer: @escaping (S, A) -> S, initialState: S) -> (S, (A) -> void)
```

### func useRef <a id="func-useRef"></a>

```vertex
public func useRef<T>(initial: T? = nil) -> Ref<T>
```

### func useState <a id="func-useState"></a>

```vertex
public func useState<T>(initial: T) -> (T, SetState<T>)
```

A component's state, kept between its renders:

```vertex
let (count, setCount) = useState(0)
```

### func useState <a id="func-useState-2"></a>

```vertex
public func useState<T>(initial: () -> T) -> (T, SetState<T>)
```

useState whose first value is computed, once.

### func useTransition <a id="func-useTransition"></a>

```vertex
public func useTransition() -> (bool, (@escaping () -> void) -> void)
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
public init(kind: AttributeKind)
```

#### Properties

<a id="Attribute.Kind"></a>

```vertex
public let Kind: AttributeKind
```

#### Methods

<a id="Attribute.Static"></a>

```vertex
public static func Static(name: string, value: string) -> Attribute
```

`name="text"`.

<a id="Attribute.Value"></a>

```vertex
public static func Value<V>(name: string, value: V) -> Attribute
```

`name={value}`, taken once: a Bool is the attribute's presence,
anything else its text.

<a id="Attribute.Live"></a>

```vertex
public static func Live<V>(name: string, f: () -> V) -> Attribute
```

`name={expr}`, live: the attribute follows the signals expr reads.
A field is controlled by its handler: `value={draft}
onInput={e in setDraft(e.Value)}`.

<a id="Attribute.On"></a>

```vertex
public static func On<E: dom.Event>(event: string, type: E.Type, handler: (E) -> void) -> Attribute
```

`onX={…}`: a handler, given the event as the type it is.

<a id="Attribute.OnCapture"></a>

```vertex
public static func OnCapture<E: dom.Event>(event: string, type: E.Type, handler: (E) -> void) -> Attribute
```

`onXCapture={…}`: a handler called as the event comes down to its
target, before the target's own handlers.

<a id="Attribute.Key"></a>

```vertex
public static func Key<V>(key: V) -> Attribute
```

`key={k}` on an intrinsic element.

<a id="Attribute.Ref"></a>

```vertex
public static func Ref<T>(ref: Ref<T>) -> Attribute
```

`ref={el}`: el, a `Ref<HTMLElement>` from useRef, holds the element
while it is in the document.

<a id="Attribute.Ref-2"></a>

```vertex
public static func Ref<T>(setter: SetState<T?>) -> Attribute
```

`ref={setEl}`: a state setter is given the element once it is in
the document, and nil when it goes.

<a id="Attribute.Ref-3"></a>

```vertex
public static func Ref(callback: @escaping (HTMLElement?) -> void) -> Attribute
```

`ref={el in …}`: called with the element once it is in the
document, and with nil when it goes.

<a id="Attribute.Spread"></a>

```vertex
public static func Spread(attrs: [string: string]) -> Attribute
```

`{...attrs}`.

<a id="Attribute.Package"></a>

```vertex
public static func Package(sheet: Sheet) -> Attribute
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

<a id="AttributeKind.key"></a>

```vertex
case key(string)
```

<a id="AttributeKind.handler"></a>

```vertex
case handler(string, (dom.Event) -> void)
```

<a id="AttributeKind.captureHandler"></a>

```vertex
case captureHandler(string, (dom.Event) -> void)
```

<a id="AttributeKind.liveText"></a>

```vertex
case liveText(string, () -> string?)
```

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

`ref={…}`: given the element when it is in the document, and nil
when it goes.

<a id="AttributeKind.none"></a>

```vertex
case none
```

### struct CSSValue <a id="struct-CSSValue"></a>

```vertex
public struct CSSValue: ExpressibleByStringLiteral, ExpressibleByIntegerLiteral, ExpressibleByFloatLiteral, ExpressibleByNilLiteral
```

#### Initializers

<a id="CSSValue.init"></a>

```vertex
public init(value: string)
```

<a id="CSSValue.init-2"></a>

```vertex
public init(value: int)
```

<a id="CSSValue.init-3"></a>

```vertex
public init(value: float64)
```

<a id="CSSValue.init-4"></a>

```vertex
public init(value: CSSValue)
```

<a id="CSSValue.init-5"></a>

```vertex
public init(stringLiteral value: string)
```

<a id="CSSValue.init-6"></a>

```vertex
public init(integerLiteral value: int)
```

<a id="CSSValue.init-7"></a>

```vertex
public init(floatLiteral value: float64)
```

<a id="CSSValue.init-8"></a>

```vertex
public init(nilLiteral: ())
```

#### Properties

<a id="CSSValue.raw"></a>

```vertex
public var raw: string = ""
```

### typealias Children <a id="typealias-Children"></a>

```vertex
public typealias Children = () -> Node
```

A component's children: either passed as a Node or as a closure.

### class Component <a id="class-Component"></a>

```vertex
open class Component<P, S>
```

A class component: `class Clock: Component<ClockProps, ClockState>`,
written `<Clock zone="UTC" />`. Its props are set before each render;
setState renders it again. The instance is made once and kept while it
stays in its place, as a function component's hooks are.

```vertex
final class Counter: Component<CounterProps, int> {
    override init() { super.init(); state = 0 }
    override func render() -> Node {
        return <button onClick={setState(state + 1)}>{props.Label} {state}</button>
    }
}
```

#### Initializers

<a id="Component.init"></a>

```vertex
public init()
```

#### Properties

<a id="Component.props"></a>

```vertex
public var props: P! = nil
```

<a id="Component.state"></a>

```vertex
public var state: S! = nil
```

#### Methods

<a id="Component.setState"></a>

```vertex
public func setState(next: S)
```

Sets the state, and renders the component again.

<a id="Component.render"></a>

```vertex
open func render() -> Node
```

What the component is now, from its props and state.

<a id="Component.componentDidMount"></a>

```vertex
open func componentDidMount()
```

Called once its nodes are first in the document.

<a id="Component.componentDidUpdate"></a>

```vertex
open func componentDidUpdate(prevProps: P, prevState: S)
```

Called after each render but the first is in the document, with
the props and state of the render before.

<a id="Component.componentWillUnmount"></a>

```vertex
open func componentWillUnmount()
```

Called as it leaves the document.

<a id="Component._mount"></a>

```vertex
public func _mount(props: P, renderFn: () -> Node) -> Node
```

The render the compiler lowers `<Comp …/>` to: props given, then
render, inside the instance's fiber.

### class ComponentFiber <a id="class-ComponentFiber"></a>

```vertex
public final class ComponentFiber
```

A function component's instance, `<Counter />` in a document: the
hooks its body calls, kept between renders in the order it calls them,
and the effects its last render asked for. Mount makes one for each
component it puts in a document and keeps it while the component stays
where it is in its parent (or keeps its key), giving it its parent's new
props by rendering it again.

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
public init(fallback: T)
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

### struct EmptyProps <a id="struct-EmptyProps"></a>

```vertex
public struct EmptyProps: Props
```

#### Initializers

<a id="EmptyProps.init"></a>

```vertex
public init()
```

### struct EmptyState <a id="struct-EmptyState"></a>

```vertex
public struct EmptyState
```

#### Initializers

<a id="EmptyState.init"></a>

```vertex
public init()
```

### typealias HTMLButtonElement <a id="typealias-HTMLButtonElement"></a>

```vertex
public typealias HTMLButtonElement = html.Node
```

### typealias HTMLDivElement <a id="typealias-HTMLDivElement"></a>

```vertex
public typealias HTMLDivElement = html.Node
```

### typealias HTMLElement <a id="typealias-HTMLElement"></a>

```vertex
public typealias HTMLElement = html.Node
```

DOM element type aliases for .vsx v2 markup.

### typealias HTMLFormElement <a id="typealias-HTMLFormElement"></a>

```vertex
public typealias HTMLFormElement = html.Node
```

### typealias HTMLInputElement <a id="typealias-HTMLInputElement"></a>

```vertex
public typealias HTMLInputElement = html.Node
```

### typealias HTMLSpanElement <a id="typealias-HTMLSpanElement"></a>

```vertex
public typealias HTMLSpanElement = html.Node
```

### class Mounted <a id="class-Mounted"></a>

```vertex
public final class Mounted
```

A root put into a document: its nodes are made as the children of the
element it was mounted at, and kept up to date -- a component when its
state is set, a live part when what it read changes -- until the root
is unmounted.

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

How many times a live part or a component has run, the first time
included.

#### Methods

<a id="Mounted.Unmount"></a>

```vertex
public func Unmount()
```

Ends every component and binding, and takes the root's nodes out of
the document.

### class Node <a id="class-Node"></a>

```vertex
public final class Node: Renderable, ExpressibleByNilLiteral, ExpressibleByStringLiteral, ExpressibleByIntegerLiteral, ExpressibleByFloatLiteral, ExpressibleByBooleanLiteral
```

What an element, a text, a fragment, a live region or a keyed item is:
a description, which Mount makes real.

#### Initializers

<a id="Node.init"></a>

```vertex
public init()
```

<a id="Node.init-2"></a>

```vertex
public convenience init(nilLiteral: ())
```

<a id="Node.init-3"></a>

```vertex
public convenience init(stringLiteral value: string)
```

<a id="Node.init-4"></a>

```vertex
public convenience init(integerLiteral value: int)
```

<a id="Node.init-5"></a>

```vertex
public convenience init(floatLiteral value: float64)
```

<a id="Node.init-6"></a>

```vertex
public convenience init(booleanLiteral value: bool)
```

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

### protocol Props <a id="protocol-Props"></a>

```vertex
public protocol Props
```

### class Ref <a id="class-Ref"></a>

```vertex
public final class Ref<T>
```

A box kept across renders, which setting does not render again: an
element given by `ref={…}`, or any value.

```vertex
let inputRef = useRef<HTMLElement>(nil)
<input ref={inputRef} />
```

#### Initializers

<a id="Ref.init"></a>

```vertex
public init(current: T? = nil)
```

#### Properties

<a id="Ref.current"></a>

```vertex
public var current: T?
```

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

### struct SetState <a id="struct-SetState"></a>

```vertex
public struct SetState<T>
```

What useState gives to change its state: `setCount(3)`, or
`setCount { $0 + 1 }` from what it is when the setter runs.

#### Initializers

<a id="SetState.init"></a>

```vertex
public init(cell: StateCell<T>)
```

#### Methods

<a id="SetState.callAsFunction"></a>

```vertex
public func callAsFunction(next: T)
```

<a id="SetState.callAsFunction-2"></a>

```vertex
public func callAsFunction(fn: (T) -> T)
```

### class Sheet <a id="class-Sheet"></a>

```vertex
public final class Sheet
```

A package's compiled stylesheet: its .vss files as one sheet, in its
own cascade layer and scoped to its elements (docs/vss.md in vsc). The
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

### class StateCell <a id="class-StateCell"></a>

```vertex
public final class StateCell<T>
```

A state hook's value, and the fiber its setter renders again.

#### Properties

<a id="StateCell.value"></a>

```vertex
public internal(set) var value: T
```

#### Methods

<a id="StateCell.set"></a>

```vertex
public func set(next: T)
```

Sets the value; one equal to what it holds renders nothing.

<a id="StateCell.update"></a>

```vertex
public func update(fn: (T) -> T)
```

### struct Style <a id="struct-Style"></a>

```vertex
public struct Style
```

#### Initializers

<a id="Style.init"></a>

```vertex
public init(
    color: CSSValue = "",
    backgroundColor: CSSValue = "",
    background: CSSValue = "",
    display: CSSValue = "",
    position: CSSValue = "",
    top: CSSValue = "",
    right: CSSValue = "",
    bottom: CSSValue = "",
    left: CSSValue = "",
    width: CSSValue = "",
    height: CSSValue = "",
    minWidth: CSSValue = "",
    minHeight: CSSValue = "",
    maxWidth: CSSValue = "",
    maxHeight: CSSValue = "",
    margin: CSSValue = "",
    marginTop: CSSValue = "",
    marginRight: CSSValue = "",
    marginBottom: CSSValue = "",
    marginLeft: CSSValue = "",
    padding: CSSValue = "",
    paddingTop: CSSValue = "",
    paddingRight: CSSValue = "",
    paddingBottom: CSSValue = "",
    paddingLeft: CSSValue = "",
    flex: CSSValue = "",
    flexDirection: CSSValue = "",
    alignItems: CSSValue = "",
    justifyContent: CSSValue = "",
    gap: CSSValue = "",
    border: CSSValue = "",
    borderRadius: CSSValue = "",
    borderColor: CSSValue = "",
    fontSize: CSSValue = "",
    fontWeight: CSSValue = "",
    lineHeight: CSSValue = "",
    textAlign: CSSValue = "",
    textDecoration: CSSValue = "",
    opacity: CSSValue = "",
    overflow: CSSValue = "",
    cursor: CSSValue = "",
    zIndex: CSSValue = "",
    transform: CSSValue = "",
    transition: CSSValue = "",
    boxShadow: CSSValue = ""
)
```

#### Properties

<a id="Style.color"></a>

```vertex
public var color: CSSValue = ""
```

<a id="Style.backgroundColor"></a>

```vertex
public var backgroundColor: CSSValue = ""
```

<a id="Style.background"></a>

```vertex
public var background: CSSValue = ""
```

<a id="Style.display"></a>

```vertex
public var display: CSSValue = ""
```

<a id="Style.position"></a>

```vertex
public var position: CSSValue = ""
```

<a id="Style.top"></a>

```vertex
public var top: CSSValue = ""
```

<a id="Style.right"></a>

```vertex
public var right: CSSValue = ""
```

<a id="Style.bottom"></a>

```vertex
public var bottom: CSSValue = ""
```

<a id="Style.left"></a>

```vertex
public var left: CSSValue = ""
```

<a id="Style.width"></a>

```vertex
public var width: CSSValue = ""
```

<a id="Style.height"></a>

```vertex
public var height: CSSValue = ""
```

<a id="Style.minWidth"></a>

```vertex
public var minWidth: CSSValue = ""
```

<a id="Style.minHeight"></a>

```vertex
public var minHeight: CSSValue = ""
```

<a id="Style.maxWidth"></a>

```vertex
public var maxWidth: CSSValue = ""
```

<a id="Style.maxHeight"></a>

```vertex
public var maxHeight: CSSValue = ""
```

<a id="Style.margin"></a>

```vertex
public var margin: CSSValue = ""
```

<a id="Style.marginTop"></a>

```vertex
public var marginTop: CSSValue = ""
```

<a id="Style.marginRight"></a>

```vertex
public var marginRight: CSSValue = ""
```

<a id="Style.marginBottom"></a>

```vertex
public var marginBottom: CSSValue = ""
```

<a id="Style.marginLeft"></a>

```vertex
public var marginLeft: CSSValue = ""
```

<a id="Style.padding"></a>

```vertex
public var padding: CSSValue = ""
```

<a id="Style.paddingTop"></a>

```vertex
public var paddingTop: CSSValue = ""
```

<a id="Style.paddingRight"></a>

```vertex
public var paddingRight: CSSValue = ""
```

<a id="Style.paddingBottom"></a>

```vertex
public var paddingBottom: CSSValue = ""
```

<a id="Style.paddingLeft"></a>

```vertex
public var paddingLeft: CSSValue = ""
```

<a id="Style.flex"></a>

```vertex
public var flex: CSSValue = ""
```

<a id="Style.flexDirection"></a>

```vertex
public var flexDirection: CSSValue = ""
```

<a id="Style.alignItems"></a>

```vertex
public var alignItems: CSSValue = ""
```

<a id="Style.justifyContent"></a>

```vertex
public var justifyContent: CSSValue = ""
```

<a id="Style.gap"></a>

```vertex
public var gap: CSSValue = ""
```

<a id="Style.border"></a>

```vertex
public var border: CSSValue = ""
```

<a id="Style.borderRadius"></a>

```vertex
public var borderRadius: CSSValue = ""
```

<a id="Style.borderColor"></a>

```vertex
public var borderColor: CSSValue = ""
```

<a id="Style.fontSize"></a>

```vertex
public var fontSize: CSSValue = ""
```

<a id="Style.fontWeight"></a>

```vertex
public var fontWeight: CSSValue = ""
```

<a id="Style.lineHeight"></a>

```vertex
public var lineHeight: CSSValue = ""
```

<a id="Style.textAlign"></a>

```vertex
public var textAlign: CSSValue = ""
```

<a id="Style.textDecoration"></a>

```vertex
public var textDecoration: CSSValue = ""
```

<a id="Style.opacity"></a>

```vertex
public var opacity: CSSValue = ""
```

<a id="Style.overflow"></a>

```vertex
public var overflow: CSSValue = ""
```

<a id="Style.cursor"></a>

```vertex
public var cursor: CSSValue = ""
```

<a id="Style.zIndex"></a>

```vertex
public var zIndex: CSSValue = ""
```

<a id="Style.transform"></a>

```vertex
public var transform: CSSValue = ""
```

<a id="Style.transition"></a>

```vertex
public var transition: CSSValue = ""
```

<a id="Style.boxShadow"></a>

```vertex
public var boxShadow: CSSValue = ""
```

#### Methods

<a id="Style.pairs"></a>

```vertex
public func pairs() -> [(string, string)]
```

<a id="Style.cssText"></a>

```vertex
public func cssText() -> string
```

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
@inlinable public func Nodes() -> [Node]
```

### extension Optional <a id="extension-Optional"></a>

```vertex
extension Optional
```

Conforms by extension to: `Renderable`

#### Methods

<a id="Optional.Nodes"></a>

```vertex
@inlinable public func Nodes() -> [Node]
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

- class.vs
- component.vs
- context.vs
- hooks.vs
- mount.vs
