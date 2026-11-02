# web/css/selector

Selectors: the parser, the matcher (combinators, attributes, pseudo-classes, `:not()`, `:is()`, `:has()`), specificity, `QuerySelector`.

```vertex
import "web/css/selector"
```

## Types

- **`MatchContext`** (class): What a page's state says about its elements, which the dynamic pseudo-classes ask: which element the pointer is over, which has the keyboard, which is being pressed.
- **`Combinator`** (enum)
- **`AttrMatchOp`** (enum)
- **`AttrSelector`** (struct)
- **`Pseudo`** (struct): A pseudo-class with whatever it was given: `:hover`, `:nth-child(2n+1)` (A and B), `:not(a, .b)` (the selectors inside).
- **`SelectorPart`** (struct)
- **`CompoundSelector`** (struct)
- **`ComplexSelector`** (struct)

## Functions

- `func MatchPart(part: SelectorPart, node: html.Node) -> bool`: Matches a single compound part against an HTML element node.
- `func MatchPartIn(part: SelectorPart, node: html.Node, ctx: MatchContext) -> bool`
- `func MatchComplex(complex: ComplexSelector, node: html.Node) -> bool`: Matches a complex selector (e.g. `div.menu > ul li a`) against an element node.
- `func MatchComplexIn(complex: ComplexSelector, node: html.Node, ctx: MatchContext) -> bool`: Matches a complex selector against an element, with the page's state for the dynamic pseudo-classes.
- `func MatchComplexIn(complex: ComplexSelector, node: html.Node, ctx: MatchContext, pseudoElement: string?) -> bool`: Matches a selector that ends in a pseudo-element -- `a::before` -- against an element's pseudo-element of that name; with nil, a selector ending in a pseudo-element matches nothing.
- `func ParseSelectors(selectorString: string) -> [ComplexSelector]`: Parses a selector string like "div.container > h1#title, a[href^='https']"
- `func Matches(selectorString: string, node: html.Node) -> bool`: Checks if an element node matches a given selector string (can be comma-separated).
- `func QuerySelector(selectorString: string, in root: html.Node) -> html.Node?`: Finds the first descendant element matching the selector string.
- `func QuerySelectorAll(selectorString: string, in root: html.Node) -> [html.Node]`: Finds all descendant elements matching the selector string.

Part of the [`web`](https://github.com/vertex-language/web) repository.
