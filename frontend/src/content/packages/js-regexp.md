# package regexp

```vertex
import "js/regexp"
```

Package regexp compiles a js/regexp/syntax tree to a program for a
backtracking matcher over UTF-16 code units, with the semantics of
ECMA-262 §22.2.2: captures reset on each iteration of a quantifier, an
iteration past the minimum may not match empty, lookbehind matches
right to left, and case-insensitive matching compares Canonicalize(ch)
-- simple case folding under u or v, and toUpperCase otherwise.

The matcher keeps its own backtrack stack rather than recursing, so a
long input cannot overflow the native stack. Every capture or register
write pushes its old value, and backtracking undoes them in order.

## Index

- [`final class Program`](#class-Program)
  - [`let Pattern: syntax.Pattern`](#Program.Pattern)
  - [`var GroupCount: int { get }`](#Program.GroupCount)
  - [`var Flags: syntax.Flags { get }`](#Program.Flags)
  - [`var GroupNames: [[uint16]] { get }`](#Program.GroupNames)
  - [`static func Compile(_ source: [uint16], _ flags: syntax.Flags) throws -> Program`](#Program.Compile)
  - [`func Exec(_ input: [uint16], _ start: int) -> [int]?`](#Program.Exec)

## Types

### class Program <a id="class-Program"></a>

```vertex
public final class Program
```

Program is a compiled regular expression.

#### Properties

<a id="Program.Pattern"></a>

```vertex
public let Pattern: syntax.Pattern
```

<a id="Program.GroupCount"></a>

```vertex
public var GroupCount: int { get }
```

<a id="Program.Flags"></a>

```vertex
public var Flags: syntax.Flags { get }
```

<a id="Program.GroupNames"></a>

```vertex
public var GroupNames: [[uint16]] { get }
```

#### Methods

<a id="Program.Compile"></a>

```vertex
public static func Compile(_ source: [uint16], _ flags: syntax.Flags) throws -> Program
```

Compile parses and compiles a pattern; a syntax.SyntaxError for an
invalid one.

<a id="Program.Exec"></a>

```vertex
public func Exec(_ input: [uint16], _ start: int) -> [int]?
```

Exec finds the first match at or after start (only at start when
sticky). The result is the captures' [start, end] pairs, -1 for
one that did not participate; nil when there is no match.

## Files

- regexp.vs
