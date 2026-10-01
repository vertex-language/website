# package html

```vertex
import "web/html"
```

## Index

- [`func Decode(_ bytes: [uint8], contentType: string? = nil) -> string`](#func-Decode)
- [`func DetectEncoding(_ bytes: [uint8], contentType: string? = nil) -> string`](#func-DetectEncoding)
- [`func EncodingForLabel(_ label: string) -> string?`](#func-EncodingForLabel)
- [`func Escape(_ text: string) -> string`](#func-Escape)
- [`func Parse(_ source: string) -> Document`](#func-Parse)
- [`func Parse(_ sourceBytes: borrowing [uint8]) -> Document`](#func-Parse-2)
- [`func ParseFragment(_ source: string) -> [Node]`](#func-ParseFragment)
- [`func Render(_ node: Node) -> string`](#func-Render)
- [`func Unescape(_ text: string) -> string`](#func-Unescape)
- [`struct Attribute: Equatable`](#struct-Attribute)
  - [`init(_ name: string, _ value: string = "")`](#Attribute.init)
  - [`var Name: string`](#Attribute.Name)
  - [`var Value: string`](#Attribute.Value)
- [`struct Document`](#struct-Document)
  - [`init(root: Node)`](#Document.init)
  - [`let Root: Node`](#Document.Root)
  - [`var Title: string { get }`](#Document.Title)
  - [`func ElementById(_ id: string) -> Node?`](#Document.ElementById)
  - [`func ElementsByTagName(_ tag: string) -> [Node]`](#Document.ElementsByTagName)
  - [`func ElementsByClassName(_ className: string) -> [Node]`](#Document.ElementsByClassName)
- [`class Node`](#class-Node)
  - [`init(kind: NodeKind, tagName: string = "", text: string = "", attributes: [Attribute] = [])`](#Node.init)
  - [`let Id: int64`](#Node.Id)
  - [`internal(set) var Kind: NodeKind`](#Node.Kind)
  - [`internal(set) var TagName: string`](#Node.TagName)
  - [`internal(set) var Attributes: [Attribute]`](#Node.Attributes)
  - [`internal(set) var Text: string`](#Node.Text)
  - [`internal(set) var Children: [Node]`](#Node.Children)
  - [`internal(set) weak var Parent: Node?`](#Node.Parent)
  - [`func GetAttribute(_ name: string) -> string?`](#Node.GetAttribute)
  - [`func HasAttribute(_ name: string) -> bool`](#Node.HasAttribute)
  - [`func IdAttr() -> string?`](#Node.IdAttr)
  - [`func Classes() -> [string]`](#Node.Classes)
  - [`func HasClass(_ className: string) -> bool`](#Node.HasClass)
  - [`func FirstChild() -> Node?`](#Node.FirstChild)
  - [`func LastChild() -> Node?`](#Node.LastChild)
  - [`func PreviousSibling() -> Node?`](#Node.PreviousSibling)
  - [`func NextSibling() -> Node?`](#Node.NextSibling)
  - [`func PreviousElementSibling() -> Node?`](#Node.PreviousElementSibling)
  - [`func NextElementSibling() -> Node?`](#Node.NextElementSibling)
  - [`func InnerText() -> string`](#Node.InnerText)
- [`enum NodeKind: Equatable`](#enum-NodeKind)
- [`class Parser`](#class-Parser)
  - [`init(scanner: Scanner)`](#Parser.init)
  - [`func Parse() -> Document`](#Parser.Parse)
- [`class Scanner`](#class-Scanner)
  - [`init(bytes: [uint8])`](#Scanner.init)
  - [`init(source: string)`](#Scanner.init-2)
  - [`func Next() -> Token`](#Scanner.Next)
  - [`func ScanRawTextUntilClose(tag: string) -> Token`](#Scanner.ScanRawTextUntilClose)
- [`struct Token`](#struct-Token)
  - [`init(kind: TokenKind, data: string = "", attributes: [Attribute] = [])`](#Token.init)
  - [`var Kind: TokenKind`](#Token.Kind)
  - [`var Data: string`](#Token.Data)
  - [`var Attributes: [Attribute]`](#Token.Attributes)
- [`enum TokenKind: Equatable`](#enum-TokenKind)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ bytes: [uint8], contentType: string? = nil) -> string
```

A document's bytes as text, in the encoding DetectEncoding finds. A
byte order mark is dropped; what doesn't decode becomes U+FFFD.

### func DetectEncoding <a id="func-DetectEncoding"></a>

```vertex
public func DetectEncoding(_ bytes: [uint8], contentType: string? = nil) -> string
```

The encoding a document's bytes are in, as the HTML standard finds it:
a byte order mark first, then the charset its HTTP Content-Type names,
then a <meta charset> or <meta http-equiv=content-type> in its first
1024 bytes, and UTF-8 otherwise. One of "utf-8", "utf-16le",
"utf-16be" and "windows-1252" -- the labels the web uses map onto
those (iso-8859-1, latin1 and ascii are windows-1252).

### func EncodingForLabel <a id="func-EncodingForLabel"></a>

```vertex
public func EncodingForLabel(_ label: string) -> string?
```

The encoding a label names, or nil for one not supported here.

### func Escape <a id="func-Escape"></a>

```vertex
public func Escape(_ text: string) -> string
```

Escapes special HTML characters (`&`, `<`, `>`, `"`, `'`).

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ source: string) -> Document
```

Parses an HTML source string into a Document tree.

### func Parse <a id="func-Parse-2"></a>

```vertex
public func Parse(_ sourceBytes: borrowing [uint8]) -> Document
```

Parses HTML bytes into a Document tree.

### func ParseFragment <a id="func-ParseFragment"></a>

```vertex
public func ParseFragment(_ source: string) -> [Node]
```

Parses an HTML fragment and returns the top-level nodes.

### func Render <a id="func-Render"></a>

```vertex
public func Render(_ node: Node) -> string
```

Serializes an HTML Node or Document tree into an HTML string.

### func Unescape <a id="func-Unescape"></a>

```vertex
public func Unescape(_ text: string) -> string
```

Decodes standard HTML entities in text (e.g. `&amp;`, `&lt;`, `&#65;`).

## Types

### struct Attribute <a id="struct-Attribute"></a>

```vertex
public struct Attribute: Equatable
```

An attribute on an HTML element, such as `class="btn"`.

#### Initializers

<a id="Attribute.init"></a>

```vertex
public init(_ name: string, _ value: string = "")
```

#### Properties

<a id="Attribute.Name"></a>

```vertex
public var Name: string
```

<a id="Attribute.Value"></a>

```vertex
public var Value: string
```

### struct Document <a id="struct-Document"></a>

```vertex
public struct Document
```

An HTML document containing a root document node.

#### Initializers

<a id="Document.init"></a>

```vertex
public init(root: Node)
```

#### Properties

<a id="Document.Root"></a>

```vertex
public let Root: Node
```

<a id="Document.Title"></a>

```vertex
public var Title: string { get }
```

The page title from `<title>`, or empty string if not found.

#### Methods

<a id="Document.ElementById"></a>

```vertex
public func ElementById(_ id: string) -> Node?
```

Finds the first element with the given ID.

<a id="Document.ElementsByTagName"></a>

```vertex
public func ElementsByTagName(_ tag: string) -> [Node]
```

Finds all elements with the given tag name (case-insensitive).

<a id="Document.ElementsByClassName"></a>

```vertex
public func ElementsByClassName(_ className: string) -> [Node]
```

Finds all elements containing the specified class name.

### class Node <a id="class-Node"></a>

```vertex
public class Node
```

A node in the HTML document tree. Everyone reads it; only the parser
and `web/dom` change it, and `web/dom` records each change in its
document's journal, which is how the rest of the engine learns of it.

#### Initializers

<a id="Node.init"></a>

```vertex
public init(kind: NodeKind, tagName: string = "", text: string = "", attributes: [Attribute] = [])
```

#### Properties

<a id="Node.Id"></a>

```vertex
public let Id: int64
```

<a id="Node.Kind"></a>

```vertex
public internal(set) var Kind: NodeKind
```

<a id="Node.TagName"></a>

```vertex
public internal(set) var TagName: string
```

<a id="Node.Attributes"></a>

```vertex
public internal(set) var Attributes: [Attribute]
```

<a id="Node.Text"></a>

```vertex
public internal(set) var Text: string
```

<a id="Node.Children"></a>

```vertex
public internal(set) var Children: [Node]
```

<a id="Node.Parent"></a>

```vertex
public internal(set) weak var Parent: Node?
```

#### Methods

<a id="Node.GetAttribute"></a>

```vertex
public func GetAttribute(_ name: string) -> string?
```

Looks up an attribute value by name. Names are lowercase as the
parser stores them, and a name asked for in any case is found.

<a id="Node.HasAttribute"></a>

```vertex
public func HasAttribute(_ name: string) -> bool
```

Whether the element has the specified attribute.

<a id="Node.IdAttr"></a>

```vertex
public func IdAttr() -> string?
```

The `id` attribute of this element if present.

<a id="Node.Classes"></a>

```vertex
public func Classes() -> [string]
```

All class names specified on this element.

<a id="Node.HasClass"></a>

```vertex
public func HasClass(_ className: string) -> bool
```

Returns true if this element contains the specified class.

<a id="Node.FirstChild"></a>

```vertex
public func FirstChild() -> Node?
```

Returns the first child node, or nil.

<a id="Node.LastChild"></a>

```vertex
public func LastChild() -> Node?
```

Returns the last child node, or nil.

<a id="Node.PreviousSibling"></a>

```vertex
public func PreviousSibling() -> Node?
```

Returns the previous sibling node in the parent's children list.

<a id="Node.NextSibling"></a>

```vertex
public func NextSibling() -> Node?
```

Returns the next sibling node in the parent's children list.

<a id="Node.PreviousElementSibling"></a>

```vertex
public func PreviousElementSibling() -> Node?
```

Returns the previous sibling element, skipping text and comment nodes.

<a id="Node.NextElementSibling"></a>

```vertex
public func NextElementSibling() -> Node?
```

Returns the next sibling element, skipping text and comment nodes.

<a id="Node.InnerText"></a>

```vertex
public func InnerText() -> string
```

Extracts all text content recursively from this node and its descendants.

### enum NodeKind <a id="enum-NodeKind"></a>

```vertex
public enum NodeKind: Equatable
```

The kind of node in the HTML DOM tree.

#### Cases

<a id="NodeKind.document"></a>

```vertex
case document
```

<a id="NodeKind.element"></a>

```vertex
case element
```

<a id="NodeKind.text"></a>

```vertex
case text
```

<a id="NodeKind.comment"></a>

```vertex
case comment
```

### class Parser <a id="class-Parser"></a>

```vertex
public class Parser
```

Parses HTML tokens into an HTML Document tree.

Tags that the standard lets a page leave out are closed as the
standard closes them: a `<p>` ends at the next block, an `<li>` at the
next `<li>`, a cell at the next cell. A document without `<html>`,
`<head>` and `<body>` gets them, with what belongs in the head moved
there, as a browser's tree builder does.

#### Initializers

<a id="Parser.init"></a>

```vertex
public init(scanner: Scanner)
```

#### Methods

<a id="Parser.Parse"></a>

```vertex
public func Parse() -> Document
```

Parses the entire HTML stream and returns the Document.

### class Scanner <a id="class-Scanner"></a>

```vertex
public class Scanner
```

Tokenizer that scans HTML source bytes into Token stream.

#### Initializers

<a id="Scanner.init"></a>

```vertex
public init(bytes: [uint8])
```

<a id="Scanner.init-2"></a>

```vertex
public init(source: string)
```

#### Methods

<a id="Scanner.Next"></a>

```vertex
public func Next() -> Token
```

Fetches the next token from the HTML stream.

<a id="Scanner.ScanRawTextUntilClose"></a>

```vertex
public func ScanRawTextUntilClose(tag: string) -> Token
```

Scans raw text until the matching closing tag </tagName> for `<script>` and `<style>`.

### struct Token <a id="struct-Token"></a>

```vertex
public struct Token
```

A token emitted during HTML scanning.

#### Initializers

<a id="Token.init"></a>

```vertex
public init(kind: TokenKind, data: string = "", attributes: [Attribute] = [])
```

#### Properties

<a id="Token.Kind"></a>

```vertex
public var Kind: TokenKind
```

<a id="Token.Data"></a>

```vertex
public var Data: string
```

<a id="Token.Attributes"></a>

```vertex
public var Attributes: [Attribute]
```

### enum TokenKind <a id="enum-TokenKind"></a>

```vertex
public enum TokenKind: Equatable
```

The kind of HTML token produced by the scanner.

#### Cases

<a id="TokenKind.eof"></a>

```vertex
case eof
```

<a id="TokenKind.doctype"></a>

```vertex
case doctype
```

<a id="TokenKind.startTag"></a>

```vertex
case startTag
```

<a id="TokenKind.endTag"></a>

```vertex
case endTag
```

<a id="TokenKind.selfClosingTag"></a>

```vertex
case selfClosingTag
```

<a id="TokenKind.text"></a>

```vertex
case text
```

<a id="TokenKind.comment"></a>

```vertex
case comment
```

## Files

- encoding.vs
- entity.vs
- html.vs
- node.vs
- parser.vs
- render.vs
- scanner.vs
- token.vs
- util.vs
