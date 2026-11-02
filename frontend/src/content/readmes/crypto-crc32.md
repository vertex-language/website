# crypto/crc32

CRC-32 checksums with the IEEE and Castagnoli (CRC-32C) polynomials, as one-shot functions or updated incrementally.

```vertex
import "crypto/crc32"
```

## Functions

- `func Update(crc: uint32, data: [uint8]) -> uint32`: Update returns the result of adding the bytes in data to the crc using IEEE table.
- `func UpdateCastagnoli(crc: uint32, data: [uint8]) -> uint32`: UpdateCastagnoli returns the result of adding bytes using the Castagnoli table.
- `func Checksum(data: [uint8]) -> uint32`: Checksum returns the CRC-32 checksum of data using the IEEE polynomial.
- `func ChecksumIEEE(data: [uint8]) -> uint32`: ChecksumIEEE returns the CRC-32 checksum of data using the IEEE polynomial.
- `func ChecksumCastagnoli(data: [uint8]) -> uint32`: ChecksumCastagnoli returns the CRC-32C checksum of data using the Castagnoli polynomial (RFC 3309 / RFC 4960).
- `func ChecksumString(s: string) -> uint32`: ChecksumString returns the CRC-32 checksum of a string using IEEE polynomial.
- `func ChecksumCastagnoliString(s: string) -> uint32`: ChecksumCastagnoliString returns the CRC-32C checksum of a string using Castagnoli polynomial.

Part of the [`crypto`](https://github.com/vertex-language/crypto) repository.
