# package webtransport

```vertex
import "net/webtransport"
```

## Index

- [`func BuildCapsule(type: uint64, payload: [uint8]) -> [uint8]`](#func-BuildCapsule)
- [`func BuildCloseSessionCapsule(code: uint32, reason: string) -> [uint8]`](#func-BuildCloseSessionCapsule)
- [`func BuildCloseSessionPayload(code: uint32, reason: string) -> [uint8]`](#func-BuildCloseSessionPayload)
- [`func BuildDrainSessionCapsule() -> [uint8]`](#func-BuildDrainSessionCapsule)
- [`func Connect(_ address: string) async throws -> WebTransportSession`](#func-Connect)
- [`func Connect(_ address: string, config: WebTransportConfig) async throws -> WebTransportSession`](#func-Connect-2)
- [`func CreateLoopbackSessionPair(config: WebTransportConfig = WebTransportConfig()) throws -> WebTransportLoopbackPair`](#func-CreateLoopbackSessionPair)
- [`func DecodeDatagram(_ raw: [uint8]) throws -> DecodedDatagram`](#func-DecodeDatagram)
- [`func EncodeDatagram(sessionId: uint64, payload: [uint8]) -> [uint8]`](#func-EncodeDatagram)
- [`func Listen(_ address: string) async throws -> WebTransportListener`](#func-Listen)
- [`func Listen(_ address: string, config: WebTransportConfig) async throws -> WebTransportListener`](#func-Listen-2)
- [`func ParseCapsule(data: [uint8], offset: int = 0) throws -> ParsedCapsule`](#func-ParseCapsule)
- [`func ParseCloseSessionPayload(_ payload: [uint8]) throws -> SessionCloseInfo`](#func-ParseCloseSessionPayload)
- [`func ParseEndpoint(_ address: string) throws -> url.URL`](#func-ParseEndpoint)
- [`struct DecodedDatagram`](#struct-DecodedDatagram)
  - [`init(sessionId: uint64, payload: [uint8])`](#DecodedDatagram.init)
  - [`var SessionId: uint64`](#DecodedDatagram.SessionId)
  - [`var Payload: [uint8]`](#DecodedDatagram.Payload)
- [`struct ParsedCapsule`](#struct-ParsedCapsule)
  - [`init(type: uint64, payload: [uint8], bytesRead: int)`](#ParsedCapsule.init)
  - [`var Type: uint64`](#ParsedCapsule.Type)
  - [`var Payload: [uint8]`](#ParsedCapsule.Payload)
  - [`var BytesRead: int`](#ParsedCapsule.BytesRead)
- [`struct SessionCloseInfo`](#struct-SessionCloseInfo)
  - [`init(code: uint32 = 0, reason: string = "")`](#SessionCloseInfo.init)
  - [`var Code: uint32`](#SessionCloseInfo.Code)
  - [`var Reason: string`](#SessionCloseInfo.Reason)
- [`enum SessionEvent`](#enum-SessionEvent)
- [`struct Upgrader`](#struct-Upgrader)
  - [`init()`](#Upgrader.init)
  - [`func IsWebTransportRequest(req: http.Request) -> bool`](#Upgrader.IsWebTransportRequest)
  - [`func Upgrade(req: http.Request, stream: inout quic.QuicStream, connection: inout quic.QuicConnection, config: WebTransportConfig = WebTransportConfig()) async throws -> WebTransportSession`](#Upgrader.Upgrade)
- [`struct WebTransportCapsuleType`](#struct-WebTransportCapsuleType)
  - [`static let CloseWebTransportSession: uint64 = 0x2843`](#WebTransportCapsuleType.CloseWebTransportSession)
  - [`static let DrainWebTransportSession: uint64 = 0x78ae`](#WebTransportCapsuleType.DrainWebTransportSession)
- [`struct WebTransportConfig`](#struct-WebTransportConfig)
  - [`init(timeoutMs: int32 = 10000, maxDatagramSize: int = 1200, enableDatagrams: bool = true)`](#WebTransportConfig.init)
  - [`var TimeoutMs: int32`](#WebTransportConfig.TimeoutMs)
  - [`var MaxDatagramSize: int`](#WebTransportConfig.MaxDatagramSize)
  - [`var EnableDatagrams: bool`](#WebTransportConfig.EnableDatagrams)
- [`enum WebTransportError: Error`](#enum-WebTransportError)
- [`struct WebTransportFrameType`](#struct-WebTransportFrameType)
  - [`static let Stream: uint64 = 0x41`](#WebTransportFrameType.Stream)
- [`struct WebTransportListener`](#struct-WebTransportListener)
  - [`init(listener: quic.QuicListener, config: WebTransportConfig = WebTransportConfig())`](#WebTransportListener.init)
  - [`var Listener: quic.QuicListener`](#WebTransportListener.Listener)
  - [`var Config: WebTransportConfig`](#WebTransportListener.Config)
  - [`var Port: uint16 { get }`](#WebTransportListener.Port)
  - [`var Address: string { get }`](#WebTransportListener.Address)
  - [`mutating func Accept() async throws -> WebTransportSession`](#WebTransportListener.Accept)
  - [`mutating func Close()`](#WebTransportListener.Close)
- [`struct WebTransportLoopbackPair`](#struct-WebTransportLoopbackPair)
  - [`init(client: WebTransportSession, server: WebTransportSession)`](#WebTransportLoopbackPair.init)
  - [`var Client: WebTransportSession`](#WebTransportLoopbackPair.Client)
  - [`var Server: WebTransportSession`](#WebTransportLoopbackPair.Server)
- [`struct WebTransportReceiveStream`](#struct-WebTransportReceiveStream)
  - [`init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream)`](#WebTransportReceiveStream.init)
  - [`var StreamId: uint64`](#WebTransportReceiveStream.StreamId)
  - [`var SessionId: uint64`](#WebTransportReceiveStream.SessionId)
  - [`var QuicStream: quic.QuicStream`](#WebTransportReceiveStream.QuicStream)
  - [`var HeaderReceived: bool`](#WebTransportReceiveStream.HeaderReceived)
  - [`var IsClosed: bool { get }`](#WebTransportReceiveStream.IsClosed)
  - [`mutating func Read(maxBytes: int = 4096) async throws -> [uint8]`](#WebTransportReceiveStream.Read)
  - [`mutating func ReadText(maxBytes: int = 4096) async throws -> string`](#WebTransportReceiveStream.ReadText)
  - [`mutating func Close() async throws`](#WebTransportReceiveStream.Close)
- [`struct WebTransportSendStream`](#struct-WebTransportSendStream)
  - [`init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream)`](#WebTransportSendStream.init)
  - [`var StreamId: uint64`](#WebTransportSendStream.StreamId)
  - [`var SessionId: uint64`](#WebTransportSendStream.SessionId)
  - [`var QuicStream: quic.QuicStream`](#WebTransportSendStream.QuicStream)
  - [`var HeaderSent: bool`](#WebTransportSendStream.HeaderSent)
  - [`var IsClosed: bool { get }`](#WebTransportSendStream.IsClosed)
  - [`mutating func Write(_ data: [uint8]) async throws`](#WebTransportSendStream.Write)
  - [`mutating func WriteText(_ text: string) async throws`](#WebTransportSendStream.WriteText)
  - [`mutating func WriteAndClose(_ data: [uint8]) async throws`](#WebTransportSendStream.WriteAndClose)
  - [`mutating func Close() async throws`](#WebTransportSendStream.Close)
- [`struct WebTransportSession`](#struct-WebTransportSession)
  - [`init(sessionId: uint64, connection: quic.QuicConnection, connectStream: quic.QuicStream, config: WebTransportConfig = WebTransportConfig())`](#WebTransportSession.init)
  - [`var SessionId: uint64`](#WebTransportSession.SessionId)
  - [`var Connection: quic.QuicConnection`](#WebTransportSession.Connection)
  - [`var ConnectStream: quic.QuicStream`](#WebTransportSession.ConnectStream)
  - [`var IsClosed: bool`](#WebTransportSession.IsClosed)
  - [`var CloseInfo: SessionCloseInfo?`](#WebTransportSession.CloseInfo)
  - [`var Config: WebTransportConfig`](#WebTransportSession.Config)
  - [`var InboundStreams: [WebTransportStream]`](#WebTransportSession.InboundStreams)
  - [`var InboundUniStreams: [WebTransportReceiveStream]`](#WebTransportSession.InboundUniStreams)
  - [`var InboundDatagrams: [[uint8]]`](#WebTransportSession.InboundDatagrams)
  - [`var TrackedStreamIds: [uint64]`](#WebTransportSession.TrackedStreamIds)
  - [`mutating func OpenStream() async throws -> WebTransportStream`](#WebTransportSession.OpenStream)
  - [`mutating func OpenUniStream() async throws -> WebTransportSendStream`](#WebTransportSession.OpenUniStream)
  - [`mutating func AcceptStream() async throws -> WebTransportStream`](#WebTransportSession.AcceptStream)
  - [`mutating func AcceptUniStream() async throws -> WebTransportReceiveStream`](#WebTransportSession.AcceptUniStream)
  - [`mutating func SendDatagram(_ data: [uint8]) async throws`](#WebTransportSession.SendDatagram)
  - [`mutating func ReceiveDatagram() async throws -> [uint8]`](#WebTransportSession.ReceiveDatagram)
  - [`mutating func EnqueueDatagram(_ payload: [uint8])`](#WebTransportSession.EnqueueDatagram)
  - [`mutating func EnqueueStream(_ stream: WebTransportStream)`](#WebTransportSession.EnqueueStream)
  - [`mutating func EnqueueUniStream(_ stream: WebTransportReceiveStream)`](#WebTransportSession.EnqueueUniStream)
  - [`mutating func NextEvent() async throws -> SessionEvent?`](#WebTransportSession.NextEvent)
  - [`mutating func Close(code: uint32 = 0, reason: string = "") async throws`](#WebTransportSession.Close)
- [`struct WebTransportStream`](#struct-WebTransportStream)
  - [`init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream, isInitiator: bool = false)`](#WebTransportStream.init)
  - [`var StreamId: uint64`](#WebTransportStream.StreamId)
  - [`var SessionId: uint64`](#WebTransportStream.SessionId)
  - [`var QuicStream: quic.QuicStream`](#WebTransportStream.QuicStream)
  - [`var HeaderSent: bool`](#WebTransportStream.HeaderSent)
  - [`var HeaderReceived: bool`](#WebTransportStream.HeaderReceived)
  - [`var IsClosed: bool { get }`](#WebTransportStream.IsClosed)
  - [`mutating func Write(_ data: [uint8]) async throws`](#WebTransportStream.Write)
  - [`mutating func WriteText(_ text: string) async throws`](#WebTransportStream.WriteText)
  - [`mutating func WriteAndClose(_ data: [uint8]) async throws`](#WebTransportStream.WriteAndClose)
  - [`mutating func Read(maxBytes: int = 4096) async throws -> [uint8]`](#WebTransportStream.Read)
  - [`mutating func ReadText(maxBytes: int = 4096) async throws -> string`](#WebTransportStream.ReadText)
  - [`mutating func Close() async throws`](#WebTransportStream.Close)
- [`struct WebTransportStreamType`](#struct-WebTransportStreamType)
  - [`static let Uni: uint64 = 0x54`](#WebTransportStreamType.Uni)

## Functions

### func BuildCapsule <a id="func-BuildCapsule"></a>

```vertex
public func BuildCapsule(type: uint64, payload: [uint8]) -> [uint8]
```

Serializes an RFC 9297 Capsule given its type identifier and payload.

### func BuildCloseSessionCapsule <a id="func-BuildCloseSessionCapsule"></a>

```vertex
public func BuildCloseSessionCapsule(code: uint32, reason: string) -> [uint8]
```

Builds a complete CLOSE_WEBTRANSPORT_SESSION capsule frame.

### func BuildCloseSessionPayload <a id="func-BuildCloseSessionPayload"></a>

```vertex
public func BuildCloseSessionPayload(code: uint32, reason: string) -> [uint8]
```

Serializes a CLOSE_WEBTRANSPORT_SESSION (0x2843) capsule payload.

### func BuildDrainSessionCapsule <a id="func-BuildDrainSessionCapsule"></a>

```vertex
public func BuildDrainSessionCapsule() -> [uint8]
```

Builds a complete DRAIN_WEBTRANSPORT_SESSION capsule frame.

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ address: string) async throws -> WebTransportSession
```

Connects to a WebTransport endpoint over HTTP/3 via QUIC (matching webtransport_package.md).

### func Connect <a id="func-Connect-2"></a>

```vertex
public func Connect(_ address: string, config: WebTransportConfig) async throws -> WebTransportSession
```

Connects to a WebTransport endpoint with custom configuration.

### func CreateLoopbackSessionPair <a id="func-CreateLoopbackSessionPair"></a>

```vertex
public func CreateLoopbackSessionPair(config: WebTransportConfig = WebTransportConfig()) throws -> WebTransportLoopbackPair
```

Creates an in-memory loopback pair of connected WebTransport sessions for testing and simulation.

### func DecodeDatagram <a id="func-DecodeDatagram"></a>

```vertex
public func DecodeDatagram(_ raw: [uint8]) throws -> DecodedDatagram
```

Decodes an RFC 9297 WebTransport datagram into its Session ID and inner payload.

### func EncodeDatagram <a id="func-EncodeDatagram"></a>

```vertex
public func EncodeDatagram(sessionId: uint64, payload: [uint8]) -> [uint8]
```

Encapsulates application data into an RFC 9297 WebTransport datagram.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ address: string) async throws -> WebTransportListener
```

Starts listening for incoming WebTransport sessions on the specified address string.

### func Listen <a id="func-Listen-2"></a>

```vertex
public func Listen(_ address: string, config: WebTransportConfig) async throws -> WebTransportListener
```

Starts listening for incoming WebTransport sessions with custom configuration.

### func ParseCapsule <a id="func-ParseCapsule"></a>

```vertex
public func ParseCapsule(data: [uint8], offset: int = 0) throws -> ParsedCapsule
```

Parses an RFC 9297 Capsule from a byte buffer starting at offset.

### func ParseCloseSessionPayload <a id="func-ParseCloseSessionPayload"></a>

```vertex
public func ParseCloseSessionPayload(_ payload: [uint8]) throws -> SessionCloseInfo
```

Parses a CLOSE_WEBTRANSPORT_SESSION capsule payload into SessionCloseInfo.

### func ParseEndpoint <a id="func-ParseEndpoint"></a>

```vertex
public func ParseEndpoint(_ address: string) throws -> url.URL
```

A WebTransport endpoint's URL, parsed: https://, with a host.

## Types

### struct DecodedDatagram <a id="struct-DecodedDatagram"></a>

```vertex
public struct DecodedDatagram
```

Represents a decoded WebTransport datagram.

#### Initializers

<a id="DecodedDatagram.init"></a>

```vertex
public init(sessionId: uint64, payload: [uint8])
```

#### Properties

<a id="DecodedDatagram.SessionId"></a>

```vertex
public var SessionId: uint64
```

<a id="DecodedDatagram.Payload"></a>

```vertex
public var Payload: [uint8]
```

### struct ParsedCapsule <a id="struct-ParsedCapsule"></a>

```vertex
public struct ParsedCapsule
```

Parsed representation of an RFC 9297 Capsule.

#### Initializers

<a id="ParsedCapsule.init"></a>

```vertex
public init(type: uint64, payload: [uint8], bytesRead: int)
```

#### Properties

<a id="ParsedCapsule.Type"></a>

```vertex
public var Type: uint64
```

<a id="ParsedCapsule.Payload"></a>

```vertex
public var Payload: [uint8]
```

<a id="ParsedCapsule.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct SessionCloseInfo <a id="struct-SessionCloseInfo"></a>

```vertex
public struct SessionCloseInfo
```

WebTransport session closure metadata (RFC 9297 Section 4.3).

#### Initializers

<a id="SessionCloseInfo.init"></a>

```vertex
public init(code: uint32 = 0, reason: string = "")
```

#### Properties

<a id="SessionCloseInfo.Code"></a>

```vertex
public var Code: uint32
```

<a id="SessionCloseInfo.Reason"></a>

```vertex
public var Reason: string
```

### enum SessionEvent <a id="enum-SessionEvent"></a>

```vertex
public enum SessionEvent
```

Events dispatched by WebTransportSession.NextEvent().

#### Cases

<a id="SessionEvent.datagram"></a>

```vertex
case datagram([uint8])
```

<a id="SessionEvent.uniStream"></a>

```vertex
case uniStream(WebTransportReceiveStream)
```

<a id="SessionEvent.stream"></a>

```vertex
case stream(WebTransportStream)
```

<a id="SessionEvent.sessionClosed"></a>

```vertex
case sessionClosed(code: uint32, reason: string)
```

### struct Upgrader <a id="struct-Upgrader"></a>

```vertex
public struct Upgrader
```

Upgrader provides helpers for verifying and upgrading incoming HTTP/3 requests to WebTransport.

#### Initializers

<a id="Upgrader.init"></a>

```vertex
public init()
```

#### Methods

<a id="Upgrader.IsWebTransportRequest"></a>

```vertex
public func IsWebTransportRequest(req: http.Request) -> bool
```

Checks if the incoming request is a valid WebTransport extended CONNECT request.

<a id="Upgrader.Upgrade"></a>

```vertex
public func Upgrade(req: http.Request,
                    stream: inout quic.QuicStream,
                    connection: inout quic.QuicConnection,
                    config: WebTransportConfig = WebTransportConfig()) async throws -> WebTransportSession
```

Upgrades an established HTTP/3 stream into an active WebTransport session.

### struct WebTransportCapsuleType <a id="struct-WebTransportCapsuleType"></a>

```vertex
public struct WebTransportCapsuleType
```

RFC 9297 Capsule Types used on the HTTP/3 CONNECT stream.

#### Properties

<a id="WebTransportCapsuleType.CloseWebTransportSession"></a>

```vertex
public static let CloseWebTransportSession: uint64 = 0x2843
```

<a id="WebTransportCapsuleType.DrainWebTransportSession"></a>

```vertex
public static let DrainWebTransportSession: uint64 = 0x78ae
```

### struct WebTransportConfig <a id="struct-WebTransportConfig"></a>

```vertex
public struct WebTransportConfig
```

Configuration options for WebTransport client and server sessions.

#### Initializers

<a id="WebTransportConfig.init"></a>

```vertex
public init(timeoutMs: int32 = 10000, maxDatagramSize: int = 1200, enableDatagrams: bool = true)
```

#### Properties

<a id="WebTransportConfig.TimeoutMs"></a>

```vertex
public var TimeoutMs: int32
```

<a id="WebTransportConfig.MaxDatagramSize"></a>

```vertex
public var MaxDatagramSize: int
```

<a id="WebTransportConfig.EnableDatagrams"></a>

```vertex
public var EnableDatagrams: bool
```

### enum WebTransportError <a id="enum-WebTransportError"></a>

```vertex
public enum WebTransportError: Error
```

Protocol errors encountered in WebTransport sessions (RFC 9297).

#### Cases

<a id="WebTransportError.invalidUrl"></a>

```vertex
case invalidUrl(string)
```

<a id="WebTransportError.handshakeFailed"></a>

```vertex
case handshakeFailed(string)
```

<a id="WebTransportError.sessionClosed"></a>

```vertex
case sessionClosed(code: uint32, reason: string)
```

<a id="WebTransportError.streamClosed"></a>

```vertex
case streamClosed
```

<a id="WebTransportError.protocolViolation"></a>

```vertex
case protocolViolation(string)
```

<a id="WebTransportError.datagramTooLarge"></a>

```vertex
case datagramTooLarge(int)
```

<a id="WebTransportError.connectionClosed"></a>

```vertex
case connectionClosed
```

### struct WebTransportFrameType <a id="struct-WebTransportFrameType"></a>

```vertex
public struct WebTransportFrameType
```

RFC 9297 Stream framing identifiers.

#### Properties

<a id="WebTransportFrameType.Stream"></a>

```vertex
public static let Stream: uint64 = 0x41
```

### struct WebTransportListener <a id="struct-WebTransportListener"></a>

```vertex
public struct WebTransportListener
```

WebTransportListener listens for incoming WebTransport sessions over QUIC.

#### Initializers

<a id="WebTransportListener.init"></a>

```vertex
public init(listener: quic.QuicListener, config: WebTransportConfig = WebTransportConfig())
```

#### Properties

<a id="WebTransportListener.Listener"></a>

```vertex
public var Listener: quic.QuicListener
```

<a id="WebTransportListener.Config"></a>

```vertex
public var Config: WebTransportConfig
```

<a id="WebTransportListener.Port"></a>

```vertex
public var Port: uint16 { get }
```

Bound local port.

<a id="WebTransportListener.Address"></a>

```vertex
public var Address: string { get }
```

Bound local address formatted as "ip:port".

#### Methods

<a id="WebTransportListener.Accept"></a>

```vertex
public mutating func Accept() async throws -> WebTransportSession
```

Accepts the next incoming WebTransport session.

<a id="WebTransportListener.Close"></a>

```vertex
public mutating func Close()
```

Closes the listener.

### struct WebTransportLoopbackPair <a id="struct-WebTransportLoopbackPair"></a>

```vertex
public struct WebTransportLoopbackPair
```

WebTransportLoopbackPair represents an in-memory loopback pair of connected sessions.

#### Initializers

<a id="WebTransportLoopbackPair.init"></a>

```vertex
public init(client: WebTransportSession, server: WebTransportSession)
```

#### Properties

<a id="WebTransportLoopbackPair.Client"></a>

```vertex
public var Client: WebTransportSession
```

<a id="WebTransportLoopbackPair.Server"></a>

```vertex
public var Server: WebTransportSession
```

### struct WebTransportReceiveStream <a id="struct-WebTransportReceiveStream"></a>

```vertex
public struct WebTransportReceiveStream
```

WebTransportReceiveStream represents an incoming unidirectional stream (RFC 9297 Section 4.2).

#### Initializers

<a id="WebTransportReceiveStream.init"></a>

```vertex
public init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream)
```

#### Properties

<a id="WebTransportReceiveStream.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="WebTransportReceiveStream.SessionId"></a>

```vertex
public var SessionId: uint64
```

<a id="WebTransportReceiveStream.QuicStream"></a>

```vertex
public var QuicStream: quic.QuicStream
```

<a id="WebTransportReceiveStream.HeaderReceived"></a>

```vertex
public var HeaderReceived: bool
```

<a id="WebTransportReceiveStream.IsClosed"></a>

```vertex
public var IsClosed: bool { get }
```

#### Methods

<a id="WebTransportReceiveStream.Read"></a>

```vertex
public mutating func Read(maxBytes: int = 4096) async throws -> [uint8]
```

<a id="WebTransportReceiveStream.ReadText"></a>

```vertex
public mutating func ReadText(maxBytes: int = 4096) async throws -> string
```

<a id="WebTransportReceiveStream.Close"></a>

```vertex
public mutating func Close() async throws
```

### struct WebTransportSendStream <a id="struct-WebTransportSendStream"></a>

```vertex
public struct WebTransportSendStream
```

WebTransportSendStream represents an outgoing unidirectional stream (RFC 9297 Section 4.2).

#### Initializers

<a id="WebTransportSendStream.init"></a>

```vertex
public init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream)
```

#### Properties

<a id="WebTransportSendStream.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="WebTransportSendStream.SessionId"></a>

```vertex
public var SessionId: uint64
```

<a id="WebTransportSendStream.QuicStream"></a>

```vertex
public var QuicStream: quic.QuicStream
```

<a id="WebTransportSendStream.HeaderSent"></a>

```vertex
public var HeaderSent: bool
```

<a id="WebTransportSendStream.IsClosed"></a>

```vertex
public var IsClosed: bool { get }
```

#### Methods

<a id="WebTransportSendStream.Write"></a>

```vertex
public mutating func Write(_ data: [uint8]) async throws
```

<a id="WebTransportSendStream.WriteText"></a>

```vertex
public mutating func WriteText(_ text: string) async throws
```

<a id="WebTransportSendStream.WriteAndClose"></a>

```vertex
public mutating func WriteAndClose(_ data: [uint8]) async throws
```

<a id="WebTransportSendStream.Close"></a>

```vertex
public mutating func Close() async throws
```

### struct WebTransportSession <a id="struct-WebTransportSession"></a>

```vertex
public struct WebTransportSession
```

WebTransportSession represents an active RFC 9297 WebTransport session over HTTP/3 / QUIC.

#### Initializers

<a id="WebTransportSession.init"></a>

```vertex
public init(sessionId: uint64,
            connection: quic.QuicConnection,
            connectStream: quic.QuicStream,
            config: WebTransportConfig = WebTransportConfig())
```

#### Properties

<a id="WebTransportSession.SessionId"></a>

```vertex
public var SessionId: uint64
```

<a id="WebTransportSession.Connection"></a>

```vertex
public var Connection: quic.QuicConnection
```

<a id="WebTransportSession.ConnectStream"></a>

```vertex
public var ConnectStream: quic.QuicStream
```

<a id="WebTransportSession.IsClosed"></a>

```vertex
public var IsClosed: bool
```

<a id="WebTransportSession.CloseInfo"></a>

```vertex
public var CloseInfo: SessionCloseInfo?
```

<a id="WebTransportSession.Config"></a>

```vertex
public var Config: WebTransportConfig
```

<a id="WebTransportSession.InboundStreams"></a>

```vertex
public var InboundStreams: [WebTransportStream]
```

<a id="WebTransportSession.InboundUniStreams"></a>

```vertex
public var InboundUniStreams: [WebTransportReceiveStream]
```

<a id="WebTransportSession.InboundDatagrams"></a>

```vertex
public var InboundDatagrams: [[uint8]]
```

<a id="WebTransportSession.TrackedStreamIds"></a>

```vertex
public var TrackedStreamIds: [uint64]
```

#### Methods

<a id="WebTransportSession.OpenStream"></a>

```vertex
public mutating func OpenStream() async throws -> WebTransportStream
```

Opens a new bidirectional stream multiplexed within this session (RFC 9297 Section 4.1).

<a id="WebTransportSession.OpenUniStream"></a>

```vertex
public mutating func OpenUniStream() async throws -> WebTransportSendStream
```

Opens a new unidirectional stream for sending (RFC 9297 Section 4.2).

<a id="WebTransportSession.AcceptStream"></a>

```vertex
public mutating func AcceptStream() async throws -> WebTransportStream
```

Accepts an incoming bidirectional stream for this session.

<a id="WebTransportSession.AcceptUniStream"></a>

```vertex
public mutating func AcceptUniStream() async throws -> WebTransportReceiveStream
```

Accepts an incoming unidirectional stream for this session.

<a id="WebTransportSession.SendDatagram"></a>

```vertex
public mutating func SendDatagram(_ data: [uint8]) async throws
```

Transmits an unreliable application datagram (RFC 9297 Section 5).

<a id="WebTransportSession.ReceiveDatagram"></a>

```vertex
public mutating func ReceiveDatagram() async throws -> [uint8]
```

Receives an unreliable application datagram for this session.

<a id="WebTransportSession.EnqueueDatagram"></a>

```vertex
public mutating func EnqueueDatagram(_ payload: [uint8])
```

Enqueues an incoming datagram directly into the session buffer.

<a id="WebTransportSession.EnqueueStream"></a>

```vertex
public mutating func EnqueueStream(_ stream: WebTransportStream)
```

Enqueues an incoming stream directly into the session buffer.

<a id="WebTransportSession.EnqueueUniStream"></a>

```vertex
public mutating func EnqueueUniStream(_ stream: WebTransportReceiveStream)
```

Enqueues an incoming uni stream directly into the session buffer.

<a id="WebTransportSession.NextEvent"></a>

```vertex
public mutating func NextEvent() async throws -> SessionEvent?
```

Yields the next available session event, matching the pattern in webtransport_package.md.

<a id="WebTransportSession.Close"></a>

```vertex
public mutating func Close(code: uint32 = 0, reason: string = "") async throws
```

Closes the WebTransport session with an application error code and reason string.

### struct WebTransportStream <a id="struct-WebTransportStream"></a>

```vertex
public struct WebTransportStream
```

WebTransportStream represents a bidirectional stream multiplexed within a WebTransport session (RFC 9297 Section 4.1).

#### Initializers

<a id="WebTransportStream.init"></a>

```vertex
public init(streamId: uint64, sessionId: uint64, quicStream: quic.QuicStream, isInitiator: bool = false)
```

#### Properties

<a id="WebTransportStream.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="WebTransportStream.SessionId"></a>

```vertex
public var SessionId: uint64
```

<a id="WebTransportStream.QuicStream"></a>

```vertex
public var QuicStream: quic.QuicStream
```

<a id="WebTransportStream.HeaderSent"></a>

```vertex
public var HeaderSent: bool
```

<a id="WebTransportStream.HeaderReceived"></a>

```vertex
public var HeaderReceived: bool
```

<a id="WebTransportStream.IsClosed"></a>

```vertex
public var IsClosed: bool { get }
```

True if the underlying stream is closed.

#### Methods

<a id="WebTransportStream.Write"></a>

```vertex
public mutating func Write(_ data: [uint8]) async throws
```

Writes raw byte payload to the stream.

<a id="WebTransportStream.WriteText"></a>

```vertex
public mutating func WriteText(_ text: string) async throws
```

Writes a UTF-8 string payload to the stream.

<a id="WebTransportStream.WriteAndClose"></a>

```vertex
public mutating func WriteAndClose(_ data: [uint8]) async throws
```

Writes payload and closes the sending side of the stream (FIN bit).

<a id="WebTransportStream.Read"></a>

```vertex
public mutating func Read(maxBytes: int = 4096) async throws -> [uint8]
```

Reads up to maxBytes from the stream.

<a id="WebTransportStream.ReadText"></a>

```vertex
public mutating func ReadText(maxBytes: int = 4096) async throws -> string
```

Reads incoming bytes and decodes them as a UTF-8 string.

<a id="WebTransportStream.Close"></a>

```vertex
public mutating func Close() async throws
```

Closes the stream.

### struct WebTransportStreamType <a id="struct-WebTransportStreamType"></a>

```vertex
public struct WebTransportStreamType
```

#### Properties

<a id="WebTransportStreamType.Uni"></a>

```vertex
public static let Uni: uint64 = 0x54
```

## Files

- capsule.vs
- client.vs
- datagram.vs
- server.vs
- session.vs
- stream.vs
- types.vs
- webtransport.vs
