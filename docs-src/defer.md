---
slug: defer
title: defer
description: Schedule cleanup code that runs when the current scope exits, however it exits.
---

## Cleanup that always runs

A `defer` block runs when the enclosing scope ends, whether by reaching the end, `return`, `throw`, `break`, or `continue`. It puts acquisition and release side by side so they cannot drift apart.

```vertex
func process() {
    print("open")
    defer { print("close") }

    print("working")
    print("still working")
}
process()
```

## Order of execution

Several `defer` blocks run in reverse order, like unwinding a stack.

```vertex
func order() {
    defer { print("first deferred, runs last") }
    defer { print("second deferred, runs first") }
    print("body")
}
order()
```

## Early exits and errors

Because `defer` runs on every exit path, it is the right home for releasing resources around an early return or a thrown error.

```vertex
enum Failure: Error { case bad }

func attempt(_ ok: bool) throws -> string {
    print("lock")
    defer { print("unlock") }

    guard ok else { throw Failure.bad }
    return "done"
}

print(try attempt(true))
do {
    _ = try attempt(false)
} catch {
    print("caught", error)
}
```

In a loop, the deferred block runs at the end of each iteration.

```vertex
for i in 1...2 {
    defer { print("end of iteration \(i)") }
    print("start of iteration \(i)")
}
```

> info: Values used inside a `defer` are read when it runs, not when it is declared. A `defer` cannot exit its scope itself, so no `return` or `throw` inside it.
