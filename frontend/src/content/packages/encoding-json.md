# package json

```vertex
import "encoding/json"
```

Package json parses JSON (RFC 8259) into a document of Values and
writes one back out.

A number keeps its literal text, so an int64 file size or a uint64 id
survives exactly; Int, UInt and Double read it as the type asked for.
An object keeps its keys in document order.

## Index

- [`func Encode(_ v: Value, indent: string = "") -> string`](#func-Encode)
- [`func Parse(_ text: string) throws -> Value`](#func-Parse)
- [`func Parse(bytes: [uint8]) throws -> Value`](#func-Parse-2)
- [`func Quote(_ s: string) -> string`](#func-Quote)
- [`struct Object: Equatable`](#struct-Object)
  - [`init()`](#Object.init)
  - [`var Keys: [string] = []`](#Object.Keys)
  - [`var Count: int { get }`](#Object.Count)
  - [`subscript(key: string) -> Value? { get set }`](#Object.subscript)
  - [`var Members: [(string, Value)] { get }`](#Object.Members)
- [`struct ParseError: Error, CustomStringConvertible`](#struct-ParseError)
  - [`init(_ message: string, at offset: int)`](#ParseError.init)
  - [`let Message: string`](#ParseError.Message)
  - [`let Offset: int`](#ParseError.Offset)
  - [`var description: string { get }`](#ParseError.description)
- [`enum Value: Equatable`](#enum-Value)
  - [`subscript(key: string) -> Value? { get }`](#Value.subscript)
  - [`subscript(index: int) -> Value? { get }`](#Value.subscript-2)
  - [`var IsNull: bool { get }`](#Value.IsNull)
  - [`var Bool: bool? { get }`](#Value.Bool)
  - [`var String: string? { get }`](#Value.String)
  - [`var Int: int64? { get }`](#Value.Int)
  - [`var UInt: uint64? { get }`](#Value.UInt)
  - [`var Double: float64? { get }`](#Value.Double)
  - [`var Array: [Value]? { get }`](#Value.Array)
  - [`var Object: Object? { get }`](#Value.Object)
  - [`var Count: int { get }`](#Value.Count)

## Functions

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ v: Value, indent: string = "") -> string
```

Encode writes v as JSON text. With an indent ("  ", "\t") each member
and element goes on its own line; without one the text is compact.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ text: string) throws -> Value
```

Parse reads one JSON document from text. Whitespace may surround it;
anything else after it is an error.

### func Parse <a id="func-Parse-2"></a>

```vertex
public func Parse(bytes: [uint8]) throws -> Value
```

Parse reads one JSON document from UTF-8 bytes.

### func Quote <a id="func-Quote"></a>

```vertex
public func Quote(_ s: string) -> string
```

Quote writes s as a JSON string literal, quotes included.

## Types

### struct Object <a id="struct-Object"></a>

```vertex
public struct Object: Equatable
```

Object is a JSON object: members in document order, looked up by key.
A repeated key keeps its last value, in its first position.

#### Initializers

<a id="Object.init"></a>

```vertex
public init()
```

#### Properties

<a id="Object.Keys"></a>

```vertex
public var Keys: [string] = []
```

<a id="Object.Count"></a>

```vertex
public var Count: int { get }
```

<a id="Object.subscript"></a>

```vertex
public subscript(key: string) -> Value? { get set }
```

<a id="Object.Members"></a>

```vertex
public var Members: [(string, Value)] { get }
```

The members in document order.

### struct ParseError <a id="struct-ParseError"></a>

```vertex
public struct ParseError: Error, CustomStringConvertible
```

ParseError says what was wrong and at which byte offset.

#### Initializers

<a id="ParseError.init"></a>

```vertex
public init(_ message: string, at offset: int)
```

#### Properties

<a id="ParseError.Message"></a>

```vertex
public let Message: string
```

<a id="ParseError.Offset"></a>

```vertex
public let Offset: int
```

<a id="ParseError.description"></a>

```vertex
public var description: string { get }
```

### enum Value <a id="enum-Value"></a>

```vertex
public enum Value: Equatable
```

Value is one JSON value.

#### Cases

<a id="Value.null"></a>

```vertex
case null
```

<a id="Value.bool"></a>

```vertex
case bool(bool)
```

<a id="Value.number"></a>

```vertex
case number(string)
```

The number as written, e.g. "-12", "3.5e10".

<a id="Value.string"></a>

```vertex
case string(string)
```

<a id="Value.array"></a>

```vertex
case array([Value])
```

<a id="Value.object"></a>

```vertex
case object(Object)
```

#### Properties

<a id="Value.subscript"></a>

```vertex
public subscript(key: string) -> Value? { get }
```

The member `key` of an object; nil for a missing key or a non-object.

<a id="Value.subscript-2"></a>

```vertex
public subscript(index: int) -> Value? { get }
```

The element `index` of an array; nil when out of range or not an array.

<a id="Value.IsNull"></a>

```vertex
public var IsNull: bool { get }
```

<a id="Value.Bool"></a>

```vertex
public var Bool: bool? { get }
```

<a id="Value.String"></a>

```vertex
public var String: string? { get }
```

<a id="Value.Int"></a>

```vertex
public var Int: int64? { get }
```

The number as an int64, when it is an integer that fits.

<a id="Value.UInt"></a>

```vertex
public var UInt: uint64? { get }
```

The number as a uint64, when it is a non-negative integer that fits.

<a id="Value.Double"></a>

```vertex
public var Double: float64? { get }
```

<a id="Value.Array"></a>

```vertex
public var Array: [Value]? { get }
```

<a id="Value.Object"></a>

```vertex
public var Object: Object? { get }
```

<a id="Value.Count"></a>

```vertex
public var Count: int { get }
```

The number of elements or members; 0 for anything else.

## Files

- encode.vs
- parse.vs
- value.vs
