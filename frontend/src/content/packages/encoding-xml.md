# package xml

```vertex
import "encoding/xml"
```

Package xml reads XML 1.0 documents: a stream of tokens from a Decoder,
or a tree of Elements from Parse.

It checks what makes a document well-formed -- one root element, tags
that match, attributes given once, references that name something --
and resolves namespaces, so a Name is the URI its prefix stood for and
the local part, as Go's encoding/xml has it. Names keep their case.
It reads UTF-8 (and ASCII). A DOCTYPE's internal entity declarations
are honoured; nothing is fetched and nothing is validated against it.

## Index

- [Constants](#constants)
- [`func Parse(_ text: string) throws -> Document`](#func-Parse)
- [`func Parse(bytes: [uint8]) throws -> Document`](#func-Parse-2)
- [`struct Attr`](#struct-Attr)
  - [`init(_ name: Name, _ value: string)`](#Attr.init)
  - [`var Name: Name`](#Attr.Name)
  - [`var Value: string`](#Attr.Value)
- [`final class Decoder`](#class-Decoder)
  - [`init(_ bytes: [uint8])`](#Decoder.init)
  - [`convenience init(_ text: string)`](#Decoder.init-2)
  - [`func Next() throws -> Token?`](#Decoder.Next)
- [`struct Document`](#struct-Document)
  - [`let Root: Element`](#Document.Root)
  - [`let Prolog: [Token]`](#Document.Prolog)
- [`final class Element`](#class-Element)
  - [`init(_ name: Name, attributes: [Attr] = [])`](#Element.init)
  - [`let Name: Name`](#Element.Name)
  - [`var Attributes: [Attr]`](#Element.Attributes)
  - [`var Children: [Node] = []`](#Element.Children)
  - [`weak var Parent: Element?`](#Element.Parent)
  - [`var Elements: [Element] { get }`](#Element.Elements)
  - [`var Text: string { get }`](#Element.Text)
  - [`func Attribute(_ local: string, space: string = "") -> string?`](#Element.Attribute)
  - [`func Descendants(_ local: string) -> [Element]`](#Element.Descendants)
- [`struct Name: Equatable`](#struct-Name)
  - [`init(_ local: string, space: string = "")`](#Name.init)
  - [`var Space: string`](#Name.Space)
  - [`var Local: string`](#Name.Local)
- [`enum Node`](#enum-Node)
- [`struct ProcInst`](#struct-ProcInst)
  - [`var Target: string`](#ProcInst.Target)
  - [`var Data: string`](#ProcInst.Data)
- [`struct StartElement`](#struct-StartElement)
  - [`var Name: Name`](#StartElement.Name)
  - [`var Attributes: [Attr]`](#StartElement.Attributes)
  - [`func Attribute(_ local: string, space: string = "") -> string?`](#StartElement.Attribute)
- [`struct SyntaxError: Error, CustomStringConvertible`](#struct-SyntaxError)
  - [`init(_ message: string, line: int, column: int)`](#SyntaxError.init)
  - [`let Message: string`](#SyntaxError.Message)
  - [`let Line: int`](#SyntaxError.Line)
  - [`let Column: int`](#SyntaxError.Column)
  - [`var description: string { get }`](#SyntaxError.description)
- [`enum Token`](#enum-Token)

## Constants

<a id="let-XMLNamespace"></a>

```vertex
public let XMLNamespace = "http://www.w3.org/XML/1998/namespace"
```

The namespace every document has bound to the prefix `xml`.

## Functions

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ text: string) throws -> Document
```

Parse reads a whole document into a tree.

### func Parse <a id="func-Parse-2"></a>

```vertex
public func Parse(bytes: [uint8]) throws -> Document
```

Parse reads a whole document from UTF-8 bytes into a tree.

## Types

### struct Attr <a id="struct-Attr"></a>

```vertex
public struct Attr
```

Attr is an attribute: its name and its value, references replaced.

#### Initializers

<a id="Attr.init"></a>

```vertex
public init(_ name: Name, _ value: string)
```

#### Properties

<a id="Attr.Name"></a>

```vertex
public var Name: Name
```

<a id="Attr.Value"></a>

```vertex
public var Value: string
```

### class Decoder <a id="class-Decoder"></a>

```vertex
public final class Decoder
```

Decoder reads a document a token at a time, checking as it goes that
the document is well-formed: Next throws a SyntaxError at the first
thing that isn't.

```vertex
let d = xml.Decoder(bytes)
while let tok = try d.Next() {
    if case .startElement(let e) = tok { print(e.Name.Local) }
}
```

#### Initializers

<a id="Decoder.init"></a>

```vertex
public init(_ bytes: [uint8])
```

<a id="Decoder.init-2"></a>

```vertex
public convenience init(_ text: string)
```

#### Methods

<a id="Decoder.Next"></a>

```vertex
public func Next() throws -> Token?
```

The next token, or nil once the root element has closed and only
comments, processing instructions and whitespace followed it.

### struct Document <a id="struct-Document"></a>

```vertex
public struct Document
```

Document is a parsed document: its root element, and what stands
before it -- the XML declaration, a DOCTYPE, comments.

#### Properties

<a id="Document.Root"></a>

```vertex
public let Root: Element
```

<a id="Document.Prolog"></a>

```vertex
public let Prolog: [Token]
```

### class Element <a id="class-Element"></a>

```vertex
public final class Element
```

Element is an element of a parsed document.

#### Initializers

<a id="Element.init"></a>

```vertex
public init(_ name: Name, attributes: [Attr] = [])
```

#### Properties

<a id="Element.Name"></a>

```vertex
public let Name: Name
```

<a id="Element.Attributes"></a>

```vertex
public var Attributes: [Attr]
```

<a id="Element.Children"></a>

```vertex
public var Children: [Node] = []
```

<a id="Element.Parent"></a>

```vertex
public weak var Parent: Element?
```

<a id="Element.Elements"></a>

```vertex
public var Elements: [Element] { get }
```

The child elements, in order.

<a id="Element.Text"></a>

```vertex
public var Text: string { get }
```

The text of the element and everything in it, joined.

#### Methods

<a id="Element.Attribute"></a>

```vertex
public func Attribute(_ local: string, space: string = "") -> string?
```

The value of the attribute with this local name and namespace.

<a id="Element.Descendants"></a>

```vertex
public func Descendants(_ local: string) -> [Element]
```

Every element inside this one with this local name, in document
order, whatever its namespace.

### struct Name <a id="struct-Name"></a>

```vertex
public struct Name: Equatable
```

Name is an element's or an attribute's name: the namespace URI its
prefix was bound to ("" for none) and its local part. An element
with no prefix is in the default namespace, where one is declared; an
attribute with none is in no namespace. A namespace declaration is
itself named as Go names it: xmlns:p as Space "xmlns", Local "p", and
a bare xmlns as Local "xmlns".

#### Initializers

<a id="Name.init"></a>

```vertex
public init(_ local: string, space: string = "")
```

#### Properties

<a id="Name.Space"></a>

```vertex
public var Space: string
```

<a id="Name.Local"></a>

```vertex
public var Local: string
```

### enum Node <a id="enum-Node"></a>

```vertex
public enum Node
```

Node is what an element holds: elements, text, comments and
processing instructions, in document order.

#### Cases

<a id="Node.element"></a>

```vertex
case element(Element)
```

<a id="Node.text"></a>

```vertex
case text(string)
```

<a id="Node.comment"></a>

```vertex
case comment(string)
```

<a id="Node.procInst"></a>

```vertex
case procInst(ProcInst)
```

### struct ProcInst <a id="struct-ProcInst"></a>

```vertex
public struct ProcInst
```

ProcInst is a processing instruction, <?target data?>. The XML
declaration, <?xml version="1.0"?>, is one.

#### Properties

<a id="ProcInst.Target"></a>

```vertex
public var Target: string
```

<a id="ProcInst.Data"></a>

```vertex
public var Data: string
```

### struct StartElement <a id="struct-StartElement"></a>

```vertex
public struct StartElement
```

StartElement is a start tag: the element's name and its attributes,
in document order.

#### Properties

<a id="StartElement.Name"></a>

```vertex
public var Name: Name
```

<a id="StartElement.Attributes"></a>

```vertex
public var Attributes: [Attr]
```

#### Methods

<a id="StartElement.Attribute"></a>

```vertex
public func Attribute(_ local: string, space: string = "") -> string?
```

The value of the attribute with this local name and namespace.

### struct SyntaxError <a id="struct-SyntaxError"></a>

```vertex
public struct SyntaxError: Error, CustomStringConvertible
```

SyntaxError says what was wrong with a document and where: the line
and the column, both from 1, the column in bytes.

#### Initializers

<a id="SyntaxError.init"></a>

```vertex
public init(_ message: string, line: int, column: int)
```

#### Properties

<a id="SyntaxError.Message"></a>

```vertex
public let Message: string
```

<a id="SyntaxError.Line"></a>

```vertex
public let Line: int
```

<a id="SyntaxError.Column"></a>

```vertex
public let Column: int
```

<a id="SyntaxError.description"></a>

```vertex
public var description: string { get }
```

### enum Token <a id="enum-Token"></a>

```vertex
public enum Token
```

Token is one piece of a document, as a Decoder reads it.

#### Cases

<a id="Token.startElement"></a>

```vertex
case startElement(StartElement)
```

A start tag. An empty-element tag, <a/>, is a start and then an end.

<a id="Token.endElement"></a>

```vertex
case endElement(Name)
```

<a id="Token.text"></a>

```vertex
case text(string)
```

Character data, references replaced, CDATA sections included, and
line ends as "\n". Whitespace between elements is text too.

<a id="Token.comment"></a>

```vertex
case comment(string)
```

<a id="Token.procInst"></a>

```vertex
case procInst(ProcInst)
```

<a id="Token.directive"></a>

```vertex
case directive(string)
```

A markup declaration, <!DOCTYPE ...>, as written between <! and >.

## Files

- decoder.vs
- error.vs
- name.vs
- token.vs
- tree.vs
