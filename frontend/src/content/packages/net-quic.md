# package quic

```vertex
import "net/quic"
```

## Index

- [Constants](#constants)
- [`func ApplyHeaderProtection(packet: inout [uint8], pnOffset: int, pnLen: int, hpKey: [uint8]) throws`](#func-ApplyHeaderProtection)
- [`func BuildLongHeader(packetType: uint8, version: uint32, dcid: [uint8], scid: [uint8], token: [uint8] = [], packetNumber: uint64, pnLength: int, payloadLength: int) -> [uint8]`](#func-BuildLongHeader)
- [`func BuildShortHeader(dcid: [uint8], spin: bool = false, keyPhase: bool = false, packetNumber: uint64, pnLength: int) -> [uint8]`](#func-BuildShortHeader)
- [`func ComputeNonce(iv: [uint8], pn: uint64) -> [uint8]`](#func-ComputeNonce)
- [`func Connect(_ address: string) async throws -> QuicConnection`](#func-Connect)
- [`func Connect(_ address: string, config: QuicConfig) async throws -> QuicConnection`](#func-Connect-2)
- [`func Connect(host: string, port: uint16) async throws -> QuicConnection`](#func-Connect-3)
- [`func Connect(host: string, port: uint16, config: QuicConfig) async throws -> QuicConnection`](#func-Connect-4)
- [`func Connect(to address: udp.SocketAddress) async throws -> QuicConnection`](#func-Connect-5)
- [`func Connect(to address: udp.SocketAddress, config: QuicConfig) async throws -> QuicConnection`](#func-Connect-6)
- [`func CreateConnection(to remoteAddress: string, isClient: bool = true) throws -> QuicConnection`](#func-CreateConnection)
- [`func CreateLoopbackPair() throws -> (client: QuicConnection, server: QuicConnection)`](#func-CreateLoopbackPair)
- [`func DecodePacketNumber(largestPn: uint64, truncatedPn: uint64, pnLen: int) -> uint64`](#func-DecodePacketNumber)
- [`func DecodeTransportParameters(_ data: [uint8]) throws -> TransportParameters`](#func-DecodeTransportParameters)
- [`func DecodeVarint(_ data: [uint8], offset: int = 0) throws -> DecodedVarint`](#func-DecodeVarint)
- [`func EncodeFrame(_ frame: QuicFrame) -> [uint8]`](#func-EncodeFrame)
- [`func EncodeFrames(_ frames: [QuicFrame]) -> [uint8]`](#func-EncodeFrames)
- [`func EncodePacketNumber(pn: uint64, len: int) -> [uint8]`](#func-EncodePacketNumber)
- [`func EncodeTransportParameters(_ params: TransportParameters) -> [uint8]`](#func-EncodeTransportParameters)
- [`func EncodeVarint(_ val: uint64) -> [uint8]`](#func-EncodeVarint)
- [`func GenerateHeaderMask(hpKey: [uint8], sample: [uint8]) throws -> [uint8]`](#func-GenerateHeaderMask)
- [`func HkdfExpandLabel(secret: [uint8], label: string, context: [uint8] = [], length: int) -> [uint8]`](#func-HkdfExpandLabel)
- [`func Listen(_ address: string) async throws -> QuicListener`](#func-Listen)
- [`func Listen(_ address: string, config: QuicConfig) async throws -> QuicListener`](#func-Listen-2)
- [`func Listen(port: uint16) async throws -> QuicListener`](#func-Listen-3)
- [`func Listen(port: uint16, config: QuicConfig) async throws -> QuicListener`](#func-Listen-4)
- [`func Listen(on address: udp.SocketAddress) async throws -> QuicListener`](#func-Listen-5)
- [`func Listen(on address: udp.SocketAddress, config: QuicConfig) async throws -> QuicListener`](#func-Listen-6)
- [`func OpenPacket(packet: [uint8], pnOffset: int, keys: QuicCipherKeys, largestAcked: uint64) throws -> DecryptedPacket`](#func-OpenPacket)
- [`func PacketNumberLength(pn: uint64, largestAcked: uint64) -> int`](#func-PacketNumberLength)
- [`func ParseFrames(_ data: [uint8]) throws -> [QuicFrame]`](#func-ParseFrames)
- [`func ParseLongHeader(_ data: [uint8]) throws -> LongHeader`](#func-ParseLongHeader)
- [`func RemoveHeaderProtection(packet: inout [uint8], pnOffset: int, hpKey: [uint8], largestAcked: uint64) throws -> UnprotectedHeader`](#func-RemoveHeaderProtection)
- [`func SealPacket(header: [uint8], payload: [uint8], pn: uint64, pnOffset: int, pnLen: int, keys: QuicCipherKeys) throws -> [uint8]`](#func-SealPacket)
- [`func VarintLen(_ val: uint64) -> int`](#func-VarintLen)
- [`struct AckFrameData`](#struct-AckFrameData)
  - [`init(largestAcked: uint64, ackDelay: uint64, firstRange: uint64, ranges: [AckRange] = [])`](#AckFrameData.init)
  - [`var LargestAcked: uint64`](#AckFrameData.LargestAcked)
  - [`var AckDelay: uint64`](#AckFrameData.AckDelay)
  - [`var FirstRange: uint64`](#AckFrameData.FirstRange)
  - [`var Ranges: [AckRange]`](#AckFrameData.Ranges)
- [`struct AckRange`](#struct-AckRange)
  - [`init(gap: uint64, rangeLength: uint64)`](#AckRange.init)
  - [`var Gap: uint64`](#AckRange.Gap)
  - [`var RangeLength: uint64`](#AckRange.RangeLength)
- [`struct ConnectionCloseData`](#struct-ConnectionCloseData)
  - [`init(isApp: bool, errorCode: uint64, frameType: uint64 = 0)`](#ConnectionCloseData.init)
  - [`var IsApp: bool`](#ConnectionCloseData.IsApp)
  - [`var ErrorCode: uint64`](#ConnectionCloseData.ErrorCode)
  - [`var FrameType: uint64`](#ConnectionCloseData.FrameType)
- [`struct DecodedVarint`](#struct-DecodedVarint)
  - [`init(value: uint64, bytesRead: int)`](#DecodedVarint.init)
  - [`var Value: uint64`](#DecodedVarint.Value)
  - [`var BytesRead: int`](#DecodedVarint.BytesRead)
- [`struct DecryptedPacket`](#struct-DecryptedPacket)
  - [`init(packetNumber: uint64, frames: [QuicFrame])`](#DecryptedPacket.init)
  - [`var PacketNumber: uint64`](#DecryptedPacket.PacketNumber)
  - [`var Frames: [QuicFrame]`](#DecryptedPacket.Frames)
- [`struct LongHeader`](#struct-LongHeader)
  - [`init(packetType: uint8, version: uint32 = 1, dcid: [uint8], scid: [uint8], token: [uint8] = [], packetNumber: uint64 = 0, pnLength: int = 4, payloadLength: int = 0, headerBytes: [uint8] = [])`](#LongHeader.init)
  - [`var PacketType: uint8`](#LongHeader.PacketType)
  - [`var Version: uint32`](#LongHeader.Version)
  - [`var Dcid: [uint8]`](#LongHeader.Dcid)
  - [`var Scid: [uint8]`](#LongHeader.Scid)
  - [`var Token: [uint8]`](#LongHeader.Token)
  - [`var PacketNumber: uint64`](#LongHeader.PacketNumber)
  - [`var PnLength: int`](#LongHeader.PnLength)
  - [`var PayloadLength: int`](#LongHeader.PayloadLength)
  - [`var HeaderBytes: [uint8]`](#LongHeader.HeaderBytes)
- [`struct LossDetector`](#struct-LossDetector)
  - [`init()`](#LossDetector.init)
  - [`var InFlight: [SentPacket]`](#LossDetector.InFlight)
  - [`var LargestAckedPn: uint64`](#LossDetector.LargestAckedPn)
  - [`var LostPackets: [SentPacket]`](#LossDetector.LostPackets)
  - [`static let PacketThreshold: uint64 = 3`](#LossDetector.PacketThreshold)
  - [`static let TimeThresholdNumerator: int64 = 9`](#LossDetector.TimeThresholdNumerator)
  - [`static let TimeThresholdDenominator: int64 = 8`](#LossDetector.TimeThresholdDenominator)
  - [`mutating func OnPacketSent(_ packet: SentPacket)`](#LossDetector.OnPacketSent)
  - [`mutating func OnAckReceived(largestAcked: uint64, nowMs: int64, rtt: RttEstimator) -> [SentPacket]`](#LossDetector.OnAckReceived)
- [`struct NewConnectionIdData`](#struct-NewConnectionIdData)
  - [`init(sequence: uint64, retirePriorTo: uint64, cid: [uint8], token: [uint8])`](#NewConnectionIdData.init)
  - [`var Sequence: uint64`](#NewConnectionIdData.Sequence)
  - [`var RetirePriorTo: uint64`](#NewConnectionIdData.RetirePriorTo)
  - [`var Cid: [uint8]`](#NewConnectionIdData.Cid)
  - [`var StatelessResetToken: [uint8]`](#NewConnectionIdData.StatelessResetToken)
- [`struct NewRenoCongestionController`](#struct-NewRenoCongestionController)
  - [`init(maxDatagramSize: int = 1200)`](#NewRenoCongestionController.init)
  - [`var CongestionWindow: int`](#NewRenoCongestionController.CongestionWindow)
  - [`var SlowStartThreshold: int`](#NewRenoCongestionController.SlowStartThreshold)
  - [`var MaxDatagramSize: int`](#NewRenoCongestionController.MaxDatagramSize)
  - [`var BytesInFlight: int`](#NewRenoCongestionController.BytesInFlight)
  - [`mutating func OnPacketSent(bytes: int)`](#NewRenoCongestionController.OnPacketSent)
  - [`mutating func OnPacketAcked(bytes: int)`](#NewRenoCongestionController.OnPacketAcked)
  - [`mutating func OnPacketLost(bytes: int)`](#NewRenoCongestionController.OnPacketLost)
  - [`func CanSend() -> bool`](#NewRenoCongestionController.CanSend)
- [`struct PacketNumberSpace`](#struct-PacketNumberSpace)
  - [`static let Initial: int = 0`](#PacketNumberSpace.Initial)
  - [`static let Handshake: int = 1`](#PacketNumberSpace.Handshake)
  - [`static let ApplicationData: int = 2`](#PacketNumberSpace.ApplicationData)
- [`struct QuicCipherKeys`](#struct-QuicCipherKeys)
  - [`init(key: [uint8], iv: [uint8], hpKey: [uint8])`](#QuicCipherKeys.init)
  - [`var Key: [uint8]`](#QuicCipherKeys.Key)
  - [`var Iv: [uint8]`](#QuicCipherKeys.Iv)
  - [`var HpKey: [uint8]`](#QuicCipherKeys.HpKey)
  - [`static func Derive(secret: [uint8]) -> QuicCipherKeys`](#QuicCipherKeys.Derive)
- [`struct QuicConfig`](#struct-QuicConfig)
  - [`init()`](#QuicConfig.init)
  - [`var MaxIdleTimeoutMs: uint64`](#QuicConfig.MaxIdleTimeoutMs)
  - [`var InitialMaxData: uint64`](#QuicConfig.InitialMaxData)
  - [`var InitialMaxStreamDataBidiLocal: uint64`](#QuicConfig.InitialMaxStreamDataBidiLocal)
  - [`var InitialMaxStreamDataBidiRemote: uint64`](#QuicConfig.InitialMaxStreamDataBidiRemote)
  - [`var InitialMaxStreamDataUni: uint64`](#QuicConfig.InitialMaxStreamDataUni)
  - [`var MaxConcurrentBidiStreams: uint64`](#QuicConfig.MaxConcurrentBidiStreams)
  - [`var MaxConcurrentUniStreams: uint64`](#QuicConfig.MaxConcurrentUniStreams)
  - [`var EnableDatagrams: bool`](#QuicConfig.EnableDatagrams)
  - [`var MaxDatagramPayloadSize: uint64`](#QuicConfig.MaxDatagramPayloadSize)
- [`struct QuicConnection`](#struct-QuicConnection)
  - [`init(socket: udp.UdpSocket, remoteAddress: udp.SocketAddress, localCid: [uint8], remoteCid: [uint8], isClient: bool, config: QuicConfig = QuicConfig())`](#QuicConnection.init)
  - [`var IsClient: bool`](#QuicConnection.IsClient)
  - [`var Socket: udp.UdpSocket`](#QuicConnection.Socket)
  - [`var RemoteAddress: udp.SocketAddress`](#QuicConnection.RemoteAddress)
  - [`var LocalCid: [uint8]`](#QuicConnection.LocalCid)
  - [`var RemoteCid: [uint8]`](#QuicConnection.RemoteCid)
  - [`var Version: uint32`](#QuicConnection.Version)
  - [`var Config: QuicConfig`](#QuicConnection.Config)
  - [`var IsConnected: bool`](#QuicConnection.IsConnected)
  - [`var IsClosed: bool`](#QuicConnection.IsClosed)
  - [`var NextInitialPn: uint64`](#QuicConnection.NextInitialPn)
  - [`var NextHandshakePn: uint64`](#QuicConnection.NextHandshakePn)
  - [`var NextAppPn: uint64`](#QuicConnection.NextAppPn)
  - [`var LargestAckedPn: uint64`](#QuicConnection.LargestAckedPn)
  - [`var NextBidiStreamId: uint64`](#QuicConnection.NextBidiStreamId)
  - [`var NextUniStreamId: uint64`](#QuicConnection.NextUniStreamId)
  - [`var Streams: [QuicStream]`](#QuicConnection.Streams)
  - [`var InboundDatagrams: [[uint8]]`](#QuicConnection.InboundDatagrams)
  - [`var ClientKeys: QuicCipherKeys`](#QuicConnection.ClientKeys)
  - [`var ServerKeys: QuicCipherKeys`](#QuicConnection.ServerKeys)
  - [`var AppKeys: QuicCipherKeys`](#QuicConnection.AppKeys)
  - [`var Rtt: RttEstimator`](#QuicConnection.Rtt)
  - [`var Loss: LossDetector`](#QuicConnection.Loss)
  - [`var Congestion: NewRenoCongestionController`](#QuicConnection.Congestion)
  - [`var MaxDataRemote: uint64`](#QuicConnection.MaxDataRemote)
  - [`var SentDataBytes: uint64`](#QuicConnection.SentDataBytes)
  - [`var RecvDataBytes: uint64`](#QuicConnection.RecvDataBytes)
  - [`var Port: uint16 { get }`](#QuicConnection.Port)
  - [`var Address: string { get }`](#QuicConnection.Address)
  - [`mutating func OpenStream() async throws -> QuicStream`](#QuicConnection.OpenStream)
  - [`mutating func OpenUniStream() async throws -> QuicStream`](#QuicConnection.OpenUniStream)
  - [`mutating func AcceptStream() async throws -> QuicStream`](#QuicConnection.AcceptStream)
  - [`mutating func SendDatagram(_ data: [uint8]) async throws`](#QuicConnection.SendDatagram)
  - [`mutating func ReceiveDatagram() async throws -> [uint8]`](#QuicConnection.ReceiveDatagram)
  - [`mutating func SendPacket(frames: [QuicFrame], packetType: uint8) async throws`](#QuicConnection.SendPacket)
  - [`mutating func ProcessInboundDatagram(_ raw: [uint8]) throws -> [QuicFrame]`](#QuicConnection.ProcessInboundDatagram)
  - [`mutating func ReceivePacket() async throws -> [QuicFrame]`](#QuicConnection.ReceivePacket)
  - [`mutating func Close(errorCode: uint64 = 0) async throws`](#QuicConnection.Close)
- [`enum QuicError: Error`](#enum-QuicError)
- [`enum QuicFrame`](#enum-QuicFrame)
- [`struct QuicListener`](#struct-QuicListener)
  - [`init(socket: udp.UdpSocket)`](#QuicListener.init)
  - [`init(socket: udp.UdpSocket, config: QuicConfig)`](#QuicListener.init-2)
  - [`var Socket: udp.UdpSocket`](#QuicListener.Socket)
  - [`var LocalAddress: udp.SocketAddress`](#QuicListener.LocalAddress)
  - [`var Config: QuicConfig`](#QuicListener.Config)
  - [`var IsClosed: bool`](#QuicListener.IsClosed)
  - [`var Port: uint16 { get }`](#QuicListener.Port)
  - [`var Address: string { get }`](#QuicListener.Address)
  - [`mutating func Accept() async throws -> QuicConnection`](#QuicListener.Accept)
  - [`mutating func Close()`](#QuicListener.Close)
- [`struct QuicPacketType`](#struct-QuicPacketType)
  - [`static let Initial: uint8 = 0x00`](#QuicPacketType.Initial)
  - [`static let ZeroRtt: uint8 = 0x01`](#QuicPacketType.ZeroRtt)
  - [`static let Handshake: uint8 = 0x02`](#QuicPacketType.Handshake)
  - [`static let Retry: uint8 = 0x03`](#QuicPacketType.Retry)
  - [`static let OneRtt: uint8 = 0x04`](#QuicPacketType.OneRtt)
- [`struct QuicSalt`](#struct-QuicSalt)
  - [`static let V1: [uint8]`](#QuicSalt.V1)
- [`struct QuicStream`](#struct-QuicStream)
  - [`init(streamId: uint64, initialMaxSendData: uint64 = 262144, initialMaxRecvData: uint64 = 262144)`](#QuicStream.init)
  - [`var StreamId: uint64`](#QuicStream.StreamId)
  - [`var IsClientInitiated: bool`](#QuicStream.IsClientInitiated)
  - [`var IsBidirectional: bool`](#QuicStream.IsBidirectional)
  - [`var SendOffset: uint64`](#QuicStream.SendOffset)
  - [`var RecvOffset: uint64`](#QuicStream.RecvOffset)
  - [`var MaxSendData: uint64`](#QuicStream.MaxSendData)
  - [`var MaxRecvData: uint64`](#QuicStream.MaxRecvData)
  - [`var SendFin: bool`](#QuicStream.SendFin)
  - [`var RecvFin: bool`](#QuicStream.RecvFin)
  - [`var IsClosed: bool`](#QuicStream.IsClosed)
  - [`var RecvBuffer: [uint8]`](#QuicStream.RecvBuffer)
  - [`var OutboundFrames: [StreamFrameData]`](#QuicStream.OutboundFrames)
  - [`mutating func Write(_ data: [uint8]) async throws`](#QuicStream.Write)
  - [`mutating func WriteAndClose(_ data: [uint8]) async throws`](#QuicStream.WriteAndClose)
  - [`mutating func Read(maxBytes: int = 4096) async throws -> [uint8]`](#QuicStream.Read)
  - [`mutating func ReceiveStreamData(offset: uint64, fin: bool, data: [uint8])`](#QuicStream.ReceiveStreamData)
  - [`mutating func DrainOutboundFrames() -> [QuicFrame]`](#QuicStream.DrainOutboundFrames)
  - [`mutating func Close()`](#QuicStream.Close)
- [`struct QuicStreamType`](#struct-QuicStreamType)
  - [`static let ClientBidi: uint8 = 0x00`](#QuicStreamType.ClientBidi)
  - [`static let ServerBidi: uint8 = 0x01`](#QuicStreamType.ServerBidi)
  - [`static let ClientUni: uint8 = 0x02`](#QuicStreamType.ClientUni)
  - [`static let ServerUni: uint8 = 0x03`](#QuicStreamType.ServerUni)
- [`struct QuicVersion`](#struct-QuicVersion)
  - [`static let V1: uint32 = 0x00000001`](#QuicVersion.V1)
  - [`static let V2: uint32 = 0x6b3343cf`](#QuicVersion.V2)
  - [`static let Draft29: uint32 = 0xff00001d`](#QuicVersion.Draft29)
- [`struct ResetStreamData`](#struct-ResetStreamData)
  - [`init(streamId: uint64, errorCode: uint64, finalSize: uint64)`](#ResetStreamData.init)
  - [`var StreamId: uint64`](#ResetStreamData.StreamId)
  - [`var ErrorCode: uint64`](#ResetStreamData.ErrorCode)
  - [`var FinalSize: uint64`](#ResetStreamData.FinalSize)
- [`struct RttEstimator`](#struct-RttEstimator)
  - [`init(initialRttMs: int64 = 100)`](#RttEstimator.init)
  - [`var LatestRttMs: int64`](#RttEstimator.LatestRttMs)
  - [`var SmoothedRttMs: int64`](#RttEstimator.SmoothedRttMs)
  - [`var RttVarMs: int64`](#RttEstimator.RttVarMs)
  - [`var MinRttMs: int64`](#RttEstimator.MinRttMs)
  - [`var FirstSample: bool`](#RttEstimator.FirstSample)
  - [`mutating func UpdateRtt(latestSampleMs: int64, ackDelayMs: int64 = 0)`](#RttEstimator.UpdateRtt)
  - [`func ComputePto(maxAckDelayMs: int64 = 25) -> int64`](#RttEstimator.ComputePto)
- [`struct SentPacket`](#struct-SentPacket)
  - [`init(packetNumber: uint64, sentTimeMs: int64, bytesSent: int, ackEliciting: bool)`](#SentPacket.init)
  - [`var PacketNumber: uint64`](#SentPacket.PacketNumber)
  - [`var SentTimeMs: int64`](#SentPacket.SentTimeMs)
  - [`var BytesSent: int`](#SentPacket.BytesSent)
  - [`var AckEliciting: bool`](#SentPacket.AckEliciting)
- [`struct ShortHeader`](#struct-ShortHeader)
  - [`init(spin: bool = false, keyPhase: bool = false, dcid: [uint8], packetNumber: uint64 = 0, pnLength: int = 4, headerBytes: [uint8] = [])`](#ShortHeader.init)
  - [`var Spin: bool`](#ShortHeader.Spin)
  - [`var KeyPhase: bool`](#ShortHeader.KeyPhase)
  - [`var Dcid: [uint8]`](#ShortHeader.Dcid)
  - [`var PacketNumber: uint64`](#ShortHeader.PacketNumber)
  - [`var PnLength: int`](#ShortHeader.PnLength)
  - [`var HeaderBytes: [uint8]`](#ShortHeader.HeaderBytes)
- [`struct StreamFrameData`](#struct-StreamFrameData)
  - [`init(streamId: uint64, offset: uint64 = 0, fin: bool = false, data: [uint8] = [])`](#StreamFrameData.init)
  - [`var StreamId: uint64`](#StreamFrameData.StreamId)
  - [`var Offset: uint64`](#StreamFrameData.Offset)
  - [`var Fin: bool`](#StreamFrameData.Fin)
  - [`var Data: [uint8]`](#StreamFrameData.Data)
- [`struct TransportErrorCode`](#struct-TransportErrorCode)
  - [`static let NoError: uint64 = 0x00`](#TransportErrorCode.NoError)
  - [`static let InternalError: uint64 = 0x01`](#TransportErrorCode.InternalError)
  - [`static let ConnectionRefused: uint64 = 0x02`](#TransportErrorCode.ConnectionRefused)
  - [`static let FlowControlError: uint64 = 0x03`](#TransportErrorCode.FlowControlError)
  - [`static let StreamLimitError: uint64 = 0x04`](#TransportErrorCode.StreamLimitError)
  - [`static let StreamStateError: uint64 = 0x05`](#TransportErrorCode.StreamStateError)
  - [`static let FinalSizeError: uint64 = 0x06`](#TransportErrorCode.FinalSizeError)
  - [`static let FrameEncodingError: uint64 = 0x07`](#TransportErrorCode.FrameEncodingError)
  - [`static let TransportParameterError: uint64 = 0x08`](#TransportErrorCode.TransportParameterError)
  - [`static let ConnectionIdLimitError: uint64 = 0x09`](#TransportErrorCode.ConnectionIdLimitError)
  - [`static let ProtocolViolation: uint64 = 0x0a`](#TransportErrorCode.ProtocolViolation)
  - [`static let InvalidToken: uint64 = 0x0b`](#TransportErrorCode.InvalidToken)
  - [`static let ApplicationError: uint64 = 0x0c`](#TransportErrorCode.ApplicationError)
  - [`static let CryptoBufferExceeded: uint64 = 0x0d`](#TransportErrorCode.CryptoBufferExceeded)
  - [`static let KeyUpdateError: uint64 = 0x0e`](#TransportErrorCode.KeyUpdateError)
  - [`static let AeadLimitReached: uint64 = 0x0f`](#TransportErrorCode.AeadLimitReached)
  - [`static let NoViablePath: uint64 = 0x10`](#TransportErrorCode.NoViablePath)
- [`struct TransportParameters`](#struct-TransportParameters)
  - [`init()`](#TransportParameters.init)
  - [`var OriginalDestinationConnectionId: [uint8]`](#TransportParameters.OriginalDestinationConnectionId)
  - [`var InitialSourceConnectionId: [uint8]`](#TransportParameters.InitialSourceConnectionId)
  - [`var MaxIdleTimeoutMs: uint64`](#TransportParameters.MaxIdleTimeoutMs)
  - [`var StatelessResetToken: [uint8]`](#TransportParameters.StatelessResetToken)
  - [`var MaxUdpPayloadSize: uint64`](#TransportParameters.MaxUdpPayloadSize)
  - [`var InitialMaxData: uint64`](#TransportParameters.InitialMaxData)
  - [`var InitialMaxStreamDataBidiLocal: uint64`](#TransportParameters.InitialMaxStreamDataBidiLocal)
  - [`var InitialMaxStreamDataBidiRemote: uint64`](#TransportParameters.InitialMaxStreamDataBidiRemote)
  - [`var InitialMaxStreamDataUni: uint64`](#TransportParameters.InitialMaxStreamDataUni)
  - [`var InitialMaxStreamsBidi: uint64`](#TransportParameters.InitialMaxStreamsBidi)
  - [`var InitialMaxStreamsUni: uint64`](#TransportParameters.InitialMaxStreamsUni)
  - [`var AckDelayExponent: uint64`](#TransportParameters.AckDelayExponent)
  - [`var MaxAckDelayMs: uint64`](#TransportParameters.MaxAckDelayMs)
  - [`var DisableActiveMigration: bool`](#TransportParameters.DisableActiveMigration)
  - [`var ActiveConnectionIdLimit: uint64`](#TransportParameters.ActiveConnectionIdLimit)
  - [`var MaxDatagramFrameSize: uint64`](#TransportParameters.MaxDatagramFrameSize)
- [`struct UnprotectedHeader`](#struct-UnprotectedHeader)
  - [`init(packetNumber: uint64, pnLength: int)`](#UnprotectedHeader.init)
  - [`var PacketNumber: uint64`](#UnprotectedHeader.PacketNumber)
  - [`var PnLength: int`](#UnprotectedHeader.PnLength)

## Constants

<a id="let-MaxVarint"></a>

```vertex
public let MaxVarint: uint64 = 4611686018427387903
```

## Functions

### func ApplyHeaderProtection <a id="func-ApplyHeaderProtection"></a>

```vertex
public func ApplyHeaderProtection(packet: inout [uint8], pnOffset: int, pnLen: int, hpKey: [uint8]) throws
```

Applies RFC 9001 header protection in place to a serialized packet buffer.

### func BuildLongHeader <a id="func-BuildLongHeader"></a>

```vertex
public func BuildLongHeader(packetType: uint8,
                            version: uint32,
                            dcid: [uint8],
                            scid: [uint8],
                            token: [uint8] = [],
                            packetNumber: uint64,
                            pnLength: int,
                            payloadLength: int) -> [uint8]
```

Serializes an unprotected Long Header packet (prior to AEAD and Header Protection).

### func BuildShortHeader <a id="func-BuildShortHeader"></a>

```vertex
public func BuildShortHeader(dcid: [uint8],
                             spin: bool = false,
                             keyPhase: bool = false,
                             packetNumber: uint64,
                             pnLength: int) -> [uint8]
```

Serializes an unprotected Short Header (1-RTT) packet.

### func ComputeNonce <a id="func-ComputeNonce"></a>

```vertex
public func ComputeNonce(iv: [uint8], pn: uint64) -> [uint8]
```

Computes the 12-byte AEAD Nonce by XORing the IV with the packet number.

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ address: string) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified remote address string ("host:port").

### func Connect <a id="func-Connect-2"></a>

```vertex
public func Connect(_ address: string, config: QuicConfig) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified remote address string and configuration.

### func Connect <a id="func-Connect-3"></a>

```vertex
public func Connect(host: string, port: uint16) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified host and port.

### func Connect <a id="func-Connect-4"></a>

```vertex
public func Connect(host: string, port: uint16, config: QuicConfig) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified host, port, and configuration.

### func Connect <a id="func-Connect-5"></a>

```vertex
public func Connect(to address: udp.SocketAddress) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified remote SocketAddress.

### func Connect <a id="func-Connect-6"></a>

```vertex
public func Connect(to address: udp.SocketAddress, config: QuicConfig) async throws -> QuicConnection
```

Establishes an outbound QUIC connection to the specified remote SocketAddress and configuration.

### func CreateConnection <a id="func-CreateConnection"></a>

```vertex
public func CreateConnection(to remoteAddress: string, isClient: bool = true) throws -> QuicConnection
```

Creates a new QuicConnection with an autonomously bound UDP socket and resolved string address.

### func CreateLoopbackPair <a id="func-CreateLoopbackPair"></a>

```vertex
public func CreateLoopbackPair() throws -> (client: QuicConnection, server: QuicConnection)
```

Creates a client and server connection pair bound to localhost on ephemeral ports.

### func DecodePacketNumber <a id="func-DecodePacketNumber"></a>

```vertex
public func DecodePacketNumber(largestPn: uint64, truncatedPn: uint64, pnLen: int) -> uint64
```

Decodes a truncated packet number using the largest acknowledged packet number.

### func DecodeTransportParameters <a id="func-DecodeTransportParameters"></a>

```vertex
public func DecodeTransportParameters(_ data: [uint8]) throws -> TransportParameters
```

Decodes transport parameters from a TLS extension buffer.

### func DecodeVarint <a id="func-DecodeVarint"></a>

```vertex
public func DecodeVarint(_ data: [uint8], offset: int = 0) throws -> DecodedVarint
```

Decodes an RFC 9000 variable-length integer from a byte buffer at the given offset.

### func EncodeFrame <a id="func-EncodeFrame"></a>

```vertex
public func EncodeFrame(_ frame: QuicFrame) -> [uint8]
```

Serializes a single QUIC frame into wire format bytes.

### func EncodeFrames <a id="func-EncodeFrames"></a>

```vertex
public func EncodeFrames(_ frames: [QuicFrame]) -> [uint8]
```

Serializes an array of QUIC frames into a single payload buffer.

### func EncodePacketNumber <a id="func-EncodePacketNumber"></a>

```vertex
public func EncodePacketNumber(pn: uint64, len: int) -> [uint8]
```

Encodes a packet number into 1, 2, 3, or 4 big-endian bytes.

### func EncodeTransportParameters <a id="func-EncodeTransportParameters"></a>

```vertex
public func EncodeTransportParameters(_ params: TransportParameters) -> [uint8]
```

Encodes transport parameters into a byte array suitable for TLS extension 0x39.

### func EncodeVarint <a id="func-EncodeVarint"></a>

```vertex
public func EncodeVarint(_ val: uint64) -> [uint8]
```

Encodes an integer into RFC 9000 variable-length format.

### func GenerateHeaderMask <a id="func-GenerateHeaderMask"></a>

```vertex
public func GenerateHeaderMask(hpKey: [uint8], sample: [uint8]) throws -> [uint8]
```

Generates a 5-byte header protection mask using ChaCha20 (RFC 9001 Section 5.4.3).

### func HkdfExpandLabel <a id="func-HkdfExpandLabel"></a>

```vertex
public func HkdfExpandLabel(secret: [uint8], label: string, context: [uint8] = [], length: int) -> [uint8]
```

RFC 8446 / RFC 9001 HKDF-Expand-Label.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ address: string) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified string address ("host:port" or ":port").

### func Listen <a id="func-Listen-2"></a>

```vertex
public func Listen(_ address: string, config: QuicConfig) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified string address and configuration.

### func Listen <a id="func-Listen-3"></a>

```vertex
public func Listen(port: uint16) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified port on all interfaces.

### func Listen <a id="func-Listen-4"></a>

```vertex
public func Listen(port: uint16, config: QuicConfig) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified port and configuration.

### func Listen <a id="func-Listen-5"></a>

```vertex
public func Listen(on address: udp.SocketAddress) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified local SocketAddress.

### func Listen <a id="func-Listen-6"></a>

```vertex
public func Listen(on address: udp.SocketAddress, config: QuicConfig) async throws -> QuicListener
```

Starts a QUIC listener bound to the specified local SocketAddress and configuration.

### func OpenPacket <a id="func-OpenPacket"></a>

```vertex
public func OpenPacket(packet: [uint8],
                       pnOffset: int,
                       keys: QuicCipherKeys,
                       largestAcked: uint64) throws -> DecryptedPacket
```

Unprotects and decrypts an inbound QUIC packet (removes header protection, decrypts AEAD payload).

### func PacketNumberLength <a id="func-PacketNumberLength"></a>

```vertex
public func PacketNumberLength(pn: uint64, largestAcked: uint64) -> int
```

Determines the minimal number of bytes needed to encode a packet number.

### func ParseFrames <a id="func-ParseFrames"></a>

```vertex
public func ParseFrames(_ data: [uint8]) throws -> [QuicFrame]
```

Parses an array of QUIC frames from a decrypted payload buffer.

### func ParseLongHeader <a id="func-ParseLongHeader"></a>

```vertex
public func ParseLongHeader(_ data: [uint8]) throws -> LongHeader
```

Parses an unencrypted Long Header from raw packet bytes.

### func RemoveHeaderProtection <a id="func-RemoveHeaderProtection"></a>

```vertex
public func RemoveHeaderProtection(packet: inout [uint8], pnOffset: int, hpKey: [uint8], largestAcked: uint64) throws -> UnprotectedHeader
```

Removes RFC 9001 header protection from an inbound packet buffer, returning the decoded packet number.

### func SealPacket <a id="func-SealPacket"></a>

```vertex
public func SealPacket(header: [uint8],
                       payload: [uint8],
                       pn: uint64,
                       pnOffset: int,
                       pnLen: int,
                       keys: QuicCipherKeys) throws -> [uint8]
```

Encrypts and protects a complete QUIC packet (AEAD payload + header protection).

### func VarintLen <a id="func-VarintLen"></a>

```vertex
public func VarintLen(_ val: uint64) -> int
```

Returns the number of bytes required to encode the given variable-length integer.

## Types

### struct AckFrameData <a id="struct-AckFrameData"></a>

```vertex
public struct AckFrameData
```

Payload for ACK frame (RFC 9000 Section 19.3).

#### Initializers

<a id="AckFrameData.init"></a>

```vertex
public init(largestAcked: uint64, ackDelay: uint64, firstRange: uint64, ranges: [AckRange] = [])
```

#### Properties

<a id="AckFrameData.LargestAcked"></a>

```vertex
public var LargestAcked: uint64
```

<a id="AckFrameData.AckDelay"></a>

```vertex
public var AckDelay: uint64
```

<a id="AckFrameData.FirstRange"></a>

```vertex
public var FirstRange: uint64
```

<a id="AckFrameData.Ranges"></a>

```vertex
public var Ranges: [AckRange]
```

### struct AckRange <a id="struct-AckRange"></a>

```vertex
public struct AckRange
```

ACK range gap and count pair.

#### Initializers

<a id="AckRange.init"></a>

```vertex
public init(gap: uint64, rangeLength: uint64)
```

#### Properties

<a id="AckRange.Gap"></a>

```vertex
public var Gap: uint64
```

<a id="AckRange.RangeLength"></a>

```vertex
public var RangeLength: uint64
```

### struct ConnectionCloseData <a id="struct-ConnectionCloseData"></a>

```vertex
public struct ConnectionCloseData
```

Payload for CONNECTION_CLOSE frame (RFC 9000 Section 19.19).

#### Initializers

<a id="ConnectionCloseData.init"></a>

```vertex
public init(isApp: bool, errorCode: uint64, frameType: uint64 = 0)
```

#### Properties

<a id="ConnectionCloseData.IsApp"></a>

```vertex
public var IsApp: bool
```

<a id="ConnectionCloseData.ErrorCode"></a>

```vertex
public var ErrorCode: uint64
```

<a id="ConnectionCloseData.FrameType"></a>

```vertex
public var FrameType: uint64
```

### struct DecodedVarint <a id="struct-DecodedVarint"></a>

```vertex
public struct DecodedVarint
```

Represents a successfully decoded variable-length integer and its byte size.

#### Initializers

<a id="DecodedVarint.init"></a>

```vertex
public init(value: uint64, bytesRead: int)
```

#### Properties

<a id="DecodedVarint.Value"></a>

```vertex
public var Value: uint64
```

<a id="DecodedVarint.BytesRead"></a>

```vertex
public var BytesRead: int
```

### struct DecryptedPacket <a id="struct-DecryptedPacket"></a>

```vertex
public struct DecryptedPacket
```

Decrypted packet result containing reconstructed packet number and parsed frames.

#### Initializers

<a id="DecryptedPacket.init"></a>

```vertex
public init(packetNumber: uint64, frames: [QuicFrame])
```

#### Properties

<a id="DecryptedPacket.PacketNumber"></a>

```vertex
public var PacketNumber: uint64
```

<a id="DecryptedPacket.Frames"></a>

```vertex
public var Frames: [QuicFrame]
```

### struct LongHeader <a id="struct-LongHeader"></a>

```vertex
public struct LongHeader
```

Parsed Long Header metadata.

#### Initializers

<a id="LongHeader.init"></a>

```vertex
public init(packetType: uint8,
            version: uint32 = 1,
            dcid: [uint8],
            scid: [uint8],
            token: [uint8] = [],
            packetNumber: uint64 = 0,
            pnLength: int = 4,
            payloadLength: int = 0,
            headerBytes: [uint8] = [])
```

#### Properties

<a id="LongHeader.PacketType"></a>

```vertex
public var PacketType: uint8
```

<a id="LongHeader.Version"></a>

```vertex
public var Version: uint32
```

<a id="LongHeader.Dcid"></a>

```vertex
public var Dcid: [uint8]
```

<a id="LongHeader.Scid"></a>

```vertex
public var Scid: [uint8]
```

<a id="LongHeader.Token"></a>

```vertex
public var Token: [uint8]
```

<a id="LongHeader.PacketNumber"></a>

```vertex
public var PacketNumber: uint64
```

<a id="LongHeader.PnLength"></a>

```vertex
public var PnLength: int
```

<a id="LongHeader.PayloadLength"></a>

```vertex
public var PayloadLength: int
```

<a id="LongHeader.HeaderBytes"></a>

```vertex
public var HeaderBytes: [uint8]
```

### struct LossDetector <a id="struct-LossDetector"></a>

```vertex
public struct LossDetector
```

Loss Detector according to RFC 9002 Section 6.

#### Initializers

<a id="LossDetector.init"></a>

```vertex
public init()
```

#### Properties

<a id="LossDetector.InFlight"></a>

```vertex
public var InFlight: [SentPacket]
```

<a id="LossDetector.LargestAckedPn"></a>

```vertex
public var LargestAckedPn: uint64
```

<a id="LossDetector.LostPackets"></a>

```vertex
public var LostPackets: [SentPacket]
```

<a id="LossDetector.PacketThreshold"></a>

```vertex
public static let PacketThreshold: uint64 = 3
```

<a id="LossDetector.TimeThresholdNumerator"></a>

```vertex
public static let TimeThresholdNumerator: int64 = 9
```

<a id="LossDetector.TimeThresholdDenominator"></a>

```vertex
public static let TimeThresholdDenominator: int64 = 8
```

#### Methods

<a id="LossDetector.OnPacketSent"></a>

```vertex
public mutating func OnPacketSent(_ packet: SentPacket)
```

<a id="LossDetector.OnAckReceived"></a>

```vertex
public mutating func OnAckReceived(largestAcked: uint64, nowMs: int64, rtt: RttEstimator) -> [SentPacket]
```

Evaluates acknowledgments and declares lost packets based on packet & time thresholds.

### struct NewConnectionIdData <a id="struct-NewConnectionIdData"></a>

```vertex
public struct NewConnectionIdData
```

Payload for NEW_CONNECTION_ID frame (RFC 9000 Section 19.15).

#### Initializers

<a id="NewConnectionIdData.init"></a>

```vertex
public init(sequence: uint64, retirePriorTo: uint64, cid: [uint8], token: [uint8])
```

#### Properties

<a id="NewConnectionIdData.Sequence"></a>

```vertex
public var Sequence: uint64
```

<a id="NewConnectionIdData.RetirePriorTo"></a>

```vertex
public var RetirePriorTo: uint64
```

<a id="NewConnectionIdData.Cid"></a>

```vertex
public var Cid: [uint8]
```

<a id="NewConnectionIdData.StatelessResetToken"></a>

```vertex
public var StatelessResetToken: [uint8]
```

### struct NewRenoCongestionController <a id="struct-NewRenoCongestionController"></a>

```vertex
public struct NewRenoCongestionController
```

Standard RFC 9002 NewReno Congestion Controller.

#### Initializers

<a id="NewRenoCongestionController.init"></a>

```vertex
public init(maxDatagramSize: int = 1200)
```

#### Properties

<a id="NewRenoCongestionController.CongestionWindow"></a>

```vertex
public var CongestionWindow: int
```

<a id="NewRenoCongestionController.SlowStartThreshold"></a>

```vertex
public var SlowStartThreshold: int
```

<a id="NewRenoCongestionController.MaxDatagramSize"></a>

```vertex
public var MaxDatagramSize: int
```

<a id="NewRenoCongestionController.BytesInFlight"></a>

```vertex
public var BytesInFlight: int
```

#### Methods

<a id="NewRenoCongestionController.OnPacketSent"></a>

```vertex
public mutating func OnPacketSent(bytes: int)
```

<a id="NewRenoCongestionController.OnPacketAcked"></a>

```vertex
public mutating func OnPacketAcked(bytes: int)
```

<a id="NewRenoCongestionController.OnPacketLost"></a>

```vertex
public mutating func OnPacketLost(bytes: int)
```

<a id="NewRenoCongestionController.CanSend"></a>

```vertex
public func CanSend() -> bool
```

### struct PacketNumberSpace <a id="struct-PacketNumberSpace"></a>

```vertex
public struct PacketNumberSpace
```

QUIC Packet Number Spaces (RFC 9002 Section 4).

#### Properties

<a id="PacketNumberSpace.Initial"></a>

```vertex
public static let Initial: int = 0
```

<a id="PacketNumberSpace.Handshake"></a>

```vertex
public static let Handshake: int = 1
```

<a id="PacketNumberSpace.ApplicationData"></a>

```vertex
public static let ApplicationData: int = 2
```

### struct QuicCipherKeys <a id="struct-QuicCipherKeys"></a>

```vertex
public struct QuicCipherKeys
```

QUIC AEAD and Header Protection Keys derived for an encryption level.

#### Initializers

<a id="QuicCipherKeys.init"></a>

```vertex
public init(key: [uint8], iv: [uint8], hpKey: [uint8])
```

#### Properties

<a id="QuicCipherKeys.Key"></a>

```vertex
public var Key: [uint8]
```

<a id="QuicCipherKeys.Iv"></a>

```vertex
public var Iv: [uint8]
```

<a id="QuicCipherKeys.HpKey"></a>

```vertex
public var HpKey: [uint8]
```

#### Methods

<a id="QuicCipherKeys.Derive"></a>

```vertex
public static func Derive(secret: [uint8]) -> QuicCipherKeys
```

Derives QUIC keys from an encryption secret (RFC 9001 Section 5.1).

### struct QuicConfig <a id="struct-QuicConfig"></a>

```vertex
public struct QuicConfig
```

QUIC Configuration parameters.

#### Initializers

<a id="QuicConfig.init"></a>

```vertex
public init()
```

#### Properties

<a id="QuicConfig.MaxIdleTimeoutMs"></a>

```vertex
public var MaxIdleTimeoutMs: uint64
```

<a id="QuicConfig.InitialMaxData"></a>

```vertex
public var InitialMaxData: uint64
```

<a id="QuicConfig.InitialMaxStreamDataBidiLocal"></a>

```vertex
public var InitialMaxStreamDataBidiLocal: uint64
```

<a id="QuicConfig.InitialMaxStreamDataBidiRemote"></a>

```vertex
public var InitialMaxStreamDataBidiRemote: uint64
```

<a id="QuicConfig.InitialMaxStreamDataUni"></a>

```vertex
public var InitialMaxStreamDataUni: uint64
```

<a id="QuicConfig.MaxConcurrentBidiStreams"></a>

```vertex
public var MaxConcurrentBidiStreams: uint64
```

<a id="QuicConfig.MaxConcurrentUniStreams"></a>

```vertex
public var MaxConcurrentUniStreams: uint64
```

<a id="QuicConfig.EnableDatagrams"></a>

```vertex
public var EnableDatagrams: bool
```

<a id="QuicConfig.MaxDatagramPayloadSize"></a>

```vertex
public var MaxDatagramPayloadSize: uint64
```

### struct QuicConnection <a id="struct-QuicConnection"></a>

```vertex
public struct QuicConnection
```

QuicConnection represents an active QUIC connection managing streams, flow control,
packet numbers, encryption, and unreliable datagrams (RFC 9000 & RFC 9221).

#### Initializers

<a id="QuicConnection.init"></a>

```vertex
public init(socket: udp.UdpSocket,
            remoteAddress: udp.SocketAddress,
            localCid: [uint8],
            remoteCid: [uint8],
            isClient: bool,
            config: QuicConfig = QuicConfig())
```

#### Properties

<a id="QuicConnection.IsClient"></a>

```vertex
public var IsClient: bool
```

<a id="QuicConnection.Socket"></a>

```vertex
public var Socket: udp.UdpSocket
```

<a id="QuicConnection.RemoteAddress"></a>

```vertex
public var RemoteAddress: udp.SocketAddress
```

<a id="QuicConnection.LocalCid"></a>

```vertex
public var LocalCid: [uint8]
```

<a id="QuicConnection.RemoteCid"></a>

```vertex
public var RemoteCid: [uint8]
```

<a id="QuicConnection.Version"></a>

```vertex
public var Version: uint32
```

<a id="QuicConnection.Config"></a>

```vertex
public var Config: QuicConfig
```

<a id="QuicConnection.IsConnected"></a>

```vertex
public var IsConnected: bool
```

<a id="QuicConnection.IsClosed"></a>

```vertex
public var IsClosed: bool
```

<a id="QuicConnection.NextInitialPn"></a>

```vertex
public var NextInitialPn: uint64
```

<a id="QuicConnection.NextHandshakePn"></a>

```vertex
public var NextHandshakePn: uint64
```

<a id="QuicConnection.NextAppPn"></a>

```vertex
public var NextAppPn: uint64
```

<a id="QuicConnection.LargestAckedPn"></a>

```vertex
public var LargestAckedPn: uint64
```

<a id="QuicConnection.NextBidiStreamId"></a>

```vertex
public var NextBidiStreamId: uint64
```

<a id="QuicConnection.NextUniStreamId"></a>

```vertex
public var NextUniStreamId: uint64
```

<a id="QuicConnection.Streams"></a>

```vertex
public var Streams: [QuicStream]
```

<a id="QuicConnection.InboundDatagrams"></a>

```vertex
public var InboundDatagrams: [[uint8]]
```

<a id="QuicConnection.ClientKeys"></a>

```vertex
public var ClientKeys: QuicCipherKeys
```

<a id="QuicConnection.ServerKeys"></a>

```vertex
public var ServerKeys: QuicCipherKeys
```

<a id="QuicConnection.AppKeys"></a>

```vertex
public var AppKeys: QuicCipherKeys
```

<a id="QuicConnection.Rtt"></a>

```vertex
public var Rtt: RttEstimator
```

<a id="QuicConnection.Loss"></a>

```vertex
public var Loss: LossDetector
```

<a id="QuicConnection.Congestion"></a>

```vertex
public var Congestion: NewRenoCongestionController
```

<a id="QuicConnection.MaxDataRemote"></a>

```vertex
public var MaxDataRemote: uint64
```

<a id="QuicConnection.SentDataBytes"></a>

```vertex
public var SentDataBytes: uint64
```

<a id="QuicConnection.RecvDataBytes"></a>

```vertex
public var RecvDataBytes: uint64
```

<a id="QuicConnection.Port"></a>

```vertex
public var Port: uint16 { get }
```

Bound local port number.

<a id="QuicConnection.Address"></a>

```vertex
public var Address: string { get }
```

Bound local address formatted as "ip:port".

#### Methods

<a id="QuicConnection.OpenStream"></a>

```vertex
public mutating func OpenStream() async throws -> QuicStream
```

Opens a new bidirectional stream.

<a id="QuicConnection.OpenUniStream"></a>

```vertex
public mutating func OpenUniStream() async throws -> QuicStream
```

Opens a new unidirectional stream.

<a id="QuicConnection.AcceptStream"></a>

```vertex
public mutating func AcceptStream() async throws -> QuicStream
```

Accepts an incoming stream opened by the remote peer.

<a id="QuicConnection.SendDatagram"></a>

```vertex
public mutating func SendDatagram(_ data: [uint8]) async throws
```

Transmits an unreliable application datagram (RFC 9221).

<a id="QuicConnection.ReceiveDatagram"></a>

```vertex
public mutating func ReceiveDatagram() async throws -> [uint8]
```

Receives an unreliable application datagram (RFC 9221).

<a id="QuicConnection.SendPacket"></a>

```vertex
public mutating func SendPacket(frames: [QuicFrame], packetType: uint8) async throws
```

Builds, encrypts, protects, and sends a QUIC packet containing the given frames.

<a id="QuicConnection.ProcessInboundDatagram"></a>

```vertex
public mutating func ProcessInboundDatagram(_ raw: [uint8]) throws -> [QuicFrame]
```

Processes an inbound raw protected UDP datagram.

<a id="QuicConnection.ReceivePacket"></a>

```vertex
public mutating func ReceivePacket() async throws -> [QuicFrame]
```

Receives an inbound datagram from the socket, decrypts it, and processes frames.

<a id="QuicConnection.Close"></a>

```vertex
public mutating func Close(errorCode: uint64 = 0) async throws
```

Closes the QUIC connection cleanly by transmitting a CONNECTION_CLOSE frame.

### enum QuicError <a id="enum-QuicError"></a>

```vertex
public enum QuicError: Error
```

QUIC Transport and Application Errors (RFC 9000 Section 20).

#### Cases

<a id="QuicError.transport"></a>

```vertex
case transport(code: uint64, msg: string)
```

<a id="QuicError.application"></a>

```vertex
case application(code: uint64, msg: string)
```

<a id="QuicError.general"></a>

```vertex
case general(string)
```

### enum QuicFrame <a id="enum-QuicFrame"></a>

```vertex
public enum QuicFrame
```

QUIC Frames per RFC 9000 and RFC 9221.

#### Cases

<a id="QuicFrame.padding"></a>

```vertex
case padding
```

<a id="QuicFrame.ping"></a>

```vertex
case ping
```

<a id="QuicFrame.ack"></a>

```vertex
case ack(AckFrameData)
```

<a id="QuicFrame.resetStream"></a>

```vertex
case resetStream(ResetStreamData)
```

<a id="QuicFrame.stopSending"></a>

```vertex
case stopSending(streamId: uint64, errorCode: uint64)
```

<a id="QuicFrame.crypto"></a>

```vertex
case crypto(offset: uint64, data: [uint8])
```

<a id="QuicFrame.newToken"></a>

```vertex
case newToken([uint8])
```

<a id="QuicFrame.stream"></a>

```vertex
case stream(StreamFrameData)
```

<a id="QuicFrame.maxData"></a>

```vertex
case maxData(uint64)
```

<a id="QuicFrame.maxStreamData"></a>

```vertex
case maxStreamData(streamId: uint64, maxData: uint64)
```

<a id="QuicFrame.maxStreams"></a>

```vertex
case maxStreams(isBidi: bool, maxStreams: uint64)
```

<a id="QuicFrame.dataBlocked"></a>

```vertex
case dataBlocked(uint64)
```

<a id="QuicFrame.streamDataBlocked"></a>

```vertex
case streamDataBlocked(streamId: uint64, maxData: uint64)
```

<a id="QuicFrame.streamsBlocked"></a>

```vertex
case streamsBlocked(isBidi: bool, maxStreams: uint64)
```

<a id="QuicFrame.newConnectionId"></a>

```vertex
case newConnectionId(NewConnectionIdData)
```

<a id="QuicFrame.retireConnectionId"></a>

```vertex
case retireConnectionId(sequence: uint64)
```

<a id="QuicFrame.pathChallenge"></a>

```vertex
case pathChallenge([uint8])
```

<a id="QuicFrame.pathResponse"></a>

```vertex
case pathResponse([uint8])
```

<a id="QuicFrame.connectionClose"></a>

```vertex
case connectionClose(ConnectionCloseData)
```

<a id="QuicFrame.handshakeDone"></a>

```vertex
case handshakeDone
```

<a id="QuicFrame.datagram"></a>

```vertex
case datagram([uint8])
```

### struct QuicListener <a id="struct-QuicListener"></a>

```vertex
public struct QuicListener
```

QuicListener listens for incoming QUIC connections on a UDP port (RFC 9000).

#### Initializers

<a id="QuicListener.init"></a>

```vertex
public init(socket: udp.UdpSocket)
```

<a id="QuicListener.init-2"></a>

```vertex
public init(socket: udp.UdpSocket, config: QuicConfig)
```

#### Properties

<a id="QuicListener.Socket"></a>

```vertex
public var Socket: udp.UdpSocket
```

<a id="QuicListener.LocalAddress"></a>

```vertex
public var LocalAddress: udp.SocketAddress
```

<a id="QuicListener.Config"></a>

```vertex
public var Config: QuicConfig
```

<a id="QuicListener.IsClosed"></a>

```vertex
public var IsClosed: bool
```

<a id="QuicListener.Port"></a>

```vertex
public var Port: uint16 { get }
```

Bound local port number.

<a id="QuicListener.Address"></a>

```vertex
public var Address: string { get }
```

Bound local address formatted as "ip:port".

#### Methods

<a id="QuicListener.Accept"></a>

```vertex
public mutating func Accept() async throws -> QuicConnection
```

Accepts the next incoming QUIC connection.

<a id="QuicListener.Close"></a>

```vertex
public mutating func Close()
```

Closes the listener and underlying UDP socket.

### struct QuicPacketType <a id="struct-QuicPacketType"></a>

```vertex
public struct QuicPacketType
```

QUIC Packet Types (RFC 9000).

#### Properties

<a id="QuicPacketType.Initial"></a>

```vertex
public static let Initial: uint8 = 0x00
```

<a id="QuicPacketType.ZeroRtt"></a>

```vertex
public static let ZeroRtt: uint8 = 0x01
```

<a id="QuicPacketType.Handshake"></a>

```vertex
public static let Handshake: uint8 = 0x02
```

<a id="QuicPacketType.Retry"></a>

```vertex
public static let Retry: uint8 = 0x03
```

<a id="QuicPacketType.OneRtt"></a>

```vertex
public static let OneRtt: uint8 = 0x04
```

### struct QuicSalt <a id="struct-QuicSalt"></a>

```vertex
public struct QuicSalt
```

Authoritative RFC 9001 Section 5.2 Initial Salt for QUIC Version 1.

#### Properties

<a id="QuicSalt.V1"></a>

```vertex
public static let V1: [uint8]
```

### struct QuicStream <a id="struct-QuicStream"></a>

```vertex
public struct QuicStream
```

Represents an individual multiplexed QUIC stream (RFC 9000 Section 2).

#### Initializers

<a id="QuicStream.init"></a>

```vertex
public init(streamId: uint64,
            initialMaxSendData: uint64 = 262144,
            initialMaxRecvData: uint64 = 262144)
```

#### Properties

<a id="QuicStream.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="QuicStream.IsClientInitiated"></a>

```vertex
public var IsClientInitiated: bool
```

<a id="QuicStream.IsBidirectional"></a>

```vertex
public var IsBidirectional: bool
```

<a id="QuicStream.SendOffset"></a>

```vertex
public var SendOffset: uint64
```

<a id="QuicStream.RecvOffset"></a>

```vertex
public var RecvOffset: uint64
```

<a id="QuicStream.MaxSendData"></a>

```vertex
public var MaxSendData: uint64
```

<a id="QuicStream.MaxRecvData"></a>

```vertex
public var MaxRecvData: uint64
```

<a id="QuicStream.SendFin"></a>

```vertex
public var SendFin: bool
```

<a id="QuicStream.RecvFin"></a>

```vertex
public var RecvFin: bool
```

<a id="QuicStream.IsClosed"></a>

```vertex
public var IsClosed: bool
```

<a id="QuicStream.RecvBuffer"></a>

```vertex
public var RecvBuffer: [uint8]
```

<a id="QuicStream.OutboundFrames"></a>

```vertex
public var OutboundFrames: [StreamFrameData]
```

#### Methods

<a id="QuicStream.Write"></a>

```vertex
public mutating func Write(_ data: [uint8]) async throws
```

Appends data to be sent on this stream.

<a id="QuicStream.WriteAndClose"></a>

```vertex
public mutating func WriteAndClose(_ data: [uint8]) async throws
```

Writes data and terminates the sending side of this stream (FIN bit).

<a id="QuicStream.Read"></a>

```vertex
public mutating func Read(maxBytes: int = 4096) async throws -> [uint8]
```

Reads up to maxBytes from the stream buffer.

<a id="QuicStream.ReceiveStreamData"></a>

```vertex
public mutating func ReceiveStreamData(offset: uint64, fin: bool, data: [uint8])
```

Processes inbound stream data from a received STREAM frame.

<a id="QuicStream.DrainOutboundFrames"></a>

```vertex
public mutating func DrainOutboundFrames() -> [QuicFrame]
```

Pops and converts pending outbound stream frames into QuicFrame values.

<a id="QuicStream.Close"></a>

```vertex
public mutating func Close()
```

Closes this stream.

### struct QuicStreamType <a id="struct-QuicStreamType"></a>

```vertex
public struct QuicStreamType
```

QUIC Stream Types (RFC 9000 Section 2.1).

#### Properties

<a id="QuicStreamType.ClientBidi"></a>

```vertex
public static let ClientBidi: uint8 = 0x00
```

<a id="QuicStreamType.ServerBidi"></a>

```vertex
public static let ServerBidi: uint8 = 0x01
```

<a id="QuicStreamType.ClientUni"></a>

```vertex
public static let ClientUni: uint8 = 0x02
```

<a id="QuicStreamType.ServerUni"></a>

```vertex
public static let ServerUni: uint8 = 0x03
```

### struct QuicVersion <a id="struct-QuicVersion"></a>

```vertex
public struct QuicVersion
```

Protocol version identifiers.

#### Properties

<a id="QuicVersion.V1"></a>

```vertex
public static let V1: uint32 = 0x00000001
```

<a id="QuicVersion.V2"></a>

```vertex
public static let V2: uint32 = 0x6b3343cf
```

<a id="QuicVersion.Draft29"></a>

```vertex
public static let Draft29: uint32 = 0xff00001d
```

### struct ResetStreamData <a id="struct-ResetStreamData"></a>

```vertex
public struct ResetStreamData
```

Payload for RESET_STREAM frame (RFC 9000 Section 19.4).

#### Initializers

<a id="ResetStreamData.init"></a>

```vertex
public init(streamId: uint64, errorCode: uint64, finalSize: uint64)
```

#### Properties

<a id="ResetStreamData.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="ResetStreamData.ErrorCode"></a>

```vertex
public var ErrorCode: uint64
```

<a id="ResetStreamData.FinalSize"></a>

```vertex
public var FinalSize: uint64
```

### struct RttEstimator <a id="struct-RttEstimator"></a>

```vertex
public struct RttEstimator
```

RTT Estimator according to RFC 9002 Section 5.

#### Initializers

<a id="RttEstimator.init"></a>

```vertex
public init(initialRttMs: int64 = 100)
```

#### Properties

<a id="RttEstimator.LatestRttMs"></a>

```vertex
public var LatestRttMs: int64
```

<a id="RttEstimator.SmoothedRttMs"></a>

```vertex
public var SmoothedRttMs: int64
```

<a id="RttEstimator.RttVarMs"></a>

```vertex
public var RttVarMs: int64
```

<a id="RttEstimator.MinRttMs"></a>

```vertex
public var MinRttMs: int64
```

<a id="RttEstimator.FirstSample"></a>

```vertex
public var FirstSample: bool
```

#### Methods

<a id="RttEstimator.UpdateRtt"></a>

```vertex
public mutating func UpdateRtt(latestSampleMs: int64, ackDelayMs: int64 = 0)
```

<a id="RttEstimator.ComputePto"></a>

```vertex
public func ComputePto(maxAckDelayMs: int64 = 25) -> int64
```

Computes the Probe Timeout (PTO) duration in milliseconds (RFC 9002 Section 5.2).

### struct SentPacket <a id="struct-SentPacket"></a>

```vertex
public struct SentPacket
```

Sent packet metadata for loss detection and ACK processing.

#### Initializers

<a id="SentPacket.init"></a>

```vertex
public init(packetNumber: uint64, sentTimeMs: int64, bytesSent: int, ackEliciting: bool)
```

#### Properties

<a id="SentPacket.PacketNumber"></a>

```vertex
public var PacketNumber: uint64
```

<a id="SentPacket.SentTimeMs"></a>

```vertex
public var SentTimeMs: int64
```

<a id="SentPacket.BytesSent"></a>

```vertex
public var BytesSent: int
```

<a id="SentPacket.AckEliciting"></a>

```vertex
public var AckEliciting: bool
```

### struct ShortHeader <a id="struct-ShortHeader"></a>

```vertex
public struct ShortHeader
```

Parsed Short Header metadata.

#### Initializers

<a id="ShortHeader.init"></a>

```vertex
public init(spin: bool = false,
            keyPhase: bool = false,
            dcid: [uint8],
            packetNumber: uint64 = 0,
            pnLength: int = 4,
            headerBytes: [uint8] = [])
```

#### Properties

<a id="ShortHeader.Spin"></a>

```vertex
public var Spin: bool
```

<a id="ShortHeader.KeyPhase"></a>

```vertex
public var KeyPhase: bool
```

<a id="ShortHeader.Dcid"></a>

```vertex
public var Dcid: [uint8]
```

<a id="ShortHeader.PacketNumber"></a>

```vertex
public var PacketNumber: uint64
```

<a id="ShortHeader.PnLength"></a>

```vertex
public var PnLength: int
```

<a id="ShortHeader.HeaderBytes"></a>

```vertex
public var HeaderBytes: [uint8]
```

### struct StreamFrameData <a id="struct-StreamFrameData"></a>

```vertex
public struct StreamFrameData
```

Payload for STREAM frame (RFC 9000 Section 19.8).

#### Initializers

<a id="StreamFrameData.init"></a>

```vertex
public init(streamId: uint64, offset: uint64 = 0, fin: bool = false, data: [uint8] = [])
```

#### Properties

<a id="StreamFrameData.StreamId"></a>

```vertex
public var StreamId: uint64
```

<a id="StreamFrameData.Offset"></a>

```vertex
public var Offset: uint64
```

<a id="StreamFrameData.Fin"></a>

```vertex
public var Fin: bool
```

<a id="StreamFrameData.Data"></a>

```vertex
public var Data: [uint8]
```

### struct TransportErrorCode <a id="struct-TransportErrorCode"></a>

```vertex
public struct TransportErrorCode
```

Well-known QUIC transport error codes (RFC 9000 Section 20.1).

#### Properties

<a id="TransportErrorCode.NoError"></a>

```vertex
public static let NoError: uint64 = 0x00
```

<a id="TransportErrorCode.InternalError"></a>

```vertex
public static let InternalError: uint64 = 0x01
```

<a id="TransportErrorCode.ConnectionRefused"></a>

```vertex
public static let ConnectionRefused: uint64 = 0x02
```

<a id="TransportErrorCode.FlowControlError"></a>

```vertex
public static let FlowControlError: uint64 = 0x03
```

<a id="TransportErrorCode.StreamLimitError"></a>

```vertex
public static let StreamLimitError: uint64 = 0x04
```

<a id="TransportErrorCode.StreamStateError"></a>

```vertex
public static let StreamStateError: uint64 = 0x05
```

<a id="TransportErrorCode.FinalSizeError"></a>

```vertex
public static let FinalSizeError: uint64 = 0x06
```

<a id="TransportErrorCode.FrameEncodingError"></a>

```vertex
public static let FrameEncodingError: uint64 = 0x07
```

<a id="TransportErrorCode.TransportParameterError"></a>

```vertex
public static let TransportParameterError: uint64 = 0x08
```

<a id="TransportErrorCode.ConnectionIdLimitError"></a>

```vertex
public static let ConnectionIdLimitError: uint64 = 0x09
```

<a id="TransportErrorCode.ProtocolViolation"></a>

```vertex
public static let ProtocolViolation: uint64 = 0x0a
```

<a id="TransportErrorCode.InvalidToken"></a>

```vertex
public static let InvalidToken: uint64 = 0x0b
```

<a id="TransportErrorCode.ApplicationError"></a>

```vertex
public static let ApplicationError: uint64 = 0x0c
```

<a id="TransportErrorCode.CryptoBufferExceeded"></a>

```vertex
public static let CryptoBufferExceeded: uint64 = 0x0d
```

<a id="TransportErrorCode.KeyUpdateError"></a>

```vertex
public static let KeyUpdateError: uint64 = 0x0e
```

<a id="TransportErrorCode.AeadLimitReached"></a>

```vertex
public static let AeadLimitReached: uint64 = 0x0f
```

<a id="TransportErrorCode.NoViablePath"></a>

```vertex
public static let NoViablePath: uint64 = 0x10
```

### struct TransportParameters <a id="struct-TransportParameters"></a>

```vertex
public struct TransportParameters
```

QUIC Transport Parameters (RFC 9000 Section 18.2 & RFC 9221).

#### Initializers

<a id="TransportParameters.init"></a>

```vertex
public init()
```

#### Properties

<a id="TransportParameters.OriginalDestinationConnectionId"></a>

```vertex
public var OriginalDestinationConnectionId: [uint8]
```

<a id="TransportParameters.InitialSourceConnectionId"></a>

```vertex
public var InitialSourceConnectionId: [uint8]
```

<a id="TransportParameters.MaxIdleTimeoutMs"></a>

```vertex
public var MaxIdleTimeoutMs: uint64
```

<a id="TransportParameters.StatelessResetToken"></a>

```vertex
public var StatelessResetToken: [uint8]
```

<a id="TransportParameters.MaxUdpPayloadSize"></a>

```vertex
public var MaxUdpPayloadSize: uint64
```

<a id="TransportParameters.InitialMaxData"></a>

```vertex
public var InitialMaxData: uint64
```

<a id="TransportParameters.InitialMaxStreamDataBidiLocal"></a>

```vertex
public var InitialMaxStreamDataBidiLocal: uint64
```

<a id="TransportParameters.InitialMaxStreamDataBidiRemote"></a>

```vertex
public var InitialMaxStreamDataBidiRemote: uint64
```

<a id="TransportParameters.InitialMaxStreamDataUni"></a>

```vertex
public var InitialMaxStreamDataUni: uint64
```

<a id="TransportParameters.InitialMaxStreamsBidi"></a>

```vertex
public var InitialMaxStreamsBidi: uint64
```

<a id="TransportParameters.InitialMaxStreamsUni"></a>

```vertex
public var InitialMaxStreamsUni: uint64
```

<a id="TransportParameters.AckDelayExponent"></a>

```vertex
public var AckDelayExponent: uint64
```

<a id="TransportParameters.MaxAckDelayMs"></a>

```vertex
public var MaxAckDelayMs: uint64
```

<a id="TransportParameters.DisableActiveMigration"></a>

```vertex
public var DisableActiveMigration: bool
```

<a id="TransportParameters.ActiveConnectionIdLimit"></a>

```vertex
public var ActiveConnectionIdLimit: uint64
```

<a id="TransportParameters.MaxDatagramFrameSize"></a>

```vertex
public var MaxDatagramFrameSize: uint64
```

### struct UnprotectedHeader <a id="struct-UnprotectedHeader"></a>

```vertex
public struct UnprotectedHeader
```

Unprotected header info returned after removing RFC 9001 header protection.

#### Initializers

<a id="UnprotectedHeader.init"></a>

```vertex
public init(packetNumber: uint64, pnLength: int)
```

#### Properties

<a id="UnprotectedHeader.PacketNumber"></a>

```vertex
public var PacketNumber: uint64
```

<a id="UnprotectedHeader.PnLength"></a>

```vertex
public var PnLength: int
```

## Files

- connection.vs
- crypto.vs
- frame.vs
- listener.vs
- loss.vs
- packet.vs
- quic.vs
- stream.vs
- transport_parameters.vs
- types.vs
- varint.vs
