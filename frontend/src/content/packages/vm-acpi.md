# package acpi

```vertex
import "vm/acpi"
```

Package acpi builds the ACPI tables a guest's firmware or kernel reads
to find its hardware, for arm64 and amd64 alike: Windows needs them on
both, and so does Linux under UEFI.

Tables are hardware-reduced (no PM1 blocks, no SCI, no legacy timers);
the power button and hotplug go through a Generic Event Device in the
DSDT. Every builder returns bytes with the checksum already set.

## Index

- [Constants](#constants)
- [`func BuildArm64(_ cfg: Arm64Config) -> Payload`](#func-BuildArm64)
- [`func Checksum(_ b: [uint8]) -> uint8`](#func-Checksum)
- [`func Dsdt(_ body: Aml) -> [uint8]`](#func-Dsdt)
- [`func Fadt(_ o: FadtOptions) -> [uint8]`](#func-Fadt)
- [`func Gtdt(virtualTimerIrq: uint32 = 27) -> [uint8]`](#func-Gtdt)
- [`func Iort(itsId: uint32 = 0, pciSegment: uint32 = 0) -> [uint8]`](#func-Iort)
- [`func Mcfg(ecam: uint64, segment: uint16 = 0, startBus: uint8 = 0, endBus: uint8 = 0) -> [uint8]`](#func-Mcfg)
- [`func Rsdp(xsdt: uint64) -> [uint8]`](#func-Rsdp)
- [`func Spcr(kind: UartKind, address: uint64, irq: uint32, io: bool) -> [uint8]`](#func-Spcr)
- [`func Tpm2Table() -> [uint8]`](#func-Tpm2Table)
- [`func Xsdt(_ tables: [uint64]) -> [uint8]`](#func-Xsdt)
- [`enum AddressSpace`](#enum-AddressSpace)
  - [`static let memory: uint8 = 0`](#AddressSpace.memory)
  - [`static let io: uint8 = 1`](#AddressSpace.io)
- [`struct Aml`](#struct-Aml)
  - [`init()`](#Aml.init)
  - [`var Bytes: [uint8] = []`](#Aml.Bytes)
  - [`mutating func Name(_ name: string, _ value: Aml)`](#Aml.Name)
  - [`static func Integer(_ v: uint64) -> Aml`](#Aml.Integer)
  - [`static func String(_ s: string) -> Aml`](#Aml.String)
  - [`static func EisaId(_ id: string) -> Aml`](#Aml.EisaId)
  - [`static func Buffer(_ bytes: [uint8]) -> Aml`](#Aml.Buffer)
  - [`static func Package(_ items: [Aml]) -> Aml`](#Aml.Package)
  - [`mutating func Device(_ name: string, _ body: Aml)`](#Aml.Device)
  - [`mutating func Scope(_ path: string, _ body: Aml)`](#Aml.Scope)
  - [`mutating func ReturnMethod(_ name: string, _ value: Aml)`](#Aml.ReturnMethod)
  - [`mutating func NotifyMethod(_ name: string, target: string, value: uint8)`](#Aml.NotifyMethod)
  - [`mutating func Append(_ other: Aml)`](#Aml.Append)
- [`struct Arm64Config`](#struct-Arm64Config)
  - [`init(vcpus: int = 2, virtioCount: int = 0, gicDistBase: uint64 = 0x0800_0000, gicRedistBase: uint64 = 0x080a_0000, gicRedistSizePerCpu: uint64 = 0x0002_0000, pciEcamBase: uint64 = 0x1000_0000, pciMmio32Base: uint64 = 0x2000_0000, pciMmio32Size: uint64 = 0x1000_0000, pciMmio64Base: uint64 = 0x04_0000_0000, pciMmio64Size: uint64 = 0x04_0000_0000, virtioMmioBase: uint64 = 0x0a00_0000, virtioMmioStride: uint64 = 0x0000_1000, virtioMmioSize: uint64 = 0x0000_0200, virtioIrqBase: uint32 = 16, uartBase: uint64 = 0x0900_0000, uartSize: uint64 = 0x0000_1000, uartIrq: uint32 = 1, rtcBase: uint64 = 0x0901_0000, rtcSize: uint64 = 0x0000_1000, rtcIrq: uint32 = 2)`](#Arm64Config.init)
  - [`var Vcpus: int`](#Arm64Config.Vcpus)
  - [`var VirtioCount: int`](#Arm64Config.VirtioCount)
  - [`var GicDistBase: uint64`](#Arm64Config.GicDistBase)
  - [`var GicRedistBase: uint64`](#Arm64Config.GicRedistBase)
  - [`var GicRedistSizePerCpu: uint64`](#Arm64Config.GicRedistSizePerCpu)
  - [`var PciEcamBase: uint64`](#Arm64Config.PciEcamBase)
  - [`var PciMmio32Base: uint64`](#Arm64Config.PciMmio32Base)
  - [`var PciMmio32Size: uint64`](#Arm64Config.PciMmio32Size)
  - [`var PciMmio64Base: uint64`](#Arm64Config.PciMmio64Base)
  - [`var PciMmio64Size: uint64`](#Arm64Config.PciMmio64Size)
  - [`var VirtioMmioBase: uint64`](#Arm64Config.VirtioMmioBase)
  - [`var VirtioMmioStride: uint64`](#Arm64Config.VirtioMmioStride)
  - [`var VirtioMmioSize: uint64`](#Arm64Config.VirtioMmioSize)
  - [`var VirtioIrqBase: uint32`](#Arm64Config.VirtioIrqBase)
  - [`var PciIntxSpi: uint32 = 3`](#Arm64Config.PciIntxSpi)
  - [`var MsiFrameBase: uint64 = 0`](#Arm64Config.MsiFrameBase)
  - [`var MsiSpiBase: uint32 = 0`](#Arm64Config.MsiSpiBase)
  - [`var MsiSpiCount: uint32 = 0`](#Arm64Config.MsiSpiCount)
  - [`var TpmBase: uint64 = 0`](#Arm64Config.TpmBase)
  - [`var UartBase: uint64`](#Arm64Config.UartBase)
  - [`var UartSize: uint64`](#Arm64Config.UartSize)
  - [`var UartIrq: uint32`](#Arm64Config.UartIrq)
  - [`var RtcBase: uint64`](#Arm64Config.RtcBase)
  - [`var RtcSize: uint64`](#Arm64Config.RtcSize)
  - [`var RtcIrq: uint32`](#Arm64Config.RtcIrq)
- [`struct FadtOptions`](#struct-FadtOptions)
  - [`init(dsdt: uint64, arm: bool)`](#FadtOptions.init)
  - [`var Dsdt: uint64`](#FadtOptions.Dsdt)
  - [`var Arm: bool`](#FadtOptions.Arm)
  - [`var SleepControl: uint64 = 0`](#FadtOptions.SleepControl)
  - [`var ResetRegister: uint64 = 0`](#FadtOptions.ResetRegister)
  - [`var ResetValue: uint8 = 1`](#FadtOptions.ResetValue)
- [`enum LoaderCommandType: uint32`](#enum-LoaderCommandType)
- [`enum Madt`](#enum-Madt)
  - [`static func Build(_ o: Amd64) -> [uint8]`](#Madt.Build)
  - [`static func Build(_ o: Arm64) -> [uint8]`](#Madt.Build-2)
- [`struct Amd64`](#struct-Madt.Amd64)
  - [`init(cpus: int)`](#Madt.Amd64.init)
  - [`var Cpus: int`](#Madt.Amd64.Cpus)
  - [`var IoApic: uint64 = 0xfec0_0000`](#Madt.Amd64.IoApic)
  - [`var LocalApic: uint32 = 0xfee0_0000`](#Madt.Amd64.LocalApic)
- [`struct Arm64`](#struct-Madt.Arm64)
  - [`init(cpus: int, distributor: uint64, redistributor: uint64, redistributorSize: uint32)`](#Madt.Arm64.init)
  - [`var Cpus: int`](#Madt.Arm64.Cpus)
  - [`var Distributor: uint64`](#Madt.Arm64.Distributor)
  - [`var Redistributor: uint64`](#Madt.Arm64.Redistributor)
  - [`var RedistributorSize: uint32`](#Madt.Arm64.RedistributorSize)
  - [`var Its: uint64 = 0`](#Madt.Arm64.Its)
  - [`var MsiFrame: uint64 = 0`](#Madt.Arm64.MsiFrame)
  - [`var MsiSpiBase: uint32 = 0`](#Madt.Arm64.MsiSpiBase)
  - [`var MsiSpiCount: uint32 = 0`](#Madt.Arm64.MsiSpiCount)
  - [`var MaintenanceIrq: uint32 = 0`](#Madt.Arm64.MaintenanceIrq)
  - [`var PmuIrq: uint32 = 23`](#Madt.Arm64.PmuIrq)
- [`struct Payload`](#struct-Payload)
  - [`init(tables: [uint8], rsdp: [uint8], loader: [uint8])`](#Payload.init)
  - [`let Tables: [uint8]`](#Payload.Tables)
  - [`let Rsdp: [uint8]`](#Payload.Rsdp)
  - [`let Loader: [uint8]`](#Payload.Loader)
- [`struct Resources`](#struct-Resources)
  - [`init()`](#Resources.init)
  - [`var Bytes: [uint8] = []`](#Resources.Bytes)
  - [`mutating func Memory32(base: uint32, count: uint32)`](#Resources.Memory32)
  - [`mutating func Interrupt(_ gsi: uint32, edge: bool = false)`](#Resources.Interrupt)
  - [`mutating func Io(base: uint16, count: uint8)`](#Resources.Io)
  - [`mutating func WordBusNumber(minBus: uint16, maxBus: uint16)`](#Resources.WordBusNumber)
  - [`mutating func DWordMemory(base: uint32, size: uint32)`](#Resources.DWordMemory)
  - [`mutating func QWordMemory(base: uint64, size: uint64)`](#Resources.QWordMemory)
  - [`mutating func DWordIo(min: uint32, max: uint32, translation: uint32, length: uint32)`](#Resources.DWordIo)
  - [`func Template() -> Aml`](#Resources.Template)
- [`struct Table`](#struct-Table)
  - [`init(signature: string, revision: uint8)`](#Table.init)
  - [`var Bytes: [uint8]`](#Table.Bytes)
  - [`mutating func U8(_ v: uint8)`](#Table.U8)
  - [`mutating func U16(_ v: uint16)`](#Table.U16)
  - [`mutating func U32(_ v: uint32)`](#Table.U32)
  - [`mutating func U64(_ v: uint64)`](#Table.U64)
  - [`mutating func Append(_ b: [uint8])`](#Table.Append)
  - [`mutating func Zeroes(_ n: int)`](#Table.Zeroes)
  - [`mutating func Gas(space: uint8, bitWidth: uint8, bitOffset: uint8 = 0, accessSize: uint8, address: uint64)`](#Table.Gas)
  - [`func Finish() -> [uint8]`](#Table.Finish)
- [`struct TableLoader`](#struct-TableLoader)
  - [`init()`](#TableLoader.init)
  - [`private(set) var Bytes: [uint8] = []`](#TableLoader.Bytes)
  - [`mutating func Allocate(file: string, align: uint32 = 64, zone: uint8 = 1)`](#TableLoader.Allocate)
  - [`mutating func AddPointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string)`](#TableLoader.AddPointer)
  - [`mutating func AddChecksum(file: string, resultOffset: uint32, start: uint32, length: uint32)`](#TableLoader.AddChecksum)
  - [`mutating func WritePointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string, srcOffset: uint32)`](#TableLoader.WritePointer)
- [`enum UartKind: uint8`](#enum-UartKind)

## Constants

<a id="let-OemId"></a>

```vertex
public let OemId: [uint8] = Array("VERTEX".utf8)
```

The OEM fields every table carries.

<a id="let-OemTableId"></a>

```vertex
public let OemTableId: [uint8] = Array("VERTEXVM".utf8)
```

## Functions

### func BuildArm64 <a id="func-BuildArm64"></a>

```vertex
public func BuildArm64(_ cfg: Arm64Config) -> Payload
```

Builds the complete set of ACPI tables and QEMU linker/loader commands for ARM64 UEFI.

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ b: [uint8]) -> uint8
```

The byte that makes a table's bytes sum to zero.

### func Dsdt <a id="func-Dsdt"></a>

```vertex
public func Dsdt(_ body: Aml) -> [uint8]
```

The Differentiated System Description Table: the AML for the whole
machine, under \_SB.

### func Fadt <a id="func-Fadt"></a>

```vertex
public func Fadt(_ o: FadtOptions) -> [uint8]
```

### func Gtdt <a id="func-Gtdt"></a>

```vertex
public func Gtdt(virtualTimerIrq: uint32 = 27) -> [uint8]
```

The Generic Timer Description Table (arm64): which PPIs the
architectural timers use. The standard assignment: secure EL1 29,
non-secure EL1 30, virtual 27, EL2 26.

### func Iort <a id="func-Iort"></a>

```vertex
public func Iort(itsId: uint32 = 0, pciSegment: uint32 = 0) -> [uint8]
```

The IO Remapping Table (arm64): how PCI requester IDs reach the ITS,
which Windows on ARM needs for MSIs. One ITS group and one root complex
node with an identity ID mapping.

### func Mcfg <a id="func-Mcfg"></a>

```vertex
public func Mcfg(ecam: uint64, segment: uint16 = 0, startBus: uint8 = 0, endBus: uint8 = 0) -> [uint8]
```

The PCI Express memory-mapped configuration table: where ECAM is.

### func Rsdp <a id="func-Rsdp"></a>

```vertex
public func Rsdp(xsdt: uint64) -> [uint8]
```

The Root System Description Pointer (ACPI 2.0+, 36 bytes), pointing at
the XSDT. Firmware finds it for the OS; with direct boot, vm tells the
kernel where it is.

### func Spcr <a id="func-Spcr"></a>

```vertex
public func Spcr(kind: UartKind, address: uint64, irq: uint32, io: bool) -> [uint8]
```

### func Tpm2Table <a id="func-Tpm2Table"></a>

```vertex
public func Tpm2Table() -> [uint8]
```

The TPM2 table (TCG ACPI Specification, revision 4): a client-class
TPM 2.0 whose start method is "uses the TIS / FIFO interface over MMIO"
(6), so there is no control area. The registers' address is in the
MSFT0101 device's _CRS in the DSDT.

### func Xsdt <a id="func-Xsdt"></a>

```vertex
public func Xsdt(_ tables: [uint64]) -> [uint8]
```

The Extended System Description Table: the addresses of every other
table (except the DSDT and FACS, which the FADT points at).

## Types

### enum AddressSpace <a id="enum-AddressSpace"></a>

```vertex
public enum AddressSpace
```

#### Properties

<a id="AddressSpace.memory"></a>

```vertex
public static let memory: uint8 = 0
```

<a id="AddressSpace.io"></a>

```vertex
public static let io: uint8 = 1
```

### struct Aml <a id="struct-Aml"></a>

```vertex
public struct Aml
```

A tiny AML (ACPI Machine Language) writer: enough to describe devices
in a DSDT: names, integers, strings, buffers, packages, devices,
methods and resource templates. It builds bytecode directly; there's no
ASL compiler involved.

#### Initializers

<a id="Aml.init"></a>

```vertex
public init()
```

#### Properties

<a id="Aml.Bytes"></a>

```vertex
public var Bytes: [uint8] = []
```

#### Methods

<a id="Aml.Name"></a>

```vertex
public mutating func Name(_ name: string, _ value: Aml)
```

Name(NAME, value)

<a id="Aml.Integer"></a>

```vertex
public static func Integer(_ v: uint64) -> Aml
```

<a id="Aml.String"></a>

```vertex
public static func String(_ s: string) -> Aml
```

<a id="Aml.EisaId"></a>

```vertex
public static func EisaId(_ id: string) -> Aml
```

An EISA ID such as "PNP0501", compressed to 32 bits.

<a id="Aml.Buffer"></a>

```vertex
public static func Buffer(_ bytes: [uint8]) -> Aml
```

<a id="Aml.Package"></a>

```vertex
public static func Package(_ items: [Aml]) -> Aml
```

<a id="Aml.Device"></a>

```vertex
public mutating func Device(_ name: string, _ body: Aml)
```

Device(NAME) { body }

<a id="Aml.Scope"></a>

```vertex
public mutating func Scope(_ path: string, _ body: Aml)
```

Scope(PATH) { body }, e.g. "\\_SB_".

<a id="Aml.ReturnMethod"></a>

```vertex
public mutating func ReturnMethod(_ name: string, _ value: Aml)
```

Method(NAME, 0) { Return(value) }

<a id="Aml.NotifyMethod"></a>

```vertex
public mutating func NotifyMethod(_ name: string, target: string, value: uint8)
```

Method(NAME, 1) { Notify(target, value) }

<a id="Aml.Append"></a>

```vertex
public mutating func Append(_ other: Aml)
```

### struct Arm64Config <a id="struct-Arm64Config"></a>

```vertex
public struct Arm64Config
```

#### Initializers

<a id="Arm64Config.init"></a>

```vertex
public init(
    vcpus: int = 2,
    virtioCount: int = 0,
    gicDistBase: uint64 = 0x0800_0000,
    gicRedistBase: uint64 = 0x080a_0000,
    gicRedistSizePerCpu: uint64 = 0x0002_0000,
    pciEcamBase: uint64 = 0x1000_0000,
    pciMmio32Base: uint64 = 0x2000_0000,
    pciMmio32Size: uint64 = 0x1000_0000,
    pciMmio64Base: uint64 = 0x04_0000_0000,
    pciMmio64Size: uint64 = 0x04_0000_0000,
    virtioMmioBase: uint64 = 0x0a00_0000,
    virtioMmioStride: uint64 = 0x0000_1000,
    virtioMmioSize: uint64 = 0x0000_0200,
    virtioIrqBase: uint32 = 16,
    uartBase: uint64 = 0x0900_0000,
    uartSize: uint64 = 0x0000_1000,
    uartIrq: uint32 = 1,
    rtcBase: uint64 = 0x0901_0000,
    rtcSize: uint64 = 0x0000_1000,
    rtcIrq: uint32 = 2
)
```

#### Properties

<a id="Arm64Config.Vcpus"></a>

```vertex
public var Vcpus: int
```

<a id="Arm64Config.VirtioCount"></a>

```vertex
public var VirtioCount: int
```

<a id="Arm64Config.GicDistBase"></a>

```vertex
public var GicDistBase: uint64
```

<a id="Arm64Config.GicRedistBase"></a>

```vertex
public var GicRedistBase: uint64
```

<a id="Arm64Config.GicRedistSizePerCpu"></a>

```vertex
public var GicRedistSizePerCpu: uint64
```

<a id="Arm64Config.PciEcamBase"></a>

```vertex
public var PciEcamBase: uint64
```

<a id="Arm64Config.PciMmio32Base"></a>

```vertex
public var PciMmio32Base: uint64
```

<a id="Arm64Config.PciMmio32Size"></a>

```vertex
public var PciMmio32Size: uint64
```

<a id="Arm64Config.PciMmio64Base"></a>

```vertex
public var PciMmio64Base: uint64
```

<a id="Arm64Config.PciMmio64Size"></a>

```vertex
public var PciMmio64Size: uint64
```

<a id="Arm64Config.VirtioMmioBase"></a>

```vertex
public var VirtioMmioBase: uint64
```

<a id="Arm64Config.VirtioMmioStride"></a>

```vertex
public var VirtioMmioStride: uint64
```

<a id="Arm64Config.VirtioMmioSize"></a>

```vertex
public var VirtioMmioSize: uint64
```

<a id="Arm64Config.VirtioIrqBase"></a>

```vertex
public var VirtioIrqBase: uint32
```

<a id="Arm64Config.PciIntxSpi"></a>

```vertex
public var PciIntxSpi: uint32 = 3
```

The SPI PCI INTA of slot 0 lands on; INTx swizzle over four from it.

<a id="Arm64Config.MsiFrameBase"></a>

```vertex
public var MsiFrameBase: uint64 = 0
```

A GIC MSI frame for PCI MSIs, and the SPIs it raises; 0 for none.

<a id="Arm64Config.MsiSpiBase"></a>

```vertex
public var MsiSpiBase: uint32 = 0
```

<a id="Arm64Config.MsiSpiCount"></a>

```vertex
public var MsiSpiCount: uint32 = 0
```

<a id="Arm64Config.TpmBase"></a>

```vertex
public var TpmBase: uint64 = 0
```

A TPM 2.0's TIS registers (5 localities, 0x5000 bytes); 0 for none.

<a id="Arm64Config.UartBase"></a>

```vertex
public var UartBase: uint64
```

<a id="Arm64Config.UartSize"></a>

```vertex
public var UartSize: uint64
```

<a id="Arm64Config.UartIrq"></a>

```vertex
public var UartIrq: uint32
```

<a id="Arm64Config.RtcBase"></a>

```vertex
public var RtcBase: uint64
```

<a id="Arm64Config.RtcSize"></a>

```vertex
public var RtcSize: uint64
```

<a id="Arm64Config.RtcIrq"></a>

```vertex
public var RtcIrq: uint32
```

### struct FadtOptions <a id="struct-FadtOptions"></a>

```vertex
public struct FadtOptions
```

The Fixed ACPI Description Table, hardware-reduced (ACPI 6.x, FADT
revision 6): no PM1 blocks, no SCI, no RTC or PM timer ports. On arm64
it also says PSCI is how CPUs are started, over HVC.

#### Initializers

<a id="FadtOptions.init"></a>

```vertex
public init(dsdt: uint64, arm: bool)
```

#### Properties

<a id="FadtOptions.Dsdt"></a>

```vertex
public var Dsdt: uint64
```

<a id="FadtOptions.Arm"></a>

```vertex
public var Arm: bool
```

<a id="FadtOptions.SleepControl"></a>

```vertex
public var SleepControl: uint64 = 0
```

SLEEP_CONTROL_REG / SLEEP_STATUS_REG for S5, if the platform has
them (a GED-owned register); 0 for none.

<a id="FadtOptions.ResetRegister"></a>

```vertex
public var ResetRegister: uint64 = 0
```

<a id="FadtOptions.ResetValue"></a>

```vertex
public var ResetValue: uint8 = 1
```

### enum LoaderCommandType <a id="enum-LoaderCommandType"></a>

```vertex
public enum LoaderCommandType: uint32
```

QemuLoaderCmd: command types for QEMU's ACPI table loader interface.

#### Cases

<a id="LoaderCommandType.allocate"></a>

```vertex
case allocate     = 1
```

<a id="LoaderCommandType.addPointer"></a>

```vertex
case addPointer   = 2
```

<a id="LoaderCommandType.addChecksum"></a>

```vertex
case addChecksum  = 3
```

<a id="LoaderCommandType.writePointer"></a>

```vertex
case writePointer = 4
```

### enum Madt <a id="enum-Madt"></a>

```vertex
public enum Madt
```

The Multiple APIC Description Table: the CPUs and their interrupt
controller. amd64: local APICs and an IOAPIC. arm64: GICC per CPU, the
GICD, the GICR range and (for MSIs) an ITS.

#### Methods

<a id="Madt.Build"></a>

```vertex
public static func Build(_ o: Amd64) -> [uint8]
```

<a id="Madt.Build-2"></a>

```vertex
public static func Build(_ o: Arm64) -> [uint8]
```

### struct Madt.Amd64 <a id="struct-Madt.Amd64"></a>

```vertex
public struct Amd64
```

#### Initializers

<a id="Madt.Amd64.init"></a>

```vertex
public init(cpus: int)
```

#### Properties

<a id="Madt.Amd64.Cpus"></a>

```vertex
public var Cpus: int
```

<a id="Madt.Amd64.IoApic"></a>

```vertex
public var IoApic: uint64 = 0xfec0_0000
```

<a id="Madt.Amd64.LocalApic"></a>

```vertex
public var LocalApic: uint32 = 0xfee0_0000
```

### struct Madt.Arm64 <a id="struct-Madt.Arm64"></a>

```vertex
public struct Arm64
```

#### Initializers

<a id="Madt.Arm64.init"></a>

```vertex
public init(cpus: int, distributor: uint64, redistributor: uint64, redistributorSize: uint32)
```

#### Properties

<a id="Madt.Arm64.Cpus"></a>

```vertex
public var Cpus: int
```

<a id="Madt.Arm64.Distributor"></a>

```vertex
public var Distributor: uint64
```

<a id="Madt.Arm64.Redistributor"></a>

```vertex
public var Redistributor: uint64
```

<a id="Madt.Arm64.RedistributorSize"></a>

```vertex
public var RedistributorSize: uint32
```

<a id="Madt.Arm64.Its"></a>

```vertex
public var Its: uint64 = 0
```

<a id="Madt.Arm64.MsiFrame"></a>

```vertex
public var MsiFrame: uint64 = 0
```

A GIC MSI frame (GICv2m-style) and the SPIs its writes raise.

<a id="Madt.Arm64.MsiSpiBase"></a>

```vertex
public var MsiSpiBase: uint32 = 0
```

<a id="Madt.Arm64.MsiSpiCount"></a>

```vertex
public var MsiSpiCount: uint32 = 0
```

<a id="Madt.Arm64.MaintenanceIrq"></a>

```vertex
public var MaintenanceIrq: uint32 = 0
```

The GIC's virtualization maintenance interrupt and the
performance monitor's PPI; 0 for none. Guests get no EL2, so no
maintenance interrupt.

<a id="Madt.Arm64.PmuIrq"></a>

```vertex
public var PmuIrq: uint32 = 23
```

### struct Payload <a id="struct-Payload"></a>

```vertex
public struct Payload
```

#### Initializers

<a id="Payload.init"></a>

```vertex
public init(tables: [uint8], rsdp: [uint8], loader: [uint8])
```

#### Properties

<a id="Payload.Tables"></a>

```vertex
public let Tables: [uint8]
```

<a id="Payload.Rsdp"></a>

```vertex
public let Rsdp: [uint8]
```

<a id="Payload.Loader"></a>

```vertex
public let Loader: [uint8]
```

### struct Resources <a id="struct-Resources"></a>

```vertex
public struct Resources
```

Resource templates for _CRS: the descriptors the DSDT's devices need.

#### Initializers

<a id="Resources.init"></a>

```vertex
public init()
```

#### Properties

<a id="Resources.Bytes"></a>

```vertex
public var Bytes: [uint8] = []
```

#### Methods

<a id="Resources.Memory32"></a>

```vertex
public mutating func Memory32(base: uint32, count: uint32)
```

A 32-bit fixed memory range.

<a id="Resources.Interrupt"></a>

```vertex
public mutating func Interrupt(_ gsi: uint32, edge: bool = false)
```

An extended interrupt: a GIC SPI or IOAPIC GSI, level, active high.

<a id="Resources.Io"></a>

```vertex
public mutating func Io(base: uint16, count: uint8)
```

A fixed I/O port range.

<a id="Resources.WordBusNumber"></a>

```vertex
public mutating func WordBusNumber(minBus: uint16, maxBus: uint16)
```

WordBusNumber descriptor (0x88, 13 bytes payload)

<a id="Resources.DWordMemory"></a>

```vertex
public mutating func DWordMemory(base: uint32, size: uint32)
```

DWordMemory descriptor (0x87, 23 bytes payload)

<a id="Resources.QWordMemory"></a>

```vertex
public mutating func QWordMemory(base: uint64, size: uint64)
```

QWordMemory descriptor (0x8a, 43 bytes payload)

<a id="Resources.DWordIo"></a>

```vertex
public mutating func DWordIo(min: uint32, max: uint32, translation: uint32, length: uint32)
```

DWordIo descriptor (0x87, 23 bytes payload)

<a id="Resources.Template"></a>

```vertex
public func Template() -> Aml
```

The template as a Buffer, with its end tag.

### struct Table <a id="struct-Table"></a>

```vertex
public struct Table
```

A table being built: the 36-byte standard header, then the body.

#### Initializers

<a id="Table.init"></a>

```vertex
public init(signature: string, revision: uint8)
```

#### Properties

<a id="Table.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

#### Methods

<a id="Table.U8"></a>

```vertex
public mutating func U8(_ v: uint8)
```

<a id="Table.U16"></a>

```vertex
public mutating func U16(_ v: uint16)
```

<a id="Table.U32"></a>

```vertex
public mutating func U32(_ v: uint32)
```

<a id="Table.U64"></a>

```vertex
public mutating func U64(_ v: uint64)
```

<a id="Table.Append"></a>

```vertex
public mutating func Append(_ b: [uint8])
```

<a id="Table.Zeroes"></a>

```vertex
public mutating func Zeroes(_ n: int)
```

<a id="Table.Gas"></a>

```vertex
public mutating func Gas(space: uint8, bitWidth: uint8, bitOffset: uint8 = 0, accessSize: uint8, address: uint64)
```

A Generic Address Structure (12 bytes).

<a id="Table.Finish"></a>

```vertex
public func Finish() -> [uint8]
```

Sets the length and checksum; the table is done.

### struct TableLoader <a id="struct-TableLoader"></a>

```vertex
public struct TableLoader
```

TableLoader builds the 128-byte packed commands for the "etc/table-loader" fw_cfg file.
EDK2's QemuFwCfgAcpiPlatformDxe parses these commands to download, link, and install ACPI tables.

#### Initializers

<a id="TableLoader.init"></a>

```vertex
public init()
```

#### Properties

<a id="TableLoader.Bytes"></a>

```vertex
public private(set) var Bytes: [uint8] = []
```

#### Methods

<a id="TableLoader.Allocate"></a>

```vertex
public mutating func Allocate(file: string, align: uint32 = 64, zone: uint8 = 1)
```

QemuLoaderCmdAllocate: allocate memory in guest zone and download file from fw_cfg.

<a id="TableLoader.AddPointer"></a>

```vertex
public mutating func AddPointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string)
```

QemuLoaderCmdAddPointer: add base address of srcFile to the pointer at destOffset in destFile.

<a id="TableLoader.AddChecksum"></a>

```vertex
public mutating func AddChecksum(file: string, resultOffset: uint32, start: uint32, length: uint32)
```

QemuLoaderCmdAddChecksum: compute 8-bit checksum of range and store at resultOffset.

<a id="TableLoader.WritePointer"></a>

```vertex
public mutating func WritePointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string, srcOffset: uint32)
```

QemuLoaderCmdWritePointer: write patched pointer back to fw_cfg.

### enum UartKind <a id="enum-UartKind"></a>

```vertex
public enum UartKind: uint8
```

The Serial Port Console Redirection table: which UART is the console.
Windows' Emergency Management Services and Linux's earlycon read it.

#### Cases

<a id="UartKind.ns16550"></a>

```vertex
case ns16550 = 0
```

<a id="UartKind.pl011"></a>

```vertex
case pl011 = 3
```

## Files

- aml.vs
- arm64.vs
- fadt.vs
- gtdt.vs
- iort.vs
- loader.vs
- madt.vs
- mcfg.vs
- rsdp.vs
- spcr.vs
- table.vs
- tpm2.vs
- xsdt.vs
