# package cipher

```vertex
import "crypto/cipher"
```

Package cipher provides AEAD cipher modes over a block cipher. GCM
(Galois/Counter Mode, NIST SP 800-38D) is what the TLS 1.2 AES-GCM
cipher suites Windows negotiates use to protect records.

## Index

- [Constants](#constants)
- [`enum CipherError: Error`](#enum-CipherError)
  - [`var Message: string { get }`](#CipherError.Message)
- [`struct GCM`](#struct-GCM)
  - [`init(_ block: aes.Block)`](#GCM.init)
  - [`static func New(key: [uint8]) throws -> GCM`](#GCM.New)
  - [`func Seal(nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#GCM.Seal)
  - [`func Open(nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]`](#GCM.Open)

## Constants

<a id="let-GCMNonceSize"></a>

```vertex
public let GCMNonceSize: int = 12
```

<a id="let-GCMTagSize"></a>

```vertex
public let GCMTagSize: int = 16
```

## Types

### enum CipherError <a id="enum-CipherError"></a>

```vertex
public enum CipherError: Error
```

#### Cases

<a id="CipherError.authFailed"></a>

```vertex
case authFailed
```

<a id="CipherError.badParameter"></a>

```vertex
case badParameter(string)
```

#### Properties

<a id="CipherError.Message"></a>

```vertex
public var Message: string { get }
```

### struct GCM <a id="struct-GCM"></a>

```vertex
public struct GCM
```

GCM wraps an AES block cipher in Galois/Counter Mode with a 96-bit
nonce and 128-bit tag, the profile TLS uses.

#### Initializers

<a id="GCM.init"></a>

```vertex
public init(_ block: aes.Block)
```

#### Methods

<a id="GCM.New"></a>

```vertex
public static func New(key: [uint8]) throws -> GCM
```

<a id="GCM.Seal"></a>

```vertex
public func Seal(nonce: [uint8], plaintext: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Seal encrypts plaintext and appends the authentication tag. nonce
must be 12 bytes.

<a id="GCM.Open"></a>

```vertex
public func Open(nonce: [uint8], ciphertextAndTag: [uint8], additionalData: [uint8] = []) throws -> [uint8]
```

Open verifies the tag and decrypts. ciphertextAndTag is the output
of Seal (ciphertext with the 16-byte tag appended).

## Files

- gcm.vs
