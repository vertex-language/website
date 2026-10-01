# package norm

```vertex
import "unicode/norm"
```

Package norm is Unicode normalization (UAX #15): the canonical and
compatibility decompositions and compositions, NFD, NFC, NFKD and NFKC.

## Index

- [`func CombiningClass(_ cp: uint32) -> uint8`](#func-CombiningClass)
- [`func Compose(_ cps: [uint32]) -> [uint32]`](#func-Compose)
- [`func Decompose(_ cps: [uint32], compat: bool) -> [uint32]`](#func-Decompose)
- [`func IsNormalized(_ cps: [uint32], _ form: Form) -> bool`](#func-IsNormalized)
- [`func Normalize(_ cps: [uint32], _ form: Form) -> [uint32]`](#func-Normalize)
- [`func NormalizeString(_ s: string, _ form: Form) -> string`](#func-NormalizeString)
- [`enum Form`](#enum-Form)

## Functions

### func CombiningClass <a id="func-CombiningClass"></a>

```vertex
public func CombiningClass(_ cp: uint32) -> uint8
```

CombiningClass is a code point's Canonical_Combining_Class.

### func Compose <a id="func-Compose"></a>

```vertex
public func Compose(_ cps: [uint32]) -> [uint32]
```

Compose is the canonical composition of a decomposed sequence.

### func Decompose <a id="func-Decompose"></a>

```vertex
public func Decompose(_ cps: [uint32], compat: bool) -> [uint32]
```

Decompose is the full canonical (or compatibility) decomposition, in
canonical order.

### func IsNormalized <a id="func-IsNormalized"></a>

```vertex
public func IsNormalized(_ cps: [uint32], _ form: Form) -> bool
```

IsNormalized says whether code points are already in a form.

### func Normalize <a id="func-Normalize"></a>

```vertex
public func Normalize(_ cps: [uint32], _ form: Form) -> [uint32]
```

Normalize puts code points in a normalization form.

### func NormalizeString <a id="func-NormalizeString"></a>

```vertex
public func NormalizeString(_ s: string, _ form: Form) -> string
```

NormalizeString is Normalize over a string's code points.

## Types

### enum Form <a id="enum-Form"></a>

```vertex
public enum Form
```

Form is a normalization form.

#### Cases

<a id="Form.nfd"></a>

```vertex
case nfd
```

Canonical decomposition.

<a id="Form.nfc"></a>

```vertex
case nfc
```

Canonical decomposition, then canonical composition.

<a id="Form.nfkd"></a>

```vertex
case nfkd
```

Compatibility decomposition.

<a id="Form.nfkc"></a>

```vertex
case nfkc
```

Compatibility decomposition, then canonical composition.

## Files

- norm.vs
- tables.vs
