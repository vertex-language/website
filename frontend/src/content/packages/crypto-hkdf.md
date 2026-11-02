# package hkdf

```vertex
import "crypto/hkdf"
```

## Index

- [`func DeriveKey(hash: hmac.HashAlgorithm = .sha256, secret: [uint8], salt: [uint8] = [], info: [uint8] = [], length: int) -> [uint8]`](#func-DeriveKey)
- [`func Expand(hash: hmac.HashAlgorithm = .sha256, prk: [uint8], info: [uint8], length: int) -> [uint8]`](#func-Expand)
- [`func Expand(hash: hmac.HashAlgorithm = .sha256, prk: [uint8], info: string, length: int) -> [uint8]`](#func-Expand-2)
- [`func Extract(hash: hmac.HashAlgorithm = .sha256, secret: [uint8], salt: [uint8] = []) -> [uint8]`](#func-Extract)

## Functions

### func DeriveKey <a id="func-DeriveKey"></a>

```vertex
public func DeriveKey(hash: hmac.HashAlgorithm = .sha256,
                      secret: [uint8],
                      salt: [uint8] = [],
                      info: [uint8] = [],
                      length: int) -> [uint8]
```

DeriveKey combines Extract and Expand into a single step.

### func Expand <a id="func-Expand"></a>

```vertex
public func Expand(hash: hmac.HashAlgorithm = .sha256,
                   prk: [uint8],
                   info: [uint8],
                   length: int) -> [uint8]
```

Expand expands the pseudorandom key (PRK) using info and requested output length
according to RFC 5869 Section 2.3.

### func Expand <a id="func-Expand-2"></a>

```vertex
public func Expand(hash: hmac.HashAlgorithm = .sha256,
                   prk: [uint8],
                   info: string,
                   length: int) -> [uint8]
```

Expand expands the pseudorandom key (PRK) using a string info.

### func Extract <a id="func-Extract"></a>

```vertex
public func Extract(hash: hmac.HashAlgorithm = .sha256,
                    secret: [uint8],
                    salt: [uint8] = []) -> [uint8]
```

Extract generates a pseudorandom key (PRK) from the input keying material (secret)
and an optional salt according to RFC 5869 Section 2.2.

## Files

- hkdf.vs
