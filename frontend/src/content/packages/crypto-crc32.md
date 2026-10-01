# package crc32

```vertex
import "crypto/crc32"
```

## Index

- [Constants](#constants)
- [`func Checksum(_ data: [uint8]) -> uint32`](#func-Checksum)
- [`func ChecksumCastagnoli(_ data: [uint8]) -> uint32`](#func-ChecksumCastagnoli)
- [`func ChecksumCastagnoliString(_ s: string) -> uint32`](#func-ChecksumCastagnoliString)
- [`func ChecksumIEEE(_ data: [uint8]) -> uint32`](#func-ChecksumIEEE)
- [`func ChecksumString(_ s: string) -> uint32`](#func-ChecksumString)
- [`func Update(_ crc: uint32, _ data: [uint8]) -> uint32`](#func-Update)
- [`func UpdateCastagnoli(_ crc: uint32, _ data: [uint8]) -> uint32`](#func-UpdateCastagnoli)

## Constants

<a id="let-Castagnoli"></a>

```vertex
public let Castagnoli: uint32 = 0x82F63B78
```

Castagnoli is used in SCTP (RFC 3309 / RFC 4960), iSCSI, Btrfs, ext4.

<a id="let-IEEE"></a>

```vertex
public let IEEE: uint32 = 0xEDB88320
```

IEEE is by far and away the most common CRC-32 polynomial.
Used by ethernet (IEEE 802.3), vzip, gzip, PNG, STUN (RFC 8489), etc.

## Functions

### func Checksum <a id="func-Checksum"></a>

```vertex
public func Checksum(_ data: [uint8]) -> uint32
```

Checksum returns the CRC-32 checksum of data using the IEEE polynomial.

### func ChecksumCastagnoli <a id="func-ChecksumCastagnoli"></a>

```vertex
public func ChecksumCastagnoli(_ data: [uint8]) -> uint32
```

ChecksumCastagnoli returns the CRC-32C checksum of data using the Castagnoli polynomial (RFC 3309 / RFC 4960).

### func ChecksumCastagnoliString <a id="func-ChecksumCastagnoliString"></a>

```vertex
public func ChecksumCastagnoliString(_ s: string) -> uint32
```

ChecksumCastagnoliString returns the CRC-32C checksum of a string using Castagnoli polynomial.

### func ChecksumIEEE <a id="func-ChecksumIEEE"></a>

```vertex
public func ChecksumIEEE(_ data: [uint8]) -> uint32
```

ChecksumIEEE returns the CRC-32 checksum of data using the IEEE polynomial.

### func ChecksumString <a id="func-ChecksumString"></a>

```vertex
public func ChecksumString(_ s: string) -> uint32
```

ChecksumString returns the CRC-32 checksum of a string using IEEE polynomial.

### func Update <a id="func-Update"></a>

```vertex
public func Update(_ crc: uint32, _ data: [uint8]) -> uint32
```

Update returns the result of adding the bytes in data to the crc using IEEE table.

### func UpdateCastagnoli <a id="func-UpdateCastagnoli"></a>

```vertex
public func UpdateCastagnoli(_ crc: uint32, _ data: [uint8]) -> uint32
```

UpdateCastagnoli returns the result of adding bytes using the Castagnoli table.

## Files

- crc32.vs
