# package dockerfile

```vertex
import "oci/dockerfile"
```

Package dockerfile reads Dockerfiles as Docker's BuildKit frontend
does: parser directives (`# escape=`), comments, line continuations,
stages (`FROM … AS name`), flags (`--from=`, `--chown=`), JSON and
shell forms, and variable substitution (`$V`, `${V}`, `${V:-default}`,
`${V:+alt}`). What the instructions do is oci/build's business.

## Index

- [`func ArgPairs(_ rest: string) -> [(string, string?)]`](#func-ArgPairs)
- [`func Expand(_ s: string, _ vars: [string: string], escape: Character = "\\") -> string`](#func-Expand)
- [`func Parse(_ text: string) throws -> Dockerfile`](#func-Parse)
- [`func SplitWords(_ s: string, escape: Character = "\\") -> [string]`](#func-SplitWords)
- [`struct Dockerfile`](#struct-Dockerfile)
  - [`var Stages: [Stage]`](#Dockerfile.Stages)
  - [`var GlobalArgs: [(string, string?)]`](#Dockerfile.GlobalArgs)
  - [`var EscapeChar: Character`](#Dockerfile.EscapeChar)
  - [`func FindStage(_ name: string) -> Stage?`](#Dockerfile.FindStage)
- [`enum DockerfileError: Error, CustomStringConvertible`](#enum-DockerfileError)
  - [`var description: string { get }`](#DockerfileError.description)
- [`struct Instruction`](#struct-Instruction)
  - [`var Command: string`](#Instruction.Command)
  - [`var Flags: [string: string]`](#Instruction.Flags)
  - [`var Rest: string`](#Instruction.Rest)
  - [`var Json: [string]?`](#Instruction.Json)
  - [`var Line: int`](#Instruction.Line)
  - [`var Words: [string] { get }`](#Instruction.Words)
- [`struct Stage`](#struct-Stage)
  - [`var Index: int`](#Stage.Index)
  - [`var Name: string`](#Stage.Name)
  - [`var From: string`](#Stage.From)
  - [`var Platform: string`](#Stage.Platform)
  - [`var Instructions: [Instruction]`](#Stage.Instructions)
  - [`var Line: int`](#Stage.Line)

## Functions

### func ArgPairs <a id="func-ArgPairs"></a>

```vertex
public func ArgPairs(_ rest: string) -> [(string, string?)]
```

`KEY=value` pairs, as ENV, LABEL and ARG write them; ENV's and
LABEL's old `KEY value` form is one pair. ARG's bare `NAME` has no
value.

### func Expand <a id="func-Expand"></a>

```vertex
public func Expand(_ s: string, _ vars: [string: string], escape: Character = "\\") -> string
```

Substitutes variables as Dockerfile instructions do: `$NAME`,
`${NAME}`, `${NAME:-default}`, `${NAME:+alternative}`; `\$` is a
dollar sign. Single-quoted text is left alone.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ text: string) throws -> Dockerfile
```

Parses `text`.

### func SplitWords <a id="func-SplitWords"></a>

```vertex
public func SplitWords(_ s: string, escape: Character = "\\") -> [string]
```

Splits as sh splits words: whitespace separates, quotes and the
escape character keep things together. Quotes are removed.

## Types

### struct Dockerfile <a id="struct-Dockerfile"></a>

```vertex
public struct Dockerfile
```

A parsed Dockerfile.

#### Properties

<a id="Dockerfile.Stages"></a>

```vertex
public var Stages: [Stage]
```

<a id="Dockerfile.GlobalArgs"></a>

```vertex
public var GlobalArgs: [(string, string?)]
```

ARGs before the first FROM: name and default (nil without one).

<a id="Dockerfile.EscapeChar"></a>

```vertex
public var EscapeChar: Character
```

#### Methods

<a id="Dockerfile.FindStage"></a>

```vertex
public func FindStage(_ name: string) -> Stage?
```

The stage named `name` (case-insensitive) or numbered by it.

### enum DockerfileError <a id="enum-DockerfileError"></a>

```vertex
public enum DockerfileError: Error, CustomStringConvertible
```

#### Cases

<a id="DockerfileError.syntax"></a>

```vertex
case syntax(line: int, message: string)
```

<a id="DockerfileError.noFrom"></a>

```vertex
case noFrom
```

#### Properties

<a id="DockerfileError.description"></a>

```vertex
public var description: string { get }
```

### struct Instruction <a id="struct-Instruction"></a>

```vertex
public struct Instruction
```

One instruction, as written.

#### Properties

<a id="Instruction.Command"></a>

```vertex
public var Command: string
```

Upper case: "RUN", "COPY".

<a id="Instruction.Flags"></a>

```vertex
public var Flags: [string: string]
```

`--name=value` flags before the arguments.

<a id="Instruction.Rest"></a>

```vertex
public var Rest: string
```

What follows the command and flags, continuations joined.

<a id="Instruction.Json"></a>

```vertex
public var Json: [string]?
```

The JSON form's array, when it was written as one.

<a id="Instruction.Line"></a>

```vertex
public var Line: int
```

The line it starts on, from 1.

<a id="Instruction.Words"></a>

```vertex
public var Words: [string] { get }
```

The arguments as words: the JSON array, or the rest split as a
shell splits it (quotes kept together, not expanded).

### struct Stage <a id="struct-Stage"></a>

```vertex
public struct Stage
```

A FROM and what follows it, up to the next FROM.

#### Properties

<a id="Stage.Index"></a>

```vertex
public var Index: int
```

<a id="Stage.Name"></a>

```vertex
public var Name: string
```

`AS name`, lower case; "" when unnamed.

<a id="Stage.From"></a>

```vertex
public var From: string
```

The image, unexpanded: "alpine:${VERSION}".

<a id="Stage.Platform"></a>

```vertex
public var Platform: string
```

`--platform=`, unexpanded.

<a id="Stage.Instructions"></a>

```vertex
public var Instructions: [Instruction]
```

<a id="Stage.Line"></a>

```vertex
public var Line: int
```

## Files

- dockerfile.vs
