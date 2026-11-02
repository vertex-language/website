# package printer

```vertex
import "js/printer"
```

## Index

- [`func Print(program: ast.Program) -> string`](#func-Print)
- [`func PrintExpr(expr: ast.Expr) -> string`](#func-PrintExpr)
- [`func PrintStmt(stmt: ast.Stmt) -> string`](#func-PrintStmt)

## Functions

### func Print <a id="func-Print"></a>

```vertex
public func Print(program: ast.Program) -> string
```

Print renders an AST Program as JavaScript source text.

### func PrintExpr <a id="func-PrintExpr"></a>

```vertex
public func PrintExpr(expr: ast.Expr) -> string
```

PrintExpr renders an expression as source text.

### func PrintStmt <a id="func-PrintStmt"></a>

```vertex
public func PrintStmt(stmt: ast.Stmt) -> string
```

PrintStmt renders an individual statement as source text.

## Files

- printer.vs
