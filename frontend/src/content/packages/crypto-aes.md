# package aes

```vertex
import "crypto/aes"
```

Package aes implements the AES block cipher (FIPS 197) for 128- and
256-bit keys. It is the block primitive under crypto/cipher's GCM, which
is what the TLS 1.2 AES-GCM cipher suites Windows negotiates use.

This is a straightforward table-driven implementation. It is not
constant-time (the S-box lookups are data-dependent); for the RDP client
that is acceptable, and a hardened version can replace it later without
changing the API.

## Index

- [Constants](#constants)
- [`enum AesError: Error`](#enum-AesError)
  - [`var Message: string { get }`](#AesError.Message)
- [`struct Block`](#struct-Block)
  - [`init(key: [uint8]) throws`](#Block.init)
  - [`func Encrypt(_ input: [uint8]) -> [uint8]`](#Block.Encrypt)
  - [`func EncryptWords(_ w0: uint32, _ w1: uint32, _ w2: uint32, _ w3: uint32) -> (uint32, uint32, uint32, uint32)`](#Block.EncryptWords)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 16
```

## Types

### enum AesError <a id="enum-AesError"></a>

```vertex
public enum AesError: Error
```

#### Cases

<a id="AesError.invalidKeySize"></a>

```vertex
case invalidKeySize(int)
```

#### Properties

<a id="AesError.Message"></a>

```vertex
public var Message: string { get }
```

### struct Block <a id="struct-Block"></a>

```vertex
public struct Block
```

Block is an AES cipher set up with one key. It encrypts and decrypts
single 16-byte blocks; modes of operation live in crypto/cipher.

#### Initializers

<a id="Block.init"></a>

```vertex
public init(key: [uint8]) throws
```

#### Methods

<a id="Block.Encrypt"></a>

```vertex
public func Encrypt(_ input: [uint8]) -> [uint8]
```

Encrypt transforms one 16-byte block, returning the ciphertext.
(Decryption is not implemented: the TLS AES-GCM suites RDP uses run
AES in counter mode, which needs only the forward direction.)

<a id="Block.EncryptWords"></a>

```vertex
public func EncryptWords(_ w0: uint32, _ w1: uint32, _ w2: uint32, _ w3: uint32) -> (uint32, uint32, uint32, uint32)
```

EncryptWords transforms one block given as four big-endian words:
the form counter mode wants, with no arrays on the way.

## Files

- aes.vs
- tables.vs
