# package nvme

```vertex
import "vm/nvme"
```

Package nvme is an NVMe controller over PCI: the disk that Windows
(stornvme), Linux, the BSDs and UEFI (NvmExpressDxe) all drive with
their own inbox drivers. It's the standard profile's default disk for
Windows guests, and an option for everyone else.

Interrupts are MSI-X where the platform gives it an MSI path (on arm64,
the GIC's MSI frame): a message per completion, to its queue's vector.
Otherwise PCI INTx, level-triggered: the line is up while any completion
queue with interrupts enabled holds entries the guest hasn't consumed.

## Index

- [`struct Command`](#struct-Command)
  - [`let Opcode: uint8`](#Command.Opcode)
  - [`let Id: uint16`](#Command.Id)
  - [`let Namespace: uint32`](#Command.Namespace)
  - [`let Prp1: uint64`](#Command.Prp1)
  - [`let Prp2: uint64`](#Command.Prp2)
  - [`let Dword10: uint32`](#Command.Dword10)
  - [`let Dword11: uint32`](#Command.Dword11)
  - [`let Dword12: uint32`](#Command.Dword12)
  - [`let Dword13: uint32`](#Command.Dword13)
- [`final class CompletionQueue`](#class-CompletionQueue)
  - [`let Id: int`](#CompletionQueue.Id)
  - [`let Vector: uint16`](#CompletionQueue.Vector)
  - [`let Interrupts: bool`](#CompletionQueue.Interrupts)
  - [`var Head: uint16 = 0`](#CompletionQueue.Head)
- [`final class Controller: pci.Function`](#class-Controller)
  - [`init(memory: device.GuestMemory, msi: (any device.Msi)? = nil, serial: string = "VERTEX0001")`](#Controller.init)
  - [`let Config: pci.ConfigSpace`](#Controller.Config)
  - [`let MaxQueues = 16`](#Controller.MaxQueues)
  - [`let Serial: string`](#Controller.Serial)
  - [`private(set) var Namespaces: [Namespace] = []`](#Controller.Namespaces)
  - [`var Trace = false`](#Controller.Trace)
  - [`var Bars: [pci.Bar] { get }`](#Controller.Bars)
  - [`func Attach(_ image: any disk.Image) -> Namespace`](#Controller.Attach)
  - [`func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64`](#Controller.ReadBar)
  - [`func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)`](#Controller.WriteBar)
- [`final class Namespace`](#class-Namespace)
  - [`let Id: uint32`](#Namespace.Id)
  - [`let Image: any disk.Image`](#Namespace.Image)
  - [`let BlockSize: uint64 = 512`](#Namespace.BlockSize)
  - [`var Blocks: uint64 { get }`](#Namespace.Blocks)
- [`struct Segment`](#struct-Segment)
  - [`let Address: device.GuestAddress`](#Segment.Address)
  - [`let Count: uint64`](#Segment.Count)
- [`enum Status`](#enum-Status)
  - [`static let success: uint16 = 0x0`](#Status.success)
  - [`static let invalidOpcode: uint16 = 0x1`](#Status.invalidOpcode)
  - [`static let invalidField: uint16 = 0x2`](#Status.invalidField)
  - [`static let dataTransferError: uint16 = 0x4`](#Status.dataTransferError)
  - [`static let invalidNamespace: uint16 = 0xb`](#Status.invalidNamespace)
  - [`static let writeProtected: uint16 = 0x20`](#Status.writeProtected)
  - [`static let lbaOutOfRange: uint16 = 0x80`](#Status.lbaOutOfRange)
  - [`static let completionQueueInvalid: uint16 = 0x100`](#Status.completionQueueInvalid)
  - [`static let invalidQueueId: uint16 = 0x101`](#Status.invalidQueueId)
  - [`static let invalidQueueSize: uint16 = 0x102`](#Status.invalidQueueSize)
  - [`static let invalidLogPage: uint16 = 0x109`](#Status.invalidLogPage)
  - [`static let invalidQueueDeletion: uint16 = 0x10c`](#Status.invalidQueueDeletion)
- [`final class SubmissionQueue`](#class-SubmissionQueue)
  - [`let Id: int`](#SubmissionQueue.Id)
  - [`let CompletionQueue: int`](#SubmissionQueue.CompletionQueue)
  - [`var Head: uint16 = 0`](#SubmissionQueue.Head)
  - [`var Tail: uint16 = 0`](#SubmissionQueue.Tail)

## Types

### struct Command <a id="struct-Command"></a>

```vertex
public struct Command
```

A 64-byte submission queue entry, decoded.

#### Properties

<a id="Command.Opcode"></a>

```vertex
public let Opcode: uint8
```

<a id="Command.Id"></a>

```vertex
public let Id: uint16
```

<a id="Command.Namespace"></a>

```vertex
public let Namespace: uint32
```

<a id="Command.Prp1"></a>

```vertex
public let Prp1: uint64
```

<a id="Command.Prp2"></a>

```vertex
public let Prp2: uint64
```

<a id="Command.Dword10"></a>

```vertex
public let Dword10: uint32
```

<a id="Command.Dword11"></a>

```vertex
public let Dword11: uint32
```

<a id="Command.Dword12"></a>

```vertex
public let Dword12: uint32
```

<a id="Command.Dword13"></a>

```vertex
public let Dword13: uint32
```

### class CompletionQueue <a id="class-CompletionQueue"></a>

```vertex
public final class CompletionQueue
```

A completion queue in guest memory, with the phase bit that tells the
guest which entries are new.

#### Properties

<a id="CompletionQueue.Id"></a>

```vertex
public let Id: int
```

<a id="CompletionQueue.Vector"></a>

```vertex
public let Vector: uint16
```

<a id="CompletionQueue.Interrupts"></a>

```vertex
public let Interrupts: bool
```

Interrupts enabled (IEN): the queue raises the controller's INTx.

<a id="CompletionQueue.Head"></a>

```vertex
public var Head: uint16 = 0
```

The guest's head, from its doorbell.

### class Controller <a id="class-Controller"></a>

```vertex
public final class Controller: pci.Function
```

An NVMe controller: one PCI function, one admin queue pair, up to
`MaxQueues` I/O queue pairs, and a namespace per disk image.

#### Initializers

<a id="Controller.init"></a>

```vertex
public init(memory: device.GuestMemory, msi: (any device.Msi)? = nil, serial: string = "VERTEX0001")
```

`msi` delivers MSI-X writes; nil leaves the controller on INTx.

#### Properties

<a id="Controller.Config"></a>

```vertex
public let Config: pci.ConfigSpace
```

<a id="Controller.MaxQueues"></a>

```vertex
public let MaxQueues = 16
```

<a id="Controller.Serial"></a>

```vertex
public let Serial: string
```

<a id="Controller.Namespaces"></a>

```vertex
public private(set) var Namespaces: [Namespace] = []
```

<a id="Controller.Trace"></a>

```vertex
public var Trace = false
```

Prints register writes, doorbells, commands and INTx changes.

<a id="Controller.Bars"></a>

```vertex
public var Bars: [pci.Bar] { get }
```

#### Methods

<a id="Controller.Attach"></a>

```vertex
@discardableResult
public func Attach(_ image: any disk.Image) -> Namespace
```

Adds a namespace (NSID = its position + 1) backed by an image.

<a id="Controller.ReadBar"></a>

```vertex
public func ReadBar(_ bar: int, offset: uint64, size: uint8) -> uint64
```

<a id="Controller.WriteBar"></a>

```vertex
public func WriteBar(_ bar: int, offset: uint64, size: uint8, value: uint64)
```

### class Namespace <a id="class-Namespace"></a>

```vertex
public final class Namespace
```

One namespace: a disk image with 512-byte logical blocks.

#### Properties

<a id="Namespace.Id"></a>

```vertex
public let Id: uint32
```

<a id="Namespace.Image"></a>

```vertex
public let Image: any disk.Image
```

<a id="Namespace.BlockSize"></a>

```vertex
public let BlockSize: uint64 = 512
```

<a id="Namespace.Blocks"></a>

```vertex
public var Blocks: uint64 { get }
```

### struct Segment <a id="struct-Segment"></a>

```vertex
public struct Segment
```

One contiguous piece of a transfer in guest memory.

#### Properties

<a id="Segment.Address"></a>

```vertex
public let Address: device.GuestAddress
```

<a id="Segment.Count"></a>

```vertex
public let Count: uint64
```

### enum Status <a id="enum-Status"></a>

```vertex
public enum Status
```

Completion status: status code type << 8 | status code.

#### Properties

<a id="Status.success"></a>

```vertex
public static let success: uint16 = 0x0
```

<a id="Status.invalidOpcode"></a>

```vertex
public static let invalidOpcode: uint16 = 0x1
```

<a id="Status.invalidField"></a>

```vertex
public static let invalidField: uint16 = 0x2
```

<a id="Status.dataTransferError"></a>

```vertex
public static let dataTransferError: uint16 = 0x4
```

<a id="Status.invalidNamespace"></a>

```vertex
public static let invalidNamespace: uint16 = 0xb
```

<a id="Status.writeProtected"></a>

```vertex
public static let writeProtected: uint16 = 0x20
```

<a id="Status.lbaOutOfRange"></a>

```vertex
public static let lbaOutOfRange: uint16 = 0x80
```

<a id="Status.completionQueueInvalid"></a>

```vertex
public static let completionQueueInvalid: uint16 = 0x100
```

<a id="Status.invalidQueueId"></a>

```vertex
public static let invalidQueueId: uint16 = 0x101
```

<a id="Status.invalidQueueSize"></a>

```vertex
public static let invalidQueueSize: uint16 = 0x102
```

<a id="Status.invalidLogPage"></a>

```vertex
public static let invalidLogPage: uint16 = 0x109
```

<a id="Status.invalidQueueDeletion"></a>

```vertex
public static let invalidQueueDeletion: uint16 = 0x10c
```

### class SubmissionQueue <a id="class-SubmissionQueue"></a>

```vertex
public final class SubmissionQueue
```

A submission queue in guest memory. The guest moves Tail by doorbell;
the controller moves Head as it takes commands.

#### Properties

<a id="SubmissionQueue.Id"></a>

```vertex
public let Id: int
```

<a id="SubmissionQueue.CompletionQueue"></a>

```vertex
public let CompletionQueue: int
```

<a id="SubmissionQueue.Head"></a>

```vertex
public var Head: uint16 = 0
```

<a id="SubmissionQueue.Tail"></a>

```vertex
public var Tail: uint16 = 0
```

## Files

- controller.vs
- namespace.vs
- queue.vs
