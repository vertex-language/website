# package crc64

```vertex
import "hash/crc64"
```

## Index

- [Constants](#constants)
- [`func Checksum(_ data: [uint8], table: Table = Table.ISOTable) -> uint64`](#func-Checksum)
- [`func ChecksumECMA(_ data: [uint8]) -> uint64`](#func-ChecksumECMA)
- [`func ChecksumISO(_ data: [uint8]) -> uint64`](#func-ChecksumISO)
- [`func ChecksumString(_ s: string, table: Table = Table.ISOTable) -> uint64`](#func-ChecksumString)
- [`func New(table: Table = Table.ISOTable) -> Digest`](#func-New)
- [`func NewECMA() -> Digest`](#func-NewECMA)
- [`func NewISO() -> Digest`](#func-NewISO)
- [`func Update(_ crc: uint64, _ table: Table, _ data: [uint8]) -> uint64`](#func-Update)
- [`struct Digest`](#struct-Digest)
  - [`init(table: Table = Table.ISOTable)`](#Digest.init)
  - [`var crc: uint64`](#Digest.crc)
  - [`var table: Table`](#Digest.table)
  - [`var Size: int { get }`](#Digest.Size)
  - [`var BlockSize: int { get }`](#Digest.BlockSize)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Sum64() -> uint64`](#Digest.Sum64)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest.Sum)
- [`struct Table`](#struct-Table)
  - [`init(entries: [uint64])`](#Table.init)
  - [`var entries: [uint64]`](#Table.entries)
  - [`static let ISOTable: Table = Table.Make(ISO)`](#Table.ISOTable)
  - [`static let ECMATable: Table = Table.Make(ECMA)`](#Table.ECMATable)
  - [`static func Make(_ poly: uint64) -> Table`](#Table.Make)

## Constants

<a id="let-ECMA"></a>

```vertex
public let ECMA: uint64 = 0xC96C5795D7870F42
```

ECMA-182 polynomial.

<a id="let-ISO"></a>

```vertex
public let ISO: uint64 = 0xD800000000000000
```

ISO 3309 polynomial.

## Functions

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ data: [uint8], table: Table = Table.ISOTable) -> uint64
```

Checksum returns the CRC-64 checksum of data using the specified table.

### func ChecksumECMA <a id="func-ChecksumECMA"></a>

```vertex
public func ChecksumECMA(_ data: [uint8]) -> uint64
```

ChecksumECMA returns the CRC-64 checksum of data using the ECMA table.

### func ChecksumISO <a id="func-ChecksumISO"></a>

```vertex
public func ChecksumISO(_ data: [uint8]) -> uint64
```

ChecksumISO returns the CRC-64 checksum of data using the ISO table.

### func ChecksumString <a id="func-ChecksumString"></a>

```vertex
public func ChecksumString(_ s: string, table: Table = Table.ISOTable) -> uint64
```

ChecksumString returns the CRC-64 checksum of a string using the specified table.

### func New <a id="func-New"></a>

```vertex
public func New(table: Table = Table.ISOTable) -> Digest
```

Creates a new Digest calculating CRC-64 using the provided table.

### func NewECMA <a id="func-NewECMA"></a>

```vertex
public func NewECMA() -> Digest
```

Creates a new Digest calculating CRC-64 using the ECMA polynomial.

### func NewISO <a id="func-NewISO"></a>

```vertex
public func NewISO() -> Digest
```

Creates a new Digest calculating CRC-64 using the ISO polynomial.

### func Update <a id="func-Update"></a>

```vertex
public func Update(_ crc: uint64, _ table: Table, _ data: [uint8]) -> uint64
```

Update updates the running crc with data using the given table.

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

Digest calculates a streaming CRC-64 checksum.

#### Initializers

<a id="Digest.init"></a>

```vertex
public init(table: Table = Table.ISOTable)
```

#### Properties

<a id="Digest.crc"></a>

```vertex
public var crc: uint64
```

<a id="Digest.table"></a>

```vertex
public var table: Table
```

<a id="Digest.Size"></a>

```vertex
public var Size: int { get }
```

<a id="Digest.BlockSize"></a>

```vertex
public var BlockSize: int { get }
```

#### Methods

<a id="Digest.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest.Write"></a>

```vertex
public mutating func Write(_ data: [uint8])
```

<a id="Digest.WriteString"></a>

```vertex
public mutating func WriteString(_ s: string)
```

<a id="Digest.Sum64"></a>

```vertex
public func Sum64() -> uint64
```

<a id="Digest.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

### struct Table <a id="struct-Table"></a>

```vertex
public struct Table
```

Table is a 256-word CRC-64 lookup table.

#### Initializers

<a id="Table.init"></a>

```vertex
public init(entries: [uint64])
```

#### Properties

<a id="Table.entries"></a>

```vertex
public var entries: [uint64]
```

<a id="Table.ISOTable"></a>

```vertex
public static let ISOTable: Table = Table.Make(ISO)
```

<a id="Table.ECMATable"></a>

```vertex
public static let ECMATable: Table = Table.Make(ECMA)
```

#### Methods

<a id="Table.Make"></a>

```vertex
public static func Make(_ poly: uint64) -> Table
```

Makes a 256-word table using the specified polynomial.

## Files

- crc64.vs
