---
slug: reference
title: Language Reference
description: A compact reference for the parts of Vertex that go beyond the shared core: primitive spellings, receiver methods, execution modifiers, call-site labels, and operator precedence.
---

## Dialect model

Vertex is its own language that shares a foundation with Swift: the same intermediate representation (SIL), automatic reference counting, type layouts, calling conventions, and symbol mangling. The compiler `vsc` reads Vertex source (`.vs`) and also compiles Swift source (`.swift`) and Swift module interfaces (`.swiftinterface`) directly, so existing Swift code can be called with no wrapper. Everything described under the Vertex guide, from lowercase types to packages, is available only in `.vs` files.

## Primitive spellings

```text
VertexTypeName: one of
    bool char string void never
    int int8 int16 int32 int64
    uint uint8 uint16 uint32 uint64
    float float32 double float64
```

| Vertex | Core type | Notes |
| --- | --- | --- |
| `bool` | `Bool` | |
| `int`, `int8` ... `int64` | `Int`, `Int8` ... `Int64` | `int` is pointer-width |
| `uint`, `uint8` ... `uint64` | `UInt`, `UInt8` ... `UInt64` | `uint` is pointer-width |
| `float`, `float32` | `Float` | 32-bit IEEE 754 |
| `double`, `float64` | `Double` | 64-bit IEEE 754 |
| `string` | `String` | UTF-8 |
| `char` | `Character` | an extended grapheme cluster |
| `void`, `never` | `Void`, `Never` | |

Both spellings are always accepted and are the same type, so Vertex and Swift code mix freely.

## Declarations

### Package

```text
PackageDeclaration:
    package Identifier
```

It sets the module name used for symbols and for imports. If omitted, the name comes from the enclosing folder, or from `-module`. `func main()` in package `main` is the entry point. A `package` followed by a declaration keyword, as in `package func`, is the access modifier instead.

### Import

```text
ImportDeclaration:
    import ImportSpec
    import '(' { ImportSpec } ')'

ImportSpec:
    [Identifier] StringLiteral
```

A string imports a package directory. `./` and `../` are relative to the importing file, other paths resolve through the module, `-P` roots, and the standard library, and prebuilt interfaces are found through `-I`.

### Receiver methods

```text
FunctionDeclaration:
    [Attributes] [Modifiers] func [ReceiverClause] Name
        [GenericParameters] Signature [WhereClause] [Body]

ReceiverClause:
    '(' Identifier ':' [OwnershipModifier] Type ')'

OwnershipModifier: one of
    borrowing consuming inout
```

A receiver method is lowered to an extension method. It is statically dispatched and cannot be overridden. See [Receiver methods](/docs/receiver-methods).

### Execution modifiers

```text
Signature:
    '(' [Parameters] ')' [async] [throws] [ExecutionModifier] [-> Type]

ExecutionModifier: one of
    kernel graph
```

The modifier sits between `throws` and the result arrow. `kernel` compiles the function for a compute device (see [Kernels](/docs/kernels)). `graph` is reserved: it parses and type-checks, and lowering refuses it.

```vertex
import "gpu"

func scale(_ x: float32) kernel -> float32 {
    return x * 2
}

let xs = try await gpu.CPU().Upload([float32(1), 2, 3])
print(try await scale.Map(xs).Download())
```

## Call-site labels

Labels may be left out of a call when it stays unambiguous. Resolution proceeds in order:

1. A strict match against the declared labels.
2. If that fails, a match by argument position.
3. A compile error if positional matching leaves more than one candidate.

Labels are still required to tell overloads apart and where a variadic list ends. See [Functions & labels](/docs/functions).

## Operator precedence

From tightest to loosest binding. Operators on the same row associate as shown.

| Precedence | Operators | Associativity |
| --- | --- | --- |
| Bit shift | `<<` `>>` | none |
| Multiplication | `*` `/` `%` `&` `&*` | left |
| Addition | `+` `-` `\|` `^` `&+` `&-` | left |
| Range | `...` `..<` | none |
| Casting | `is` `as` `as?` `as!` | left |
| Nil-coalescing | `??` | right |
| Comparison | `<` `<=` `>` `>=` `==` `!=` `===` `~=` | none |
| Logical AND | `&&` | left |
| Logical OR | `\|\|` | left |
| Ternary | `? :` | right |
| Assignment | `=` `+=` `-=` `*=` `/=` and the compound forms | right |

```vertex
print(2 + 3 * 4, 1 << 2 + 1, 10 - 4 - 3)
let missing: int? = nil
print(1 + 2 == 3 && 4 > 3, missing ?? 5 + 1)
```

## Compilation outputs

`vsc build --emit` stops the pipeline at an earlier stage, which is how you look inside the compiler:

| `--emit` | Produces |
| --- | --- |
| `exe` | A linked executable (the default) |
| `obj` | An object file |
| `lib` | A shared library (`aarch64-android`) |
| `sil` | The ownership-verified intermediate representation |
| `rawsil` | The SIL as first generated, before the passes |
| `vir` | Vertex IR, the machine-level form |
| `interface` | The module's public interface, for other modules to compile against |

`vsc check` type-checks without building, `vsc ast` and `vsc tokens` dump the syntax tree and the token stream, `vsc doc` writes a package's documentation, and `vsc env` prints the resolved target. See the [CLI](/docs/cli) page for flags.

## Known limitations

These are current limits of the compiler, not of the language design, and they are being worked on:

- `graph` functions are reserved and are not lowered yet.
- Receiver methods cannot be declared on a generic type; use an [extension](/docs/extensions).
- Observed properties (`willSet`, `didSet`) need an explicit type annotation to use `newValue` and `oldValue`.
- `consuming` is most reliable on methods that hand a value on. Passing a value that owns heap storage as a `consuming` argument to a free function is not reliable yet.
- The lowercase `any` and `char` spellings are not fully wired up. Use `Any`, and avoid `char` literals, for now.
