---
slug: classes
title: Classes
description: Reference types with identity, inheritance, and deinitializers, managed by automatic reference counting.
---

## Reference semantics

A `class` is a reference type: assigning or passing one shares the same instance. Use a class when identity matters, when state must be shared, or when you need inheritance.

```vertex
class Counter {
    var value = 0
    func increment() { value += 1 }
}

let a = Counter()
let b = a
b.increment()
b.increment()
print(a.value, a === b)
```

Because the reference is constant, `let a` still allows `a.value` to change. Compare this with a [struct](/docs/structs), where `let` freezes everything.

## Initializers and deinitializers

Classes have no memberwise initializer. Write `init` yourself. `deinit` runs when the last reference goes away, which is deterministic and happens at a known point.

```vertex
class Connection {
    let host: string
    init(host: string) {
        self.host = host
        print("open \(host)")
    }
    deinit {
        print("close \(host)")
    }
}

func use() {
    let c = Connection(host: "db.local")
    print("using \(c.host)")
}
use()
print("after use")
```

## Inheritance

A class can inherit from one superclass. Mark an override with `override`, call the parent with `super`, and forbid further overriding with `final`.

```vertex
class Vehicle {
    var speed = 0.0
    func describe() -> string { "traveling at \(speed) km/h" }
    func honk() { print("beep") }
}

class Bicycle: Vehicle {
    var hasBasket = false
    override func describe() -> string {
        super.describe() + (hasBasket ? " with a basket" : "")
    }
    override func honk() {
        super.honk()
        print("ring ring")
    }
}

let bike = Bicycle()
bike.speed = 18
bike.hasBasket = true
print(bike.describe())
bike.honk()
```

Initializers in a subclass initialize their own properties first, then call `super.init`.

```vertex
class Shape {
    let name: string
    init(name: string) { self.name = name }
}
class Square: Shape {
    let side: double
    init(side: double) {
        self.side = side
        super.init(name: "square")
    }
    func area() -> double { side * side }
}
let s = Square(side: 3)
print(s.name, s.area())
```

## Casting

Use `is` to test a dynamic type and `as?` to downcast.

```vertex
class Animal {}
class Dog: Animal { func bark() { print("woof") } }
class Cat: Animal {}

let pets: [Animal] = [Dog(), Cat(), Dog()]
for pet in pets {
    if let dog = pet as? Dog {
        dog.bark()
    } else if pet is Cat {
        print("a cat")
    }
}
```

## Struct or class?

| Prefer a struct when... | Prefer a class when... |
| --- | --- |
| the data is a simple value that can be copied | identity matters, and two names must mean the same object |
| you want the compiler to prevent shared mutation | several parts of a program must observe one piece of state |
| you do not need inheritance | you need subclassing or a deinitializer |

Reference counting and the cycles it can create are covered in [ARC & references](/docs/arc).
