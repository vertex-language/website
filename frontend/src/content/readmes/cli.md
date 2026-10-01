# cli

[![package: vs-package](https://img.shields.io/badge/package-vs--package-f4f4f5?style=flat-square&labelColor=e4e4e7&color=18181b)](https://github.com/vertex-language)
[![completions: bash | zsh | fish](https://img.shields.io/badge/completions-bash%20%7C%20zsh%20%7C%20fish-f4f4f5?style=flat-square&labelColor=e4e4e7&color=18181b)](https://github.com/vertex-language/cli)

Command-line interface toolkit: subcommands, options, flags, positional arguments, environment fallbacks, auto-generated help, and shell completions.

---

## Features

- **Nested Subcommands**: Hierarchical commands with aliases, descriptions, and separate flag scopes.
- **Flexible Options & Flags**:
  - Long options (`--port 8080` or `--port=8080`)
  - Short flags (`-p 8080`, `-p=8080`, or bundled `-xzvf`)
  - Boolean negation (`--no-verbose` resets `--verbose`)
  - Negative numeric value lookahead (`--offset -5` preserved as argument value)
- **Environment Integration**: Seamless fallbacks to environment variables via `os/env` when flags are omitted.
- **Strongly Typed Context**: Clean getters for strings, integers, floats, booleans, and positional arguments (`ctx.String`, `ctx.Int`, `ctx.Float`, `ctx.Bool`, `ctx.Arg`).
- **Raw Argument Terminator**: Full support for `--` to pass unprocessed flags and parameters directly to downstream tools.
- **Auto-Generated Help & Version**: GNU/POSIX-aligned help screens (`-h`, `--help`, `help <subcmd>`) and version output (`-V`, `--version`).
- **Shell Completions**: First-class completion generators for Bash, Zsh, and Fish.

---

## Quick Start

Run the test suite in `cmd/` directly with `vsc run`:

```bash
vsc run check
```

### Basic Application

```swift
package main

import "cli"

func main() async -> int32 {
    let app = cli.App(
        name: "server",
        about: "HTTP and API server daemon",
        version: "1.0.0"
    )

    let _ = app.Option("host", short: "H", default: "127.0.0.1", help: "Bind address", env: "HOST")
    let _ = app.Option("port", short: "p", default: "8080", help: "Listening port", env: "PORT")
    let _ = app.Flag("verbose", short: "v", help: "Enable debug logging")

    app.ActionSync { ctx in
        let host = ctx.StringOr("host", "127.0.0.1")
        let port = ctx.IntOr("port", 8080)
        let verbose = ctx.Bool("verbose")

        print("Starting server on \(host):\(port) (verbose: \(verbose))")
        return 0
    }

    return await app.Run()
}
```

---

## Subcommands

Define multi-level command hierarchies with custom actions and flags:

```swift
package main

import "cli"

func main() -> int32 {
    let app = cli.App(name: "vault", about: "Secure secrets manager", version: "0.2.0")

    // Global option available across subcommands
    let _ = app.Flag("quiet", short: "q", help: "Suppress non-essential messages")

    // Subcommand: set
    let _ = app.Command("set", about: "Store a key-value pair", aliases: ["s"], configure: { cmd in
        let _ = cmd.Argument("key", help: "Secret name", required: true)
        let _ = cmd.Argument("value", help: "Secret payload", required: true)
        let _ = cmd.Flag("encrypt", short: "e", help: "Encrypt at rest")

        cmd.ActionSync { ctx in
            let key = ctx.ArgOr(0, "")
            let val = ctx.ArgOr(1, "")
            let enc = ctx.Bool("encrypt")
            print("Stored \(key)=\(val) (encrypted: \(enc))")
            return 0
        }
    })

    // Subcommand: get
    let _ = app.Command("get", about: "Retrieve a secret value", aliases: ["g"], configure: { cmd in
        let _ = cmd.Argument("key", help: "Secret name", required: true)

        cmd.ActionSync { ctx in
            let key = ctx.ArgOr(0, "")
            print("Reading secret for \(key)...")
            return 0
        }
    })

    return app.RunSync()
}
```

---

## Auto-Generated Help

Help screens are formatted with GNU/POSIX alignment automatically:

```text
Usage: vault [OPTIONS] [COMMAND]

Secure secrets manager

Commands:
  set       Store a key-value pair
  get       Retrieve a secret value
  help      Print this message or the help of the given subcommand(s)

Options:
  -q, --quiet        Suppress non-essential messages
  -h, --help         Print help
  -V, --version      Print version
```

---

## Shell Completions

Generate completion scripts dynamically:

```swift
// Bash completion
let bashScript = app.Completions(.bash)

// Zsh completion
let zshScript = app.Completions(.zsh)

// Fish completion
let fishScript = app.Completions(.fish)
```

---

## Testing

Run the test suite:

```bash
vsc run check
```

---

## License

[MIT](LICENSE)
