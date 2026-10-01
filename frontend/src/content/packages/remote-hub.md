# package hub

```vertex
import "remote/hub"
```

Package hub gets models, datasets and spaces from the Hugging Face Hub:
it resolves a reference to a pinned commit and its files, and downloads
them into the Hugging Face cache, in Hugging Face's own layout, so
what Python tools already fetched is found and nothing is fetched twice.

```vertex
let snap = try await hub.Download("hf.co/ggml-org/models-moved/tinyllamas/stories260K.gguf")
print(snap.Path("tinyllamas/stories260K.gguf"))
```

## Index

- [Constants](#constants)
- [`func Download(_ ref: string) async throws -> Snapshot`](#func-Download)
- [`func Match(_ pattern: string, _ path: string) -> bool`](#func-Match)
- [`func Resolve(_ ref: string) async throws -> Snapshot`](#func-Resolve)
- [`func Select(_ files: [RepoFile], ref: Ref, include: [string] = []) throws -> [RepoFile]`](#func-Select)
- [`struct Cache`](#struct-Cache)
  - [`init(root: fs.Path)`](#Cache.init)
  - [`var Root: fs.Path`](#Cache.Root)
  - [`static func Default() -> Cache`](#Cache.Default)
  - [`func RepoDir(_ kind: RepoKind, _ repo: string) -> fs.Path`](#Cache.RepoDir)
  - [`func BlobPath(_ kind: RepoKind, _ repo: string, _ etag: string) -> fs.Path`](#Cache.BlobPath)
  - [`func SnapshotDir(_ kind: RepoKind, _ repo: string, _ commit: string) -> fs.Path`](#Cache.SnapshotDir)
  - [`func Commit(_ kind: RepoKind, _ repo: string, _ revision: string) -> string?`](#Cache.Commit)
  - [`func SetCommit(_ kind: RepoKind, _ repo: string, _ revision: string, _ commit: string) throws`](#Cache.SetCommit)
  - [`func HasBlob(_ kind: RepoKind, _ repo: string, _ file: RepoFile) -> bool`](#Cache.HasBlob)
  - [`func Link(_ kind: RepoKind, _ repo: string, _ commit: string, _ file: RepoFile) throws`](#Cache.Link)
  - [`func Files(_ kind: RepoKind, _ repo: string, _ commit: string) throws -> [RepoFile]`](#Cache.Files)
- [`struct Hub`](#struct-Hub)
  - [`init()`](#Hub.init)
  - [`var Endpoint: string`](#Hub.Endpoint)
  - [`var Token: string?`](#Hub.Token)
  - [`var Cache: Cache`](#Hub.Cache)
  - [`var Offline: bool`](#Hub.Offline)
  - [`var Include: [string] = []`](#Hub.Include)
  - [`var OnProgress: ((Progress) -> void)? = nil`](#Hub.OnProgress)
  - [`func Resolve(_ ref: Ref) async throws -> Snapshot`](#Hub.Resolve)
  - [`func Download(_ ref: Ref) async throws -> Snapshot`](#Hub.Download)
- [`enum HubError: Error, CustomStringConvertible`](#enum-HubError)
  - [`var description: string { get }`](#HubError.description)
- [`struct Progress`](#struct-Progress)
  - [`var File: string`](#Progress.File)
  - [`var Done: int64`](#Progress.Done)
  - [`var Size: int64`](#Progress.Size)
  - [`var TotalDone: int64`](#Progress.TotalDone)
  - [`var Total: int64`](#Progress.Total)
- [`struct Ref: Equatable, CustomStringConvertible`](#struct-Ref)
  - [`init(_ repo: string, kind: RepoKind = RepoKind.model, revision: string = "main")`](#Ref.init)
  - [`var Kind: RepoKind = RepoKind.model`](#Ref.Kind)
  - [`var Repo: string`](#Ref.Repo)
  - [`var Revision: string = "main"`](#Ref.Revision)
  - [`var Tag: string = ""`](#Ref.Tag)
  - [`var File: string = ""`](#Ref.File)
  - [`var description: string { get }`](#Ref.description)
  - [`static func Parse(_ text: string) throws -> Ref`](#Ref.Parse)
- [`struct RepoFile: Equatable`](#struct-RepoFile)
  - [`init(path: string, size: int64, sha256: string = "", blobId: string = "")`](#RepoFile.init)
  - [`var Path: string`](#RepoFile.Path)
  - [`var Size: int64`](#RepoFile.Size)
  - [`var Sha256: string = ""`](#RepoFile.Sha256)
  - [`var BlobId: string = ""`](#RepoFile.BlobId)
  - [`var Etag: string { get }`](#RepoFile.Etag)
- [`enum RepoKind: Equatable`](#enum-RepoKind)
  - [`var Plural: string { get }`](#RepoKind.Plural)
- [`struct Snapshot`](#struct-Snapshot)
  - [`var Ref: Ref`](#Snapshot.Ref)
  - [`var Commit: string`](#Snapshot.Commit)
  - [`var Files: [RepoFile]`](#Snapshot.Files)
  - [`var Dir: fs.Path`](#Snapshot.Dir)
  - [`var Size: int64 { get }`](#Snapshot.Size)
  - [`func Path(_ file: string) -> fs.Path`](#Snapshot.Path)

## Constants

<a id="let-DefaultTag"></a>

```vertex
public let DefaultTag = "Q4_K_M"
```

The quant a GGUF repository gives when no tag is asked for, as
llama.cpp's and Ollama's pulls do.

## Functions

### func Download <a id="func-Download"></a>

```vertex
public func Download(_ ref: string) async throws -> Snapshot
```

Download fetches what a reference asks for into the cache with the
default Hub, and returns the snapshot it is in.

### func Match <a id="func-Match"></a>

```vertex
public func Match(_ pattern: string, _ path: string) -> bool
```

Match reports whether path matches a glob pattern: '*' is any run of
characters but '/', "**" any run including '/', '?' any one
character. A pattern with no '/' is matched against the file's name
alone, so "*.json" finds JSON files in any directory; one starting
with '/' is anchored at the repository's root, as in .gitignore, so
"/*.json" finds only those at the top.

### func Resolve <a id="func-Resolve"></a>

```vertex
public func Resolve(_ ref: string) async throws -> Snapshot
```

Resolve pins a reference ("hf.co/org/name@rev:TAG") with the default Hub.

### func Select <a id="func-Select"></a>

```vertex
public func Select(_ files: [RepoFile], ref: Ref, include: [string] = []) throws -> [RepoFile]
```

Select is the files of a repository that a reference asks for: one
file (or the files under a directory) by its File; a quant's GGUF
files by its Tag; else those that match one of the patterns, or all
of them when there are no patterns.

A GGUF-only repository with neither a tag nor patterns gives the
DefaultTag quant when it has one, else its first GGUF file: such a
repository is a shelf of quants, and one is wanted, not all.

## Types

### struct Cache <a id="struct-Cache"></a>

```vertex
public struct Cache
```

Cache is the Hugging Face hub cache, in Hugging Face's layout, shared
with huggingface_hub and everything built on it:

```vertex
<root>/models--org--name/
    blobs/<etag>                      each file's content, by its etag
    snapshots/<commit>/<path>         a symlink to ../../blobs/<etag>
    refs/<revision>                   the commit a branch or tag was at
```

#### Initializers

<a id="Cache.init"></a>

```vertex
public init(root: fs.Path)
```

#### Properties

<a id="Cache.Root"></a>

```vertex
public var Root: fs.Path
```

The directory holding the repositories.

#### Methods

<a id="Cache.Default"></a>

```vertex
public static func Default() -> Cache
```

The cache huggingface_hub uses: $HF_HUB_CACHE, else $HF_HOME/hub,
else $XDG_CACHE_HOME/huggingface/hub, else ~/.cache/huggingface/hub.

<a id="Cache.RepoDir"></a>

```vertex
public func RepoDir(_ kind: RepoKind, _ repo: string) -> fs.Path
```

The directory of a repository: models--org--name.

<a id="Cache.BlobPath"></a>

```vertex
public func BlobPath(_ kind: RepoKind, _ repo: string, _ etag: string) -> fs.Path
```

Where a blob is kept.

<a id="Cache.SnapshotDir"></a>

```vertex
public func SnapshotDir(_ kind: RepoKind, _ repo: string, _ commit: string) -> fs.Path
```

The directory of a snapshot: the repository at a commit.

<a id="Cache.Commit"></a>

```vertex
public func Commit(_ kind: RepoKind, _ repo: string, _ revision: string) -> string?
```

The commit a revision was at when it was last resolved; a commit
is itself.

<a id="Cache.SetCommit"></a>

```vertex
public func SetCommit(_ kind: RepoKind, _ repo: string, _ revision: string, _ commit: string) throws
```

Records the commit a branch or tag is at.

<a id="Cache.HasBlob"></a>

```vertex
public func HasBlob(_ kind: RepoKind, _ repo: string, _ file: RepoFile) -> bool
```

Whether a blob is there, whole: its size is the one expected.

<a id="Cache.Link"></a>

```vertex
public func Link(_ kind: RepoKind, _ repo: string, _ commit: string, _ file: RepoFile) throws
```

Links a snapshot's path to its blob, as huggingface_hub does: a
symlink relative to where it is, so the cache can move.

<a id="Cache.Files"></a>

```vertex
public func Files(_ kind: RepoKind, _ repo: string, _ commit: string) throws -> [RepoFile]
```

The files of a snapshot already in the cache, found by walking
its directory: sizes are the blobs', etags the link targets'.

### struct Hub <a id="struct-Hub"></a>

```vertex
public struct Hub
```

Hub talks to a Hugging Face hub and keeps what it fetches in a Cache.
Its defaults come from the environment huggingface_hub reads:
HF_ENDPOINT, HF_TOKEN (or the token `hf auth login` saved),
HF_HUB_CACHE / HF_HOME, and HF_HUB_OFFLINE.

#### Initializers

<a id="Hub.init"></a>

```vertex
public init()
```

#### Properties

<a id="Hub.Endpoint"></a>

```vertex
public var Endpoint: string
```

"https://huggingface.co", or a mirror.

<a id="Hub.Token"></a>

```vertex
public var Token: string?
```

Sent to the endpoint, never to where it redirects.

<a id="Hub.Cache"></a>

```vertex
public var Cache: Cache
```

<a id="Hub.Offline"></a>

```vertex
public var Offline: bool
```

Use only the cache; never touch the network.

<a id="Hub.Include"></a>

```vertex
public var Include: [string] = []
```

Only the files matching one of these globs, when a reference
names no file and no tag (see Select).

<a id="Hub.OnProgress"></a>

```vertex
public var OnProgress: ((Progress) -> void)? = nil
```

Called as a download goes, every few megabytes and at each
file's end.

#### Methods

<a id="Hub.Resolve"></a>

```vertex
public func Resolve(_ ref: Ref) async throws -> Snapshot
```

Resolve pins a reference to a commit and lists the files it asks
for, transferring no file. Offline, or when the hub cannot be
reached, the cache answers if it can.

<a id="Hub.Download"></a>

```vertex
public func Download(_ ref: Ref) async throws -> Snapshot
```

Download resolves a reference and makes sure its files are in the
cache, fetching what is missing -- resuming what an earlier run
left half done -- and checking each against its hash.

### enum HubError <a id="enum-HubError"></a>

```vertex
public enum HubError: Error, CustomStringConvertible
```

HubError is what went wrong talking to the Hub or with its cache.

#### Cases

<a id="HubError.badReference"></a>

```vertex
case badReference(string, string)
```

The reference could not be read, and why.

<a id="HubError.repoNotFound"></a>

```vertex
case repoNotFound(string)
```

No such repository -- or a private one, without a token that may see it.

<a id="HubError.gated"></a>

```vertex
case gated(string)
```

The repository is gated: accept its terms on the Hub, and use a token.

<a id="HubError.revisionNotFound"></a>

```vertex
case revisionNotFound(string, string)
```

No such branch, tag or commit.

<a id="HubError.fileNotFound"></a>

```vertex
case fileNotFound(string, string)
```

No file matches what was asked for.

<a id="HubError.status"></a>

```vertex
case status(int32, string)
```

The Hub answered with this status, and said this.

<a id="HubError.corrupt"></a>

```vertex
case corrupt(string, string)
```

A downloaded file is not what the Hub said it would be.

<a id="HubError.notCached"></a>

```vertex
case notCached(string)
```

Offline, and the cache does not have it.

#### Properties

<a id="HubError.description"></a>

```vertex
public var description: string { get }
```

### struct Progress <a id="struct-Progress"></a>

```vertex
public struct Progress
```

Progress is how a download is going: the file being fetched, the
bytes of it done and its size, and the same over all the files.

#### Properties

<a id="Progress.File"></a>

```vertex
public var File: string
```

<a id="Progress.Done"></a>

```vertex
public var Done: int64
```

<a id="Progress.Size"></a>

```vertex
public var Size: int64
```

<a id="Progress.TotalDone"></a>

```vertex
public var TotalDone: int64
```

<a id="Progress.Total"></a>

```vertex
public var Total: int64
```

### struct Ref <a id="struct-Ref"></a>

```vertex
public struct Ref: Equatable, CustomStringConvertible
```

Ref is a reference to a repository, or to files in one:

```vertex
hf.co/Qwen/Qwen3-8B                        the default branch
hf.co/Qwen/Qwen3-8B@a1b2c3d                a revision: a branch, tag or commit
hf.co/unsloth/Qwen3-8B-GGUF:Q4_K_M         the GGUF file(s) of a quant
hf.co/datasets/HuggingFaceFW/fineweb       a dataset (spaces/ for a space)
hf.co/org/name/sub/file.gguf               one file in the repository
https://huggingface.co/org/name/resolve/main/file.gguf   a file URL
```

"hf.co/" may be written "huggingface.co/", with or without https://,
or left out ("Qwen/Qwen3-8B").

#### Initializers

<a id="Ref.init"></a>

```vertex
public init(_ repo: string, kind: RepoKind = RepoKind.model, revision: string = "main")
```

#### Properties

<a id="Ref.Kind"></a>

```vertex
public var Kind: RepoKind = RepoKind.model
```

<a id="Ref.Repo"></a>

```vertex
public var Repo: string
```

"org/name".

<a id="Ref.Revision"></a>

```vertex
public var Revision: string = "main"
```

A branch, tag or commit; "main" when none is given.

<a id="Ref.Tag"></a>

```vertex
public var Tag: string = ""
```

A GGUF quant ("Q4_K_M"), or "".

<a id="Ref.File"></a>

```vertex
public var File: string = ""
```

A path inside the repository, or "" for the whole of it.

<a id="Ref.description"></a>

```vertex
public var description: string { get }
```

The reference as Parse reads it: "hf.co/org/name@rev:TAG".

#### Methods

<a id="Ref.Parse"></a>

```vertex
public static func Parse(_ text: string) throws -> Ref
```

Parse reads a reference in any of the forms above.

### struct RepoFile <a id="struct-RepoFile"></a>

```vertex
public struct RepoFile: Equatable
```

RepoFile is one file of a repository at a commit.

#### Initializers

<a id="RepoFile.init"></a>

```vertex
public init(path: string, size: int64, sha256: string = "", blobId: string = "")
```

#### Properties

<a id="RepoFile.Path"></a>

```vertex
public var Path: string
```

Its path in the repository: "tinyllamas/stories260K.gguf".

<a id="RepoFile.Size"></a>

```vertex
public var Size: int64
```

<a id="RepoFile.Sha256"></a>

```vertex
public var Sha256: string = ""
```

The sha256 of its content, for a file stored in LFS or Xet (all
large ones); "" for a small file kept in git.

<a id="RepoFile.BlobId"></a>

```vertex
public var BlobId: string = ""
```

Its git blob id (a sha1), which names a small file in the cache.

<a id="RepoFile.Etag"></a>

```vertex
public var Etag: string { get }
```

The name of its blob in the cache: what the Hub gives as its
ETag -- the sha256 of a large file, the blob id of a small one.

### enum RepoKind <a id="enum-RepoKind"></a>

```vertex
public enum RepoKind: Equatable
```

RepoKind is what a repository holds; each lives under its own path.

#### Cases

<a id="RepoKind.model"></a>

```vertex
case model
```

<a id="RepoKind.dataset"></a>

```vertex
case dataset
```

<a id="RepoKind.space"></a>

```vertex
case space
```

#### Properties

<a id="RepoKind.Plural"></a>

```vertex
public var Plural: string { get }
```

The segment the Hub's API and the cache name it by: "models", ...

### struct Snapshot <a id="struct-Snapshot"></a>

```vertex
public struct Snapshot
```

Snapshot is a repository pinned to a commit, and the files a
reference asked for.

#### Properties

<a id="Snapshot.Ref"></a>

```vertex
public var Ref: Ref
```

<a id="Snapshot.Commit"></a>

```vertex
public var Commit: string
```

The commit the revision resolved to.

<a id="Snapshot.Files"></a>

```vertex
public var Files: [RepoFile]
```

The files asked for, with their sizes and hashes.

<a id="Snapshot.Dir"></a>

```vertex
public var Dir: fs.Path
```

Where the snapshot is in the cache. Its files are there once
Download has run.

<a id="Snapshot.Size"></a>

```vertex
public var Size: int64 { get }
```

The bytes of all its files.

#### Methods

<a id="Snapshot.Path"></a>

```vertex
public func Path(_ file: string) -> fs.Path
```

The local path of one of its files.

## Files

- cache.vs
- hub.vs
- ref.vs
- select.vs
