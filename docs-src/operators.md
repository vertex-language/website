---
slug: operators
title: Operators
description: Arithmetic, comparison, logical, bitwise, range, and nil-coalescing operators, and how Vertex treats overflow.
---

## Arithmetic and assignment

The usual operators work on every numeric type, and operands must have the same type. Integer division truncates toward zero, and `%` is the remainder.

```vertex
print(7 + 3, 7 - 3, 7 * 3)
print(7 / 2, -7 / 2, 7 % 3, -7 % 3)
print(7.0 / 2.0)

var total = 10
total += 5
total *= 2
total -= 1
total /= 3
print(total)
```

`+` also concatenates strings and arrays. The unary minus negates a value.

```vertex
print("Ver" + "tex")
print([1, 2] + [3])
let n = 4
print(-n)
```

Floating-point math follows IEEE 754, including its special values.

```vertex
let x = 1.0
let zero = 0.0
print(x / zero, -x / zero)
print((zero / zero).isNaN)
print(2.0.squareRoot(), (2.0).rounded(.up))
```

## Overflow

An integer operation that overflows traps instead of wrapping. The wrapping operators `&+`, `&-`, and `&*` opt in to modular arithmetic, and the `...ReportingOverflow` methods tell you whether it happened.

```vertex
let a: int8 = 120
print(a &+ 10)
print(a &- (-10))
print(a &* 2)

let r = a.multipliedReportingOverflow(by: 2)
print(r.partialValue, r.overflow)
```

## Comparison and logic

Comparison operators produce a `bool`. The logical operators `&&` and `||` short-circuit, so the right side only runs when it has to.

```vertex
let age = 30
print(age == 30, age != 30, age > 18, age <= 18)
print(age > 18 && age < 65)
print(!(age > 18) || age == 30)

func expensive() -> bool {
    print("evaluated")
    return true
}
print(false && expensive())
print(true || expensive())
```

The ternary operator picks between two values.

```vertex
let score = 72
let grade = score >= 90 ? "A" : score >= 70 ? "C" : "F"
print(grade)
```

Tuples compare element by element, up to six elements, as long as every element is comparable.

```vertex
print((1, "zebra") < (2, "apple"))
print((3, "a") == (3, "a"))
```

## Bitwise operators

`&`, `|`, `^`, and `~` work on the bits of an integer. The shifts `<<` and `>>` are *smart*: a shift past the width gives 0, and a negative shift amount shifts the other way. Right shifts on signed integers preserve the sign.

```vertex
let flags: uint8 = 0b1010_0101
print(flags & 0x0F, flags | 0x0F, flags ^ 0xFF, ~flags)
print(flags << 1, flags >> 4, flags << 8)

let negative: int8 = -16
print(negative >> 2)
```

```vertex
let value: uint32 = 0xDEAD_BEEF
print(value.nonzeroBitCount, value.leadingZeroBitCount, value.trailingZeroBitCount)
print(value.byteSwapped == 0xEFBE_ADDE)
print(String(value, radix: 2).count)
```

## Range operators

`a...b` is a closed range including both ends, and `a..<b` is half-open, excluding `b`. A range is a value you can loop over, test membership in, and use to slice.

```vertex
let closed = 1...5
let halfOpen = 0..<5
print(closed.count, halfOpen.count)
print(closed.contains(5), halfOpen.contains(5))
print(Array(closed))

let letters = ["a", "b", "c", "d", "e"]
print(letters[1...3], letters[..<2], letters[3...])
```

Ranges also work as patterns in `switch` (see [Switch & patterns](/docs/switch)).

## Nil-coalescing

`a ?? b` unwraps an optional, falling back to `b` when it is `nil`. The right side is only evaluated when needed.

```vertex
let configured: int? = nil
let port = configured ?? 8080
print(port)
```
