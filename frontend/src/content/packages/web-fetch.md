# package fetch

```vertex
import "web/fetch"
```

## Index

- [`func Directory(of path: string) -> string`](#func-Directory)
- [`func FilePath(_ address: string) -> string`](#func-FilePath)
- [`func Resolve(_ reference: string, against base: string) -> string`](#func-Resolve)
- [`func Scheme(_ address: string) -> string`](#func-Scheme)
- [`struct Archive`](#struct-Archive)
  - [`init(page: string)`](#Archive.init)
  - [`var Page: string`](#Archive.Page)
  - [`var Entries: [string: ArchiveEntry]`](#Archive.Entries)
  - [`mutating func Add(_ entry: ArchiveEntry)`](#Archive.Add)
  - [`func Fetcher() -> Fetcher`](#Archive.Fetcher)
  - [`func Write(to dir: string) throws`](#Archive.Write)
  - [`static func Read(from dir: string) throws -> Archive`](#Archive.Read)
- [`struct ArchiveEntry`](#struct-ArchiveEntry)
  - [`init(URL: string, Status: int32, ContentType: string, Body: [uint8])`](#ArchiveEntry.init)
  - [`var URL: string`](#ArchiveEntry.URL)
  - [`var Status: int32`](#ArchiveEntry.Status)
  - [`var ContentType: string`](#ArchiveEntry.ContentType)
  - [`var Body: [uint8]`](#ArchiveEntry.Body)
- [`struct Fetcher`](#struct-Fetcher)
  - [`init()`](#Fetcher.init)
  - [`init(_ handler: (string) -> [uint8]?)`](#Fetcher.init-2)
  - [`var Handler: ((string) -> [uint8]?)?`](#Fetcher.Handler)
  - [`func Fetch(_ url: string) -> [uint8]?`](#Fetcher.Fetch)

## Functions

### func Directory <a id="func-Directory"></a>

```vertex
public func Directory(of path: string) -> string
```

The folder a file path is in, with its trailing slash; "" for a bare
file name. What a file's relative references resolve against.

### func FilePath <a id="func-FilePath"></a>

```vertex
public func FilePath(_ address: string) -> string
```

A file URL's path, its escapes decoded, or the path itself.

### func Resolve <a id="func-Resolve"></a>

```vertex
public func Resolve(_ reference: string, against base: string) -> string
```

A URL made absolute against a base, as RFC 3986 resolves a reference
(net/url): `/x` is rooted at the base's host, `//host/x` takes its
scheme, `../x` climbs, `?q` keeps its path. A base with no scheme is
a file path, and resolves the same way. A fragment alone is left for
the page to scroll to, and what doesn't parse is left as it is.

### func Scheme <a id="func-Scheme"></a>

```vertex
public func Scheme(_ address: string) -> string
```

The scheme of a URL, lowercase, or "" for a path.

## Types

### struct Archive <a id="struct-Archive"></a>

```vertex
public struct Archive
```

A page and the resources it refers to, recorded so it can be shown
again without the network: for rendering a real site in a check, or
working on one without waiting on it.

On disk it is a folder: `index.tsv` names the page, then one line per
resource -- status, content type, file, URL, tab-separated -- and
each body is a file of its own.

#### Initializers

<a id="Archive.init"></a>

```vertex
public init(page: string)
```

#### Properties

<a id="Archive.Page"></a>

```vertex
public var Page: string
```

The page's URL, after redirects.

<a id="Archive.Entries"></a>

```vertex
public var Entries: [string: ArchiveEntry]
```

#### Methods

<a id="Archive.Add"></a>

```vertex
public mutating func Add(_ entry: ArchiveEntry)
```

<a id="Archive.Fetcher"></a>

```vertex
public func Fetcher() -> Fetcher
```

A fetcher that answers from the archive: the body of a 2xx
response, and nil for anything else.

<a id="Archive.Write"></a>

```vertex
public func Write(to dir: string) throws
```

Writes the archive into a folder, made if missing.

<a id="Archive.Read"></a>

```vertex
public static func Read(from dir: string) throws -> Archive
```

Reads an archive a Write made.

### struct ArchiveEntry <a id="struct-ArchiveEntry"></a>

```vertex
public struct ArchiveEntry
```

One recorded response.

#### Initializers

<a id="ArchiveEntry.init"></a>

```vertex
public init(URL: string, Status: int32, ContentType: string, Body: [uint8])
```

#### Properties

<a id="ArchiveEntry.URL"></a>

```vertex
public var URL: string
```

<a id="ArchiveEntry.Status"></a>

```vertex
public var Status: int32
```

<a id="ArchiveEntry.ContentType"></a>

```vertex
public var ContentType: string
```

<a id="ArchiveEntry.Body"></a>

```vertex
public var Body: [uint8]
```

### struct Fetcher <a id="struct-Fetcher"></a>

```vertex
public struct Fetcher
```

Answers the bytes of a resource by its resolved URL.

#### Initializers

<a id="Fetcher.init"></a>

```vertex
public init()
```

<a id="Fetcher.init-2"></a>

```vertex
public init(_ handler: (string) -> [uint8]?)
```

#### Properties

<a id="Fetcher.Handler"></a>

```vertex
public var Handler: ((string) -> [uint8]?)?
```

Answers a URL itself: every URL goes here when set, and nothing
is read from disk.

#### Methods

<a id="Fetcher.Fetch"></a>

```vertex
public func Fetch(_ url: string) -> [uint8]?
```

The resource's bytes, or nil. Without a handler, file paths and
file: URLs are read from disk, and other schemes answer nil.

## Files

- archive.vs
- fetch.vs
