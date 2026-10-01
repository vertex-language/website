# package syntax

```vertex
import "js/regexp/syntax"
```

Package syntax parses ECMAScript regular expressions (ECMA-262 §22.2.1)
into a tree the js/regexp compiler turns into a program.

The grammar is ES2025's: named groups (duplicates in different
alternatives), lookbehind, modifiers ((?i:...)), unicode property
escapes, and the v flag's set notation. Without u or v, the Annex B
grammar applies, as every browser does: lone ] { } are characters,
\8 is 8, \12 past the last group is an octal escape, and a lookahead
may take a quantifier.

Classes are resolved here into sorted code point ranges, so the
matcher only tests membership.

## Index

- [Constants](#constants)
- [`func Parse(_ source: [uint16], _ flags: Flags) throws -> Pattern`](#func-Parse)
- [`func ParseFlags(_ f: [uint16]) -> Flags?`](#func-ParseFlags)
- [`final class CharSet`](#class-CharSet)
  - [`init(ranges: [uint32] = [], strings: [[uint32]] = [])`](#CharSet.init)
  - [`var Ranges: [uint32]`](#CharSet.Ranges)
  - [`var Strings: [[uint32]]`](#CharSet.Strings)
  - [`func Contains(_ cp: uint32) -> bool`](#CharSet.Contains)
- [`struct Flags: Equatable`](#struct-Flags)
  - [`init()`](#Flags.init)
  - [`var HasIndices: bool = false`](#Flags.HasIndices)
  - [`var Global: bool = false`](#Flags.Global)
  - [`var IgnoreCase: bool = false`](#Flags.IgnoreCase)
  - [`var Multiline: bool = false`](#Flags.Multiline)
  - [`var DotAll: bool = false`](#Flags.DotAll)
  - [`var Unicode: bool = false`](#Flags.Unicode)
  - [`var UnicodeSets: bool = false`](#Flags.UnicodeSets)
  - [`var Sticky: bool = false`](#Flags.Sticky)
  - [`var UnicodeMode: bool { get }`](#Flags.UnicodeMode)
- [`final class Node`](#class-Node)
  - [`init(_ kind: NodeKind)`](#Node.init)
  - [`let Kind: NodeKind`](#Node.Kind)
  - [`var IgnoreCase: bool = false`](#Node.IgnoreCase)
  - [`var Multiline: bool = false`](#Node.Multiline)
  - [`var DotAll: bool = false`](#Node.DotAll)
  - [`var FirstGroup: int = 0`](#Node.FirstGroup)
  - [`var LastGroup: int = -1`](#Node.LastGroup)
  - [`var Groups: [int] = []`](#Node.Groups)
- [`enum NodeKind`](#enum-NodeKind)
- [`final class Pattern`](#class-Pattern)
  - [`init(root: Node, flags: Flags, groupCount: int, groupNames: [[uint16]])`](#Pattern.init)
  - [`let Root: Node`](#Pattern.Root)
  - [`let Flags: Flags`](#Pattern.Flags)
  - [`let GroupCount: int`](#Pattern.GroupCount)
  - [`let GroupNames: [[uint16]]`](#Pattern.GroupNames)
  - [`var HasNamedGroups: bool { get }`](#Pattern.HasNamedGroups)
- [`struct SyntaxError: Error, CustomStringConvertible`](#struct-SyntaxError)
  - [`init(_ m: string)`](#SyntaxError.init)
  - [`let Message: string`](#SyntaxError.Message)
  - [`var description: string { get }`](#SyntaxError.description)

## Constants

<a id="let-MaxCodePoint"></a>

```vertex
public let MaxCodePoint: uint32 = 0x10FFFF
```

MaxCodePoint is the last code point.

## Functions

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ source: [uint16], _ flags: Flags) throws -> Pattern
```

Parse parses a pattern's source (UTF-16) under flags.

### func ParseFlags <a id="func-ParseFlags"></a>

```vertex
public func ParseFlags(_ f: [uint16]) -> Flags?
```

ParseFlags reads flag characters; nil when one is unknown, repeated,
or u and v are both given.

## Types

### class CharSet <a id="class-CharSet"></a>

```vertex
public final class CharSet
```

CharSet is a class: code points as sorted, merged ranges, flat
[first, last, first, last, ...], and, under the v flag, strings of
other than one code point (\q{abc}, \p{RGI_Emoji}).

#### Initializers

<a id="CharSet.init"></a>

```vertex
public init(ranges: [uint32] = [], strings: [[uint32]] = [])
```

#### Properties

<a id="CharSet.Ranges"></a>

```vertex
public var Ranges: [uint32]
```

<a id="CharSet.Strings"></a>

```vertex
public var Strings: [[uint32]]
```

#### Methods

<a id="CharSet.Contains"></a>

```vertex
public func Contains(_ cp: uint32) -> bool
```

### struct Flags <a id="struct-Flags"></a>

```vertex
public struct Flags: Equatable
```

Flags are a regular expression's flags.

#### Initializers

<a id="Flags.init"></a>

```vertex
public init()
```

#### Properties

<a id="Flags.HasIndices"></a>

```vertex
public var HasIndices: bool = false
```

<a id="Flags.Global"></a>

```vertex
public var Global: bool = false
```

d

<a id="Flags.IgnoreCase"></a>

```vertex
public var IgnoreCase: bool = false
```

g

<a id="Flags.Multiline"></a>

```vertex
public var Multiline: bool = false
```

i

<a id="Flags.DotAll"></a>

```vertex
public var DotAll: bool = false
```

m

<a id="Flags.Unicode"></a>

```vertex
public var Unicode: bool = false
```

s

<a id="Flags.UnicodeSets"></a>

```vertex
public var UnicodeSets: bool = false
```

u

<a id="Flags.Sticky"></a>

```vertex
public var Sticky: bool = false
```

v

<a id="Flags.UnicodeMode"></a>

```vertex
public var UnicodeMode: bool { get }
```

UnicodeMode is set by u or v: the pattern and the input are code
points, and the Annex B grammar is off.

### class Node <a id="class-Node"></a>

```vertex
public final class Node
```

Node is one part of a pattern, with the modifiers in force where it
appears (i, m and s may change inside (?ims-ims:...)).

#### Initializers

<a id="Node.init"></a>

```vertex
public init(_ kind: NodeKind)
```

#### Properties

<a id="Node.Kind"></a>

```vertex
public let Kind: NodeKind
```

<a id="Node.IgnoreCase"></a>

```vertex
public var IgnoreCase: bool = false
```

<a id="Node.Multiline"></a>

```vertex
public var Multiline: bool = false
```

<a id="Node.DotAll"></a>

```vertex
public var DotAll: bool = false
```

<a id="Node.FirstGroup"></a>

```vertex
public var FirstGroup: int = 0
```

FirstGroup and LastGroup are the captures inside a repeat, which
each iteration resets (0 and -1 when there are none).

<a id="Node.LastGroup"></a>

```vertex
public var LastGroup: int = -1
```

<a id="Node.Groups"></a>

```vertex
public var Groups: [int] = []
```

Groups are a backreference's groups.

### enum NodeKind <a id="enum-NodeKind"></a>

```vertex
public enum NodeKind
```

NodeKind is what a node matches.

#### Cases

<a id="NodeKind.empty"></a>

```vertex
case empty
```

<a id="NodeKind.char"></a>

```vertex
case char(uint32)
```

<a id="NodeKind.dot"></a>

```vertex
case dot
```

<a id="NodeKind.set"></a>

```vertex
case set(CharSet, bool)
```

<a id="NodeKind.lineStart"></a>

```vertex
case lineStart
```

the class, and whether it is negated

<a id="NodeKind.lineEnd"></a>

```vertex
case lineEnd
```

<a id="NodeKind.wordBoundary"></a>

```vertex
case wordBoundary(bool)
```

<a id="NodeKind.seq"></a>

```vertex
case seq([Node])
```

negated (\B)

<a id="NodeKind.alt"></a>

```vertex
case alt([Node])
```

<a id="NodeKind.group"></a>

```vertex
case group(Node, int)
```

<a id="NodeKind.look"></a>

```vertex
case look(Node, bool, bool)
```

a capture and its index (from 1)

<a id="NodeKind.repeatNode"></a>

```vertex
case repeatNode(Node, int, int, bool)
```

ahead, negated

<a id="NodeKind.backref"></a>

```vertex
case backref
```

min, max (-1: no limit), greedy

### class Pattern <a id="class-Pattern"></a>

```vertex
public final class Pattern
```

Pattern is a parsed regular expression.

#### Initializers

<a id="Pattern.init"></a>

```vertex
public init(root: Node, flags: Flags, groupCount: int, groupNames: [[uint16]])
```

#### Properties

<a id="Pattern.Root"></a>

```vertex
public let Root: Node
```

<a id="Pattern.Flags"></a>

```vertex
public let Flags: Flags
```

<a id="Pattern.GroupCount"></a>

```vertex
public let GroupCount: int
```

GroupCount is the number of capturing groups.

<a id="Pattern.GroupNames"></a>

```vertex
public let GroupNames: [[uint16]]
```

GroupNames is each group's name as UTF-16 (index 0 unused, empty
when unnamed).

<a id="Pattern.HasNamedGroups"></a>

```vertex
public var HasNamedGroups: bool { get }
```

HasNamedGroups says some group has a name.

### struct SyntaxError <a id="struct-SyntaxError"></a>

```vertex
public struct SyntaxError: Error, CustomStringConvertible
```

SyntaxError is an invalid pattern.

#### Initializers

<a id="SyntaxError.init"></a>

```vertex
public init(_ m: string)
```

#### Properties

<a id="SyntaxError.Message"></a>

```vertex
public let Message: string
```

<a id="SyntaxError.description"></a>

```vertex
public var description: string { get }
```

## Files

- syntax.vs
