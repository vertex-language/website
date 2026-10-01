# package tpm

```vertex
import "vm/tpm"
```

Package tpm is a TPM 2.0 for guests: a TIS register interface (`Tis`,
TCG PC Client Platform TPM Profile, FIFO interface) that firmware and
operating systems drive with their own drivers, in front of a `Backend`
that executes TPM 2.0 commands.

The one backend today is `Swtpm`: the swtpm process (libtpms), which is
what QEMU uses. A backend of Vertex's own can replace it behind the same
protocol.

## Index

- [`func FailureResponse() -> [uint8]`](#func-FailureResponse)
- [`protocol Backend: AnyObject`](#protocol-Backend)
  - [`func Init() async throws`](#Backend.Init)
  - [`func Execute(_ command: [uint8], locality: uint8) async throws -> [uint8]`](#Backend.Execute)
  - [`func Shutdown()`](#Backend.Shutdown)
- [`final class Swtpm: Backend`](#class-Swtpm)
  - [`init(stateDir: string, executable: string = "swtpm")`](#Swtpm.init)
  - [`let StateDir: string`](#Swtpm.StateDir)
  - [`let Executable: string`](#Swtpm.Executable)
  - [`static func Available(_ executable: string = "swtpm") -> bool`](#Swtpm.Available)
  - [`func Init() async throws`](#Swtpm.Init)
  - [`func Execute(_ command: [uint8], locality l: uint8) async throws -> [uint8]`](#Swtpm.Execute)
  - [`func Shutdown()`](#Swtpm.Shutdown)
- [`final class Tis: device.Mmio`](#class-Tis)
  - [`init(backend: any Backend)`](#Tis.init)
  - [`static let Size: uint64 = 0x5000`](#Tis.Size)
  - [`private(set) var CommandCount = 0`](#Tis.CommandCount)
  - [`func Read(offset addr: uint64, size: uint8) -> uint64`](#Tis.Read)
  - [`func Write(offset addr: uint64, size: uint8, value v: uint64)`](#Tis.Write)
  - [`func PowerOn() async throws`](#Tis.PowerOn)
  - [`func Shutdown()`](#Tis.Shutdown)
- [`enum TpmError: Error, CustomStringConvertible`](#enum-TpmError)
  - [`var description: string { get }`](#TpmError.description)

## Functions

### func FailureResponse <a id="func-FailureResponse"></a>

```vertex
public func FailureResponse() -> [uint8]
```

A response saying the TPM failed (TPM_RC_FAILURE): what the guest gets
when the backend can't be reached, rather than a TPM that never answers.

## Types

### protocol Backend <a id="protocol-Backend"></a>

```vertex
public protocol Backend: AnyObject
```

Executes TPM 2.0 commands. `Tis` calls one method at a time.

#### Methods

<a id="Backend.Init"></a>

```vertex
func Init() async throws
```

Powers the TPM on, or resets it: each time the machine starts.

<a id="Backend.Execute"></a>

```vertex
func Execute(_ command: [uint8], locality: uint8) async throws -> [uint8]
```

One command, in and out as the TPM 2.0 wire format has them, sent
at `locality`.

<a id="Backend.Shutdown"></a>

```vertex
func Shutdown()
```

Stops the TPM, saving its state.

### class Swtpm <a id="class-Swtpm"></a>

```vertex
public final class Swtpm: Backend
```

swtpm, the TPM 2.0 emulator over libtpms, as a child process: its data
channel takes commands, its control channel powers it on and sets the
locality (swtpm's ioctl protocol, `tpm_ioctl.h`). Both are Unix sockets
in a directory only this user can open; swtpm exits when the control
connection goes, so it never outlives the VM.

The TPM's state -- its seeds, NV, the EK Windows makes -- persists in
`StateDir`, so a guest sees the same TPM every boot.

#### Initializers

<a id="Swtpm.init"></a>

```vertex
public init(stateDir: string, executable: string = "swtpm")
```

#### Properties

<a id="Swtpm.StateDir"></a>

```vertex
public let StateDir: string
```

<a id="Swtpm.Executable"></a>

```vertex
public let Executable: string
```

#### Methods

<a id="Swtpm.Available"></a>

```vertex
public static func Available(_ executable: string = "swtpm") -> bool
```

Whether swtpm can be found on PATH (or at `Executable`).

<a id="Swtpm.Init"></a>

```vertex
public func Init() async throws
```

<a id="Swtpm.Execute"></a>

```vertex
public func Execute(_ command: [uint8], locality l: uint8) async throws -> [uint8]
```

<a id="Swtpm.Shutdown"></a>

```vertex
public func Shutdown()
```

### class Tis <a id="class-Tis"></a>

```vertex
public final class Tis: device.Mmio
```

A TPM's TIS / FIFO register interface over MMIO, 5 KiB per locality
times 5 (`Size`). Firmware and the OS find it by its device-tree node
(`tcg,tpm-tis-mmio`) or its ACPI device (MSFT0101) and TPM2 table, and
poll it: there is no interrupt.

The state machine is QEMU's (hw/tpm/tpm_tis_common.c): a locality is
requested and granted, the command is written into the FIFO, `tpmGo`
runs it on the backend in a task, and the guest polls `dataAvail` and
reads the response back out.

#### Initializers

<a id="Tis.init"></a>

```vertex
public init(backend: any Backend)
```

#### Properties

<a id="Tis.Size"></a>

```vertex
public static let Size: uint64 = 0x5000
```

<a id="Tis.CommandCount"></a>

```vertex
public private(set) var CommandCount = 0
```

Commands executed so far: how a test sees the guest using the TPM.

#### Methods

<a id="Tis.Read"></a>

```vertex
public func Read(offset addr: uint64, size: uint8) -> uint64
```

<a id="Tis.Write"></a>

```vertex
public func Write(offset addr: uint64, size: uint8, value v: uint64)
```

<a id="Tis.PowerOn"></a>

```vertex
public func PowerOn() async throws
```

Powers the TPM on: the machine is starting. Firmware sends
TPM2_Startup itself.

<a id="Tis.Shutdown"></a>

```vertex
public func Shutdown()
```

### enum TpmError <a id="enum-TpmError"></a>

```vertex
public enum TpmError: Error, CustomStringConvertible
```

#### Cases

<a id="TpmError.backendMissing"></a>

```vertex
case backendMissing(string)
```

<a id="TpmError.backendFailed"></a>

```vertex
case backendFailed(string)
```

#### Properties

<a id="TpmError.description"></a>

```vertex
public var description: string { get }
```

## Files

- backend.vs
- tis.vs
