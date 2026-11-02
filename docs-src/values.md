---
slug: values
title: Values & Types
description: Declare constants and variables, and meet Vertex's lowercase primitive types, literals, inference, and explicit conversions.
---

## Constants and variables

Declare a constant with `let` and a variable with `var`. A constant cannot be reassigned after it is initialized; the compiler rejects the attempt. Prefer `let` unless the value really has to change.

```vertex
let maximumAttempts = 10
var attempt = 0
attempt += 1
print("attempt \(attempt) of \(maximumAttempts)")

var x = 0.0, y = 0.0
x += 1.5
y -= 2.5
print(x, y)
```

A top-level file needs no `main`. Statements run in order, as in a script. When you want an explicit entry point, declare `func main()` in package `main` (see [Packages & imports](/docs/packages)).

```vertex error
let limit = 10
limit = 20
```

Constants may be declared first and assigned later, as long as the compiler can prove they are assigned exactly once on every path before they are read.

```vertex
let flag = CommandLine.arguments.count > 5
let label: string
if flag {
    label = "many arguments"
} else {
    label = "few arguments"
}
print(label)
```

## Primitive types

Vertex spells its primitive types in lowercase. They are aliases for the core types of the shared dialect, so a `uint8` is exactly an unsigned byte and an `int` is exactly as wide as a pointer.

| Type | Meaning |
| --- | --- |
| `bool` | `true` or `false` |
| `int`, `int8`, `int16`, `int32`, `int64` | Signed integers. `int` is pointer-width (64 bits on every supported target). |
| `uint`, `uint8`, `uint16`, `uint32`, `uint64` | Unsigned integers. |
| `float`, `float32` | 32-bit IEEE 754 floating point. |
| `double`, `float64` | 64-bit IEEE 754 floating point. |
| `string` | UTF-8 text. |
| `char` | One extended grapheme cluster. |
| `void`, `never` | The empty result, and the result of a function that never returns. |

```vertex
print(int.max, int8.min, uint8.max)
print(float32.pi, float64.pi)
print(MemoryLayout<int>.size, MemoryLayout<int16>.size, MemoryLayout<float>.size)
```

> info: The capitalized names (`Int`, `UInt8`, `Double`, `String`, ...) still work and denote the same types, and the type-erased value is spelled `Any`. The docs use the lowercase spellings wherever they exist.

## Inference and annotations

The compiler infers a type from the initial value. Integer literals become `int`, floating-point literals become `double`, and so on. Add an annotation, a colon and a type, when you want something else or when there is no initial value.

```vertex
let meaning = 42            // int
let ratio = 0.75            // double
let name = "Vertex"         // string
let small: int8 = 100
let precise: float32 = 0.1
let unset: string

print(type(of: meaning), type(of: ratio), type(of: name))
print(type(of: small), type(of: precise))
```

`type(of:)` reports the underlying core names, which is why the lowercase aliases print capitalized.

The same literal can take different types depending on context:

```vertex
let a: uint8 = 255
let b: float = 3
let c: double = 3
print(a, b, c)
```

## Numeric literals

Integer literals can be decimal, binary (`0b`), octal (`0o`), or hexadecimal (`0x`). Underscores are ignored and help readability. Floating-point literals support exponents, and hexadecimal floats exist too.

```vertex
let decimal = 17
let binary = 0b10001
let octal = 0o21
let hex = 0x11
let million = 1_000_000
let exponent = 1.25e2
let hexFloat = 0xC.3p0
print(decimal, binary, octal, hex, million)
print(exponent, hexFloat)
```

## Type aliases

`typealias` gives an existing type a new name, which is useful for documenting intent.

```vertex
typealias Sample = int16
typealias Byte = uint8

let s: Sample = -300
let b: Byte = 0xFF
print(s, b)
```

## Conversions are explicit

Vertex never converts between numeric types implicitly. Spell the conversion with the target type's initializer.

```vertex error
let count: int32 = 5
let total: int = count
```

```vertex
let count: int32 = 5
let total: int = int(count)
let ratio = double(total) / 2
print(total, ratio)
```

A conversion that does not fit **traps** at run time instead of silently truncating. Use the `exactly:` form to get an optional back, or `truncatingIfNeeded:` when you really do want the low bits.

```vertex
let big = 300
print(uint8(exactly: big) as Any)
print(uint8(truncatingIfNeeded: big))
print(uint8(exactly: 200) as Any)
```

## Integer overflow

Arithmetic on integers traps on overflow. That is a defined, deterministic stop, never undefined behavior. When wrapping is what you want, use the `&+`, `&-`, and `&*` operators, or ask for the overflow flag.

```vertex
let top: uint8 = 255
print(top &+ 1)

let (value, overflowed) = top.addingReportingOverflow(1)
print(value, overflowed)
```
