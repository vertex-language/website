# js/builtin/indexed

Installs the indexed collections' Array (ECMA-262 §23.1) and %ArrayIteratorPrototype%. Typed arrays live in structured.

```vertex
import "js/builtin/indexed"
```

## Types

- **`IterationKind`** (enum)
- **`ArrayIterator`** (class): ArrayIterator is an Array Iterator object: it walks any array-like, typed arrays included.

## Functions

- `func Install(r: object.Realm)`: Install defines Array and %ArrayIteratorPrototype%.
- `func sortValues(items: [Value], cmp: Value) throws -> [Value]`: sortValues is SortIndexedProperties' ordering: a stable merge sort with undefined last, as V8's TimSort orders a consistent comparator.
- `func CreateArrayIterator(r: object.Realm, o: object.JSObject, kind: IterationKind) -> ArrayIterator`: CreateArrayIterator (§23.1.5.1).

Part of the [`js`](https://github.com/vertex-language/js) repository.
