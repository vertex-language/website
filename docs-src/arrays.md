---
slug: arrays
title: Arrays
description: Ordered, value-semantic collections with checked indexing, copy-on-write storage, and a full set of transforming methods.
---

## Creating arrays

An array of `T` is written `[T]`. Literals infer the element type, and every element must share it.

```vertex
var numbers = [10, 20, 30]
let empty: [string] = []
let zeros = [int](repeating: 0, count: 4)
print(numbers, empty, zeros)
print(numbers.count, numbers.isEmpty, empty.isEmpty)
```

## Reading and changing

Indices start at 0 and are bounds-checked: an out-of-range index traps rather than reading arbitrary memory.

```vertex
var fruits = ["apple", "banana", "cherry"]
print(fruits[0], fruits.first!, fruits.last!)

fruits.append("date")
fruits += ["elderberry"]
fruits.insert("apricot", at: 1)
print(fruits)

fruits[0] = "avocado"
let removed = fruits.remove(at: 2)
let popped = fruits.removeLast()
print(removed, popped, fruits)
```

Slices and ranges select several elements at once.

```vertex
var values = [1, 2, 3, 4, 5, 6]
print(values[1...3])
values.replaceSubrange(0..<2, with: [100])
print(values)
```

## Value semantics

Arrays are values. Assigning one to another produces an independent copy, so a change never reaches through a second name. The copy is lazy (copy-on-write), so it costs nothing until one side mutates.

```vertex
var original = [1, 2, 3]
var copy = original
copy.append(4)
original[0] = 99
print(original)
print(copy)
```

## Iterating

```vertex
let colors = ["red", "green", "blue"]
for color in colors {
    print(color)
}
for (index, color) in colors.enumerated() {
    print(index, color)
}
for index in colors.indices.reversed() {
    print(colors[index], terminator: " ")
}
print("")
```

## Transforming

`map`, `filter`, and `reduce` take closures (see [Closures](/docs/closures)) and return new values without touching the original.

```vertex
let scores = [88, 92, 79, 65, 95]
print(scores.map { $0 * 2 })
print(scores.filter { $0 >= 80 })
print(scores.reduce(0, +))
print(scores.compactMap { $0 > 90 ? "A" : nil })
print(scores.sorted(), scores.sorted(by: >))
print(scores.min()!, scores.max()!)
print(scores.contains(79), scores.firstIndex(of: 92) as Any)
let names = ["ada", "bob", "cy"]
print(zip(names, scores).map { "\($0)=\($1)" })
```

`sort` reorders in place, while `sorted` and `reversed` return new sequences.

```vertex
var words = ["pear", "fig", "banana", "kiwi"]
words.sort { $0.count < $1.count }
print(words)
words = Array(words.reversed())
print(words)
print(words.allSatisfy { $0.count > 2 })
print(words.joined(separator: ", "))
```

## Nested and fixed-shape data

Arrays nest, which makes simple matrices easy.

```vertex
var grid = Array(repeating: Array(repeating: 0, count: 3), count: 3)
for i in 0..<3 {
    grid[i][i] = 1
}
for row in grid {
    print(row)
}
```

> info: For raw, unmanaged memory and numeric buffers see the `gpu` and `tensor` packages in the [standard library](/docs/stdlib); arrays are the right default for everything else.
