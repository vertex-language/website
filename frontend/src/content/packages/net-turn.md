# package turn

```vertex
import "net/turn"
```

## Index

- [Constants](#constants)
- [`func Connect(server: string, username: string, password: string) throws -> Client`](#func-Connect)
- [`func GenerateKey(username: string, realm: string, password: string) -> [uint8]`](#func-GenerateKey)
- [`func NewClient(socket: udp.UdpSocket, serverAddress: udp.SocketAddress, username: string, password: string) -> Client`](#func-NewClient)
- [`func ParseDataIndication(_ msg: stun.Message) throws -> (data: [uint8], peerAddress: udp.SocketAddress)`](#func-ParseDataIndication)
- [`struct Allocation`](#struct-Allocation)
  - [`var RelayedAddress: udp.SocketAddress`](#Allocation.RelayedAddress)
  - [`var MappedAddress: udp.SocketAddress`](#Allocation.MappedAddress)
  - [`var Lifetime: uint32`](#Allocation.Lifetime)
  - [`var Realm: string`](#Allocation.Realm)
  - [`var Nonce: string`](#Allocation.Nonce)
- [`struct AttributeType`](#struct-AttributeType)
  - [`static let ChannelNumber: uint16 = 0x000C`](#AttributeType.ChannelNumber)
  - [`static let Lifetime: uint16 = 0x000D`](#AttributeType.Lifetime)
  - [`static let XorPeerAddress: uint16 = 0x0012`](#AttributeType.XorPeerAddress)
  - [`static let Data: uint16 = 0x0013`](#AttributeType.Data)
  - [`static let XorRelayedAddress: uint16 = 0x0016`](#AttributeType.XorRelayedAddress)
  - [`static let RequestedTransport: uint16 = 0x0019`](#AttributeType.RequestedTransport)
  - [`static let DontFrag: uint16 = 0x001A`](#AttributeType.DontFrag)
  - [`static let ReservationToken: uint16 = 0x0022`](#AttributeType.ReservationToken)
- [`struct Client`](#struct-Client)
  - [`var Socket: udp.UdpSocket`](#Client.Socket)
  - [`var ServerAddress: udp.SocketAddress`](#Client.ServerAddress)
  - [`var Username: string`](#Client.Username)
  - [`var Password: string`](#Client.Password)
  - [`var Realm: string`](#Client.Realm)
  - [`var Nonce: string`](#Client.Nonce)
  - [`var Key: [uint8]`](#Client.Key)
  - [`var RelayedAddress: udp.SocketAddress`](#Client.RelayedAddress)
  - [`var MappedAddress: udp.SocketAddress`](#Client.MappedAddress)
  - [`var Lifetime: uint32`](#Client.Lifetime)
  - [`mutating func Allocate(lifetime: uint32 = 600) async throws -> Allocation`](#Client.Allocate)
  - [`func CreatePermission(peerAddress: udp.SocketAddress) async throws`](#Client.CreatePermission)
  - [`func SendTo(data: [uint8], peerAddress: udp.SocketAddress) async throws`](#Client.SendTo)
  - [`mutating func Refresh(lifetime: uint32 = 600) async throws -> uint32`](#Client.Refresh)
- [`struct MessageType`](#struct-MessageType)
  - [`static let AllocateRequest: uint16 = 0x0003`](#MessageType.AllocateRequest)
  - [`static let AllocateResponse: uint16 = 0x0103`](#MessageType.AllocateResponse)
  - [`static let AllocateErrorResponse: uint16 = 0x0113`](#MessageType.AllocateErrorResponse)
  - [`static let RefreshRequest: uint16 = 0x0004`](#MessageType.RefreshRequest)
  - [`static let RefreshResponse: uint16 = 0x0104`](#MessageType.RefreshResponse)
  - [`static let RefreshErrorResponse: uint16 = 0x0114`](#MessageType.RefreshErrorResponse)
  - [`static let SendIndication: uint16 = 0x0016`](#MessageType.SendIndication)
  - [`static let DataIndication: uint16 = 0x0017`](#MessageType.DataIndication)
  - [`static let CreatePermissionRequest: uint16 = 0x0008`](#MessageType.CreatePermissionRequest)
  - [`static let CreatePermissionResponse: uint16 = 0x0108`](#MessageType.CreatePermissionResponse)
  - [`static let CreatePermissionErrorResponse: uint16 = 0x0118`](#MessageType.CreatePermissionErrorResponse)
  - [`static let ChannelBindRequest: uint16 = 0x0009`](#MessageType.ChannelBindRequest)
  - [`static let ChannelBindResponse: uint16 = 0x0109`](#MessageType.ChannelBindResponse)
  - [`static let ChannelBindErrorResponse: uint16 = 0x0119`](#MessageType.ChannelBindErrorResponse)
- [`struct Server`](#struct-Server)
  - [`init(realm: string = "vertex.local")`](#Server.init)
  - [`var Realm: string = "vertex.local"`](#Server.Realm)
  - [`var Nonce: string = "vertex-nonce-12345678"`](#Server.Nonce)
  - [`var Users: [string: string] = [:]`](#Server.Users)
  - [`var Sessions: [ServerSession] = []`](#Server.Sessions)
  - [`var NextRelayPort: uint16 = 34000`](#Server.NextRelayPort)
  - [`mutating func AddUser(username: string, password: string)`](#Server.AddUser)
  - [`mutating func HandlePacket(_ raw: [uint8], from: udp.SocketAddress) -> [uint8]?`](#Server.HandlePacket)
- [`struct ServerSession`](#struct-ServerSession)
  - [`var ClientAddress: udp.SocketAddress`](#ServerSession.ClientAddress)
  - [`var RelayedAddress: udp.SocketAddress`](#ServerSession.RelayedAddress)
  - [`var Username: string`](#ServerSession.Username)
  - [`var Realm: string`](#ServerSession.Realm)
  - [`var Nonce: string`](#ServerSession.Nonce)
  - [`var Key: [uint8]`](#ServerSession.Key)
  - [`var Lifetime: uint32`](#ServerSession.Lifetime)
- [`enum TurnError: Error`](#enum-TurnError)
  - [`var Message: string { get }`](#TurnError.Message)

## Constants

<a id="let-AllocateErrorResponse"></a>

```vertex
public let AllocateErrorResponse: uint16 = 0x0113
```

<a id="let-AllocateRequest"></a>

```vertex
public let AllocateRequest: uint16 = 0x0003
```

<a id="let-AllocateResponse"></a>

```vertex
public let AllocateResponse: uint16 = 0x0103
```

<a id="let-AttrChannelNumber"></a>

```vertex
public let AttrChannelNumber: uint16 = 0x000C
```

<a id="let-AttrData"></a>

```vertex
public let AttrData: uint16 = 0x0013
```

<a id="let-AttrDontFrag"></a>

```vertex
public let AttrDontFrag: uint16 = 0x001A
```

<a id="let-AttrLifetime"></a>

```vertex
public let AttrLifetime: uint16 = 0x000D
```

<a id="let-AttrRequestedTransport"></a>

```vertex
public let AttrRequestedTransport: uint16 = 0x0019
```

<a id="let-AttrReservationToken"></a>

```vertex
public let AttrReservationToken: uint16 = 0x0022
```

<a id="let-AttrXorPeerAddress"></a>

```vertex
public let AttrXorPeerAddress: uint16 = 0x0012
```

<a id="let-AttrXorRelayedAddress"></a>

```vertex
public let AttrXorRelayedAddress: uint16 = 0x0016
```

<a id="let-ChannelBindErrorResponse"></a>

```vertex
public let ChannelBindErrorResponse: uint16 = 0x0119
```

<a id="let-ChannelBindRequest"></a>

```vertex
public let ChannelBindRequest: uint16 = 0x0009
```

<a id="let-ChannelBindResponse"></a>

```vertex
public let ChannelBindResponse: uint16 = 0x0109
```

<a id="let-CreatePermissionErrorResponse"></a>

```vertex
public let CreatePermissionErrorResponse: uint16 = 0x0118
```

<a id="let-CreatePermissionRequest"></a>

```vertex
public let CreatePermissionRequest: uint16 = 0x0008
```

<a id="let-CreatePermissionResponse"></a>

```vertex
public let CreatePermissionResponse: uint16 = 0x0108
```

<a id="let-DataIndication"></a>

```vertex
public let DataIndication: uint16 = 0x0017
```

<a id="let-RefreshErrorResponse"></a>

```vertex
public let RefreshErrorResponse: uint16 = 0x0114
```

<a id="let-RefreshRequest"></a>

```vertex
public let RefreshRequest: uint16 = 0x0004
```

<a id="let-RefreshResponse"></a>

```vertex
public let RefreshResponse: uint16 = 0x0104
```

<a id="let-SendIndication"></a>

```vertex
public let SendIndication: uint16 = 0x0016
```

## Functions

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(server: string, username: string, password: string) throws -> Client
```

Connect initializes a TURN client by binding an ephemeral UDP socket and parsing the server address.

### func GenerateKey <a id="func-GenerateKey"></a>

```vertex
public func GenerateKey(username: string, realm: string, password: string) -> [uint8]
```

Computes the TURN Long-Term Credential Key (RFC 5389 Section 15.4 / RFC 8656 Section 9.1.1):
key = MD5(username ":" realm ":" password)

### func NewClient <a id="func-NewClient"></a>

```vertex
public func NewClient(socket: udp.UdpSocket,
                      serverAddress: udp.SocketAddress,
                      username: string,
                      password: string) -> Client
```

Creates a new unallocated TURN Client instance.

### func ParseDataIndication <a id="func-ParseDataIndication"></a>

```vertex
public func ParseDataIndication(_ msg: stun.Message) throws -> (data: [uint8], peerAddress: udp.SocketAddress)
```

Decodes an incoming TURN Data Indication packet (RFC 8656 Section 10).

## Types

### struct Allocation <a id="struct-Allocation"></a>

```vertex
public struct Allocation
```

Allocation represents an established TURN relay allocation on the server.

#### Properties

<a id="Allocation.RelayedAddress"></a>

```vertex
public var RelayedAddress: udp.SocketAddress
```

<a id="Allocation.MappedAddress"></a>

```vertex
public var MappedAddress: udp.SocketAddress
```

<a id="Allocation.Lifetime"></a>

```vertex
public var Lifetime: uint32
```

<a id="Allocation.Realm"></a>

```vertex
public var Realm: string
```

<a id="Allocation.Nonce"></a>

```vertex
public var Nonce: string
```

### struct AttributeType <a id="struct-AttributeType"></a>

```vertex
public struct AttributeType
```

TURN Attribute Types (RFC 8656 Section 18.2)

#### Properties

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

<a id="AttributeType.XorRelayedAddress"></a>

```vertex
public static let XorRelayedAddress: uint16 = 0x0016
```

<a id="AttributeType.RequestedTransport"></a>

```vertex
public static let RequestedTransport: uint16 = 0x0019
```

<a id="AttributeType.DontFrag"></a>

```vertex
public static let DontFrag: uint16 = 0x001A
```

<a id="AttributeType.ReservationToken"></a>

```vertex
public static let ReservationToken: uint16 = 0x0022
```

### struct Client <a id="struct-Client"></a>

```vertex
public struct Client
```

Client coordinates RFC 8656 TURN relay allocation, permissions, and packet transport over UDP.

#### Properties

<a id="Client.Socket"></a>

```vertex
public var Socket: udp.UdpSocket
```

<a id="Client.ServerAddress"></a>

```vertex
public var ServerAddress: udp.SocketAddress
```

<a id="Client.Username"></a>

```vertex
public var Username: string
```

<a id="Client.Password"></a>

```vertex
public var Password: string
```

<a id="Client.Realm"></a>

```vertex
public var Realm: string
```

<a id="Client.Nonce"></a>

```vertex
public var Nonce: string
```

<a id="Client.Key"></a>

```vertex
public var Key: [uint8]
```

<a id="Client.RelayedAddress"></a>

```vertex
public var RelayedAddress: udp.SocketAddress
```

<a id="Client.MappedAddress"></a>

```vertex
public var MappedAddress: udp.SocketAddress
```

<a id="Client.Lifetime"></a>

```vertex
public var Lifetime: uint32
```

#### Methods

<a id="Client.Allocate"></a>

```vertex
public mutating func Allocate(lifetime: uint32 = 600) async throws -> Allocation
```

Allocates a relayed transport address on the TURN server via 401 challenge (RFC 8656 Section 6).

<a id="Client.CreatePermission"></a>

```vertex
public func CreatePermission(peerAddress: udp.SocketAddress) async throws
```

Creates a permission for the peer address to send data to our allocation (RFC 8656 Section 8).

<a id="Client.SendTo"></a>

```vertex
public func SendTo(data: [uint8], peerAddress: udp.SocketAddress) async throws
```

Sends data to a peer through the TURN relay using a Send Indication (RFC 8656 Section 9).

<a id="Client.Refresh"></a>

```vertex
public mutating func Refresh(lifetime: uint32 = 600) async throws -> uint32
```

Refreshes the lifetime of the current allocation (RFC 8656 Section 7).

### struct MessageType <a id="struct-MessageType"></a>

```vertex
public struct MessageType
```

TURN Message Types (RFC 8656 Section 18.1)

#### Properties

<a id="MessageType.AllocateRequest"></a>

```vertex
public static let AllocateRequest: uint16 = 0x0003
```

<a id="MessageType.AllocateResponse"></a>

```vertex
public static let AllocateResponse: uint16 = 0x0103
```

<a id="MessageType.AllocateErrorResponse"></a>

```vertex
public static let AllocateErrorResponse: uint16 = 0x0113
```

<a id="MessageType.RefreshRequest"></a>

```vertex
public static let RefreshRequest: uint16 = 0x0004
```

<a id="MessageType.RefreshResponse"></a>

```vertex
public static let RefreshResponse: uint16 = 0x0104
```

<a id="MessageType.RefreshErrorResponse"></a>

```vertex
public static let RefreshErrorResponse: uint16 = 0x0114
```

<a id="MessageType.SendIndication"></a>

```vertex
public static let SendIndication: uint16 = 0x0016
```

<a id="MessageType.DataIndication"></a>

```vertex
public static let DataIndication: uint16 = 0x0017
```

<a id="MessageType.CreatePermissionRequest"></a>

```vertex
public static let CreatePermissionRequest: uint16 = 0x0008
```

<a id="MessageType.CreatePermissionResponse"></a>

```vertex
public static let CreatePermissionResponse: uint16 = 0x0108
```

<a id="MessageType.CreatePermissionErrorResponse"></a>

```vertex
public static let CreatePermissionErrorResponse: uint16 = 0x0118
```

<a id="MessageType.ChannelBindRequest"></a>

```vertex
public static let ChannelBindRequest: uint16 = 0x0009
```

<a id="MessageType.ChannelBindResponse"></a>

```vertex
public static let ChannelBindResponse: uint16 = 0x0109
```

<a id="MessageType.ChannelBindErrorResponse"></a>

```vertex
public static let ChannelBindErrorResponse: uint16 = 0x0119
```

### struct Server <a id="struct-Server"></a>

```vertex
public struct Server
```

Server provides lightweight RFC 8656 TURN server logic for local testing and relay coordination.

#### Initializers

<a id="Server.init"></a>

```vertex
public init(realm: string = "vertex.local")
```

#### Properties

<a id="Server.Realm"></a>

```vertex
public var Realm: string = "vertex.local"
```

<a id="Server.Nonce"></a>

```vertex
public var Nonce: string = "vertex-nonce-12345678"
```

<a id="Server.Users"></a>

```vertex
public var Users: [string: string] = [:]
```

<a id="Server.Sessions"></a>

```vertex
public var Sessions: [ServerSession] = []
```

username -> password

<a id="Server.NextRelayPort"></a>

```vertex
public var NextRelayPort: uint16 = 34000
```

#### Methods

<a id="Server.AddUser"></a>

```vertex
public mutating func AddUser(username: string, password: string)
```

<a id="Server.HandlePacket"></a>

```vertex
public mutating func HandlePacket(_ raw: [uint8], from: udp.SocketAddress) -> [uint8]?
```

Handles an incoming UDP datagram to the TURN server.
Returns raw response bytes to send back to client, or nil if none.

### struct ServerSession <a id="struct-ServerSession"></a>

```vertex
public struct ServerSession
```

ServerSession tracks an active allocation on the mock/local TURN server.

#### Properties

<a id="ServerSession.ClientAddress"></a>

```vertex
public var ClientAddress: udp.SocketAddress
```

<a id="ServerSession.RelayedAddress"></a>

```vertex
public var RelayedAddress: udp.SocketAddress
```

<a id="ServerSession.Username"></a>

```vertex
public var Username: string
```

<a id="ServerSession.Realm"></a>

```vertex
public var Realm: string
```

<a id="ServerSession.Nonce"></a>

```vertex
public var Nonce: string
```

<a id="ServerSession.Key"></a>

```vertex
public var Key: [uint8]
```

<a id="ServerSession.Lifetime"></a>

```vertex
public var Lifetime: uint32
```

### enum TurnError <a id="enum-TurnError"></a>

```vertex
public enum TurnError: Error
```

TurnError represents protocol, authentication, or allocation errors in TURN.

#### Cases

<a id="TurnError.allocationFailed"></a>

```vertex
case allocationFailed(string)
```

<a id="TurnError.unauthorized"></a>

```vertex
case unauthorized(string)
```

<a id="TurnError.permissionDenied"></a>

```vertex
case permissionDenied(string)
```

<a id="TurnError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="TurnError.timedOut"></a>

```vertex
case timedOut(string)
```

<a id="TurnError.serverError"></a>

```vertex
case serverError(int, string)
```

#### Properties

<a id="TurnError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- client.vs
- server.vs
- types.vs
