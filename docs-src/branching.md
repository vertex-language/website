---
slug: branching
title: if & guard
description: Choose between paths with if, else if, and else, and exit early with guard.
---

## if

An `if` takes a `bool` condition, with no parentheses and always with braces. Chain alternatives with `else if`, and finish with `else`.

```vertex
let temperature = 28

if temperature >= 30 {
    print("hot")
} else if temperature >= 20 {
    print("pleasant")
} else {
    print("cold")
}
```

Conditions combine with `&&`, `||`, and `!`. A comma separates several conditions that must all hold, and it can mix booleans with optional or pattern bindings.

```vertex
let hour = 14
let isWeekend = false

if hour >= 9, hour < 17, !isWeekend {
    print("office hours")
}
```

## if as an expression

`if` and `switch` can produce a value when each branch is a single expression.

```vertex
let load = 0.82
let status = if load > 0.9 { "critical" } else if load > 0.7 { "busy" } else { "ok" }
print(status)
```

## Optional binding

`if let` runs its body only when an optional holds a value. See [Optionals](/docs/optionals) for the full story.

```vertex
let inputs = ["12", "x", "30"]
for text in inputs {
    if let number = int(text) {
        print("\(text) -> \(number * 2)")
    } else {
        print("\(text) is not a number")
    }
}
```

## guard

`guard` states what must be true to continue, and leaves the scope if it is not. The `else` branch has to exit with `return`, `throw`, `break`, or `continue`, which the compiler checks. Values bound by `guard let` stay in scope for the rest of the function.

```vertex
func area(width: int?, height: int?) -> int {
    guard let width, let height else {
        print("missing dimension")
        return 0
    }
    guard width > 0, height > 0 else {
        print("dimensions must be positive")
        return 0
    }
    return width * height
}

print(area(width: 3, height: 4))
print(area(width: nil, height: 4))
print(area(width: -1, height: 4))
```

> tip: Reach for `guard` for preconditions at the top of a function. The happy path then reads straight down the page without nesting.

## Compile-time branches

Code can also branch on the target at compile time with `#if`.

```vertex
#if os(macOS)
let platform = "macOS"
#elseif os(Windows)
let platform = "Windows"
#else
let platform = "other"
#endif
print("built for \(platform)")
```
