# package host

```vertex
import "os/host"
```

## Index

- [Variables](#variables)
- [`func CPUs() -> CPUInfo`](#func-CPUs)
- [`func Memory() -> MemoryInfo`](#func-Memory)
- [`func Name() -> string`](#func-Name)
- [`func UptimeNanos() -> int64`](#func-UptimeNanos)
- [`enum Architecture: Equatable`](#enum-Architecture)
- [`struct CPUInfo`](#struct-CPUInfo)
  - [`let Logical: int`](#CPUInfo.Logical)
  - [`let Performance: int`](#CPUInfo.Performance)
  - [`let Efficiency: int`](#CPUInfo.Efficiency)
- [`struct MemoryInfo`](#struct-MemoryInfo)
  - [`let Total: int64`](#MemoryInfo.Total)
  - [`let Available: int64`](#MemoryInfo.Available)
- [`struct OSInfo`](#struct-OSInfo)
  - [`let Kind: OSKind`](#OSInfo.Kind)
  - [`let Version: string`](#OSInfo.Version)
- [`enum OSKind: Equatable`](#enum-OSKind)

## Variables

<a id="var-Arch"></a>

```vertex
public var Arch: Architecture { get }
```

The processor architecture the program was built for.

<a id="var-OS"></a>

```vertex
public var OS: OSInfo { get }
```

The operating system and its version.

<a id="var-PageSize"></a>

```vertex
public var PageSize: int { get }
```

The size of a page of memory, in bytes.

## Functions

### func CPUs <a id="func-CPUs"></a>

```vertex
public func CPUs() -> CPUInfo
```

How many processors the machine has.

### func Memory <a id="func-Memory"></a>

```vertex
public func Memory() -> MemoryInfo
```

Physical memory, total and available.

### func Name <a id="func-Name"></a>

```vertex
public func Name() -> string
```

The machine's host name.

### func UptimeNanos <a id="func-UptimeNanos"></a>

```vertex
public func UptimeNanos() -> int64
```

Nanoseconds since the machine booted, time asleep included.

## Types

### enum Architecture <a id="enum-Architecture"></a>

```vertex
public enum Architecture: Equatable
```

The processor architecture the program was built for.

#### Cases

<a id="Architecture.aarch64"></a>

```vertex
case aarch64
```

<a id="Architecture.x86_64"></a>

```vertex
case x86_64
```

### struct CPUInfo <a id="struct-CPUInfo"></a>

```vertex
public struct CPUInfo
```

How many processors the machine has.

#### Properties

<a id="CPUInfo.Logical"></a>

```vertex
public let Logical: int
```

Logical processors the process may run on.

<a id="CPUInfo.Performance"></a>

```vertex
public let Performance: int
```

Performance cores. On a machine whose cores are all alike, all of them.

<a id="CPUInfo.Efficiency"></a>

```vertex
public let Efficiency: int
```

Efficiency cores (Apple Silicon's E-cores); 0 where there are none.

### struct MemoryInfo <a id="struct-MemoryInfo"></a>

```vertex
public struct MemoryInfo
```

Physical memory, in bytes.

#### Properties

<a id="MemoryInfo.Total"></a>

```vertex
public let Total: int64
```

<a id="MemoryInfo.Available"></a>

```vertex
public let Available: int64
```

What can be handed out without swapping: free memory, and the cache
the kernel can drop.

### struct OSInfo <a id="struct-OSInfo"></a>

```vertex
public struct OSInfo
```

The operating system and its version.

#### Properties

<a id="OSInfo.Kind"></a>

```vertex
public let Kind: OSKind
```

<a id="OSInfo.Version"></a>

```vertex
public let Version: string
```

The product version: "15.3.1" on macOS, "10.0.26100" on Windows,
"14" on Android. "" where the system does not say.

### enum OSKind <a id="enum-OSKind"></a>

```vertex
public enum OSKind: Equatable
```

The kind of operating system.

#### Cases

<a id="OSKind.macOS"></a>

```vertex
case macOS
```

<a id="OSKind.windows"></a>

```vertex
case windows
```

<a id="OSKind.linux"></a>

```vertex
case linux
```

<a id="OSKind.android"></a>

```vertex
case android
```

## Files

- host.vs
