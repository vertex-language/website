---
slug: vsx
title: VSX
description: Write markup as Vertex expressions in .vsx files, with checked elements, typed components, hooks, and a runtime that keeps the page up to date.
---

## Markup is an expression

A `.vsx` file is Vertex source with markup in it. It sits beside the `.vs` files of its package and is compiled with them. Markup is an expression: `<p>Hi</p>` is a value of type `Element`, which can be stored, passed, and returned like any other.

```vsx
let name = "Ada"
let greeting = <p className="hello">Hello, {name}!</p>
print(greeting.Html())
```

A component is a function returning `Element`. Its parameters are its attributes, and a state hook gives it something to remember between renders.

```vsx check
package main

import "ui/app"

func Counter(start: int = 0) -> Element {
    let (count, setCount) = useState(start)
    return <button onClick={setCount(count + 1)}>Clicked {count} times</button>
}

func main() async -> int32 {
    return await app.Run(title: "Counter", width: 320, height: 200) {
        <Counter start={5} />
    }
}
```

Styles live next to the markup in a `.vss` file. See [VSS](/docs/vss).

## Files and imports

A `.vsx` file imports three packages without writing them. A file may still write either import, and it is the same import.

| Package | Bound as | What it gives |
| :--- | :--- | :--- |
| `ui/component` | `component` | what markup lowers to, the hooks, and `Mount` |
| `web/dom` | `dom` | the events handlers are given, such as `dom.MouseEvent` |
| `ui/viewport` | `viewport` | `<Viewport>`, a box something else draws into |

These names need no qualification in a `.vsx` file:

| Kind | Names |
| :--- | :--- |
| Types | `Element`, `Node`, `Props`, `EmptyProps`, `EmptyState`, `Style`, `CSSValue`, `Ref<T>`, `Context<T>`, `Component<P, S>`, `SetState<T>`, `Children` |
| Element types | `HTMLElement`, `HTMLInputElement`, `HTMLButtonElement`, `HTMLDivElement`, `HTMLSpanElement`, `HTMLFormElement` |
| Hooks | `useState`, `useReducer`, `useRef`, `useEffect`, `useLayoutEffect`, `useInsertionEffect`, `useMemo`, `useCallback`, `useId`, `useTransition`, `startTransition`, `useDeferredValue`, `createContext`, `use`, `useContext` |
| Components | `Suspense`, `StrictMode`, `Profiler`, `Viewport` |
| Functions | `Focus`, `Bounds`, `renderToString` |

A plain `.vs` file has none of this. It writes `import "ui/component"` and names `component.Node`.

> info: Where `vsc` cannot find `ui` from the file's folder, it compiles the file against a built-in prelude with the same names. The prelude renders to HTML and runs no page: there is no `Focus`, `Bounds`, or `<Viewport>`, and nothing is unmounted.

## Where markup starts

`<` starts markup where an expression starts and the next token is an identifier or `>`. After an operand it is the comparison operator, and in `sorted(by: <)` it is the operator itself. After a declaration's name, as in `func id<T>`, it begins generic parameters.

```vsx
let count = 3
let small = count < 4
let order = [3, 1, 2].sorted(by: <)
let page = small ? <p>{order.count} items</p> : <></>
print(page.Html())
```

Markup ends at its closing `>` or `/>`, so braces after it are not a trailing closure. Parentheses around multi-line markup are ordinary parentheses.

## Elements and attributes

A name that starts with a lowercase letter, contains `-`, or contains `:` is an element of the page. A name that starts with an uppercase letter, or is dotted, is a component.

An element's name is checked: it has to be an HTML element, an SVG element, a custom element such as `color-picker`, or a namespaced one such as `svg:rect`. Anything else is refused, with the nearest name.

```vsx error
func Box() -> Element {
    return <dvi>Hello</dvi>
}
```

Attributes are checked against what the element takes: its own, the global ones such as `id`, `class`, `style`, and `role`, any `data-…` or `aria-…`, and any namespaced one. An SVG, custom, or namespaced element accepts any attribute.

```vsx error
func Photo() -> Element {
    return <img scr="cat.png" />
}
```

An attribute can be bare, a string, braces, or a single element. A string has no escapes, but HTML character references such as `&amp;` are decoded in strings and in text.

```vsx
let title = "Docs & guides"
let extra = ["data-role": "nav", "class": "wide"]
let link = <a href="/docs" className="link" title={title} hidden={false} download {...extra}>Docs &amp; guides</a>
print(link.Html())
```

