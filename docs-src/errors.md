---
slug: errors
title: Throwing & Catching
description: Model failures as values that conform to Error, propagate them with throws and try, and handle them with do-catch.
---

## Defining errors

An error is any type that conforms to `Error`. Enums are a natural fit, with associated values to say what went wrong.

```vertex check
enum VendingError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: int)
    case outOfStock
}
```

## Throwing functions

Mark a function that can fail with `throws`, and use `throw` to fail. The caller has to acknowledge the possibility with `try`, which the compiler checks.

```vertex
enum VendingError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: int)
    case outOfStock
}

var inventory = ["chips": 2, "candy": 0]

func vend(_ item: string, coins: int) throws -> string {
    guard let count = inventory[item] else { throw VendingError.invalidSelection }
    guard count > 0 else { throw VendingError.outOfStock }
    guard coins >= 3 else { throw VendingError.insufficientFunds(coinsNeeded: 3 - coins) }
    inventory[item] = count - 1
    return "here is your \(item)"
}

for (item, coins) in [("chips", 5), ("candy", 5), ("gum", 5), ("chips", 1)] {
    do {
        print(try vend(item, coins: coins))
    } catch VendingError.invalidSelection {
        print("no such item")
    } catch VendingError.outOfStock {
        print("sold out")
    } catch VendingError.insufficientFunds(let needed) {
        print("insert \(needed) more")
    } catch {
        print("unexpected: \(error)")
    }
}
```

## Propagating errors

A function that calls a throwing function with `try` must itself handle the error or be marked `throws`, in which case the error simply continues up.

```vertex
struct ParseError: Error { var line: int }

func parse(_ text: string, line: int) throws -> int {
    guard let n = int(text) else { throw ParseError(line: line) }
    return n
}

func sum(_ lines: [string]) throws -> int {
    var total = 0
    for (i, text) in lines.enumerated() {
        total += try parse(text, line: i + 1)
    }
    return total
}

do {
    print(try sum(["1", "2", "3"]))
    print(try sum(["1", "oops", "3"]))
} catch let e as ParseError {
    print("bad input on line \(e.line)")
}
```

## try? and try!

`try?` turns a failure into `nil`. `try!` asserts it cannot fail and traps if it does.

```vertex
struct Oops: Error {}
func risky(_ ok: bool) throws -> int {
    if !ok { throw Oops() }
    return 7
}
print(try? risky(true) as Any)
print(try? risky(false) as Any)
print(try! risky(true))
```

## Typed throws and Result

A function can declare the exact error type it throws, and `Result` captures a success or failure as a value that can be stored or passed around.

```vertex
enum NetworkError: Error { case timeout, offline }

func fetch(_ ok: bool) throws(NetworkError) -> string {
    if !ok { throw .timeout }
    return "payload"
}

do {
    print(try fetch(true))
    _ = try fetch(false)
} catch {
    print("failed with", error)
}

let results: [Result<int, NetworkError>] = [.success(1), .failure(.offline)]
for r in results {
    switch r {
    case .success(let v): print("ok", v)
    case .failure(let e): print("error", e)
    }
}
```

## Cleanup

Pair throwing code with [`defer`](/docs/defer) to release resources on every path. Failed conversions, out-of-range indices, and arithmetic overflow are not errors you catch: they are programming mistakes, and they stop the program on the spot.
