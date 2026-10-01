# package font

```vertex
import "text/font"
```

## Index

- [`func DrawRun(_ canvas: draw.Canvas, _ run: Run, x: float32, baseline: float32, scale: float32, color: draw.Color)`](#func-DrawRun)
- [`func GlyphMask(face: int32, glyph: uint32, scale: float32) -> Glyph`](#func-GlyphMask)
- [`func Load(_ spec: Spec) -> Face`](#func-Load)
- [`func Register(path: string, as name: string) -> bool`](#func-Register)
- [`func RegisterData(_ data: [uint8], as name: string) -> bool`](#func-RegisterData)
- [`final class Face`](#class-Face)
  - [`let Id: int32`](#Face.Id)
  - [`let Spec: Spec`](#Face.Spec)
  - [`let Family: string`](#Face.Family)
  - [`let Size: float32`](#Face.Size)
  - [`let Ascent: float32`](#Face.Ascent)
  - [`let Descent: float32`](#Face.Descent)
  - [`let Leading: float32`](#Face.Leading)
  - [`let XHeight: float32`](#Face.XHeight)
  - [`let SpaceWidth: float32`](#Face.SpaceWidth)
  - [`var LineHeight: float32 { get }`](#Face.LineHeight)
  - [`func Shape(_ text: string) -> Run`](#Face.Shape)
  - [`func Measure(_ text: string) -> float32`](#Face.Measure)
- [`struct Glyph`](#struct-Glyph)
  - [`var Mask: draw.Mask`](#Glyph.Mask)
  - [`var Left: int32`](#Glyph.Left)
  - [`var Top: int32`](#Glyph.Top)
  - [`var IsEmpty: bool { get }`](#Glyph.IsEmpty)
- [`struct Run`](#struct-Run)
  - [`init()`](#Run.init)
  - [`var Glyphs: [uint32]`](#Run.Glyphs)
  - [`var Faces: [int32]`](#Run.Faces)
  - [`var Advances: [float32]`](#Run.Advances)
  - [`var Width: float32`](#Run.Width)
  - [`var Count: int { get }`](#Run.Count)
- [`struct Spec: Equatable`](#struct-Spec)
  - [`init(families: [string], size: float32, weight: int32 = 400, italic: bool = false)`](#Spec.init)
  - [`init(family: string, size: float32, weight: int32 = 400, italic: bool = false)`](#Spec.init-2)
  - [`var Families: [string]`](#Spec.Families)
  - [`var Size: float32`](#Spec.Size)
  - [`var Weight: int32`](#Spec.Weight)
  - [`var Italic: bool`](#Spec.Italic)

## Functions

### func DrawRun <a id="func-DrawRun"></a>

```vertex
public func DrawRun(_ canvas: draw.Canvas, _ run: Run, x: float32, baseline: float32, scale: float32, color: draw.Color)
```

Draws a run on a canvas with its origin at (x, baseline) in device
pixels, at a scale: the glyphs are rasterized at that scale and each
pen advance is scaled to match.

### func GlyphMask <a id="func-GlyphMask"></a>

```vertex
public func GlyphMask(face: int32, glyph: uint32, scale: float32) -> Glyph
```

The mask for a glyph of a face at a scale, rasterized once and kept.
Scales are kept to sixteenths, which is finer than any display's.

### func Load <a id="func-Load"></a>

```vertex
public func Load(_ spec: Spec) -> Face
```

The face for a spec: the first of its families the system has, at
the size, weight and slant asked for, or the platform's sans-serif
where it has none of them.

### func Register <a id="func-Register"></a>

```vertex
public func Register(path: string, as name: string) -> bool
```

Registers a font file so that its family can be used, under the name
given, as @font-face does. Answers false where the file is not a font.

### func RegisterData <a id="func-RegisterData"></a>

```vertex
public func RegisterData(_ data: [uint8], as name: string) -> bool
```

Registers a font from its bytes -- a TrueType or OpenType file, as
a page's @font-face fetches one -- under the name given. Answers false
where the bytes aren't a font the platform reads.

## Types

### class Face <a id="class-Face"></a>

```vertex
public final class Face
```

A font at one size. Faces are shared: `Load` answers the same one for
the same spec, and each keeps what it has shaped.

#### Properties

<a id="Face.Id"></a>

```vertex
public let Id: int32
```

The platform's number for it.

<a id="Face.Spec"></a>

```vertex
public let Spec: Spec
```

<a id="Face.Family"></a>

```vertex
public let Family: string
```

The family that answered, of those the spec listed.

<a id="Face.Size"></a>

```vertex
public let Size: float32
```

<a id="Face.Ascent"></a>

```vertex
public let Ascent: float32
```

Distances from the baseline, in CSS pixels, both positive.

<a id="Face.Descent"></a>

```vertex
public let Descent: float32
```

<a id="Face.Leading"></a>

```vertex
public let Leading: float32
```

The gap the designer leaves between lines, which `line-height:
normal` adds to the ascent and descent.

<a id="Face.XHeight"></a>

```vertex
public let XHeight: float32
```

<a id="Face.SpaceWidth"></a>

```vertex
public let SpaceWidth: float32
```

<a id="Face.LineHeight"></a>

```vertex
public var LineHeight: float32 { get }
```

The height of a line of this face when line-height is `normal`.

#### Methods

<a id="Face.Shape"></a>

```vertex
public func Shape(_ text: string) -> Run
```

Shapes a word: glyphs and advances, kept for the next time the
same word is asked for. A browser shapes per word for the same
reason: pages repeat theirs.

<a id="Face.Measure"></a>

```vertex
public func Measure(_ text: string) -> float32
```

The width of text set in this face.

### struct Glyph <a id="struct-Glyph"></a>

```vertex
public struct Glyph
```

A glyph's coverage, rasterized at some scale: the mask, and where its
top-left corner sits relative to the glyph's origin on the baseline,
in device pixels.

#### Properties

<a id="Glyph.Mask"></a>

```vertex
public var Mask: draw.Mask
```

<a id="Glyph.Left"></a>

```vertex
public var Left: int32
```

<a id="Glyph.Top"></a>

```vertex
public var Top: int32
```

<a id="Glyph.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

### struct Run <a id="struct-Run"></a>

```vertex
public struct Run
```

Text shaped into glyphs: what to draw, on which face, and how far
each advances the pen, in CSS pixels.

#### Initializers

<a id="Run.init"></a>

```vertex
public init()
```

#### Properties

<a id="Run.Glyphs"></a>

```vertex
public var Glyphs: [uint32]
```

<a id="Run.Faces"></a>

```vertex
public var Faces: [int32]
```

<a id="Run.Advances"></a>

```vertex
public var Advances: [float32]
```

<a id="Run.Width"></a>

```vertex
public var Width: float32
```

<a id="Run.Count"></a>

```vertex
public var Count: int { get }
```

### struct Spec <a id="struct-Spec"></a>

```vertex
public struct Spec: Equatable
```

What a font is asked for, in CSS terms: a list of families to try in
order, a size in CSS pixels, a weight from 100 to 900 and a slant.

#### Initializers

<a id="Spec.init"></a>

```vertex
public init(families: [string], size: float32, weight: int32 = 400, italic: bool = false)
```

<a id="Spec.init-2"></a>

```vertex
public init(family: string, size: float32, weight: int32 = 400, italic: bool = false)
```

#### Properties

<a id="Spec.Families"></a>

```vertex
public var Families: [string]
```

<a id="Spec.Size"></a>

```vertex
public var Size: float32
```

<a id="Spec.Weight"></a>

```vertex
public var Weight: int32
```

<a id="Spec.Italic"></a>

```vertex
public var Italic: bool
```

## Files

- font.vs
