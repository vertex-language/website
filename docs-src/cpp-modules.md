---
slug: cpp-modules
title: C++ Modules
description: Reach operating system facilities by putting a C++20 module next to your Vertex files, with no headers, bindings, or attributes.
---

## Native code in a package

When a package has to ask the operating system for something, or needs a hand-tuned routine, put a C++20 *named module* in the same folder as its `.vs` files. The compiler builds it in-process with `vcx`, Vertex's C++ compiler, and the module's `export` declarations become visible to the package's Vertex code. There is no header to write, no binding generator, and no `extern` attribute.

Here a package `fast` pairs one C++ file with one Vertex file.

```text
fast/fast.cpp
```

```text
module;
#include <cmath>
export module fast;

export double hypotenuse(double x, double y) noexcept {
    return std::hypot(x, y);
}

export int twice(int v) noexcept { return v * 2; }
```

The exported functions are called by name from Vertex source in the same package. A thin Vertex layer then gives callers a proper API.

```text
fast/fast.vs
```

```text
package fast

public func distance(_ x: double, _ y: double) -> double {
    return hypotenuse(x, y)
}

public func doubled(_ n: int32) -> int32 { twice(n) }
```

```text
// main.vs, next to the fast/ folder
import "./fast"

print(fast.distance(3.0, 4.0))
print(fast.doubled(21))
```

```text
5.0
42
```

## What crosses the boundary

The compiler maps C and C++ types it understands onto Vertex types at the call, and refuses an export it cannot represent with a diagnostic that names the offending parameter. Fixed-width integers need `#include <stdint.h>` in the module's global fragment, as the standard library's own modules do. Plain `int`, `double`, pointers, and structs of those cross cleanly.

C++ code in a package can use the platform headers it needs. Link against a system library with `#pragma vertex library("m")`.

## Platform variants

C++ files follow the same suffix rule as Vertex files, so one package can carry a different implementation per target:

```text
clock.cpp            shared declarations
clock_posix.cpp      macOS, Linux, Android
clock_windows.cpp    Windows
```

On Apple platforms a file ending in `.mm` is compiled as Objective-C++ with ARC enabled, which gives direct access to AppKit, UIKit, and Metal.

> info: This is how the standard library is built. `fs` wraps POSIX and Win32 file calls, `time` wraps the clocks, and `ui/window` wraps each platform's windowing system, and everything above that is pure Vertex.
