# package codegen

```vertex
import "js/codegen"
```

Package codegen compiles a js/ast tree, after js/scope has analyzed it,
into js/bytecode functions.

Each function is compiled by a Builder. Expressions leave their value
in the accumulator; registers hold locals (numbered by js/scope) and
temporaries above them. Structured control flow that leaves a scope --
break, continue and return -- unwinds through a control stack: popping
contexts, closing iterators, and running finally blocks, which receive
the pending completion in a pair of registers.

## Index

- [`func Compile(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate`](#func-Compile)
- [`func CompileEval(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate`](#func-CompileEval)
- [`func CompileScript(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate`](#func-CompileScript)
- [`enum CompileError: Error, CustomStringConvertible`](#enum-CompileError)
  - [`var Message: string { get }`](#CompileError.Message)
  - [`var Pos: int { get }`](#CompileError.Pos)
  - [`var description: string { get }`](#CompileError.description)
- [`enum ControlKind: Equatable`](#enum-ControlKind)

## Functions

### func Compile <a id="func-Compile"></a>

```vertex
public func Compile(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate
```

Parse, analyze and compile a script in one step.

### func CompileEval <a id="func-CompileEval"></a>

```vertex
public func CompileEval(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate
```

CompileEval compiles eval code. A sloppy eval's vars and functions are
declared in the caller's var scope at runtime.

### func CompileScript <a id="func-CompileScript"></a>

```vertex
public func CompileScript(_ prog: ast.Program, source: bytecode.SourceText) throws -> bytecode.FunctionTemplate
```

CompileScript compiles an analyzed script into its top-level function.

## Types

### enum CompileError <a id="enum-CompileError"></a>

```vertex
public enum CompileError: Error, CustomStringConvertible
```

CompileError is a problem found while compiling (an early error the
parser leaves to the compiler, or a construct not supported).

#### Cases

<a id="CompileError.syntax"></a>

```vertex
case syntax(message: string, pos: int)
```

#### Properties

<a id="CompileError.Message"></a>

```vertex
public var Message: string { get }
```

<a id="CompileError.Pos"></a>

```vertex
public var Pos: int { get }
```

<a id="CompileError.description"></a>

```vertex
public var description: string { get }
```

### enum ControlKind <a id="enum-ControlKind"></a>

```vertex
public enum ControlKind: Equatable
```

#### Cases

<a id="ControlKind.loop"></a>

```vertex
case loop
```

<a id="ControlKind.switchBlock"></a>

```vertex
case switchBlock
```

<a id="ControlKind.labeled"></a>

```vertex
case labeled
```

<a id="ControlKind.finallyBlock"></a>

```vertex
case finallyBlock
```

<a id="ControlKind.context"></a>

```vertex
case context
```

<a id="ControlKind.iterator"></a>

```vertex
case iterator
```

<a id="ControlKind.asyncIterator"></a>

```vertex
case asyncIterator
```

## Files

- class.vs
- codegen.vs
- expr.vs
- pattern.vs
- stmt.vs
