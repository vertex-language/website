---
slug: structs
title: Structs
description: Value types that bundle data and behavior, with memberwise initializers and copy-on-assignment semantics.
---

## Defining a struct

A `struct` groups stored properties and methods. Vertex synthesizes a *memberwise initializer*, and properties with default values may be left out of it.

```vertex
struct Resolution {
    var width = 0
    var height = 0

    func pixels() -> int { width * height }
}

struct Window {
    var title: string
    var size = Resolution(width: 800, height: 600)
    var isVisible = true
}

let hd = Resolution(width: 1920, height: 1080)
var window = Window(title: "Editor")
print(hd.pixels(), window.size.width, window.isVisible)
window.size.width = 1024
print(window.size.pixels())
```

## Value semantics

Assigning or passing a struct copies it. Two names never alias the same struct, so changes through one are invisible through the other. A struct held in a `let` is meant to be immutable all the way down, including its `var` properties: declare it `var` when you intend to change it.

```vertex
struct Point { var x = 0, y = 0 }

var a = Point(x: 1, y: 1)
var b = a
b.x = 100
print(a.x, b.x)

func nudge(_ p: Point) -> Point {
    var q = p
    q.y += 1
    return q
}
print(nudge(a).y, a.y)
```

## Methods and mutation

A method that changes the struct must be marked `mutating`. The marker shows at the declaration and enforces the rule above at every call.

```vertex
struct Counter {
    private(set) var value = 0

    mutating func increment(by amount: int = 1) {
        value += amount
    }
    mutating func reset() {
        self = Counter()
    }
}

var counter = Counter()
counter.increment()
counter.increment(by: 5)
print(counter.value)
counter.reset()
print(counter.value)
```

Methods can also be written outside the struct, with an explicit receiver (see [Receiver methods](/docs/receiver-methods)).

## Custom initializers

Declare an `init` to compute defaults or validate input. Every stored property must be set before the initializer returns.

```vertex
struct Celsius {
    var degrees: double

    init(_ degrees: double) { self.degrees = degrees }
    init(fahrenheit: double) { self.degrees = (fahrenheit - 32) / 1.8 }
    init?(parsing text: string) {
        guard let value = double(text) else { return nil }
        self.degrees = value
    }
}

print(Celsius(21.5).degrees)
print(Celsius(fahrenheit: 212).degrees)
print(Celsius(parsing: "x") == nil, Celsius(parsing: "-4")!.degrees)
```

## Static members

`static` members belong to the type itself.

```vertex
struct Color {
    var r: uint8, g: uint8, b: uint8

    static let black = Color(r: 0, g: 0, b: 0)
    static let white = Color(r: 255, g: 255, b: 255)
    static func gray(_ level: uint8) -> Color { Color(r: level, g: level, b: level) }
}

print(Color.white.r, Color.gray(128).g)
```
