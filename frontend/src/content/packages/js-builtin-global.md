# package global

```vertex
import "js/builtin/global"
```

Package global installs the global object's own functions and values
(ECMA-262 §19): NaN, Infinity, undefined, eval, isNaN, isFinite,
parseInt, parseFloat, the URI functions, and Annex B's escape/unescape.

## Index

- [`func Decode(_ s: str.JSString, preserve: string) throws -> str.JSString`](#func-Decode)
- [`func Encode(_ s: str.JSString, extraUnescaped: string) throws -> str.JSString`](#func-Encode)
- [`func Escape(_ s: str.JSString) -> str.JSString`](#func-Escape)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func Unescape(_ s: str.JSString) -> str.JSString`](#func-Unescape)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ s: str.JSString, preserve: string) throws -> str.JSString
```

Decode is Decode (§19.2.6.6).

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ s: str.JSString, extraUnescaped: string) throws -> str.JSString
```

Encode is Encode (§19.2.6.5).

### func Escape <a id="func-Escape"></a>

```vertex
public func Escape(_ s: str.JSString) -> str.JSString
```

Escape is escape(string).

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines the global functions and value properties.

### func Unescape <a id="func-Unescape"></a>

```vertex
public func Unescape(_ s: str.JSString) -> str.JSString
```

Unescape is unescape(string).

## Files

- global.vs
