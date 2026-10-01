# package time

```vertex
import "time"
```

## Index

- [`func Sleep(_ duration: Duration)`](#func-Sleep)
- [`func Sleep(_ duration: Duration) async throws`](#func-Sleep-2)
- [`func Sleep(until deadline: Instant)`](#func-Sleep-3)
- [`func Sleep(until deadline: Instant) async throws`](#func-Sleep-4)
- [`struct Duration: Hashable, Comparable, CustomStringConvertible`](#struct-Duration)
  - [`static let Zero = Duration(nanos: 0)`](#Duration.Zero)
  - [`var description: string { get }`](#Duration.description)
  - [`static func Nanoseconds(_ n: int64) -> Duration`](#Duration.Nanoseconds)
  - [`static func Microseconds(_ n: int64) -> Duration`](#Duration.Microseconds)
  - [`static func Milliseconds(_ n: int64) -> Duration`](#Duration.Milliseconds)
  - [`static func Seconds(_ n: int64) -> Duration`](#Duration.Seconds)
  - [`static func Minutes(_ n: int64) -> Duration`](#Duration.Minutes)
  - [`static func Hours(_ n: int64) -> Duration`](#Duration.Hours)
  - [`func AsNanoseconds() -> int64`](#Duration.AsNanoseconds)
  - [`func AsMicroseconds() -> int64`](#Duration.AsMicroseconds)
  - [`func AsMilliseconds() -> int64`](#Duration.AsMilliseconds)
  - [`func AsSeconds() -> double`](#Duration.AsSeconds)
  - [`func Abs() -> Duration`](#Duration.Abs)
  - [`static func + (a: Duration, b: Duration) -> Duration`](#Duration.op43)
  - [`static func - (a: Duration, b: Duration) -> Duration`](#Duration.op45)
  - [`static prefix func - (d: Duration) -> Duration`](#Duration.op45-2)
  - [`static func * (d: Duration, n: int64) -> Duration`](#Duration.op42)
  - [`static func * (n: int64, d: Duration) -> Duration`](#Duration.op42-2)
  - [`static func / (d: Duration, n: int64) -> Duration`](#Duration.op47)
  - [`static func < (a: Duration, b: Duration) -> bool`](#Duration.op60)
  - [`static func Parse(_ text: string) throws -> Duration`](#Duration.Parse)
- [`struct Instant: Hashable, Comparable`](#struct-Instant)
  - [`static func Now() -> Instant`](#Instant.Now)
  - [`func Elapsed() -> Duration`](#Instant.Elapsed)
  - [`static func + (i: Instant, d: Duration) -> Instant`](#Instant.op43)
  - [`static func - (i: Instant, d: Duration) -> Instant`](#Instant.op45)
  - [`static func - (a: Instant, b: Instant) -> Duration`](#Instant.op45-2)
  - [`static func < (a: Instant, b: Instant) -> bool`](#Instant.op60)
- [`enum TimeError: Error`](#enum-TimeError)
  - [`var Message: string { get }`](#TimeError.Message)
- [`struct Timestamp: Hashable, Comparable, CustomStringConvertible`](#struct-Timestamp)
  - [`init(unixSeconds: int64, nanoseconds: int64 = 0)`](#Timestamp.init)
  - [`let UnixSeconds: int64`](#Timestamp.UnixSeconds)
  - [`let Nanoseconds: int32`](#Timestamp.Nanoseconds)
  - [`static let UnixEpoch = Timestamp(unixSeconds: 0)`](#Timestamp.UnixEpoch)
  - [`var description: string { get }`](#Timestamp.description)
  - [`static func Now() -> Timestamp`](#Timestamp.Now)
  - [`static func UnixMilliseconds(_ ms: int64) -> Timestamp`](#Timestamp.UnixMilliseconds)
  - [`static func UTC(_ year: int64, _ month: int64, _ day: int64, _ hour: int64 = 0, _ minute: int64 = 0, _ second: int64 = 0, nanosecond: int64 = 0) -> Timestamp`](#Timestamp.UTC)
  - [`func AsUnixMilliseconds() -> int64`](#Timestamp.AsUnixMilliseconds)
  - [`static func + (t: Timestamp, d: Duration) -> Timestamp`](#Timestamp.op43)
  - [`static func - (t: Timestamp, d: Duration) -> Timestamp`](#Timestamp.op45)
  - [`static func - (a: Timestamp, b: Timestamp) -> Duration`](#Timestamp.op45-2)
  - [`static func < (a: Timestamp, b: Timestamp) -> bool`](#Timestamp.op60)

## Functions

### func Sleep <a id="func-Sleep"></a>

```vertex
public func Sleep(_ duration: Duration)
```

Stops the thread for at least `duration`. Zero or less returns at once.

### func Sleep <a id="func-Sleep-2"></a>

```vertex
public func Sleep(_ duration: Duration) async throws
```

Suspends the task for at least `duration`, and every other task runs
meanwhile. Zero or less still lets the others run first.

It throws where Swift's `Task.sleep` does, for cancellation, so that a
caller written today does not change when cancellation arrives.

### func Sleep <a id="func-Sleep-3"></a>

```vertex
public func Sleep(until deadline: Instant)
```

Stops the thread until at least `deadline`.

### func Sleep <a id="func-Sleep-4"></a>

```vertex
public func Sleep(until deadline: Instant) async throws
```

Suspends the task until at least `deadline`.

## Types

### struct Duration <a id="struct-Duration"></a>

```vertex
public struct Duration: Hashable, Comparable, CustomStringConvertible
```

A length of time, signed, to the nanosecond.

It is held as a count of nanoseconds in an int64, as Go's is, which
spans about 292 years either way. Arithmetic past that traps, as int64
arithmetic does.

```vertex
let timeout = time.Duration.Seconds(5)
let backoff = time.Duration.Milliseconds(250) * 4
print(timeout + backoff)             // 6s
```

#### Properties

<a id="Duration.Zero"></a>

```vertex
public static let Zero = Duration(nanos: 0)
```

No time at all.

<a id="Duration.description"></a>

```vertex
public var description: string { get }
```

The length the way Go writes one: "1h2m3.5s", "1.5ms", "300ns",
"0s". `Parse` reads it back.

#### Methods

<a id="Duration.Nanoseconds"></a>

```vertex
public static func Nanoseconds(_ n: int64) -> Duration
```

<a id="Duration.Microseconds"></a>

```vertex
public static func Microseconds(_ n: int64) -> Duration
```

<a id="Duration.Milliseconds"></a>

```vertex
public static func Milliseconds(_ n: int64) -> Duration
```

<a id="Duration.Seconds"></a>

```vertex
public static func Seconds(_ n: int64) -> Duration
```

<a id="Duration.Minutes"></a>

```vertex
public static func Minutes(_ n: int64) -> Duration
```

<a id="Duration.Hours"></a>

```vertex
public static func Hours(_ n: int64) -> Duration
```

<a id="Duration.AsNanoseconds"></a>

```vertex
public func AsNanoseconds() -> int64
```

The whole length in nanoseconds.

<a id="Duration.AsMicroseconds"></a>

```vertex
public func AsMicroseconds() -> int64
```

The length in whole microseconds, truncated toward zero.

<a id="Duration.AsMilliseconds"></a>

```vertex
public func AsMilliseconds() -> int64
```

The length in whole milliseconds, truncated toward zero.

<a id="Duration.AsSeconds"></a>

```vertex
public func AsSeconds() -> double
```

The length in seconds, with the fraction.

<a id="Duration.Abs"></a>

```vertex
public func Abs() -> Duration
```

The same length, made positive.

<a id="Duration.op43"></a>

```vertex
public static func + (a: Duration, b: Duration) -> Duration
```

<a id="Duration.op45"></a>

```vertex
public static func - (a: Duration, b: Duration) -> Duration
```

<a id="Duration.op45-2"></a>

```vertex
public static prefix func - (d: Duration) -> Duration
```

<a id="Duration.op42"></a>

```vertex
public static func * (d: Duration, n: int64) -> Duration
```

<a id="Duration.op42-2"></a>

```vertex
public static func * (n: int64, d: Duration) -> Duration
```

<a id="Duration.op47"></a>

```vertex
public static func / (d: Duration, n: int64) -> Duration
```

<a id="Duration.op60"></a>

```vertex
public static func < (a: Duration, b: Duration) -> bool
```

<a id="Duration.Parse"></a>

```vertex
public static func Parse(_ text: string) throws -> Duration
```

Reads a duration written as Go writes one: an optional sign, then
numbers each with a unit, such as "300ms", "-1.5h" or "2h45m".
The units are ns, us (or µs), ms, s, m and h. A bare "0" is zero.

### struct Instant <a id="struct-Instant"></a>

```vertex
public struct Instant: Hashable, Comparable
```

A moment on the monotonic clock: for measuring how long something took
and for deadlines, never for telling the time.

It never goes backwards, and setting the system's time does not move
it. It has no meaning outside this process: it counts from an
unspecified start, so it cannot be printed, saved, or compared with a
`Timestamp`. The clock is the one the runtime keeps sleeping tasks on.

```vertex
let start = time.Instant.Now()
work()
print("took \(start.Elapsed())")
```

#### Methods

<a id="Instant.Now"></a>

```vertex
public static func Now() -> Instant
```

Now, on the monotonic clock.

<a id="Instant.Elapsed"></a>

```vertex
public func Elapsed() -> Duration
```

How long ago this was.

<a id="Instant.op43"></a>

```vertex
public static func + (i: Instant, d: Duration) -> Instant
```

<a id="Instant.op45"></a>

```vertex
public static func - (i: Instant, d: Duration) -> Instant
```

<a id="Instant.op45-2"></a>

```vertex
public static func - (a: Instant, b: Instant) -> Duration
```

<a id="Instant.op60"></a>

```vertex
public static func < (a: Instant, b: Instant) -> bool
```

### enum TimeError <a id="enum-TimeError"></a>

```vertex
public enum TimeError: Error
```

TimeError is every way an operation in this package fails.

#### Cases

<a id="TimeError.invalidDuration"></a>

```vertex
case invalidDuration(string)
```

The text is not a duration `Duration.Parse` reads, or one too long
to hold.

#### Properties

<a id="TimeError.Message"></a>

```vertex
public var Message: string { get }
```

A sentence naming what failed.

### struct Timestamp <a id="struct-Timestamp"></a>

```vertex
public struct Timestamp: Hashable, Comparable, CustomStringConvertible
```

A moment on the wall clock: what a file's modification time is, and
what a log line or a certificate's expiry is stamped with.

It is whole seconds since 1970-01-01T00:00:00Z plus the nanoseconds
past them, always 0 to 999999999, so a moment before 1970 is a negative
second and a positive fraction. There are no time zones and no leap
seconds here: it prints as UTC, in RFC 3339.

The wall clock can be set, and then it jumps. To time something or keep
a deadline, use `Instant`, which never does.

```vertex
let now = time.Timestamp.Now()
print(now)                               // 2026-09-16T23:04:05.123456789Z
print(now - modified > .Hours(24))
```

#### Initializers

<a id="Timestamp.init"></a>

```vertex
public init(unixSeconds: int64, nanoseconds: int64 = 0)
```

The moment `unixSeconds` seconds and `nanoseconds` nanoseconds after
the Unix epoch. Nanoseconds outside a second carry into the seconds,
and may be negative.

#### Properties

<a id="Timestamp.UnixSeconds"></a>

```vertex
public let UnixSeconds: int64
```

Whole seconds since the Unix epoch.

<a id="Timestamp.Nanoseconds"></a>

```vertex
public let Nanoseconds: int32
```

Nanoseconds past `UnixSeconds`, from 0 to 999999999.

<a id="Timestamp.UnixEpoch"></a>

```vertex
public static let UnixEpoch = Timestamp(unixSeconds: 0)
```

1970-01-01T00:00:00Z.

<a id="Timestamp.description"></a>

```vertex
public var description: string { get }
```

RFC 3339 in UTC: "2026-09-16T23:04:05Z", with the fraction of a
second where there is one, its trailing zeros left off.

#### Methods

<a id="Timestamp.Now"></a>

```vertex
public static func Now() -> Timestamp
```

Now, on the wall clock.

<a id="Timestamp.UnixMilliseconds"></a>

```vertex
public static func UnixMilliseconds(_ ms: int64) -> Timestamp
```

The moment a count of milliseconds since the Unix epoch names, as
JavaScript and Java keep time.

<a id="Timestamp.UTC"></a>

```vertex
public static func UTC(_ year: int64, _ month: int64, _ day: int64,
                       _ hour: int64 = 0, _ minute: int64 = 0, _ second: int64 = 0,
                       nanosecond: int64 = 0) -> Timestamp
```

A moment in UTC by its calendar date and clock time, in the
proleptic Gregorian calendar. Fields out of range carry, so
month 13 is January of the next year.

<a id="Timestamp.AsUnixMilliseconds"></a>

```vertex
public func AsUnixMilliseconds() -> int64
```

Milliseconds since the Unix epoch, rounded toward negative infinity.

<a id="Timestamp.op43"></a>

```vertex
public static func + (t: Timestamp, d: Duration) -> Timestamp
```

<a id="Timestamp.op45"></a>

```vertex
public static func - (t: Timestamp, d: Duration) -> Timestamp
```

<a id="Timestamp.op45-2"></a>

```vertex
public static func - (a: Timestamp, b: Timestamp) -> Duration
```

How far apart two moments are. It traps where that is more than a
`Duration` holds, about 292 years.

<a id="Timestamp.op60"></a>

```vertex
public static func < (a: Timestamp, b: Timestamp) -> bool
```

## Files

- duration.vs
- error.vs
- instant.vs
- sleep.vs
- timestamp.vs
- units.vs
