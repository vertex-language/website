# package process

```vertex
import "os/process"
```

## Index

- [Variables](#variables)
- [`func Abort() -> Never`](#func-Abort)
- [`func CurrentDir() throws -> string`](#func-CurrentDir)
- [`func ExecutablePath() -> string?`](#func-ExecutablePath)
- [`func Exit(_ code: int32) -> Never`](#func-Exit)
- [`func Find(_ name: string) -> string?`](#func-Find)
- [`func Run(_ program: string, _ args: [string] = []) async throws -> Output`](#func-Run)
- [`func SetCurrentDir(_ path: string) throws`](#func-SetCurrentDir)
- [`final class Child`](#class-Child)
  - [`let ID: int64`](#Child.ID)
  - [`let Stdin: PipeWriter?`](#Child.Stdin)
  - [`let Stdout: PipeReader?`](#Child.Stdout)
  - [`let Stderr: PipeReader?`](#Child.Stderr)
  - [`func Wait() async throws -> ExitStatus`](#Child.Wait)
  - [`func TryWait() throws -> ExitStatus?`](#Child.TryWait)
  - [`func Terminate()`](#Child.Terminate)
  - [`func Kill()`](#Child.Kill)
  - [`func Signal(_ kind: signal.Kind) throws`](#Child.Signal)
- [`struct Command`](#struct-Command)
  - [`init(_ program: string, _ args: [string] = [])`](#Command.init)
  - [`var Program: string`](#Command.Program)
  - [`var Args: [string]`](#Command.Args)
  - [`var Dir: string?`](#Command.Dir)
  - [`var Env: [string: string]`](#Command.Env)
  - [`var ClearEnv: bool`](#Command.ClearEnv)
  - [`var Stdin: Stdio`](#Command.Stdin)
  - [`var Stdout: Stdio`](#Command.Stdout)
  - [`var Stderr: Stdio`](#Command.Stderr)
  - [`func Spawn() throws -> Child`](#Command.Spawn)
  - [`func Output() async throws -> Output`](#Command.Output)
  - [`func Status() async throws -> ExitStatus`](#Command.Status)
- [`enum ExitStatus: Equatable, CustomStringConvertible`](#enum-ExitStatus)
  - [`var Success: bool { get }`](#ExitStatus.Success)
  - [`var Code: int32? { get }`](#ExitStatus.Code)
  - [`var description: string { get }`](#ExitStatus.description)
- [`struct Output`](#struct-Output)
  - [`let Status: ExitStatus`](#Output.Status)
  - [`let Stdout: [uint8]`](#Output.Stdout)
  - [`let Stderr: [uint8]`](#Output.Stderr)
  - [`var StdoutText: string { get }`](#Output.StdoutText)
  - [`var StderrText: string { get }`](#Output.StderrText)
- [`final class PipeReader: io.AsyncReader, io.Closer`](#class-PipeReader)
  - [`func Read(into buffer: inout [uint8]) async throws -> int`](#PipeReader.Read)
  - [`func ReadToEnd(limit: int = 64 * 1024 * 1024) async throws -> [uint8]`](#PipeReader.ReadToEnd)
  - [`func ReadText(limit: int = 64 * 1024 * 1024) async throws -> string`](#PipeReader.ReadText)
  - [`func Lines() -> io.AsyncLines<PipeReader>`](#PipeReader.Lines)
  - [`func Close()`](#PipeReader.Close)
- [`final class PipeWriter: io.AsyncWriter, io.Closer`](#class-PipeWriter)
  - [`func Write(_ bytes: borrowing [uint8]) async throws`](#PipeWriter.Write)
  - [`func Write(_ text: string) async throws`](#PipeWriter.Write-2)
  - [`func Flush()`](#PipeWriter.Flush)
  - [`func Close()`](#PipeWriter.Close)
- [`enum ProcessError: Error, CustomStringConvertible`](#enum-ProcessError)
  - [`var description: string { get }`](#ProcessError.description)
- [`struct StandardInput: io.Reader, io.AsyncReader`](#struct-StandardInput)
  - [`init()`](#StandardInput.init)
  - [`mutating func Read(into buffer: inout [uint8]) throws -> int`](#StandardInput.Read)
- [`struct StandardOutput: io.Writer, io.AsyncWriter`](#struct-StandardOutput)
  - [`mutating func Write(_ bytes: borrowing [uint8]) throws`](#StandardOutput.Write)
  - [`mutating func Write(_ text: string) throws`](#StandardOutput.Write-2)
  - [`mutating func Flush() throws`](#StandardOutput.Flush)
- [`enum Stdio: Equatable`](#enum-Stdio)

## Variables

<a id="var-Args"></a>

```vertex
public var Args: [string] { get }
```

The program's arguments, the program's own name first.

<a id="var-ID"></a>

```vertex
public var ID: int32 { get }
```

This process's id.

<a id="var-ParentID"></a>

```vertex
public var ParentID: int32 { get }
```

The id of the process that started this one; 0 on Windows, which does
not keep one.

<a id="var-Stderr"></a>

```vertex
public var Stderr: StandardOutput { get }
```

This process's standard error.

<a id="var-Stdin"></a>

```vertex
public var Stdin: StandardInput { get }
```

This process's standard input.

<a id="var-Stdout"></a>

```vertex
public var Stdout: StandardOutput { get }
```

This process's standard output.

## Functions

### func Abort <a id="func-Abort"></a>

```vertex
public func Abort() -> Never
```

Ends the process now: nothing buffered is written, nothing else runs.

### func CurrentDir <a id="func-CurrentDir"></a>

```vertex
public func CurrentDir() throws -> string
```

The directory relative paths are resolved against.

### func ExecutablePath <a id="func-ExecutablePath"></a>

```vertex
public func ExecutablePath() -> string?
```

The absolute path of the running executable, links resolved, or nil
where the system cannot say.

### func Exit <a id="func-Exit"></a>

```vertex
public func Exit(_ code: int32) -> Never
```

Ends the process with `code`, after what `print` has buffered is
written out. Never returns.

### func Find <a id="func-Find"></a>

```vertex
public func Find(_ name: string) -> string?
```

The path of the program `name` on PATH, as a shell's `which` finds it,
or nil. On Windows the extensions in PATHEXT are tried too.

### func Run <a id="func-Run"></a>

```vertex
public func Run(_ program: string, _ args: [string] = []) async throws -> Output
```

Runs a program to its end and returns what it wrote, throwing
`ProcessError.failed` where it ends unsuccessfully.

```vertex
let head = try await process.Run("git", ["rev-parse", "HEAD"])
print(head.StdoutText)
```

### func SetCurrentDir <a id="func-SetCurrentDir"></a>

```vertex
public func SetCurrentDir(_ path: string) throws
```

Changes the directory relative paths are resolved against, for the
whole process.

## Types

### class Child <a id="class-Child"></a>

```vertex
public final class Child
```

A running child process.

#### Properties

<a id="Child.ID"></a>

```vertex
public let ID: int64
```

The child's process id.

<a id="Child.Stdin"></a>

```vertex
public let Stdin: PipeWriter?
```

Its stdin, where that was `.pipe`.

<a id="Child.Stdout"></a>

```vertex
public let Stdout: PipeReader?
```

Its stdout, where that was `.pipe`.

<a id="Child.Stderr"></a>

```vertex
public let Stderr: PipeReader?
```

Its stderr, where that was `.pipe`.

#### Methods

<a id="Child.Wait"></a>

```vertex
public func Wait() async throws -> ExitStatus
```

Waits for the child to end. In a task, the task parks meanwhile.

<a id="Child.TryWait"></a>

```vertex
public func TryWait() throws -> ExitStatus?
```

How the child ended, or nil while it is still running. Never waits.

<a id="Child.Terminate"></a>

```vertex
public func Terminate()
```

Asks the child to stop: SIGTERM, or CTRL_BREAK on Windows. Does
nothing once the child has been waited for, when its id may already
belong to another process.

<a id="Child.Kill"></a>

```vertex
public func Kill()
```

Stops the child at once: SIGKILL, or TerminateProcess on Windows.
Does nothing once the child has been waited for.

<a id="Child.Signal"></a>

```vertex
public func Signal(_ kind: signal.Kind) throws
```

Sends the child a signal.

### struct Command <a id="struct-Command"></a>

```vertex
public struct Command
```

A program to run, and how. Arguments are an array and are never read by
a shell, so nothing in them can be injected; to use a shell, name it:
`Command("/bin/sh", ["-c", script])`.

```vertex
var cmd = process.Command("ffmpeg", ["-i", "in.mp4", "out.webm"])
cmd.Dir = "/tmp/work"
cmd.Env["FFREPORT"] = "1"
cmd.Stdout = .pipe
let child = try cmd.Spawn()
```

#### Initializers

<a id="Command.init"></a>

```vertex
public init(_ program: string, _ args: [string] = [])
```

#### Properties

<a id="Command.Program"></a>

```vertex
public var Program: string
```

The program: a path, or a name looked up on PATH.

<a id="Command.Args"></a>

```vertex
public var Args: [string]
```

<a id="Command.Dir"></a>

```vertex
public var Dir: string?
```

The directory the child starts in; this process's where nil.

<a id="Command.Env"></a>

```vertex
public var Env: [string: string]
```

Variables set for the child, over the environment it inherits.

<a id="Command.ClearEnv"></a>

```vertex
public var ClearEnv: bool
```

Start the child with only `Env`, inheriting nothing.

<a id="Command.Stdin"></a>

```vertex
public var Stdin: Stdio
```

<a id="Command.Stdout"></a>

```vertex
public var Stdout: Stdio
```

<a id="Command.Stderr"></a>

```vertex
public var Stderr: Stdio
```

#### Methods

<a id="Command.Spawn"></a>

```vertex
public func Spawn() throws -> Child
```

Starts the child and returns at once.

<a id="Command.Output"></a>

```vertex
public func Output() async throws -> Output
```

Runs the child to its end, capturing its stdout and stderr (whatever
they were set to) with stdin from nothing unless it was set. Does
not throw for a non-zero exit: that is in `Status`.

<a id="Command.Status"></a>

```vertex
public func Status() async throws -> ExitStatus
```

Runs the child to its end with its streams as set, and returns how
it ended.

### enum ExitStatus <a id="enum-ExitStatus"></a>

```vertex
public enum ExitStatus: Equatable, CustomStringConvertible
```

How a process ended.

#### Cases

<a id="ExitStatus.exited"></a>

```vertex
case exited(int32)
```

It exited, with this code.

<a id="ExitStatus.signaled"></a>

```vertex
case signaled(int32)
```

A signal ended it (POSIX only), with the signal's number.

#### Properties

<a id="ExitStatus.Success"></a>

```vertex
public var Success: bool { get }
```

Whether it exited with 0.

<a id="ExitStatus.Code"></a>

```vertex
public var Code: int32? { get }
```

The exit code, or nil where a signal ended it.

<a id="ExitStatus.description"></a>

```vertex
public var description: string { get }
```

### struct Output <a id="struct-Output"></a>

```vertex
public struct Output
```

What a finished process wrote, and how it ended.

#### Properties

<a id="Output.Status"></a>

```vertex
public let Status: ExitStatus
```

<a id="Output.Stdout"></a>

```vertex
public let Stdout: [uint8]
```

<a id="Output.Stderr"></a>

```vertex
public let Stderr: [uint8]
```

<a id="Output.StdoutText"></a>

```vertex
public var StdoutText: string { get }
```

Stdout as UTF-8 text.

<a id="Output.StderrText"></a>

```vertex
public var StderrText: string { get }
```

Stderr as UTF-8 text.

### class PipeReader <a id="class-PipeReader"></a>

```vertex
public final class PipeReader: io.AsyncReader, io.Closer
```

The parent's end of a child's stdout or stderr: an io.AsyncReader, so
io.Copy, io.ReadToEnd and io.AsyncBufferedReader take it.

Reading waits the way `net/tcp` does: in a task, the task parks until
the pipe has something and the executor runs other tasks meanwhile.

#### Methods

<a id="PipeReader.Read"></a>

```vertex
public func Read(into buffer: inout [uint8]) async throws -> int
```

Reads what is there into `buffer`, waiting for at least a byte.
Returns how many bytes it read; 0 is the end of the stream (the
child closed it, or ended).

<a id="PipeReader.ReadToEnd"></a>

```vertex
public func ReadToEnd(limit: int = 64 * 1024 * 1024) async throws -> [uint8]
```

Everything until the end of the stream; throws io.IoError.tooLarge
past `limit` bytes (64 MiB where none is given).

<a id="PipeReader.ReadText"></a>

```vertex
public func ReadText(limit: int = 64 * 1024 * 1024) async throws -> string
```

Everything until the end of the stream, as UTF-8 text.

<a id="PipeReader.Lines"></a>

```vertex
public func Lines() -> io.AsyncLines<PipeReader>
```

The stream a line at a time.

```vertex
for try await line in child.Stdout!.Lines() { print(line) }
```

<a id="PipeReader.Close"></a>

```vertex
public func Close()
```

Closes the parent's end. A child writing to it afterwards gets
SIGPIPE, or EPIPE where it ignores that.

### class PipeWriter <a id="class-PipeWriter"></a>

```vertex
public final class PipeWriter: io.AsyncWriter, io.Closer
```

The parent's end of a child's stdin: an io.AsyncWriter.

#### Methods

<a id="PipeWriter.Write"></a>

```vertex
public func Write(_ bytes: borrowing [uint8]) async throws
```

Writes all of `bytes`, waiting where the pipe is full.

<a id="PipeWriter.Write-2"></a>

```vertex
public func Write(_ text: string) async throws
```

Writes `text` as UTF-8.

<a id="PipeWriter.Flush"></a>

```vertex
public func Flush()
```

Nothing: every Write is in the pipe when it returns.

<a id="PipeWriter.Close"></a>

```vertex
public func Close()
```

Closes the parent's end: the child reads the end of its stdin.

### enum ProcessError <a id="enum-ProcessError"></a>

```vertex
public enum ProcessError: Error, CustomStringConvertible
```

ProcessError is how starting, running or waiting for a process fails.

#### Cases

<a id="ProcessError.notFound"></a>

```vertex
case notFound(string)
```

No program by that name on PATH, or no file at that path.

<a id="ProcessError.permissionDenied"></a>

```vertex
case permissionDenied(string)
```

The program exists and this process may not run it.

<a id="ProcessError.failed"></a>

```vertex
case failed(Output)
```

`Run`'s program ended unsuccessfully; what it wrote is in the output.

<a id="ProcessError.system"></a>

```vertex
case system(code: int32, context: string)
```

Anything else, with the system's error code.

#### Properties

<a id="ProcessError.description"></a>

```vertex
public var description: string { get }
```

### struct StandardInput <a id="struct-StandardInput"></a>

```vertex
public struct StandardInput: io.Reader, io.AsyncReader
```

This process's standard input: an io.Reader. A read waits for input,
holding the thread, as reading a terminal or a pipe does; it meets
io.AsyncReader too, with the same wait.

#### Initializers

<a id="StandardInput.init"></a>

```vertex
public init()
```

#### Methods

<a id="StandardInput.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) throws -> int
```

### struct StandardOutput <a id="struct-StandardOutput"></a>

```vertex
public struct StandardOutput: io.Writer, io.AsyncWriter
```

This process's standard output or error: an io.Writer, and an
io.AsyncWriter with the same writes. What `print` has buffered is
written out first, so output stays in order.

#### Methods

<a id="StandardOutput.Write"></a>

```vertex
public mutating func Write(_ bytes: borrowing [uint8]) throws
```

<a id="StandardOutput.Write-2"></a>

```vertex
public mutating func Write(_ text: string) throws
```

Writes `text` as UTF-8.

<a id="StandardOutput.Flush"></a>

```vertex
public mutating func Flush() throws
```

Writes out what `print` has buffered.

### enum Stdio <a id="enum-Stdio"></a>

```vertex
public enum Stdio: Equatable
```

What a child's standard stream is connected to.

#### Cases

<a id="Stdio.inherit"></a>

```vertex
case inherit
```

This process's own stream (the default).

<a id="Stdio.pipe"></a>

```vertex
case pipe
```

A pipe this process reads or writes: `Child.Stdin`, `Stdout`, `Stderr`.

<a id="Stdio.null"></a>

```vertex
case null
```

Nothing: reads see the end at once, writes are discarded.

<a id="Stdio.file"></a>

```vertex
case file(string)
```

A file: read from for stdin, created or truncated for the others.

## Files

- command.vs
- current.vs
- error.vs
- pipe.vs
- status.vs
- stdio.vs
