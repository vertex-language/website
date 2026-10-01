---
slug: receiver-methods
title: Receiver Methods
description: Declare methods outside a type, naming the receiver and its ownership explicitly.
---

## Methods outside the type

Besides declaring methods inside a type body, Vertex lets you declare them at the top level by naming a **receiver** in parentheses before the function name. The receiver is an ordinary parameter name that stands for `self` inside the body.

```vertex
struct Vec2 {
    var x: float32
    var y: float32
}

func (v: borrowing Vec2) length() -> float32 {
    return (v.x * v.x + v.y * v.y).squareRoot()
}

func (v: inout Vec2) scale(by factor: float32) {
    v.x *= factor
    v.y *= factor
}

var v = Vec2(x: 3, y: 4)
print(v.length())
v.scale(by: 2)
print(v.x, v.y, v.length())
```

A receiver method is called like any other method. It is statically dispatched, lowers to an extension method, and cannot be overridden in a class hierarchy. Members of the receiver are available without writing the receiver name.

```vertex
struct Counter { var count = 0 }

func (c: inout Counter) increment() {
    count += 1
}
func (c: borrowing Counter) report() -> string {
    return "count is \(count)"
}

var c = Counter()
c.increment()
c.increment()
print(c.report())
```

## Ownership of the receiver

The modifier before the type says how the method uses the receiver:

| Modifier | Meaning | On a struct or enum | On a class |
| --- | --- | --- | --- |
| `borrowing` (default) | Read-only access, no copy and no reference-count change | an ordinary method | a reference method |
| `inout` | In-place mutation of the receiver | a `mutating` method | not allowed |
| `consuming` | The method takes the value, and the caller cannot use it afterwards | a `consuming` method | a `consuming` method |

```vertex
struct Buffer { var bytes: [uint8] }

func (b: borrowing Buffer) size() -> int { return b.bytes.count }

func (b: inout Buffer) append(_ byte: uint8) { b.bytes.append(byte) }

func (b: consuming Buffer) intoArray() -> [uint8] { return b.bytes }

var buffer = Buffer(bytes: [])
buffer.append(7)
buffer.append(9)
print(buffer.size())
let bytes = buffer.intoArray()
print(bytes)
```

> info: Use a receiver method to add behavior to a type you do not own, to keep a type's declaration short, or to place a method in another file of the same package. Everything else about it behaves like a method declared in the type.

## Limits

A receiver method is an extension method written in a different place, so it follows the same rules: it can add behavior but not stored properties, and it is resolved at compile time. Receivers on a generic type are not available yet; use an [extension](/docs/extensions) inside the type's declaration for those.
