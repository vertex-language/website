# package udp

```vertex
import "net/udp"
```

## Index

- [`func Bind(_ address: string, options: SocketOptions = .default) throws -> UdpSocket`](#func-Bind)
- [`func Bind(host: string = "0.0.0.0", port: uint16, options: SocketOptions = .default) throws -> UdpSocket`](#func-Bind-2)
- [`func Bind(address: SocketAddress, options: SocketOptions = .default) throws -> UdpSocket`](#func-Bind-3)
- [`func GetNetworkInterfaces() throws -> [NetworkInterface]`](#func-GetNetworkInterfaces)
- [`func Resolve(host: string, port: uint16) throws -> [SocketAddress]`](#func-Resolve)
- [`struct NetworkInterface`](#struct-NetworkInterface)
  - [`init(name: string, ip: string, isIPv6: bool, isUp: bool, isLoopback: bool, isPointToPoint: bool)`](#NetworkInterface.init)
  - [`var Name: string`](#NetworkInterface.Name)
  - [`var IP: string`](#NetworkInterface.IP)
  - [`var IsIPv6: bool`](#NetworkInterface.IsIPv6)
  - [`var IsUp: bool`](#NetworkInterface.IsUp)
  - [`var IsLoopback: bool`](#NetworkInterface.IsLoopback)
  - [`var IsPointToPoint: bool`](#NetworkInterface.IsPointToPoint)
  - [`func Address(port: uint16 = 0) -> SocketAddress`](#NetworkInterface.Address)
- [`enum SocketAddress`](#enum-SocketAddress)
  - [`static func Parse(_ text: string) throws -> SocketAddress`](#SocketAddress.Parse)
  - [`static func IPv4(_ a: uint8, _ b: uint8, _ c: uint8, _ d: uint8, port: uint16) -> SocketAddress`](#SocketAddress.IPv4)
  - [`func (a: borrowing SocketAddress) Host() -> string`](#SocketAddress.Host)
  - [`func (a: borrowing SocketAddress) Port() -> uint16`](#SocketAddress.Port)
  - [`func (a: borrowing SocketAddress) ToString() -> string`](#SocketAddress.ToString)
- [`struct SocketOptions`](#struct-SocketOptions)
  - [`init()`](#SocketOptions.init)
  - [`var ReuseAddress: bool = true`](#SocketOptions.ReuseAddress)
  - [`var ReusePort: bool = false`](#SocketOptions.ReusePort)
  - [``static let `default` = SocketOptions()``](#SocketOptions.default)
- [`enum UdpError: Error`](#enum-UdpError)
  - [`var Message: string { get }`](#UdpError.Message)
- [`struct UdpSocket`](#struct-UdpSocket)
  - [`let SocketFd: int32`](#UdpSocket.SocketFd)
  - [`var ReadTimeoutMs: int32 = 0`](#UdpSocket.ReadTimeoutMs)
  - [`var WriteTimeoutMs: int32 = 0`](#UdpSocket.WriteTimeoutMs)
  - [`var LocalAddress: SocketAddress { get }`](#UdpSocket.LocalAddress)
  - [`func (s: borrowing UdpSocket) ReceiveFrom(into buffer: inout [uint8]) async throws -> (int, SocketAddress)`](#UdpSocket.ReceiveFrom)
  - [`func (s: borrowing UdpSocket) Receive(into buffer: inout [uint8]) async throws -> int`](#UdpSocket.Receive)
  - [`func (s: borrowing UdpSocket) SendTo(_ data: borrowing [uint8], to address: SocketAddress) async throws -> int`](#UdpSocket.SendTo)
  - [`func (s: borrowing UdpSocket) SendTo(_ data: borrowing [uint8], to address: string) async throws -> int`](#UdpSocket.SendTo-2)
  - [`func (s: borrowing UdpSocket) SendTo(_ data: borrowing ArraySlice<uint8>, to address: SocketAddress) async throws -> int`](#UdpSocket.SendTo-3)
  - [`func (s: borrowing UdpSocket) SendText(_ text: string, to address: SocketAddress) async throws -> int`](#UdpSocket.SendText)
  - [`func (s: borrowing UdpSocket) SendText(_ text: string, to address: string) async throws -> int`](#UdpSocket.SendText-2)
  - [`func (s: borrowing UdpSocket) Send(_ data: borrowing [uint8]) async throws -> int`](#UdpSocket.Send)
  - [`func (s: borrowing UdpSocket) SendText(_ text: string) async throws -> int`](#UdpSocket.SendText-3)
  - [`func (s: inout UdpSocket) Connect(_ address: string) throws`](#UdpSocket.Connect)
  - [`func (s: inout UdpSocket) Connect(to address: SocketAddress) throws`](#UdpSocket.Connect-2)
  - [`func (s: inout UdpSocket) Disconnect() throws`](#UdpSocket.Disconnect)
  - [`func (s: borrowing UdpSocket) PeerAddress() -> SocketAddress?`](#UdpSocket.PeerAddress)
  - [`func (s: inout UdpSocket) SetReadTimeout(ms: int32)`](#UdpSocket.SetReadTimeout)
  - [`func (s: inout UdpSocket) SetWriteTimeout(ms: int32)`](#UdpSocket.SetWriteTimeout)
  - [`func (s: borrowing UdpSocket) SetBroadcast(_ enabled: bool) throws`](#UdpSocket.SetBroadcast)
  - [`func (s: borrowing UdpSocket) SetBufferSizes(receive: int32, send: int32) throws`](#UdpSocket.SetBufferSizes)
  - [`func (s: borrowing UdpSocket) SetTTL(_ ttl: int32) throws`](#UdpSocket.SetTTL)
  - [`func (s: borrowing UdpSocket) JoinMulticast(group: string, interface: string? = nil) throws`](#UdpSocket.JoinMulticast)
  - [`func (s: borrowing UdpSocket) LeaveMulticast(group: string, interface: string? = nil) throws`](#UdpSocket.LeaveMulticast)
  - [`func (s: borrowing UdpSocket) SetMulticastLoopback(_ enabled: bool) throws`](#UdpSocket.SetMulticastLoopback)
  - [`func (s: borrowing UdpSocket) SetMulticastTTL(_ ttl: int32) throws`](#UdpSocket.SetMulticastTTL)
  - [`func (s: consuming UdpSocket) Close()`](#UdpSocket.Close)

## Functions

### func Bind <a id="func-Bind"></a>

```vertex
public func Bind(_ address: string,
                 options: SocketOptions = .default) throws -> UdpSocket
```

Binds a UDP socket on an address written as text: "127.0.0.1:8080", ":9000",
or a port of 0 to request an ephemeral port from the kernel.

### func Bind <a id="func-Bind-2"></a>

```vertex
public func Bind(host: string = "0.0.0.0", port: uint16,
                 options: SocketOptions = .default) throws -> UdpSocket
```

Binds a UDP socket on a specific host and port.

### func Bind <a id="func-Bind-3"></a>

```vertex
public func Bind(address: SocketAddress,
                 options: SocketOptions = .default) throws -> UdpSocket
```

Binds a UDP socket on an already parsed address.

### func GetNetworkInterfaces <a id="func-GetNetworkInterfaces"></a>

```vertex
public func GetNetworkInterfaces() throws -> [NetworkInterface]
```

GetNetworkInterfaces enumerates all active network interfaces and IP addresses on this host.

### func Resolve <a id="func-Resolve"></a>

```vertex
public func Resolve(host: string, port: uint16) throws -> [SocketAddress]
```

Resolves host to datagram addresses for port.

## Types

### struct NetworkInterface <a id="struct-NetworkInterface"></a>

```vertex
public struct NetworkInterface
```

NetworkInterface represents an active local network adapter and its IP address.

#### Initializers

<a id="NetworkInterface.init"></a>

```vertex
public init(name: string, ip: string, isIPv6: bool, isUp: bool, isLoopback: bool, isPointToPoint: bool)
```

#### Properties

<a id="NetworkInterface.Name"></a>

```vertex
public var Name: string
```

<a id="NetworkInterface.IP"></a>

```vertex
public var IP: string
```

<a id="NetworkInterface.IsIPv6"></a>

```vertex
public var IsIPv6: bool
```

<a id="NetworkInterface.IsUp"></a>

```vertex
public var IsUp: bool
```

<a id="NetworkInterface.IsLoopback"></a>

```vertex
public var IsLoopback: bool
```

<a id="NetworkInterface.IsPointToPoint"></a>

```vertex
public var IsPointToPoint: bool
```

#### Methods

<a id="NetworkInterface.Address"></a>

```vertex
public func Address(port: uint16 = 0) -> SocketAddress
```

### enum SocketAddress <a id="enum-SocketAddress"></a>

```vertex
public enum SocketAddress
```

SocketAddress is a host and a port.

#### Cases

<a id="SocketAddress.v4"></a>

```vertex
case v4(ip: string, port: uint16)
```

<a id="SocketAddress.v6"></a>

```vertex
case v6(ip: string, port: uint16)
```

#### Methods

<a id="SocketAddress.Parse"></a>

```vertex
public static func Parse(_ text: string) throws -> SocketAddress
```

Reads "127.0.0.1:8080", ":8080" (any interface), "localhost:80", or
"[::1]:9000". A bare IPv6 address must be bracketed.

<a id="SocketAddress.IPv4"></a>

```vertex
public static func IPv4(_ a: uint8, _ b: uint8, _ c: uint8, _ d: uint8,
                        port: uint16) -> SocketAddress
```

An IPv4 address from its four octets.

<a id="SocketAddress.Host"></a>

```vertex
public func (a: borrowing SocketAddress) Host() -> string
```

The host, without the port, as it was written.

<a id="SocketAddress.Port"></a>

```vertex
public func (a: borrowing SocketAddress) Port() -> uint16
```

The port, whichever family the address is.

<a id="SocketAddress.ToString"></a>

```vertex
public func (a: borrowing SocketAddress) ToString() -> string
```

The address as written: "host:port", and "[host]:port" for IPv6.

### struct SocketOptions <a id="struct-SocketOptions"></a>

```vertex
public struct SocketOptions
```

Socket configuration options for binding.

#### Initializers

<a id="SocketOptions.init"></a>

```vertex
public init()
```

#### Properties

<a id="SocketOptions.ReuseAddress"></a>

```vertex
public var ReuseAddress: bool = true
```

Lets the address be bound again while an old socket is still winding down.

<a id="SocketOptions.ReusePort"></a>

```vertex
public var ReusePort: bool = false
```

Lets several sockets bind the same port.

<a id="SocketOptions.default"></a>

```vertex
public static let `default` = SocketOptions()
```

### enum UdpError <a id="enum-UdpError"></a>

```vertex
public enum UdpError: Error
```

UdpError is every way an operation in this package fails.

#### Cases

<a id="UdpError.connectionRefused"></a>

```vertex
case connectionRefused(string)
```

Nothing was listening at the address or target rejected packet.

<a id="UdpError.timedOut"></a>

```vertex
case timedOut(string)
```

A deadline set on the operation passed before it could finish.

<a id="UdpError.connectionReset"></a>

```vertex
case connectionReset(string)
```

The peer reset the connection (for connected UDP sockets).

<a id="UdpError.addressInUse"></a>

```vertex
case addressInUse(string)
```

The address is already bound by another socket.

<a id="UdpError.networkUnreachable"></a>

```vertex
case networkUnreachable(string)
```

There is no route to the address.

<a id="UdpError.brokenPipe"></a>

```vertex
case brokenPipe(string)
```

The peer closed the socket.

<a id="UdpError.invalidAddress"></a>

```vertex
case invalidAddress(string)
```

The text is not an address, or names a host that did not resolve.

<a id="UdpError.datagramTooLarge"></a>

```vertex
case datagramTooLarge(string)
```

The datagram is too large for the network interface MTU.

<a id="UdpError.notConnected"></a>

```vertex
case notConnected(string)
```

The operation requires a connected socket.

<a id="UdpError.systemError"></a>

```vertex
case systemError(code: int32, context: string)
```

Anything else, with the number the operating system reported.

#### Properties

<a id="UdpError.Message"></a>

```vertex
public var Message: string { get }
```

A formatted sentence naming what failed.

### struct UdpSocket <a id="struct-UdpSocket"></a>

```vertex
public struct UdpSocket
```

A UDP datagram socket for connectionless or connected packet communication.

#### Properties

<a id="UdpSocket.SocketFd"></a>

```vertex
public let SocketFd: int32
```

The underlying OS socket file descriptor.

<a id="UdpSocket.ReadTimeoutMs"></a>

```vertex
public var ReadTimeoutMs: int32 = 0
```

Millisecond timeout for receive operations (0 waits indefinitely).

<a id="UdpSocket.WriteTimeoutMs"></a>

```vertex
public var WriteTimeoutMs: int32 = 0
```

Millisecond timeout for send operations (0 waits indefinitely).

<a id="UdpSocket.LocalAddress"></a>

```vertex
public var LocalAddress: SocketAddress { get }
```

The local address this socket is bound to.

#### Methods

<a id="UdpSocket.ReceiveFrom"></a>

```vertex
public func (s: borrowing UdpSocket) ReceiveFrom(
    into buffer: inout [uint8]) async throws -> (int, SocketAddress)
```

Receives a datagram into buffer. Returns the number of bytes read and the
sender's remote address.

<a id="UdpSocket.Receive"></a>

```vertex
public func (s: borrowing UdpSocket) Receive(into buffer: inout [uint8]) async throws -> int
```

Receives a datagram on a connected UDP socket.

<a id="UdpSocket.SendTo"></a>

```vertex
public func (s: borrowing UdpSocket) SendTo(
    _ data: borrowing [uint8], to address: SocketAddress) async throws -> int
```

Sends a datagram to target address.

<a id="UdpSocket.SendTo-2"></a>

```vertex
public func (s: borrowing UdpSocket) SendTo(
    _ data: borrowing [uint8], to address: string) async throws -> int
```

Sends a datagram to an address string: "127.0.0.1:9000".

<a id="UdpSocket.SendTo-3"></a>

```vertex
public func (s: borrowing UdpSocket) SendTo(
    _ data: borrowing ArraySlice<uint8>, to address: SocketAddress) async throws -> int
```

Sends a slice of bytes to target address.

<a id="UdpSocket.SendText"></a>

```vertex
public func (s: borrowing UdpSocket) SendText(
    _ text: string, to address: SocketAddress) async throws -> int
```

Sends UTF-8 text to target address.

<a id="UdpSocket.SendText-2"></a>

```vertex
public func (s: borrowing UdpSocket) SendText(
    _ text: string, to address: string) async throws -> int
```

Sends UTF-8 text to an address string: "127.0.0.1:9000".

<a id="UdpSocket.Send"></a>

```vertex
public func (s: borrowing UdpSocket) Send(_ data: borrowing [uint8]) async throws -> int
```

Sends a datagram to the connected peer.

<a id="UdpSocket.SendText-3"></a>

```vertex
public func (s: borrowing UdpSocket) SendText(_ text: string) async throws -> int
```

Sends UTF-8 text to the connected peer.

<a id="UdpSocket.Connect"></a>

```vertex
public func (s: inout UdpSocket) Connect(_ address: string) throws
```

Connects this UDP socket to a remote host and port.

<a id="UdpSocket.Connect-2"></a>

```vertex
public func (s: inout UdpSocket) Connect(to address: SocketAddress) throws
```

Connects this UDP socket to a parsed SocketAddress.

<a id="UdpSocket.Disconnect"></a>

```vertex
public func (s: inout UdpSocket) Disconnect() throws
```

Disconnects this UDP socket, clearing the default peer.

<a id="UdpSocket.PeerAddress"></a>

```vertex
public func (s: borrowing UdpSocket) PeerAddress() -> SocketAddress?
```

Returns the peer address if connected.

<a id="UdpSocket.SetReadTimeout"></a>

```vertex
public func (s: inout UdpSocket) SetReadTimeout(ms: int32)
```

Sets read timeout in milliseconds (0 waits indefinitely).

<a id="UdpSocket.SetWriteTimeout"></a>

```vertex
public func (s: inout UdpSocket) SetWriteTimeout(ms: int32)
```

Sets write timeout in milliseconds (0 waits indefinitely).

<a id="UdpSocket.SetBroadcast"></a>

```vertex
public func (s: borrowing UdpSocket) SetBroadcast(_ enabled: bool) throws
```

Enables or disables broadcast transmission (SO_BROADCAST).

<a id="UdpSocket.SetBufferSizes"></a>

```vertex
public func (s: borrowing UdpSocket) SetBufferSizes(receive: int32, send: int32) throws
```

Configures OS socket receive and send buffer sizes.

<a id="UdpSocket.SetTTL"></a>

```vertex
public func (s: borrowing UdpSocket) SetTTL(_ ttl: int32) throws
```

Sets the IP Time-To-Live (TTL) field for outgoing datagrams.

<a id="UdpSocket.JoinMulticast"></a>

```vertex
public func (s: borrowing UdpSocket) JoinMulticast(
    group: string, interface: string? = nil) throws
```

Joins a multicast group on the specified interface (or default interface if nil).

<a id="UdpSocket.LeaveMulticast"></a>

```vertex
public func (s: borrowing UdpSocket) LeaveMulticast(
    group: string, interface: string? = nil) throws
```

Leaves a multicast group.

<a id="UdpSocket.SetMulticastLoopback"></a>

```vertex
public func (s: borrowing UdpSocket) SetMulticastLoopback(_ enabled: bool) throws
```

Controls whether multicast packets are looped back to the local socket.

<a id="UdpSocket.SetMulticastTTL"></a>

```vertex
public func (s: borrowing UdpSocket) SetMulticastTTL(_ ttl: int32) throws
```

Sets the TTL for outgoing multicast packets.

<a id="UdpSocket.Close"></a>

```vertex
public func (s: consuming UdpSocket) Close()
```

Closes the socket descriptor. Consumes the socket.

## Files

- address.vs
- error.vs
- interfaces.vs
- sock.vs
- socket.vs
