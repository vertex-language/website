# package hex

```vertex
import "encoding/hex"
```

## Index

- [`func DecodeString(_ s: string) throws -> [uint8]`](#func-DecodeString)
- [`func DecodedLen(_ x: int) -> int`](#func-DecodedLen)
- [`func EncodeToString(_ src: [uint8]) -> string`](#func-EncodeToString)
- [`func EncodedLen(_ n: int) -> int`](#func-EncodedLen)
- [`enum HexError: Error`](#enum-HexError)

## Functions

### func DecodeString <a id="func-DecodeString"></a>

```vertex
public func DecodeString(_ s: string) throws -> [uint8]
```

DecodeString returns the bytes represented by the hexadecimal string s.

### func DecodedLen <a id="func-DecodedLen"></a>

```vertex
public func DecodedLen(_ x: int) -> int
```

DecodedLen returns the length of a decoding of x source bytes.

### func EncodeToString <a id="func-EncodeToString"></a>

```vertex
public func EncodeToString(_ src: [uint8]) -> string
```

EncodeToString returns the hexadecimal encoding of src.

### func EncodedLen <a id="func-EncodedLen"></a>

```vertex
public func EncodedLen(_ n: int) -> int
```

EncodedLen returns the length of an encoding of n source bytes.

## Types

### enum HexError <a id="enum-HexError"></a>

```vertex
public enum HexError: Error
```

#### Cases

<a id="HexError.invalidByte"></a>

```vertex
case invalidByte(uint8)
```

<a id="HexError.oddLength"></a>

```vertex
case oddLength
```

<a id="HexError.bufferTooSmall"></a>

```vertex
case bufferTooSmall
```

## Files

- hex.vs
