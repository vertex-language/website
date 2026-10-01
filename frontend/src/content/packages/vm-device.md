# package device

```vertex
import "vm/device"
```

Package device is everything a device model sees of a machine: guest
memory to DMA into, a bus slot to be reached through, and interrupts to
raise. Device packages (virtio, nvme, usb, chipset) import this and never
vm or vm/hypervisor, so each one runs in cmd/check against a plain buffer.

## Index

- [`enum BusError: Error`](#enum-BusError)
- [`struct GuestAddress: Equatable, Comparable, Hashable`](#struct-GuestAddress)
  - [`init(_ value: uint64)`](#GuestAddress.init)
  - [`let Value: uint64`](#GuestAddress.Value)
  - [`func Adding(_ n: uint64) -> GuestAddress`](#GuestAddress.Adding)
  - [`static func < (a: GuestAddress, b: GuestAddress) -> bool`](#GuestAddress.op60)
- [`final class GuestMemory`](#class-GuestMemory)
  - [`init(_ regions: [Region])`](#GuestMemory.init)
  - [`let Regions: [Region]`](#GuestMemory.Regions)
  - [`func Pointer(_ at: GuestAddress, count: uint64) throws -> UnsafeMutableRawPointer`](#GuestMemory.Pointer)
  - [`func Read(_ at: GuestAddress, into buffer: inout [uint8]) throws`](#GuestMemory.Read)
  - [`func Read(_ at: GuestAddress, count: int) throws -> [uint8]`](#GuestMemory.Read-2)
  - [`func Write(_ at: GuestAddress, _ bytes: borrowing [uint8]) throws`](#GuestMemory.Write)
  - [`func Load16(_ at: GuestAddress) throws -> uint16`](#GuestMemory.Load16)
  - [`func Store16(_ at: GuestAddress, _ v: uint16) throws`](#GuestMemory.Store16)
  - [`func Load32(_ at: GuestAddress) throws -> uint32`](#GuestMemory.Load32)
  - [`func Store32(_ at: GuestAddress, _ v: uint32) throws`](#GuestMemory.Store32)
  - [`func Load64(_ at: GuestAddress) throws -> uint64`](#GuestMemory.Load64)
  - [`func Store64(_ at: GuestAddress, _ v: uint64) throws`](#GuestMemory.Store64)
- [`protocol Irq: AnyObject`](#protocol-Irq)
  - [`func Set(_ level: bool)`](#Irq.Set)
  - [`func Pulse()`](#Irq.Pulse)
- [`enum MemoryError: Error`](#enum-MemoryError)
- [`protocol Mmio: AnyObject`](#protocol-Mmio)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Mmio.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Mmio.Write)
- [`final class MmioBus`](#class-MmioBus)
  - [`init()`](#MmioBus.init)
  - [`func Insert(_ device: any Mmio, at range: Range) throws`](#MmioBus.Insert)
  - [`func Remove(at base: uint64)`](#MmioBus.Remove)
  - [`func Find(_ address: uint64) -> MmioMatch?`](#MmioBus.Find)
- [`final class MmioMatch`](#class-MmioMatch)
  - [`init(dev: any Mmio, offset: uint64)`](#MmioMatch.init)
  - [`let dev: any Mmio`](#MmioMatch.dev)
  - [`let offset: uint64`](#MmioMatch.offset)
- [`protocol Msi: AnyObject`](#protocol-Msi)
  - [`func Send(address: uint64, data: uint32)`](#Msi.Send)
- [`final class NoIrq: Irq`](#class-NoIrq)
  - [`init()`](#NoIrq.init)
  - [`func Set(_ level: bool)`](#NoIrq.Set)
  - [`func Pulse()`](#NoIrq.Pulse)
- [`protocol Pio: AnyObject`](#protocol-Pio)
  - [`func Read(port: uint16, size: uint8) -> uint32`](#Pio.Read)
  - [`func Write(port: uint16, size: uint8, value: uint32)`](#Pio.Write)
- [`final class PioBus`](#class-PioBus)
  - [`init()`](#PioBus.init)
  - [`func Insert(_ device: any Pio, at range: Range) throws`](#PioBus.Insert)
  - [`func Remove(at base: uint64)`](#PioBus.Remove)
  - [`func Find(_ address: uint64) -> PioMatch?`](#PioBus.Find)
- [`final class PioMatch`](#class-PioMatch)
  - [`init(dev: any Pio, offset: uint64)`](#PioMatch.init)
  - [`let dev: any Pio`](#PioMatch.dev)
  - [`let offset: uint64`](#PioMatch.offset)
- [`struct Range`](#struct-Range)
  - [`init(base: uint64, count: uint64)`](#Range.init)
  - [`let Base: uint64`](#Range.Base)
  - [`let Count: uint64`](#Range.Count)
  - [`var End: uint64 { get }`](#Range.End)
- [`final class RecordingIrq: Irq`](#class-RecordingIrq)
  - [`init()`](#RecordingIrq.init)
  - [`private(set) var Level = false`](#RecordingIrq.Level)
  - [`private(set) var Pulses = 0`](#RecordingIrq.Pulses)
  - [`func Set(_ level: bool)`](#RecordingIrq.Set)
  - [`func Pulse()`](#RecordingIrq.Pulse)
- [`struct Region`](#struct-Region)
  - [`init(guest: GuestAddress, count: uint64, host: UnsafeMutableRawPointer)`](#Region.init)
  - [`let Guest: GuestAddress`](#Region.Guest)
  - [`let Count: uint64`](#Region.Count)
  - [`let Host: UnsafeMutableRawPointer`](#Region.Host)

## Types

### enum BusError <a id="enum-BusError"></a>

```vertex
public enum BusError: Error
```

BusError is a device placed where another already is.

#### Cases

<a id="BusError.overlap"></a>

```vertex
case overlap(Range)
```

### struct GuestAddress <a id="struct-GuestAddress"></a>

```vertex
public struct GuestAddress: Equatable, Comparable, Hashable
```

A guest-physical address.

#### Initializers

<a id="GuestAddress.init"></a>

```vertex
public init(_ value: uint64)
```

#### Properties

<a id="GuestAddress.Value"></a>

```vertex
public let Value: uint64
```

#### Methods

<a id="GuestAddress.Adding"></a>

```vertex
public func Adding(_ n: uint64) -> GuestAddress
```

<a id="GuestAddress.op60"></a>

```vertex
public static func < (a: GuestAddress, b: GuestAddress) -> bool
```

### class GuestMemory <a id="class-GuestMemory"></a>

```vertex
public final class GuestMemory
```

The machine's RAM, by guest-physical address. Every access is bounds
checked against the regions.

Ring indices shared with a running guest (VirtIO avail/used idx, NVMe
doorbells shadowed in memory) use the atomic loads and stores; plain
Read/Write is for buffers the protocol says the device owns.

#### Initializers

<a id="GuestMemory.init"></a>

```vertex
public init(_ regions: [Region])
```

#### Properties

<a id="GuestMemory.Regions"></a>

```vertex
public let Regions: [Region]
```

#### Methods

<a id="GuestMemory.Pointer"></a>

```vertex
public func Pointer(_ at: GuestAddress, count: uint64) throws -> UnsafeMutableRawPointer
```

A host pointer to `count` bytes at `at`, when they sit in one region.

<a id="GuestMemory.Read"></a>

```vertex
public func Read(_ at: GuestAddress, into buffer: inout [uint8]) throws
```

<a id="GuestMemory.Read-2"></a>

```vertex
public func Read(_ at: GuestAddress, count: int) throws -> [uint8]
```

<a id="GuestMemory.Write"></a>

```vertex
public func Write(_ at: GuestAddress, _ bytes: borrowing [uint8]) throws
```

<a id="GuestMemory.Load16"></a>

```vertex
public func Load16(_ at: GuestAddress) throws -> uint16
```

<a id="GuestMemory.Store16"></a>

```vertex
public func Store16(_ at: GuestAddress, _ v: uint16) throws
```

<a id="GuestMemory.Load32"></a>

```vertex
public func Load32(_ at: GuestAddress) throws -> uint32
```

<a id="GuestMemory.Store32"></a>

```vertex
public func Store32(_ at: GuestAddress, _ v: uint32) throws
```

<a id="GuestMemory.Load64"></a>

```vertex
public func Load64(_ at: GuestAddress) throws -> uint64
```

<a id="GuestMemory.Store64"></a>

```vertex
public func Store64(_ at: GuestAddress, _ v: uint64) throws
```

### protocol Irq <a id="protocol-Irq"></a>

```vertex
public protocol Irq: AnyObject
```

A wired interrupt line into the interrupt controller: a GIC SPI on
arm64, an IOAPIC pin on amd64. vm hands each device its own.

#### Methods

<a id="Irq.Set"></a>

```vertex
func Set(_ level: bool)
```

Holds the line at `level`: level-triggered devices (PCI INTx, a
UART) raise it until the guest acknowledges.

<a id="Irq.Pulse"></a>

```vertex
func Pulse()
```

Raises and lowers it: an edge.

### enum MemoryError <a id="enum-MemoryError"></a>

```vertex
public enum MemoryError: Error
```

MemoryError is a guest address a device was handed that isn't RAM.
Guests hand devices addresses, so this is a guest bug for the device
to report (a VirtIO NEEDS_RESET, an NVMe status), never a host crash.

#### Cases

<a id="MemoryError.outOfRange"></a>

```vertex
case outOfRange(address: uint64, count: uint64)
```

### protocol Mmio <a id="protocol-Mmio"></a>

```vertex
public protocol Mmio: AnyObject
```

A device reached through memory-mapped registers.

Register accesses run on a vCPU thread, synchronously: the guest is
stopped until `Read` returns. So they take the device's lock, change
state and return. Anything slow (disk, network) is started as a task
that finishes later and raises an interrupt.

#### Methods

<a id="Mmio.Read"></a>

```vertex
func Read(offset: uint64, size: uint8) -> uint64
```

`offset` is from the start of the device's range; `size` is 1, 2, 4
or 8.

<a id="Mmio.Write"></a>

```vertex
func Write(offset: uint64, size: uint8, value: uint64)
```

### class MmioBus <a id="class-MmioBus"></a>

```vertex
public final class MmioBus
```

#### Initializers

<a id="MmioBus.init"></a>

```vertex
public init()
```

#### Methods

<a id="MmioBus.Insert"></a>

```vertex
public func Insert(_ device: any Mmio, at range: Range) throws
```

<a id="MmioBus.Remove"></a>

```vertex
public func Remove(at base: uint64)
```

<a id="MmioBus.Find"></a>

```vertex
public func Find(_ address: uint64) -> MmioMatch?
```

The device covering `address`, and the offset into its range.

### class MmioMatch <a id="class-MmioMatch"></a>

```vertex
public final class MmioMatch
```

#### Initializers

<a id="MmioMatch.init"></a>

```vertex
public init(dev: any Mmio, offset: uint64)
```

#### Properties

<a id="MmioMatch.dev"></a>

```vertex
public let dev: any Mmio
```

<a id="MmioMatch.offset"></a>

```vertex
public let offset: uint64
```

### protocol Msi <a id="protocol-Msi"></a>

```vertex
public protocol Msi: AnyObject
```

A message-signalled interrupt: the write a PCI function makes to raise
one (MSI, MSI-X). vm routes it to the GIC's MSI frame or the LAPIC.

#### Methods

<a id="Msi.Send"></a>

```vertex
func Send(address: uint64, data: uint32)
```

### class NoIrq <a id="class-NoIrq"></a>

```vertex
public final class NoIrq: Irq
```

An interrupt line that goes nowhere, for tests and devices a guest
polls.

#### Initializers

<a id="NoIrq.init"></a>

```vertex
public init()
```

#### Methods

<a id="NoIrq.Set"></a>

```vertex
public func Set(_ level: bool)
```

<a id="NoIrq.Pulse"></a>

```vertex
public func Pulse()
```

### protocol Pio <a id="protocol-Pio"></a>

```vertex
public protocol Pio: AnyObject
```

A device reached through x86 I/O ports. amd64 guests only.

#### Methods

<a id="Pio.Read"></a>

```vertex
func Read(port: uint16, size: uint8) -> uint32
```

<a id="Pio.Write"></a>

```vertex
func Write(port: uint16, size: uint8, value: uint32)
```

### class PioBus <a id="class-PioBus"></a>

```vertex
public final class PioBus
```

#### Initializers

<a id="PioBus.init"></a>

```vertex
public init()
```

#### Methods

<a id="PioBus.Insert"></a>

```vertex
public func Insert(_ device: any Pio, at range: Range) throws
```

<a id="PioBus.Remove"></a>

```vertex
public func Remove(at base: uint64)
```

<a id="PioBus.Find"></a>

```vertex
public func Find(_ address: uint64) -> PioMatch?
```

The device covering `address`, and the offset into its range.

### class PioMatch <a id="class-PioMatch"></a>

```vertex
public final class PioMatch
```

#### Initializers

<a id="PioMatch.init"></a>

```vertex
public init(dev: any Pio, offset: uint64)
```

#### Properties

<a id="PioMatch.dev"></a>

```vertex
public let dev: any Pio
```

<a id="PioMatch.offset"></a>

```vertex
public let offset: uint64
```

### struct Range <a id="struct-Range"></a>

```vertex
public struct Range
```

A range of addresses (or ports) and what answers there.

#### Initializers

<a id="Range.init"></a>

```vertex
public init(base: uint64, count: uint64)
```

#### Properties

<a id="Range.Base"></a>

```vertex
public let Base: uint64
```

<a id="Range.Count"></a>

```vertex
public let Count: uint64
```

<a id="Range.End"></a>

```vertex
public var End: uint64 { get }
```

### class RecordingIrq <a id="class-RecordingIrq"></a>

```vertex
public final class RecordingIrq: Irq
```

An interrupt line that remembers what was done to it: what cmd/check
gives a device to see it raise interrupts.

#### Initializers

<a id="RecordingIrq.init"></a>

```vertex
public init()
```

#### Properties

<a id="RecordingIrq.Level"></a>

```vertex
public private(set) var Level = false
```

<a id="RecordingIrq.Pulses"></a>

```vertex
public private(set) var Pulses = 0
```

#### Methods

<a id="RecordingIrq.Set"></a>

```vertex
public func Set(_ level: bool)
```

<a id="RecordingIrq.Pulse"></a>

```vertex
public func Pulse()
```

### struct Region <a id="struct-Region"></a>

```vertex
public struct Region
```

One contiguous run of guest RAM and the host memory behind it.

#### Initializers

<a id="Region.init"></a>

```vertex
public init(guest: GuestAddress, count: uint64, host: UnsafeMutableRawPointer)
```

#### Properties

<a id="Region.Guest"></a>

```vertex
public let Guest: GuestAddress
```

<a id="Region.Count"></a>

```vertex
public let Count: uint64
```

<a id="Region.Host"></a>

```vertex
public let Host: UnsafeMutableRawPointer
```

## Files

- bus.vs
- irq.vs
- memory.vs
