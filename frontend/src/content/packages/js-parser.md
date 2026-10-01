# package parser

```vertex
import "js/parser"
```

Package parser builds a js/ast tree from source text (ECMA-262 §13–§16).

It is a recursive-descent parser over js/scanner's tokens. Arrow
parameters and destructuring assignment are parsed first as expressions
(the spec's cover grammars) and converted to patterns when the "=>" or
"=" that follows says what they were.

## Index

- [`func Parse(_ source: string, filename: string, options: Options) throws -> ast.Program`](#func-Parse)
- [`func ParseFunctionParts(params: string, body: string, isAsync: bool, isGenerator: bool) throws -> ast.FunctionNode`](#func-ParseFunctionParts)
- [`func ParseModule(_ source: string, filename: string = "") throws -> ast.Program`](#func-ParseModule)
- [`func ParseScript(_ source: string, filename: string = "") throws -> ast.Program`](#func-ParseScript)
- [`struct Options`](#struct-Options)
  - [`init()`](#Options.init)
  - [`var Module: bool = false`](#Options.Module)
  - [`var Strict: bool = false`](#Options.Strict)
  - [`var InFunction: bool = false`](#Options.InFunction)
  - [`var AllowNewTarget: bool = false`](#Options.AllowNewTarget)
  - [`var AllowSuperProperty: bool = false`](#Options.AllowSuperProperty)
  - [`var AllowSuperCall: bool = false`](#Options.AllowSuperCall)
  - [`var AllowArguments: bool = true`](#Options.AllowArguments)
  - [`var PrivateNames: [string] = []`](#Options.PrivateNames)
- [`enum ParseError: Error, CustomStringConvertible`](#enum-ParseError)
  - [`var Message: string { get }`](#ParseError.Message)
  - [`var Pos: int { get }`](#ParseError.Pos)
  - [`var Line: int { get }`](#ParseError.Line)
  - [`var description: string { get }`](#ParseError.description)

## Functions

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ source: string, filename: string, options: Options) throws -> ast.Program
```

Parse parses a program with options.

### func ParseFunctionParts <a id="func-ParseFunctionParts"></a>

```vertex
public func ParseFunctionParts(params: string, body: string, isAsync: bool, isGenerator: bool) throws -> ast.FunctionNode
```

ParseFunctionParts parses the parameter list and body text given to
the Function constructor, as the spec does: each on its own.

### func ParseModule <a id="func-ParseModule"></a>

```vertex
public func ParseModule(_ source: string, filename: string = "") throws -> ast.Program
```

ParseModule parses a module: strict, with import and export.

### func ParseScript <a id="func-ParseScript"></a>

```vertex
public func ParseScript(_ source: string, filename: string = "") throws -> ast.Program
```

ParseScript parses a script.

## Types

### struct Options <a id="struct-Options"></a>

```vertex
public struct Options
```

Options adjusts what a parse accepts.

#### Initializers

<a id="Options.init"></a>

```vertex
public init()
```

#### Properties

<a id="Options.Module"></a>

```vertex
public var Module: bool = false
```

<a id="Options.Strict"></a>

```vertex
public var Strict: bool = false
```

<a id="Options.InFunction"></a>

```vertex
public var InFunction: bool = false
```

Function-body contexts, for eval and new Function.

<a id="Options.AllowNewTarget"></a>

```vertex
public var AllowNewTarget: bool = false
```

<a id="Options.AllowSuperProperty"></a>

```vertex
public var AllowSuperProperty: bool = false
```

<a id="Options.AllowSuperCall"></a>

```vertex
public var AllowSuperCall: bool = false
```

<a id="Options.AllowArguments"></a>

```vertex
public var AllowArguments: bool = true
```

<a id="Options.PrivateNames"></a>

```vertex
public var PrivateNames: [string] = []
```

PrivateNames are the private names in scope, for eval inside a class.

### enum ParseError <a id="enum-ParseError"></a>

```vertex
public enum ParseError: Error, CustomStringConvertible
```

ParseError is a syntax error: a message, and where.

#### Cases

<a id="ParseError.syntax"></a>

```vertex
case syntax(message: string, pos: int, line: int)
```

#### Properties

<a id="ParseError.Message"></a>

```vertex
public var Message: string { get }
```

<a id="ParseError.Pos"></a>

```vertex
public var Pos: int { get }
```

<a id="ParseError.Line"></a>

```vertex
public var Line: int { get }
```

<a id="ParseError.description"></a>

```vertex
public var description: string { get }
```

## Files

- parser.vs
