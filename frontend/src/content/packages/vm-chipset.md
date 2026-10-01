# package chipset

```vertex
import "vm/chipset"
```

Package chipset is the small fixed devices every platform has: a
serial port, a real-time clock, an IOAPIC where the hypervisor has none,
and the ACPI Generic Event Device for the power button.

Files are named for the part, not the architecture, so cmd/check tests
every model on every host; vm's platform files choose which to place.

## Index

- [`final class Cmos: device.Pio`](#class-Cmos)
  - [`init(localTime: bool, memoryBelow4G: uint64 = 0, memoryAbove4G: uint64 = 0)`](#Cmos.init)
  - [`let LocalTime: bool`](#Cmos.LocalTime)
  - [`func Read(port: uint16, size: uint8) -> uint32`](#Cmos.Read)
  - [`func Write(port: uint16, size: uint8, value: uint32)`](#Cmos.Write)
- [`final class Ged: device.Mmio`](#class-Ged)
  - [`init(irq: any device.Irq)`](#Ged.init)
  - [`static let Size: uint64 = 0x10`](#Ged.Size)
  - [`static let PowerButton: uint32 = 1 << 0`](#Ged.PowerButton)
  - [`var OnPowerOff: (() -> Void)? = nil`](#Ged.OnPowerOff)
  - [`var OnReset: (() -> Void)? = nil`](#Ged.OnReset)
  - [`func PressPowerButton()`](#Ged.PressPowerButton)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Ged.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Ged.Write)
- [`final class IoApic: device.Mmio`](#class-IoApic)
  - [`init(msi: any device.Msi)`](#IoApic.init)
  - [`static let Pins = 24`](#IoApic.Pins)
  - [`func Pin(_ n: int) -> any device.Irq`](#IoApic.Pin)
  - [`func EndOfInterrupt(_ vector: uint8)`](#IoApic.EndOfInterrupt)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#IoApic.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#IoApic.Write)
- [`final class Ns16550: device.Pio, device.Mmio`](#class-Ns16550)
  - [`init(output: any io.AsyncWriter, irq: any device.Irq)`](#Ns16550.init)
  - [`func Feed(_ bytes: [uint8])`](#Ns16550.Feed)
  - [`func Read(port: uint16, size: uint8) -> uint32`](#Ns16550.Read)
  - [`func Write(port: uint16, size: uint8, value: uint32)`](#Ns16550.Write)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Ns16550.Read-2)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Ns16550.Write-2)
- [`final class PflashCfi01: device.Mmio`](#class-PflashCfi01)
  - [`init(size: int = 64 * 1024 * 1024, initialData: [uint8]? = nil)`](#PflashCfi01.init)
  - [`static let BlockSize: int = 256 * 1024`](#PflashCfi01.BlockSize)
  - [`var Bytes: [uint8] { get }`](#PflashCfi01.Bytes)
  - [`func Read(offset o: uint64, size: uint8) -> uint64`](#PflashCfi01.Read)
  - [`func Write(offset o: uint64, size: uint8, value: uint64)`](#PflashCfi01.Write)
- [`enum Mode`](#enum-PflashCfi01.Mode)
- [`final class Pl011: device.Mmio`](#class-Pl011)
  - [`init(output: any io.AsyncWriter, irq: any device.Irq)`](#Pl011.init)
  - [`func Feed(_ bytes: [uint8])`](#Pl011.Feed)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#Pl011.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#Pl011.Write)
- [`final class Pl031: device.Mmio`](#class-Pl031)
  - [`init(irq: any device.Irq = device.NoIrq(), localTime: bool = false)`](#Pl031.init)
  - [`let LocalTime: bool`](#Pl031.LocalTime)
  - [`func Read(offset o: uint64, size: uint8) -> uint64`](#Pl031.Read)
  - [`func Write(offset o: uint64, size: uint8, value: uint64)`](#Pl031.Write)

## Types

### class Cmos <a id="class-Cmos"></a>

```vertex
public final class Cmos: device.Pio
```

The MC146818 CMOS real-time clock at ports 0x70–0x71: the amd64 RTC.
Windows keeps it in local time; Linux and the BSDs in UTC. `LocalTime`
picks which the guest sees.

#### Initializers

<a id="Cmos.init"></a>

```vertex
public init(localTime: bool, memoryBelow4G: uint64 = 0, memoryAbove4G: uint64 = 0)
```

#### Properties

<a id="Cmos.LocalTime"></a>

```vertex
public let LocalTime: bool
```

#### Methods

<a id="Cmos.Read"></a>

```vertex
public func Read(port: uint16, size: uint8) -> uint32
```

<a id="Cmos.Write"></a>

```vertex
public func Write(port: uint16, size: uint8, value: uint32)
```

### class Ged <a id="class-Ged"></a>

```vertex
public final class Ged: device.Mmio
```

The ACPI Generic Event Device (ACPI 6.1+, "ACPI0013"): how a
hardware-reduced platform tells the guest about the power button (and,
later, memory and CPU hotplug). One event register the guest reads in
its _EVT method, an interrupt line, and a sleep/reset register pair
the FADT points at.

Layout: 0x0 event (read clears), 0x4 sleep control (write 5 << 2 | 1 << 5
for S5), 0x5 sleep status, 0x6 reset register.

#### Initializers

<a id="Ged.init"></a>

```vertex
public init(irq: any device.Irq)
```

#### Properties

<a id="Ged.Size"></a>

```vertex
public static let Size: uint64 = 0x10
```

<a id="Ged.PowerButton"></a>

```vertex
public static let PowerButton: uint32 = 1 << 0
```

<a id="Ged.OnPowerOff"></a>

```vertex
public var OnPowerOff: (() -> Void)? = nil
```

Called when the guest asks to power off or reset.

<a id="Ged.OnReset"></a>

```vertex
public var OnReset: (() -> Void)? = nil
```

#### Methods

<a id="Ged.PressPowerButton"></a>

```vertex
public func PressPowerButton()
```

Presses the power button: the guest shuts down cleanly.

<a id="Ged.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="Ged.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### class IoApic <a id="class-IoApic"></a>

```vertex
public final class IoApic: device.Mmio
```

An 82093AA IOAPIC at 0xfec0_0000: 24 pins, each with a redirection
entry the guest programs (vector, delivery mode, destination, mask,
trigger). vm places it only where the hypervisor has no in-kernel one
(WHP). A raised pin becomes an MSI-style write to the LAPIC.

#### Initializers

<a id="IoApic.init"></a>

```vertex
public init(msi: any device.Msi)
```

#### Properties

<a id="IoApic.Pins"></a>

```vertex
public static let Pins = 24
```

#### Methods

<a id="IoApic.Pin"></a>

```vertex
public func Pin(_ n: int) -> any device.Irq
```

The Irq for one pin, to hand a device.

<a id="IoApic.EndOfInterrupt"></a>

```vertex
public func EndOfInterrupt(_ vector: uint8)
```

The guest's EOI for `vector` (forwarded by the LAPIC): clears
Remote IRR, and redelivers if the line is still high.

<a id="IoApic.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="IoApic.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### class Ns16550 <a id="class-Ns16550"></a>

```vertex
public final class Ns16550: device.Pio, device.Mmio
```

A 16550A UART: the amd64 serial port at 0x3f8 (COM1), IRQ 4. Linux
ttyS0, Windows EMS, and firmware debug output all use it. Transmit goes
straight to `output`; receive is fed by `Feed`.

#### Initializers

<a id="Ns16550.init"></a>

```vertex
public init(output: any io.AsyncWriter, irq: any device.Irq)
```

#### Methods

<a id="Ns16550.Feed"></a>

```vertex
public func Feed(_ bytes: [uint8])
```

Bytes the guest will read, from the host's terminal.

<a id="Ns16550.Read"></a>

```vertex
public func Read(port: uint16, size: uint8) -> uint32
```

<a id="Ns16550.Write"></a>

```vertex
public func Write(port: uint16, size: uint8, value: uint32)
```

<a id="Ns16550.Read-2"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="Ns16550.Write-2"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### class PflashCfi01 <a id="class-PflashCfi01"></a>

```vertex
public final class PflashCfi01: device.Mmio
```

PflashCfi01 emulates a parallel NOR flash memory device conforming to the
Common Flash Interface (CFI) and Intel StrataFlash (P30) command set.

In UEFI virtual machines (like ArmVirtQemu), this device acts as Flash 1
(UEFI Non-Volatile Variable Storage). It handles status register polling,
block erasure, and word/buffer programming so EDK2's VirtNorFlashDxe
can initialize the variable store and produce the Variable Arch Protocol.

#### Initializers

<a id="PflashCfi01.init"></a>

```vertex
public init(size: int = 64 * 1024 * 1024, initialData: [uint8]? = nil)
```

#### Properties

<a id="PflashCfi01.BlockSize"></a>

```vertex
public static let BlockSize: int = 256 * 1024
```

<a id="PflashCfi01.Bytes"></a>

```vertex
public var Bytes: [uint8] { get }
```

Returns a copy of the current flash contents (e.g. for saving NVRAM variables to disk).

#### Methods

<a id="PflashCfi01.Read"></a>

```vertex
public func Read(offset o: uint64, size: uint8) -> uint64
```

<a id="PflashCfi01.Write"></a>

```vertex
public func Write(offset o: uint64, size: uint8, value: uint64)
```

### enum PflashCfi01.Mode <a id="enum-PflashCfi01.Mode"></a>

```vertex
public enum Mode
```

#### Cases

<a id="PflashCfi01.Mode.readArray"></a>

```vertex
case readArray
```

<a id="PflashCfi01.Mode.readStatus"></a>

```vertex
case readStatus
```

<a id="PflashCfi01.Mode.readIdentifier"></a>

```vertex
case readIdentifier
```

<a id="PflashCfi01.Mode.readCfi"></a>

```vertex
case readCfi
```

### class Pl011 <a id="class-Pl011"></a>

```vertex
public final class Pl011: device.Mmio
```

An Arm PL011 UART: the arm64 serial port (ttyAMA0, and SPCR's console
for Windows on ARM). 4 KiB of registers, with the PrimeCell ID
registers at the end so drivers recognise it.

#### Initializers

<a id="Pl011.init"></a>

```vertex
public init(output: any io.AsyncWriter, irq: any device.Irq)
```

#### Methods

<a id="Pl011.Feed"></a>

```vertex
public func Feed(_ bytes: [uint8])
```

<a id="Pl011.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="Pl011.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

### class Pl031 <a id="class-Pl031"></a>

```vertex
public final class Pl031: device.Mmio
```

An Arm PL031 real-time clock: seconds since the epoch in one register.
The arm64 RTC. Like Cmos, it can show local time for Windows.

#### Initializers

<a id="Pl031.init"></a>

```vertex
public init(irq: any device.Irq = device.NoIrq(), localTime: bool = false)
```

#### Properties

<a id="Pl031.LocalTime"></a>

```vertex
public let LocalTime: bool
```

#### Methods

<a id="Pl031.Read"></a>

```vertex
public func Read(offset o: uint64, size: uint8) -> uint64
```

<a id="Pl031.Write"></a>

```vertex
public func Write(offset o: uint64, size: uint8, value: uint64)
```

## Files

- cmos.vs
- ged.vs
- ioapic.vs
- ns16550.vs
- pflash.vs
- pl011.vs
- pl031.vs
