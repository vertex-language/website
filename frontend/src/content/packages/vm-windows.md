# package windows

```vertex
import "vm/windows"
```

## Index

- [Constants](#constants)
- [`func BuildWindowsAcpi(vcpus: int, virtioCount: int) -> acpi.Payload`](#func-BuildWindowsAcpi)
- [`func ConfigureVm(isoPath: string, vcpus: int = 4, memoryMiB: int = 4096, targetDisk: (any disk.Image)? = nil, firmware: Firmware, savedVars: [uint8]? = nil, tpmStateDir: string? = nil) async throws -> vm.Config`](#func-ConfigureVm)
- [`func DetectIso(_ path: string) throws -> WindowsIsoInfo?`](#func-DetectIso)
- [`func FindFirmware(customCodePath: string? = nil, customVarsPath: string? = nil) throws -> Firmware`](#func-FindFirmware)
- [`func GenerateAutoUnattendXml() -> string`](#func-GenerateAutoUnattendXml)
- [`func InstallAcpiTables(fwcfg: boot.FwCfg, payload: acpi.Payload)`](#func-InstallAcpiTables)
- [`struct Firmware`](#struct-Firmware)
  - [`let Code: [uint8]`](#Firmware.Code)
  - [`let VarsTemplate: [uint8]`](#Firmware.VarsTemplate)
  - [`let Name: string`](#Firmware.Name)
  - [`let SecureBoot: bool`](#Firmware.SecureBoot)
- [`enum LoaderCommandType: uint32`](#enum-LoaderCommandType)
- [`struct TableLoader`](#struct-TableLoader)
  - [`init()`](#TableLoader.init)
  - [`private(set) var Bytes: [uint8] = []`](#TableLoader.Bytes)
  - [`mutating func Allocate(file: string, align: uint32 = 64, zone: uint8 = 1)`](#TableLoader.Allocate)
  - [`mutating func AddPointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string)`](#TableLoader.AddPointer)
  - [`mutating func AddChecksum(file: string, resultOffset: uint32, start: uint32, length: uint32)`](#TableLoader.AddChecksum)
  - [`mutating func WritePointer(destFile: string, destOffset: uint32, size: uint8, srcFile: string, srcOffset: uint32)`](#TableLoader.WritePointer)
- [`enum WindowsError: Error`](#enum-WindowsError)
- [`struct WindowsIsoInfo`](#struct-WindowsIsoInfo)
  - [`init(path: string, volumeId: string, arch: string, edition: string, isArm64: bool)`](#WindowsIsoInfo.init)
  - [`let Path: string`](#WindowsIsoInfo.Path)
  - [`let VolumeId: string`](#WindowsIsoInfo.VolumeId)
  - [`let Arch: string`](#WindowsIsoInfo.Arch)
  - [`let Edition: string`](#WindowsIsoInfo.Edition)
  - [`let IsArm64: bool`](#WindowsIsoInfo.IsArm64)

## Constants

<a id="let-LabConfigRegistryCommands"></a>

```vertex
public let LabConfigRegistryCommands: string
```

Registry command string to apply LabConfig bypass manually in Windows Setup (Shift+F10 console).

## Functions

### func BuildWindowsAcpi <a id="func-BuildWindowsAcpi"></a>

```vertex
public func BuildWindowsAcpi(vcpus: int, virtioCount: int) -> acpi.Payload
```

Builds ACPI payload configured for Windows ARM64.

### func ConfigureVm <a id="func-ConfigureVm"></a>

```vertex
public func ConfigureVm(
    isoPath: string,
    vcpus: int = 4,
    memoryMiB: int = 4096,
    targetDisk: (any disk.Image)? = nil,
    firmware: Firmware,
    savedVars: [uint8]? = nil,
    tpmStateDir: string? = nil
) async throws -> vm.Config
```

Automatically creates a complete VM configuration tailored for Windows ARM64.

### func DetectIso <a id="func-DetectIso"></a>

```vertex
public func DetectIso(_ path: string) throws -> WindowsIsoInfo?
```

Detects whether an ISO image at the given path is a Windows ARM64 installation media.

### func FindFirmware <a id="func-FindFirmware"></a>

```vertex
public func FindFirmware(customCodePath: string? = nil, customVarsPath: string? = nil) throws -> Firmware
```

Finds UEFI firmware for a Windows guest: `customCodePath` if given (with
`customVarsPath` as its template), else the Secure Boot firmware in
firmware/, else QEMU's (Secure Boot off).

### func GenerateAutoUnattendXml <a id="func-GenerateAutoUnattendXml"></a>

```vertex
public func GenerateAutoUnattendXml() -> string
```

Generates an unattended setup configuration (autounattend.xml) that automatically bypasses
TPM 2.0, Secure Boot, CPU, and RAM checks for Windows 11 virtual machines.

### func InstallAcpiTables <a id="func-InstallAcpiTables"></a>

```vertex
public func InstallAcpiTables(fwcfg: boot.FwCfg, payload: acpi.Payload)
```

Registers the generated ACPI tables with fw_cfg so EDK2 installs them.

## Types

### struct Firmware <a id="struct-Firmware"></a>

```vertex
public struct Firmware
```

UEFI firmware for a Windows guest: its code, the template its variable
store starts from, and what it is.

#### Properties

<a id="Firmware.Code"></a>

```vertex
public let Code: [uint8]
```

<a id="Firmware.VarsTemplate"></a>

```vertex
public let VarsTemplate: [uint8]
```

<a id="Firmware.Name"></a>

```vertex
public let Name: string
```

Names the firmware a saved variable store belongs to: a store from
other firmware (without its keys) is not reused.

<a id="Firmware.SecureBoot"></a>

```vertex
public let SecureBoot: bool
```

Secure Boot on, with Microsoft's keys enrolled.

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

### enum WindowsError <a id="enum-WindowsError"></a>

```vertex
public enum WindowsError: Error
```

#### Cases

<a id="WindowsError.firmwareNotFound"></a>

```vertex
case firmwareNotFound(string)
```

<a id="WindowsError.isoNotFound"></a>

```vertex
case isoNotFound(string)
```

<a id="WindowsError.invalidIso"></a>

```vertex
case invalidIso(string)
```

### struct WindowsIsoInfo <a id="struct-WindowsIsoInfo"></a>

```vertex
public struct WindowsIsoInfo
```

#### Initializers

<a id="WindowsIsoInfo.init"></a>

```vertex
public init(path: string, volumeId: string, arch: string, edition: string, isArm64: bool)
```

#### Properties

<a id="WindowsIsoInfo.Path"></a>

```vertex
public let Path: string
```

<a id="WindowsIsoInfo.VolumeId"></a>

```vertex
public let VolumeId: string
```

<a id="WindowsIsoInfo.Arch"></a>

```vertex
public let Arch: string
```

<a id="WindowsIsoInfo.Edition"></a>

```vertex
public let Edition: string
```

<a id="WindowsIsoInfo.IsArm64"></a>

```vertex
public let IsArm64: bool
```

## Files

- acpi.vs
- config.vs
- detect.vs
- labconfig.vs
- loader.vs
