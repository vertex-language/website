# package term

```vertex
import "os/term"
```

## Index

- [`func ColorEnabled(_ s: Stream) -> bool`](#func-ColorEnabled)
- [`func GetSize(_ s: Stream) -> Size?`](#func-GetSize)
- [`func IsTerminal(_ s: Stream) -> bool`](#func-IsTerminal)
- [`func Raw(_ s: Stream, _ body: () throws -> Void) throws`](#func-Raw)
- [`func ReadPassword(prompt: string) throws -> string`](#func-ReadPassword)
- [`enum Color: Equatable`](#enum-Color)
- [`struct Size`](#struct-Size)
  - [`let Columns: int`](#Size.Columns)
  - [`let Rows: int`](#Size.Rows)
- [`enum Stream: Equatable`](#enum-Stream)
- [`struct Style`](#struct-Style)
  - [`init(for stream: Stream = .stdout)`](#Style.init)
  - [`func Foreground(_ c: Color) -> Style`](#Style.Foreground)
  - [`func Background(_ c: Color) -> Style`](#Style.Background)
  - [`func Bold() -> Style`](#Style.Bold)
  - [`func Dim() -> Style`](#Style.Dim)
  - [`func Italic() -> Style`](#Style.Italic)
  - [`func Underline() -> Style`](#Style.Underline)
  - [`func Render(_ text: string) -> string`](#Style.Render)
- [`enum TermError: Error, CustomStringConvertible`](#enum-TermError)
  - [`var description: string { get }`](#TermError.description)

## Functions

### func ColorEnabled <a id="func-ColorEnabled"></a>

```vertex
public func ColorEnabled(_ s: Stream) -> bool
```

Whether text written to the stream should carry color, by the rules in
widest use: NO_COLOR set turns it off; CLICOLOR_FORCE set to anything
but "0" turns it on; otherwise it is on for a terminal whose TERM is not
"dumb".

### func GetSize <a id="func-GetSize"></a>

```vertex
public func GetSize(_ s: Stream) -> Size?
```

The terminal's size, or nil where the stream is not a terminal.

### func IsTerminal <a id="func-IsTerminal"></a>

```vertex
public func IsTerminal(_ s: Stream) -> bool
```

Whether the stream is connected to a terminal rather than a file or pipe.

### func Raw <a id="func-Raw"></a>

```vertex
public func Raw(_ s: Stream, _ body: () throws -> Void) throws
```

Puts the terminal in raw mode -- no echo, no line buffering, no signals
from keys -- for as long as `body` runs, and puts it back after, however
`body` ends.

### func ReadPassword <a id="func-ReadPassword"></a>

```vertex
public func ReadPassword(prompt: string) throws -> string
```

Prints `prompt` and reads a line from the terminal with echo off. It
reads the controlling terminal, not stdin, so a password comes from the
person at the keyboard even when stdin is redirected. Blocks the thread
until the line is entered.

## Types

### enum Color <a id="enum-Color"></a>

```vertex
public enum Color: Equatable
```

A terminal color: the eight standard ones and their bright forms.

#### Cases

<a id="Color.black"></a>

```vertex
case black
```

<a id="Color.red"></a>

```vertex
case red
```

<a id="Color.green"></a>

```vertex
case green
```

<a id="Color.yellow"></a>

```vertex
case yellow
```

<a id="Color.blue"></a>

```vertex
case blue
```

<a id="Color.magenta"></a>

```vertex
case magenta
```

<a id="Color.cyan"></a>

```vertex
case cyan
```

<a id="Color.white"></a>

```vertex
case white
```

<a id="Color.brightBlack"></a>

```vertex
case brightBlack
```

<a id="Color.brightRed"></a>

```vertex
case brightRed
```

<a id="Color.brightGreen"></a>

```vertex
case brightGreen
```

<a id="Color.brightYellow"></a>

```vertex
case brightYellow
```

<a id="Color.brightBlue"></a>

```vertex
case brightBlue
```

<a id="Color.brightMagenta"></a>

```vertex
case brightMagenta
```

<a id="Color.brightCyan"></a>

```vertex
case brightCyan
```

<a id="Color.brightWhite"></a>

```vertex
case brightWhite
```

### struct Size <a id="struct-Size"></a>

```vertex
public struct Size
```

A terminal's size in character cells.

#### Properties

<a id="Size.Columns"></a>

```vertex
public let Columns: int
```

<a id="Size.Rows"></a>

```vertex
public let Rows: int
```

### enum Stream <a id="enum-Stream"></a>

```vertex
public enum Stream: Equatable
```

One of the process's standard streams.

#### Cases

<a id="Stream.stdin"></a>

```vertex
case stdin
```

<a id="Stream.stdout"></a>

```vertex
case stdout
```

<a id="Stream.stderr"></a>

```vertex
case stderr
```

### struct Style <a id="struct-Style"></a>

```vertex
public struct Style
```

How text is drawn: a foreground and background color and attributes,
built up a call at a time and applied with `Render`.

```vertex
let warn = term.Style(for: .stderr).Bold().Foreground(.yellow)
print(warn.Render("warning:") + " disk almost full")
```

`Render` adds escapes only where `ColorEnabled` says the stream takes
them, so styled output is plain text in a pipe or a file.

#### Initializers

<a id="Style.init"></a>

```vertex
public init(for stream: Stream = .stdout)
```

A plain style for text written to the stream, stdout unless said.

#### Methods

<a id="Style.Foreground"></a>

```vertex
public func Foreground(_ c: Color) -> Style
```

<a id="Style.Background"></a>

```vertex
public func Background(_ c: Color) -> Style
```

<a id="Style.Bold"></a>

```vertex
public func Bold() -> Style
```

<a id="Style.Dim"></a>

```vertex
public func Dim() -> Style
```

<a id="Style.Italic"></a>

```vertex
public func Italic() -> Style
```

<a id="Style.Underline"></a>

```vertex
public func Underline() -> Style
```

<a id="Style.Render"></a>

```vertex
public func Render(_ text: string) -> string
```

The text wrapped in this style's escapes, or the text as it is where
the stream does not take color.

### enum TermError <a id="enum-TermError"></a>

```vertex
public enum TermError: Error, CustomStringConvertible
```

TermError is how a terminal operation fails.

#### Cases

<a id="TermError.notATerminal"></a>

```vertex
case notATerminal
```

<a id="TermError.tooLong"></a>

```vertex
case tooLong
```

<a id="TermError.system"></a>

```vertex
case system(code: int32)
```

#### Properties

<a id="TermError.description"></a>

```vertex
public var description: string { get }
```

## Files

- style.vs
- term.vs
