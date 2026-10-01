---
slug: async-await
title: async & await
description: Write non-blocking code that reads top to bottom, on a cooperative executor that never blocks a worker thread on I/O.
---

## Asynchronous functions

Mark a function `async` when it may suspend, and call it with `await`. While a call is suspended, the executor runs other work on the same thread, so waiting never blocks a thread. Every Vertex program links this executor, and sockets, file descriptors, and timers yield to it automatically when they would block.

```vertex
func fetchScore(player: int) async -> int {
    return player * 42
}

func main() async -> int32 {
    let score = await fetchScore(player: 2)
    print("score is \(score)")
    return 0
}
```

An async entry point is just `func main() async`. Add `throws` when the body uses `try`.

```vertex
enum LookupError: Error { case missing(int) }

func lookup(_ id: int) async throws -> string {
    guard id < 3 else { throw LookupError.missing(id) }
    return "user-\(id)"
}

func main() async throws -> int32 {
    print(try await lookup(1))
    do {
        print(try await lookup(9))
    } catch {
        print("failed:", error)
    }
    return 0
}
```

## Sequential and concurrent

Consecutive `await`s run one after another. To run calls concurrently, start them with `async let` and await the results together.

```vertex
func load(_ name: string, ticks: int) async -> string {
    try? await Task.sleep(nanoseconds: UInt64(ticks) * 1_000_000)
    print("loaded \(name)")
    return name
}

func main() async -> int32 {
    async let a = load("avatar", ticks: 30)
    async let b = load("banner", ticks: 10)
    let both = await [a, b]
    print(both)
    return 0
}
```

`banner` finishes first because it waits less, even though it was started second. The two waits overlapped instead of adding up.

## Where async code runs

`async` is not a thread. It describes a function that can be suspended, and the executor decides where to continue it. Code between two suspension points runs to completion without interruption, so a value you read before an `await` may have changed by the time it returns when other tasks share it. Protect shared mutable state with an [actor](/docs/actors).

> tip: Make a function `async` only when it awaits something. A synchronous function is cheaper to call and easier to reason about.
