# package vm

```vertex
import "vm"
```

## Index

- [`func Create(_ cfg: Config, consoleWriter: any io.AsyncWriter = StdioWriter()) throws -> Machine`](#func-Create)
- [`func OpenDisk(_ path: fs.Path, readOnly: bool = false) async throws -> any disk.Image`](#func-OpenDisk)
- [`func WirePlatform(cfg: Config, partition: hypervisor.Partition, ram: GuestRam, consoleWriter: any io.AsyncWriter = StdioWriter()) throws -> WiredDevices`](#func-WirePlatform)
- [`struct Arm64Mmu`](#struct-Arm64Mmu)
  - [`init()`](#Arm64Mmu.init)
  - [`init(_ v: hypervisor.Vcpu)`](#Arm64Mmu.init-2)
  - [`var Sctlr: uint64 = 0`](#Arm64Mmu.Sctlr)
  - [`var Tcr: uint64 = 0`](#Arm64Mmu.Tcr)
  - [`var Ttbr0: uint64 = 0`](#Arm64Mmu.Ttbr0)
  - [`var Ttbr1: uint64 = 0`](#Arm64Mmu.Ttbr1)
  - [`func Translate(_ va: uint64, memory: device.GuestMemory) -> uint64?`](#Arm64Mmu.Translate)
  - [`func Read(_ va: uint64, count: int, memory: device.GuestMemory) -> [uint8]?`](#Arm64Mmu.Read)
- [`enum Boot`](#enum-Boot)
- [`struct Config`](#struct-Config)
  - [`init(cpus: int = 1, memory: uint64 = 1024 << 20)`](#Config.init)
  - [`var Cpus: int`](#Config.Cpus)
  - [`var Memory: uint64`](#Config.Memory)
  - [`var Profile: Profile`](#Config.Profile)
  - [`var Guest: Guest`](#Config.Guest)
  - [`var Boot: Boot?`](#Config.Boot)
  - [`var Storage: [StorageRole] = []`](#Config.Storage)
  - [`var Network: [NetworkRole] = []`](#Config.Network)
  - [`var Console: ConsoleRole = .stdio`](#Config.Console)
  - [`var Display: DisplayRole = .none`](#Config.Display)
  - [`var Tpm: TpmRole? = nil`](#Config.Tpm)
- [`enum ConsoleRole`](#enum-ConsoleRole)
- [`struct DisplayRole`](#struct-DisplayRole)
  - [`init(enabled: bool, width: int = 800, height: int = 600)`](#DisplayRole.init)
  - [`let Enabled: bool`](#DisplayRole.Enabled)
  - [`let Width: int`](#DisplayRole.Width)
  - [`let Height: int`](#DisplayRole.Height)
  - [`static let none = DisplayRole(enabled: false, width: 0, height: 0)`](#DisplayRole.none)
  - [`static let framebuffer = DisplayRole(enabled: true, width: 800, height: 600)`](#DisplayRole.framebuffer)
  - [`static func custom(width: int, height: int) -> DisplayRole`](#DisplayRole.custom)
- [`enum ExitStatus: Equatable, CustomStringConvertible`](#enum-ExitStatus)
  - [`var description: string { get }`](#ExitStatus.description)
- [`struct FramebufferConfig`](#struct-FramebufferConfig)
  - [`init(base: uint64 = PlatformArm64.FbBase, width: int = 800, height: int = 600, format: string = "a8r8g8b8")`](#FramebufferConfig.init)
  - [`let Base: uint64`](#FramebufferConfig.Base)
  - [`let Size: uint64`](#FramebufferConfig.Size)
  - [`let Width: int`](#FramebufferConfig.Width)
  - [`let Height: int`](#FramebufferConfig.Height)
  - [`let Stride: int`](#FramebufferConfig.Stride)
  - [`let Format: string`](#FramebufferConfig.Format)
- [`final class GicIrq: device.Irq`](#class-GicIrq)
  - [`init(partition: hypervisor.Partition, line: uint32)`](#GicIrq.init)
  - [`let Line: uint32`](#GicIrq.Line)
  - [`func Set(_ level: bool)`](#GicIrq.Set)
  - [`func Pulse()`](#GicIrq.Pulse)
- [`final class GicMsi: device.Msi`](#class-GicMsi)
  - [`init(partition: hypervisor.Partition)`](#GicMsi.init)
  - [`func Send(address: uint64, data: uint32)`](#GicMsi.Send)
- [`enum Guest`](#enum-Guest)
- [`final class GuestRam`](#class-GuestRam)
  - [`init(base: uint64, size: uint64) throws`](#GuestRam.init)
  - [`let Base: uint64`](#GuestRam.Base)
  - [`let Size: uint64`](#GuestRam.Size)
  - [`let Memory: device.GuestMemory`](#GuestRam.Memory)
  - [`var HostPointer: UnsafeMutableRawPointer? { get }`](#GuestRam.HostPointer)
  - [`var Range: device.Range { get }`](#GuestRam.Range)
  - [`func Map(into partition: hypervisor.Partition) throws`](#GuestRam.Map)
- [`final class Machine: PsciController`](#class-Machine)
  - [`let Config: Config`](#Machine.Config)
  - [`let Partition: hypervisor.Partition`](#Machine.Partition)
  - [`let Ram: GuestRam`](#Machine.Ram)
  - [`let Wired: WiredDevices`](#Machine.Wired)
  - [`var ConsoleUart: chipset.Pl011? { get }`](#Machine.ConsoleUart)
  - [`var KeyboardInput: virtio.Input? { get }`](#Machine.KeyboardInput)
  - [`var TabletInput: virtio.Input? { get }`](#Machine.TabletInput)
  - [`var UsbKeyboard: usb.Keyboard? { get }`](#Machine.UsbKeyboard)
  - [`var UsbTablet: usb.Tablet? { get }`](#Machine.UsbTablet)
  - [`var Framebuffer: display.Framebuffer? = nil`](#Machine.Framebuffer)
  - [`var Pflash: chipset.PflashCfi01? = nil`](#Machine.Pflash)
  - [`var Vcpus: [VcpuWorker] { get }`](#Machine.Vcpus)
  - [`static func Create(_ cfg: Config, consoleWriter: any io.AsyncWriter = StdioWriter()) throws -> Machine`](#Machine.Create)
  - [`func Start() throws`](#Machine.Start)
  - [`func Terminate()`](#Machine.Terminate)
  - [`func Kill()`](#Machine.Kill)
  - [`func Wait() async throws -> ExitStatus`](#Machine.Wait)
  - [`func Close()`](#Machine.Close)
  - [`func StartVcpu(mpidr: uint64, entry: uint64, context: uint64) -> int64`](#Machine.StartVcpu)
  - [`func StopVcpu(_ id: int)`](#Machine.StopVcpu)
  - [`func VcpuAffinity(mpidr: uint64) -> int64`](#Machine.VcpuAffinity)
  - [`func RequestShutdown()`](#Machine.RequestShutdown)
  - [`func RequestReset()`](#Machine.RequestReset)
- [`final class MemoryConsole: io.AsyncWriter`](#class-MemoryConsole)
  - [`init()`](#MemoryConsole.init)
  - [`private(set) var Bytes: [uint8] = []`](#MemoryConsole.Bytes)
  - [`var Text: string { get }`](#MemoryConsole.Text)
  - [`func Write(_ bytes: borrowing [uint8]) async throws`](#MemoryConsole.Write)
  - [`func Flush() async throws`](#MemoryConsole.Flush)
- [`struct NetworkRole`](#struct-NetworkRole)
  - [`init(port: any ether.Port, isNat: bool = false)`](#NetworkRole.init)
  - [`let Port: any ether.Port`](#NetworkRole.Port)
  - [`let IsNat: bool`](#NetworkRole.IsNat)
  - [`static func nat(config: nat.NatConfig = .default) -> NetworkRole`](#NetworkRole.nat)
  - [`static func port(_ p: any ether.Port) -> NetworkRole`](#NetworkRole.port)
- [`struct PlatformArm64`](#struct-PlatformArm64)
  - [`static let RamBase: uint64 = 0x4000_0000`](#PlatformArm64.RamBase)
  - [`static let GicDistBase: uint64 = 0x0800_0000`](#PlatformArm64.GicDistBase)
  - [`static let GicDistSize: uint64 = 0x0001_0000`](#PlatformArm64.GicDistSize)
  - [`static let GicRedistBase: uint64 = 0x080a_0000`](#PlatformArm64.GicRedistBase)
  - [`static let GicRedistSizePerCpu: uint64 = 0x0002_0000`](#PlatformArm64.GicRedistSizePerCpu)
  - [`static let GicMsiBase: uint64 = 0x0802_0000`](#PlatformArm64.GicMsiBase)
  - [`static let GicMsiSpiBase: uint32 = 128`](#PlatformArm64.GicMsiSpiBase)
  - [`static let GicMsiSpiCount: uint32 = 64`](#PlatformArm64.GicMsiSpiCount)
  - [`static let UartBase: uint64 = 0x0900_0000`](#PlatformArm64.UartBase)
  - [`static let UartSize: uint64 = 0x0000_1000`](#PlatformArm64.UartSize)
  - [`static let UartIrq: uint32 = 1`](#PlatformArm64.UartIrq)
  - [`static let RtcBase: uint64 = 0x0901_0000`](#PlatformArm64.RtcBase)
  - [`static let RtcSize: uint64 = 0x0000_1000`](#PlatformArm64.RtcSize)
  - [`static let RtcIrq: uint32 = 2`](#PlatformArm64.RtcIrq)
  - [`static let VirtioMmioBase: uint64 = 0x0a00_0000`](#PlatformArm64.VirtioMmioBase)
  - [`static let VirtioMmioSize: uint64 = 0x0000_0200`](#PlatformArm64.VirtioMmioSize)
  - [`static let VirtioMmioStride: uint64 = 0x0000_1000`](#PlatformArm64.VirtioMmioStride)
  - [`static let VirtioIrqBase: uint32 = 16`](#PlatformArm64.VirtioIrqBase)
  - [`static let PciEcamBase: uint64 = 0x1000_0000`](#PlatformArm64.PciEcamBase)
  - [`static let PciEcamSize: uint64 = 0x1000_0000`](#PlatformArm64.PciEcamSize)
  - [`static let PciMmio32Base: uint64 = 0x2000_0000`](#PlatformArm64.PciMmio32Base)
  - [`static let PciMmio32Size: uint64 = 0x1000_0000`](#PlatformArm64.PciMmio32Size)
  - [`static let PciMmio64Base: uint64 = 0x04_0000_0000`](#PlatformArm64.PciMmio64Base)
  - [`static let PciMmio64Size: uint64 = 0x04_0000_0000`](#PlatformArm64.PciMmio64Size)
  - [`static let PciIntxSpi: uint32 = 3`](#PlatformArm64.PciIntxSpi)
  - [`static let FbBase: uint64 = 0x3000_0000`](#PlatformArm64.FbBase)
  - [`static let FbSize: uint64 = 0x0080_0000`](#PlatformArm64.FbSize)
  - [`static let TpmBase: uint64 = 0x0c00_0000`](#PlatformArm64.TpmBase)
  - [`static let FwCfgBase: uint64 = 0x0902_0000`](#PlatformArm64.FwCfgBase)
  - [`static let FwCfgSize: uint64 = 0x0000_1000`](#PlatformArm64.FwCfgSize)
  - [`static let Flash0Base: uint64 = 0x0000_0000`](#PlatformArm64.Flash0Base)
  - [`static let Flash0Size: uint64 = 64 << 20`](#PlatformArm64.Flash0Size)
  - [`static let Flash1Base: uint64 = 0x0400_0000`](#PlatformArm64.Flash1Base)
  - [`static let Flash1Size: uint64 = 64 << 20`](#PlatformArm64.Flash1Size)
  - [`static func BuildFdt(vcpus: int, ram: device.Range, initrd: device.Range? = nil, cmdline: string, virtioCount: int, framebuffer: FramebufferConfig? = nil, enableFwCfg: bool = false, enableFlash: bool = false, enablePci: bool = false, enableTpm: bool = false) -> [uint8]`](#PlatformArm64.BuildFdt)
- [`enum Profile`](#enum-Profile)
- [`protocol PsciController: AnyObject`](#protocol-PsciController)
  - [`func StartVcpu(mpidr: uint64, entry: uint64, context: uint64) -> int64`](#PsciController.StartVcpu)
  - [`func StopVcpu(_ id: int)`](#PsciController.StopVcpu)
  - [`func VcpuAffinity(mpidr: uint64) -> int64`](#PsciController.VcpuAffinity)
  - [`func RequestShutdown()`](#PsciController.RequestShutdown)
  - [`func RequestReset()`](#PsciController.RequestReset)
- [`final class PsciHandler`](#class-PsciHandler)
  - [`init(controller: any PsciController)`](#PsciHandler.init)
  - [`func Handle(vcpu: hypervisor.Vcpu, call: hypervisor.Hypercall) throws -> bool`](#PsciHandler.Handle)
- [`final class StdioWriter: io.AsyncWriter`](#class-StdioWriter)
  - [`init()`](#StdioWriter.init)
  - [`func Write(_ bytes: borrowing [uint8]) async throws`](#StdioWriter.Write)
  - [`func Flush() async throws`](#StdioWriter.Flush)
- [`struct StorageRole`](#struct-StorageRole)
  - [`init(image: any disk.Image, isInstaller: bool = false)`](#StorageRole.init)
  - [`let Image: any disk.Image`](#StorageRole.Image)
  - [`let IsInstaller: bool`](#StorageRole.IsInstaller)
  - [`static func disk(_ img: any disk.Image) -> StorageRole`](#StorageRole.disk)
  - [`static func installer(_ img: any disk.Image) -> StorageRole`](#StorageRole.installer)
- [`enum TpmRole`](#enum-TpmRole)
- [`final class VcpuWorker`](#class-VcpuWorker)
  - [`init(id: int, partition: hypervisor.Partition, mmioBus: device.MmioBus, pioBus: device.PioBus, psci: PsciHandler, isBootCpu: bool = false, entryPc: uint64 = 0, entryX0: uint64 = 0)`](#VcpuWorker.init)
  - [`let Id: int`](#VcpuWorker.Id)
  - [`var EntryPc: uint64`](#VcpuWorker.EntryPc)
  - [`var EntryX0: uint64`](#VcpuWorker.EntryX0)
  - [`var EntryPstate: uint64 = 0x3c5`](#VcpuWorker.EntryPstate)
  - [`var ExitCounts: [int] = [int](repeating: 0, count: 7)`](#VcpuWorker.ExitCounts)
  - [`var LastRegisters: hypervisor.Registers? = nil`](#VcpuWorker.LastRegisters)
  - [`var LastMmu: Arm64Mmu? = nil`](#VcpuWorker.LastMmu)
  - [`func Start()`](#VcpuWorker.Start)
  - [`func Stop()`](#VcpuWorker.Stop)
  - [`func Join()`](#VcpuWorker.Join)
  - [`func CurrentState() -> (uint64, uint64, string)`](#VcpuWorker.CurrentState)
- [`enum VmError: Error, CustomStringConvertible`](#enum-VmError)
  - [`var description: string { get }`](#VmError.description)
- [`struct WiredDevices`](#struct-WiredDevices)
  - [`var MmioBus = device.MmioBus()`](#WiredDevices.MmioBus)
  - [`var PioBus = device.PioBus()`](#WiredDevices.PioBus)
  - [`var ConsoleUart: chipset.Pl011? = nil`](#WiredDevices.ConsoleUart)
  - [`var VirtioTransports: [virtio.MmioTransport] = []`](#WiredDevices.VirtioTransports)
  - [`var KeyboardInput: virtio.Input? = nil`](#WiredDevices.KeyboardInput)
  - [`var TabletInput: virtio.Input? = nil`](#WiredDevices.TabletInput)
  - [`var Rng: virtio.Rng? = nil`](#WiredDevices.Rng)
  - [`var VirtioCount: int = 0`](#WiredDevices.VirtioCount)
  - [`var FwCfg: boot.FwCfg? = nil`](#WiredDevices.FwCfg)
  - [`var PciRoot: pci.Root? = nil`](#WiredDevices.PciRoot)
  - [`var Ramfb: display.Ramfb? = nil`](#WiredDevices.Ramfb)
  - [`var Xhci: usb.Xhci? = nil`](#WiredDevices.Xhci)
  - [`var UsbKeyboard: usb.Keyboard? = nil`](#WiredDevices.UsbKeyboard)
  - [`var UsbTablet: usb.Tablet? = nil`](#WiredDevices.UsbTablet)
  - [`var Nvme: nvme.Controller? = nil`](#WiredDevices.Nvme)
  - [`var Tpm: tpm.Tis? = nil`](#WiredDevices.Tpm)

## Functions

### func Create <a id="func-Create"></a>

```vertex
public func Create(_ cfg: Config, consoleWriter: any io.AsyncWriter = StdioWriter()) throws -> Machine
```

Entry point to create a VM: `vm.Create(cfg)`.

### func OpenDisk <a id="func-OpenDisk"></a>

```vertex
public func OpenDisk(_ path: fs.Path, readOnly: bool = false) async throws -> any disk.Image
```

Convenience function to create and open a disk image from a file path.

### func WirePlatform <a id="func-WirePlatform"></a>

```vertex
public func WirePlatform(
    cfg: Config,
    partition: hypervisor.Partition,
    ram: GuestRam,
    consoleWriter: any io.AsyncWriter = StdioWriter()
) throws -> WiredDevices
```

WirePlatform instantiates and places devices on the buses according to the config.

## Types

### struct Arm64Mmu <a id="struct-Arm64Mmu"></a>

```vertex
public struct Arm64Mmu
```

The translation state of an arm64 vCPU: enough to walk its page tables
from the host when a guest hangs or faults.

#### Initializers

<a id="Arm64Mmu.init"></a>

```vertex
public init()
```

<a id="Arm64Mmu.init-2"></a>

```vertex
public init(_ v: hypervisor.Vcpu)
```

#### Properties

<a id="Arm64Mmu.Sctlr"></a>

```vertex
public var Sctlr: uint64 = 0
```

<a id="Arm64Mmu.Tcr"></a>

```vertex
public var Tcr: uint64 = 0
```

<a id="Arm64Mmu.Ttbr0"></a>

```vertex
public var Ttbr0: uint64 = 0
```

<a id="Arm64Mmu.Ttbr1"></a>

```vertex
public var Ttbr1: uint64 = 0
```

#### Methods

<a id="Arm64Mmu.Translate"></a>

```vertex
public func Translate(_ va: uint64, memory: device.GuestMemory) -> uint64?
```

The guest-physical address `va` maps to, or nil. 4 KiB granule only,
which is what Linux, Windows and EDK2 use.

<a id="Arm64Mmu.Read"></a>

```vertex
public func Read(_ va: uint64, count: int, memory: device.GuestMemory) -> [uint8]?
```

Reads `count` bytes at a guest-virtual address, page by page.

### enum Boot <a id="enum-Boot"></a>

```vertex
public enum Boot
```

How the guest boots from reset.

#### Cases

<a id="Boot.linux"></a>

```vertex
case linux(kernel: [uint8], initrd: [uint8]? = nil, cmdline: string = "")
```

Direct kernel boot: arm64 Image, PVH ELF, or bzImage.

<a id="Boot.efi"></a>

```vertex
case efi(firmware: [uint8], vars: [uint8]? = nil)
```

UEFI firmware image with optional NVRAM variable store.

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Virtual machine configuration by role.

#### Initializers

<a id="Config.init"></a>

```vertex
public init(cpus: int = 1, memory: uint64 = 1024 << 20)
```

#### Properties

<a id="Config.Cpus"></a>

```vertex
public var Cpus: int
```

<a id="Config.Memory"></a>

```vertex
public var Memory: uint64
```

<a id="Config.Profile"></a>

```vertex
public var Profile: Profile
```

<a id="Config.Guest"></a>

```vertex
public var Guest: Guest
```

<a id="Config.Boot"></a>

```vertex
public var Boot: Boot?
```

<a id="Config.Storage"></a>

```vertex
public var Storage: [StorageRole] = []
```

<a id="Config.Network"></a>

```vertex
public var Network: [NetworkRole] = []
```

<a id="Config.Console"></a>

```vertex
public var Console: ConsoleRole = .stdio
```

<a id="Config.Display"></a>

```vertex
public var Display: DisplayRole = .none
```

<a id="Config.Tpm"></a>

```vertex
public var Tpm: TpmRole? = nil
```

A TPM 2.0 (UEFI boots only: firmware and OS find it by DTB and ACPI).

### enum ConsoleRole <a id="enum-ConsoleRole"></a>

```vertex
public enum ConsoleRole
```

#### Cases

<a id="ConsoleRole.stdio"></a>

```vertex
case stdio
```

<a id="ConsoleRole.none"></a>

```vertex
case none
```

### struct DisplayRole <a id="struct-DisplayRole"></a>

```vertex
public struct DisplayRole
```

#### Initializers

<a id="DisplayRole.init"></a>

```vertex
public init(enabled: bool, width: int = 800, height: int = 600)
```

#### Properties

<a id="DisplayRole.Enabled"></a>

```vertex
public let Enabled: bool
```

<a id="DisplayRole.Width"></a>

```vertex
public let Width: int
```

<a id="DisplayRole.Height"></a>

```vertex
public let Height: int
```

<a id="DisplayRole.none"></a>

```vertex
public static let none = DisplayRole(enabled: false, width: 0, height: 0)
```

<a id="DisplayRole.framebuffer"></a>

```vertex
public static let framebuffer = DisplayRole(enabled: true, width: 800, height: 600)
```

#### Methods

<a id="DisplayRole.custom"></a>

```vertex
public static func custom(width: int, height: int) -> DisplayRole
```

### enum ExitStatus <a id="enum-ExitStatus"></a>

```vertex
public enum ExitStatus: Equatable, CustomStringConvertible
```

The status returned when a virtual machine stops execution.

#### Cases

<a id="ExitStatus.poweredOff"></a>

```vertex
case poweredOff
```

<a id="ExitStatus.reset"></a>

```vertex
case reset
```

<a id="ExitStatus.crashed"></a>

```vertex
case crashed(string)
```

#### Properties

<a id="ExitStatus.description"></a>

```vertex
public var description: string { get }
```

### struct FramebufferConfig <a id="struct-FramebufferConfig"></a>

```vertex
public struct FramebufferConfig
```

#### Initializers

<a id="FramebufferConfig.init"></a>

```vertex
public init(
    base: uint64 = PlatformArm64.FbBase,
    width: int = 800,
    height: int = 600,
    format: string = "a8r8g8b8"
)
```

#### Properties

<a id="FramebufferConfig.Base"></a>

```vertex
public let Base: uint64
```

<a id="FramebufferConfig.Size"></a>

```vertex
public let Size: uint64
```

<a id="FramebufferConfig.Width"></a>

```vertex
public let Width: int
```

<a id="FramebufferConfig.Height"></a>

```vertex
public let Height: int
```

<a id="FramebufferConfig.Stride"></a>

```vertex
public let Stride: int
```

<a id="FramebufferConfig.Format"></a>

```vertex
public let Format: string
```

### class GicIrq <a id="class-GicIrq"></a>

```vertex
public final class GicIrq: device.Irq
```

GicIrq routes an interrupt line to an in-kernel GIC SPI.

#### Initializers

<a id="GicIrq.init"></a>

```vertex
public init(partition: hypervisor.Partition, line: uint32)
```

#### Properties

<a id="GicIrq.Line"></a>

```vertex
public let Line: uint32
```

#### Methods

<a id="GicIrq.Set"></a>

```vertex
public func Set(_ level: bool)
```

<a id="GicIrq.Pulse"></a>

```vertex
public func Pulse()
```

### class GicMsi <a id="class-GicMsi"></a>

```vertex
public final class GicMsi: device.Msi
```

GicMsi delivers a PCI function's MSI write to the in-kernel GIC's MSI
frame, which raises the SPI the data names.

#### Initializers

<a id="GicMsi.init"></a>

```vertex
public init(partition: hypervisor.Partition)
```

#### Methods

<a id="GicMsi.Send"></a>

```vertex
public func Send(address: uint64, data: uint32)
```

### enum Guest <a id="enum-Guest"></a>

```vertex
public enum Guest
```

The guest OS family, used to configure sensible hardware defaults.

#### Cases

<a id="Guest.linux"></a>

```vertex
case linux
```

<a id="Guest.windows"></a>

```vertex
case windows
```

<a id="Guest.bsd"></a>

```vertex
case bsd
```

<a id="Guest.other"></a>

```vertex
case other
```

### class GuestRam <a id="class-GuestRam"></a>

```vertex
public final class GuestRam
```

GuestRam manages host-allocated memory mapped into a partition as guest RAM.

#### Initializers

<a id="GuestRam.init"></a>

```vertex
public init(base: uint64, size: uint64) throws
```

#### Properties

<a id="GuestRam.Base"></a>

```vertex
public let Base: uint64
```

<a id="GuestRam.Size"></a>

```vertex
public let Size: uint64
```

<a id="GuestRam.Memory"></a>

```vertex
public let Memory: device.GuestMemory
```

<a id="GuestRam.HostPointer"></a>

```vertex
public var HostPointer: UnsafeMutableRawPointer? { get }
```

<a id="GuestRam.Range"></a>

```vertex
public var Range: device.Range { get }
```

#### Methods

<a id="GuestRam.Map"></a>

```vertex
public func Map(into partition: hypervisor.Partition) throws
```

### class Machine <a id="class-Machine"></a>

```vertex
public final class Machine: PsciController
```

A running virtual machine.

#### Properties

<a id="Machine.Config"></a>

```vertex
public let Config: Config
```

<a id="Machine.Partition"></a>

```vertex
public let Partition: hypervisor.Partition
```

<a id="Machine.Ram"></a>

```vertex
public let Ram: GuestRam
```

<a id="Machine.Wired"></a>

```vertex
public let Wired: WiredDevices
```

<a id="Machine.ConsoleUart"></a>

```vertex
public var ConsoleUart: chipset.Pl011? { get }
```

<a id="Machine.KeyboardInput"></a>

```vertex
public var KeyboardInput: virtio.Input? { get }
```

<a id="Machine.TabletInput"></a>

```vertex
public var TabletInput: virtio.Input? { get }
```

<a id="Machine.UsbKeyboard"></a>

```vertex
public var UsbKeyboard: usb.Keyboard? { get }
```

A Windows guest's USB keyboard and tablet.

<a id="Machine.UsbTablet"></a>

```vertex
public var UsbTablet: usb.Tablet? { get }
```

<a id="Machine.Framebuffer"></a>

```vertex
public var Framebuffer: display.Framebuffer? = nil
```

<a id="Machine.Pflash"></a>

```vertex
public var Pflash: chipset.PflashCfi01? = nil
```

<a id="Machine.Vcpus"></a>

```vertex
public var Vcpus: [VcpuWorker] { get }
```

#### Methods

<a id="Machine.Create"></a>

```vertex
public static func Create(_ cfg: Config, consoleWriter: any io.AsyncWriter = StdioWriter()) throws -> Machine
```

Creates and configures a new virtual machine from `cfg`.

<a id="Machine.Start"></a>

```vertex
public func Start() throws
```

Starts execution of the virtual machine.

<a id="Machine.Terminate"></a>

```vertex
public func Terminate()
```

Stops all vCPUs cleanly.

<a id="Machine.Kill"></a>

```vertex
public func Kill()
```

Kills the virtual machine immediately.

<a id="Machine.Wait"></a>

```vertex
public func Wait() async throws -> ExitStatus
```

Awaits until the virtual machine shuts down, resets, or crashes.

<a id="Machine.Close"></a>

```vertex
public func Close()
```

<a id="Machine.StartVcpu"></a>

```vertex
public func StartVcpu(mpidr: uint64, entry: uint64, context: uint64) -> int64
```

<a id="Machine.StopVcpu"></a>

```vertex
public func StopVcpu(_ id: int)
```

<a id="Machine.VcpuAffinity"></a>

```vertex
public func VcpuAffinity(mpidr: uint64) -> int64
```

<a id="Machine.RequestShutdown"></a>

```vertex
public func RequestShutdown()
```

<a id="Machine.RequestReset"></a>

```vertex
public func RequestReset()
```

### class MemoryConsole <a id="class-MemoryConsole"></a>

```vertex
public final class MemoryConsole: io.AsyncWriter
```

MemoryConsole captures guest console output in a thread-safe buffer for testing or inspection.

#### Initializers

<a id="MemoryConsole.init"></a>

```vertex
public init()
```

#### Properties

<a id="MemoryConsole.Bytes"></a>

```vertex
public private(set) var Bytes: [uint8] = []
```

<a id="MemoryConsole.Text"></a>

```vertex
public var Text: string { get }
```

#### Methods

<a id="MemoryConsole.Write"></a>

```vertex
public func Write(_ bytes: borrowing [uint8]) async throws
```

<a id="MemoryConsole.Flush"></a>

```vertex
public func Flush() async throws
```

### struct NetworkRole <a id="struct-NetworkRole"></a>

```vertex
public struct NetworkRole
```

#### Initializers

<a id="NetworkRole.init"></a>

```vertex
public init(port: any ether.Port, isNat: bool = false)
```

#### Properties

<a id="NetworkRole.Port"></a>

```vertex
public let Port: any ether.Port
```

<a id="NetworkRole.IsNat"></a>

```vertex
public let IsNat: bool
```

#### Methods

<a id="NetworkRole.nat"></a>

```vertex
public static func nat(config: nat.NatConfig = .default) -> NetworkRole
```

<a id="NetworkRole.port"></a>

```vertex
public static func port(_ p: any ether.Port) -> NetworkRole
```

### struct PlatformArm64 <a id="struct-PlatformArm64"></a>

```vertex
public struct PlatformArm64
```

#### Properties

<a id="PlatformArm64.RamBase"></a>

```vertex
public static let RamBase: uint64 = 0x4000_0000
```

<a id="PlatformArm64.GicDistBase"></a>

```vertex
public static let GicDistBase: uint64 = 0x0800_0000
```

<a id="PlatformArm64.GicDistSize"></a>

```vertex
public static let GicDistSize: uint64 = 0x0001_0000
```

<a id="PlatformArm64.GicRedistBase"></a>

```vertex
public static let GicRedistBase: uint64 = 0x080a_0000
```

<a id="PlatformArm64.GicRedistSizePerCpu"></a>

```vertex
public static let GicRedistSizePerCpu: uint64 = 0x0002_0000
```

<a id="PlatformArm64.GicMsiBase"></a>

```vertex
public static let GicMsiBase: uint64 = 0x0802_0000
```

A GICv2m-style MSI frame (Hypervisor.framework's MSI region): a
device's MSI write raises one of the SPIs it owns.

<a id="PlatformArm64.GicMsiSpiBase"></a>

```vertex
public static let GicMsiSpiBase: uint32 = 128
```

<a id="PlatformArm64.GicMsiSpiCount"></a>

```vertex
public static let GicMsiSpiCount: uint32 = 64
```

<a id="PlatformArm64.UartBase"></a>

```vertex
public static let UartBase: uint64 = 0x0900_0000
```

<a id="PlatformArm64.UartSize"></a>

```vertex
public static let UartSize: uint64 = 0x0000_1000
```

<a id="PlatformArm64.UartIrq"></a>

```vertex
public static let UartIrq: uint32 = 1
```

<a id="PlatformArm64.RtcBase"></a>

```vertex
public static let RtcBase: uint64 = 0x0901_0000
```

<a id="PlatformArm64.RtcSize"></a>

```vertex
public static let RtcSize: uint64 = 0x0000_1000
```

<a id="PlatformArm64.RtcIrq"></a>

```vertex
public static let RtcIrq: uint32 = 2
```

<a id="PlatformArm64.VirtioMmioBase"></a>

```vertex
public static let VirtioMmioBase: uint64 = 0x0a00_0000
```

<a id="PlatformArm64.VirtioMmioSize"></a>

```vertex
public static let VirtioMmioSize: uint64 = 0x0000_0200
```

<a id="PlatformArm64.VirtioMmioStride"></a>

```vertex
public static let VirtioMmioStride: uint64 = 0x0000_1000
```

<a id="PlatformArm64.VirtioIrqBase"></a>

```vertex
public static let VirtioIrqBase: uint32 = 16
```

<a id="PlatformArm64.PciEcamBase"></a>

```vertex
public static let PciEcamBase: uint64 = 0x1000_0000
```

<a id="PlatformArm64.PciEcamSize"></a>

```vertex
public static let PciEcamSize: uint64 = 0x1000_0000
```

<a id="PlatformArm64.PciMmio32Base"></a>

```vertex
public static let PciMmio32Base: uint64 = 0x2000_0000
```

<a id="PlatformArm64.PciMmio32Size"></a>

```vertex
public static let PciMmio32Size: uint64 = 0x1000_0000
```

<a id="PlatformArm64.PciMmio64Base"></a>

```vertex
public static let PciMmio64Base: uint64 = 0x04_0000_0000
```

256 MiB

<a id="PlatformArm64.PciMmio64Size"></a>

```vertex
public static let PciMmio64Size: uint64 = 0x04_0000_0000
```

16 GiB

<a id="PlatformArm64.PciIntxSpi"></a>

```vertex
public static let PciIntxSpi: uint32 = 3
```

16 GiB
PCI INTA–INTD swizzle across SPIs 3...6, as on QEMU's virt.

<a id="PlatformArm64.FbBase"></a>

```vertex
public static let FbBase: uint64 = 0x3000_0000
```

<a id="PlatformArm64.FbSize"></a>

```vertex
public static let FbSize: uint64 = 0x0080_0000
```

<a id="PlatformArm64.TpmBase"></a>

```vertex
public static let TpmBase: uint64 = 0x0c00_0000
```

A TPM's TIS registers, 5 localities of 4 KiB.

<a id="PlatformArm64.FwCfgBase"></a>

```vertex
public static let FwCfgBase: uint64 = 0x0902_0000
```

<a id="PlatformArm64.FwCfgSize"></a>

```vertex
public static let FwCfgSize: uint64 = 0x0000_1000
```

<a id="PlatformArm64.Flash0Base"></a>

```vertex
public static let Flash0Base: uint64 = 0x0000_0000
```

<a id="PlatformArm64.Flash0Size"></a>

```vertex
public static let Flash0Size: uint64 = 64 << 20
```

<a id="PlatformArm64.Flash1Base"></a>

```vertex
public static let Flash1Base: uint64 = 0x0400_0000
```

<a id="PlatformArm64.Flash1Size"></a>

```vertex
public static let Flash1Size: uint64 = 64 << 20
```

#### Methods

<a id="PlatformArm64.BuildFdt"></a>

```vertex
public static func BuildFdt(
    vcpus: int,
    ram: device.Range,
    initrd: device.Range? = nil,
    cmdline: string,
    virtioCount: int,
    framebuffer: FramebufferConfig? = nil,
    enableFwCfg: bool = false,
    enableFlash: bool = false,
    enablePci: bool = false,
    enableTpm: bool = false
) -> [uint8]
```

Builds a Flattened Device Tree (DTB) describing this arm64 microVM for Linux.

### enum Profile <a id="enum-Profile"></a>

```vertex
public enum Profile
```

The platform profile determining bus topology and device standards.

#### Cases

<a id="Profile.micro"></a>

```vertex
case micro
```

Linux microVM: direct kernel boot, VirtIO over MMIO, FDT or minimal ACPI.

<a id="Profile.standard"></a>

```vertex
case standard
```

Standard machine: PCIe hierarchy, ACPI, UEFI or direct boot.

### protocol PsciController <a id="protocol-PsciController"></a>

```vertex
public protocol PsciController: AnyObject
```

#### Methods

<a id="PsciController.StartVcpu"></a>

```vertex
func StartVcpu(mpidr: uint64, entry: uint64, context: uint64) -> int64
```

<a id="PsciController.StopVcpu"></a>

```vertex
func StopVcpu(_ id: int)
```

<a id="PsciController.VcpuAffinity"></a>

```vertex
func VcpuAffinity(mpidr: uint64) -> int64
```

<a id="PsciController.RequestShutdown"></a>

```vertex
func RequestShutdown()
```

<a id="PsciController.RequestReset"></a>

```vertex
func RequestReset()
```

### class PsciHandler <a id="class-PsciHandler"></a>

```vertex
public final class PsciHandler
```

#### Initializers

<a id="PsciHandler.init"></a>

```vertex
public init(controller: any PsciController)
```

#### Methods

<a id="PsciHandler.Handle"></a>

```vertex
public func Handle(vcpu: hypervisor.Vcpu, call: hypervisor.Hypercall) throws -> bool
```

Handles an HVC hypercall exit on arm64. Returns false if the vCPU should stop.

### class StdioWriter <a id="class-StdioWriter"></a>

```vertex
public final class StdioWriter: io.AsyncWriter
```

StdioWriter forwards guest console writes to the host process's stdout.

#### Initializers

<a id="StdioWriter.init"></a>

```vertex
public init()
```

#### Methods

<a id="StdioWriter.Write"></a>

```vertex
public func Write(_ bytes: borrowing [uint8]) async throws
```

<a id="StdioWriter.Flush"></a>

```vertex
public func Flush() async throws
```

### struct StorageRole <a id="struct-StorageRole"></a>

```vertex
public struct StorageRole
```

#### Initializers

<a id="StorageRole.init"></a>

```vertex
public init(image: any disk.Image, isInstaller: bool = false)
```

#### Properties

<a id="StorageRole.Image"></a>

```vertex
public let Image: any disk.Image
```

<a id="StorageRole.IsInstaller"></a>

```vertex
public let IsInstaller: bool
```

#### Methods

<a id="StorageRole.disk"></a>

```vertex
public static func disk(_ img: any disk.Image) -> StorageRole
```

<a id="StorageRole.installer"></a>

```vertex
public static func installer(_ img: any disk.Image) -> StorageRole
```

### enum TpmRole <a id="enum-TpmRole"></a>

```vertex
public enum TpmRole
```

A TPM 2.0 for the guest.

#### Cases

<a id="TpmRole.swtpm"></a>

```vertex
case swtpm(stateDir: string)
```

swtpm, keeping the TPM's state (its seeds, NV, keys) in `stateDir`.

### class VcpuWorker <a id="class-VcpuWorker"></a>

```vertex
public final class VcpuWorker
```

VcpuWorker manages a vCPU instance running on its own dedicated OS thread.

#### Initializers

<a id="VcpuWorker.init"></a>

```vertex
public init(
    id: int,
    partition: hypervisor.Partition,
    mmioBus: device.MmioBus,
    pioBus: device.PioBus,
    psci: PsciHandler,
    isBootCpu: bool = false,
    entryPc: uint64 = 0,
    entryX0: uint64 = 0
)
```

#### Properties

<a id="VcpuWorker.Id"></a>

```vertex
public let Id: int
```

<a id="VcpuWorker.EntryPc"></a>

```vertex
public var EntryPc: uint64
```

<a id="VcpuWorker.EntryX0"></a>

```vertex
public var EntryX0: uint64
```

<a id="VcpuWorker.EntryPstate"></a>

```vertex
public var EntryPstate: uint64 = 0x3c5
```

<a id="VcpuWorker.ExitCounts"></a>

```vertex
public var ExitCounts: [int] = [int](repeating: 0, count: 7)
```

Exit counts by kind, for diagnostics: mmio, hypercall, sysreg, halt, timer, canceled, other.

<a id="VcpuWorker.LastRegisters"></a>

```vertex
public var LastRegisters: hypervisor.Registers? = nil
```

The registers as of the last `CurrentState` or fault dump.

<a id="VcpuWorker.LastMmu"></a>

```vertex
public var LastMmu: Arm64Mmu? = nil
```

The translation registers as of the last dump.

#### Methods

<a id="VcpuWorker.Start"></a>

```vertex
public func Start()
```

Spawns the dedicated thread and enters the execution loop.

<a id="VcpuWorker.Stop"></a>

```vertex
public func Stop()
```

Signals the vCPU to stop and kicks it out of the guest.

<a id="VcpuWorker.Join"></a>

```vertex
public func Join()
```

<a id="VcpuWorker.CurrentState"></a>

```vertex
public func CurrentState() -> (uint64, uint64, string)
```

Describes the vCPU's registers. HVF only lets the owning thread read
them, so this kicks the vCPU and waits for its thread to answer.

### enum VmError <a id="enum-VmError"></a>

```vertex
public enum VmError: Error, CustomStringConvertible
```

VmError is an error during machine creation, configuration, or execution.

#### Cases

<a id="VmError.hypervisorUnavailable"></a>

```vertex
case hypervisorUnavailable(string)
```

<a id="VmError.memoryAllocationFailed"></a>

```vertex
case memoryAllocationFailed(string)
```

<a id="VmError.bootFailed"></a>

```vertex
case bootFailed(string)
```

<a id="VmError.deviceError"></a>

```vertex
case deviceError(string)
```

<a id="VmError.invalidConfig"></a>

```vertex
case invalidConfig(string)
```

<a id="VmError.crashed"></a>

```vertex
case crashed(string)
```

#### Properties

<a id="VmError.description"></a>

```vertex
public var description: string { get }
```

### struct WiredDevices <a id="struct-WiredDevices"></a>

```vertex
public struct WiredDevices
```

#### Properties

<a id="WiredDevices.MmioBus"></a>

```vertex
public var MmioBus = device.MmioBus()
```

<a id="WiredDevices.PioBus"></a>

```vertex
public var PioBus = device.PioBus()
```

<a id="WiredDevices.ConsoleUart"></a>

```vertex
public var ConsoleUart: chipset.Pl011? = nil
```

<a id="WiredDevices.VirtioTransports"></a>

```vertex
public var VirtioTransports: [virtio.MmioTransport] = []
```

<a id="WiredDevices.KeyboardInput"></a>

```vertex
public var KeyboardInput: virtio.Input? = nil
```

<a id="WiredDevices.TabletInput"></a>

```vertex
public var TabletInput: virtio.Input? = nil
```

<a id="WiredDevices.Rng"></a>

```vertex
public var Rng: virtio.Rng? = nil
```

<a id="WiredDevices.VirtioCount"></a>

```vertex
public var VirtioCount: int = 0
```

<a id="WiredDevices.FwCfg"></a>

```vertex
public var FwCfg: boot.FwCfg? = nil
```

<a id="WiredDevices.PciRoot"></a>

```vertex
public var PciRoot: pci.Root? = nil
```

<a id="WiredDevices.Ramfb"></a>

```vertex
public var Ramfb: display.Ramfb? = nil
```

<a id="WiredDevices.Xhci"></a>

```vertex
public var Xhci: usb.Xhci? = nil
```

Windows guests: the inbox-driver devices on PCI.

<a id="WiredDevices.UsbKeyboard"></a>

```vertex
public var UsbKeyboard: usb.Keyboard? = nil
```

<a id="WiredDevices.UsbTablet"></a>

```vertex
public var UsbTablet: usb.Tablet? = nil
```

<a id="WiredDevices.Nvme"></a>

```vertex
public var Nvme: nvme.Controller? = nil
```

<a id="WiredDevices.Tpm"></a>

```vertex
public var Tpm: tpm.Tis? = nil
```

## Files

- config.vs
- debug_arm64.vs
- error.vs
- machine.vs
- memory.vs
- platform_arm64.vs
- psci_arm64.vs
- vcpu.vs
- wiring.vs
