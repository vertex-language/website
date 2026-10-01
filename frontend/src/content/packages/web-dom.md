# package dom

```vertex
import "web/dom"
```

## Index

- [`func Ancestor(_ node: html.Node?, _ tag: string) -> html.Node?`](#func-Ancestor)
- [`func ButtonValue(_ button: html.Node) -> string`](#func-ButtonValue)
- [`func Contains(_ a: html.Node, _ b: html.Node) -> bool`](#func-Contains)
- [`func ControlAncestor(_ node: html.Node?) -> html.Node?`](#func-ControlAncestor)
- [`func Controls(_ node: html.Node) -> [html.Node]`](#func-Controls)
- [`func Descendants(_ node: html.Node, tag: string) -> [html.Node]`](#func-Descendants)
- [`func FocusOrder(_ root: html.Node) -> [html.Node]`](#func-FocusOrder)
- [`func FormData(_ form: html.Node, submitter: html.Node?, value: (html.Node) -> string) -> [FormField]`](#func-FormData)
- [`func InputType(_ node: html.Node) -> string`](#func-InputType)
- [`func IsButtonInput(_ node: html.Node) -> bool`](#func-IsButtonInput)
- [`func IsTextControl(_ node: html.Node) -> bool`](#func-IsTextControl)
- [`func LabelTarget(_ label: html.Node, in doc: html.Document?) -> html.Node?`](#func-LabelTarget)
- [`func LinkAncestor(_ node: html.Node?) -> html.Node?`](#func-LinkAncestor)
- [`func SelectedValue(_ select: html.Node) -> string`](#func-SelectedValue)
- [`struct ClassList`](#struct-ClassList)
  - [`init(_ element: Element)`](#ClassList.init)
  - [`var Values: [string] { get }`](#ClassList.Values)
  - [`func Contains(_ name: string) -> bool`](#ClassList.Contains)
  - [`func Add(_ name: string)`](#ClassList.Add)
  - [`func Remove(_ name: string)`](#ClassList.Remove)
  - [`func Toggle(_ name: string, force: bool? = nil) -> bool`](#ClassList.Toggle)
- [`final class CompositionEvent: Event`](#class-CompositionEvent)
- [`final class Document`](#class-Document)
  - [`init(_ tree: html.Document)`](#Document.init)
  - [`let Tree: html.Document`](#Document.Tree)
  - [`var Root: html.Node { get }`](#Document.Root)
  - [`var Title: string { get }`](#Document.Title)
  - [`var HasMutations: bool { get }`](#Document.HasMutations)
  - [`var PendingRecords: [MutationRecord] { get }`](#Document.PendingRecords)
  - [`var HasEventListeners: bool { get }`](#Document.HasEventListeners)
  - [`func ElementById(_ id: string) -> Element?`](#Document.ElementById)
  - [`func ElementFor(_ node: html.Node) -> Element`](#Document.ElementFor)
  - [`func TakeRecords() -> [MutationRecord]`](#Document.TakeRecords)
  - [`func CreateElement(_ tagName: string) -> html.Node`](#Document.CreateElement)
  - [`func CreateTextNode(_ text: string) -> html.Node`](#Document.CreateTextNode)
  - [`func SetAttribute(_ element: html.Node, _ name: string, _ value: string)`](#Document.SetAttribute)
  - [`func RemoveAttribute(_ element: html.Node, _ name: string)`](#Document.RemoveAttribute)
  - [`func ToggleAttribute(_ element: html.Node, _ name: string, force: bool? = nil) -> bool`](#Document.ToggleAttribute)
  - [`func AppendChild(_ parent: html.Node, _ child: html.Node)`](#Document.AppendChild)
  - [`func InsertBefore(_ parent: html.Node, _ child: html.Node, _ before: html.Node?)`](#Document.InsertBefore)
  - [`func RemoveChild(_ parent: html.Node, _ child: html.Node)`](#Document.RemoveChild)
  - [`func SetText(_ node: html.Node, _ text: string)`](#Document.SetText)
  - [`func SetTextContent(_ node: html.Node, _ text: string)`](#Document.SetTextContent)
  - [`func AddEventListener(_ node: html.Node, _ type: string, _ handler: (Event) -> void) -> ListenerID`](#Document.AddEventListener)
  - [`func RemoveEventListener(_ node: html.Node, _ id: ListenerID)`](#Document.RemoveEventListener)
  - [`func RemoveEventListeners(within node: html.Node)`](#Document.RemoveEventListeners)
  - [`func Dispatch(_ event: Event, to target: html.Node) -> bool`](#Document.Dispatch)
- [`final class DragEvent: Event`](#class-DragEvent)
- [`final class Element`](#class-Element)
  - [`init(_ node: html.Node, _ owner: Document)`](#Element.init)
  - [`let Node: html.Node`](#Element.Node)
  - [`let Owner: Document`](#Element.Owner)
  - [`var TagName: string { get }`](#Element.TagName)
  - [`var Id: string { get }`](#Element.Id)
  - [`var TextContent: string { get set }`](#Element.TextContent)
  - [`var ClassList: dom.ClassList { get }`](#Element.ClassList)
  - [`var Parent: Element? { get }`](#Element.Parent)
  - [`func GetAttribute(_ name: string) -> string?`](#Element.GetAttribute)
  - [`func HasAttribute(_ name: string) -> bool`](#Element.HasAttribute)
  - [`func SetAttribute(_ name: string, _ value: string)`](#Element.SetAttribute)
  - [`func RemoveAttribute(_ name: string)`](#Element.RemoveAttribute)
  - [`func ToggleAttribute(_ name: string, force: bool? = nil) -> bool`](#Element.ToggleAttribute)
  - [`func AppendChild(_ child: html.Node)`](#Element.AppendChild)
  - [`func InsertBefore(_ child: html.Node, _ before: html.Node?)`](#Element.InsertBefore)
  - [`func Remove()`](#Element.Remove)
- [`class Event`](#class-Event)
  - [`init(_ type: string, bubbles: bool = true)`](#Event.init)
  - [`let Type: string`](#Event.Type)
  - [`internal(set) var Target: html.Node? = nil`](#Event.Target)
  - [`internal(set) var CurrentTarget: html.Node? = nil`](#Event.CurrentTarget)
  - [`internal(set) var DefaultPrevented = false`](#Event.DefaultPrevented)
  - [`let Bubbles: bool`](#Event.Bubbles)
  - [`func PreventDefault()`](#Event.PreventDefault)
  - [`func StopPropagation()`](#Event.StopPropagation)
- [`final class FocusEvent: Event`](#class-FocusEvent)
  - [`init(_ type: string)`](#FocusEvent.init)
- [`struct FormField`](#struct-FormField)
  - [`init(Name: string, Value: string)`](#FormField.init)
  - [`var Name: string`](#FormField.Name)
  - [`var Value: string`](#FormField.Value)
- [`final class InputEvent: Event`](#class-InputEvent)
  - [`init(_ type: string, Value: string, Data: string = "")`](#InputEvent.init)
  - [`let Value: string`](#InputEvent.Value)
  - [`let Data: string`](#InputEvent.Data)
- [`final class KeyboardEvent: Event`](#class-KeyboardEvent)
  - [`init(_ type: string, Key: string, Code: string)`](#KeyboardEvent.init)
  - [`let Key: string`](#KeyboardEvent.Key)
  - [`let Code: string`](#KeyboardEvent.Code)
- [`final class LayoutEvent: Event`](#class-LayoutEvent)
- [`struct ListenerID: Equatable`](#struct-ListenerID)
- [`final class MouseEvent: Event`](#class-MouseEvent)
  - [`init(_ type: string, X: float32 = 0, Y: float32 = 0, Clicks: int32 = 1, bubbles: bool = true)`](#MouseEvent.init)
  - [`let X: float32`](#MouseEvent.X)
  - [`let Y: float32`](#MouseEvent.Y)
  - [`let Clicks: int32`](#MouseEvent.Clicks)
- [`enum MutationKind: Equatable`](#enum-MutationKind)
- [`struct MutationRecord`](#struct-MutationRecord)
  - [`init(Kind: MutationKind, Target: html.Node, AttributeName: string = "", OldValue: string? = nil, Added: [html.Node] = [], Removed: [html.Node] = [])`](#MutationRecord.init)
  - [`let Kind: MutationKind`](#MutationRecord.Kind)
  - [`let Target: html.Node`](#MutationRecord.Target)
  - [`let AttributeName: string`](#MutationRecord.AttributeName)
  - [`let OldValue: string?`](#MutationRecord.OldValue)
  - [`let Added: [html.Node]`](#MutationRecord.Added)
  - [`let Removed: [html.Node]`](#MutationRecord.Removed)
- [`final class PointerEvent: Event`](#class-PointerEvent)
- [`struct Submission`](#struct-Submission)
  - [`init(Action: string, Method: string, Fields: [FormField])`](#Submission.init)
  - [`var Action: string`](#Submission.Action)
  - [`var Method: string`](#Submission.Method)
  - [`var Fields: [FormField]`](#Submission.Fields)
- [`final class SubmitEvent: Event`](#class-SubmitEvent)
  - [`init(_ type: string, Submitter: html.Node?)`](#SubmitEvent.init)
  - [`let Submitter: html.Node?`](#SubmitEvent.Submitter)
- [`struct TextPosition`](#struct-TextPosition)
  - [`init(Node: html.Node, Offset: int)`](#TextPosition.init)
  - [`var Node: html.Node`](#TextPosition.Node)
  - [`var Offset: int`](#TextPosition.Offset)
- [`final class WheelEvent: Event`](#class-WheelEvent)

## Functions

### func Ancestor <a id="func-Ancestor"></a>

```vertex
public func Ancestor(_ node: html.Node?, _ tag: string) -> html.Node?
```

The nearest element at or above a node with a tag name, or nil.

### func ButtonValue <a id="func-ButtonValue"></a>

```vertex
public func ButtonValue(_ button: html.Node) -> string
```

The text a button stands for: its value attribute, or its text.

### func Contains <a id="func-Contains"></a>

```vertex
public func Contains(_ a: html.Node, _ b: html.Node) -> bool
```

Whether a is b or one of b's ancestors.

### func ControlAncestor <a id="func-ControlAncestor"></a>

```vertex
public func ControlAncestor(_ node: html.Node?) -> html.Node?
```

The form control a node is inside: the nearest input, textarea,
button or select.

### func Controls <a id="func-Controls"></a>

```vertex
public func Controls(_ node: html.Node) -> [html.Node]
```

The form controls under a node, in document order.

### func Descendants <a id="func-Descendants"></a>

```vertex
public func Descendants(_ node: html.Node, tag: string) -> [html.Node]
```

The elements under a node with a tag name, in document order.

### func FocusOrder <a id="func-FocusOrder"></a>

```vertex
public func FocusOrder(_ root: html.Node) -> [html.Node]
```

The elements Tab moves through, in document order: enabled controls,
links with an href, and anything with a tabindex.

### func FormData <a id="func-FormData"></a>

```vertex
public func FormData(_ form: html.Node, submitter: html.Node?, value: (html.Node) -> string) -> [FormField]
```

The fields a form submits, as the HTML standard's form data set
builds them: named, enabled controls; checked boxes and radios;
only the button that submitted it. `value` answers a text control's
current text.

### func InputType <a id="func-InputType"></a>

```vertex
public func InputType(_ node: html.Node) -> string
```

The input's type, lowercased; "text" when it names none.

### func IsButtonInput <a id="func-IsButtonInput"></a>

```vertex
public func IsButtonInput(_ node: html.Node) -> bool
```

Whether an input is a button: submit, button, reset or image.

### func IsTextControl <a id="func-IsTextControl"></a>

```vertex
public func IsTextControl(_ node: html.Node) -> bool
```

Whether an element edits text: a textarea, or an input of a text type.

### func LabelTarget <a id="func-LabelTarget"></a>

```vertex
public func LabelTarget(_ label: html.Node, in doc: html.Document?) -> html.Node?
```

The control a label is for: the element its `for` names, or the
first control inside it.

### func LinkAncestor <a id="func-LinkAncestor"></a>

```vertex
public func LinkAncestor(_ node: html.Node?) -> html.Node?
```

The link a node is inside: the nearest `<a>` or `<area>` with an href.

### func SelectedValue <a id="func-SelectedValue"></a>

```vertex
public func SelectedValue(_ select: html.Node) -> string
```

The value a select submits: its selected option's, or its first's.

## Types

### struct ClassList <a id="struct-ClassList"></a>

```vertex
public struct ClassList
```

An element's classes, as the `class` attribute lists them.

#### Initializers

<a id="ClassList.init"></a>

```vertex
public init(_ element: Element)
```

#### Properties

<a id="ClassList.Values"></a>

```vertex
public var Values: [string] { get }
```

#### Methods

<a id="ClassList.Contains"></a>

```vertex
public func Contains(_ name: string) -> bool
```

<a id="ClassList.Add"></a>

```vertex
public func Add(_ name: string)
```

<a id="ClassList.Remove"></a>

```vertex
public func Remove(_ name: string)
```

<a id="ClassList.Toggle"></a>

```vertex
public func Toggle(_ name: string, force: bool? = nil) -> bool
```

Adds the class where it is missing and removes it where present,
or adds or removes it as `force` says. Answers whether it is there
now.

### class CompositionEvent <a id="class-CompositionEvent"></a>

```vertex
public final class CompositionEvent: Event
```

### class Document <a id="class-Document"></a>

```vertex
public final class Document
```

The live document: the tree, and the journal of every change made to
it since the engine last looked. Mutating the tree through a Document
is what makes the page restyle; nothing else tells it.

A change that changes nothing -- setting an attribute to the value it
has -- is not recorded, so it costs no restyle.

#### Initializers

<a id="Document.init"></a>

```vertex
public init(_ tree: html.Document)
```

#### Properties

<a id="Document.Tree"></a>

```vertex
public let Tree: html.Document
```

<a id="Document.Root"></a>

```vertex
public var Root: html.Node { get }
```

<a id="Document.Title"></a>

```vertex
public var Title: string { get }
```

<a id="Document.HasMutations"></a>

```vertex
public var HasMutations: bool { get }
```

Whether anything changed since the last TakeRecords.

<a id="Document.PendingRecords"></a>

```vertex
public var PendingRecords: [MutationRecord] { get }
```

The changes since the last TakeRecords, left in the journal.

<a id="Document.HasEventListeners"></a>

```vertex
public var HasEventListeners: bool { get }
```

Whether any listener is registered: a document with none costs a
dispatch nothing.

#### Methods

<a id="Document.ElementById"></a>

```vertex
public func ElementById(_ id: string) -> Element?
```

The element with an id, or nil.

<a id="Document.ElementFor"></a>

```vertex
public func ElementFor(_ node: html.Node) -> Element
```

A handle on a node of this document, for changing it.

<a id="Document.TakeRecords"></a>

```vertex
public func TakeRecords() -> [MutationRecord]
```

The changes since the last call, oldest first, and an empty
journal.

<a id="Document.CreateElement"></a>

```vertex
public func CreateElement(_ tagName: string) -> html.Node
```

<a id="Document.CreateTextNode"></a>

```vertex
public func CreateTextNode(_ text: string) -> html.Node
```

<a id="Document.SetAttribute"></a>

```vertex
public func SetAttribute(_ element: html.Node, _ name: string, _ value: string)
```

Sets an attribute.

<a id="Document.RemoveAttribute"></a>

```vertex
public func RemoveAttribute(_ element: html.Node, _ name: string)
```

Removes an attribute, if the element has it.

<a id="Document.ToggleAttribute"></a>

```vertex
public func ToggleAttribute(_ element: html.Node, _ name: string, force: bool? = nil) -> bool
```

Adds a boolean attribute where it is missing and removes it where
present, or sets it to `force`. Answers whether it is there now.

<a id="Document.AppendChild"></a>

```vertex
public func AppendChild(_ parent: html.Node, _ child: html.Node)
```

Appends a child, taking it from wherever it was first.

<a id="Document.InsertBefore"></a>

```vertex
public func InsertBefore(_ parent: html.Node, _ child: html.Node, _ before: html.Node?)
```

Inserts a child before another of the parent's children, or last
where `before` is nil.

<a id="Document.RemoveChild"></a>

```vertex
public func RemoveChild(_ parent: html.Node, _ child: html.Node)
```

Removes a child, if it is one.

<a id="Document.SetText"></a>

```vertex
public func SetText(_ node: html.Node, _ text: string)
```

Replaces a text node's text.

<a id="Document.SetTextContent"></a>

```vertex
public func SetTextContent(_ node: html.Node, _ text: string)
```

Replaces a node's children with one text node holding text, or
with nothing for empty text. A lone text child is changed in place.

<a id="Document.AddEventListener"></a>

```vertex
public func AddEventListener(_ node: html.Node, _ type: string, _ handler: (Event) -> void) -> ListenerID
```

Calls handler with each event of a type dispatched to node or,
bubbling, to any element inside it.

<a id="Document.RemoveEventListener"></a>

```vertex
public func RemoveEventListener(_ node: html.Node, _ id: ListenerID)
```

Removes one listener.

<a id="Document.RemoveEventListeners"></a>

```vertex
public func RemoveEventListeners(within node: html.Node)
```

Removes every listener of node and of everything inside it: what
taking a subtree out of the document for good does.

<a id="Document.Dispatch"></a>

```vertex
public func Dispatch(_ event: Event, to target: html.Node) -> bool
```

Dispatches an event to target: its listeners, then each ancestor's,
until one stops it. Answers whether the default action should be
taken -- no listener prevented it.

### class DragEvent <a id="class-DragEvent"></a>

```vertex
public final class DragEvent: Event
```

### class Element <a id="class-Element"></a>

```vertex
public final class Element
```

An element of a live document: reads go to the node, changes go
through the document's journal. A handle: two for one node are the
same element.

#### Initializers

<a id="Element.init"></a>

```vertex
public init(_ node: html.Node, _ owner: Document)
```

#### Properties

<a id="Element.Node"></a>

```vertex
public let Node: html.Node
```

<a id="Element.Owner"></a>

```vertex
public let Owner: Document
```

<a id="Element.TagName"></a>

```vertex
public var TagName: string { get }
```

<a id="Element.Id"></a>

```vertex
public var Id: string { get }
```

<a id="Element.TextContent"></a>

```vertex
public var TextContent: string { get set }
```

The element's text, all of it, in document order.

<a id="Element.ClassList"></a>

```vertex
public var ClassList: dom.ClassList { get }
```

<a id="Element.Parent"></a>

```vertex
public var Parent: Element? { get }
```

#### Methods

<a id="Element.GetAttribute"></a>

```vertex
public func GetAttribute(_ name: string) -> string?
```

<a id="Element.HasAttribute"></a>

```vertex
public func HasAttribute(_ name: string) -> bool
```

<a id="Element.SetAttribute"></a>

```vertex
public func SetAttribute(_ name: string, _ value: string)
```

<a id="Element.RemoveAttribute"></a>

```vertex
public func RemoveAttribute(_ name: string)
```

<a id="Element.ToggleAttribute"></a>

```vertex
public func ToggleAttribute(_ name: string, force: bool? = nil) -> bool
```

<a id="Element.AppendChild"></a>

```vertex
public func AppendChild(_ child: html.Node)
```

<a id="Element.InsertBefore"></a>

```vertex
public func InsertBefore(_ child: html.Node, _ before: html.Node?)
```

<a id="Element.Remove"></a>

```vertex
public func Remove()
```

Takes the element out of the tree.

### class Event <a id="class-Event"></a>

```vertex
public class Event
```

An event dispatched to an element: what happened, where, and whether
a listener asked for the default action not to be taken. Listeners are
called at the target and then at each ancestor in turn -- the event
bubbles -- until one stops it.

#### Initializers

<a id="Event.init"></a>

```vertex
public init(_ type: string, bubbles: bool = true)
```

#### Properties

<a id="Event.Type"></a>

```vertex
public let Type: string
```

The event's name: "click", "input", "submit".

<a id="Event.Target"></a>

```vertex
public internal(set) var Target: html.Node? = nil
```

The element the event happened to.

<a id="Event.CurrentTarget"></a>

```vertex
public internal(set) var CurrentTarget: html.Node? = nil
```

The element whose listener is running now.

<a id="Event.DefaultPrevented"></a>

```vertex
public internal(set) var DefaultPrevented = false
```

<a id="Event.Bubbles"></a>

```vertex
public let Bubbles: bool
```

Whether the event goes on to the ancestors' listeners. mouseenter,
mouseleave, focus and blur do not: each is its element's own.

#### Methods

<a id="Event.PreventDefault"></a>

```vertex
public func PreventDefault()
```

Asks that what the engine would do after the event -- submit the
form, toggle the box, follow the link -- not be done.

<a id="Event.StopPropagation"></a>

```vertex
public func StopPropagation()
```

Stops the event going on to the listeners of further ancestors.

### class FocusEvent <a id="class-FocusEvent"></a>

```vertex
public final class FocusEvent: Event
```

Focus coming to or leaving an element. focus and blur do not bubble.

#### Initializers

<a id="FocusEvent.init"></a>

```vertex
public init(_ type: string)
```

### struct FormField <a id="struct-FormField"></a>

```vertex
public struct FormField
```

A field of a submitted form.

#### Initializers

<a id="FormField.init"></a>

```vertex
public init(Name: string, Value: string)
```

#### Properties

<a id="FormField.Name"></a>

```vertex
public var Name: string
```

<a id="FormField.Value"></a>

```vertex
public var Value: string
```

### class InputEvent <a id="class-InputEvent"></a>

```vertex
public final class InputEvent: Event
```

A text control's value changed by the user.

#### Initializers

<a id="InputEvent.init"></a>

```vertex
public init(_ type: string, Value: string, Data: string = "")
```

#### Properties

<a id="InputEvent.Value"></a>

```vertex
public let Value: string
```

The control's value after the change.

<a id="InputEvent.Data"></a>

```vertex
public let Data: string
```

What was typed, where something was.

### class KeyboardEvent <a id="class-KeyboardEvent"></a>

```vertex
public final class KeyboardEvent: Event
```

A key, as the W3C names keys and codes.

#### Initializers

<a id="KeyboardEvent.init"></a>

```vertex
public init(_ type: string, Key: string, Code: string)
```

#### Properties

<a id="KeyboardEvent.Key"></a>

```vertex
public let Key: string
```

<a id="KeyboardEvent.Code"></a>

```vertex
public let Code: string
```

### class LayoutEvent <a id="class-LayoutEvent"></a>

```vertex
public final class LayoutEvent: Event
```

### struct ListenerID <a id="struct-ListenerID"></a>

```vertex
public struct ListenerID: Equatable
```

A listener's handle, for removing it.

### class MouseEvent <a id="class-MouseEvent"></a>

```vertex
public final class MouseEvent: Event
```

A pointer press and release on the same element, and its kin.

#### Initializers

<a id="MouseEvent.init"></a>

```vertex
public init(_ type: string, X: float32 = 0, Y: float32 = 0, Clicks: int32 = 1, bubbles: bool = true)
```

#### Properties

<a id="MouseEvent.X"></a>

```vertex
public let X: float32
```

Where, in CSS pixels from the viewport's corner.

<a id="MouseEvent.Y"></a>

```vertex
public let Y: float32
```

<a id="MouseEvent.Clicks"></a>

```vertex
public let Clicks: int32
```

### enum MutationKind <a id="enum-MutationKind"></a>

```vertex
public enum MutationKind: Equatable
```

What a mutation changed, in MutationObserver's terms.

#### Cases

<a id="MutationKind.attributes"></a>

```vertex
case attributes
```

An attribute of Target was set, changed or removed.

<a id="MutationKind.childList"></a>

```vertex
case childList
```

Children were added to or removed from Target.

<a id="MutationKind.characterData"></a>

```vertex
case characterData
```

A text node's text changed.

### struct MutationRecord <a id="struct-MutationRecord"></a>

```vertex
public struct MutationRecord
```

One change to the tree. The cascade turns these into the elements to
restyle, and layout into the boxes to rebuild.

#### Initializers

<a id="MutationRecord.init"></a>

```vertex
public init(Kind: MutationKind, Target: html.Node, AttributeName: string = "", OldValue: string? = nil, Added: [html.Node] = [], Removed: [html.Node] = [])
```

#### Properties

<a id="MutationRecord.Kind"></a>

```vertex
public let Kind: MutationKind
```

<a id="MutationRecord.Target"></a>

```vertex
public let Target: html.Node
```

<a id="MutationRecord.AttributeName"></a>

```vertex
public let AttributeName: string
```

The attribute's name, lowercase, for `.attributes`.

<a id="MutationRecord.OldValue"></a>

```vertex
public let OldValue: string?
```

What the attribute or text was before, or nil where it had none.

<a id="MutationRecord.Added"></a>

```vertex
public let Added: [html.Node]
```

<a id="MutationRecord.Removed"></a>

```vertex
public let Removed: [html.Node]
```

### class PointerEvent <a id="class-PointerEvent"></a>

```vertex
public final class PointerEvent: Event
```

The events of other kinds this document knows by name: pointer,
wheel, composition, drag, and an element's box changing size.

### struct Submission <a id="struct-Submission"></a>

```vertex
public struct Submission
```

A form submission: where it goes and what it carries.

#### Initializers

<a id="Submission.init"></a>

```vertex
public init(Action: string, Method: string, Fields: [FormField])
```

#### Properties

<a id="Submission.Action"></a>

```vertex
public var Action: string
```

<a id="Submission.Method"></a>

```vertex
public var Method: string
```

<a id="Submission.Fields"></a>

```vertex
public var Fields: [FormField]
```

### class SubmitEvent <a id="class-SubmitEvent"></a>

```vertex
public final class SubmitEvent: Event
```

A form about to be submitted.

#### Initializers

<a id="SubmitEvent.init"></a>

```vertex
public init(_ type: string, Submitter: html.Node?)
```

#### Properties

<a id="SubmitEvent.Submitter"></a>

```vertex
public let Submitter: html.Node?
```

The button that submitted it, where one did.

### struct TextPosition <a id="struct-TextPosition"></a>

```vertex
public struct TextPosition
```

A point in the document's text: a text node and a byte offset into
its text. One end of a selection.

#### Initializers

<a id="TextPosition.init"></a>

```vertex
public init(Node: html.Node, Offset: int)
```

#### Properties

<a id="TextPosition.Node"></a>

```vertex
public var Node: html.Node
```

<a id="TextPosition.Offset"></a>

```vertex
public var Offset: int
```

### class WheelEvent <a id="class-WheelEvent"></a>

```vertex
public final class WheelEvent: Event
```

## Files

- document.vs
- dom.vs
- events.vs
- forms.vs
