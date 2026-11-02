# package curve25519

```vertex
import "crypto/curve25519"
```

## Index

- [Constants](#constants)
- [`func ScalarBaseMult(scalar: [uint8]) throws -> [uint8]`](#func-ScalarBaseMult)
- [`func ScalarMult(scalar: [uint8], point: [uint8]) throws -> [uint8]`](#func-ScalarMult)
- [`enum Curve25519Error: Error`](#enum-Curve25519Error)

## Constants

<a id="let-BasePoint"></a>

```vertex
public let BasePoint: [uint8]
```

BasePoint is the Curve25519 base point (9 followed by 31 zero bytes).

<a id="let-PointSize"></a>

```vertex
public let PointSize: int = 32
```

<a id="let-ScalarSize"></a>

```vertex
public let ScalarSize: int = 32
```

## Functions

### func ScalarBaseMult <a id="func-ScalarBaseMult"></a>

```vertex
public func ScalarBaseMult(scalar: [uint8]) throws -> [uint8]
```

ScalarBaseMult calculates the public key corresponding to a private scalar.

### func ScalarMult <a id="func-ScalarMult"></a>

```vertex
public func ScalarMult(scalar: [uint8], point: [uint8]) throws -> [uint8]
```

ScalarMult calculates the scalar product of scalar and point on Curve25519 (RFC 7748).

## Types

### enum Curve25519Error <a id="enum-Curve25519Error"></a>

```vertex
public enum Curve25519Error: Error
```

#### Cases

<a id="Curve25519Error.invalidScalarSize"></a>

```vertex
case invalidScalarSize
```

<a id="Curve25519Error.invalidPointSize"></a>

```vertex
case invalidPointSize
```

## Files

- curve25519.vs
