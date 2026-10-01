# package url

```vertex
import "net/url"
```

Package url parses URLs and resolves references against them, as RFC
3986 describes, with the leniency the web's URLs need (WHATWG URL): a
backslash is a slash in http(s), ws(s), ftp and file URLs, tabs and
newlines are dropped, and the host of those schemes is lowercase.

```vertex
let u = try url.Parse("https://github.com/login?return_to=%2F")
u.Host                        // "github.com"
u.EffectivePort               // 443
u.RequestURI                  // "/login?return_to=%2F"
try u.Resolve("../x.css")     // https://github.com/x.css
u.String()                    // the URL written out again
```

A URL can be relative ("../x.css", "/login", "?q=1"): it has no
scheme, and resolving it against an absolute one makes it absolute.
A path with no scheme -- "docs/index.html" -- is a relative URL too,
and resolves as a file path would.

## Index

- [`func DefaultPort(_ scheme: string) -> uint16`](#func-DefaultPort)
- [`func Parse(_ text: string) throws -> URL`](#func-Parse)
- [`func ParseQuery(_ query: string) -> Values`](#func-ParseQuery)
- [`func PathEscape(_ s: string) -> string`](#func-PathEscape)
- [`func PathUnescape(_ s: string) -> string`](#func-PathUnescape)
- [`func QueryEscape(_ s: string) -> string`](#func-QueryEscape)
- [`func QueryUnescape(_ s: string) -> string`](#func-QueryUnescape)
- [`struct URL: Equatable`](#struct-URL)
  - [`init(Scheme: string = "", User: string? = nil, Host: string = "", Port: string = "", HasAuthority: bool = false, Path: string = "", Query: string? = nil, Fragment: string? = nil)`](#URL.init)
  - [`var Scheme: string`](#URL.Scheme)
  - [`var User: string?`](#URL.User)
  - [`var Host: string`](#URL.Host)
  - [`var Port: string`](#URL.Port)
  - [`var HasAuthority: bool`](#URL.HasAuthority)
  - [`var Path: string`](#URL.Path)
  - [`var Query: string?`](#URL.Query)
  - [`var Fragment: string?`](#URL.Fragment)
  - [`var IsAbsolute: bool { get }`](#URL.IsAbsolute)
  - [`var EffectivePort: uint16 { get }`](#URL.EffectivePort)
  - [`var HostPort: string { get }`](#URL.HostPort)
  - [`var Origin: string { get }`](#URL.Origin)
  - [`var RequestURI: string { get }`](#URL.RequestURI)
  - [`var WithoutFragment: URL { get }`](#URL.WithoutFragment)
  - [`var QueryValues: Values { get }`](#URL.QueryValues)
  - [`func String() -> string`](#URL.String)
  - [`func Resolve(_ reference: string) throws -> URL`](#URL.Resolve)
  - [`func ResolveReference(_ r: URL) -> URL`](#URL.ResolveReference)
- [`enum URLError: Error, Equatable`](#enum-URLError)
- [`struct Values: Equatable`](#struct-Values)
  - [`init()`](#Values.init)
  - [`var Pairs: [(key: string, value: string)]`](#Values.Pairs)
  - [`static func == (a: Values, b: Values) -> bool`](#Values.op61op61)
  - [`func Get(_ key: string) -> string?`](#Values.Get)
  - [`func All(_ key: string) -> [string]`](#Values.All)
  - [`func Has(_ key: string) -> bool`](#Values.Has)
  - [`mutating func Add(_ key: string, _ value: string)`](#Values.Add)
  - [`mutating func Set(_ key: string, _ value: string)`](#Values.Set)
  - [`mutating func Delete(_ key: string)`](#Values.Delete)
  - [`func Encode() -> string`](#Values.Encode)

## Functions

### func DefaultPort <a id="func-DefaultPort"></a>

```vertex
public func DefaultPort(_ scheme: string) -> uint16
```

The port a scheme uses when a URL names none, or 0.

### func Parse <a id="func-Parse"></a>

```vertex
public func Parse(_ text: string) throws -> URL
```

Parses an absolute URL or a relative reference.

### func ParseQuery <a id="func-ParseQuery"></a>

```vertex
public func ParseQuery(_ query: string) -> Values
```

A query string's parameters: "a=1&b=two+words" (without its '?').
A pair without '=' has an empty value; empty pairs are skipped.

### func PathEscape <a id="func-PathEscape"></a>

```vertex
public func PathEscape(_ s: string) -> string
```

A string escaped to be one path segment: '/' is escaped too.

### func PathUnescape <a id="func-PathUnescape"></a>

```vertex
public func PathUnescape(_ s: string) -> string
```

A path's %XX sequences decoded. A '%' not followed by two hex digits
is kept, as browsers keep it.

### func QueryEscape <a id="func-QueryEscape"></a>

```vertex
public func QueryEscape(_ s: string) -> string
```

A string escaped to be a query key or value, as forms send it:
spaces become '+'.

### func QueryUnescape <a id="func-QueryUnescape"></a>

```vertex
public func QueryUnescape(_ s: string) -> string
```

A query key or value decoded: %XX, and '+' as a space.

## Types

### struct URL <a id="struct-URL"></a>

```vertex
public struct URL: Equatable
```

A parsed URL. Components are kept as written, percent-encoding and
all; Scheme and a special scheme's Host are lowercased.

#### Initializers

<a id="URL.init"></a>

```vertex
public init(Scheme: string = "", User: string? = nil, Host: string = "", Port: string = "", HasAuthority: bool = false, Path: string = "", Query: string? = nil, Fragment: string? = nil)
```

#### Properties

<a id="URL.Scheme"></a>

```vertex
public var Scheme: string
```

"https", lowercase; "" for a relative URL.

<a id="URL.User"></a>

```vertex
public var User: string?
```

The userinfo before '@' ("user:pass"), or nil for none.

<a id="URL.Host"></a>

```vertex
public var Host: string
```

The host name or address. An IPv6 address is kept without its
brackets. "" where there is no authority, or an empty one.

<a id="URL.Port"></a>

```vertex
public var Port: string
```

The port as written, "" for none.

<a id="URL.HasAuthority"></a>

```vertex
public var HasAuthority: bool
```

Whether the URL has an authority ("//..."), even an empty one
(file:///x).

<a id="URL.Path"></a>

```vertex
public var Path: string
```

The path, percent-encoded as written.

<a id="URL.Query"></a>

```vertex
public var Query: string?
```

The query without its '?', or nil for none ("?" alone is "").

<a id="URL.Fragment"></a>

```vertex
public var Fragment: string?
```

The fragment without its '#', or nil for none.

<a id="URL.IsAbsolute"></a>

```vertex
public var IsAbsolute: bool { get }
```

Whether the URL has a scheme.

<a id="URL.EffectivePort"></a>

```vertex
public var EffectivePort: uint16 { get }
```

The port to connect to: the one written, or the scheme's default
(80 for http and ws, 443 for https and wss, 21 for ftp), or 0.

<a id="URL.HostPort"></a>

```vertex
public var HostPort: string { get }
```

The host and port as an authority is written: "[::1]:8080".

<a id="URL.Origin"></a>

```vertex
public var Origin: string { get }
```

The origin, "https://github.com", for comparing where things came
from; "null" for a URL without a host.

<a id="URL.RequestURI"></a>

```vertex
public var RequestURI: string { get }
```

What an HTTP request line names: the path, "/" where it is empty,
and the query.

<a id="URL.WithoutFragment"></a>

```vertex
public var WithoutFragment: URL { get }
```

The URL without its fragment.

<a id="URL.QueryValues"></a>

```vertex
public var QueryValues: Values { get }
```

The query's parameters, decoded.

#### Methods

<a id="URL.String"></a>

```vertex
public func String() -> string
```

The URL written out again.

<a id="URL.Resolve"></a>

```vertex
public func Resolve(_ reference: string) throws -> URL
```

A reference resolved against this URL (RFC 3986 Section 5.2).

<a id="URL.ResolveReference"></a>

```vertex
public func ResolveReference(_ r: URL) -> URL
```

A parsed reference resolved against this URL (RFC 3986 Section
5.2): `/x` is rooted at the host, `//host/x` takes the scheme,
`../x` climbs, `?q` keeps the path, "" is this URL without its
fragment.

### enum URLError <a id="enum-URLError"></a>

```vertex
public enum URLError: Error, Equatable
```

Why a URL doesn't parse.

#### Cases

<a id="URLError.invalidPort"></a>

```vertex
case invalidPort(string)
```

A port that isn't a number from 0 to 65535.

<a id="URLError.invalidHost"></a>

```vertex
case invalidHost(string)
```

A host with characters no host has, or an unclosed '['.

<a id="URLError.missingHost"></a>

```vertex
case missingHost(string)
```

An http(s), ws(s) or ftp URL without a host.

### struct Values <a id="struct-Values"></a>

```vertex
public struct Values: Equatable
```

A query's parameters, in order, a key allowed more than once.

#### Initializers

<a id="Values.init"></a>

```vertex
public init()
```

#### Properties

<a id="Values.Pairs"></a>

```vertex
public var Pairs: [(key: string, value: string)]
```

#### Methods

<a id="Values.op61op61"></a>

```vertex
public static func == (a: Values, b: Values) -> bool
```

<a id="Values.Get"></a>

```vertex
public func Get(_ key: string) -> string?
```

The first value for a key, or nil.

<a id="Values.All"></a>

```vertex
public func All(_ key: string) -> [string]
```

Every value for a key, in order.

<a id="Values.Has"></a>

```vertex
public func Has(_ key: string) -> bool
```

<a id="Values.Add"></a>

```vertex
public mutating func Add(_ key: string, _ value: string)
```

Adds a value after any the key has.

<a id="Values.Set"></a>

```vertex
public mutating func Set(_ key: string, _ value: string)
```

Replaces every value for a key with one.

<a id="Values.Delete"></a>

```vertex
public mutating func Delete(_ key: string)
```

<a id="Values.Encode"></a>

```vertex
public func Encode() -> string
```

The query string, "a=1&b=two+words", in order.

## Files

- escape.vs
- url.vs
- values.vs
