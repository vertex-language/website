---
slug: kernels
title: Kernels
description: Write GPU code in Vertex itself. Mark a function kernel and launch it over a grid, or map it across a buffer, on Metal or on the CPU.
---

## A function that runs on the device

Putting `kernel` between a function's parameters and its result marks it for the device. There is no separate shader language and no build step: the compiler lowers it to the device's native form (Apple AIR for Metal) and embeds it in your program. Kernels need `import "gpu"`.

A kernel that returns nothing is a **grid kernel**. It runs once per work-item, over a grid you choose when you launch it, and `gpu.Index.x` says which item it is.

```vertex
import "gpu"

func saxpy(_ a: float32, _ x: gpu.Span<float32>, _ y: gpu.MutableSpan<float32>) kernel {
    let i = gpu.Index.x
    if i < y.count {
        y[i] = a * x[i] + y[i]
    }
}

let device = gpu.Default()
let x = try await device.Upload([float32](repeating: 1, count: 4096))
let y = try await device.Upload([float32](repeating: 2, count: 4096))
try await saxpy.Launch(3.0, x, y, over: y.count)
let out = try await y.Download()
print(out[0], out[4095], out.count)
```

For every kernel the compiler writes a typed `Launch` method, so the arguments are checked against the kernel's signature and the grid is given by `over:`. `gpu.Span` is a read-only view of a device buffer and `gpu.MutableSpan` a writable one. `gpu.Default()` picks the best device on the machine; every machine also has `gpu.CPU()`.

> info: Launching is `async`, and kernels need a `try await` at the call site. At the top level of a script that is allowed directly. Inside a function, mark it `async throws`.

## Element kernels and Map

A kernel that **returns a value** is an *element kernel*. It describes what happens to one element, and `Map` applies it across a whole buffer.

```vertex
import "gpu"

func square(_ x: float32) kernel -> float32 {
    return x * x
}

let xs = try await gpu.Default().Upload([float32(1), 2, 3, 4])
let ys = try await square.Map(xs)
print(try await ys.Download(), ys.count)
```

`Map` can fill an existing buffer instead of allocating a new one.

```vertex
import "gpu"

func negate(_ x: int) kernel -> int {
    return -x
}

let d = gpu.Default()
let xs = try await d.Upload([1, -2, 3])
let out = try d.CreateBuffer(of: int.self, count: 3)
try await negate.Map(xs, into: out)
print(try await out.Download())
```

## Grids

The grid can be one, two, or three dimensional. Use `gpu.Index.x`, `.y`, and `.z`, and pass a tuple to `over:`.

```vertex
import "gpu"

func table(_ y: gpu.MutableSpan<int32>, width: int) kernel {
    let x = gpu.Index.x
    let row = gpu.Index.y
    y[row * width + x] = int32(row * 10 + x)
}

let y = try await gpu.Default().Upload([int32](repeating: 0, count: 6))
try await table.Launch(y, width: 3, over: (3, 2))
print(try await y.Download())
```

## Workgroups, shared memory, and barriers

Work-items are launched in **workgroups** that can cooperate. Pass `workgroup:` to choose the size. Inside a group, `gpu.Shared` gives fast storage that every item in the group can see, `gpu.LocalIndex.x` is an item's position in its group, `gpu.GroupIndex.x` is the group's own index, and `gpu.Barrier()` makes every item wait for the rest. A barrier must be reached by every item in the group.

This kernel sums each group of 8 values with a tree reduction.

```vertex
import "gpu"

func blockSum(_ x: gpu.Span<int32>, _ out: gpu.MutableSpan<int32>) kernel {
    let partial = gpu.Shared<int32>(count: 8)
    let me = gpu.LocalIndex.x
    partial[me] = x[gpu.Index.x]
    gpu.Barrier()

    var stride = 4
    while stride > 0 {
        if me < stride {
            partial[me] = partial[me] + partial[me + stride]
        }
        gpu.Barrier()
        stride /= 2
    }
    if me == 0 {
        out[gpu.GroupIndex.x] = partial[0]
    }
}

let d = gpu.Default()
var host: [int32] = []
for i in 1...16 { host.append(int32(i)) }
let x = try await d.Upload(host)
let out = try await d.Upload([int32](repeating: 0, count: 2))
try await blockSum.Launch(x, out, over: 16, workgroup: 8)
print(try await out.Download())
```

## Atomics and waves

`gpu.Atomic` updates one location safely from many items at once. A **wave** is the hardware's lockstep group of lanes (a simdgroup on Apple GPUs, a warp on NVIDIA), and `gpu.Wave` offers collective operations such as `Sum` that cost far less than going through memory. Combining the two gives a total that does not depend on how wide a wave is.

```vertex
import "gpu"

func total(_ x: gpu.Span<int32>, _ out: gpu.MutableSpan<int32>) kernel {
    let s = gpu.Wave.Sum(x[gpu.Index.x])
    if gpu.Wave.Lane == 0 {
        _ = gpu.Atomic.Add(out.Address(0), s)
    }
}

let d = gpu.Default()
var host: [int32] = []
for i in 1...128 { host.append(int32(i)) }
let x = try await d.Upload(host)
let out = try await d.Upload([int32(0)])
try await total.Launch(x, out, over: 128, workgroup: 64)
print(try await out.Download())
```

## Choosing a device

A kernel runs on whichever device owns its buffers. The CPU device executes kernels with one fiber per work-item and turns barriers into stack switches, which makes it an exact reference for testing on any machine.

```vertex
import "gpu"

func twice(_ y: gpu.MutableSpan<int32>) kernel {
    let i = gpu.Index.x
    y[i] = y[i] * 2
}

let y = try await gpu.CPU().Upload([int32(1), 2, 3])
try await twice.Launch(y, over: 3)
print(try await y.Download(), y.Device.IsCPU)
```

## What a kernel may do

The compiler analyzes everything a kernel can reach, and compiles those helper functions for the device too. In exchange it rejects anything a device cannot do: heap allocation, dynamic dispatch, access to globals, and I/O. The error names the chain of calls that led to the problem.

```vertex error
import "gpu"

func log(_ v: int32) {
    print(v)
}

func noisy(_ y: gpu.MutableSpan<int32>) kernel {
    log(y[gpu.Index.x])
}
print("never built")
```

## Higher-level building blocks

For common work you should not need to write a kernel. The `gpu/parallel` package provides reductions, scans, and sorts, `gpu/linalg` provides matrix multiplication, `gpu/neural` and `gpu/attention` provide the layers of a neural network, and `gpu/random` provides counter-based random streams. All of them are ordinary Vertex code built on the kernels on this page, and their device functions can be called inside your own kernels. See the [standard library](/docs/stdlib).

> info: `graph` is a second execution modifier, for tensor dataflow. It parses and type-checks today, but the compiler does not lower it yet, so there is nothing to run.
