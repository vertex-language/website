---
slug: properties
title: Properties
description: Stored, computed, lazy, and static properties, with observers, wrappers, and access control.
---

## Stored properties

A stored property is a constant (`let`) or variable (`var`) that is part of a type's instance. Provide a default, or set it in `init`.

```vertex
struct Rectangle {
    var width: double
    var height: double
    let sides = 4
}
var r = Rectangle(width: 3, height: 4)
r.width = 10
print(r.width, r.sides)
```

## Computed properties

A computed property stores nothing. It runs code to get, and optionally to set, a value derived from other state.

```vertex
struct Circle {
    var radius: double

    var diameter: double {
        get { radius * 2 }
        set { radius = newValue / 2 }
    }
    var area: double { 3.14159 * radius * radius }
}

var c = Circle(radius: 5)
print(c.diameter, c.area)
c.diameter = 20
print(c.radius)
```

## Property observers

`willSet` and `didSet` run around every assignment, which is handy for validation or keeping state in sync. Inside them `newValue` and `oldValue` are available. Give an observed property an explicit type, as below.

```vertex
class Download {
    var progress: int = 0 {
        willSet { print("progress changing to \(newValue)") }
        didSet {
            if progress > 100 { progress = 100 }
            print("progress was \(oldValue), now \(progress)")
        }
    }
}
let d = Download()
d.progress = 40
d.progress = 250
```

## Lazy properties

A `lazy` property is computed the first time it is read, which suits values that are expensive or depend on other state.

```vertex
class Report {
    lazy var summary: string = {
        print("building summary")
        return "42 rows"
    }()
}
let report = Report()
print("created")
print(report.summary)
print(report.summary)
```

## Static properties

`static` properties belong to the type, and are initialized once, lazily.

```vertex
struct Config {
    static let defaultPort = 8080
    static var requestCount = 0
}
Config.requestCount += 1
Config.requestCount += 1
print(Config.defaultPort, Config.requestCount)
```

## Property wrappers

A `@propertyWrapper` type packages the get and set logic once, and `@Name` applies it to any property.

```vertex
@propertyWrapper
struct Clamped {
    private var value: int
    let range: ClosedRange<int>

    init(wrappedValue: int, _ range: ClosedRange<int>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
    var wrappedValue: int {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
}

struct Volume {
    @Clamped(0...11) var level = 5
}
var v = Volume()
v.level = 99
print(v.level)
v.level = -3
print(v.level)
```

## Access control

Restrict visibility with `private`, `fileprivate`, `internal` (the default), and `public`. `private(set)` makes a property readable everywhere but writable only inside its type.

```vertex
struct Account {
    private(set) var balance = 0
    mutating func deposit(_ amount: int) { balance += amount }
}
var account = Account()
account.deposit(50)
print(account.balance)
```
