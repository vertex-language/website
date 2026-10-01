---
slug: quickstart
title: Quickstart
description: Install vsc, write your first program, then run it, build it into a native executable, and import a standard package.
---

## Install the compiler

`vsc` is written in Go and has no other dependencies. With Go installed, clone the repository and install the binary:

```bash
git clone https://github.com/vertex-language/vsc.git
cd vsc/cmd
go install ./vsc
```

Make sure Go's bin directory (`$GOPATH/bin`, usually `~/go/bin`) is on your `PATH`, then check that the toolchain can see your machine:

```bash
vsc env
```

```text
target	aarch64-macos
host	aarch64-macos
use	aarch64/macos
module	main
entry	_main
prefix	"_"
targets	aarch64-android, aarch64-macos, x86_64-linux, x86_64-windows
```

Your output names your own host. `vsc env` also prints the cache and SDK locations. See [Build from source](/docs/build-from-source) for details, or the [download page](/download) for prebuilt releases.

## Your first program

A file of top-level statements is already a program. Save this as `hello.vs`:

```vertex
let name = "Vertex"
print("Hello, \(name)!")
```

Run it directly, which builds to a temporary location and executes the result:

```bash
vsc run hello.vs
```

## A program with an entry point

Larger programs declare `func main()` in package `main`. Save this as `fib.vs`:

```vertex
package main

func fibonacci(_ n: int32) -> int32 {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

func main() -> int32 {
    let terms = 10
    print("Computing first \(terms) Fibonacci numbers:")

    for i in 0..<terms {
        let value = fibonacci(int32(i))
        print("fibonacci(\(i)) = \(value)")
    }

    return 0
}
```

`main` may return an `int32` exit code, and may be marked `async` and `throws` (see [async & await](/docs/async-await)). String interpolation `\( )` embeds any expression in a string.

## Build a native executable

`vsc build` compiles and links an executable. Nothing else needs to be installed: the linker is part of `vsc`, so there is no `cc`, `as`, or `ld` involved.

```bash
vsc build -o fib fib.vs
./fib
```

The file it writes is in the host's native format: Mach-O on macOS, ELF on Linux, PE on Windows. You can build for another machine with `-target`:

```bash
vsc build -target x86_64-linux -o fib-linux fib.vs
```

> info: Cross-compiling to Windows and Android needs that platform's runtime libraries available to the linker. The [SDK page](/sdk) explains how to set one up. Linux needs nothing extra.

## Catch errors without building

`vsc check` parses and type-checks and prints diagnostics, with a nonzero exit status if there are errors. It is the fast loop while you edit.

```vertex error
let attempts: int = "three"
```

## Use the standard library

Standard packages are imported by a short string path. The first build that needs one fetches it into a local cache, and later builds read it from there, so only the first build touches the network.

```vertex
import "crypto/sha256"
import "encoding/hex"

let digest = sha256.Sum256("hello")
print(hex.EncodeToString(digest))
```

Continue with the language guide, starting at [Values & types](/docs/values), or browse the [standard library](/docs/stdlib).
