# package sync

```vertex
import "sync"
```

Package sync is concurrency beyond what the language gives: executors
for work that should not run on the shared pool of workers.

Code isolated to no actor runs on the runtime's workers, one per core,
and a task gives up its worker only where it awaits. A long decode, an
encode, a big inflate -- work that runs for a long time without
awaiting -- holds its worker for all of it, and every task queued behind
it there waits; on the main actor it stops the window. Swift's answer is
a task executor preference (SE-0417), and ThreadPoolExecutor is an
executor to prefer for such work:

```vertex
let img = await withTaskExecutorPreference(ThreadPoolExecutor.shared) {
    png.Decode(bytes)
}
```

The closure runs on the pool's threads, apart from the workers; the
caller awaits it like any other call and carries on where it was.

## Index

- [`func MemoryFence()`](#func-MemoryFence)
- [`final class Mutex`](#class-Mutex)
  - [`init()`](#Mutex.init)
  - [`func lock()`](#Mutex.lock)
  - [`func unlock()`](#Mutex.unlock)
  - [`func tryLock() -> bool`](#Mutex.tryLock)
  - [`func withLock<R>(_ body: () throws -> R) rethrows -> R`](#Mutex.withLock)
- [`final class Thread`](#class-Thread)
  - [`static func spawn(_ body: @escaping () -> Void) -> Thread`](#Thread.spawn)
  - [`func join()`](#Thread.join)
  - [`func detach()`](#Thread.detach)
- [`final class ThreadPoolExecutor: TaskExecutor, _NativeTaskExecutor`](#class-ThreadPoolExecutor)
  - [`init(threads: int)`](#ThreadPoolExecutor.init)
  - [`let Threads: int`](#ThreadPoolExecutor.Threads)
  - [`let _nativeExecutor: UInt64`](#ThreadPoolExecutor._nativeExecutor)
  - [`static var Shared: ThreadPoolExecutor { get }`](#ThreadPoolExecutor.Shared)
  - [`func enqueue(_ job: consuming ExecutorJob)`](#ThreadPoolExecutor.enqueue)
  - [`func asUnownedTaskExecutor() -> UnownedTaskExecutor`](#ThreadPoolExecutor.asUnownedTaskExecutor)

## Functions

### func MemoryFence <a id="func-MemoryFence"></a>

```vertex
public func MemoryFence()
```

A full memory fence: every load and store before it is visible to
other threads, and to a virtual machine's vCPUs, before any after it.
Swift's `atomicMemoryFence(ordering: .sequentiallyConsistent)`.

A mutex orders what threads that take it see; this is for memory read
by someone who takes no lock, like a device writing guest memory that
a vCPU polls.

## Types

### class Mutex <a id="class-Mutex"></a>

```vertex
public final class Mutex
```

Mutex is a mutual exclusion lock for short critical sections.

#### Initializers

<a id="Mutex.init"></a>

```vertex
public init()
```

#### Methods

<a id="Mutex.lock"></a>

```vertex
public func lock()
```

<a id="Mutex.unlock"></a>

```vertex
public func unlock()
```

<a id="Mutex.tryLock"></a>

```vertex
public func tryLock() -> bool
```

<a id="Mutex.withLock"></a>

```vertex
public func withLock<R>(_ body: () throws -> R) rethrows -> R
```

### class Thread <a id="class-Thread"></a>

```vertex
public final class Thread
```

A dedicated operating system thread.

#### Methods

<a id="Thread.spawn"></a>

```vertex
public static func spawn(_ body: @escaping () -> Void) -> Thread
```

Spawns a dedicated OS thread running `body`.

<a id="Thread.join"></a>

```vertex
public func join()
```

<a id="Thread.detach"></a>

```vertex
public func detach()
```

### class ThreadPoolExecutor <a id="class-ThreadPoolExecutor"></a>

```vertex
public final class ThreadPoolExecutor: TaskExecutor, _NativeTaskExecutor
```

ThreadPoolExecutor runs tasks' code on threads of its own, apart from
the runtime's workers and the main thread: a TaskExecutor for long,
CPU-heavy or blocking work to prefer (withTaskExecutorPreference,
Task(executorPreference:), addTask(executorPreference:)).

Each thread runs its tasks in turn, as a worker does, so a task on it
can await -- sleep, wait on a socket, join another task -- and the
others on that thread run meanwhile. Its threads last as long as the
program.

#### Initializers

<a id="ThreadPoolExecutor.init"></a>

```vertex
public init(threads: int)
```

A pool of so many threads, at least one.

#### Properties

<a id="ThreadPoolExecutor.Threads"></a>

```vertex
public let Threads: int
```

How many threads the pool has.

<a id="ThreadPoolExecutor._nativeExecutor"></a>

```vertex
public let _nativeExecutor: UInt64
```

The runtime's word for the pool, which a preference names.

<a id="ThreadPoolExecutor.Shared"></a>

```vertex
public static var Shared: ThreadPoolExecutor { get }
```

The pool shared by whatever has long work to do: as many threads
as the runtime has workers, at least two. Image and media codecs
and the like send their work here.

#### Methods

<a id="ThreadPoolExecutor.enqueue"></a>

```vertex
public func enqueue(_ job: consuming ExecutorJob)
```

Runs the job on one of the pool's threads.

<a id="ThreadPoolExecutor.asUnownedTaskExecutor"></a>

```vertex
public func asUnownedTaskExecutor() -> UnownedTaskExecutor
```

## Files

- fence.vs
- mutex.vs
- sync.vs
- thread.vs
