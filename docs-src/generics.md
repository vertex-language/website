---
slug: generics
title: Generics
description: Write one function or type that works for many types, with constraints, associated types, and compile-time specialization.
---

## Generic functions

A type parameter in angle brackets stands for any type chosen by the caller. The compiler generates specialized code for each type actually used, so there is no run-time cost for the abstraction.

```vertex
func swapItems<T>(_ a: inout T, _ b: inout T) {
    let t = a
    a = b
    b = t
}

var x = 1, y = 2
swapItems(&x, &y)
print(x, y)

var s = "left", t = "right"
swapItems(&s, &t)
print(s, t)
```

## Constraints

A constraint says what the type must be able to do, as a protocol after a colon or in a `where` clause.

```vertex
func largest<T: Comparable>(_ items: [T]) -> T? {
    var best: T? = nil
    for item in items {
        if best == nil || item > best! { best = item }
    }
    return best
}
print(largest([3, 9, 4]) as Any, largest(["pear", "apple"]) as Any, largest([int]()) as Any)

func allEqual<T: Equatable>(_ items: [T]) -> bool {
    guard let head = items.first else { return true }
    return items.allSatisfy { $0 == head }
}
print(allEqual([2, 2, 2]), allEqual(["a", "b"]))
```

## Generic types

Structs, classes, and enums can all take type parameters.

```vertex
struct Stack<Element> {
    private var items: [Element] = []

    var isEmpty: bool { items.isEmpty }
    var top: Element? { items.last }

    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.popLast() }
}

var numbers = Stack<int>()
numbers.push(1)
numbers.push(2)
print(numbers.top as Any, numbers.pop() as Any, numbers.pop() as Any, numbers.isEmpty)

var names = Stack<string>()
names.push("ada")
print(names.top as Any)
```

## Associated types in constraints

Use a protocol's associated types to relate two generic parameters.

```vertex
protocol Container {
    associatedtype Item
    var items: [Item] { get }
}
struct Box<T>: Container { var items: [T] }

func sameItems<A: Container, B: Container>(_ a: A, _ b: B) -> bool
    where A.Item == B.Item, A.Item: Equatable {
    a.items == b.items
}
print(sameItems(Box(items: [1, 2]), Box(items: [1, 2])))
print(sameItems(Box(items: ["a"]), Box(items: ["b"])))
```

## Opaque and existential types

`some P` means "one particular type that conforms to P", chosen by the function and hidden from the caller, with no boxing. `any P` is a runtime box that can hold different types at different times.

```vertex
protocol Animal { func speak() -> string }
struct Dog: Animal { func speak() -> string { "woof" } }
struct Cat: Animal { func speak() -> string { "meow" } }

func makeDog() -> some Animal { Dog() }
func chorus(_ animals: [any Animal]) -> string {
    animals.map { $0.speak() }.joined(separator: " ")
}
print(makeDog().speak())
print(chorus([Dog(), Cat(), Dog()]))
```

> tip: Start with a concrete function, notice the duplicate, then generalize. A constraint that you cannot name is usually a sign the abstraction is too wide.
