# package math

```vertex
import "math"
```

Package math is elementary functions in pure Vertex: the same code runs
on the host and inside a kernel, and gives the same bits on every
device that rounds each operation, because nothing here calls a C
library or a device's approximate instruction. A GPU has no libm, and
that is the reason for this package (proposed_vertex_kernel.md §6.5).

The single-precision functions are Cephes' algorithms (Moshier): an
argument reduced exactly or nearly so, then a minimax polynomial. Their
errors are measured in tests/math against the host's double-precision
libm, in units in the last place of the float32 result.

Everything is @inlinable, and nothing reads a table or a global, so a
kernel in any module compiles these into itself.

## Index

- [Constants](#constants)
- [`@inlinable func Abs(_ x: float32) -> float32`](#func-Abs)
- [`func Abs(_ x: float64) -> float64`](#func-Abs-2)
- [`func Acos(_ x: float64) -> float64`](#func-Acos)
- [`func Acosh(_ x: float64) -> float64`](#func-Acosh)
- [`func Asin(_ x: float64) -> float64`](#func-Asin)
- [`func Asinh(_ x: float64) -> float64`](#func-Asinh)
- [`@inlinable func Atan(_ x: float32) -> float32`](#func-Atan)
- [`func Atan(_ xIn: float64) -> float64`](#func-Atan-2)
- [`@inlinable func Atan2(_ y: float32, _ x: float32) -> float32`](#func-Atan2)
- [`func Atan2(_ y: float64, _ x: float64) -> float64`](#func-Atan2-2)
- [`func Atanh(_ xIn: float64) -> float64`](#func-Atanh)
- [`func Cbrt(_ x: float64) -> float64`](#func-Cbrt)
- [`@inlinable func Ceil(_ x: float32) -> float32`](#func-Ceil)
- [`func Ceil(_ x: float64) -> float64`](#func-Ceil-2)
- [`@inlinable func CeilDiv(_ a: int, _ b: int) -> int`](#func-CeilDiv)
- [`@inlinable func Clamp(_ x: float32, _ lo: float32, _ hi: float32) -> float32`](#func-Clamp)
- [`@inlinable func Clamp(_ x: float64, _ lo: float64, _ hi: float64) -> float64`](#func-Clamp-2)
- [`@inlinable func Clamp(_ x: int, _ lo: int, _ hi: int) -> int`](#func-Clamp-3)
- [`@inlinable func Clamp(_ x: int32, _ lo: int32, _ hi: int32) -> int32`](#func-Clamp-4)
- [`@inlinable func Clamp(_ x: int64, _ lo: int64, _ hi: int64) -> int64`](#func-Clamp-5)
- [`@inlinable func CopySign(_ x: float32, _ y: float32) -> float32`](#func-CopySign)
- [`func CopySign(_ x: float64, _ y: float64) -> float64`](#func-CopySign-2)
- [`@inlinable func Cos(_ x: float32) -> float32`](#func-Cos)
- [`func Cos(_ x: float64) -> float64`](#func-Cos-2)
- [`func Cosh(_ x: float64) -> float64`](#func-Cosh)
- [`@inlinable func Erf(_ x: float32) -> float32`](#func-Erf)
- [`@inlinable func Erfc(_ x: float32) -> float32`](#func-Erfc)
- [`@inlinable func Exp(_ x: float32) -> float32`](#func-Exp)
- [`func Exp(_ xIn: float64) -> float64`](#func-Exp-2)
- [`@inlinable func Exp2(_ x: float32) -> float32`](#func-Exp2)
- [`func Exp2(_ x: float64) -> float64`](#func-Exp2-2)
- [`func Expm1(_ xIn: float64) -> float64`](#func-Expm1)
- [`@inlinable func Floor(_ x: float32) -> float32`](#func-Floor)
- [`func Floor(_ x: float64) -> float64`](#func-Floor-2)
- [`@inlinable func FloorDiv(_ a: int, _ b: int) -> int`](#func-FloorDiv)
- [`@inlinable func FloorDiv(_ a: int64, _ b: int64) -> int64`](#func-FloorDiv-2)
- [`@inlinable func FloorMod(_ a: int, _ b: int) -> int`](#func-FloorMod)
- [`@inlinable func FloorMod(_ a: int64, _ b: int64) -> int64`](#func-FloorMod-2)
- [`@inlinable func FloorMod(_ x: float32, _ y: float32) -> float32`](#func-FloorMod-3)
- [`@inlinable func FloorMod(_ x: float64, _ y: float64) -> float64`](#func-FloorMod-4)
- [`func Fmod(_ x: float64, _ y: float64) -> float64`](#func-Fmod)
- [`@inlinable func Frexp(_ x: float32) -> (float32, int32)`](#func-Frexp)
- [`func Frexp(_ x: float64) -> (fraction: float64, exponent: int)`](#func-Frexp-2)
- [`func Hypot(_ x: float64, _ y: float64) -> float64`](#func-Hypot)
- [`@inlinable func Ldexp(_ x: float32, _ n: int32) -> float32`](#func-Ldexp)
- [`func Ldexp(_ x: float64, _ n: int) -> float64`](#func-Ldexp-2)
- [`@inlinable func Lerp(_ a: float32, _ b: float32, _ t: float32) -> float32`](#func-Lerp)
- [`@inlinable func Lerp(_ a: float64, _ b: float64, _ t: float64) -> float64`](#func-Lerp-2)
- [`@inlinable func Log(_ x: float32) -> float32`](#func-Log)
- [`func Log(_ xIn: float64) -> float64`](#func-Log-2)
- [`@inlinable func Log10(_ x: float32) -> float32`](#func-Log10)
- [`func Log10(_ xIn: float64) -> float64`](#func-Log10-2)
- [`func Log1p(_ x: float64) -> float64`](#func-Log1p)
- [`@inlinable func Log2(_ x: float32) -> float32`](#func-Log2)
- [`func Log2(_ xIn: float64) -> float64`](#func-Log2-2)
- [`@inlinable func Max(_ x: float32, _ y: float32) -> float32`](#func-Max)
- [`func Max(_ x: float64, _ y: float64) -> float64`](#func-Max-2)
- [`@inlinable func Min(_ x: float32, _ y: float32) -> float32`](#func-Min)
- [`func Min(_ x: float64, _ y: float64) -> float64`](#func-Min-2)
- [`func Modf(_ x: float64) -> (whole: float64, fraction: float64)`](#func-Modf)
- [`func NextDown(_ x: float64) -> float64`](#func-NextDown)
- [`func NextUp(_ x: float64) -> float64`](#func-NextUp)
- [`func Pow(_ x: float64, _ y: float64) -> float64`](#func-Pow)
- [`func Remainder(_ x: float64, _ y: float64) -> float64`](#func-Remainder)
- [`@inlinable func Round(_ x: float32) -> float32`](#func-Round)
- [`func Round(_ x: float64) -> float64`](#func-Round-2)
- [`func RoundHalfAway(_ x: float64) -> float64`](#func-RoundHalfAway)
- [`@inlinable func RoundToInt(_ x: float32) -> int32`](#func-RoundToInt)
- [`@inlinable func Rsqrt(_ x: float32) -> float32`](#func-Rsqrt)
- [`@inlinable func Saturate(_ x: float32) -> float32`](#func-Saturate)
- [`@inlinable func Saturate(_ x: float64) -> float64`](#func-Saturate-2)
- [`@inlinable func Sigmoid(_ x: float32) -> float32`](#func-Sigmoid)
- [`@inlinable func Sin(_ x: float32) -> float32`](#func-Sin)
- [`func Sin(_ x: float64) -> float64`](#func-Sin-2)
- [`func Sinh(_ x: float64) -> float64`](#func-Sinh)
- [`@inlinable func Sqrt(_ x: float32) -> float32`](#func-Sqrt)
- [`func Sqrt(_ x: float64) -> float64`](#func-Sqrt-2)
- [`@inlinable func Tan(_ x: float32) -> float32`](#func-Tan)
- [`func Tan(_ x: float64) -> float64`](#func-Tan-2)
- [`@inlinable func Tanh(_ x: float32) -> float32`](#func-Tanh)
- [`func Tanh(_ x: float64) -> float64`](#func-Tanh-2)
- [`@inlinable func Trunc(_ x: float32) -> float32`](#func-Trunc)
- [`func Trunc(_ x: float64) -> float64`](#func-Trunc-2)
- [`@inlinable func _cosPoly(_ r: float32) -> float32`](#func-_cosPoly)
- [`@inlinable func _erfc(_ a: float32) -> float32`](#func-_erfc)
- [`@inlinable func _expNegSquare(_ a: float32) -> float32`](#func-_expNegSquare)
- [`@inlinable func _reduceQuarterPi(_ x: float32) -> (int32, float32)`](#func-_reduceQuarterPi)
- [`@inlinable func _sinPoly(_ r: float32) -> float32`](#func-_sinPoly)

## Constants

<a id="let-E"></a>

```vertex
public let E: float64 = 2.718281828459045
```

<a id="let-Ln10"></a>

```vertex
public let Ln10: float64 = 2.302585092994046
```

<a id="let-Ln2"></a>

```vertex
public let Ln2: float64 = 0.6931471805599453
```

<a id="let-Log10E"></a>

```vertex
public let Log10E: float64 = 0.4342944819032518
```

<a id="let-Log2E"></a>

```vertex
public let Log2E: float64 = 1.4426950408889634
```

<a id="let-Pi"></a>

```vertex
public let Pi: float64 = 3.141592653589793
```

<a id="let-Sqrt2"></a>

```vertex
public let Sqrt2: float64 = 1.4142135623730951
```

<a id="let-SqrtHalf"></a>

```vertex
public let SqrtHalf: float64 = 0.7071067811865476
```

## Functions

### func Abs <a id="func-Abs"></a>

```vertex
@inlinable public func Abs(_ x: float32) -> float32
```

Abs is |x|.

### func Abs <a id="func-Abs-2"></a>

```vertex
public func Abs(_ x: float64) -> float64
```

Abs is |x|.

### func Acos <a id="func-Acos"></a>

```vertex
public func Acos(_ x: float64) -> float64
```

Acos is the arccosine of x, in [0, π]; NaN outside [-1, 1].

### func Acosh <a id="func-Acosh"></a>

```vertex
public func Acosh(_ x: float64) -> float64
```

Acosh is the inverse hyperbolic cosine; NaN below 1.

### func Asin <a id="func-Asin"></a>

```vertex
public func Asin(_ x: float64) -> float64
```

Asin is the arcsine of x, in [-π/2, π/2]; NaN outside [-1, 1].

### func Asinh <a id="func-Asinh"></a>

```vertex
public func Asinh(_ x: float64) -> float64
```

Asinh is the inverse hyperbolic sine.

### func Atan <a id="func-Atan"></a>

```vertex
@inlinable public func Atan(_ x: float32) -> float32
```

Atan is the arctangent of x, in (-π/2, π/2): Cephes' atanf, x reduced
to |x| ≤ tan(π/8) by tan(π/8) and tan(3π/8), then a degree-9 odd
polynomial.

### func Atan <a id="func-Atan-2"></a>

```vertex
public func Atan(_ xIn: float64) -> float64
```

Atan is the arctangent of x, in (-π/2, π/2).

### func Atan2 <a id="func-Atan2"></a>

```vertex
@inlinable public func Atan2(_ y: float32, _ x: float32) -> float32
```

Atan2 is the angle of the point (x, y) from the positive x axis, in
[-π, π], with C's signed zeros: Atan2(+0, -1) is π and Atan2(-0, -1)
is -π, the angle PyTorch's torch.angle gives a real negative number.

### func Atan2 <a id="func-Atan2-2"></a>

```vertex
public func Atan2(_ y: float64, _ x: float64) -> float64
```

Atan2 is the angle of the point (x, y) from the positive x axis, in
[-π, π], with C's signed zeros and infinities.

### func Atanh <a id="func-Atanh"></a>

```vertex
public func Atanh(_ xIn: float64) -> float64
```

Atanh is the inverse hyperbolic tangent; ±∞ at ±1, NaN beyond.

### func Cbrt <a id="func-Cbrt"></a>

```vertex
public func Cbrt(_ x: float64) -> float64
```

Cbrt is the cube root.

### func Ceil <a id="func-Ceil"></a>

```vertex
@inlinable public func Ceil(_ x: float32) -> float32
```

Ceil is the least whole number not below x.

### func Ceil <a id="func-Ceil-2"></a>

```vertex
public func Ceil(_ x: float64) -> float64
```

Ceil is the least whole number not below x.

### func CeilDiv <a id="func-CeilDiv"></a>

```vertex
@inlinable public func CeilDiv(_ a: int, _ b: int) -> int
```

CeilDiv is a / b rounded toward positive infinity, for a ≥ 0 and b > 0:
how many b-sized pieces cover a.

### func Clamp <a id="func-Clamp"></a>

```vertex
@inlinable public func Clamp(_ x: float32, _ lo: float32, _ hi: float32) -> float32
```

Clamp is x limited to [lo, hi]. A NaN x stays NaN.

### func Clamp <a id="func-Clamp-2"></a>

```vertex
@inlinable public func Clamp(_ x: float64, _ lo: float64, _ hi: float64) -> float64
```

### func Clamp <a id="func-Clamp-3"></a>

```vertex
@inlinable public func Clamp(_ x: int, _ lo: int, _ hi: int) -> int
```

### func Clamp <a id="func-Clamp-4"></a>

```vertex
@inlinable public func Clamp(_ x: int32, _ lo: int32, _ hi: int32) -> int32
```

### func Clamp <a id="func-Clamp-5"></a>

```vertex
@inlinable public func Clamp(_ x: int64, _ lo: int64, _ hi: int64) -> int64
```

### func CopySign <a id="func-CopySign"></a>

```vertex
@inlinable public func CopySign(_ x: float32, _ y: float32) -> float32
```

CopySign is |x| with y's sign.

### func CopySign <a id="func-CopySign-2"></a>

```vertex
public func CopySign(_ x: float64, _ y: float64) -> float64
```

CopySign is |x| with y's sign.

### func Cos <a id="func-Cos"></a>

```vertex
@inlinable public func Cos(_ x: float32) -> float32
```

Cos is the cosine of x radians.

### func Cos <a id="func-Cos-2"></a>

```vertex
public func Cos(_ x: float64) -> float64
```

Cos is the cosine of x (in radians).

### func Cosh <a id="func-Cosh"></a>

```vertex
public func Cosh(_ x: float64) -> float64
```

Cosh is the hyperbolic cosine.

### func Erf <a id="func-Erf"></a>

```vertex
@inlinable public func Erf(_ x: float32) -> float32
```

Erf is the error function.

### func Erfc <a id="func-Erfc"></a>

```vertex
@inlinable public func Erfc(_ x: float32) -> float32
```

Erfc is 1 - Erf(x), without the cancellation that has for large x.

### func Exp <a id="func-Exp"></a>

```vertex
@inlinable public func Exp(_ x: float32) -> float32
```

Exp is e^x.

### func Exp <a id="func-Exp-2"></a>

```vertex
public func Exp(_ xIn: float64) -> float64
```

Exp is e^x.

### func Exp2 <a id="func-Exp2"></a>

```vertex
@inlinable public func Exp2(_ x: float32) -> float32
```

Exp2 is 2^x.

### func Exp2 <a id="func-Exp2-2"></a>

```vertex
public func Exp2(_ x: float64) -> float64
```

Exp2 is 2^x.

### func Expm1 <a id="func-Expm1"></a>

```vertex
public func Expm1(_ xIn: float64) -> float64
```

Expm1 is e^x - 1, accurate near zero.

### func Floor <a id="func-Floor"></a>

```vertex
@inlinable public func Floor(_ x: float32) -> float32
```

Floor is the greatest whole number not above x.

### func Floor <a id="func-Floor-2"></a>

```vertex
public func Floor(_ x: float64) -> float64
```

Floor is the greatest whole number not above x.

### func FloorDiv <a id="func-FloorDiv"></a>

```vertex
@inlinable public func FloorDiv(_ a: int, _ b: int) -> int
```

FloorDiv is a / b rounded toward negative infinity (Python's //), where
the / operator rounds toward zero. b must not be zero.

### func FloorDiv <a id="func-FloorDiv-2"></a>

```vertex
@inlinable public func FloorDiv(_ a: int64, _ b: int64) -> int64
```

### func FloorMod <a id="func-FloorMod"></a>

```vertex
@inlinable public func FloorMod(_ a: int, _ b: int) -> int
```

FloorMod is the remainder of FloorDiv: it takes b's sign (Python's %),
where the % operator takes a's.

### func FloorMod <a id="func-FloorMod-2"></a>

```vertex
@inlinable public func FloorMod(_ a: int64, _ b: int64) -> int64
```

### func FloorMod <a id="func-FloorMod-3"></a>

```vertex
@inlinable public func FloorMod(_ x: float32, _ y: float32) -> float32
```

FloorMod on floats is x - y·⌊x / y⌋: the remainder with y's sign, for
wrapping angles and hues into [0, y).

### func FloorMod <a id="func-FloorMod-4"></a>

```vertex
@inlinable public func FloorMod(_ x: float64, _ y: float64) -> float64
```

### func Fmod <a id="func-Fmod"></a>

```vertex
public func Fmod(_ x: float64, _ y: float64) -> float64
```

Fmod is the remainder of x / y with x's sign, exact (C's fmod).

### func Frexp <a id="func-Frexp"></a>

```vertex
@inlinable public func Frexp(_ x: float32) -> (float32, int32)
```

Frexp is x as m · 2^e with m in [0.5, 1), for a finite nonzero x; x
and 0 otherwise.

### func Frexp <a id="func-Frexp-2"></a>

```vertex
public func Frexp(_ x: float64) -> (fraction: float64, exponent: int)
```

Frexp splits x into a fraction in [0.5, 1) and a power of two: x = f · 2^e.

### func Hypot <a id="func-Hypot"></a>

```vertex
public func Hypot(_ x: float64, _ y: float64) -> float64
```

Hypot is √(x² + y²) without undue overflow or underflow.

### func Ldexp <a id="func-Ldexp"></a>

```vertex
@inlinable public func Ldexp(_ x: float32, _ n: int32) -> float32
```

Ldexp is x · 2^n, exactly where the result is representable.

### func Ldexp <a id="func-Ldexp-2"></a>

```vertex
public func Ldexp(_ x: float64, _ n: int) -> float64
```

Ldexp is x · 2^n, correctly rounded (C's scalbn).

### func Lerp <a id="func-Lerp"></a>

```vertex
@inlinable public func Lerp(_ a: float32, _ b: float32, _ t: float32) -> float32
```

Lerp is a + (b - a)·t: a at t = 0, b at t = 1.

### func Lerp <a id="func-Lerp-2"></a>

```vertex
@inlinable public func Lerp(_ a: float64, _ b: float64, _ t: float64) -> float64
```

### func Log <a id="func-Log"></a>

```vertex
@inlinable public func Log(_ x: float32) -> float32
```

Log is the natural logarithm: NaN below zero, -infinity at zero.

### func Log <a id="func-Log-2"></a>

```vertex
public func Log(_ xIn: float64) -> float64
```

Log is the natural logarithm; -∞ at zero, NaN below it.

### func Log10 <a id="func-Log10"></a>

```vertex
@inlinable public func Log10(_ x: float32) -> float32
```

Log10 is the base-10 logarithm.

### func Log10 <a id="func-Log10-2"></a>

```vertex
public func Log10(_ xIn: float64) -> float64
```

Log10 is the base-10 logarithm.

### func Log1p <a id="func-Log1p"></a>

```vertex
public func Log1p(_ x: float64) -> float64
```

Log1p is ln(1 + x), accurate near zero.

### func Log2 <a id="func-Log2"></a>

```vertex
@inlinable public func Log2(_ x: float32) -> float32
```

Log2 is the base-2 logarithm.

### func Log2 <a id="func-Log2-2"></a>

```vertex
public func Log2(_ xIn: float64) -> float64
```

Log2 is the base-2 logarithm; exact at powers of two.

### func Max <a id="func-Max"></a>

```vertex
@inlinable public func Max(_ x: float32, _ y: float32) -> float32
```

Max is the greater of x and y; a NaN loses to a number.

### func Max <a id="func-Max-2"></a>

```vertex
public func Max(_ x: float64, _ y: float64) -> float64
```

Max is the greater of x and y; a NaN loses to a number.

### func Min <a id="func-Min"></a>

```vertex
@inlinable public func Min(_ x: float32, _ y: float32) -> float32
```

Min is the lesser of x and y; a NaN loses to a number.

### func Min <a id="func-Min-2"></a>

```vertex
public func Min(_ x: float64, _ y: float64) -> float64
```

Min is the lesser of x and y; a NaN loses to a number.

### func Modf <a id="func-Modf"></a>

```vertex
public func Modf(_ x: float64) -> (whole: float64, fraction: float64)
```

Modf splits x into its whole part and its fraction, both with x's sign.

### func NextDown <a id="func-NextDown"></a>

```vertex
public func NextDown(_ x: float64) -> float64
```

NextDown is the greatest double below x.

### func NextUp <a id="func-NextUp"></a>

```vertex
public func NextUp(_ x: float64) -> float64
```

NextUp is the least double above x.

### func Pow <a id="func-Pow"></a>

```vertex
public func Pow(_ x: float64, _ y: float64) -> float64
```

Pow is x^y, with C99's special cases (pow(1, y) and pow(x, 0) are 1,
even for a NaN).

### func Remainder <a id="func-Remainder"></a>

```vertex
public func Remainder(_ x: float64, _ y: float64) -> float64
```

Remainder is IEEE 754's remainder: x - n·y for the n nearest x / y.

### func Round <a id="func-Round"></a>

```vertex
@inlinable public func Round(_ x: float32) -> float32
```

Round is the nearest whole number, ties to even.

### func Round <a id="func-Round-2"></a>

```vertex
public func Round(_ x: float64) -> float64
```

Round is the nearest whole number, ties to even.

### func RoundHalfAway <a id="func-RoundHalfAway"></a>

```vertex
public func RoundHalfAway(_ x: float64) -> float64
```

RoundHalfAway is the nearest whole number, ties away from zero (C's round).

### func RoundToInt <a id="func-RoundToInt"></a>

```vertex
@inlinable public func RoundToInt(_ x: float32) -> int32
```

RoundToInt is x rounded to the nearest int32, ties to even (C's lrintf);
out-of-range values and NaN give 0 rather than trapping.

### func Rsqrt <a id="func-Rsqrt"></a>

```vertex
@inlinable public func Rsqrt(_ x: float32) -> float32
```

Rsqrt is 1 / Sqrt(x).

### func Saturate <a id="func-Saturate"></a>

```vertex
@inlinable public func Saturate(_ x: float32) -> float32
```

Saturate is x limited to [0, 1], as shading languages name it.

### func Saturate <a id="func-Saturate-2"></a>

```vertex
@inlinable public func Saturate(_ x: float64) -> float64
```

### func Sigmoid <a id="func-Sigmoid"></a>

```vertex
@inlinable public func Sigmoid(_ x: float32) -> float32
```

Sigmoid is 1 / (1 + e^-x), without overflow at either end.

### func Sin <a id="func-Sin"></a>

```vertex
@inlinable public func Sin(_ x: float32) -> float32
```

Sin is the sine of x radians.

### func Sin <a id="func-Sin-2"></a>

```vertex
public func Sin(_ x: float64) -> float64
```

Sin is the sine of x (in radians).

### func Sinh <a id="func-Sinh"></a>

```vertex
public func Sinh(_ x: float64) -> float64
```

Sinh is the hyperbolic sine.

### func Sqrt <a id="func-Sqrt"></a>

```vertex
@inlinable public func Sqrt(_ x: float32) -> float32
```

Sqrt is the square root, correctly rounded; NaN for a negative x.

### func Sqrt <a id="func-Sqrt-2"></a>

```vertex
public func Sqrt(_ x: float64) -> float64
```

Sqrt is the square root, correctly rounded; NaN for a negative x.

### func Tan <a id="func-Tan"></a>

```vertex
@inlinable public func Tan(_ x: float32) -> float32
```

Tan is the tangent of x radians.

### func Tan <a id="func-Tan-2"></a>

```vertex
public func Tan(_ x: float64) -> float64
```

Tan is the tangent of x (in radians).

### func Tanh <a id="func-Tanh"></a>

```vertex
@inlinable public func Tanh(_ x: float32) -> float32
```

Tanh is the hyperbolic tangent.

### func Tanh <a id="func-Tanh-2"></a>

```vertex
public func Tanh(_ x: float64) -> float64
```

Tanh is the hyperbolic tangent.

### func Trunc <a id="func-Trunc"></a>

```vertex
@inlinable public func Trunc(_ x: float32) -> float32
```

Trunc is x with its fraction dropped, towards zero.

### func Trunc <a id="func-Trunc-2"></a>

```vertex
public func Trunc(_ x: float64) -> float64
```

Trunc is x with its fraction dropped, towards zero.

### func _cosPoly <a id="func-_cosPoly"></a>

```vertex
@inlinable public func _cosPoly(_ r: float32) -> float32
```

### func _erfc <a id="func-_erfc"></a>

```vertex
@inlinable public func _erfc(_ a: float32) -> float32
```

_erfc is erfc(a) for a >= 1: e^-a² / a · P(1/a), P fitted to the
function at Chebyshev nodes (relative error under 2^-26) on each of
[1, 2] and [2, 9.2].

### func _expNegSquare <a id="func-_expNegSquare"></a>

```vertex
@inlinable public func _expNegSquare(_ a: float32) -> float32
```

_expNegSquare is e^(-a·a) without the rounding of a·a, which would
cost up to ~80 ULPs near a = 9: a is split into a head of twelve bits,
whose square is exact, and a tail.

### func _reduceQuarterPi <a id="func-_reduceQuarterPi"></a>

```vertex
@inlinable public func _reduceQuarterPi(_ x: float32) -> (int32, float32)
```

_reduceQuarterPi is x reduced by multiples of π/4 for Sin and Cos: the
octant j (0...7) and the remainder, |r| <= π/4 or a hair over. π/4 is
taken in five pieces of at most ten significant bits, so each y·piece
is exact for y below 2^14: |x| up to about 12,000 reduces with no
digits lost. Beyond that the error grows with x.

### func _sinPoly <a id="func-_sinPoly"></a>

```vertex
@inlinable public func _sinPoly(_ r: float32) -> float32
```

## Files

- common.vs
- float32.vs
- float64.vs
