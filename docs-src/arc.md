---
slug: arc
title: ARC & References
description: How automatic reference counting frees class instances deterministically, and how weak and unowned references break cycles.
---

## Counting references

Instances of a class are kept alive by **strong references**. Each assignment, argument, or capture that holds an instance adds one, and each one that goes out of scope removes one. When the count reaches zero the instance's `deinit` runs and its memory is freed, immediately and on the same thread. There is no collector, no pause, and no unpredictable timing.

```vertex
class Resource {
    let name: string
    init(_ name: string) {
        self.name = name
        print("acquire \(name)")
    }
    deinit { print("release \(name)") }
}

func work() {
    let a = Resource("a")
    do {
        let b = Resource("b")
        print("inner scope with \(b.name)")
    }
    print("back in outer scope with \(a.name)")
}
work()
print("done")
```

A second reference keeps the instance alive for as long as it exists.

```vertex
//~ class Resource {
//~     let name: string
//~     init(_ name: string) { self.name = name }
//~     deinit { print("release \(name)") }
//~ }
func share() {
    var first: Resource? = Resource("shared")
    let second = first
    first = nil
    print("first dropped, second still holds \(second!.name)")
}
share()
```

## Reference cycles

Two instances that strongly reference each other can never reach zero, so neither is freed. This is a leak, and ARC cannot detect it for you.

```vertex
class Node {
    let name: string
    var next: Node?
    init(_ name: string) { self.name = name }
    deinit { print("free \(name)") }
}

func leak() {
    let a = Node("a")
    let b = Node("b")
    a.next = b
    b.next = a
}
leak()
print("leaked: neither node was freed")
```

## weak and unowned

Break a cycle by making one side a **weak** reference. A weak reference does not keep the target alive and becomes `nil` when it is freed, so it is always optional and always a `var`.

```vertex
class Owner {
    let name: string
    var pet: Pet?
    init(_ name: string) { self.name = name }
    deinit { print("free owner \(name)") }
}
class Pet {
    let name: string
    weak var owner: Owner?
    init(_ name: string) { self.name = name }
    deinit { print("free pet \(name)") }
}

func adopt() {
    let owner = Owner("Ada")
    let pet = Pet("Rex")
    owner.pet = pet
    pet.owner = owner
    print(pet.owner!.name, owner.pet!.name)
}
adopt()
```

An **unowned** reference also does not keep its target alive, but it is non-optional and assumes the target outlives it. Use it only when that is guaranteed by the program's structure; touching one after the target is gone is a bug.

```vertex
class Customer {
    let name: string
    var card: Card?
    init(_ name: string) { self.name = name }
    deinit { print("free customer \(name)") }
}
class Card {
    let number: int
    unowned let customer: Customer
    init(number: int, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("free card \(number)") }
}

func issue() {
    let customer = Customer("Lin")
    customer.card = Card(number: 1234, customer: customer)
    print(customer.card!.customer.name)
}
issue()
```

## Closures and cycles

A closure that is stored on an object and uses `self` creates a cycle. A **capture list** `[weak self]` or `[unowned self]` breaks it.

```vertex
class Timer {
    var id = 7
    var onTick: (() -> void)?

    func start() {
        onTick = { [weak self] in
            print("tick", self?.id as Any)
        }
    }
    deinit { print("free timer") }
}

func run() {
    let timer = Timer()
    timer.start()
    timer.onTick!()
}
run()
```

> info: Structs, enums, and arrays hold their data by value, so they never form reference cycles on their own. Cycles need two or more *class* instances.
