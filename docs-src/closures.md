---
slug: closures
title: Closures
description: Inline function values with concise syntax, trailing-closure calls, and rules for capturing the surrounding scope.
---

## Closure syntax

A closure is a function without a name: `{ (parameters) -> result in body }`. Types are usually inferred, so the short forms are common.

```vertex
let numbers = [5, 2, 8, 1]

let full = numbers.sorted(by: { (a: int, b: int) -> bool in
    return a < b
})
let inferred = numbers.sorted(by: { a, b in a < b })
let shorthand = numbers.sorted(by: { $0 < $1 })
let operatorOnly = numbers.sorted(by: <)
print(full, inferred, shorthand, operatorOnly)
```

## Trailing closures

When the last argument is a closure, write it after the parentheses. If it is the only argument the parentheses can go away.

```vertex
let words = ["kiwi", "fig", "banana"]
let lengths = words.map { $0.count }
let sorted = words.sorted { $0.count < $1.count }
print(lengths, sorted)

func repeatAction(_ times: int, _ body: () -> void) {
    for _ in 0..<times { body() }
}
repeatAction(3) { print("hi") }
```

## Capturing values

A closure keeps the variables it uses alive and shares them with the surrounding scope, so changes made inside are seen outside, and the other way around.

```vertex
var total = 0
let add = { (n: int) in total += n }
add(10)
add(5)
print(total)

func makeAccumulator(start: int) -> (int) -> int {
    var sum = start
    return { n in
        sum += n
        return sum
    }
}
let acc = makeAccumulator(start: 100)
print(acc(1), acc(10), acc(100))
```

## Escaping closures

A closure parameter is *non-escaping* by default: it cannot outlive the call. Mark it `@escaping` to store it or return it, and use a capture list to avoid retaining an object longer than necessary (see [ARC & references](/docs/arc)).

```vertex
var handlers: [() -> void] = []

func onEvent(_ handler: @escaping () -> void) {
    handlers.append(handler)
}

onEvent { print("first") }
onEvent { print("second") }
for handler in handlers { handler() }
```

`@autoclosure` delays an expression until it is needed, which is how `&&` and `??` can skip their right side.

```vertex
func orElse(_ value: int?, _ fallback: @autoclosure () -> int) -> int {
    if let value { return value }
    return fallback()
}
print(orElse(3, { print("never"); return 0 }()))
print(orElse(nil, 42))
```

## Higher-order functions

```vertex
let prices = [4.5, 12.0, 7.25, 30.0]
let discounted = prices.filter { $0 > 5 }.map { $0 * 0.9 }
let total = discounted.reduce(0, +)
print(discounted, total)
print(prices.contains { $0 > 25 }, prices.first { $0 > 10 } as Any)
```
