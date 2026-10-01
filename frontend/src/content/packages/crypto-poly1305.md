# package poly1305

```vertex
import "crypto/poly1305"
```

## Index

- [Constants](#constants)
- [`func Sum(_ msg: [uint8], key: [uint8]) -> [uint8]`](#func-Sum)
- [`func Verify(mac: [uint8], msg: [uint8], key: [uint8]) -> bool`](#func-Verify)
- [`enum Poly1305Error: Error`](#enum-Poly1305Error)

## Constants

<a id="let-KeySize"></a>

```vertex
public let KeySize: int = 32
```

<a id="let-TagSize"></a>

```vertex
public let TagSize: int = 16
```

## Functions

### func Sum <a id="func-Sum"></a>

```vertex
public func Sum(_ msg: [uint8], key: [uint8]) -> [uint8]
```

Sum calculates the 16-byte Poly1305 authenticator tag of msg using a 32-byte one-time key.

### func Verify <a id="func-Verify"></a>

```vertex
public func Verify(mac: [uint8], msg: [uint8], key: [uint8]) -> bool
```

Verify returns true if mac matches the Poly1305 tag of msg.

## Types

### enum Poly1305Error <a id="enum-Poly1305Error"></a>

```vertex
public enum Poly1305Error: Error
```

#### Cases

<a id="Poly1305Error.invalidKeySize"></a>

```vertex
case invalidKeySize
```

## Files

- poly1305.vs
