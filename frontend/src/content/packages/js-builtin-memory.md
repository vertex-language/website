# package memory

```vertex
import "js/builtin/memory"
```

Package memory installs managing memory (ECMA-262 §26): WeakRef and
FinalizationRegistry.

TODO(gc): the engine has no tracing collector yet -- objects are
reference counted -- so there is no collection to observe: a WeakRef
holds its target strongly and cleanup callbacks never run (which the
spec permits). A collector of the engine's own will make them weak.

## Index

- [`func Install(_ r: object.Realm)`](#func-Install)
- [`final class FinalizationRegistry: object.JSObject`](#class-FinalizationRegistry)
  - [`init(_ cleanup: Value, proto: object.JSObject)`](#FinalizationRegistry.init)
  - [`let Cleanup: Value`](#FinalizationRegistry.Cleanup)
  - [`var Cells: [(target: Value, held: Value, token: Value)] = []`](#FinalizationRegistry.Cells)
- [`final class WeakRef: object.JSObject`](#class-WeakRef)
  - [`init(_ t: Value, proto: object.JSObject)`](#WeakRef.init)
  - [`let Target: Value`](#WeakRef.Target)

## Functions

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines WeakRef and FinalizationRegistry.

## Types

### class FinalizationRegistry <a id="class-FinalizationRegistry"></a>

```vertex
public final class FinalizationRegistry: object.JSObject
```

#### Initializers

<a id="FinalizationRegistry.init"></a>

```vertex
public init(_ cleanup: Value, proto: object.JSObject)
```

#### Properties

<a id="FinalizationRegistry.Cleanup"></a>

```vertex
public let Cleanup: Value
```

<a id="FinalizationRegistry.Cells"></a>

```vertex
public var Cells: [(target: Value, held: Value, token: Value)] = []
```

### class WeakRef <a id="class-WeakRef"></a>

```vertex
public final class WeakRef: object.JSObject
```

#### Initializers

<a id="WeakRef.init"></a>

```vertex
public init(_ t: Value, proto: object.JSObject)
```

#### Properties

<a id="WeakRef.Target"></a>

```vertex
public let Target: Value
```

## Files

- memory.vs
