# package credssp

```vertex
import "crypto/credssp"
```

Package credssp implements the client side of CredSSP / NLA (MS-CSSP)
over an established TLS 1.2 channel. It carries an NTLM exchange inside
TSRequest structures, binds to the server's TLS public key with the
version-6 SHA-256 hashes, and finally delegates the user's password as
TSCredentials. This is how Windows RDP authenticates before the RDP
connection proper begins.

NTLM tokens are placed directly in negoTokens (Windows accepts raw
NTLM there, as its own clients and FreeRDP do); a SPNEGO wrapper and
Kerberos can be added later without changing this flow.

## Index

- [`func Authenticate(conn: inout tls.Conn12, creds: Credentials) async throws`](#func-Authenticate)
- [`enum CredSSPError: Error`](#enum-CredSSPError)
  - [`var Message: string { get }`](#CredSSPError.Message)
- [`struct Credentials`](#struct-Credentials)
  - [`init(domain: string, user: string, password: [uint8], host: string, subjectPublicKey: [uint8])`](#Credentials.init)
  - [`var Domain: string`](#Credentials.Domain)
  - [`var User: string`](#Credentials.User)
  - [`var Password: [uint8]`](#Credentials.Password)
  - [`var Host: string`](#Credentials.Host)
  - [`var SubjectPublicKey: [uint8]`](#Credentials.SubjectPublicKey)

## Functions

### func Authenticate <a id="func-Authenticate"></a>

```vertex
public func Authenticate(conn: inout tls.Conn12, creds: Credentials) async throws
```

Authenticate runs the full CredSSP client exchange over an established
TLS connection.

## Types

### enum CredSSPError <a id="enum-CredSSPError"></a>

```vertex
public enum CredSSPError: Error
```

#### Cases

<a id="CredSSPError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="CredSSPError.serverError"></a>

```vertex
case serverError(uint32)
```

<a id="CredSSPError.bindingMismatch"></a>

```vertex
case bindingMismatch
```

#### Properties

<a id="CredSSPError.Message"></a>

```vertex
public var Message: string { get }
```

### struct Credentials <a id="struct-Credentials"></a>

```vertex
public struct Credentials
```

Credentials to delegate over CredSSP.

#### Initializers

<a id="Credentials.init"></a>

```vertex
public init(domain: string, user: string, password: [uint8], host: string, subjectPublicKey: [uint8])
```

#### Properties

<a id="Credentials.Domain"></a>

```vertex
public var Domain: string
```

<a id="Credentials.User"></a>

```vertex
public var User: string
```

<a id="Credentials.Password"></a>

```vertex
public var Password: [uint8]
```

<a id="Credentials.Host"></a>

```vertex
public var Host: string
```

<a id="Credentials.SubjectPublicKey"></a>

```vertex
public var SubjectPublicKey: [uint8]
```

The server certificate's subjectPublicKey
(tls.Conn12.PeerCertificate.RawSubjectPublicKey).

## Files

- asn1_wire.vs
- credssp.vs
