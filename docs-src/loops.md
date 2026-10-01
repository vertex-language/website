---
slug: loops
title: Loops
description: Repeat work with for-in over ranges and collections, and with while and repeat-while, plus labels for nested loops.
---

## for-in

`for-in` walks any sequence: a range, an array, a dictionary, a string.

```vertex
for i in 1...3 {
    print("closed", i)
}
for i in 0..<3 {
    print("half-open", i)
}
for letter in "abc" {
    print(letter)
}
```

Use `_` when you do not need the value, `stride` to step by something other than 1, and `reversed()` to count down.

```vertex
var product = 1
for _ in 1...5 {
    product *= 2
}
print(product)

for n in stride(from: 0, to: 20, by: 5) {
    print(n, terminator: " ")
}
print("")
for n in stride(from: 10, through: 0, by: -5) {
    print(n, terminator: " ")
}
print("")
for n in (1...4).reversed() {
    print(n, terminator: " ")
}
print("")
```

Add a `where` clause to filter, or pattern-match with `case`.

```vertex
for n in 1...10 where n % 3 == 0 {
    print(n)
}

let maybe: [int?] = [1, nil, 3, nil]
for case let value? in maybe {
    print("got", value)
}
```

Dictionaries yield `(key, value)` pairs, and `enumerated()` yields indices.

```vertex
let legs = ["ant": 6, "dog": 4]
for (name, count) in legs.sorted(by: { $0.key < $1.key }) {
    print(name, count)
}
for (i, name) in ["x", "y"].enumerated() {
    print(i, name)
}
```

## while and repeat-while

`while` tests before each pass. `repeat-while` runs the body once first and tests afterwards.

```vertex
var n = 27
var steps = 0
while n != 1 {
    n = n % 2 == 0 ? n / 2 : 3 * n + 1
    steps += 1
}
print("collatz(27) takes \(steps) steps")

var rolls = 0
repeat {
    rolls += 1
} while rolls < 3
print(rolls)
```

`while let` loops until an optional comes back `nil`.

```vertex
var stack = [1, 2, 3]
while let top = stack.popLast() {
    print("pop", top)
}
```

## break, continue, and labels

`continue` skips to the next pass and `break` leaves the loop. Label a loop to target an outer one.

```vertex
for i in 1...10 {
    if i % 2 == 0 { continue }
    if i > 7 { break }
    print(i, terminator: " ")
}
print("")

search: for row in 0..<4 {
    for column in 0..<4 {
        if row * column == 6 {
            print("found at \(row),\(column)")
            break search
        }
    }
}
```
