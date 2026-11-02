# package log

```vertex
import "log"
```

## Index

- [`func Debug(message: string, attrs: [Attr] = [])`](#func-Debug)
- [`func Debug(message: string, fields: [string: string])`](#func-Debug-2)
- [`func Error(message: string, attrs: [Attr] = [])`](#func-Error)
- [`func Error(message: string, fields: [string: string])`](#func-Error-2)
- [`func Info(message: string, attrs: [Attr] = [])`](#func-Info)
- [`func Info(message: string, fields: [string: string])`](#func-Info-2)
- [`func JSON(minLevel: Level? = nil, emit: ((string) -> Void)? = nil) -> Handler`](#func-JSON)
- [`func SetHandler(handler: Handler)`](#func-SetHandler)
- [`func SetLevel(level: Level)`](#func-SetLevel)
- [`func Text(minLevel: Level? = nil, colors: bool? = nil, emit: ((string) -> Void)? = nil) -> Handler`](#func-Text)
- [`func Warn(message: string, attrs: [Attr] = [])`](#func-Warn)
- [`func Warn(message: string, fields: [string: string])`](#func-Warn-2)
- [`func With(attrs: [Attr]) -> Logger`](#func-With)
- [`func With(fields: [string: string]) -> Logger`](#func-With-2)
- [`struct Attr`](#struct-Attr)
  - [`init(key: string, value: string)`](#Attr.init)
  - [`init(key: string, value: int)`](#Attr.init-2)
  - [`init(key: string, value: int64)`](#Attr.init-3)
  - [`init(key: string, value: int32)`](#Attr.init-4)
  - [`init(key: string, value: float64)`](#Attr.init-5)
  - [`init(key: string, value: float32)`](#Attr.init-6)
  - [`init(key: string, value: bool)`](#Attr.init-7)
  - [`var Key: string`](#Attr.Key)
  - [`var Value: string`](#Attr.Value)
  - [`var IsQuoted: bool`](#Attr.IsQuoted)
  - [`static func String(key: string, value: string) -> Attr`](#Attr.String)
  - [`static func Int(key: string, value: int64) -> Attr`](#Attr.Int)
  - [`static func Float(key: string, value: float64) -> Attr`](#Attr.Float)
  - [`static func Bool(key: string, value: bool) -> Attr`](#Attr.Bool)
- [`enum Format`](#enum-Format)
- [`struct Handler`](#struct-Handler)
  - [`init(format: Format, minLevel: Level, useColors: bool = false, baseAttrs: [Attr] = [], emit: ((string) -> Void)? = nil)`](#Handler.init)
  - [`var OutputFormat: Format`](#Handler.OutputFormat)
  - [`var MinLevel: Level`](#Handler.MinLevel)
  - [`var UseColors: bool`](#Handler.UseColors)
  - [`var BaseAttrs: [Attr]`](#Handler.BaseAttrs)
  - [`var Emit: ((string) -> Void)?`](#Handler.Emit)
  - [`static func Text(minLevel: Level? = nil, colors: bool? = nil, emit: ((string) -> Void)? = nil) -> Handler`](#Handler.Text)
  - [`static func JSON(minLevel: Level? = nil, emit: ((string) -> Void)? = nil) -> Handler`](#Handler.JSON)
  - [`func Enabled(level: Level) -> bool`](#Handler.Enabled)
  - [`func WithAttrs(attrs: [Attr]) -> Handler`](#Handler.WithAttrs)
  - [`func FormatRecord(record: Record) -> string`](#Handler.FormatRecord)
  - [`func Handle(record: Record)`](#Handler.Handle)
- [`enum Level`](#enum-Level)
  - [`func Value() -> int32`](#Level.Value)
  - [`func Name() -> string`](#Level.Name)
  - [`func AnsiColor() -> string`](#Level.AnsiColor)
  - [`func IsEnabled(minLevel: Level) -> bool`](#Level.IsEnabled)
  - [`static func Parse(str: string) -> Level?`](#Level.Parse)
- [`struct Logger`](#struct-Logger)
  - [`init(handler: Handler? = nil)`](#Logger.init)
  - [`var H: Handler`](#Logger.H)
  - [`func With(attrs: [Attr]) -> Logger`](#Logger.With)
  - [`func With(fields: [string: string]) -> Logger`](#Logger.With-2)
  - [`func Log(level: Level, message: string, attrs: [Attr] = [])`](#Logger.Log)
  - [`func Debug(message: string, attrs: [Attr] = [])`](#Logger.Debug)
  - [`func Debug(message: string, fields: [string: string])`](#Logger.Debug-2)
  - [`func Info(message: string, attrs: [Attr] = [])`](#Logger.Info)
  - [`func Info(message: string, fields: [string: string])`](#Logger.Info-2)
  - [`func Warn(message: string, attrs: [Attr] = [])`](#Logger.Warn)
  - [`func Warn(message: string, fields: [string: string])`](#Logger.Warn-2)
  - [`func Error(message: string, attrs: [Attr] = [])`](#Logger.Error)
  - [`func Error(message: string, fields: [string: string])`](#Logger.Error-2)
- [`struct Record`](#struct-Record)
  - [`init(level: Level, message: string, attrs: [Attr] = [], time: string? = nil)`](#Record.init)
  - [`var Time: string`](#Record.Time)
  - [`var Level: Level`](#Record.Level)
  - [`var Message: string`](#Record.Message)
  - [`var Attrs: [Attr]`](#Record.Attrs)

## Functions

### func Debug <a id="func-Debug"></a>

```vertex
public func Debug(message: string, attrs: [Attr] = [])
```

### func Debug <a id="func-Debug-2"></a>

```vertex
public func Debug(message: string, fields: [string: string])
```

### func Error <a id="func-Error"></a>

```vertex
public func Error(message: string, attrs: [Attr] = [])
```

### func Error <a id="func-Error-2"></a>

```vertex
public func Error(message: string, fields: [string: string])
```

### func Info <a id="func-Info"></a>

```vertex
public func Info(message: string, attrs: [Attr] = [])
```

### func Info <a id="func-Info-2"></a>

```vertex
public func Info(message: string, fields: [string: string])
```

### func JSON <a id="func-JSON"></a>

```vertex
public func JSON(minLevel: Level? = nil, emit: ((string) -> Void)? = nil) -> Handler
```

### func SetHandler <a id="func-SetHandler"></a>

```vertex
public func SetHandler(handler: Handler)
```

### func SetLevel <a id="func-SetLevel"></a>

```vertex
public func SetLevel(level: Level)
```

### func Text <a id="func-Text"></a>

```vertex
public func Text(minLevel: Level? = nil, colors: bool? = nil, emit: ((string) -> Void)? = nil) -> Handler
```

Factory functions for handlers matching slog/proposed syntax

### func Warn <a id="func-Warn"></a>

```vertex
public func Warn(message: string, attrs: [Attr] = [])
```

### func Warn <a id="func-Warn-2"></a>

```vertex
public func Warn(message: string, fields: [string: string])
```

### func With <a id="func-With"></a>

```vertex
public func With(attrs: [Attr]) -> Logger
```

### func With <a id="func-With-2"></a>

```vertex
public func With(fields: [string: string]) -> Logger
```

## Types

### struct Attr <a id="struct-Attr"></a>

```vertex
public struct Attr
```

Attr represents a structured key-value attribute attached to a log record.

#### Initializers

<a id="Attr.init"></a>

```vertex
public init(key: string, value: string)
```

<a id="Attr.init-2"></a>

```vertex
public init(key: string, value: int)
```

<a id="Attr.init-3"></a>

```vertex
public init(key: string, value: int64)
```

<a id="Attr.init-4"></a>

```vertex
public init(key: string, value: int32)
```

<a id="Attr.init-5"></a>

```vertex
public init(key: string, value: float64)
```

<a id="Attr.init-6"></a>

```vertex
public init(key: string, value: float32)
```

<a id="Attr.init-7"></a>

```vertex
public init(key: string, value: bool)
```

#### Properties

<a id="Attr.Key"></a>

```vertex
public var Key: string
```

<a id="Attr.Value"></a>

```vertex
public var Value: string
```

<a id="Attr.IsQuoted"></a>

```vertex
public var IsQuoted: bool
```

#### Methods

<a id="Attr.String"></a>

```vertex
public static func String(key: string, value: string) -> Attr
```

<a id="Attr.Int"></a>

```vertex
public static func Int(key: string, value: int64) -> Attr
```

<a id="Attr.Float"></a>

```vertex
public static func Float(key: string, value: float64) -> Attr
```

<a id="Attr.Bool"></a>

```vertex
public static func Bool(key: string, value: bool) -> Attr
```

### enum Format <a id="enum-Format"></a>

```vertex
public enum Format
```

#### Cases

<a id="Format.text"></a>

```vertex
case text
```

<a id="Format.json"></a>

```vertex
case json
```

### struct Handler <a id="struct-Handler"></a>

```vertex
public struct Handler
```

Handler formats and delivers log records to an output destination.

#### Initializers

<a id="Handler.init"></a>

```vertex
public init(format: Format, minLevel: Level, useColors: bool = false, baseAttrs: [Attr] = [], emit: ((string) -> Void)? = nil)
```

#### Properties

<a id="Handler.OutputFormat"></a>

```vertex
public var OutputFormat: Format
```

<a id="Handler.MinLevel"></a>

```vertex
public var MinLevel: Level
```

<a id="Handler.UseColors"></a>

```vertex
public var UseColors: bool
```

<a id="Handler.BaseAttrs"></a>

```vertex
public var BaseAttrs: [Attr]
```

<a id="Handler.Emit"></a>

```vertex
public var Emit: ((string) -> Void)?
```

#### Methods

<a id="Handler.Text"></a>

```vertex
public static func Text(minLevel: Level? = nil, colors: bool? = nil, emit: ((string) -> Void)? = nil) -> Handler
```

Creates a human-readable text handler.

<a id="Handler.JSON"></a>

```vertex
public static func JSON(minLevel: Level? = nil, emit: ((string) -> Void)? = nil) -> Handler
```

Creates a machine-readable structured JSON handler.

<a id="Handler.Enabled"></a>

```vertex
public func Enabled(level: Level) -> bool
```

<a id="Handler.WithAttrs"></a>

```vertex
public func WithAttrs(attrs: [Attr]) -> Handler
```

<a id="Handler.FormatRecord"></a>

```vertex
public func FormatRecord(record: Record) -> string
```

<a id="Handler.Handle"></a>

```vertex
public func Handle(record: Record)
```

### enum Level <a id="enum-Level"></a>

```vertex
public enum Level
```

Level represents the severity of a log record.

#### Cases

<a id="Level.debug"></a>

```vertex
case debug
```

<a id="Level.info"></a>

```vertex
case info
```

<a id="Level.warn"></a>

```vertex
case warn
```

<a id="Level.error"></a>

```vertex
case error
```

#### Methods

<a id="Level.Value"></a>

```vertex
public func Value() -> int32
```

Numeric weight for level comparison (debug: 0, info: 1, warn: 2, error: 3).

<a id="Level.Name"></a>

```vertex
public func Name() -> string
```

Returns standard uppercase name (DEBUG, INFO, WARN, ERROR).

<a id="Level.AnsiColor"></a>

```vertex
public func AnsiColor() -> string
```

ANSI color escape sequence for terminal output.

<a id="Level.IsEnabled"></a>

```vertex
public func IsEnabled(minLevel: Level) -> bool
```

Returns true if this level meets or exceeds the minimum level.

<a id="Level.Parse"></a>

```vertex
public static func Parse(str: string) -> Level?
```

Parses level from string (e.g. "debug", "info", "warn", "error").

### struct Logger <a id="struct-Logger"></a>

```vertex
public struct Logger
```

Logger produces structured log records and forwards them to a Handler.

#### Initializers

<a id="Logger.init"></a>

```vertex
public init(handler: Handler? = nil)
```

#### Properties

<a id="Logger.H"></a>

```vertex
public var H: Handler
```

#### Methods

<a id="Logger.With"></a>

```vertex
public func With(attrs: [Attr]) -> Logger
```

Returns a new Logger with the given attributes appended to every record.

<a id="Logger.With-2"></a>

```vertex
public func With(fields: [string: string]) -> Logger
```

Returns a new Logger with the given key-value dictionary appended to every record.

<a id="Logger.Log"></a>

```vertex
public func Log(level: Level, message: string, attrs: [Attr] = [])
```

<a id="Logger.Debug"></a>

```vertex
public func Debug(message: string, attrs: [Attr] = [])
```

<a id="Logger.Debug-2"></a>

```vertex
public func Debug(message: string, fields: [string: string])
```

<a id="Logger.Info"></a>

```vertex
public func Info(message: string, attrs: [Attr] = [])
```

<a id="Logger.Info-2"></a>

```vertex
public func Info(message: string, fields: [string: string])
```

<a id="Logger.Warn"></a>

```vertex
public func Warn(message: string, attrs: [Attr] = [])
```

<a id="Logger.Warn-2"></a>

```vertex
public func Warn(message: string, fields: [string: string])
```

<a id="Logger.Error"></a>

```vertex
public func Error(message: string, attrs: [Attr] = [])
```

<a id="Logger.Error-2"></a>

```vertex
public func Error(message: string, fields: [string: string])
```

### struct Record <a id="struct-Record"></a>

```vertex
public struct Record
```

Record holds a single log entry.

#### Initializers

<a id="Record.init"></a>

```vertex
public init(level: Level, message: string, attrs: [Attr] = [], time: string? = nil)
```

#### Properties

<a id="Record.Time"></a>

```vertex
public var Time: string
```

<a id="Record.Level"></a>

```vertex
public var Level: Level
```

<a id="Record.Message"></a>

```vertex
public var Message: string
```

<a id="Record.Attrs"></a>

```vertex
public var Attrs: [Attr]
```

## Files

- attr.vs
- handler.vs
- level.vs
- logger.vs
- record.vs
