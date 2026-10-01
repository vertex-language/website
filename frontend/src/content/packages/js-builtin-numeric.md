# package numeric

```vertex
import "js/builtin/numeric"
```

Package numeric installs the numbers and dates (ECMA-262 §21):
Number, BigInt, Math and Date.

## Index

- [Variables](#variables)
- [`func DateString(_ tv: float64) -> string`](#func-DateString)
- [`func Hypot(_ xs: [float64]) -> float64`](#func-Hypot)
- [`func ISOString(_ tv: float64) -> string`](#func-ISOString)
- [`func Install(_ r: object.Realm)`](#func-Install)
- [`func LocaleString(_ x: float64) -> string`](#func-LocaleString)
- [`func Parse(_ s: string) -> float64`](#func-Parse)
- [`func SumPrecise(_ xs: [float64]) -> float64`](#func-SumPrecise)
- [`final class Zone`](#class-Zone)
  - [`init(offset: @escaping (float64) -> float64, name: @escaping (float64) -> string)`](#Zone.init)
  - [`let Offset: (float64) -> float64`](#Zone.Offset)
  - [`let Name: (float64) -> string`](#Zone.Name)
  - [`static let UTC`](#Zone.UTC)

## Variables

<a id="var-LocalZone"></a>

```vertex
public var LocalZone = Zone.UTC
```

LocalZone is the zone Date's local-time methods use; a host sets it.

## Functions

### func DateString <a id="func-DateString"></a>

```vertex
public func DateString(_ tv: float64) -> string
```

DateString is ToDateString (§21.4.4.41.4): Date.prototype.toString.

### func Hypot <a id="func-Hypot"></a>

```vertex
public func Hypot(_ xs: [float64]) -> float64
```

Hypot is Math.hypot as V8 computes it: scale by the largest magnitude
and sum the squares with Kahan compensation.

### func ISOString <a id="func-ISOString"></a>

```vertex
public func ISOString(_ tv: float64) -> string
```

ISOString is Date.prototype.toISOString's format.

### func Install <a id="func-Install"></a>

```vertex
public func Install(_ r: object.Realm)
```

Install defines Number, BigInt, Math and Date.

### func LocaleString <a id="func-LocaleString"></a>

```vertex
public func LocaleString(_ x: float64) -> string
```

LocaleString is toLocaleString in en-US: grouped thousands and at
most three fraction digits, as ICU formats it.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ s: string) -> float64
```

Parse is Date.parse: the date time string format (§21.4.1.32), then
the forms V8 also accepts -- its own toString and toUTCString output
and the common "Month day, year [time]" and "year/month/day" forms.

### func SumPrecise <a id="func-SumPrecise"></a>

```vertex
public func SumPrecise(_ xs: [float64]) -> float64
```

SumPrecise is Math.sumPrecise (§21.3.2.34): the exact sum rounded once,
by Shewchuk's partials.

## Types

### class Zone <a id="class-Zone"></a>

```vertex
public final class Zone
```

Zone is what Date needs of the local time zone: the offset from UTC in
effect at a UTC time, and the zone's name for toString.

#### Initializers

<a id="Zone.init"></a>

```vertex
public init(offset: @escaping (float64) -> float64, name: @escaping (float64) -> string)
```

#### Properties

<a id="Zone.Offset"></a>

```vertex
public let Offset: (float64) -> float64
```

Offset is the local offset, in milliseconds, at the UTC time t.

<a id="Zone.Name"></a>

```vertex
public let Name: (float64) -> string
```

Name is the zone's long name at t, as toString prints it in
parentheses: "Coordinated Universal Time".

<a id="Zone.UTC"></a>

```vertex
public static let UTC
```

## Files

- date.vs
- numeric.vs
