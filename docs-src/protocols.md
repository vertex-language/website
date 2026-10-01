---
slug: protocols
title: Protocols
description: Describe behavior that types can adopt, with requirements, default implementations, composition, and associated types.
---

## Requirements

A `protocol` lists properties and methods that a conforming type must provide. Any struct, class, or enum can adopt it.

```vertex
protocol Shape {
    var name: string { get }
    func area() -> double
}

struct Circle: Shape {
    var radius: double
    var name: string { "circle" }
    func area() -> double { 3.14159 * radius * radius }
}
struct Square: Shape {
    var side: double
    var name: string { "square" }
    func area() -> double { side * side }
}

let shapes: [any Shape] = [Circle(radius: 1), Square(side: 2)]
for shape in shapes {
    print(shape.name, shape.area())
}
```

`any Shape` is an *existential*: a box that can hold any conforming type, with the call resolved at run time.

## Default implementations

Extend a protocol to give requirements a default. Conforming types get it for free and can still override it.

```vertex
protocol Greeter {
    var name: string { get }
    func greet() -> string
}
extension Greeter {
    func greet() -> string { "Hello, \(name)" }
}

struct Guest: Greeter { var name: string }
struct Host: Greeter {
    var name: string
    func greet() -> string { "Welcome, \(name)" }
}
print(Guest(name: "Ada").greet())
print(Host(name: "Grace").greet())
```

## Mutating requirements

A requirement that changes a value type is marked `mutating`. Classes satisfy it without the keyword.

```vertex
protocol Resettable {
    mutating func reset()
}
struct Score: Resettable {
    var points = 12
    mutating func reset() { points = 0 }
}
var score = Score()
score.reset()
print(score.points)
```

## Composition and inheritance

Combine requirements with `&`, or build one protocol from another.

```vertex
protocol Named { var name: string { get } }
protocol Aged { var age: int { get } }
protocol Person: Named, Aged {}

struct Employee: Person {
    var name: string
    var age: int
}

func introduce(_ x: Named & Aged) -> string {
    "\(x.name), \(x.age)"
}
print(introduce(Employee(name: "Lin", age: 41)))
```

## Standard protocols

Conforming to the standard protocols plugs your type into the rest of the language. `Equatable` and `Hashable` are usually synthesized when every stored property already conforms.

```vertex
struct Version: Equatable, Hashable, Comparable, CustomStringConvertible {
    var major: int
    var minor: int

    static func < (a: Version, b: Version) -> bool {
        (a.major, a.minor) < (b.major, b.minor)
    }
    var description: string { "v\(major).\(minor)" }
}

let versions = [Version(major: 1, minor: 4), Version(major: 0, minor: 9), Version(major: 1, minor: 0)]
print(versions.sorted())
print(Version(major: 1, minor: 0) == Version(major: 1, minor: 0))
print(Set(versions).count)
print(versions.max()!)
```

## Associated types

A protocol can declare a placeholder type that each conformer fills in.

```vertex
protocol Container {
    associatedtype Item
    var count: int { get }
    mutating func add(_ item: Item)
}

struct Bag: Container {
    var items: [string] = []
    var count: int { items.count }
    mutating func add(_ item: string) { items.append(item) }
}

var bag = Bag()
bag.add("a")
bag.add("b")
print(bag.count)
```

Constrain generic code with these requirements in [Generics](/docs/generics).
