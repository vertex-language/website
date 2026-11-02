# remote/rdp/wire

Has the ASN.1 PER (T.124/GCC) and BER (T.125/MCS) encoding primitives the RDP connection sequence needs, over encoding/binary cursors.

```vertex
import "remote/rdp/wire"
```

## Types

- **`WireError`** (enum)

## Functions

- `func PERWriteLength(w: inout binary.Writer, length: int)`: PERWriteLength writes a PER length determinant (1 or 2 bytes).
- `func PERReadLength(r: inout binary.Reader) throws -> int`: PERReadLength reads a PER length determinant.
- `func PERReadU16(r: inout binary.Reader, min: uint16) throws -> uint16`: PERReadU16 reads an integer stored as a u16 offset from `min`.
- `func PERReadEnum(r: inout binary.Reader) throws -> uint8`: PERReadEnum reads a 1-byte ENUMERATED.
- `func PERWriteChoice(w: inout binary.Writer, choice: uint8)`
- `func PERWriteSelection(w: inout binary.Writer, sel: uint8)`
- `func PERWriteNumberOfSets(w: inout binary.Writer, n: uint8)`
- `func PERWriteEnum(w: inout binary.Writer, e: uint8)`
- `func PERWriteU16(w: inout binary.Writer, value: uint16, min: uint16)`: PERWriteU16 writes an integer offset from `min` (INTEGER (min..65535)).
- `func PERWriteObjectID(w: inout binary.Writer, oid: [uint8])`: PERWriteObjectID writes the GCC object identifier {0 0 20 124 0 1}.
- and 14 more

Part of the [`remote`](https://github.com/vertex-language/remote) repository.
