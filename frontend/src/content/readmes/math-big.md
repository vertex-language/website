# math/big

Arbitrary-precision unsigned integer arithmetic, enough for public-key cryptography: comparison, add/sub/mul, division with remainder, and modular exponentiation.

```vertex
import "math/big"
```

## Types

- **`Nat`** (struct): Nat is a non-negative arbitrary-precision integer.
- **`Integer`** (struct): Integer is a signed arbitrary-precision integer: a sign and a Nat magnitude. Zero is never negative.

## Functions

- `func Cmp(a: Nat, b: Nat) -> int`: Cmp returns -1, 0, or 1 for a<b, a==b, a>b.
- `func Add(a: Nat, b: Nat) -> Nat`: Add returns a + b.
- `func Sub(a: Nat, b: Nat) -> Nat`: Sub returns a - b, requiring a >= b.
- `func Mul(a: Nat, b: Nat) -> Nat`: Mul returns a * b (schoolbook).
- `func DivMod(a: Nat, m: Nat) -> (Nat, Nat)`: DivMod returns (quotient, remainder) for a / m, m != 0: Knuth's algorithm D (TAOCP 4.3.1), a limb of quotient per step.
- `func ShiftLeft(a: Nat, n: int) -> Nat`: ShiftLeft is a · 2^n.
- `func ShiftRight(a: Nat, n: int) -> Nat`: ShiftRight is a / 2^n, rounded down.
- `func Pow(a: Nat, e: int) -> Nat`: Pow is a^e.
- `func And(a: Nat, b: Nat) -> Nat`: And, Or and Xor are the bitwise operations on magnitudes.
- `func Or(a: Nat, b: Nat) -> Nat`
- and 22 more

Part of the [`math`](https://github.com/vertex-language/math) repository.
