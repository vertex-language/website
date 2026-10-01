# package sql

```vertex
import "db/sql"
```

## Index

- [`enum DbError: Error, Equatable, CustomStringConvertible`](#enum-DbError)
  - [`var description: string { get }`](#DbError.description)
- [`struct Result`](#struct-Result)
  - [`init(rowsAffected: int64 = 0, lastInsertId: int64 = 0)`](#Result.init)
  - [`var rowsAffected: int64`](#Result.rowsAffected)
  - [`var lastInsertId: int64`](#Result.lastInsertId)
- [`struct Row`](#struct-Row)
  - [`init(columns: [string] = [], values: [Value] = [])`](#Row.init)
  - [`var columns: [string]`](#Row.columns)
  - [`var values: [Value]`](#Row.values)
  - [`func get(_ colName: string) -> Value?`](#Row.get)
  - [`func string(_ colName: string) -> string?`](#Row.string)
  - [`func int(_ colName: string) -> int64?`](#Row.int)
  - [`func float(_ colName: string) -> float64?`](#Row.float)
  - [`func bool(_ colName: string) -> bool?`](#Row.bool)
  - [`func blob(_ colName: string) -> [uint8]?`](#Row.blob)
  - [`func at(_ index: int) -> Value?`](#Row.at)
- [`class Rows`](#class-Rows)
  - [`init(columns: [string] = [], records: [Row] = [])`](#Rows.init)
  - [`var columns: [string]`](#Rows.columns)
  - [`var records: [Row]`](#Rows.records)
  - [`var cursor: int`](#Rows.cursor)
  - [`func next() -> bool`](#Rows.next)
  - [`func current() -> Row?`](#Rows.current)
  - [`func count() -> int`](#Rows.count)
  - [`func all() -> [Row]`](#Rows.all)
- [`enum Value: Equatable, CustomStringConvertible`](#enum-Value)
  - [`var isNull: bool { get }`](#Value.isNull)
  - [`var description: string { get }`](#Value.description)
  - [`func asInt() -> int64?`](#Value.asInt)
  - [`func asFloat() -> float64?`](#Value.asFloat)
  - [`func asString() -> string?`](#Value.asString)
  - [`func asBool() -> bool?`](#Value.asBool)
  - [`func asBlob() -> [uint8]?`](#Value.asBlob)

## Types

### enum DbError <a id="enum-DbError"></a>

```vertex
public enum DbError: Error, Equatable, CustomStringConvertible
```

DbError represents errors encountered during database operations.

#### Cases

<a id="DbError.connectionFailed"></a>

```vertex
case connectionFailed(string)
```

<a id="DbError.queryFailed"></a>

```vertex
case queryFailed(string)
```

<a id="DbError.syntaxError"></a>

```vertex
case syntaxError(string)
```

<a id="DbError.tableNotFound"></a>

```vertex
case tableNotFound(string)
```

<a id="DbError.columnNotFound"></a>

```vertex
case columnNotFound(string)
```

<a id="DbError.constraintViolation"></a>

```vertex
case constraintViolation(string)
```

<a id="DbError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="DbError.authFailed"></a>

```vertex
case authFailed(string)
```

#### Properties

<a id="DbError.description"></a>

```vertex
public var description: string { get }
```

### struct Result <a id="struct-Result"></a>

```vertex
public struct Result
```

Result contains execution metadata (rows affected, last insert ID).

#### Initializers

<a id="Result.init"></a>

```vertex
public init(rowsAffected: int64 = 0, lastInsertId: int64 = 0)
```

#### Properties

<a id="Result.rowsAffected"></a>

```vertex
public var rowsAffected: int64
```

<a id="Result.lastInsertId"></a>

```vertex
public var lastInsertId: int64
```

### struct Row <a id="struct-Row"></a>

```vertex
public struct Row
```

Row represents a single record of column values.

#### Initializers

<a id="Row.init"></a>

```vertex
public init(columns: [string] = [], values: [Value] = [])
```

#### Properties

<a id="Row.columns"></a>

```vertex
public var columns: [string]
```

<a id="Row.values"></a>

```vertex
public var values: [Value]
```

#### Methods

<a id="Row.get"></a>

```vertex
public func get(_ colName: string) -> Value?
```

<a id="Row.string"></a>

```vertex
public func string(_ colName: string) -> string?
```

<a id="Row.int"></a>

```vertex
public func int(_ colName: string) -> int64?
```

<a id="Row.float"></a>

```vertex
public func float(_ colName: string) -> float64?
```

<a id="Row.bool"></a>

```vertex
public func bool(_ colName: string) -> bool?
```

<a id="Row.blob"></a>

```vertex
public func blob(_ colName: string) -> [uint8]?
```

<a id="Row.at"></a>

```vertex
public func at(_ index: int) -> Value?
```

### class Rows <a id="class-Rows"></a>

```vertex
public class Rows
```

Rows provides cursor iteration over query results.

#### Initializers

<a id="Rows.init"></a>

```vertex
public init(columns: [string] = [], records: [Row] = [])
```

#### Properties

<a id="Rows.columns"></a>

```vertex
public var columns: [string]
```

<a id="Rows.records"></a>

```vertex
public var records: [Row]
```

<a id="Rows.cursor"></a>

```vertex
public var cursor: int
```

#### Methods

<a id="Rows.next"></a>

```vertex
public func next() -> bool
```

<a id="Rows.current"></a>

```vertex
public func current() -> Row?
```

<a id="Rows.count"></a>

```vertex
public func count() -> int
```

<a id="Rows.all"></a>

```vertex
public func all() -> [Row]
```

### enum Value <a id="enum-Value"></a>

```vertex
public enum Value: Equatable, CustomStringConvertible
```

Value represents a dynamically typed SQL value.

#### Cases

<a id="Value.null"></a>

```vertex
case null
```

<a id="Value.integer"></a>

```vertex
case integer(int64)
```

<a id="Value.real"></a>

```vertex
case real(float64)
```

<a id="Value.text"></a>

```vertex
case text(string)
```

<a id="Value.blob"></a>

```vertex
case blob([uint8])
```

<a id="Value.boolean"></a>

```vertex
case boolean(bool)
```

#### Properties

<a id="Value.isNull"></a>

```vertex
public var isNull: bool { get }
```

<a id="Value.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="Value.asInt"></a>

```vertex
public func asInt() -> int64?
```

<a id="Value.asFloat"></a>

```vertex
public func asFloat() -> float64?
```

<a id="Value.asString"></a>

```vertex
public func asString() -> string?
```

<a id="Value.asBool"></a>

```vertex
public func asBool() -> bool?
```

<a id="Value.asBlob"></a>

```vertex
public func asBlob() -> [uint8]?
```

## Files

- types.vs
- value.vs
