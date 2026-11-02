---
slug: stdlib
title: Standard Library
description: A tour of the standard packages, all written in Vertex with no third-party dependencies, and how to import them.
---

## Importing a package

A package is a folder, and the standard library is a family of packages published under `github.com/vertex-language`. Import one by its short path. Use the package name to reach what it exports.

```vertex
import "fs"
import "time"

let started = time.Instant.Now()
let pause = time.Duration.Milliseconds(1500)
print(pause.AsSeconds(), fs.Exists(fs.Path("/")))
print(started.Elapsed().AsMilliseconds() < 1000)
```

Group several imports in parentheses, and rename a package with an alias when two names would clash.

```vertex
import (
    "crypto/sha256"
    enc "encoding/hex"
)

let digest = sha256.Sum256("hello")
print(enc.EncodeToString(digest))
```

Every standard package is plain `.vs` source plus, where the operating system must be asked, a small C++ module. Nothing is a vendored C library, so behavior is the same on every platform.

## Files and time

`fs` has typed paths and whole-file helpers. The `/` operator joins path components.

```vertex
import "fs"

let dir = try fs.TempDir()
let file = dir / "notes.txt"
try fs.WriteText(file, "hello from vertex\n")
print(try fs.ReadText(file), terminator: "")
print(fs.Exists(file))
try fs.RemoveAll(dir)
print(fs.Exists(file))
```

## Hashing and encoding

```vertex
import (
    "crypto/sha256"
    "encoding/base64"
    "encoding/hex"
    "hash/crc32"
)

let bytes = [uint8]("Vertex".utf8)
print(hex.EncodeToString(bytes))

let encoded = base64.EncodeToString(bytes)
print(encoded)
print(try base64.DecodeString(encoded) == bytes)

print(sha256.ToHex(sha256.Sum256("hello")))
print(crc32.ChecksumString("hello"))
```

## JSON

`encoding/json` parses into a `Value` enum that keeps numbers exactly as written and objects in document order.

```vertex
import "encoding/json"

let doc = try json.Parse("""
    {"name": "vertex", "tags": ["fast", "safe"], "stars": 128}
    """)
print(doc["name"] as Any)
print(doc["tags"]?[1] as Any)
print(json.Encode(doc))
```

## Compression

```vertex
import "compress/gzip"

let original = [uint8](String(repeating: "vertex ", count: 200).utf8)
let packed = gzip.Compress(original)
let restored = try gzip.Decompress(packed)
print(original.count, packed.count < original.count, restored == original)
```

## Catalog

The full reference for every package, including each function and type, is in the [package index](/packages). By area:

| Area | Packages |
| --- | --- |
| Core and system | `os`, `fs`, `io`, `sync`, `time`, `gc`, `cli`, `log` |
| Data and formats | `encoding` (JSON, XML, hex, base64, PEM, ASN.1), `unicode`, `text`, `archive` (tar, zip), `compress` (flate, zlib, gzip, lz4), `image`, `media` |
| Networking | `net` (TCP, UDP, URL, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, QUIC, WebRTC) |
| Web and scripting | `web` (HTML, CSS, layout, paint), `js` (an ECMAScript engine), `ui` (windows and web views) |
| Security | `crypto` (AES, ChaCha20, RSA, SHA-2, HMAC, HKDF, TLS, X.509), `hash` (CRC, FNV, XXH3) |
| Data stores | `db` (SQL, SQLite, PostgreSQL, MySQL, Redis), `remote` (Hugging Face Hub, RDP) |
| Compute and AI | `gpu`, `tensor`, `nn`, `model`, `llm`, `tts`, `math` |

> info: `import "gpu"` is the one exception to the rule that a package is a folder of source. It is built into the compiler, because its kernels and device runtime are part of the language. See [Kernels](/docs/kernels).
