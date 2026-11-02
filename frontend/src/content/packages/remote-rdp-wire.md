# package wire

```vertex
import "remote/rdp/wire"
```

Package wire has the ASN.1 PER (T.124/GCC) and BER (T.125/MCS) encoding
primitives the RDP connection sequence needs, over encoding/binary
cursors. These are the aligned-PER and BER subsets RDP uses, not general
codecs.

## Index

- [`func BERReadApplicationTag(r: inout binary.Reader, tag: uint8) throws -> int`](#func-BERReadApplicationTag)
- [`func BERReadEnumerated(r: inout binary.Reader) throws -> uint8`](#func-BERReadEnumerated)
- [`func BERReadInteger(r: inout binary.Reader) throws -> uint32`](#func-BERReadInteger)
- [`func BERReadLength(r: inout binary.Reader) throws -> int`](#func-BERReadLength)
- [`func BERReadOctetString(r: inout binary.Reader) throws -> [uint8]`](#func-BERReadOctetString)
- [`func BERWriteApplicationTag(w: inout binary.Writer, tag: uint8, length: int)`](#func-BERWriteApplicationTag)
- [`func BERWriteBool(w: inout binary.Writer, value: bool)`](#func-BERWriteBool)
- [`func BERWriteEnumerated(w: inout binary.Writer, value: uint8)`](#func-BERWriteEnumerated)
- [`func BERWriteInteger(w: inout binary.Writer, value: uint32)`](#func-BERWriteInteger)
- [`func BERWriteLength(w: inout binary.Writer, length: int)`](#func-BERWriteLength)
- [`func BERWriteOctetString(w: inout binary.Writer, s: [uint8])`](#func-BERWriteOctetString)
- [`func BERWriteOctetStringTag(w: inout binary.Writer, length: int)`](#func-BERWriteOctetStringTag)
- [`func PERReadEnum(r: inout binary.Reader) throws -> uint8`](#func-PERReadEnum)
- [`func PERReadLength(r: inout binary.Reader) throws -> int`](#func-PERReadLength)
- [`func PERReadU16(r: inout binary.Reader, min: uint16) throws -> uint16`](#func-PERReadU16)
- [`func PERWriteChoice(w: inout binary.Writer, choice: uint8)`](#func-PERWriteChoice)
- [`func PERWriteEnum(w: inout binary.Writer, e: uint8)`](#func-PERWriteEnum)
- [`func PERWriteLength(w: inout binary.Writer, length: int)`](#func-PERWriteLength)
- [`func PERWriteNumberOfSets(w: inout binary.Writer, n: uint8)`](#func-PERWriteNumberOfSets)
- [`func PERWriteNumericString(w: inout binary.Writer, s: [uint8], min: int)`](#func-PERWriteNumericString)
- [`func PERWriteObjectID(w: inout binary.Writer, oid: [uint8])`](#func-PERWriteObjectID)
- [`func PERWriteOctetString(w: inout binary.Writer, s: [uint8], min: int)`](#func-PERWriteOctetString)
- [`func PERWriteSelection(w: inout binary.Writer, sel: uint8)`](#func-PERWriteSelection)
- [`func PERWriteU16(w: inout binary.Writer, value: uint16, min: uint16)`](#func-PERWriteU16)
- [`enum WireError: Error`](#enum-WireError)
  - [`var Message: string { get }`](#WireError.Message)

## Functions

### func BERReadApplicationTag <a id="func-BERReadApplicationTag"></a>

```vertex
public func BERReadApplicationTag(r: inout binary.Reader, tag: uint8) throws -> int
```

### func BERReadEnumerated <a id="func-BERReadEnumerated"></a>

```vertex
public func BERReadEnumerated(r: inout binary.Reader) throws -> uint8
```

### func BERReadInteger <a id="func-BERReadInteger"></a>

```vertex
public func BERReadInteger(r: inout binary.Reader) throws -> uint32
```

### func BERReadLength <a id="func-BERReadLength"></a>

```vertex
public func BERReadLength(r: inout binary.Reader) throws -> int
```

### func BERReadOctetString <a id="func-BERReadOctetString"></a>

```vertex
public func BERReadOctetString(r: inout binary.Reader) throws -> [uint8]
```

### func BERWriteApplicationTag <a id="func-BERWriteApplicationTag"></a>

```vertex
public func BERWriteApplicationTag(w: inout binary.Writer, tag: uint8, length: int)
```

BERWriteApplicationTag writes an application-class constructed tag.

### func BERWriteBool <a id="func-BERWriteBool"></a>

```vertex
public func BERWriteBool(w: inout binary.Writer, value: bool)
```

### func BERWriteEnumerated <a id="func-BERWriteEnumerated"></a>

```vertex
public func BERWriteEnumerated(w: inout binary.Writer, value: uint8)
```

### func BERWriteInteger <a id="func-BERWriteInteger"></a>

```vertex
public func BERWriteInteger(w: inout binary.Writer, value: uint32)
```

### func BERWriteLength <a id="func-BERWriteLength"></a>

```vertex
public func BERWriteLength(w: inout binary.Writer, length: int)
```

BERWriteLength writes a BER definite length.

### func BERWriteOctetString <a id="func-BERWriteOctetString"></a>

```vertex
public func BERWriteOctetString(w: inout binary.Writer, s: [uint8])
```

### func BERWriteOctetStringTag <a id="func-BERWriteOctetStringTag"></a>

```vertex
public func BERWriteOctetStringTag(w: inout binary.Writer, length: int)
```

### func PERReadEnum <a id="func-PERReadEnum"></a>

```vertex
public func PERReadEnum(r: inout binary.Reader) throws -> uint8
```

PERReadEnum reads a 1-byte ENUMERATED.

### func PERReadLength <a id="func-PERReadLength"></a>

```vertex
public func PERReadLength(r: inout binary.Reader) throws -> int
```

PERReadLength reads a PER length determinant.

### func PERReadU16 <a id="func-PERReadU16"></a>

```vertex
public func PERReadU16(r: inout binary.Reader, min: uint16) throws -> uint16
```

PERReadU16 reads an integer stored as a u16 offset from `min`.

### func PERWriteChoice <a id="func-PERWriteChoice"></a>

```vertex
public func PERWriteChoice(w: inout binary.Writer, choice: uint8)
```

### func PERWriteEnum <a id="func-PERWriteEnum"></a>

```vertex
public func PERWriteEnum(w: inout binary.Writer, e: uint8)
```

### func PERWriteLength <a id="func-PERWriteLength"></a>

```vertex
public func PERWriteLength(w: inout binary.Writer, length: int)
```

PERWriteLength writes a PER length determinant (1 or 2 bytes).

### func PERWriteNumberOfSets <a id="func-PERWriteNumberOfSets"></a>

```vertex
public func PERWriteNumberOfSets(w: inout binary.Writer, n: uint8)
```

### func PERWriteNumericString <a id="func-PERWriteNumericString"></a>

```vertex
public func PERWriteNumericString(w: inout binary.Writer, s: [uint8], min: int)
```

PERWriteNumericString packs a numeric string (2 digits per byte).

### func PERWriteObjectID <a id="func-PERWriteObjectID"></a>

```vertex
public func PERWriteObjectID(w: inout binary.Writer, oid: [uint8])
```

PERWriteObjectID writes the GCC object identifier {0 0 20 124 0 1}.

### func PERWriteOctetString <a id="func-PERWriteOctetString"></a>

```vertex
public func PERWriteOctetString(w: inout binary.Writer, s: [uint8], min: int)
```

PERWriteOctetString writes an octet string with a length offset by min.

### func PERWriteSelection <a id="func-PERWriteSelection"></a>

```vertex
public func PERWriteSelection(w: inout binary.Writer, sel: uint8)
```

### func PERWriteU16 <a id="func-PERWriteU16"></a>

```vertex
public func PERWriteU16(w: inout binary.Writer, value: uint16, min: uint16)
```

PERWriteU16 writes an integer offset from `min` (INTEGER (min..65535)).

## Types

### enum WireError <a id="enum-WireError"></a>

```vertex
public enum WireError: Error
```

#### Cases

<a id="WireError.decode"></a>

```vertex
case decode(string)
```

#### Properties

<a id="WireError.Message"></a>

```vertex
public var Message: string { get }
```

## Files

- wire.vs
