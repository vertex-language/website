# package kit

```vertex
import "ui/kit"
```

Package kit is a few styled components: the example of a library with
styles of its own (kit.vss), which reach its components and nothing
else, and which a program themes through the kit's tokens.

## Index

- [`func Button(label: string, onPress: () -> void) -> Element`](#func-Button)
- [`func Card(title: string, children: Node = nil) -> Element`](#func-Card)

## Functions

### func Button <a id="func-Button"></a>

```vertex
public func Button(label: string, onPress: () -> void) -> Element
```

A button in the kit's accent color.

### func Card <a id="func-Card"></a>

```vertex
public func Card(title: string, children: Node = nil) -> Element
```

A titled box around its children.

## Files

- kit.vsx
