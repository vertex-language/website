# package usb

```vertex
import "vm/usb"
```

Package usb is an xHCI controller and the USB devices a guest needs
without extra drivers: a HID keyboard, a HID tablet (absolute pointer),
and mass storage for installer ISOs. Windows, Linux, the BSDs and UEFI
all have inbox drivers for every one of them.

## Index

- [Variables](#variables)
- [`final class Keyboard: Peripheral`](#class-Keyboard)
  - [`init()`](#Keyboard.init)
  - [`var OnData: (() -> Void)? = nil`](#Keyboard.OnData)
  - [`var Speed: uint8 { get }`](#Keyboard.Speed)
  - [`var Product: string { get }`](#Keyboard.Product)
  - [`var DeviceDescriptor: [uint8] { get }`](#Keyboard.DeviceDescriptor)
  - [`var ConfigurationDescriptor: [uint8] { get }`](#Keyboard.ConfigurationDescriptor)
  - [`func Key(_ usage: uint8, pressed: bool)`](#Keyboard.Key)
  - [`func Press(modifiers: uint8, keys: [uint8])`](#Keyboard.Press)
  - [`func Control(_ setup: Setup, _ data: [uint8]) -> Transfer`](#Keyboard.Control)
  - [`func In(endpoint: uint8, max: int) async -> Transfer`](#Keyboard.In)
  - [`func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer`](#Keyboard.Out)
  - [`func Reset()`](#Keyboard.Reset)
- [`protocol Peripheral: AnyObject`](#protocol-Peripheral)
  - [`var DeviceDescriptor: [uint8] { get }`](#Peripheral.DeviceDescriptor)
  - [`var ConfigurationDescriptor: [uint8] { get }`](#Peripheral.ConfigurationDescriptor)
  - [`var Product: string { get }`](#Peripheral.Product)
  - [`var Speed: uint8 { get }`](#Peripheral.Speed)
  - [`var OnData: (() -> Void)? { get set }`](#Peripheral.OnData)
  - [`func Control(_ setup: Setup, _ data: [uint8]) -> Transfer`](#Peripheral.Control)
  - [`func In(endpoint: uint8, max: int) async -> Transfer`](#Peripheral.In)
  - [`func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer`](#Peripheral.Out)
  - [`func Reset()`](#Peripheral.Reset)
- [`struct Setup`](#struct-Setup)
  - [`init(requestType: uint8, request: uint8, value: uint16, index: uint16, length: uint16)`](#Setup.init)
  - [`let RequestType: uint8`](#Setup.RequestType)
  - [`let Request: uint8`](#Setup.Request)
  - [`let Value: uint16`](#Setup.Value)
  - [`let Index: uint16`](#Setup.Index)
  - [`let Length: uint16`](#Setup.Length)
  - [`var DeviceToHost: bool { get }`](#Setup.DeviceToHost)
  - [`var Kind: uint8 { get }`](#Setup.Kind)
  - [`var Recipient: uint8 { get }`](#Setup.Recipient)
- [`final class Storage: Peripheral`](#class-Storage)
  - [`init(_ image: any disk.Image, kind: Kind = .cdrom)`](#Storage.init)
  - [`let Image: any disk.Image`](#Storage.Image)
  - [`let Medium: Kind`](#Storage.Medium)
  - [`let BlockSize: uint64`](#Storage.BlockSize)
  - [`var OnData: (() -> Void)? = nil`](#Storage.OnData)
  - [`var Speed: uint8 { get }`](#Storage.Speed)
  - [`var Product: string { get }`](#Storage.Product)
  - [`var DeviceDescriptor: [uint8] { get }`](#Storage.DeviceDescriptor)
  - [`var ConfigurationDescriptor: [uint8] { get }`](#Storage.ConfigurationDescriptor)
  - [`func Control(_ setup: Setup, _ data: [uint8]) -> Transfer`](#Storage.Control)
  - [`func Reset()`](#Storage.Reset)
  - [`func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer`](#Storage.Out)
  - [`func In(endpoint: uint8, max: int) async -> Transfer`](#Storage.In)
- [`enum Kind`](#enum-Storage.Kind)
- [`final class Tablet: Peripheral`](#class-Tablet)
  - [`init()`](#Tablet.init)
  - [`var OnData: (() -> Void)? = nil`](#Tablet.OnData)
  - [`var Speed: uint8 { get }`](#Tablet.Speed)
  - [`var Product: string { get }`](#Tablet.Product)
  - [`var DeviceDescriptor: [uint8] { get }`](#Tablet.DeviceDescriptor)
  - [`var ConfigurationDescriptor: [uint8] { get }`](#Tablet.ConfigurationDescriptor)
  - [`func Move(x: float64, y: float64)`](#Tablet.Move)
  - [`func Button(_ index: int, pressed: bool)`](#Tablet.Button)
  - [`func Wheel(_ clicks: int8)`](#Tablet.Wheel)
  - [`func Control(_ setup: Setup, _ data: [uint8]) -> Transfer`](#Tablet.Control)
  - [`func In(endpoint: uint8, max: int) async -> Transfer`](#Tablet.In)
  - [`func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer`](#Tablet.Out)
  - [`func Reset()`](#Tablet.Reset)
- [`enum Transfer`](#enum-Transfer)
- [`final class Xhci: pci.Function`](#class-Xhci)
  - [`init(memory: device.GuestMemory, msi: (any device.Msi)? = nil, ports: int = 4)`](#Xhci.init)
  - [`let Config: pci.ConfigSpace`](#Xhci.Config)
  - [`var Trace = false`](#Xhci.Trace)
  - [`var Bars: [pci.Bar] { get }`](#Xhci.Bars)
  - [`func Plug(_ d: any Peripheral) -> int?`](#Xhci.Plug)
  - [`func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64`](#Xhci.ReadBar)
  - [`func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)`](#Xhci.WriteBar)

## Variables

<a id="var-TraceScsi"></a>

```vertex
public var TraceScsi = false
```

USB mass storage, bulk-only transport (BOT), carrying SCSI. As a
CD-ROM (`.cdrom`) it is what a USB DVD drive is: 2048-byte blocks,
read-only, and the MMC commands Windows' cdrom.sys and UEFI ask an
optical drive. As a disk it is a removable direct-access device.
Prints each SCSI command and its outcome.

## Types

### class Keyboard <a id="class-Keyboard"></a>

```vertex
public final class Keyboard: Peripheral
```

A HID boot keyboard (8-byte reports: modifiers, reserved, six keys).

#### Initializers

<a id="Keyboard.init"></a>

```vertex
public init()
```

#### Properties

<a id="Keyboard.OnData"></a>

```vertex
public var OnData: (() -> Void)? = nil
```

<a id="Keyboard.Speed"></a>

```vertex
public var Speed: uint8 { get }
```

<a id="Keyboard.Product"></a>

```vertex
public var Product: string { get }
```

<a id="Keyboard.DeviceDescriptor"></a>

```vertex
public var DeviceDescriptor: [uint8] { get }
```

<a id="Keyboard.ConfigurationDescriptor"></a>

```vertex
public var ConfigurationDescriptor: [uint8] { get }
```

#### Methods

<a id="Keyboard.Key"></a>

```vertex
public func Key(_ usage: uint8, pressed: bool)
```

A key went down or up, by HID usage (page 7): 0x04 is A, 0x28
Enter, 0xe0...0xe7 the modifiers.

<a id="Keyboard.Press"></a>

```vertex
public func Press(modifiers: uint8, keys: [uint8])
```

Queues a report as is: the modifier byte and up to six usages held.

<a id="Keyboard.Control"></a>

```vertex
public func Control(_ setup: Setup, _ data: [uint8]) -> Transfer
```

<a id="Keyboard.In"></a>

```vertex
public func In(endpoint: uint8, max: int) async -> Transfer
```

<a id="Keyboard.Out"></a>

```vertex
public func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer
```

<a id="Keyboard.Reset"></a>

```vertex
public func Reset()
```

### protocol Peripheral <a id="protocol-Peripheral"></a>

```vertex
public protocol Peripheral: AnyObject
```

A USB device behind a root-hub port. Control transfers go to endpoint
0; `In` / `Out` to its other endpoints, by endpoint number.

Not `Device`: vsc confuses protocols that two imported modules both
name (vsc_TODO.md).

#### Properties

<a id="Peripheral.DeviceDescriptor"></a>

```vertex
var DeviceDescriptor: [uint8] { get }
```

The device descriptor, then the whole configuration descriptor set.

<a id="Peripheral.ConfigurationDescriptor"></a>

```vertex
var ConfigurationDescriptor: [uint8] { get }
```

<a id="Peripheral.Product"></a>

```vertex
var Product: string { get }
```

The product name its string descriptor 2 gives.

<a id="Peripheral.Speed"></a>

```vertex
var Speed: uint8 { get }
```

Speed the port reports: 1 full, 2 low, 3 high, 4 super.

<a id="Peripheral.OnData"></a>

```vertex
var OnData: (() -> Void)? { get set }
```

Set by the controller: call it when an endpoint that answered
`.nak` has something now.

#### Methods

<a id="Peripheral.Control"></a>

```vertex
func Control(_ setup: Setup, _ data: [uint8]) -> Transfer
```

Class-specific and vendor control requests, and standard requests
to an interface or endpoint. Standard requests to the device are
the controller's.

<a id="Peripheral.In"></a>

```vertex
func In(endpoint: uint8, max: int) async -> Transfer
```

<a id="Peripheral.Out"></a>

```vertex
func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer
```

<a id="Peripheral.Reset"></a>

```vertex
func Reset()
```

The bus reset the device on its port.

### struct Setup <a id="struct-Setup"></a>

```vertex
public struct Setup
```

A SETUP packet (USB 2.0 §9.3).

#### Initializers

<a id="Setup.init"></a>

```vertex
public init(requestType: uint8, request: uint8, value: uint16, index: uint16, length: uint16)
```

#### Properties

<a id="Setup.RequestType"></a>

```vertex
public let RequestType: uint8
```

<a id="Setup.Request"></a>

```vertex
public let Request: uint8
```

<a id="Setup.Value"></a>

```vertex
public let Value: uint16
```

<a id="Setup.Index"></a>

```vertex
public let Index: uint16
```

<a id="Setup.Length"></a>

```vertex
public let Length: uint16
```

<a id="Setup.DeviceToHost"></a>

```vertex
public var DeviceToHost: bool { get }
```

<a id="Setup.Kind"></a>

```vertex
public var Kind: uint8 { get }
```

Standard (0), class (1) or vendor (2).

<a id="Setup.Recipient"></a>

```vertex
public var Recipient: uint8 { get }
```

Device (0), interface (1), endpoint (2) or other (3).

### class Storage <a id="class-Storage"></a>

```vertex
public final class Storage: Peripheral
```

#### Initializers

<a id="Storage.init"></a>

```vertex
public init(_ image: any disk.Image, kind: Kind = .cdrom)
```

#### Properties

<a id="Storage.Image"></a>

```vertex
public let Image: any disk.Image
```

<a id="Storage.Medium"></a>

```vertex
public let Medium: Kind
```

<a id="Storage.BlockSize"></a>

```vertex
public let BlockSize: uint64
```

<a id="Storage.OnData"></a>

```vertex
public var OnData: (() -> Void)? = nil
```

<a id="Storage.Speed"></a>

```vertex
public var Speed: uint8 { get }
```

<a id="Storage.Product"></a>

```vertex
public var Product: string { get }
```

<a id="Storage.DeviceDescriptor"></a>

```vertex
public var DeviceDescriptor: [uint8] { get }
```

<a id="Storage.ConfigurationDescriptor"></a>

```vertex
public var ConfigurationDescriptor: [uint8] { get }
```

#### Methods

<a id="Storage.Control"></a>

```vertex
public func Control(_ setup: Setup, _ data: [uint8]) -> Transfer
```

<a id="Storage.Reset"></a>

```vertex
public func Reset()
```

<a id="Storage.Out"></a>

```vertex
public func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer
```

<a id="Storage.In"></a>

```vertex
public func In(endpoint: uint8, max: int) async -> Transfer
```

### enum Storage.Kind <a id="enum-Storage.Kind"></a>

```vertex
public enum Kind
```

#### Cases

<a id="Storage.Kind.cdrom"></a>

```vertex
case cdrom
```

<a id="Storage.Kind.disk"></a>

```vertex
case disk
```

### class Tablet <a id="class-Tablet"></a>

```vertex
public final class Tablet: Peripheral
```

A HID tablet: an absolute pointer, so the guest cursor sits exactly
where the host's is and nothing has to be captured. Reports: buttons,
x and y in 0...32767, wheel.

#### Initializers

<a id="Tablet.init"></a>

```vertex
public init()
```

#### Properties

<a id="Tablet.OnData"></a>

```vertex
public var OnData: (() -> Void)? = nil
```

<a id="Tablet.Speed"></a>

```vertex
public var Speed: uint8 { get }
```

<a id="Tablet.Product"></a>

```vertex
public var Product: string { get }
```

<a id="Tablet.DeviceDescriptor"></a>

```vertex
public var DeviceDescriptor: [uint8] { get }
```

<a id="Tablet.ConfigurationDescriptor"></a>

```vertex
public var ConfigurationDescriptor: [uint8] { get }
```

#### Methods

<a id="Tablet.Move"></a>

```vertex
public func Move(x: float64, y: float64)
```

Moves the pointer. `x` and `y` are fractions of the screen, 0...1.

<a id="Tablet.Button"></a>

```vertex
public func Button(_ index: int, pressed: bool)
```

A button went down or up: 0 primary, 1 secondary, 2 middle.

<a id="Tablet.Wheel"></a>

```vertex
public func Wheel(_ clicks: int8)
```

Scrolls the wheel by `clicks` (positive is away from the user).

<a id="Tablet.Control"></a>

```vertex
public func Control(_ setup: Setup, _ data: [uint8]) -> Transfer
```

<a id="Tablet.In"></a>

```vertex
public func In(endpoint: uint8, max: int) async -> Transfer
```

<a id="Tablet.Out"></a>

```vertex
public func Out(endpoint: uint8, _ data: [uint8]) async -> Transfer
```

<a id="Tablet.Reset"></a>

```vertex
public func Reset()
```

### enum Transfer <a id="enum-Transfer"></a>

```vertex
public enum Transfer
```

The result of a transfer.

#### Cases

<a id="Transfer.data"></a>

```vertex
case data([uint8])
```

<a id="Transfer.nak"></a>

```vertex
case nak
```

Nothing to send yet (an interrupt endpoint with no new report).

<a id="Transfer.stall"></a>

```vertex
case stall
```

### class Xhci <a id="class-Xhci"></a>

```vertex
public final class Xhci: pci.Function
```

An xHCI host controller (xHCI 1.0) on PCI, with a USB 2.0 root hub:
capability, operational, runtime and doorbell registers in BAR 0, a
command ring, one interrupter with its event ring, and a device
context per slot. Interrupts are MSI-X where the platform delivers MSIs,
and PCI INTx otherwise.

Commands run on the vCPU thread that rings doorbell 0. Each endpoint's
transfer ring runs in a task of its own, one at a time; an interrupt or
bulk IN endpoint with nothing to say keeps its TD until its device calls
OnData.

#### Initializers

<a id="Xhci.init"></a>

```vertex
public init(memory: device.GuestMemory, msi: (any device.Msi)? = nil, ports: int = 4)
```

`msi` delivers MSI-X writes; nil leaves the controller on INTx.

#### Properties

<a id="Xhci.Config"></a>

```vertex
public let Config: pci.ConfigSpace
```

<a id="Xhci.Trace"></a>

```vertex
public var Trace = false
```

Prints every TD and event: for finding out why a guest's driver
waits forever.

<a id="Xhci.Bars"></a>

```vertex
public var Bars: [pci.Bar] { get }
```

#### Methods

<a id="Xhci.Plug"></a>

```vertex
@discardableResult
public func Plug(_ d: any Peripheral) -> int?
```

Plugs a device into the first free port; returns the port number (1-based).

<a id="Xhci.ReadBar"></a>

```vertex
public func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64
```

<a id="Xhci.WriteBar"></a>

```vertex
public func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)
```

## Files

- device.vs
- hid.vs
- storage.vs
- xhci.vs
