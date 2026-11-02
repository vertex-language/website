# package icon

```vertex
import "ui/icon"
```

Package icon shows an icon from the icons repository in a page: its
<svg>, at a size, in the text's color wherever the set draws in
currentColor.

```vertex
import (
    "icons/lucide"
    "ui/icon"
)

<button><icon.Icon of={lucide.Settings} size={16} /> Settings</button>
```

## Index

- [`func Icon(of: icons.Icon, size: float32 = 16) -> component.Node`](#func-Icon)

## Functions

### func Icon <a id="func-Icon"></a>

```vertex
public func Icon(of: icons.Icon, size: float32 = 16) -> component.Node
```

The icon's <svg>, size CSS pixels square, with the class "icon".

## Files

- icon.vs
