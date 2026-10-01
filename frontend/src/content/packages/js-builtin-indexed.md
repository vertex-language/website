# package indexed

```vertex
import "js/builtin/indexed"
```

Package indexed installs the indexed collections' Array (ECMA-262
§23.1) and %ArrayIteratorPrototype%. Typed arrays live in structured.

## Index

- [Variables](#variables)
- [`func CreateArrayIterator(_ r: object.Realm, _ o: object.JSObject, _ kind: IterationKind) -> ArrayIterator`](#func-CreateArrayIterator)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func sortValues(_ items: [Value], _ cmp: Value) throws -> [Value]`](#func-sortValues)
- [`final class ArrayIterator: object.JSObject`](#class-ArrayIterator)
  - [`init(_ o: object.JSObject, _ kind: IterationKind, proto: object.JSObject)`](#ArrayIterator.init)
  - [`var Iterated: object.JSObject?`](#ArrayIterator.Iterated)
  - [`var Index: int = 0`](#ArrayIterator.Index)
  - [`let Mode: IterationKind`](#ArrayIterator.Mode)
- [`enum IterationKind`](#enum-IterationKind)

## Variables

<a id="var-TypedArrayLength"></a>

```vertex
public var TypedArrayLength: ((object.JSObject) throws -> int)? = nil
```

TypedArrayLength is set by the structured package: a typed array's
length for the array iterator, which throws when it is out of bounds.

## Functions

### func CreateArrayIterator <a id="func-CreateArrayIterator"></a>

```vertex
public func CreateArrayIterator(_ r: object.Realm, _ o: object.JSObject, _ kind: IterationKind) -> ArrayIterator
```

CreateArrayIterator (§23.1.5.1).

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines Array and %ArrayIteratorPrototype%.

### func sortValues <a id="func-sortValues"></a>

```vertex
public func sortValues(_ items: [Value], _ cmp: Value) throws -> [Value]
```

sortValues is SortIndexedProperties' ordering: a stable merge sort
with undefined last, as V8's TimSort orders a consistent comparator.

## Types

### class ArrayIterator <a id="class-ArrayIterator"></a>

```vertex
public final class ArrayIterator: object.JSObject
```

ArrayIterator is an Array Iterator object: it walks any array-like,
typed arrays included.

#### Initializers

<a id="ArrayIterator.init"></a>

```vertex
public init(_ o: object.JSObject, _ kind: IterationKind, proto: object.JSObject)
```

#### Properties

<a id="ArrayIterator.Iterated"></a>

```vertex
public var Iterated: object.JSObject?
```

<a id="ArrayIterator.Index"></a>

```vertex
public var Index: int = 0
```

<a id="ArrayIterator.Mode"></a>

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

## Files

- indexed.vs
