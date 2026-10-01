# package interp

```vertex
import "js/interp"
```

Package interp runs js/bytecode: the Engine behind every realm's
ECMAScript function objects.

A call runs a Frame: registers, an accumulator, the current context and
the program counter. Generators and async functions keep their frame
when they suspend at a yield or an await, and resume it later; the
frame is all the state there is.

## Index

- [`final class Engine: object.Engine`](#class-Engine)
  - [`init()`](#Engine.init)
  - [`var MaxDepth: int = 10000`](#Engine.MaxDepth)
  - [`var StackLimit: int = 1 << 20`](#Engine.StackLimit)
  - [`func CallFunction(_ fn: object.JSFunction, _ this: Value, _ args: [Value]) throws -> Value`](#Engine.CallFunction)
  - [`func ConstructFunction(_ fn: object.JSFunction, _ args: [Value], _ newTarget: object.JSObject) throws -> Value`](#Engine.ConstructFunction)
  - [`func StackTrace() -> string`](#Engine.StackTrace)
  - [`func RunScript(_ t: bytecode.FunctionTemplate, realm: object.Realm) throws -> Value`](#Engine.RunScript)
  - [`func Install(_ r: object.Realm)`](#Engine.Install)
  - [`func IndirectEval(_ realm: object.Realm, _ src: str.JSString) throws -> Value`](#Engine.IndirectEval)
  - [`func CreateDynamicFunction(_ realm: object.Realm, _ args: [Value], _ newTarget: object.JSObject?, isAsync: bool, isGenerator: bool) throws -> object.JSObject`](#Engine.CreateDynamicFunction)

## Types

### class Engine <a id="class-Engine"></a>

```vertex
public final class Engine: object.Engine
```

Engine runs bytecode for every realm of an agent.

#### Initializers

<a id="Engine.init"></a>

```vertex
public init()
```

#### Properties

<a id="Engine.MaxDepth"></a>

```vertex
public var MaxDepth: int = 10000
```

MaxDepth bounds JavaScript call depth ("Maximum call stack size exceeded").

<a id="Engine.StackLimit"></a>

```vertex
public var StackLimit: int = 1 << 20
```

StackLimit bounds the native stack, in bytes, the engine uses below
where it was entered. JavaScript-to-JavaScript calls use none; a
built-in calling back into JavaScript uses a few kilobytes. A host
running the engine on a thread with a small stack lowers it; one on
a main thread's 8 MB can raise it.

#### Methods

<a id="Engine.CallFunction"></a>

```vertex
public func CallFunction(_ fn: object.JSFunction, _ this: Value, _ args: [Value]) throws -> Value
```

<a id="Engine.ConstructFunction"></a>

```vertex
public func ConstructFunction(_ fn: object.JSFunction, _ args: [Value], _ newTarget: object.JSObject) throws -> Value
```

<a id="Engine.StackTrace"></a>

```vertex
public func StackTrace() -> string
```

<a id="Engine.RunScript"></a>

```vertex
public func RunScript(_ t: bytecode.FunctionTemplate, realm: object.Realm) throws -> Value
```

RunScript compiles nothing: it runs a compiled script's template in a realm.

<a id="Engine.Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install gives a realm the methods that run generators, async
generators and async-from-sync iterators, which live here beside
the frames they resume.

<a id="Engine.IndirectEval"></a>

```vertex
public func IndirectEval(_ realm: object.Realm, _ src: str.JSString) throws -> Value
```

<a id="Engine.CreateDynamicFunction"></a>

```vertex
public func CreateDynamicFunction(_ realm: object.Realm, _ args: [Value], _ newTarget: object.JSObject?, isAsync: bool, isGenerator: bool) throws -> object.JSObject
```

## Files

- exec.vs
- generator.vs
- interp.vs
- names.vs
