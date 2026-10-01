---
slug: enums
title: Enums
description: Define a closed set of cases, optionally carrying data, with raw values, methods, and recursive structure.
---

## Cases

An `enum` is a type with a fixed set of alternatives. `CaseIterable` makes `allCases` available.

```vertex
enum Direction: CaseIterable {
    case north, east, south, west
}

var heading = Direction.north
heading = .east
print(heading, Direction.allCases.count)

for d in Direction.allCases {
    print(d, terminator: " ")
}
print("")
```

## Associated values

Each case may carry its own data. Extract it with a `switch` (see [Switch & patterns](/docs/switch)).

```vertex
enum Payment {
    case cash(amount: double)
    case card(number: string, amount: double)
    case voucher(code: string)
}

func describe(_ p: Payment) -> string {
    switch p {
    case .cash(let amount): return "cash \(amount)"
    case .card(let number, let amount): return "card ...\(number.suffix(4)) \(amount)"
    case .voucher(let code): return "voucher \(code)"
    }
}
print(describe(.cash(amount: 12.5)))
print(describe(.card(number: "4111111111111234", amount: 80)))
print(describe(.voucher(code: "SPRING")))
```

## Raw values

Give every case a raw value of one type and you can convert in both directions.

```vertex
enum Status: int {
    case ok = 200
    case notFound = 404
    case serverError = 500
}

print(Status.notFound.rawValue)
print(Status(rawValue: 500) as Any, Status(rawValue: 418) as Any)

enum Planet: string {
    case mercury, venus, earth
}
print(Planet.earth.rawValue)
```

## Methods and computed properties

Enums can hold methods and computed properties, and `mutating` methods may reassign `self`.

```vertex
enum Light {
    case red, yellow, green

    var next: Light {
        switch self {
        case .red: return .green
        case .green: return .yellow
        case .yellow: return .red
        }
    }

    mutating func advance() { self = next }
}

var light = Light.red
light.advance()
light.advance()
print(light)
```

## Recursive enums

Mark a case `indirect` when it contains the enum itself. This is ideal for trees and expression languages.

```vertex
indirect enum Expr {
    case number(int)
    case add(Expr, Expr)
    case multiply(Expr, Expr)
}

func evaluate(_ e: Expr) -> int {
    switch e {
    case .number(let n): return n
    case .add(let l, let r): return evaluate(l) + evaluate(r)
    case .multiply(let l, let r): return evaluate(l) * evaluate(r)
    }
}

let expr = Expr.multiply(.add(.number(2), .number(3)), .number(4))
print(evaluate(expr))
```

## Generic enums

Enums can be generic. The standard library's optional is just an enum with two cases, and you can define your own.

```vertex
enum Outcome<Value, Failure> {
    case success(Value)
    case failure(Failure)
}

func parse(_ text: string) -> Outcome<int, string> {
    if let n = int(text) { return .success(n) }
    return .failure("not a number: \(text)")
}

for input in ["12", "twelve"] {
    switch parse(input) {
    case .success(let n): print("parsed", n)
    case .failure(let why): print(why)
    }
}
```
