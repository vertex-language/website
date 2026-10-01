---
slug: cli
title: The vsc CLI
description: Every vsc command and flag: build, run, install, check, doc, ast, tokens, and env, the stages you can stop at, and the targets you can build for.
---

## Invocation

```text
vsc <command> [flags] [files...]
```

A file of `-`, or no file at all, reads source from standard input. Flags go before the files. Without arguments, `vsc` prints its usage.

## Commands

| Command | What it does |
| --- | --- |
| `vsc build` | Compile and link. With `--emit`, stop at an earlier stage. |
| `vsc run` | Build to a temporary path and run the result. |
| `vsc install` | Build programs into the bin directory. |
| `vsc check` | Parse and type-check, and print diagnostics. No output file. |
| `vsc doc` | Write a package's documentation as Markdown or HTML. |
| `vsc ast` | Parse and dump the syntax tree. |
| `vsc tokens` | Dump the token stream. |
| `vsc env` | Print the resolved target, the SDK, and the available targets. |

```bash
vsc run hello.vs
vsc build -o app main.vs
vsc check main.vs
```

When a folder is a package with a `cmd/` directory, name a program by its folder: `vsc run app` runs `cmd/app`. See [Packages & imports](/docs/packages).

## Common flags

| Flag | Meaning |
| --- | --- |
| `-target T` | The target to build for. The default is this host. |
| `-module name` | The module being compiled. The default is `main`. |
| `-P dir` | A package directory root, for string-form imports. Repeatable. |
| `-replace path=dir` | Use a local checkout for the imported package `path`. Repeatable. |
| `-offline` | Never fetch a package. Use the cache as it is. |
| `-update` | Fetch imported packages again, even if the cache holds them. |

## Flags for build and run

| Flag | Meaning |
| --- | --- |
| `--emit stage` | What to produce. See below. The default is `exe`. |
| `-o file` | Write output here. `-` is standard output, for `vir` and `sil`. |
| `-I dir` | Look for imported module interfaces here. Repeatable. |
| `-entry sym` | The program's entry symbol. The default is the platform's. |
| `-freestanding` | Link no platform libraries. |
| `-skip-verify` | Do not verify the SIL, so `--emit sil` and `--emit vir` print what the verifier would refuse. For debugging. |
| `--package-path dir` | Build the Swift package at `dir`. `vsc run [product]` runs one of its programs. |

The module name decides the entry point. `main` in module `main` is the program's, and every other module's `main` is an ordinary function, which is why `-module` defaults to `main` and why building a library means saying so.

## Choosing a stage with --emit

`--emit` decides how far the pipeline runs before `vsc` writes its result.

| Value | Output |
| --- | --- |
| `exe` | A linked executable. The default. |
| `obj` | An object file. |
| `lib` | A shared library (`aarch64-android`). |
| `sil` | The IR after the ownership passes, printed as SIL. |
| `rawsil` | The SIL as generated, before the passes verify it. |
| `vir` | The machine IR, Vertex IR, after lowering. |
| `interface` | The module's public face, for another module to compile against. |

```bash
vsc build --emit sil -o - main.vs
vsc build --emit vir -o - main.vs
vsc build --emit obj -o main.o main.vs
```

> info: `--emit asm`, `--emit device`, `-L`, `-l`, and `-static` are not available yet.

## Targets

`vsc env` lists the targets this build can produce. A build can target any of them from any host, but `vsc run` needs the machine's own target.

| Target | Format |
| --- | --- |
| `aarch64-macos` | Mach-O executable |
| `x86_64-linux` | ELF executable |
| `x86_64-windows` | PE/COFF executable |
| `aarch64-android` | ELF shared library (`--emit lib`) |

```bash
vsc build -target x86_64-linux -o app-linux main.vs
```

The linker is `vsc`'s own, so a build needs no `cc`, `as`, or `ld`. Building for Windows and Android additionally needs that platform's runtime libraries, described on the [SDK page](/sdk).

## Modules, interfaces, and imports

A string import names a package, not a file. A path that is a folder (`./util`, or one under a `-P` root) is compiled from there. A reserved name and a path that names a repository (`github.com/you/thing`) are fetched into the package cache the first time they are needed and read from it afterwards, so only the first build touches the network. Fetching is built into `vsc` and needs no `git`.

Use `-replace` to point an import at a checkout you are editing:

```bash
vsc run -replace github.com/you/thing=../thing main.vs
```

A module can also be imported by name through an *interface*. `--emit interface` writes the module's public face, `Geometry.vinterface`, and `import Geometry` looks for that file in each `-I` directory, in order. An interface is Vertex source with the bodies taken out, so compiling against one needs no separate module format.

```bash
vsc build --emit interface -module Geometry -o Geometry.vinterface geometry.vs
vsc check -I . uses.vs
```

> info: Interfaces let you type-check against a module without its source. Linking separately built objects into one executable (`-L`, `-l`, passing `.o` files) is not available yet, so a finished program is built from source, with packages found by path.

## Installing programs

`vsc install` builds programs into the bin directory, which is `$VERTEXBIN` or `~/.vertex/bin`, and names each for its folder.

```bash
vsc install                              # every program in this checkout's cmd/
vsc install stopwatch                    # this checkout's cmd/stopwatch
vsc install ./tools/gen                  # the program in a folder
vsc install github.com/you/tool/cmd/tool@v1.2    # fetched, built, installed
```

A program built with `-target` for another machine lands in a folder named for the target. A folder with no `.vs` files of its own but a `cmd/` folder stands for every program in `cmd/`. `vsc` tells you when the bin directory is not on your `PATH`.

## Documentation

`vsc doc` writes a package's documentation from the `///` (or `//`) comments above its declarations. The package's own comment is the one above its `package` clause, beginning "Package name".

```bash
vsc doc                          # this folder's package, as Markdown
vsc doc -o time.html time        # the time package, as an HTML page
```

| Flag | Meaning |
| --- | --- |
| `-format md\|html` | What to write. The default follows `-o`'s extension, otherwise Markdown. |
| `-o file` | Where to write it. The default is standard output. |
| `-all` | Every declaration, not only public and open ones. |

The package pages on this site are produced this way.

## Environment

| Variable | Default | Meaning |
| --- | --- | --- |
| `VERTEXBIN` | `~/.vertex/bin` | Where `vsc install` puts programs. |
| `VERTEXCACHE` | a `vertex` directory in the machine's cache directory | Where fetched packages are cached. Everything in it can be deleted, and a build fetches what it needs again. |
| `VSC_CPUPROFILE` | none | A file to write a CPU profile of the compiler to. |
| `GOGC` | `200` for `vsc` | The Go garbage collector target. `vsc` raises it for faster builds, and a value you set wins. |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | No errors. |
| `1` | Diagnostics with errors. |
| `2` | Usage or I/O error, such as a missing file. |

```bash
vsc check main.vs
```

```text
main.vs:1:14: error: cannot convert value of type 'String' to specified type 'Int'
    let x: int = "a"
                 ^
```
