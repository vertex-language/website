# package state

```vertex
import "ui/state"
```

Package state is the signal graph: values that say when they change,
computations that follow them, and effects that run again when what
they read does -- the state a .vsx component keeps (`@state.State`),
and what follows it (proposed_vsx.md §5). It imports nothing: the rest
of ui is built on it, not the other way round, so a model, a cache or a
scene can use it without windows.

Reading a Signal or a Computed inside a running Effect or Computed
records the read. Writing a Signal tells what read it; an Effect that
is told runs again, once, after the writes around it are done: at once
outside a Batch, and when the outermost Batch ends inside one.

## Index

- [`func Batch(_ body: () -> void)`](#func-Batch)
- [`func CurrentOwner() -> Owner?`](#func-CurrentOwner)
- [`func OnCleanup(_ f: () -> void)`](#func-OnCleanup)
- [`func Untracked<T>(_ body: () -> T) -> T`](#func-Untracked)
- [`func WithOwner(_ owner: Owner, _ body: () -> void)`](#func-WithOwner)
- [`final class Cell: Source`](#class-Cell)
- [`struct Computed<T>`](#struct-Computed)
  - [`init(_ compute: () -> T)`](#Computed.init)
  - [`var Value: T { get }`](#Computed.Value)
- [`final class Derived: Observer`](#class-Derived)
- [`final class Effect: Observer`](#class-Effect)
  - [`init(_ run: () -> void)`](#Effect.init)
  - [`internal(set) var Disposed = false`](#Effect.Disposed)
  - [`func Dispose()`](#Effect.Dispose)
- [`enum Load<T>`](#enum-Load)
- [`class Observer: Source`](#class-Observer)
- [`final class Owner`](#class-Owner)
  - [`init()`](#Owner.init)
  - [`func Dispose()`](#Owner.Dispose)
- [`struct Readable<T>`](#struct-Readable)
  - [`init(_ get: () -> T)`](#Readable.init)
  - [`init(_ signal: Signal<T>)`](#Readable.init-2)
  - [`var Value: T { get }`](#Readable.Value)
  - [`subscript<U>(dynamicMember path: KeyPath<T, U>) -> U { get }`](#Readable.subscript)
- [`struct Resource<T>`](#struct-Resource)
  - [`init<K>(of key: () -> K, keepPrevious: bool = false, _ load: (K) async throws -> T)`](#Resource.init)
  - [`init(keepPrevious: bool = false, _ load: () async throws -> T)`](#Resource.init-2)
  - [`var State: Load<T> { get }`](#Resource.State)
  - [`var Value: T? { get }`](#Resource.Value)
  - [`var IsPending: bool { get }`](#Resource.IsPending)
  - [`func Reload()`](#Resource.Reload)
  - [`func Loaded() async`](#Resource.Loaded)
- [`struct Signal<T>`](#struct-Signal)
  - [`init(_ value: T)`](#Signal.init)
  - [`init()`](#Signal.init-2)
  - [`var Value: T { get set }`](#Signal.Value)
  - [`func Peek() -> T`](#Signal.Peek)
- [`class Source`](#class-Source)
- [`struct State<T>`](#struct-State)
  - [`init(wrappedValue: T)`](#State.init)
  - [`var wrappedValue: T { get set }`](#State.wrappedValue)
  - [`var projectedValue: Signal<T> { get }`](#State.projectedValue)
- [`struct Unset`](#struct-Unset)

## Functions

### func Batch <a id="func-Batch"></a>

```vertex
public func Batch(_ body: () -> void)
```

Runs body, and runs the effects its writes tell once, after it.

### func CurrentOwner <a id="func-CurrentOwner"></a>

```vertex
public func CurrentOwner() -> Owner?
```

The owner of what the code running now makes, if any: to make
something later -- after an await, once mounted -- that ends with it.

### func OnCleanup <a id="func-OnCleanup"></a>

```vertex
public func OnCleanup(_ f: () -> void)
```

Runs f when the code running now is disposed: its effect runs again,
or its owner is disposed.

### func Untracked <a id="func-Untracked"></a>

```vertex
public func Untracked<T>(_ body: () -> T) -> T
```

Reads inside body without following what is read.

### func WithOwner <a id="func-WithOwner"></a>

```vertex
public func WithOwner(_ owner: Owner, _ body: () -> void)
```

Runs body with what it makes owned by owner.

## Types

### class Cell <a id="class-Cell"></a>

```vertex
public final class Cell: Source
```

A signal's storage. Public because a signal's accessors are compiled
where they are used; use Signal.

### struct Computed <a id="struct-Computed"></a>

```vertex
public struct Computed<T>
```

A value computed from others, again only when one of them has changed
and it is read.

#### Initializers

<a id="Computed.init"></a>

```vertex
public init(_ compute: () -> T)
```

#### Properties

<a id="Computed.Value"></a>

```vertex
public var Value: T { get }
```

### class Derived <a id="class-Derived"></a>

```vertex
public final class Derived: Observer
```

A computed value's storage: the computation, what it last gave, and
whether that is stale. Public for the same reason as Cell; use Computed.

### class Effect <a id="class-Effect"></a>

```vertex
public final class Effect: Observer
```

A reaction: runs now, and again after each change to what it read the
last time it ran, until it is disposed. For talking to the world
outside the graph -- a document, a file, a socket -- not for values,
which Computed is for.

#### Initializers

<a id="Effect.init"></a>

```vertex
public init(_ run: () -> void)
```

#### Properties

<a id="Effect.Disposed"></a>

```vertex
public internal(set) var Disposed = false
```

#### Methods

<a id="Effect.Dispose"></a>

```vertex
public func Dispose()
```

Stops following: the effect never runs again, and what it made is
disposed.

### enum Load <a id="enum-Load"></a>

```vertex
public enum Load<T>
```

Where an async value is: still loading, loaded, or failed.

#### Cases

<a id="Load.loading"></a>

```vertex
case loading
```

<a id="Load.ready"></a>

```vertex
case ready(T)
```

<a id="Load.failed"></a>

```vertex
case failed(Error)
```

### class Observer <a id="class-Observer"></a>

```vertex
public class Observer: Source
```

Something that reads: it keeps what it read, to stop following them.

### class Owner <a id="class-Owner"></a>

```vertex
public final class Owner
```

What some code made that has to end with it: the effects made while it
ran, and cleanups registered with OnCleanup. An effect owns what each of
its runs makes, and disposes it before running again, so an effect made
inside another -- a component's bindings inside a branch -- ends when
the branch is gone.

#### Initializers

<a id="Owner.init"></a>

```vertex
public init()
```

#### Methods

<a id="Owner.Dispose"></a>

```vertex
public func Dispose()
```

Disposes what the owner holds, and empties it.

### struct Readable <a id="struct-Readable"></a>

```vertex
@dynamicMemberLookup
public struct Readable<T>
```

A value to read, live: a signal, or anything computed from signals.
Reading it inside an effect follows what it reads. Its members read
through it: `todo.Done` is `todo.Value.Done`.

#### Initializers

<a id="Readable.init"></a>

```vertex
public init(_ get: () -> T)
```

<a id="Readable.init-2"></a>

```vertex
public init(_ signal: Signal<T>)
```

#### Properties

<a id="Readable.Value"></a>

```vertex
public var Value: T { get }
```

<a id="Readable.subscript"></a>

```vertex
public subscript<U>(dynamicMember path: KeyPath<T, U>) -> U { get }
```

### struct Resource <a id="struct-Resource"></a>

```vertex
public struct Resource<T>
```

A value loaded asynchronously, as state: `State` is `.loading`, then
`.ready(value)` or `.failed(error)`, and what reads it follows it.

```vertex
let user = state.Resource(of: { id }) { id in try await api.User(id) }
{switch user.State { case .loading: <Spinner/> case .ready(let u): … }}
```

The load runs off the main thread and its result is written on it. When
the key -- what `of` reads -- changes, the load in flight is cancelled
and a new one started; when the code that made the resource is
disposed (a component gone), so is its load. With keepPrevious, a
reload keeps the last value showing, and IsPending says it is under way.

#### Initializers

<a id="Resource.init"></a>

```vertex
public init<K>(of key: () -> K, keepPrevious: bool = false, _ load: (K) async throws -> T)
```

A resource loaded again when what key reads changes.

<a id="Resource.init-2"></a>

```vertex
public init(keepPrevious: bool = false, _ load: () async throws -> T)
```

A resource loaded once, and again on Reload.

#### Properties

<a id="Resource.State"></a>

```vertex
public var State: Load<T> { get }
```

Where the value is: followed.

<a id="Resource.Value"></a>

```vertex
public var Value: T? { get }
```

The value, once loaded; nil while loading or after a failure.

<a id="Resource.IsPending"></a>

```vertex
public var IsPending: bool { get }
```

Whether a load is under way.

#### Methods

<a id="Resource.Reload"></a>

```vertex
public func Reload()
```

Loads again, with the key as it is.

<a id="Resource.Loaded"></a>

```vertex
public func Loaded() async
```

Waits for the load under way to end: for tests, and for code that
needs the value before it goes on.

### struct Signal <a id="struct-Signal"></a>

```vertex
public struct Signal<T>
```

A value that can be read and written; reading it inside an effect or
a computation makes that one follow it. A handle: copies of a signal
are the same signal, and writing through any `var` of it writes it.

#### Initializers

<a id="Signal.init"></a>

```vertex
public init(_ value: T)
```

<a id="Signal.init-2"></a>

```vertex
public init()
```

A signal with no value yet: an @Observable property set only in its
class's init starts as one. Reading it before it is set is an error.

#### Properties

<a id="Signal.Value"></a>

```vertex
public var Value: T { get set }
```

#### Methods

<a id="Signal.Peek"></a>

```vertex
public func Peek() -> T
```

The value, without following it.

### class Source <a id="class-Source"></a>

```vertex
public class Source
```

Something that is read: it keeps what read it, to tell them.

### struct State <a id="struct-State"></a>

```vertex
@propertyWrapper
public struct State<T>
```

A signal kept in a variable: `@State var count = 0` reads and writes
the signal's value as `count`, and `$count` is the signal itself.

#### Initializers

<a id="State.init"></a>

```vertex
public init(wrappedValue: T)
```

#### Properties

<a id="State.wrappedValue"></a>

```vertex
public var wrappedValue: T { get set }
```

<a id="State.projectedValue"></a>

```vertex
public var projectedValue: Signal<T> { get }
```

### struct Unset <a id="struct-Unset"></a>

```vertex
public struct Unset
```

What an empty signal holds.

## Files

- state.vs
