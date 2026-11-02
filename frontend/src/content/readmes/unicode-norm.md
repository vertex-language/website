# unicode/norm

Unicode normalization (UAX #15): the canonical and compatibility decompositions and compositions, NFD, NFC, NFKD and NFKC.

```vertex
import "unicode/norm"
```

## Types

- **`Form`** (enum): Form is a normalization form.

## Functions

- `func CombiningClass(cp: uint32) -> uint8`: CombiningClass is a code point's Canonical_Combining_Class.
- `func Decompose(cps: [uint32], compat: bool) -> [uint32]`: Decompose is the full canonical (or compatibility) decomposition, in canonical order.
- `func Compose(cps: [uint32]) -> [uint32]`: Compose is the canonical composition of a decomposed sequence.
- `func Normalize(cps: [uint32], form: Form) -> [uint32]`: Normalize puts code points in a normalization form.
- `func NormalizeString(s: string, form: Form) -> string`: NormalizeString is Normalize over a string's code points.
- `func IsNormalized(cps: [uint32], form: Form) -> bool`: IsNormalized says whether code points are already in a form.

Part of the [`unicode`](https://github.com/vertex-language/unicode) repository.
