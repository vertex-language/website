# package edit

```vertex
import "web/edit"
```

## Index

- [`func FirstLine(b: [uint8]) -> [uint8]`](#func-FirstLine)
- [`func Insert(s: string, at index: int, insertion: [uint8]) -> string`](#func-Insert)
- [`func IsCharStart(b: [uint8], i: int) -> bool`](#func-IsCharStart)
- [`func LineMove(b: [uint8], caret: int, up: bool) -> int`](#func-LineMove)
- [`func LineRange(b: [uint8], row: int) -> (start: int, end: int)`](#func-LineRange)
- [`func NextChar(b: [uint8], i: int) -> int`](#func-NextChar)
- [`func PreviousChar(b: [uint8], i: int) -> int`](#func-PreviousChar)
- [`func Remove(s: string, from start: int, to end: int) -> string`](#func-Remove)
- [`func WordAt(b: [uint8], offset: int) -> (start: int, end: int)`](#func-WordAt)
- [`func WordEnd(b: [uint8], after i: int) -> int`](#func-WordEnd)
- [`func WordStart(b: [uint8], before i: int) -> int`](#func-WordStart)

## Functions

### func FirstLine <a id="func-FirstLine"></a>

```vertex
public func FirstLine(b: [uint8]) -> [uint8]
```

The first line of text, for a single-line field taking a paste.

### func Insert <a id="func-Insert"></a>

```vertex
public func Insert(s: string, at index: int, insertion: [uint8]) -> string
```

The text with bytes inserted at an offset, clamped to the text.

### func IsCharStart <a id="func-IsCharStart"></a>

```vertex
public func IsCharStart(b: [uint8], i: int) -> bool
```

Whether i starts a character rather than continuing one.

### func LineMove <a id="func-LineMove"></a>

```vertex
public func LineMove(b: [uint8], caret: int, up: bool) -> int
```

The caret moved a line up or down in multi-line text, keeping its
column where the line allows.

### func LineRange <a id="func-LineRange"></a>

```vertex
public func LineRange(b: [uint8], row: int) -> (start: int, end: int)
```

The line of multi-line text a row index falls on: its byte range.

### func NextChar <a id="func-NextChar"></a>

```vertex
public func NextChar(b: [uint8], i: int) -> int
```

The offset of the character after i.

### func PreviousChar <a id="func-PreviousChar"></a>

```vertex
public func PreviousChar(b: [uint8], i: int) -> int
```

The offset of the character before i.

### func Remove <a id="func-Remove"></a>

```vertex
public func Remove(s: string, from start: int, to end: int) -> string
```

The text with bytes[start..<end] removed.

### func WordAt <a id="func-WordAt"></a>

```vertex
public func WordAt(b: [uint8], offset: int) -> (start: int, end: int)
```

The word, or the run of spaces, at an offset: what a double click
selects.

### func WordEnd <a id="func-WordEnd"></a>

```vertex
public func WordEnd(b: [uint8], after i: int) -> int
```

The end of the word after i, skipping the spaces after it.

### func WordStart <a id="func-WordStart"></a>

```vertex
public func WordStart(b: [uint8], before i: int) -> int
```

The start of the word before i, skipping the spaces before it.

## Files

- edit.vs
