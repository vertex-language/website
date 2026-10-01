---
slug: functions
title: Functions & Labels
description: Declare functions with parameters, defaults, variadics, and inout, and call them with relaxed argument labels.
---

## Declaring and calling

A function names its parameters and result type. A single-expression body returns its value implicitly.

```vertex
func greet(person: string) -> string {
    return "Hello, \(person)!"
}
func square(_ x: int) -> int { x * x }

print(greet(person: "Ada"))
print(square(9))
```

Multiple results are returned as a tuple, and a function with no result returns `void`.

```vertex
func divide(_ a: int, by b: int) -> (quotient: int, remainder: int) {
    return (a / b, a % b)
}
let result = divide(17, by: 5)
print(result.quotient, result.remainder)
```

## Argument labels

Each parameter has an external label, used by the caller, and an internal name, used in the body. By default they are the same word. Write two words to split them, or `_` to have no label.

```vertex
func move(from start: int, to end: int, by step: int = 1) -> [int] {
    return Array(stride(from: start, through: end, by: step))
}
print(move(from: 0, to: 6, by: 2))
print(move(from: 1, to: 4))
```

### Relaxed labels at the call site

Vertex lets a caller leave labels out whenever the call is still unambiguous. The compiler first looks for an exact label match and falls back to matching by position. If positional matching would leave more than one candidate, it is an error and you add the labels.

```vertex
func add(a: int32, b: int32) -> int32 { return a + b }

print(add(a: 1, b: 2))
print(add(1, 2))
```

```vertex error
func area(width: int, height: int) -> int { return width * height }
func area(radius: int, scale: int) -> int { return radius * radius * scale }

print(area(3, 4))
```

> info: Labels are always allowed. Keep them where they help a reader, such as `move(from:to:)`, and drop them where they only add noise, such as `add(1, 2)`.

## Default and variadic parameters

```vertex
func connect(host: string, port: int = 443, secure: bool = true) -> string {
    return "\(secure ? "https" : "http")://\(host):\(port)"
}
print(connect(host: "example.com"))
print(connect(host: "localhost", port: 8080, secure: false))

func mean(_ values: double...) -> double {
    var total = 0.0
    for v in values { total += v }
    return total / double(values.count)
}
print(mean(1, 2, 3, 4))
```

## inout

An `inout` parameter is changed in place, and the change is visible to the caller. Pass the argument with `&`. The compiler enforces that nothing else touches the variable for the duration of the call (see [Borrowing & consuming](/docs/ownership)).

```vertex
func swapValues(_ a: inout int, _ b: inout int) {
    let t = a
    a = b
    b = t
}
var left = 1, right = 2
swapValues(&left, &right)
print(left, right)
```

## Functions are values

A function has a type such as `(int, int) -> int`. It can be stored, passed, and returned. Nested functions can capture the variables around them.

```vertex
func compose(_ f: @escaping (int) -> int, _ g: @escaping (int) -> int) -> (int) -> int {
    return { g(f($0)) }
}
func makeCounter() -> () -> int {
    var count = 0
    func next() -> int {
        count += 1
        return count
    }
    return next
}

let addThenDouble = compose({ $0 + 1 }, { $0 * 2 })
print(addThenDouble(5))
let counter = makeCounter()
print(counter(), counter(), counter())
```

## Overloading

Functions may share a name when their parameter or result types differ.

```vertex
func describe(_ value: int) -> string { "int \(value)" }
func describe(_ value: string) -> string { "string \(value)" }
func describe(_ value: [int]) -> string { "array of \(value.count)" }

print(describe(1), describe("a"), describe([1, 2]))
```

## Entry point

A program can be a plain script, or it can define `func main()` in package `main`. The entry point may be `async`, `throws`, and may return an exit code.

```vertex
package main

func main() async throws -> int32 {
    print("started")
    return 0
}
```
