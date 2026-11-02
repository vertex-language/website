---
slug: build-from-source
title: Build from Source
description: Compile the vsc toolchain from its Go source, install it, and inspect each stage of the compiler.
---

## Prerequisites

- Go 1.25 or newer, on your `PATH`
- `git`

Nothing else is required. `vsc` includes its own parser, code generators, assembler, and linkers for Mach-O, ELF, and PE, so there is no C toolchain to install, and a build takes a few seconds.

## Clone and install

```bash
git clone https://github.com/vertex-language/vsc.git
cd vsc/cmd
go install ./vsc
```

`go install` places `vsc` in `$GOPATH/bin` (usually `~/go/bin`). Add that directory to your `PATH` if it is not already there.

## Build without installing

To keep the binary inside the checkout instead:

```bash
cd vsc/cmd
go build -o vsc ./vsc
./vsc env
```

## Verify the build

`vsc` has no `version` command. Check the installation by printing the resolved environment and running a program:

```bash
vsc env
```

```vertex
print("toolchain ok")
```

Save the second snippet as `ok.vs` and run `vsc run ok.vs`.

## Looking inside the compiler

Every stage of the pipeline can be printed, which is useful both for learning how Vertex works and for reporting bugs. Take this file:

```text
let x = 1 + 2
print(x)
```

The scanner's token stream, with line and column:

```bash
vsc tokens h.vs
```

```text
1:1	let	"let"
1:5	IDENT	"x"
1:7	=	"="
1:9	INT_LIT	"1"
1:11	binary operator	"+"
1:13	INT_LIT	"2"
2:1	IDENT	"print"
...
```

The syntax tree:

```bash
vsc ast h.vs
```

```text
File 1:1
  DeclStmt 1:1
    VarDecl 1:1 let
      PatternBinding 1:5
        IdentPattern 1:5
          Ident 1:5 x
        SequenceExpr 1:9
          BasicLit 1:9 INT_LIT 1
          OperatorExpr 1:11 +
          BasicLit 1:13 INT_LIT 2
...
```

And the lowered forms. `--emit sil` stops after the ownership passes and prints SIL, and `--emit vir` prints the machine-level Vertex IR. Use `-o -` to write to standard output.

```bash
vsc check h.vs                       # type-check only
vsc build --emit sil -o - h.vs       # the SIL, after the ownership passes
vsc build --emit rawsil -o - h.vs    # the SIL as generated, before them
vsc build --emit vir -o - h.vs       # Vertex IR
```

```text
module main

use "aarch64/macos"

layout {
  abi        aapcs,
  endian     little,
  ptrbits    64,
  stackalign 16,
  extfloat   none,
  halffloat  f16, bf16,
}
...
```

## Sibling tools

The compiler is one of several repositories. The Vertex IR layer, `ir`, has its own driver, `vvm`, that compiles and runs IR modules (`.vir`) directly:

```bash
vvm run add.vir
vvm build math.vir main.vir -o myapp
```

You normally do not need it: `vsc` lowers to Vertex IR itself as part of a build.
