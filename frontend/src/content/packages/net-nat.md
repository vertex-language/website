# package nat

```vertex
import "net/nat"
```

## Index

- [`func HandleArp(packet: ArpPacket, config: NatConfig) -> [uint8]?`](#func-HandleArp)
- [`func HandleDhcp(udpPayload: [uint8], clientMac: [uint8], config: NatConfig) -> [uint8]?`](#func-HandleDhcp)
- [`func HandleDnsQuery(payload: [uint8], clientMac: [uint8], clientIp: [uint8], clientPort: uint16, dnsServerIp: [uint8], config: NatConfig, port: NatPort)`](#func-HandleDnsQuery)
- [`func HandleGeneralUdp(ipPacket: [uint8], clientMac: [uint8], udpTable: UdpNatTable, config: NatConfig, port: NatPort)`](#func-HandleGeneralUdp)
- [`func HandleIcmp(ipPacket: [uint8], clientMac: [uint8], config: NatConfig) -> [uint8]?`](#func-HandleIcmp)
- [`func HandleTcp(ipPacket: [uint8], clientMac: [uint8], tcpTable: TcpNatTable, config: NatConfig, port: NatPort)`](#func-HandleTcp)
- [`func InternetChecksum(_ data: [uint8], initialSum: uint32 = 0) -> uint16`](#func-InternetChecksum)
- [`func PseudoHeaderChecksum(srcIp: [uint8], dstIp: [uint8], proto: uint8, length: uint16) -> uint32`](#func-PseudoHeaderChecksum)
- [`func SendTcpPacket(session: TcpSession, flags: uint8, payload: [uint8], config: NatConfig, port: NatPort, seq: uint32? = nil)`](#func-SendTcpPacket)
- [`struct ArpPacket`](#struct-ArpPacket)
  - [`init(HwType: uint16, ProtoType: uint16, HwSize: uint8, ProtoSize: uint8, Opcode: uint16, SenderMac: [uint8], SenderIp: [uint8], TargetMac: [uint8], TargetIp: [uint8])`](#ArpPacket.init)
  - [`var HwType: uint16`](#ArpPacket.HwType)
  - [`var ProtoType: uint16`](#ArpPacket.ProtoType)
  - [`var HwSize: uint8`](#ArpPacket.HwSize)
  - [`var ProtoSize: uint8`](#ArpPacket.ProtoSize)
  - [`var Opcode: uint16`](#ArpPacket.Opcode)
  - [`var SenderMac: [uint8]`](#ArpPacket.SenderMac)
  - [`var SenderIp: [uint8]`](#ArpPacket.SenderIp)
  - [`var TargetMac: [uint8]`](#ArpPacket.TargetMac)
  - [`var TargetIp: [uint8]`](#ArpPacket.TargetIp)
  - [`static func Parse(_ bytes: [uint8]) -> ArpPacket?`](#ArpPacket.Parse)
  - [`func Encode() -> [uint8]`](#ArpPacket.Encode)
- [`struct DhcpPacket`](#struct-DhcpPacket)
  - [`var Op: uint8`](#DhcpPacket.Op)
  - [`var Htype: uint8`](#DhcpPacket.Htype)
  - [`var Hlen: uint8`](#DhcpPacket.Hlen)
  - [`var Hops: uint8`](#DhcpPacket.Hops)
  - [`var Xid: uint32`](#DhcpPacket.Xid)
  - [`var Secs: uint16`](#DhcpPacket.Secs)
  - [`var Flags: uint16`](#DhcpPacket.Flags)
  - [`var Ciaddr: [uint8]`](#DhcpPacket.Ciaddr)
  - [`var Yiaddr: [uint8]`](#DhcpPacket.Yiaddr)
  - [`var Siaddr: [uint8]`](#DhcpPacket.Siaddr)
  - [`var Giaddr: [uint8]`](#DhcpPacket.Giaddr)
  - [`var Chaddr: [uint8]`](#DhcpPacket.Chaddr)
  - [`var Options: [uint8]`](#DhcpPacket.Options)
  - [`var MessageType: uint8`](#DhcpPacket.MessageType)
  - [`static func Parse(_ bytes: [uint8]) -> DhcpPacket?`](#DhcpPacket.Parse)
  - [`static func BuildResponse(request: DhcpPacket, config: NatConfig, isAck: bool) -> [uint8]`](#DhcpPacket.BuildResponse)
- [`final class DnsWorker`](#class-DnsWorker)
  - [`init(payload: [uint8], clientMac: [uint8], clientIp: [uint8], clientPort: uint16, dnsServerIp: [uint8], config: NatConfig, port: NatPort)`](#DnsWorker.init)
  - [`func Run() async`](#DnsWorker.Run)
- [`struct EthernetFrame`](#struct-EthernetFrame)
  - [`init(DstMac: [uint8], SrcMac: [uint8], EtherType: uint16, Payload: [uint8])`](#EthernetFrame.init)
  - [`var DstMac: [uint8]`](#EthernetFrame.DstMac)
  - [`var SrcMac: [uint8]`](#EthernetFrame.SrcMac)
  - [`var EtherType: uint16`](#EthernetFrame.EtherType)
  - [`var Payload: [uint8]`](#EthernetFrame.Payload)
  - [`static func Parse(_ bytes: [uint8]) -> EthernetFrame?`](#EthernetFrame.Parse)
  - [`func Encode() -> [uint8]`](#EthernetFrame.Encode)
- [`struct Ipv4Address: Equatable, Hashable, CustomStringConvertible`](#struct-Ipv4Address)
  - [`init(_ b0: uint8, _ b1: uint8, _ b2: uint8, _ b3: uint8)`](#Ipv4Address.init)
  - [`init(_ bytes: [uint8])`](#Ipv4Address.init-2)
  - [`var Bytes: [uint8]`](#Ipv4Address.Bytes)
  - [`var description: string { get }`](#Ipv4Address.description)
  - [`static let any = Ipv4Address(0, 0, 0, 0)`](#Ipv4Address.any)
  - [`static let broadcast = Ipv4Address(255, 255, 255, 255)`](#Ipv4Address.broadcast)
- [`struct NatConfig`](#struct-NatConfig)
  - [`init(gatewayMac: ether.Mac = ether.Mac([0x52, 0x54, 0x00, 0x12, 0x34, 0x01]), gatewayIp: Ipv4Address = Ipv4Address(192, 168, 127, 1), guestIp: Ipv4Address = Ipv4Address(192, 168, 127, 2), subnetMask: Ipv4Address = Ipv4Address(255, 255, 255, 0), dnsServers: [Ipv4Address] = [Ipv4Address(1, 1, 1, 1), Ipv4Address(8, 8, 8, 8)])`](#NatConfig.init)
  - [`var GatewayMac: ether.Mac`](#NatConfig.GatewayMac)
  - [`var GatewayIp: Ipv4Address`](#NatConfig.GatewayIp)
  - [`var GuestIp: Ipv4Address`](#NatConfig.GuestIp)
  - [`var SubnetMask: Ipv4Address`](#NatConfig.SubnetMask)
  - [`var DnsServers: [Ipv4Address]`](#NatConfig.DnsServers)
  - [``static let `default` = NatConfig()``](#NatConfig.default)
- [`final class NatPort: ether.Port`](#class-NatPort)
  - [`init(config: NatConfig = .default)`](#NatPort.init)
  - [`let Config: NatConfig`](#NatPort.Config)
  - [`func Enqueue(_ frame: [uint8])`](#NatPort.Enqueue)
  - [`func Receive() async throws -> [uint8]`](#NatPort.Receive)
  - [`func Send(_ frame: [uint8]) async throws`](#NatPort.Send)
- [`struct TcpKey: Hashable, Equatable`](#struct-TcpKey)
  - [`init(guestPort: uint16, remoteIp: Ipv4Address, remotePort: uint16)`](#TcpKey.init)
  - [`var GuestPort: uint16`](#TcpKey.GuestPort)
  - [`var RemoteIp: Ipv4Address`](#TcpKey.RemoteIp)
  - [`var RemotePort: uint16`](#TcpKey.RemotePort)
- [`final class TcpNatTable`](#class-TcpNatTable)
  - [`init()`](#TcpNatTable.init)
  - [`func Session(for key: TcpKey) -> TcpSession?`](#TcpNatTable.Session)
  - [`func Insert(_ session: TcpSession)`](#TcpNatTable.Insert)
  - [`func Remove(_ key: TcpKey)`](#TcpNatTable.Remove)
- [`final class TcpSession`](#class-TcpSession)
  - [`init(key: TcpKey, clientMac: [uint8], clientIp: [uint8], initialGuestSeq: uint32)`](#TcpSession.init)
  - [`let Key: TcpKey`](#TcpSession.Key)
  - [`let ClientMac: [uint8]`](#TcpSession.ClientMac)
  - [`let ClientIp: [uint8]`](#TcpSession.ClientIp)
  - [`var GuestSeq: uint32`](#TcpSession.GuestSeq)
  - [`var NatSeq: uint32`](#TcpSession.NatSeq)
  - [`var Stream: tcp.TcpStream? = nil`](#TcpSession.Stream)
  - [`var Closed: bool = false`](#TcpSession.Closed)
  - [`let Lock = sync.Mutex()`](#TcpSession.Lock)
  - [`var Mss: int = 1460`](#TcpSession.Mss)
  - [`var Window: int = 65535`](#TcpSession.Window)
  - [`var Acked: uint32`](#TcpSession.Acked)
- [`struct UdpKey: Hashable, Equatable`](#struct-UdpKey)
  - [`init(guestPort: uint16, remoteIp: Ipv4Address, remotePort: uint16)`](#UdpKey.init)
  - [`var GuestPort: uint16`](#UdpKey.GuestPort)
  - [`var RemoteIp: Ipv4Address`](#UdpKey.RemoteIp)
  - [`var RemotePort: uint16`](#UdpKey.RemotePort)
- [`final class UdpNatTable`](#class-UdpNatTable)
  - [`init()`](#UdpNatTable.init)
  - [`func Session(for key: UdpKey) -> UdpSession?`](#UdpNatTable.Session)
  - [`func Insert(_ session: UdpSession)`](#UdpNatTable.Insert)
- [`final class UdpSession`](#class-UdpSession)
  - [`init(key: UdpKey, clientMac: [uint8], clientIp: [uint8], socket: udp.UdpSocket, config: NatConfig, port: NatPort)`](#UdpSession.init)
  - [`let Key: UdpKey`](#UdpSession.Key)
  - [`let ClientMac: [uint8]`](#UdpSession.ClientMac)
  - [`let ClientIp: [uint8]`](#UdpSession.ClientIp)
  - [`let Socket: udp.UdpSocket`](#UdpSession.Socket)
  - [`let Config: NatConfig`](#UdpSession.Config)
  - [`let Port: NatPort`](#UdpSession.Port)
  - [`func StartReceiveLoop()`](#UdpSession.StartReceiveLoop)
  - [`func Send(_ payload: [uint8])`](#UdpSession.Send)

## Functions

### func HandleArp <a id="func-HandleArp"></a>

```vertex
public func HandleArp(packet: ArpPacket, config: NatConfig) -> [uint8]?
```

### func HandleDhcp <a id="func-HandleDhcp"></a>

```vertex
public func HandleDhcp(udpPayload: [uint8], clientMac: [uint8], config: NatConfig) -> [uint8]?
```

### func HandleDnsQuery <a id="func-HandleDnsQuery"></a>

```vertex
public func HandleDnsQuery(
    payload: [uint8],
    clientMac: [uint8],
    clientIp: [uint8],
    clientPort: uint16,
    dnsServerIp: [uint8],
    config: NatConfig,
    port: NatPort
)
```

### func HandleGeneralUdp <a id="func-HandleGeneralUdp"></a>

```vertex
public func HandleGeneralUdp(
    ipPacket: [uint8],
    clientMac: [uint8],
    udpTable: UdpNatTable,
    config: NatConfig,
    port: NatPort
)
```

### func HandleIcmp <a id="func-HandleIcmp"></a>

```vertex
public func HandleIcmp(
    ipPacket: [uint8],
    clientMac: [uint8],
    config: NatConfig
) -> [uint8]?
```

### func HandleTcp <a id="func-HandleTcp"></a>

```vertex
public func HandleTcp(
    ipPacket: [uint8],
    clientMac: [uint8],
    tcpTable: TcpNatTable,
    config: NatConfig,
    port: NatPort
)
```

### func InternetChecksum <a id="func-InternetChecksum"></a>

```vertex
public func InternetChecksum(_ data: [uint8], initialSum: uint32 = 0) -> uint16
```

Computes the 16-bit one's complement Internet checksum (RFC 1071).

### func PseudoHeaderChecksum <a id="func-PseudoHeaderChecksum"></a>

```vertex
public func PseudoHeaderChecksum(srcIp: [uint8], dstIp: [uint8], proto: uint8, length: uint16) -> uint32
```

Computes the TCP or UDP pseudo-header checksum.

### func SendTcpPacket <a id="func-SendTcpPacket"></a>

```vertex
public func SendTcpPacket(
    session: TcpSession,
    flags: uint8,
    payload: [uint8],
    config: NatConfig,
    port: NatPort,
    seq: uint32? = nil
)
```

One segment to the guest, `seq` its first sequence number. A SYN
carries an MSS option, as the guest's MTU wants.

## Types

### struct ArpPacket <a id="struct-ArpPacket"></a>

```vertex
public struct ArpPacket
```

#### Initializers

<a id="ArpPacket.init"></a>

```vertex
public init(
    HwType: uint16,
    ProtoType: uint16,
    HwSize: uint8,
    ProtoSize: uint8,
    Opcode: uint16,
    SenderMac: [uint8],
    SenderIp: [uint8],
    TargetMac: [uint8],
    TargetIp: [uint8]
)
```

#### Properties

<a id="ArpPacket.HwType"></a>

```vertex
public var HwType: uint16
```

<a id="ArpPacket.ProtoType"></a>

```vertex
public var ProtoType: uint16
```

<a id="ArpPacket.HwSize"></a>

```vertex
public var HwSize: uint8
```

<a id="ArpPacket.ProtoSize"></a>

```vertex
public var ProtoSize: uint8
```

<a id="ArpPacket.Opcode"></a>

```vertex
public var Opcode: uint16
```

<a id="ArpPacket.SenderMac"></a>

```vertex
public var SenderMac: [uint8]
```

<a id="ArpPacket.SenderIp"></a>

```vertex
public var SenderIp: [uint8]
```

<a id="ArpPacket.TargetMac"></a>

```vertex
public var TargetMac: [uint8]
```

<a id="ArpPacket.TargetIp"></a>

```vertex
public var TargetIp: [uint8]
```

#### Methods

<a id="ArpPacket.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) -> ArpPacket?
```

<a id="ArpPacket.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

### struct DhcpPacket <a id="struct-DhcpPacket"></a>

```vertex
public struct DhcpPacket
```

#### Properties

<a id="DhcpPacket.Op"></a>

```vertex
public var Op: uint8
```

<a id="DhcpPacket.Htype"></a>

```vertex
public var Htype: uint8
```

<a id="DhcpPacket.Hlen"></a>

```vertex
public var Hlen: uint8
```

<a id="DhcpPacket.Hops"></a>

```vertex
public var Hops: uint8
```

<a id="DhcpPacket.Xid"></a>

```vertex
public var Xid: uint32
```

<a id="DhcpPacket.Secs"></a>

```vertex
public var Secs: uint16
```

<a id="DhcpPacket.Flags"></a>

```vertex
public var Flags: uint16
```

<a id="DhcpPacket.Ciaddr"></a>

```vertex
public var Ciaddr: [uint8]
```

<a id="DhcpPacket.Yiaddr"></a>

```vertex
public var Yiaddr: [uint8]
```

<a id="DhcpPacket.Siaddr"></a>

```vertex
public var Siaddr: [uint8]
```

<a id="DhcpPacket.Giaddr"></a>

```vertex
public var Giaddr: [uint8]
```

<a id="DhcpPacket.Chaddr"></a>

```vertex
public var Chaddr: [uint8]
```

<a id="DhcpPacket.Options"></a>

```vertex
public var Options: [uint8]
```

<a id="DhcpPacket.MessageType"></a>

```vertex
public var MessageType: uint8
```

#### Methods

<a id="DhcpPacket.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) -> DhcpPacket?
```

<a id="DhcpPacket.BuildResponse"></a>

```vertex
public static func BuildResponse(
    request: DhcpPacket,
    config: NatConfig,
    isAck: bool
) -> [uint8]
```

### class DnsWorker <a id="class-DnsWorker"></a>

```vertex
public final class DnsWorker
```

#### Initializers

<a id="DnsWorker.init"></a>

```vertex
public init(
    payload: [uint8],
    clientMac: [uint8],
    clientIp: [uint8],
    clientPort: uint16,
    dnsServerIp: [uint8],
    config: NatConfig,
    port: NatPort
)
```

#### Methods

<a id="DnsWorker.Run"></a>

```vertex
public func Run() async
```

### struct EthernetFrame <a id="struct-EthernetFrame"></a>

```vertex
public struct EthernetFrame
```

#### Initializers

<a id="EthernetFrame.init"></a>

```vertex
public init(DstMac: [uint8], SrcMac: [uint8], EtherType: uint16, Payload: [uint8])
```

#### Properties

<a id="EthernetFrame.DstMac"></a>

```vertex
public var DstMac: [uint8]
```

<a id="EthernetFrame.SrcMac"></a>

```vertex
public var SrcMac: [uint8]
```

<a id="EthernetFrame.EtherType"></a>

```vertex
public var EtherType: uint16
```

<a id="EthernetFrame.Payload"></a>

```vertex
public var Payload: [uint8]
```

#### Methods

<a id="EthernetFrame.Parse"></a>

```vertex
public static func Parse(_ bytes: [uint8]) -> EthernetFrame?
```

<a id="EthernetFrame.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

### struct Ipv4Address <a id="struct-Ipv4Address"></a>

```vertex
public struct Ipv4Address: Equatable, Hashable, CustomStringConvertible
```

#### Initializers

<a id="Ipv4Address.init"></a>

```vertex
public init(_ b0: uint8, _ b1: uint8, _ b2: uint8, _ b3: uint8)
```

<a id="Ipv4Address.init-2"></a>

```vertex
public init(_ bytes: [uint8])
```

#### Properties

<a id="Ipv4Address.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

<a id="Ipv4Address.description"></a>

```vertex
public var description: string { get }
```

<a id="Ipv4Address.any"></a>

```vertex
public static let any = Ipv4Address(0, 0, 0, 0)
```

<a id="Ipv4Address.broadcast"></a>

```vertex
public static let broadcast = Ipv4Address(255, 255, 255, 255)
```

### struct NatConfig <a id="struct-NatConfig"></a>

```vertex
public struct NatConfig
```

#### Initializers

<a id="NatConfig.init"></a>

```vertex
public init(
    gatewayMac: ether.Mac = ether.Mac([0x52, 0x54, 0x00, 0x12, 0x34, 0x01]),
    gatewayIp: Ipv4Address = Ipv4Address(192, 168, 127, 1),
    guestIp: Ipv4Address = Ipv4Address(192, 168, 127, 2),
    subnetMask: Ipv4Address = Ipv4Address(255, 255, 255, 0),
    dnsServers: [Ipv4Address] = [Ipv4Address(1, 1, 1, 1), Ipv4Address(8, 8, 8, 8)]
)
```

#### Properties

<a id="NatConfig.GatewayMac"></a>

```vertex
public var GatewayMac: ether.Mac
```

<a id="NatConfig.GatewayIp"></a>

```vertex
public var GatewayIp: Ipv4Address
```

<a id="NatConfig.GuestIp"></a>

```vertex
public var GuestIp: Ipv4Address
```

<a id="NatConfig.SubnetMask"></a>

```vertex
public var SubnetMask: Ipv4Address
```

<a id="NatConfig.DnsServers"></a>

```vertex
public var DnsServers: [Ipv4Address]
```

<a id="NatConfig.default"></a>

```vertex
public static let `default` = NatConfig()
```

### class NatPort <a id="class-NatPort"></a>

```vertex
public final class NatPort: ether.Port
```

#### Initializers

<a id="NatPort.init"></a>

```vertex
public init(config: NatConfig = .default)
```

#### Properties

<a id="NatPort.Config"></a>

```vertex
public let Config: NatConfig
```

#### Methods

<a id="NatPort.Enqueue"></a>

```vertex
public func Enqueue(_ frame: [uint8])
```

<a id="NatPort.Receive"></a>

```vertex
public func Receive() async throws -> [uint8]
```

<a id="NatPort.Send"></a>

```vertex
public func Send(_ frame: [uint8]) async throws
```

### struct TcpKey <a id="struct-TcpKey"></a>

```vertex
public struct TcpKey: Hashable, Equatable
```

#### Initializers

<a id="TcpKey.init"></a>

```vertex
public init(guestPort: uint16, remoteIp: Ipv4Address, remotePort: uint16)
```

#### Properties

<a id="TcpKey.GuestPort"></a>

```vertex
public var GuestPort: uint16
```

<a id="TcpKey.RemoteIp"></a>

```vertex
public var RemoteIp: Ipv4Address
```

<a id="TcpKey.RemotePort"></a>

```vertex
public var RemotePort: uint16
```

### class TcpNatTable <a id="class-TcpNatTable"></a>

```vertex
public final class TcpNatTable
```

#### Initializers

<a id="TcpNatTable.init"></a>

```vertex
public init()
```

#### Methods

<a id="TcpNatTable.Session"></a>

```vertex
public func Session(for key: TcpKey) -> TcpSession?
```

<a id="TcpNatTable.Insert"></a>

```vertex
public func Insert(_ session: TcpSession)
```

<a id="TcpNatTable.Remove"></a>

```vertex
public func Remove(_ key: TcpKey)
```

### class TcpSession <a id="class-TcpSession"></a>

```vertex
public final class TcpSession
```

#### Initializers

<a id="TcpSession.init"></a>

```vertex
public init(key: TcpKey, clientMac: [uint8], clientIp: [uint8], initialGuestSeq: uint32)
```

#### Properties

<a id="TcpSession.Key"></a>

```vertex
public let Key: TcpKey
```

<a id="TcpSession.ClientMac"></a>

```vertex
public let ClientMac: [uint8]
```

<a id="TcpSession.ClientIp"></a>

```vertex
public let ClientIp: [uint8]
```

<a id="TcpSession.GuestSeq"></a>

```vertex
public var GuestSeq: uint32
```

The next sequence number expected from the guest.

<a id="TcpSession.NatSeq"></a>

```vertex
public var NatSeq: uint32
```

The next sequence number this side sends.

<a id="TcpSession.Stream"></a>

```vertex
public var Stream: tcp.TcpStream? = nil
```

<a id="TcpSession.Closed"></a>

```vertex
public var Closed: bool = false
```

<a id="TcpSession.Lock"></a>

```vertex
public let Lock = sync.Mutex()
```

<a id="TcpSession.Mss"></a>

```vertex
public var Mss: int = 1460
```

The largest segment the guest takes (its SYN's MSS option).

<a id="TcpSession.Window"></a>

```vertex
public var Window: int = 65535
```

The guest's receive window, unscaled (no window scaling is agreed).

<a id="TcpSession.Acked"></a>

```vertex
public var Acked: uint32
```

The first byte the guest hasn't acknowledged.

### struct UdpKey <a id="struct-UdpKey"></a>

```vertex
public struct UdpKey: Hashable, Equatable
```

#### Initializers

<a id="UdpKey.init"></a>

```vertex
public init(guestPort: uint16, remoteIp: Ipv4Address, remotePort: uint16)
```

#### Properties

<a id="UdpKey.GuestPort"></a>

```vertex
public var GuestPort: uint16
```

<a id="UdpKey.RemoteIp"></a>

```vertex
public var RemoteIp: Ipv4Address
```

<a id="UdpKey.RemotePort"></a>

```vertex
public var RemotePort: uint16
```

### class UdpNatTable <a id="class-UdpNatTable"></a>

```vertex
public final class UdpNatTable
```

#### Initializers

<a id="UdpNatTable.init"></a>

```vertex
public init()
```

#### Methods

<a id="UdpNatTable.Session"></a>

```vertex
public func Session(for key: UdpKey) -> UdpSession?
```

<a id="UdpNatTable.Insert"></a>

```vertex
public func Insert(_ session: UdpSession)
```

### class UdpSession <a id="class-UdpSession"></a>

```vertex
public final class UdpSession
```

#### Initializers

<a id="UdpSession.init"></a>

```vertex
public init(
    key: UdpKey,
    clientMac: [uint8],
    clientIp: [uint8],
    socket: udp.UdpSocket,
    config: NatConfig,
    port: NatPort
)
```

#### Properties

<a id="UdpSession.Key"></a>

```vertex
public let Key: UdpKey
```

<a id="UdpSession.ClientMac"></a>

```vertex
public let ClientMac: [uint8]
```

<a id="UdpSession.ClientIp"></a>

```vertex
public let ClientIp: [uint8]
```

<a id="UdpSession.Socket"></a>

```vertex
public let Socket: udp.UdpSocket
```

<a id="UdpSession.Config"></a>

```vertex
public let Config: NatConfig
```

<a id="UdpSession.Port"></a>

```vertex
public let Port: NatPort
```

#### Methods

<a id="UdpSession.StartReceiveLoop"></a>

```vertex
public func StartReceiveLoop()
```

<a id="UdpSession.Send"></a>

```vertex
public func Send(_ payload: [uint8])
```

## Files

- arp.vs
- checksum.vs
- dhcp.vs
- dns.vs
- icmp.vs
- port.vs
- tcp.vs
- types.vs
- udp.vs
