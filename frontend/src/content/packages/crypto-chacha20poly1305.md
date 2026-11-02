# package chacha20poly1305

```vertex
import "crypto/chacha20poly1305"
```

## Index

- [Constants](#constants)
- [`func Open(key: [uint8], nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#func-Open)
- [`func Seal(key: [uint8], nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#func-Seal)
- [`struct AEAD`](#struct-AEAD)
  - [`init(key: [uint8])`](#AEAD.init)
  - [`static func New(key: [uint8]) throws -> AEAD`](#AEAD.New)
  - [`func Seal(nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#AEAD.Seal)
  - [`func Open(nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#AEAD.Open)
- [`enum AeadError: Error`](#enum-AeadError)

## Constants

<a id="let-KeySize"></a>

```vertex
public let KeySize: int = 32
```

<a id="let-NonceSize"></a>

```vertex
public let NonceSize: int = 12
```

<a id="let-TagSize"></a>

```vertex
public let TagSize: int = 16
```

## Functions

### func Open <a id="func-Open"></a>

```vertex
public func Open(key: [uint8], nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Open authenticates and decrypts ciphertextAndTag with key and nonce.

### func Seal <a id="func-Seal"></a>

```vertex
public func Seal(key: [uint8], nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Seal encrypts and authenticates plaintext with key and nonce.

## Types

### struct AEAD <a id="struct-AEAD"></a>

```vertex
public struct AEAD
```

AEAD represents a ChaCha20-Poly1305 Authenticated Encryption with Associated Data instance (RFC 8439).

#### Initializers

<a id="AEAD.init"></a>

```vertex
public init(key: [uint8])
```

#### Methods

<a id="AEAD.New"></a>

```vertex
public static func New(key: [uint8]) throws -> AEAD
```

<a id="AEAD.Seal"></a>

```vertex
public func Seal(nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Seal encrypts and authenticates plaintext, appending the 16-byte Poly1305 tag.

<a id="AEAD.Open"></a>

```vertex
public func Open(nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Open authenticates and decrypts ciphertextAndTag, returning the plaintext.

### enum AeadError <a id="enum-AeadError"></a>

```vertex
public enum AeadError: Error
```

#### Cases

<a id="AeadError.invalidKey"></a>

```vertex
case invalidKey
```

<a id="AeadError.invalidNonce"></a>

```vertex
case invalidNonce
```

<a id="AeadError.authenticationFailed"></a>

```vertex
case authenticationFailed
```

## Files

- chacha20poly1305.vs
