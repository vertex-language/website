# package selector

```vertex
import "web/css/selector"
```

## Index

- [`func MatchComplex(_ complex: ComplexSelector, _ node: html.Node) -> bool`](#func-MatchComplex)
- [`func MatchComplexIn(_ complex: ComplexSelector, _ node: html.Node, _ ctx: MatchContext) -> bool`](#func-MatchComplexIn)
- [`func MatchComplexIn(_ complex: ComplexSelector, _ node: html.Node, _ ctx: MatchContext, pseudoElement: string?) -> bool`](#func-MatchComplexIn-2)
- [`func MatchPart(_ part: SelectorPart, _ node: html.Node) -> bool`](#func-MatchPart)
- [`func MatchPartIn(_ part: SelectorPart, _ node: html.Node, _ ctx: MatchContext) -> bool`](#func-MatchPartIn)
- [`func Matches(_ selectorString: string, _ node: html.Node) -> bool`](#func-Matches)
- [`func ParseSelectors(_ selectorString: string) -> [ComplexSelector]`](#func-ParseSelectors)
- [`func QuerySelector(_ selectorString: string, in root: html.Node) -> html.Node?`](#func-QuerySelector)
- [`func QuerySelectorAll(_ selectorString: string, in root: html.Node) -> [html.Node]`](#func-QuerySelectorAll)
- [`enum AttrMatchOp: Equatable`](#enum-AttrMatchOp)
- [`struct AttrSelector: Equatable`](#struct-AttrSelector)
  - [`init(name: string, value: string = "", op: AttrMatchOp = .exists)`](#AttrSelector.init)
  - [`var Name: string`](#AttrSelector.Name)
  - [`var Value: string`](#AttrSelector.Value)
  - [`var Op: AttrMatchOp`](#AttrSelector.Op)
- [`enum Combinator: Equatable`](#enum-Combinator)
- [`struct ComplexSelector`](#struct-ComplexSelector)
  - [`init(compounds: [CompoundSelector] = [])`](#ComplexSelector.init)
  - [`var Compounds: [CompoundSelector]`](#ComplexSelector.Compounds)
  - [`func Specificity() -> (int, int, int)`](#ComplexSelector.Specificity)
- [`struct CompoundSelector`](#struct-CompoundSelector)
  - [`init(part: SelectorPart, combinator: Combinator = .none)`](#CompoundSelector.init)
  - [`var Part: SelectorPart`](#CompoundSelector.Part)
  - [`var CombinatorWithNext: Combinator`](#CompoundSelector.CombinatorWithNext)
- [`final class MatchContext`](#class-MatchContext)
  - [`init()`](#MatchContext.init)
  - [`var Hovered: html.Node?`](#MatchContext.Hovered)
  - [`var Focused: html.Node?`](#MatchContext.Focused)
  - [`var Active: html.Node?`](#MatchContext.Active)
  - [`var Visited: ((html.Node) -> bool)?`](#MatchContext.Visited)
  - [`static let none = MatchContext()`](#MatchContext.none)
  - [`func Reset()`](#MatchContext.Reset)
- [`struct Pseudo`](#struct-Pseudo)
  - [`init(name: string, argument: string = "")`](#Pseudo.init)
  - [`var Name: string`](#Pseudo.Name)
  - [`var Argument: string`](#Pseudo.Argument)
  - [`var A: int`](#Pseudo.A)
  - [`var B: int`](#Pseudo.B)
  - [`var Inner: [ComplexSelector]`](#Pseudo.Inner)
- [`struct SelectorPart`](#struct-SelectorPart)
  - [`init()`](#SelectorPart.init)
  - [`var Tag: string?`](#SelectorPart.Tag)
  - [`var Id: string?`](#SelectorPart.Id)
  - [`var Classes: [string]`](#SelectorPart.Classes)
  - [`var Attributes: [AttrSelector]`](#SelectorPart.Attributes)
  - [`var Pseudos: [Pseudo]`](#SelectorPart.Pseudos)
  - [`var PseudoElement: string?`](#SelectorPart.PseudoElement)
  - [`var PseudoClasses: [string] { get }`](#SelectorPart.PseudoClasses)

## Functions

### func MatchComplex <a id="func-MatchComplex"></a>

```vertex
public func MatchComplex(_ complex: ComplexSelector, _ node: html.Node) -> bool
```

Matches a complex selector (e.g. `div.menu > ul li a`) against an element node.

### func MatchComplexIn <a id="func-MatchComplexIn"></a>

```vertex
public func MatchComplexIn(_ complex: ComplexSelector, _ node: html.Node, _ ctx: MatchContext) -> bool
```

Matches a complex selector against an element, with the page's state
for the dynamic pseudo-classes.

### func MatchComplexIn <a id="func-MatchComplexIn-2"></a>

```vertex
public func MatchComplexIn(_ complex: ComplexSelector, _ node: html.Node, _ ctx: MatchContext, pseudoElement: string?) -> bool
```

Matches a selector that ends in a pseudo-element -- `a::before` --
against an element's pseudo-element of that name; with nil, a
selector ending in a pseudo-element matches nothing.

### func MatchPart <a id="func-MatchPart"></a>

```vertex
public func MatchPart(_ part: SelectorPart, _ node: html.Node) -> bool
```

Matches a single compound part against an HTML element node.

### func MatchPartIn <a id="func-MatchPartIn"></a>

```vertex
public func MatchPartIn(_ part: SelectorPart, _ node: html.Node, _ ctx: MatchContext) -> bool
```

### func Matches <a id="func-Matches"></a>

```vertex
public func Matches(_ selectorString: string, _ node: html.Node) -> bool
```

Checks if an element node matches a given selector string (can be comma-separated).

### func ParseSelectors <a id="func-ParseSelectors"></a>

```vertex
public func ParseSelectors(_ selectorString: string) -> [ComplexSelector]
```

Parses a selector string like "div.container > h1#title, a[href^='https']"

### func QuerySelector <a id="func-QuerySelector"></a>

```vertex
public func QuerySelector(_ selectorString: string, in root: html.Node) -> html.Node?
```

Finds the first descendant element matching the selector string.

### func QuerySelectorAll <a id="func-QuerySelectorAll"></a>

```vertex
public func QuerySelectorAll(_ selectorString: string, in root: html.Node) -> [html.Node]
```

Finds all descendant elements matching the selector string.

## Types

### enum AttrMatchOp <a id="enum-AttrMatchOp"></a>

```vertex
public enum AttrMatchOp: Equatable
```

#### Cases

<a id="AttrMatchOp.exists"></a>

```vertex
case exists
```

<a id="AttrMatchOp.exact"></a>

```vertex
case exact
```

[attr]

<a id="AttrMatchOp.prefix"></a>

```vertex
case prefix
```

[attr=val]

<a id="AttrMatchOp.suffix"></a>

```vertex
case suffix
```

[attr^=val]

<a id="AttrMatchOp.contains"></a>

```vertex
case contains
```

[attr$=val]

### struct AttrSelector <a id="struct-AttrSelector"></a>

```vertex
public struct AttrSelector: Equatable
```

#### Initializers

<a id="AttrSelector.init"></a>

```vertex
public init(name: string, value: string = "", op: AttrMatchOp = .exists)
```

#### Properties

<a id="AttrSelector.Name"></a>

```vertex
public var Name: string
```

<a id="AttrSelector.Value"></a>

```vertex
public var Value: string
```

<a id="AttrSelector.Op"></a>

```vertex
public var Op: AttrMatchOp
```

### enum Combinator <a id="enum-Combinator"></a>

```vertex
public enum Combinator: Equatable
```

#### Cases

<a id="Combinator.none"></a>

```vertex
case none
```

<a id="Combinator.descendant"></a>

```vertex
case descendant
```

<a id="Combinator.child"></a>

```vertex
case child
```

" "

<a id="Combinator.adjacentSibling"></a>

```vertex
case adjacentSibling
```

">"

<a id="Combinator.generalSibling"></a>

```vertex
case generalSibling
```

"+"

### struct ComplexSelector <a id="struct-ComplexSelector"></a>

```vertex
public struct ComplexSelector
```

#### Initializers

<a id="ComplexSelector.init"></a>

```vertex
public init(compounds: [CompoundSelector] = [])
```

#### Properties

<a id="ComplexSelector.Compounds"></a>

```vertex
public var Compounds: [CompoundSelector]
```

#### Methods

<a id="ComplexSelector.Specificity"></a>

```vertex
public func Specificity() -> (int, int, int)
```

Specificity tuple: (ID count, Class/Attribute/Pseudo count, Tag count)

### struct CompoundSelector <a id="struct-CompoundSelector"></a>

```vertex
public struct CompoundSelector
```

#### Initializers

<a id="CompoundSelector.init"></a>

```vertex
public init(part: SelectorPart, combinator: Combinator = .none)
```

#### Properties

<a id="CompoundSelector.Part"></a>

```vertex
public var Part: SelectorPart
```

<a id="CompoundSelector.CombinatorWithNext"></a>

```vertex
public var CombinatorWithNext: Combinator
```

### class MatchContext <a id="class-MatchContext"></a>

```vertex
public final class MatchContext
```

What a page's state says about its elements, which the dynamic
pseudo-classes ask: which element the pointer is over, which has the
keyboard, which is being pressed. An element is hovered when it or a
descendant is under the pointer, as `:hover` applies to ancestors.

#### Initializers

<a id="MatchContext.init"></a>

```vertex
public init()
```

#### Properties

<a id="MatchContext.Hovered"></a>

```vertex
public var Hovered: html.Node?
```

<a id="MatchContext.Focused"></a>

```vertex
public var Focused: html.Node?
```

<a id="MatchContext.Active"></a>

```vertex
public var Active: html.Node?
```

<a id="MatchContext.Visited"></a>

```vertex
public var Visited: ((html.Node) -> bool)?
```

Whether a link has been visited, asked with its element: the
host knows its history. Nothing is visited without it.

<a id="MatchContext.none"></a>

```vertex
public static let none = MatchContext()
```

An empty context: nothing hovered, focused or active.

#### Methods

<a id="MatchContext.Reset"></a>

```vertex
public func Reset()
```

Forgets what was learned about the tree's shape: call after
elements are added or removed.

### struct Pseudo <a id="struct-Pseudo"></a>

```vertex
public struct Pseudo
```

A pseudo-class with whatever it was given: `:hover`, `:nth-child(2n+1)`
(A and B), `:not(a, .b)` (the selectors inside).

#### Initializers

<a id="Pseudo.init"></a>

```vertex
public init(name: string, argument: string = "")
```

#### Properties

<a id="Pseudo.Name"></a>

```vertex
public var Name: string
```

<a id="Pseudo.Argument"></a>

```vertex
public var Argument: string
```

<a id="Pseudo.A"></a>

```vertex
public var A: int
```

<a id="Pseudo.B"></a>

```vertex
public var B: int
```

<a id="Pseudo.Inner"></a>

```vertex
public var Inner: [ComplexSelector]
```

### struct SelectorPart <a id="struct-SelectorPart"></a>

```vertex
public struct SelectorPart
```

#### Initializers

<a id="SelectorPart.init"></a>

```vertex
public init()
```

#### Properties

<a id="SelectorPart.Tag"></a>

```vertex
public var Tag: string?
```

<a id="SelectorPart.Id"></a>

```vertex
public var Id: string?
```

<a id="SelectorPart.Classes"></a>

```vertex
public var Classes: [string]
```

<a id="SelectorPart.Attributes"></a>

```vertex
public var Attributes: [AttrSelector]
```

<a id="SelectorPart.Pseudos"></a>

```vertex
public var Pseudos: [Pseudo]
```

<a id="SelectorPart.PseudoElement"></a>

```vertex
public var PseudoElement: string?
```

`::before`, `::after` and the like; a selector with one names
something no element is, so it matches no element.

<a id="SelectorPart.PseudoClasses"></a>

```vertex
public var PseudoClasses: [string] { get }
```

The names of the pseudo-classes, for code that wants only those.

## Files

- matcher.vs
- parser.vs
- selector.vs
