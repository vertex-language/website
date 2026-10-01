# package ast

```vertex
import "js/ast"
```

Package ast is the syntax tree the parser builds (ECMA-262 §13–§16).

Expressions, statements and binding patterns are enums whose payloads
are classes, so a node can be annotated in place: the scope analysis
(js/scope) records each function's and block's Scope, and each
identifier's resolved Binding, on the nodes themselves.

## Index

- [`func ExprPos(_ e: Expr) -> int`](#func-ExprPos)
- [`func IsAnonymousFunctionDefinition(_ e: Expr) -> bool`](#func-IsAnonymousFunctionDefinition)
- [`func PatternNames(_ p: Pattern, _ out: inout [string])`](#func-PatternNames)
- [`func StripParens(_ e: Expr) -> Expr`](#func-StripParens)
- [`final class ArrayLit`](#class-ArrayLit)
  - [`init(elements: [Expr], at: int)`](#ArrayLit.init)
  - [`var Elements: [Expr]`](#ArrayLit.Elements)
  - [`let At: int`](#ArrayLit.At)
- [`final class ArrayPattern`](#class-ArrayPattern)
  - [`init(elements: [PatternElement?], rest: Pattern?, at: int)`](#ArrayPattern.init)
  - [`var Elements: [PatternElement?]`](#ArrayPattern.Elements)
  - [`var Rest: Pattern?`](#ArrayPattern.Rest)
  - [`let At: int`](#ArrayPattern.At)
- [`final class AssignExpr`](#class-AssignExpr)
  - [`init(op: token.TokenKind, target: Pattern, value: Expr, at: int)`](#AssignExpr.init)
  - [`var Op: token.TokenKind`](#AssignExpr.Op)
  - [`var Target: Pattern`](#AssignExpr.Target)
  - [`var Value: Expr`](#AssignExpr.Value)
  - [`let At: int`](#AssignExpr.At)
- [`final class AwaitExpr`](#class-AwaitExpr)
  - [`init(_ arg: Expr, at: int)`](#AwaitExpr.init)
  - [`var Argument: Expr`](#AwaitExpr.Argument)
  - [`let At: int`](#AwaitExpr.At)
- [`final class BigIntLit`](#class-BigIntLit)
  - [`init(_ d: string, at: int)`](#BigIntLit.init)
  - [`let Digits: string`](#BigIntLit.Digits)
  - [`let At: int`](#BigIntLit.At)
- [`final class BinaryExpr`](#class-BinaryExpr)
  - [`init(op: token.TokenKind, left: Expr, right: Expr, at: int)`](#BinaryExpr.init)
  - [`var Op: token.TokenKind`](#BinaryExpr.Op)
  - [`var Left: Expr`](#BinaryExpr.Left)
  - [`var Right: Expr`](#BinaryExpr.Right)
  - [`let At: int`](#BinaryExpr.At)
- [`final class Binding`](#class-Binding)
  - [`init(name: string, kind: BindingKind)`](#Binding.init)
  - [`let Name: string`](#Binding.Name)
  - [`var Kind: BindingKind`](#Binding.Kind)
  - [`var Captured: bool = false`](#Binding.Captured)
  - [`var Slot: int = -1`](#Binding.Slot)
  - [`weak var Scope: Scope?`](#Binding.Scope)
  - [`var NeedsTDZ: bool = false`](#Binding.NeedsTDZ)
  - [`var ParamTDZ: bool = false`](#Binding.ParamTDZ)
  - [`var IsLexical: bool { get }`](#Binding.IsLexical)
  - [`var IsConst: bool { get }`](#Binding.IsConst)
- [`enum BindingKind: Equatable`](#enum-BindingKind)
- [`final class BlockStmt`](#class-BlockStmt)
  - [`init(_ body: [Stmt], at: int)`](#BlockStmt.init)
  - [`var Body: [Stmt]`](#BlockStmt.Body)
  - [`let At: int`](#BlockStmt.At)
  - [`var Scope: Scope? = nil`](#BlockStmt.Scope)
- [`final class BoolLit`](#class-BoolLit)
  - [`init(_ v: bool, at: int)`](#BoolLit.init)
  - [`let Value: bool`](#BoolLit.Value)
  - [`let At: int`](#BoolLit.At)
- [`final class CallExpr`](#class-CallExpr)
  - [`init(callee: Expr, args: [Expr], optional: bool, at: int)`](#CallExpr.init)
  - [`var Callee: Expr`](#CallExpr.Callee)
  - [`var Args: [Expr]`](#CallExpr.Args)
  - [`var Optional: bool`](#CallExpr.Optional)
  - [`var DirectEval: bool = false`](#CallExpr.DirectEval)
  - [`let At: int`](#CallExpr.At)
- [`final class ClassElement`](#class-ClassElement)
  - [`init(kind: ClassElementKind, key: PropertyKey, isStatic: bool, value: FunctionNode?, at: int)`](#ClassElement.init)
  - [`var Kind: ClassElementKind`](#ClassElement.Kind)
  - [`var Key: PropertyKey`](#ClassElement.Key)
  - [`var IsStatic: bool`](#ClassElement.IsStatic)
  - [`var PrivateBinding: Binding? = nil`](#ClassElement.PrivateBinding)
  - [`var Value: FunctionNode?`](#ClassElement.Value)
  - [`let At: int`](#ClassElement.At)
- [`enum ClassElementKind: Equatable`](#enum-ClassElementKind)
- [`final class ClassNode`](#class-ClassNode)
  - [`init(name: string, superClass: Expr?, elements: [ClassElement], at: int)`](#ClassNode.init)
  - [`var Name: string`](#ClassNode.Name)
  - [`var SuperClass: Expr?`](#ClassNode.SuperClass)
  - [`var Constructor: FunctionNode?`](#ClassNode.Constructor)
  - [`var Elements: [ClassElement]`](#ClassNode.Elements)
  - [`let At: int`](#ClassNode.At)
  - [`var End: int = 0`](#ClassNode.End)
  - [`var Start: int = 0`](#ClassNode.Start)
  - [`var Scope: Scope? = nil`](#ClassNode.Scope)
  - [`var NameBinding: Binding? = nil`](#ClassNode.NameBinding)
- [`final class ConditionalExpr`](#class-ConditionalExpr)
  - [`init(test: Expr, consequent: Expr, alternate: Expr, at: int)`](#ConditionalExpr.init)
  - [`var Test: Expr`](#ConditionalExpr.Test)
  - [`var Consequent: Expr`](#ConditionalExpr.Consequent)
  - [`var Alternate: Expr`](#ConditionalExpr.Alternate)
  - [`let At: int`](#ConditionalExpr.At)
- [`enum DeclKind: Equatable`](#enum-DeclKind)
  - [`var IsUsing: bool { get }`](#DeclKind.IsUsing)
- [`final class Declarator`](#class-Declarator)
  - [`init(target: Pattern, initExpr: Expr?)`](#Declarator.init)
  - [`var Target: Pattern`](#Declarator.Target)
  - [`var Init: Expr?`](#Declarator.Init)
- [`final class ExportDecl`](#class-ExportDecl)
  - [`init(at: int)`](#ExportDecl.init)
  - [`var Declaration: Stmt?`](#ExportDecl.Declaration)
  - [`var DefaultExpr: Expr?`](#ExportDecl.DefaultExpr)
  - [`var Specifiers: [ExportSpecifier]`](#ExportDecl.Specifiers)
  - [`var Source: string?`](#ExportDecl.Source)
  - [`var StarAs: string?`](#ExportDecl.StarAs)
  - [`var IsStar: bool = false`](#ExportDecl.IsStar)
  - [`let At: int`](#ExportDecl.At)
- [`final class ExportSpecifier`](#class-ExportSpecifier)
  - [`init(local: string, exported: string)`](#ExportSpecifier.init)
  - [`var Local: string`](#ExportSpecifier.Local)
  - [`var Exported: string`](#ExportSpecifier.Exported)
- [`enum Expr`](#enum-Expr)
- [`final class ExprStmt`](#class-ExprStmt)
  - [`init(_ e: Expr, at: int)`](#ExprStmt.init)
  - [`var Expression: Expr`](#ExprStmt.Expression)
  - [`let At: int`](#ExprStmt.At)
  - [`var Directive: bool = false`](#ExprStmt.Directive)
- [`final class ForInStmt`](#class-ForInStmt)
  - [`init(decl: VarDecl?, target: Pattern?, right: Expr, body: Stmt, isAwait: bool, at: int)`](#ForInStmt.init)
  - [`var Decl: VarDecl?`](#ForInStmt.Decl)
  - [`var Target: Pattern?`](#ForInStmt.Target)
  - [`var Right: Expr`](#ForInStmt.Right)
  - [`var Body: Stmt`](#ForInStmt.Body)
  - [`var IsAwait: bool`](#ForInStmt.IsAwait)
  - [`let At: int`](#ForInStmt.At)
  - [`var Scope: Scope? = nil`](#ForInStmt.Scope)
  - [`var Labels: [string] = []`](#ForInStmt.Labels)
- [`final class ForStmt`](#class-ForStmt)
  - [`init(initStmt: Stmt?, test: Expr?, update: Expr?, body: Stmt, at: int)`](#ForStmt.init)
  - [`var Init: Stmt?`](#ForStmt.Init)
  - [`var Test: Expr?`](#ForStmt.Test)
  - [`var Update: Expr?`](#ForStmt.Update)
  - [`var Body: Stmt`](#ForStmt.Body)
  - [`let At: int`](#ForStmt.At)
  - [`var Scope: Scope? = nil`](#ForStmt.Scope)
  - [`var Labels: [string] = []`](#ForStmt.Labels)
- [`enum FunctionKind: Equatable`](#enum-FunctionKind)
- [`final class FunctionNode`](#class-FunctionNode)
  - [`init(name: string, kind: FunctionKind, params: [Param], rest: Pattern?, body: [Stmt], isAsync: bool, isGenerator: bool, strict: bool, start: int)`](#FunctionNode.init)
  - [`var Name: string`](#FunctionNode.Name)
  - [`var Kind: FunctionKind`](#FunctionNode.Kind)
  - [`var Params: [Param]`](#FunctionNode.Params)
  - [`var Rest: Pattern?`](#FunctionNode.Rest)
  - [`var Body: [Stmt]`](#FunctionNode.Body)
  - [`var ExprBody: Expr?`](#FunctionNode.ExprBody)
  - [`var IsAsync: bool`](#FunctionNode.IsAsync)
  - [`var IsGenerator: bool`](#FunctionNode.IsGenerator)
  - [`var Strict: bool`](#FunctionNode.Strict)
  - [`var SimpleParams: bool = true`](#FunctionNode.SimpleParams)
  - [`var IsExpression: bool = false`](#FunctionNode.IsExpression)
  - [`var Start: int`](#FunctionNode.Start)
  - [`var End: int = 0`](#FunctionNode.End)
  - [`var Line: int = 0`](#FunctionNode.Line)
  - [`var Scope: Scope? = nil`](#FunctionNode.Scope)
  - [`var BodyScope: Scope? = nil`](#FunctionNode.BodyScope)
  - [`var UsesArguments: bool = false`](#FunctionNode.UsesArguments)
  - [`var AnnexB: bool = false`](#FunctionNode.AnnexB)
  - [`var UsesThis: bool = false`](#FunctionNode.UsesThis)
  - [`var HasDirectEval: bool = false`](#FunctionNode.HasDirectEval)
  - [`weak var Class: ClassNode?`](#FunctionNode.Class)
  - [`var VarNames: [string] = []`](#FunctionNode.VarNames)
  - [`var FunctionDecls: [FunctionNode] = []`](#FunctionNode.FunctionDecls)
  - [`var SelfBinding: Binding? = nil`](#FunctionNode.SelfBinding)
  - [`var ThisBinding: Binding? = nil`](#FunctionNode.ThisBinding)
  - [`var NewTargetBinding: Binding? = nil`](#FunctionNode.NewTargetBinding)
  - [`var ArgumentsBinding: Binding? = nil`](#FunctionNode.ArgumentsBinding)
  - [`var HomeObjectBinding: Binding? = nil`](#FunctionNode.HomeObjectBinding)
  - [`var IsArrow: bool { get }`](#FunctionNode.IsArrow)
- [`final class Identifier`](#class-Identifier)
  - [`init(_ name: string, at: int)`](#Identifier.init)
  - [`let Name: string`](#Identifier.Name)
  - [`let At: int`](#Identifier.At)
  - [`var Binding: Binding? = nil`](#Identifier.Binding)
  - [`var Dynamic: bool = false`](#Identifier.Dynamic)
  - [`var Depth: int = 0`](#Identifier.Depth)
- [`final class IfStmt`](#class-IfStmt)
  - [`init(test: Expr, consequent: Stmt, alternate: Stmt?, at: int)`](#IfStmt.init)
  - [`var Test: Expr`](#IfStmt.Test)
  - [`var Consequent: Stmt`](#IfStmt.Consequent)
  - [`var Alternate: Stmt?`](#IfStmt.Alternate)
  - [`let At: int`](#IfStmt.At)
- [`final class ImportCall`](#class-ImportCall)
  - [`init(_ src: Expr, at: int)`](#ImportCall.init)
  - [`var Source: Expr`](#ImportCall.Source)
  - [`let At: int`](#ImportCall.At)
- [`final class ImportDecl`](#class-ImportDecl)
  - [`init(source: string, specifiers: [ImportSpecifier], at: int)`](#ImportDecl.init)
  - [`var Source: string`](#ImportDecl.Source)
  - [`var Specifiers: [ImportSpecifier]`](#ImportDecl.Specifiers)
  - [`let At: int`](#ImportDecl.At)
- [`final class ImportSpecifier`](#class-ImportSpecifier)
  - [`init(imported: string, local: string)`](#ImportSpecifier.init)
  - [`var Imported: string`](#ImportSpecifier.Imported)
  - [`var Local: string`](#ImportSpecifier.Local)
- [`final class JumpStmt`](#class-JumpStmt)
  - [`init(label: string?, at: int)`](#JumpStmt.init)
  - [`var Label: string?`](#JumpStmt.Label)
  - [`let At: int`](#JumpStmt.At)
- [`final class LabeledStmt`](#class-LabeledStmt)
  - [`init(label: string, body: Stmt, at: int)`](#LabeledStmt.init)
  - [`var Label: string`](#LabeledStmt.Label)
  - [`var Body: Stmt`](#LabeledStmt.Body)
  - [`let At: int`](#LabeledStmt.At)
- [`final class LogicalExpr`](#class-LogicalExpr)
  - [`init(op: token.TokenKind, left: Expr, right: Expr, at: int)`](#LogicalExpr.init)
  - [`var Op: token.TokenKind`](#LogicalExpr.Op)
  - [`var Left: Expr`](#LogicalExpr.Left)
  - [`var Right: Expr`](#LogicalExpr.Right)
  - [`let At: int`](#LogicalExpr.At)
- [`final class MemberExpr`](#class-MemberExpr)
  - [`init(object: Expr, name: string, property: Expr?, computed: bool, isPrivate: bool, optional: bool, at: int)`](#MemberExpr.init)
  - [`var Object: Expr`](#MemberExpr.Object)
  - [`var Name: string`](#MemberExpr.Name)
  - [`var Property: Expr?`](#MemberExpr.Property)
  - [`var Computed: bool`](#MemberExpr.Computed)
  - [`var Private: bool`](#MemberExpr.Private)
  - [`var Optional: bool`](#MemberExpr.Optional)
  - [`var PrivateBinding: Binding? = nil`](#MemberExpr.PrivateBinding)
  - [`let At: int`](#MemberExpr.At)
- [`final class NewExpr`](#class-NewExpr)
  - [`init(callee: Expr, args: [Expr], at: int)`](#NewExpr.init)
  - [`var Callee: Expr`](#NewExpr.Callee)
  - [`var Args: [Expr]`](#NewExpr.Args)
  - [`let At: int`](#NewExpr.At)
- [`final class NewTargetExpr`](#class-NewTargetExpr)
  - [`init(at: int)`](#NewTargetExpr.init)
  - [`let At: int`](#NewTargetExpr.At)
  - [`var Binding: Binding? = nil`](#NewTargetExpr.Binding)
  - [`var Depth: int = 0`](#NewTargetExpr.Depth)
- [`final class NumberLit`](#class-NumberLit)
  - [`init(_ v: float64, at: int)`](#NumberLit.init)
  - [`let Value: float64`](#NumberLit.Value)
  - [`let At: int`](#NumberLit.At)
- [`final class ObjectLit`](#class-ObjectLit)
  - [`init(properties: [Property], at: int)`](#ObjectLit.init)
  - [`var Properties: [Property]`](#ObjectLit.Properties)
  - [`let At: int`](#ObjectLit.At)
  - [`var CoverInitAt: int = -1`](#ObjectLit.CoverInitAt)
- [`final class ObjectPattern`](#class-ObjectPattern)
  - [`init(properties: [PatternProperty], rest: Pattern?, at: int)`](#ObjectPattern.init)
  - [`var Properties: [PatternProperty]`](#ObjectPattern.Properties)
  - [`var Rest: Pattern?`](#ObjectPattern.Rest)
  - [`let At: int`](#ObjectPattern.At)
- [`final class OptionalChain`](#class-OptionalChain)
  - [`init(_ e: Expr, at: int)`](#OptionalChain.init)
  - [`var Expression: Expr`](#OptionalChain.Expression)
  - [`let At: int`](#OptionalChain.At)
- [`final class Param`](#class-Param)
  - [`init(target: Pattern, def: Expr? = nil)`](#Param.init)
  - [`var Target: Pattern`](#Param.Target)
  - [`var Default: Expr?`](#Param.Default)
- [`final class ParenExpr`](#class-ParenExpr)
  - [`init(_ e: Expr, at: int)`](#ParenExpr.init)
  - [`var Expression: Expr`](#ParenExpr.Expression)
  - [`let At: int`](#ParenExpr.At)
- [`enum Pattern`](#enum-Pattern)
- [`final class PatternElement`](#class-PatternElement)
  - [`init(target: Pattern, def: Expr? = nil)`](#PatternElement.init)
  - [`var Target: Pattern`](#PatternElement.Target)
  - [`var Default: Expr?`](#PatternElement.Default)
- [`final class PatternProperty`](#class-PatternProperty)
  - [`init(key: PropertyKey, value: PatternElement)`](#PatternProperty.init)
  - [`var Key: PropertyKey`](#PatternProperty.Key)
  - [`var Value: PatternElement`](#PatternProperty.Value)
- [`final class Pos`](#class-Pos)
  - [`init(_ at: int)`](#Pos.init)
  - [`let At: int`](#Pos.At)
- [`final class PrivateInExpr`](#class-PrivateInExpr)
  - [`init(name: string, right: Expr, at: int)`](#PrivateInExpr.init)
  - [`var Name: string`](#PrivateInExpr.Name)
  - [`var Right: Expr`](#PrivateInExpr.Right)
  - [`var PrivateBinding: Binding? = nil`](#PrivateInExpr.PrivateBinding)
  - [`let At: int`](#PrivateInExpr.At)
- [`final class Program`](#class-Program)
  - [`init(body: [Stmt], isModule: bool, strict: bool, source: string, filename: string)`](#Program.init)
  - [`var Body: [Stmt]`](#Program.Body)
  - [`var IsModule: bool`](#Program.IsModule)
  - [`var Strict: bool`](#Program.Strict)
  - [`var Source: string`](#Program.Source)
  - [`var Filename: string`](#Program.Filename)
  - [`var Scope: Scope? = nil`](#Program.Scope)
  - [`var VarNames: [string] = []`](#Program.VarNames)
  - [`var FunctionDecls: [FunctionNode] = []`](#Program.FunctionDecls)
  - [`var LexNames: [string] = []`](#Program.LexNames)
  - [`var ConstNames: [string] = []`](#Program.ConstNames)
- [`final class Property`](#class-Property)
  - [`init(kind: PropertyKind, key: PropertyKey, value: Expr, shorthand: bool = false, at: int)`](#Property.init)
  - [`var Kind: PropertyKind`](#Property.Kind)
  - [`var Key: PropertyKey`](#Property.Key)
  - [`var Value: Expr`](#Property.Value)
  - [`var Shorthand: bool`](#Property.Shorthand)
  - [`let At: int`](#Property.At)
- [`enum PropertyKey`](#enum-PropertyKey)
- [`enum PropertyKind: Equatable`](#enum-PropertyKind)
- [`final class RegExpLit`](#class-RegExpLit)
  - [`init(pattern: string, flags: string, at: int)`](#RegExpLit.init)
  - [`let Pattern: string`](#RegExpLit.Pattern)
  - [`let Flags: string`](#RegExpLit.Flags)
  - [`let At: int`](#RegExpLit.At)
- [`final class ReturnStmt`](#class-ReturnStmt)
  - [`init(_ arg: Expr?, at: int)`](#ReturnStmt.init)
  - [`var Argument: Expr?`](#ReturnStmt.Argument)
  - [`let At: int`](#ReturnStmt.At)
- [`final class Scope`](#class-Scope)
  - [`init(kind: ScopeKind, parent: Scope?)`](#Scope.init)
  - [`let Kind: ScopeKind`](#Scope.Kind)
  - [`weak var Parent: Scope?`](#Scope.Parent)
  - [`var Children: [Scope] = []`](#Scope.Children)
  - [`var Bindings: [string: Binding] = [:]`](#Scope.Bindings)
  - [`var Order: [Binding] = []`](#Scope.Order)
  - [`weak var Function: Scope?`](#Scope.Function)
  - [`var NeedsContext: bool = false`](#Scope.NeedsContext)
  - [`var ContextSlots: int = 0`](#Scope.ContextSlots)
  - [`var Dynamic: bool = false`](#Scope.Dynamic)
  - [`var Registers: int = 0`](#Scope.Registers)
  - [`var InfoIndex: int = -1`](#Scope.InfoIndex)
  - [`var HasDirectEval: bool = false`](#Scope.HasDirectEval)
  - [`var Strict: bool = false`](#Scope.Strict)
  - [`var IsFunctionBoundary: bool { get }`](#Scope.IsFunctionBoundary)
  - [`func Lookup(_ name: string) -> Binding?`](#Scope.Lookup)
  - [`func Declare(_ name: string, _ kind: BindingKind) -> Binding`](#Scope.Declare)
- [`enum ScopeKind: Equatable`](#enum-ScopeKind)
- [`final class SequenceExpr`](#class-SequenceExpr)
  - [`init(_ exprs: [Expr], at: int)`](#SequenceExpr.init)
  - [`var Expressions: [Expr]`](#SequenceExpr.Expressions)
  - [`let At: int`](#SequenceExpr.At)
- [`final class SpreadElement`](#class-SpreadElement)
  - [`init(_ arg: Expr, at: int)`](#SpreadElement.init)
  - [`var Argument: Expr`](#SpreadElement.Argument)
  - [`let At: int`](#SpreadElement.At)
- [`enum Stmt`](#enum-Stmt)
- [`final class StringLit`](#class-StringLit)
  - [`init(_ v: [uint16], at: int)`](#StringLit.init)
  - [`let Value: [uint16]`](#StringLit.Value)
  - [`let At: int`](#StringLit.At)
- [`final class SuperCall`](#class-SuperCall)
  - [`init(args: [Expr], at: int)`](#SuperCall.init)
  - [`var Args: [Expr]`](#SuperCall.Args)
  - [`let At: int`](#SuperCall.At)
- [`final class SuperMember`](#class-SuperMember)
  - [`init(property: Expr, computed: bool, at: int)`](#SuperMember.init)
  - [`var Property: Expr`](#SuperMember.Property)
  - [`var Computed: bool`](#SuperMember.Computed)
  - [`let At: int`](#SuperMember.At)
- [`final class SwitchCase`](#class-SwitchCase)
  - [`init(test: Expr?, body: [Stmt])`](#SwitchCase.init)
  - [`var Test: Expr?`](#SwitchCase.Test)
  - [`var Body: [Stmt]`](#SwitchCase.Body)
- [`final class SwitchStmt`](#class-SwitchStmt)
  - [`init(discriminant: Expr, cases: [SwitchCase], at: int)`](#SwitchStmt.init)
  - [`var Discriminant: Expr`](#SwitchStmt.Discriminant)
  - [`var Cases: [SwitchCase]`](#SwitchStmt.Cases)
  - [`let At: int`](#SwitchStmt.At)
  - [`var Scope: Scope? = nil`](#SwitchStmt.Scope)
  - [`var Labels: [string] = []`](#SwitchStmt.Labels)
- [`final class TaggedTemplate`](#class-TaggedTemplate)
  - [`init(tag: Expr, quasi: TemplateLit, at: int)`](#TaggedTemplate.init)
  - [`var Tag: Expr`](#TaggedTemplate.Tag)
  - [`var Quasi: TemplateLit`](#TaggedTemplate.Quasi)
  - [`var Site: int = -1`](#TaggedTemplate.Site)
  - [`let At: int`](#TaggedTemplate.At)
- [`final class TemplateLit`](#class-TemplateLit)
  - [`init(cooked: [[uint16]?], raw: [string], exprs: [Expr], at: int)`](#TemplateLit.init)
  - [`var Cooked: [[uint16]?]`](#TemplateLit.Cooked)
  - [`var Raw: [string]`](#TemplateLit.Raw)
  - [`var Exprs: [Expr]`](#TemplateLit.Exprs)
  - [`let At: int`](#TemplateLit.At)
- [`final class ThisExpr`](#class-ThisExpr)
  - [`init(at: int)`](#ThisExpr.init)
  - [`let At: int`](#ThisExpr.At)
  - [`var Binding: Binding? = nil`](#ThisExpr.Binding)
  - [`var Depth: int = 0`](#ThisExpr.Depth)
- [`final class ThrowStmt`](#class-ThrowStmt)
  - [`init(_ arg: Expr, at: int)`](#ThrowStmt.init)
  - [`var Argument: Expr`](#ThrowStmt.Argument)
  - [`let At: int`](#ThrowStmt.At)
- [`final class TryStmt`](#class-TryStmt)
  - [`init(block: BlockStmt, param: Pattern?, handler: BlockStmt?, finalizer: BlockStmt?, at: int)`](#TryStmt.init)
  - [`var Block: BlockStmt`](#TryStmt.Block)
  - [`var Param: Pattern?`](#TryStmt.Param)
  - [`var Handler: BlockStmt?`](#TryStmt.Handler)
  - [`var Finalizer: BlockStmt?`](#TryStmt.Finalizer)
  - [`let At: int`](#TryStmt.At)
  - [`var CatchScope: Scope? = nil`](#TryStmt.CatchScope)
- [`final class UnaryExpr`](#class-UnaryExpr)
  - [`init(op: token.TokenKind, argument: Expr, at: int)`](#UnaryExpr.init)
  - [`var Op: token.TokenKind`](#UnaryExpr.Op)
  - [`var Argument: Expr`](#UnaryExpr.Argument)
  - [`let At: int`](#UnaryExpr.At)
- [`final class UpdateExpr`](#class-UpdateExpr)
  - [`init(op: token.TokenKind, prefix: bool, argument: Expr, at: int)`](#UpdateExpr.init)
  - [`var Op: token.TokenKind`](#UpdateExpr.Op)
  - [`var Prefix: bool`](#UpdateExpr.Prefix)
  - [`var Argument: Expr`](#UpdateExpr.Argument)
  - [`let At: int`](#UpdateExpr.At)
- [`final class VarDecl`](#class-VarDecl)
  - [`init(kind: DeclKind, declarations: [Declarator], at: int)`](#VarDecl.init)
  - [`var Kind: DeclKind`](#VarDecl.Kind)
  - [`var Declarations: [Declarator]`](#VarDecl.Declarations)
  - [`let At: int`](#VarDecl.At)
- [`final class WhileStmt`](#class-WhileStmt)
  - [`init(test: Expr, body: Stmt, at: int)`](#WhileStmt.init)
  - [`var Test: Expr`](#WhileStmt.Test)
  - [`var Body: Stmt`](#WhileStmt.Body)
  - [`let At: int`](#WhileStmt.At)
  - [`var Labels: [string] = []`](#WhileStmt.Labels)
- [`final class WithStmt`](#class-WithStmt)
  - [`init(object: Expr, body: Stmt, at: int)`](#WithStmt.init)
  - [`var Object: Expr`](#WithStmt.Object)
  - [`var Body: Stmt`](#WithStmt.Body)
  - [`let At: int`](#WithStmt.At)
  - [`var Scope: Scope? = nil`](#WithStmt.Scope)
- [`final class YieldExpr`](#class-YieldExpr)
  - [`init(argument: Expr?, delegate: bool, at: int)`](#YieldExpr.init)
  - [`var Argument: Expr?`](#YieldExpr.Argument)
  - [`var Delegate: bool`](#YieldExpr.Delegate)
  - [`let At: int`](#YieldExpr.At)

## Functions

### func ExprPos <a id="func-ExprPos"></a>

```vertex
public func ExprPos(_ e: Expr) -> int
```

ExprPos is an expression's source offset.

### func IsAnonymousFunctionDefinition <a id="func-IsAnonymousFunctionDefinition"></a>

```vertex
public func IsAnonymousFunctionDefinition(_ e: Expr) -> bool
```

IsAnonymousFunctionDefinition is the spec's test for giving an
anonymous function or class the name of what it is assigned to.

### func PatternNames <a id="func-PatternNames"></a>

```vertex
public func PatternNames(_ p: Pattern, _ out: inout [string])
```

PatternNames lists the names a binding pattern declares, in order.

### func StripParens <a id="func-StripParens"></a>

```vertex
public func StripParens(_ e: Expr) -> Expr
```

StripParens removes the parentheses around an expression.

## Types

### class ArrayLit <a id="class-ArrayLit"></a>

```vertex
public final class ArrayLit
```

#### Initializers

<a id="ArrayLit.init"></a>

```vertex
public init(elements: [Expr], at: int)
```

#### Properties

<a id="ArrayLit.Elements"></a>

```vertex
public var Elements: [Expr]
```

<a id="ArrayLit.At"></a>

```vertex
public let At: int
```

### class ArrayPattern <a id="class-ArrayPattern"></a>

```vertex
public final class ArrayPattern
```

#### Initializers

<a id="ArrayPattern.init"></a>

```vertex
public init(elements: [PatternElement?], rest: Pattern?, at: int)
```

#### Properties

<a id="ArrayPattern.Elements"></a>

```vertex
public var Elements: [PatternElement?]
```

Elements holds nil for an elision.

<a id="ArrayPattern.Rest"></a>

```vertex
public var Rest: Pattern?
```

<a id="ArrayPattern.At"></a>

```vertex
public let At: int
```

### class AssignExpr <a id="class-AssignExpr"></a>

```vertex
public final class AssignExpr
```

#### Initializers

<a id="AssignExpr.init"></a>

```vertex
public init(op: token.TokenKind, target: Pattern, value: Expr, at: int)
```

#### Properties

<a id="AssignExpr.Op"></a>

```vertex
public var Op: token.TokenKind
```

<a id="AssignExpr.Target"></a>

```vertex
public var Target: Pattern
```

assign or a compound operator

<a id="AssignExpr.Value"></a>

```vertex
public var Value: Expr
```

<a id="AssignExpr.At"></a>

```vertex
public let At: int
```

### class AwaitExpr <a id="class-AwaitExpr"></a>

```vertex
public final class AwaitExpr
```

#### Initializers

<a id="AwaitExpr.init"></a>

```vertex
public init(_ arg: Expr, at: int)
```

#### Properties

<a id="AwaitExpr.Argument"></a>

```vertex
public var Argument: Expr
```

<a id="AwaitExpr.At"></a>

```vertex
public let At: int
```

### class BigIntLit <a id="class-BigIntLit"></a>

```vertex
public final class BigIntLit
```

#### Initializers

<a id="BigIntLit.init"></a>

```vertex
public init(_ d: string, at: int)
```

#### Properties

<a id="BigIntLit.Digits"></a>

```vertex
public let Digits: string
```

Digits is the literal as written without the n, with its 0x, 0o or 0b prefix.

<a id="BigIntLit.At"></a>

```vertex
public let At: int
```

### class BinaryExpr <a id="class-BinaryExpr"></a>

```vertex
public final class BinaryExpr
```

#### Initializers

<a id="BinaryExpr.init"></a>

```vertex
public init(op: token.TokenKind, left: Expr, right: Expr, at: int)
```

#### Properties

<a id="BinaryExpr.Op"></a>

```vertex
public var Op: token.TokenKind
```

<a id="BinaryExpr.Left"></a>

```vertex
public var Left: Expr
```

<a id="BinaryExpr.Right"></a>

```vertex
public var Right: Expr
```

<a id="BinaryExpr.At"></a>

```vertex
public let At: int
```

### class Binding <a id="class-Binding"></a>

```vertex
public final class Binding
```

Binding is one declared name in one scope.

#### Initializers

<a id="Binding.init"></a>

```vertex
public init(name: string, kind: BindingKind)
```

#### Properties

<a id="Binding.Name"></a>

```vertex
public let Name: string
```

<a id="Binding.Kind"></a>

```vertex
public var Kind: BindingKind
```

<a id="Binding.Captured"></a>

```vertex
public var Captured: bool = false
```

Captured is set when a nested function refers to the binding, so it
must live in a heap context rather than a register.

<a id="Binding.Slot"></a>

```vertex
public var Slot: int = -1
```

Slot is the register (not captured) or context slot (captured).

<a id="Binding.Scope"></a>

```vertex
public weak var Scope: Scope?
```

<a id="Binding.NeedsTDZ"></a>

```vertex
public var NeedsTDZ: bool = false
```

NeedsTDZ is set for let, const and class bindings read before the
analysis can prove they are initialized.

<a id="Binding.ParamTDZ"></a>

```vertex
public var ParamTDZ: bool = false
```

ParamTDZ is set on the parameters of a function whose parameter list
is not simple: each is in its TDZ until initialized, left to right.

<a id="Binding.IsLexical"></a>

```vertex
public var IsLexical: bool { get }
```

<a id="Binding.IsConst"></a>

```vertex
public var IsConst: bool { get }
```

### enum BindingKind <a id="enum-BindingKind"></a>

```vertex
public enum BindingKind: Equatable
```

BindingKind is how a name was declared.

#### Cases

<a id="BindingKind.varBinding"></a>

```vertex
case varBinding
```

<a id="BindingKind.letBinding"></a>

```vertex
case letBinding
```

var, and a sloppy function's own name

<a id="BindingKind.constBinding"></a>

```vertex
case constBinding
```

<a id="BindingKind.classBinding"></a>

```vertex
case classBinding
```

<a id="BindingKind.functionBinding"></a>

```vertex
case functionBinding
```

the inner, immutable name of a class

<a id="BindingKind.parameter"></a>

```vertex
case parameter
```

a function declaration

<a id="BindingKind.catchParameter"></a>

```vertex
case catchParameter
```

<a id="BindingKind.calleeName"></a>

```vertex
case calleeName
```

<a id="BindingKind.internalBinding"></a>

```vertex
case internalBinding
```

a named function expression's own name

### class BlockStmt <a id="class-BlockStmt"></a>

```vertex
public final class BlockStmt
```

#### Initializers

<a id="BlockStmt.init"></a>

```vertex
public init(_ body: [Stmt], at: int)
```

#### Properties

<a id="BlockStmt.Body"></a>

```vertex
public var Body: [Stmt]
```

<a id="BlockStmt.At"></a>

```vertex
public let At: int
```

<a id="BlockStmt.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

### class BoolLit <a id="class-BoolLit"></a>

```vertex
public final class BoolLit
```

#### Initializers

<a id="BoolLit.init"></a>

```vertex
public init(_ v: bool, at: int)
```

#### Properties

<a id="BoolLit.Value"></a>

```vertex
public let Value: bool
```

<a id="BoolLit.At"></a>

```vertex
public let At: int
```

### class CallExpr <a id="class-CallExpr"></a>

```vertex
public final class CallExpr
```

#### Initializers

<a id="CallExpr.init"></a>

```vertex
public init(callee: Expr, args: [Expr], optional: bool, at: int)
```

#### Properties

<a id="CallExpr.Callee"></a>

```vertex
public var Callee: Expr
```

<a id="CallExpr.Args"></a>

```vertex
public var Args: [Expr]
```

<a id="CallExpr.Optional"></a>

```vertex
public var Optional: bool
```

<a id="CallExpr.DirectEval"></a>

```vertex
public var DirectEval: bool = false
```

f?.()
DirectEval is set by the parser for eval(...) called by that name.

<a id="CallExpr.At"></a>

```vertex
public let At: int
```

### class ClassElement <a id="class-ClassElement"></a>

```vertex
public final class ClassElement
```

#### Initializers

<a id="ClassElement.init"></a>

```vertex
public init(kind: ClassElementKind, key: PropertyKey, isStatic: bool, value: FunctionNode?, at: int)
```

#### Properties

<a id="ClassElement.Kind"></a>

```vertex
public var Kind: ClassElementKind
```

<a id="ClassElement.Key"></a>

```vertex
public var Key: PropertyKey
```

<a id="ClassElement.IsStatic"></a>

```vertex
public var IsStatic: bool
```

<a id="ClassElement.PrivateBinding"></a>

```vertex
public var PrivateBinding: Binding? = nil
```

PrivateBinding is the binding for a #name key.

<a id="ClassElement.Value"></a>

```vertex
public var Value: FunctionNode?
```

Value is the method's function, or the field's initializer wrapped
in a function (nil for a field with none).

<a id="ClassElement.At"></a>

```vertex
public let At: int
```

### enum ClassElementKind <a id="enum-ClassElementKind"></a>

```vertex
public enum ClassElementKind: Equatable
```

#### Cases

<a id="ClassElementKind.method"></a>

```vertex
case method
```

<a id="ClassElementKind.getter"></a>

```vertex
case getter
```

<a id="ClassElementKind.setter"></a>

```vertex
case setter
```

<a id="ClassElementKind.field"></a>

```vertex
case field
```

<a id="ClassElementKind.staticBlock"></a>

```vertex
case staticBlock
```

### class ClassNode <a id="class-ClassNode"></a>

```vertex
public final class ClassNode
```

#### Initializers

<a id="ClassNode.init"></a>

```vertex
public init(name: string, superClass: Expr?, elements: [ClassElement], at: int)
```

#### Properties

<a id="ClassNode.Name"></a>

```vertex
public var Name: string
```

<a id="ClassNode.SuperClass"></a>

```vertex
public var SuperClass: Expr?
```

<a id="ClassNode.Constructor"></a>

```vertex
public var Constructor: FunctionNode?
```

<a id="ClassNode.Elements"></a>

```vertex
public var Elements: [ClassElement]
```

<a id="ClassNode.At"></a>

```vertex
public let At: int
```

<a id="ClassNode.End"></a>

```vertex
public var End: int = 0
```

<a id="ClassNode.Start"></a>

```vertex
public var Start: int = 0
```

<a id="ClassNode.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

Scope holds the class's own name binding and its private names.

<a id="ClassNode.NameBinding"></a>

```vertex
public var NameBinding: Binding? = nil
```

### class ConditionalExpr <a id="class-ConditionalExpr"></a>

```vertex
public final class ConditionalExpr
```

#### Initializers

<a id="ConditionalExpr.init"></a>

```vertex
public init(test: Expr, consequent: Expr, alternate: Expr, at: int)
```

#### Properties

<a id="ConditionalExpr.Test"></a>

```vertex
public var Test: Expr
```

<a id="ConditionalExpr.Consequent"></a>

```vertex
public var Consequent: Expr
```

<a id="ConditionalExpr.Alternate"></a>

```vertex
public var Alternate: Expr
```

<a id="ConditionalExpr.At"></a>

```vertex
public let At: int
```

### enum DeclKind <a id="enum-DeclKind"></a>

```vertex
public enum DeclKind: Equatable
```

#### Cases

<a id="DeclKind.varKind"></a>

```vertex
case varKind
```

<a id="DeclKind.letKind"></a>

```vertex
case letKind
```

<a id="DeclKind.constKind"></a>

```vertex
case constKind
```

<a id="DeclKind.usingKind"></a>

```vertex
case usingKind
```

<a id="DeclKind.awaitUsingKind"></a>

```vertex
case awaitUsingKind
```

using x = ... (ES2026)

#### Properties

<a id="DeclKind.IsUsing"></a>

```vertex
public var IsUsing: bool { get }
```

IsUsing is set for using and await using: const bindings whose
values are disposed when their scope ends.

### class Declarator <a id="class-Declarator"></a>

```vertex
public final class Declarator
```

#### Initializers

<a id="Declarator.init"></a>

```vertex
public init(target: Pattern, initExpr: Expr?)
```

#### Properties

<a id="Declarator.Target"></a>

```vertex
public var Target: Pattern
```

<a id="Declarator.Init"></a>

```vertex
public var Init: Expr?
```

### class ExportDecl <a id="class-ExportDecl"></a>

```vertex
public final class ExportDecl
```

#### Initializers

<a id="ExportDecl.init"></a>

```vertex
public init(at: int)
```

#### Properties

<a id="ExportDecl.Declaration"></a>

```vertex
public var Declaration: Stmt?
```

Declaration is export var/let/const/function/class.

<a id="ExportDecl.DefaultExpr"></a>

```vertex
public var DefaultExpr: Expr?
```

DefaultExpr is export default <expression>.

<a id="ExportDecl.Specifiers"></a>

```vertex
public var Specifiers: [ExportSpecifier]
```

<a id="ExportDecl.Source"></a>

```vertex
public var Source: string?
```

Source is set for export ... from "m".

<a id="ExportDecl.StarAs"></a>

```vertex
public var StarAs: string?
```

<a id="ExportDecl.IsStar"></a>

```vertex
public var IsStar: bool = false
```

<a id="ExportDecl.At"></a>

```vertex
public let At: int
```

### class ExportSpecifier <a id="class-ExportSpecifier"></a>

```vertex
public final class ExportSpecifier
```

#### Initializers

<a id="ExportSpecifier.init"></a>

```vertex
public init(local: string, exported: string)
```

#### Properties

<a id="ExportSpecifier.Local"></a>

```vertex
public var Local: string
```

<a id="ExportSpecifier.Exported"></a>

```vertex
public var Exported: string
```

### enum Expr <a id="enum-Expr"></a>

```vertex
public enum Expr
```

#### Cases

<a id="Expr.number"></a>

```vertex
case number(NumberLit)
```

<a id="Expr.bigint"></a>

```vertex
case bigint(BigIntLit)
```

<a id="Expr.string"></a>

```vertex
case string(StringLit)
```

<a id="Expr.template"></a>

```vertex
case template(TemplateLit)
```

<a id="Expr.taggedTemplate"></a>

```vertex
case taggedTemplate(TaggedTemplate)
```

<a id="Expr.regex"></a>

```vertex
case regex(RegExpLit)
```

<a id="Expr.boolean"></a>

```vertex
case boolean(BoolLit)
```

<a id="Expr.nullLit"></a>

```vertex
case nullLit(Pos)
```

<a id="Expr.identifier"></a>

```vertex
case identifier(Identifier)
```

<a id="Expr.thisExpr"></a>

```vertex
case thisExpr(ThisExpr)
```

<a id="Expr.superMember"></a>

```vertex
case superMember(SuperMember)
```

<a id="Expr.superCall"></a>

```vertex
case superCall(SuperCall)
```

super.x, super[x]

<a id="Expr.array"></a>

```vertex
case array(ArrayLit)
```

super(...)

<a id="Expr.object"></a>

```vertex
case object(ObjectLit)
```

<a id="Expr.function"></a>

```vertex
case function(FunctionNode)
```

<a id="Expr.classExpr"></a>

```vertex
case classExpr(ClassNode)
```

function expressions and arrows

<a id="Expr.unary"></a>

```vertex
case unary(UnaryExpr)
```

<a id="Expr.update"></a>

```vertex
case update(UpdateExpr)
```

<a id="Expr.binary"></a>

```vertex
case binary(BinaryExpr)
```

<a id="Expr.logical"></a>

```vertex
case logical(LogicalExpr)
```

<a id="Expr.assign"></a>

```vertex
case assign(AssignExpr)
```

<a id="Expr.conditional"></a>

```vertex
case conditional(ConditionalExpr)
```

<a id="Expr.call"></a>

```vertex
case call(CallExpr)
```

<a id="Expr.newExpr"></a>

```vertex
case newExpr(NewExpr)
```

<a id="Expr.member"></a>

```vertex
case member(MemberExpr)
```

<a id="Expr.optionalChain"></a>

```vertex
case optionalChain(OptionalChain)
```

<a id="Expr.sequence"></a>

```vertex
case sequence(SequenceExpr)
```

the boundary a ?. short-circuits to

<a id="Expr.spread"></a>

```vertex
case spread(SpreadElement)
```

<a id="Expr.yieldExpr"></a>

```vertex
case yieldExpr(YieldExpr)
```

only inside arguments and arrays

<a id="Expr.awaitExpr"></a>

```vertex
case awaitExpr(AwaitExpr)
```

<a id="Expr.newTarget"></a>

```vertex
case newTarget(NewTargetExpr)
```

<a id="Expr.importMeta"></a>

```vertex
case importMeta(Pos)
```

<a id="Expr.importCall"></a>

```vertex
case importCall(ImportCall)
```

<a id="Expr.privateIn"></a>

```vertex
case privateIn(PrivateInExpr)
```

<a id="Expr.paren"></a>

```vertex
case paren(ParenExpr)
```

#x in obj

<a id="Expr.hole"></a>

```vertex
case hole(Pos)
```

kept so (a) = 1 and ({a}) differ; the compiler unwraps it

### class ExprStmt <a id="class-ExprStmt"></a>

```vertex
public final class ExprStmt
```

#### Initializers

<a id="ExprStmt.init"></a>

```vertex
public init(_ e: Expr, at: int)
```

#### Properties

<a id="ExprStmt.Expression"></a>

```vertex
public var Expression: Expr
```

<a id="ExprStmt.At"></a>

```vertex
public let At: int
```

<a id="ExprStmt.Directive"></a>

```vertex
public var Directive: bool = false
```

Directive is set for a "use strict"-style prologue string.

### class ForInStmt <a id="class-ForInStmt"></a>

```vertex
public final class ForInStmt
```

ForInStmt serves for-in, for-of and for-await-of.

#### Initializers

<a id="ForInStmt.init"></a>

```vertex
public init(decl: VarDecl?, target: Pattern?, right: Expr, body: Stmt, isAwait: bool, at: int)
```

#### Properties

<a id="ForInStmt.Decl"></a>

```vertex
public var Decl: VarDecl?
```

Decl is set when the left side declares (var/let/const x); Target
otherwise, an assignment target.

<a id="ForInStmt.Target"></a>

```vertex
public var Target: Pattern?
```

<a id="ForInStmt.Right"></a>

```vertex
public var Right: Expr
```

<a id="ForInStmt.Body"></a>

```vertex
public var Body: Stmt
```

<a id="ForInStmt.IsAwait"></a>

```vertex
public var IsAwait: bool
```

<a id="ForInStmt.At"></a>

```vertex
public let At: int
```

<a id="ForInStmt.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

<a id="ForInStmt.Labels"></a>

```vertex
public var Labels: [string] = []
```

### class ForStmt <a id="class-ForStmt"></a>

```vertex
public final class ForStmt
```

#### Initializers

<a id="ForStmt.init"></a>

```vertex
public init(initStmt: Stmt?, test: Expr?, update: Expr?, body: Stmt, at: int)
```

#### Properties

<a id="ForStmt.Init"></a>

```vertex
public var Init: Stmt?
```

Init is a declaration (VarDecl) or an expression statement.

<a id="ForStmt.Test"></a>

```vertex
public var Test: Expr?
```

<a id="ForStmt.Update"></a>

```vertex
public var Update: Expr?
```

<a id="ForStmt.Body"></a>

```vertex
public var Body: Stmt
```

<a id="ForStmt.At"></a>

```vertex
public let At: int
```

<a id="ForStmt.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

Scope holds a let or const Init's bindings, copied per iteration.

<a id="ForStmt.Labels"></a>

```vertex
public var Labels: [string] = []
```

### enum FunctionKind <a id="enum-FunctionKind"></a>

```vertex
public enum FunctionKind: Equatable
```

#### Cases

<a id="FunctionKind.normal"></a>

```vertex
case normal
```

<a id="FunctionKind.arrow"></a>

```vertex
case arrow
```

<a id="FunctionKind.method"></a>

```vertex
case method
```

<a id="FunctionKind.getter"></a>

```vertex
case getter
```

<a id="FunctionKind.setter"></a>

```vertex
case setter
```

<a id="FunctionKind.classConstructor"></a>

```vertex
case classConstructor
```

<a id="FunctionKind.derivedConstructor"></a>

```vertex
case derivedConstructor
```

<a id="FunctionKind.classFieldInit"></a>

```vertex
case classFieldInit
```

<a id="FunctionKind.staticBlock"></a>

```vertex
case staticBlock
```

the synthetic function that runs a class's field initializers

### class FunctionNode <a id="class-FunctionNode"></a>

```vertex
public final class FunctionNode
```

#### Initializers

<a id="FunctionNode.init"></a>

```vertex
public init(name: string, kind: FunctionKind, params: [Param], rest: Pattern?, body: [Stmt], isAsync: bool, isGenerator: bool, strict: bool, start: int)
```

#### Properties

<a id="FunctionNode.Name"></a>

```vertex
public var Name: string
```

<a id="FunctionNode.Kind"></a>

```vertex
public var Kind: FunctionKind
```

<a id="FunctionNode.Params"></a>

```vertex
public var Params: [Param]
```

<a id="FunctionNode.Rest"></a>

```vertex
public var Rest: Pattern?
```

<a id="FunctionNode.Body"></a>

```vertex
public var Body: [Stmt]
```

<a id="FunctionNode.ExprBody"></a>

```vertex
public var ExprBody: Expr?
```

ExprBody is set for a concise arrow body.

<a id="FunctionNode.IsAsync"></a>

```vertex
public var IsAsync: bool
```

<a id="FunctionNode.IsGenerator"></a>

```vertex
public var IsGenerator: bool
```

<a id="FunctionNode.Strict"></a>

```vertex
public var Strict: bool
```

<a id="FunctionNode.SimpleParams"></a>

```vertex
public var SimpleParams: bool = true
```

SimpleParams is set when every parameter is a plain identifier with
no default and there is no rest: such functions get a mapped
arguments object in sloppy mode.

<a id="FunctionNode.IsExpression"></a>

```vertex
public var IsExpression: bool = false
```

<a id="FunctionNode.Start"></a>

```vertex
public var Start: int
```

Start and End are the byte offsets of the source text, for toString.

<a id="FunctionNode.End"></a>

```vertex
public var End: int = 0
```

<a id="FunctionNode.Line"></a>

```vertex
public var Line: int = 0
```

<a id="FunctionNode.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

Filled by js/scope.

<a id="FunctionNode.BodyScope"></a>

```vertex
public var BodyScope: Scope? = nil
```

BodyScope is the scope for the body's lexical declarations when the
parameters have expressions (defaults), which get their own scope.

<a id="FunctionNode.UsesArguments"></a>

```vertex
public var UsesArguments: bool = false
```

<a id="FunctionNode.AnnexB"></a>

```vertex
public var AnnexB: bool = false
```

AnnexB is set on a block-level function declaration in sloppy code
that also assigns the enclosing function's var of its name (Annex B.3.3).

<a id="FunctionNode.UsesThis"></a>

```vertex
public var UsesThis: bool = false
```

<a id="FunctionNode.HasDirectEval"></a>

```vertex
public var HasDirectEval: bool = false
```

<a id="FunctionNode.Class"></a>

```vertex
public weak var Class: ClassNode?
```

Class is set on a class's constructor and methods, for field setup.

<a id="FunctionNode.VarNames"></a>

```vertex
public var VarNames: [string] = []
```

VarNames and FunctionDecls are hoisted declarations of the body.

<a id="FunctionNode.FunctionDecls"></a>

```vertex
public var FunctionDecls: [FunctionNode] = []
```

<a id="FunctionNode.SelfBinding"></a>

```vertex
public var SelfBinding: Binding? = nil
```

FunctionNameBinding is a named function expression's own name.

<a id="FunctionNode.ThisBinding"></a>

```vertex
public var ThisBinding: Binding? = nil
```

<a id="FunctionNode.NewTargetBinding"></a>

```vertex
public var NewTargetBinding: Binding? = nil
```

<a id="FunctionNode.ArgumentsBinding"></a>

```vertex
public var ArgumentsBinding: Binding? = nil
```

<a id="FunctionNode.HomeObjectBinding"></a>

```vertex
public var HomeObjectBinding: Binding? = nil
```

<a id="FunctionNode.IsArrow"></a>

```vertex
public var IsArrow: bool { get }
```

### class Identifier <a id="class-Identifier"></a>

```vertex
public final class Identifier
```

#### Initializers

<a id="Identifier.init"></a>

```vertex
public init(_ name: string, at: int)
```

#### Properties

<a id="Identifier.Name"></a>

```vertex
public let Name: string
```

<a id="Identifier.At"></a>

```vertex
public let At: int
```

<a id="Identifier.Binding"></a>

```vertex
public var Binding: Binding? = nil
```

Binding is the resolved declaration, or nil for a global or dynamic name.

<a id="Identifier.Dynamic"></a>

```vertex
public var Dynamic: bool = false
```

Dynamic is set when the name must be looked up at runtime (with, eval).

<a id="Identifier.Depth"></a>

```vertex
public var Depth: int = 0
```

Depth is how many contexts out the binding's context is, when captured.

### class IfStmt <a id="class-IfStmt"></a>

```vertex
public final class IfStmt
```

#### Initializers

<a id="IfStmt.init"></a>

```vertex
public init(test: Expr, consequent: Stmt, alternate: Stmt?, at: int)
```

#### Properties

<a id="IfStmt.Test"></a>

```vertex
public var Test: Expr
```

<a id="IfStmt.Consequent"></a>

```vertex
public var Consequent: Stmt
```

<a id="IfStmt.Alternate"></a>

```vertex
public var Alternate: Stmt?
```

<a id="IfStmt.At"></a>

```vertex
public let At: int
```

### class ImportCall <a id="class-ImportCall"></a>

```vertex
public final class ImportCall
```

#### Initializers

<a id="ImportCall.init"></a>

```vertex
public init(_ src: Expr, at: int)
```

#### Properties

<a id="ImportCall.Source"></a>

```vertex
public var Source: Expr
```

<a id="ImportCall.At"></a>

```vertex
public let At: int
```

### class ImportDecl <a id="class-ImportDecl"></a>

```vertex
public final class ImportDecl
```

#### Initializers

<a id="ImportDecl.init"></a>

```vertex
public init(source: string, specifiers: [ImportSpecifier], at: int)
```

#### Properties

<a id="ImportDecl.Source"></a>

```vertex
public var Source: string
```

<a id="ImportDecl.Specifiers"></a>

```vertex
public var Specifiers: [ImportSpecifier]
```

<a id="ImportDecl.At"></a>

```vertex
public let At: int
```

### class ImportSpecifier <a id="class-ImportSpecifier"></a>

```vertex
public final class ImportSpecifier
```

#### Initializers

<a id="ImportSpecifier.init"></a>

```vertex
public init(imported: string, local: string)
```

#### Properties

<a id="ImportSpecifier.Imported"></a>

```vertex
public var Imported: string
```

Imported is the exported name ("default", "*" for a namespace).

<a id="ImportSpecifier.Local"></a>

```vertex
public var Local: string
```

### class JumpStmt <a id="class-JumpStmt"></a>

```vertex
public final class JumpStmt
```

#### Initializers

<a id="JumpStmt.init"></a>

```vertex
public init(label: string?, at: int)
```

#### Properties

<a id="JumpStmt.Label"></a>

```vertex
public var Label: string?
```

<a id="JumpStmt.At"></a>

```vertex
public let At: int
```

### class LabeledStmt <a id="class-LabeledStmt"></a>

```vertex
public final class LabeledStmt
```

#### Initializers

<a id="LabeledStmt.init"></a>

```vertex
public init(label: string, body: Stmt, at: int)
```

#### Properties

<a id="LabeledStmt.Label"></a>

```vertex
public var Label: string
```

<a id="LabeledStmt.Body"></a>

```vertex
public var Body: Stmt
```

<a id="LabeledStmt.At"></a>

```vertex
public let At: int
```

### class LogicalExpr <a id="class-LogicalExpr"></a>

```vertex
public final class LogicalExpr
```

#### Initializers

<a id="LogicalExpr.init"></a>

```vertex
public init(op: token.TokenKind, left: Expr, right: Expr, at: int)
```

#### Properties

<a id="LogicalExpr.Op"></a>

```vertex
public var Op: token.TokenKind
```

<a id="LogicalExpr.Left"></a>

```vertex
public var Left: Expr
```

logicalAnd, logicalOr, nullishCoalesce

<a id="LogicalExpr.Right"></a>

```vertex
public var Right: Expr
```

<a id="LogicalExpr.At"></a>

```vertex
public let At: int
```

### class MemberExpr <a id="class-MemberExpr"></a>

```vertex
public final class MemberExpr
```

#### Initializers

<a id="MemberExpr.init"></a>

```vertex
public init(object: Expr, name: string, property: Expr?, computed: bool, isPrivate: bool, optional: bool, at: int)
```

#### Properties

<a id="MemberExpr.Object"></a>

```vertex
public var Object: Expr
```

<a id="MemberExpr.Name"></a>

```vertex
public var Name: string
```

Property is an identifier name (Name) or, when Computed, an expression.

<a id="MemberExpr.Property"></a>

```vertex
public var Property: Expr?
```

<a id="MemberExpr.Computed"></a>

```vertex
public var Computed: bool
```

<a id="MemberExpr.Private"></a>

```vertex
public var Private: bool
```

<a id="MemberExpr.Optional"></a>

```vertex
public var Optional: bool
```

obj.#x

<a id="MemberExpr.PrivateBinding"></a>

```vertex
public var PrivateBinding: Binding? = nil
```

obj?.x
PrivateBinding is the class scope's binding for #Name, when Private.

<a id="MemberExpr.At"></a>

```vertex
public let At: int
```

### class NewExpr <a id="class-NewExpr"></a>

```vertex
public final class NewExpr
```

#### Initializers

<a id="NewExpr.init"></a>

```vertex
public init(callee: Expr, args: [Expr], at: int)
```

#### Properties

<a id="NewExpr.Callee"></a>

```vertex
public var Callee: Expr
```

<a id="NewExpr.Args"></a>

```vertex
public var Args: [Expr]
```

<a id="NewExpr.At"></a>

```vertex
public let At: int
```

### class NewTargetExpr <a id="class-NewTargetExpr"></a>

```vertex
public final class NewTargetExpr
```

#### Initializers

<a id="NewTargetExpr.init"></a>

```vertex
public init(at: int)
```

#### Properties

<a id="NewTargetExpr.At"></a>

```vertex
public let At: int
```

<a id="NewTargetExpr.Binding"></a>

```vertex
public var Binding: Binding? = nil
```

<a id="NewTargetExpr.Depth"></a>

```vertex
public var Depth: int = 0
```

### class NumberLit <a id="class-NumberLit"></a>

```vertex
public final class NumberLit
```

#### Initializers

<a id="NumberLit.init"></a>

```vertex
public init(_ v: float64, at: int)
```

#### Properties

<a id="NumberLit.Value"></a>

```vertex
public let Value: float64
```

<a id="NumberLit.At"></a>

```vertex
public let At: int
```

### class ObjectLit <a id="class-ObjectLit"></a>

```vertex
public final class ObjectLit
```

#### Initializers

<a id="ObjectLit.init"></a>

```vertex
public init(properties: [Property], at: int)
```

#### Properties

<a id="ObjectLit.Properties"></a>

```vertex
public var Properties: [Property]
```

<a id="ObjectLit.At"></a>

```vertex
public let At: int
```

<a id="ObjectLit.CoverInitAt"></a>

```vertex
public var CoverInitAt: int = -1
```

CoverInitializers records shorthand-with-default ({a = 1}), which is
only valid if the literal becomes a pattern.

### class ObjectPattern <a id="class-ObjectPattern"></a>

```vertex
public final class ObjectPattern
```

#### Initializers

<a id="ObjectPattern.init"></a>

```vertex
public init(properties: [PatternProperty], rest: Pattern?, at: int)
```

#### Properties

<a id="ObjectPattern.Properties"></a>

```vertex
public var Properties: [PatternProperty]
```

<a id="ObjectPattern.Rest"></a>

```vertex
public var Rest: Pattern?
```

<a id="ObjectPattern.At"></a>

```vertex
public let At: int
```

### class OptionalChain <a id="class-OptionalChain"></a>

```vertex
public final class OptionalChain
```

#### Initializers

<a id="OptionalChain.init"></a>

```vertex
public init(_ e: Expr, at: int)
```

#### Properties

<a id="OptionalChain.Expression"></a>

```vertex
public var Expression: Expr
```

<a id="OptionalChain.At"></a>

```vertex
public let At: int
```

### class Param <a id="class-Param"></a>

```vertex
public final class Param
```

Param is one formal parameter.

#### Initializers

<a id="Param.init"></a>

```vertex
public init(target: Pattern, def: Expr? = nil)
```

#### Properties

<a id="Param.Target"></a>

```vertex
public var Target: Pattern
```

<a id="Param.Default"></a>

```vertex
public var Default: Expr?
```

### class ParenExpr <a id="class-ParenExpr"></a>

```vertex
public final class ParenExpr
```

#### Initializers

<a id="ParenExpr.init"></a>

```vertex
public init(_ e: Expr, at: int)
```

#### Properties

<a id="ParenExpr.Expression"></a>

```vertex
public var Expression: Expr
```

<a id="ParenExpr.At"></a>

```vertex
public let At: int
```

### enum Pattern <a id="enum-Pattern"></a>

```vertex
public enum Pattern
```

Pattern is a binding or assignment target.

#### Cases

<a id="Pattern.identifier"></a>

```vertex
case identifier(Identifier)
```

<a id="Pattern.member"></a>

```vertex
case member(Expr)
```

<a id="Pattern.array"></a>

```vertex
case array(ArrayPattern)
```

assignment targets only: a.b, a[b], super.x

<a id="Pattern.object"></a>

```vertex
case object(ObjectPattern)
```

### class PatternElement <a id="class-PatternElement"></a>

```vertex
public final class PatternElement
```

#### Initializers

<a id="PatternElement.init"></a>

```vertex
public init(target: Pattern, def: Expr? = nil)
```

#### Properties

<a id="PatternElement.Target"></a>

```vertex
public var Target: Pattern
```

<a id="PatternElement.Default"></a>

```vertex
public var Default: Expr?
```

### class PatternProperty <a id="class-PatternProperty"></a>

```vertex
public final class PatternProperty
```

#### Initializers

<a id="PatternProperty.init"></a>

```vertex
public init(key: PropertyKey, value: PatternElement)
```

#### Properties

<a id="PatternProperty.Key"></a>

```vertex
public var Key: PropertyKey
```

<a id="PatternProperty.Value"></a>

```vertex
public var Value: PatternElement
```

### class Pos <a id="class-Pos"></a>

```vertex
public final class Pos
```

Pos is a bare source position, for the payloads that need nothing else.

#### Initializers

<a id="Pos.init"></a>

```vertex
public init(_ at: int)
```

#### Properties

<a id="Pos.At"></a>

```vertex
public let At: int
```

### class PrivateInExpr <a id="class-PrivateInExpr"></a>

```vertex
public final class PrivateInExpr
```

#### Initializers

<a id="PrivateInExpr.init"></a>

```vertex
public init(name: string, right: Expr, at: int)
```

#### Properties

<a id="PrivateInExpr.Name"></a>

```vertex
public var Name: string
```

<a id="PrivateInExpr.Right"></a>

```vertex
public var Right: Expr
```

<a id="PrivateInExpr.PrivateBinding"></a>

```vertex
public var PrivateBinding: Binding? = nil
```

<a id="PrivateInExpr.At"></a>

```vertex
public let At: int
```

### class Program <a id="class-Program"></a>

```vertex
public final class Program
```

#### Initializers

<a id="Program.init"></a>

```vertex
public init(body: [Stmt], isModule: bool, strict: bool, source: string, filename: string)
```

#### Properties

<a id="Program.Body"></a>

```vertex
public var Body: [Stmt]
```

<a id="Program.IsModule"></a>

```vertex
public var IsModule: bool
```

<a id="Program.Strict"></a>

```vertex
public var Strict: bool
```

<a id="Program.Source"></a>

```vertex
public var Source: string
```

<a id="Program.Filename"></a>

```vertex
public var Filename: string
```

<a id="Program.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

<a id="Program.VarNames"></a>

```vertex
public var VarNames: [string] = []
```

VarNames and LexNames are the top-level declarations, for
GlobalDeclarationInstantiation.

<a id="Program.FunctionDecls"></a>

```vertex
public var FunctionDecls: [FunctionNode] = []
```

<a id="Program.LexNames"></a>

```vertex
public var LexNames: [string] = []
```

<a id="Program.ConstNames"></a>

```vertex
public var ConstNames: [string] = []
```

### class Property <a id="class-Property"></a>

```vertex
public final class Property
```

#### Initializers

<a id="Property.init"></a>

```vertex
public init(kind: PropertyKind, key: PropertyKey, value: Expr, shorthand: bool = false, at: int)
```

#### Properties

<a id="Property.Kind"></a>

```vertex
public var Kind: PropertyKind
```

<a id="Property.Key"></a>

```vertex
public var Key: PropertyKey
```

<a id="Property.Value"></a>

```vertex
public var Value: Expr
```

<a id="Property.Shorthand"></a>

```vertex
public var Shorthand: bool
```

<a id="Property.At"></a>

```vertex
public let At: int
```

### enum PropertyKey <a id="enum-PropertyKey"></a>

```vertex
public enum PropertyKey
```

PropertyKey is how a property or class element is named.

#### Cases

<a id="PropertyKey.named"></a>

```vertex
case named(string)
```

<a id="PropertyKey.computed"></a>

```vertex
case computed(Expr)
```

an identifier name, or a string or number literal's canonical string

<a id="PropertyKey.privateName"></a>

```vertex
case privateName(string)
```

### enum PropertyKind <a id="enum-PropertyKind"></a>

```vertex
public enum PropertyKind: Equatable
```

#### Cases

<a id="PropertyKind.initProp"></a>

```vertex
case initProp
```

<a id="PropertyKind.method"></a>

```vertex
case method
```

key: value, and shorthand

<a id="PropertyKind.getter"></a>

```vertex
case getter
```

key() {}

<a id="PropertyKind.setter"></a>

```vertex
case setter
```

<a id="PropertyKind.spread"></a>

```vertex
case spread
```

<a id="PropertyKind.protoSetter"></a>

```vertex
case protoSetter
```

...value

### class RegExpLit <a id="class-RegExpLit"></a>

```vertex
public final class RegExpLit
```

#### Initializers

<a id="RegExpLit.init"></a>

```vertex
public init(pattern: string, flags: string, at: int)
```

#### Properties

<a id="RegExpLit.Pattern"></a>

```vertex
public let Pattern: string
```

<a id="RegExpLit.Flags"></a>

```vertex
public let Flags: string
```

<a id="RegExpLit.At"></a>

```vertex
public let At: int
```

### class ReturnStmt <a id="class-ReturnStmt"></a>

```vertex
public final class ReturnStmt
```

#### Initializers

<a id="ReturnStmt.init"></a>

```vertex
public init(_ arg: Expr?, at: int)
```

#### Properties

<a id="ReturnStmt.Argument"></a>

```vertex
public var Argument: Expr?
```

<a id="ReturnStmt.At"></a>

```vertex
public let At: int
```

### class Scope <a id="class-Scope"></a>

```vertex
public final class Scope
```

Scope is a static scope. The compiler lays out its bindings.

#### Initializers

<a id="Scope.init"></a>

```vertex
public init(kind: ScopeKind, parent: Scope?)
```

#### Properties

<a id="Scope.Kind"></a>

```vertex
public let Kind: ScopeKind
```

<a id="Scope.Parent"></a>

```vertex
public weak var Parent: Scope?
```

<a id="Scope.Children"></a>

```vertex
public var Children: [Scope] = []
```

<a id="Scope.Bindings"></a>

```vertex
public var Bindings: [string: Binding] = [:]
```

<a id="Scope.Order"></a>

```vertex
public var Order: [Binding] = []
```

Order is the declaration order of Bindings.

<a id="Scope.Function"></a>

```vertex
public weak var Function: Scope?
```

Function is the scope of the enclosing function (or script).

<a id="Scope.NeedsContext"></a>

```vertex
public var NeedsContext: bool = false
```

NeedsContext is set when some binding here is captured, or the scope
can be reached by name at runtime (eval, with).

<a id="Scope.ContextSlots"></a>

```vertex
public var ContextSlots: int = 0
```

ContextSlots counts the captured bindings.

<a id="Scope.Dynamic"></a>

```vertex
public var Dynamic: bool = false
```

Dynamic is set on a function scope whose names can't be resolved
statically past it: it calls eval directly in sloppy mode, so eval
may declare vars in it.

<a id="Scope.Registers"></a>

```vertex
public var Registers: int = 0
```

Registers is, on a function-level scope, how many registers its
uncaptured bindings take (they are numbered from 0).

<a id="Scope.InfoIndex"></a>

```vertex
public var InfoIndex: int = -1
```

Info is filled by the compiler: the scope's ScopeInfo index.

<a id="Scope.HasDirectEval"></a>

```vertex
public var HasDirectEval: bool = false
```

HasDirectEval is set when this scope itself calls eval directly.

<a id="Scope.Strict"></a>

```vertex
public var Strict: bool = false
```

<a id="Scope.IsFunctionBoundary"></a>

```vertex
public var IsFunctionBoundary: bool { get }
```

#### Methods

<a id="Scope.Lookup"></a>

```vertex
public func Lookup(_ name: string) -> Binding?
```

<a id="Scope.Declare"></a>

```vertex
public func Declare(_ name: string, _ kind: BindingKind) -> Binding
```

### enum ScopeKind <a id="enum-ScopeKind"></a>

```vertex
public enum ScopeKind: Equatable
```

ScopeKind is what introduced a scope.

#### Cases

<a id="ScopeKind.script"></a>

```vertex
case script
```

<a id="ScopeKind.module"></a>

```vertex
case module
```

a script's top level: vars go on the global object

<a id="ScopeKind.function"></a>

```vertex
case function
```

<a id="ScopeKind.block"></a>

```vertex
case block
```

<a id="ScopeKind.catchClause"></a>

```vertex
case catchClause
```

<a id="ScopeKind.classBody"></a>

```vertex
case classBody
```

<a id="ScopeKind.with"></a>

```vertex
case with
```

<a id="ScopeKind.eval"></a>

```vertex
case eval
```

the object environment of a with statement

### class SequenceExpr <a id="class-SequenceExpr"></a>

```vertex
public final class SequenceExpr
```

#### Initializers

<a id="SequenceExpr.init"></a>

```vertex
public init(_ exprs: [Expr], at: int)
```

#### Properties

<a id="SequenceExpr.Expressions"></a>

```vertex
public var Expressions: [Expr]
```

<a id="SequenceExpr.At"></a>

```vertex
public let At: int
```

### class SpreadElement <a id="class-SpreadElement"></a>

```vertex
public final class SpreadElement
```

#### Initializers

<a id="SpreadElement.init"></a>

```vertex
public init(_ arg: Expr, at: int)
```

#### Properties

<a id="SpreadElement.Argument"></a>

```vertex
public var Argument: Expr
```

<a id="SpreadElement.At"></a>

```vertex
public let At: int
```

### enum Stmt <a id="enum-Stmt"></a>

```vertex
public enum Stmt
```

#### Cases

<a id="Stmt.varDecl"></a>

```vertex
case varDecl(VarDecl)
```

<a id="Stmt.functionDecl"></a>

```vertex
case functionDecl(FunctionNode)
```

<a id="Stmt.classDecl"></a>

```vertex
case classDecl(ClassNode)
```

<a id="Stmt.expr"></a>

```vertex
case expr(ExprStmt)
```

<a id="Stmt.block"></a>

```vertex
case block(BlockStmt)
```

<a id="Stmt.empty"></a>

```vertex
case empty(Pos)
```

<a id="Stmt.ifStmt"></a>

```vertex
case ifStmt(IfStmt)
```

<a id="Stmt.forStmt"></a>

```vertex
case forStmt(ForStmt)
```

<a id="Stmt.forIn"></a>

```vertex
case forIn(ForInStmt)
```

<a id="Stmt.forOf"></a>

```vertex
case forOf(ForInStmt)
```

<a id="Stmt.whileStmt"></a>

```vertex
case whileStmt(WhileStmt)
```

<a id="Stmt.doWhile"></a>

```vertex
case doWhile(WhileStmt)
```

<a id="Stmt.returnStmt"></a>

```vertex
case returnStmt(ReturnStmt)
```

<a id="Stmt.breakStmt"></a>

```vertex
case breakStmt(JumpStmt)
```

<a id="Stmt.continueStmt"></a>

```vertex
case continueStmt(JumpStmt)
```

<a id="Stmt.throwStmt"></a>

```vertex
case throwStmt(ThrowStmt)
```

<a id="Stmt.tryStmt"></a>

```vertex
case tryStmt(TryStmt)
```

<a id="Stmt.switchStmt"></a>

```vertex
case switchStmt(SwitchStmt)
```

<a id="Stmt.labeled"></a>

```vertex
case labeled(LabeledStmt)
```

<a id="Stmt.with"></a>

```vertex
case with(WithStmt)
```

<a id="Stmt.debugger"></a>

```vertex
case debugger(Pos)
```

<a id="Stmt.importDecl"></a>

```vertex
case importDecl(ImportDecl)
```

<a id="Stmt.exportDecl"></a>

```vertex
case exportDecl(ExportDecl)
```

### class StringLit <a id="class-StringLit"></a>

```vertex
public final class StringLit
```

#### Initializers

<a id="StringLit.init"></a>

```vertex
public init(_ v: [uint16], at: int)
```

#### Properties

<a id="StringLit.Value"></a>

```vertex
public let Value: [uint16]
```

<a id="StringLit.At"></a>

```vertex
public let At: int
```

### class SuperCall <a id="class-SuperCall"></a>

```vertex
public final class SuperCall
```

#### Initializers

<a id="SuperCall.init"></a>

```vertex
public init(args: [Expr], at: int)
```

#### Properties

<a id="SuperCall.Args"></a>

```vertex
public var Args: [Expr]
```

<a id="SuperCall.At"></a>

```vertex
public let At: int
```

### class SuperMember <a id="class-SuperMember"></a>

```vertex
public final class SuperMember
```

#### Initializers

<a id="SuperMember.init"></a>

```vertex
public init(property: Expr, computed: bool, at: int)
```

#### Properties

<a id="SuperMember.Property"></a>

```vertex
public var Property: Expr
```

<a id="SuperMember.Computed"></a>

```vertex
public var Computed: bool
```

<a id="SuperMember.At"></a>

```vertex
public let At: int
```

### class SwitchCase <a id="class-SwitchCase"></a>

```vertex
public final class SwitchCase
```

#### Initializers

<a id="SwitchCase.init"></a>

```vertex
public init(test: Expr?, body: [Stmt])
```

#### Properties

<a id="SwitchCase.Test"></a>

```vertex
public var Test: Expr?
```

<a id="SwitchCase.Body"></a>

```vertex
public var Body: [Stmt]
```

### class SwitchStmt <a id="class-SwitchStmt"></a>

```vertex
public final class SwitchStmt
```

#### Initializers

<a id="SwitchStmt.init"></a>

```vertex
public init(discriminant: Expr, cases: [SwitchCase], at: int)
```

#### Properties

<a id="SwitchStmt.Discriminant"></a>

```vertex
public var Discriminant: Expr
```

<a id="SwitchStmt.Cases"></a>

```vertex
public var Cases: [SwitchCase]
```

<a id="SwitchStmt.At"></a>

```vertex
public let At: int
```

<a id="SwitchStmt.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

<a id="SwitchStmt.Labels"></a>

```vertex
public var Labels: [string] = []
```

### class TaggedTemplate <a id="class-TaggedTemplate"></a>

```vertex
public final class TaggedTemplate
```

#### Initializers

<a id="TaggedTemplate.init"></a>

```vertex
public init(tag: Expr, quasi: TemplateLit, at: int)
```

#### Properties

<a id="TaggedTemplate.Tag"></a>

```vertex
public var Tag: Expr
```

<a id="TaggedTemplate.Quasi"></a>

```vertex
public var Quasi: TemplateLit
```

<a id="TaggedTemplate.Site"></a>

```vertex
public var Site: int = -1
```

Site is filled by the compiler: the index of this call site's cached
template object.

<a id="TaggedTemplate.At"></a>

```vertex
public let At: int
```

### class TemplateLit <a id="class-TemplateLit"></a>

```vertex
public final class TemplateLit
```

#### Initializers

<a id="TemplateLit.init"></a>

```vertex
public init(cooked: [[uint16]?], raw: [string], exprs: [Expr], at: int)
```

#### Properties

<a id="TemplateLit.Cooked"></a>

```vertex
public var Cooked: [[uint16]?]
```

Cooked is nil where an escape was invalid (tagged templates only).

<a id="TemplateLit.Raw"></a>

```vertex
public var Raw: [string]
```

<a id="TemplateLit.Exprs"></a>

```vertex
public var Exprs: [Expr]
```

<a id="TemplateLit.At"></a>

```vertex
public let At: int
```

### class ThisExpr <a id="class-ThisExpr"></a>

```vertex
public final class ThisExpr
```

#### Initializers

<a id="ThisExpr.init"></a>

```vertex
public init(at: int)
```

#### Properties

<a id="ThisExpr.At"></a>

```vertex
public let At: int
```

<a id="ThisExpr.Binding"></a>

```vertex
public var Binding: Binding? = nil
```

Binding is the function's this binding, when an arrow captures it.

<a id="ThisExpr.Depth"></a>

```vertex
public var Depth: int = 0
```

### class ThrowStmt <a id="class-ThrowStmt"></a>

```vertex
public final class ThrowStmt
```

#### Initializers

<a id="ThrowStmt.init"></a>

```vertex
public init(_ arg: Expr, at: int)
```

#### Properties

<a id="ThrowStmt.Argument"></a>

```vertex
public var Argument: Expr
```

<a id="ThrowStmt.At"></a>

```vertex
public let At: int
```

### class TryStmt <a id="class-TryStmt"></a>

```vertex
public final class TryStmt
```

#### Initializers

<a id="TryStmt.init"></a>

```vertex
public init(block: BlockStmt, param: Pattern?, handler: BlockStmt?, finalizer: BlockStmt?, at: int)
```

#### Properties

<a id="TryStmt.Block"></a>

```vertex
public var Block: BlockStmt
```

<a id="TryStmt.Param"></a>

```vertex
public var Param: Pattern?
```

Param is nil for catch without a binding, or no catch at all.

<a id="TryStmt.Handler"></a>

```vertex
public var Handler: BlockStmt?
```

<a id="TryStmt.Finalizer"></a>

```vertex
public var Finalizer: BlockStmt?
```

<a id="TryStmt.At"></a>

```vertex
public let At: int
```

<a id="TryStmt.CatchScope"></a>

```vertex
public var CatchScope: Scope? = nil
```

### class UnaryExpr <a id="class-UnaryExpr"></a>

```vertex
public final class UnaryExpr
```

#### Initializers

<a id="UnaryExpr.init"></a>

```vertex
public init(op: token.TokenKind, argument: Expr, at: int)
```

#### Properties

<a id="UnaryExpr.Op"></a>

```vertex
public var Op: token.TokenKind
```

<a id="UnaryExpr.Argument"></a>

```vertex
public var Argument: Expr
```

sub, add, logicalNot, bitNot, kTypeof, kVoid, kDelete

<a id="UnaryExpr.At"></a>

```vertex
public let At: int
```

### class UpdateExpr <a id="class-UpdateExpr"></a>

```vertex
public final class UpdateExpr
```

#### Initializers

<a id="UpdateExpr.init"></a>

```vertex
public init(op: token.TokenKind, prefix: bool, argument: Expr, at: int)
```

#### Properties

<a id="UpdateExpr.Op"></a>

```vertex
public var Op: token.TokenKind
```

<a id="UpdateExpr.Prefix"></a>

```vertex
public var Prefix: bool
```

inc, dec

<a id="UpdateExpr.Argument"></a>

```vertex
public var Argument: Expr
```

<a id="UpdateExpr.At"></a>

```vertex
public let At: int
```

### class VarDecl <a id="class-VarDecl"></a>

```vertex
public final class VarDecl
```

#### Initializers

<a id="VarDecl.init"></a>

```vertex
public init(kind: DeclKind, declarations: [Declarator], at: int)
```

#### Properties

<a id="VarDecl.Kind"></a>

```vertex
public var Kind: DeclKind
```

<a id="VarDecl.Declarations"></a>

```vertex
public var Declarations: [Declarator]
```

<a id="VarDecl.At"></a>

```vertex
public let At: int
```

### class WhileStmt <a id="class-WhileStmt"></a>

```vertex
public final class WhileStmt
```

#### Initializers

<a id="WhileStmt.init"></a>

```vertex
public init(test: Expr, body: Stmt, at: int)
```

#### Properties

<a id="WhileStmt.Test"></a>

```vertex
public var Test: Expr
```

<a id="WhileStmt.Body"></a>

```vertex
public var Body: Stmt
```

<a id="WhileStmt.At"></a>

```vertex
public let At: int
```

<a id="WhileStmt.Labels"></a>

```vertex
public var Labels: [string] = []
```

### class WithStmt <a id="class-WithStmt"></a>

```vertex
public final class WithStmt
```

#### Initializers

<a id="WithStmt.init"></a>

```vertex
public init(object: Expr, body: Stmt, at: int)
```

#### Properties

<a id="WithStmt.Object"></a>

```vertex
public var Object: Expr
```

<a id="WithStmt.Body"></a>

```vertex
public var Body: Stmt
```

<a id="WithStmt.At"></a>

```vertex
public let At: int
```

<a id="WithStmt.Scope"></a>

```vertex
public var Scope: Scope? = nil
```

### class YieldExpr <a id="class-YieldExpr"></a>

```vertex
public final class YieldExpr
```

#### Initializers

<a id="YieldExpr.init"></a>

```vertex
public init(argument: Expr?, delegate: bool, at: int)
```

#### Properties

<a id="YieldExpr.Argument"></a>

```vertex
public var Argument: Expr?
```

<a id="YieldExpr.Delegate"></a>

```vertex
public var Delegate: bool
```

<a id="YieldExpr.At"></a>

```vertex
public let At: int
```

## Files

- ast.vs
