---
slug: packages
title: Packages & Imports
description: How source is organized: a package is a folder, a module is a tree of packages with a vs.mod, and imports are string paths.
---

## A package is a folder

Every `.vs` file in a folder belongs to the same package, and all of them see one another's declarations. There are no header files and no declaration order. Subfolders are separate packages, imported by their own path.

Name the package at the top of each file. The name becomes the qualifier importers write.

```text
// geo/shapes.vs
package geo

public struct Point {
    public var x: double
    public var y: double
    public init(x: double, y: double) { self.x = x; self.y = y }
}

public func distance(_ a: Point, _ b: Point) -> double {
    let dx = a.x - b.x, dy = a.y - b.y
    return (dx * dx + dy * dy).squareRoot()
}
```

```text
// geo/format.vs
package geo

public func describe(_ p: Point) -> string { "(\(p.x), \(p.y))" }

func internalHelper() {}     // visible inside geo, not outside
```

If a file has no `package` line, the package takes the name of its folder. Only `public` declarations are visible to importers; everything else is internal to the package.

## Importing

Imports are string literals. A path starting with `./` or `../` is relative to the importing file, and any other path is looked up in the module and in the standard library.

```text
// cmd/app/main.vs
package main

import (
    g "github.com/you/proj/geo"
    "hash/crc32"
)

func main() {
    let a = g.Point(x: 0, y: 0)
    let b = g.Point(x: 6, y: 8)
    print(g.describe(b), g.distance(a, b))
}
```

```text
(6.0, 8.0) 10.0
```

An alias before the path, as with `g` above, renames the package locally. A relative import is handy for a single-file script that sits beside a folder:

```text
// main.vs, next to a geo/ folder
import "./geo"

print(geo.describe(geo.Point(x: 1, y: 2)))
```

## The entry point

A program is a package named `main` with a `func main()`. It can be `async`, `throws`, and return an `int32` exit code. A script, a single file of top-level statements, needs no `main` at all.

## Modules and vs.mod

A **module** is a tree of packages with a `vs.mod` at its root. The file names the module, which is the prefix of every import path inside it, and the language version.

```text
my-project/
├── vs.mod
├── geo/
│   ├── shapes.vs
│   └── format.vs
└── cmd/
    └── app/
        └── main.vs
```

```text
module github.com/you/my-project

vertex 0.9
```

Programs live under `cmd/`. Run one by its folder name, or build it into the bin directory:

```bash
vsc run app
vsc build -o app cmd/app
vsc install app
```

## Working across repositories

Packages found by import path are fetched into a cache and pinned by a `vs.sum` of hashes. While you develop several modules together, create a `vs.work` in their parent folder to point imports at your local checkouts instead:

```text
vertex 0.9

use (
    ./net
    ./crypto
    ./my-project
)
```

`vsc` also accepts `-P dir` to add a package root and `-replace path=dir` to substitute one package, both repeatable, and `-offline` to forbid any fetch.

## Platform-specific files

There are no preprocessor guards for platforms. Add a suffix to the file name instead, and the compiler includes the file only for matching targets.

| Suffix | Included for |
| --- | --- |
| `_darwin` | macOS and iOS |
| `_windows` | Windows |
| `_android` | Android |
| `_posix` | Any POSIX system |
| `_arm64`, `_amd64` | That architecture |

```text
geo/extra_darwin.vs      public func platform() -> string { "darwin" }
geo/extra_windows.vs     public func platform() -> string { "windows" }
```

Call `platform()` from shared code and each target links the version that matches it. For a small branch inside a single file, `#if os(...)` works too (see [if & guard](/docs/branching)).

## Targets

`vsc env` prints the target the compiler will build for, and `-target` chooses another one. Executables are written directly in each platform's native format with no external linker.

| Target | Output |
| --- | --- |
| `aarch64-macos` | Mach-O executable |
| `x86_64-windows` | PE/COFF executable |
| `x86_64-linux` | ELF executable |
| `aarch64-android` | ELF shared library (`--emit lib`) |

`-freestanding` links no platform libraries, for code that runs without an operating system.
