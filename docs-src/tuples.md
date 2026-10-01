---
slug: tuples
title: Tuples
description: Group a fixed number of values of any types into one lightweight value, with labels and destructuring.
---

## Grouping values

A tuple bundles several values, which may have different types. It is a good fit for returning more than one result from a function.

```vertex
let status = (404, "Not Found")
print(status.0, status.1)

let (code, message) = status
print(code, message)

let (onlyCode, _) = status
print(onlyCode)
```

## Labeled elements

Give elements names to make the meaning clear at the use site.

```vertex
let point = (x: 3, y: 4)
print(point.x, point.y)

func minMax(_ values: [int]) -> (min: int, max: int) {
    var lo = values[0], hi = values[0]
    for v in values {
        if v < lo { lo = v }
        if v > hi { hi = v }
    }
    return (lo, hi)
}

let range = minMax([4, 9, -2, 7])
print("range \(range.min)...\(range.max)")
```

## Comparing and switching

Tuples of comparable elements compare lexicographically, and they are a natural fit for pattern matching (see [Switch & patterns](/docs/switch)).

```vertex
print((1, 2) < (1, 3), (2, "a") == (2, "a"))

func quadrant(_ p: (int, int)) -> string {
    switch p {
    case (0, 0): return "origin"
    case (_, 0): return "x-axis"
    case (0, _): return "y-axis"
    case (let x, let y) where x > 0 && y > 0: return "first"
    default: return "elsewhere"
    }
}
print(quadrant((0, 0)), quadrant((5, 0)), quadrant((2, 3)), quadrant((-1, 4)))
```

> tip: Tuples are for short-lived groupings. Once data has a name and a purpose, make it a [struct](/docs/structs).
