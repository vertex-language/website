# package chacha20

```vertex
import "crypto/chacha20"
```

## Index

- [Constants](#constants)
- [`func Decrypt(key: [uint8], nonce: [uint8], ciphertext: [uint8], counter: uint32 = 1) throws -> [uint8]`](#func-Decrypt)
- [`func Encrypt(key: [uint8], nonce: [uint8], plaintext: [uint8], counter: uint32 = 1) throws -> [uint8]`](#func-Encrypt)
- [`enum ChaCha20Error: Error`](#enum-ChaCha20Error)
- [`struct Cipher`](#struct-Cipher)
  - [`init(keyWords: [uint32], nonceWords: [uint32], counter: uint32 = 1)`](#Cipher.init)
  - [`var counter: uint32 = 1`](#Cipher.counter)
  - [`static func New(key: [uint8], nonce: [uint8], counter: uint32 = 1) throws -> Cipher`](#Cipher.New)
  - [`mutating func XORKeyStream(_ dst: inout [uint8], _ src: [uint8])`](#Cipher.XORKeyStream)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 64
```

<a id="let-KeySize"></a>

```vertex
public let KeySize: int = 32
```

<a id="let-NonceSize"></a>

```vertex
public let NonceSize: int = 12
```

## Functions

### func Decrypt <a id="func-Decrypt"></a>

```vertex
public func Decrypt(key: [uint8], nonce: [uint8], ciphertext: [uint8], counter: uint32 = 1) throws -> [uint8]
```

Decrypt decrypts ciphertext with key and nonce using ChaCha20 (RFC 8439).

### func Encrypt <a id="func-Encrypt"></a>

```vertex
public func Encrypt(key: [uint8], nonce: [uint8], plaintext: [uint8], counter: uint32 = 1) throws -> [uint8]
```

Encrypt encrypts plaintext with key and nonce using ChaCha20 (RFC 8439).

## Types

### enum ChaCha20Error <a id="enum-ChaCha20Error"></a>

```vertex
public enum ChaCha20Error: Error
```

#### Cases

<a id="ChaCha20Error.invalidKeySize"></a>

```vertex
case invalidKeySize
```

<a id="ChaCha20Error.invalidNonceSize"></a>

```vertex
case invalidNonceSize
```

<a id="ChaCha20Error.counterOverflow"></a>

```vertex
case counterOverflow
```

### struct Cipher <a id="struct-Cipher"></a>

```vertex
public struct Cipher
```

Cipher is a stateful ChaCha20 stream cipher instance (RFC 8439).

#### Initializers

<a id="Cipher.init"></a>

```vertex
public init(keyWords: [uint32], nonceWords: [uint32], counter: uint32 = 1)
```

#### Properties

<a id="Cipher.counter"></a>

```vertex
public var counter: uint32 = 1
```

#### Methods

<a id="Cipher.New"></a>

```vertex
public static func New(key: [uint8], nonce: [uint8], counter: uint32 = 1) throws -> Cipher
```

New creates a new ChaCha20 Cipher instance.

<a id="Cipher.XORKeyStream"></a>

```vertex
public mutating func XORKeyStream(_ dst: inout [uint8], _ src: [uint8])
```

XORKeyStream encrypts or decrypts src into dst using the ChaCha20 keystream.

## Files

- chacha20.vs
