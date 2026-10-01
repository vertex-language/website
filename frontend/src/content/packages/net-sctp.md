# package sctp

```vertex
import "net/sctp"
```

## Index

- [`struct AbortChunk`](#struct-AbortChunk)
  - [`init(reason: string = "")`](#AbortChunk.init)
  - [`var Reason: string`](#AbortChunk.Reason)
  - [`func ToRawChunk() -> RawChunk`](#AbortChunk.ToRawChunk)
- [`struct Association`](#struct-Association)
  - [`init(localPort: uint16 = 5000, remotePort: uint16 = 5000, maxStreams: uint16 = 256)`](#Association.init)
  - [`var LocalPort: uint16`](#Association.LocalPort)
  - [`var RemotePort: uint16`](#Association.RemotePort)
  - [`var MyInitiateTag: uint32`](#Association.MyInitiateTag)
  - [`var PeerInitiateTag: uint32`](#Association.PeerInitiateTag)
  - [`var State: int`](#Association.State)
  - [`var MyInitialTSN: uint32`](#Association.MyInitialTSN)
  - [`var NextTSN: uint32`](#Association.NextTSN)
  - [`var PeerInitialTSN: uint32`](#Association.PeerInitialTSN)
  - [`var CumulativePeerTSN: uint32`](#Association.CumulativePeerTSN)
  - [`var PeerTSNInitialized: bool`](#Association.PeerTSNInitialized)
  - [`var OutboundStreams: uint16`](#Association.OutboundStreams)
  - [`var InboundStreams: uint16`](#Association.InboundStreams)
  - [`var a_rwnd: uint32`](#Association.a_rwnd)
  - [`mutating func InitHandshake() -> [uint8]`](#Association.InitHandshake)
  - [`mutating func SendData(streamId: uint16, ppid: uint32, payload: [uint8], unordered: bool = false) -> [uint8]`](#Association.SendData)
  - [`mutating func HandlePacket(_ data: [uint8]) throws -> [uint8]`](#Association.HandlePacket)
  - [`mutating func ReadDelivered() -> [ReceivedMessage]`](#Association.ReadDelivered)
  - [`func IsEstablished() -> bool`](#Association.IsEstablished)
- [`struct AssociationState`](#struct-AssociationState)
  - [`static let Closed: int = 0`](#AssociationState.Closed)
  - [`static let CookieWait: int = 1`](#AssociationState.CookieWait)
  - [`static let CookieEchoed: int = 2`](#AssociationState.CookieEchoed)
  - [`static let Established: int = 3`](#AssociationState.Established)
  - [`static let ShutdownPending: int = 4`](#AssociationState.ShutdownPending)
  - [`static let ShutdownSent: int = 5`](#AssociationState.ShutdownSent)
  - [`static let ShutdownReceived: int = 6`](#AssociationState.ShutdownReceived)
  - [`static let ShutdownAckSent: int = 7`](#AssociationState.ShutdownAckSent)
- [`struct ChunkType`](#struct-ChunkType)
  - [`static let Data: uint8 = 0`](#ChunkType.Data)
  - [`static let Init: uint8 = 1`](#ChunkType.Init)
  - [`static let InitAck: uint8 = 2`](#ChunkType.InitAck)
  - [`static let Sack: uint8 = 3`](#ChunkType.Sack)
  - [`static let Heartbeat: uint8 = 4`](#ChunkType.Heartbeat)
  - [`static let HeartbeatAck: uint8 = 5`](#ChunkType.HeartbeatAck)
  - [`static let Abort: uint8 = 6`](#ChunkType.Abort)
  - [`static let Shutdown: uint8 = 7`](#ChunkType.Shutdown)
  - [`static let ShutdownAck: uint8 = 8`](#ChunkType.ShutdownAck)
  - [`static let Error: uint8 = 9`](#ChunkType.Error)
  - [`static let CookieEcho: uint8 = 10`](#ChunkType.CookieEcho)
  - [`static let CookieAck: uint8 = 11`](#ChunkType.CookieAck)
  - [`static let ShutdownComplete: uint8 = 14`](#ChunkType.ShutdownComplete)
  - [`static let Reconfig: uint8 = 130`](#ChunkType.Reconfig)
- [`struct CookieAckChunk`](#struct-CookieAckChunk)
  - [`init()`](#CookieAckChunk.init)
  - [`func ToRawChunk() -> RawChunk`](#CookieAckChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> CookieAckChunk`](#CookieAckChunk.Parse)
- [`struct CookieEchoChunk`](#struct-CookieEchoChunk)
  - [`init(cookie: [uint8])`](#CookieEchoChunk.init)
  - [`var Cookie: [uint8]`](#CookieEchoChunk.Cookie)
  - [`func ToRawChunk() -> RawChunk`](#CookieEchoChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> CookieEchoChunk`](#CookieEchoChunk.Parse)
- [`struct DataChunk`](#struct-DataChunk)
  - [`init(flags: uint8, tsn: uint32, streamId: uint16, streamSeq: uint16, ppid: uint32, userData: [uint8])`](#DataChunk.init)
  - [`var Flags: uint8`](#DataChunk.Flags)
  - [`var TSN: uint32`](#DataChunk.TSN)
  - [`var StreamId: uint16`](#DataChunk.StreamId)
  - [`var StreamSeq: uint16`](#DataChunk.StreamSeq)
  - [`var PPID: uint32`](#DataChunk.PPID)
  - [`var UserData: [uint8]`](#DataChunk.UserData)
  - [`func ToRawChunk() -> RawChunk`](#DataChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> DataChunk`](#DataChunk.Parse)
- [`struct DataFlags`](#struct-DataFlags)
  - [`static let Ending: uint8 = 0x01`](#DataFlags.Ending)
  - [`static let Beginning: uint8 = 0x02`](#DataFlags.Beginning)
  - [`static let Unordered: uint8 = 0x04`](#DataFlags.Unordered)
  - [`static let Complete: uint8 = 0x03`](#DataFlags.Complete)
- [`struct HeartbeatChunk`](#struct-HeartbeatChunk)
  - [`init(info: [uint8])`](#HeartbeatChunk.init)
  - [`var Info: [uint8]`](#HeartbeatChunk.Info)
  - [`func ToRawChunk(isAck: bool = false) -> RawChunk`](#HeartbeatChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> HeartbeatChunk`](#HeartbeatChunk.Parse)
- [`struct InitChunk`](#struct-InitChunk)
  - [`init(initiateTag: uint32, a_rwnd: uint32, outboundStreams: uint16, inboundStreams: uint16, initialTSN: uint32, cookie: [uint8] = [])`](#InitChunk.init)
  - [`var InitiateTag: uint32`](#InitChunk.InitiateTag)
  - [`var a_rwnd: uint32`](#InitChunk.a_rwnd)
  - [`var OutboundStreams: uint16`](#InitChunk.OutboundStreams)
  - [`var InboundStreams: uint16`](#InitChunk.InboundStreams)
  - [`var InitialTSN: uint32`](#InitChunk.InitialTSN)
  - [`var Cookie: [uint8]`](#InitChunk.Cookie)
  - [`func ToRawChunk(isAck: bool = false) -> RawChunk`](#InitChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> InitChunk`](#InitChunk.Parse)
- [`struct PPID`](#struct-PPID)
  - [`static let DCEP: uint32 = 50`](#PPID.DCEP)
  - [`static let String: uint32 = 51`](#PPID.String)
  - [`static let Binary: uint32 = 52`](#PPID.Binary)
  - [`static let StringEmpty: uint32 = 53`](#PPID.StringEmpty)
  - [`static let BinaryEmpty: uint32 = 54`](#PPID.BinaryEmpty)
- [`struct Packet`](#struct-Packet)
  - [`init(sourcePort: uint16, destinationPort: uint16, verificationTag: uint32, chunks: [RawChunk] = [])`](#Packet.init)
  - [`var SourcePort: uint16`](#Packet.SourcePort)
  - [`var DestinationPort: uint16`](#Packet.DestinationPort)
  - [`var VerificationTag: uint32`](#Packet.VerificationTag)
  - [`var Chunks: [RawChunk]`](#Packet.Chunks)
  - [`func Serialize() -> [uint8]`](#Packet.Serialize)
  - [`static func Parse(_ data: [uint8], verifyChecksum: bool = true) throws -> Packet`](#Packet.Parse)
- [`struct RawChunk`](#struct-RawChunk)
  - [`init(type: uint8, flags: uint8, value: [uint8])`](#RawChunk.init)
  - [`init(type: uint8, flags: uint8, length: int, value: [uint8])`](#RawChunk.init-2)
  - [`var Type: uint8`](#RawChunk.Type)
  - [`var Flags: uint8`](#RawChunk.Flags)
  - [`var Length: int`](#RawChunk.Length)
  - [`var Value: [uint8]`](#RawChunk.Value)
  - [`func Serialize() -> [uint8]`](#RawChunk.Serialize)
- [`struct ReceivedMessage`](#struct-ReceivedMessage)
  - [`init(streamId: uint16, ppid: uint32, payload: [uint8])`](#ReceivedMessage.init)
  - [`var StreamId: uint16`](#ReceivedMessage.StreamId)
  - [`var PPID: uint32`](#ReceivedMessage.PPID)
  - [`var Payload: [uint8]`](#ReceivedMessage.Payload)
- [`struct SackChunk`](#struct-SackChunk)
  - [`init(cumulativeTSNAck: uint32, a_rwnd: uint32, gapAckBlocks: [uint32] = [], duplicateTSNs: [uint32] = [])`](#SackChunk.init)
  - [`var CumulativeTSNAck: uint32`](#SackChunk.CumulativeTSNAck)
  - [`var a_rwnd: uint32`](#SackChunk.a_rwnd)
  - [`var GapAckBlocks: [uint32]`](#SackChunk.GapAckBlocks)
  - [`var DuplicateTSNs: [uint32]`](#SackChunk.DuplicateTSNs)
  - [`func ToRawChunk() -> RawChunk`](#SackChunk.ToRawChunk)
  - [`static func Parse(_ raw: RawChunk) -> SackChunk`](#SackChunk.Parse)
- [`enum SctpError: Error`](#enum-SctpError)

## Types

### struct AbortChunk <a id="struct-AbortChunk"></a>

```vertex
public struct AbortChunk
```

AbortChunk represents an ABORT (6) chunk.

#### Initializers

<a id="AbortChunk.init"></a>

```vertex
public init(reason: string = "")
```

#### Properties

<a id="AbortChunk.Reason"></a>

```vertex
public var Reason: string
```

#### Methods

<a id="AbortChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk() -> RawChunk
```

### struct Association <a id="struct-Association"></a>

```vertex
public struct Association
```

Association manages the state, streams, and TSN sequencing of an SCTP connection (RFC 4960 / RFC 8261).

#### Initializers

<a id="Association.init"></a>

```vertex
public init(localPort: uint16 = 5000,
            remotePort: uint16 = 5000,
            maxStreams: uint16 = 256)
```

#### Properties

<a id="Association.LocalPort"></a>

```vertex
public var LocalPort: uint16
```

<a id="Association.RemotePort"></a>

```vertex
public var RemotePort: uint16
```

<a id="Association.MyInitiateTag"></a>

```vertex
public var MyInitiateTag: uint32
```

<a id="Association.PeerInitiateTag"></a>

```vertex
public var PeerInitiateTag: uint32
```

<a id="Association.State"></a>

```vertex
public var State: int
```

<a id="Association.MyInitialTSN"></a>

```vertex
public var MyInitialTSN: uint32
```

<a id="Association.NextTSN"></a>

```vertex
public var NextTSN: uint32
```

<a id="Association.PeerInitialTSN"></a>

```vertex
public var PeerInitialTSN: uint32
```

<a id="Association.CumulativePeerTSN"></a>

```vertex
public var CumulativePeerTSN: uint32
```

<a id="Association.PeerTSNInitialized"></a>

```vertex
public var PeerTSNInitialized: bool
```

<a id="Association.OutboundStreams"></a>

```vertex
public var OutboundStreams: uint16
```

<a id="Association.InboundStreams"></a>

```vertex
public var InboundStreams: uint16
```

<a id="Association.a_rwnd"></a>

```vertex
public var a_rwnd: uint32
```

#### Methods

<a id="Association.InitHandshake"></a>

```vertex
public mutating func InitHandshake() -> [uint8]
```

InitHandshake generates the INIT packet to initiate an SCTP association.

<a id="Association.SendData"></a>

```vertex
public mutating func SendData(streamId: uint16, ppid: uint32, payload: [uint8], unordered: bool = false) -> [uint8]
```

SendData creates an SCTP packet containing a DATA chunk for the specified stream and PPID.

<a id="Association.HandlePacket"></a>

```vertex
public mutating func HandlePacket(_ data: [uint8]) throws -> [uint8]
```

HandlePacket processes an incoming serialized SCTP packet and returns response bytes to send (if any).

<a id="Association.ReadDelivered"></a>

```vertex
public mutating func ReadDelivered() -> [ReceivedMessage]
```

ReadDelivered dequeues all available inbound messages from streams.

<a id="Association.IsEstablished"></a>

```vertex
public func IsEstablished() -> bool
```

IsEstablished checks if association handshake is complete.

### struct AssociationState <a id="struct-AssociationState"></a>

```vertex
public struct AssociationState
```

#### Properties

<a id="AssociationState.Closed"></a>

```vertex
public static let Closed: int = 0
```

<a id="AssociationState.CookieWait"></a>

```vertex
public static let CookieWait: int = 1
```

<a id="AssociationState.CookieEchoed"></a>

```vertex
public static let CookieEchoed: int = 2
```

<a id="AssociationState.Established"></a>

```vertex
public static let Established: int = 3
```

<a id="AssociationState.ShutdownPending"></a>

```vertex
public static let ShutdownPending: int = 4
```

<a id="AssociationState.ShutdownSent"></a>

```vertex
public static let ShutdownSent: int = 5
```

<a id="AssociationState.ShutdownReceived"></a>

```vertex
public static let ShutdownReceived: int = 6
```

<a id="AssociationState.ShutdownAckSent"></a>

```vertex
public static let ShutdownAckSent: int = 7
```

### struct ChunkType <a id="struct-ChunkType"></a>

```vertex
public struct ChunkType
```

#### Properties

<a id="ChunkType.Data"></a>

```vertex
public static let Data: uint8 = 0
```

<a id="ChunkType.Init"></a>

```vertex
public static let Init: uint8 = 1
```

<a id="ChunkType.InitAck"></a>

```vertex
public static let InitAck: uint8 = 2
```

<a id="ChunkType.Sack"></a>

```vertex
public static let Sack: uint8 = 3
```

<a id="ChunkType.Heartbeat"></a>

```vertex
public static let Heartbeat: uint8 = 4
```

<a id="ChunkType.HeartbeatAck"></a>

```vertex
public static let HeartbeatAck: uint8 = 5
```

<a id="ChunkType.Abort"></a>

```vertex
public static let Abort: uint8 = 6
```

<a id="ChunkType.Shutdown"></a>

```vertex
public static let Shutdown: uint8 = 7
```

<a id="ChunkType.ShutdownAck"></a>

```vertex
public static let ShutdownAck: uint8 = 8
```

<a id="ChunkType.Error"></a>

```vertex
public static let Error: uint8 = 9
```

<a id="ChunkType.CookieEcho"></a>

```vertex
public static let CookieEcho: uint8 = 10
```

<a id="ChunkType.CookieAck"></a>

```vertex
public static let CookieAck: uint8 = 11
```

<a id="ChunkType.ShutdownComplete"></a>

```vertex
public static let ShutdownComplete: uint8 = 14
```

<a id="ChunkType.Reconfig"></a>

```vertex
public static let Reconfig: uint8 = 130
```

### struct CookieAckChunk <a id="struct-CookieAckChunk"></a>

```vertex
public struct CookieAckChunk
```

CookieAckChunk represents a COOKIE ACK (11) chunk.

#### Initializers

<a id="CookieAckChunk.init"></a>

```vertex
public init()
```

#### Methods

<a id="CookieAckChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk() -> RawChunk
```

<a id="CookieAckChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> CookieAckChunk
```

### struct CookieEchoChunk <a id="struct-CookieEchoChunk"></a>

```vertex
public struct CookieEchoChunk
```

CookieEchoChunk represents a COOKIE ECHO (10) chunk.

#### Initializers

<a id="CookieEchoChunk.init"></a>

```vertex
public init(cookie: [uint8])
```

#### Properties

<a id="CookieEchoChunk.Cookie"></a>

```vertex
public var Cookie: [uint8]
```

#### Methods

<a id="CookieEchoChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk() -> RawChunk
```

<a id="CookieEchoChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> CookieEchoChunk
```

### struct DataChunk <a id="struct-DataChunk"></a>

```vertex
public struct DataChunk
```

DataChunk represents an SCTP DATA (0) chunk.

#### Initializers

<a id="DataChunk.init"></a>

```vertex
public init(flags: uint8,
            tsn: uint32,
            streamId: uint16,
            streamSeq: uint16,
            ppid: uint32,
            userData: [uint8])
```

#### Properties

<a id="DataChunk.Flags"></a>

```vertex
public var Flags: uint8
```

<a id="DataChunk.TSN"></a>

```vertex
public var TSN: uint32
```

<a id="DataChunk.StreamId"></a>

```vertex
public var StreamId: uint16
```

<a id="DataChunk.StreamSeq"></a>

```vertex
public var StreamSeq: uint16
```

<a id="DataChunk.PPID"></a>

```vertex
public var PPID: uint32
```

<a id="DataChunk.UserData"></a>

```vertex
public var UserData: [uint8]
```

#### Methods

<a id="DataChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk() -> RawChunk
```

<a id="DataChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> DataChunk
```

### struct DataFlags <a id="struct-DataFlags"></a>

```vertex
public struct DataFlags
```

#### Properties

<a id="DataFlags.Ending"></a>

```vertex
public static let Ending: uint8 = 0x01
```

<a id="DataFlags.Beginning"></a>

```vertex
public static let Beginning: uint8 = 0x02
```

<a id="DataFlags.Unordered"></a>

```vertex
public static let Unordered: uint8 = 0x04
```

<a id="DataFlags.Complete"></a>

```vertex
public static let Complete: uint8 = 0x03
```

### struct HeartbeatChunk <a id="struct-HeartbeatChunk"></a>

```vertex
public struct HeartbeatChunk
```

HeartbeatChunk represents a HEARTBEAT (4) or HEARTBEAT ACK (5) chunk.

#### Initializers

<a id="HeartbeatChunk.init"></a>

```vertex
public init(info: [uint8])
```

#### Properties

<a id="HeartbeatChunk.Info"></a>

```vertex
public var Info: [uint8]
```

#### Methods

<a id="HeartbeatChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk(isAck: bool = false) -> RawChunk
```

<a id="HeartbeatChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> HeartbeatChunk
```

### struct InitChunk <a id="struct-InitChunk"></a>

```vertex
public struct InitChunk
```

InitChunk represents an INIT (1) or INIT ACK (2) chunk.

#### Initializers

<a id="InitChunk.init"></a>

```vertex
public init(initiateTag: uint32,
            a_rwnd: uint32,
            outboundStreams: uint16,
            inboundStreams: uint16,
            initialTSN: uint32,
            cookie: [uint8] = [])
```

#### Properties

<a id="InitChunk.InitiateTag"></a>

```vertex
public var InitiateTag: uint32
```

<a id="InitChunk.a_rwnd"></a>

```vertex
public var a_rwnd: uint32
```

<a id="InitChunk.OutboundStreams"></a>

```vertex
public var OutboundStreams: uint16
```

<a id="InitChunk.InboundStreams"></a>

```vertex
public var InboundStreams: uint16
```

<a id="InitChunk.InitialTSN"></a>

```vertex
public var InitialTSN: uint32
```

<a id="InitChunk.Cookie"></a>

```vertex
public var Cookie: [uint8]
```

#### Methods

<a id="InitChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk(isAck: bool = false) -> RawChunk
```

<a id="InitChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> InitChunk
```

### struct PPID <a id="struct-PPID"></a>

```vertex
public struct PPID
```

#### Properties

<a id="PPID.DCEP"></a>

```vertex
public static let DCEP: uint32 = 50
```

<a id="PPID.String"></a>

```vertex
public static let String: uint32 = 51
```

<a id="PPID.Binary"></a>

```vertex
public static let Binary: uint32 = 52
```

<a id="PPID.StringEmpty"></a>

```vertex
public static let StringEmpty: uint32 = 53
```

<a id="PPID.BinaryEmpty"></a>

```vertex
public static let BinaryEmpty: uint32 = 54
```

### struct Packet <a id="struct-Packet"></a>

```vertex
public struct Packet
```

Packet represents an SCTP packet consisting of a 12-byte common header and one or more chunks.

#### Initializers

<a id="Packet.init"></a>

```vertex
public init(sourcePort: uint16,
            destinationPort: uint16,
            verificationTag: uint32,
            chunks: [RawChunk] = [])
```

#### Properties

<a id="Packet.SourcePort"></a>

```vertex
public var SourcePort: uint16
```

<a id="Packet.DestinationPort"></a>

```vertex
public var DestinationPort: uint16
```

<a id="Packet.VerificationTag"></a>

```vertex
public var VerificationTag: uint32
```

<a id="Packet.Chunks"></a>

```vertex
public var Chunks: [RawChunk]
```

#### Methods

<a id="Packet.Serialize"></a>

```vertex
public func Serialize() -> [uint8]
```

Serialize writes the packet into bytes and computes the RFC 3309 CRC-32c checksum.

<a id="Packet.Parse"></a>

```vertex
public static func Parse(_ data: [uint8], verifyChecksum: bool = true) throws -> Packet
```

Parse deserializes an SCTP packet from raw bytes and verifies its CRC-32c checksum.

### struct RawChunk <a id="struct-RawChunk"></a>

```vertex
public struct RawChunk
```

RawChunk represents an SCTP chunk with a 4-byte header and raw value bytes.

#### Initializers

<a id="RawChunk.init"></a>

```vertex
public init(type: uint8, flags: uint8, value: [uint8])
```

<a id="RawChunk.init-2"></a>

```vertex
public init(type: uint8, flags: uint8, length: int, value: [uint8])
```

#### Properties

<a id="RawChunk.Type"></a>

```vertex
public var Type: uint8
```

<a id="RawChunk.Flags"></a>

```vertex
public var Flags: uint8
```

<a id="RawChunk.Length"></a>

```vertex
public var Length: int
```

<a id="RawChunk.Value"></a>

```vertex
public var Value: [uint8]
```

#### Methods

<a id="RawChunk.Serialize"></a>

```vertex
public func Serialize() -> [uint8]
```

Serialize writes the chunk header, value, and pad bytes to align to a 4-byte boundary.

### struct ReceivedMessage <a id="struct-ReceivedMessage"></a>

```vertex
public struct ReceivedMessage
```

ReceivedMessage represents reassembled payload delivered from an SCTP stream.

#### Initializers

<a id="ReceivedMessage.init"></a>

```vertex
public init(streamId: uint16, ppid: uint32, payload: [uint8])
```

#### Properties

<a id="ReceivedMessage.StreamId"></a>

```vertex
public var StreamId: uint16
```

<a id="ReceivedMessage.PPID"></a>

```vertex
public var PPID: uint32
```

<a id="ReceivedMessage.Payload"></a>

```vertex
public var Payload: [uint8]
```

### struct SackChunk <a id="struct-SackChunk"></a>

```vertex
public struct SackChunk
```

SackChunk represents an SCTP Selective Acknowledgement (3) chunk.

#### Initializers

<a id="SackChunk.init"></a>

```vertex
public init(cumulativeTSNAck: uint32,
            a_rwnd: uint32,
            gapAckBlocks: [uint32] = [],
            duplicateTSNs: [uint32] = [])
```

#### Properties

<a id="SackChunk.CumulativeTSNAck"></a>

```vertex
public var CumulativeTSNAck: uint32
```

<a id="SackChunk.a_rwnd"></a>

```vertex
public var a_rwnd: uint32
```

<a id="SackChunk.GapAckBlocks"></a>

```vertex
public var GapAckBlocks: [uint32]
```

<a id="SackChunk.DuplicateTSNs"></a>

```vertex
public var DuplicateTSNs: [uint32]
```

#### Methods

<a id="SackChunk.ToRawChunk"></a>

```vertex
public func ToRawChunk() -> RawChunk
```

<a id="SackChunk.Parse"></a>

```vertex
public static func Parse(_ raw: RawChunk) -> SackChunk
```

### enum SctpError <a id="enum-SctpError"></a>

```vertex
public enum SctpError: Error
```

#### Cases

<a id="SctpError.invalidPacket"></a>

```vertex
case invalidPacket(string)
```

<a id="SctpError.checksumMismatch"></a>

```vertex
case checksumMismatch(string)
```

<a id="SctpError.invalidState"></a>

```vertex
case invalidState(string)
```

<a id="SctpError.streamClosed"></a>

```vertex
case streamClosed(string)
```

## Files

- association.vs
- chunk.vs
- packet.vs
- types.vs
