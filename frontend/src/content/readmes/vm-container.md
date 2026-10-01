# vm/container

Boots a container image from the oci store as a Linux VM: the image's merged tree is the VM's root filesystem, held in memory as its initramfs, and the image's command is what runs.

```vertex
import "vm/container"
```

## Types

- **`ContainerError`** (enum)
- **`Options`** (struct): How to run an image.
- **`Prepared`** (struct): What a VM for an image boots: ready to give vm.
- **`VmExecutor`** (class): Runs a Dockerfile's RUN in a VM: oci/build's Executor.

## Functions

- `func Prepare(_ o: Options, progress: (string) -> Void =`: Gets everything a boot of `o.Image` needs: the image (pulled if asked), the boot files, the image's tree as a cpio (made once), and this boot's own cpio on top.
- `func MakeConfig(_ p: Prepared, _ o: Options) -> vm.Config`: The VM's configuration for what Prepare made.
- `func Run(_ o: Options, progress: (string) -> Void =`: Boots the image with the terminal as its console, and waits for it to power off.
- `func AlpineBootFiles(storeRoot: string? = nil) async throws -> ([uint8], [uint8])`: Alpine's linux-virt kernel (unpacked to an Image) and its initramfs, from the oci store, fetched and checked the first time: what vm boots when it is given no kernel of its own.

Part of the [`vm`](https://github.com/vertex-language/vm) repository.
