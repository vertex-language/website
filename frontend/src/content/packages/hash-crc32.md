# package crc32

```vertex
import "hash/crc32"
```

## Index

- [Constants](#constants)
- [`func Checksum(_ data: [uint8], table: Table = Table.IEEETable) -> uint32`](#func-Checksum)
- [`func ChecksumCastagnoli(_ data: [uint8]) -> uint32`](#func-ChecksumCastagnoli)
- [`func ChecksumCastagnoliString(_ s: string) -> uint32`](#func-ChecksumCastagnoliString)
- [`func ChecksumIEEE(_ data: [uint8]) -> uint32`](#func-ChecksumIEEE)
- [`func ChecksumString(_ s: string, table: Table = Table.IEEETable) -> uint32`](#func-ChecksumString)
- [`func New(table: Table = Table.IEEETable) -> Digest`](#func-New)
- [`func NewCastagnoli() -> Digest`](#func-NewCastagnoli)
- [`func NewIEEE() -> Digest`](#func-NewIEEE)
- [`func Update(_ crc: uint32, _ table: Table, _ data: [uint8]) -> uint32`](#func-Update)
- [`struct Digest`](#struct-Digest)
  - [`init(table: Table = Table.IEEETable)`](#Digest.init)
  - [`var crc: uint32`](#Digest.crc)
  - [`var table: Table`](#Digest.table)
  - [`var Size: int { get }`](#Digest.Size)
  - [`var BlockSize: int { get }`](#Digest.BlockSize)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ data: [uint8])`](#Digest.Write)
  - [`mutating func WriteString(_ s: string)`](#Digest.WriteString)
  - [`func Sum32() -> uint32`](#Digest.Sum32)
  - [`func Sum(_ b: [uint8] = []) -> [uint8]`](#Digest.Sum)
- [`struct Table`](#struct-Table)
  - [`init(entries: [uint32])`](#Table.init)
  - [`var entries: [uint32]`](#Table.entries)
  - [`static let IEEETable: Table = Table.Make(IEEE)`](#Table.IEEETable)
  - [`static let CastagnoliTable: Table = Table.Make(Castagnoli)`](#Table.CastagnoliTable)
  - [`static let KoopmanTable: Table = Table.Make(Koopman)`](#Table.KoopmanTable)
  - [`static func Make(_ poly: uint32) -> Table`](#Table.Make)

## Constants

<a id="let-Castagnoli"></a>

```vertex
public let Castagnoli: uint32 = 0x82F63B78
```

Castagnoli polynomial (CRC-32C, RFC 3309 / RFC 4960, used by SCTP, iSCSI, ext4, Btrfs).

<a id="let-IEEE"></a>

```vertex
public let IEEE: uint32 = 0xEDB88320
```

IEEE 802.3 polynomial (Ethernet, gzip, PNG, STUN, etc.).

<a id="let-Koopman"></a>

```vertex
public let Koopman: uint32 = 0xEB31D82E
```

Koopman polynomial.

## Functions

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ data: [uint8], table: Table = Table.IEEETable) -> uint32
```

Checksum returns the CRC-32 checksum of data using the specified table.

### func ChecksumCastagnoli <a id="func-ChecksumCastagnoli"></a>

```vertex
public func ChecksumCastagnoli(_ data: [uint8]) -> uint32
```

ChecksumCastagnoli returns the CRC-32C checksum of data using the Castagnoli table.

### func ChecksumCastagnoliString <a id="func-ChecksumCastagnoliString"></a>

```vertex
public func ChecksumCastagnoliString(_ s: string) -> uint32
```

ChecksumCastagnoliString returns the CRC-32C checksum of a string using Castagnoli table.

### func ChecksumIEEE <a id="func-ChecksumIEEE"></a>

```vertex
public func ChecksumIEEE(_ data: [uint8]) -> uint32
```

ChecksumIEEE returns the CRC-32 checksum of data using the IEEE table.

### func ChecksumString <a id="func-ChecksumString"></a>

```vertex
public func ChecksumString(_ s: string, table: Table = Table.IEEETable) -> uint32
```

ChecksumString returns the CRC-32 checksum of a string using the specified table.

### func New <a id="func-New"></a>

```vertex
public func New(table: Table = Table.IEEETable) -> Digest
```

Creates a new Digest calculating CRC-32 using the provided table.

### func NewCastagnoli <a id="func-NewCastagnoli"></a>

```vertex
public func NewCastagnoli() -> Digest
```

Creates a new Digest calculating CRC-32C using the Castagnoli polynomial.

### func NewIEEE <a id="func-NewIEEE"></a>

```vertex
public func NewIEEE() -> Digest
```

Creates a new Digest calculating CRC-32 using the IEEE polynomial.

### func Update <a id="func-Update"></a>

```vertex
public func Update(_ crc: uint32, _ table: Table, _ data: [uint8]) -> uint32
```

Update updates the running crc with data using the given table.

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

Digest calculates a streaming CRC-32 checksum.

#### Initializers

<a id="Digest.init"></a>

```vertex
public init(table: Table = Table.IEEETable)
```

#### Properties

<a id="Digest.crc"></a>

```vertex
public var crc: uint32
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

<a id="Digest.Sum32"></a>

```vertex
public func Sum32() -> uint32
```

<a id="Digest.Sum"></a>

```vertex
public func Sum(_ b: [uint8] = []) -> [uint8]
```

### struct Table <a id="struct-Table"></a>

```vertex
public struct Table
```

Table is a 256-word CRC-32 lookup table.

#### Initializers

<a id="Table.init"></a>

```vertex
public init(entries: [uint32])
```

#### Properties

<a id="Table.entries"></a>

```vertex
public var entries: [uint32]
```

<a id="Table.IEEETable"></a>

```vertex
public static let IEEETable: Table = Table.Make(IEEE)
```

<a id="Table.CastagnoliTable"></a>

```vertex
public static let CastagnoliTable: Table = Table.Make(Castagnoli)
```

<a id="Table.KoopmanTable"></a>

```vertex
public static let KoopmanTable: Table = Table.Make(Koopman)
```

#### Methods

<a id="Table.Make"></a>

```vertex
public static func Make(_ poly: uint32) -> Table
```

Makes a 256-word table using the specified polynomial.

## Files

- crc32.vs
