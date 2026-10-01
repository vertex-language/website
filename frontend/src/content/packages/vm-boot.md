# package boot

```vertex
import "vm/boot"
```

Package boot is what gets a guest from reset to its OS: loaders that put
a kernel straight into guest RAM (arm64 Image, PVH, bzImage), and the
devices UEFI firmware boots from (pflash, fw_cfg).

Loaders don't touch a vCPU or guest memory. They parse bytes and return a
Plan (what goes where, and the entry state), which vm carries out. That
keeps every loader testable in cmd/check.

## Index

- [Constants](#constants)
- [`func BzImage(kernel: [uint8], initrd: [uint8]?, cmdline: string) throws -> Plan`](#func-BzImage)
- [`func DetectKernelFormat(_ data: [uint8]) -> KernelFormat`](#func-DetectKernelFormat)
- [`func EfiBoot(_ efi: Efi, layout: FlashLayout) throws -> Plan`](#func-EfiBoot)
- [`func LinuxArm64(kernel: [uint8], initrd: [uint8]?, cmdline: string, ram: device.Range) throws -> Plan`](#func-LinuxArm64)
- [`func ParseElf(_ b: [uint8]) throws -> Elf`](#func-ParseElf)
- [`func ParseImageHeader(_ kernel: [uint8]) throws -> ImageHeader`](#func-ParseImageHeader)
- [`func ParseSetupHeader(_ k: [uint8]) throws -> SetupHeader`](#func-ParseSetupHeader)
- [`func Pvh(kernel: [uint8], initrd: [uint8]?, cmdline: string, memoryMap: [MemoryMapEntry], rsdp: uint64, initrdAt: uint64) throws -> Plan`](#func-Pvh)
- [`func PvhEntry(_ elf: Elf) -> uint64?`](#func-PvhEntry)
- [`func UnpackKernel(_ data: [uint8]) async throws -> [uint8]`](#func-UnpackKernel)
- [`enum BootError: Error, CustomStringConvertible`](#enum-BootError)
  - [`var description: string { get }`](#BootError.description)
- [`struct Cmdline`](#struct-Cmdline)
  - [`init(_ base: string = "")`](#Cmdline.init)
  - [`var String: string { get }`](#Cmdline.String)
  - [`mutating func Add(_ flag: string)`](#Cmdline.Add)
  - [`mutating func Add(_ key: string, _ value: string)`](#Cmdline.Add-2)
- [`struct Efi`](#struct-Efi)
  - [`init(code: [uint8], vars: any disk.Image)`](#Efi.init)
  - [`let Code: [uint8]`](#Efi.Code)
  - [`let Vars: any disk.Image`](#Efi.Vars)
- [`struct Elf`](#struct-Elf)
  - [`let Entry: uint64`](#Elf.Entry)
  - [`let Programs: [ProgramHeader]`](#Elf.Programs)
  - [`func Notes() -> [(type: uint32, name: string, desc: [uint8])]`](#Elf.Notes)
  - [`func Loads() -> [Load]`](#Elf.Loads)
- [`enum Entry`](#enum-Entry)
- [`struct FlashLayout`](#struct-FlashLayout)
  - [`let Code: device.Range`](#FlashLayout.Code)
  - [`let Vars: device.Range`](#FlashLayout.Vars)
  - [`static let arm64`](#FlashLayout.arm64)
  - [`static func amd64(codeSize: uint64, varsSize: uint64) -> FlashLayout`](#FlashLayout.amd64)
- [`final class FwCfg: device.Mmio`](#class-FwCfg)
  - [`init(memory: device.GuestMemory)`](#FwCfg.init)
  - [`func Add(_ f: File)`](#FwCfg.Add)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#FwCfg.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#FwCfg.Write)
- [`struct File`](#struct-FwCfg.File)
  - [`init(name: string, bytes: [uint8], onWrite: (([uint8]) -> Void)? = nil)`](#FwCfg.File.init)
  - [`let Name: string`](#FwCfg.File.Name)
  - [`var Bytes: [uint8]`](#FwCfg.File.Bytes)
  - [`var OnWrite: (([uint8]) -> Void)? = nil`](#FwCfg.File.OnWrite)
- [`struct ImageHeader`](#struct-ImageHeader)
  - [`let TextOffset: uint64`](#ImageHeader.TextOffset)
  - [`let ImageSize: uint64`](#ImageHeader.ImageSize)
  - [`let Flags: uint64`](#ImageHeader.Flags)
- [`enum KernelFormat: Equatable, CustomStringConvertible`](#enum-KernelFormat)
  - [`var description: string { get }`](#KernelFormat.description)
- [`struct Load`](#struct-Load)
  - [`let Address: device.GuestAddress`](#Load.Address)
  - [`let Bytes: [uint8]`](#Load.Bytes)
- [`struct MemoryMapEntry`](#struct-MemoryMapEntry)
  - [`let Address: uint64`](#MemoryMapEntry.Address)
  - [`let Size: uint64`](#MemoryMapEntry.Size)
  - [`let Type: uint32`](#MemoryMapEntry.Type)
- [`final class Pflash: device.Mmio`](#class-Pflash)
  - [`init(contents: [uint8], size: uint64, backing: any disk.Image, readOnly: bool)`](#Pflash.init)
  - [`let ReadOnly: bool`](#Pflash.ReadOnly)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Pflash.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Pflash.Write)
- [`struct Plan`](#struct-Plan)
  - [`var Loads: [Load] = []`](#Plan.Loads)
  - [`var Entry: Entry = .reset`](#Plan.Entry)
  - [`var DeviceTree: device.GuestAddress? = nil`](#Plan.DeviceTree)
  - [`var Initrd: device.Range? = nil`](#Plan.Initrd)
  - [`var Cmdline: string = ""`](#Plan.Cmdline)
- [`struct ProgramHeader`](#struct-ProgramHeader)
  - [`let Type: uint32`](#ProgramHeader.Type)
  - [`let Offset: uint64`](#ProgramHeader.Offset)
  - [`let PhysicalAddress: uint64`](#ProgramHeader.PhysicalAddress)
  - [`let FileSize: uint64`](#ProgramHeader.FileSize)
  - [`let MemorySize: uint64`](#ProgramHeader.MemorySize)
- [`struct SetupHeader`](#struct-SetupHeader)
  - [`let SetupSectors: int`](#SetupHeader.SetupSectors)
  - [`let Version: uint16`](#SetupHeader.Version)
  - [`let LoadFlags: uint8`](#SetupHeader.LoadFlags)
  - [`let Code32Start: uint32`](#SetupHeader.Code32Start)
  - [`let InitrdAddrMax: uint32`](#SetupHeader.InitrdAddrMax)
  - [`let KernelAlignment: uint32`](#SetupHeader.KernelAlignment)
  - [`let RelocatableKernel: bool`](#SetupHeader.RelocatableKernel)
  - [`let CmdlineSize: uint32`](#SetupHeader.CmdlineSize)
  - [`let PrefAddress: uint64`](#SetupHeader.PrefAddress)

## Constants

<a id="let-PvhCmdline"></a>

```vertex
public let PvhCmdline: uint64 = 0x2_0000
```

<a id="let-PvhMemoryMap"></a>

```vertex
public let PvhMemoryMap: uint64 = 0x7000
```

<a id="let-PvhStartInfo"></a>

```vertex
public let PvhStartInfo: uint64 = 0x6000
```

Where PVH's small structures go, below the kernel's 1 MiB.

## Functions

### func BzImage <a id="func-BzImage"></a>

```vertex
public func BzImage(kernel: [uint8], initrd: [uint8]?, cmdline: string) throws -> Plan
```

Plans a 64-bit boot of a bzImage.

TODO(P2, amd64): boot_params at 0x7000 with the setup header copied in,
type_of_loader 0xff, e820 entries, cmd_line_ptr, ramdisk_image/size;
identity-mapped page tables for the first 4 GiB at 0x9000; entry at
the protected-mode kernel + 0x200 (startup_64).

### func DetectKernelFormat <a id="func-DetectKernelFormat"></a>

```vertex
public func DetectKernelFormat(_ data: [uint8]) -> KernelFormat
```

Identifies the packaging format of the given kernel binary bytes.

### func EfiBoot <a id="func-EfiBoot"></a>

```vertex
public func EfiBoot(_ efi: Efi, layout: FlashLayout) throws -> Plan
```

Plans a firmware boot: the vCPU starts at its architectural reset
vector, which the flash banks cover.

### func LinuxArm64 <a id="func-LinuxArm64"></a>

```vertex
public func LinuxArm64(kernel: [uint8], initrd: [uint8]?, cmdline: string, ram: device.Range) throws -> Plan
```

Plans an arm64 Linux boot into RAM at `ram`: the kernel at a 2 MiB
boundary plus text_offset, the initrd after it, and the device tree at
the top of the first 1 GiB (or of RAM, if smaller), 2 MiB aligned, as
booting.rst asks.

### func ParseElf <a id="func-ParseElf"></a>

```vertex
public func ParseElf(_ b: [uint8]) throws -> Elf
```

### func ParseImageHeader <a id="func-ParseImageHeader"></a>

```vertex
public func ParseImageHeader(_ kernel: [uint8]) throws -> ImageHeader
```

### func ParseSetupHeader <a id="func-ParseSetupHeader"></a>

```vertex
public func ParseSetupHeader(_ k: [uint8]) throws -> SetupHeader
```

### func Pvh <a id="func-Pvh"></a>

```vertex
public func Pvh(kernel: [uint8], initrd: [uint8]?, cmdline: string,
                memoryMap: [MemoryMapEntry], rsdp: uint64, initrdAt: uint64) throws -> Plan
```

Plans a PVH boot. The start_info, its memory map, the command line and
the initrd's module entry are all in the plan; vm only sets registers.

### func PvhEntry <a id="func-PvhEntry"></a>

```vertex
public func PvhEntry(_ elf: Elf) -> uint64?
```

The entry point the kernel's PVH note names, or nil if it has none.

### func UnpackKernel <a id="func-UnpackKernel"></a>

```vertex
public func UnpackKernel(_ data: [uint8]) async throws -> [uint8]
```

Unpacks any compressed or wrapped Linux kernel into a raw ARM64 Image binary.
If the kernel is already a raw ARM64 Image, it is returned without modification.

## Types

### enum BootError <a id="enum-BootError"></a>

```vertex
public enum BootError: Error, CustomStringConvertible
```

BootError is a kernel or firmware image this package can't boot.

#### Cases

<a id="BootError.badImage"></a>

```vertex
case badImage(string)
```

<a id="BootError.unsupported"></a>

```vertex
case unsupported(string)
```

<a id="BootError.tooBig"></a>

```vertex
case tooBig(string)
```

#### Properties

<a id="BootError.description"></a>

```vertex
public var description: string { get }
```

### struct Cmdline <a id="struct-Cmdline"></a>

```vertex
public struct Cmdline
```

A kernel command line, built from parts. Values with spaces are quoted.

#### Initializers

<a id="Cmdline.init"></a>

```vertex
public init(_ base: string = "")
```

#### Properties

<a id="Cmdline.String"></a>

```vertex
public var String: string { get }
```

#### Methods

<a id="Cmdline.Add"></a>

```vertex
public mutating func Add(_ flag: string)
```

<a id="Cmdline.Add-2"></a>

```vertex
public mutating func Add(_ key: string, _ value: string)
```

### struct Efi <a id="struct-Efi"></a>

```vertex
public struct Efi
```

UEFI firmware: a code image the guest runs from its reset vector, and a
variable store it writes boot entries and Secure Boot keys into.

The firmware is a guest artifact the user supplies, like a kernel; it's
never in this repository. Stock EDK2 builds (OVMF for amd64,
ArmVirtQemu for arm64: what distributions and Homebrew ship) expect
two CFI flash banks and fw_cfg, which is what this plans for.

#### Initializers

<a id="Efi.init"></a>

```vertex
public init(code: [uint8], vars: any disk.Image)
```

#### Properties

<a id="Efi.Code"></a>

```vertex
public let Code: [uint8]
```

The firmware code, mapped read-only.

<a id="Efi.Vars"></a>

```vertex
public let Vars: any disk.Image
```

The variable store: a file that persists between boots.

### struct Elf <a id="struct-Elf"></a>

```vertex
public struct Elf
```

#### Properties

<a id="Elf.Entry"></a>

```vertex
public let Entry: uint64
```

<a id="Elf.Programs"></a>

```vertex
public let Programs: [ProgramHeader]
```

#### Methods

<a id="Elf.Notes"></a>

```vertex
public func Notes() -> [(type: uint32, name: string, desc: [uint8])]
```

The notes in PT_NOTE segments: (type, name, descriptor).

<a id="Elf.Loads"></a>

```vertex
public func Loads() -> [Load]
```

Each PT_LOAD segment as bytes for its physical address, with the
part past FileSize (bss) zero-filled.

### enum Entry <a id="enum-Entry"></a>

```vertex
public enum Entry
```

The CPU state the boot vCPU starts in.

#### Cases

<a id="Entry.arm64"></a>

```vertex
case arm64(pc: uint64, x0: uint64)
```

arm64 Linux: pc at the image, x0 the device tree (or 0 with ACPI),
x1–x3 zero, EL1h with interrupts masked, MMU and D-cache off.

<a id="Entry.pvh"></a>

```vertex
case pvh(eip: uint64, startInfo: uint64)
```

amd64 PVH: 32-bit protected mode, paging off, ebx = start_info.

<a id="Entry.linux64"></a>

```vertex
case linux64(rip: uint64, bootParams: uint64, pageTables: uint64)
```

amd64 Linux 64-bit boot protocol: long mode with identity-mapped
page tables, rsi = boot_params.

<a id="Entry.reset"></a>

```vertex
case reset
```

Firmware: the reset vector, where the CPU starts anyway.

### struct FlashLayout <a id="struct-FlashLayout"></a>

```vertex
public struct FlashLayout
```

Where the flash banks sit. arm64 `virt`-style: code at 0, vars at 64 MiB,
64 MiB each. amd64: code ends at 4 GiB, vars just below it.

#### Properties

<a id="FlashLayout.Code"></a>

```vertex
public let Code: device.Range
```

<a id="FlashLayout.Vars"></a>

```vertex
public let Vars: device.Range
```

<a id="FlashLayout.arm64"></a>

```vertex
public static let arm64
```

#### Methods

<a id="FlashLayout.amd64"></a>

```vertex
public static func amd64(codeSize: uint64, varsSize: uint64) -> FlashLayout
```

### class FwCfg <a id="class-FwCfg"></a>

```vertex
public final class FwCfg: device.Mmio
```

fw_cfg: the channel stock EDK2 builds read the machine from. It's a
selector register, a data register and a DMA register, over a directory
of named files ("etc/acpi/tables", "etc/table-loader", "bootorder",
"etc/ramfb"). A QEMU interface, but small, and it's what lets
unmodified firmware from any distribution boot here.

MMIO layout (arm64, and amd64 as MMIO too): data at 0, selector at 8,
DMA address at 16.

#### Initializers

<a id="FwCfg.init"></a>

```vertex
public init(memory: device.GuestMemory)
```

#### Methods

<a id="FwCfg.Add"></a>

```vertex
public func Add(_ f: File)
```

Adds a file; files are listed in the order added.

<a id="FwCfg.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="FwCfg.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### struct FwCfg.File <a id="struct-FwCfg.File"></a>

```vertex
public struct File
```

#### Initializers

<a id="FwCfg.File.init"></a>

```vertex
public init(name: string, bytes: [uint8], onWrite: (([uint8]) -> Void)? = nil)
```

#### Properties

<a id="FwCfg.File.Name"></a>

```vertex
public let Name: string
```

<a id="FwCfg.File.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

<a id="FwCfg.File.OnWrite"></a>

```vertex
public var OnWrite: (([uint8]) -> Void)? = nil
```

Called when the guest writes the file (ramfb's config).

### struct ImageHeader <a id="struct-ImageHeader"></a>

```vertex
public struct ImageHeader
```

The arm64 Linux Image header (Documentation/arch/arm64/booting.rst).

#### Properties

<a id="ImageHeader.TextOffset"></a>

```vertex
public let TextOffset: uint64
```

<a id="ImageHeader.ImageSize"></a>

```vertex
public let ImageSize: uint64
```

<a id="ImageHeader.Flags"></a>

```vertex
public let Flags: uint64
```

### enum KernelFormat <a id="enum-KernelFormat"></a>

```vertex
public enum KernelFormat: Equatable, CustomStringConvertible
```

The detected format of an ARM64 Linux kernel image.

#### Cases

<a id="KernelFormat.rawArm64"></a>

```vertex
case rawArm64
```

<a id="KernelFormat.gzip"></a>

```vertex
case gzip
```

<a id="KernelFormat.efiZboot"></a>

```vertex
case efiZboot(compression: string)
```

<a id="KernelFormat.unknown"></a>

```vertex
case unknown
```

#### Properties

<a id="KernelFormat.description"></a>

```vertex
public var description: string { get }
```

### struct Load <a id="struct-Load"></a>

```vertex
public struct Load
```

Bytes to copy into guest RAM.

#### Properties

<a id="Load.Address"></a>

```vertex
public let Address: device.GuestAddress
```

<a id="Load.Bytes"></a>

```vertex
public let Bytes: [uint8]
```

### struct MemoryMapEntry <a id="struct-MemoryMapEntry"></a>

```vertex
public struct MemoryMapEntry
```

One entry of the memory map PVH hands the kernel (e820 types).

#### Properties

<a id="MemoryMapEntry.Address"></a>

```vertex
public let Address: uint64
```

<a id="MemoryMapEntry.Size"></a>

```vertex
public let Size: uint64
```

<a id="MemoryMapEntry.Type"></a>

```vertex
public let Type: uint32
```

1 RAM, 2 reserved, 3 ACPI reclaimable.

### class Pflash <a id="class-Pflash"></a>

```vertex
public final class Pflash: device.Mmio
```

A CFI parallel flash bank (Intel command set, as QEMU's pflash_cfi01):
what EDK2 reads its code from and writes its variables to. Reads are
plain memory while the bank is in read-array mode; writes are commands.

TODO(P4): map the code bank read-only straight into the partition so
instruction fetches never exit; only the vars bank needs this device.

#### Initializers

<a id="Pflash.init"></a>

```vertex
public init(contents: [uint8], size: uint64, backing: any disk.Image, readOnly: bool)
```

#### Properties

<a id="Pflash.ReadOnly"></a>

```vertex
public let ReadOnly: bool
```

#### Methods

<a id="Pflash.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="Pflash.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### struct Plan <a id="struct-Plan"></a>

```vertex
public struct Plan
```

Where vm should put what it generates, and everything else a kernel
needs from the platform.

#### Properties

<a id="Plan.Loads"></a>

```vertex
public var Loads: [Load] = []
```

<a id="Plan.Entry"></a>

```vertex
public var Entry: Entry = .reset
```

<a id="Plan.DeviceTree"></a>

```vertex
public var DeviceTree: device.GuestAddress? = nil
```

Where the platform description goes (FDT on arm64, start_info or
boot_params already filled on amd64). vm writes it before start.

<a id="Plan.Initrd"></a>

```vertex
public var Initrd: device.Range? = nil
```

<a id="Plan.Cmdline"></a>

```vertex
public var Cmdline: string = ""
```

### struct ProgramHeader <a id="struct-ProgramHeader"></a>

```vertex
public struct ProgramHeader
```

#### Properties

<a id="ProgramHeader.Type"></a>

```vertex
public let Type: uint32
```

<a id="ProgramHeader.Offset"></a>

```vertex
public let Offset: uint64
```

<a id="ProgramHeader.PhysicalAddress"></a>

```vertex
public let PhysicalAddress: uint64
```

<a id="ProgramHeader.FileSize"></a>

```vertex
public let FileSize: uint64
```

<a id="ProgramHeader.MemorySize"></a>

```vertex
public let MemorySize: uint64
```

### struct SetupHeader <a id="struct-SetupHeader"></a>

```vertex
public struct SetupHeader
```

#### Properties

<a id="SetupHeader.SetupSectors"></a>

```vertex
public let SetupSectors: int
```

<a id="SetupHeader.Version"></a>

```vertex
public let Version: uint16
```

<a id="SetupHeader.LoadFlags"></a>

```vertex
public let LoadFlags: uint8
```

<a id="SetupHeader.Code32Start"></a>

```vertex
public let Code32Start: uint32
```

<a id="SetupHeader.InitrdAddrMax"></a>

```vertex
public let InitrdAddrMax: uint32
```

<a id="SetupHeader.KernelAlignment"></a>

```vertex
public let KernelAlignment: uint32
```

<a id="SetupHeader.RelocatableKernel"></a>

```vertex
public let RelocatableKernel: bool
```

<a id="SetupHeader.CmdlineSize"></a>

```vertex
public let CmdlineSize: uint32
```

<a id="SetupHeader.PrefAddress"></a>

```vertex
public let PrefAddress: uint64
```

## Files

- boot.vs
- bzimage.vs
- cmdline.vs
- efi.vs
- elf.vs
- fwcfg.vs
- kernel_loader.vs
- linux_image.vs
- pflash.vs
- pvh.vs
