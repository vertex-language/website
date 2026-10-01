# package sqlite

```vertex
import "db/sqlite"
```

## Index

- [`func compareValues(_ a: sql.Value, _ b: sql.Value) -> int`](#func-compareValues)
- [`func evaluateExpr(_ expr: Expr, row: [sql.Value], table: Table?, params: [sql.Value]) throws -> sql.Value`](#func-evaluateExpr)
- [`func valuesEqual(_ a: sql.Value, _ b: sql.Value) -> bool`](#func-valuesEqual)
- [`struct Column`](#struct-Column)
  - [`init(name: string, type: DataType, isPrimaryKey: bool = false, notNull: bool = false, defaultValue: sql.Value? = nil)`](#Column.init)
  - [`var name: string`](#Column.name)
  - [`var type: DataType`](#Column.type)
  - [`var isPrimaryKey: bool`](#Column.isPrimaryKey)
  - [`var notNull: bool`](#Column.notNull)
  - [`var defaultValue: sql.Value?`](#Column.defaultValue)
- [`enum DataType: Equatable, CustomStringConvertible`](#enum-DataType)
  - [`var description: string { get }`](#DataType.description)
  - [`static func parse(_ s: string) -> DataType`](#DataType.parse)
- [`class Database`](#class-Database)
  - [`init(path: string = ":memory:") throws`](#Database.init)
  - [`var path: string`](#Database.path)
  - [`var tables: [string: Table]`](#Database.tables)
  - [`var inTransaction: bool`](#Database.inTransaction)
  - [`static func open(_ path: string = ":memory:") throws -> Database`](#Database.open)
  - [`func getTable(_ name: string) -> Table?`](#Database.getTable)
  - [`func exec(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Result`](#Database.exec)
  - [`func query(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Rows`](#Database.query)
  - [`func queryRow(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Row?`](#Database.queryRow)
  - [`func beginTransaction() throws`](#Database.beginTransaction)
  - [`func commitTransaction() throws`](#Database.commitTransaction)
  - [`func rollbackTransaction() throws`](#Database.rollbackTransaction)
  - [`func close()`](#Database.close)
  - [`func save() throws`](#Database.save)
  - [`func load() throws`](#Database.load)
- [`class Engine`](#class-Engine)
  - [`static func execute(_ stmt: Statement, db: Database, params: [sql.Value]) throws -> (result: sql.Result?, rows: sql.Rows?)`](#Engine.execute)
- [`class Expr`](#class-Expr)
  - [`init(_ kind: Kind)`](#Expr.init)
  - [`var kind: Kind`](#Expr.kind)
  - [`static func literal(_ v: sql.Value) -> Expr`](#Expr.literal)
  - [`static func column(_ name: string) -> Expr`](#Expr.column)
  - [`static func placeholder(_ idx: int) -> Expr`](#Expr.placeholder)
  - [`static func binary(op: string, left: Expr, right: Expr) -> Expr`](#Expr.binary)
  - [`static func unary(op: string, operand: Expr) -> Expr`](#Expr.unary)
  - [`static func isNull(operand: Expr, not: bool) -> Expr`](#Expr.isNull)
  - [``static func `in`(operand: Expr, list: [Expr], not: bool) -> Expr``](#Expr.in)
  - [`static func between(operand: Expr, low: Expr, high: Expr, not: bool) -> Expr`](#Expr.between)
  - [`static func like(operand: Expr, pattern: Expr, not: bool) -> Expr`](#Expr.like)
  - [`static func functionCall(name: string, arg: string) -> Expr`](#Expr.functionCall)
- [`enum Kind`](#enum-Expr.Kind)
- [`class Parser`](#class-Parser)
  - [`init(sql: string)`](#Parser.init)
  - [`func parse() throws -> Statement`](#Parser.parse)
- [`enum SelectColumn`](#enum-SelectColumn)
  - [`var alias: string { get }`](#SelectColumn.alias)
- [`enum Statement`](#enum-Statement)
- [`class Table`](#class-Table)
  - [`init(name: string, columns: [Column])`](#Table.init)
  - [`var name: string`](#Table.name)
  - [`var columns: [Column]`](#Table.columns)
  - [`var rows: [[sql.Value]]`](#Table.rows)
  - [`var autoIncCounter: int64`](#Table.autoIncCounter)
  - [`var primaryKeyColIndex: int?`](#Table.primaryKeyColIndex)
  - [`func columnIndex(_ colName: string) -> int?`](#Table.columnIndex)
  - [`func clone() -> Table`](#Table.clone)

## Functions

### func compareValues <a id="func-compareValues"></a>

```vertex
public func compareValues(_ a: sql.Value, _ b: sql.Value) -> int
```

### func evaluateExpr <a id="func-evaluateExpr"></a>

```vertex
public func evaluateExpr(
    _ expr: Expr,
    row: [sql.Value],
    table: Table?,
    params: [sql.Value]
) throws -> sql.Value
```

### func valuesEqual <a id="func-valuesEqual"></a>

```vertex
public func valuesEqual(_ a: sql.Value, _ b: sql.Value) -> bool
```

## Types

### struct Column <a id="struct-Column"></a>

```vertex
public struct Column
```

#### Initializers

<a id="Column.init"></a>

```vertex
public init(
    name: string,
    type: DataType,
    isPrimaryKey: bool = false,
    notNull: bool = false,
    defaultValue: sql.Value? = nil
)
```

#### Properties

<a id="Column.name"></a>

```vertex
public var name: string
```

<a id="Column.type"></a>

```vertex
public var type: DataType
```

<a id="Column.isPrimaryKey"></a>

```vertex
public var isPrimaryKey: bool
```

<a id="Column.notNull"></a>

```vertex
public var notNull: bool
```

<a id="Column.defaultValue"></a>

```vertex
public var defaultValue: sql.Value?
```

### enum DataType <a id="enum-DataType"></a>

```vertex
public enum DataType: Equatable, CustomStringConvertible
```

#### Cases

<a id="DataType.integer"></a>

```vertex
case integer
```

<a id="DataType.real"></a>

```vertex
case real
```

<a id="DataType.text"></a>

```vertex
case text
```

<a id="DataType.blob"></a>

```vertex
case blob
```

<a id="DataType.boolean"></a>

```vertex
case boolean
```

#### Properties

<a id="DataType.description"></a>

```vertex
public var description: string { get }
```

#### Methods

<a id="DataType.parse"></a>

```vertex
public static func parse(_ s: string) -> DataType
```

### class Database <a id="class-Database"></a>

```vertex
public class Database
```

#### Initializers

<a id="Database.init"></a>

```vertex
public init(path: string = ":memory:") throws
```

#### Properties

<a id="Database.path"></a>

```vertex
public var path: string
```

<a id="Database.tables"></a>

```vertex
public var tables: [string: Table]
```

<a id="Database.inTransaction"></a>

```vertex
public var inTransaction: bool
```

#### Methods

<a id="Database.open"></a>

```vertex
public static func open(_ path: string = ":memory:") throws -> Database
```

<a id="Database.getTable"></a>

```vertex
public func getTable(_ name: string) -> Table?
```

<a id="Database.exec"></a>

```vertex
public func exec(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Result
```

<a id="Database.query"></a>

```vertex
public func query(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Rows
```

<a id="Database.queryRow"></a>

```vertex
public func queryRow(_ sqlStr: string, params: [sql.Value] = []) throws -> sql.Row?
```

<a id="Database.beginTransaction"></a>

```vertex
public func beginTransaction() throws
```

<a id="Database.commitTransaction"></a>

```vertex
public func commitTransaction() throws
```

<a id="Database.rollbackTransaction"></a>

```vertex
public func rollbackTransaction() throws
```

<a id="Database.close"></a>

```vertex
public func close()
```

<a id="Database.save"></a>

```vertex
public func save() throws
```

<a id="Database.load"></a>

```vertex
public func load() throws
```

### class Engine <a id="class-Engine"></a>

```vertex
public class Engine
```

#### Methods

<a id="Engine.execute"></a>

```vertex
public static func execute(
    _ stmt: Statement,
    db: Database,
    params: [sql.Value]
) throws -> (result: sql.Result?, rows: sql.Rows?)
```

### class Expr <a id="class-Expr"></a>

```vertex
public class Expr
```

#### Initializers

<a id="Expr.init"></a>

```vertex
public init(_ kind: Kind)
```

#### Properties

<a id="Expr.kind"></a>

```vertex
public var kind: Kind
```

#### Methods

<a id="Expr.literal"></a>

```vertex
public static func literal(_ v: sql.Value) -> Expr
```

<a id="Expr.column"></a>

```vertex
public static func column(_ name: string) -> Expr
```

<a id="Expr.placeholder"></a>

```vertex
public static func placeholder(_ idx: int) -> Expr
```

<a id="Expr.binary"></a>

```vertex
public static func binary(op: string, left: Expr, right: Expr) -> Expr
```

<a id="Expr.unary"></a>

```vertex
public static func unary(op: string, operand: Expr) -> Expr
```

<a id="Expr.isNull"></a>

```vertex
public static func isNull(operand: Expr, not: bool) -> Expr
```

<a id="Expr.in"></a>

```vertex
public static func `in`(operand: Expr, list: [Expr], not: bool) -> Expr
```

<a id="Expr.between"></a>

```vertex
public static func between(operand: Expr, low: Expr, high: Expr, not: bool) -> Expr
```

<a id="Expr.like"></a>

```vertex
public static func like(operand: Expr, pattern: Expr, not: bool) -> Expr
```

<a id="Expr.functionCall"></a>

```vertex
public static func functionCall(name: string, arg: string) -> Expr
```

### enum Expr.Kind <a id="enum-Expr.Kind"></a>

```vertex
public enum Kind
```

#### Cases

<a id="Expr.Kind.literal"></a>

```vertex
case literal(sql.Value)
```

<a id="Expr.Kind.column"></a>

```vertex
case column(string)
```

<a id="Expr.Kind.placeholder"></a>

```vertex
case placeholder(int)
```

<a id="Expr.Kind.binary"></a>

```vertex
case binary(op: string, left: Expr, right: Expr)
```

<a id="Expr.Kind.unary"></a>

```vertex
case unary(op: string, operand: Expr)
```

<a id="Expr.Kind.isNull"></a>

```vertex
case isNull(operand: Expr, not: bool)
```

<a id="Expr.Kind.in"></a>

```vertex
case `in`(operand: Expr, list: [Expr], not: bool)
```

<a id="Expr.Kind.between"></a>

```vertex
case between(operand: Expr, low: Expr, high: Expr, not: bool)
```

<a id="Expr.Kind.like"></a>

```vertex
case like(operand: Expr, pattern: Expr, not: bool)
```

<a id="Expr.Kind.functionCall"></a>

```vertex
case functionCall(name: string, arg: string)
```

### class Parser <a id="class-Parser"></a>

```vertex
public class Parser
```

#### Initializers

<a id="Parser.init"></a>

```vertex
public init(sql: string)
```

#### Methods

<a id="Parser.parse"></a>

```vertex
public func parse() throws -> Statement
```

### enum SelectColumn <a id="enum-SelectColumn"></a>

```vertex
public enum SelectColumn
```

#### Cases

<a id="SelectColumn.all"></a>

```vertex
case all
```

<a id="SelectColumn.column"></a>

```vertex
case column(string)
```

*

<a id="SelectColumn.countAll"></a>

```vertex
case countAll
```

<a id="SelectColumn.count"></a>

```vertex
case count(string)
```

<a id="SelectColumn.sum"></a>

```vertex
case sum(string)
```

<a id="SelectColumn.avg"></a>

```vertex
case avg(string)
```

<a id="SelectColumn.min"></a>

```vertex
case min(string)
```

<a id="SelectColumn.max"></a>

```vertex
case max(string)
```

#### Properties

<a id="SelectColumn.alias"></a>

```vertex
public var alias: string { get }
```

### enum Statement <a id="enum-Statement"></a>

```vertex
public enum Statement
```

#### Cases

<a id="Statement.createTable"></a>

```vertex
case createTable(name: string, ifNotExists: bool, columns: [Column])
```

<a id="Statement.dropTable"></a>

```vertex
case dropTable(name: string, ifExists: bool)
```

<a id="Statement.insert"></a>

```vertex
case insert(table: string, columns: [string], values: [[Expr]])
```

<a id="Statement.select"></a>

```vertex
case select(
    distinct: bool,
    columns: [SelectColumn],
    table: string,
    where: Expr?,
    orderBy: (column: string, desc: bool)?,
    limit: int?,
    offset: int?
)
```

<a id="Statement.update"></a>

```vertex
case update(table: string, assignments: [(column: string, value: Expr)], where: Expr?)
```

<a id="Statement.delete"></a>

```vertex
case delete(table: string, where: Expr?)
```

<a id="Statement.begin"></a>

```vertex
case begin
```

<a id="Statement.commit"></a>

```vertex
case commit
```

<a id="Statement.rollback"></a>

```vertex
case rollback
```

### class Table <a id="class-Table"></a>

```vertex
public class Table
```

#### Initializers

<a id="Table.init"></a>

```vertex
public init(name: string, columns: [Column])
```

#### Properties

<a id="Table.name"></a>

```vertex
public var name: string
```

<a id="Table.columns"></a>

```vertex
public var columns: [Column]
```

<a id="Table.rows"></a>

```vertex
public var rows: [[sql.Value]]
```

<a id="Table.autoIncCounter"></a>

```vertex
public var autoIncCounter: int64
```

<a id="Table.primaryKeyColIndex"></a>

```vertex
public var primaryKeyColIndex: int?
```

#### Methods

<a id="Table.columnIndex"></a>

```vertex
public func columnIndex(_ colName: string) -> int?
```

<a id="Table.clone"></a>

```vertex
public func clone() -> Table
```

## Files

- database.vs
- engine.vs
- expr.vs
- parser.vs
- schema.vs
