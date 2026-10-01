# package unix

```vertex
import "net/unix"
```

Package unix is stream sockets named by a path on the local machine:
for talking to another process (a daemon, a helper like swtpm) without
a TCP port any local user could reach. Files and permissions guard them.

The shape is net/tcp's: every operation that can wait is async, and the
wait parks the task, not the thread.

```vertex
var s = try await unix.Connect("/tmp/swtpm.sock")
defer { s.Close() }
try await s.Write(request)
try await s.ReadFull(into: &reply)
```

## Index

- [`func Connect(_ path: string, timeoutMs: int32 = 5000) async throws -> UnixStream`](#func-Connect)
- [`func Listen(_ path: string, backlog: int32 = 16, removeStale: bool = false) throws -> UnixListener`](#func-Listen)
- [`enum ShutdownMode`](#enum-ShutdownMode)
- [`enum UnixError: Error`](#enum-UnixError)
  - [`var Message: string { get }`](#UnixError.Message)
- [`struct UnixListener`](#struct-UnixListener)
  - [`init(SocketFd: int32, Path: string)`](#UnixListener.init)
  - [`let SocketFd: int32`](#UnixListener.SocketFd)
  - [`let Path: string`](#UnixListener.Path)
  - [`func (l: borrowing UnixListener) Accept() async throws -> UnixStream`](#UnixListener.Accept)
  - [`func (l: consuming UnixListener) Close()`](#UnixListener.Close)
- [`struct UnixStream`](#struct-UnixStream)
  - [`init(SocketFd: int32, Path: string)`](#UnixStream.init)
  - [`let SocketFd: int32`](#UnixStream.SocketFd)
  - [`let Path: string`](#UnixStream.Path)
  - [`var ReadTimeoutMs: int32 = 0`](#UnixStream.ReadTimeoutMs)
  - [`var WriteTimeoutMs: int32 = 0`](#UnixStream.WriteTimeoutMs)
  - [`func (s: borrowing UnixStream) Read(into buffer: inout [uint8]) async throws -> int`](#UnixStream.Read)
  - [`func (s: borrowing UnixStream) ReadFull(into buffer: inout [uint8]) async throws`](#UnixStream.ReadFull)
  - [`func (s: borrowing UnixStream) Write(_ data: borrowing [uint8]) async throws`](#UnixStream.Write)
  - [`func (s: borrowing UnixStream) Shutdown(_ how: ShutdownMode) throws`](#UnixStream.Shutdown)
  - [`func (s: consuming UnixStream) Close()`](#UnixStream.Close)

## Functions

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ path: string, timeoutMs: int32 = 5000) async throws -> UnixStream
```

Connects to the socket at `path`.

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ path: string, backlog: int32 = 16, removeStale: bool = false) throws -> UnixListener
```

Listens at `path`. The path must be free: `removeStale` first deletes
a socket file a previous listener left behind.

## Types

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

### enum UnixError <a id="enum-UnixError"></a>

```vertex
public enum UnixError: Error
```

Every way an operation in this package fails, with what was being done.

#### Cases

<a id="UnixError.connectionRefused"></a>

```vertex
case connectionRefused(string)
```

A socket file is there, but nothing is accepting on it.

<a id="UnixError.notFound"></a>

```vertex
case notFound(string)
```

No socket file at the path.

<a id="UnixError.addressInUse"></a>

```vertex
case addressInUse(string)
```

The path is taken: a socket or file is already there.

<a id="UnixError.permissionDenied"></a>

```vertex
case permissionDenied(string)
```

<a id="UnixError.connectionReset"></a>

```vertex
case connectionReset(string)
```

<a id="UnixError.brokenPipe"></a>

```vertex
case brokenPipe(string)
```

<a id="UnixError.pathTooLong"></a>

```vertex
case pathTooLong(string)
```

Longer than a socket address holds (about 100 bytes).

<a id="UnixError.timedOut"></a>

```vertex
case timedOut(string)
```

<a id="UnixError.unexpectedEnd"></a>

```vertex
case unexpectedEnd(string)
```

The stream ended in the middle of something that had to be whole.

<a id="UnixError.systemError"></a>

```vertex
case systemError(code: int32, context: string)
```

#### Properties

<a id="UnixError.Message"></a>

```vertex
public var Message: string { get }
```

### struct UnixListener <a id="struct-UnixListener"></a>

```vertex
public struct UnixListener
```

A socket listening at a path.

#### Initializers

<a id="UnixListener.init"></a>

```vertex
public init(SocketFd: int32, Path: string)
```

#### Properties

<a id="UnixListener.SocketFd"></a>

```vertex
public let SocketFd: int32
```

<a id="UnixListener.Path"></a>

```vertex
public let Path: string
```

#### Methods

<a id="UnixListener.Accept"></a>

```vertex
public func (l: borrowing UnixListener) Accept() async throws -> UnixStream
```

Waits for the next connection.

<a id="UnixListener.Close"></a>

```vertex
public func (l: consuming UnixListener) Close()
```

Stops listening and removes the socket file.

### struct UnixStream <a id="struct-UnixStream"></a>

```vertex
public struct UnixStream
```

A connected Unix-domain stream socket.

A stream does not close itself: `defer { stream.Close() }`.

#### Initializers

<a id="UnixStream.init"></a>

```vertex
public init(SocketFd: int32, Path: string)
```

#### Properties

<a id="UnixStream.SocketFd"></a>

```vertex
public let SocketFd: int32
```

The socket, for code that has to reach past this package.

<a id="UnixStream.Path"></a>

```vertex
public let Path: string
```

The path this stream was connected to, or accepted on.

<a id="UnixStream.ReadTimeoutMs"></a>

```vertex
public var ReadTimeoutMs: int32 = 0
```

How long a read waits for the first byte, in milliseconds; 0 waits
for as long as it takes.

<a id="UnixStream.WriteTimeoutMs"></a>

```vertex
public var WriteTimeoutMs: int32 = 0
```

#### Methods

<a id="UnixStream.Read"></a>

```vertex
public func (s: borrowing UnixStream) Read(into buffer: inout [uint8]) async throws -> int
```

Reads what has arrived, up to `buffer.count` bytes; 0 means the peer
closed its end.

<a id="UnixStream.ReadFull"></a>

```vertex
public func (s: borrowing UnixStream) ReadFull(into buffer: inout [uint8]) async throws
```

Reads until `buffer` is full; throws `unexpectedEnd` if the stream
closes first.

<a id="UnixStream.Write"></a>

```vertex
public func (s: borrowing UnixStream) Write(_ data: borrowing [uint8]) async throws
```

Writes every byte.

<a id="UnixStream.Shutdown"></a>

```vertex
public func (s: borrowing UnixStream) Shutdown(_ how: ShutdownMode) throws
```

<a id="UnixStream.Close"></a>

```vertex
public func (s: consuming UnixStream) Close()
```

## Files

- unix.vs
