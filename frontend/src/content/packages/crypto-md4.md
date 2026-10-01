# package md4

```vertex
import "crypto/md4"
```

Package md4 implements the MD4 message digest (RFC 1320). It is
cryptographically broken and used only where a legacy protocol requires
it: the NTLM "NT hash" is MD4 of the UTF-16LE password.

## Index

- [Constants](#constants)
- [`func New() -> Digest`](#func-New)
- [`func Sum(_ data: [uint8]) -> [uint8]`](#func-Sum)
- [`struct Digest`](#struct-Digest)
  - [`init()`](#Digest.init)
  - [`mutating func Reset()`](#Digest.Reset)
  - [`mutating func Write(_ p: [uint8])`](#Digest.Write)
  - [`func Checksum() -> [uint8]`](#Digest.Checksum)

## Constants

<a id="let-BlockSize"></a>

```vertex
public let BlockSize: int = 64
```

<a id="let-Size"></a>

```vertex
public let Size: int = 16
```

## Functions

### func New <a id="func-New"></a>

```vertex
public func New() -> Digest
```

### func Sum <a id="func-Sum"></a>

```vertex
public func Sum(_ data: [uint8]) -> [uint8]
```

## Types

### struct Digest <a id="struct-Digest"></a>

```vertex
public struct Digest
```

#### Initializers

<a id="Digest.init"></a>

```vertex
public init()
```

#### Methods

<a id="Digest.Reset"></a>

```vertex
public mutating func Reset()
```

<a id="Digest.Write"></a>

```vertex
public mutating func Write(_ p: [uint8])
```

<a id="Digest.Checksum"></a>

```vertex
public func Checksum() -> [uint8]
```

## Files

- md4.vs
