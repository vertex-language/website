# package virtio

```vertex
import "vm/virtio"
```

Package virtio is VirtIO 1.2: virtqueues, the MMIO and PCI transports,
and the devices Linux (and the BSDs, and Windows with virtio-win)
drive over them.

A device is written once, against Device, and a transport presents it:
MmioTransport on the micro platform, PciTransport on the standard one.

## Index

- [Constants](#constants)
- [`final class Balloon: Device`](#class-Balloon)
  - [`init()`](#Balloon.init)
  - [`let Id = DeviceId(rawValue: 5)`](#Balloon.Id)
  - [`var TargetPages: uint32 = 0`](#Balloon.TargetPages)
  - [`var Features: uint64 { get }`](#Balloon.Features)
  - [`var QueueSizes: [uint16] { get }`](#Balloon.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Balloon.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Balloon.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Balloon.Activate)
  - [`func Reset()`](#Balloon.Reset)
  - [`func SetTarget(_ pages: uint32)`](#Balloon.SetTarget)
  - [`func Notified(queue index: int)`](#Balloon.Notified)
- [`final class Block: Device`](#class-Block)
  - [`init(_ image: any disk.Image)`](#Block.init)
  - [`let Id = DeviceId(rawValue: 2)`](#Block.Id)
  - [`var Features: uint64 { get }`](#Block.Features)
  - [`var QueueSizes: [uint16] { get }`](#Block.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Block.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Block.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Block.Activate)
  - [`func Reset()`](#Block.Reset)
  - [`func Notified(queue index: int)`](#Block.Notified)
- [`struct Buffer`](#struct-Buffer)
  - [`let Address: device.GuestAddress`](#Buffer.Address)
  - [`let Count: uint32`](#Buffer.Count)
  - [`let Writable: bool`](#Buffer.Writable)
- [`struct Chain`](#struct-Chain)
  - [`let Head: uint16`](#Chain.Head)
  - [`let Buffers: [Buffer]`](#Chain.Buffers)
  - [`var WritableCount: uint32 { get }`](#Chain.WritableCount)
- [`final class Console: Device`](#class-Console)
  - [`init(input: (any io.AsyncReader)?, output: any io.AsyncWriter)`](#Console.init)
  - [`let Id = DeviceId(rawValue: 3)`](#Console.Id)
  - [`var Features: uint64 { get }`](#Console.Features)
  - [`var QueueSizes: [uint16] { get }`](#Console.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Console.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Console.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Console.Activate)
  - [`func Reset()`](#Console.Reset)
  - [`func Notified(queue index: int)`](#Console.Notified)
- [`protocol Device: AnyObject`](#protocol-Device)
  - [`var Id: DeviceId { get }`](#Device.Id)
  - [`var Features: uint64 { get }`](#Device.Features)
  - [`var QueueSizes: [uint16] { get }`](#Device.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Device.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Device.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Device.Activate)
  - [`func Reset()`](#Device.Reset)
  - [`func Notified(queue index: int)`](#Device.Notified)
- [`struct DeviceId: Equatable, Hashable`](#struct-DeviceId)
  - [`init(rawValue: uint32)`](#DeviceId.init)
  - [`let rawValue: uint32`](#DeviceId.rawValue)
  - [`static let net = DeviceId(rawValue: 1)`](#DeviceId.net)
  - [`static let block = DeviceId(rawValue: 2)`](#DeviceId.block)
  - [`static let console = DeviceId(rawValue: 3)`](#DeviceId.console)
  - [`static let entropy = DeviceId(rawValue: 4)`](#DeviceId.entropy)
  - [`static let balloon = DeviceId(rawValue: 5)`](#DeviceId.balloon)
  - [`static let gpu = DeviceId(rawValue: 16)`](#DeviceId.gpu)
  - [`static let input = DeviceId(rawValue: 18)`](#DeviceId.input)
  - [`static let vsock = DeviceId(rawValue: 19)`](#DeviceId.vsock)
  - [`static let fs = DeviceId(rawValue: 26)`](#DeviceId.fs)
- [`enum Feature`](#enum-Feature)
  - [`static let indirectDescriptors: uint64 = 1 << 28`](#Feature.indirectDescriptors)
  - [`static let eventIdx: uint64 = 1 << 29`](#Feature.eventIdx)
  - [`static let version1: uint64 = 1 << 32`](#Feature.version1)
  - [`static let accessPlatform: uint64 = 1 << 33`](#Feature.accessPlatform)
  - [`static let ringPacked: uint64 = 1 << 34`](#Feature.ringPacked)
  - [`static let inOrder: uint64 = 1 << 35`](#Feature.inOrder)
- [`final class Input: Device`](#class-Input)
  - [`init(_ kind: Kind)`](#Input.init)
  - [`let Id = DeviceId.input`](#Input.Id)
  - [`let DeviceKind: Kind`](#Input.DeviceKind)
  - [`var Features: uint64 { get }`](#Input.Features)
  - [`var QueueSizes: [uint16] { get }`](#Input.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Input.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Input.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Input.Activate)
  - [`func Reset()`](#Input.Reset)
  - [`func Notified(queue index: int)`](#Input.Notified)
  - [`func Send(type: uint16, code: uint16, value: uint32)`](#Input.Send)
  - [`func MoveAbsolute(x: int32, y: int32)`](#Input.MoveAbsolute)
  - [`func Button(button: int32, pressed: bool)`](#Input.Button)
  - [`func Key(code: uint16, pressed: bool)`](#Input.Key)
- [`enum Kind`](#enum-Input.Kind)
- [`final class MmioTransport: device.Mmio, Notifier`](#class-MmioTransport)
  - [`init(_ dev: any Device, memory: device.GuestMemory, irq: any device.Irq)`](#MmioTransport.init)
  - [`static let Size: uint64 = 0x200`](#MmioTransport.Size)
  - [`func Read(offset: uint64, size: uint8) -> uint64`](#MmioTransport.Read)
  - [`func Write(offset: uint64, size: uint8, value: uint64)`](#MmioTransport.Write)
  - [`func QueueUsed(_ index: int)`](#MmioTransport.QueueUsed)
  - [`func ConfigChanged()`](#MmioTransport.ConfigChanged)
- [`final class Net: Device`](#class-Net)
  - [`init(port: any ether.Port, mac: ether.Mac = ether.Mac.Random())`](#Net.init)
  - [`let Id = DeviceId.net`](#Net.Id)
  - [`let Mac: ether.Mac`](#Net.Mac)
  - [`var Features: uint64 { get }`](#Net.Features)
  - [`var QueueSizes: [uint16] { get }`](#Net.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Net.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Net.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Net.Activate)
  - [`func Reset()`](#Net.Reset)
  - [`func Notified(queue index: int)`](#Net.Notified)
- [`protocol Notifier: AnyObject`](#protocol-Notifier)
  - [`func QueueUsed(_ index: int)`](#Notifier.QueueUsed)
  - [`func ConfigChanged()`](#Notifier.ConfigChanged)
- [`final class PciTransport: pci.Function, Notifier`](#class-PciTransport)
  - [`init(_ dev: any Device, memory: device.GuestMemory, msi: any device.Msi)`](#PciTransport.init)
  - [`let Config: pci.ConfigSpace`](#PciTransport.Config)
  - [`var Bars: [pci.Bar] { get }`](#PciTransport.Bars)
  - [`func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64`](#PciTransport.ReadBar)
  - [`func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)`](#PciTransport.WriteBar)
  - [`func QueueUsed(_ index: int)`](#PciTransport.QueueUsed)
  - [`func ConfigChanged()`](#PciTransport.ConfigChanged)
- [`final class Queue`](#class-Queue)
  - [`init(index: int, size: uint16, memory: device.GuestMemory)`](#Queue.init)
  - [`let Index: int`](#Queue.Index)
  - [`var Size: uint16`](#Queue.Size)
  - [`var Descriptors: device.GuestAddress = device.GuestAddress(0)`](#Queue.Descriptors)
  - [`var Available: device.GuestAddress = device.GuestAddress(0)`](#Queue.Available)
  - [`var Used: device.GuestAddress = device.GuestAddress(0)`](#Queue.Used)
  - [`var Ready = false`](#Queue.Ready)
  - [`var EventIndex = false`](#Queue.EventIndex)
  - [`func Pop() throws -> Chain?`](#Queue.Pop)
  - [`func Push(_ head: uint16, written: uint32) throws -> bool`](#Queue.Push)
  - [`func ReadAll(_ chain: Chain) throws -> [uint8]`](#Queue.ReadAll)
  - [`func WriteAll(_ chain: Chain, _ bytes: borrowing [uint8]) throws -> uint32`](#Queue.WriteAll)
  - [`func Reset()`](#Queue.Reset)
- [`enum QueueError: Error`](#enum-QueueError)
- [`final class Rng: Device`](#class-Rng)
  - [`init()`](#Rng.init)
  - [`let Id = DeviceId.entropy`](#Rng.Id)
  - [`var Features: uint64 { get }`](#Rng.Features)
  - [`var QueueSizes: [uint16] { get }`](#Rng.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Rng.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Rng.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Rng.Activate)
  - [`func Reset()`](#Rng.Reset)
  - [`func Notified(queue index: int)`](#Rng.Notified)
- [`enum Status`](#enum-Status)
  - [`static let acknowledge: uint8 = 1`](#Status.acknowledge)
  - [`static let driver: uint8 = 2`](#Status.driver)
  - [`static let driverOk: uint8 = 4`](#Status.driverOk)
  - [`static let featuresOk: uint8 = 8`](#Status.featuresOk)
  - [`static let needsReset: uint8 = 64`](#Status.needsReset)
  - [`static let failed: uint8 = 128`](#Status.failed)
- [`final class Vsock: Device`](#class-Vsock)
  - [`init(cid: uint64 = 3)`](#Vsock.init)
  - [`let Id = DeviceId.vsock`](#Vsock.Id)
  - [`let Cid: uint64`](#Vsock.Cid)
  - [`var Features: uint64 { get }`](#Vsock.Features)
  - [`var QueueSizes: [uint16] { get }`](#Vsock.QueueSizes)
  - [`func ReadConfig(offset: uint64, size: uint8) -> uint64`](#Vsock.ReadConfig)
  - [`func WriteConfig(offset: uint64, size: uint8, value: uint64)`](#Vsock.WriteConfig)
  - [`func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws`](#Vsock.Activate)
  - [`func Reset()`](#Vsock.Reset)
  - [`func Notified(queue index: int)`](#Vsock.Notified)

## Constants

<a id="let-CommonFeatures"></a>

```vertex
public let CommonFeatures: uint64 = Feature.version1 | Feature.indirectDescriptors
```

What every device's `Features` starts from.

<a id="let-VendorId"></a>

```vertex
public let VendorId: uint32 = 0x0058_5456
```

Vertex's vendor ID in the MMIO transport's VendorID register ("VTX\0").
Not QEMU's.

## Types

### class Balloon <a id="class-Balloon"></a>

```vertex
public final class Balloon: Device
```

virtio-balloon (spec §5.5): the guest gives pages back to the host on
request, and reports free pages. Queues: inflate 0, deflate 1, stats 2.

#### Initializers

<a id="Balloon.init"></a>

```vertex
public init()
```

#### Properties

<a id="Balloon.Id"></a>

```vertex
public let Id = DeviceId(rawValue: 5)
```

<a id="Balloon.TargetPages"></a>

```vertex
public var TargetPages: uint32 = 0
```

How many 4 KiB pages the host wants the guest to give up.

<a id="Balloon.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Balloon.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

STATS_VQ

#### Methods

<a id="Balloon.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Balloon.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Balloon.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Balloon.Reset"></a>

```vertex
public func Reset()
```

<a id="Balloon.SetTarget"></a>

```vertex
public func SetTarget(_ pages: uint32)
```

Asks the guest to hold `pages` pages.

<a id="Balloon.Notified"></a>

```vertex
public func Notified(queue index: int)
```

### class Block <a id="class-Block"></a>

```vertex
public final class Block: Device
```

virtio-blk (spec §5.2): a disk.Image as a block device with one
request queue.

#### Initializers

<a id="Block.init"></a>

```vertex
public init(_ image: any disk.Image)
```

#### Properties

<a id="Block.Id"></a>

```vertex
public let Id = DeviceId(rawValue: 2)
```

<a id="Block.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Block.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

#### Methods

<a id="Block.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Block.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Block.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Block.Reset"></a>

```vertex
public func Reset()
```

<a id="Block.Notified"></a>

```vertex
public func Notified(queue index: int)
```

### struct Buffer <a id="struct-Buffer"></a>

```vertex
public struct Buffer
```

One element of a descriptor chain: guest memory the device reads
(`Writable` false) or writes (true).

#### Properties

<a id="Buffer.Address"></a>

```vertex
public let Address: device.GuestAddress
```

<a id="Buffer.Count"></a>

```vertex
public let Count: uint32
```

<a id="Buffer.Writable"></a>

```vertex
public let Writable: bool
```

### struct Chain <a id="struct-Chain"></a>

```vertex
public struct Chain
```

A chain the driver made available: its head index, and its buffers in
order (readable ones first, as the spec requires).

#### Properties

<a id="Chain.Head"></a>

```vertex
public let Head: uint16
```

<a id="Chain.Buffers"></a>

```vertex
public let Buffers: [Buffer]
```

<a id="Chain.WritableCount"></a>

```vertex
public var WritableCount: uint32 { get }
```

Total bytes the device may write.

### class Console <a id="class-Console"></a>

```vertex
public final class Console: Device
```

virtio-console (spec §5.3): the guest's hvc0, joined to a host stream.
One port, no multiport: receive queue 0, transmit queue 1.

#### Initializers

<a id="Console.init"></a>

```vertex
public init(input: (any io.AsyncReader)?, output: any io.AsyncWriter)
```

`input` is what the guest reads (nil for none); `output` is where
what it writes goes.

#### Properties

<a id="Console.Id"></a>

```vertex
public let Id = DeviceId(rawValue: 3)
```

<a id="Console.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Console.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

#### Methods

<a id="Console.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Console.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Console.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Console.Reset"></a>

```vertex
public func Reset()
```

<a id="Console.Notified"></a>

```vertex
public func Notified(queue index: int)
```

### protocol Device <a id="protocol-Device"></a>

```vertex
public protocol Device: AnyObject
```

What a transport needs from a device. The transport owns feature
negotiation, status and queue setup; the device owns its config space
and what its queues mean.

#### Properties

<a id="Device.Id"></a>

```vertex
var Id: DeviceId { get }
```

<a id="Device.Features"></a>

```vertex
var Features: uint64 { get }
```

Everything this device can do, common bits included.

<a id="Device.QueueSizes"></a>

```vertex
var QueueSizes: [uint16] { get }
```

How many queues, and the largest size of each.

#### Methods

<a id="Device.ReadConfig"></a>

```vertex
func ReadConfig(offset: uint64, size: uint8) -> uint64
```

Reads and writes the device-specific configuration space.

<a id="Device.WriteConfig"></a>

```vertex
func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Device.Activate"></a>

```vertex
func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

The driver set DRIVER_OK: the queues are ready, with these features.

<a id="Device.Reset"></a>

```vertex
func Reset()
```

The driver wrote 0 to status. Stop using the queues.

<a id="Device.Notified"></a>

```vertex
func Notified(queue index: int)
```

Queue `index` was kicked. Called on a vCPU thread: start work, don't
do it here.

### struct DeviceId <a id="struct-DeviceId"></a>

```vertex
public struct DeviceId: Equatable, Hashable
```

Device IDs, from the VirtIO 1.2 spec, §5.

#### Initializers

<a id="DeviceId.init"></a>

```vertex
public init(rawValue: uint32)
```

#### Properties

<a id="DeviceId.rawValue"></a>

```vertex
public let rawValue: uint32
```

<a id="DeviceId.net"></a>

```vertex
public static let net = DeviceId(rawValue: 1)
```

<a id="DeviceId.block"></a>

```vertex
public static let block = DeviceId(rawValue: 2)
```

<a id="DeviceId.console"></a>

```vertex
public static let console = DeviceId(rawValue: 3)
```

<a id="DeviceId.entropy"></a>

```vertex
public static let entropy = DeviceId(rawValue: 4)
```

<a id="DeviceId.balloon"></a>

```vertex
public static let balloon = DeviceId(rawValue: 5)
```

<a id="DeviceId.gpu"></a>

```vertex
public static let gpu = DeviceId(rawValue: 16)
```

<a id="DeviceId.input"></a>

```vertex
public static let input = DeviceId(rawValue: 18)
```

<a id="DeviceId.vsock"></a>

```vertex
public static let vsock = DeviceId(rawValue: 19)
```

<a id="DeviceId.fs"></a>

```vertex
public static let fs = DeviceId(rawValue: 26)
```

### enum Feature <a id="enum-Feature"></a>

```vertex
public enum Feature
```

Feature bits every device shares (spec §6).

#### Properties

<a id="Feature.indirectDescriptors"></a>

```vertex
public static let indirectDescriptors: uint64 = 1 << 28
```

<a id="Feature.eventIdx"></a>

```vertex
public static let eventIdx: uint64 = 1 << 29
```

<a id="Feature.version1"></a>

```vertex
public static let version1: uint64 = 1 << 32
```

VIRTIO_F_VERSION_1: a modern device. Every device here sets it.

<a id="Feature.accessPlatform"></a>

```vertex
public static let accessPlatform: uint64 = 1 << 33
```

<a id="Feature.ringPacked"></a>

```vertex
public static let ringPacked: uint64 = 1 << 34
```

<a id="Feature.inOrder"></a>

```vertex
public static let inOrder: uint64 = 1 << 35
```

### class Input <a id="class-Input"></a>

```vertex
public final class Input: Device
```

virtio-input (spec §5.8): evdev events, for Linux guests with a
display. Windows has no inbox driver, so Windows gets usb.Keyboard and
usb.Tablet instead. Queues: event 0, status 1.

#### Initializers

<a id="Input.init"></a>

```vertex
public init(_ kind: Kind)
```

#### Properties

<a id="Input.Id"></a>

```vertex
public let Id = DeviceId.input
```

<a id="Input.DeviceKind"></a>

```vertex
public let DeviceKind: Kind
```

<a id="Input.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Input.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

#### Methods

<a id="Input.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Input.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Input.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Input.Reset"></a>

```vertex
public func Reset()
```

<a id="Input.Notified"></a>

```vertex
public func Notified(queue index: int)
```

<a id="Input.Send"></a>

```vertex
public func Send(type: uint16, code: uint16, value: uint32)
```

Queues one evdev event (type, code, value) for the guest.

<a id="Input.MoveAbsolute"></a>

```vertex
public func MoveAbsolute(x: int32, y: int32)
```

Sends an absolute position event (0..32767 for tablet).

<a id="Input.Button"></a>

```vertex
public func Button(button: int32, pressed: bool)
```

Sends a button press or release.
button: 0 (primary/left), 1 (secondary/right), 2 (middle)

<a id="Input.Key"></a>

```vertex
public func Key(code: uint16, pressed: bool)
```

Sends a keyboard key press or release event for Linux evdev.

### enum Input.Kind <a id="enum-Input.Kind"></a>

```vertex
public enum Kind
```

#### Cases

<a id="Input.Kind.keyboard"></a>

```vertex
case keyboard
```

<a id="Input.Kind.tablet"></a>

```vertex
case tablet
```

### class MmioTransport <a id="class-MmioTransport"></a>

```vertex
public final class MmioTransport: device.Mmio, Notifier
```

VirtIO over MMIO (spec §4.2), version 2: the micro platform's
transport. 0x200 bytes of registers; device config from 0x100.

#### Initializers

<a id="MmioTransport.init"></a>

```vertex
public init(_ dev: any Device, memory: device.GuestMemory, irq: any device.Irq)
```

#### Properties

<a id="MmioTransport.Size"></a>

```vertex
public static let Size: uint64 = 0x200
```

#### Methods

<a id="MmioTransport.Read"></a>

```vertex
public func Read(offset: uint64, size: uint8) -> uint64
```

<a id="MmioTransport.Write"></a>

```vertex
public func Write(offset: uint64, size: uint8, value: uint64)
```

<a id="MmioTransport.QueueUsed"></a>

```vertex
public func QueueUsed(_ index: int)
```

<a id="MmioTransport.ConfigChanged"></a>

```vertex
public func ConfigChanged()
```

### class Net <a id="class-Net"></a>

```vertex
public final class Net: Device
```

virtio-net (spec §5.1): an Ethernet port for the guest. The other end
is an `ether.Port`: `net/nat` (unprivileged NAT, the default) or
`net/tap` (a bridge on the host).

#### Initializers

<a id="Net.init"></a>

```vertex
public init(port: any ether.Port, mac: ether.Mac = ether.Mac.Random())
```

#### Properties

<a id="Net.Id"></a>

```vertex
public let Id = DeviceId.net
```

<a id="Net.Mac"></a>

```vertex
public let Mac: ether.Mac
```

<a id="Net.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Net.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

Receive queue 0, transmit queue 1.

#### Methods

<a id="Net.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Net.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Net.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Net.Reset"></a>

```vertex
public func Reset()
```

<a id="Net.Notified"></a>

```vertex
public func Notified(queue index: int)
```

### protocol Notifier <a id="protocol-Notifier"></a>

```vertex
public protocol Notifier: AnyObject
```

How a device tells the driver it used buffers or changed its config:
the transport's interrupt (an MMIO IRQ line, or an MSI-X vector).

#### Methods

<a id="Notifier.QueueUsed"></a>

```vertex
func QueueUsed(_ index: int)
```

<a id="Notifier.ConfigChanged"></a>

```vertex
func ConfigChanged()
```

### class PciTransport <a id="class-PciTransport"></a>

```vertex
public final class PciTransport: pci.Function, Notifier
```

VirtIO over PCI (spec §4.1): the standard platform's transport. PCI
device ID 0x1040 + the VirtIO ID, and vendor-specific capabilities
pointing at the common, notify, ISR and device config structures in
BAR 4. Interrupts are MSI-X: one vector for config, one per queue.

#### Initializers

<a id="PciTransport.init"></a>

```vertex
public init(_ dev: any Device, memory: device.GuestMemory, msi: any device.Msi)
```

#### Properties

<a id="PciTransport.Config"></a>

```vertex
public let Config: pci.ConfigSpace
```

<a id="PciTransport.Bars"></a>

```vertex
public var Bars: [pci.Bar] { get }
```

#### Methods

<a id="PciTransport.ReadBar"></a>

```vertex
public func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64
```

<a id="PciTransport.WriteBar"></a>

```vertex
public func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)
```

<a id="PciTransport.QueueUsed"></a>

```vertex
public func QueueUsed(_ index: int)
```

<a id="PciTransport.ConfigChanged"></a>

```vertex
public func ConfigChanged()
```

### class Queue <a id="class-Queue"></a>

```vertex
public final class Queue
```

A split virtqueue (spec §2.7): descriptor table, available ring and
used ring, each at the guest address the driver gave.

#### Initializers

<a id="Queue.init"></a>

```vertex
public init(index: int, size: uint16, memory: device.GuestMemory)
```

#### Properties

<a id="Queue.Index"></a>

```vertex
public let Index: int
```

<a id="Queue.Size"></a>

```vertex
public var Size: uint16
```

<a id="Queue.Descriptors"></a>

```vertex
public var Descriptors: device.GuestAddress = device.GuestAddress(0)
```

<a id="Queue.Available"></a>

```vertex
public var Available: device.GuestAddress = device.GuestAddress(0)
```

<a id="Queue.Used"></a>

```vertex
public var Used: device.GuestAddress = device.GuestAddress(0)
```

<a id="Queue.Ready"></a>

```vertex
public var Ready = false
```

<a id="Queue.EventIndex"></a>

```vertex
public var EventIndex = false
```

Whether VIRTIO_F_EVENT_IDX was negotiated.

#### Methods

<a id="Queue.Pop"></a>

```vertex
public func Pop() throws -> Chain?
```

The next chain the driver made available, or nil if there's none.

<a id="Queue.Push"></a>

```vertex
public func Push(_ head: uint16, written: uint32) throws -> bool
```

Returns a chain to the driver, saying how many bytes were written
into it. Returns whether the driver wants an interrupt for it.

<a id="Queue.ReadAll"></a>

```vertex
public func ReadAll(_ chain: Chain) throws -> [uint8]
```

Copies the chain's readable bytes out of guest memory.

<a id="Queue.WriteAll"></a>

```vertex
public func WriteAll(_ chain: Chain, _ bytes: borrowing [uint8]) throws -> uint32
```

Copies bytes into the chain's writable buffers, in order. Returns
how many fit.

<a id="Queue.Reset"></a>

```vertex
public func Reset()
```

### enum QueueError <a id="enum-QueueError"></a>

```vertex
public enum QueueError: Error
```

QueueError is a driver that broke the ring's rules. The device reports
it by setting NEEDS_RESET.

#### Cases

<a id="QueueError.badDescriptor"></a>

```vertex
case badDescriptor(uint16)
```

<a id="QueueError.loop"></a>

```vertex
case loop
```

<a id="QueueError.writableBeforeReadable"></a>

```vertex
case writableBeforeReadable
```

<a id="QueueError.notReady"></a>

```vertex
case notReady
```

### class Rng <a id="class-Rng"></a>

```vertex
public final class Rng: Device
```

virtio-rng (spec §5.4): entropy from the host's generator.

#### Initializers

<a id="Rng.init"></a>

```vertex
public init()
```

#### Properties

<a id="Rng.Id"></a>

```vertex
public let Id = DeviceId.entropy
```

<a id="Rng.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Rng.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

#### Methods

<a id="Rng.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Rng.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Rng.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Rng.Reset"></a>

```vertex
public func Reset()
```

<a id="Rng.Notified"></a>

```vertex
public func Notified(queue index: int)
```

### enum Status <a id="enum-Status"></a>

```vertex
public enum Status
```

Device status bits the driver writes (spec §2.1).

#### Properties

<a id="Status.acknowledge"></a>

```vertex
public static let acknowledge: uint8 = 1
```

<a id="Status.driver"></a>

```vertex
public static let driver: uint8 = 2
```

<a id="Status.driverOk"></a>

```vertex
public static let driverOk: uint8 = 4
```

<a id="Status.featuresOk"></a>

```vertex
public static let featuresOk: uint8 = 8
```

<a id="Status.needsReset"></a>

```vertex
public static let needsReset: uint8 = 64
```

<a id="Status.failed"></a>

```vertex
public static let failed: uint8 = 128
```

### class Vsock <a id="class-Vsock"></a>

```vertex
public final class Vsock: Device
```

virtio-vsock (spec §5.10): sockets between host and guest with no
network at all. The host is CID 2; the guest gets `Cid` (3 or more).
Guest agents and port forwarding use this instead of IP.

Queues: rx 0, tx 1, event 2. Every packet has a 44-byte header (src/dst
CID and port, len, type STREAM, op REQUEST/RESPONSE/RST/SHUTDOWN/RW/
CREDIT_UPDATE/CREDIT_REQUEST, buf_alloc, fwd_cnt).

#### Initializers

<a id="Vsock.init"></a>

```vertex
public init(cid: uint64 = 3)
```

#### Properties

<a id="Vsock.Id"></a>

```vertex
public let Id = DeviceId.vsock
```

<a id="Vsock.Cid"></a>

```vertex
public let Cid: uint64
```

<a id="Vsock.Features"></a>

```vertex
public var Features: uint64 { get }
```

<a id="Vsock.QueueSizes"></a>

```vertex
public var QueueSizes: [uint16] { get }
```

#### Methods

<a id="Vsock.ReadConfig"></a>

```vertex
public func ReadConfig(offset: uint64, size: uint8) -> uint64
```

<a id="Vsock.WriteConfig"></a>

```vertex
public func WriteConfig(offset: uint64, size: uint8, value: uint64)
```

<a id="Vsock.Activate"></a>

```vertex
public func Activate(queues: [Queue], features: uint64, notify: any Notifier) throws
```

<a id="Vsock.Reset"></a>

```vertex
public func Reset()
```

<a id="Vsock.Notified"></a>

```vertex
public func Notified(queue index: int)
```

## Files

- balloon.vs
- block.vs
- console.vs
- device.vs
- input.vs
- mmio.vs
- net.vs
- packed.vs
- pci.vs
- queue.vs
- rng.vs
- vsock.vs
