# package x509

```vertex
import "crypto/x509"
```

Package x509 parses X.509 certificates (RFC 5280) far enough for a TLS
client and RDP: the RSA public key, the validity window, the subject
common name and DNS SANs, and the pieces needed to verify the
certificate's signature. It is not a full path validator yet.

## Index

- [`func FingerprintSHA256(_ der: [uint8]) -> [uint8]`](#func-FingerprintSHA256)
- [`func Parse(_ der: [uint8]) throws -> Certificate`](#func-Parse)
- [`func VerifySignedBy(_ cert: Certificate, _ issuerKey: rsa.PublicKey) throws`](#func-VerifySignedBy)
- [`struct Certificate`](#struct-Certificate)
  - [`init()`](#Certificate.init)
  - [`var RawTBS: [uint8] = []`](#Certificate.RawTBS)
  - [`var SignatureAlgorithm: SignatureAlgorithm = .unknown`](#Certificate.SignatureAlgorithm)
  - [`var Signature: [uint8] = []`](#Certificate.Signature)
  - [`var RSAPublicKey: rsa.PublicKey = rsa.PublicKey(nBytes: [0], eBytes: [1])`](#Certificate.RSAPublicKey)
  - [`var RawSubjectPublicKey: [uint8] = []`](#Certificate.RawSubjectPublicKey)
  - [`var RawSubjectPublicKeyInfo: [uint8] = []`](#Certificate.RawSubjectPublicKeyInfo)
  - [`var Subject: string = ""`](#Certificate.Subject)
  - [`var Issuer: string = ""`](#Certificate.Issuer)
  - [`var DNSNames: [string] = []`](#Certificate.DNSNames)
  - [`var NotBefore: string = ""`](#Certificate.NotBefore)
  - [`var NotAfter: string = ""`](#Certificate.NotAfter)
  - [`var IsRSA: bool = false`](#Certificate.IsRSA)
- [`enum SignatureAlgorithm`](#enum-SignatureAlgorithm)
- [`enum X509Error: Error`](#enum-X509Error)
  - [`var Message: string { get }`](#X509Error.Message)

## Functions

### func FingerprintSHA256 <a id="func-FingerprintSHA256"></a>

```vertex
public func FingerprintSHA256(_ der: [uint8]) -> [uint8]
```

FingerprintSHA256 is the SHA-256 of the whole certificate DER, for
pinning and trust-on-first-use display.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ der: [uint8]) throws -> Certificate
```

Parse reads one DER-encoded certificate.

### func VerifySignedBy <a id="func-VerifySignedBy"></a>

```vertex
public func VerifySignedBy(_ cert: Certificate, _ issuerKey: rsa.PublicKey) throws
```

VerifySignedBy checks this certificate's signature against an issuer's
RSA public key. For a self-signed certificate the issuer is itself.

## Types

### struct Certificate <a id="struct-Certificate"></a>

```vertex
public struct Certificate
```

Certificate holds the parsed fields a TLS/RDP client uses.

#### Initializers

<a id="Certificate.init"></a>

```vertex
public init()
```

#### Properties

<a id="Certificate.RawTBS"></a>

```vertex
public var RawTBS: [uint8] = []
```

The exact DER bytes of tbsCertificate, over which the signature is
computed.

<a id="Certificate.SignatureAlgorithm"></a>

```vertex
public var SignatureAlgorithm: SignatureAlgorithm = .unknown
```

<a id="Certificate.Signature"></a>

```vertex
public var Signature: [uint8] = []
```

<a id="Certificate.RSAPublicKey"></a>

```vertex
public var RSAPublicKey: rsa.PublicKey = rsa.PublicKey(nBytes: [0], eBytes: [1])
```

<a id="Certificate.RawSubjectPublicKey"></a>

```vertex
public var RawSubjectPublicKey: [uint8] = []
```

The DER contents of the subjectPublicKey BIT STRING (the encoded
RSAPublicKey). CredSSP's public-key binding hashes exactly these
bytes ([MS-CSSP] 3.1.5).

<a id="Certificate.RawSubjectPublicKeyInfo"></a>

```vertex
public var RawSubjectPublicKeyInfo: [uint8] = []
```

The whole subjectPublicKeyInfo TLV.

<a id="Certificate.Subject"></a>

```vertex
public var Subject: string = ""
```

<a id="Certificate.Issuer"></a>

```vertex
public var Issuer: string = ""
```

<a id="Certificate.DNSNames"></a>

```vertex
public var DNSNames: [string] = []
```

<a id="Certificate.NotBefore"></a>

```vertex
public var NotBefore: string = ""
```

<a id="Certificate.NotAfter"></a>

```vertex
public var NotAfter: string = ""
```

<a id="Certificate.IsRSA"></a>

```vertex
public var IsRSA: bool = false
```

### enum SignatureAlgorithm <a id="enum-SignatureAlgorithm"></a>

```vertex
public enum SignatureAlgorithm
```

SignatureAlgorithm identifies how a certificate was signed.

#### Cases

<a id="SignatureAlgorithm.sha1RSA"></a>

```vertex
case sha1RSA
```

<a id="SignatureAlgorithm.sha256RSA"></a>

```vertex
case sha256RSA
```

<a id="SignatureAlgorithm.sha384RSA"></a>

```vertex
case sha384RSA
```

<a id="SignatureAlgorithm.sha512RSA"></a>

```vertex
case sha512RSA
```

<a id="SignatureAlgorithm.rsaPSS"></a>

```vertex
case rsaPSS
```

<a id="SignatureAlgorithm.unknown"></a>

```vertex
case unknown
```

### enum X509Error <a id="enum-X509Error"></a>

```vertex
public enum X509Error: Error
```

#### Cases

<a id="X509Error.parse"></a>

```vertex
case parse(string)
```

<a id="X509Error.unsupported"></a>

```vertex
case unsupported(string)
```

#### Properties

<a id="X509Error.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- x509.vs
