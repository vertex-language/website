# package display

```vertex
import "vm/display"
```

Package display is a guest's screen: a Framebuffer the host reads, and
ramfb, the simplest device that gives UEFI a GOP framebuffer, which
Windows' Basic Display driver keeps drawing into after boot.

Showing it is someone else's job: ui/window presents a Framebuffer, and
a VNC or RDP server could serve one. A headless VM imports no ui.

## Index

- [`enum DisplayError: Error`](#enum-DisplayError)
- [`enum Format`](#enum-Format)
- [`final class Framebuffer`](#class-Framebuffer)
  - [`init(memory: device.GuestMemory, hostPointer: UnsafeMutableRawPointer? = nil)`](#Framebuffer.init)
  - [`private(set) var Width: int = 0`](#Framebuffer.Width)
  - [`private(set) var Height: int = 0`](#Framebuffer.Height)
  - [`private(set) var Stride: int = 0`](#Framebuffer.Stride)
  - [`private(set) var Format: Format = .xrgb8888`](#Framebuffer.Format)
  - [`private(set) var Address: device.GuestAddress = device.GuestAddress(0)`](#Framebuffer.Address)
  - [`private(set) var HostPointer: UnsafeMutableRawPointer? = nil`](#Framebuffer.HostPointer)
  - [`var Configured: bool { get }`](#Framebuffer.Configured)
  - [`var Generation: uint64 { get }`](#Framebuffer.Generation)
  - [`func Configure(address: device.GuestAddress, width: int, height: int, stride: int, format: Format)`](#Framebuffer.Configure)
  - [`func Snapshot() throws -> [uint8]`](#Framebuffer.Snapshot)
  - [`func ToImage() throws -> image.RGBA?`](#Framebuffer.ToImage)
  - [`func SavePNG(to path: fs.Path) throws`](#Framebuffer.SavePNG)
- [`final class Ramfb`](#class-Ramfb)
  - [`init(memory: device.GuestMemory, fwcfg: boot.FwCfg)`](#Ramfb.init)
  - [`let Framebuffer: Framebuffer`](#Ramfb.Framebuffer)

## Types

### enum DisplayError <a id="enum-DisplayError"></a>

```vertex
public enum DisplayError: Error
```

Errors that can occur during display/framebuffer operations.

#### Cases

<a id="DisplayError.notConfigured"></a>

```vertex
case notConfigured
```

<a id="DisplayError.emptySnapshot"></a>

```vertex
case emptySnapshot
```

### enum Format <a id="enum-Format"></a>

```vertex
public enum Format
```

Pixel layouts a guest may choose.

#### Cases

<a id="Format.xrgb8888"></a>

```vertex
case xrgb8888
```

XRGB8888 / B8G8R8X8 little-endian: what UEFI GOP and Windows use.

<a id="Format.xbgr8888"></a>

```vertex
case xbgr8888
```

<a id="Format.rgb565"></a>

```vertex
case rgb565
```

### class Framebuffer <a id="class-Framebuffer"></a>

```vertex
public final class Framebuffer
```

A guest's framebuffer: guest RAM the host reads, and the region that
changed since the host last looked.

#### Initializers

<a id="Framebuffer.init"></a>

```vertex
public init(memory: device.GuestMemory, hostPointer: UnsafeMutableRawPointer? = nil)
```

#### Properties

<a id="Framebuffer.Width"></a>

```vertex
public private(set) var Width: int = 0
```

<a id="Framebuffer.Height"></a>

```vertex
public private(set) var Height: int = 0
```

<a id="Framebuffer.Stride"></a>

```vertex
public private(set) var Stride: int = 0
```

<a id="Framebuffer.Format"></a>

```vertex
public private(set) var Format: Format = .xrgb8888
```

<a id="Framebuffer.Address"></a>

```vertex
public private(set) var Address: device.GuestAddress = device.GuestAddress(0)
```

<a id="Framebuffer.HostPointer"></a>

```vertex
public private(set) var HostPointer: UnsafeMutableRawPointer? = nil
```

<a id="Framebuffer.Configured"></a>

```vertex
public var Configured: bool { get }
```

<a id="Framebuffer.Generation"></a>

```vertex
public var Generation: uint64 { get }
```

Bumped each time the mode changes, so a viewer knows to resize.

#### Methods

<a id="Framebuffer.Configure"></a>

```vertex
public func Configure(address: device.GuestAddress, width: int, height: int, stride: int, format: Format)
```

The guest (or its firmware) chose a mode.

<a id="Framebuffer.Snapshot"></a>

```vertex
public func Snapshot() throws -> [uint8]
```

Copies the visible pixels out as tightly packed RGBA rows, for
ui/window's Present.

<a id="Framebuffer.ToImage"></a>

```vertex
public func ToImage() throws -> image.RGBA?
```

Converts the current framebuffer snapshot into a standard image.RGBA.

<a id="Framebuffer.SavePNG"></a>

```vertex
public func SavePNG(to path: fs.Path) throws
```

Encodes the current framebuffer snapshot as a PNG and writes it to disk.

### class Ramfb <a id="class-Ramfb"></a>

```vertex
public final class Ramfb
```

ramfb: a framebuffer in ordinary guest RAM, configured by one fw_cfg
file ("etc/ramfb") the firmware writes: address, fourcc, flags, width,
height, stride, all big-endian. EDK2's QemuRamfbDxe sets it up and
exposes it as GOP; the OS then draws into the same memory.

#### Initializers

<a id="Ramfb.init"></a>

```vertex
public init(memory: device.GuestMemory, fwcfg: boot.FwCfg)
```

Registers "etc/ramfb" with the machine's fw_cfg.

#### Properties

<a id="Ramfb.Framebuffer"></a>

```vertex
public let Framebuffer: Framebuffer
```

## Files

- framebuffer.vs
- ramfb.vs
