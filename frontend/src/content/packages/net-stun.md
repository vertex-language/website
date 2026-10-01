# package stun

```vertex
import "net/stun"
```

## Index

- [Constants](#constants)
- [`func Discover(server: string = "stun.cloudflare.com:3478", timeoutMs: int32 = 3000) async throws -> udp.SocketAddress`](#func-Discover)
- [`func DiscoverAddress(server: string = "stun.cloudflare.com:3478", timeoutMs: int32 = 3000) async throws -> StunAddress`](#func-DiscoverAddress)
- [`func HandleBindingRequest(_ raw: [uint8], sender: udp.SocketAddress) -> [uint8]?`](#func-HandleBindingRequest)
- [`func MakeData(_ data: [uint8]) -> Attribute`](#func-MakeData)
- [`func MakeErrorCode(_ code: int, _ reason: string = "") -> Attribute`](#func-MakeErrorCode)
- [`func MakeIceControlled(_ tieBreaker: uint64) -> Attribute`](#func-MakeIceControlled)
- [`func MakeIceControlling(_ tieBreaker: uint64) -> Attribute`](#func-MakeIceControlling)
- [`func MakeLifetime(_ seconds: uint32) -> Attribute`](#func-MakeLifetime)
- [`func MakeMappedAddress(address: udp.SocketAddress) -> Attribute`](#func-MakeMappedAddress)
- [`func MakeNonce(_ nonce: string) -> Attribute`](#func-MakeNonce)
- [`func MakePriority(_ priority: uint32) -> Attribute`](#func-MakePriority)
- [`func MakeRealm(_ realm: string) -> Attribute`](#func-MakeRealm)
- [`func MakeRequestedTransport(_ proto: uint8 = 17) -> Attribute`](#func-MakeRequestedTransport)
- [`func MakeSoftware(_ name: string) -> Attribute`](#func-MakeSoftware)
- [`func MakeUseCandidate() -> Attribute`](#func-MakeUseCandidate)
- [`func MakeUsername(_ name: string) -> Attribute`](#func-MakeUsername)
- [`func MakeXorMappedAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute`](#func-MakeXorMappedAddress)
- [`func MakeXorPeerAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute`](#func-MakeXorPeerAddress)
- [`func MakeXorRelayedAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute`](#func-MakeXorRelayedAddress)
- [`func NewTransactionId() -> [uint8]`](#func-NewTransactionId)
- [`func ParseData(_ attr: Attribute) -> [uint8]`](#func-ParseData)
- [`func ParseErrorCode(_ attr: Attribute) -> ErrorCodeInfo`](#func-ParseErrorCode)
- [`func ParseLifetime(_ attr: Attribute) -> uint32`](#func-ParseLifetime)
- [`func ParseMappedAddress(_ attr: Attribute) throws -> udp.SocketAddress`](#func-ParseMappedAddress)
- [`func ParseNonce(_ attr: Attribute) -> string`](#func-ParseNonce)
- [`func ParsePriority(_ attr: Attribute) -> uint32`](#func-ParsePriority)
- [`func ParseRealm(_ attr: Attribute) -> string`](#func-ParseRealm)
- [`func ParseRequestedTransport(_ attr: Attribute) -> uint8`](#func-ParseRequestedTransport)
- [`func ParseSoftware(_ attr: Attribute) -> string`](#func-ParseSoftware)
- [`func ParseUsername(_ attr: Attribute) -> string`](#func-ParseUsername)
- [`func ParseXorMappedAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress`](#func-ParseXorMappedAddress)
- [`func ParseXorPeerAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress`](#func-ParseXorPeerAddress)
- [`func ParseXorRelayedAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress`](#func-ParseXorRelayedAddress)
- [`struct Attribute`](#struct-Attribute)
  - [`init(type: uint16, value: [uint8])`](#Attribute.init)
  - [`var Type: uint16`](#Attribute.Type)
  - [`var Value: [uint8]`](#Attribute.Value)
- [`struct AttributeType`](#struct-AttributeType)
  - [`static let MappedAddress: uint16 = 0x0001`](#AttributeType.MappedAddress)
  - [`static let Username: uint16 = 0x0006`](#AttributeType.Username)
  - [`static let MessageIntegrity: uint16 = 0x0008`](#AttributeType.MessageIntegrity)
  - [`static let ErrorCode: uint16 = 0x0009`](#AttributeType.ErrorCode)
  - [`static let UnknownAttributes: uint16 = 0x000A`](#AttributeType.UnknownAttributes)
  - [`static let ChannelNumber: uint16 = 0x000C`](#AttributeType.ChannelNumber)
  - [`static let Lifetime: uint16 = 0x000D`](#AttributeType.Lifetime)
  - [`static let XorPeerAddress: uint16 = 0x0012`](#AttributeType.XorPeerAddress)
  - [`static let Data: uint16 = 0x0013`](#AttributeType.Data)
  - [`static let Realm: uint16 = 0x0014`](#AttributeType.Realm)
  - [`static let Nonce: uint16 = 0x0015`](#AttributeType.Nonce)
  - [`static let XorRelayedAddress: uint16 = 0x0016`](#AttributeType.XorRelayedAddress)
  - [`static let RequestedTransport: uint16 = 0x0019`](#AttributeType.RequestedTransport)
  - [`static let XorMappedAddress: uint16 = 0x0020`](#AttributeType.XorMappedAddress)
  - [`static let Priority: uint16 = 0x0024`](#AttributeType.Priority)
  - [`static let UseCandidate: uint16 = 0x0025`](#AttributeType.UseCandidate)
  - [`static let MessageIntegritySha256: uint16 = 0x001C`](#AttributeType.MessageIntegritySha256)
  - [`static let Fingerprint: uint16 = 0x0080`](#AttributeType.Fingerprint)
  - [`static let IceControlled: uint16 = 0x8029`](#AttributeType.IceControlled)
  - [`static let IceControlling: uint16 = 0x802A`](#AttributeType.IceControlling)
  - [`static let Software: uint16 = 0x8022`](#AttributeType.Software)
  - [`static let AlternateServer: uint16 = 0x8023`](#AttributeType.AlternateServer)
- [`struct Client`](#struct-Client)
  - [`init(timeoutMs: int32 = 3000)`](#Client.init)
  - [`var TimeoutMs: int32`](#Client.TimeoutMs)
  - [`func Query(server: string) async throws -> udp.SocketAddress`](#Client.Query)
- [`struct ErrorCodeInfo`](#struct-ErrorCodeInfo)
  - [`init(code: int, reason: string = "")`](#ErrorCodeInfo.init)
  - [`var Code: int`](#ErrorCodeInfo.Code)
  - [`var Reason: string`](#ErrorCodeInfo.Reason)
- [`struct Header`](#struct-Header)
  - [`static let Size: int = 20`](#Header.Size)
  - [`static let MagicCookie: uint32 = 0x2112A442`](#Header.MagicCookie)
- [`struct Message`](#struct-Message)
  - [`init(type: uint16, transactionId: [uint8]? = nil)`](#Message.init)
  - [`var Type: uint16`](#Message.Type)
  - [`var TransactionId: [uint8]`](#Message.TransactionId)
  - [`var Attributes: [Attribute] = []`](#Message.Attributes)
  - [`mutating func AddAttribute(_ attr: Attribute)`](#Message.AddAttribute)
  - [`func GetAttribute(_ attrType: uint16) -> Attribute?`](#Message.GetAttribute)
  - [`func Encode() -> [uint8]`](#Message.Encode)
  - [`mutating func AddFingerprint()`](#Message.AddFingerprint)
  - [`mutating func AddMessageIntegrity(key: [uint8])`](#Message.AddMessageIntegrity)
  - [`func VerifyMessageIntegrity(key: [uint8]) -> bool`](#Message.VerifyMessageIntegrity)
  - [`static func ValidateFingerprint(_ raw: [uint8]) -> bool`](#Message.ValidateFingerprint)
  - [`static func Decode(_ raw: [uint8]) throws -> Message`](#Message.Decode)
- [`struct MessageType`](#struct-MessageType)
  - [`static let BindingRequest: uint16 = 0x0001`](#MessageType.BindingRequest)
  - [`static let BindingIndication: uint16 = 0x0011`](#MessageType.BindingIndication)
  - [`static let BindingResponse: uint16 = 0x0101`](#MessageType.BindingResponse)
  - [`static let BindingErrorResponse: uint16 = 0x0111`](#MessageType.BindingErrorResponse)
- [`struct StunAddress`](#struct-StunAddress)
  - [`init(host: string, port: uint16)`](#StunAddress.init)
  - [`init(address: udp.SocketAddress)`](#StunAddress.init-2)
  - [`var Host: string`](#StunAddress.Host)
  - [`var Port: uint16`](#StunAddress.Port)
  - [`func ToString() -> string`](#StunAddress.ToString)
- [`enum StunError: Error`](#enum-StunError)
  - [`var Message: string { get }`](#StunError.Message)

## Constants

<a id="let-AttrAlternateServer"></a>

```vertex
public let AttrAlternateServer: uint16 = 0x8023
```

<a id="let-AttrChannelNumber"></a>

```vertex
public let AttrChannelNumber: uint16 = 0x000C
```

<a id="let-AttrData"></a>

```vertex
public let AttrData: uint16 = 0x0013
```

<a id="let-AttrErrorCode"></a>

```vertex
public let AttrErrorCode: uint16 = 0x0009
```

<a id="let-AttrFingerprint"></a>

```vertex
public let AttrFingerprint: uint16 = 0x0080
```

<a id="let-AttrIceControlled"></a>

```vertex
public let AttrIceControlled: uint16 = 0x8029
```

<a id="let-AttrIceControlling"></a>

```vertex
public let AttrIceControlling: uint16 = 0x802A
```

<a id="let-AttrLifetime"></a>

```vertex
public let AttrLifetime: uint16 = 0x000D
```

<a id="let-AttrMappedAddress"></a>

```vertex
public let AttrMappedAddress: uint16 = 0x0001
```

<a id="let-AttrMessageIntegrity"></a>

```vertex
public let AttrMessageIntegrity: uint16 = 0x0008
```

<a id="let-AttrMessageIntegritySha256"></a>

```vertex
public let AttrMessageIntegritySha256: uint16 = 0x001C
```

<a id="let-AttrNonce"></a>

```vertex
public let AttrNonce: uint16 = 0x0015
```

<a id="let-AttrPriority"></a>

```vertex
public let AttrPriority: uint16 = 0x0024
```

<a id="let-AttrRealm"></a>

```vertex
public let AttrRealm: uint16 = 0x0014
```

<a id="let-AttrRequestedTransport"></a>

```vertex
public let AttrRequestedTransport: uint16 = 0x0019
```

<a id="let-AttrSoftware"></a>

```vertex
public let AttrSoftware: uint16 = 0x8022
```

<a id="let-AttrUnknownAttributes"></a>

```vertex
public let AttrUnknownAttributes: uint16 = 0x000A
```

<a id="let-AttrUseCandidate"></a>

```vertex
public let AttrUseCandidate: uint16 = 0x0025
```

<a id="let-AttrUsername"></a>

```vertex
public let AttrUsername: uint16 = 0x0006
```

<a id="let-AttrXorMappedAddress"></a>

```vertex
public let AttrXorMappedAddress: uint16 = 0x0020
```

<a id="let-AttrXorPeerAddress"></a>

```vertex
public let AttrXorPeerAddress: uint16 = 0x0012
```

<a id="let-AttrXorRelayedAddress"></a>

```vertex
public let AttrXorRelayedAddress: uint16 = 0x0016
```

<a id="let-BindingErrorResponse"></a>

```vertex
public let BindingErrorResponse: uint16 = 0x0111
```

<a id="let-BindingIndication"></a>

```vertex
public let BindingIndication: uint16 = 0x0011
```

<a id="let-BindingRequest"></a>

```vertex
public let BindingRequest: uint16 = 0x0001
```

<a id="let-BindingResponse"></a>

```vertex
public let BindingResponse: uint16 = 0x0101
```

<a id="let-HeaderSize"></a>

```vertex
public let HeaderSize: int = 20
```

Standard STUN message header size in bytes.

<a id="let-MagicCookie"></a>

```vertex
public let MagicCookie: uint32 = 0x2112A442
```

Magic Cookie constant as defined in RFC 8489 Section 5.

## Functions

### func Discover <a id="func-Discover"></a>

```vertex
public func Discover(server: string = "stun.cloudflare.com:3478", timeoutMs: int32 = 3000) async throws -> udp.SocketAddress
```

Discover sends a STUN binding request to server and returns the discovered public/reflexive address.

### func DiscoverAddress <a id="func-DiscoverAddress"></a>

```vertex
public func DiscoverAddress(server: string = "stun.cloudflare.com:3478", timeoutMs: int32 = 3000) async throws -> StunAddress
```

DiscoverAddress sends a STUN binding request to server and returns the discovered reflexive address as a self-contained StunAddress.

### func HandleBindingRequest <a id="func-HandleBindingRequest"></a>

```vertex
public func HandleBindingRequest(_ raw: [uint8], sender: udp.SocketAddress) -> [uint8]?
```

HandleBindingRequest inspects a raw UDP datagram. If it is a valid STUN Binding Request,
it generates a corresponding Binding Success Response containing an XOR-MAPPED-ADDRESS
attribute with the sender's reflexive address and a valid FINGERPRINT.

### func MakeData <a id="func-MakeData"></a>

```vertex
public func MakeData(_ data: [uint8]) -> Attribute
```

MakeData creates a DATA attribute (RFC 8656 Section 14.4).

### func MakeErrorCode <a id="func-MakeErrorCode"></a>

```vertex
public func MakeErrorCode(_ code: int, _ reason: string = "") -> Attribute
```

MakeErrorCode creates an ERROR-CODE attribute (RFC 8489 Section 14.4).

### func MakeIceControlled <a id="func-MakeIceControlled"></a>

```vertex
public func MakeIceControlled(_ tieBreaker: uint64) -> Attribute
```

MakeIceControlled creates an ICE-CONTROLLED attribute (RFC 8445 Section 7.1.4).

### func MakeIceControlling <a id="func-MakeIceControlling"></a>

```vertex
public func MakeIceControlling(_ tieBreaker: uint64) -> Attribute
```

MakeIceControlling creates an ICE-CONTROLLING attribute (RFC 8445 Section 7.1.3).

### func MakeLifetime <a id="func-MakeLifetime"></a>

```vertex
public func MakeLifetime(_ seconds: uint32) -> Attribute
```

MakeLifetime creates a LIFETIME attribute (RFC 8656 Section 14.2).

### func MakeMappedAddress <a id="func-MakeMappedAddress"></a>

```vertex
public func MakeMappedAddress(address: udp.SocketAddress) -> Attribute
```

MakeMappedAddress creates a legacy MAPPED-ADDRESS attribute (RFC 8489 Section 14.1).

### func MakeNonce <a id="func-MakeNonce"></a>

```vertex
public func MakeNonce(_ nonce: string) -> Attribute
```

MakeNonce creates a NONCE attribute (RFC 8489 Section 14.6).

### func MakePriority <a id="func-MakePriority"></a>

```vertex
public func MakePriority(_ priority: uint32) -> Attribute
```

MakePriority creates a PRIORITY attribute (RFC 8445 Section 7.1.1).

### func MakeRealm <a id="func-MakeRealm"></a>

```vertex
public func MakeRealm(_ realm: string) -> Attribute
```

MakeRealm creates a REALM attribute (RFC 8489 Section 14.7).

### func MakeRequestedTransport <a id="func-MakeRequestedTransport"></a>

```vertex
public func MakeRequestedTransport(_ proto: uint8 = 17) -> Attribute
```

MakeRequestedTransport creates a REQUESTED-TRANSPORT attribute (RFC 8656 Section 14.7).

### func MakeSoftware <a id="func-MakeSoftware"></a>

```vertex
public func MakeSoftware(_ name: string) -> Attribute
```

MakeSoftware creates a SOFTWARE attribute (RFC 8489 Section 14.8).

### func MakeUseCandidate <a id="func-MakeUseCandidate"></a>

```vertex
public func MakeUseCandidate() -> Attribute
```

MakeUseCandidate creates a USE-CANDIDATE attribute (RFC 8445 Section 7.1.2).

### func MakeUsername <a id="func-MakeUsername"></a>

```vertex
public func MakeUsername(_ name: string) -> Attribute
```

MakeUsername creates a USERNAME attribute (RFC 8489 Section 14.3).

### func MakeXorMappedAddress <a id="func-MakeXorMappedAddress"></a>

```vertex
public func MakeXorMappedAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute
```

MakeXorMappedAddress creates an XOR-MAPPED-ADDRESS attribute (RFC 8489 Section 14.2).

### func MakeXorPeerAddress <a id="func-MakeXorPeerAddress"></a>

```vertex
public func MakeXorPeerAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute
```

MakeXorPeerAddress creates an XOR-PEER-ADDRESS attribute (RFC 8656 Section 14.3).

### func MakeXorRelayedAddress <a id="func-MakeXorRelayedAddress"></a>

```vertex
public func MakeXorRelayedAddress(address: udp.SocketAddress, transactionId: [uint8]) -> Attribute
```

MakeXorRelayedAddress creates an XOR-RELAYED-ADDRESS attribute (RFC 8656 Section 14.5).

### func NewTransactionId <a id="func-NewTransactionId"></a>

```vertex
public func NewTransactionId() -> [uint8]
```

Generates a cryptographically random 12-byte (96-bit) STUN transaction ID.

### func ParseData <a id="func-ParseData"></a>

```vertex
public func ParseData(_ attr: Attribute) -> [uint8]
```

ParseData extracts payload from a DATA attribute.

### func ParseErrorCode <a id="func-ParseErrorCode"></a>

```vertex
public func ParseErrorCode(_ attr: Attribute) -> ErrorCodeInfo
```

ParseErrorCode decodes an ERROR-CODE attribute.

### func ParseLifetime <a id="func-ParseLifetime"></a>

```vertex
public func ParseLifetime(_ attr: Attribute) -> uint32
```

ParseLifetime decodes a LIFETIME attribute.

### func ParseMappedAddress <a id="func-ParseMappedAddress"></a>

```vertex
public func ParseMappedAddress(_ attr: Attribute) throws -> udp.SocketAddress
```

ParseMappedAddress decodes a legacy MAPPED-ADDRESS attribute.

### func ParseNonce <a id="func-ParseNonce"></a>

```vertex
public func ParseNonce(_ attr: Attribute) -> string
```

ParseNonce extracts the nonce string from a NONCE attribute.

### func ParsePriority <a id="func-ParsePriority"></a>

```vertex
public func ParsePriority(_ attr: Attribute) -> uint32
```

ParsePriority decodes a PRIORITY attribute.

### func ParseRealm <a id="func-ParseRealm"></a>

```vertex
public func ParseRealm(_ attr: Attribute) -> string
```

ParseRealm extracts the realm string from a REALM attribute.

### func ParseRequestedTransport <a id="func-ParseRequestedTransport"></a>

```vertex
public func ParseRequestedTransport(_ attr: Attribute) -> uint8
```

ParseRequestedTransport decodes a REQUESTED-TRANSPORT attribute.

### func ParseSoftware <a id="func-ParseSoftware"></a>

```vertex
public func ParseSoftware(_ attr: Attribute) -> string
```

ParseSoftware extracts the software string from a SOFTWARE attribute.

### func ParseUsername <a id="func-ParseUsername"></a>

```vertex
public func ParseUsername(_ attr: Attribute) -> string
```

ParseUsername extracts the username string from a USERNAME attribute.

### func ParseXorMappedAddress <a id="func-ParseXorMappedAddress"></a>

```vertex
public func ParseXorMappedAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress
```

ParseXorMappedAddress decodes an XOR-MAPPED-ADDRESS attribute.

### func ParseXorPeerAddress <a id="func-ParseXorPeerAddress"></a>

```vertex
public func ParseXorPeerAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress
```

ParseXorPeerAddress decodes an XOR-PEER-ADDRESS attribute.

### func ParseXorRelayedAddress <a id="func-ParseXorRelayedAddress"></a>

```vertex
public func ParseXorRelayedAddress(_ attr: Attribute, transactionId: [uint8]) throws -> udp.SocketAddress
```

ParseXorRelayedAddress decodes an XOR-RELAYED-ADDRESS attribute.

## Types

### struct Attribute <a id="struct-Attribute"></a>

```vertex
public struct Attribute
```

Attribute represents a raw Type-Length-Value (TLV) STUN attribute.

#### Initializers

<a id="Attribute.init"></a>

```vertex
public init(type: uint16, value: [uint8])
```

#### Properties

<a id="Attribute.Type"></a>

```vertex
public var Type: uint16
```

<a id="Attribute.Value"></a>

```vertex
public var Value: [uint8]
```

### struct AttributeType <a id="struct-AttributeType"></a>

```vertex
public struct AttributeType
```

STUN & TURN & ICE Attribute Types (RFC 8489, RFC 8656, RFC 8445)

#### Properties

<a id="AttributeType.MappedAddress"></a>

```vertex
public static let MappedAddress: uint16 = 0x0001
```

<a id="AttributeType.Username"></a>

```vertex
public static let Username: uint16 = 0x0006
```

<a id="AttributeType.MessageIntegrity"></a>

```vertex
public static let MessageIntegrity: uint16 = 0x0008
```

<a id="AttributeType.ErrorCode"></a>

```vertex
public static let ErrorCode: uint16 = 0x0009
```

<a id="AttributeType.UnknownAttributes"></a>

```vertex
public static let UnknownAttributes: uint16 = 0x000A
```

<a id="AttributeType.ChannelNumber"></a>

```vertex
public static let ChannelNumber: uint16 = 0x000C
```

<a id="AttributeType.Lifetime"></a>

```vertex
public static let Lifetime: uint16 = 0x000D
```

<a id="AttributeType.XorPeerAddress"></a>

```vertex
public static let XorPeerAddress: uint16 = 0x0012
```

<a id="AttributeType.Data"></a>

```vertex
public static let Data: uint16 = 0x0013
```

<a id="AttributeType.Realm"></a>

```vertex
public static let Realm: uint16 = 0x0014
```

<a id="AttributeType.Nonce"></a>

```vertex
public static let Nonce: uint16 = 0x0015
```

<a id="AttributeType.XorRelayedAddress"></a>

```vertex
public static let XorRelayedAddress: uint16 = 0x0016
```

<a id="AttributeType.RequestedTransport"></a>

```vertex
public static let RequestedTransport: uint16 = 0x0019
```

<a id="AttributeType.XorMappedAddress"></a>

```vertex
public static let XorMappedAddress: uint16 = 0x0020
```

<a id="AttributeType.Priority"></a>

```vertex
public static let Priority: uint16 = 0x0024
```

<a id="AttributeType.UseCandidate"></a>

```vertex
public static let UseCandidate: uint16 = 0x0025
```

<a id="AttributeType.MessageIntegritySha256"></a>

```vertex
public static let MessageIntegritySha256: uint16 = 0x001C
```

<a id="AttributeType.Fingerprint"></a>

```vertex
public static let Fingerprint: uint16 = 0x0080
```

<a id="AttributeType.IceControlled"></a>

```vertex
public static let IceControlled: uint16 = 0x8029
```

<a id="AttributeType.IceControlling"></a>

```vertex
public static let IceControlling: uint16 = 0x802A
```

<a id="AttributeType.Software"></a>

```vertex
public static let Software: uint16 = 0x8022
```

<a id="AttributeType.AlternateServer"></a>

```vertex
public static let AlternateServer: uint16 = 0x8023
```

### struct Client <a id="struct-Client"></a>

```vertex
public struct Client
```

Client queries STUN servers to discover NAT mappings and reflexive IP addresses.

#### Initializers

<a id="Client.init"></a>

```vertex
public init(timeoutMs: int32 = 3000)
```

#### Properties

<a id="Client.TimeoutMs"></a>

```vertex
public var TimeoutMs: int32
```

#### Methods

<a id="Client.Query"></a>

```vertex
public func Query(server: string) async throws -> udp.SocketAddress
```

Query sends an RFC 8489 Binding Request to the specified STUN server
(e.g. "stun.cloudflare.com:3478" or "127.0.0.1:3478") and returns the reflexive address.

### struct ErrorCodeInfo <a id="struct-ErrorCodeInfo"></a>

```vertex
public struct ErrorCodeInfo
```

#### Initializers

<a id="ErrorCodeInfo.init"></a>

```vertex
public init(code: int, reason: string = "")
```

#### Properties

<a id="ErrorCodeInfo.Code"></a>

```vertex
public var Code: int
```

<a id="ErrorCodeInfo.Reason"></a>

```vertex
public var Reason: string
```

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header
```

#### Properties

<a id="Header.Size"></a>

```vertex
public static let Size: int = 20
```

<a id="Header.MagicCookie"></a>

```vertex
public static let MagicCookie: uint32 = 0x2112A442
```

### struct Message <a id="struct-Message"></a>

```vertex
public struct Message
```

Message represents an RFC 8489 STUN protocol packet.

#### Initializers

<a id="Message.init"></a>

```vertex
public init(type: uint16, transactionId: [uint8]? = nil)
```

#### Properties

<a id="Message.Type"></a>

```vertex
public var Type: uint16
```

<a id="Message.TransactionId"></a>

```vertex
public var TransactionId: [uint8]
```

<a id="Message.Attributes"></a>

```vertex
public var Attributes: [Attribute] = []
```

#### Methods

<a id="Message.AddAttribute"></a>

```vertex
public mutating func AddAttribute(_ attr: Attribute)
```

Adds an attribute to the message.

<a id="Message.GetAttribute"></a>

```vertex
public func GetAttribute(_ attrType: uint16) -> Attribute?
```

Finds the first attribute of the given type.

<a id="Message.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

Encodes the STUN message into a raw byte array.

<a id="Message.AddFingerprint"></a>

```vertex
public mutating func AddFingerprint()
```

Adds an RFC 8489 Section 14.7 FINGERPRINT attribute to the message.

<a id="Message.AddMessageIntegrity"></a>

```vertex
public mutating func AddMessageIntegrity(key: [uint8])
```

Adds an RFC 8489 Section 14.5 MESSAGE-INTEGRITY attribute using HMAC-SHA1.

<a id="Message.VerifyMessageIntegrity"></a>

```vertex
public func VerifyMessageIntegrity(key: [uint8]) -> bool
```

Verifies the MESSAGE-INTEGRITY attribute against the provided HMAC key.

<a id="Message.ValidateFingerprint"></a>

```vertex
public static func ValidateFingerprint(_ raw: [uint8]) -> bool
```

Validates the FINGERPRINT attribute in an encoded STUN packet.

<a id="Message.Decode"></a>

```vertex
public static func Decode(_ raw: [uint8]) throws -> Message
```

Decodes a STUN message from raw received network bytes.

### struct MessageType <a id="struct-MessageType"></a>

```vertex
public struct MessageType
```

STUN Message Types (RFC 8489 Section 18.1)

#### Properties

<a id="MessageType.BindingRequest"></a>

```vertex
public static let BindingRequest: uint16 = 0x0001
```

<a id="MessageType.BindingIndication"></a>

```vertex
public static let BindingIndication: uint16 = 0x0011
```

<a id="MessageType.BindingResponse"></a>

```vertex
public static let BindingResponse: uint16 = 0x0101
```

<a id="MessageType.BindingErrorResponse"></a>

```vertex
public static let BindingErrorResponse: uint16 = 0x0111
```

### struct StunAddress <a id="struct-StunAddress"></a>

```vertex
public struct StunAddress
```

StunAddress represents a discovered reflexive or mapped address from a STUN server.

#### Initializers

<a id="StunAddress.init"></a>

```vertex
public init(host: string, port: uint16)
```

<a id="StunAddress.init-2"></a>

```vertex
public init(address: udp.SocketAddress)
```

#### Properties

<a id="StunAddress.Host"></a>

```vertex
public var Host: string
```

<a id="StunAddress.Port"></a>

```vertex
public var Port: uint16
```

#### Methods

<a id="StunAddress.ToString"></a>

```vertex
public func ToString() -> string
```

### enum StunError <a id="enum-StunError"></a>

```vertex
public enum StunError: Error
```

StunError represents STUN packet parsing, encoding, or transaction failures.

#### Cases

<a id="StunError.invalidHeader"></a>

```vertex
case invalidHeader(string)
```

<a id="StunError.invalidMagicCookie"></a>

```vertex
case invalidMagicCookie
```

<a id="StunError.malformedAttribute"></a>

```vertex
case malformedAttribute(string)
```

<a id="StunError.attributeNotFound"></a>

```vertex
case attributeNotFound(uint16)
```

<a id="StunError.invalidFingerprint"></a>

```vertex
case invalidFingerprint
```

<a id="StunError.transactionMismatch"></a>

```vertex
case transactionMismatch
```

<a id="StunError.timedOut"></a>

```vertex
case timedOut(string)
```

#### Properties

<a id="StunError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- attributes.vs
- client.vs
- message.vs
- server.vs
- types.vs
