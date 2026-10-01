---
slug: tasks
title: Tasks & Groups
description: Run work concurrently with unstructured tasks, structured task groups, and cooperative cancellation.
---

## Tasks

A `Task` starts asynchronous work and gives you a handle to wait for its result. Structured concurrency guarantees a parent never finishes before its children.

```vertex
func square(_ n: int) async -> int { n * n }

func main() async -> int32 {
    let task = Task { await square(12) }
    print(await task.value)
    return 0
}
```

## Task groups

When the number of concurrent jobs is only known at run time, use a task group. Each child is added with `addTask`, and results arrive as they complete.

```vertex
func work(_ id: int) async -> int { id * 10 }

func main() async -> int32 {
    let total = await withTaskGroup(of: int.self) { group in
        for id in 1...8 {
            group.addTask { await work(id) }
        }
        var sum = 0
        for await value in group {
            sum += value
        }
        return sum
    }
    print(total)
    return 0
}
```

Results come back in completion order, not submission order, so collect them into a dictionary keyed by input when order matters.

```vertex
func double(_ n: int) async -> int { n * 2 }

func main() async -> int32 {
    let results = await withTaskGroup(of: (int, int).self) { group in
        for n in 1...4 {
            group.addTask { (n, await double(n)) }
        }
        var byInput: [int: int] = [:]
        for await (input, output) in group {
            byInput[input] = output
        }
        return byInput
    }
    for key in results.keys.sorted() {
        print(key, results[key]!)
    }
    return 0
}
```

## Cancellation

Cancellation is cooperative. Cancelling a task only sets a flag, and the task decides when to look at it, with `Task.isCancelled` or `try Task.checkCancellation()`.

```vertex
func main() async -> int32 {
    let task = Task { () async -> int in
        var steps = 0
        while !Task.isCancelled && steps < 1_000_000 {
            steps += 1
            await Task.yield()
        }
        return steps
    }
    task.cancel()
    let steps = await task.value
    print(steps < 1_000_000 ? "stopped early" : "ran to completion")
    return 0
}
```

Cancelling a task group cancels all of its children.

> info: Prefer task groups and `async let` over detached tasks. A child task cannot outlive its parent scope, so errors and cancellation propagate without any extra bookkeeping.
