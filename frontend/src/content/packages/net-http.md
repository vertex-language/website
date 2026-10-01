# package http

```vertex
import "net/http"
```

HPACK's Huffman code (RFC 7541 Appendix B): the code and its length in
bits for each byte value. End of string is 30 one bits, which a
decoder only ever sees as padding.

## Index

- [Variables](#variables)
- [`func BuildH2Frame(type: uint8, flags: uint8, streamId: uint32, payload: [uint8]) -> [uint8]`](#func-BuildH2Frame)
- [`func BuildH2GoAway(lastStreamId: uint32, errorCode: uint32) -> [uint8]`](#func-BuildH2GoAway)
- [`func BuildH2Ping(opaqueData: [uint8], ack: bool = false) -> [uint8]`](#func-BuildH2Ping)
- [`func BuildH2RstStream(streamId: uint32, errorCode: uint32) -> [uint8]`](#func-BuildH2RstStream)
- [`func BuildH2SettingsFrame(settings: [H2Setting], ack: bool = false) -> [uint8]`](#func-BuildH2SettingsFrame)
- [`func BuildH2WindowUpdate(streamId: uint32, increment: uint32) -> [uint8]`](#func-BuildH2WindowUpdate)
- [`func BuildH3Frame(type: uint64, payload: [uint8]) -> [uint8]`](#func-BuildH3Frame)
- [`func BuildH3SettingsFrame(settings: [H3Setting]) -> [uint8]`](#func-BuildH3SettingsFrame)
- [`func DecodeChunked(_ d: [uint8]) -> [uint8]`](#func-DecodeChunked)
- [`func Get(_ address: string) async throws -> Response`](#func-Get)
- [`func GetH3(_ address: string) async throws -> Response`](#func-GetH3)
- [`func H2ClientPreface() -> [uint8]`](#func-H2ClientPreface)
- [`func H2FrameContent(_ frame: H2Frame) throws -> [uint8]`](#func-H2FrameContent)
- [`func HpackDecodeInt(data: [uint8], offset: int, prefixBits: int) throws -> DecodedInt`](#func-HpackDecodeInt)
- [`func HpackDecodeString(data: [uint8], offset: int) throws -> DecodedStr`](#func-HpackDecodeString)
- [`func HpackEncodeInt(value: int, prefixBits: int, prefixMask: uint8) -> [uint8]`](#func-HpackEncodeInt)
- [`func HpackEncodeString(_ s: string) -> [uint8]`](#func-HpackEncodeString)
- [`func HpackStaticTable() -> [HpackHeader]`](#func-HpackStaticTable)
- [`func HuffmanDecode(_ data: [uint8], from: int, to: int) throws -> [uint8]`](#func-HuffmanDecode)
- [`func Listen(_ address: string) throws -> HttpListener`](#func-Listen)
- [`func Listen(_ address: string, config: ServerConfig) throws -> HttpListener`](#func-Listen-2)
- [`func Listen(_ address: string, handler: @escaping (Request) async throws -> ResponseWriter) async throws`](#func-Listen-3)
- [`func ParseAltSvcHeader(_ value: string, defaultHost: string = "") -> [AltSvcService]`](#func-ParseAltSvcHeader)
- [`func ParseH2FrameHeader(data: [uint8], offset: int = 0) throws -> H2FrameHeader`](#func-ParseH2FrameHeader)
- [`func ParseH2Settings(payload: [uint8]) -> [H2Setting]`](#func-ParseH2Settings)
- [`func ParseH3Frame(data: [uint8], offset: int = 0) throws -> H3ParsedFrame`](#func-ParseH3Frame)
- [`func ParseH3Settings(payload: [uint8]) throws -> [H3Setting]`](#func-ParseH3Settings)
- [`func Post(_ address: string, contentType: string, body: [uint8]) async throws -> Response`](#func-Post)
- [`func QpackStaticTable() -> [QpackHeader]`](#func-QpackStaticTable)
- [`func ReadRequest(from stream: tcp.TcpStream) async throws -> Request`](#func-ReadRequest)
- [`func ReadRequestTls(from conn: inout tls.Conn) async throws -> Request`](#func-ReadRequestTls)
- [`func ReadResponse(from stream: tcp.TcpStream) async throws -> Response`](#func-ReadResponse)
- [`func ReadResponseTls(from conn: inout tls.Conn) async throws -> Response`](#func-ReadResponseTls)
- [`func ServeConn(stream: tcp.TcpStream, handle: (Request) async throws -> ResponseWriter) async`](#func-ServeConn)
- [`func ServeConnTls(conn: inout tls.Conn, handle: (Request) async throws -> ResponseWriter, altSvcPort: uint16 = 0) async`](#func-ServeConnTls)
- [`func StatusText(_ code: int32) -> string`](#func-StatusText)
- [`func WriteRequestTls(_ req: Request, to conn: inout tls.Conn) async throws`](#func-WriteRequestTls)
- [`func WriteResponseTls(_ res: Response, to conn: inout tls.Conn) async throws`](#func-WriteResponseTls)
- [`struct AltSvcCache`](#struct-AltSvcCache)
  - [`init()`](#AltSvcCache.init)
  - [`var entries: [AltSvcCacheEntry]`](#AltSvcCache.entries)
  - [`mutating func Set(origin: string, service: AltSvcService)`](#AltSvcCache.Set)
  - [`func Get(origin: string, protocolName: string) -> AltSvcService?`](#AltSvcCache.Get)
  - [`mutating func Clear()`](#AltSvcCache.Clear)
  - [`mutating func Clear(origin: string)`](#AltSvcCache.Clear-2)
- [`struct AltSvcCacheEntry`](#struct-AltSvcCacheEntry)
  - [`init(origin: string, service: AltSvcService)`](#AltSvcCacheEntry.init)
  - [`var Origin: string`](#AltSvcCacheEntry.Origin)
  - [`var Service: AltSvcService`](#AltSvcCacheEntry.Service)
- [`struct AltSvcService`](#struct-AltSvcService)
  - [`init(proto: string, host: string, port: uint16, maxAgeSeconds: int64 = 86400)`](#AltSvcService.init)
  - [`var Protocol: string`](#AltSvcService.Protocol)
  - [`var Host: string`](#AltSvcService.Host)
  - [`var Port: uint16`](#AltSvcService.Port)
  - [`var MaxAgeSeconds: int64`](#AltSvcService.MaxAgeSeconds)
- [`struct Client`](#struct-Client)
  - [`init(config: ClientConfig = ClientConfig())`](#Client.init)
  - [`init(tlsConfig: tls.Config, timeoutMs: int32 = 5000)`](#Client.init-2)
  - [`init(timeoutMs: int32)`](#Client.init-3)
  - [`static let Default: Client = Client()`](#Client.Default)
  - [`var Config: ClientConfig`](#Client.Config)
  - [`var AltSvc: AltSvcCache`](#Client.AltSvc)
  - [`var TimeoutMs: int32 { get set }`](#Client.TimeoutMs)
  - [`var TLSConfig: tls.Config { get set }`](#Client.TLSConfig)
  - [`mutating func Do(_ req: Request, host: string, port: uint16 = 80, config: tls.Config = tls.Config()) async throws -> Response`](#Client.Do)
  - [`mutating func DoUrl(_ req: Request, url target: url.URL) async throws -> Response`](#Client.DoUrl)
  - [`func executeH3(req: Request, host: string, port: uint16) async throws -> Response`](#Client.executeH3)
  - [`func GetH3(_ address: string) async throws -> Response`](#Client.GetH3)
  - [`mutating func Get(_ address: string) async throws -> Response`](#Client.Get)
  - [`mutating func Post(_ address: string, contentType: string, body: [uint8]) async throws -> Response`](#Client.Post)
  - [`func Open(_ req: Request, url target: url.URL) async throws -> ResponseStream`](#Client.Open)
- [`struct ClientConfig`](#struct-ClientConfig)
  - [`init(timeoutMs: int32 = 10000, enableAltSvc: bool = true, tlsConfig: tls.Config = tls.Config())`](#ClientConfig.init)
  - [`init(enabledVersions: [HttpVersion], timeoutMs: int32 = 10000, enableAltSvc: bool = true, tlsConfig: tls.Config = tls.Config())`](#ClientConfig.init-2)
  - [`var EnabledVersions: [HttpVersion]`](#ClientConfig.EnabledVersions)
  - [`var TimeoutMs: int32`](#ClientConfig.TimeoutMs)
  - [`var ReadTimeoutMs: int32 = 30000`](#ClientConfig.ReadTimeoutMs)
  - [`var EnableAltSvc: bool`](#ClientConfig.EnableAltSvc)
  - [`var TLSConfig: tls.Config`](#ClientConfig.TLSConfig)
  - [`var MaxRedirects: int = 0`](#ClientConfig.MaxRedirects)
- [`struct DecodedInt`](#struct-DecodedInt)
  - [`init(value: int, bytesRead: int)`](#DecodedInt.init)
  - [`var Value: int`](#DecodedInt.Value)
  - [`var BytesRead: int`](#DecodedInt.BytesRead)
- [`struct DecodedStr`](#struct-DecodedStr)
  - [`init(value: string, bytesRead: int)`](#DecodedStr.init)
  - [`var Value: string`](#DecodedStr.Value)
  - [`var BytesRead: int`](#DecodedStr.BytesRead)
- [`struct H2ClientSession`](#struct-H2ClientSession)
  - [`init()`](#H2ClientSession.init)
  - [`var NextStreamId: uint32`](#H2ClientSession.NextStreamId)
  - [`var Encoder: HpackEncoder`](#H2ClientSession.Encoder)
  - [`var Decoder: HpackDecoder`](#H2ClientSession.Decoder)
  - [`var Streams: [H2Stream]`](#H2ClientSession.Streams)
  - [`var OutboundQueue: [uint8]`](#H2ClientSession.OutboundQueue)
  - [`var PeerWindowSize: int`](#H2ClientSession.PeerWindowSize)
  - [`var LocalWindowSize: int`](#H2ClientSession.LocalWindowSize)
  - [`var IsClosed: bool`](#H2ClientSession.IsClosed)
  - [`mutating func StartHandshake() -> [uint8]`](#H2ClientSession.StartHandshake)
  - [`mutating func CreateRequestFrames(req: Request, scheme: string, authority: string) -> [uint8]`](#H2ClientSession.CreateRequestFrames)
  - [`mutating func ProcessFrame(_ frame: H2Frame) throws -> Response?`](#H2ClientSession.ProcessFrame)
  - [`mutating func DrainOutbound() -> [uint8]`](#H2ClientSession.DrainOutbound)
- [`struct H2ErrorCode`](#struct-H2ErrorCode)
  - [`static let NoError: uint32 = 0x00`](#H2ErrorCode.NoError)
  - [`static let ProtocolError: uint32 = 0x01`](#H2ErrorCode.ProtocolError)
  - [`static let InternalError: uint32 = 0x02`](#H2ErrorCode.InternalError)
  - [`static let FlowControlError: uint32 = 0x03`](#H2ErrorCode.FlowControlError)
  - [`static let SettingsTimeout: uint32 = 0x04`](#H2ErrorCode.SettingsTimeout)
  - [`static let StreamClosed: uint32 = 0x05`](#H2ErrorCode.StreamClosed)
  - [`static let FrameSizeError: uint32 = 0x06`](#H2ErrorCode.FrameSizeError)
  - [`static let RefusedStream: uint32 = 0x07`](#H2ErrorCode.RefusedStream)
  - [`static let Cancel: uint32 = 0x08`](#H2ErrorCode.Cancel)
- [`struct H2Flag`](#struct-H2Flag)
  - [`static let EndStream: uint8 = 0x01`](#H2Flag.EndStream)
  - [`static let Ack: uint8 = 0x01`](#H2Flag.Ack)
  - [`static let EndHeaders: uint8 = 0x04`](#H2Flag.EndHeaders)
  - [`static let Padded: uint8 = 0x08`](#H2Flag.Padded)
  - [`static let Priority: uint8 = 0x20`](#H2Flag.Priority)
- [`struct H2Frame`](#struct-H2Frame)
  - [`init(header: H2FrameHeader, payload: [uint8])`](#H2Frame.init)
  - [`var Header: H2FrameHeader`](#H2Frame.Header)
  - [`var Payload: [uint8]`](#H2Frame.Payload)
- [`struct H2FrameHeader`](#struct-H2FrameHeader)
  - [`init(length: int, type: uint8, flags: uint8, streamId: uint32)`](#H2FrameHeader.init)
  - [`var Length: int`](#H2FrameHeader.Length)
  - [`var Type: uint8`](#H2FrameHeader.Type)
  - [`var Flags: uint8`](#H2FrameHeader.Flags)
  - [`var StreamId: uint32`](#H2FrameHeader.StreamId)
- [`struct H2FrameType`](#struct-H2FrameType)
  - [`static let Data: uint8 = 0x00`](#H2FrameType.Data)
  - [`static let Headers: uint8 = 0x01`](#H2FrameType.Headers)
  - [`static let Priority: uint8 = 0x02`](#H2FrameType.Priority)
  - [`static let RstStream: uint8 = 0x03`](#H2FrameType.RstStream)
  - [`static let Settings: uint8 = 0x04`](#H2FrameType.Settings)
  - [`static let PushPromise: uint8 = 0x05`](#H2FrameType.PushPromise)
  - [`static let Ping: uint8 = 0x06`](#H2FrameType.Ping)
  - [`static let GoAway: uint8 = 0x07`](#H2FrameType.GoAway)
  - [`static let WindowUpdate: uint8 = 0x08`](#H2FrameType.WindowUpdate)
  - [`static let Continuation: uint8 = 0x09`](#H2FrameType.Continuation)
- [`struct H2Setting`](#struct-H2Setting)
  - [`init(identifier: uint16, value: uint32)`](#H2Setting.init)
  - [`var Identifier: uint16`](#H2Setting.Identifier)
  - [`var Value: uint32`](#H2Setting.Value)
- [`struct H2SettingId`](#struct-H2SettingId)
  - [`static let HeaderTableSize: uint16 = 0x01`](#H2SettingId.HeaderTableSize)
  - [`static let EnablePush: uint16 = 0x02`](#H2SettingId.EnablePush)
  - [`static let MaxConcurrentStreams: uint16 = 0x03`](#H2SettingId.MaxConcurrentStreams)
  - [`static let InitialWindowSize: uint16 = 0x04`](#H2SettingId.InitialWindowSize)
  - [`static let MaxFrameSize: uint16 = 0x05`](#H2SettingId.MaxFrameSize)
  - [`static let MaxHeaderListSize: uint16 = 0x06`](#H2SettingId.MaxHeaderListSize)
- [`struct H2Stream`](#struct-H2Stream)
  - [`init(streamId: uint32, initialWindowSize: int = 65535)`](#H2Stream.init)
  - [`var StreamId: uint32`](#H2Stream.StreamId)
  - [`var State: int`](#H2Stream.State)
  - [`var InboundHeaders: [HeaderEntry]`](#H2Stream.InboundHeaders)
  - [`var InboundBody: [uint8]`](#H2Stream.InboundBody)
  - [`var WindowSize: int`](#H2Stream.WindowSize)
  - [`var HeaderBlock: [uint8] = []`](#H2Stream.HeaderBlock)
  - [`var HeaderBlockEndsStream: bool = false`](#H2Stream.HeaderBlockEndsStream)
- [`struct H2StreamState`](#struct-H2StreamState)
  - [`static let Idle = 0`](#H2StreamState.Idle)
  - [`static let Open = 1`](#H2StreamState.Open)
  - [`static let HalfClosedLocal = 2`](#H2StreamState.HalfClosedLocal)
  - [`static let HalfClosedRemote = 3`](#H2StreamState.HalfClosedRemote)
  - [`static let Closed = 4`](#H2StreamState.Closed)
- [`struct H3ClientSession`](#struct-H3ClientSession)
  - [`init(connection: quic.QuicConnection)`](#H3ClientSession.init)
  - [`var Connection: quic.QuicConnection`](#H3ClientSession.Connection)
  - [`var Encoder: QpackEncoder`](#H3ClientSession.Encoder)
  - [`var Decoder: QpackDecoder`](#H3ClientSession.Decoder)
  - [`var ControlStreamId: uint64`](#H3ClientSession.ControlStreamId)
  - [`var IsInitialized: bool`](#H3ClientSession.IsInitialized)
  - [`mutating func StartSession() async throws`](#H3ClientSession.StartSession)
  - [`mutating func SendRequest(req: Request, scheme: string, authority: string) async throws -> quic.QuicStream`](#H3ClientSession.SendRequest)
  - [`mutating func ParseResponseStream(data: [uint8]) throws -> Response`](#H3ClientSession.ParseResponseStream)
- [`struct H3FrameType`](#struct-H3FrameType)
  - [`static let Data: uint64 = 0x00`](#H3FrameType.Data)
  - [`static let Headers: uint64 = 0x01`](#H3FrameType.Headers)
  - [`static let CancelPush: uint64 = 0x03`](#H3FrameType.CancelPush)
  - [`static let Settings: uint64 = 0x04`](#H3FrameType.Settings)
  - [`static let PushPromise: uint64 = 0x07`](#H3FrameType.PushPromise)
  - [`static let GoAway: uint64 = 0x0c`](#H3FrameType.GoAway)
  - [`static let MaxPushId: uint64 = 0x0d`](#H3FrameType.MaxPushId)
  - [`static let WebTransportStream: uint64 = 0x41`](#H3FrameType.WebTransportStream)
- [`struct H3ParsedFrame`](#struct-H3ParsedFrame)
  - [`init(type: uint64, payload: [uint8], bytesRead: int)`](#H3ParsedFrame.init)
  - [`var Type: uint64`](#H3ParsedFrame.Type)
  - [`var Payload: [uint8]`](#H3ParsedFrame.Payload)
  - [`var BytesRead: int`](#H3ParsedFrame.BytesRead)
- [`struct H3Setting`](#struct-H3Setting)
  - [`init(identifier: uint64, value: uint64)`](#H3Setting.init)
  - [`var Identifier: uint64`](#H3Setting.Identifier)
  - [`var Value: uint64`](#H3Setting.Value)
- [`struct H3SettingId`](#struct-H3SettingId)
  - [`static let QpackMaxTableCapacity: uint64 = 0x01`](#H3SettingId.QpackMaxTableCapacity)
  - [`static let MaxFieldSectionSize: uint64 = 0x06`](#H3SettingId.MaxFieldSectionSize)
  - [`static let QpackBlockedStreams: uint64 = 0x07`](#H3SettingId.QpackBlockedStreams)
  - [`static let EnableConnectProtocol: uint64 = 0x08`](#H3SettingId.EnableConnectProtocol)
  - [`static let EnableWebTransport: uint64 = 0x2b60`](#H3SettingId.EnableWebTransport)
  - [`static let WebTransportMaxSessions: uint64 = 0xc67170`](#H3SettingId.WebTransportMaxSessions)
- [`struct H3StreamType`](#struct-H3StreamType)
  - [`static let Control: uint64 = 0x00`](#H3StreamType.Control)
  - [`static let Push: uint64 = 0x01`](#H3StreamType.Push)
  - [`static let QpackEncoder: uint64 = 0x02`](#H3StreamType.QpackEncoder)
  - [`static let QpackDecoder: uint64 = 0x03`](#H3StreamType.QpackDecoder)
  - [`static let WebTransportUni: uint64 = 0x54`](#H3StreamType.WebTransportUni)
- [`struct Header`](#struct-Header)
  - [`init()`](#Header.init)
  - [`var entries: [HeaderEntry] = []`](#Header.entries)
  - [`mutating func materialize()`](#Header.materialize)
  - [`func Materialized() -> [HeaderEntry]`](#Header.Materialized)
  - [`func lower(_ s: string) -> string`](#Header.lower)
  - [`mutating func Set(_ key: string, _ value: string)`](#Header.Set)
  - [`mutating func Add(_ key: string, _ value: string)`](#Header.Add)
  - [`func Get(_ key: string) -> string?`](#Header.Get)
  - [`mutating func Del(_ key: string)`](#Header.Del)
- [`struct HeaderEntry`](#struct-HeaderEntry)
  - [`init(key: string, value: string)`](#HeaderEntry.init)
  - [`var Key: string`](#HeaderEntry.Key)
  - [`var Value: string`](#HeaderEntry.Value)
- [`typealias Headers = Header`](#typealias-Headers)
- [`struct HpackDecoder`](#struct-HpackDecoder)
  - [`init()`](#HpackDecoder.init)
  - [`var staticTable: [HpackHeader]`](#HpackDecoder.staticTable)
  - [`var dynamicTable: [HpackHeader]`](#HpackDecoder.dynamicTable)
  - [`var maxTableSize: int = 4096`](#HpackDecoder.maxTableSize)
  - [`mutating func DecodeHeaders(data: [uint8]) throws -> [HeaderEntry]`](#HpackDecoder.DecodeHeaders)
- [`struct HpackEncoder`](#struct-HpackEncoder)
  - [`init()`](#HpackEncoder.init)
  - [`var staticTable: [HpackHeader]`](#HpackEncoder.staticTable)
  - [`func EncodeHeader(name: string, value: string) -> [uint8]`](#HpackEncoder.EncodeHeader)
  - [`func EncodeHeaders(_ headers: [HeaderEntry]) -> [uint8]`](#HpackEncoder.EncodeHeaders)
- [`struct HpackHeader`](#struct-HpackHeader)
  - [`init(name: string, value: string)`](#HpackHeader.init)
  - [`var Name: string`](#HpackHeader.Name)
  - [`var Value: string`](#HpackHeader.Value)
- [`enum HttpError: Error`](#enum-HttpError)
- [`struct HttpListener`](#struct-HttpListener)
  - [`init(listener: tcp.TcpListener, config: ServerConfig = ServerConfig())`](#HttpListener.init)
  - [`var Listener: tcp.TcpListener`](#HttpListener.Listener)
  - [`var Config: ServerConfig`](#HttpListener.Config)
  - [`var Port: uint16 { get }`](#HttpListener.Port)
  - [`var Address: string { get }`](#HttpListener.Address)
  - [`func Close()`](#HttpListener.Close)
  - [`func Accept() async throws -> tcp.TcpStream`](#HttpListener.Accept)
  - [`func ServeOne(handler: @escaping (Request) async throws -> ResponseWriter) async throws`](#HttpListener.ServeOne)
  - [`func Serve(handler: @escaping (Request) async throws -> ResponseWriter) async throws`](#HttpListener.Serve)
- [`enum HttpVersion`](#enum-HttpVersion)
  - [`var Name: string { get }`](#HttpVersion.Name)
  - [`var Alpn: string { get }`](#HttpVersion.Alpn)
  - [`var AltSvcToken: string { get }`](#HttpVersion.AltSvcToken)
- [`struct QpackDecoder`](#struct-QpackDecoder)
  - [`init()`](#QpackDecoder.init)
  - [`var staticTable: [QpackHeader]`](#QpackDecoder.staticTable)
  - [`func DecodeHeaders(data: [uint8]) throws -> [HeaderEntry]`](#QpackDecoder.DecodeHeaders)
- [`struct QpackEncoder`](#struct-QpackEncoder)
  - [`init()`](#QpackEncoder.init)
  - [`var staticTable: [QpackHeader]`](#QpackEncoder.staticTable)
  - [`func EncodeHeader(name: string, value: string) -> [uint8]`](#QpackEncoder.EncodeHeader)
  - [`func EncodeHeaders(_ headers: [HeaderEntry]) -> [uint8]`](#QpackEncoder.EncodeHeaders)
- [`struct QpackHeader`](#struct-QpackHeader)
  - [`init(name: string, value: string)`](#QpackHeader.init)
  - [`var Name: string`](#QpackHeader.Name)
  - [`var Value: string`](#QpackHeader.Value)
- [`struct Request`](#struct-Request)
  - [`init(method: string = "GET", url: string = "/", proto: string = "HTTP/1.1")`](#Request.init)
  - [`init(method: string, url: string, version: HttpVersion)`](#Request.init-2)
  - [`var Method: string`](#Request.Method)
  - [`var URL: string`](#Request.URL)
  - [`var Version: HttpVersion = HttpVersion.http1_1`](#Request.Version)
  - [`var Proto: string = "HTTP/1.1"`](#Request.Proto)
  - [`var Headers: Header = Header()`](#Request.Headers)
  - [`var Body: [uint8] = []`](#Request.Body)
  - [`func BodyText() -> string`](#Request.BodyText)
  - [`func HeaderText() -> string`](#Request.HeaderText)
  - [`func Bytes() -> [uint8]`](#Request.Bytes)
  - [`func Write(to stream: tcp.TcpStream) async throws`](#Request.Write)
  - [`static func FindHeaderEnd(_ raw: [uint8], from: int = 0) -> int`](#Request.FindHeaderEnd)
  - [`static func FindHeaderEnd(_ raw: [uint8], from: int, to: int) -> int`](#Request.FindHeaderEnd-2)
  - [`static func ParseHeaders(_ raw: [uint8], headerEnd: int) throws -> Request`](#Request.ParseHeaders)
  - [`static func ParseHeaders(_ raw: [uint8], from: int, headerEnd: int) throws -> Request`](#Request.ParseHeaders-2)
- [`struct Response`](#struct-Response)
  - [`init(statusCode: int32 = 200, proto: string = "HTTP/1.1")`](#Response.init)
  - [`init(statusCode: int32, version: HttpVersion)`](#Response.init-2)
  - [`var StatusCode: int32 = 200`](#Response.StatusCode)
  - [`var Status: string = "200 OK"`](#Response.Status)
  - [`var Version: HttpVersion = HttpVersion.http1_1`](#Response.Version)
  - [`var Proto: string = "HTTP/1.1"`](#Response.Proto)
  - [`var Headers: Header = Header()`](#Response.Headers)
  - [`var Body: [uint8] = []`](#Response.Body)
  - [`var Text: string { get }`](#Response.Text)
  - [`func BodyText() -> string`](#Response.BodyText)
  - [`mutating func SetBodyText(_ text: string)`](#Response.SetBodyText)
  - [`func StatusLine() -> string`](#Response.StatusLine)
  - [`func HeaderText() -> string`](#Response.HeaderText)
  - [`func Bytes() -> [uint8]`](#Response.Bytes)
  - [`func Write(to stream: tcp.TcpStream) async throws`](#Response.Write)
  - [`static func FindHeaderEnd(_ raw: [uint8], from: int = 0) -> int`](#Response.FindHeaderEnd)
  - [`static func ParseHeaders(_ raw: [uint8], headerEnd: int) throws -> Response`](#Response.ParseHeaders)
- [`struct ResponseStream: io.AsyncReader`](#struct-ResponseStream)
  - [`var Response: Response`](#ResponseStream.Response)
  - [`var ContentLength: int64? { get }`](#ResponseStream.ContentLength)
  - [`mutating func Read(into buffer: inout [uint8]) async throws -> int`](#ResponseStream.Read)
  - [`mutating func Close()`](#ResponseStream.Close)
- [`struct ResponseWriter`](#struct-ResponseWriter)
  - [`init()`](#ResponseWriter.init)
  - [`var StatusCode: int32 = 200`](#ResponseWriter.StatusCode)
  - [`var Headers: Header = Header()`](#ResponseWriter.Headers)
  - [`var Body: [uint8] = []`](#ResponseWriter.Body)
  - [`mutating func SetStatus(_ code: int32)`](#ResponseWriter.SetStatus)
  - [`mutating func SetHeader(_ key: string, _ value: string)`](#ResponseWriter.SetHeader)
  - [`mutating func Write(_ data: [uint8])`](#ResponseWriter.Write)
  - [`mutating func WriteText(_ s: string)`](#ResponseWriter.WriteText)
- [`struct Server`](#struct-Server)
  - [`init(config: ServerConfig = ServerConfig(), handler: @escaping (Request) async throws -> ResponseWriter)`](#Server.init)
  - [`var Config: ServerConfig`](#Server.Config)
  - [`var Handler: (Request) async throws -> ResponseWriter`](#Server.Handler)
  - [`func Listen(on address: string) async throws`](#Server.Listen)
  - [`func ListenTLS(on address: string, cert: string, key: string) async throws`](#Server.ListenTLS)
- [`struct ServerConfig`](#struct-ServerConfig)
  - [`init(certFile: string = "", keyFile: string = "", altSvcEnabled: bool = true, readTimeoutMs: int32 = 15000, writeTimeoutMs: int32 = 15000)`](#ServerConfig.init)
  - [`init(protocols: [HttpVersion], certFile: string = "", keyFile: string = "", altSvcEnabled: bool = true, readTimeoutMs: int32 = 15000, writeTimeoutMs: int32 = 15000)`](#ServerConfig.init-2)
  - [`var Protocols: [HttpVersion]`](#ServerConfig.Protocols)
  - [`var CertFile: string`](#ServerConfig.CertFile)
  - [`var KeyFile: string`](#ServerConfig.KeyFile)
  - [`var AltSvcEnabled: bool`](#ServerConfig.AltSvcEnabled)
  - [`var ReadTimeoutMs: int32`](#ServerConfig.ReadTimeoutMs)
  - [`var WriteTimeoutMs: int32`](#ServerConfig.WriteTimeoutMs)
- [`struct Status`](#struct-Status)
  - [`static let OK: int32 = 200`](#Status.OK)
  - [`static let Created: int32 = 201`](#Status.Created)
  - [`static let Accepted: int32 = 202`](#Status.Accepted)
  - [`static let NoContent: int32 = 204`](#Status.NoContent)
  - [`static let MovedPermanently: int32 = 301`](#Status.MovedPermanently)
  - [`static let Found: int32 = 302`](#Status.Found)
  - [`static let SeeOther: int32 = 303`](#Status.SeeOther)
  - [`static let NotModified: int32 = 304`](#Status.NotModified)
  - [`static let BadRequest: int32 = 400`](#Status.BadRequest)
  - [`static let Unauthorized: int32 = 401`](#Status.Unauthorized)
  - [`static let Forbidden: int32 = 403`](#Status.Forbidden)
  - [`static let NotFound: int32 = 404`](#Status.NotFound)
  - [`static let MethodNotAllowed: int32 = 405`](#Status.MethodNotAllowed)
  - [`static let InternalServerError: int32 = 500`](#Status.InternalServerError)
  - [`static let BadGateway: int32 = 502`](#Status.BadGateway)
  - [`static let ServiceUnavailable: int32 = 503`](#Status.ServiceUnavailable)

## Variables

<a id="var-DefaultClient"></a>

```vertex
public var DefaultClient = Client()
```

## Functions

### func BuildH2Frame <a id="func-BuildH2Frame"></a>

```vertex
public func BuildH2Frame(type: uint8, flags: uint8, streamId: uint32, payload: [uint8]) -> [uint8]
```

Serializes an RFC 9113 9-byte frame header and payload.

### func BuildH2GoAway <a id="func-BuildH2GoAway"></a>

```vertex
public func BuildH2GoAway(lastStreamId: uint32, errorCode: uint32) -> [uint8]
```

Builds an HTTP/2 GOAWAY frame.

### func BuildH2Ping <a id="func-BuildH2Ping"></a>

```vertex
public func BuildH2Ping(opaqueData: [uint8], ack: bool = false) -> [uint8]
```

Builds an HTTP/2 PING frame.

### func BuildH2RstStream <a id="func-BuildH2RstStream"></a>

```vertex
public func BuildH2RstStream(streamId: uint32, errorCode: uint32) -> [uint8]
```

Builds an HTTP/2 RST_STREAM frame.

### func BuildH2SettingsFrame <a id="func-BuildH2SettingsFrame"></a>

```vertex
public func BuildH2SettingsFrame(settings: [H2Setting], ack: bool = false) -> [uint8]
```

Builds an HTTP/2 SETTINGS frame.

### func BuildH2WindowUpdate <a id="func-BuildH2WindowUpdate"></a>

```vertex
public func BuildH2WindowUpdate(streamId: uint32, increment: uint32) -> [uint8]
```

Builds an HTTP/2 WINDOW_UPDATE frame.

### func BuildH3Frame <a id="func-BuildH3Frame"></a>

```vertex
public func BuildH3Frame(type: uint64, payload: [uint8]) -> [uint8]
```

Serializes an RFC 9114 frame using RFC 9000 varint encoding for type and length.

### func BuildH3SettingsFrame <a id="func-BuildH3SettingsFrame"></a>

```vertex
public func BuildH3SettingsFrame(settings: [H3Setting]) -> [uint8]
```

Serializes an HTTP/3 SETTINGS frame.

### func DecodeChunked <a id="func-DecodeChunked"></a>

```vertex
public func DecodeChunked(_ d: [uint8]) -> [uint8]
```

A chunked body's data, its chunks joined; as much as there is when
it was cut short.

### func Get <a id="func-Get"></a>

```vertex
public func Get(_ address: string) async throws -> Response
```

Get sends an HTTP GET request to url using DefaultClient.

### func GetH3 <a id="func-GetH3"></a>

```vertex
public func GetH3(_ address: string) async throws -> Response
```

GetH3 sends an HTTP/3 GET request to url directly over QUIC.

### func H2ClientPreface <a id="func-H2ClientPreface"></a>

```vertex
public func H2ClientPreface() -> [uint8]
```

24-byte client connection preface (RFC 9113 Section 3.4).

### func H2FrameContent <a id="func-H2FrameContent"></a>

```vertex
public func H2FrameContent(_ frame: H2Frame) throws -> [uint8]
```

A DATA or HEADERS frame's content: without the pad length and
padding a PADDED frame carries (RFC 9113 6.1, 6.2), and for HEADERS
without the PRIORITY flag's dependency and weight.

### func HpackDecodeInt <a id="func-HpackDecodeInt"></a>

```vertex
public func HpackDecodeInt(data: [uint8], offset: int, prefixBits: int) throws -> DecodedInt
```

Decodes an integer from HPACK byte stream (RFC 7541 Section 5.1).

### func HpackDecodeString <a id="func-HpackDecodeString"></a>

```vertex
public func HpackDecodeString(data: [uint8], offset: int) throws -> DecodedStr
```

Decodes a string literal (RFC 7541 Section 5.2).

### func HpackEncodeInt <a id="func-HpackEncodeInt"></a>

```vertex
public func HpackEncodeInt(value: int, prefixBits: int, prefixMask: uint8) -> [uint8]
```

Encodes an integer with a prefix mask (RFC 7541 Section 5.1).

### func HpackEncodeString <a id="func-HpackEncodeString"></a>

```vertex
public func HpackEncodeString(_ s: string) -> [uint8]
```

Encodes a string literal without Huffman encoding (RFC 7541 Section 5.2).

### func HpackStaticTable <a id="func-HpackStaticTable"></a>

```vertex
public func HpackStaticTable() -> [HpackHeader]
```

RFC 7541 Appendix A - Static Table

### func HuffmanDecode <a id="func-HuffmanDecode"></a>

```vertex
public func HuffmanDecode(_ data: [uint8], from: int, to: int) throws -> [uint8]
```

Decodes a Huffman-coded string literal's bytes. What is left over at
the end must be under eight one bits: the start of end-of-string.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ address: string) throws -> HttpListener
```

Starts listening on the specified address and returns an HttpListener immediately.

### func Listen <a id="func-Listen-2"></a>

```vertex
public func Listen(_ address: string, config: ServerConfig) throws -> HttpListener
```

Starts listening on the specified address with server configuration and returns an HttpListener immediately.

### func Listen <a id="func-Listen-3"></a>

```vertex
public func Listen(_ address: string, handler: @escaping (Request) async throws -> ResponseWriter) async throws
```

Starts listening on the specified address and serves HTTP requests using the provided handler.

### func ParseAltSvcHeader <a id="func-ParseAltSvcHeader"></a>

```vertex
public func ParseAltSvcHeader(_ value: string, defaultHost: string = "") -> [AltSvcService]
```

Parses an Alt-Svc header value into a list of advertised alternative services.
Example: `h3=":443"; ma=86400` or `h3="alt.example.com:8443"`

### func ParseH2FrameHeader <a id="func-ParseH2FrameHeader"></a>

```vertex
public func ParseH2FrameHeader(data: [uint8], offset: int = 0) throws -> H2FrameHeader
```

Parses an RFC 9113 9-byte frame header.

### func ParseH2Settings <a id="func-ParseH2Settings"></a>

```vertex
public func ParseH2Settings(payload: [uint8]) -> [H2Setting]
```

Parses payload of an HTTP/2 SETTINGS frame.

### func ParseH3Frame <a id="func-ParseH3Frame"></a>

```vertex
public func ParseH3Frame(data: [uint8], offset: int = 0) throws -> H3ParsedFrame
```

Parses an RFC 9114 frame from a byte buffer.

### func ParseH3Settings <a id="func-ParseH3Settings"></a>

```vertex
public func ParseH3Settings(payload: [uint8]) throws -> [H3Setting]
```

Parses payload of an HTTP/3 SETTINGS frame.

### func Post <a id="func-Post"></a>

```vertex
public func Post(_ address: string, contentType: string, body: [uint8]) async throws -> Response
```

Post sends an HTTP POST request to url using DefaultClient.

### func QpackStaticTable <a id="func-QpackStaticTable"></a>

```vertex
public func QpackStaticTable() -> [QpackHeader]
```

RFC 9204 Appendix A - Static Table (Common 99 entries)

### func ReadRequest <a id="func-ReadRequest"></a>

```vertex
public func ReadRequest(from stream: tcp.TcpStream) async throws -> Request
```

ReadRequest parses an HTTP/1.1 request from an incoming TCP stream.

### func ReadRequestTls <a id="func-ReadRequestTls"></a>

```vertex
public func ReadRequestTls(from conn: inout tls.Conn) async throws -> Request
```

Reads an incoming HTTP/1.1 request over TLS.

### func ReadResponse <a id="func-ReadResponse"></a>

```vertex
public func ReadResponse(from stream: tcp.TcpStream) async throws -> Response
```

ReadResponse parses an HTTP/1.1 response from a connected TCP stream.

### func ReadResponseTls <a id="func-ReadResponseTls"></a>

```vertex
public func ReadResponseTls(from conn: inout tls.Conn) async throws -> Response
```

Reads an HTTP/1.1 response from a connected TLS session.

### func ServeConn <a id="func-ServeConn"></a>

```vertex
public func ServeConn(stream: tcp.TcpStream, handle: (Request) async throws -> ResponseWriter) async
```

ServeConn handles incoming HTTP client connections over plain TCP with keep-alive support.

Every request on the connection is read into the one buffer, parsed
in place, answered from the one write buffer, and sent with one
write. A request that arrived behind the last one (pipelining) is
found where it already is, without reading again.

### func ServeConnTls <a id="func-ServeConnTls"></a>

```vertex
public func ServeConnTls(conn: inout tls.Conn, handle: (Request) async throws -> ResponseWriter, altSvcPort: uint16 = 0) async
```

ServeConnTls handles a single incoming HTTPS client connection over an established TLS session.

### func StatusText <a id="func-StatusText"></a>

```vertex
public func StatusText(_ code: int32) -> string
```

### func WriteRequestTls <a id="func-WriteRequestTls"></a>

```vertex
public func WriteRequestTls(_ req: Request, to conn: inout tls.Conn) async throws
```

Writes an HTTP request to an active TLS connection.

### func WriteResponseTls <a id="func-WriteResponseTls"></a>

```vertex
public func WriteResponseTls(_ res: Response, to conn: inout tls.Conn) async throws
```

Writes an HTTP response to an active TLS connection.

## Types

### struct AltSvcCache <a id="struct-AltSvcCache"></a>

```vertex
public struct AltSvcCache
```

#### Initializers

<a id="AltSvcCache.init"></a>

```vertex
public init()
```

#### Properties

<a id="AltSvcCache.entries"></a>

```vertex
public var entries: [AltSvcCacheEntry]
```

#### Methods

<a id="AltSvcCache.Set"></a>

```vertex
public mutating func Set(origin: string, service: AltSvcService)
```

<a id="AltSvcCache.Get"></a>

```vertex
public func Get(origin: string, protocolName: string) -> AltSvcService?
```

<a id="AltSvcCache.Clear"></a>

```vertex
public mutating func Clear()
```

<a id="AltSvcCache.Clear-2"></a>

```vertex
public mutating func Clear(origin: string)
```

### struct AltSvcCacheEntry <a id="struct-AltSvcCacheEntry"></a>

```vertex
public struct AltSvcCacheEntry
```

An in-memory cache for RFC 7838 alternative services.

#### Initializers

<a id="AltSvcCacheEntry.init"></a>

```vertex
public init(origin: string, service: AltSvcService)
```

#### Properties

<a id="AltSvcCacheEntry.Origin"></a>

```vertex
public var Origin: string
```

<a id="AltSvcCacheEntry.Service"></a>

```vertex
public var Service: AltSvcService
```

### struct AltSvcService <a id="struct-AltSvcService"></a>

```vertex
public struct AltSvcService
```

Represents an alternative service advertisement (RFC 7838).

#### Initializers

<a id="AltSvcService.init"></a>

```vertex
public init(proto: string, host: string, port: uint16, maxAgeSeconds: int64 = 86400)
```

#### Properties

<a id="AltSvcService.Protocol"></a>

```vertex
public var Protocol: string
```

<a id="AltSvcService.Host"></a>

```vertex
public var Host: string
```

<a id="AltSvcService.Port"></a>

```vertex
public var Port: uint16
```

<a id="AltSvcService.MaxAgeSeconds"></a>

```vertex
public var MaxAgeSeconds: int64
```

### struct Client <a id="struct-Client"></a>

```vertex
public struct Client
```

Client is a unified multi-protocol HTTP client supporting HTTP/1.1, HTTP/2, and HTTP/3.

#### Initializers

<a id="Client.init"></a>

```vertex
public init(config: ClientConfig = ClientConfig())
```

<a id="Client.init-2"></a>

```vertex
public init(tlsConfig: tls.Config, timeoutMs: int32 = 5000)
```

<a id="Client.init-3"></a>

```vertex
public init(timeoutMs: int32)
```

#### Properties

<a id="Client.Default"></a>

```vertex
public static let Default: Client = Client()
```

<a id="Client.Config"></a>

```vertex
public var Config: ClientConfig
```

<a id="Client.AltSvc"></a>

```vertex
public var AltSvc: AltSvcCache
```

<a id="Client.TimeoutMs"></a>

```vertex
public var TimeoutMs: int32 { get set }
```

<a id="Client.TLSConfig"></a>

```vertex
public var TLSConfig: tls.Config { get set }
```

#### Methods

<a id="Client.Do"></a>

```vertex
public mutating func Do(_ req: Request, host: string, port: uint16 = 80, config: tls.Config = tls.Config()) async throws -> Response
```

Do sends an HTTP request and returns an HTTP response.

<a id="Client.DoUrl"></a>

```vertex
public mutating func DoUrl(_ req: Request, url target: url.URL) async throws -> Response
```

DoUrl executes an HTTP request targeted at a parsed URL. Unless
the request names its own Accept-Encoding, it asks for gzip or
deflate and hands back the body decoded.

<a id="Client.executeH3"></a>

```vertex
public func executeH3(req: Request, host: string, port: uint16) async throws -> Response
```

Executes HTTP/3 over QUIC.

<a id="Client.GetH3"></a>

```vertex
public func GetH3(_ address: string) async throws -> Response
```

GetH3 sends an HTTP/3 GET request directly over QUIC.

<a id="Client.Get"></a>

```vertex
public mutating func Get(_ address: string) async throws -> Response
```

Get sends an HTTP or HTTPS GET request to the specified URL.

<a id="Client.Post"></a>

```vertex
public mutating func Post(_ address: string, contentType: string, body: [uint8]) async throws -> Response
```

Post sends an HTTP or HTTPS POST request with the specified body to the URL.

<a id="Client.Open"></a>

```vertex
public func Open(_ req: Request, url target: url.URL) async throws -> ResponseStream
```

Open sends req to url and returns once the response's headers are
in, with its body still to be read from the stream -- which the
caller closes. It speaks HTTP/1.1, over TLS for https (ALPN
offers only http/1.1), and does not follow redirects: a 3xx is
returned as it is, its Location in the headers.

### struct ClientConfig <a id="struct-ClientConfig"></a>

```vertex
public struct ClientConfig
```

ClientConfig specifies protocol preferences, timeouts, and TLS options for Client.

#### Initializers

<a id="ClientConfig.init"></a>

```vertex
public init(timeoutMs: int32 = 10000,
            enableAltSvc: bool = true,
            tlsConfig: tls.Config = tls.Config())
```

<a id="ClientConfig.init-2"></a>

```vertex
public init(enabledVersions: [HttpVersion],
            timeoutMs: int32 = 10000,
            enableAltSvc: bool = true,
            tlsConfig: tls.Config = tls.Config())
```

#### Properties

<a id="ClientConfig.EnabledVersions"></a>

```vertex
public var EnabledVersions: [HttpVersion]
```

<a id="ClientConfig.TimeoutMs"></a>

```vertex
public var TimeoutMs: int32
```

<a id="ClientConfig.ReadTimeoutMs"></a>

```vertex
public var ReadTimeoutMs: int32 = 30000
```

How long a read or a write on a connection waits before the request
fails with a timeout: URLSession's timeoutIntervalForRequest, an idle
time, not the whole request's. 0 waits for as long as it takes.

<a id="ClientConfig.EnableAltSvc"></a>

```vertex
public var EnableAltSvc: bool
```

<a id="ClientConfig.TLSConfig"></a>

```vertex
public var TLSConfig: tls.Config
```

<a id="ClientConfig.MaxRedirects"></a>

```vertex
public var MaxRedirects: int = 0
```

How many redirects (301, 302, 303, 307, 308) DoUrl follows before
handing the redirect back. 0, the default, follows none.

### struct DecodedInt <a id="struct-DecodedInt"></a>

```vertex
public struct DecodedInt
```

#### Initializers

<a id="DecodedInt.init"></a>

```vertex
public init(value: int, bytesRead: int)
```

#### Properties

<a id="DecodedInt.Value"></a>

```vertex
public var Value: int
```

<a id="DecodedInt.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct DecodedStr <a id="struct-DecodedStr"></a>

```vertex
public struct DecodedStr
```

#### Initializers

<a id="DecodedStr.init"></a>

```vertex
public init(value: string, bytesRead: int)
```

#### Properties

<a id="DecodedStr.Value"></a>

```vertex
public var Value: string
```

<a id="DecodedStr.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct H2ClientSession <a id="struct-H2ClientSession"></a>

```vertex
public struct H2ClientSession
```

#### Initializers

<a id="H2ClientSession.init"></a>

```vertex
public init()
```

#### Properties

<a id="H2ClientSession.NextStreamId"></a>

```vertex
public var NextStreamId: uint32
```

<a id="H2ClientSession.Encoder"></a>

```vertex
public var Encoder: HpackEncoder
```

<a id="H2ClientSession.Decoder"></a>

```vertex
public var Decoder: HpackDecoder
```

<a id="H2ClientSession.Streams"></a>

```vertex
public var Streams: [H2Stream]
```

<a id="H2ClientSession.OutboundQueue"></a>

```vertex
public var OutboundQueue: [uint8]
```

<a id="H2ClientSession.PeerWindowSize"></a>

```vertex
public var PeerWindowSize: int
```

<a id="H2ClientSession.LocalWindowSize"></a>

```vertex
public var LocalWindowSize: int
```

<a id="H2ClientSession.IsClosed"></a>

```vertex
public var IsClosed: bool
```

#### Methods

<a id="H2ClientSession.StartHandshake"></a>

```vertex
public mutating func StartHandshake() -> [uint8]
```

Initializes connection by generating client connection preface and initial SETTINGS frame.

<a id="H2ClientSession.CreateRequestFrames"></a>

```vertex
public mutating func CreateRequestFrames(req: Request, scheme: string, authority: string) -> [uint8]
```

Formulates an HTTP/2 request into HEADERS (and optional DATA) frames.

<a id="H2ClientSession.ProcessFrame"></a>

```vertex
public mutating func ProcessFrame(_ frame: H2Frame) throws -> Response?
```

Processes an inbound HTTP/2 frame from the server.
If the frame completes a response on a stream, returns the reconstructed Response.

<a id="H2ClientSession.DrainOutbound"></a>

```vertex
public mutating func DrainOutbound() -> [uint8]
```

Drains any pending outbound control frames (e.g. SETTINGS ACKs, PINGs, WINDOW_UPDATEs).

### struct H2ErrorCode <a id="struct-H2ErrorCode"></a>

```vertex
public struct H2ErrorCode
```

#### Properties

<a id="H2ErrorCode.NoError"></a>

```vertex
public static let NoError: uint32 = 0x00
```

<a id="H2ErrorCode.ProtocolError"></a>

```vertex
public static let ProtocolError: uint32 = 0x01
```

<a id="H2ErrorCode.InternalError"></a>

```vertex
public static let InternalError: uint32 = 0x02
```

<a id="H2ErrorCode.FlowControlError"></a>

```vertex
public static let FlowControlError: uint32 = 0x03
```

<a id="H2ErrorCode.SettingsTimeout"></a>

```vertex
public static let SettingsTimeout: uint32 = 0x04
```

<a id="H2ErrorCode.StreamClosed"></a>

```vertex
public static let StreamClosed: uint32 = 0x05
```

<a id="H2ErrorCode.FrameSizeError"></a>

```vertex
public static let FrameSizeError: uint32 = 0x06
```

<a id="H2ErrorCode.RefusedStream"></a>

```vertex
public static let RefusedStream: uint32 = 0x07
```

<a id="H2ErrorCode.Cancel"></a>

```vertex
public static let Cancel: uint32 = 0x08
```

### struct H2Flag <a id="struct-H2Flag"></a>

```vertex
public struct H2Flag
```

#### Properties

<a id="H2Flag.EndStream"></a>

```vertex
public static let EndStream: uint8 = 0x01
```

<a id="H2Flag.Ack"></a>

```vertex
public static let Ack: uint8 = 0x01
```

<a id="H2Flag.EndHeaders"></a>

```vertex
public static let EndHeaders: uint8 = 0x04
```

<a id="H2Flag.Padded"></a>

```vertex
public static let Padded: uint8 = 0x08
```

<a id="H2Flag.Priority"></a>

```vertex
public static let Priority: uint8 = 0x20
```

### struct H2Frame <a id="struct-H2Frame"></a>

```vertex
public struct H2Frame
```

#### Initializers

<a id="H2Frame.init"></a>

```vertex
public init(header: H2FrameHeader, payload: [uint8])
```

#### Properties

<a id="H2Frame.Header"></a>

```vertex
public var Header: H2FrameHeader
```

<a id="H2Frame.Payload"></a>

```vertex
public var Payload: [uint8]
```

### struct H2FrameHeader <a id="struct-H2FrameHeader"></a>

```vertex
public struct H2FrameHeader
```

#### Initializers

<a id="H2FrameHeader.init"></a>

```vertex
public init(length: int, type: uint8, flags: uint8, streamId: uint32)
```

#### Properties

<a id="H2FrameHeader.Length"></a>

```vertex
public var Length: int
```

<a id="H2FrameHeader.Type"></a>

```vertex
public var Type: uint8
```

<a id="H2FrameHeader.Flags"></a>

```vertex
public var Flags: uint8
```

<a id="H2FrameHeader.StreamId"></a>

```vertex
public var StreamId: uint32
```

### struct H2FrameType <a id="struct-H2FrameType"></a>

```vertex
public struct H2FrameType
```

#### Properties

<a id="H2FrameType.Data"></a>

```vertex
public static let Data: uint8 = 0x00
```

<a id="H2FrameType.Headers"></a>

```vertex
public static let Headers: uint8 = 0x01
```

<a id="H2FrameType.Priority"></a>

```vertex
public static let Priority: uint8 = 0x02
```

<a id="H2FrameType.RstStream"></a>

```vertex
public static let RstStream: uint8 = 0x03
```

<a id="H2FrameType.Settings"></a>

```vertex
public static let Settings: uint8 = 0x04
```

<a id="H2FrameType.PushPromise"></a>

```vertex
public static let PushPromise: uint8 = 0x05
```

<a id="H2FrameType.Ping"></a>

```vertex
public static let Ping: uint8 = 0x06
```

<a id="H2FrameType.GoAway"></a>

```vertex
public static let GoAway: uint8 = 0x07
```

<a id="H2FrameType.WindowUpdate"></a>

```vertex
public static let WindowUpdate: uint8 = 0x08
```

<a id="H2FrameType.Continuation"></a>

```vertex
public static let Continuation: uint8 = 0x09
```

### struct H2Setting <a id="struct-H2Setting"></a>

```vertex
public struct H2Setting
```

#### Initializers

<a id="H2Setting.init"></a>

```vertex
public init(identifier: uint16, value: uint32)
```

#### Properties

<a id="H2Setting.Identifier"></a>

```vertex
public var Identifier: uint16
```

<a id="H2Setting.Value"></a>

```vertex
public var Value: uint32
```

### struct H2SettingId <a id="struct-H2SettingId"></a>

```vertex
public struct H2SettingId
```

#### Properties

<a id="H2SettingId.HeaderTableSize"></a>

```vertex
public static let HeaderTableSize: uint16 = 0x01
```

<a id="H2SettingId.EnablePush"></a>

```vertex
public static let EnablePush: uint16 = 0x02
```

<a id="H2SettingId.MaxConcurrentStreams"></a>

```vertex
public static let MaxConcurrentStreams: uint16 = 0x03
```

<a id="H2SettingId.InitialWindowSize"></a>

```vertex
public static let InitialWindowSize: uint16 = 0x04
```

<a id="H2SettingId.MaxFrameSize"></a>

```vertex
public static let MaxFrameSize: uint16 = 0x05
```

<a id="H2SettingId.MaxHeaderListSize"></a>

```vertex
public static let MaxHeaderListSize: uint16 = 0x06
```

### struct H2Stream <a id="struct-H2Stream"></a>

```vertex
public struct H2Stream
```

#### Initializers

<a id="H2Stream.init"></a>

```vertex
public init(streamId: uint32, initialWindowSize: int = 65535)
```

#### Properties

<a id="H2Stream.StreamId"></a>

```vertex
public var StreamId: uint32
```

<a id="H2Stream.State"></a>

```vertex
public var State: int
```

<a id="H2Stream.InboundHeaders"></a>

```vertex
public var InboundHeaders: [HeaderEntry]
```

<a id="H2Stream.InboundBody"></a>

```vertex
public var InboundBody: [uint8]
```

<a id="H2Stream.WindowSize"></a>

```vertex
public var WindowSize: int
```

<a id="H2Stream.HeaderBlock"></a>

```vertex
public var HeaderBlock: [uint8] = []
```

A header block still arriving in CONTINUATION frames, and
whether its HEADERS frame ended the stream.

<a id="H2Stream.HeaderBlockEndsStream"></a>

```vertex
public var HeaderBlockEndsStream: bool = false
```

### struct H2StreamState <a id="struct-H2StreamState"></a>

```vertex
public struct H2StreamState
```

#### Properties

<a id="H2StreamState.Idle"></a>

```vertex
public static let Idle = 0
```

<a id="H2StreamState.Open"></a>

```vertex
public static let Open = 1
```

<a id="H2StreamState.HalfClosedLocal"></a>

```vertex
public static let HalfClosedLocal = 2
```

<a id="H2StreamState.HalfClosedRemote"></a>

```vertex
public static let HalfClosedRemote = 3
```

<a id="H2StreamState.Closed"></a>

```vertex
public static let Closed = 4
```

### struct H3ClientSession <a id="struct-H3ClientSession"></a>

```vertex
public struct H3ClientSession
```

RFC 9114 HTTP/3 Client Session coordinating streams over a QuicConnection.

#### Initializers

<a id="H3ClientSession.init"></a>

```vertex
public init(connection: quic.QuicConnection)
```

#### Properties

<a id="H3ClientSession.Connection"></a>

```vertex
public var Connection: quic.QuicConnection
```

<a id="H3ClientSession.Encoder"></a>

```vertex
public var Encoder: QpackEncoder
```

<a id="H3ClientSession.Decoder"></a>

```vertex
public var Decoder: QpackDecoder
```

<a id="H3ClientSession.ControlStreamId"></a>

```vertex
public var ControlStreamId: uint64
```

<a id="H3ClientSession.IsInitialized"></a>

```vertex
public var IsInitialized: bool
```

#### Methods

<a id="H3ClientSession.StartSession"></a>

```vertex
public mutating func StartSession() async throws
```

Initializes HTTP/3 session by opening a control uni-stream and sending SETTINGS.

<a id="H3ClientSession.SendRequest"></a>

```vertex
public mutating func SendRequest(req: Request, scheme: string, authority: string) async throws -> quic.QuicStream
```

Encodes and frames an HTTP request into an HTTP/3 bidirectional stream.

<a id="H3ClientSession.ParseResponseStream"></a>

```vertex
public mutating func ParseResponseStream(data: [uint8]) throws -> Response
```

Parses inbound HTTP/3 stream payload into a completed HTTP Response.

### struct H3FrameType <a id="struct-H3FrameType"></a>

```vertex
public struct H3FrameType
```

#### Properties

<a id="H3FrameType.Data"></a>

```vertex
public static let Data: uint64 = 0x00
```

<a id="H3FrameType.Headers"></a>

```vertex
public static let Headers: uint64 = 0x01
```

<a id="H3FrameType.CancelPush"></a>

```vertex
public static let CancelPush: uint64 = 0x03
```

<a id="H3FrameType.Settings"></a>

```vertex
public static let Settings: uint64 = 0x04
```

<a id="H3FrameType.PushPromise"></a>

```vertex
public static let PushPromise: uint64 = 0x07
```

<a id="H3FrameType.GoAway"></a>

```vertex
public static let GoAway: uint64 = 0x0c
```

<a id="H3FrameType.MaxPushId"></a>

```vertex
public static let MaxPushId: uint64 = 0x0d
```

<a id="H3FrameType.WebTransportStream"></a>

```vertex
public static let WebTransportStream: uint64 = 0x41
```

### struct H3ParsedFrame <a id="struct-H3ParsedFrame"></a>

```vertex
public struct H3ParsedFrame
```

#### Initializers

<a id="H3ParsedFrame.init"></a>

```vertex
public init(type: uint64, payload: [uint8], bytesRead: int)
```

#### Properties

<a id="H3ParsedFrame.Type"></a>

```vertex
public var Type: uint64
```

<a id="H3ParsedFrame.Payload"></a>

```vertex
public var Payload: [uint8]
```

<a id="H3ParsedFrame.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct H3Setting <a id="struct-H3Setting"></a>

```vertex
public struct H3Setting
```

#### Initializers

<a id="H3Setting.init"></a>

```vertex
public init(identifier: uint64, value: uint64)
```

#### Properties

<a id="H3Setting.Identifier"></a>

```vertex
public var Identifier: uint64
```

<a id="H3Setting.Value"></a>

```vertex
public var Value: uint64
```

### struct H3SettingId <a id="struct-H3SettingId"></a>

```vertex
public struct H3SettingId
```

#### Properties

<a id="H3SettingId.QpackMaxTableCapacity"></a>

```vertex
public static let QpackMaxTableCapacity: uint64 = 0x01
```

<a id="H3SettingId.MaxFieldSectionSize"></a>

```vertex
public static let MaxFieldSectionSize: uint64 = 0x06
```

<a id="H3SettingId.QpackBlockedStreams"></a>

```vertex
public static let QpackBlockedStreams: uint64 = 0x07
```

<a id="H3SettingId.EnableConnectProtocol"></a>

```vertex
public static let EnableConnectProtocol: uint64 = 0x08
```

<a id="H3SettingId.EnableWebTransport"></a>

```vertex
public static let EnableWebTransport: uint64 = 0x2b60
```

<a id="H3SettingId.WebTransportMaxSessions"></a>

```vertex
public static let WebTransportMaxSessions: uint64 = 0xc67170
```

### struct H3StreamType <a id="struct-H3StreamType"></a>

```vertex
public struct H3StreamType
```

#### Properties

<a id="H3StreamType.Control"></a>

```vertex
public static let Control: uint64 = 0x00
```

<a id="H3StreamType.Push"></a>

```vertex
public static let Push: uint64 = 0x01
```

<a id="H3StreamType.QpackEncoder"></a>

```vertex
public static let QpackEncoder: uint64 = 0x02
```

<a id="H3StreamType.QpackDecoder"></a>

```vertex
public static let QpackDecoder: uint64 = 0x03
```

<a id="H3StreamType.WebTransportUni"></a>

```vertex
public static let WebTransportUni: uint64 = 0x54
```

### struct Header <a id="struct-Header"></a>

```vertex
public struct Header
```

#### Initializers

<a id="Header.init"></a>

```vertex
public init()
```

#### Properties

<a id="Header.entries"></a>

```vertex
public var entries: [HeaderEntry] = []
```

#### Methods

<a id="Header.materialize"></a>

```vertex
public mutating func materialize()
```

materialize turns every span into an entry, so that code which
walks `entries` sees them. The server's fast path never calls it;
client and HTTP/2/3 paths do, before they iterate.

<a id="Header.Materialized"></a>

```vertex
public func Materialized() -> [HeaderEntry]
```

Materialized returns the header as an array of entries, turning any
spans into strings first.

<a id="Header.lower"></a>

```vertex
public func lower(_ s: string) -> string
```

<a id="Header.Set"></a>

```vertex
public mutating func Set(_ key: string, _ value: string)
```

<a id="Header.Add"></a>

```vertex
public mutating func Add(_ key: string, _ value: string)
```

<a id="Header.Get"></a>

```vertex
public func Get(_ key: string) -> string?
```

<a id="Header.Del"></a>

```vertex
public mutating func Del(_ key: string)
```

### struct HeaderEntry <a id="struct-HeaderEntry"></a>

```vertex
public struct HeaderEntry
```

#### Initializers

<a id="HeaderEntry.init"></a>

```vertex
public init(key: string, value: string)
```

#### Properties

<a id="HeaderEntry.Key"></a>

```vertex
public var Key: string
```

<a id="HeaderEntry.Value"></a>

```vertex
public var Value: string
```

### typealias Headers <a id="typealias-Headers"></a>

```vertex
public typealias Headers = Header
```

### struct HpackDecoder <a id="struct-HpackDecoder"></a>

```vertex
public struct HpackDecoder
```

Complete HPACK Decoder supporting Static Table lookup and dynamic table.

#### Initializers

<a id="HpackDecoder.init"></a>

```vertex
public init()
```

#### Properties

<a id="HpackDecoder.staticTable"></a>

```vertex
public var staticTable: [HpackHeader]
```

<a id="HpackDecoder.dynamicTable"></a>

```vertex
public var dynamicTable: [HpackHeader]
```

<a id="HpackDecoder.maxTableSize"></a>

```vertex
public var maxTableSize: int = 4096
```

The dynamic table's limit, in RFC 7541's size: each entry is its
name and value in bytes, plus 32. The peer lowers it with a size
update; 4096 is SETTINGS_HEADER_TABLE_SIZE's default.

#### Methods

<a id="HpackDecoder.DecodeHeaders"></a>

```vertex
public mutating func DecodeHeaders(data: [uint8]) throws -> [HeaderEntry]
```

### struct HpackEncoder <a id="struct-HpackEncoder"></a>

```vertex
public struct HpackEncoder
```

Complete HPACK Encoder supporting Static Table matching and literal encoding.

#### Initializers

<a id="HpackEncoder.init"></a>

```vertex
public init()
```

#### Properties

<a id="HpackEncoder.staticTable"></a>

```vertex
public var staticTable: [HpackHeader]
```

#### Methods

<a id="HpackEncoder.EncodeHeader"></a>

```vertex
public func EncodeHeader(name: string, value: string) -> [uint8]
```

<a id="HpackEncoder.EncodeHeaders"></a>

```vertex
public func EncodeHeaders(_ headers: [HeaderEntry]) -> [uint8]
```

### struct HpackHeader <a id="struct-HpackHeader"></a>

```vertex
public struct HpackHeader
```

#### Initializers

<a id="HpackHeader.init"></a>

```vertex
public init(name: string, value: string)
```

#### Properties

<a id="HpackHeader.Name"></a>

```vertex
public var Name: string
```

<a id="HpackHeader.Value"></a>

```vertex
public var Value: string
```

### enum HttpError <a id="enum-HttpError"></a>

```vertex
public enum HttpError: Error
```

Typed HTTP errors across HTTP/1.1, HTTP/2, and HTTP/3.

#### Cases

<a id="HttpError.malformedRequest"></a>

```vertex
case malformedRequest
```

<a id="HttpError.malformedResponse"></a>

```vertex
case malformedResponse
```

<a id="HttpError.connectionClosed"></a>

```vertex
case connectionClosed
```

<a id="HttpError.invalidUrl"></a>

```vertex
case invalidUrl
```

<a id="HttpError.connectionFailed"></a>

```vertex
case connectionFailed
```

<a id="HttpError.handshakeFailed"></a>

```vertex
case handshakeFailed
```

<a id="HttpError.streamError"></a>

```vertex
case streamError
```

<a id="HttpError.protocolError"></a>

```vertex
case protocolError
```

<a id="HttpError.timeout"></a>

```vertex
case timeout
```

<a id="HttpError.unsupportedProtocol"></a>

```vertex
case unsupportedProtocol
```

<a id="HttpError.general"></a>

```vertex
case general(string)
```

### struct HttpListener <a id="struct-HttpListener"></a>

```vertex
public struct HttpListener
```

HttpListener wraps an active TCP listener and serves HTTP connections.

#### Initializers

<a id="HttpListener.init"></a>

```vertex
public init(listener: tcp.TcpListener, config: ServerConfig = ServerConfig())
```

#### Properties

<a id="HttpListener.Listener"></a>

```vertex
public var Listener: tcp.TcpListener
```

<a id="HttpListener.Config"></a>

```vertex
public var Config: ServerConfig
```

<a id="HttpListener.Port"></a>

```vertex
public var Port: uint16 { get }
```

Bound local port number.

<a id="HttpListener.Address"></a>

```vertex
public var Address: string { get }
```

Bound local address formatted as "ip:port".

#### Methods

<a id="HttpListener.Close"></a>

```vertex
public func Close()
```

Closes the listener socket.

<a id="HttpListener.Accept"></a>

```vertex
public func Accept() async throws -> tcp.TcpStream
```

Accepts an incoming raw TCP stream.

<a id="HttpListener.ServeOne"></a>

```vertex
public func ServeOne(handler: @escaping (Request) async throws -> ResponseWriter) async throws
```

Serves a single incoming connection and returns.

<a id="HttpListener.Serve"></a>

```vertex
public func Serve(handler: @escaping (Request) async throws -> ResponseWriter) async throws
```

Accepts and handles incoming HTTP connections concurrently using the provided handler.
Multi-worker accept loops across the runtime pool are automatically leveraged via TcpListener.Serve.

### enum HttpVersion <a id="enum-HttpVersion"></a>

```vertex
public enum HttpVersion
```

Represents supported HTTP protocol versions.

#### Cases

<a id="HttpVersion.http1_1"></a>

```vertex
case http1_1
```

<a id="HttpVersion.http2"></a>

```vertex
case http2
```

<a id="HttpVersion.http3"></a>

```vertex
case http3
```

#### Properties

<a id="HttpVersion.Name"></a>

```vertex
public var Name: string { get }
```

Standard protocol designation (e.g. "HTTP/1.1", "HTTP/2", "HTTP/3").

<a id="HttpVersion.Alpn"></a>

```vertex
public var Alpn: string { get }
```

Official IANA ALPN protocol token.

<a id="HttpVersion.AltSvcToken"></a>

```vertex
public var AltSvcToken: string { get }
```

Official Alt-Svc advertisement token.

### struct QpackDecoder <a id="struct-QpackDecoder"></a>

```vertex
public struct QpackDecoder
```

QPACK Decoder for HTTP/3 header blocks.

#### Initializers

<a id="QpackDecoder.init"></a>

```vertex
public init()
```

#### Properties

<a id="QpackDecoder.staticTable"></a>

```vertex
public var staticTable: [QpackHeader]
```

#### Methods

<a id="QpackDecoder.DecodeHeaders"></a>

```vertex
public func DecodeHeaders(data: [uint8]) throws -> [HeaderEntry]
```

### struct QpackEncoder <a id="struct-QpackEncoder"></a>

```vertex
public struct QpackEncoder
```

QPACK Encoder for HTTP/3 header blocks.

#### Initializers

<a id="QpackEncoder.init"></a>

```vertex
public init()
```

#### Properties

<a id="QpackEncoder.staticTable"></a>

```vertex
public var staticTable: [QpackHeader]
```

#### Methods

<a id="QpackEncoder.EncodeHeader"></a>

```vertex
public func EncodeHeader(name: string, value: string) -> [uint8]
```

<a id="QpackEncoder.EncodeHeaders"></a>

```vertex
public func EncodeHeaders(_ headers: [HeaderEntry]) -> [uint8]
```

Encodes a list of headers into a QPACK Field Section prefix + field lines.

### struct QpackHeader <a id="struct-QpackHeader"></a>

```vertex
public struct QpackHeader
```

#### Initializers

<a id="QpackHeader.init"></a>

```vertex
public init(name: string, value: string)
```

#### Properties

<a id="QpackHeader.Name"></a>

```vertex
public var Name: string
```

<a id="QpackHeader.Value"></a>

```vertex
public var Value: string
```

### struct Request <a id="struct-Request"></a>

```vertex
public struct Request
```

Request represents an HTTP request received by a server or to be sent by a client.

#### Initializers

<a id="Request.init"></a>

```vertex
public init(method: string = "GET", url: string = "/", proto: string = "HTTP/1.1")
```

<a id="Request.init-2"></a>

```vertex
public init(method: string, url: string, version: HttpVersion)
```

#### Properties

<a id="Request.Method"></a>

```vertex
public var Method: string
```

<a id="Request.URL"></a>

```vertex
public var URL: string
```

<a id="Request.Version"></a>

```vertex
public var Version: HttpVersion = HttpVersion.http1_1
```

<a id="Request.Proto"></a>

```vertex
public var Proto: string = "HTTP/1.1"
```

<a id="Request.Headers"></a>

```vertex
public var Headers: Header = Header()
```

<a id="Request.Body"></a>

```vertex
public var Body: [uint8] = []
```

#### Methods

<a id="Request.BodyText"></a>

```vertex
public func BodyText() -> string
```

<a id="Request.HeaderText"></a>

```vertex
public func HeaderText() -> string
```

HeaderText serializes the request line and headers in HTTP/1.1 format with trailing CRLF CRLF.

<a id="Request.Bytes"></a>

```vertex
public func Bytes() -> [uint8]
```

Bytes serializes the entire HTTP request (request line, headers, and body) to wire bytes.

<a id="Request.Write"></a>

```vertex
public func Write(to stream: tcp.TcpStream) async throws
```

Write writes the HTTP request line, headers, and body to a stream.

<a id="Request.FindHeaderEnd"></a>

```vertex
public static func FindHeaderEnd(_ raw: [uint8], from: int = 0) -> int
```

FindHeaderEnd finds the start index of \r\n\r\n in raw bytes, or -1 if not found.

<a id="Request.FindHeaderEnd-2"></a>

```vertex
public static func FindHeaderEnd(_ raw: [uint8], from: int, to: int) -> int
```

FindHeaderEnd finds the start index of \r\n\r\n in raw[from..<to], or -1 if not found.

<a id="Request.ParseHeaders"></a>

```vertex
public static func ParseHeaders(_ raw: [uint8], headerEnd: int) throws -> Request
```

ParseHeaders parses a Request's method, URL, proto, headers, and any initial body bytes up to headerEnd.

<a id="Request.ParseHeaders-2"></a>

```vertex
public static func ParseHeaders(_ raw: [uint8], from: int, headerEnd: int) throws -> Request
```

ParseHeaders parses the request line and headers that begin at
`from` and end at `headerEnd`, the start of the blank line, and is
the Request they describe. The bytes after the blank line are not
looked at: a server that reads into one buffer per connection
keeps the body, and the next request, where they are.

### struct Response <a id="struct-Response"></a>

```vertex
public struct Response
```

Response represents an HTTP response received by a client or sent by a server.

#### Initializers

<a id="Response.init"></a>

```vertex
public init(statusCode: int32 = 200, proto: string = "HTTP/1.1")
```

<a id="Response.init-2"></a>

```vertex
public init(statusCode: int32, version: HttpVersion)
```

#### Properties

<a id="Response.StatusCode"></a>

```vertex
public var StatusCode: int32 = 200
```

<a id="Response.Status"></a>

```vertex
public var Status: string = "200 OK"
```

<a id="Response.Version"></a>

```vertex
public var Version: HttpVersion = HttpVersion.http1_1
```

<a id="Response.Proto"></a>

```vertex
public var Proto: string = "HTTP/1.1"
```

<a id="Response.Headers"></a>

```vertex
public var Headers: Header = Header()
```

<a id="Response.Body"></a>

```vertex
public var Body: [uint8] = []
```

<a id="Response.Text"></a>

```vertex
public var Text: string { get }
```

Convenience getter decoding body bytes as UTF-8 string.

#### Methods

<a id="Response.BodyText"></a>

```vertex
public func BodyText() -> string
```

<a id="Response.SetBodyText"></a>

```vertex
public mutating func SetBodyText(_ text: string)
```

Sets the response body to the UTF-8 bytes of text.

<a id="Response.StatusLine"></a>

```vertex
public func StatusLine() -> string
```

StatusLine returns the HTTP status line including trailing CRLF.

<a id="Response.HeaderText"></a>

```vertex
public func HeaderText() -> string
```

HeaderText serializes the status line and headers in HTTP/1.1 format with trailing CRLF CRLF.

<a id="Response.Bytes"></a>

```vertex
public func Bytes() -> [uint8]
```

Bytes serializes the entire HTTP response (status line, headers, and body) to wire bytes.

<a id="Response.Write"></a>

```vertex
public func Write(to stream: tcp.TcpStream) async throws
```

Write writes the status line, headers, and body to a stream.

<a id="Response.FindHeaderEnd"></a>

```vertex
public static func FindHeaderEnd(_ raw: [uint8], from: int = 0) -> int
```

FindHeaderEnd finds the start index of \r\n\r\n in raw bytes, or -1 if not found.

<a id="Response.ParseHeaders"></a>

```vertex
public static func ParseHeaders(_ raw: [uint8], headerEnd: int) throws -> Response
```

ParseHeaders parses a Response's status line, headers, and any initial body bytes up to headerEnd.

### struct ResponseStream <a id="struct-ResponseStream"></a>

```vertex
public struct ResponseStream: io.AsyncReader
```

ResponseStream is a response whose body is read as it arrives, for a
body too big to hold: a model's weights, a dataset shard. Response
holds the status and headers (its Body is empty); Read gives the
body, with its framing -- Content-Length, chunked, or to the close --
taken off. HTTP/1.1, one request per connection.

#### Properties

<a id="ResponseStream.Response"></a>

```vertex
public var Response: Response
```

<a id="ResponseStream.ContentLength"></a>

```vertex
public var ContentLength: int64? { get }
```

The body's length from Content-Length, when the response gave one.

#### Methods

<a id="ResponseStream.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) async throws -> int
```

Reads the next bytes of the body into the start of buffer; 0 at
its end. A body cut short -- the connection closed before the
length or the last chunk -- throws `HttpError.connectionClosed`.

<a id="ResponseStream.Close"></a>

```vertex
public mutating func Close()
```

Closes the connection. Reading after it returns 0.

### struct ResponseWriter <a id="struct-ResponseWriter"></a>

```vertex
public struct ResponseWriter
```

ResponseWriter provides an interface for constructing and sending an HTTP response.

#### Initializers

<a id="ResponseWriter.init"></a>

```vertex
public init()
```

#### Properties

<a id="ResponseWriter.StatusCode"></a>

```vertex
public var StatusCode: int32 = 200
```

<a id="ResponseWriter.Headers"></a>

```vertex
public var Headers: Header = Header()
```

<a id="ResponseWriter.Body"></a>

```vertex
public var Body: [uint8] = []
```

#### Methods

<a id="ResponseWriter.SetStatus"></a>

```vertex
public mutating func SetStatus(_ code: int32)
```

<a id="ResponseWriter.SetHeader"></a>

```vertex
public mutating func SetHeader(_ key: string, _ value: string)
```

<a id="ResponseWriter.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="ResponseWriter.WriteText"></a>

```vertex
public mutating func WriteText(_ s: string)
```

### struct Server <a id="struct-Server"></a>

```vertex
public struct Server
```

Server provides multi-protocol HTTP serving over TCP and UDP.

#### Initializers

<a id="Server.init"></a>

```vertex
public init(config: ServerConfig = ServerConfig(), handler: @escaping (Request) async throws -> ResponseWriter)
```

#### Properties

<a id="Server.Config"></a>

```vertex
public var Config: ServerConfig
```

<a id="Server.Handler"></a>

```vertex
public var Handler: (Request) async throws -> ResponseWriter
```

#### Methods

<a id="Server.Listen"></a>

```vertex
public func Listen(on address: string) async throws
```

Listens on the specified address and serves requests.

<a id="Server.ListenTLS"></a>

```vertex
public func ListenTLS(on address: string, cert: string, key: string) async throws
```

Listens on the specified address with TLS termination.

### struct ServerConfig <a id="struct-ServerConfig"></a>

```vertex
public struct ServerConfig
```

ServerConfig defines protocol configuration and TLS termination settings.

#### Initializers

<a id="ServerConfig.init"></a>

```vertex
public init(certFile: string = "",
            keyFile: string = "",
            altSvcEnabled: bool = true,
            readTimeoutMs: int32 = 15000,
            writeTimeoutMs: int32 = 15000)
```

<a id="ServerConfig.init-2"></a>

```vertex
public init(protocols: [HttpVersion],
            certFile: string = "",
            keyFile: string = "",
            altSvcEnabled: bool = true,
            readTimeoutMs: int32 = 15000,
            writeTimeoutMs: int32 = 15000)
```

#### Properties

<a id="ServerConfig.Protocols"></a>

```vertex
public var Protocols: [HttpVersion]
```

<a id="ServerConfig.CertFile"></a>

```vertex
public var CertFile: string
```

<a id="ServerConfig.KeyFile"></a>

```vertex
public var KeyFile: string
```

<a id="ServerConfig.AltSvcEnabled"></a>

```vertex
public var AltSvcEnabled: bool
```

<a id="ServerConfig.ReadTimeoutMs"></a>

```vertex
public var ReadTimeoutMs: int32
```

<a id="ServerConfig.WriteTimeoutMs"></a>

```vertex
public var WriteTimeoutMs: int32
```

### struct Status <a id="struct-Status"></a>

```vertex
public struct Status
```

#### Properties

<a id="Status.OK"></a>

```vertex
public static let OK: int32 = 200
```

<a id="Status.Created"></a>

```vertex
public static let Created: int32 = 201
```

<a id="Status.Accepted"></a>

```vertex
public static let Accepted: int32 = 202
```

<a id="Status.NoContent"></a>

```vertex
public static let NoContent: int32 = 204
```

<a id="Status.MovedPermanently"></a>

```vertex
public static let MovedPermanently: int32 = 301
```

<a id="Status.Found"></a>

```vertex
public static let Found: int32 = 302
```

<a id="Status.SeeOther"></a>

```vertex
public static let SeeOther: int32 = 303
```

<a id="Status.NotModified"></a>

```vertex
public static let NotModified: int32 = 304
```

<a id="Status.BadRequest"></a>

```vertex
public static let BadRequest: int32 = 400
```

<a id="Status.Unauthorized"></a>

```vertex
public static let Unauthorized: int32 = 401
```

<a id="Status.Forbidden"></a>

```vertex
public static let Forbidden: int32 = 403
```

<a id="Status.NotFound"></a>

```vertex
public static let NotFound: int32 = 404
```

<a id="Status.MethodNotAllowed"></a>

```vertex
public static let MethodNotAllowed: int32 = 405
```

<a id="Status.InternalServerError"></a>

```vertex
public static let InternalServerError: int32 = 500
```

<a id="Status.BadGateway"></a>

```vertex
public static let BadGateway: int32 = 502
```

<a id="Status.ServiceUnavailable"></a>

```vertex
public static let ServiceUnavailable: int32 = 503
```

## Files

- altsvc.vs
- client.vs
- coding.vs
- h2_frame.vs
- h2_session.vs
- h3_frame.vs
- h3_session.vs
- headers.vs
- hpack.vs
- huffman_table.vs
- qpack.vs
- request.vs
- response.vs
- server.vs
- status.vs
- stream.vs
- types.vs
