# package container

```vertex
import "vm/container"
```

Package container boots a container image from the oci store as a
Linux VM: the image's merged tree is the VM's root filesystem, held in
memory as its initramfs, and the image's command is what runs.

```vertex
let status = try await container.Run(container.Options(image: "alpine:3.20"))
```

What it boots with comes from oci/fetch, pinned and checked: Alpine's
linux-virt kernel, the virtio modules from Alpine's initramfs, and a
static busybox that brings the system up whatever libc the image has.
The image's tree is made into a cpio once and kept in the cache; each
boot adds a small second cpio (/.vertex: busybox, the init script, the
image's config) which the kernel unpacks over the first.

The guest gets user-space NAT networking (DHCP from the host side),
the console on the terminal, and powers off when the command exits.

## Index

- [`func AlpineBootFiles(storeRoot: string? = nil) async throws -> ([uint8], [uint8])`](#func-AlpineBootFiles)
- [`func MakeConfig(_ p: Prepared, _ o: Options) -> vm.Config`](#func-MakeConfig)
- [`func Prepare(_ o: Options, progress: (string) -> Void = { _ in }) async throws -> Prepared`](#func-Prepare)
- [`func Run(_ o: Options, progress: (string) -> Void = { _ in }) async throws -> vm.ExitStatus`](#func-Run)
- [`enum ContainerError: Error, CustomStringConvertible`](#enum-ContainerError)
  - [`var description: string { get }`](#ContainerError.description)
- [`struct Options`](#struct-Options)
  - [`init(image: string)`](#Options.init)
  - [`var Image: string`](#Options.Image)
  - [`var MemoryMiB: int = 1024`](#Options.MemoryMiB)
  - [`var Cpus: int = 2`](#Options.Cpus)
  - [`var Args: [string] = []`](#Options.Args)
  - [`var Entrypoint: [string]? = nil`](#Options.Entrypoint)
  - [`var Env: [string] = []`](#Options.Env)
  - [`var WorkingDir: string? = nil`](#Options.WorkingDir)
  - [`var Network: bool = true`](#Options.Network)
  - [`var Hostname: string? = nil`](#Options.Hostname)
  - [`var StoreRoot: string? = nil`](#Options.StoreRoot)
  - [`var Pull: bool = true`](#Options.Pull)
  - [`var KernelArgs: string = ""`](#Options.KernelArgs)
  - [`var TimeoutSec: int? = nil`](#Options.TimeoutSec)
- [`struct Prepared`](#struct-Prepared)
  - [`var Kernel: [uint8]`](#Prepared.Kernel)
  - [`var Initrd: [uint8]`](#Prepared.Initrd)
  - [`var Cmdline: string`](#Prepared.Cmdline)
  - [`var Image: store.Image`](#Prepared.Image)
  - [`var Command: [string]`](#Prepared.Command)
- [`final class VmExecutor: build.Executor`](#class-VmExecutor)
  - [`init(storeRoot: string? = nil)`](#VmExecutor.init)
  - [`var MemoryMiB: int = 2048`](#VmExecutor.MemoryMiB)
  - [`var Cpus: int = 2`](#VmExecutor.Cpus)
  - [`var StoreRoot: string? = nil`](#VmExecutor.StoreRoot)
  - [`var OutputSize: int64 = 16 << 30`](#VmExecutor.OutputSize)
  - [`func Run(layers: [rootfs.Layer], env: [string], workdir: string, user: string, command: [string], output: fs.Path) async throws -> int32`](#VmExecutor.Run)

## Functions

### func AlpineBootFiles <a id="func-AlpineBootFiles"></a>

```vertex
public func AlpineBootFiles(storeRoot: string? = nil) async throws -> ([uint8], [uint8])
```

Alpine's linux-virt kernel (unpacked to an Image) and its initramfs,
from the oci store, fetched and checked the first time: what vm boots
when it is given no kernel of its own.

### func MakeConfig <a id="func-MakeConfig"></a>

```vertex
public func MakeConfig(_ p: Prepared, _ o: Options) -> vm.Config
```

The VM's configuration for what Prepare made.

### func Prepare <a id="func-Prepare"></a>

```vertex
public func Prepare(_ o: Options, progress: (string) -> Void = { _ in }) async throws -> Prepared
```

Gets everything a boot of `o.Image` needs: the image (pulled if
asked), the boot files, the image's tree as a cpio (made once), and
this boot's own cpio on top.

### func Run <a id="func-Run"></a>

```vertex
public func Run(_ o: Options, progress: (string) -> Void = { _ in }) async throws -> vm.ExitStatus
```

Boots the image with the terminal as its console, and waits for it
to power off.

## Types

### enum ContainerError <a id="enum-ContainerError"></a>

```vertex
public enum ContainerError: Error, CustomStringConvertible
```

#### Cases

<a id="ContainerError.noCommand"></a>

```vertex
case noCommand(string)
```

<a id="ContainerError.missing"></a>

```vertex
case missing(string)
```

#### Properties

<a id="ContainerError.description"></a>

```vertex
public var description: string { get }
```

### struct Options <a id="struct-Options"></a>

```vertex
public struct Options
```

How to run an image.

#### Initializers

<a id="Options.init"></a>

```vertex
public init(image: string)
```

#### Properties

<a id="Options.Image"></a>

```vertex
public var Image: string
```

A name the store knows -- "alpine:3.20" -- or one to pull.

<a id="Options.MemoryMiB"></a>

```vertex
public var MemoryMiB: int = 1024
```

<a id="Options.Cpus"></a>

```vertex
public var Cpus: int = 2
```

<a id="Options.Args"></a>

```vertex
public var Args: [string] = []
```

Replaces the image's command (its Cmd; the Entrypoint stays,
as `docker run image args…` does).

<a id="Options.Entrypoint"></a>

```vertex
public var Entrypoint: [string]? = nil
```

Replaces the entrypoint and command both.

<a id="Options.Env"></a>

```vertex
public var Env: [string] = []
```

"KEY=value", added to the image's environment.

<a id="Options.WorkingDir"></a>

```vertex
public var WorkingDir: string? = nil
```

<a id="Options.Network"></a>

```vertex
public var Network: bool = true
```

<a id="Options.Hostname"></a>

```vertex
public var Hostname: string? = nil
```

<a id="Options.StoreRoot"></a>

```vertex
public var StoreRoot: string? = nil
```

The oci store; nil is its default root.

<a id="Options.Pull"></a>

```vertex
public var Pull: bool = true
```

Pull the image if the store doesn't have it.

<a id="Options.KernelArgs"></a>

```vertex
public var KernelArgs: string = ""
```

Extra kernel command line.

<a id="Options.TimeoutSec"></a>

```vertex
public var TimeoutSec: int? = nil
```

Stops the VM after this many seconds; nil lets it run.

### struct Prepared <a id="struct-Prepared"></a>

```vertex
public struct Prepared
```

What a VM for an image boots: ready to give vm.

#### Properties

<a id="Prepared.Kernel"></a>

```vertex
public var Kernel: [uint8]
```

<a id="Prepared.Initrd"></a>

```vertex
public var Initrd: [uint8]
```

<a id="Prepared.Cmdline"></a>

```vertex
public var Cmdline: string
```

<a id="Prepared.Image"></a>

```vertex
public var Image: store.Image
```

<a id="Prepared.Command"></a>

```vertex
public var Command: [string]
```

### class VmExecutor <a id="class-VmExecutor"></a>

```vertex
public final class VmExecutor: build.Executor
```

Runs a Dockerfile's RUN in a VM: oci/build's Executor. The tree so far
boots as the VM's root, the command runs with the build's environment,
and the guest writes the tree it leaves onto a disk -- a tar, on a
raw disk the host reads back -- and its exit status onto another.

#### Initializers

<a id="VmExecutor.init"></a>

```vertex
public init(storeRoot: string? = nil)
```

#### Properties

<a id="VmExecutor.MemoryMiB"></a>

```vertex
public var MemoryMiB: int = 2048
```

<a id="VmExecutor.Cpus"></a>

```vertex
public var Cpus: int = 2
```

<a id="VmExecutor.StoreRoot"></a>

```vertex
public var StoreRoot: string? = nil
```

<a id="VmExecutor.OutputSize"></a>

```vertex
public var OutputSize: int64 = 16 << 30
```

How big the disk the tree is written to may grow (it is sparse).

#### Methods

<a id="VmExecutor.Run"></a>

```vertex
public func Run(layers: [rootfs.Layer], env: [string], workdir: string, user: string,
                command: [string], output: fs.Path) async throws -> int32
```

## Files

- container.vs
- executor.vs
