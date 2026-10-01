# package control

```vertex
import "js/builtin/control"
```

Package control installs the control abstraction objects (ECMA-262
§27): Iterator and its helpers, %AsyncIteratorPrototype%, Promise,
and the GeneratorFunction, AsyncGeneratorFunction and AsyncFunction
constructors. The generator prototypes' next/return/throw are the
interpreter's, beside the frames they resume.

## Index

- [`func Install(_ r: object.Realm)`](#func-Install)
- [`final class IteratorHelper: object.JSObject`](#class-IteratorHelper)
  - [`init(_ underlying: object.IteratorRecord, proto: object.JSObject, _ step: @escaping () throws -> Value?)`](#IteratorHelper.init)
  - [`let Underlying: object.IteratorRecord`](#IteratorHelper.Underlying)
  - [`var Running: bool = false`](#IteratorHelper.Running)
  - [`var Done: bool = false`](#IteratorHelper.Done)
  - [`var Started: bool = false`](#IteratorHelper.Started)
  - [`func Next() throws -> Value?`](#IteratorHelper.Next)
- [`final class WrappedIterator: object.JSObject`](#class-WrappedIterator)
  - [`init(_ it: object.IteratorRecord, proto: object.JSObject)`](#WrappedIterator.init)
  - [`let Iterated: object.IteratorRecord`](#WrappedIterator.Iterated)

## Functions

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines the control abstraction objects.

## Types

### class IteratorHelper <a id="class-IteratorHelper"></a>

```vertex
public final class IteratorHelper: object.JSObject
```

IteratorHelper is an Iterator Helper object (§27.1.2.1): its steps
are a Vertex closure over the underlying iterator.

#### Initializers

<a id="IteratorHelper.init"></a>

```vertex
public init(_ underlying: object.IteratorRecord, proto: object.JSObject, _ step: @escaping () throws -> Value?)
```

#### Properties

<a id="IteratorHelper.Underlying"></a>

```vertex
public let Underlying: object.IteratorRecord
```

<a id="IteratorHelper.Running"></a>

```vertex
public var Running: bool = false
```

<a id="IteratorHelper.Done"></a>

```vertex
public var Done: bool = false
```

<a id="IteratorHelper.Started"></a>

```vertex
public var Started: bool = false
```

#### Methods

<a id="IteratorHelper.Next"></a>

```vertex
public func Next() throws -> Value?
```

### class WrappedIterator <a id="class-WrappedIterator"></a>

```vertex
public final class WrappedIterator: object.JSObject
```

WrappedIterator is Iterator.from's wrapper (§27.1.3.2.1.1).

#### Initializers

<a id="WrappedIterator.init"></a>

```vertex
public init(_ it: object.IteratorRecord, proto: object.JSObject)
```

#### Properties

<a id="WrappedIterator.Iterated"></a>

```vertex
public let Iterated: object.IteratorRecord
```

## Files

- control.vs
- dispose.vs
