---
slug: vss
title: VSS
description: Give a package its styles in .vss files, CSS after a short header, checked by the compiler, scoped to the package's own markup, and themed through tokens.
---

## A package's styles

A `.vss` file is CSS after a short header. It sits beside the package's `.vs` and `.vsx` files and is compiled with them by `vsc`, so nothing else has to name it. A package's `.vss` files become one stylesheet, scoped to the elements the package's own markup makes.

```vsx check pair
package main

func Notice(text: string) -> Element {
    return <p className="notice">{text}</p>
}
```

```vss pair
package main

.notice {
    padding: 8px 12px;
    border-radius: 6px;
    background: #f4f5f7;
    &:hover { background: #e9ebef; }
}
```

The markup is covered in [VSX](/docs/vsx).

## The header

A `.vss` file begins with its package, then any imports. Comments and blank lines may come before and between them.

```vss
/* The styles of this program. */
package main

import "ui/kit"
import (
    "ui/icon"
    "ui/viewport"
)

.page { display: flex; }
```

The package is the folder's, and a `.vss` file whose package differs is refused.

```vss error
package billing

.page { display: flex; }
```

An import names a package whose styles come before this package's, beside the packages its `.vs` and `.vsx` files import.

## The body

Everything after the header is CSS, passed to the page's engine as written: selectors, nesting such as `&:hover` and `& > header`, custom properties and `var()`, and the at-rules `@media`, `@supports`, `@keyframes`, `@font-face`, `@property`, `@import`, and `@charset`.

```vss
package main

:root { --accent: #2f6fec; }

body { background: #f4f5f7; color: #1d2330; }

button {
    padding: 6px 12px;
    border-radius: 6px;
    &:hover { border-color: #8d95a5; }
    &.primary { background: var(--accent); color: white; }
}

@keyframes pulse {
    from { opacity: 0.4; }
    to { opacity: 1; }
}

@media (prefers-color-scheme: dark) {
    :root { --accent: #4c8dff; }
    body { background: #14161b; color: #e6e8ee; }
}
```

## What vsc checks

Each declaration in a style rule is checked against what the engine reads, including inside `@media`, `@supports`, `@layer`, `@scope`, and `@container`. The bodies of `@keyframes`, `@font-face`, `@property`, `@page`, `@counter-style`, and `@font-feature-values` are not checked.

| Written | Result |
| :--- | :--- |
| a property the engine applies | accepted |
| a property it knows and does not apply yet | a warning |
| anything else | an error, with the nearest name |
| something that is not `name: value` | an error |
| a custom property such as `--x` | accepted, with any value |

```vss error
package main

.title {
    colr: red;
    font-size: 14px;
}
```

A warning does not stop the build, but the declaration will have no effect.

```vss warn
package main

.title {
    writing-mode: vertical-rl;
}
```

## The document

A rule on the document is one whose every selector is a single compound of `:root`, `html`, or `body`, such as `body.dark` or `:root[data-theme]`, but not `body .x`.

Only package `main` sets properties there. A library may set custom properties on the document and nothing else.

```vss error lib
package badge

body {
    --badge-tint: red;
    margin: 0;
}
```

## Tokens

A package's tokens are the custom properties it registers with `@property`, and those its rules on the document set. They are its styling API.

```vss lib
package badge

@property --badge-tint { syntax: "<color>"; inherits: true; initial-value: #2563eb; }
@property --badge-radius { syntax: "<length>"; inherits: true; initial-value: 6px; }

.badge {
    color: white;
    background: var(--badge-tint);
    border-radius: var(--badge-radius);
}
```

Custom properties share the page, so in a package other than `main`, an `@property` is named for the package.

```vss error lib
package badge

@property --tint { syntax: "<color>"; inherits: true; initial-value: red; }
```

A custom property named for a styled package the file sees, its own or one its package imports, must be one that package declares when it is read with `var()` or set. A package may set new properties of its own name anywhere, but what it reads has to be declared.

```vss error
package main

import "ui/kit"

:root { --kit-acent: #10b981; }
```

In code, the generated `Tokens` enum lists each `@property` a library registers, by its name without the prefix in `UpperCamelCase`. `--kit-text-color` would be `TextColor`. A `Token` has `Name` and `Syntax`.

```vsx
import "ui/kit"

print(kit.Tokens.Accent.Name, kit.Tokens.Accent.Syntax)
```

## Scope and order

A package's `.vss` files, in file-name order, become one stylesheet with its own cascade layer. Rules on the document go in the layer, and every other rule also goes in a scope that covers the package's elements.

```vss sample
/* @import, @charset, @font-face, @property: outside the layer */
@property --kit-accent { … }

@layer kit {
    /* rules on the document: in the layer, not the scope */
    :root { --kit-radius: 6px }

    @scope ([data-p="kit"]) to ([data-p]:not([data-p="kit"])) {
        /* every other rule */
        .button { … }
    }
}
```

`@media` and `@supports` are split the same way: their rules on the document stay outside the scope, under the condition, and the rest go inside it.

In a package with `.vss` files, every element its markup writes is stamped `data-p="<package>"` and carries the package's sheet. So `.button` above matches an element `kit`'s markup made, and nothing inside another package's element below it. A call of another package's component carries the calling package's sheet too, so a program whose markup is only another package's components still has its own styles applied.

```vsx
import "ui/kit"

func Save() {}

print((<kit.Button label="Save" onPress={Save} />).Html())
```

When a root is mounted, the runtime gives the page the sheets its elements carry: each after the sheets of the packages it imports, and package `main`'s last. A later sheet's layer wins over an earlier one's, so a package overrides what it imports, and the program overrides every package.

## Theming

A program themes a package by setting its tokens. On the document in its own `.vss`, a token reaches the whole page. Where nothing sets a token, its `@property` `initial-value` stands.

```vss
package main

import "ui/kit"

:root {
    --kit-accent: #10b981;
    --kit-radius: 10px;
}
```

On an element, it reaches everything inside that element.

```vsx
import "ui/kit"

func Save() {}

let panel = (
    <div style={["--kit-accent": "rgb(0, 128, 0)"]}>
        <kit.Button label="Go" onPress={Save} />
    </div>
)
print(panel.Html())
```

> tip: Reach for a token before an override. A rule in your package cannot match an element another package's markup made, because the package's scope stops at it, while a token registered with `inherits: true` reaches every element below where it is set.
