---
slug: actors
title: Actors
description: Protect shared mutable state with actors, which process one message at a time so data races cannot occur.
---

## Isolated state

An `actor` is a reference type whose mutable state is *isolated*: only one task runs inside it at a time. Callers from outside reach it with `await`, and the compiler rejects direct access to its stored properties.

```vertex
actor Counter {
    private var value = 0

    func increment() -> int {
        value += 1
        return value
    }
    func current() -> int { value }
}

func main() async -> int32 {
    let counter = Counter()
    _ = await counter.increment()
    _ = await counter.increment()
    print(await counter.current())
    return 0
}
```

## No data races

Because each call into the actor runs to completion before the next begins, many tasks can hammer on it at once and no update is lost.

```vertex
actor Tally {
    private var counts: [string: int] = [:]

    func record(_ key: string) { counts[key, default: 0] += 1 }
    func count(for key: string) -> int { counts[key] ?? 0 }
}

func main() async -> int32 {
    let tally = Tally()
    await withTaskGroup(of: void.self) { group in
        for i in 0..<1000 {
            group.addTask { await tally.record(i % 2 == 0 ? "even" : "odd") }
        }
    }
    print(await tally.count(for: "even"), await tally.count(for: "odd"))
    return 0
}
```

## Inside the actor

Code inside an actor reads and writes its own state directly, with no `await`. Methods can call each other synchronously, and nothing else can interleave until an `await` suspends the actor.

```vertex
actor Account {
    private var balance = 0

    func deposit(_ amount: int) { balance += amount }

    func withdraw(_ amount: int) -> bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }

    func transfer(_ amount: int, to other: Account) async -> bool {
        guard withdraw(amount) else { return false }
        await other.deposit(amount)
        return true
    }

    func report() -> int { balance }
}

func main() async -> int32 {
    let a = Account(), b = Account()
    await a.deposit(100)
    print(await a.transfer(70, to: b))
    print(await a.transfer(70, to: b))
    print(await a.report(), await b.report())
    return 0
}
```

> warning: An `await` inside an actor method is a suspension point where other callers may run. Recheck any assumption about the actor's state after one.

## Values that cross isolation

Values sent to or returned from an actor must be safe to share. Value types such as structs, enums, and arrays are copied, and are safe. A class instance shared between tasks needs its own protection, and the cleanest answer is usually to make it an actor.
