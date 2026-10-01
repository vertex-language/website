# package webrtc

```vertex
import "net/webrtc"
```

## Index

- [`func BuildSdp(type: string, ufrag: string, pwd: string, fingerprint: string, setup: string, sctpPort: uint16, candidates: [ice.Candidate]) -> string`](#func-BuildSdp)
- [`func CreatePeerConnection() async throws -> RTCPeerConnection`](#func-CreatePeerConnection)
- [`func CreatePeerConnection(configuration: RTCConfiguration) async throws -> RTCPeerConnection`](#func-CreatePeerConnection-2)
- [`func NewPeerConnection(socket: udp.UdpSocket, configuration: RTCConfiguration) -> RTCPeerConnection`](#func-NewPeerConnection)
- [`func ParseSdp(_ sdp: string, type: string) throws -> ParsedSdp`](#func-ParseSdp)
- [`struct InboundKind`](#struct-InboundKind)
  - [`static let None: int = 0`](#InboundKind.None)
  - [`static let AckResponseNeeded: int = 1`](#InboundKind.AckResponseNeeded)
  - [`static let Text: int = 2`](#InboundKind.Text)
  - [`static let Binary: int = 3`](#InboundKind.Binary)
- [`struct ParsedSdp`](#struct-ParsedSdp)
  - [`var Type: string`](#ParsedSdp.Type)
  - [`var Ufrag: string`](#ParsedSdp.Ufrag)
  - [`var Pwd: string`](#ParsedSdp.Pwd)
  - [`var Fingerprint: string`](#ParsedSdp.Fingerprint)
  - [`var Setup: string`](#ParsedSdp.Setup)
  - [`var SctpPort: uint16`](#ParsedSdp.SctpPort)
  - [`var Candidates: [ice.Candidate]`](#ParsedSdp.Candidates)
- [`struct RTCConfiguration`](#struct-RTCConfiguration)
  - [`init(iceServers: [RTCIceServer] = [])`](#RTCConfiguration.init)
  - [`var IceServers: [RTCIceServer]`](#RTCConfiguration.IceServers)
- [`struct RTCDataChannelState`](#struct-RTCDataChannelState)
  - [`static let Connecting: int = 0`](#RTCDataChannelState.Connecting)
  - [`static let Open: int = 1`](#RTCDataChannelState.Open)
  - [`static let Closing: int = 2`](#RTCDataChannelState.Closing)
  - [`static let Closed: int = 3`](#RTCDataChannelState.Closed)
- [`struct RTCIceConnectionState`](#struct-RTCIceConnectionState)
  - [`static let New: int = 0`](#RTCIceConnectionState.New)
  - [`static let Checking: int = 1`](#RTCIceConnectionState.Checking)
  - [`static let Connected: int = 2`](#RTCIceConnectionState.Connected)
  - [`static let Completed: int = 3`](#RTCIceConnectionState.Completed)
  - [`static let Failed: int = 4`](#RTCIceConnectionState.Failed)
  - [`static let Disconnected: int = 5`](#RTCIceConnectionState.Disconnected)
  - [`static let Closed: int = 6`](#RTCIceConnectionState.Closed)
- [`struct RTCIceServer`](#struct-RTCIceServer)
  - [`init(urls: [string])`](#RTCIceServer.init)
  - [`init(urls: [string], username: string, credential: string)`](#RTCIceServer.init-2)
  - [`var Urls: [string]`](#RTCIceServer.Urls)
  - [`var Username: string`](#RTCIceServer.Username)
  - [`var Credential: string`](#RTCIceServer.Credential)
- [`struct RTCInboundKind`](#struct-RTCInboundKind)
  - [`static let None: int = 0`](#RTCInboundKind.None)
  - [`static let AckResponseNeeded: int = 1`](#RTCInboundKind.AckResponseNeeded)
  - [`static let Text: int = 2`](#RTCInboundKind.Text)
  - [`static let Binary: int = 3`](#RTCInboundKind.Binary)
- [`struct RTCPeerConnection`](#struct-RTCPeerConnection)
  - [`init(socket: udp.UdpSocket, configuration: RTCConfiguration)`](#RTCPeerConnection.init)
  - [`var SignalingState: int`](#RTCPeerConnection.SignalingState)
  - [`var IceConnectionState: int`](#RTCPeerConnection.IceConnectionState)
  - [`var ConnectionState: int`](#RTCPeerConnection.ConnectionState)
  - [`var Configuration: RTCConfiguration`](#RTCPeerConnection.Configuration)
  - [`var LocalUfrag: string`](#RTCPeerConnection.LocalUfrag)
  - [`var LocalPwd: string`](#RTCPeerConnection.LocalPwd)
  - [`var RemoteUfrag: string`](#RTCPeerConnection.RemoteUfrag)
  - [`var RemotePwd: string`](#RTCPeerConnection.RemotePwd)
  - [`var LocalFingerprint: string`](#RTCPeerConnection.LocalFingerprint)
  - [`var RemoteFingerprint: string`](#RTCPeerConnection.RemoteFingerprint)
  - [`var LocalDescription: RTCSessionDescription`](#RTCPeerConnection.LocalDescription)
  - [`var RemoteDescription: RTCSessionDescription`](#RTCPeerConnection.RemoteDescription)
  - [`var HasLocalDescription: bool`](#RTCPeerConnection.HasLocalDescription)
  - [`var HasRemoteDescription: bool`](#RTCPeerConnection.HasRemoteDescription)
  - [`var IceAgent: ice.Agent`](#RTCPeerConnection.IceAgent)
  - [`var SctpAssoc: sctp.Association`](#RTCPeerConnection.SctpAssoc)
  - [`var DataChannels: [datachannel.RTCDataChannel]`](#RTCPeerConnection.DataChannels)
  - [`var NextChannelId: uint16`](#RTCPeerConnection.NextChannelId)
  - [`var DtlsCipher: dtls.RecordCipher`](#RTCPeerConnection.DtlsCipher)
  - [`var DtlsDecipher: dtls.RecordCipher`](#RTCPeerConnection.DtlsDecipher)
  - [`static func Create() async throws -> RTCPeerConnection`](#RTCPeerConnection.Create)
  - [`static func Create(configuration: RTCConfiguration) async throws -> RTCPeerConnection`](#RTCPeerConnection.Create-2)
  - [`mutating func CreateOffer() throws -> RTCSessionDescription`](#RTCPeerConnection.CreateOffer)
  - [`mutating func CreateAnswer() throws -> RTCSessionDescription`](#RTCPeerConnection.CreateAnswer)
  - [`mutating func SetLocalDescription(_ desc: RTCSessionDescription) throws`](#RTCPeerConnection.SetLocalDescription)
  - [`mutating func SetRemoteDescription(_ desc: RTCSessionDescription) throws`](#RTCPeerConnection.SetRemoteDescription)
  - [`mutating func AddIceCandidate(_ candidate: ice.Candidate)`](#RTCPeerConnection.AddIceCandidate)
  - [`mutating func CreateDataChannel(label: string, options: datachannel.RTCDataChannelInit) -> datachannel.RTCDataChannel`](#RTCPeerConnection.CreateDataChannel)
  - [`mutating func CreateDataChannel(label: string) -> datachannel.RTCDataChannel`](#RTCPeerConnection.CreateDataChannel-2)
  - [`mutating func SetDataChannelState(channelId: uint16, state: int)`](#RTCPeerConnection.SetDataChannelState)
  - [`mutating func ProtectTextMessage(channelId: uint16, text: string) throws -> [uint8]`](#RTCPeerConnection.ProtectTextMessage)
  - [`mutating func ProcessIncomingDatagram(_ datagram: [uint8]) throws -> [datachannel.DataChannelInboundResult]`](#RTCPeerConnection.ProcessIncomingDatagram)
  - [`mutating func SetConnected()`](#RTCPeerConnection.SetConnected)
  - [`mutating func Close()`](#RTCPeerConnection.Close)
- [`struct RTCPeerConnectionState`](#struct-RTCPeerConnectionState)
  - [`static let New: int = 0`](#RTCPeerConnectionState.New)
  - [`static let Connecting: int = 1`](#RTCPeerConnectionState.Connecting)
  - [`static let Connected: int = 2`](#RTCPeerConnectionState.Connected)
  - [`static let Disconnected: int = 3`](#RTCPeerConnectionState.Disconnected)
  - [`static let Failed: int = 4`](#RTCPeerConnectionState.Failed)
  - [`static let Closed: int = 5`](#RTCPeerConnectionState.Closed)
- [`struct RTCSdpType`](#struct-RTCSdpType)
  - [`static let Offer: string = "offer"`](#RTCSdpType.Offer)
  - [`static let Answer: string = "answer"`](#RTCSdpType.Answer)
  - [`static let Pranswer: string = "pranswer"`](#RTCSdpType.Pranswer)
  - [`static let Rollback: string = "rollback"`](#RTCSdpType.Rollback)
- [`struct RTCSessionDescription`](#struct-RTCSessionDescription)
  - [`init(type: string, sdp: string)`](#RTCSessionDescription.init)
  - [`var Type: string`](#RTCSessionDescription.Type)
  - [`var Sdp: string`](#RTCSessionDescription.Sdp)
- [`struct RTCSignalingState`](#struct-RTCSignalingState)
  - [`static let Stable: int = 0`](#RTCSignalingState.Stable)
  - [`static let HaveLocalOffer: int = 1`](#RTCSignalingState.HaveLocalOffer)
  - [`static let HaveRemoteOffer: int = 2`](#RTCSignalingState.HaveRemoteOffer)
  - [`static let HaveLocalPranswer: int = 3`](#RTCSignalingState.HaveLocalPranswer)
  - [`static let HaveRemotePranswer: int = 4`](#RTCSignalingState.HaveRemotePranswer)
  - [`static let Closed: int = 5`](#RTCSignalingState.Closed)
- [`enum WebRtcError: Error`](#enum-WebRtcError)

## Functions

### func BuildSdp <a id="func-BuildSdp"></a>

```vertex
public func BuildSdp(type: string,
                     ufrag: string,
                     pwd: string,
                     fingerprint: string,
                     setup: string,
                     sctpPort: uint16,
                     candidates: [ice.Candidate]) -> string
```

BuildSdp constructs an RFC 8866 / RFC 8839 compliant SDP description for WebRTC DataChannels.

### func CreatePeerConnection <a id="func-CreatePeerConnection"></a>

```vertex
public func CreatePeerConnection() async throws -> RTCPeerConnection
```

Creates a new WebRTC PeerConnection with default configuration and autonomously bound socket.

### func CreatePeerConnection <a id="func-CreatePeerConnection-2"></a>

```vertex
public func CreatePeerConnection(configuration: RTCConfiguration) async throws -> RTCPeerConnection
```

Creates a new WebRTC PeerConnection with the specified configuration and autonomously bound socket.

### func NewPeerConnection <a id="func-NewPeerConnection"></a>

```vertex
public func NewPeerConnection(socket: udp.UdpSocket, configuration: RTCConfiguration) -> RTCPeerConnection
```

Creates a new RTCPeerConnection configured with ICE Agent, DTLS ciphers, and SCTP association.

### func ParseSdp <a id="func-ParseSdp"></a>

```vertex
public func ParseSdp(_ sdp: string, type: string) throws -> ParsedSdp
```

ParseSdp parses a WebRTC SDP string into structured fields.

## Types

### struct InboundKind <a id="struct-InboundKind"></a>

```vertex
public struct InboundKind
```

#### Properties

<a id="InboundKind.None"></a>

```vertex
public static let None: int = 0
```

<a id="InboundKind.AckResponseNeeded"></a>

```vertex
public static let AckResponseNeeded: int = 1
```

<a id="InboundKind.Text"></a>

```vertex
public static let Text: int = 2
```

<a id="InboundKind.Binary"></a>

```vertex
public static let Binary: int = 3
```

### struct ParsedSdp <a id="struct-ParsedSdp"></a>

```vertex
public struct ParsedSdp
```

ParsedSdp contains structured fields extracted from an SDP description.

#### Properties

<a id="ParsedSdp.Type"></a>

```vertex
public var Type: string
```

<a id="ParsedSdp.Ufrag"></a>

```vertex
public var Ufrag: string
```

<a id="ParsedSdp.Pwd"></a>

```vertex
public var Pwd: string
```

<a id="ParsedSdp.Fingerprint"></a>

```vertex
public var Fingerprint: string
```

<a id="ParsedSdp.Setup"></a>

```vertex
public var Setup: string
```

<a id="ParsedSdp.SctpPort"></a>

```vertex
public var SctpPort: uint16
```

<a id="ParsedSdp.Candidates"></a>

```vertex
public var Candidates: [ice.Candidate]
```

### struct RTCConfiguration <a id="struct-RTCConfiguration"></a>

```vertex
public struct RTCConfiguration
```

#### Initializers

<a id="RTCConfiguration.init"></a>

```vertex
public init(iceServers: [RTCIceServer] = [])
```

#### Properties

<a id="RTCConfiguration.IceServers"></a>

```vertex
public var IceServers: [RTCIceServer]
```

### struct RTCDataChannelState <a id="struct-RTCDataChannelState"></a>

```vertex
public struct RTCDataChannelState
```

#### Properties

<a id="RTCDataChannelState.Connecting"></a>

```vertex
public static let Connecting: int = 0
```

<a id="RTCDataChannelState.Open"></a>

```vertex
public static let Open: int = 1
```

<a id="RTCDataChannelState.Closing"></a>

```vertex
public static let Closing: int = 2
```

<a id="RTCDataChannelState.Closed"></a>

```vertex
public static let Closed: int = 3
```

### struct RTCIceConnectionState <a id="struct-RTCIceConnectionState"></a>

```vertex
public struct RTCIceConnectionState
```

#### Properties

<a id="RTCIceConnectionState.New"></a>

```vertex
public static let New: int = 0
```

<a id="RTCIceConnectionState.Checking"></a>

```vertex
public static let Checking: int = 1
```

<a id="RTCIceConnectionState.Connected"></a>

```vertex
public static let Connected: int = 2
```

<a id="RTCIceConnectionState.Completed"></a>

```vertex
public static let Completed: int = 3
```

<a id="RTCIceConnectionState.Failed"></a>

```vertex
public static let Failed: int = 4
```

<a id="RTCIceConnectionState.Disconnected"></a>

```vertex
public static let Disconnected: int = 5
```

<a id="RTCIceConnectionState.Closed"></a>

```vertex
public static let Closed: int = 6
```

### struct RTCIceServer <a id="struct-RTCIceServer"></a>

```vertex
public struct RTCIceServer
```

#### Initializers

<a id="RTCIceServer.init"></a>

```vertex
public init(urls: [string])
```

<a id="RTCIceServer.init-2"></a>

```vertex
public init(urls: [string], username: string, credential: string)
```

#### Properties

<a id="RTCIceServer.Urls"></a>

```vertex
public var Urls: [string]
```

<a id="RTCIceServer.Username"></a>

```vertex
public var Username: string
```

<a id="RTCIceServer.Credential"></a>

```vertex
public var Credential: string
```

### struct RTCInboundKind <a id="struct-RTCInboundKind"></a>

```vertex
public struct RTCInboundKind
```

#### Properties

<a id="RTCInboundKind.None"></a>

```vertex
public static let None: int = 0
```

<a id="RTCInboundKind.AckResponseNeeded"></a>

```vertex
public static let AckResponseNeeded: int = 1
```

<a id="RTCInboundKind.Text"></a>

```vertex
public static let Text: int = 2
```

<a id="RTCInboundKind.Binary"></a>

```vertex
public static let Binary: int = 3
```

### struct RTCPeerConnection <a id="struct-RTCPeerConnection"></a>

```vertex
public struct RTCPeerConnection
```

RTCPeerConnection represents a WebRTC peer connection coordinating ICE, DTLS, SCTP, and DataChannels (RFC 9429 / W3C).

#### Initializers

<a id="RTCPeerConnection.init"></a>

```vertex
public init(socket: udp.UdpSocket, configuration: RTCConfiguration)
```

#### Properties

<a id="RTCPeerConnection.SignalingState"></a>

```vertex
public var SignalingState: int
```

<a id="RTCPeerConnection.IceConnectionState"></a>

```vertex
public var IceConnectionState: int
```

<a id="RTCPeerConnection.ConnectionState"></a>

```vertex
public var ConnectionState: int
```

<a id="RTCPeerConnection.Configuration"></a>

```vertex
public var Configuration: RTCConfiguration
```

<a id="RTCPeerConnection.LocalUfrag"></a>

```vertex
public var LocalUfrag: string
```

<a id="RTCPeerConnection.LocalPwd"></a>

```vertex
public var LocalPwd: string
```

<a id="RTCPeerConnection.RemoteUfrag"></a>

```vertex
public var RemoteUfrag: string
```

<a id="RTCPeerConnection.RemotePwd"></a>

```vertex
public var RemotePwd: string
```

<a id="RTCPeerConnection.LocalFingerprint"></a>

```vertex
public var LocalFingerprint: string
```

<a id="RTCPeerConnection.RemoteFingerprint"></a>

```vertex
public var RemoteFingerprint: string
```

<a id="RTCPeerConnection.LocalDescription"></a>

```vertex
public var LocalDescription: RTCSessionDescription
```

<a id="RTCPeerConnection.RemoteDescription"></a>

```vertex
public var RemoteDescription: RTCSessionDescription
```

<a id="RTCPeerConnection.HasLocalDescription"></a>

```vertex
public var HasLocalDescription: bool
```

<a id="RTCPeerConnection.HasRemoteDescription"></a>

```vertex
public var HasRemoteDescription: bool
```

<a id="RTCPeerConnection.IceAgent"></a>

```vertex
public var IceAgent: ice.Agent
```

<a id="RTCPeerConnection.SctpAssoc"></a>

```vertex
public var SctpAssoc: sctp.Association
```

<a id="RTCPeerConnection.DataChannels"></a>

```vertex
public var DataChannels: [datachannel.RTCDataChannel]
```

<a id="RTCPeerConnection.NextChannelId"></a>

```vertex
public var NextChannelId: uint16
```

<a id="RTCPeerConnection.DtlsCipher"></a>

```vertex
public var DtlsCipher: dtls.RecordCipher
```

<a id="RTCPeerConnection.DtlsDecipher"></a>

```vertex
public var DtlsDecipher: dtls.RecordCipher
```

#### Methods

<a id="RTCPeerConnection.Create"></a>

```vertex
public static func Create() async throws -> RTCPeerConnection
```

Creates an RTCPeerConnection with a default configuration and an autonomously bound UDP socket.

<a id="RTCPeerConnection.Create-2"></a>

```vertex
public static func Create(configuration: RTCConfiguration) async throws -> RTCPeerConnection
```

Creates an RTCPeerConnection with the specified configuration and an autonomously bound UDP socket.

<a id="RTCPeerConnection.CreateOffer"></a>

```vertex
public mutating func CreateOffer() throws -> RTCSessionDescription
```

Creates an RFC 8866 / RFC 9429 SDP offer.

<a id="RTCPeerConnection.CreateAnswer"></a>

```vertex
public mutating func CreateAnswer() throws -> RTCSessionDescription
```

Creates an RFC 8866 / RFC 9429 SDP answer in response to a remote offer.

<a id="RTCPeerConnection.SetLocalDescription"></a>

```vertex
public mutating func SetLocalDescription(_ desc: RTCSessionDescription) throws
```

Sets the local description on the peer connection.

<a id="RTCPeerConnection.SetRemoteDescription"></a>

```vertex
public mutating func SetRemoteDescription(_ desc: RTCSessionDescription) throws
```

Sets the remote description on the peer connection and parses candidates/credentials.

<a id="RTCPeerConnection.AddIceCandidate"></a>

```vertex
public mutating func AddIceCandidate(_ candidate: ice.Candidate)
```

Adds a remote Trickle ICE candidate.

<a id="RTCPeerConnection.CreateDataChannel"></a>

```vertex
public mutating func CreateDataChannel(label: string, options: datachannel.RTCDataChannelInit) -> datachannel.RTCDataChannel
```

Creates a new RTCDataChannel on this peer connection.

<a id="RTCPeerConnection.CreateDataChannel-2"></a>

```vertex
public mutating func CreateDataChannel(label: string) -> datachannel.RTCDataChannel
```

Creates a new RTCDataChannel with default options.

<a id="RTCPeerConnection.SetDataChannelState"></a>

```vertex
public mutating func SetDataChannelState(channelId: uint16, state: int)
```

Updates the state of a registered DataChannel.

<a id="RTCPeerConnection.ProtectTextMessage"></a>

```vertex
public mutating func ProtectTextMessage(channelId: uint16, text: string) throws -> [uint8]
```

Encapsulates a DataChannel text message through SCTP and DTLS 1.3 encryption.

<a id="RTCPeerConnection.ProcessIncomingDatagram"></a>

```vertex
public mutating func ProcessIncomingDatagram(_ datagram: [uint8]) throws -> [datachannel.DataChannelInboundResult]
```

Decapsulates and decrypts a received datagram through DTLS 1.3, SCTP, and DataChannel.

<a id="RTCPeerConnection.SetConnected"></a>

```vertex
public mutating func SetConnected()
```

Establishes the peer connection state to Connected.

<a id="RTCPeerConnection.Close"></a>

```vertex
public mutating func Close()
```

Closes the peer connection and releases resources.

### struct RTCPeerConnectionState <a id="struct-RTCPeerConnectionState"></a>

```vertex
public struct RTCPeerConnectionState
```

#### Properties

<a id="RTCPeerConnectionState.New"></a>

```vertex
public static let New: int = 0
```

<a id="RTCPeerConnectionState.Connecting"></a>

```vertex
public static let Connecting: int = 1
```

<a id="RTCPeerConnectionState.Connected"></a>

```vertex
public static let Connected: int = 2
```

<a id="RTCPeerConnectionState.Disconnected"></a>

```vertex
public static let Disconnected: int = 3
```

<a id="RTCPeerConnectionState.Failed"></a>

```vertex
public static let Failed: int = 4
```

<a id="RTCPeerConnectionState.Closed"></a>

```vertex
public static let Closed: int = 5
```

### struct RTCSdpType <a id="struct-RTCSdpType"></a>

```vertex
public struct RTCSdpType
```

#### Properties

<a id="RTCSdpType.Offer"></a>

```vertex
public static let Offer: string = "offer"
```

<a id="RTCSdpType.Answer"></a>

```vertex
public static let Answer: string = "answer"
```

<a id="RTCSdpType.Pranswer"></a>

```vertex
public static let Pranswer: string = "pranswer"
```

<a id="RTCSdpType.Rollback"></a>

```vertex
public static let Rollback: string = "rollback"
```

### struct RTCSessionDescription <a id="struct-RTCSessionDescription"></a>

```vertex
public struct RTCSessionDescription
```

#### Initializers

<a id="RTCSessionDescription.init"></a>

```vertex
public init(type: string, sdp: string)
```

#### Properties

<a id="RTCSessionDescription.Type"></a>

```vertex
public var Type: string
```

<a id="RTCSessionDescription.Sdp"></a>

```vertex
public var Sdp: string
```

### struct RTCSignalingState <a id="struct-RTCSignalingState"></a>

```vertex
public struct RTCSignalingState
```

#### Properties

<a id="RTCSignalingState.Stable"></a>

```vertex
public static let Stable: int = 0
```

<a id="RTCSignalingState.HaveLocalOffer"></a>

```vertex
public static let HaveLocalOffer: int = 1
```

<a id="RTCSignalingState.HaveRemoteOffer"></a>

```vertex
public static let HaveRemoteOffer: int = 2
```

<a id="RTCSignalingState.HaveLocalPranswer"></a>

```vertex
public static let HaveLocalPranswer: int = 3
```

<a id="RTCSignalingState.HaveRemotePranswer"></a>

```vertex
public static let HaveRemotePranswer: int = 4
```

<a id="RTCSignalingState.Closed"></a>

```vertex
public static let Closed: int = 5
```

### enum WebRtcError <a id="enum-WebRtcError"></a>

```vertex
public enum WebRtcError: Error
```

#### Cases

<a id="WebRtcError.invalidState"></a>

```vertex
case invalidState(string)
```

<a id="WebRtcError.invalidSdp"></a>

```vertex
case invalidSdp(string)
```

<a id="WebRtcError.handshakeFailed"></a>

```vertex
case handshakeFailed(string)
```

## Files

- peer_connection.vs
- sdp.vs
- types.vs
