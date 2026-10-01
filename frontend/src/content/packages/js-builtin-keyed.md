# package keyed

```vertex
import "js/builtin/keyed"
```

Package keyed installs the keyed collections (ECMA-262 §24): Map, Set,
WeakMap and WeakSet, with their iterators.

## Index

- [`func CanBeHeldWeakly(_ v: Value) -> bool`](#func-CanBeHeldWeakly)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`final class Collection: object.JSObject`](#class-Collection)
  - [`init(isMap: bool, proto: object.JSObject)`](#Collection.init)
  - [`let Entries = Table()`](#Collection.Entries)
  - [`let IsMap: bool`](#Collection.IsMap)
- [`final class CollectionIterator: object.JSObject`](#class-CollectionIterator)
  - [`init(_ c: Collection, _ mode: IterationKind, proto: object.JSObject)`](#CollectionIterator.init)
  - [`var Target: Collection?`](#CollectionIterator.Target)
  - [`var Index: int = 0`](#CollectionIterator.Index)
  - [`var Epoch: int`](#CollectionIterator.Epoch)
  - [`let Mode: IterationKind`](#CollectionIterator.Mode)
- [`enum IterationKind`](#enum-IterationKind)
- [`struct Key: Hashable`](#struct-Key)
  - [`init(_ v: Value)`](#Key.init)
  - [`static func ==(a: Key, b: Key) -> bool`](#Key.op61op61)
  - [`func hash(into hasher: inout Hasher)`](#Key.hash)
- [`final class Table`](#class-Table)
  - [`init()`](#Table.init)
  - [`var Keys: [Value] = []`](#Table.Keys)
  - [`var Values: [Value] = []`](#Table.Values)
  - [`var Size: int = 0`](#Table.Size)
  - [`var Epoch: int { get }`](#Table.Epoch)
  - [`func Find(_ k: Value) -> int`](#Table.Find)
  - [`func Get(_ k: Value) -> Value?`](#Table.Get)
  - [`func Has(_ k: Value) -> bool`](#Table.Has)
  - [`func Set(_ k: Value, _ v: Value)`](#Table.Set)
  - [`func Delete(_ k: Value) -> bool`](#Table.Delete)
  - [`func Clear()`](#Table.Clear)
  - [`func Remap(_ i: int, from epoch: int) -> int`](#Table.Remap)
- [`final class WeakCollection: object.JSObject`](#class-WeakCollection)
  - [`init(isMap: bool, proto: object.JSObject)`](#WeakCollection.init)
  - [`let Entries = Table()`](#WeakCollection.Entries)
  - [`let IsMap: bool`](#WeakCollection.IsMap)

## Functions

### func CanBeHeldWeakly <a id="func-CanBeHeldWeakly"></a>

```vertex
public func CanBeHeldWeakly(_ v: Value) -> bool
```

CanBeHeldWeakly (§9.13).

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

## Types

### class Collection <a id="class-Collection"></a>

```vertex
public final class Collection: object.JSObject
```

Collection is a Map or Set instance.

#### Initializers

<a id="Collection.init"></a>

```vertex
public init(isMap: bool, proto: object.JSObject)
```

#### Properties

<a id="Collection.Entries"></a>

```vertex
public let Entries = Table()
```

<a id="Collection.IsMap"></a>

```vertex
public let IsMap: bool
```

### class CollectionIterator <a id="class-CollectionIterator"></a>

```vertex
public final class CollectionIterator: object.JSObject
```

#### Initializers

<a id="CollectionIterator.init"></a>

```vertex
public init(_ c: Collection, _ mode: IterationKind, proto: object.JSObject)
```

#### Properties

<a id="CollectionIterator.Target"></a>

```vertex
public var Target: Collection?
```

<a id="CollectionIterator.Index"></a>

```vertex
public var Index: int = 0
```

<a id="CollectionIterator.Epoch"></a>

```vertex
public var Epoch: int
```

<a id="CollectionIterator.Mode"></a>

```vertex
public let Mode: IterationKind
```

### enum IterationKind <a id="enum-IterationKind"></a>

```vertex
public enum IterationKind
```

#### Cases

<a id="IterationKind.keys"></a>

```vertex
case keys
```

<a id="IterationKind.values"></a>

```vertex
case values
```

<a id="IterationKind.entries"></a>

```vertex
case entries
```

### struct Key <a id="struct-Key"></a>

```vertex
public struct Key: Hashable
```

Key is a value as a hash key under SameValueZero: -0 is +0, every NaN
is one NaN, objects and symbols are themselves.

#### Initializers

<a id="Key.init"></a>

```vertex
public init(_ v: Value)
```

#### Methods

<a id="Key.op61op61"></a>

```vertex
public static func ==(a: Key, b: Key) -> bool
```

<a id="Key.hash"></a>

```vertex
public func hash(into hasher: inout Hasher)
```

### class Table <a id="class-Table"></a>

```vertex
public final class Table
```

Table is a Map's or Set's entries: insertion ordered, with deleted
entries left as .empty so that iterators keep their place. When it
compacts, it records the removed positions so an iterator can move
its index to where the entry went.

#### Initializers

<a id="Table.init"></a>

```vertex
public init()
```

#### Properties

<a id="Table.Keys"></a>

```vertex
public var Keys: [Value] = []
```

<a id="Table.Values"></a>

```vertex
public var Values: [Value] = []
```

<a id="Table.Size"></a>

```vertex
public var Size: int = 0
```

<a id="Table.Epoch"></a>

```vertex
public var Epoch: int { get }
```

Epoch counts compactions; an iterator remembers the one it saw.

#### Methods

<a id="Table.Find"></a>

```vertex
public func Find(_ k: Value) -> int
```

<a id="Table.Get"></a>

```vertex
public func Get(_ k: Value) -> Value?
```

<a id="Table.Has"></a>

```vertex
public func Has(_ k: Value) -> bool
```

<a id="Table.Set"></a>

```vertex
public func Set(_ k: Value, _ v: Value)
```

<a id="Table.Delete"></a>

```vertex
public func Delete(_ k: Value) -> bool
```

<a id="Table.Clear"></a>

```vertex
public func Clear()
```

<a id="Table.Remap"></a>

```vertex
public func Remap(_ i: int, from epoch: int) -> int
```

Remap moves an iterator's index from the epoch it saw to now.

### class WeakCollection <a id="class-WeakCollection"></a>

```vertex
public final class WeakCollection: object.JSObject
```

WeakCollection is a WeakMap or WeakSet.

TODO(gc): its keys are held strongly until the engine has a tracing
collector; then each entry becomes an ephemeron, whose value lives only
while its key does.

#### Initializers

<a id="WeakCollection.init"></a>

```vertex
public init(isMap: bool, proto: object.JSObject)
```

#### Properties

<a id="WeakCollection.Entries"></a>

```vertex
public let Entries = Table()
```

<a id="WeakCollection.IsMap"></a>

```vertex
public let IsMap: bool
```

## Files

- keyed.vs
