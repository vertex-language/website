# package build

```vertex
import "oci/build"
```

Package build makes images from Dockerfiles into an oci store, as
`docker build` does: each stage from its FROM, COPY and ADD from the
build context or another stage, the config instructions, and RUN --
which needs a Linux to run in, so an Executor does it (vm/container's
boots the tree so far as a VM) and build keeps what it changed as a
layer.

```vertex
let b = build.Builder(store: st, executor: container.VmExecutor())
let img = try await b.Build(build.Options(context: "."))
```

## Index

- [`func Diff(parent: rootfs.Plan, tree: fs.Path) throws -> [uint8]`](#func-Diff)
- [`func Glob(_ pattern: string, _ name: string) -> bool`](#func-Glob)
- [`enum BuildError: Error, CustomStringConvertible`](#enum-BuildError)
  - [`var description: string { get }`](#BuildError.description)
- [`final class Builder`](#class-Builder)
  - [`init(store st: store.Store, executor: Executor? = nil, log: @escaping (string) -> Void = { print($0) })`](#Builder.init)
  - [`func Build(_ o: Options) async throws -> store.Image`](#Builder.Build)
- [`protocol Executor: AnyObject`](#protocol-Executor)
  - [`func Run(layers: [rootfs.Layer], env: [string], workdir: string, user: string, command: [string], output: fs.Path) async throws -> int32`](#Executor.Run)
- [`struct Options`](#struct-Options)
  - [`init(context: string)`](#Options.init)
  - [`var Context: string`](#Options.Context)
  - [`var Dockerfile: string? = nil`](#Options.Dockerfile)
  - [`var Tag: string? = nil`](#Options.Tag)
  - [`var BuildArgs: [string: string] = [:]`](#Options.BuildArgs)
  - [`var Target: string? = nil`](#Options.Target)
  - [`var Platform: spec.Platform = spec.Platform.Default`](#Options.Platform)

## Functions

### func Diff <a id="func-Diff"></a>

```vertex
public func Diff(parent: rootfs.Plan, tree: fs.Path) throws -> [uint8]
```

A layer, as an uncompressed tar, of what `tree` -- a tar of a whole
filesystem, as a RUN left it -- changes from `parent`: what is new or
different, with the directories it is in, and whiteouts for what is
gone.

### func Glob <a id="func-Glob"></a>

```vertex
public func Glob(_ pattern: string, _ name: string) -> bool
```

A shell glob within one path component: `*`, `?`, `[abc]`.

## Types

### enum BuildError <a id="enum-BuildError"></a>

```vertex
public enum BuildError: Error, CustomStringConvertible
```

#### Cases

<a id="BuildError.noExecutor"></a>

```vertex
case noExecutor(line: int)
```

<a id="BuildError.runFailed"></a>

```vertex
case runFailed(line: int, command: string, status: int32)
```

<a id="BuildError.badInstruction"></a>

```vertex
case badInstruction(line: int, message: string)
```

<a id="BuildError.notInContext"></a>

```vertex
case notInContext(string)
```

<a id="BuildError.noStage"></a>

```vertex
case noStage(string)
```

#### Properties

<a id="BuildError.description"></a>

```vertex
public var description: string { get }
```

### class Builder <a id="class-Builder"></a>

```vertex
public final class Builder
```

#### Initializers

<a id="Builder.init"></a>

```vertex
public init(store st: store.Store, executor: Executor? = nil, log: @escaping (string) -> Void = { print($0) })
```

#### Methods

<a id="Builder.Build"></a>

```vertex
public func Build(_ o: Options) async throws -> store.Image
```

Builds `o` and returns the image, named o.Tag if given.

### protocol Executor <a id="protocol-Executor"></a>

```vertex
public protocol Executor: AnyObject
```

Runs a RUN instruction's command.

#### Methods

<a id="Executor.Run"></a>

```vertex
func Run(layers: [rootfs.Layer], env: [string], workdir: string, user: string,
         command: [string], output: fs.Path) async throws -> int32
```

Runs `command` in the tree `layers` make, bottom first, with `env`
("KEY=value") in `workdir` as `user`, and writes the tree it leaves
to `output` as a tar. Returns the command's exit status.

### struct Options <a id="struct-Options"></a>

```vertex
public struct Options
```

What to build.

#### Initializers

<a id="Options.init"></a>

```vertex
public init(context: string)
```

#### Properties

<a id="Options.Context"></a>

```vertex
public var Context: string
```

The build context: the directory COPY and ADD read from.

<a id="Options.Dockerfile"></a>

```vertex
public var Dockerfile: string? = nil
```

The Dockerfile; nil is Context/Dockerfile.

<a id="Options.Tag"></a>

```vertex
public var Tag: string? = nil
```

The name to give the image; nil leaves it unnamed (by digest).

<a id="Options.BuildArgs"></a>

```vertex
public var BuildArgs: [string: string] = [:]
```

--build-arg values.

<a id="Options.Target"></a>

```vertex
public var Target: string? = nil
```

The stage to stop at; nil is the last.

<a id="Options.Platform"></a>

```vertex
public var Platform: spec.Platform = spec.Platform.Default
```

## Files

- build.vs
- context.vs
- diff.vs
