# package sys

```vertex
import "os/sys"
```

## Index

- [`func Blob(_ items: [string]) -> [CChar]`](#func-Blob)
- [`func Bytes(_ s: string) -> [uint8]`](#func-Bytes)
- [`func Close(_ fd: int32) -> int32`](#func-Close)
- [`func Fill(_ call: (UnsafeMutablePointer<CChar>?, int32) -> int32) -> Filled`](#func-Fill)
- [`func FlushStdio()`](#func-FlushStdio)
- [`func LastError() -> int32`](#func-LastError)
- [`func Pollable() -> bool`](#func-Pollable)
- [`func Read(_ fd: int32, _ buf: UnsafeMutableRawPointer, _ count: int64) -> int64`](#func-Read)
- [`func Text(_ bytes: [uint8], from start: int, to end: int) -> string`](#func-Text)
- [`func WaitFd(_ fd: int32, _ events: int32) -> int32`](#func-WaitFd)
- [`func Write(_ fd: int32, _ buf: UnsafeRawPointer, _ count: int64) -> int64`](#func-Write)
- [`func vertex_task_wait_fd(_ fd: int32, _ events: int32, _ timeoutNanos: int64) async -> int32`](#func-vertex_task_wait_fd)
- [`enum Code`](#enum-Code)
  - [`static let ok: int32 = Err.ok`](#Code.ok)
  - [`static let generic: int32 = Err.generic`](#Code.generic)
  - [`static let notFound: int32 = Err.notFound`](#Code.notFound)
  - [`static let permission: int32 = Err.permission`](#Code.permission)
  - [`static let invalid: int32 = Err.invalid`](#Code.invalid)
  - [`static let wouldBlock: int32 = Err.wouldBlock`](#Code.wouldBlock)
  - [`static let unsupported: int32 = Err.unsupported`](#Code.unsupported)
  - [`static let noMemory: int32 = Err.noMemory`](#Code.noMemory)
  - [`static let interrupted: int32 = Err.interrupted`](#Code.interrupted)
  - [`static let brokenPipe: int32 = Err.brokenPipe`](#Code.brokenPipe)
  - [`static let notATerminal: int32 = Err.notATerminal`](#Code.notATerminal)
- [`struct Filled`](#struct-Filled)
  - [`init(Text: string?, Code: int32)`](#Filled.init)
  - [`let Text: string?`](#Filled.Text)
  - [`let Code: int32`](#Filled.Code)

## Functions

### func Blob <a id="func-Blob"></a>

```vertex
public func Blob(_ items: [string]) -> [CChar]
```

Blob lays strings end to end, each NUL-terminated, as process.cpp's spawn takes
its arguments and environment.

### func Bytes <a id="func-Bytes"></a>

```vertex
public func Bytes(_ s: string) -> [uint8]
```

Bytes is a string's UTF-8.

### func Close <a id="func-Close"></a>

```vertex
public func Close(_ fd: int32) -> int32
```

### func Fill <a id="func-Fill"></a>

```vertex
public func Fill(_ call: (UnsafeMutablePointer<CChar>?, int32) -> int32) -> Filled
```

Fill calls a C++ function that fills a buffer and returns the length
the whole value needs, growing the buffer until it fits.

### func FlushStdio <a id="func-FlushStdio"></a>

```vertex
public func FlushStdio()
```

FlushStdio writes out what C stdio holds for stdout and stderr, so that
a write straight to fd 1 or 2 comes after print's output.

### func LastError <a id="func-LastError"></a>

```vertex
public func LastError() -> int32
```

LastError is the last OS error code: errno, or GetLastError on Windows.

### func Pollable <a id="func-Pollable"></a>

```vertex
public func Pollable() -> bool
```

Pollable reports whether descriptors the os packages hand out can be
waited on through the runtime. Where not (Windows), reads and waits
block the thread.

### func Read <a id="func-Read"></a>

```vertex
public func Read(_ fd: int32, _ buf: UnsafeMutableRawPointer, _ count: int64) -> int64
```

Read is non-blocking where Pollable: Code.wouldBlock when nothing is
ready. 0 is the end of the stream.

### func Text <a id="func-Text"></a>

```vertex
public func Text(_ bytes: [uint8], from start: int, to end: int) -> string
```

Text is the bytes from start up to end as a string.

### func WaitFd <a id="func-WaitFd"></a>

```vertex
public func WaitFd(_ fd: int32, _ events: int32) -> int32
```

WaitFd holds the thread until fd can be read (events 1) or written (2).

### func Write <a id="func-Write"></a>

```vertex
public func Write(_ fd: int32, _ buf: UnsafeRawPointer, _ count: int64) -> int64
```

### func vertex_task_wait_fd <a id="func-vertex_task_wait_fd"></a>

```vertex
@_silgen_name("vertex_task_wait_fd")
public func vertex_task_wait_fd(_ fd: int32, _ events: int32, _ timeoutNanos: int64) async -> int32
```

The runtime's wait: parks the task until fd can be read (1) or written
(2). 1 ready, 0 timed out. Outside a task the thread waits.

## Types

### enum Code <a id="enum-Code"></a>

```vertex
public enum Code
```

Code is the error codes every os call returns, negative, as sys.cpp's
Err has them.

#### Properties

<a id="Code.ok"></a>

```vertex
public static let ok: int32 = Err.ok
```

<a id="Code.generic"></a>

```vertex
public static let generic: int32 = Err.generic
```

<a id="Code.notFound"></a>

```vertex
public static let notFound: int32 = Err.notFound
```

<a id="Code.permission"></a>

```vertex
public static let permission: int32 = Err.permission
```

<a id="Code.invalid"></a>

```vertex
public static let invalid: int32 = Err.invalid
```

<a id="Code.wouldBlock"></a>

```vertex
public static let wouldBlock: int32 = Err.wouldBlock
```

<a id="Code.unsupported"></a>

```vertex
public static let unsupported: int32 = Err.unsupported
```

<a id="Code.noMemory"></a>

```vertex
public static let noMemory: int32 = Err.noMemory
```

<a id="Code.interrupted"></a>

```vertex
public static let interrupted: int32 = Err.interrupted
```

<a id="Code.brokenPipe"></a>

```vertex
public static let brokenPipe: int32 = Err.brokenPipe
```

<a id="Code.notATerminal"></a>

```vertex
public static let notATerminal: int32 = Err.notATerminal
```

### struct Filled <a id="struct-Filled"></a>

```vertex
public struct Filled
```

Filled is what a buffer-filling os call gave back: the text, or the
negative code it failed with.

#### Initializers

<a id="Filled.init"></a>

```vertex
public init(Text: string?, Code: int32)
```

#### Properties

<a id="Filled.Text"></a>

```vertex
public let Text: string?
```

<a id="Filled.Code"></a>

```vertex
public let Code: int32
```

## Files

- sys.vs
- text.vs
