---
slug: extensions
title: Extensions
description: Add methods, computed properties, initializers, and protocol conformances to an existing type.
---

## Adding behavior

An `extension` adds members to a type declared elsewhere, including the standard types. It cannot add stored properties.

```vertex
extension int {
    var squared: int { self * self }
    func isMultiple(of n: int) -> bool { self % n == 0 }
}
print(5.squared, 12.isMultiple(of: 4))

extension string {
    var shouted: string { uppercased() + "!" }
}
print("hello".shouted)
```

## Initializers and conformances

Add an initializer without losing the memberwise one by putting it in an extension, and use extensions to organize conformances.

```vertex
struct Size { var width = 0.0, height = 0.0 }

extension Size {
    init(square side: double) { self.init(width: side, height: side) }
}
print(Size(square: 4).height, Size(width: 2, height: 3).width)

struct Money { var cents: int }
extension Money: CustomStringConvertible {
    var description: string { "$\(cents / 100).\(cents % 100 < 10 ? "0" : "")\(cents % 100)" }
}
print(Money(cents: 1205), Money(cents: 300))
```

## Constrained extensions

Limit an extension to the types that can support it with a `where` clause.

```vertex
extension Array where Element == int {
    func total() -> int { reduce(0, +) }
}
print([1, 2, 3, 4].total())

extension Collection where Element: Comparable {
    func isSorted() -> bool {
        var previous: Element? = nil
        for x in self {
            if let p = previous, p > x { return false }
            previous = x
        }
        return true
    }
}
print([1, 2, 3].isSorted(), [3, 1].isSorted(), ["a", "b"].isSorted())
```

## Extensions on protocols

An extension on a protocol adds behavior to every conforming type at once.

```vertex
protocol Describable { var label: string { get } }
extension Describable {
    func banner() -> string { "== \(label) ==" }
}

struct Task: Describable { var label: string }
enum Mode: Describable {
    case fast, slow
    var label: string { self == .fast ? "fast" : "slow" }
}
print(Task(label: "build").banner(), Mode.slow.banner())
```

> info: For a method on a single type you do not want to put in an extension, see [Receiver methods](/docs/receiver-methods).
