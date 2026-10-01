# package base64

```vertex
import "encoding/base64"
```

## Index

- [Constants](#constants)
- [`func DecodeString(_ s: string) throws -> [uint8]`](#func-DecodeString)
- [`func EncodeToString(_ src: [uint8]) -> string`](#func-EncodeToString)
- [`enum Base64Error: Error`](#enum-Base64Error)
- [`struct Encoding`](#struct-Encoding)
  - [`init(isURL: bool = false)`](#Encoding.init)
  - [`func EncodeToString(_ src: [uint8]) -> string`](#Encoding.EncodeToString)
  - [`func DecodeString(_ s: string) throws -> [uint8]`](#Encoding.DecodeString)

## Constants

<a id="let-StdEncoding"></a>

```vertex
public let StdEncoding = Encoding(isURL: false)
```

<a id="let-URLEncoding"></a>

```vertex
public let URLEncoding = Encoding(isURL: true)
```

## Functions

### func DecodeString <a id="func-DecodeString"></a>

```vertex
public func DecodeString(_ s: string) throws -> [uint8]
```

### func EncodeToString <a id="func-EncodeToString"></a>

```vertex
public func EncodeToString(_ src: [uint8]) -> string
```

## Types

### enum Base64Error <a id="enum-Base64Error"></a>

```vertex
public enum Base64Error: Error
```

#### Cases

<a id="Base64Error.invalidByte"></a>

```vertex
case invalidByte(uint8)
```

<a id="Base64Error.corruptInput"></a>

```vertex
case corruptInput
```

### struct Encoding <a id="struct-Encoding"></a>

```vertex
public struct Encoding
```

#### Initializers

<a id="Encoding.init"></a>

```vertex
public init(isURL: bool = false)
```

#### Methods

<a id="Encoding.EncodeToString"></a>

```vertex
public func EncodeToString(_ src: [uint8]) -> string
```

<a id="Encoding.DecodeString"></a>

```vertex
public func DecodeString(_ s: string) throws -> [uint8]
```

## Files

- base64.vs
