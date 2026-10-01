# package rand

```vertex
import "crypto/rand"
```

## Index

- [`func Bytes(_ count: int) throws -> [uint8]`](#func-Bytes)
- [`func Read(into buffer: inout [uint8]) throws -> int`](#func-Read)
- [`enum RandError: Error`](#enum-RandError)

## Functions

### func Bytes <a id="func-Bytes"></a>

```vertex
public func Bytes(_ count: int) throws -> [uint8]
```

Bytes allocates and returns a buffer of count cryptographically secure random bytes.

### func Read <a id="func-Read"></a>

```vertex
public func Read(into buffer: inout [uint8]) throws -> int
```

Read fills buffer with cryptographically secure random bytes from the platform CSPRNG.

## Types

### enum RandError <a id="enum-RandError"></a>

```vertex
public enum RandError: Error
```

#### Cases

<a id="RandError.readFailed"></a>

```vertex
case readFailed(string)
```

## Files

- rand.vs
