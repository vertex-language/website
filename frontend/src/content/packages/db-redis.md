# package redis

```vertex
import "db/redis"
```

## Index

- [`class RedisClient`](#class-RedisClient)
  - [`init(stream: tcp.TcpStream? = nil, isMemory: bool = false)`](#RedisClient.init)
  - [`static func connect(host: string = "127.0.0.1", port: int = 6379, timeoutMs: int32 = 5000) async throws -> RedisClient`](#RedisClient.connect)
  - [`static func memory() -> RedisClient`](#RedisClient.memory)
  - [`func close()`](#RedisClient.close)
  - [`func sendCommand(_ args: [string]) async throws -> RespValue`](#RedisClient.sendCommand)
  - [`func ping(_ msg: string? = nil) async throws -> string`](#RedisClient.ping)
  - [`func get(_ key: string) async throws -> string?`](#RedisClient.get)
  - [`func set(_ key: string, _ value: string) async throws -> bool`](#RedisClient.set)
  - [`func del(_ keys: [string]) async throws -> int64`](#RedisClient.del)
  - [`func exists(_ key: string) async throws -> bool`](#RedisClient.exists)
  - [`func incr(_ key: string) async throws -> int64`](#RedisClient.incr)
  - [`func decr(_ key: string) async throws -> int64`](#RedisClient.decr)
  - [`func hset(_ key: string, _ field: string, _ value: string) async throws -> int64`](#RedisClient.hset)
  - [`func hget(_ key: string, _ field: string) async throws -> string?`](#RedisClient.hget)
  - [`func hgetall(_ key: string) async throws -> [string: string]`](#RedisClient.hgetall)
  - [`func hdel(_ key: string, _ fields: [string]) async throws -> int64`](#RedisClient.hdel)
  - [`func lpush(_ key: string, _ values: [string]) async throws -> int64`](#RedisClient.lpush)
  - [`func rpush(_ key: string, _ values: [string]) async throws -> int64`](#RedisClient.rpush)
  - [`func lpop(_ key: string) async throws -> string?`](#RedisClient.lpop)
  - [`func rpop(_ key: string) async throws -> string?`](#RedisClient.rpop)
  - [`func lrange(_ key: string, start: int, stop: int) async throws -> [string]`](#RedisClient.lrange)
  - [`func llen(_ key: string) async throws -> int64`](#RedisClient.llen)
  - [`func flushdb() async throws -> bool`](#RedisClient.flushdb)
- [`enum RespError: Error, Equatable`](#enum-RespError)
- [`class RespParser`](#class-RespParser)
  - [`init(data: [uint8] = [])`](#RespParser.init)
  - [`func feed(_ data: [uint8])`](#RespParser.feed)
  - [`func parse() throws -> RespValue?`](#RespParser.parse)
- [`class RespSerializer`](#class-RespSerializer)
  - [`static func encodeCommand(_ args: [string]) -> [uint8]`](#RespSerializer.encodeCommand)
  - [`static func encodeValue(_ val: RespValue) -> [uint8]`](#RespSerializer.encodeValue)
- [`enum RespValue: Equatable, CustomStringConvertible`](#enum-RespValue)
  - [`var isNull: bool { get }`](#RespValue.isNull)
  - [`var description: string { get }`](#RespValue.description)
  - [`func asString() -> string?`](#RespValue.asString)
  - [`func asInt() -> int64?`](#RespValue.asInt)

## Types

### class RedisClient <a id="class-RedisClient"></a>

```vertex
public class RedisClient
```

#### Initializers

<a id="RedisClient.init"></a>

```vertex
public init(stream: tcp.TcpStream? = nil, isMemory: bool = false)
```

#### Methods

<a id="RedisClient.connect"></a>

```vertex
public static func connect(host: string = "127.0.0.1", port: int = 6379, timeoutMs: int32 = 5000) async throws -> RedisClient
```

<a id="RedisClient.memory"></a>

```vertex
public static func memory() -> RedisClient
```

<a id="RedisClient.close"></a>

```vertex
public func close()
```

<a id="RedisClient.sendCommand"></a>

```vertex
public func sendCommand(_ args: [string]) async throws -> RespValue
```

<a id="RedisClient.ping"></a>

```vertex
public func ping(_ msg: string? = nil) async throws -> string
```

High-level API

<a id="RedisClient.get"></a>

```vertex
public func get(_ key: string) async throws -> string?
```

<a id="RedisClient.set"></a>

```vertex
public func set(_ key: string, _ value: string) async throws -> bool
```

<a id="RedisClient.del"></a>

```vertex
public func del(_ keys: [string]) async throws -> int64
```

<a id="RedisClient.exists"></a>

```vertex
public func exists(_ key: string) async throws -> bool
```

<a id="RedisClient.incr"></a>

```vertex
public func incr(_ key: string) async throws -> int64
```

<a id="RedisClient.decr"></a>

```vertex
public func decr(_ key: string) async throws -> int64
```

<a id="RedisClient.hset"></a>

```vertex
public func hset(_ key: string, _ field: string, _ value: string) async throws -> int64
```

<a id="RedisClient.hget"></a>

```vertex
public func hget(_ key: string, _ field: string) async throws -> string?
```

<a id="RedisClient.hgetall"></a>

```vertex
public func hgetall(_ key: string) async throws -> [string: string]
```

<a id="RedisClient.hdel"></a>

```vertex
public func hdel(_ key: string, _ fields: [string]) async throws -> int64
```

<a id="RedisClient.lpush"></a>

```vertex
public func lpush(_ key: string, _ values: [string]) async throws -> int64
```

<a id="RedisClient.rpush"></a>

```vertex
public func rpush(_ key: string, _ values: [string]) async throws -> int64
```

<a id="RedisClient.lpop"></a>

```vertex
public func lpop(_ key: string) async throws -> string?
```

<a id="RedisClient.rpop"></a>

```vertex
public func rpop(_ key: string) async throws -> string?
```

<a id="RedisClient.lrange"></a>

```vertex
public func lrange(_ key: string, start: int, stop: int) async throws -> [string]
```

<a id="RedisClient.llen"></a>

```vertex
public func llen(_ key: string) async throws -> int64
```

<a id="RedisClient.flushdb"></a>

```vertex
public func flushdb() async throws -> bool
```

### enum RespError <a id="enum-RespError"></a>

```vertex
public enum RespError: Error, Equatable
```

#### Cases

<a id="RespError.incomplete"></a>

```vertex
case incomplete
```

<a id="RespError.invalidFormat"></a>

```vertex
case invalidFormat(string)
```

### class RespParser <a id="class-RespParser"></a>

```vertex
public class RespParser
```

#### Initializers

<a id="RespParser.init"></a>

```vertex
public init(data: [uint8] = [])
```

#### Methods

<a id="RespParser.feed"></a>

```vertex
public func feed(_ data: [uint8])
```

<a id="RespParser.parse"></a>

```vertex
public func parse() throws -> RespValue?
```

### class RespSerializer <a id="class-RespSerializer"></a>

```vertex
public class RespSerializer
```

#### Methods

<a id="RespSerializer.encodeCommand"></a>

```vertex
public static func encodeCommand(_ args: [string]) -> [uint8]
```

<a id="RespSerializer.encodeValue"></a>

```vertex
public static func encodeValue(_ val: RespValue) -> [uint8]
```

### enum RespValue <a id="enum-RespValue"></a>

```vertex
public enum RespValue: Equatable, CustomStringConvertible
```

#### Cases

<a id="RespValue.simpleString"></a>

```vertex
case simpleString(string)
```

<a id="RespValue.error"></a>

```vertex
case error(string)
```

<a id="RespValue.integer"></a>

```vertex
case integer(int64)
```

<a id="RespValue.bulkString"></a>

```vertex
case bulkString([uint8]?)
```

<a id="RespValue.array"></a>

```vertex
case array([RespValue]?)
```

#### Properties

<a id="RespValue.isNull"></a>

```vertex
public var isNull: bool { get }
```

<a id="RespValue.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="RespValue.asString"></a>

```vertex
public func asString() -> string?
```

<a id="RespValue.asInt"></a>

```vertex
public func asInt() -> int64?
```

## Files

- client.vs
- resp.vs
