# package postgres

```vertex
import "db/postgres"
```

## Index

- [`class PgClient`](#class-PgClient)
  - [`init(stream: tcp.TcpStream? = nil, isMock: bool = false)`](#PgClient.init)
  - [`static func connect(host: string = "127.0.0.1", port: int = 5432, user: string = "postgres", password: string = "", database: string = "postgres", timeoutMs: int32 = 5000) async throws -> PgClient`](#PgClient.connect)
  - [`static func mock() -> PgClient`](#PgClient.mock)
  - [`func exec(_ sqlStr: string) async throws -> sql.Result`](#PgClient.exec)
  - [`func query(_ sqlStr: string) async throws -> sql.Rows`](#PgClient.query)
  - [`func queryRow(_ sqlStr: string) async throws -> sql.Row?`](#PgClient.queryRow)
  - [`func close() async`](#PgClient.close)
- [`struct PgColumnDesc`](#struct-PgColumnDesc)
  - [`init(name: string, tableOID: int32 = 0, columnAttrNumber: int16 = 0, typeOID: int32 = 0, typeSize: int16 = -1, typeModifier: int32 = -1, formatCode: int16 = 0)`](#PgColumnDesc.init)
  - [`var name: string`](#PgColumnDesc.name)
  - [`var tableOID: int32`](#PgColumnDesc.tableOID)
  - [`var columnAttrNumber: int16`](#PgColumnDesc.columnAttrNumber)
  - [`var typeOID: int32`](#PgColumnDesc.typeOID)
  - [`var typeSize: int16`](#PgColumnDesc.typeSize)
  - [`var typeModifier: int32`](#PgColumnDesc.typeModifier)
  - [`var formatCode: int16`](#PgColumnDesc.formatCode)
- [`class PgProtocol`](#class-PgProtocol)
  - [`static func encodeStartup(user: string, database: string) -> [uint8]`](#PgProtocol.encodeStartup)
  - [`static func encodePassword(_ password: string) -> [uint8]`](#PgProtocol.encodePassword)
  - [`static func encodeQuery(_ sql: string) -> [uint8]`](#PgProtocol.encodeQuery)
  - [`static func encodeTerminate() -> [uint8]`](#PgProtocol.encodeTerminate)
  - [`static func decodeRowDescription(_ payload: [uint8]) throws -> [PgColumnDesc]`](#PgProtocol.decodeRowDescription)
  - [`static func decodeDataRow(_ payload: [uint8], columns: [PgColumnDesc]) throws -> sql.Row`](#PgProtocol.decodeDataRow)
  - [`static func decodeCommandComplete(_ payload: [uint8]) -> (tag: string, affected: int64)`](#PgProtocol.decodeCommandComplete)
  - [`static func decodeErrorResponse(_ payload: [uint8]) -> string`](#PgProtocol.decodeErrorResponse)

## Types

### class PgClient <a id="class-PgClient"></a>

```vertex
public class PgClient
```

#### Initializers

<a id="PgClient.init"></a>

```vertex
public init(stream: tcp.TcpStream? = nil, isMock: bool = false)
```

#### Methods

<a id="PgClient.connect"></a>

```vertex
public static func connect(
    host: string = "127.0.0.1",
    port: int = 5432,
    user: string = "postgres",
    password: string = "",
    database: string = "postgres",
    timeoutMs: int32 = 5000
) async throws -> PgClient
```

<a id="PgClient.mock"></a>

```vertex
public static func mock() -> PgClient
```

<a id="PgClient.exec"></a>

```vertex
public func exec(_ sqlStr: string) async throws -> sql.Result
```

<a id="PgClient.query"></a>

```vertex
public func query(_ sqlStr: string) async throws -> sql.Rows
```

<a id="PgClient.queryRow"></a>

```vertex
public func queryRow(_ sqlStr: string) async throws -> sql.Row?
```

<a id="PgClient.close"></a>

```vertex
public func close() async
```

### struct PgColumnDesc <a id="struct-PgColumnDesc"></a>

```vertex
public struct PgColumnDesc
```

#### Initializers

<a id="PgColumnDesc.init"></a>

```vertex
public init(
    name: string,
    tableOID: int32 = 0,
    columnAttrNumber: int16 = 0,
    typeOID: int32 = 0,
    typeSize: int16 = -1,
    typeModifier: int32 = -1,
    formatCode: int16 = 0
)
```

#### Properties

<a id="PgColumnDesc.name"></a>

```vertex
public var name: string
```

<a id="PgColumnDesc.tableOID"></a>

```vertex
public var tableOID: int32
```

<a id="PgColumnDesc.columnAttrNumber"></a>

```vertex
public var columnAttrNumber: int16
```

<a id="PgColumnDesc.typeOID"></a>

```vertex
public var typeOID: int32
```

<a id="PgColumnDesc.typeSize"></a>

```vertex
public var typeSize: int16
```

<a id="PgColumnDesc.typeModifier"></a>

```vertex
public var typeModifier: int32
```

<a id="PgColumnDesc.formatCode"></a>

```vertex
public var formatCode: int16
```

### class PgProtocol <a id="class-PgProtocol"></a>

```vertex
public class PgProtocol
```

#### Methods

<a id="PgProtocol.encodeStartup"></a>

```vertex
public static func encodeStartup(user: string, database: string) -> [uint8]
```

<a id="PgProtocol.encodePassword"></a>

```vertex
public static func encodePassword(_ password: string) -> [uint8]
```

<a id="PgProtocol.encodeQuery"></a>

```vertex
public static func encodeQuery(_ sql: string) -> [uint8]
```

<a id="PgProtocol.encodeTerminate"></a>

```vertex
public static func encodeTerminate() -> [uint8]
```

<a id="PgProtocol.decodeRowDescription"></a>

```vertex
public static func decodeRowDescription(_ payload: [uint8]) throws -> [PgColumnDesc]
```

<a id="PgProtocol.decodeDataRow"></a>

```vertex
public static func decodeDataRow(_ payload: [uint8], columns: [PgColumnDesc]) throws -> sql.Row
```

<a id="PgProtocol.decodeCommandComplete"></a>

```vertex
public static func decodeCommandComplete(_ payload: [uint8]) -> (tag: string, affected: int64)
```

<a id="PgProtocol.decodeErrorResponse"></a>

```vertex
public static func decodeErrorResponse(_ payload: [uint8]) -> string
```

## Files

- client.vs
- protocol.vs
