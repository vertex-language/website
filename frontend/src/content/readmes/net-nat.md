# net/nat

User-space NAT for a VM's Ethernet port (`nat.NatPort`, an `ether.Port`): ARP, ICMP echo, DHCP, a DNS proxy, UDP, and TCP relayed through host sockets — segmented to the guest's MSS, sent within its window, retransmitted when its ACKs are slow, written to the host in order, half-closes passed on. No root, no TUN/TAP.

```vertex
import "net/nat"
```

## Types

- **`ArpPacket`** (struct)
- **`DhcpPacket`** (struct)
- **`DnsWorker`** (class)
- **`NatPort`** (class)
- **`TcpKey`** (struct)
- **`TcpSession`** (class)
- **`TcpNatTable`** (class)
- **`Ipv4Address`** (struct)
- **`NatConfig`** (struct)
- **`EthernetFrame`** (struct)
- and 3 more

## Functions

- `func HandleArp(packet: ArpPacket, config: NatConfig) -> [uint8]?`
- `func InternetChecksum(_ data: [uint8], initialSum: uint32 = 0) -> uint16`: Computes the 16-bit one's complement Internet checksum (RFC 1071).
- `func PseudoHeaderChecksum(srcIp: [uint8], dstIp: [uint8], proto: uint8, length: uint16) -> uint32`: Computes the TCP or UDP pseudo-header checksum.
- `func HandleDhcp(udpPayload: [uint8], clientMac: [uint8], config: NatConfig) -> [uint8]?`
- `func HandleDnsQuery( payload: [uint8], clientMac: [uint8], clientIp: [uint8], clientPort: uint16, dnsServerIp: [uint8], config: NatConfig, port: NatPort )`
- `func HandleIcmp( ipPacket: [uint8], clientMac: [uint8], config: NatConfig ) -> [uint8]?`
- `func SendTcpPacket( session: TcpSession, flags: uint8, payload: [uint8], config: NatConfig, port: NatPort, seq: uint32? = nil )`: One segment to the guest, `seq` its first sequence number. A SYN carries an MSS option, as the guest's MTU wants.
- `func HandleTcp( ipPacket: [uint8], clientMac: [uint8], tcpTable: TcpNatTable, config: NatConfig, port: NatPort )`
- `func HandleGeneralUdp( ipPacket: [uint8], clientMac: [uint8], udpTable: UdpNatTable, config: NatConfig, port: NatPort )`

Part of the [`net`](https://github.com/vertex-language/net) repository.
