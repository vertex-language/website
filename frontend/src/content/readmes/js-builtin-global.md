# js/builtin/global

Installs the global object's own functions and values (ECMA-262 §19): NaN, Infinity, undefined, eval, isNaN, isFinite, parseInt, parseFloat, the URI functions, and Annex B's escape/unescape.

```vertex
import "js/builtin/global"
```

## Functions

- `func Install(r: object.Realm)`: Install defines the global functions and value properties.
- `func Encode(s: str.JSString, extraUnescaped: string) throws -> str.JSString`: Encode is Encode (§19.2.6.5).
- `func Decode(s: str.JSString, preserve: string) throws -> str.JSString`: Decode is Decode (§19.2.6.6).
- `func Escape(s: str.JSString) -> str.JSString`: Escape is escape(string).
- `func Unescape(s: str.JSString) -> str.JSString`: Unescape is unescape(string).

Part of the [`js`](https://github.com/vertex-language/js) repository.
