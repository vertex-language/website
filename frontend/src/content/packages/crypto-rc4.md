# package rc4

```vertex
import "crypto/rc4"
```

Package rc4 implements the RC4 stream cipher. RC4 is insecure and used
only where a legacy protocol requires it: NTLM sealing/signing and RDP
licensing encryption run RC4 keystreams.

## Index

- [`func Apply(key: [uint8], data: [uint8]) -> [uint8]`](#func-Apply)
- [`struct Cipher`](#struct-Cipher)
  - [`init(key: [uint8])`](#Cipher.init)
  - [`mutating func XORStream(_ input: [uint8]) -> [uint8]`](#Cipher.XORStream)

## Functions

### func Apply <a id="func-Apply"></a>

```vertex
public func Apply(key: [uint8], data: [uint8]) -> [uint8]
```

Apply is a one-shot RC4 of data under key (for callers that need a
single independent stream).

## Types

### struct Cipher <a id="struct-Cipher"></a>

```vertex
public struct Cipher
```

Cipher is an RC4 keystream generator. XORStream applies it; a fresh
Cipher is needed per independent stream.

#### Initializers

<a id="Cipher.init"></a>

```vertex
public init(key: [uint8])
```

#### Methods

<a id="Cipher.XORStream"></a>

```vertex
public mutating func XORStream(_ input: [uint8]) -> [uint8]
```

XORStream returns input XOR the next keystream bytes, advancing the
cipher state. Encrypt and decrypt are the same operation.

## Files

- rc4.vs