A few names are written as in JSX and set as in HTML:

| Written | Sets |
| :--- | :--- |
| `className` | `class` |
| `htmlFor` | `for` |
| `tabIndex`, `readOnly`, `autoFocus`, `maxLength`, `minLength`, `colSpan`, `rowSpan`, `contentEditable`, `spellCheck`, `crossOrigin` | the same name in lowercase |

A value given in braces sets the attribute according to its type:

| Value | Attribute |
| :--- | :--- |
| `true` | present and empty |
| `false` | absent |
| `Style(…)` | its declarations |
| `[String: String]` | its pairs as declarations, keys sorted, for `style` |
| anything else | the value as a string |

`{...dict}` sets each pair of a `[String: String]`, and `class` and `className` add classes. An attribute written after a spread overrides it.

## Text and whitespace

Text follows JSX's rules. A line of text is trimmed and lines are joined with one space. A line of only whitespace is dropped, and so is whitespace that runs up to or away from a line break beside an element or braces. Spaces inside a line are kept.

```vsx
let name = "World"
let message = (
    <p>
        Hello,
        {name}!   How are
        you?
    </p>
)
print(message.Html())
```

## Braces

Braces hold Vertex code. What they give depends on where they are.

### As a value

Among children, and in an attribute that is not a handler, braces give a value. A child may be an `Element`, a `String`, an `Int`, a `Double`, an array of them, or an optional of them. `nil` and `Bool` render nothing.

| Written | Gives |
| :--- | :--- |
| `{expr}` | the expression's value |
| `{if c { <a/> } else { <b/> }}` | the branch taken; with no `else`, nothing when false |
| `{switch x { case .a: <a/> }}` | the case taken |
| `{cond && <a/>}` | `<a/>` where `cond` holds, else nothing |
| `{/* comment */}` | nothing |

```vsx
enum Level { case info, warn }

func Report(items: [string], level: Level, verbose: bool) -> Element {
    return (
        <ul>
            {items.map { item in <li key={item}>{item}</li> }}
            {if items.isEmpty { <li>Nothing yet</li> }}
            {verbose && <li>Verbose</li>}
            {switch level {
            case .info: <li>All good</li>
            case .warn: <li>Look closer</li>
            }}
            {/* a comment renders nothing */}
        </ul>
    )
}

print((<Report items={["a", "b"]} level={.warn} verbose />).Html())
```

A closure where a value is wanted is refused, except as a component's function child.

```vsx error
func Names(names: [string]) -> Element {
    return <ul>{name in <li>{name}</li>}</ul>
}
```

### As a handler

In an `on…` attribute, braces give a handler, a function of the event.

```vsx check
func Handlers() -> Element {
    let (n, setN) = useState(0)

    func reset() { setN(0) }
    func handle(e: dom.MouseEvent) { print(e.X, e.Y) }

    return (
        <div>
            <button onClick={e in print(e.Type)}>a closure taking the event</button>
            <button onClick={setN(n + 1)}>a statement, the event unused</button>
            <button onClick={{ setN(n + 1); print(n) }}>a closure of statements</button>
            <button onClick={{ setN { $0 + 1 } }}>double braces, with $0</button>
            <button onClick={reset}>a function of no arguments</button>
            <button onClick={handle}>a function of the event</button>
        </div>
    )
}
```

Double braces are also how a closure is written for any attribute that takes a function.

## Events

Each `on…` attribute names one event, and its handler is given that event's type. Adding `Capture`, as in `onClickCapture`, names the same event. An unknown `on…` name is refused with the nearest one, and a handler written as a string is refused.

```vsx error
func Buttons() -> Element {
    return (
        <div>
            <button onClik={print("a")}>a</button>
            <button onClick="save">b</button>
        </div>
    )
}
```

