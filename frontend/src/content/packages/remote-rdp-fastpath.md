# package fastpath

```vertex
import "remote/rdp/fastpath"
```

Package fastpath parses server fast-path update PDUs ([MS-RDPBCGR]
2.2.9.1.2): the outer PDU into its updates, fragmented updates back into
whole ones, and the bitmap and pointer update bodies into values the
session can act on. No I/O and no pixels: codecs live in codec/*.

## Index

- [`func ParseBitmapUpdate(_ data: [uint8]) throws -> [BitmapData]`](#func-ParseBitmapUpdate)
- [`func ParseCachedPointer(_ data: [uint8]) throws -> int`](#func-ParseCachedPointer)
- [`func ParseColorPointer(_ data: [uint8]) throws -> PointerImage`](#func-ParseColorPointer)
- [`func ParseLargePointer(_ data: [uint8]) throws -> PointerImage`](#func-ParseLargePointer)
- [`func ParseNewPointer(_ data: [uint8]) throws -> PointerImage`](#func-ParseNewPointer)
- [`func ParsePaletteUpdate(_ data: [uint8]) throws -> [uint8]`](#func-ParsePaletteUpdate)
- [`func ParsePointerPosition(_ data: [uint8]) throws -> (int, int)`](#func-ParsePointerPosition)
- [`struct BitmapData`](#struct-BitmapData)
  - [`init()`](#BitmapData.init)
  - [`var Left: int`](#BitmapData.Left)
  - [`var Top: int`](#BitmapData.Top)
  - [`var Right: int`](#BitmapData.Right)
  - [`var Bottom: int`](#BitmapData.Bottom)
  - [`var Width: int`](#BitmapData.Width)
  - [`var Height: int`](#BitmapData.Height)
  - [`var BitsPerPixel: int`](#BitmapData.BitsPerPixel)
  - [`var Flags: uint16`](#BitmapData.Flags)
  - [`var Data: [uint8]`](#BitmapData.Data)
  - [`var Compressed: bool { get }`](#BitmapData.Compressed)
- [`struct BitmapFlags`](#struct-BitmapFlags)
  - [`static let Compression: uint16 = 0x0001`](#BitmapFlags.Compression)
  - [`static let NoCompressionHeader: uint16 = 0x0400`](#BitmapFlags.NoCompressionHeader)
- [`enum FastPathError: Error`](#enum-FastPathError)
  - [`var Message: string { get }`](#FastPathError.Message)
- [`struct PointerImage`](#struct-PointerImage)
  - [`init()`](#PointerImage.init)
  - [`var CacheIndex: int`](#PointerImage.CacheIndex)
  - [`var HotX: int`](#PointerImage.HotX)
  - [`var HotY: int`](#PointerImage.HotY)
  - [`var Width: int`](#PointerImage.Width)
  - [`var Height: int`](#PointerImage.Height)
  - [`var XorBpp: int`](#PointerImage.XorBpp)
  - [`var XorMask: [uint8]`](#PointerImage.XorMask)
  - [`var AndMask: [uint8]`](#PointerImage.AndMask)
- [`struct Reassembler`](#struct-Reassembler)
  - [`init()`](#Reassembler.init)
  - [`var MaxSize: int = 8 * 1024 * 1024`](#Reassembler.MaxSize)
  - [`mutating func Feed(_ frame: [uint8]) throws -> [Update]`](#Reassembler.Feed)
- [`struct Update`](#struct-Update)
  - [`init(code: uint8, data: [uint8])`](#Update.init)
  - [`var Code: uint8`](#Update.Code)
  - [`var Data: [uint8]`](#Update.Data)
- [`struct UpdateCode`](#struct-UpdateCode)
  - [`static let Orders: uint8 = 0`](#UpdateCode.Orders)
  - [`static let Bitmap: uint8 = 1`](#UpdateCode.Bitmap)
  - [`static let Palette: uint8 = 2`](#UpdateCode.Palette)
  - [`static let Synchronize: uint8 = 3`](#UpdateCode.Synchronize)
  - [`static let SurfaceCommands: uint8 = 4`](#UpdateCode.SurfaceCommands)
  - [`static let PointerNull: uint8 = 5`](#UpdateCode.PointerNull)
  - [`static let PointerDefault: uint8 = 6`](#UpdateCode.PointerDefault)
  - [`static let PointerPosition: uint8 = 8`](#UpdateCode.PointerPosition)
  - [`static let PointerColor: uint8 = 9`](#UpdateCode.PointerColor)
  - [`static let PointerCached: uint8 = 10`](#UpdateCode.PointerCached)
  - [`static let PointerNew: uint8 = 11`](#UpdateCode.PointerNew)
  - [`static let PointerLarge: uint8 = 12`](#UpdateCode.PointerLarge)

## Functions

### func ParseBitmapUpdate <a id="func-ParseBitmapUpdate"></a>

```vertex
public func ParseBitmapUpdate(_ data: [uint8]) throws -> [BitmapData]
```

ParseBitmapUpdate decodes a TS_UPDATE_BITMAP_DATA body.

### func ParseCachedPointer <a id="func-ParseCachedPointer"></a>

```vertex
public func ParseCachedPointer(_ data: [uint8]) throws -> int
```

ParseCachedPointer decodes TS_CACHEDPOINTERATTRIBUTE.

### func ParseColorPointer <a id="func-ParseColorPointer"></a>

```vertex
public func ParseColorPointer(_ data: [uint8]) throws -> PointerImage
```

ParseColorPointer decodes TS_COLORPOINTERATTRIBUTE (24bpp XOR mask).

### func ParseLargePointer <a id="func-ParseLargePointer"></a>

```vertex
public func ParseLargePointer(_ data: [uint8]) throws -> PointerImage
```

ParseLargePointer decodes TS_FP_LARGEPOINTERATTRIBUTE.

### func ParseNewPointer <a id="func-ParseNewPointer"></a>

```vertex
public func ParseNewPointer(_ data: [uint8]) throws -> PointerImage
```

ParseNewPointer decodes TS_FP_POINTERATTRIBUTE (xorBpp then a colour
pointer).

### func ParsePaletteUpdate <a id="func-ParsePaletteUpdate"></a>

```vertex
public func ParsePaletteUpdate(_ data: [uint8]) throws -> [uint8]
```

ParsePaletteUpdate returns the palette as 256 RGB triples (red first).

### func ParsePointerPosition <a id="func-ParsePointerPosition"></a>

```vertex
public func ParsePointerPosition(_ data: [uint8]) throws -> (int, int)
```

ParsePointerPosition decodes TS_POINTERPOSATTRIBUTE.

## Types

### struct BitmapData <a id="struct-BitmapData"></a>

```vertex
public struct BitmapData
```

BitmapData is one TS_BITMAP_DATA rectangle. Data is the bitmap stream
with any TS_CD_HEADER already stripped.

#### Initializers

<a id="BitmapData.init"></a>

```vertex
public init()
```

#### Properties

<a id="BitmapData.Left"></a>

```vertex
public var Left: int
```

<a id="BitmapData.Top"></a>

```vertex
public var Top: int
```

<a id="BitmapData.Right"></a>

```vertex
public var Right: int
```

<a id="BitmapData.Bottom"></a>

```vertex
public var Bottom: int
```

inclusive

<a id="BitmapData.Width"></a>

```vertex
public var Width: int
```

inclusive

<a id="BitmapData.Height"></a>

```vertex
public var Height: int
```

<a id="BitmapData.BitsPerPixel"></a>

```vertex
public var BitsPerPixel: int
```

<a id="BitmapData.Flags"></a>

```vertex
public var Flags: uint16
```

<a id="BitmapData.Data"></a>

```vertex
public var Data: [uint8]
```

<a id="BitmapData.Compressed"></a>

```vertex
public var Compressed: bool { get }
```

### struct BitmapFlags <a id="struct-BitmapFlags"></a>

```vertex
public struct BitmapFlags
```

BitmapFlags values in TS_BITMAP_DATA.flags.

#### Properties

<a id="BitmapFlags.Compression"></a>

```vertex
public static let Compression: uint16 = 0x0001
```

<a id="BitmapFlags.NoCompressionHeader"></a>

```vertex
public static let NoCompressionHeader: uint16 = 0x0400
```

### enum FastPathError <a id="enum-FastPathError"></a>

```vertex
public enum FastPathError: Error
```

FastPathError is a malformed fast-path PDU.

#### Cases

<a id="FastPathError.malformed"></a>

```vertex
case malformed(string)
```

#### Properties

<a id="FastPathError.Message"></a>

```vertex
public var Message: string { get }
```

### struct PointerImage <a id="struct-PointerImage"></a>

```vertex
public struct PointerImage
```

PointerImage is the wire form of a colour pointer: an XOR mask in
XorBpp bits per pixel and a 1-bit AND mask, both bottom-up and with
each scan-line padded to 2 bytes.

#### Initializers

<a id="PointerImage.init"></a>

```vertex
public init()
```

#### Properties

<a id="PointerImage.CacheIndex"></a>

```vertex
public var CacheIndex: int
```

<a id="PointerImage.HotX"></a>

```vertex
public var HotX: int
```

<a id="PointerImage.HotY"></a>

```vertex
public var HotY: int
```

<a id="PointerImage.Width"></a>

```vertex
public var Width: int
```

<a id="PointerImage.Height"></a>

```vertex
public var Height: int
```

<a id="PointerImage.XorBpp"></a>

```vertex
public var XorBpp: int
```

<a id="PointerImage.XorMask"></a>

```vertex
public var XorMask: [uint8]
```

<a id="PointerImage.AndMask"></a>

```vertex
public var AndMask: [uint8]
```

### struct Reassembler <a id="struct-Reassembler"></a>

```vertex
public struct Reassembler
```

Reassembler splits fast-path PDUs into updates and joins fragmented
updates. Feed it whole frames from the transport; it returns the
updates that completed.

#### Initializers

<a id="Reassembler.init"></a>

```vertex
public init()
```

#### Properties

<a id="Reassembler.MaxSize"></a>

```vertex
public var MaxSize: int = 8 * 1024 * 1024
```

MaxSize bounds a reassembled update (the MultifragmentUpdate cap).

#### Methods

<a id="Reassembler.Feed"></a>

```vertex
public mutating func Feed(_ frame: [uint8]) throws -> [Update]
```

Feed parses one fast-path PDU (header included) and returns the
updates it completed.

### struct Update <a id="struct-Update"></a>

```vertex
public struct Update
```

Update is one whole (reassembled) fast-path update.

#### Initializers

<a id="Update.init"></a>

```vertex
public init(code: uint8, data: [uint8])
```

#### Properties

<a id="Update.Code"></a>

```vertex
public var Code: uint8
```

<a id="Update.Data"></a>

```vertex
public var Data: [uint8]
```

### struct UpdateCode <a id="struct-UpdateCode"></a>

```vertex
public struct UpdateCode
```

Update codes (updateCode in the TS_FP_UPDATE header).

#### Properties

<a id="UpdateCode.Orders"></a>

```vertex
public static let Orders: uint8 = 0
```

<a id="UpdateCode.Bitmap"></a>

```vertex
public static let Bitmap: uint8 = 1
```

<a id="UpdateCode.Palette"></a>

```vertex
public static let Palette: uint8 = 2
```

<a id="UpdateCode.Synchronize"></a>

```vertex
public static let Synchronize: uint8 = 3
```

<a id="UpdateCode.SurfaceCommands"></a>

```vertex
public static let SurfaceCommands: uint8 = 4
```

<a id="UpdateCode.PointerNull"></a>

```vertex
public static let PointerNull: uint8 = 5
```

<a id="UpdateCode.PointerDefault"></a>

```vertex
public static let PointerDefault: uint8 = 6
```

<a id="UpdateCode.PointerPosition"></a>

```vertex
public static let PointerPosition: uint8 = 8
```

<a id="UpdateCode.PointerColor"></a>

```vertex
public static let PointerColor: uint8 = 9
```

<a id="UpdateCode.PointerCached"></a>

```vertex
public static let PointerCached: uint8 = 10
```

<a id="UpdateCode.PointerNew"></a>

```vertex
public static let PointerNew: uint8 = 11
```

<a id="UpdateCode.PointerLarge"></a>

```vertex
public static let PointerLarge: uint8 = 12
```

## Files

- fastpath.vs
