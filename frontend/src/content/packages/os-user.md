# package user

```vertex
import "os/user"
```

## Index

- [`func CacheDir() -> string?`](#func-CacheDir)
- [`func ConfigDir() -> string?`](#func-ConfigDir)
- [`func DataDir() -> string?`](#func-DataDir)
- [`func Home() -> string?`](#func-Home)
- [`func Name() -> string?`](#func-Name)
- [`func RuntimeDir() -> string?`](#func-RuntimeDir)
- [`func StateDir() -> string?`](#func-StateDir)

## Functions

### func CacheDir <a id="func-CacheDir"></a>

```vertex
public func CacheDir() -> string?
```

Where a program keeps data it can rebuild: $XDG_CACHE_HOME or ~/.cache
on Linux and Android, ~/Library/Caches on macOS, %LOCALAPPDATA% on
Windows.

### func ConfigDir <a id="func-ConfigDir"></a>

```vertex
public func ConfigDir() -> string?
```

Where a program keeps its settings: $XDG_CONFIG_HOME or ~/.config,
~/Library/Application Support, %APPDATA%.

### func DataDir <a id="func-DataDir"></a>

```vertex
public func DataDir() -> string?
```

Where a program keeps data the user would miss: $XDG_DATA_HOME or
~/.local/share, ~/Library/Application Support, %APPDATA%.

### func Home <a id="func-Home"></a>

```vertex
public func Home() -> string?
```

The current user's home directory: $HOME (%USERPROFILE% on Windows), or
the account's home where that is not set.

### func Name <a id="func-Name"></a>

```vertex
public func Name() -> string?
```

The current user's login name, or nil where the system has none for
this process.

### func RuntimeDir <a id="func-RuntimeDir"></a>

```vertex
public func RuntimeDir() -> string?
```

Where a program keeps sockets and other files that last as long as the
login: $XDG_RUNTIME_DIR, and nil on systems that have no such place.

### func StateDir <a id="func-StateDir"></a>

```vertex
public func StateDir() -> string?
```

Where a program keeps state that outlives a run but is not worth
backing up (history, logs): $XDG_STATE_HOME or ~/.local/state,
~/Library/Application Support, %LOCALAPPDATA%.

## Files

- user.vs