| Attribute | Handler is given |
| :--- | :--- |
| `onClick` `onDoubleClick` `onContextMenu` `onMouseDown` `onMouseUp` `onMouseMove` `onMouseEnter` `onMouseLeave` `onMouseOver` `onMouseOut` | `dom.MouseEvent` |
| `onPointerDown` `onPointerUp` `onPointerMove` `onPointerEnter` `onPointerLeave` `onPointerCancel` | `dom.PointerEvent` |
| `onWheel` | `dom.WheelEvent` |
| `onKeyDown` `onKeyUp` `onKeyPress` | `dom.KeyboardEvent` |
| `onInput` `onBeforeInput` | `dom.InputEvent` |
| `onSubmit` | `dom.SubmitEvent` |
| `onFocus` `onBlur` | `dom.FocusEvent` |
| `onCompositionStart` `onCompositionUpdate` `onCompositionEnd` | `dom.CompositionEvent` |
| `onDrag` `onDragStart` `onDragOver` `onDragEnter` `onDragLeave` `onDragEnd` `onDrop` | `dom.DragEvent` |
| `onLayout` | `dom.LayoutEvent` |
| `onChange` `onReset` `onInvalid` `onScroll` `onToggle` `onClose` `onCancel` `onTransitionEnd` `onAnimationStart` `onAnimationEnd` `onAnimationIteration` `onLoad` `onError` `onPlay` `onPause` `onEnded` | `dom.Event` |

Every event has `Type`, `DefaultPrevented`, `Bubbles`, `PreventDefault()`, and `StopPropagation()`. The rest depends on its type:

| Event | Adds |
| :--- | :--- |
| `dom.MouseEvent`, `dom.PointerEvent` | `X`, `Y`, `Clicks`, `Button`, `Pressed`, `Shift`, `Control`, `Alt`, `Meta` |
| `dom.WheelEvent` | `X`, `Y`, `DeltaX`, `DeltaY`, `Shift`, `Control`, `Alt`, `Meta` |
| `dom.KeyboardEvent` | `Key`, `Code`, `Shift`, `Control`, `Alt`, `Meta`, `Repeat` |
| `dom.InputEvent` | `Value`, the field's text now, and `Data`, what was typed |

A field is controlled by its state: `value` reads it, and `onInput` sets it.

```vsx check
func AddTask(onAdd: (string) -> void) -> Element {
    let (draft, setDraft) = useState("")
    return (
        <form onSubmit={e in
            e.PreventDefault()
            onAdd(draft)
            setDraft("")
        }>
            <input placeholder="What needs doing?" value={draft} onInput={e in setDraft(e.Value)} />
        </form>
    )
}
```

## Style

`Style` is typed inline CSS. Its arguments may be written in any order. An `Int` is pixels, a `Double` or `String` is written as it is, and an unset one is left out.

```vsx
let w = 120
print((<div style={Style(padding: 8, color: "red", width: w)}>Box</div>).Html())
```

