# package pci

```vertex
import "vm/pci"
```

Package pci is a PCI Express root complex for guests: the ECAM
configuration window, bus 0, BAR placement, INTx routing and MSI-X.
Devices on the standard platform (virtio-pci, nvme, xhci) implement
Function and never see the bus.

## Index

- [`final class Aperture: device.Mmio`](#class-Aperture)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Aperture.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Aperture.Write)
- [`struct Bar`](#struct-Bar)
  - [`init(index: int, size: uint64, kind: BarKind, prefetchable: bool)`](#Bar.init)
  - [`let Index: int`](#Bar.Index)
  - [`let Size: uint64`](#Bar.Size)
  - [`let Kind: BarKind`](#Bar.Kind)
  - [`let Prefetchable: bool`](#Bar.Prefetchable)
- [`enum BarKind: int32`](#enum-BarKind)
- [`struct ClassCode`](#struct-ClassCode)
  - [`init(_ base: uint8, _ sub: uint8, _ interface: uint8)`](#ClassCode.init)
  - [`let Base: uint8`](#ClassCode.Base)
  - [`let Sub: uint8`](#ClassCode.Sub)
  - [`let Interface: uint8`](#ClassCode.Interface)
  - [`static let hostBridge = ClassCode(0x06, 0x00, 0x00)`](#ClassCode.hostBridge)
  - [`static let nvme = ClassCode(0x01, 0x08, 0x02)`](#ClassCode.nvme)
  - [`static let xhci = ClassCode(0x0c, 0x03, 0x30)`](#ClassCode.xhci)
  - [`static let ethernet = ClassCode(0x02, 0x00, 0x00)`](#ClassCode.ethernet)
  - [`static let scsi = ClassCode(0x01, 0x00, 0x00)`](#ClassCode.scsi)
  - [`static let other = ClassCode(0xff, 0x00, 0x00)`](#ClassCode.other)
  - [`static func forVirtio(_ id: uint32) -> ClassCode`](#ClassCode.forVirtio)
- [`final class ConfigSpace`](#class-ConfigSpace)
  - [`init(vendor: uint16, device: uint16, classCode: ClassCode, revision: uint8, subsystemVendor: uint16 = 0x1af4, subsystem: uint16 = 0x1100)`](#ConfigSpace.init)
  - [`var Bytes: [uint8] = [uint8](repeating: 0, count: 4096)`](#ConfigSpace.Bytes)
  - [`var MsixEnabled: bool { get }`](#ConfigSpace.MsixEnabled)
  - [`var Command: uint16 { get }`](#ConfigSpace.Command)
  - [`var MemoryEnabled: bool { get }`](#ConfigSpace.MemoryEnabled)
  - [`var BusMasterEnabled: bool { get }`](#ConfigSpace.BusMasterEnabled)
  - [`var IntxDisabled: bool { get }`](#ConfigSpace.IntxDisabled)
  - [`func SetWritable(_ at: int, _ count: int, mask: uint64 = ~0)`](#ConfigSpace.SetWritable)
  - [`func ReserveCapabilities(upTo: int)`](#ConfigSpace.ReserveCapabilities)
  - [`func AddCapability(id: uint8, body: [uint8]) -> int`](#ConfigSpace.AddCapability)
  - [`func AddPcieCapability() -> int`](#ConfigSpace.AddPcieCapability)
  - [`func AddMsixCapability(_ table: MsixTable, bar: uint8, tableOffset: uint32, pbaOffset: uint32) -> int`](#ConfigSpace.AddMsixCapability)
  - [`func Read(offset: int, size: uint8) -> uint32`](#ConfigSpace.Read)
  - [`func GuestWrite(offset: int, size: uint8, value: uint64)`](#ConfigSpace.GuestWrite)
  - [`func Put32(_ at: int, _ v: uint32)`](#ConfigSpace.Put32)
  - [`func Get32(_ at: int) -> uint32`](#ConfigSpace.Get32)
  - [`func ConnectIntx(_ irq: any device.Irq, line: uint8)`](#ConfigSpace.ConnectIntx)
  - [`func SetIntx(_ asserted: bool)`](#ConfigSpace.SetIntx)
- [`protocol Function: AnyObject`](#protocol-Function)
  - [`var Config: ConfigSpace { get }`](#Function.Config)
  - [`var Bars: [Bar] { get }`](#Function.Bars)
  - [`func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64`](#Function.ReadBar)
  - [`func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)`](#Function.WriteBar)
- [`struct Layout`](#struct-Layout)
  - [`init(ecam: device.Range, mmio32: device.Range, mmio64: device.Range, irqBase: uint32)`](#Layout.init)
  - [`let Ecam: device.Range`](#Layout.Ecam)
  - [`let Mmio32: device.Range`](#Layout.Mmio32)
  - [`let Mmio64: device.Range`](#Layout.Mmio64)
  - [`let IrqBase: uint32`](#Layout.IrqBase)
- [`final class MsixTable`](#class-MsixTable)
  - [`init(vectors: int, msi: any device.Msi)`](#MsixTable.init)
  - [`var Enabled = false`](#MsixTable.Enabled)
  - [`var FunctionMasked = false`](#MsixTable.FunctionMasked)
  - [`var Vectors: int { get }`](#MsixTable.Vectors)
  - [`func Capability(bar: uint8, tableOffset: uint32, pbaOffset: uint32) -> [uint8]`](#MsixTable.Capability)
  - [`func Signal(_ v: int)`](#MsixTable.Signal)
  - [`func ReadTable(offset: uint64, size: uint8) -> uint64`](#MsixTable.ReadTable)
  - [`func WriteTable(offset: uint64, size: uint8, value: uint64)`](#MsixTable.WriteTable)
  - [`func ReadPba(offset: uint64, size: uint8) -> uint64`](#MsixTable.ReadPba)
- [`enum PciError: Error`](#enum-PciError)
- [`struct Placement`](#struct-Placement)
  - [`init(slot: int, bar: int, range: device.Range)`](#Placement.init)
  - [`let Slot: int`](#Placement.Slot)
  - [`let Bar: int`](#Placement.Bar)
  - [`let Range: device.Range`](#Placement.Range)
- [`final class Root: device.Mmio`](#class-Root)
  - [`init(_ layout: Layout, intx: ((uint32) -> any device.Irq)? = nil)`](#Root.init)
  - [`let Layout: Layout`](#Root.Layout)
  - [`private(set) var Placements: [Placement] = []`](#Root.Placements)
  - [`func Attach(_ f: any Function) throws -> int`](#Root.Attach)
  - [`func IntxLine(slot: int) -> uint32`](#Root.IntxLine)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Root.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Root.Write)
  - [`func MmioWindow(_ range: device.Range) -> Aperture`](#Root.MmioWindow)

## Types

### class Aperture <a id="class-Aperture"></a>

```vertex
public final class Aperture: device.Mmio
```

One of the root complex's MMIO apertures on the platform bus. Reads of
addresses no BAR covers return all ones; writes there are dropped.

#### Methods

<a id="Aperture.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="Aperture.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### struct Bar <a id="struct-Bar"></a>

```vertex
public struct Bar
```

One base address register a function asks for.

#### Initializers

<a id="Bar.init"></a>

```vertex
public init(index: int, size: uint64, kind: BarKind, prefetchable: bool)
```

#### Properties

<a id="Bar.Index"></a>

```vertex
public let Index: int
```

<a id="Bar.Size"></a>

```vertex
public let Size: uint64
```

A power of two, at least 16 bytes (4 KiB is what's worth using).

<a id="Bar.Kind"></a>

```vertex
public let Kind: BarKind
```

<a id="Bar.Prefetchable"></a>

```vertex
public let Prefetchable: bool
```

### enum BarKind <a id="enum-BarKind"></a>

```vertex
public enum BarKind: int32
```

What a BAR maps.

#### Cases

<a id="BarKind.memory32"></a>

```vertex
case memory32 = 0
```

<a id="BarKind.memory64"></a>

```vertex
case memory64 = 1
```

<a id="BarKind.io"></a>

```vertex
case io = 2
```

### struct ClassCode <a id="struct-ClassCode"></a>

```vertex
public struct ClassCode
```

Class codes (base class, subclass, programming interface) for the
functions the vm packages make.

#### Initializers

<a id="ClassCode.init"></a>

```vertex
public init(_ base: uint8, _ sub: uint8, _ interface: uint8)
```

#### Properties

<a id="ClassCode.Base"></a>

```vertex
public let Base: uint8
```

<a id="ClassCode.Sub"></a>

```vertex
public let Sub: uint8
```

<a id="ClassCode.Interface"></a>

```vertex
public let Interface: uint8
```

<a id="ClassCode.hostBridge"></a>

```vertex
public static let hostBridge = ClassCode(0x06, 0x00, 0x00)
```

<a id="ClassCode.nvme"></a>

```vertex
public static let nvme = ClassCode(0x01, 0x08, 0x02)
```

<a id="ClassCode.xhci"></a>

```vertex
public static let xhci = ClassCode(0x0c, 0x03, 0x30)
```

<a id="ClassCode.ethernet"></a>

```vertex
public static let ethernet = ClassCode(0x02, 0x00, 0x00)
```

<a id="ClassCode.scsi"></a>

```vertex
public static let scsi = ClassCode(0x01, 0x00, 0x00)
```

<a id="ClassCode.other"></a>

```vertex
public static let other = ClassCode(0xff, 0x00, 0x00)
```

#### Methods

<a id="ClassCode.forVirtio"></a>

```vertex
public static func forVirtio(_ id: uint32) -> ClassCode
```

The class a VirtIO device reports, by VirtIO device ID.

### class ConfigSpace <a id="class-ConfigSpace"></a>

```vertex
public final class ConfigSpace
```

A type-0 configuration header (4 KiB of extended config space) and its
capability list. Functions fill it in; Root answers config cycles from
it and handles the parts the spec defines (command, BARs).

Only bytes marked writable take guest writes: the command register,
cache line size, latency timer, interrupt line, and whatever a function
marks with `SetWritable`. Everything else is read-only, as on hardware.

#### Initializers

<a id="ConfigSpace.init"></a>

```vertex
public init(vendor: uint16, device: uint16, classCode: ClassCode, revision: uint8,
            subsystemVendor: uint16 = 0x1af4, subsystem: uint16 = 0x1100)
```

#### Properties

<a id="ConfigSpace.Bytes"></a>

```vertex
public var Bytes: [uint8] = [uint8](repeating: 0, count: 4096)
```

<a id="ConfigSpace.MsixEnabled"></a>

```vertex
public var MsixEnabled: bool { get }
```

Whether the guest turned MSI-X on.

<a id="ConfigSpace.Command"></a>

```vertex
public var Command: uint16 { get }
```

<a id="ConfigSpace.MemoryEnabled"></a>

```vertex
public var MemoryEnabled: bool { get }
```

<a id="ConfigSpace.BusMasterEnabled"></a>

```vertex
public var BusMasterEnabled: bool { get }
```

<a id="ConfigSpace.IntxDisabled"></a>

```vertex
public var IntxDisabled: bool { get }
```

#### Methods

<a id="ConfigSpace.SetWritable"></a>

```vertex
public func SetWritable(_ at: int, _ count: int, mask: uint64 = ~0)
```

Lets guests write `count` bytes at `at`, under `mask` (little-endian).

<a id="ConfigSpace.ReserveCapabilities"></a>

```vertex
public func ReserveCapabilities(upTo: int)
```

Keeps the bytes below `upTo` for registers of the function's own
(xHCI's SBRN and FLADJ at 0x60): capabilities start after them.

<a id="ConfigSpace.AddCapability"></a>

```vertex
@discardableResult
public func AddCapability(id: uint8, body: [uint8]) -> int
```

Appends a capability with the given ID and body; returns its offset.

<a id="ConfigSpace.AddPcieCapability"></a>

```vertex
@discardableResult
public func AddPcieCapability() -> int
```

A PCI Express capability for a root-complex integrated endpoint:
what PCIe-only drivers (stornvme, usbxhci) look for.

<a id="ConfigSpace.AddMsixCapability"></a>

```vertex
@discardableResult
public func AddMsixCapability(_ table: MsixTable, bar: uint8, tableOffset: uint32, pbaOffset: uint32) -> int
```

An MSI-X capability over `table`, whose table and PBA sit in BAR
`bar` at the given offsets. The guest's enable and function-mask
bits go to the table; INTx is off while MSI-X is on.

<a id="ConfigSpace.Read"></a>

```vertex
public func Read(offset: int, size: uint8) -> uint32
```

<a id="ConfigSpace.GuestWrite"></a>

```vertex
public func GuestWrite(offset: int, size: uint8, value: uint64)
```

A guest configuration write, through the writable mask.

<a id="ConfigSpace.Put32"></a>

```vertex
public func Put32(_ at: int, _ v: uint32)
```

<a id="ConfigSpace.Get32"></a>

```vertex
public func Get32(_ at: int) -> uint32
```

<a id="ConfigSpace.ConnectIntx"></a>

```vertex
public func ConnectIntx(_ irq: any device.Irq, line: uint8)
```

Connects the function's INTA to an interrupt controller line.

<a id="ConfigSpace.SetIntx"></a>

```vertex
public func SetIntx(_ asserted: bool)
```

Asserts or deasserts INTA. Level-triggered: hold it while the
function has an interrupt pending. The command register's interrupt
disable bit masks it, and status bit 3 reports it either way.

### protocol Function <a id="protocol-Function"></a>

```vertex
public protocol Function: AnyObject
```

A PCI function: its configuration space, the BARs it wants, and what
happens when the guest touches them.

Like `device.Mmio`, BAR access runs on a vCPU thread, synchronously.

#### Properties

<a id="Function.Config"></a>

```vertex
var Config: ConfigSpace { get }
```

<a id="Function.Bars"></a>

```vertex
var Bars: [Bar] { get }
```

#### Methods

<a id="Function.ReadBar"></a>

```vertex
func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64
```

<a id="Function.WriteBar"></a>

```vertex
func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)
```

### struct Layout <a id="struct-Layout"></a>

```vertex
public struct Layout
```

Where a platform puts the root complex: the ECAM window, and the MMIO
windows BARs are placed in.

#### Initializers

<a id="Layout.init"></a>

```vertex
public init(ecam: device.Range, mmio32: device.Range, mmio64: device.Range, irqBase: uint32)
```

#### Properties

<a id="Layout.Ecam"></a>

```vertex
public let Ecam: device.Range
```

1 MiB per bus; bus 0 only, so 1 MiB is enough.

<a id="Layout.Mmio32"></a>

```vertex
public let Mmio32: device.Range
```

Below 4 GiB, for 32-bit BARs.

<a id="Layout.Mmio64"></a>

```vertex
public let Mmio64: device.Range
```

Above RAM, for 64-bit BARs.

<a id="Layout.IrqBase"></a>

```vertex
public let IrqBase: uint32
```

The interrupt line INTA of slot 0 lands on; INTA–INTD of each slot
swizzle across IrqBase...IrqBase+3.

### class MsixTable <a id="class-MsixTable"></a>

```vertex
public final class MsixTable
```

An MSI-X table and pending-bit array (PCIe §6.1.4): per vector, the
address and data the guest programmed, and a mask bit.

#### Initializers

<a id="MsixTable.init"></a>

```vertex
public init(vectors: int, msi: any device.Msi)
```

#### Properties

<a id="MsixTable.Enabled"></a>

```vertex
public var Enabled = false
```

The function-wide enable and mask bits from the capability's
message control.

<a id="MsixTable.FunctionMasked"></a>

```vertex
public var FunctionMasked = false
```

<a id="MsixTable.Vectors"></a>

```vertex
public var Vectors: int { get }
```

#### Methods

<a id="MsixTable.Capability"></a>

```vertex
public func Capability(bar: uint8, tableOffset: uint32, pbaOffset: uint32) -> [uint8]
```

The MSI-X capability body for ConfigSpace.AddCapability(id: 0x11):
table in `bar` at `tableOffset`, PBA at `pbaOffset`.

<a id="MsixTable.Signal"></a>

```vertex
public func Signal(_ v: int)
```

Raises vector `v`: sends it, or marks it pending while masked.

<a id="MsixTable.ReadTable"></a>

```vertex
public func ReadTable(offset: uint64, size: uint8) -> uint64
```

A guest access to the table (16 bytes per vector).

<a id="MsixTable.WriteTable"></a>

```vertex
public func WriteTable(offset: uint64, size: uint8, value: uint64)
```

<a id="MsixTable.ReadPba"></a>

```vertex
public func ReadPba(offset: uint64, size: uint8) -> uint64
```

### enum PciError <a id="enum-PciError"></a>

```vertex
public enum PciError: Error
```

PciError is a function that doesn't fit.

#### Cases

<a id="PciError.noSlot"></a>

```vertex
case noSlot
```

<a id="PciError.noSpace"></a>

```vertex
case noSpace(Bar)
```

### struct Placement <a id="struct-Placement"></a>

```vertex
public struct Placement
```

Where Attach first placed a BAR. Firmware and OSes usually move BARs;
the windows decode wherever the guest last put them.

#### Initializers

<a id="Placement.init"></a>

```vertex
public init(slot: int, bar: int, range: device.Range)
```

#### Properties

<a id="Placement.Slot"></a>

```vertex
public let Slot: int
```

<a id="Placement.Bar"></a>

```vertex
public let Bar: int
```

<a id="Placement.Range"></a>

```vertex
public let Range: device.Range
```

### class Root <a id="class-Root"></a>

```vertex
public final class Root: device.Mmio
```

Bus 0 of a PCIe root complex behind an ECAM window. It answers
configuration cycles, gives each BAR a first address, and decodes
accesses to its MMIO windows by the BAR values the guest programmed.

#### Initializers

<a id="Root.init"></a>

```vertex
public init(_ layout: Layout, intx: ((uint32) -> any device.Irq)? = nil)
```

`intx` makes the interrupt line for a swizzled INTx number
(Layout.IrqBase + 0...3); nil leaves functions unwired.

#### Properties

<a id="Root.Layout"></a>

```vertex
public let Layout: Layout
```

<a id="Root.Placements"></a>

```vertex
public private(set) var Placements: [Placement] = []
```

Where each slot's BARs were first placed: (slot, bar index, range).

#### Methods

<a id="Root.Attach"></a>

```vertex
public func Attach(_ f: any Function) throws -> int
```

Puts a function in the next free slot (slot 0 is the host bridge),
gives its BARs first addresses and wires its INTA.

<a id="Root.IntxLine"></a>

```vertex
public func IntxLine(slot: int) -> uint32
```

The interrupt line a slot's INTA lands on (the standard swizzle).

<a id="Root.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

ECAM: offset = bus << 20 | device << 15 | function << 12 | register.

<a id="Root.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

<a id="Root.MmioWindow"></a>

```vertex
public func MmioWindow(_ range: device.Range) -> Aperture
```

The MMIO device to insert over `range` (Layout.Mmio32 or Mmio64):
it forwards each access to whichever BAR covers it now.

## Files

- config.vs
- function.vs
- msix.vs
- root.vs
