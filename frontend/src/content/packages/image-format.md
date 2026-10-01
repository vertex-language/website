# package format

```vertex
import "image/format"
```

Package format decodes an image whose format isn't known ahead of time:
it sniffs the bytes and hands them to the right decoder. PNG decodes in
pure Vertex (image/png); JPEG, GIF, WebP, HEIC, TIFF and BMP go through
the platform's decoders until pure ones exist.

## Index

- [`func Decode(_ bytes: [uint8]) -> image.RGBA?`](#func-Decode)
- [`func DecodeDataURL(_ url: string) -> image.RGBA?`](#func-DecodeDataURL)
- [`func Sniff(_ b: [uint8]) -> Kind`](#func-Sniff)
- [`enum Kind`](#enum-Kind)

## Functions

### func Decode <a id="func-Decode"></a>

```vertex
public func Decode(_ bytes: [uint8]) -> image.RGBA?
```

Decode decodes an image's bytes into premultiplied RGBA. Nil where the
bytes are not an image anything here reads.

### func DecodeDataURL <a id="func-DecodeDataURL"></a>

```vertex
public func DecodeDataURL(_ url: string) -> image.RGBA?
```

DecodeDataURL decodes a `data:` URL's image, base64 or plain.

### func Sniff <a id="func-Sniff"></a>

```vertex
public func Sniff(_ b: [uint8]) -> Kind
```

Sniff names the format of an image's bytes.

## Types

### enum Kind <a id="enum-Kind"></a>

```vertex
public enum Kind
```

Kind is an image file format, as recognised from its first bytes.

#### Cases

<a id="Kind.png"></a>

```vertex
case png
```

<a id="Kind.jpeg"></a>

```vertex
case jpeg
```

<a id="Kind.gif"></a>

```vertex
case gif
```

<a id="Kind.webp"></a>

```vertex
case webp
```

<a id="Kind.bmp"></a>

```vertex
case bmp
```

<a id="Kind.unknown"></a>

```vertex
case unknown
```

## Files

- format.vs
