# package x224

```vertex
import "remote/rdp/x224"
```

Package x224 is RDP's transport framing: the TPKT envelope (RFC 1006),
the X.224/T.123 connection PDUs, and the RDP security negotiation that
rides in the Connection Request and Confirm ([MS-RDPBCGR] 2.2.1.1,
2.2.1.2). It does no I/O: it turns structures into bytes and bytes into
structures, so it can be tested and fuzzed on its own.

After the connection is confirmed, RDP data travels either as TPKT
"slow-path" PDUs (first byte 0x03) or as "fast-path" updates (first byte
low two bits zero). `FrameSplitter` tells them apart and hands whole
frames to the caller.

## Index

- [Constants](#constants)
- [`func UnwrapData(_ frame: [uint8]) throws -> [uint8]`](#func-UnwrapData)
- [`func WrapData(_ payload: [uint8]) -> [uint8]`](#func-WrapData)
- [`struct ConnectionConfirm`](#struct-ConnectionConfirm)
  - [`init()`](#ConnectionConfirm.init)
  - [`var SelectedProtocol: uint32 = 0`](#ConnectionConfirm.SelectedProtocol)
  - [`var Flags: uint8 = 0`](#ConnectionConfirm.Flags)
  - [`var Failure: NegotiationFailureCode? = nil`](#ConnectionConfirm.Failure)
  - [`static func Parse(_ pdu: [uint8]) throws -> ConnectionConfirm`](#ConnectionConfirm.Parse)
- [`struct ConnectionRequest`](#struct-ConnectionRequest)
  - [`init(cookie: string = "", requestedProtocols: uint32 = 0, flags: uint8 = 0)`](#ConnectionRequest.init)
  - [`var Cookie: string = ""`](#ConnectionRequest.Cookie)
  - [`var RequestedProtocols: uint32 = 0`](#ConnectionRequest.RequestedProtocols)
  - [`var Flags: uint8 = 0`](#ConnectionRequest.Flags)
  - [`func Encode() -> [uint8]`](#ConnectionRequest.Encode)
- [`enum Frame`](#enum-Frame)
- [`struct FrameSplitter`](#struct-FrameSplitter)
  - [`init()`](#FrameSplitter.init)
  - [`var Buffered: int { get }`](#FrameSplitter.Buffered)
  - [`mutating func Feed(_ data: [uint8])`](#FrameSplitter.Feed)
  - [`mutating func Next() throws -> Frame?`](#FrameSplitter.Next)
- [`enum NegotiationFailureCode: uint32`](#enum-NegotiationFailureCode)
  - [`var Message: string { get }`](#NegotiationFailureCode.Message)
- [`struct NegotiationRequestFlag`](#struct-NegotiationRequestFlag)
  - [`static let RestrictedAdminModeRequired: uint8 = 0x01`](#NegotiationRequestFlag.RestrictedAdminModeRequired)
  - [`static let RedirectedAuthenticationModeRequired: uint8 = 0x02`](#NegotiationRequestFlag.RedirectedAuthenticationModeRequired)
  - [`static let CorrelationInfoPresent: uint8 = 0x08`](#NegotiationRequestFlag.CorrelationInfoPresent)
- [`struct NegotiationResponseFlag`](#struct-NegotiationResponseFlag)
  - [`static let ExtendedClientDataSupported: uint8 = 0x01`](#NegotiationResponseFlag.ExtendedClientDataSupported)
  - [`static let DynVCGFXProtocolSupported: uint8 = 0x02`](#NegotiationResponseFlag.DynVCGFXProtocolSupported)
  - [`static let RestrictedAdminModeSupported: uint8 = 0x08`](#NegotiationResponseFlag.RestrictedAdminModeSupported)
  - [`static let RedirectedAuthenticationModeSupported: uint8 = 0x10`](#NegotiationResponseFlag.RedirectedAuthenticationModeSupported)
- [`struct SecurityProtocol`](#struct-SecurityProtocol)
  - [`static let RDP: uint32 = 0x00000000`](#SecurityProtocol.RDP)
  - [`static let SSL: uint32 = 0x00000001`](#SecurityProtocol.SSL)
  - [`static let Hybrid: uint32 = 0x00000002`](#SecurityProtocol.Hybrid)
  - [`static let RDSTLS: uint32 = 0x00000004`](#SecurityProtocol.RDSTLS)
  - [`static let HybridEx: uint32 = 0x00000008`](#SecurityProtocol.HybridEx)
  - [`static let RDSAAD: uint32 = 0x00000010`](#SecurityProtocol.RDSAAD)
- [`enum X224Error: Error`](#enum-X224Error)
  - [`var Message: string { get }`](#X224Error.Message)

## Constants

<a id="let-DefaultPort"></a>

```vertex
public let DefaultPort: uint16 = 3389
```

The well-known RDP TCP port.

<a id="let-tpktVersion"></a>

```vertex
public let tpktVersion: uint8 = 0x03
```

TPKTHeader is the 4-byte envelope: version 3, a reserved byte, and the
total length (header included) as a big-endian uint16.

## Functions

### func UnwrapData <a id="func-UnwrapData"></a>

```vertex
public func UnwrapData(_ frame: [uint8]) throws -> [uint8]
```

UnwrapData returns the payload of an X.224 Data PDU (the caller has
already read a whole TPKT frame, e.g. from FrameSplitter).

### func WrapData <a id="func-WrapData"></a>

```vertex
public func WrapData(_ payload: [uint8]) -> [uint8]
```

WrapData wraps a payload in an X.224 Data PDU inside a TPKT. This is the
"slow path": MCS and share-control PDUs travel this way.

## Types

### struct ConnectionConfirm <a id="struct-ConnectionConfirm"></a>

```vertex
public struct ConnectionConfirm
```

ConnectionConfirm is the server's reply: the negotiation response, or a
failure ([MS-RDPBCGR] 2.2.1.2).

#### Initializers

<a id="ConnectionConfirm.init"></a>

```vertex
public init()
```

#### Properties

<a id="ConnectionConfirm.SelectedProtocol"></a>

```vertex
public var SelectedProtocol: uint32 = 0
```

<a id="ConnectionConfirm.Flags"></a>

```vertex
public var Flags: uint8 = 0
```

<a id="ConnectionConfirm.Failure"></a>

```vertex
public var Failure: NegotiationFailureCode? = nil
```

Present when the server rejected the request instead of confirming.

#### Methods

<a id="ConnectionConfirm.Parse"></a>

```vertex
public static func Parse(_ pdu: [uint8]) throws -> ConnectionConfirm
```

Parse reads a full TPKT+X.224 Connection Confirm PDU.

### struct ConnectionRequest <a id="struct-ConnectionRequest"></a>

```vertex
public struct ConnectionRequest
```

ConnectionRequest is the client's first PDU. It carries an optional
routing cookie (used by RD load balancers and to prefill the username)
and the RDP negotiation request.

#### Initializers

<a id="ConnectionRequest.init"></a>

```vertex
public init(cookie: string = "", requestedProtocols: uint32 = 0, flags: uint8 = 0)
```

#### Properties

<a id="ConnectionRequest.Cookie"></a>

```vertex
public var Cookie: string = ""
```

The "mstshash=<user>" cookie, or "" to send none.

<a id="ConnectionRequest.RequestedProtocols"></a>

```vertex
public var RequestedProtocols: uint32 = 0
```

<a id="ConnectionRequest.Flags"></a>

```vertex
public var Flags: uint8 = 0
```

#### Methods

<a id="ConnectionRequest.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

Encode returns the full TPKT+X.224 Connection Request PDU.

### enum Frame <a id="enum-Frame"></a>

```vertex
public enum Frame
```

A frame taken off the wire: either a slow-path TPKT PDU or a fast-path
update ([MS-RDPBCGR] 2.2.9.1).

#### Cases

<a id="Frame.slowPath"></a>

```vertex
case slowPath([uint8])
```

A whole TPKT PDU, including its 4-byte header.

<a id="Frame.fastPath"></a>

```vertex
case fastPath([uint8])
```

A whole fast-path update, including its 1-3 byte header.

### struct FrameSplitter <a id="struct-FrameSplitter"></a>

```vertex
public struct FrameSplitter
```

FrameSplitter turns a byte stream into whole frames. Feed it what the
socket read; call Next until it returns nil, then read more. It never
copies a partial frame out, and it distinguishes TPKT (first byte 0x03)
from fast-path (first byte's low two bits zero).

#### Initializers

<a id="FrameSplitter.init"></a>

```vertex
public init()
```

#### Properties

<a id="FrameSplitter.Buffered"></a>

```vertex
public var Buffered: int { get }
```

#### Methods

<a id="FrameSplitter.Feed"></a>

```vertex
public mutating func Feed(_ data: [uint8])
```

<a id="FrameSplitter.Next"></a>

```vertex
public mutating func Next() throws -> Frame?
```

Next returns the next whole frame, or nil if more bytes are needed.

### enum NegotiationFailureCode <a id="enum-NegotiationFailureCode"></a>

```vertex
public enum NegotiationFailureCode: uint32
```

Reasons a server rejects the requested protocols (RDP_NEG_FAILURE,
[MS-RDPBCGR] 2.2.1.1.3).

#### Cases

<a id="NegotiationFailureCode.sslRequiredByServer"></a>

```vertex
case sslRequiredByServer = 1
```

<a id="NegotiationFailureCode.sslNotAllowedByServer"></a>

```vertex
case sslNotAllowedByServer = 2
```

<a id="NegotiationFailureCode.sslCertNotOnServer"></a>

```vertex
case sslCertNotOnServer = 3
```

<a id="NegotiationFailureCode.inconsistentFlags"></a>

```vertex
case inconsistentFlags = 4
```

<a id="NegotiationFailureCode.hybridRequiredByServer"></a>

```vertex
case hybridRequiredByServer = 5
```

<a id="NegotiationFailureCode.sslWithUserAuthRequiredByServer"></a>

```vertex
case sslWithUserAuthRequiredByServer = 6
```

#### Properties

<a id="NegotiationFailureCode.Message"></a>

```vertex
public var Message: string { get }
```

### struct NegotiationRequestFlag <a id="struct-NegotiationRequestFlag"></a>

```vertex
public struct NegotiationRequestFlag
```

Flags in the RDP_NEG_REQ ([MS-RDPBCGR] 2.2.1.1.1).

#### Properties

<a id="NegotiationRequestFlag.RestrictedAdminModeRequired"></a>

```vertex
public static let RestrictedAdminModeRequired: uint8 = 0x01
```

<a id="NegotiationRequestFlag.RedirectedAuthenticationModeRequired"></a>

```vertex
public static let RedirectedAuthenticationModeRequired: uint8 = 0x02
```

<a id="NegotiationRequestFlag.CorrelationInfoPresent"></a>

```vertex
public static let CorrelationInfoPresent: uint8 = 0x08
```

### struct NegotiationResponseFlag <a id="struct-NegotiationResponseFlag"></a>

```vertex
public struct NegotiationResponseFlag
```

Flags in the RDP_NEG_RSP ([MS-RDPBCGR] 2.2.1.1.2).

#### Properties

<a id="NegotiationResponseFlag.ExtendedClientDataSupported"></a>

```vertex
public static let ExtendedClientDataSupported: uint8 = 0x01
```

<a id="NegotiationResponseFlag.DynVCGFXProtocolSupported"></a>

```vertex
public static let DynVCGFXProtocolSupported: uint8 = 0x02
```

<a id="NegotiationResponseFlag.RestrictedAdminModeSupported"></a>

```vertex
public static let RestrictedAdminModeSupported: uint8 = 0x08
```

<a id="NegotiationResponseFlag.RedirectedAuthenticationModeSupported"></a>

```vertex
public static let RedirectedAuthenticationModeSupported: uint8 = 0x10
```

### struct SecurityProtocol <a id="struct-SecurityProtocol"></a>

```vertex
public struct SecurityProtocol
```

SecurityProtocol is a bit in requestedProtocols / a value in
selectedProtocol ([MS-RDPBCGR] 2.2.1.1.1).

#### Properties

<a id="SecurityProtocol.RDP"></a>

```vertex
public static let RDP: uint32 = 0x00000000
```

Standard RDP Security only (RC4, no server authentication).

<a id="SecurityProtocol.SSL"></a>

```vertex
public static let SSL: uint32 = 0x00000001
```

TLS 1.0/1.1/1.2.

<a id="SecurityProtocol.Hybrid"></a>

```vertex
public static let Hybrid: uint32 = 0x00000002
```

CredSSP (NLA): TLS then SPNEGO/NTLM or Kerberos.

<a id="SecurityProtocol.RDSTLS"></a>

```vertex
public static let RDSTLS: uint32 = 0x00000004
```

RDSTLS.

<a id="SecurityProtocol.HybridEx"></a>

```vertex
public static let HybridEx: uint32 = 0x00000008
```

CredSSP plus the Early User Authorization Result PDU.

<a id="SecurityProtocol.RDSAAD"></a>

```vertex
public static let RDSAAD: uint32 = 0x00000010
```

RDS Entra ID (AAD) authentication.

### enum X224Error <a id="enum-X224Error"></a>

```vertex
public enum X224Error: Error
```

#### Cases

<a id="X224Error.malformed"></a>

```vertex
case malformed(string)
```

<a id="X224Error.negotiationFailed"></a>

```vertex
case negotiationFailed(NegotiationFailureCode)
```

<a id="X224Error.unexpected"></a>

```vertex
case unexpected(string)
```

#### Properties

<a id="X224Error.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- x224.vs
