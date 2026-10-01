# package rsa

```vertex
import "crypto/rsa"
```

Package rsa implements RSA public-key operations needed by a TLS client
and RDP: PKCS#1 v1.5 and PSS signature verification, and the raw public
operation. Only public-key math is here -- no private keys -- so there
is no secret to protect and the code need not be constant-time.

## Index

- [`func PublicOp(_ key: PublicKey, _ sig: [uint8]) -> [uint8]`](#func-PublicOp)
- [`func VerifyPKCS1v15(key: PublicKey, hash: Hash, data: [uint8], signature: [uint8]) throws`](#func-VerifyPKCS1v15)
- [`func VerifyPSS(key: PublicKey, hash: Hash, data: [uint8], signature: [uint8]) throws`](#func-VerifyPSS)
- [`enum Hash`](#enum-Hash)
- [`struct PublicKey`](#struct-PublicKey)
  - [`init(nBytes: [uint8], eBytes: [uint8])`](#PublicKey.init)
  - [`var N: big.Nat`](#PublicKey.N)
  - [`var E: big.Nat`](#PublicKey.E)
  - [`var Size: int`](#PublicKey.Size)
- [`enum RsaError: Error`](#enum-RsaError)
  - [`var Message: string { get }`](#RsaError.Message)

## Functions

### func PublicOp <a id="func-PublicOp"></a>

```vertex
public func PublicOp(_ key: PublicKey, _ sig: [uint8]) -> [uint8]
```

PublicOp is the raw RSA public operation: signature^E mod N, returned
left-padded to the modulus size. This is the encoded message a
signature reveals.

### func VerifyPKCS1v15 <a id="func-VerifyPKCS1v15"></a>

```vertex
public func VerifyPKCS1v15(key: PublicKey, hash: Hash, data: [uint8], signature: [uint8]) throws
```

VerifyPKCS1v15 checks an RSASSA-PKCS1-v1_5 signature over data.

### func VerifyPSS <a id="func-VerifyPSS"></a>

```vertex
public func VerifyPSS(key: PublicKey, hash: Hash, data: [uint8], signature: [uint8]) throws
```

VerifyPSS checks an RSASSA-PSS signature over data (MGF1 with the same
hash, salt length equal to the hash length -- the TLS profile).

## Types

### enum Hash <a id="enum-Hash"></a>

```vertex
public enum Hash
```

Hash names the digest a signature was made with.

#### Cases

<a id="Hash.sha1"></a>

```vertex
case sha1
```

<a id="Hash.sha256"></a>

```vertex
case sha256
```

<a id="Hash.sha384"></a>

```vertex
case sha384
```

<a id="Hash.sha512"></a>

```vertex
case sha512
```

### struct PublicKey <a id="struct-PublicKey"></a>

```vertex
public struct PublicKey
```

PublicKey is an RSA public key: modulus N and exponent E.

#### Initializers

<a id="PublicKey.init"></a>

```vertex
public init(nBytes: [uint8], eBytes: [uint8])
```

#### Properties

<a id="PublicKey.N"></a>

```vertex
public var N: big.Nat
```

<a id="PublicKey.E"></a>

```vertex
public var E: big.Nat
```

<a id="PublicKey.Size"></a>

```vertex
public var Size: int
```

Modulus size in bytes (k), the length of a signature/ciphertext.

### enum RsaError <a id="enum-RsaError"></a>

```vertex
public enum RsaError: Error
```

#### Cases

<a id="RsaError.verificationFailed"></a>

```vertex
case verificationFailed(string)
```

<a id="RsaError.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="RsaError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- rsa.vs
