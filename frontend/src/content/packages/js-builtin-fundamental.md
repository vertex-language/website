# package fundamental

```vertex
import "js/builtin/fundamental"
```

Package fundamental installs the fundamental objects (ECMA-262 §20):
Object, Function, Boolean, Symbol, and Error with its native errors.

## Index

- [`func FunctionToString(_ v: Value) throws -> string`](#func-FunctionToString)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func ObjectToString(_ v: Value) throws -> str.JSString`](#func-ObjectToString)
- [`func groupBy(_ items: Value, _ cb: Value, propertyKeys: bool) throws -> [(Value, [Value])]`](#func-groupBy)

## Functions

### func FunctionToString <a id="func-FunctionToString"></a>

```vertex
public func FunctionToString(_ v: Value) throws -> string
```

FunctionToString is Function.prototype.toString (§20.2.3.5).

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines the fundamental objects in a realm.

### func ObjectToString <a id="func-ObjectToString"></a>

```vertex
public func ObjectToString(_ v: Value) throws -> str.JSString
```

ObjectToString is Object.prototype.toString (§20.1.3.6).

### func groupBy <a id="func-groupBy"></a>

```vertex
public func groupBy(_ items: Value, _ cb: Value, propertyKeys: bool) throws -> [(Value, [Value])]
```

groupBy is GroupBy (§7.3.35): the groups in first-seen order.

## Files

- fundamental.vs
