# js/builtin/structured

Installs structured data (ECMA-262 §25): JSON, ArrayBuffer, SharedArrayBuffer, DataView, the typed arrays and Atomics.

```vertex
import "js/builtin/structured"
```

## Types

- **`ArrayBufferObject`** (class): ArrayBufferObject is an ArrayBuffer or a SharedArrayBuffer.
- **`ElementType`** (enum): ElementType is a typed array's element type (Table 71).
- **`TypedArrayObject`** (class): TypedArrayObject is a typed array: an integer-indexed exotic object (§10.4.5) viewing Buffer from ByteOffset.
- **`DataViewObject`** (class)
- **`RawJSON`** (class): RawJSON is the object JSON.rawJSON makes: its text is written as is.

## Functions

- `func Install(r: object.Realm)`: Install defines JSON and the buffers.
- `func Quote(s: str.JSString, out: inout str.Builder)`: Quote is QuoteJSONString (§25.5.2.3).
- `func Stringify(r: object.Realm, v: Value, replacerV: Value, spaceV: Value) throws -> str.JSString?`: Stringify is JSON.stringify(value, replacer, space), or nil for undefined.

Part of the [`js`](https://github.com/vertex-language/js) repository.
