# package wire

```vertex
import "remote/rdp/wire"
```

Package wire has the ASN.1 PER (T.124/GCC) and BER (T.125/MCS) encoding
primitives the RDP connection sequence needs, over encoding/binary
cursors. These are the aligned-PER and BER subsets RDP uses, not general
codecs.

## Index

- [`func BERReadApplicationTag(_ r: inout binary.Reader, _ tag: uint8) throws -> int`](#func-BERReadApplicationTag)
- [`func BERReadEnumerated(_ r: inout binary.Reader) throws -> uint8`](#func-BERReadEnumerated)
- [`func BERReadInteger(_ r: inout binary.Reader) throws -> uint32`](#func-BERReadInteger)
- [`func BERReadLength(_ r: inout binary.Reader) throws -> int`](#func-BERReadLength)
- [`func BERReadOctetString(_ r: inout binary.Reader) throws -> [uint8]`](#func-BERReadOctetString)
- [`func BERWriteApplicationTag(_ w: inout binary.Writer, _ tag: uint8, _ length: int)`](#func-BERWriteApplicationTag)
- [`func BERWriteBool(_ w: inout binary.Writer, _ value: bool)`](#func-BERWriteBool)
- [`func BERWriteEnumerated(_ w: inout binary.Writer, _ value: uint8)`](#func-BERWriteEnumerated)
- [`func BERWriteInteger(_ w: inout binary.Writer, _ value: uint32)`](#func-BERWriteInteger)
- [`func BERWriteLength(_ w: inout binary.Writer, _ length: int)`](#func-BERWriteLength)
- [`func BERWriteOctetString(_ w: inout binary.Writer, _ s: [uint8])`](#func-BERWriteOctetString)
- [`func BERWriteOctetStringTag(_ w: inout binary.Writer, _ length: int)`](#func-BERWriteOctetStringTag)
- [`func PERReadEnum(_ r: inout binary.Reader) throws -> uint8`](#func-PERReadEnum)
- [`func PERReadLength(_ r: inout binary.Reader) throws -> int`](#func-PERReadLength)
- [`func PERReadU16(_ r: inout binary.Reader, min: uint16) throws -> uint16`](#func-PERReadU16)
- [`func PERWriteChoice(_ w: inout binary.Writer, _ choice: uint8)`](#func-PERWriteChoice)
- [`func PERWriteEnum(_ w: inout binary.Writer, _ e: uint8)`](#func-PERWriteEnum)
- [`func PERWriteLength(_ w: inout binary.Writer, _ length: int)`](#func-PERWriteLength)
- [`func PERWriteNumberOfSets(_ w: inout binary.Writer, _ n: uint8)`](#func-PERWriteNumberOfSets)
- [`func PERWriteNumericString(_ w: inout binary.Writer, _ s: [uint8], min: int)`](#func-PERWriteNumericString)
- [`func PERWriteObjectID(_ w: inout binary.Writer, _ oid: [uint8])`](#func-PERWriteObjectID)
- [`func PERWriteOctetString(_ w: inout binary.Writer, _ s: [uint8], min: int)`](#func-PERWriteOctetString)
- [`func PERWriteSelection(_ w: inout binary.Writer, _ sel: uint8)`](#func-PERWriteSelection)
- [`func PERWriteU16(_ w: inout binary.Writer, _ value: uint16, min: uint16)`](#func-PERWriteU16)
- [`enum WireError: Error`](#enum-WireError)
  - [`var Message: string { get }`](#WireError.Message)

## Functions

### func BERReadApplicationTag <a id="func-BERReadApplicationTag"></a>

```vertex
public func BERReadApplicationTag(_ r: inout binary.Reader, _ tag: uint8) throws -> int
```

### func BERReadEnumerated <a id="func-BERReadEnumerated"></a>

```vertex
public func BERReadEnumerated(_ r: inout binary.Reader) throws -> uint8
```

### func BERReadInteger <a id="func-BERReadInteger"></a>

```vertex
public func BERReadInteger(_ r: inout binary.Reader) throws -> uint32
```

### func BERReadLength <a id="func-BERReadLength"></a>

```vertex
public func BERReadLength(_ r: inout binary.Reader) throws -> int
```

### func BERReadOctetString <a id="func-BERReadOctetString"></a>

```vertex
public func BERReadOctetString(_ r: inout binary.Reader) throws -> [uint8]
```

### func BERWriteApplicationTag <a id="func-BERWriteApplicationTag"></a>

```vertex
public func BERWriteApplicationTag(_ w: inout binary.Writer, _ tag: uint8, _ length: int)
```

BERWriteApplicationTag writes an application-class constructed tag.

### func BERWriteBool <a id="func-BERWriteBool"></a>

```vertex
public func BERWriteBool(_ w: inout binary.Writer, _ value: bool)
```

### func BERWriteEnumerated <a id="func-BERWriteEnumerated"></a>

```vertex
public func BERWriteEnumerated(_ w: inout binary.Writer, _ value: uint8)
```

### func BERWriteInteger <a id="func-BERWriteInteger"></a>

```vertex
public func BERWriteInteger(_ w: inout binary.Writer, _ value: uint32)
```

### func BERWriteLength <a id="func-BERWriteLength"></a>

```vertex
public func BERWriteLength(_ w: inout binary.Writer, _ length: int)
```

BERWriteLength writes a BER definite length.

### func BERWriteOctetString <a id="func-BERWriteOctetString"></a>

```vertex
public func BERWriteOctetString(_ w: inout binary.Writer, _ s: [uint8])
```

### func BERWriteOctetStringTag <a id="func-BERWriteOctetStringTag"></a>

```vertex
public func BERWriteOctetStringTag(_ w: inout binary.Writer, _ length: int)
```

### func PERReadEnum <a id="func-PERReadEnum"></a>

```vertex
public func PERReadEnum(_ r: inout binary.Reader) throws -> uint8
```

PERReadEnum reads a 1-byte ENUMERATED.

### func PERReadLength <a id="func-PERReadLength"></a>

```vertex
public func PERReadLength(_ r: inout binary.Reader) throws -> int
```

PERReadLength reads a PER length determinant.

### func PERReadU16 <a id="func-PERReadU16"></a>

```vertex
public func PERReadU16(_ r: inout binary.Reader, min: uint16) throws -> uint16
```

PERReadU16 reads an integer stored as a u16 offset from `min`.

### func PERWriteChoice <a id="func-PERWriteChoice"></a>

```vertex
public func PERWriteChoice(_ w: inout binary.Writer, _ choice: uint8)
```

### func PERWriteEnum <a id="func-PERWriteEnum"></a>

```vertex
public func PERWriteEnum(_ w: inout binary.Writer, _ e: uint8)
```

### func PERWriteLength <a id="func-PERWriteLength"></a>

```vertex
public func PERWriteLength(_ w: inout binary.Writer, _ length: int)
```

PERWriteLength writes a PER length determinant (1 or 2 bytes).

### func PERWriteNumberOfSets <a id="func-PERWriteNumberOfSets"></a>

```vertex
public func PERWriteNumberOfSets(_ w: inout binary.Writer, _ n: uint8)
```

### func PERWriteNumericString <a id="func-PERWriteNumericString"></a>

```vertex
public func PERWriteNumericString(_ w: inout binary.Writer, _ s: [uint8], min: int)
```

PERWriteNumericString packs a numeric string (2 digits per byte).

### func PERWriteObjectID <a id="func-PERWriteObjectID"></a>

```vertex
public func PERWriteObjectID(_ w: inout binary.Writer, _ oid: [uint8])
```

PERWriteObjectID writes the GCC object identifier {0 0 20 124 0 1}.

### func PERWriteOctetString <a id="func-PERWriteOctetString"></a>

```vertex
public func PERWriteOctetString(_ w: inout binary.Writer, _ s: [uint8], min: int)
```

PERWriteOctetString writes an octet string with a length offset by min.

### func PERWriteSelection <a id="func-PERWriteSelection"></a>

```vertex
public func PERWriteSelection(_ w: inout binary.Writer, _ sel: uint8)
```

### func PERWriteU16 <a id="func-PERWriteU16"></a>

```vertex
public func PERWriteU16(_ w: inout binary.Writer, _ value: uint16, min: uint16)
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
