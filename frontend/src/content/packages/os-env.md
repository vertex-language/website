# package env

```vertex
import "os/env"
```

## Index

- [`func All() -> [(string, string)]`](#func-All)
- [`func Get(_ name: string) -> string?`](#func-Get)
- [`func GetBytes(_ name: string) -> [uint8]?`](#func-GetBytes)
- [`func Remove(_ name: string)`](#func-Remove)
- [`func Require(_ name: string) throws -> string`](#func-Require)
- [`func Set(_ name: string, _ value: string)`](#func-Set)
- [`struct Missing: Error, CustomStringConvertible`](#struct-Missing)
  - [`init(_ name: string)`](#Missing.init)
  - [`let Name: string`](#Missing.Name)
  - [`var description: string { get }`](#Missing.description)

## Functions

### func All <a id="func-All"></a>

```vertex
public func All() -> [(string, string)]
```

Every variable, as (name, value) pairs sorted by name: a snapshot, taken
when it is called.

### func Get <a id="func-Get"></a>

```vertex
public func Get(_ name: string) -> string?
```

The value of the variable `name`, or nil where it is not set. An empty
value is "", which is not the same thing.

### func GetBytes <a id="func-GetBytes"></a>

```vertex
public func GetBytes(_ name: string) -> [uint8]?
```

The raw bytes of the variable `name`, for a value that may not be
UTF-8 (a path on a system that allows any bytes in one).

### func Remove <a id="func-Remove"></a>

```vertex
public func Remove(_ name: string)
```

Removes the variable `name`. Not thread-safe; see `Set`.

### func Require <a id="func-Require"></a>

```vertex
public func Require(_ name: string) throws -> string
```

The value of the variable `name`, throwing `Missing` where it is not set.

### func Set <a id="func-Set"></a>

```vertex
public func Set(_ name: string, _ value: string)
```

Sets the variable `name` to `value` for this process and the children
it starts afterwards.

Not thread-safe: the C library's environment has no lock, and another
thread reading it while this writes can crash. Call it before starting
tasks or threads. To give a child a different environment, set
`process.Command.Env` instead.

## Types

### struct Missing <a id="struct-Missing"></a>

```vertex
public struct Missing: Error, CustomStringConvertible
```

Missing is the error `Require` throws for a variable that is not set.

#### Initializers

<a id="Missing.init"></a>

```vertex
public init(_ name: string)
```

#### Properties

<a id="Missing.Name"></a>

```vertex
public let Name: string
```

The variable that was asked for.

<a id="Missing.description"></a>

```vertex
public var description: string { get }
```

## Files

- env.vs
