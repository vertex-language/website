---
slug: switch
title: Switch & Patterns
description: Exhaustive pattern matching over values, ranges, tuples, enums, and optionals, with bindings and where clauses.
---

## Matching values

A `switch` compares a value against patterns in order and runs the first case that matches. It must be **exhaustive**: add a `default` unless the cases already cover every possibility. There is no implicit fall-through, so a case does not need a `break`.

```vertex
let letter = "e"
switch letter {
case "a", "e", "i", "o", "u":
    print("vowel")
case "y":
    print("sometimes")
default:
    print("consonant")
}
```

## Ranges, tuples, and where

Cases can match intervals, tuples, and bind values with `let`. A `where` clause adds a condition.

```vertex
func classify(_ n: int) -> string {
    switch n {
    case ..<0: return "negative"
    case 0: return "zero"
    case 1...9: return "digit"
    case 10..<100: return "two digits"
    default: return "large"
    }
}
print(classify(-5), classify(0), classify(7), classify(42), classify(1000))

let point = (2, -2)
switch point {
case (0, 0):
    print("origin")
case (let x, 0):
    print("on the x axis at \(x)")
case (let x, let y) where x == -y:
    print("on the line y = -x at \(x)")
default:
    print("somewhere else")
}
```

## Enums

Switching over an enum is where exhaustiveness pays off: add a case later and the compiler points at every `switch` that now needs updating. Payloads are bound in the pattern.

```vertex
enum Shape {
    case circle(radius: double)
    case rectangle(width: double, height: double)
    case point
}

func area(of shape: Shape) -> double {
    switch shape {
    case .circle(let r): return 3.14159 * r * r
    case .rectangle(let w, let h): return w * h
    case .point: return 0
    }
}
print(area(of: .circle(radius: 2)), area(of: .rectangle(width: 3, height: 4)), area(of: .point))
```

```vertex error
enum Light { case red, yellow, green }

func action(_ light: Light) -> string {
    switch light {
    case .red: return "stop"
    case .green: return "go"
    }
}
```

## Optionals and fall-through

An optional can be matched with `.some` or with the `?` shorthand.

```vertex
let reading: int? = 7
switch reading {
case let value? where value > 5:
    print("high \(value)")
case let value?:
    print("low \(value)")
case nil:
    print("no reading")
}
```

Use `fallthrough` when you deliberately want to continue into the next case's body.

```vertex
switch 3 {
case 3:
    print("three")
    fallthrough
case 4:
    print("and four's body")
default:
    print("not reached")
}
```

## Strings and types

`switch` also works on strings and on the dynamic type of a value with `is` and `as`.

```vertex
let command = "stop"
switch command {
case "go": print("moving")
case "stop", "halt": print("stopping")
default: print("unknown")
}

let items: [Any] = [1, "two", 3.0, true]
for item in items {
    switch item {
    case let n as int: print("int", n)
    case let s as string: print("string", s)
    case is double: print("a double")
    default: print("something else")
    }
}
```
