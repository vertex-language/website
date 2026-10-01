# Vertex Syntax Highlighter (`vertex-highlight`)

A high-performance, zero-dependency syntax highlighter for Vertex (`.vs`) source code, compliant with the official [`vscode-vertex`](https://github.com/vertex-language/vscode-vertex) TextMate grammar specification (`syntaxes/vertex.tmLanguage.json`).

## Features

- **Lexer & Grammar Parity**: Directly mirrors `vscode-vertex` rules including shebangs, nested block comments (`/* /* */ */`), doc tags (`// MARK:`, `///`), raw strings (`#"..."#`), recursive string interpolation (`\( ... )`), regex literals, hex/binary/octal/decimal numbers, attributes (`@inlinable`), compiler control directives (`#if`, `#available`), macro expansions, package/import statements, and execution modifiers (`kernel`, `graph`).
- **Semantic Classification**: Accurately distinguishes function declarations, method calls, external argument labels (`by factor:`), property/enum access (`.gpu`, `.text`), primitive types, and core/custom types.
- **Fresh Modern Color Flow**: A balanced, high-contrast palette providing clear chromatic rhythm:
  - **Control & Flow**: Amethyst Violet (`#7C3AED`)
  - **Declarations & Storage**: Royal Sapphire (`#2563EB`)
  - **Effects & Ownership**: Modern Indigo (`#4F46E5`)
  - **Accelerated Compute**: Electric Cyber Teal (`#0D9488`)
  - **Types (Core & Primitive)**: Oceanic Cyan (`#0891B2`)
  - **Functions & Invocations**: Luminous Amber (`#B45309` / `#D97706`)
  - **Argument Labels**: Terracotta Sienna (`#C2410C`)
  - **Member Access & Properties**: Sky Cobalt (`#0284C7`)
  - **Strings & Literals**: Forest Emerald (`#15803D`)
  - **Numbers & Booleans**: Sunset Orange (`#EA580C`)
  - **Attributes & Directives**: Magenta (`#A21CAF`)
  - **Comments**: Warm Muted Slate (`#71717A`, italicized)

## Usage

```tsx
import { VertexCode, vertexFreshLightTheme } from './vertex-highlight';

export function CodeViewer({ source }: { source: string }) {
  return (
    <VertexCode
      code={source}
      theme={vertexFreshLightTheme}
      showLineNumbers={true}
    />
  );
}
```
