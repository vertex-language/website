# package big

```vertex
import "math/big"
```

Package big is arbitrary-precision unsigned integer arithmetic, enough
for public-key cryptography: comparison, add/sub/mul, division with
remainder, and modular exponentiation. RSA signature verification
(m = s^e mod n) is the immediate consumer.

A Nat is a magnitude held as little-endian 32-bit limbs (limb 0 is the
least significant), with no trailing zero limbs except for the value
zero, which is the empty limb list. It is unsigned; callers that need a
sign track it themselves.

## Index

- [`func Abs(_ a: Integer) -> Integer`](#func-Abs)
- [`func Add(_ a: Nat, _ b: Nat) -> Nat`](#func-Add)
- [`func Add(_ a: Integer, _ b: Integer) -> Integer`](#func-Add-2)
- [`func And(_ a: Nat, _ b: Nat) -> Nat`](#func-And)
- [`func And(_ a: Integer, _ b: Integer) -> Integer`](#func-And-2)
- [`func Cmp(_ a: Nat, _ b: Nat) -> int`](#func-Cmp)
- [`func Cmp(_ a: Integer, _ b: Integer) -> int`](#func-Cmp-2)
- [`func DivMod(_ a: Nat, _ m: Nat) -> (Nat, Nat)`](#func-DivMod)
- [`func ExpMod(_ base: Nat, _ exp: Nat, _ m: Nat) -> Nat`](#func-ExpMod)
- [`func Mod(_ a: Nat, _ m: Nat) -> Nat`](#func-Mod)
- [`func Mul(_ a: Nat, _ b: Nat) -> Nat`](#func-Mul)
- [`func Mul(_ a: Integer, _ b: Integer) -> Integer`](#func-Mul-2)
- [`func MulMod(_ a: Nat, _ b: Nat, _ m: Nat) -> Nat`](#func-MulMod)
- [`func Neg(_ a: Integer) -> Integer`](#func-Neg)
- [`func Not(_ a: Integer) -> Integer`](#func-Not)
- [`func Or(_ a: Nat, _ b: Nat) -> Nat`](#func-Or)
- [`func Or(_ a: Integer, _ b: Integer) -> Integer`](#func-Or-2)
- [`func Pow(_ a: Nat, _ e: int) -> Nat`](#func-Pow)
- [`func Pow(_ a: Integer, _ e: int) -> Integer`](#func-Pow-2)
- [`func Quo(_ a: Integer, _ b: Integer) -> Integer`](#func-Quo)
- [`func QuoRem(_ a: Integer, _ b: Integer) -> (Integer, Integer)`](#func-QuoRem)
- [`func Rem(_ a: Integer, _ b: Integer) -> Integer`](#func-Rem)
- [`func ShiftLeft(_ a: Nat, _ n: int) -> Nat`](#func-ShiftLeft)
- [`func ShiftLeft(_ a: Integer, _ n: int) -> Integer`](#func-ShiftLeft-2)
- [`func ShiftRight(_ a: Nat, _ n: int) -> Nat`](#func-ShiftRight)
- [`func ShiftRight(_ a: Integer, _ n: int) -> Integer`](#func-ShiftRight-2)
- [`func Sub(_ a: Nat, _ b: Nat) -> Nat`](#func-Sub)
- [`func Sub(_ a: Integer, _ b: Integer) -> Integer`](#func-Sub-2)
- [`func TruncateSigned(_ a: Integer, _ bits: int) -> Integer`](#func-TruncateSigned)
- [`func TruncateUnsigned(_ a: Integer, _ bits: int) -> Integer`](#func-TruncateUnsigned)
- [`func Xor(_ a: Nat, _ b: Nat) -> Nat`](#func-Xor)
- [`func Xor(_ a: Integer, _ b: Integer) -> Integer`](#func-Xor-2)
- [`struct Integer`](#struct-Integer)
  - [`init(negative: bool, magnitude: Nat)`](#Integer.init)
  - [`init()`](#Integer.init-2)
  - [`init(_ v: int64)`](#Integer.init-3)
  - [`init(_ n: Nat)`](#Integer.init-4)
  - [`let Negative: bool`](#Integer.Negative)
  - [`let Magnitude: Nat`](#Integer.Magnitude)
  - [`var IsZero: bool { get }`](#Integer.IsZero)
  - [`var Sign: int { get }`](#Integer.Sign)
  - [`var WrappingInt64: int64 { get }`](#Integer.WrappingInt64)
  - [`static func FromFloat64(_ d: float64) -> Integer`](#Integer.FromFloat64)
  - [`static func Parse(_ s: string, radix: int = 10) -> Integer?`](#Integer.Parse)
  - [`func ToString(_ radix: int = 10) -> string`](#Integer.ToString)
  - [`func ToFloat64() -> float64`](#Integer.ToFloat64)
  - [`func ToInt64() -> int64?`](#Integer.ToInt64)
- [`struct Nat`](#struct-Nat)
  - [`init()`](#Nat.init)
  - [`var LowU64: uint64 { get }`](#Nat.LowU64)
  - [`var IsZero: bool { get }`](#Nat.IsZero)
  - [`var BitLen: int { get }`](#Nat.BitLen)
  - [`static func FromBytes(_ be: [uint8]) -> Nat`](#Nat.FromBytes)
  - [`static func FromU32(_ v: uint32) -> Nat`](#Nat.FromU32)
  - [`static func FromU64(_ v: uint64) -> Nat`](#Nat.FromU64)
  - [`static func FromFloat64(_ d: float64) -> Nat`](#Nat.FromFloat64)
  - [`static func Parse(_ s: string, radix: int = 10) -> Nat?`](#Nat.Parse)
  - [`func ToString(_ radix: int = 10) -> string`](#Nat.ToString)
  - [`func ToU64() -> uint64?`](#Nat.ToU64)
  - [`func ToFloat64() -> float64`](#Nat.ToFloat64)
  - [`func ToBytes() -> [uint8]`](#Nat.ToBytes)
  - [`func ToBytesPadded(_ n: int) -> [uint8]`](#Nat.ToBytesPadded)

## Functions

### func Abs <a id="func-Abs"></a>

```vertex
public func Abs(_ a: Integer) -> Integer
```

### func Add <a id="func-Add"></a>

```vertex
public func Add(_ a: Nat, _ b: Nat) -> Nat
```

Add returns a + b.

### func Add <a id="func-Add-2"></a>

```vertex
public func Add(_ a: Integer, _ b: Integer) -> Integer
```

### func And <a id="func-And"></a>

```vertex
public func And(_ a: Nat, _ b: Nat) -> Nat
```

And, Or and Xor are the bitwise operations on magnitudes.

### func And <a id="func-And-2"></a>

```vertex
public func And(_ a: Integer, _ b: Integer) -> Integer
```

### func Cmp <a id="func-Cmp"></a>

```vertex
public func Cmp(_ a: Nat, _ b: Nat) -> int
```

Cmp returns -1, 0, or 1 for a<b, a==b, a>b.

### func Cmp <a id="func-Cmp-2"></a>

```vertex
public func Cmp(_ a: Integer, _ b: Integer) -> int
```

Cmp orders two Integers: -1, 0 or 1.

### func DivMod <a id="func-DivMod"></a>

```vertex
public func DivMod(_ a: Nat, _ m: Nat) -> (Nat, Nat)
```

DivMod returns (quotient, remainder) for a / m, m != 0: Knuth's
algorithm D (TAOCP 4.3.1), a limb of quotient per step.

### func ExpMod <a id="func-ExpMod"></a>

```vertex
public func ExpMod(_ base: Nat, _ exp: Nat, _ m: Nat) -> Nat
```

ExpMod returns (base ^ exp) mod m by square-and-multiply. This is the
RSA public-key operation; with a public exponent it needs no constant
time, and RSA verification handles only public values.

### func Mod <a id="func-Mod"></a>

```vertex
public func Mod(_ a: Nat, _ m: Nat) -> Nat
```

Mod returns a mod m.

### func Mul <a id="func-Mul"></a>

```vertex
public func Mul(_ a: Nat, _ b: Nat) -> Nat
```

Mul returns a * b (schoolbook).

### func Mul <a id="func-Mul-2"></a>

```vertex
public func Mul(_ a: Integer, _ b: Integer) -> Integer
```

### func MulMod <a id="func-MulMod"></a>

```vertex
public func MulMod(_ a: Nat, _ b: Nat, _ m: Nat) -> Nat
```

MulMod returns (a * b) mod m.

### func Neg <a id="func-Neg"></a>

```vertex
public func Neg(_ a: Integer) -> Integer
```

### func Not <a id="func-Not"></a>

```vertex
public func Not(_ a: Integer) -> Integer
```

Not is ~a, which is -a - 1.

### func Or <a id="func-Or"></a>

```vertex
public func Or(_ a: Nat, _ b: Nat) -> Nat
```

### func Or <a id="func-Or-2"></a>

```vertex
public func Or(_ a: Integer, _ b: Integer) -> Integer
```

### func Pow <a id="func-Pow"></a>

```vertex
public func Pow(_ a: Nat, _ e: int) -> Nat
```

Pow is a^e.

### func Pow <a id="func-Pow-2"></a>

```vertex
public func Pow(_ a: Integer, _ e: int) -> Integer
```

Pow is a^e.

### func Quo <a id="func-Quo"></a>

```vertex
public func Quo(_ a: Integer, _ b: Integer) -> Integer
```

Quo is a / b rounded toward zero.

### func QuoRem <a id="func-QuoRem"></a>

```vertex
public func QuoRem(_ a: Integer, _ b: Integer) -> (Integer, Integer)
```

QuoRem divides rounding toward zero: the remainder has a's sign, as
the / and % operators on machine integers do. b must not be zero.

### func Rem <a id="func-Rem"></a>

```vertex
public func Rem(_ a: Integer, _ b: Integer) -> Integer
```

Rem is the remainder of Quo, with a's sign.

### func ShiftLeft <a id="func-ShiftLeft"></a>

```vertex
public func ShiftLeft(_ a: Nat, _ n: int) -> Nat
```

ShiftLeft is a · 2^n.

### func ShiftLeft <a id="func-ShiftLeft-2"></a>

```vertex
public func ShiftLeft(_ a: Integer, _ n: int) -> Integer
```

ShiftLeft is a · 2^n; a negative n shifts right.

### func ShiftRight <a id="func-ShiftRight"></a>

```vertex
public func ShiftRight(_ a: Nat, _ n: int) -> Nat
```

ShiftRight is a / 2^n, rounded down.

### func ShiftRight <a id="func-ShiftRight-2"></a>

```vertex
public func ShiftRight(_ a: Integer, _ n: int) -> Integer
```

ShiftRight is a / 2^n rounded toward negative infinity (an arithmetic
shift of the two's complement); a negative n shifts left.

### func Sub <a id="func-Sub"></a>

```vertex
public func Sub(_ a: Nat, _ b: Nat) -> Nat
```

Sub returns a - b, requiring a >= b.

### func Sub <a id="func-Sub-2"></a>

```vertex
public func Sub(_ a: Integer, _ b: Integer) -> Integer
```

### func TruncateSigned <a id="func-TruncateSigned"></a>

```vertex
public func TruncateSigned(_ a: Integer, _ bits: int) -> Integer
```

TruncateSigned keeps a's low `bits` bits as a signed two's complement
value, in [-2^(bits-1), 2^(bits-1)).

### func TruncateUnsigned <a id="func-TruncateUnsigned"></a>

```vertex
public func TruncateUnsigned(_ a: Integer, _ bits: int) -> Integer
```

TruncateUnsigned keeps a's low `bits` bits of two's complement, as a
non-negative value (a mod 2^bits).

### func Xor <a id="func-Xor"></a>

```vertex
public func Xor(_ a: Nat, _ b: Nat) -> Nat
```

### func Xor <a id="func-Xor-2"></a>

```vertex
public func Xor(_ a: Integer, _ b: Integer) -> Integer
```

## Types

### struct Integer <a id="struct-Integer"></a>

```vertex
public struct Integer
```

Integer is a signed arbitrary-precision integer: a sign and a Nat
magnitude. Zero is never negative.

#### Initializers

<a id="Integer.init"></a>

```vertex
public init(negative: bool, magnitude: Nat)
```

<a id="Integer.init-2"></a>

```vertex
public init()
```

<a id="Integer.init-3"></a>

```vertex
public init(_ v: int64)
```

<a id="Integer.init-4"></a>

```vertex
public init(_ n: Nat)
```

#### Properties

<a id="Integer.Negative"></a>

```vertex
public let Negative: bool
```

<a id="Integer.Magnitude"></a>

```vertex
public let Magnitude: Nat
```

<a id="Integer.IsZero"></a>

```vertex
public var IsZero: bool { get }
```

<a id="Integer.Sign"></a>

```vertex
public var Sign: int { get }
```

Sign is -1, 0 or 1.

<a id="Integer.WrappingInt64"></a>

```vertex
public var WrappingInt64: int64 { get }
```

WrappingInt64 is the low 64 bits in two's complement.

#### Methods

<a id="Integer.FromFloat64"></a>

```vertex
public static func FromFloat64(_ d: float64) -> Integer
```

FromFloat64 is the whole part of a finite double, exactly.

<a id="Integer.Parse"></a>

```vertex
public static func Parse(_ s: string, radix: int = 10) -> Integer?
```

Parse reads an optional sign and digits in a radix from 2 to 36.

<a id="Integer.ToString"></a>

```vertex
public func ToString(_ radix: int = 10) -> string
```

ToString writes an optional minus sign and the digits in a radix.

<a id="Integer.ToFloat64"></a>

```vertex
public func ToFloat64() -> float64
```

ToFloat64 is the nearest double, ties to even.

<a id="Integer.ToInt64"></a>

```vertex
public func ToInt64() -> int64?
```

ToInt64 is the value if it fits an int64, else nil.

### struct Nat <a id="struct-Nat"></a>

```vertex
public struct Nat
```

Nat is a non-negative arbitrary-precision integer.

#### Initializers

<a id="Nat.init"></a>

```vertex
public init()
```

#### Properties

<a id="Nat.LowU64"></a>

```vertex
public var LowU64: uint64 { get }
```

LowU64 is the low 64 bits.

<a id="Nat.IsZero"></a>

```vertex
public var IsZero: bool { get }
```

<a id="Nat.BitLen"></a>

```vertex
public var BitLen: int { get }
```

BitLen is the position of the highest set bit (0 for zero).

#### Methods

<a id="Nat.FromBytes"></a>

```vertex
public static func FromBytes(_ be: [uint8]) -> Nat
```

FromBytes reads a big-endian magnitude (as RSA moduli, DER INTEGERs).

<a id="Nat.FromU32"></a>

```vertex
public static func FromU32(_ v: uint32) -> Nat
```

FromU32 makes a small Nat.

<a id="Nat.FromU64"></a>

```vertex
public static func FromU64(_ v: uint64) -> Nat
```

FromU64 makes a Nat of a uint64.

<a id="Nat.FromFloat64"></a>

```vertex
public static func FromFloat64(_ d: float64) -> Nat
```

FromFloat64 is the whole part of a finite, non-negative double, exactly.

<a id="Nat.Parse"></a>

```vertex
public static func Parse(_ s: string, radix: int = 10) -> Nat?
```

Parse reads digits in a radix from 2 to 36, letters in either case;
nil for an empty string or a character that isn't a digit.

<a id="Nat.ToString"></a>

```vertex
public func ToString(_ radix: int = 10) -> string
```

ToString writes the digits in a radix from 2 to 36, lowercase.

<a id="Nat.ToU64"></a>

```vertex
public func ToU64() -> uint64?
```

ToU64 is the value as a uint64, or nil if it doesn't fit.

<a id="Nat.ToFloat64"></a>

```vertex
public func ToFloat64() -> float64
```

ToFloat64 is the nearest double, ties to even (infinity past the range).

<a id="Nat.ToBytes"></a>

```vertex
public func ToBytes() -> [uint8]
```

ToBytes returns the big-endian magnitude, at least one byte, with no
leading zeros beyond that.

<a id="Nat.ToBytesPadded"></a>

```vertex
public func ToBytesPadded(_ n: int) -> [uint8]
```

ToBytesPadded returns the big-endian magnitude in exactly n bytes,
left-padded with zeros (RSA outputs are fixed to the modulus size).

## Files

- big.vs
- integer.vs
