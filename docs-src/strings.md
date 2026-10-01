---
slug: strings
title: Strings & Characters
description: UTF-8 strings with Unicode-correct counting, interpolation, multiline and raw literals, and the everyday string methods.
---

## Literals and interpolation

A `string` is a sequence of Unicode characters stored as UTF-8. Embed any expression with `\( )`.

```vertex
let name = "Vertex"
let version = 0.9
print("Welcome to \(name) \(version)")
print("2 + 2 = \(2 + 2)")
print("tab:\there, quote:\" backslash:\\ unicode:\u{1F680}")
```

Multiline literals use triple quotes. The indentation of the closing quotes is stripped from every line.

```vertex
let poem = """
    Roses are red,
      Violets are blue,
    Native binaries,
    No toolchain for you.
    """
print(poem)
```

Raw strings put a `#` before the quotes; escapes then need a matching `#`, so backslashes can be written freely.

```vertex
let pattern = #"\d+\.\d+"#
print(pattern)
print(#"interpolate with \#(1 + 1)"#)
```

## Characters and counting

`count` counts what a reader sees as characters (extended grapheme clusters), not bytes. Use `utf8.count` for the byte length.

```vertex
let word = "café"
print(word.count, word.utf8.count)

let flag = "🇯🇵"
print(flag.count, flag.unicodeScalars.count, flag.utf8.count)

for character in "héllo" {
    print(character, terminator: " ")
}
print("")
```

Because characters vary in size, a string is not indexed by integers. Use indices from the string itself.

```vertex
let s = "Hello, Vertex"
print(s[s.startIndex])
let i = s.index(s.startIndex, offsetBy: 7)
print(s[i])
print(s[i...])
print(s.first!, s.last!)
```

## Everyday methods

```vertex
let text = "  The quick brown fox  "
print(text.isEmpty, text.count)
print(text.uppercased())
print(text.lowercased())
print(text.hasPrefix("  The"), text.hasSuffix("fox  "))
print(text.contains("quick"))
print(text.split(separator: " "))
print(text.reversed().count)
```

Build up strings with `append` and `+=`, and take them apart with `split`, `prefix`, and `dropFirst`.

```vertex
var greeting = "Hello"
greeting += ", "
greeting.append("world")
greeting.append("!")
print(greeting)

let path = "usr/local/bin"
let parts = path.split(separator: "/")
print(parts, parts.count)
print(path.prefix(3), path.dropFirst(4))
print(parts.map { String($0) }.joined(separator: "::"))
```

Strings compare by canonical Unicode equivalence, so different encodings of the same text are equal.

```vertex
let composed = "caf\u{E9}"
let decomposed = "cafe\u{301}"
print(composed == decomposed)
print(composed.utf8.count, decomposed.utf8.count)
```

## Converting

```vertex
print(int("42") as Any, int("4x2") as Any)
print(double("3.5") as Any)
print(String(255, radix: 16), String(3.14159))
print(String(describing: [1, 2, 3]))
```
