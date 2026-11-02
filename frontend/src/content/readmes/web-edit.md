# web/edit

Caret movement and text editing over UTF-8: characters, words, lines.

```vertex
import "web/edit"
```

## Functions

- `func Insert(s: string, at index: int, insertion: [uint8]) -> string`: The text with bytes inserted at an offset, clamped to the text.
- `func Remove(s: string, from start: int, to end: int) -> string`: The text with bytes[start..<end] removed.
- `func PreviousChar(b: [uint8], i: int) -> int`: The offset of the character before i.
- `func NextChar(b: [uint8], i: int) -> int`: The offset of the character after i.
- `func IsCharStart(b: [uint8], i: int) -> bool`: Whether i starts a character rather than continuing one.
- `func WordStart(b: [uint8], before i: int) -> int`: The start of the word before i, skipping the spaces before it.
- `func WordEnd(b: [uint8], after i: int) -> int`: The end of the word after i, skipping the spaces after it.
- `func WordAt(b: [uint8], offset: int) -> (start: int, end: int)`: The word, or the run of spaces, at an offset: what a double click selects.
- `func LineMove(b: [uint8], caret: int, up: bool) -> int`: The caret moved a line up or down in multi-line text, keeping its column where the line allows.
- `func LineRange(b: [uint8], row: int) -> (start: int, end: int)`: The line of multi-line text a row index falls on: its byte range.
- and 1 more

Part of the [`web`](https://github.com/vertex-language/web) repository.
