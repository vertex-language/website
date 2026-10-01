# package pem

```vertex
import "encoding/pem"
```

## Index

- [`func Decode(_ data: [uint8]) -> Block?`](#func-Decode)
- [`func DecodeString(_ text: string) -> Block?`](#func-DecodeString)
- [`func Encode(_ block: Block) -> string`](#func-Encode)
- [`struct Block`](#struct-Block)
  - [`init(type: string, bytes: [uint8])`](#Block.init)
  - [`var Type: string`](#Block.Type)
  - [`var Bytes: [uint8]`](#Block.Bytes)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ data: [uint8]) -> Block?
```

Decode finds the next PEM formatted block in the input byte slice.

### func DecodeString <a id="func-DecodeString"></a>

```vertex
public func DecodeString(_ text: string) -> Block?
```

Decode finds the next PEM formatted block in the input text.

### func Encode <a id="func-Encode"></a>

```vertex
public func Encode(_ block: Block) -> string
```

Encode returns the PEM encoding of block.

## Types

### struct Block <a id="struct-Block"></a>

```vertex
public struct Block
```

A Block represents a PEM (Privacy-Enhanced Mail) encoded structure.

#### Initializers

<a id="Block.init"></a>

```vertex
public init(type: string, bytes: [uint8])
```

#### Properties

<a id="Block.Type"></a>

```vertex
public var Type: string
```

The type taken from the preamble (e.g. "CERTIFICATE" or "PRIVATE KEY").

<a id="Block.Bytes"></a>

```vertex
public var Bytes: [uint8]
```

The decoded bytes of the contents (typically a DER-encoded ASN.1 structure).

## Files

- pem.vs
