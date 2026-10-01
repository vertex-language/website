# package js

```vertex
import "js"
```

Package js is the JavaScript engine's embedding API: a Runtime is an
agent with one realm, every built-in installed, that evaluates scripts
and runs their jobs. Hosts (vjs, a web view) add their own globals --
console, timers, the DOM -- on top.

## Index

- [`struct Exception: Error, CustomStringConvertible`](#struct-Exception)
  - [`init(_ v: object.Value)`](#Exception.init)
  - [`let Value: object.Value`](#Exception.Value)
  - [`var Message: string { get }`](#Exception.Message)
  - [`var Stack: string { get }`](#Exception.Stack)
  - [`var description: string { get }`](#Exception.description)
- [`final class Runtime`](#class-Runtime)
  - [`init()`](#Runtime.init)
  - [`let Agent: object.Agent`](#Runtime.Agent)
  - [`let Realm: object.Realm`](#Runtime.Realm)
  - [`let Engine: interp.Engine`](#Runtime.Engine)
  - [`var Global: object.JSObject { get }`](#Runtime.Global)
  - [`var HasJobs: bool { get }`](#Runtime.HasJobs)
  - [`func Compile(_ source: string, filename: string = "<eval>") throws -> bytecode.FunctionTemplate`](#Runtime.Compile)
  - [`func Evaluate(_ source: string, filename: string = "<eval>") throws -> object.Value`](#Runtime.Evaluate)
  - [`func RunJobs()`](#Runtime.RunJobs)
  - [`func Call(_ f: object.Value, this: object.Value = .undefined, _ args: [object.Value]) throws -> object.Value`](#Runtime.Call)
  - [`func Define(_ name: string, _ v: object.Value)`](#Runtime.Define)
  - [`func Function(_ name: string, _ length: int, _ fn: @escaping object.NativeFn) -> object.NativeFunction`](#Runtime.Function)
  - [`func DefineConsole(_ write: @escaping (string) -> Void)`](#Runtime.DefineConsole)
  - [`func StringValue(_ s: string) -> object.Value`](#Runtime.StringValue)

## Types

### struct Exception <a id="struct-Exception"></a>

```vertex
public struct Exception: Error, CustomStringConvertible
```

Exception is a JavaScript exception that reached the host: the thrown
value, and its message and stack as V8 would print them.

#### Initializers

<a id="Exception.init"></a>

```vertex
public init(_ v: object.Value)
```

#### Properties

<a id="Exception.Value"></a>

```vertex
public let Value: object.Value
```

<a id="Exception.Message"></a>

```vertex
public var Message: string { get }
```

Message is `Name: message` for an error object, or the value as a
string.

<a id="Exception.Stack"></a>

```vertex
public var Stack: string { get }
```

Stack is the error's stack property, when it has one.

<a id="Exception.description"></a>

```vertex
public var description: string { get }
```

### class Runtime <a id="class-Runtime"></a>

```vertex
public final class Runtime
```

Runtime is an agent and its realm, with the interpreter installed.

#### Initializers

<a id="Runtime.init"></a>

```vertex
public init()
```

#### Properties

<a id="Runtime.Agent"></a>

```vertex
public let Agent: object.Agent
```

<a id="Runtime.Realm"></a>

```vertex
public let Realm: object.Realm
```

<a id="Runtime.Engine"></a>

```vertex
public let Engine: interp.Engine
```

<a id="Runtime.Global"></a>

```vertex
public var Global: object.JSObject { get }
```

Global is the global object.

<a id="Runtime.HasJobs"></a>

```vertex
public var HasJobs: bool { get }
```

HasJobs says promise jobs are waiting.

#### Methods

<a id="Runtime.Compile"></a>

```vertex
public func Compile(_ source: string, filename: string = "<eval>") throws -> bytecode.FunctionTemplate
```

Compile parses and compiles a script without running it; a syntax
error is thrown as the SyntaxError object a script would see.

<a id="Runtime.Evaluate"></a>

```vertex
public func Evaluate(_ source: string, filename: string = "<eval>") throws -> object.Value
```

Evaluate runs a script and returns its completion value. It does
not run the jobs the script queued; RunJobs does.

<a id="Runtime.RunJobs"></a>

```vertex
public func RunJobs()
```

RunJobs runs promise jobs until none are left.

<a id="Runtime.Call"></a>

```vertex
public func Call(_ f: object.Value, this: object.Value = .undefined, _ args: [object.Value]) throws -> object.Value
```

Call calls a function value, turning a throw into an Exception.

<a id="Runtime.Define"></a>

```vertex
public func Define(_ name: string, _ v: object.Value)
```

Define makes a global property, as a host's globals are made:
writable, configurable, and not enumerable.

<a id="Runtime.Function"></a>

```vertex
public func Function(_ name: string, _ length: int, _ fn: @escaping object.NativeFn) -> object.NativeFunction
```

Function makes a built-in function the host implements.

<a id="Runtime.DefineConsole"></a>

```vertex
public func DefineConsole(_ write: @escaping (string) -> Void)
```

DefineConsole defines a console whose log, info, warn, error and
debug join their arguments' strings with spaces and hand the line
to write. A host decides where it goes: a terminal, a devtools pane.

<a id="Runtime.StringValue"></a>

```vertex
public func StringValue(_ s: string) -> object.Value
```

String makes a JavaScript string value.

## Files

- js.vs
