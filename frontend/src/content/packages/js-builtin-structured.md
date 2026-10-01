# package structured

```vertex
import "js/builtin/structured"
```

Package structured installs structured data (ECMA-262 §25): JSON,
ArrayBuffer, SharedArrayBuffer, DataView, the typed arrays and Atomics.

## Index

- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func Quote(_ s: str.JSString, _ out: inout str.Builder)`](#func-Quote)
- [`func Stringify(_ r: object.Realm, _ v: Value, _ replacerV: Value, _ spaceV: Value) throws -> str.JSString?`](#func-Stringify)
- [`final class ArrayBufferObject: object.JSObject`](#class-ArrayBufferObject)
  - [`init(proto: object.JSObject?, length: int, shared: bool)`](#ArrayBufferObject.init)
  - [`var Data: [uint8] = []`](#ArrayBufferObject.Data)
  - [`var Detached: bool = false`](#ArrayBufferObject.Detached)
  - [`var MaxByteLength: int = -1`](#ArrayBufferObject.MaxByteLength)
  - [`var Shared: bool = false`](#ArrayBufferObject.Shared)
  - [`var ByteLength: int { get }`](#ArrayBufferObject.ByteLength)
  - [`var IsFixedLength: bool { get }`](#ArrayBufferObject.IsFixedLength)
- [`final class DataViewObject: object.JSObject`](#class-DataViewObject)
  - [`init(proto: object.JSObject?, buffer: ArrayBufferObject)`](#DataViewObject.init)
  - [`var Buffer: ArrayBufferObject`](#DataViewObject.Buffer)
  - [`var ByteOffset: int = 0`](#DataViewObject.ByteOffset)
  - [`var FixedLength: int = -1`](#DataViewObject.FixedLength)
  - [`var IsOutOfBounds: bool { get }`](#DataViewObject.IsOutOfBounds)
  - [`var ViewByteLength: int { get }`](#DataViewObject.ViewByteLength)
- [`enum ElementType: Equatable`](#enum-ElementType)
  - [`var Size: int { get }`](#ElementType.Size)
  - [`var IsBigInt: bool { get }`](#ElementType.IsBigInt)
  - [`var Name: string { get }`](#ElementType.Name)
- [`final class RawJSON: object.JSObject`](#class-RawJSON)
  - [`init(_ text: str.JSString)`](#RawJSON.init)
  - [`let Text: str.JSString`](#RawJSON.Text)
- [`final class TypedArrayObject: object.JSObject`](#class-TypedArrayObject)
  - [`init(proto: object.JSObject?, type: ElementType, buffer: ArrayBufferObject)`](#TypedArrayObject.init)
  - [`var Buffer: ArrayBufferObject`](#TypedArrayObject.Buffer)
  - [`var ByteOffset: int = 0`](#TypedArrayObject.ByteOffset)
  - [`var FixedLength: int = -1`](#TypedArrayObject.FixedLength)
  - [`let Type: ElementType`](#TypedArrayObject.Type)
  - [`override var isOrdinaryLookup: bool { get }`](#TypedArrayObject.isOrdinaryLookup)
  - [`var IsOutOfBounds: bool { get }`](#TypedArrayObject.IsOutOfBounds)
  - [`var Length: int { get }`](#TypedArrayObject.Length)
  - [`var ByteLength: int { get }`](#TypedArrayObject.ByteLength)
  - [`func GetElement(_ i: int) -> Value`](#TypedArrayObject.GetElement)
  - [`func SetElement(_ i: int, _ v: Value)`](#TypedArrayObject.SetElement)
  - [`override func GetOwnProperty(_ key: value.PropertyKey) throws -> object.PropertyDescriptor?`](#TypedArrayObject.GetOwnProperty)
  - [`override func HasProperty(_ key: value.PropertyKey) throws -> bool`](#TypedArrayObject.HasProperty)
  - [`override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: object.PropertyDescriptor) throws -> bool`](#TypedArrayObject.DefineOwnProperty)
  - [`override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#TypedArrayObject.Get)
  - [`override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#TypedArrayObject.Set)
  - [`override func Delete(_ key: value.PropertyKey) throws -> bool`](#TypedArrayObject.Delete)
  - [`override func OwnPropertyKeys() throws -> [value.PropertyKey]`](#TypedArrayObject.OwnPropertyKeys)

## Functions

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines JSON and the buffers.

### func Quote <a id="func-Quote"></a>

```vertex
public func Quote(_ s: str.JSString, _ out: inout str.Builder)
```

Quote is QuoteJSONString (§25.5.2.3).

### func Stringify <a id="func-Stringify"></a>

```vertex
public func Stringify(_ r: object.Realm, _ v: Value, _ replacerV: Value, _ spaceV: Value) throws -> str.JSString?
```

Stringify is JSON.stringify(value, replacer, space), or nil for
undefined.

## Types

### class ArrayBufferObject <a id="class-ArrayBufferObject"></a>

```vertex
public final class ArrayBufferObject: object.JSObject
```

ArrayBufferObject is an ArrayBuffer or a SharedArrayBuffer.

#### Initializers

<a id="ArrayBufferObject.init"></a>

```vertex
public init(proto: object.JSObject?, length: int, shared: bool)
```

#### Properties

<a id="ArrayBufferObject.Data"></a>

```vertex
public var Data: [uint8] = []
```

<a id="ArrayBufferObject.Detached"></a>

```vertex
public var Detached: bool = false
```

<a id="ArrayBufferObject.MaxByteLength"></a>

```vertex
public var MaxByteLength: int = -1
```

MaxByteLength is a resizable (or growable) buffer's limit; -1 for a
fixed-length one.

<a id="ArrayBufferObject.Shared"></a>

```vertex
public var Shared: bool = false
```

<a id="ArrayBufferObject.ByteLength"></a>

```vertex
public var ByteLength: int { get }
```

<a id="ArrayBufferObject.IsFixedLength"></a>

```vertex
public var IsFixedLength: bool { get }
```

### class DataViewObject <a id="class-DataViewObject"></a>

```vertex
public final class DataViewObject: object.JSObject
```

#### Initializers

<a id="DataViewObject.init"></a>

```vertex
public init(proto: object.JSObject?, buffer: ArrayBufferObject)
```

#### Properties

<a id="DataViewObject.Buffer"></a>

```vertex
public var Buffer: ArrayBufferObject
```

<a id="DataViewObject.ByteOffset"></a>

```vertex
public var ByteOffset: int = 0
```

<a id="DataViewObject.FixedLength"></a>

```vertex
public var FixedLength: int = -1
```

FixedLength is -1 for a view tracking a resizable buffer's length.

<a id="DataViewObject.IsOutOfBounds"></a>

```vertex
public var IsOutOfBounds: bool { get }
```

<a id="DataViewObject.ViewByteLength"></a>

```vertex
public var ViewByteLength: int { get }
```

### enum ElementType <a id="enum-ElementType"></a>

```vertex
public enum ElementType: Equatable
```

ElementType is a typed array's element type (Table 71).

#### Cases

<a id="ElementType.int8"></a>

```vertex
case int8
```

<a id="ElementType.uint8"></a>

```vertex
case uint8
```

<a id="ElementType.uint8Clamped"></a>

```vertex
case uint8Clamped
```

<a id="ElementType.int16"></a>

```vertex
case int16
```

<a id="ElementType.uint16"></a>

```vertex
case uint16
```

<a id="ElementType.int32"></a>

```vertex
case int32
```

<a id="ElementType.uint32"></a>

```vertex
case uint32
```

<a id="ElementType.float16"></a>

```vertex
case float16
```

<a id="ElementType.float32"></a>

```vertex
case float32
```

<a id="ElementType.float64"></a>

```vertex
case float64
```

<a id="ElementType.bigInt64"></a>

```vertex
case bigInt64
```

<a id="ElementType.bigUint64"></a>

```vertex
case bigUint64
```

#### Properties

<a id="ElementType.Size"></a>

```vertex
public var Size: int { get }
```

<a id="ElementType.IsBigInt"></a>

```vertex
public var IsBigInt: bool { get }
```

<a id="ElementType.Name"></a>

```vertex
public var Name: string { get }
```

### class RawJSON <a id="class-RawJSON"></a>

```vertex
public final class RawJSON: object.JSObject
```

RawJSON is the object JSON.rawJSON makes: its text is written as is.

#### Initializers

<a id="RawJSON.init"></a>

```vertex
public init(_ text: str.JSString)
```

#### Properties

<a id="RawJSON.Text"></a>

```vertex
public let Text: str.JSString
```

### class TypedArrayObject <a id="class-TypedArrayObject"></a>

```vertex
public final class TypedArrayObject: object.JSObject
```

TypedArrayObject is a typed array: an integer-indexed exotic object
(§10.4.5) viewing Buffer from ByteOffset.

#### Initializers

<a id="TypedArrayObject.init"></a>

```vertex
public init(proto: object.JSObject?, type: ElementType, buffer: ArrayBufferObject)
```

#### Properties

<a id="TypedArrayObject.Buffer"></a>

```vertex
public var Buffer: ArrayBufferObject
```

<a id="TypedArrayObject.ByteOffset"></a>

```vertex
public var ByteOffset: int = 0
```

<a id="TypedArrayObject.FixedLength"></a>

```vertex
public var FixedLength: int = -1
```

FixedLength is the length given when made, or -1 for a view that
tracks a resizable buffer's length.

<a id="TypedArrayObject.Type"></a>

```vertex
public let Type: ElementType
```

<a id="TypedArrayObject.isOrdinaryLookup"></a>

```vertex
public override var isOrdinaryLookup: bool { get }
```

<a id="TypedArrayObject.IsOutOfBounds"></a>

```vertex
public var IsOutOfBounds: bool { get }
```

IsOutOfBounds is IsTypedArrayOutOfBounds (§10.4.5.12).

<a id="TypedArrayObject.Length"></a>

```vertex
public var Length: int { get }
```

Length is TypedArrayLength: 0 when out of bounds.

<a id="TypedArrayObject.ByteLength"></a>

```vertex
public var ByteLength: int { get }
```

#### Methods

<a id="TypedArrayObject.GetElement"></a>

```vertex
public func GetElement(_ i: int) -> Value
```

GetElement reads element i (in range).

<a id="TypedArrayObject.SetElement"></a>

```vertex
public func SetElement(_ i: int, _ v: Value)
```

SetElement writes an already-converted value at i (in range).

<a id="TypedArrayObject.GetOwnProperty"></a>

```vertex
public override func GetOwnProperty(_ key: value.PropertyKey) throws -> object.PropertyDescriptor?
```

<a id="TypedArrayObject.HasProperty"></a>

```vertex
public override func HasProperty(_ key: value.PropertyKey) throws -> bool
```

<a id="TypedArrayObject.DefineOwnProperty"></a>

```vertex
public override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: object.PropertyDescriptor) throws -> bool
```

<a id="TypedArrayObject.Get"></a>

```vertex
public override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="TypedArrayObject.Set"></a>

```vertex
public override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

<a id="TypedArrayObject.Delete"></a>

```vertex
public override func Delete(_ key: value.PropertyKey) throws -> bool
```

<a id="TypedArrayObject.OwnPropertyKeys"></a>

```vertex
public override func OwnPropertyKeys() throws -> [value.PropertyKey]
```

## Files

- buffer.vs
- structured.vs
