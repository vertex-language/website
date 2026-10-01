# package rdp

```vertex
import "remote/rdp"
```

Capability sets and the Confirm Active PDU ([MS-RDPBCGR] 2.2.1.13.2,
2.2.7). We advertise 32bpp bitmap updates with drawing orders disabled,
so a modern Windows server streams bitmap surface updates that we can
decode without implementing the GDI order set.

## Index

- [`func Connect(_ address: string, config: Config) async throws -> Session`](#func-Connect)
- [`func ConnectForTest(_ address: string, config: Config, trace: bool) async throws -> (Transport, ConnectionInfo)`](#func-ConnectForTest)
- [`func ConnectTraced(_ address: string, config: Config) async throws -> Session`](#func-ConnectTraced)
- [`func ParseFile(_ bytes: [uint8]) -> File`](#func-ParseFile)
- [`func ScancodeForCode(_ code: string) -> Scancode?`](#func-ScancodeForCode)
- [`func describeErrorInfo(_ code: uint32) -> string`](#func-describeErrorInfo)
- [`struct ClientData`](#struct-ClientData)
  - [`init(width: uint16, height: uint16, clientName: string, keyboardLayout: uint32, selectedProtocol: uint32, channels: [string] = [])`](#ClientData.init)
  - [`var DesktopWidth: uint16`](#ClientData.DesktopWidth)
  - [`var DesktopHeight: uint16`](#ClientData.DesktopHeight)
  - [`var ClientName: string`](#ClientData.ClientName)
  - [`var KeyboardLayout: uint32`](#ClientData.KeyboardLayout)
  - [`var SelectedProtocol: uint32`](#ClientData.SelectedProtocol)
  - [`var Channels: [string]`](#ClientData.Channels)
  - [`var DesktopScale: uint32 = 100`](#ClientData.DesktopScale)
  - [`var DeviceScale: uint32 = 100`](#ClientData.DeviceScale)
- [`struct Config`](#struct-Config)
  - [`init(username: string, password: [uint8], domain: string = "", width: uint16 = 1024, height: uint16 = 768, keyboardLayout: uint32 = 0x0409, clientName: string = "vertex")`](#Config.init)
  - [`var Username: string`](#Config.Username)
  - [`var Password: [uint8]`](#Config.Password)
  - [`var Domain: string`](#Config.Domain)
  - [`var Width: uint16`](#Config.Width)
  - [`var Height: uint16`](#Config.Height)
  - [`var KeyboardLayout: uint32`](#Config.KeyboardLayout)
  - [`var ClientName: string`](#Config.ClientName)
  - [`var DesktopScale: uint32 = 100`](#Config.DesktopScale)
- [`struct ConnectionInfo`](#struct-ConnectionInfo)
  - [`init()`](#ConnectionInfo.init)
  - [`var SelectedProtocol: uint32 = 0`](#ConnectionInfo.SelectedProtocol)
  - [`var UserChannel: uint16 = 0`](#ConnectionInfo.UserChannel)
  - [`var IOChannel: uint16 = 0`](#ConnectionInfo.IOChannel)
  - [`var ShareId: uint32 = 0`](#ConnectionInfo.ShareId)
  - [`var Width: uint16 = 0`](#ConnectionInfo.Width)
  - [`var Height: uint16 = 0`](#ConnectionInfo.Height)
- [`struct DemandActive`](#struct-DemandActive)
  - [`init()`](#DemandActive.init)
  - [`var ShareId: uint32 = 0`](#DemandActive.ShareId)
  - [`var DesktopWidth: uint16 = 0`](#DemandActive.DesktopWidth)
  - [`var DesktopHeight: uint16 = 0`](#DemandActive.DesktopHeight)
  - [`var ServerFastPathInput: bool = false`](#DemandActive.ServerFastPathInput)
  - [`var BitsPerPixel: uint16 = 0`](#DemandActive.BitsPerPixel)
- [`enum Event`](#enum-Event)
- [`struct File`](#struct-File)
  - [`init()`](#File.init)
  - [`var Address: string = ""`](#File.Address)
  - [`var Username: string = ""`](#File.Username)
  - [`var Domain: string = ""`](#File.Domain)
  - [`var DesktopWidth: int = 0`](#File.DesktopWidth)
  - [`var DesktopHeight: int = 0`](#File.DesktopHeight)
- [`struct Input`](#struct-Input)
  - [`func Key(_ key: Scancode, down: bool) async throws`](#Input.Key)
  - [`func Unicode(_ unit: uint16, down: bool) async throws`](#Input.Unicode)
  - [`func Text(_ text: string) async throws`](#Input.Text)
  - [`func Move(x: int, y: int) async throws`](#Input.Move)
  - [`func Button(_ b: MouseButton, down: bool, x: int, y: int) async throws`](#Input.Button)
  - [`func Wheel(vertical: int, horizontal: int, x: int, y: int) async throws`](#Input.Wheel)
  - [`func Sync(capsLock: bool, numLock: bool, scrollLock: bool) async throws`](#Input.Sync)
- [`enum MouseButton`](#enum-MouseButton)
- [`struct PointerFlags`](#struct-PointerFlags)
  - [`static let Move: uint16 = 0x0800`](#PointerFlags.Move)
  - [`static let Down: uint16 = 0x8000`](#PointerFlags.Down)
  - [`static let Button1: uint16 = 0x1000`](#PointerFlags.Button1)
  - [`static let Button2: uint16 = 0x2000`](#PointerFlags.Button2)
  - [`static let Button3: uint16 = 0x4000`](#PointerFlags.Button3)
  - [`static let Wheel: uint16 = 0x0200`](#PointerFlags.Wheel)
  - [`static let HWheel: uint16 = 0x0400`](#PointerFlags.HWheel)
  - [`static let WheelNegative: uint16 = 0x0100`](#PointerFlags.WheelNegative)
- [`struct PointerShape`](#struct-PointerShape)
  - [`init(width: int, height: int, hotX: int, hotY: int, pixels: [uint8])`](#PointerShape.init)
  - [`var Width: int`](#PointerShape.Width)
  - [`var Height: int`](#PointerShape.Height)
  - [`var HotX: int`](#PointerShape.HotX)
  - [`var HotY: int`](#PointerShape.HotY)
  - [`var Pixels: [uint8]`](#PointerShape.Pixels)
- [`enum RdpError: Error`](#enum-RdpError)
  - [`var Message: string { get }`](#RdpError.Message)
- [`struct Scancode`](#struct-Scancode)
  - [`init(_ code: uint8, extended: bool = false)`](#Scancode.init)
  - [`let Code: uint8`](#Scancode.Code)
  - [`let Extended: bool`](#Scancode.Extended)
- [`final class Sender`](#class-Sender)
  - [`func Send(_ bytes: [uint8]) async throws`](#Sender.Send)
  - [`func SendX224(_ payload: [uint8]) async throws`](#Sender.SendX224)
  - [`func Close()`](#Sender.Close)
- [`struct ServerChannels`](#struct-ServerChannels)
  - [`init()`](#ServerChannels.init)
  - [`var IOChannelId: uint16 = 0`](#ServerChannels.IOChannelId)
  - [`var ChannelIds: [uint16] = []`](#ServerChannels.ChannelIds)
- [`final class Session`](#class-Session)
  - [`var Info: ConnectionInfo`](#Session.Info)
  - [`var Framebuffer: gfx.Framebuffer`](#Session.Framebuffer)
  - [`var Trace: bool = false`](#Session.Trace)
  - [`var Input: Input { get }`](#Session.Input)
  - [`func NextEvent() async throws -> Event?`](#Session.NextEvent)
  - [`func Close()`](#Session.Close)
- [`struct Transport`](#struct-Transport)
  - [`init(conn: tls.Conn12)`](#Transport.init)
  - [`var Out: Sender`](#Transport.Out)
  - [`func SendX224(_ payload: [uint8]) async throws`](#Transport.SendX224)
  - [`mutating func NextFrame() async throws -> x224.Frame`](#Transport.NextFrame)
  - [`mutating func NextX224Payload() async throws -> [uint8]`](#Transport.NextX224Payload)

## Functions

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(_ address: string, config: Config) async throws -> Session
```

Connect dials a Windows host, authenticates with NLA, and runs the
connection sequence; the returned Session then streams the desktop.
address is "host" or "host:port" (3389 when no port is given).

### func ConnectForTest <a id="func-ConnectForTest"></a>

```vertex
public func ConnectForTest(_ address: string, config: Config, trace: bool) async throws -> (Transport, ConnectionInfo)
```

ConnectForTest exposes the pre-graphics connection sequence for tests.

### func ConnectTraced <a id="func-ConnectTraced"></a>

```vertex
public func ConnectTraced(_ address: string, config: Config) async throws -> Session
```

ConnectTraced is Connect with the connection sequence printed.

### func ParseFile <a id="func-ParseFile"></a>

```vertex
public func ParseFile(_ bytes: [uint8]) -> File
```

ParseFile reads an .rdp file's bytes: UTF-8, or UTF-16LE with a byte
order mark as mstsc writes them.

### func ScancodeForCode <a id="func-ScancodeForCode"></a>

```vertex
public func ScancodeForCode(_ code: string) -> Scancode?
```

ScancodeForCode maps a W3C KeyboardEvent.code name ("KeyA", "Enter",
"ArrowLeft", "NumpadEnter", …) to its scan code, or nil for a code
with none.

### func describeErrorInfo <a id="func-describeErrorInfo"></a>

```vertex
public func describeErrorInfo(_ code: uint32) -> string
```

describeErrorInfo names a Set Error Info code ([MS-RDPBCGR] 2.2.5.1.1).

## Types

### struct ClientData <a id="struct-ClientData"></a>

```vertex
public struct ClientData
```

ClientData holds the parameters carried in the GCC client blocks.

#### Initializers

<a id="ClientData.init"></a>

```vertex
public init(width: uint16, height: uint16, clientName: string,
            keyboardLayout: uint32, selectedProtocol: uint32, channels: [string] = [])
```

#### Properties

<a id="ClientData.DesktopWidth"></a>

```vertex
public var DesktopWidth: uint16
```

<a id="ClientData.DesktopHeight"></a>

```vertex
public var DesktopHeight: uint16
```

<a id="ClientData.ClientName"></a>

```vertex
public var ClientName: string
```

<a id="ClientData.KeyboardLayout"></a>

```vertex
public var KeyboardLayout: uint32
```

<a id="ClientData.SelectedProtocol"></a>

```vertex
public var SelectedProtocol: uint32
```

<a id="ClientData.Channels"></a>

```vertex
public var Channels: [string]
```

<a id="ClientData.DesktopScale"></a>

```vertex
public var DesktopScale: uint32 = 100
```

Percent the server scales its UI by (100...500), and the device
scale (100, 140 or 180).

<a id="ClientData.DeviceScale"></a>

```vertex
public var DeviceScale: uint32 = 100
```

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Config configures an RDP connection.

#### Initializers

<a id="Config.init"></a>

```vertex
public init(username: string, password: [uint8], domain: string = "",
            width: uint16 = 1024, height: uint16 = 768,
            keyboardLayout: uint32 = 0x0409, clientName: string = "vertex")
```

#### Properties

<a id="Config.Username"></a>

```vertex
public var Username: string
```

<a id="Config.Password"></a>

```vertex
public var Password: [uint8]
```

<a id="Config.Domain"></a>

```vertex
public var Domain: string
```

<a id="Config.Width"></a>

```vertex
public var Width: uint16
```

<a id="Config.Height"></a>

```vertex
public var Height: uint16
```

<a id="Config.KeyboardLayout"></a>

```vertex
public var KeyboardLayout: uint32
```

<a id="Config.ClientName"></a>

```vertex
public var ClientName: string
```

<a id="Config.DesktopScale"></a>

```vertex
public var DesktopScale: uint32 = 100
```

Percent the server should scale its UI by: 100, or 200 for a
desktop sized in a Retina display's pixels. 100...500.

### struct ConnectionInfo <a id="struct-ConnectionInfo"></a>

```vertex
public struct ConnectionInfo
```

ConnectionInfo records what the connection sequence negotiated.

#### Initializers

<a id="ConnectionInfo.init"></a>

```vertex
public init()
```

#### Properties

<a id="ConnectionInfo.SelectedProtocol"></a>

```vertex
public var SelectedProtocol: uint32 = 0
```

<a id="ConnectionInfo.UserChannel"></a>

```vertex
public var UserChannel: uint16 = 0
```

<a id="ConnectionInfo.IOChannel"></a>

```vertex
public var IOChannel: uint16 = 0
```

<a id="ConnectionInfo.ShareId"></a>

```vertex
public var ShareId: uint32 = 0
```

<a id="ConnectionInfo.Width"></a>

```vertex
public var Width: uint16 = 0
```

<a id="ConnectionInfo.Height"></a>

```vertex
public var Height: uint16 = 0
```

### struct DemandActive <a id="struct-DemandActive"></a>

```vertex
public struct DemandActive
```

DemandActive holds what we need from the server's Demand Active PDU:
the share id and the desktop size from its Bitmap capability set.

#### Initializers

<a id="DemandActive.init"></a>

```vertex
public init()
```

#### Properties

<a id="DemandActive.ShareId"></a>

```vertex
public var ShareId: uint32 = 0
```

<a id="DemandActive.DesktopWidth"></a>

```vertex
public var DesktopWidth: uint16 = 0
```

<a id="DemandActive.DesktopHeight"></a>

```vertex
public var DesktopHeight: uint16 = 0
```

<a id="DemandActive.ServerFastPathInput"></a>

```vertex
public var ServerFastPathInput: bool = false
```

<a id="DemandActive.BitsPerPixel"></a>

```vertex
public var BitsPerPixel: uint16 = 0
```

The color depth the server settled on (its Bitmap set's
preferredBitsPerPixel).

### enum Event <a id="enum-Event"></a>

```vertex
public enum Event
```

Event is what a Session reports to its consumer.

#### Cases

<a id="Event.frame"></a>

```vertex
case frame(gfx.Rect)
```

Pixels changed inside damage; read them with the Framebuffer.

<a id="Event.pointer"></a>

```vertex
case pointer(PointerShape)
```

The pointer's shape changed (a new shape, or one from the cache).

<a id="Event.pointerHidden"></a>

```vertex
case pointerHidden
```

<a id="Event.pointerDefault"></a>

```vertex
case pointerDefault
```

<a id="Event.pointerPosition"></a>

```vertex
case pointerPosition(int, int)
```

<a id="Event.logonComplete"></a>

```vertex
case logonComplete
```

The user is logged on (Save Session Info PDU).

<a id="Event.resized"></a>

```vertex
case resized(int, int)
```

The server sent Deactivate All; it will follow with a new Demand
Active (for example after a resize). The session handles the
reactivation itself and reports the new desktop size here.

<a id="Event.disconnected"></a>

```vertex
case disconnected(string)
```

The connection ended; the string is the reason.

### struct File <a id="struct-File"></a>

```vertex
public struct File
```

File is what an .rdp file says about a connection.

#### Initializers

<a id="File.init"></a>

```vertex
public init()
```

#### Properties

<a id="File.Address"></a>

```vertex
public var Address: string = ""
```

"host" or "host:port".

<a id="File.Username"></a>

```vertex
public var Username: string = ""
```

<a id="File.Domain"></a>

```vertex
public var Domain: string = ""
```

<a id="File.DesktopWidth"></a>

```vertex
public var DesktopWidth: int = 0
```

0 when the file doesn't say.

<a id="File.DesktopHeight"></a>

```vertex
public var DesktopHeight: int = 0
```

### struct Input <a id="struct-Input"></a>

```vertex
public struct Input
```

Input sends keyboard and mouse events. It is a small value around the
connection's Sender, safe to copy to and use from another task than
the one reading the session.

#### Methods

<a id="Input.Key"></a>

```vertex
public func Key(_ key: Scancode, down: bool) async throws
```

Key presses or releases a key by scan code.

<a id="Input.Unicode"></a>

```vertex
public func Unicode(_ unit: uint16, down: bool) async throws
```

Unicode types a UTF-16 code unit the keyboard layout can't reach.

<a id="Input.Text"></a>

```vertex
public func Text(_ text: string) async throws
```

Text types a string as Unicode key presses.

<a id="Input.Move"></a>

```vertex
public func Move(x: int, y: int) async throws
```

Move puts the pointer at desktop pixel (x, y).

<a id="Input.Button"></a>

```vertex
public func Button(_ b: MouseButton, down: bool, x: int, y: int) async throws
```

Button presses or releases a mouse button at (x, y).

<a id="Input.Wheel"></a>

```vertex
public func Wheel(vertical: int, horizontal: int, x: int, y: int) async throws
```

Wheel scrolls by rotation units (120 per notch; positive is up or
right). Large values go out as several events.

<a id="Input.Sync"></a>

```vertex
public func Sync(capsLock: bool, numLock: bool, scrollLock: bool) async throws
```

Sync tells the server which toggle keys are on, as on focus gain.

### enum MouseButton <a id="enum-MouseButton"></a>

```vertex
public enum MouseButton
```

MouseButton names the buttons Input.Button takes.

#### Cases

<a id="MouseButton.left"></a>

```vertex
case left
```

<a id="MouseButton.right"></a>

```vertex
case right
```

<a id="MouseButton.middle"></a>

```vertex
case middle
```

<a id="MouseButton.back"></a>

```vertex
case back
```

<a id="MouseButton.forward"></a>

```vertex
case forward
```

### struct PointerFlags <a id="struct-PointerFlags"></a>

```vertex
public struct PointerFlags
```

Pointer flags for mouse events ([MS-RDPBCGR] 2.2.8.1.1.3.1.1.3).

#### Properties

<a id="PointerFlags.Move"></a>

```vertex
public static let Move: uint16 = 0x0800
```

<a id="PointerFlags.Down"></a>

```vertex
public static let Down: uint16 = 0x8000
```

<a id="PointerFlags.Button1"></a>

```vertex
public static let Button1: uint16 = 0x1000
```

<a id="PointerFlags.Button2"></a>

```vertex
public static let Button2: uint16 = 0x2000
```

left

<a id="PointerFlags.Button3"></a>

```vertex
public static let Button3: uint16 = 0x4000
```

right

<a id="PointerFlags.Wheel"></a>

```vertex
public static let Wheel: uint16 = 0x0200
```

middle

<a id="PointerFlags.HWheel"></a>

```vertex
public static let HWheel: uint16 = 0x0400
```

<a id="PointerFlags.WheelNegative"></a>

```vertex
public static let WheelNegative: uint16 = 0x0100
```

### struct PointerShape <a id="struct-PointerShape"></a>

```vertex
public struct PointerShape
```

PointerShape is a decoded pointer: premultiplied RGBA, top row first.

#### Initializers

<a id="PointerShape.init"></a>

```vertex
public init(width: int, height: int, hotX: int, hotY: int, pixels: [uint8])
```

#### Properties

<a id="PointerShape.Width"></a>

```vertex
public var Width: int
```

<a id="PointerShape.Height"></a>

```vertex
public var Height: int
```

<a id="PointerShape.HotX"></a>

```vertex
public var HotX: int
```

<a id="PointerShape.HotY"></a>

```vertex
public var HotY: int
```

<a id="PointerShape.Pixels"></a>

```vertex
public var Pixels: [uint8]
```

### enum RdpError <a id="enum-RdpError"></a>

```vertex
public enum RdpError: Error
```

RdpError is any failure in the RDP connection or session.

#### Cases

<a id="RdpError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="RdpError.connectionClosed"></a>

```vertex
case connectionClosed
```

<a id="RdpError.negotiationRejected"></a>

```vertex
case negotiationRejected(string)
```

#### Properties

<a id="RdpError.Message"></a>

```vertex
public var Message: string { get }
```

### struct Scancode <a id="struct-Scancode"></a>

```vertex
public struct Scancode
```

Scancode is a key's scan code set 1 make code, with the E0 prefix
folded in as Extended.

#### Initializers

<a id="Scancode.init"></a>

```vertex
public init(_ code: uint8, extended: bool = false)
```

#### Properties

<a id="Scancode.Code"></a>

```vertex
public let Code: uint8
```

<a id="Scancode.Extended"></a>

```vertex
public let Extended: bool
```

### class Sender <a id="class-Sender"></a>

```vertex
public final class Sender
```

Sender is the write half of the connection. The session and its Input
share one, from different tasks: writes queue up and go out whole and
in order, so TLS records never interleave.

#### Methods

<a id="Sender.Send"></a>

```vertex
public func Send(_ bytes: [uint8]) async throws
```

Send writes bytes to the server as they are (already framed).

<a id="Sender.SendX224"></a>

```vertex
public func SendX224(_ payload: [uint8]) async throws
```

SendX224 wraps a payload in an X.224 Data PDU and sends it.

<a id="Sender.Close"></a>

```vertex
public func Close()
```

Close shuts the socket; a read waiting on the other half ends too.

### struct ServerChannels <a id="struct-ServerChannels"></a>

```vertex
public struct ServerChannels
```

ServerChannels holds the channel IDs parsed from the Connect Response.

#### Initializers

<a id="ServerChannels.init"></a>

```vertex
public init()
```

#### Properties

<a id="ServerChannels.IOChannelId"></a>

```vertex
public var IOChannelId: uint16 = 0
```

<a id="ServerChannels.ChannelIds"></a>

```vertex
public var ChannelIds: [uint16] = []
```

### class Session <a id="class-Session"></a>

```vertex
public final class Session
```

Session is a connected RDP session. Call NextEvent in a loop on one
task; the Framebuffer holds the desktop as of the last .frame event,
and Input sends keys and pointer events from any task.

#### Properties

<a id="Session.Info"></a>

```vertex
public var Info: ConnectionInfo
```

<a id="Session.Framebuffer"></a>

```vertex
public var Framebuffer: gfx.Framebuffer
```

<a id="Session.Trace"></a>

```vertex
public var Trace: bool = false
```

Trace prints each PDU as it is handled.

<a id="Session.Input"></a>

```vertex
public var Input: Input { get }
```

Input sends keyboard and mouse events to the server.

#### Methods

<a id="Session.NextEvent"></a>

```vertex
public func NextEvent() async throws -> Event?
```

NextEvent waits for the next event; nil once the session has ended.

<a id="Session.Close"></a>

```vertex
public func Close()
```

Close ends the session and shuts the connection.

### struct Transport <a id="struct-Transport"></a>

```vertex
public struct Transport
```

Transport moves RDP PDUs over the authenticated TLS channel. Reads
happen here, on one task, splitting the stream into TPKT and fast-path
frames; writes go through the shared Sender.

#### Initializers

<a id="Transport.init"></a>

```vertex
public init(conn: tls.Conn12)
```

Takes over an authenticated connection. The read state stays here
and the write state goes to the Sender: TLS 1.2 keeps the two
directions apart, and nothing on the read path writes.

#### Properties

<a id="Transport.Out"></a>

```vertex
public var Out: Sender
```

#### Methods

<a id="Transport.SendX224"></a>

```vertex
public func SendX224(_ payload: [uint8]) async throws
```

SendX224 wraps a payload in an X.224 Data PDU and sends it.

<a id="Transport.NextFrame"></a>

```vertex
public mutating func NextFrame() async throws -> x224.Frame
```

NextFrame returns the next whole frame from the server, reading more
TLS data as needed.

<a id="Transport.NextX224Payload"></a>

```vertex
public mutating func NextX224Payload() async throws -> [uint8]
```

NextX224Payload returns the payload of the next slow-path X.224 Data
PDU (skipping any fast-path frames, which do not occur pre-capability).

## Files

- caps.vs
- connect.vs
- errors.vs
- input.vs
- mcs.vs
- pdu.vs
- rdpfile.vs
- session.vs
- transport.vs
