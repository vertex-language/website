# web/svg

Draws SVG: an inline <svg> element's shapes, or an SVG file's (read with encoding/xml) that an <img> shows, filled into the box it lays out as.

```vertex
import "web/svg"
```

## Types

- **`Matrix`** (struct): A 2D affine transform: x' = a x + c y + e, y' = b x + d y + f.
- **`Drawing`** (class): An <svg> element's shapes, ready to draw into a box.
- **`Document`** (class): An SVG file shown as an image, as <img src=logo.svg> shows one: what it draws, and the size it lays out at before CSS.

## Functions

- `func ParseDocument(bytes: [uint8]) -> Document?`: Reads bytes that are an SVG file, or nil where they aren't one: not well-formed XML (a raster image, say), or a root that isn't <svg>.
- `func Parse(root: html.Node) -> Drawing`: What an <svg> element draws.
- `func HasRatioOnly(root: html.Node) -> bool`: The size an <svg> lays out at before CSS: its width and height attributes in pixels; one of them and the viewBox's proportions; or 300 by 150, as for any replaced element, shaped by the viewBox.
- `func IntrinsicSize(root: html.Node) -> (width: float32, height: float32)`

Part of the [`web`](https://github.com/vertex-language/web) repository.
