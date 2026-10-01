# package ether

```vertex
import "net/ether"
```

## Index

- [`final class LoopbackPort: Port`](#class-LoopbackPort)
  - [`init()`](#LoopbackPort.init)
  - [`func Receive() async throws -> [uint8]`](#LoopbackPort.Receive)
  - [`func Send(_ frame: [uint8]) async throws`](#LoopbackPort.Send)
- [`struct Mac: Equatable, Hashable, CustomStringConvertible`](#struct-Mac)
  - [`init(_ bytes: [uint8] = [0x52, 0x54, 0x00, 0x12, 0x34, 0x56])`](#Mac.init)
  - [`var Bytes: [uint8]`](#Mac.Bytes)
  - [`var description: string { get }`](#Mac.description)
  - [`static func Random() -> Mac`](#Mac.Random)
- [`protocol Port: AnyObject`](#protocol-Port)
  - [`func Receive() async throws -> [uint8]`](#Port.Receive)
  - [`func Send(_ frame: [uint8]) async throws`](#Port.Send)

## Types

### class LoopbackPort <a id="class-LoopbackPort"></a>

```vertex
public final class LoopbackPort: Port
```

#### Initializers

<a id="LoopbackPort.init"></a>

```vertex
public init()
```

#### Methods

<a id="LoopbackPort.Receive"></a>

```vertex
public func Receive() async throws -> [uint8]
```

<a id="LoopbackPort.Send"></a>

```vertex
public func Send(_ frame: [uint8]) async throws
```

### struct Mac <a id="struct-Mac"></a>

```vertex
public struct Mac: Equatable, Hashable, CustomStringConvertible
```

#### Initializers

<a id="Mac.init"></a>

```vertex
public init(_ bytes: [uint8] = [0x52, 0x54, 0x00, 0x12, 0x34, 0x56])
```

#### Properties

<a id="Mac.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

<a id="Mac.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="Mac.Random"></a>

```vertex
public static func Random() -> Mac
```

### protocol Port <a id="protocol-Port"></a>

```vertex
public protocol Port: AnyObject
```

#### Methods

<a id="Port.Receive"></a>

```vertex
func Receive() async throws -> [uint8]
```

<a id="Port.Send"></a>

```vertex
func Send(_ frame: [uint8]) async throws
```

## Files

- ether.vs
