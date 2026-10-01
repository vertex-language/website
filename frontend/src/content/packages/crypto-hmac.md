# package hmac

```vertex
import "crypto/hmac"
```

## Index

- [`func Compute(key: [uint8], message: [uint8], hash: HashAlgorithm = .sha256) -> [uint8]`](#func-Compute)
- [`func Compute(key: [uint8], message: string, hash: HashAlgorithm = .sha256) -> [uint8]`](#func-Compute-2)
- [`func Equal(_ mac1: [uint8], _ mac2: [uint8]) -> bool`](#func-Equal)
- [`enum HashAlgorithm`](#enum-HashAlgorithm)

## Functions

### func Compute <a id="func-Compute"></a>

```vertex
public func Compute(key: [uint8], message: [uint8], hash: HashAlgorithm = .sha256) -> [uint8]
```

Compute calculates the HMAC of a message with the given key and hash algorithm.

### func Compute <a id="func-Compute-2"></a>

```vertex
public func Compute(key: [uint8], message: string, hash: HashAlgorithm = .sha256) -> [uint8]
```

Compute calculates the HMAC of a string message with the given key.

### func Equal <a id="func-Equal"></a>

```vertex
public func Equal(_ mac1: [uint8], _ mac2: [uint8]) -> bool
```

Equal compares two MACs for equality without leaking timing information.

## Types

### enum HashAlgorithm <a id="enum-HashAlgorithm"></a>

```vertex
public enum HashAlgorithm
```

#### Cases

<a id="HashAlgorithm.sha256"></a>

```vertex
case sha256
```

<a id="HashAlgorithm.sha224"></a>

```vertex
case sha224
```

<a id="HashAlgorithm.sha1"></a>

```vertex
case sha1
```

<a id="HashAlgorithm.md5"></a>

```vertex
case md5
```

<a id="HashAlgorithm.sha384"></a>

```vertex
case sha384
```

<a id="HashAlgorithm.sha512"></a>

```vertex
case sha512
```

## Files

- hmac.vs
