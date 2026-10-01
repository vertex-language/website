# package cert

```vertex
import "crypto/cert"
```

Package cert answers two questions with the operating system's own
certificate trust: does a server's chain lead to a root this machine
trusts, for the host the client asked for; and does a signature verify
under a certificate's public key. The system builds the path, applies
the user's and the administrator's trust settings, and checks validity
and names, so a Vertex program trusts exactly what the rest of the
machine does -- a corporate root included -- and ships no root list.

```vertex
try cert.VerifyChain(chain, host: "huggingface.co")
try cert.VerifySignature(certificate: chain[0], scheme: cert.Scheme.ecdsaP256SHA256,
                         data: signed, signature: sig)
```

## Index

- [`func VerifyChain(_ chain: [[uint8]], host: string) throws`](#func-VerifyChain)
- [`func VerifySignature(certificate: [uint8], scheme: uint16, data: [uint8], signature: [uint8]) throws`](#func-VerifySignature)
- [`enum CertError: Error`](#enum-CertError)
  - [`var Message: string { get }`](#CertError.Message)
- [`enum Scheme`](#enum-Scheme)
  - [`static let rsaPKCS1SHA256: uint16 = 0x0401`](#Scheme.rsaPKCS1SHA256)
  - [`static let rsaPKCS1SHA384: uint16 = 0x0501`](#Scheme.rsaPKCS1SHA384)
  - [`static let rsaPKCS1SHA512: uint16 = 0x0601`](#Scheme.rsaPKCS1SHA512)
  - [`static let rsaPSSSHA256: uint16 = 0x0804`](#Scheme.rsaPSSSHA256)
  - [`static let rsaPSSSHA384: uint16 = 0x0805`](#Scheme.rsaPSSSHA384)
  - [`static let rsaPSSSHA512: uint16 = 0x0806`](#Scheme.rsaPSSSHA512)
  - [`static let ecdsaP256SHA256: uint16 = 0x0403`](#Scheme.ecdsaP256SHA256)
  - [`static let ecdsaP384SHA384: uint16 = 0x0503`](#Scheme.ecdsaP384SHA384)
  - [`static let ecdsaP521SHA512: uint16 = 0x0603`](#Scheme.ecdsaP521SHA512)

## Functions

### func VerifyChain <a id="func-VerifyChain"></a>

```vertex
public func VerifyChain(_ chain: [[uint8]], host: string) throws
```

VerifyChain checks a certificate chain, DER-encoded and the server's own
certificate first, against the system's trusted roots and today's date,
and that the first is for host. An empty host checks the chain alone.

### func VerifySignature <a id="func-VerifySignature"></a>

```vertex
public func VerifySignature(certificate: [uint8], scheme: uint16, data: [uint8], signature: [uint8]) throws
```

VerifySignature checks signature over data with the public key of
certificate, a DER certificate, by TLS signature scheme (see Scheme).

## Types

### enum CertError <a id="enum-CertError"></a>

```vertex
public enum CertError: Error
```

CertError is why a chain or a signature was refused, with the system's
own words for it.

#### Cases

<a id="CertError.untrusted"></a>

```vertex
case untrusted(string)
```

No path from the chain to a root this machine trusts.

<a id="CertError.nameMismatch"></a>

```vertex
case nameMismatch(string)
```

The server's certificate is not for the host that was asked for.

<a id="CertError.expired"></a>

```vertex
case expired(string)
```

A certificate in the chain is expired, or not valid yet.

<a id="CertError.badSignature"></a>

```vertex
case badSignature(string)
```

The signature does not verify under the certificate's key.

<a id="CertError.unsupported"></a>

```vertex
case unsupported(string)
```

This platform has no system trust here yet, or the scheme is one
the system does not verify.

<a id="CertError.invalid"></a>

```vertex
case invalid(string)
```

A certificate that does not parse.

#### Properties

<a id="CertError.Message"></a>

```vertex
public var Message: string { get }
```

### enum Scheme <a id="enum-Scheme"></a>

```vertex
public enum Scheme
```

Scheme is a TLS SignatureScheme (RFC 8446 §4.2.3): what a signature is
and the hash it is over.

#### Properties

<a id="Scheme.rsaPKCS1SHA256"></a>

```vertex
public static let rsaPKCS1SHA256: uint16 = 0x0401
```

<a id="Scheme.rsaPKCS1SHA384"></a>

```vertex
public static let rsaPKCS1SHA384: uint16 = 0x0501
```

<a id="Scheme.rsaPKCS1SHA512"></a>

```vertex
public static let rsaPKCS1SHA512: uint16 = 0x0601
```

<a id="Scheme.rsaPSSSHA256"></a>

```vertex
public static let rsaPSSSHA256: uint16 = 0x0804
```

<a id="Scheme.rsaPSSSHA384"></a>

```vertex
public static let rsaPSSSHA384: uint16 = 0x0805
```

<a id="Scheme.rsaPSSSHA512"></a>

```vertex
public static let rsaPSSSHA512: uint16 = 0x0806
```

<a id="Scheme.ecdsaP256SHA256"></a>

```vertex
public static let ecdsaP256SHA256: uint16 = 0x0403
```

<a id="Scheme.ecdsaP384SHA384"></a>

```vertex
public static let ecdsaP384SHA384: uint16 = 0x0503
```

<a id="Scheme.ecdsaP521SHA512"></a>

```vertex
public static let ecdsaP521SHA512: uint16 = 0x0603
```

## Files

- cert.vs
