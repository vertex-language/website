# package text

```vertex
import "js/builtin/text"
```

Package text installs text processing (ECMA-262 §22): String, the
String Iterator, and RegExp.

## Index

- [`func GetSubstitution(_ matched: str.JSString, _ s: str.JSString, _ position: int, _ captures: [Value], _ namedCaptures: object.JSObject?, _ template: str.JSString) -> str.JSString`](#func-GetSubstitution)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func IsRegExp(_ v: Value) throws -> bool`](#func-IsRegExp)
- [`func LocaleCompare(_ a: str.JSString, _ b: str.JSString) -> int`](#func-LocaleCompare)
- [`final class RegExpObject: object.JSObject`](#class-RegExpObject)
  - [`override init(proto: object.JSObject?)`](#RegExpObject.init)
  - [`var Source: str.JSString = str.JSString.Empty`](#RegExpObject.Source)
  - [`var FlagText: str.JSString = str.JSString.Empty`](#RegExpObject.FlagText)
  - [`var Program: regexp.Program? = nil`](#RegExpObject.Program)
- [`final class StringIterator: object.JSObject`](#class-StringIterator)
  - [`init(_ s: str.JSString, proto: object.JSObject)`](#StringIterator.init)
  - [`var Iterated: [uint16]?`](#StringIterator.Iterated)
  - [`var Position: int = 0`](#StringIterator.Position)

## Functions

### func GetSubstitution <a id="func-GetSubstitution"></a>

```vertex
public func GetSubstitution(_ matched: str.JSString, _ s: str.JSString, _ position: int, _ captures: [Value], _ namedCaptures: object.JSObject?, _ template: str.JSString) -> str.JSString
```

GetSubstitution (§22.1.3.19.1): the replacement template's $
patterns. captures are the groups (undefined for unmatched), and
namedCaptures the groups object, when the pattern has names.

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines String and RegExp.

### func IsRegExp <a id="func-IsRegExp"></a>

```vertex
public func IsRegExp(_ v: Value) throws -> bool
```

IsRegExp (§7.2.6).

### func LocaleCompare <a id="func-LocaleCompare"></a>

```vertex
public func LocaleCompare(_ a: str.JSString, _ b: str.JSString) -> int
```

LocaleCompare orders strings roughly as ICU's root collation does for
Latin text: letters compared without accents or case first, then
accents, then lowercase before uppercase, then code units.

## Types

### class RegExpObject <a id="class-RegExpObject"></a>

```vertex
public final class RegExpObject: object.JSObject
```

RegExpObject is a RegExp instance: its [[OriginalSource]],
[[OriginalFlags]] and [[RegExpMatcher]].

#### Initializers

<a id="RegExpObject.init"></a>

```vertex
public override init(proto: object.JSObject?)
```

#### Properties

<a id="RegExpObject.Source"></a>

```vertex
public var Source: str.JSString = str.JSString.Empty
```

<a id="RegExpObject.FlagText"></a>

```vertex
public var FlagText: str.JSString = str.JSString.Empty
```

<a id="RegExpObject.Program"></a>

```vertex
public var Program: regexp.Program? = nil
```

### class StringIterator <a id="class-StringIterator"></a>

```vertex
public final class StringIterator: object.JSObject
```

#### Initializers

<a id="StringIterator.init"></a>

```vertex
public init(_ s: str.JSString, proto: object.JSObject)
```

#### Properties

<a id="StringIterator.Iterated"></a>

```vertex
public var Iterated: [uint16]?
```

<a id="StringIterator.Position"></a>

```vertex
public var Position: int = 0
```

## Files

- regexp.vs
- text.vs
