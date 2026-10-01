# package ntlm

```vertex
import "crypto/ntlm"
```

Package ntlm implements the client side of NTLMv2 (MS-NLMP), enough for
CredSSP/NLA: the NEGOTIATE and AUTHENTICATE messages, the NTLMv2 response
and session-key hierarchy, the message integrity code (MIC), and the
GSS-style Wrap/Unwrap (sign+seal) used to protect CredSSP's public-key
and credential tokens.

NTLM is legacy and weak; it is used because Windows requires it for NLA
when Kerberos is unavailable. Microsoft is phasing it out, so a Kerberos
mechanism can slot in beside this later behind the same interface.

## Index

- [`func ChallengeNames(_ msg: [uint8]) -> (nbDomain: string, nbComputer: string)`](#func-ChallengeNames)
- [`func NTOWFv2(user: string, domain: string, password: [uint8]) -> [uint8]`](#func-NTOWFv2)
- [`struct Client`](#struct-Client)
  - [`init(domain: string, user: string, password: [uint8], workstation: string = "VERTEX", targetSPN: string = "")`](#Client.init)
  - [`var Domain: string`](#Client.Domain)
  - [`var User: string`](#Client.User)
  - [`var Password: [uint8]`](#Client.Password)
  - [`var Workstation: string`](#Client.Workstation)
  - [`var TargetSPN: string`](#Client.TargetSPN)
  - [`var Ctx: Context = Context()`](#Client.Ctx)
  - [`mutating func Negotiate() -> [uint8]`](#Client.Negotiate)
  - [`mutating func Authenticate(_ challenge: [uint8]) throws -> [uint8]`](#Client.Authenticate)
  - [`func (c: inout Client) Wrap(_ message: [uint8]) -> [uint8]`](#Client.Wrap)
  - [`func (c: inout Client) Unwrap(_ token: [uint8]) throws -> [uint8]`](#Client.Unwrap)
- [`struct Context`](#struct-Context)
  - [`init()`](#Context.init)
  - [`var Established: bool`](#Context.Established)
- [`enum NtlmError: Error`](#enum-NtlmError)
  - [`var Message: string { get }`](#NtlmError.Message)

## Functions

### func ChallengeNames <a id="func-ChallengeNames"></a>

```vertex
public func ChallengeNames(_ msg: [uint8]) -> (nbDomain: string, nbComputer: string)
```

ChallengeNames returns the server's NetBIOS domain and computer names
from a CHALLENGE_MESSAGE's target info (for choosing a logon domain).

### func NTOWFv2 <a id="func-NTOWFv2"></a>

```vertex
public func NTOWFv2(user: string, domain: string, password: [uint8]) -> [uint8]
```

ntowfv2 computes the NTLMv2 one-way function.

## Types

### struct Client <a id="struct-Client"></a>

```vertex
public struct Client
```

Client drives an NTLMv2 exchange and then protects tokens.

#### Initializers

<a id="Client.init"></a>

```vertex
public init(domain: string, user: string, password: [uint8], workstation: string = "VERTEX", targetSPN: string = "")
```

#### Properties

<a id="Client.Domain"></a>

```vertex
public var Domain: string
```

<a id="Client.User"></a>

```vertex
public var User: string
```

<a id="Client.Password"></a>

```vertex
public var Password: [uint8]
```

<a id="Client.Workstation"></a>

```vertex
public var Workstation: string
```

UTF-8 password bytes

<a id="Client.TargetSPN"></a>

```vertex
public var TargetSPN: string
```

<a id="Client.Ctx"></a>

```vertex
public var Ctx: Context = Context()
```

#### Methods

<a id="Client.Negotiate"></a>

```vertex
public mutating func Negotiate() -> [uint8]
```

Negotiate returns the NEGOTIATE_MESSAGE (type 1).

<a id="Client.Authenticate"></a>

```vertex
public mutating func Authenticate(_ challenge: [uint8]) throws -> [uint8]
```

Authenticate consumes the CHALLENGE_MESSAGE (type 2) and returns the
AUTHENTICATE_MESSAGE (type 3), setting up the signing/sealing context.

<a id="Client.Wrap"></a>

```vertex
public func (c: inout Client) Wrap(_ message: [uint8]) -> [uint8]
```

Wrap signs and seals a message the way GSS_WrapEx does for NTLM: it
returns the 16-byte signature followed by the sealed data. CredSSP uses
this for the pubKeyAuth and authInfo tokens.

<a id="Client.Unwrap"></a>

```vertex
public func (c: inout Client) Unwrap(_ token: [uint8]) throws -> [uint8]
```

Unwrap verifies and decrypts a token the server produced (signature ||
sealed data), returning the plaintext.

### struct Context <a id="struct-Context"></a>

```vertex
public struct Context
```

Context carries the negotiated session keys and running cipher state for
signing and sealing after authentication (GSS Wrap/Unwrap).

#### Initializers

<a id="Context.init"></a>

```vertex
public init()
```

#### Properties

<a id="Context.Established"></a>

```vertex
public var Established: bool
```

### enum NtlmError <a id="enum-NtlmError"></a>

```vertex
public enum NtlmError: Error
```

#### Cases

<a id="NtlmError.malformed"></a>

```vertex
case malformed(string)
```

<a id="NtlmError.verify"></a>

```vertex
case verify(string)
```

#### Properties

<a id="NtlmError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- messages.vs
- ntlm.vs
- seal.vs
