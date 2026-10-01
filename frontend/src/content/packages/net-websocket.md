# package websocket

```vertex
import "net/websocket"
```

## Index

- [`func Base64Decode(_ s: string) throws -> [uint8]`](#func-Base64Decode)
- [`func Base64Encode(_ src: [uint8]) -> string`](#func-Base64Encode)
- [`func BuildClientHandshake(host: string, port: uint16, path: string, key: string) -> string`](#func-BuildClientHandshake)
- [`func BuildClientHandshake(host: string, port: uint16, path: string, key: string, subprotocols: [string]) -> string`](#func-BuildClientHandshake-2)
- [`func BuildClosePayload(code: uint16) -> [uint8]`](#func-BuildClosePayload)
- [`func BuildClosePayload(code: uint16, reason: string) -> [uint8]`](#func-BuildClosePayload-2)
- [`func BuildFrame(fin: bool, opcode: uint8, masked: bool) -> [uint8]`](#func-BuildFrame)
- [`func BuildFrame(fin: bool, opcode: uint8, masked: bool, payload: [uint8]) -> [uint8]`](#func-BuildFrame-2)
- [`func BuildFrame(fin: bool, opcode: uint8, masked: bool, maskingKey: [uint8], payload: [uint8]) -> [uint8]`](#func-BuildFrame-3)
- [`func BuildServerHandshake(clientKey: string) -> string`](#func-BuildServerHandshake)
- [`func BuildServerHandshake(clientKey: string, subprotocol: string) -> string`](#func-BuildServerHandshake-2)
- [`func ComputeAcceptKey(_ clientKey: string) -> string`](#func-ComputeAcceptKey)
- [`func Connect(_ address: string) async throws -> WebSocket`](#func-Connect)
- [`func Connect(_ address: string, subprotocols: [string]) async throws -> WebSocket`](#func-Connect-2)
- [`func Connect(_ address: string, config: ClientConfig) async throws -> WebSocket`](#func-Connect-3)
- [`func GenerateClientKey() -> string`](#func-GenerateClientKey)
- [`func GenerateMaskingKey() -> [uint8]`](#func-GenerateMaskingKey)
- [`func Listen(_ address: string) throws -> WebSocketListener`](#func-Listen)
- [`func Listen(_ address: string, subprotocols: [string]) throws -> WebSocketListener`](#func-Listen-2)
- [`func Listen(_ address: string, handler: @escaping (WebSocket) async throws -> Void) async throws`](#func-Listen-3)
- [`func MaskPayload(payload: inout [uint8], maskingKey: [uint8])`](#func-MaskPayload)
- [`func ParseClosePayload(payload: [uint8]) -> CloseInfo`](#func-ParseClosePayload)
- [`func ParseEndpoint(_ address: string) throws -> url.URL`](#func-ParseEndpoint)
- [`func ParseFrame(data: [uint8]) throws -> ParsedFrame`](#func-ParseFrame)
- [`func ParseFrame(data: [uint8], offset: int) throws -> ParsedFrame`](#func-ParseFrame-2)
- [`func Upgrade(stream: tcp.TcpStream, req: http.Request) async throws -> WebSocket`](#func-Upgrade)
- [`func Upgrade(stream: tcp.TcpStream, req: http.Request, subprotocol: string) async throws -> WebSocket`](#func-Upgrade-2)
- [`func UpgradeTLS(conn: inout tls.Conn, req: http.Request) async throws -> WebSocket`](#func-UpgradeTLS)
- [`func UpgradeTLS(conn: inout tls.Conn, req: http.Request, subprotocol: string) async throws -> WebSocket`](#func-UpgradeTLS-2)
- [`func VerifyServerHandshake(response: http.Response, expectedAcceptKey: string) throws`](#func-VerifyServerHandshake)
- [`func WebSocketGuid() -> string`](#func-WebSocketGuid)
- [`struct ClientConfig`](#struct-ClientConfig)
  - [`init()`](#ClientConfig.init)
  - [`init(subprotocols: [string])`](#ClientConfig.init-2)
  - [`init(subprotocols: [string], tlsConfig: tls.Config, timeoutMs: int32)`](#ClientConfig.init-3)
  - [`var Subprotocols: [string]`](#ClientConfig.Subprotocols)
  - [`var TLSConfig: tls.Config`](#ClientConfig.TLSConfig)
  - [`var TimeoutMs: int32`](#ClientConfig.TimeoutMs)
- [`struct CloseCode`](#struct-CloseCode)
  - [`static let NormalClosure: uint16 = 1000`](#CloseCode.NormalClosure)
  - [`static let GoingAway: uint16 = 1001`](#CloseCode.GoingAway)
  - [`static let ProtocolError: uint16 = 1002`](#CloseCode.ProtocolError)
  - [`static let UnsupportedData: uint16 = 1003`](#CloseCode.UnsupportedData)
  - [`static let NoStatusReceived: uint16 = 1005`](#CloseCode.NoStatusReceived)
  - [`static let AbnormalClosure: uint16 = 1006`](#CloseCode.AbnormalClosure)
  - [`static let InvalidFramePayloadData: uint16 = 1007`](#CloseCode.InvalidFramePayloadData)
  - [`static let PolicyViolation: uint16 = 1008`](#CloseCode.PolicyViolation)
  - [`static let MessageTooBig: uint16 = 1009`](#CloseCode.MessageTooBig)
  - [`static let MandatoryExtension: uint16 = 1010`](#CloseCode.MandatoryExtension)
  - [`static let InternalServerError: uint16 = 1011`](#CloseCode.InternalServerError)
  - [`static let TlsHandshake: uint16 = 1015`](#CloseCode.TlsHandshake)
- [`struct CloseInfo`](#struct-CloseInfo)
  - [`init(code: uint16, reason: string)`](#CloseInfo.init)
  - [`var Code: uint16`](#CloseInfo.Code)
  - [`var Reason: string`](#CloseInfo.Reason)
- [`typealias Conn = WebSocket`](#typealias-Conn)
- [`struct Frame`](#struct-Frame)
  - [`init(fin: bool, opcode: uint8)`](#Frame.init)
  - [`init(fin: bool, opcode: uint8, masked: bool, maskingKey: [uint8], payload: [uint8])`](#Frame.init-2)
  - [`var Fin: bool`](#Frame.Fin)
  - [`var Rsv1: bool`](#Frame.Rsv1)
  - [`var Rsv2: bool`](#Frame.Rsv2)
  - [`var Rsv3: bool`](#Frame.Rsv3)
  - [`var Opcode: uint8`](#Frame.Opcode)
  - [`var Masked: bool`](#Frame.Masked)
  - [`var MaskingKey: [uint8]`](#Frame.MaskingKey)
  - [`var Payload: [uint8]`](#Frame.Payload)
- [`struct Message`](#struct-Message)
  - [`init(type: MessageType, data: [uint8])`](#Message.init)
  - [`init(text: string)`](#Message.init-2)
  - [`init(binary: [uint8])`](#Message.init-3)
  - [`var Type: MessageType`](#Message.Type)
  - [`var Data: [uint8]`](#Message.Data)
  - [`var Text: string { get }`](#Message.Text)
  - [`func BodyText() -> string`](#Message.BodyText)
- [`enum MessageType`](#enum-MessageType)
- [`struct Opcode`](#struct-Opcode)
  - [`static let Continuation: uint8 = 0x0`](#Opcode.Continuation)
  - [`static let Text: uint8 = 0x1`](#Opcode.Text)
  - [`static let Binary: uint8 = 0x2`](#Opcode.Binary)
  - [`static let Close: uint8 = 0x8`](#Opcode.Close)
  - [`static let Ping: uint8 = 0x9`](#Opcode.Ping)
  - [`static let Pong: uint8 = 0xa`](#Opcode.Pong)
- [`struct ParsedFrame`](#struct-ParsedFrame)
  - [`init(frame: Frame, bytesRead: int)`](#ParsedFrame.init)
  - [`var Frame: Frame`](#ParsedFrame.Frame)
  - [`var BytesRead: int`](#ParsedFrame.BytesRead)
- [`struct Server`](#struct-Server)
  - [`init()`](#Server.init)
  - [`init(subprotocols: [string])`](#Server.init-2)
  - [`var Subprotocols: [string]`](#Server.Subprotocols)
  - [`func Listen(on address: string, handler: @escaping (WebSocket) async throws -> Void) async throws`](#Server.Listen)
  - [`func ListenTLS(on address: string, cert: string, key: string, handler: @escaping (WebSocket) async throws -> Void) async throws`](#Server.ListenTLS)
- [`struct WebSocket`](#struct-WebSocket)
  - [`init(stream: tcp.TcpStream, isClient: bool)`](#WebSocket.init)
  - [`init(stream: tcp.TcpStream, isClient: bool, subprotocol: string)`](#WebSocket.init-2)
  - [`init(tlsConn: tls.Conn, isClient: bool)`](#WebSocket.init-3)
  - [`init(tlsConn: tls.Conn, isClient: bool, subprotocol: string)`](#WebSocket.init-4)
  - [`var IsClient: bool`](#WebSocket.IsClient)
  - [`var IsClosed: bool`](#WebSocket.IsClosed)
  - [`var Subprotocol: string`](#WebSocket.Subprotocol)
  - [`mutating func SendText(_ text: string) async throws`](#WebSocket.SendText)
  - [`mutating func SendBinary(_ data: [uint8]) async throws`](#WebSocket.SendBinary)
  - [`mutating func SendPing() async throws`](#WebSocket.SendPing)
  - [`mutating func SendPing(_ data: [uint8]) async throws`](#WebSocket.SendPing-2)
  - [`mutating func SendPong() async throws`](#WebSocket.SendPong)
  - [`mutating func SendPong(_ data: [uint8]) async throws`](#WebSocket.SendPong-2)
  - [`mutating func Close() async throws`](#WebSocket.Close)
  - [`mutating func Close(code: uint16) async throws`](#WebSocket.Close-2)
  - [`mutating func Close(code: uint16, reason: string) async throws`](#WebSocket.Close-3)
  - [`mutating func Receive() async throws -> Message`](#WebSocket.Receive)
- [`enum WebSocketError: Error`](#enum-WebSocketError)
- [`struct WebSocketListener`](#struct-WebSocketListener)
  - [`init(listener: tcp.TcpListener)`](#WebSocketListener.init)
  - [`init(listener: tcp.TcpListener, subprotocols: [string])`](#WebSocketListener.init-2)
  - [`var Listener: tcp.TcpListener`](#WebSocketListener.Listener)
  - [`var Subprotocols: [string]`](#WebSocketListener.Subprotocols)
  - [`var Port: uint16 { get }`](#WebSocketListener.Port)
  - [`var Address: string { get }`](#WebSocketListener.Address)
  - [`func Close()`](#WebSocketListener.Close)
  - [`func Serve(handler: @escaping (WebSocket) async throws -> Void) async throws`](#WebSocketListener.Serve)

## Functions

### func Base64Decode <a id="func-Base64Decode"></a>

```vertex
public func Base64Decode(_ s: string) throws -> [uint8]
```

Decodes standard Base64 string to bytes.

### func Base64Encode <a id="func-Base64Encode"></a>

```vertex
public func Base64Encode(_ src: [uint8]) -> string
```

Encodes binary bytes to standard Base64 string.

### func BuildClientHandshake <a id="func-BuildClientHandshake"></a>

```vertex
public func BuildClientHandshake(host: string,
                                 port: uint16,
                                 path: string,
                                 key: string) -> string
```

Builds the HTTP/1.1 Opening Handshake GET request text per RFC 6455 Section 4.1.

### func BuildClientHandshake <a id="func-BuildClientHandshake-2"></a>

```vertex
public func BuildClientHandshake(host: string,
                                 port: uint16,
                                 path: string,
                                 key: string,
                                 subprotocols: [string]) -> string
```

Builds the HTTP/1.1 Opening Handshake GET request text with subprotocols per RFC 6455 Section 4.1.

### func BuildClosePayload <a id="func-BuildClosePayload"></a>

```vertex
public func BuildClosePayload(code: uint16) -> [uint8]
```

Builds payload for a Close control frame (2-byte code).

### func BuildClosePayload <a id="func-BuildClosePayload-2"></a>

```vertex
public func BuildClosePayload(code: uint16, reason: string) -> [uint8]
```

Builds payload for a Close control frame (2-byte code + reason).

### func BuildFrame <a id="func-BuildFrame"></a>

```vertex
public func BuildFrame(fin: bool,
                       opcode: uint8,
                       masked: bool) -> [uint8]
```

Builds an RFC 6455 serialized frame without payload.

### func BuildFrame <a id="func-BuildFrame-2"></a>

```vertex
public func BuildFrame(fin: bool,
                       opcode: uint8,
                       masked: bool,
                       payload: [uint8]) -> [uint8]
```

Builds an RFC 6455 serialized frame with automatic masking key generation if masked.

### func BuildFrame <a id="func-BuildFrame-3"></a>

```vertex
public func BuildFrame(fin: bool,
                       opcode: uint8,
                       masked: bool,
                       maskingKey: [uint8],
                       payload: [uint8]) -> [uint8]
```

Builds an RFC 6455 serialized frame.

### func BuildServerHandshake <a id="func-BuildServerHandshake"></a>

```vertex
public func BuildServerHandshake(clientKey: string) -> string
```

Builds the HTTP/1.1 101 Switching Protocols response text per RFC 6455 Section 4.2.2.

### func BuildServerHandshake <a id="func-BuildServerHandshake-2"></a>

```vertex
public func BuildServerHandshake(clientKey: string, subprotocol: string) -> string
```

Builds the HTTP/1.1 101 Switching Protocols response text with subprotocol per RFC 6455 Section 4.2.2.

### func ComputeAcceptKey <a id="func-ComputeAcceptKey"></a>

```vertex
public func ComputeAcceptKey(_ clientKey: string) -> string
```

Computes the Sec-WebSocket-Accept header value per RFC 6455 Section 1.3 & 4.2.2.

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ address: string) async throws -> WebSocket
```

Connects to a WebSocket endpoint written as text ("ws://..." or "wss://...").

### func Connect <a id="func-Connect-2"></a>

```vertex
public func Connect(_ address: string, subprotocols: [string]) async throws -> WebSocket
```

Connects to a WebSocket endpoint with specified subprotocols.

### func Connect <a id="func-Connect-3"></a>

```vertex
public func Connect(_ address: string, config: ClientConfig) async throws -> WebSocket
```

Connects to a WebSocket endpoint with custom client configuration.

### func GenerateClientKey <a id="func-GenerateClientKey"></a>

```vertex
public func GenerateClientKey() -> string
```

Generates a random 16-byte base64-encoded client handshake key per RFC 6455 Section 4.1.

### func GenerateMaskingKey <a id="func-GenerateMaskingKey"></a>

```vertex
public func GenerateMaskingKey() -> [uint8]
```

Generates a random 4-byte masking key for client frames.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ address: string) throws -> WebSocketListener
```

Starts listening on the specified address and returns a WebSocketListener immediately.

### func Listen <a id="func-Listen-2"></a>

```vertex
public func Listen(_ address: string, subprotocols: [string]) throws -> WebSocketListener
```

Starts listening on the specified address with subprotocols and returns a WebSocketListener immediately.

### func Listen <a id="func-Listen-3"></a>

```vertex
public func Listen(_ address: string, handler: @escaping (WebSocket) async throws -> Void) async throws
```

Starts listening on the specified address and serves connections with the handler.

### func MaskPayload <a id="func-MaskPayload"></a>

```vertex
public func MaskPayload(payload: inout [uint8], maskingKey: [uint8])
```

Applies RFC 6455 4-byte XOR masking in place.

### func ParseClosePayload <a id="func-ParseClosePayload"></a>

```vertex
public func ParseClosePayload(payload: [uint8]) -> CloseInfo
```

Parses Close control frame payload into status code and UTF-8 reason string.

### func ParseEndpoint <a id="func-ParseEndpoint"></a>

```vertex
public func ParseEndpoint(_ address: string) throws -> url.URL
```

A WebSocket endpoint's URL, parsed: ws:// or wss://, with a host.

### func ParseFrame <a id="func-ParseFrame"></a>

```vertex
public func ParseFrame(data: [uint8]) throws -> ParsedFrame
```

Parses an RFC 6455 frame from raw buffer starting at offset 0.

### func ParseFrame <a id="func-ParseFrame-2"></a>

```vertex
public func ParseFrame(data: [uint8], offset: int) throws -> ParsedFrame
```

Parses an RFC 6455 frame from raw buffer at offset.

### func Upgrade <a id="func-Upgrade"></a>

```vertex
public func Upgrade(stream: tcp.TcpStream,
                    req: http.Request) async throws -> WebSocket
```

Upgrades an established HTTP/1.1 TCP stream to a WebSocket server connection.

### func Upgrade <a id="func-Upgrade-2"></a>

```vertex
public func Upgrade(stream: tcp.TcpStream,
                    req: http.Request,
                    subprotocol: string) async throws -> WebSocket
```

Upgrades an established HTTP/1.1 TCP stream with subprotocol to a WebSocket server connection.

### func UpgradeTLS <a id="func-UpgradeTLS"></a>

```vertex
public func UpgradeTLS(conn: inout tls.Conn,
                       req: http.Request) async throws -> WebSocket
```

Upgrades an established HTTP/1.1 TLS connection to a secure WebSocket server connection.

### func UpgradeTLS <a id="func-UpgradeTLS-2"></a>

```vertex
public func UpgradeTLS(conn: inout tls.Conn,
                       req: http.Request,
                       subprotocol: string) async throws -> WebSocket
```

Upgrades an established HTTP/1.1 TLS connection with subprotocol to a secure WebSocket server connection.

### func VerifyServerHandshake <a id="func-VerifyServerHandshake"></a>

```vertex
public func VerifyServerHandshake(response: http.Response, expectedAcceptKey: string) throws
```

Validates the server's 101 Switching Protocols handshake response per RFC 6455 Section 4.2.2.

### func WebSocketGuid <a id="func-WebSocketGuid"></a>

```vertex
public func WebSocketGuid() -> string
```

## Types

### struct ClientConfig <a id="struct-ClientConfig"></a>

```vertex
public struct ClientConfig
```

Client configuration options.

#### Initializers

<a id="ClientConfig.init"></a>

```vertex
public init()
```

<a id="ClientConfig.init-2"></a>

```vertex
public init(subprotocols: [string])
```

<a id="ClientConfig.init-3"></a>

```vertex
public init(subprotocols: [string], tlsConfig: tls.Config, timeoutMs: int32)
```

#### Properties

<a id="ClientConfig.Subprotocols"></a>

```vertex
public var Subprotocols: [string]
```

<a id="ClientConfig.TLSConfig"></a>

```vertex
public var TLSConfig: tls.Config
```

<a id="ClientConfig.TimeoutMs"></a>

```vertex
public var TimeoutMs: int32
```

### struct CloseCode <a id="struct-CloseCode"></a>

```vertex
public struct CloseCode
```

RFC 6455 Section 7.4.1 Status Codes.

#### Properties

<a id="CloseCode.NormalClosure"></a>

```vertex
public static let NormalClosure: uint16 = 1000
```

<a id="CloseCode.GoingAway"></a>

```vertex
public static let GoingAway: uint16 = 1001
```

<a id="CloseCode.ProtocolError"></a>

```vertex
public static let ProtocolError: uint16 = 1002
```

<a id="CloseCode.UnsupportedData"></a>

```vertex
public static let UnsupportedData: uint16 = 1003
```

<a id="CloseCode.NoStatusReceived"></a>

```vertex
public static let NoStatusReceived: uint16 = 1005
```

<a id="CloseCode.AbnormalClosure"></a>

```vertex
public static let AbnormalClosure: uint16 = 1006
```

<a id="CloseCode.InvalidFramePayloadData"></a>

```vertex
public static let InvalidFramePayloadData: uint16 = 1007
```

<a id="CloseCode.PolicyViolation"></a>

```vertex
public static let PolicyViolation: uint16 = 1008
```

<a id="CloseCode.MessageTooBig"></a>

```vertex
public static let MessageTooBig: uint16 = 1009
```

<a id="CloseCode.MandatoryExtension"></a>

```vertex
public static let MandatoryExtension: uint16 = 1010
```

<a id="CloseCode.InternalServerError"></a>

```vertex
public static let InternalServerError: uint16 = 1011
```

<a id="CloseCode.TlsHandshake"></a>

```vertex
public static let TlsHandshake: uint16 = 1015
```

### struct CloseInfo <a id="struct-CloseInfo"></a>

```vertex
public struct CloseInfo
```

CloseInfo holds parsed WebSocket Close code and reason.

#### Initializers

<a id="CloseInfo.init"></a>

```vertex
public init(code: uint16, reason: string)
```

#### Properties

<a id="CloseInfo.Code"></a>

```vertex
public var Code: uint16
```

<a id="CloseInfo.Reason"></a>

```vertex
public var Reason: string
```

### typealias Conn <a id="typealias-Conn"></a>

```vertex
public typealias Conn = WebSocket
```

Backward-compatible typealias for WebSocket connection.

### struct Frame <a id="struct-Frame"></a>

```vertex
public struct Frame
```

Frame represents a single RFC 6455 binary frame.

#### Initializers

<a id="Frame.init"></a>

```vertex
public init(fin: bool, opcode: uint8)
```

<a id="Frame.init-2"></a>

```vertex
public init(fin: bool,
            opcode: uint8,
            masked: bool,
            maskingKey: [uint8],
            payload: [uint8])
```

#### Properties

<a id="Frame.Fin"></a>

```vertex
public var Fin: bool
```

<a id="Frame.Rsv1"></a>

```vertex
public var Rsv1: bool
```

<a id="Frame.Rsv2"></a>

```vertex
public var Rsv2: bool
```

<a id="Frame.Rsv3"></a>

```vertex
public var Rsv3: bool
```

<a id="Frame.Opcode"></a>

```vertex
public var Opcode: uint8
```

<a id="Frame.Masked"></a>

```vertex
public var Masked: bool
```

<a id="Frame.MaskingKey"></a>

```vertex
public var MaskingKey: [uint8]
```

<a id="Frame.Payload"></a>

```vertex
public var Payload: [uint8]
```

### struct Message <a id="struct-Message"></a>

```vertex
public struct Message
```

Message represents a received or sent application message.

#### Initializers

<a id="Message.init"></a>

```vertex
public init(type: MessageType, data: [uint8])
```

<a id="Message.init-2"></a>

```vertex
public init(text: string)
```

<a id="Message.init-3"></a>

```vertex
public init(binary: [uint8])
```

#### Properties

<a id="Message.Type"></a>

```vertex
public var Type: MessageType
```

<a id="Message.Data"></a>

```vertex
public var Data: [uint8]
```

<a id="Message.Text"></a>

```vertex
public var Text: string { get }
```

Convenience property decoding payload bytes as UTF-8 string.

#### Methods

<a id="Message.BodyText"></a>

```vertex
public func BodyText() -> string
```

### enum MessageType <a id="enum-MessageType"></a>

```vertex
public enum MessageType
```

High-level message types for WebSocket frames.

#### Cases

<a id="MessageType.text"></a>

```vertex
case text
```

<a id="MessageType.binary"></a>

```vertex
case binary
```

<a id="MessageType.ping"></a>

```vertex
case ping
```

<a id="MessageType.pong"></a>

```vertex
case pong
```

<a id="MessageType.close"></a>

```vertex
case close
```

### struct Opcode <a id="struct-Opcode"></a>

```vertex
public struct Opcode
```

RFC 6455 Section 5.2 Opcodes.

#### Properties

<a id="Opcode.Continuation"></a>

```vertex
public static let Continuation: uint8 = 0x0
```

<a id="Opcode.Text"></a>

```vertex
public static let Text: uint8 = 0x1
```

<a id="Opcode.Binary"></a>

```vertex
public static let Binary: uint8 = 0x2
```

<a id="Opcode.Close"></a>

```vertex
public static let Close: uint8 = 0x8
```

<a id="Opcode.Ping"></a>

```vertex
public static let Ping: uint8 = 0x9
```

<a id="Opcode.Pong"></a>

```vertex
public static let Pong: uint8 = 0xa
```

### struct ParsedFrame <a id="struct-ParsedFrame"></a>

```vertex
public struct ParsedFrame
```

#### Initializers

<a id="ParsedFrame.init"></a>

```vertex
public init(frame: Frame, bytesRead: int)
```

#### Properties

<a id="ParsedFrame.Frame"></a>

```vertex
public var Frame: Frame
```

<a id="ParsedFrame.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct Server <a id="struct-Server"></a>

```vertex
public struct Server
```

Server provides high-level WebSocket server listeners.

#### Initializers

<a id="Server.init"></a>

```vertex
public init()
```

<a id="Server.init-2"></a>

```vertex
public init(subprotocols: [string])
```

#### Properties

<a id="Server.Subprotocols"></a>

```vertex
public var Subprotocols: [string]
```

#### Methods

<a id="Server.Listen"></a>

```vertex
public func Listen(on address: string,
                   handler: @escaping (WebSocket) async throws -> Void) async throws
```

Listens for WebSocket connections over plain TCP.

<a id="Server.ListenTLS"></a>

```vertex
public func ListenTLS(on address: string,
                      cert: string,
                      key: string,
                      handler: @escaping (WebSocket) async throws -> Void) async throws
```

Listens for WebSocket connections over TLS 1.3.

### struct WebSocket <a id="struct-WebSocket"></a>

```vertex
public struct WebSocket
```

WebSocket represents an established WebSocket connection over plain TCP or TLS 1.3.

#### Initializers

<a id="WebSocket.init"></a>

```vertex
public init(stream: tcp.TcpStream, isClient: bool)
```

<a id="WebSocket.init-2"></a>

```vertex
public init(stream: tcp.TcpStream, isClient: bool, subprotocol: string)
```

<a id="WebSocket.init-3"></a>

```vertex
public init(tlsConn: tls.Conn, isClient: bool)
```

<a id="WebSocket.init-4"></a>

```vertex
public init(tlsConn: tls.Conn, isClient: bool, subprotocol: string)
```

#### Properties

<a id="WebSocket.IsClient"></a>

```vertex
public var IsClient: bool
```

<a id="WebSocket.IsClosed"></a>

```vertex
public var IsClosed: bool
```

<a id="WebSocket.Subprotocol"></a>

```vertex
public var Subprotocol: string
```

#### Methods

<a id="WebSocket.SendText"></a>

```vertex
public mutating func SendText(_ text: string) async throws
```

Sends a Text message (masked if client).

<a id="WebSocket.SendBinary"></a>

```vertex
public mutating func SendBinary(_ data: [uint8]) async throws
```

Sends a Binary message (masked if client).

<a id="WebSocket.SendPing"></a>

```vertex
public mutating func SendPing() async throws
```

Sends a Ping control frame without payload.

<a id="WebSocket.SendPing-2"></a>

```vertex
public mutating func SendPing(_ data: [uint8]) async throws
```

Sends a Ping control frame (max 125 bytes payload).

<a id="WebSocket.SendPong"></a>

```vertex
public mutating func SendPong() async throws
```

Sends a Pong control frame without payload.

<a id="WebSocket.SendPong-2"></a>

```vertex
public mutating func SendPong(_ data: [uint8]) async throws
```

Sends a Pong control frame echoing ping data.

<a id="WebSocket.Close"></a>

```vertex
public mutating func Close() async throws
```

Closes the WebSocket connection with NormalClosure (1000).

<a id="WebSocket.Close-2"></a>

```vertex
public mutating func Close(code: uint16) async throws
```

Closes the WebSocket connection with an RFC 6455 Close code.

<a id="WebSocket.Close-3"></a>

```vertex
public mutating func Close(code: uint16, reason: string) async throws
```

Closes the WebSocket connection with an RFC 6455 Close frame and terminates the socket.

<a id="WebSocket.Receive"></a>

```vertex
public mutating func Receive() async throws -> Message
```

Receives the next complete WebSocket message, automatically reassembling fragments and handling control frames.

### enum WebSocketError <a id="enum-WebSocketError"></a>

```vertex
public enum WebSocketError: Error
```

Typed error enum for WebSocket operations.

#### Cases

<a id="WebSocketError.invalidUrl"></a>

```vertex
case invalidUrl(string)
```

<a id="WebSocketError.handshakeFailed"></a>

```vertex
case handshakeFailed(string)
```

<a id="WebSocketError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="WebSocketError.connectionClosed"></a>

```vertex
case connectionClosed
```

<a id="WebSocketError.unexpectedOpcode"></a>

```vertex
case unexpectedOpcode(uint8)
```

<a id="WebSocketError.maskRequired"></a>

```vertex
case maskRequired
```

<a id="WebSocketError.maskForbidden"></a>

```vertex
case maskForbidden
```

<a id="WebSocketError.payloadTooLarge"></a>

```vertex
case payloadTooLarge
```

<a id="WebSocketError.invalidCloseCode"></a>

```vertex
case invalidCloseCode(uint16)
```

### struct WebSocketListener <a id="struct-WebSocketListener"></a>

```vertex
public struct WebSocketListener
```

WebSocketListener wraps an active TCP listener and serves WebSocket connections.

#### Initializers

<a id="WebSocketListener.init"></a>

```vertex
public init(listener: tcp.TcpListener)
```

<a id="WebSocketListener.init-2"></a>

```vertex
public init(listener: tcp.TcpListener, subprotocols: [string])
```

#### Properties

<a id="WebSocketListener.Listener"></a>

```vertex
public var Listener: tcp.TcpListener
```

<a id="WebSocketListener.Subprotocols"></a>

```vertex
public var Subprotocols: [string]
```

<a id="WebSocketListener.Port"></a>

```vertex
public var Port: uint16 { get }
```

Bound local port number.

<a id="WebSocketListener.Address"></a>

```vertex
public var Address: string { get }
```

Bound local address formatted as "ip:port".

#### Methods

<a id="WebSocketListener.Close"></a>

```vertex
public func Close()
```

Closes the listener socket.

<a id="WebSocketListener.Serve"></a>

```vertex
public func Serve(handler: @escaping (WebSocket) async throws -> Void) async throws
```

Serves incoming WebSocket connections using the provided handler.

## Files

- base64.vs
- client.vs
- conn.vs
- frame.vs
- handshake.vs
- server.vs
- types.vs
