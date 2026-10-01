# package tcp

```vertex
import "net/tcp"
```

## Index

- [`func Connect(_ address: string, timeoutMs: int32 = 5000) async throws -> TcpStream`](#func-Connect)
- [`func Connect(host: string, port: uint16, timeoutMs: int32 = 5000) async throws -> TcpStream`](#func-Connect-2)
- [`func Connect(address: SocketAddress, timeoutMs: int32 = 5000) async throws -> TcpStream`](#func-Connect-3)
- [`func Listen(_ address: string, options: ListenerOptions = .default) throws -> TcpListener`](#func-Listen)
- [`func Listen(host: string = "0.0.0.0", port: uint16, options: ListenerOptions = .default) throws -> TcpListener`](#func-Listen-2)
- [`func Listen(address: SocketAddress, options: ListenerOptions = .default) throws -> TcpListener`](#func-Listen-3)
- [`func Resolve(host: string, port: uint16) throws -> [SocketAddress]`](#func-Resolve)
- [`struct ListenerOptions`](#struct-ListenerOptions)
  - [`init()`](#ListenerOptions.init)
  - [`var Backlog: int32 = 1024`](#ListenerOptions.Backlog)
  - [`var ReuseAddress: bool = true`](#ListenerOptions.ReuseAddress)
  - [`var ReusePort: bool = true`](#ListenerOptions.ReusePort)
  - [``static let `default` = ListenerOptions()``](#ListenerOptions.default)
- [`enum ShutdownMode`](#enum-ShutdownMode)
- [`enum SocketAddress`](#enum-SocketAddress)
  - [`static func Parse(_ text: string) throws -> SocketAddress`](#SocketAddress.Parse)
  - [`static func IPv4(_ a: uint8, _ b: uint8, _ c: uint8, _ d: uint8, port: uint16) -> SocketAddress`](#SocketAddress.IPv4)
  - [`func (a: borrowing SocketAddress) Host() -> string`](#SocketAddress.Host)
  - [`func (a: borrowing SocketAddress) Port() -> uint16`](#SocketAddress.Port)
  - [`func (a: borrowing SocketAddress) ToString() -> string`](#SocketAddress.ToString)
- [`enum TcpError: Error`](#enum-TcpError)
  - [`var Message: string { get }`](#TcpError.Message)
- [`struct TcpListener`](#struct-TcpListener)
  - [`let LocalAddress: SocketAddress`](#TcpListener.LocalAddress)
  - [`let SocketFd: int32`](#TcpListener.SocketFd)
  - [`var AcceptTimeoutMs: int32 = 0`](#TcpListener.AcceptTimeoutMs)
  - [`var Options: ListenerOptions = .default`](#TcpListener.Options)
  - [`func (l: borrowing TcpListener) Accept() async throws -> TcpStream`](#TcpListener.Accept)
  - [`func (l: borrowing TcpListener) Serve(_ handler: @escaping (TcpStream) async -> Void) async throws`](#TcpListener.Serve)
  - [`func (l: inout TcpListener) SetAcceptTimeout(ms: int32)`](#TcpListener.SetAcceptTimeout)
  - [`func (l: consuming TcpListener) Close()`](#TcpListener.Close)
- [`struct TcpStream`](#struct-TcpStream)
  - [`init(SocketFd: int32, ReadTimeoutMs: int32 = 0, WriteTimeoutMs: int32 = 0)`](#TcpStream.init)
  - [`init(LocalAddress: SocketAddress, PeerAddress: SocketAddress, SocketFd: int32, ReadTimeoutMs: int32 = 0, WriteTimeoutMs: int32 = 0)`](#TcpStream.init-2)
  - [`let SocketFd: int32`](#TcpStream.SocketFd)
  - [`var ReadTimeoutMs: int32 = 0`](#TcpStream.ReadTimeoutMs)
  - [`var WriteTimeoutMs: int32 = 0`](#TcpStream.WriteTimeoutMs)
  - [`var LocalAddress: SocketAddress { get }`](#TcpStream.LocalAddress)
  - [`var PeerAddress: SocketAddress { get }`](#TcpStream.PeerAddress)
  - [`func (s: borrowing TcpStream) Read(into buffer: inout [uint8]) async throws -> int`](#TcpStream.Read)
  - [`func (s: borrowing TcpStream) Read(into buffer: inout [uint8], at offset: int) async throws -> int`](#TcpStream.Read-2)
  - [`func (s: borrowing TcpStream) ReadFull(into buffer: inout [uint8]) async throws`](#TcpStream.ReadFull)
  - [`func (s: borrowing TcpStream) ReadToEnd(limit: int = 8 * 1024 * 1024) async throws -> [uint8]`](#TcpStream.ReadToEnd)
  - [`func (s: borrowing TcpStream) Write(_ data: borrowing [uint8]) async throws`](#TcpStream.Write)
  - [`func (s: borrowing TcpStream) Flush()`](#TcpStream.Flush)
  - [`func (s: borrowing TcpStream) Write(_ data: borrowing ArraySlice<uint8>) async throws`](#TcpStream.Write-2)
  - [`func (s: borrowing TcpStream) WriteText(_ text: string) async throws`](#TcpStream.WriteText)
  - [`func (s: inout TcpStream) SetReadTimeout(ms: int32)`](#TcpStream.SetReadTimeout)
  - [`func (s: inout TcpStream) SetWriteTimeout(ms: int32)`](#TcpStream.SetWriteTimeout)
  - [`func (s: borrowing TcpStream) Shutdown(_ how: ShutdownMode) throws`](#TcpStream.Shutdown)
  - [`func (s: consuming TcpStream) Close()`](#TcpStream.Close)
  - [`func (s: borrowing TcpStream) SetNoDelay(_ enabled: bool) throws`](#TcpStream.SetNoDelay)
  - [`func (s: borrowing TcpStream) SetKeepAlive(_ enabled: bool, idleSecs: int32 = 60) throws`](#TcpStream.SetKeepAlive)
  - [`func (s: borrowing TcpStream) SetBufferSizes(receive: int32, send: int32) throws`](#TcpStream.SetBufferSizes)

## Functions

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ address: string, timeoutMs: int32 = 5000) async throws -> TcpStream
```

Connects to an address written as text: "example.com:80", "127.0.0.1:8080".

### func Connect <a id="func-Connect-2"></a>

```vertex
public func Connect(host: string, port: uint16, timeoutMs: int32 = 5000) async throws -> TcpStream
```

Connects to a host and port.

The host may be a name, and resolving it stops the thread rather than
the task; see `Resolve`. The connection itself does not: it waits the
way every other operation here does.

### func Connect <a id="func-Connect-3"></a>

```vertex
public func Connect(address: SocketAddress, timeoutMs: int32 = 5000) async throws -> TcpStream
```

Connects to an address that has already been parsed or resolved.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ address: string,
                   options: ListenerOptions = .default) throws -> TcpListener
```

Listens on an address written as text: "127.0.0.1:8080", ":8080" for
every interface, "[::1]:9000", or a port of 0 to be given a free one.

### func Listen <a id="func-Listen-2"></a>

```vertex
public func Listen(host: string = "0.0.0.0", port: uint16,
                   options: ListenerOptions = .default) throws -> TcpListener
```

Listens on a host and port.

### func Listen <a id="func-Listen-3"></a>

```vertex
public func Listen(address: SocketAddress,
                   options: ListenerOptions = .default) throws -> TcpListener
```

Listens on an address that has already been parsed.

### func Resolve <a id="func-Resolve"></a>

```vertex
public func Resolve(host: string, port: uint16) throws -> [SocketAddress]
```

Every address a host name resolves to, for this port, in the order the
resolver gave them -- which is the order to try connecting in.

This is the one call in the package that stops the thread rather than
the task: the platform's resolver is blocking and there is nothing to
wait on. A server that cannot afford to stall should resolve before it
starts serving.

## Types

### struct ListenerOptions <a id="struct-ListenerOptions"></a>

```vertex
public struct ListenerOptions
```

How a listener's socket is set up, for the cases where the defaults
are not what is wanted.

#### Initializers

<a id="ListenerOptions.init"></a>

```vertex
public init()
```

#### Properties

<a id="ListenerOptions.Backlog"></a>

```vertex
public var Backlog: int32 = 1024
```

How many connections the kernel holds before it starts refusing.

<a id="ListenerOptions.ReuseAddress"></a>

```vertex
public var ReuseAddress: bool = true
```

Lets the address be bound again while an old connection is still
winding down, so a server can restart at once. On by default.

<a id="ListenerOptions.ReusePort"></a>

```vertex
public var ReusePort: bool = true
```

Lets several sockets bind the same address, for running more than
one acceptor. On by default for multi-worker concurrency.

<a id="ListenerOptions.default"></a>

```vertex
public static let `default` = ListenerOptions()
```

What `Listen` uses when it is not given anything else.

### enum ShutdownMode <a id="enum-ShutdownMode"></a>

```vertex
public enum ShutdownMode
```

Which half of a connection `Shutdown` closes.

#### Cases

<a id="ShutdownMode.read"></a>

```vertex
case read
```

<a id="ShutdownMode.write"></a>

```vertex
case write
```

<a id="ShutdownMode.both"></a>

```vertex
case both
```

### enum SocketAddress <a id="enum-SocketAddress"></a>

```vertex
public enum SocketAddress
```

SocketAddress is a host and a port.

The host is held as it was written. An IPv6 address is the v6 case and
prints in brackets; anything else -- a dotted IPv4 address, or a name
like "localhost" -- is the v4 case. A name is not resolved here: it is
resolved when it is connected to or listened on, or by `Resolve`.

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
"[::1]:9000". A bare IPv6 address must be bracketed, so that its
last group is not read as a port.

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

The address as it is written: "host:port", and "[host]:port" for IPv6.

### enum TcpError <a id="enum-TcpError"></a>

```vertex
public enum TcpError: Error
```

TcpError is every way an operation in this package fails.

Each case carries what was being attempted, because the same failure
means different things in different places: "connection refused" wants
to name the address that refused it, and "timed out" the read that
waited. `Message` is that, formatted.

#### Cases

<a id="TcpError.connectionRefused"></a>

```vertex
case connectionRefused(string)
```

Nothing was listening at the address.

<a id="TcpError.timedOut"></a>

```vertex
case timedOut(string)
```

A deadline set on the operation passed before it could finish.

<a id="TcpError.connectionReset"></a>

```vertex
case connectionReset(string)
```

The peer reset the connection.

<a id="TcpError.addressInUse"></a>

```vertex
case addressInUse(string)
```

The address is already bound by another socket.

<a id="TcpError.networkUnreachable"></a>

```vertex
case networkUnreachable(string)
```

There is no route to the address.

<a id="TcpError.brokenPipe"></a>

```vertex
case brokenPipe(string)
```

The peer closed the connection and this end went on writing.

<a id="TcpError.invalidAddress"></a>

```vertex
case invalidAddress(string)
```

The text is not an address, or names a host that did not resolve.

<a id="TcpError.limitExceeded"></a>

```vertex
case limitExceeded(limit: int, context: string)
```

The stream held more than the caller was willing to read.

<a id="TcpError.unexpectedEnd"></a>

```vertex
case unexpectedEnd(string)
```

The stream ended in the middle of something that had to be whole.

<a id="TcpError.systemError"></a>

```vertex
case systemError(code: int32, context: string)
```

Anything else, with the number the operating system reported.

#### Properties

<a id="TcpError.Message"></a>

```vertex
public var Message: string { get }
```

A sentence naming what failed and what was being attempted.

### struct TcpListener <a id="struct-TcpListener"></a>

```vertex
public struct TcpListener
```

A socket accepting incoming connections.

Binding is immediate, so `Listen` is an ordinary function. Waiting for
a connection is not, so `Accept` is `async`.

#### Properties

<a id="TcpListener.LocalAddress"></a>

```vertex
public let LocalAddress: SocketAddress
```

The address bound, with the port the kernel chose if 0 was asked for.

<a id="TcpListener.SocketFd"></a>

```vertex
public let SocketFd: int32
```

The socket, for code that has to reach past this package.

<a id="TcpListener.AcceptTimeoutMs"></a>

```vertex
public var AcceptTimeoutMs: int32 = 0
```

How long `Accept` waits for a connection before it throws
`timedOut`. 0 waits for as long as it takes, which is the default.

<a id="TcpListener.Options"></a>

```vertex
public var Options: ListenerOptions = .default
```

Options used when binding the listener.

#### Methods

<a id="TcpListener.Accept"></a>

```vertex
public func (l: borrowing TcpListener) Accept() async throws -> TcpStream
```

Waits for the next connection and returns it.

On a task this parks that task, so a server that spawns a task per
connection goes on accepting while the others are still talking.

<a id="TcpListener.Serve"></a>

```vertex
public func (l: borrowing TcpListener) Serve(
    _ handler: @escaping (TcpStream) async -> Void) async throws
```

Accepts connections for as long as the listener is open, running
`handler` on a task of its own for each one.

This is the shape most servers want: accepting carries on while the
handlers run, and one slow client holds up only itself. The handler
owns the stream it is given and is responsible for closing it.

Each connection's task is started on the runtime's pool
(`Task.detached`), which hands them to the workers in turn: a
connection lives on one executor, whose kqueue watches its socket and
whose thread runs everything it does, and the connections are spread
over every core. That is what Go's and tokio's servers do with one
listener, and it does not depend on the kernel.

Where the kernel balances `SO_REUSEPORT` (Linux), and the listener was
bound with it, `Serve` also binds a listener per worker, so accepting
is spread as well and a connection's task starts on the executor that
accepted it. Darwin gives every connection to one socket, so there the
extra listeners would only sit idle, and they are not made.

`Serve` returns only by throwing, which is what a listener that has
been closed, or an accept that failed for good, does.

<a id="TcpListener.SetAcceptTimeout"></a>

```vertex
public func (l: inout TcpListener) SetAcceptTimeout(ms: int32)
```

Sets how long `Accept` waits before it throws `timedOut`. 0 waits for
as long as it takes.

<a id="TcpListener.Close"></a>

```vertex
public func (l: consuming TcpListener) Close()
```

Stops listening. Connections already accepted are not affected.

### struct TcpStream <a id="struct-TcpStream"></a>

```vertex
public struct TcpStream
```

A connected TCP socket: a reliable byte stream, readable and writable
at the same time.

Every operation that can wait is `async`, because in Vertex only an
async function can give up its thread. Reading and writing are written
the way blocking code is, with `await` where the waiting happens:

```vertex
let n = try await stream.Read(into: &buffer)
try await stream.Write(buffer[0..<n])
```

The socket underneath is non-blocking, and the wait is the runtime's:
on a task it parks that task and the executor runs the others.

Closing and the socket options do not wait, so they are not async.

A stream does not close itself. Close it, or hand it to something that
will: `defer { stream.Close() }` is the usual shape.

Conforms by extension to: `io.AsyncReader, io.AsyncWriter`

#### Initializers

<a id="TcpStream.init"></a>

```vertex
public init(SocketFd: int32, ReadTimeoutMs: int32 = 0, WriteTimeoutMs: int32 = 0)
```

<a id="TcpStream.init-2"></a>

```vertex
public init(LocalAddress: SocketAddress, PeerAddress: SocketAddress, SocketFd: int32,
            ReadTimeoutMs: int32 = 0, WriteTimeoutMs: int32 = 0)
```

#### Properties

<a id="TcpStream.SocketFd"></a>

```vertex
public let SocketFd: int32
```

The socket, for code that has to reach past this package.

<a id="TcpStream.ReadTimeoutMs"></a>

```vertex
public var ReadTimeoutMs: int32 = 0
```

How long a read waits for the first byte before it gives up, in
milliseconds. 0 waits for as long as it takes, which is the default.

<a id="TcpStream.WriteTimeoutMs"></a>

```vertex
public var WriteTimeoutMs: int32 = 0
```

How long a write waits for the socket to take more, in
milliseconds. 0 waits for as long as it takes.

<a id="TcpStream.LocalAddress"></a>

```vertex
public var LocalAddress: SocketAddress { get }
```

The address this end is bound to.

<a id="TcpStream.PeerAddress"></a>

```vertex
public var PeerAddress: SocketAddress { get }
```

The address at the other end.

#### Methods

<a id="TcpStream.Read"></a>

```vertex
public func (s: borrowing TcpStream) Read(into buffer: inout [uint8]) async throws -> int
```

Reads whatever has arrived, up to `buffer.count` bytes, and is how
many that was. 0 means the peer has closed its end: there will be no
more, and reading again will keep returning 0.

It waits for the first byte and then returns with what is there, which
is what a byte stream gives you. Use `ReadFull` to insist on a number
of bytes, and `ReadToEnd` to read the rest.

<a id="TcpStream.Read-2"></a>

```vertex
public func (s: borrowing TcpStream) Read(into buffer: inout [uint8], at offset: int) async throws -> int
```

Reads into `buffer` from `offset` on, up to its end, and is how many
bytes that was: `Read(into:)` for a buffer that is partly full, so
that a parser can keep what it has and read more after it.

<a id="TcpStream.ReadFull"></a>

```vertex
public func (s: borrowing TcpStream) ReadFull(into buffer: inout [uint8]) async throws
```

Reads until `buffer` is full, and throws `unexpectedEnd` if the stream
closes before it is.

<a id="TcpStream.ReadToEnd"></a>

```vertex
public func (s: borrowing TcpStream) ReadToEnd(limit: int = 8 * 1024 * 1024) async throws -> [uint8]
```

Reads until the peer closes its end, and is everything that arrived.

`limit` is there so that a peer cannot make this allocate without
end: passing it means the stream held more, and what had been read is
dropped.

<a id="TcpStream.Write"></a>

```vertex
public func (s: borrowing TcpStream) Write(_ data: borrowing [uint8]) async throws
```

Writes every byte, and returns when they have all been handed to the
kernel. It is the write you almost always want: a socket may take
fewer bytes than it was offered, and this keeps going until none are
left.

<a id="TcpStream.Flush"></a>

```vertex
public func (s: borrowing TcpStream) Flush()
```

Nothing: a stream keeps no buffer of its own, so every Write has been
handed to the kernel when it returns. It is here so that a TcpStream is
an io.AsyncWriter; wrap it in io.AsyncBufferedWriter to gather writes.

<a id="TcpStream.Write-2"></a>

```vertex
public func (s: borrowing TcpStream) Write(_ data: borrowing ArraySlice<uint8>) async throws
```

Writes part of a buffer: `stream.Write(buffer[0..<n])`.

<a id="TcpStream.WriteText"></a>

```vertex
public func (s: borrowing TcpStream) WriteText(_ text: string) async throws
```

Writes text as UTF-8.

<a id="TcpStream.SetReadTimeout"></a>

```vertex
public func (s: inout TcpStream) SetReadTimeout(ms: int32)
```

Sets how long a read waits before it throws `timedOut`. 0 waits for as
long as it takes.

The deadline is this package's, not the socket's: it is how long the
wait for readiness waits. That is the only kind that works on a task,
where the socket itself must never block.

<a id="TcpStream.SetWriteTimeout"></a>

```vertex
public func (s: inout TcpStream) SetWriteTimeout(ms: int32)
```

Sets how long a write waits before it throws `timedOut`.

<a id="TcpStream.Shutdown"></a>

```vertex
public func (s: borrowing TcpStream) Shutdown(_ how: ShutdownMode) throws
```

Closes one half of the connection, leaving the other open. Shutting
down writing sends the peer the end of the stream while this end goes
on reading its reply, which is how a request that has no length ends.

<a id="TcpStream.Close"></a>

```vertex
public func (s: consuming TcpStream) Close()
```

Closes the socket. The stream is consumed, so nothing can read from it
afterwards.

<a id="TcpStream.SetNoDelay"></a>

```vertex
public func (s: borrowing TcpStream) SetNoDelay(_ enabled: bool) throws
```

Sends small writes straight away rather than letting the kernel
collect them (TCP_NODELAY). Worth it for request/response traffic,
where waiting to fill a packet is latency for nothing.

<a id="TcpStream.SetKeepAlive"></a>

```vertex
public func (s: borrowing TcpStream) SetKeepAlive(_ enabled: bool, idleSecs: int32 = 60) throws
```

Sends keepalive probes on an idle connection, so that a peer that went
away without closing is noticed.

<a id="TcpStream.SetBufferSizes"></a>

```vertex
public func (s: borrowing TcpStream) SetBufferSizes(receive: int32, send: int32) throws
```

Sets the kernel's receive and send buffer sizes in bytes. 0 leaves one
of them as it is.

## Files

- address.vs
- error.vs
- io.vs
- listener.vs
- sock.vs
- stream.vs
