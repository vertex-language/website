# js/builtin/text

Installs text processing (ECMA-262 §22): String, the String Iterator, and RegExp.

```vertex
import "js/builtin/text"
```

## Types

- **`RegExpObject`** (class): RegExpObject is a RegExp instance: its [[OriginalSource]], [[OriginalFlags]] and [[RegExpMatcher]].
- **`StringIterator`** (class)

## Functions

- `func Install(r: object.Realm)`: Install defines String and RegExp.
- `func IsRegExp(v: Value) throws -> bool`: IsRegExp (§7.2.6).
- `func GetSubstitution(matched: str.JSString, s: str.JSString, position: int, captures: [Value], namedCaptures: object.JSObject?, template: str.JSString) -> str.JSString`: GetSubstitution (§22.1.3.19.1): the replacement template's $ patterns.
- `func LocaleCompare(a: str.JSString, b: str.JSString) -> int`: LocaleCompare orders strings roughly as ICU's root collation does for Latin text: letters compared without accents or case first, then accents, then lowercase before uppercase, then code units.

Part of the [`js`](https://github.com/vertex-language/js) repository.
