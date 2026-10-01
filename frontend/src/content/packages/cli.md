# package cli

```vertex
import "cli"
```

## Index

- [`class App: Command`](#class-App)
  - [`init(name: string, about: string = "", version: string = "", author: string = "")`](#App.init)
  - [`var Version: string`](#App.Version)
  - [`var Author: string`](#App.Author)
  - [`static func SanitizeArgs(_ rawArgs: [string], appName: string) -> [string]`](#App.SanitizeArgs)
  - [`func Parse(_ rawArgs: [string]) throws -> Context`](#App.Parse)
  - [`func Run(_ rawArgs: [string] = CommandLine.arguments) async -> int32`](#App.Run)
  - [`func RunSync(_ rawArgs: [string] = CommandLine.arguments) -> int32`](#App.RunSync)
  - [`func Completions(_ shell: Shell) -> string`](#App.Completions)
- [`class Argument`](#class-Argument)
  - [`init(name: string, help: string = "", isRequired: bool = false, defaultValue: string? = nil)`](#Argument.init)
  - [`var Name: string`](#Argument.Name)
  - [`var Help: string`](#Argument.Help)
  - [`var IsRequired: bool`](#Argument.IsRequired)
  - [`var DefaultValue: string?`](#Argument.DefaultValue)
- [`enum CliError: Error, Equatable, CustomStringConvertible`](#enum-CliError)
  - [`var description: string { get }`](#CliError.description)
- [`class Command`](#class-Command)
  - [`init(name: string, about: string = "", aliases: [string] = [])`](#Command.init)
  - [`var Name: string`](#Command.Name)
  - [`var About: string`](#Command.About)
  - [`var Aliases: [string]`](#Command.Aliases)
  - [`var Options: [Option]`](#Command.Options)
  - [`var Arguments: [Argument]`](#Command.Arguments)
  - [`var Subcommands: [Command]`](#Command.Subcommands)
  - [`var ActionCallback: ((Context) async throws -> int32)?`](#Command.ActionCallback)
  - [`var ActionSyncCallback: ((Context) throws -> int32)?`](#Command.ActionSyncCallback)
  - [`func Option(_ name: string, short: string? = nil, default defaultValue: string? = nil, help: string = "", env: string? = nil, required: bool = false) -> Option`](#Command.Option)
  - [`func Flag(_ name: string, short: string? = nil, help: string = "") -> Option`](#Command.Flag)
  - [`func Argument(_ name: string, help: string = "", required: bool = false, default defaultValue: string? = nil) -> Argument`](#Command.Argument)
  - [`func Command(_ name: string, about: string = "", aliases: [string] = [], configure: ((Command) -> Void)? = nil) -> Command`](#Command.Command)
  - [`func Action(_ action: @escaping (Context) async throws -> int32)`](#Command.Action)
  - [`func ActionSync(_ action: @escaping (Context) throws -> int32)`](#Command.ActionSync)
  - [`func FindOption(_ nameOrShort: string) -> Option?`](#Command.FindOption)
  - [`func FindSubcommand(_ nameOrAlias: string) -> Command?`](#Command.FindSubcommand)
- [`class Completions`](#class-Completions)
  - [`static func Generate(app: App, shell: Shell) -> string`](#Completions.Generate)
- [`class Context`](#class-Context)
  - [`init(commandName: string = "", args: [string] = [], options: [string: string] = [:], raw: [string] = [])`](#Context.init)
  - [`var CommandName: string`](#Context.CommandName)
  - [`var Args: [string]`](#Context.Args)
  - [`var Options: [string: string]`](#Context.Options)
  - [`var Raw: [string]`](#Context.Raw)
  - [`func Arg(_ index: int) -> string?`](#Context.Arg)
  - [`func ArgOr(_ index: int, _ fallback: string) -> string`](#Context.ArgOr)
  - [`func ArgsAfter(_ index: int) -> [string]`](#Context.ArgsAfter)
  - [`func String(_ name: string) -> string?`](#Context.String)
  - [`func StringOr(_ name: string, _ fallback: string) -> string`](#Context.StringOr)
  - [`func Bool(_ name: string) -> bool`](#Context.Bool)
  - [`func Has(_ name: string) -> bool`](#Context.Has)
  - [`func Int(_ name: string) -> int64?`](#Context.Int)
  - [`func IntOr(_ name: string, _ fallback: int64) -> int64`](#Context.IntOr)
  - [`func Float(_ name: string) -> float64?`](#Context.Float)
  - [`func FloatOr(_ name: string, _ fallback: float64) -> float64`](#Context.FloatOr)
- [`class Help`](#class-Help)
  - [`static func Generate(app: App, command: Command) -> string`](#Help.Generate)
- [`class Option`](#class-Option)
  - [`init(name: string, short: string? = nil, help: string = "", defaultValue: string? = nil, envVar: string? = nil, isBoolean: bool = false, isRequired: bool = false)`](#Option.init)
  - [`var Name: string`](#Option.Name)
  - [`var Short: string?`](#Option.Short)
  - [`var Help: string`](#Option.Help)
  - [`var DefaultValue: string?`](#Option.DefaultValue)
  - [`var EnvVar: string?`](#Option.EnvVar)
  - [`var IsBoolean: bool`](#Option.IsBoolean)
  - [`var IsRequired: bool`](#Option.IsRequired)
- [`enum ParseResult`](#enum-ParseResult)
- [`class Parser`](#class-Parser)
  - [`static func Parse(app: App, tokens: [string]) -> ParseResult`](#Parser.Parse)
- [`enum Shell`](#enum-Shell)

## Types

### class App <a id="class-App"></a>

```vertex
public class App: Command
```

App represents the root command-line application.

#### Initializers

<a id="App.init"></a>

```vertex
public init(
    name: string,
    about: string = "",
    version: string = "",
    author: string = ""
)
```

#### Properties

<a id="App.Version"></a>

```vertex
public var Version: string
```

<a id="App.Author"></a>

```vertex
public var Author: string
```

#### Methods

<a id="App.SanitizeArgs"></a>

```vertex
public static func SanitizeArgs(_ rawArgs: [string], appName: string) -> [string]
```

Strips binary name / script path from argv if present.

<a id="App.Parse"></a>

```vertex
public func Parse(_ rawArgs: [string]) throws -> Context
```

Parses command-line tokens without executing an action callback.

<a id="App.Run"></a>

```vertex
public func Run(_ rawArgs: [string] = CommandLine.arguments) async -> int32
```

Runs the CLI application asynchronously and returns an exit code.

<a id="App.RunSync"></a>

```vertex
public func RunSync(_ rawArgs: [string] = CommandLine.arguments) -> int32
```

Runs the CLI application synchronously and returns an exit code.

<a id="App.Completions"></a>

```vertex
public func Completions(_ shell: Shell) -> string
```

Generates shell completion script for Bash, Zsh, or Fish.

### class Argument <a id="class-Argument"></a>

```vertex
public class Argument
```

Argument represents a positional command-line parameter.

#### Initializers

<a id="Argument.init"></a>

```vertex
public init(
    name: string,
    help: string = "",
    isRequired: bool = false,
    defaultValue: string? = nil
)
```

#### Properties

<a id="Argument.Name"></a>

```vertex
public var Name: string
```

<a id="Argument.Help"></a>

```vertex
public var Help: string
```

<a id="Argument.IsRequired"></a>

```vertex
public var IsRequired: bool
```

<a id="Argument.DefaultValue"></a>

```vertex
public var DefaultValue: string?
```

### enum CliError <a id="enum-CliError"></a>

```vertex
public enum CliError: Error, Equatable, CustomStringConvertible
```

#### Cases

<a id="CliError.parseFailure"></a>

```vertex
case parseFailure(string)
```

<a id="CliError.executionFailure"></a>

```vertex
case executionFailure(string)
```

<a id="CliError.helpRequested"></a>

```vertex
case helpRequested(string)
```

<a id="CliError.versionRequested"></a>

```vertex
case versionRequested(string)
```

#### Properties

<a id="CliError.description"></a>

```vertex
public var description: string { get }
```

### class Command <a id="class-Command"></a>

```vertex
public class Command
```

Command represents an executable command or subcommand in the CLI hierarchy.

#### Initializers

<a id="Command.init"></a>

```vertex
public init(name: string, about: string = "", aliases: [string] = [])
```

#### Properties

<a id="Command.Name"></a>

```vertex
public var Name: string
```

<a id="Command.About"></a>

```vertex
public var About: string
```

<a id="Command.Aliases"></a>

```vertex
public var Aliases: [string]
```

<a id="Command.Options"></a>

```vertex
public var Options: [Option]
```

<a id="Command.Arguments"></a>

```vertex
public var Arguments: [Argument]
```

<a id="Command.Subcommands"></a>

```vertex
public var Subcommands: [Command]
```

<a id="Command.ActionCallback"></a>

```vertex
public var ActionCallback: ((Context) async throws -> int32)?
```

<a id="Command.ActionSyncCallback"></a>

```vertex
public var ActionSyncCallback: ((Context) throws -> int32)?
```

#### Methods

<a id="Command.Option"></a>

```vertex
public func Option(
    _ name: string,
    short: string? = nil,
    default defaultValue: string? = nil,
    help: string = "",
    env: string? = nil,
    required: bool = false
) -> Option
```

Adds a value option (e.g. --port 8080 or -p 8080).

<a id="Command.Flag"></a>

```vertex
public func Flag(
    _ name: string,
    short: string? = nil,
    help: string = ""
) -> Option
```

Adds a boolean flag (e.g. --verbose or -v).

<a id="Command.Argument"></a>

```vertex
public func Argument(
    _ name: string,
    help: string = "",
    required: bool = false,
    default defaultValue: string? = nil
) -> Argument
```

Adds a positional argument.

<a id="Command.Command"></a>

```vertex
public func Command(
    _ name: string,
    about: string = "",
    aliases: [string] = [],
    configure: ((Command) -> Void)? = nil
) -> Command
```

Defines a subcommand.

<a id="Command.Action"></a>

```vertex
public func Action(_ action: @escaping (Context) async throws -> int32)
```

Sets the action callback to execute when this command matches.

<a id="Command.ActionSync"></a>

```vertex
public func ActionSync(_ action: @escaping (Context) throws -> int32)
```

Sets a synchronous action callback that returns an exit code.

<a id="Command.FindOption"></a>

```vertex
public func FindOption(_ nameOrShort: string) -> Option?
```

Finds an option by long name or short character.

<a id="Command.FindSubcommand"></a>

```vertex
public func FindSubcommand(_ nameOrAlias: string) -> Command?
```

Finds a subcommand by name or alias.

### class Completions <a id="class-Completions"></a>

```vertex
public class Completions
```

#### Methods

<a id="Completions.Generate"></a>

```vertex
public static func Generate(app: App, shell: Shell) -> string
```

### class Context <a id="class-Context"></a>

```vertex
public class Context
```

Context provides access to parsed flags, options, and positional arguments.

#### Initializers

<a id="Context.init"></a>

```vertex
public init(
    commandName: string = "",
    args: [string] = [],
    options: [string: string] = [:],
    raw: [string] = []
)
```

#### Properties

<a id="Context.CommandName"></a>

```vertex
public var CommandName: string
```

<a id="Context.Args"></a>

```vertex
public var Args: [string]
```

<a id="Context.Options"></a>

```vertex
public var Options: [string: string]
```

<a id="Context.Raw"></a>

```vertex
public var Raw: [string]
```

#### Methods

<a id="Context.Arg"></a>

```vertex
public func Arg(_ index: int) -> string?
```

Returns positional argument at index, or nil if index is out of bounds.

<a id="Context.ArgOr"></a>

```vertex
public func ArgOr(_ index: int, _ fallback: string) -> string
```

Returns positional argument at index, or fallback if index is out of bounds.

<a id="Context.ArgsAfter"></a>

```vertex
public func ArgsAfter(_ index: int) -> [string]
```

Returns slice of positional arguments starting from index.

<a id="Context.String"></a>

```vertex
public func String(_ name: string) -> string?
```

Returns string value of option, or nil if not present.

<a id="Context.StringOr"></a>

```vertex
public func StringOr(_ name: string, _ fallback: string) -> string
```

Returns string value of option, or fallback if not present.

<a id="Context.Bool"></a>

```vertex
public func Bool(_ name: string) -> bool
```

Returns true if boolean flag was specified on command line.

<a id="Context.Has"></a>

```vertex
public func Has(_ name: string) -> bool
```

Returns true if option or flag was set.

<a id="Context.Int"></a>

```vertex
public func Int(_ name: string) -> int64?
```

Parses option value as int64, or nil if missing/invalid.

<a id="Context.IntOr"></a>

```vertex
public func IntOr(_ name: string, _ fallback: int64) -> int64
```

Parses option value as int64, or returns fallback.

<a id="Context.Float"></a>

```vertex
public func Float(_ name: string) -> float64?
```

Parses option value as float64, or nil if missing/invalid.

<a id="Context.FloatOr"></a>

```vertex
public func FloatOr(_ name: string, _ fallback: float64) -> float64
```

Parses option value as float64, or returns fallback.

### class Help <a id="class-Help"></a>

```vertex
public class Help
```

#### Methods

<a id="Help.Generate"></a>

```vertex
public static func Generate(app: App, command: Command) -> string
```

### class Option <a id="class-Option"></a>

```vertex
public class Option
```

Option represents a named command-line flag or option (e.g. --port, -p).

#### Initializers

<a id="Option.init"></a>

```vertex
public init(
    name: string,
    short: string? = nil,
    help: string = "",
    defaultValue: string? = nil,
    envVar: string? = nil,
    isBoolean: bool = false,
    isRequired: bool = false
)
```

#### Properties

<a id="Option.Name"></a>

```vertex
public var Name: string
```

<a id="Option.Short"></a>

```vertex
public var Short: string?
```

<a id="Option.Help"></a>

```vertex
public var Help: string
```

<a id="Option.DefaultValue"></a>

```vertex
public var DefaultValue: string?
```

<a id="Option.EnvVar"></a>

```vertex
public var EnvVar: string?
```

<a id="Option.IsBoolean"></a>

```vertex
public var IsBoolean: bool
```

<a id="Option.IsRequired"></a>

```vertex
public var IsRequired: bool
```

### enum ParseResult <a id="enum-ParseResult"></a>

```vertex
public enum ParseResult
```

#### Cases

<a id="ParseResult.success"></a>

```vertex
case success(command: Command, context: Context)
```

<a id="ParseResult.help"></a>

```vertex
case help(text: string)
```

<a id="ParseResult.version"></a>

```vertex
case version(text: string)
```

<a id="ParseResult.failure"></a>

```vertex
case failure(error: string)
```

### class Parser <a id="class-Parser"></a>

```vertex
public class Parser
```

#### Methods

<a id="Parser.Parse"></a>

```vertex
public static func Parse(app: App, tokens: [string]) -> ParseResult
```

### enum Shell <a id="enum-Shell"></a>

```vertex
public enum Shell
```

#### Cases

<a id="Shell.bash"></a>

```vertex
case bash
```

<a id="Shell.zsh"></a>

```vertex
case zsh
```

<a id="Shell.fish"></a>

```vertex
case fish
```

## Files

- app.vs
- command.vs
- completions.vs
- context.vs
- help.vs
- option.vs
- parser.vs
