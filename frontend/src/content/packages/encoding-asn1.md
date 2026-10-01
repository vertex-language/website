# package asn1

```vertex
import "encoding/asn1"
```

Package asn1 reads and writes ASN.1 values in the Distinguished and
Basic Encoding Rules (DER/BER), at the token level: one tag, its length,
and its contents at a time. It is not a reflection-based marshaller --
callers walk the structure themselves -- which is all X.509 certificates,
SPNEGO tokens, CredSSP TSRequests, and T.125 MCS PDUs need.

DER is a restriction of BER: definite lengths, minimal encodings. This
package writes DER and reads both (it accepts the long-form definite
lengths BER allows). Indefinite lengths are rejected; nothing RDP uses
needs them.

## Index

- [Constants](#constants)
- [`func OIDEqual(_ a: [uint64], _ b: [uint64]) -> bool`](#func-OIDEqual)
- [`enum Asn1Error: Error`](#enum-Asn1Error)
  - [`var Message: string { get }`](#Asn1Error.Message)
- [`struct Class`](#struct-Class)
  - [`static let Universal: uint8 = 0x00`](#Class.Universal)
  - [`static let Application: uint8 = 0x40`](#Class.Application)
  - [`static let ContextSpecific: uint8 = 0x80`](#Class.ContextSpecific)
  - [`static let Private: uint8 = 0xC0`](#Class.Private)
- [`struct Reader`](#struct-Reader)
  - [`init(_ data: [uint8])`](#Reader.init)
  - [`var Remaining: int { get }`](#Reader.Remaining)
  - [`var AtEnd: bool { get }`](#Reader.AtEnd)
  - [`mutating func RawContents() -> [uint8]`](#Reader.RawContents)
  - [`func PeekTag() throws -> uint8`](#Reader.PeekTag)
  - [`mutating func Expect(_ tag: uint8) throws -> Reader`](#Reader.Expect)
  - [`mutating func Sequence() throws -> Reader`](#Reader.Sequence)
  - [`mutating func Set() throws -> Reader`](#Reader.Set)
  - [`mutating func TaggedContext(_ n: uint8) throws -> Reader`](#Reader.TaggedContext)
  - [`mutating func OptionalContext(_ n: uint8) throws -> Reader?`](#Reader.OptionalContext)
  - [`mutating func Integer() throws -> int64`](#Reader.Integer)
  - [`mutating func BigInteger() throws -> [uint8]`](#Reader.BigInteger)
  - [`mutating func Boolean() throws -> bool`](#Reader.Boolean)
  - [`mutating func Enumerated() throws -> int64`](#Reader.Enumerated)
  - [`mutating func OctetString() throws -> [uint8]`](#Reader.OctetString)
  - [`mutating func BitString() throws -> [uint8]`](#Reader.BitString)
  - [`mutating func ObjectIdentifier() throws -> [uint64]`](#Reader.ObjectIdentifier)
  - [`mutating func Skip() throws`](#Reader.Skip)
  - [`mutating func Raw() throws -> [uint8]`](#Reader.Raw)
- [`struct Tag`](#struct-Tag)
  - [`static let Boolean: uint8 = 0x01`](#Tag.Boolean)
  - [`static let Integer: uint8 = 0x02`](#Tag.Integer)
  - [`static let BitString: uint8 = 0x03`](#Tag.BitString)
  - [`static let OctetString: uint8 = 0x04`](#Tag.OctetString)
  - [`static let Null: uint8 = 0x05`](#Tag.Null)
  - [`static let ObjectIdentifier: uint8 = 0x06`](#Tag.ObjectIdentifier)
  - [`static let Enumerated: uint8 = 0x0A`](#Tag.Enumerated)
  - [`static let UTF8String: uint8 = 0x0C`](#Tag.UTF8String)
  - [`static let Sequence: uint8 = 0x10`](#Tag.Sequence)
  - [`static let Set: uint8 = 0x11`](#Tag.Set)
  - [`static let PrintableString: uint8 = 0x13`](#Tag.PrintableString)
  - [`static let IA5String: uint8 = 0x16`](#Tag.IA5String)
  - [`static let UTCTime: uint8 = 0x17`](#Tag.UTCTime)
  - [`static let GeneralizedTime: uint8 = 0x18`](#Tag.GeneralizedTime)
- [`struct Writer`](#struct-Writer)
  - [`init()`](#Writer.init)
  - [`var Bytes: [uint8] = []`](#Writer.Bytes)
  - [`var Count: int { get }`](#Writer.Count)
  - [`mutating func TLV(_ tag: uint8, _ contents: [uint8])`](#Writer.TLV)
  - [`mutating func Sequence(_ contents: [uint8])`](#Writer.Sequence)
  - [`mutating func Set(_ contents: [uint8])`](#Writer.Set)
  - [`mutating func ExplicitContext(_ n: uint8, _ contents: [uint8])`](#Writer.ExplicitContext)
  - [`mutating func OctetString(_ v: [uint8])`](#Writer.OctetString)
  - [`mutating func BitString(_ v: [uint8])`](#Writer.BitString)
  - [`mutating func Boolean(_ v: bool)`](#Writer.Boolean)
  - [`mutating func Null()`](#Writer.Null)
  - [`mutating func Integer(_ v: int64)`](#Writer.Integer)
  - [`mutating func BigIntegerUnsigned(_ magnitude: [uint8])`](#Writer.BigIntegerUnsigned)
  - [`mutating func ObjectIdentifier(_ arcs: [uint64])`](#Writer.ObjectIdentifier)
  - [`mutating func Raw(_ der: [uint8])`](#Writer.Raw)

## Constants

<a id="let-Constructed"></a>

```vertex
public let Constructed: uint8 = 0x20
```

The constructed bit (0x20) in an identifier octet.

## Functions

### func OIDEqual <a id="func-OIDEqual"></a>

```vertex
public func OIDEqual(_ a: [uint64], _ b: [uint64]) -> bool
```

OIDEqual compares two arc lists.

## Types

### enum Asn1Error <a id="enum-Asn1Error"></a>

```vertex
public enum Asn1Error: Error
```

#### Cases

<a id="Asn1Error.truncated"></a>

```vertex
case truncated(string)
```

<a id="Asn1Error.invalid"></a>

```vertex
case invalid(string)
```

<a id="Asn1Error.unexpectedTag"></a>

```vertex
case unexpectedTag(want: uint8, got: uint8)
```

<a id="Asn1Error.indefiniteLength"></a>

```vertex
case indefiniteLength
```

#### Properties

<a id="Asn1Error.Message"></a>

```vertex
public var Message: string { get }
```

### struct Class <a id="struct-Class"></a>

```vertex
public struct Class
```

Tag classes (the top two bits of an identifier octet).

#### Properties

<a id="Class.Universal"></a>

```vertex
public static let Universal: uint8 = 0x00
```

<a id="Class.Application"></a>

```vertex
public static let Application: uint8 = 0x40
```

<a id="Class.ContextSpecific"></a>

```vertex
public static let ContextSpecific: uint8 = 0x80
```

<a id="Class.Private"></a>

```vertex
public static let Private: uint8 = 0xC0
```

### struct Reader <a id="struct-Reader"></a>

```vertex
public struct Reader
```

Reader walks a DER/BER buffer. Each accessor consumes exactly one
TLV (tag-length-value). Nested structures are read through a sub-reader
bounded to the parent's contents, so a member can never overrun its
SEQUENCE.

#### Initializers

<a id="Reader.init"></a>

```vertex
public init(_ data: [uint8])
```

#### Properties

<a id="Reader.Remaining"></a>

```vertex
public var Remaining: int { get }
```

<a id="Reader.AtEnd"></a>

```vertex
public var AtEnd: bool { get }
```

#### Methods

<a id="Reader.RawContents"></a>

```vertex
public mutating func RawContents() -> [uint8]
```

RawContents returns the unread bytes of this reader (e.g. the whole
contents of a value obtained via Expect), consuming them.

<a id="Reader.PeekTag"></a>

```vertex
public func PeekTag() throws -> uint8
```

PeekTag returns the next identifier octet without consuming it.

<a id="Reader.Expect"></a>

```vertex
public mutating func Expect(_ tag: uint8) throws -> Reader
```

Expect consumes a TLV whose identifier equals tag and returns a
Reader over its contents.

<a id="Reader.Sequence"></a>

```vertex
public mutating func Sequence() throws -> Reader
```

Sequence consumes a SEQUENCE (0x30) and returns a Reader over its
members.

<a id="Reader.Set"></a>

```vertex
public mutating func Set() throws -> Reader
```

<a id="Reader.TaggedContext"></a>

```vertex
public mutating func TaggedContext(_ n: uint8) throws -> Reader
```

TaggedContext consumes an explicit context-specific member [n] and
returns a Reader over its (constructed) contents.

<a id="Reader.OptionalContext"></a>

```vertex
public mutating func OptionalContext(_ n: uint8) throws -> Reader?
```

OptionalContext returns a Reader over member [n] if it is next, else
nil, consuming nothing when absent.

<a id="Reader.Integer"></a>

```vertex
public mutating func Integer() throws -> int64
```

Integer reads an INTEGER as a signed 64-bit value.

<a id="Reader.BigInteger"></a>

```vertex
public mutating func BigInteger() throws -> [uint8]
```

BigInteger reads an INTEGER as its raw magnitude bytes, dropping a
single leading zero that only marks the value as positive. RSA
moduli and exponents come out this way.

<a id="Reader.Boolean"></a>

```vertex
public mutating func Boolean() throws -> bool
```

<a id="Reader.Enumerated"></a>

```vertex
public mutating func Enumerated() throws -> int64
```

<a id="Reader.OctetString"></a>

```vertex
public mutating func OctetString() throws -> [uint8]
```

<a id="Reader.BitString"></a>

```vertex
public mutating func BitString() throws -> [uint8]
```

BitString reads a BIT STRING and returns its bytes, requiring the
"unused bits" prefix to be zero (true for keys and signatures).

<a id="Reader.ObjectIdentifier"></a>

```vertex
public mutating func ObjectIdentifier() throws -> [uint64]
```

ObjectIdentifier reads an OID as its arc numbers.

<a id="Reader.Skip"></a>

```vertex
public mutating func Skip() throws
```

Skip consumes and discards the next TLV.

<a id="Reader.Raw"></a>

```vertex
public mutating func Raw() throws -> [uint8]
```

Raw returns the complete next TLV, identifier and length included.

### struct Tag <a id="struct-Tag"></a>

```vertex
public struct Tag
```

Universal tag numbers used by the protocols we target.

#### Properties

<a id="Tag.Boolean"></a>

```vertex
public static let Boolean: uint8 = 0x01
```

<a id="Tag.Integer"></a>

```vertex
public static let Integer: uint8 = 0x02
```

<a id="Tag.BitString"></a>

```vertex
public static let BitString: uint8 = 0x03
```

<a id="Tag.OctetString"></a>

```vertex
public static let OctetString: uint8 = 0x04
```

<a id="Tag.Null"></a>

```vertex
public static let Null: uint8 = 0x05
```

<a id="Tag.ObjectIdentifier"></a>

```vertex
public static let ObjectIdentifier: uint8 = 0x06
```

<a id="Tag.Enumerated"></a>

```vertex
public static let Enumerated: uint8 = 0x0A
```

<a id="Tag.UTF8String"></a>

```vertex
public static let UTF8String: uint8 = 0x0C
```

<a id="Tag.Sequence"></a>

```vertex
public static let Sequence: uint8 = 0x10
```

<a id="Tag.Set"></a>

```vertex
public static let Set: uint8 = 0x11
```

encoded constructed: 0x30

<a id="Tag.PrintableString"></a>

```vertex
public static let PrintableString: uint8 = 0x13
```

encoded constructed: 0x31

<a id="Tag.IA5String"></a>

```vertex
public static let IA5String: uint8 = 0x16
```

<a id="Tag.UTCTime"></a>

```vertex
public static let UTCTime: uint8 = 0x17
```

<a id="Tag.GeneralizedTime"></a>

```vertex
public static let GeneralizedTime: uint8 = 0x18
```

### struct Writer <a id="struct-Writer"></a>

```vertex
public struct Writer
```

Writer builds DER. Constructed values are written by encoding the
contents first (into a child Writer or a byte array) and then wrapping
them, since a definite length must precede its contents.

#### Initializers

<a id="Writer.init"></a>

```vertex
public init()
```

#### Properties

<a id="Writer.Bytes"></a>

```vertex
public var Bytes: [uint8] = []
```

<a id="Writer.Count"></a>

```vertex
public var Count: int { get }
```

#### Methods

<a id="Writer.TLV"></a>

```vertex
public mutating func TLV(_ tag: uint8, _ contents: [uint8])
```

TLV appends one tag-length-value with the given contents.

<a id="Writer.Sequence"></a>

```vertex
public mutating func Sequence(_ contents: [uint8])
```

<a id="Writer.Set"></a>

```vertex
public mutating func Set(_ contents: [uint8])
```

<a id="Writer.ExplicitContext"></a>

```vertex
public mutating func ExplicitContext(_ n: uint8, _ contents: [uint8])
```

ExplicitContext wraps contents in an explicit [n] tag.

<a id="Writer.OctetString"></a>

```vertex
public mutating func OctetString(_ v: [uint8])
```

<a id="Writer.BitString"></a>

```vertex
public mutating func BitString(_ v: [uint8])
```

<a id="Writer.Boolean"></a>

```vertex
public mutating func Boolean(_ v: bool)
```

<a id="Writer.Null"></a>

```vertex
public mutating func Null()
```

<a id="Writer.Integer"></a>

```vertex
public mutating func Integer(_ v: int64)
```

Integer encodes a non-negative or negative 64-bit INTEGER minimally.

<a id="Writer.BigIntegerUnsigned"></a>

```vertex
public mutating func BigIntegerUnsigned(_ magnitude: [uint8])
```

BigIntegerUnsigned encodes a positive INTEGER from magnitude bytes,
adding a leading zero when the top bit is set so it stays positive.

<a id="Writer.ObjectIdentifier"></a>

```vertex
public mutating func ObjectIdentifier(_ arcs: [uint64])
```

<a id="Writer.Raw"></a>

```vertex
public mutating func Raw(_ der: [uint8])
```

## Files

- asn1.vs
