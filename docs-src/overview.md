---
slug: overview
title: Vertex Overview
description: A statically typed systems language with automatic reference counting, value semantics, first-class GPU kernels, and a toolchain that compiles straight to native binaries.
---

## What Vertex is

Vertex is a statically typed, compiled language for systems software, services, and accelerated compute. It combines value semantics, deterministic automatic reference counting, structured concurrency, and GPU kernels written in the same language as the host code. Source files end in `.vs`, and the compiler, `vsc`, turns them into native executables on its own, with no C compiler, assembler, or system linker involved.

| Idea | What it means in practice |
| --- | --- |
| Safe by default | Variables are definitely initialized before use, array indices are bounds-checked, integer arithmetic traps on overflow, and absence is an explicit optional. |
| Predictable memory | Structs and enums are values. Classes are reference-counted, and an instance is freed at the moment its last reference goes away. There is no garbage collector and no pause. |
| Structured concurrency | `async`/`await`, `async let`, task groups, and actors run on a cooperative executor that is linked into every program. |
| Kernels in the language | A function marked `kernel` compiles for the GPU (Metal) or the CPU device and launches with a typed `Launch` or `Map`. |
| Native C++ when needed | A package can carry a C++20 module that the compiler builds in-process, with no headers or bindings. |
| Everything self-contained | A standard library of 30-plus packages, from TLS and HTTP/3 to a JavaScript engine and neural network inference, with no third-party dependencies. |

## A first look

This program defines a protocol, a struct, a generic function with argument labels and a closure, and uses optional binding. It is compiled and run as-is.

```vertex
package main

protocol Describable {
    var description: string { get }
}

struct ServerNode: Describable {
    let hostname: string
    var port: int32 = 8080
    var isHealthy: bool = true

    var description: string {
        return "\(hostname):\(port) (healthy: \(isHealthy))"
    }
}

func findFirst<T>(in cluster: [T], matching predicate: (T) -> bool) -> T? {
    for node in cluster {
        if predicate(node) { return node }
    }
    return nil
}

func main() -> int32 {
    let cluster = [
        ServerNode(hostname: "api-east-1", port: 443),
        ServerNode(hostname: "api-west-1", port: 443, isHealthy: false),
        ServerNode(hostname: "api-eu-central", port: 8443),
    ]

    if let node = findFirst(in: cluster, matching: { $0.isHealthy && $0.port == 443 }) {
        print("Routing traffic to: \(node.description)")
    } else {
        print("No healthy endpoint available.")
    }
    return 0
}
```

Primitive types are spelled in lowercase (`int`, `uint8`, `float32`, `string`), and a package is just a folder of files. The [language guide](/docs/values) covers each of these in turn.

## Ownership is explicit where it matters

A function says how it uses each argument, and a method can declare how it uses its receiver, even outside the type's body. This is what lets the compiler avoid copies and reference-count traffic without a borrow checker getting in your way.

```vertex
struct Vec2 {
    var x: float32
    var y: float32
}

func (v: borrowing Vec2) length() -> float32 {
    (v.x * v.x + v.y * v.y).squareRoot()
}
func (v: inout Vec2) scale(by factor: float32) {
    v.x *= factor
    v.y *= factor
}

var v = Vec2(x: 3, y: 4)
v.scale(by: 2)
print(v.length())
```

See [Receiver methods](/docs/receiver-methods) and [Borrowing & consuming](/docs/ownership).

## Where code runs

Execution is part of a function's signature rather than a library you bolt on.

| Declaration | Runs as | Called with |
| --- | --- | --- |
| `func f(x)` | Ordinary code on the calling thread | `f(x)` |
| `func f(x) async` | A task that can suspend without blocking a thread | `await f(x)` |
| `func f(x) kernel` | A grid kernel on the GPU or CPU device | `f.Launch(x, over: n)` |
| `func f(x) kernel -> T` | An element kernel applied to a buffer | `f.Map(buffer)` |

A fourth modifier, `graph`, is reserved for tensor dataflow. It parses and type-checks today, but is not lowered yet. See [Kernels](/docs/kernels).

## The toolchain

One program, `vsc`, owns the whole pipeline in a single process. Each stage is a real, inspectable artifact:

1. **Tokens** from the scanner (`vsc tokens`).
2. **Syntax tree** from the parser (`vsc ast`).
3. **Type-checked program**, with definite initialization (`vsc check`).
4. **SIL**, the intermediate form on which ownership is verified (`--emit sil`).
5. **Vertex IR**, a typed machine-level form (`--emit vir`).
6. **Machine code** for the target, written directly into a Mach-O, ELF, or PE file by `vsc`'s own linker.

The supported targets are `aarch64-macos`, `x86_64-linux`, `x86_64-windows`, and `aarch64-android`. See the [CLI](/docs/cli) page for every command and flag.

## Where to go next

| Topic | What it covers |
| --- | --- |
| [Quickstart](/docs/quickstart) | Install `vsc`, then run and build your first program |
| [Build from source](/docs/build-from-source) | Compile the toolchain yourself |
| [CLI](/docs/cli) | Every `vsc` command, flag, and output stage |
| [Values & types](/docs/values) | Start of the language guide |
| [Packages & imports](/docs/packages) | How code is organized and shared |
| [Standard library](/docs/stdlib) | What ships in the box |
