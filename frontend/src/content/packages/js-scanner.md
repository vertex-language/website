# package scanner

```vertex
import "js/scanner"
```

Package scanner turns ECMAScript source text into tokens (ECMA-262 §12).

The scanner reads on demand. Two tokens depend on what the parser
expects, so the parser asks for them again: a "/" that starts an
expression is a regular expression (RescanRegExp), and a "}" that closes
a template substitution continues the template (RescanTemplate).

## Index

- [`func parseDecimal(_ text: string) -> float64`](#func-parseDecimal)
- [`enum ScanError: Error`](#enum-ScanError)
- [`final class Scanner`](#class-Scanner)
  - [`init(_ source: string)`](#Scanner.init)
  - [`let Source: string`](#Scanner.Source)
  - [`var Errors: [ScanError] = []`](#Scanner.Errors)
  - [`var Bytes: [uint8] { get }`](#Scanner.Bytes)
  - [`func Save() -> State`](#Scanner.Save)
  - [`func Restore(_ s: State)`](#Scanner.Restore)
  - [`func Slice(_ start: int, _ end: int) -> string`](#Scanner.Slice)
  - [`func Next() -> token.Token`](#Scanner.Next)
  - [`func RescanTemplate(_ t: token.Token) -> token.Token`](#Scanner.RescanTemplate)
  - [`func RescanRegExp(_ t: token.Token) -> token.Token`](#Scanner.RescanRegExp)
- [`struct State`](#struct-State)

## Functions

### func parseDecimal <a id="func-parseDecimal"></a>

```vertex
public func parseDecimal(_ text: string) -> float64
```

parseDecimal converts a decimal literal's digits (no separators) to the
nearest double.

## Types

### enum ScanError <a id="enum-ScanError"></a>

```vertex
public enum ScanError: Error
```

ScanError is a lexical error at a byte offset.

#### Cases

<a id="ScanError.error"></a>

```vertex
case error(message: string, pos: int)
```

### class Scanner <a id="class-Scanner"></a>

```vertex
public final class Scanner
```

Scanner reads tokens from UTF-8 source.

#### Initializers

<a id="Scanner.init"></a>

```vertex
public init(_ source: string)
```

#### Properties

<a id="Scanner.Source"></a>

```vertex
public let Source: string
```

<a id="Scanner.Errors"></a>

```vertex
public var Errors: [ScanError] = []
```

Errors collects lexical errors; the parser reports the first one.

<a id="Scanner.Bytes"></a>

```vertex
public var Bytes: [uint8] { get }
```

#### Methods

<a id="Scanner.Save"></a>

```vertex
public func Save() -> State
```

<a id="Scanner.Restore"></a>

```vertex
public func Restore(_ s: State)
```

<a id="Scanner.Slice"></a>

```vertex
public func Slice(_ start: int, _ end: int) -> string
```

Slice is the source text between two byte offsets.

<a id="Scanner.Next"></a>

```vertex
public func Next() -> token.Token
```

Next scans the next token. A "/" is scanned as division; the parser
rescans it where a regular expression may start.

<a id="Scanner.RescanTemplate"></a>

```vertex
public func RescanTemplate(_ t: token.Token) -> token.Token
```

RescanTemplate continues a template after a substitution: t is the
"}" token that closed it.

<a id="Scanner.RescanRegExp"></a>

```vertex
public func RescanRegExp(_ t: token.Token) -> token.Token
```

RescanRegExp scans a regular expression literal starting at the "/"
or "/=" token t. Text is the pattern, Raw the flags.

### struct State <a id="struct-State"></a>

```vertex
public struct State
```

State is a scanner position that Save returns and Restore goes back to,
for the parser's lookahead.

## Files

- scanner.vs
