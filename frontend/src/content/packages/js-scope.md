# package scope

```vertex
import "js/scope"
```

Package scope is the static semantics of names (ECMA-262 §8.1, §9.1):
it builds the tree of scopes, declares every binding, resolves every
identifier, and lays the bindings out in registers and context slots.

A binding a nested function refers to is "captured": it lives in a
heap context rather than a register. So is every binding a direct eval
or a with statement could reach by name. Names nothing declares resolve
to the global object (or, inside with and after a sloppy direct eval,
to a runtime lookup by name).

## Index

- [`func Analyze(_ prog: ast.Program, mode: Mode = .script) throws -> ast.Scope`](#func-Analyze)
- [`enum Mode: Equatable`](#enum-Mode)
- [`enum ScopeError: Error, CustomStringConvertible`](#enum-ScopeError)
  - [`var Message: string { get }`](#ScopeError.Message)
  - [`var Pos: int { get }`](#ScopeError.Pos)
  - [`var description: string { get }`](#ScopeError.description)

## Functions

### func Analyze <a id="func-Analyze"></a>

```vertex
public func Analyze(_ prog: ast.Program, mode: Mode = .script) throws -> ast.Scope
```

Analyze analyzes a program and returns its top scope.

## Types

### enum Mode <a id="enum-Mode"></a>

```vertex
public enum Mode: Equatable
```

Mode is what kind of code is analyzed.

#### Cases

<a id="Mode.script"></a>

```vertex
case script
```

<a id="Mode.module"></a>

```vertex
case module
```

<a id="Mode.eval"></a>

```vertex
case eval(strict: bool)
```

eval code: strict or sloppy, and whether its var scope is a
function's (sloppy vars then go there at runtime).

### enum ScopeError <a id="enum-ScopeError"></a>

```vertex
public enum ScopeError: Error, CustomStringConvertible
```

ScopeError is an early error the analysis finds (a redeclaration).

#### Cases

<a id="ScopeError.syntax"></a>

```vertex
case syntax(message: string, pos: int)
```

#### Properties

<a id="ScopeError.Message"></a>

```vertex
public var Message: string { get }
```

<a id="ScopeError.Pos"></a>

```vertex
public var Pos: int { get }
```

<a id="ScopeError.description"></a>

```vertex
public var description: string { get }
```

## Files

- scope.vs