Its properties are `color`, `backgroundColor`, `background`, `display`, `position`, `top`, `right`, `bottom`, `left`, `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, `gap`, `border`, `borderRadius`, `borderColor`, `fontSize`, `fontWeight`, `lineHeight`, `textAlign`, `textDecoration`, `opacity`, `overflow`, `cursor`, `zIndex`, `transform`, `transition`, and `boxShadow`. Each `camelCase` name sets its `kebab-case` property, and any other name is refused.

```vsx error
func Tinted() -> Element {
    return <div style={Style(colr: "red")}>Tinted</div>
}
```

For anything else, and for custom properties, give `style` a dictionary or a string.

```vsx
print((<div style={["--kit-accent": "blue", "color": "red"]}>a</div>).Html())
print((<div style="border: 1px solid">b</div>).Html())
```

## Components

### Functions

A component is a function returning `Element`. An attribute is the argument of the parameter with its label, and a bare attribute is `true`. A capitalized top-level function in a `.vsx` file that returns `Element` or `Node` is `@MainActor`, so it may use `@MainActor` types as they are.

```vsx
func Card(title: string, wide: bool = false, children: Node = nil) -> Element {
    return (
        <section className={wide ? "card wide" : "card"}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

print((<Card title="Team" wide><p>Members</p></Card>).Html())
```

An attribute no parameter has is refused with the nearest label, and a parameter with no default has to be given.

```vsx error
func Card(title: string) -> Element {
    return <h2>{title}</h2>
}

func Team() -> Element {
    return (
        <div>
            <Card titel="Team" />
            <Card />
        </div>
    )
}
```

`{...value}` spreads a struct's fields as the parameters of their names, and an attribute written as well wins. Spreading anything but a struct is refused.

### Props structs

A function whose one parameter is a struct, usually one conforming to `Props`, takes its attributes as that struct's memberwise initializer does.

```vsx
struct ButtonProps: Props {
    var label: string
    var kind: string = "plain"
    var children: Node? = nil
}

func Button(props: ButtonProps) -> Element {
    return <button className={"btn " + props.kind}>{props.label}{props.children}</button>
}

let saved = ButtonProps(label: "Save")
print((<Button label="Go" />).Html())
print((<Button {...saved} kind="danger"><i>!</i></Button>).Html())
```

### Children

What is written between a component's tags is its `children` argument, in the form the parameter's type takes.

| `children:` parameter | Given |
| :--- | :--- |
| `Node` | the children as one fragment |
| a function, such as `() -> Node` | a closure making them |
| a function of values, such as `(T) -> Element` | the one closure written as the only child |

```vsx
func Each<T>(items: [T], children: (T) -> Element) -> Element {
    return <ul>{items.map { children($0) }}</ul>
}

print((<Each items={["a", "b"]}>{x in <li>{x}</li>}</Each>).Html())
```

### Names and type arguments

A component is named as its function is: `Card`, `kit.Card` through its package, or `ui2.Nav` for a static function of a type. Type arguments are written after the name with no space before the `<`, or inferred from the attributes.

```vsx
enum Size: string {
    case small = "s"
    case large = "l"
}

func Picker<T>(value: T, options: [T], name: (T) -> string) -> Element {
    return (
        <select>
            {options.map { o in <option selected={name(o) == name(value)}>{name(o)}</option> }}
        </select>
    )
}

print((<Picker<Size> value={.large} options={[.small, .large]} name={s in s.rawValue} />).Html())
print((<Picker value={2} options={[1, 2, 3]} name={n in "n\(n)"} />).Html())
```

### Classes

A class inheriting `Component<P, S>`, with an initializer taking no arguments, is a component whose attributes are the fields of `P`. `props` and `state` hold its props and state, and `setState(_:)` sets the state and renders it again. The runtime also calls `componentDidMount()`, `componentDidUpdate(prevProps:prevState:)`, and `componentWillUnmount()`.

```vsx
struct ToggleProps {
    var on: string
    var off: string
}

class Toggle: Component<ToggleProps, bool> {
    init() {
        super.init()
        state = false
    }

    override func render() -> Node {
        return <button onClick={{ self.setState(!self.state) }}>{state ? props.on : props.off}</button>
    }
}

print((<Toggle on="ON" off="off" />).Html())
```

### Context

`<Ctx value={v}>…</Ctx>` gives `v` to everything rendered inside it and stops at its end. `use(Ctx)` and `useContext(Ctx)` read the nearest value, or the default outside any.

```vsx
let Theme = createContext("light")

func Label() -> Element {
    return <span>{use(Theme)}</span>
}

print((<Theme value="dark"><Label /></Theme>).Html())
print((<Label />).Html())
```

`<Suspense fallback={…}>`, `<StrictMode>`, and `<Profiler id="…">` render their children and nothing else.

## key and ref

`key={k}` names an element or component among its siblings, so the runtime keeps the one that had the key. Keyed siblings are moved, not made again.

`ref` gives an element to the code, once it is in the document. On a component, it is given the first element the component renders.

| `ref=` | What happens |
| :--- | :--- |
| `{r}`, with `let r = useRef<HTMLElement>()` | `r.current` holds it while it is in the document, `nil` after |
| `{setEl}`, a setter of `useState<HTMLElement?>(nil)` | it is called with it, and with `nil` when it goes |
| `{el in …}` | the closure is called with it, and with `nil` when it goes |

```vsx check
func Search(terms: [string]) -> Element {
    let box = useRef<HTMLElement>()
    return (
        <div>
            <input ref={box} />
            <button onClick={Focus(box)}>Focus</button>
            <ul>{terms.map { t in <li key={t}>{t}</li> }}</ul>
        </div>
    )
}
```

`Focus(ref)` moves the page's focus to an element and `Focus(nil)` takes it away. `Bounds(of: ref)` says where an element is laid out, or `nil`. The `autofocus` attribute focuses its element once it is in the document.

## Hooks

Hooks are called in a component's body, the same ones in the same order every render.

| Hook | What it does |
| :--- | :--- |
| `useState(initial)` | gives `(value, set)`. `set(v)` sets it and `set { $0 + 1 }` sets it from what it is; either renders again. `useState { compute() }` computes the first value once. |
| `useReducer(reducer, initial)` | gives `(state, dispatch)`. `dispatch(action)` sets the state to `reducer(state, action)` and renders again. |
| `useRef(initial)` | gives a `Ref<T>`, a box kept across renders. `.current` is a `T?`, and setting it renders nothing. |
| `useEffect(effect, deps)` | runs `effect` after the render is in the document: after the first render, and after each render whose `deps` differ. With no `deps` it runs every render, and with `[]` the first only. |
| `useLayoutEffect`, `useInsertionEffect` | the same as `useEffect`. |
| `useMemo(compute, deps)` | gives `compute()`'s value, computed again only when `deps` differ. |
| `useCallback(f, deps)` | the same as `useMemo({ f }, deps)`. |
| `useId()` | gives an id unique in the program, kept across renders. |
| `useTransition()`, `startTransition(f)`, `useDeferredValue(v)` | renders are synchronous, so a transition runs at once and a deferred value is the value. |

```vsx check
enum Action { case add(string), clear }

func reduce(items: [string], action: Action) -> [string] {
    switch action {
    case .add(let item): return items + [item]
    case .clear: return []
    }
}

func Log(channel: string) -> Element {
    let (items, dispatch) = useReducer(reduce, ["started"])
    let total = useMemo({ items.count }, [items.count])

    useEffect({
        print("watching \(channel)")
        return { print("leaving \(channel)") }
    }, [channel])

    return (
        <div>
            <p>{total} entries</p>
            <button onClick={dispatch(.add("clicked"))}>Add</button>
            <button onClick={dispatch(.clear)}>Clear</button>
        </div>
    )
}
```

An effect whose closure returns a function has a cleanup, which runs before the effect runs again and when the component goes.

`deps` is an `[any Equatable]`. `Int`, `String`, `Bool`, and `Double` values are compared by value, and any other value differs every render.

## Rendering again

`app.Run(title:width:height:)` mounts a root in a window, and `component.Mount(root, into: document, at: element)` mounts it in a `dom.Document`. The root runs once. After that, a component renders again when its state is set or when its parent renders, and what it renders is applied to what is already in the document:

- An element keeps its element, and with it its focus and its place. Its attributes and handlers are updated, and its children are applied in turn.
- A component keeps its state, and renders with the props its parent gives it now.
- Among siblings, a node is matched to the one with its `key`, or without keys to the one in its place, and only to one of its kind. Anything else is made anew: what it replaces has its effects' cleanups run and its refs given `nil`.

Setting a state to a value equal to the one it holds renders nothing, for an `Int`, `String`, `Bool`, `Double`, or an array of `Int`s or `String`s.

### Live braces

What markup writes in braces also follows the signals it reads, on its own: an `@Observable` class's properties. When `store.Todos` changes here, the text in the braces is made again and nothing else. `Count` does not render again.

```vsx check
@Observable final class Store {
    var Todos: [string] = []
}

func Count(store: Store) -> Element {
    return <p>{store.Todos.count} todos</p>
}
```

A component's body reads untracked: a value it computes from a store outside braces is computed when it renders.

## Viewports

A viewport is a box of the page that something other than markup draws, such as a web page, a remote desktop, a canvas, or a terminal. The box is an element like any other, laid out and styled by the page's CSS, and a source fills it.

```vsx check
func Screen() -> Element {
    let source = useMemo({
        viewport.Drawing { w, h, t in
            return [uint8](repeating: 255, count: w * h * 4)
        }
    }, [])
    return <Viewport source={source} class="screen" live focusable />
}
```

| Attribute | What it does |
| :--- | :--- |
| `source` | a `viewport.Source`: what draws the box and takes what the user does in it |
| `class` | the element's class, `"viewport"` if left out |
| `live` | draws every frame, not only when the source asks |
| `focusable` | a press in the box gives it the keyboard |

A source is a class inheriting `viewport.Source`. It overrides `Draw(frame:)`, which answers RGBA pixels, premultiplied, top row first, and any of the input methods it takes, such as `PointerDown` or `KeyDown`. `viewport.Drawing { w, h, t in … }` is a source that only draws. `Attached(handle:)` gives it a `viewport.Handle`, whose `Invalidate()` asks for a frame from an event or a task.

`webview.View` is a component built on one: it shows a `webview.WebView`'s page in the box, and gives the page clicks, the wheel, and keys.

```vsx check
import "ui/webview"

func Browser() -> Element {
    let view = useMemo({ webview.WebView() }, [])
    return <webview.View controller={view} url="https://example.com" class="page" />
}
```
