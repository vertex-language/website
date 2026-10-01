# package signal

```vertex
import "os/signal"
```

## Index

- [`func Listen(_ kinds: Kind...) throws -> Listener`](#func-Listen)
- [`func Wait(_ kinds: Kind...) async throws -> Kind`](#func-Wait)
- [`enum Kind: Equatable`](#enum-Kind)
  - [`var Code: int32 { get }`](#Kind.Code)
- [`final class Listener`](#class-Listener)
  - [`func Next() async -> Kind?`](#Listener.Next)
  - [`func Close()`](#Listener.Close)
- [`enum SignalError: Error, CustomStringConvertible`](#enum-SignalError)
  - [`var description: string { get }`](#SignalError.description)

## Functions

### func Listen <a id="func-Listen"></a>

```vertex
public func Listen(_ kinds: Kind...) throws -> Listener
```

A listener for the given signals.

### func Wait <a id="func-Wait"></a>

```vertex
public func Wait(_ kinds: Kind...) async throws -> Kind
```

Waits for one of the given signals, and returns which came. Ctrl-C does
not end the process while this waits: this is how a program asks for it
instead.

```vertex
try await signal.Wait(.interrupt)
```

## Types

### enum Kind <a id="enum-Kind"></a>

```vertex
public enum Kind: Equatable
```

A signal, by what it means rather than its number.

#### Cases

<a id="Kind.interrupt"></a>

```vertex
case interrupt
```

Ctrl-C: SIGINT, or CTRL_C_EVENT and CTRL_BREAK_EVENT on Windows.

<a id="Kind.terminate"></a>

```vertex
case terminate
```

A request to stop: SIGTERM, or the console closing or the system
shutting down on Windows.

<a id="Kind.hangup"></a>

```vertex
case hangup
```

The terminal went away: SIGHUP, or CTRL_LOGOFF_EVENT on Windows.

<a id="Kind.windowResize"></a>

```vertex
case windowResize
```

The terminal changed size: SIGWINCH.

<a id="Kind.posix"></a>

```vertex
case posix(int32)
```

Any other POSIX signal, by number. Not on Windows.

#### Properties

<a id="Kind.Code"></a>

```vertex
public var Code: int32 { get }
```

The portable number for the kind (sys.cpp's Sig), and 0 for `.posix`.

### class Listener <a id="class-Listener"></a>

```vertex
public final class Listener
```

Listener receives the signals it was made for, in the order they came,
until it is closed. While any listener wants a signal, the signal's
default action -- ending the process -- does not happen; it comes back
when the last listener for it closes.

```vertex
let stop = try signal.Listen(.interrupt, .terminate)
while let s = await stop.Next() {
    server.Shutdown()
    break
}
```

#### Methods

<a id="Listener.Next"></a>

```vertex
public func Next() async -> Kind?
```

The next signal, waiting for one; nil once the listener is closed.

<a id="Listener.Close"></a>

```vertex
public func Close()
```

Stops listening. The default action of any signal nobody listens
for any more comes back.

### enum SignalError <a id="enum-SignalError"></a>

```vertex
public enum SignalError: Error, CustomStringConvertible
```

SignalError is how listening for a signal fails.

#### Cases

<a id="SignalError.unsupported"></a>

```vertex
case unsupported(Kind)
```

`.posix(n)` can be sent (`Child.Signal`) but not listened for yet.

<a id="SignalError.system"></a>

```vertex
case system(code: int32)
```

#### Properties

<a id="SignalError.description"></a>

```vertex
public var description: string { get }
```

## Files

- signal.vs
