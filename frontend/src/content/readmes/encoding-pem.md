# encoding/pem

Privacy-Enhanced Mail (PEM) block parsing and encoding (`pem.Decode`, `pem.Encode`).

```vertex
import "encoding/pem"
```

## Types

- **`Block`** (struct): A Block represents a PEM (Privacy-Enhanced Mail) encoded structure.

## Functions

- `func DecodeString(text: string) -> Block?`: Decode finds the next PEM formatted block in the input text.
- `func Decode(data: [uint8]) -> Block?`: Decode finds the next PEM formatted block in the input byte slice.
- `func Encode(block: Block) -> string`: Encode returns the PEM encoding of block.

Part of the [`encoding`](https://github.com/vertex-language/encoding) repository.
