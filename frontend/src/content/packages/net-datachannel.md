# package datachannel

```vertex
import "net/datachannel"
```

## Index

- [`func BuildDcepAck() -> [uint8]`](#func-BuildDcepAck)
- [`func BuildDcepOpen(channelType: uint8, priority: uint16, reliabilityParam: uint32, label: string, subprotocol: string = "") -> [uint8]`](#func-BuildDcepOpen)
- [`func ParseDcepOpen(_ data: [uint8]) throws -> DcepOpenMessage`](#func-ParseDcepOpen)
- [`struct ChannelType`](#struct-ChannelType)
  - [`static let Reliable: uint8 = 0x00`](#ChannelType.Reliable)
  - [`static let ReliableUnordered: uint8 = 0x01`](#ChannelType.ReliableUnordered)
  - [`static let PartialReliableRexmit: uint8 = 0x02`](#ChannelType.PartialReliableRexmit)
  - [`static let PartialReliableRexmitUnordered: uint8 = 0x03`](#ChannelType.PartialReliableRexmitUnordered)
  - [`static let PartialReliableTimed: uint8 = 0x04`](#ChannelType.PartialReliableTimed)
  - [`static let PartialReliableTimedUnordered: uint8 = 0x05`](#ChannelType.PartialReliableTimedUnordered)
- [`enum DataChannelError: Error`](#enum-DataChannelError)
- [`struct DataChannelInboundResult`](#struct-DataChannelInboundResult)
  - [`init(kind: int, ackData: [uint8] = [], textMessage: string = "", binaryMessage: [uint8] = [])`](#DataChannelInboundResult.init)
  - [`var Kind: int`](#DataChannelInboundResult.Kind)
  - [`var AckData: [uint8]`](#DataChannelInboundResult.AckData)
  - [`var TextMessage: string`](#DataChannelInboundResult.TextMessage)
  - [`var BinaryMessage: [uint8]`](#DataChannelInboundResult.BinaryMessage)
- [`struct DcepMessageType`](#struct-DcepMessageType)
  - [`static let Ack: uint8 = 0x02`](#DcepMessageType.Ack)
  - [`static let Open: uint8 = 0x03`](#DcepMessageType.Open)
- [`struct DcepOpenMessage`](#struct-DcepOpenMessage)
  - [`init(channelType: uint8, priority: uint16, reliabilityParam: uint32, label: string, subprotocol: string)`](#DcepOpenMessage.init)
  - [`var ChannelType: uint8`](#DcepOpenMessage.ChannelType)
  - [`var Priority: uint16`](#DcepOpenMessage.Priority)
  - [`var ReliabilityParam: uint32`](#DcepOpenMessage.ReliabilityParam)
  - [`var Label: string`](#DcepOpenMessage.Label)
  - [`var Subprotocol: string`](#DcepOpenMessage.Subprotocol)
- [`struct InboundKind`](#struct-InboundKind)
  - [`static let None: int = 0`](#InboundKind.None)
  - [`static let AckResponseNeeded: int = 1`](#InboundKind.AckResponseNeeded)
  - [`static let Text: int = 2`](#InboundKind.Text)
  - [`static let Binary: int = 3`](#InboundKind.Binary)
- [`struct OutboundMessage`](#struct-OutboundMessage)
  - [`init(streamId: uint16, ppid: uint32, payload: [uint8], unordered: bool)`](#OutboundMessage.init)
  - [`var StreamId: uint16`](#OutboundMessage.StreamId)
  - [`var PPID: uint32`](#OutboundMessage.PPID)
  - [`var Payload: [uint8]`](#OutboundMessage.Payload)
  - [`var Unordered: bool`](#OutboundMessage.Unordered)
- [`struct RTCDataChannel`](#struct-RTCDataChannel)
  - [`init(id: uint16, label: string, options: RTCDataChannelInit)`](#RTCDataChannel.init)
  - [`init(id: uint16, label: string)`](#RTCDataChannel.init-2)
  - [`var Id: uint16`](#RTCDataChannel.Id)
  - [`var Label: string`](#RTCDataChannel.Label)
  - [`var Subprotocol: string`](#RTCDataChannel.Subprotocol)
  - [`var Ordered: bool`](#RTCDataChannel.Ordered)
  - [`var MaxPacketLifeTime: int`](#RTCDataChannel.MaxPacketLifeTime)
  - [`var MaxRetransmits: int`](#RTCDataChannel.MaxRetransmits)
  - [`var Negotiated: bool`](#RTCDataChannel.Negotiated)
  - [`var ReadyState: int`](#RTCDataChannel.ReadyState)
  - [`func InitOpenMessage() -> OutboundMessage`](#RTCDataChannel.InitOpenMessage)
  - [`func Send(text: string) throws -> OutboundMessage`](#RTCDataChannel.Send)
  - [`func Send(bytes: [uint8]) throws -> OutboundMessage`](#RTCDataChannel.Send-2)
  - [`mutating func HandleInbound(ppid: uint32, data: [uint8]) throws -> DataChannelInboundResult`](#RTCDataChannel.HandleInbound)
  - [`mutating func Close()`](#RTCDataChannel.Close)
- [`struct RTCDataChannelInit`](#struct-RTCDataChannelInit)
  - [`init()`](#RTCDataChannelInit.init)
  - [`init(ordered: bool, maxPacketLifeTime: int, maxRetransmits: int, subprotocol: string, negotiated: bool, id: uint16)`](#RTCDataChannelInit.init-2)
  - [`var Ordered: bool`](#RTCDataChannelInit.Ordered)
  - [`var MaxPacketLifeTime: int`](#RTCDataChannelInit.MaxPacketLifeTime)
  - [`var MaxRetransmits: int`](#RTCDataChannelInit.MaxRetransmits)
  - [`var Subprotocol: string`](#RTCDataChannelInit.Subprotocol)
  - [`var Negotiated: bool`](#RTCDataChannelInit.Negotiated)
  - [`var Id: uint16`](#RTCDataChannelInit.Id)
- [`struct RTCDataChannelState`](#struct-RTCDataChannelState)
  - [`static let Connecting: int = 0`](#RTCDataChannelState.Connecting)
  - [`static let Open: int = 1`](#RTCDataChannelState.Open)
  - [`static let Closing: int = 2`](#RTCDataChannelState.Closing)
  - [`static let Closed: int = 3`](#RTCDataChannelState.Closed)

## Functions

### func BuildDcepAck <a id="func-BuildDcepAck"></a>

```vertex
public func BuildDcepAck() -> [uint8]
```

BuildDcepAck serializes a DCEP DATA_CHANNEL_ACK message (RFC 8832 Section 5.2).

### func BuildDcepOpen <a id="func-BuildDcepOpen"></a>

```vertex
public func BuildDcepOpen(channelType: uint8,
                          priority: uint16,
                          reliabilityParam: uint32,
                          label: string,
                          subprotocol: string = "") -> [uint8]
```

BuildDcepOpen serializes a DCEP DATA_CHANNEL_OPEN message (RFC 8832 Section 5.1).

### func ParseDcepOpen <a id="func-ParseDcepOpen"></a>

```vertex
public func ParseDcepOpen(_ data: [uint8]) throws -> DcepOpenMessage
```

ParseDcepOpen parses a DCEP DATA_CHANNEL_OPEN message from bytes.

## Types

### struct ChannelType <a id="struct-ChannelType"></a>

```vertex
public struct ChannelType
```

#### Properties

<a id="ChannelType.Reliable"></a>

```vertex
public static let Reliable: uint8 = 0x00
```

<a id="ChannelType.ReliableUnordered"></a>

```vertex
public static let ReliableUnordered: uint8 = 0x01
```

<a id="ChannelType.PartialReliableRexmit"></a>

```vertex
public static let PartialReliableRexmit: uint8 = 0x02
```

<a id="ChannelType.PartialReliableRexmitUnordered"></a>

```vertex
public static let PartialReliableRexmitUnordered: uint8 = 0x03
```

<a id="ChannelType.PartialReliableTimed"></a>

```vertex
public static let PartialReliableTimed: uint8 = 0x04
```

<a id="ChannelType.PartialReliableTimedUnordered"></a>

```vertex
public static let PartialReliableTimedUnordered: uint8 = 0x05
```

### enum DataChannelError <a id="enum-DataChannelError"></a>

```vertex
public enum DataChannelError: Error
```

#### Cases

<a id="DataChannelError.invalidMessage"></a>

```vertex
case invalidMessage(string)
```

<a id="DataChannelError.channelClosed"></a>

```vertex
case channelClosed(string)
```

### struct DataChannelInboundResult <a id="struct-DataChannelInboundResult"></a>

```vertex
public struct DataChannelInboundResult
```

DataChannelInboundResult represents an event or data extracted from an incoming SCTP stream message.

#### Initializers

<a id="DataChannelInboundResult.init"></a>

```vertex
public init(kind: int,
            ackData: [uint8] = [],
            textMessage: string = "",
            binaryMessage: [uint8] = [])
```

#### Properties

<a id="DataChannelInboundResult.Kind"></a>

```vertex
public var Kind: int
```

<a id="DataChannelInboundResult.AckData"></a>

```vertex
public var AckData: [uint8]
```

<a id="DataChannelInboundResult.TextMessage"></a>

```vertex
public var TextMessage: string
```

<a id="DataChannelInboundResult.BinaryMessage"></a>

```vertex
public var BinaryMessage: [uint8]
```

### struct DcepMessageType <a id="struct-DcepMessageType"></a>

```vertex
public struct DcepMessageType
```

#### Properties

<a id="DcepMessageType.Ack"></a>

```vertex
public static let Ack: uint8 = 0x02
```

<a id="DcepMessageType.Open"></a>

```vertex
public static let Open: uint8 = 0x03
```

### struct DcepOpenMessage <a id="struct-DcepOpenMessage"></a>

```vertex
public struct DcepOpenMessage
```

DcepOpenMessage holds the parameters of a received DCEP DATA_CHANNEL_OPEN message (RFC 8832).

#### Initializers

<a id="DcepOpenMessage.init"></a>

```vertex
public init(channelType: uint8,
            priority: uint16,
            reliabilityParam: uint32,
            label: string,
            subprotocol: string)
```

#### Properties

<a id="DcepOpenMessage.ChannelType"></a>

```vertex
public var ChannelType: uint8
```

<a id="DcepOpenMessage.Priority"></a>

```vertex
public var Priority: uint16
```

<a id="DcepOpenMessage.ReliabilityParam"></a>

```vertex
public var ReliabilityParam: uint32
```

<a id="DcepOpenMessage.Label"></a>

```vertex
public var Label: string
```

<a id="DcepOpenMessage.Subprotocol"></a>

```vertex
public var Subprotocol: string
```

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

### struct OutboundMessage <a id="struct-OutboundMessage"></a>

```vertex
public struct OutboundMessage
```

OutboundMessage represents an SCTP chunk payload to transmit.

#### Initializers

<a id="OutboundMessage.init"></a>

```vertex
public init(streamId: uint16, ppid: uint32, payload: [uint8], unordered: bool)
```

#### Properties

<a id="OutboundMessage.StreamId"></a>

```vertex
public var StreamId: uint16
```

<a id="OutboundMessage.PPID"></a>

```vertex
public var PPID: uint32
```

<a id="OutboundMessage.Payload"></a>

```vertex
public var Payload: [uint8]
```

<a id="OutboundMessage.Unordered"></a>

```vertex
public var Unordered: bool
```

### struct RTCDataChannel <a id="struct-RTCDataChannel"></a>

```vertex
public struct RTCDataChannel
```

RTCDataChannel represents a bidirectional peer-to-peer data channel (RFC 8831).

#### Initializers

<a id="RTCDataChannel.init"></a>

```vertex
public init(id: uint16, label: string, options: RTCDataChannelInit)
```

<a id="RTCDataChannel.init-2"></a>

```vertex
public init(id: uint16, label: string)
```

#### Properties

<a id="RTCDataChannel.Id"></a>

```vertex
public var Id: uint16
```

<a id="RTCDataChannel.Label"></a>

```vertex
public var Label: string
```

<a id="RTCDataChannel.Subprotocol"></a>

```vertex
public var Subprotocol: string
```

<a id="RTCDataChannel.Ordered"></a>

```vertex
public var Ordered: bool
```

<a id="RTCDataChannel.MaxPacketLifeTime"></a>

```vertex
public var MaxPacketLifeTime: int
```

<a id="RTCDataChannel.MaxRetransmits"></a>

```vertex
public var MaxRetransmits: int
```

<a id="RTCDataChannel.Negotiated"></a>

```vertex
public var Negotiated: bool
```

<a id="RTCDataChannel.ReadyState"></a>

```vertex
public var ReadyState: int
```

#### Methods

<a id="RTCDataChannel.InitOpenMessage"></a>

```vertex
public func InitOpenMessage() -> OutboundMessage
```

InitOpenMessage creates the DCEP OPEN message for un-negotiated channels.

<a id="RTCDataChannel.Send"></a>

```vertex
public func Send(text: string) throws -> OutboundMessage
```

Send transmits a UTF-8 string over the data channel.

<a id="RTCDataChannel.Send-2"></a>

```vertex
public func Send(bytes: [uint8]) throws -> OutboundMessage
```

Send transmits a binary byte buffer over the data channel.

<a id="RTCDataChannel.HandleInbound"></a>

```vertex
public mutating func HandleInbound(ppid: uint32, data: [uint8]) throws -> DataChannelInboundResult
```

HandleInbound processes an incoming message from the SCTP stream for this channel.

<a id="RTCDataChannel.Close"></a>

```vertex
public mutating func Close()
```

Close marks the data channel as closed.

### struct RTCDataChannelInit <a id="struct-RTCDataChannelInit"></a>

```vertex
public struct RTCDataChannelInit
```

#### Initializers

<a id="RTCDataChannelInit.init"></a>

```vertex
public init()
```

<a id="RTCDataChannelInit.init-2"></a>

```vertex
public init(ordered: bool,
            maxPacketLifeTime: int,
            maxRetransmits: int,
            subprotocol: string,
            negotiated: bool,
            id: uint16)
```

#### Properties

<a id="RTCDataChannelInit.Ordered"></a>

```vertex
public var Ordered: bool
```

<a id="RTCDataChannelInit.MaxPacketLifeTime"></a>

```vertex
public var MaxPacketLifeTime: int
```

<a id="RTCDataChannelInit.MaxRetransmits"></a>

```vertex
public var MaxRetransmits: int
```

<a id="RTCDataChannelInit.Subprotocol"></a>

```vertex
public var Subprotocol: string
```

<a id="RTCDataChannelInit.Negotiated"></a>

```vertex
public var Negotiated: bool
```

<a id="RTCDataChannelInit.Id"></a>

```vertex
public var Id: uint16
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

## Files

- channel.vs
- dcep.vs
- types.vs
