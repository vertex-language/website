---
slug: optionals
title: Optionals
description: Represent absence explicitly with T?, and unwrap it safely with if let, guard let, chaining, and nil-coalescing.
---

## A value or nothing

A type followed by `?` may hold a value or `nil`. There is no null pointer lurking behind an ordinary type: a `string` is always a string, and absence is something you have to handle.

```vertex
var nickname: string? = "Vex"
print(nickname as Any)
nickname = nil
print(nickname == nil)

let parsed = int("123")
let failed = int("abc")
print(parsed as Any, failed as Any)
```

## Unwrapping

`if let` and `guard let` bind the value only when it exists. A bare `if let x` reuses the name.

```vertex
func describe(_ port: int?) {
    if let port {
        print("port \(port)")
    } else {
        print("no port")
    }
}
describe(8080)
describe(nil)

func connect(to host: string?) {
    guard let host else {
        print("no host")
        return
    }
    print("connecting to \(host)")
}
connect(to: "example.com")
connect(to: nil)
```

Several optionals, and boolean conditions, can be checked in a single statement.

```vertex
let user: string? = "ada"
let age: int? = 36
if let user, let age, age > 18 {
    print("\(user) is an adult")
}
```

## Nil-coalescing and chaining

`??` supplies a default. Optional chaining with `?.` stops at the first `nil` and makes the whole expression optional.

```vertex
struct Address { var city: string }
struct Person { var name: string; var address: Address? }

let people = [
    Person(name: "Ada", address: Address(city: "London")),
    Person(name: "Linus", address: nil),
]
for p in people {
    print(p.name, p.address?.city ?? "unknown", p.address?.city.count as Any)
}
```

`map` and `flatMap` transform the value inside, if there is one.

```vertex
let input: string? = "21"
let doubled = input.flatMap { int($0) }.map { $0 * 2 }
print(doubled as Any)
```

## Force unwrapping

`!` asserts a value is present and **traps** when it is not. Reach for it only when `nil` would mean a bug in the program.

```vertex
let known = int("7")!
print(known)
```

> warning: Force-unwrapping `nil` stops the program. Prefer `if let`, `guard let`, or `??` for any value that comes from outside your code.
