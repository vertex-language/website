# package hypervisor

```vertex
import "vm/hypervisor"
```

Package hypervisor is the host's hardware virtualization: a partition of
guest-physical memory, the vCPUs that run in it, and why they stop.

It knows nothing about devices, disks or boot protocols; that's package
vm and the packages beside it. Most programs import "vm" and never this.

## Index

- [Constants](#constants)
- [`func Create(vcpus: int) throws -> Partition`](#func-Create)
- [`func Probe() throws -> Capabilities`](#func-Probe)
- [`struct Access`](#struct-Access)
  - [`init(read: bool = true, write: bool = true, execute: bool = true)`](#Access.init)
  - [`var Read: bool`](#Access.Read)
  - [`var Write: bool`](#Access.Write)
  - [`var Execute: bool`](#Access.Execute)
  - [`static let all = Access()`](#Access.all)
  - [`static let readOnly = Access(write: false)`](#Access.readOnly)
- [`enum Arch`](#enum-Arch)
- [`struct Capabilities`](#struct-Capabilities)
  - [`let Arch: Arch`](#Capabilities.Arch)
  - [`let MaxVcpus: int`](#Capabilities.MaxVcpus)
  - [`let InKernelIrqChip: bool`](#Capabilities.InKernelIrqChip)
  - [`let Doorbells: bool`](#Capabilities.Doorbells)
  - [`let HyperV: bool`](#Capabilities.HyperV)
  - [`let DirtyLogging: bool`](#Capabilities.DirtyLogging)
  - [`let PartitionsPerProcess: int`](#Capabilities.PartitionsPerProcess)
  - [`let PhysicalAddressBits: int`](#Capabilities.PhysicalAddressBits)
- [`enum Exit`](#enum-Exit)
- [`struct Hypercall`](#struct-Hypercall)
  - [`let Kind: HypercallKind`](#Hypercall.Kind)
  - [`let Immediate: uint16`](#Hypercall.Immediate)
  - [`let Args: (uint64, uint64, uint64, uint64)`](#Hypercall.Args)
- [`enum HypercallKind`](#enum-HypercallKind)
- [`enum HypervisorError: Error, CustomStringConvertible`](#enum-HypervisorError)
  - [`var description: string { get }`](#HypervisorError.description)
- [`struct MmioAccess`](#struct-MmioAccess)
  - [`let Address: uint64`](#MmioAccess.Address)
  - [`let Size: uint8`](#MmioAccess.Size)
  - [`let Write: bool`](#MmioAccess.Write)
  - [`let Value: uint64`](#MmioAccess.Value)
- [`final class Partition`](#class-Partition)
  - [`func CreateIrqChip(distributor: uint64 = 0, redistributor: uint64 = 0, msiBase: uint64 = 0, msiFirst: uint32 = 0, msiCount: uint32 = 0) throws`](#Partition.CreateIrqChip)
  - [`func Map(guest: uint64, host: UnsafeMutableRawPointer, count: uint64, access: Access = .all) throws`](#Partition.Map)
  - [`func Unmap(guest: uint64, count: uint64) throws`](#Partition.Unmap)
  - [`func SetIrq(_ line: uint32, level: bool) throws`](#Partition.SetIrq)
  - [`func SendMsi(address: uint64, data: uint32) throws`](#Partition.SendMsi)
  - [`func CreateVcpu(_ id: int) throws -> Vcpu`](#Partition.CreateVcpu)
  - [`func Close()`](#Partition.Close)
- [`struct PortAccess`](#struct-PortAccess)
  - [`let Port: uint16`](#PortAccess.Port)
  - [`let Size: uint8`](#PortAccess.Size)
  - [`let Write: bool`](#PortAccess.Write)
  - [`let Value: uint32`](#PortAccess.Value)
- [`struct RegArm64`](#struct-RegArm64)
  - [`static let x0: int32 = 0`](#RegArm64.x0)
  - [`static let sp: int32 = 31`](#RegArm64.sp)
  - [`static let pc: int32 = 32`](#RegArm64.pc)
  - [`static let pstate: int32 = 33`](#RegArm64.pstate)
  - [`static let mpidr: int32 = 34`](#RegArm64.mpidr)
  - [`static let elr_el1: int32 = 35`](#RegArm64.elr_el1)
  - [`static let esr_el1: int32 = 36`](#RegArm64.esr_el1)
  - [`static let far_el1: int32 = 37`](#RegArm64.far_el1)
  - [`static let vbar_el1: int32 = 38`](#RegArm64.vbar_el1)
  - [`static let sctlr_el1 = Sys(op0: 3, op1: 0, crn: 1, crm: 0, op2: 0)`](#RegArm64.sctlr_el1)
  - [`static let ttbr0_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 0)`](#RegArm64.ttbr0_el1)
  - [`static let ttbr1_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 1)`](#RegArm64.ttbr1_el1)
  - [`static let tcr_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 2)`](#RegArm64.tcr_el1)
  - [`static let spsr_el1 = Sys(op0: 3, op1: 0, crn: 4, crm: 0, op2: 0)`](#RegArm64.spsr_el1)
  - [`static let sp_el0 = Sys(op0: 3, op1: 0, crn: 4, crm: 1, op2: 0)`](#RegArm64.sp_el0)
  - [`static let cntv_ctl_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 3, op2: 1)`](#RegArm64.cntv_ctl_el0)
  - [`static let cntv_cval_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 3, op2: 2)`](#RegArm64.cntv_cval_el0)
  - [`static let cntp_ctl_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 2, op2: 1)`](#RegArm64.cntp_ctl_el0)
  - [`static let cntp_cval_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 2, op2: 2)`](#RegArm64.cntp_cval_el0)
  - [`static func Sys(op0: int32, op1: int32, crn: int32, crm: int32, op2: int32) -> int32`](#RegArm64.Sys)
- [`struct Registers`](#struct-Registers)
  - [`init()`](#Registers.init)
  - [`var X: [uint64] = [uint64](repeating: 0, count: 31)`](#Registers.X)
  - [`var Sp: uint64 = 0`](#Registers.Sp)
  - [`var Pc: uint64 = 0`](#Registers.Pc)
  - [`var Pstate: uint64 = 0x3c5`](#Registers.Pstate)
  - [`var ElrEl1: uint64 = 0`](#Registers.ElrEl1)
  - [`var EsrEl1: uint64 = 0`](#Registers.EsrEl1)
  - [`var FarEl1: uint64 = 0`](#Registers.FarEl1)
  - [`var VbarEl1: uint64 = 0`](#Registers.VbarEl1)
- [`struct SystemRegisterAccess`](#struct-SystemRegisterAccess)
  - [`let Id: uint32`](#SystemRegisterAccess.Id)
  - [`let Write: bool`](#SystemRegisterAccess.Write)
  - [`let Value: uint64`](#SystemRegisterAccess.Value)
- [`final class Vcpu`](#class-Vcpu)
  - [`let Id: int`](#Vcpu.Id)
  - [`func Run() throws -> Exit`](#Vcpu.Run)
  - [`func Complete(read value: uint64 = 0) throws`](#Vcpu.Complete)
  - [`func Get(_ reg: int32) throws -> uint64`](#Vcpu.Get)
  - [`func Set(_ reg: int32, _ value: uint64) throws`](#Vcpu.Set)
  - [`func UnmaskTimer() throws`](#Vcpu.UnmaskTimer)
  - [`func GicReg(kind: int32, _ reg: uint32) throws -> uint64`](#Vcpu.GicReg)
  - [`func Kick()`](#Vcpu.Kick)
  - [`func Close()`](#Vcpu.Close)
  - [`func GetRegisters() throws -> Registers`](#Vcpu.GetRegisters)
  - [`func SetRegisters(_ r: Registers) throws`](#Vcpu.SetRegisters)

## Constants

<a id="let-ExitWords"></a>

```vertex
public let ExitWords: int = 8
```

## Functions

### func Create <a id="func-Create"></a>

```vertex
public func Create(vcpus: int) throws -> Partition
```

Makes a partition for up to `vcpus` vCPUs. On macOS a process can hold
only one; a second throws `busy`.

### func Probe <a id="func-Probe"></a>

```vertex
public func Probe() throws -> Capabilities
```

Asks the host what it has. Throws `unsupported` or `denied` when there's
no hypervisor this process can use, which is the check to run first.

## Types

### struct Access <a id="struct-Access"></a>

```vertex
public struct Access
```

Which accesses a memory mapping allows.

#### Initializers

<a id="Access.init"></a>

```vertex
public init(read: bool = true, write: bool = true, execute: bool = true)
```

#### Properties

<a id="Access.Read"></a>

```vertex
public var Read: bool
```

<a id="Access.Write"></a>

```vertex
public var Write: bool
```

<a id="Access.Execute"></a>

```vertex
public var Execute: bool
```

<a id="Access.all"></a>

```vertex
public static let all = Access()
```

<a id="Access.readOnly"></a>

```vertex
public static let readOnly = Access(write: false)
```

### enum Arch <a id="enum-Arch"></a>

```vertex
public enum Arch
```

The architecture guests run as. It is always the host's: nothing here
emulates instructions.

#### Cases

<a id="Arch.arm64"></a>

```vertex
case arm64
```

<a id="Arch.amd64"></a>

```vertex
case amd64
```

### struct Capabilities <a id="struct-Capabilities"></a>

```vertex
public struct Capabilities
```

What this host's hypervisor can do. Callers branch on these, never on
the platform.

#### Properties

<a id="Capabilities.Arch"></a>

```vertex
public let Arch: Arch
```

<a id="Capabilities.MaxVcpus"></a>

```vertex
public let MaxVcpus: int
```

<a id="Capabilities.InKernelIrqChip"></a>

```vertex
public let InKernelIrqChip: bool
```

The interrupt controller runs in the host kernel: KVM (GIC or
LAPIC+IOAPIC), HVF (GICv3, macOS 15). WHP has the LAPIC only, so
this is false there and vm adds an IOAPIC of its own.

<a id="Capabilities.Doorbells"></a>

```vertex
public let Doorbells: bool
```

Queue doorbells can be delivered without an exit to the VMM (KVM
ioeventfd, WHP doorbell events).

<a id="Capabilities.HyperV"></a>

```vertex
public let HyperV: bool
```

Hyper-V enlightenments can be offered to the guest.

<a id="Capabilities.DirtyLogging"></a>

```vertex
public let DirtyLogging: bool
```

<a id="Capabilities.PartitionsPerProcess"></a>

```vertex
public let PartitionsPerProcess: int
```

How many partitions one process may hold: 1 on macOS.

<a id="Capabilities.PhysicalAddressBits"></a>

```vertex
public let PhysicalAddressBits: int
```

### enum Exit <a id="enum-Exit"></a>

```vertex
public enum Exit
```

Why `Vcpu.Run` returned. Every case carries plain values: nothing on
this path allocates, because it runs once per guest device access.

#### Cases

<a id="Exit.mmio"></a>

```vertex
case mmio(MmioAccess)
```

The guest touched unmapped guest-physical memory: a device register.
Answer a read with `Vcpu.Complete(read:)`.

<a id="Exit.io"></a>

```vertex
case io(PortAccess)
```

An x86 `in` / `out`. amd64 only.

<a id="Exit.hypercall"></a>

```vertex
case hypercall(Hypercall)
```

HVC or SMC on arm64 (PSCI lives here), VMCALL on amd64 (Hyper-V).

<a id="Exit.systemRegister"></a>

```vertex
case systemRegister(SystemRegisterAccess)
```

A trapped arm64 system register or amd64 MSR.

<a id="Exit.cpuid"></a>

```vertex
case cpuid(leaf: uint32, subleaf: uint32)
```

CPUID (WHP only; KVM answers from the table vm gives it).

<a id="Exit.halt"></a>

```vertex
case halt
```

WFI / HLT with nothing pending: sleep until an interrupt or a kick.

<a id="Exit.timer"></a>

```vertex
case timer
```

The virtual timer fired (HVF). Deliver its PPI, then `UnmaskTimer`.

<a id="Exit.shutdown"></a>

```vertex
case shutdown
```

The guest can't go on: a triple fault, or a power-off the kernel
handled (KVM PSCI).

<a id="Exit.canceled"></a>

```vertex
case canceled
```

`Kick` was called.

<a id="Exit.failed"></a>

```vertex
case failed(code: uint64)
```

Something the platform reported that this package doesn't model.

### struct Hypercall <a id="struct-Hypercall"></a>

```vertex
public struct Hypercall
```

#### Properties

<a id="Hypercall.Kind"></a>

```vertex
public let Kind: HypercallKind
```

<a id="Hypercall.Immediate"></a>

```vertex
public let Immediate: uint16
```

The instruction's immediate (arm64); 0 on amd64.

<a id="Hypercall.Args"></a>

```vertex
public let Args: (uint64, uint64, uint64, uint64)
```

x0..x3 on arm64; rcx, rdx, r8, r9 on amd64.

### enum HypercallKind <a id="enum-HypercallKind"></a>

```vertex
public enum HypercallKind
```

#### Cases

<a id="HypercallKind.hvc"></a>

```vertex
case hvc
```

<a id="HypercallKind.smc"></a>

```vertex
case smc
```

<a id="HypercallKind.vmcall"></a>

```vertex
case vmcall
```

### enum HypervisorError <a id="enum-HypervisorError"></a>

```vertex
public enum HypervisorError: Error, CustomStringConvertible
```

HypervisorError is every way the host's hypervisor refuses.

#### Cases

<a id="HypervisorError.unsupported"></a>

```vertex
case unsupported(string)
```

There's no hypervisor here: the platform has none, or this isn't a
target it runs on (Intel Macs, Android apps).

<a id="HypervisorError.denied"></a>

```vertex
case denied(string)
```

There is one and this process may not use it: the binary lacks the
com.apple.security.hypervisor entitlement, the Windows Hypervisor
Platform feature is off, or /dev/kvm isn't readable.

<a id="HypervisorError.busy"></a>

```vertex
case busy(string)
```

macOS allows one VM per process, and this process has one.

<a id="HypervisorError.noMemory"></a>

```vertex
case noMemory(string)
```

<a id="HypervisorError.invalidArgument"></a>

```vertex
case invalidArgument(string)
```

<a id="HypervisorError.system"></a>

```vertex
case system(code: int32, context: string)
```

Anything else, with the number the platform reported.

#### Properties

<a id="HypervisorError.description"></a>

```vertex
public var description: string { get }
```

### struct MmioAccess <a id="struct-MmioAccess"></a>

```vertex
public struct MmioAccess
```

#### Properties

<a id="MmioAccess.Address"></a>

```vertex
public let Address: uint64
```

<a id="MmioAccess.Size"></a>

```vertex
public let Size: uint8
```

1, 2, 4 or 8 bytes.

<a id="MmioAccess.Write"></a>

```vertex
public let Write: bool
```

<a id="MmioAccess.Value"></a>

```vertex
public let Value: uint64
```

What was written; 0 for a read.

### class Partition <a id="class-Partition"></a>

```vertex
public final class Partition
```

Guest-physical memory, an interrupt controller and vCPUs.

```vertex
let p = try hypervisor.Create(vcpus: 2)
defer { p.Close() }
```

#### Methods

<a id="Partition.CreateIrqChip"></a>

```vertex
public func CreateIrqChip(distributor: uint64 = 0, redistributor: uint64 = 0,
                          msiBase: uint64 = 0, msiFirst: uint32 = 0, msiCount: uint32 = 0) throws
```

Creates the in-kernel interrupt controller. On arm64 it is a GICv3
at the given addresses, with an MSI frame if `msiBase` isn't 0. On
amd64 the addresses are ignored.

<a id="Partition.Map"></a>

```vertex
public func Map(guest: uint64, host: UnsafeMutableRawPointer, count: uint64,
                access: Access = .all) throws
```

Maps `count` bytes of host memory into the guest at `guest`. The
memory must stay mapped in this process until `Unmap` or `Close`.

<a id="Partition.Unmap"></a>

```vertex
public func Unmap(guest: uint64, count: uint64) throws
```

<a id="Partition.SetIrq"></a>

```vertex
public func SetIrq(_ line: uint32, level: bool) throws
```

Drives a line of the in-kernel controller: a GIC SPI number, or an
IOAPIC pin. Throws `unsupported` where there's no in-kernel IOAPIC
(WHP); use `SendMsi` from an IOAPIC model there.

<a id="Partition.SendMsi"></a>

```vertex
public func SendMsi(address: uint64, data: uint32) throws
```

<a id="Partition.CreateVcpu"></a>

```vertex
public func CreateVcpu(_ id: int) throws -> Vcpu
```

Creates vCPU `id`. HVF binds a vCPU to the thread that makes it, so
call this on the thread that will call `Run`.

<a id="Partition.Close"></a>

```vertex
public func Close()
```

### struct PortAccess <a id="struct-PortAccess"></a>

```vertex
public struct PortAccess
```

#### Properties

<a id="PortAccess.Port"></a>

```vertex
public let Port: uint16
```

<a id="PortAccess.Size"></a>

```vertex
public let Size: uint8
```

<a id="PortAccess.Write"></a>

```vertex
public let Write: bool
```

<a id="PortAccess.Value"></a>

```vertex
public let Value: uint32
```

### struct RegArm64 <a id="struct-RegArm64"></a>

```vertex
public struct RegArm64
```

#### Properties

<a id="RegArm64.x0"></a>

```vertex
public static let x0: int32 = 0
```

<a id="RegArm64.sp"></a>

```vertex
public static let sp: int32 = 31
```

<a id="RegArm64.pc"></a>

```vertex
public static let pc: int32 = 32
```

<a id="RegArm64.pstate"></a>

```vertex
public static let pstate: int32 = 33
```

<a id="RegArm64.mpidr"></a>

```vertex
public static let mpidr: int32 = 34
```

<a id="RegArm64.elr_el1"></a>

```vertex
public static let elr_el1: int32 = 35
```

<a id="RegArm64.esr_el1"></a>

```vertex
public static let esr_el1: int32 = 36
```

<a id="RegArm64.far_el1"></a>

```vertex
public static let far_el1: int32 = 37
```

<a id="RegArm64.vbar_el1"></a>

```vertex
public static let vbar_el1: int32 = 38
```

<a id="RegArm64.sctlr_el1"></a>

```vertex
public static let sctlr_el1 = Sys(op0: 3, op1: 0, crn: 1, crm: 0, op2: 0)
```

<a id="RegArm64.ttbr0_el1"></a>

```vertex
public static let ttbr0_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 0)
```

<a id="RegArm64.ttbr1_el1"></a>

```vertex
public static let ttbr1_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 1)
```

<a id="RegArm64.tcr_el1"></a>

```vertex
public static let tcr_el1 = Sys(op0: 3, op1: 0, crn: 2, crm: 0, op2: 2)
```

<a id="RegArm64.spsr_el1"></a>

```vertex
public static let spsr_el1 = Sys(op0: 3, op1: 0, crn: 4, crm: 0, op2: 0)
```

<a id="RegArm64.sp_el0"></a>

```vertex
public static let sp_el0 = Sys(op0: 3, op1: 0, crn: 4, crm: 1, op2: 0)
```

<a id="RegArm64.cntv_ctl_el0"></a>

```vertex
public static let cntv_ctl_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 3, op2: 1)
```

<a id="RegArm64.cntv_cval_el0"></a>

```vertex
public static let cntv_cval_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 3, op2: 2)
```

<a id="RegArm64.cntp_ctl_el0"></a>

```vertex
public static let cntp_ctl_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 2, op2: 1)
```

<a id="RegArm64.cntp_cval_el0"></a>

```vertex
public static let cntp_cval_el0 = Sys(op0: 3, op1: 3, crn: 14, crm: 2, op2: 2)
```

#### Methods

<a id="RegArm64.Sys"></a>

```vertex
public static func Sys(op0: int32, op1: int32, crn: int32, crm: int32, op2: int32) -> int32
```

Any other system register, by its MRS encoding.

### struct Registers <a id="struct-Registers"></a>

```vertex
public struct Registers
```

An arm64 vCPU's general registers: what a boot protocol sets and a
PSCI call reads.

#### Initializers

<a id="Registers.init"></a>

```vertex
public init()
```

#### Properties

<a id="Registers.X"></a>

```vertex
public var X: [uint64] = [uint64](repeating: 0, count: 31)
```

x0 through x30.

<a id="Registers.Sp"></a>

```vertex
public var Sp: uint64 = 0
```

SP_EL1.

<a id="Registers.Pc"></a>

```vertex
public var Pc: uint64 = 0
```

<a id="Registers.Pstate"></a>

```vertex
public var Pstate: uint64 = 0x3c5
```

PSTATE / CPSR. 0x3c5 is EL1h with D, A, I and F masked: the state
Linux wants at its entry point.

<a id="Registers.ElrEl1"></a>

```vertex
public var ElrEl1: uint64 = 0
```

<a id="Registers.EsrEl1"></a>

```vertex
public var EsrEl1: uint64 = 0
```

<a id="Registers.FarEl1"></a>

```vertex
public var FarEl1: uint64 = 0
```

<a id="Registers.VbarEl1"></a>

```vertex
public var VbarEl1: uint64 = 0
```

### struct SystemRegisterAccess <a id="struct-SystemRegisterAccess"></a>

```vertex
public struct SystemRegisterAccess
```

#### Properties

<a id="SystemRegisterAccess.Id"></a>

```vertex
public let Id: uint32
```

arm64: op0/op1/CRn/CRm/op2 as ESR packs them. amd64: the MSR number.

<a id="SystemRegisterAccess.Write"></a>

```vertex
public let Write: bool
```

<a id="SystemRegisterAccess.Value"></a>

```vertex
public let Value: uint64
```

### class Vcpu <a id="class-Vcpu"></a>

```vertex
public final class Vcpu
```

One virtual CPU. `Run` blocks the calling thread, which must be the
vCPU's own thread; every other method may be called from anywhere.

#### Properties

<a id="Vcpu.Id"></a>

```vertex
public let Id: int
```

#### Methods

<a id="Vcpu.Run"></a>

```vertex
public func Run() throws -> Exit
```

Runs the guest until it exits, and says why.

<a id="Vcpu.Complete"></a>

```vertex
public func Complete(read value: uint64 = 0) throws
```

Finishes the last exit: the value of an MMIO, port or register read
(ignored for writes), and the pc moved past the instruction.

<a id="Vcpu.Get"></a>

```vertex
public func Get(_ reg: int32) throws -> uint64
```

Reads one register by the platform-neutral number in `RegArm64` /
`RegAmd64`. Most callers use `Registers` instead.

<a id="Vcpu.Set"></a>

```vertex
public func Set(_ reg: int32, _ value: uint64) throws
```

<a id="Vcpu.UnmaskTimer"></a>

```vertex
public func UnmaskTimer() throws
```

Unmasks the virtual timer after its interrupt went in (HVF).

<a id="Vcpu.GicReg"></a>

```vertex
public func GicReg(kind: int32, _ reg: uint32) throws -> uint64
```

An in-kernel interrupt controller register, for diagnostics: kind 0
the distributor, 1 this vCPU's redistributor, 2 its CPU interface.
`reg` is the platform's number for it. Call on the vCPU's thread.

<a id="Vcpu.Kick"></a>

```vertex
public func Kick()
```

Makes `Run` return `.canceled` soon. Safe from any thread.

<a id="Vcpu.Close"></a>

```vertex
public func Close()
```

<a id="Vcpu.GetRegisters"></a>

```vertex
public func GetRegisters() throws -> Registers
```

<a id="Vcpu.SetRegisters"></a>

```vertex
public func SetRegisters(_ r: Registers) throws
```

## Files

- error.vs
- exit.vs
- hypervisor.vs
- regs_arm64.vs
