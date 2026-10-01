# package mysql

```vertex
import "db/mysql"
```

## Index

- [`class MySqlClient`](#class-MySqlClient)
  - [`init(stream: tcp.TcpStream? = nil, isMock: bool = false)`](#MySqlClient.init)
  - [`static func connect(host: string = "127.0.0.1", port: int = 3306, user: string = "root", password: string = "", database: string = "", timeoutMs: int32 = 5000) async throws -> MySqlClient`](#MySqlClient.connect)
  - [`static func mock() -> MySqlClient`](#MySqlClient.mock)
  - [`func exec(_ sqlStr: string) async throws -> sql.Result`](#MySqlClient.exec)
  - [`func query(_ sqlStr: string) async throws -> sql.Rows`](#MySqlClient.query)
  - [`func queryRow(_ sqlStr: string) async throws -> sql.Row?`](#MySqlClient.queryRow)
  - [`func close() async`](#MySqlClient.close)
- [`struct MySqlColumnDesc`](#struct-MySqlColumnDesc)
  - [`init(schema: string = "", table: string = "", name: string = "", columnType: uint8 = 0)`](#MySqlColumnDesc.init)
  - [`var schema: string`](#MySqlColumnDesc.schema)
  - [`var table: string`](#MySqlColumnDesc.table)
  - [`var name: string`](#MySqlColumnDesc.name)
  - [`var columnType: uint8`](#MySqlColumnDesc.columnType)
- [`class MySqlProtocol`](#class-MySqlProtocol)
  - [`static func encodePacket(payload: [uint8], seq: uint8) -> [uint8]`](#MySqlProtocol.encodePacket)
  - [`static func encodeHandshakeResponse41(user: string, password: string, database: string, seq: uint8) -> [uint8]`](#MySqlProtocol.encodeHandshakeResponse41)
  - [`static func encodeQuery(_ sql: string, seq: uint8 = 0) -> [uint8]`](#MySqlProtocol.encodeQuery)
  - [`static func decodeOkPacket(_ payload: [uint8]) -> (affectedRows: int64, lastInsertId: int64)`](#MySqlProtocol.decodeOkPacket)
  - [`static func decodeErrPacket(_ payload: [uint8]) -> string`](#MySqlProtocol.decodeErrPacket)
  - [`static func decodeColumnDefinition(_ payload: [uint8]) -> MySqlColumnDesc`](#MySqlProtocol.decodeColumnDefinition)
  - [`static func decodeRowData(_ payload: [uint8], columns: [MySqlColumnDesc]) -> sql.Row`](#MySqlProtocol.decodeRowData)

## Types

### class MySqlClient <a id="class-MySqlClient"></a>

```vertex
public class MySqlClient
```

#### Initializers

<a id="MySqlClient.init"></a>

```vertex
public init(stream: tcp.TcpStream? = nil, isMock: bool = false)
```

#### Methods

<a id="MySqlClient.connect"></a>

```vertex
public static func connect(
    host: string = "127.0.0.1",
    port: int = 3306,
    user: string = "root",
    password: string = "",
    database: string = "",
    timeoutMs: int32 = 5000
) async throws -> MySqlClient
```

<a id="MySqlClient.mock"></a>

```vertex
public static func mock() -> MySqlClient
```

<a id="MySqlClient.exec"></a>

```vertex
public func exec(_ sqlStr: string) async throws -> sql.Result
```

<a id="MySqlClient.query"></a>

```vertex
public func query(_ sqlStr: string) async throws -> sql.Rows
```

<a id="MySqlClient.queryRow"></a>

```vertex
public func queryRow(_ sqlStr: string) async throws -> sql.Row?
```

<a id="MySqlClient.close"></a>

```vertex
public func close() async
```

### struct MySqlColumnDesc <a id="struct-MySqlColumnDesc"></a>

```vertex
public struct MySqlColumnDesc
```

#### Initializers

<a id="MySqlColumnDesc.init"></a>

```vertex
public init(schema: string = "", table: string = "", name: string = "", columnType: uint8 = 0)
```

#### Properties

<a id="MySqlColumnDesc.schema"></a>

```vertex
public var schema: string
```

<a id="MySqlColumnDesc.table"></a>

```vertex
public var table: string
```

<a id="MySqlColumnDesc.name"></a>

```vertex
public var name: string
```

<a id="MySqlColumnDesc.columnType"></a>

```vertex
public var columnType: uint8
```

### class MySqlProtocol <a id="class-MySqlProtocol"></a>

```vertex
public class MySqlProtocol
```

#### Methods

<a id="MySqlProtocol.encodePacket"></a>

```vertex
public static func encodePacket(payload: [uint8], seq: uint8) -> [uint8]
```

<a id="MySqlProtocol.encodeHandshakeResponse41"></a>

```vertex
public static func encodeHandshakeResponse41(
    user: string,
    password: string,
    database: string,
    seq: uint8
) -> [uint8]
```

<a id="MySqlProtocol.encodeQuery"></a>

```vertex
public static func encodeQuery(_ sql: string, seq: uint8 = 0) -> [uint8]
```

<a id="MySqlProtocol.decodeOkPacket"></a>

```vertex
public static func decodeOkPacket(_ payload: [uint8]) -> (affectedRows: int64, lastInsertId: int64)
```

<a id="MySqlProtocol.decodeErrPacket"></a>

```vertex
public static func decodeErrPacket(_ payload: [uint8]) -> string
```

<a id="MySqlProtocol.decodeColumnDefinition"></a>

```vertex
public static func decodeColumnDefinition(_ payload: [uint8]) -> MySqlColumnDesc
```

<a id="MySqlProtocol.decodeRowData"></a>

```vertex
public static func decodeRowData(_ payload: [uint8], columns: [MySqlColumnDesc]) -> sql.Row
```

## Files

- client.vs
- protocol.vs
