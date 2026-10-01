# package fdt

```vertex
import "encoding/fdt"
```

Package fdt provides serialization and deserialization of the Flattened
Device Tree (DTB) format (Devicetree Specification v0.4).

## Index

- [Constants](#constants)
- [`func Decode(_ bytes: [uint8]) throws -> Tree`](#func-Decode)
- [`enum FdtError: Error, CustomStringConvertible`](#enum-FdtError)
  - [`var description: string { get }`](#FdtError.description)
- [`final class Node`](#class-Node)
  - [`init(name: string)`](#Node.init)
  - [`var Name: string`](#Node.Name)
  - [`var Properties: [Property] = []`](#Node.Properties)
  - [`var Children: [Node] = []`](#Node.Children)
  - [`func AddProperty(_ name: string, _ value: [uint8])`](#Node.AddProperty)
  - [`func AddProperty(_ name: string, _ value: string)`](#Node.AddProperty-2)
  - [`func AddProperty(_ name: string, strings: [string])`](#Node.AddProperty-3)
  - [`func AddProperty(_ name: string, _ value: uint32)`](#Node.AddProperty-4)
  - [`func AddProperty(_ name: string, _ value: uint64)`](#Node.AddProperty-5)
  - [`func AddProperty(_ name: string, u32s: [uint32])`](#Node.AddProperty-6)
  - [`func AddProperty(_ name: string, u64s: [uint64])`](#Node.AddProperty-7)
  - [`func AddEmptyProperty(_ name: string)`](#Node.AddEmptyProperty)
  - [`func AddChild(_ child: Node) -> Node`](#Node.AddChild)
  - [`func AddChild(_ name: string) -> Node`](#Node.AddChild-2)
  - [`func Child(_ name: string) -> Node?`](#Node.Child)
  - [`func PropertyNamed(_ name: string) -> Property?`](#Node.PropertyNamed)
- [`struct Property`](#struct-Property)
  - [`init(name: string, value: [uint8] = [])`](#Property.init)
  - [`var Name: string`](#Property.Name)
  - [`var Value: [uint8]`](#Property.Value)
- [`struct ReserveEntry`](#struct-ReserveEntry)
  - [`init(address: uint64, size: uint64)`](#ReserveEntry.init)
  - [`var Address: uint64`](#ReserveEntry.Address)
  - [`var Size: uint64`](#ReserveEntry.Size)
- [`final class Tree`](#class-Tree)
  - [`init(rootName: string = "")`](#Tree.init)
  - [`init(root: Node)`](#Tree.init-2)
  - [`var Root: Node`](#Tree.Root)
  - [`var Reservations: [ReserveEntry] = []`](#Tree.Reservations)
  - [`var BootCpuPhys: uint32 = 0`](#Tree.BootCpuPhys)
  - [`func Encode() -> [uint8]`](#Tree.Encode)

## Constants

<a id="let-LastCompatibleVersion"></a>

```vertex
public let LastCompatibleVersion: uint32 = 16
```

<a id="let-Magic"></a>

```vertex
public let Magic: uint32 = 0xd00d_feed
```

<a id="let-Version"></a>

```vertex
public let Version: uint32 = 17
```

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ bytes: [uint8]) throws -> Tree
```

Decodes binary DTB bytes into a Tree.

## Types

### enum FdtError <a id="enum-FdtError"></a>

```vertex
public enum FdtError: Error, CustomStringConvertible
```

#### Cases

<a id="FdtError.badMagic"></a>

```vertex
case badMagic(uint32)
```

<a id="FdtError.unsupportedVersion"></a>

```vertex
case unsupportedVersion(uint32)
```

<a id="FdtError.truncated"></a>

```vertex
case truncated(string)
```

<a id="FdtError.malformed"></a>

```vertex
case malformed(string)
```

#### Properties

<a id="FdtError.description"></a>

```vertex
public var description: string { get }
```

### class Node <a id="class-Node"></a>

```vertex
public final class Node
```

#### Initializers

<a id="Node.init"></a>

```vertex
public init(name: string)
```

#### Properties

<a id="Node.Name"></a>

```vertex
public var Name: string
```

<a id="Node.Properties"></a>

```vertex
public var Properties: [Property] = []
```

<a id="Node.Children"></a>

```vertex
public var Children: [Node] = []
```

#### Methods

<a id="Node.AddProperty"></a>

```vertex
public func AddProperty(_ name: string, _ value: [uint8])
```

<a id="Node.AddProperty-2"></a>

```vertex
public func AddProperty(_ name: string, _ value: string)
```

<a id="Node.AddProperty-3"></a>

```vertex
public func AddProperty(_ name: string, strings: [string])
```

<a id="Node.AddProperty-4"></a>

```vertex
public func AddProperty(_ name: string, _ value: uint32)
```

<a id="Node.AddProperty-5"></a>

```vertex
public func AddProperty(_ name: string, _ value: uint64)
```

<a id="Node.AddProperty-6"></a>

```vertex
public func AddProperty(_ name: string, u32s: [uint32])
```

<a id="Node.AddProperty-7"></a>

```vertex
public func AddProperty(_ name: string, u64s: [uint64])
```

<a id="Node.AddEmptyProperty"></a>

```vertex
public func AddEmptyProperty(_ name: string)
```

<a id="Node.AddChild"></a>

```vertex
@discardableResult
public func AddChild(_ child: Node) -> Node
```

<a id="Node.AddChild-2"></a>

```vertex
@discardableResult
public func AddChild(_ name: string) -> Node
```

<a id="Node.Child"></a>

```vertex
public func Child(_ name: string) -> Node?
```

<a id="Node.PropertyNamed"></a>

```vertex
public func PropertyNamed(_ name: string) -> Property?
```

### struct Property <a id="struct-Property"></a>

```vertex
public struct Property
```

#### Initializers

<a id="Property.init"></a>

```vertex
public init(name: string, value: [uint8] = [])
```

#### Properties

<a id="Property.Name"></a>

```vertex
public var Name: string
```

<a id="Property.Value"></a>

```vertex
public var Value: [uint8]
```

### struct ReserveEntry <a id="struct-ReserveEntry"></a>

```vertex
public struct ReserveEntry
```

#### Initializers

<a id="ReserveEntry.init"></a>

```vertex
public init(address: uint64, size: uint64)
```

#### Properties

<a id="ReserveEntry.Address"></a>

```vertex
public var Address: uint64
```

<a id="ReserveEntry.Size"></a>

```vertex
public var Size: uint64
```

### class Tree <a id="class-Tree"></a>

```vertex
public final class Tree
```

#### Initializers

<a id="Tree.init"></a>

```vertex
public init(rootName: string = "")
```

<a id="Tree.init-2"></a>

```vertex
public init(root: Node)
```

#### Properties

<a id="Tree.Root"></a>

```vertex
public var Root: Node
```

<a id="Tree.Reservations"></a>

```vertex
public var Reservations: [ReserveEntry] = []
```

<a id="Tree.BootCpuPhys"></a>

```vertex
public var BootCpuPhys: uint32 = 0
```

#### Methods

<a id="Tree.Encode"></a>

```vertex
public func Encode() -> [uint8]
```

Encodes the device tree to binary flattened device tree (.dtb) bytes.

## Files

- fdt.vs
