# package subtle

```vertex
import "crypto/subtle"
```

## Index

- [`func ConstantTimeByteEq(_ x: uint8, _ y: uint8) -> int32`](#func-ConstantTimeByteEq)
- [`func ConstantTimeCompare(_ x: [uint8], _ y: [uint8]) -> int32`](#func-ConstantTimeCompare)
- [`func ConstantTimeCopy(_ v: int32, _ dst: inout [uint8], _ src: [uint8])`](#func-ConstantTimeCopy)
- [`func ConstantTimeEq(_ x: int32, _ y: int32) -> int32`](#func-ConstantTimeEq)
- [`func ConstantTimeLessOrEq(_ x: int32, _ y: int32) -> int32`](#func-ConstantTimeLessOrEq)
- [`func ConstantTimeSelect(_ v: int32, _ x: int32, _ y: int32) -> int32`](#func-ConstantTimeSelect)

## Functions

### func ConstantTimeByteEq <a id="func-ConstantTimeByteEq"></a>

```vertex
public func ConstantTimeByteEq(_ x: uint8, _ y: uint8) -> int32
```

ConstantTimeByteEq returns 1 if x == y and 0 otherwise.

### func ConstantTimeCompare <a id="func-ConstantTimeCompare"></a>

```vertex
public func ConstantTimeCompare(_ x: [uint8], _ y: [uint8]) -> int32
```

ConstantTimeCompare returns 1 if the two byte slices, x and y, have equal contents
and 0 otherwise. The time taken is proportional to the slice length and is
independent of the contents.

### func ConstantTimeCopy <a id="func-ConstantTimeCopy"></a>

```vertex
public func ConstantTimeCopy(_ v: int32, _ dst: inout [uint8], _ src: [uint8])
```

ConstantTimeCopy copies the contents of src into dst if v == 1.
If v == 0, dst is left unchanged.

### func ConstantTimeEq <a id="func-ConstantTimeEq"></a>

```vertex
public func ConstantTimeEq(_ x: int32, _ y: int32) -> int32
```

ConstantTimeEq returns 1 if x == y and 0 otherwise.

### func ConstantTimeLessOrEq <a id="func-ConstantTimeLessOrEq"></a>

```vertex
public func ConstantTimeLessOrEq(_ x: int32, _ y: int32) -> int32
```

ConstantTimeLessOrEq returns 1 if x <= y and 0 otherwise.
Behavior is undefined if x or y are negative or >= 2^31.

### func ConstantTimeSelect <a id="func-ConstantTimeSelect"></a>

```vertex
public func ConstantTimeSelect(_ v: int32, _ x: int32, _ y: int32) -> int32
```

ConstantTimeSelect returns x if v == 1 and y if v == 0.
Its behavior is undefined if v takes any other value.

## Files

- subtle.vs
