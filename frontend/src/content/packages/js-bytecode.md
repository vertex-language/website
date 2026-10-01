# package bytecode

```vertex
import "js/bytecode"
```

Package bytecode is the instruction set the compiler emits and the
interpreter runs: a register machine with an accumulator, after V8's
Ignition. Most instructions read an operand register and the
accumulator and leave their result in the accumulator.

Operands are A, B and C. Registers are frame slots; context slots are
named by depth (how many contexts out) and index; constants index the
function's pool; jump targets are absolute instruction indexes.

## Index

- [`func Disassemble(_ fn: FunctionTemplate) -> string`](#func-Disassemble)
- [`enum Constant`](#enum-Constant)
- [`enum FunctionKind: Equatable`](#enum-FunctionKind)
- [`final class FunctionTemplate`](#class-FunctionTemplate)
  - [`init(name: str.JSString, kind: FunctionKind)`](#FunctionTemplate.init)
  - [`var Name: str.JSString`](#FunctionTemplate.Name)
  - [`var Kind: FunctionKind`](#FunctionTemplate.Kind)
  - [`var Code: [Instruction] = []`](#FunctionTemplate.Code)
  - [`var Constants: [Constant] = []`](#FunctionTemplate.Constants)
  - [`var Handlers: [Handler] = []`](#FunctionTemplate.Handlers)
  - [`var Scopes: [ScopeInfo] = []`](#FunctionTemplate.Scopes)
  - [`var FunctionScope: int = -1`](#FunctionTemplate.FunctionScope)
  - [`var FunctionContextSlots: int = 0`](#FunctionTemplate.FunctionContextSlots)
  - [`var RegisterCount: int = 0`](#FunctionTemplate.RegisterCount)
  - [`var Length: int = 0`](#FunctionTemplate.Length)
  - [`var ParamCount: int = 0`](#FunctionTemplate.ParamCount)
  - [`var Strict: bool = false`](#FunctionTemplate.Strict)
  - [`var IsAsync: bool = false`](#FunctionTemplate.IsAsync)
  - [`var IsGenerator: bool = false`](#FunctionTemplate.IsGenerator)
  - [`var NeedsFunctionEnv: bool = false`](#FunctionTemplate.NeedsFunctionEnv)
  - [`var IsDefaultDerivedConstructor: bool = false`](#FunctionTemplate.IsDefaultDerivedConstructor)
  - [`var IsClassFieldInit: bool = false`](#FunctionTemplate.IsClassFieldInit)
  - [`var Source: SourceText? = nil`](#FunctionTemplate.Source)
  - [`var Start: int = 0`](#FunctionTemplate.Start)
  - [`var End: int = 0`](#FunctionTemplate.End)
  - [`var Line: int = 0`](#FunctionTemplate.Line)
  - [`var Lines: [int] = []`](#FunctionTemplate.Lines)
  - [`var CalleeText: [int: string] = [:]`](#FunctionTemplate.CalleeText)
  - [`var MappedParams: [int] = []`](#FunctionTemplate.MappedParams)
  - [`var IsArrow: bool { get }`](#FunctionTemplate.IsArrow)
  - [`var IsClassConstructor: bool { get }`](#FunctionTemplate.IsClassConstructor)
  - [`var IsConstructor: bool { get }`](#FunctionTemplate.IsConstructor)
  - [`var SourceString: string { get }`](#FunctionTemplate.SourceString)
  - [`func LineAt(_ pc: int) -> int`](#FunctionTemplate.LineAt)
- [`final class GlobalDecls`](#class-GlobalDecls)
  - [`init()`](#GlobalDecls.init)
  - [`var VarNames: [str.JSString] = []`](#GlobalDecls.VarNames)
  - [`var FunctionNames: [str.JSString] = []`](#GlobalDecls.FunctionNames)
  - [`var LexNames: [str.JSString] = []`](#GlobalDecls.LexNames)
  - [`var ConstNames: [str.JSString] = []`](#GlobalDecls.ConstNames)
  - [`var IsEval: bool = false`](#GlobalDecls.IsEval)
- [`struct Handler`](#struct-Handler)
  - [`init(start: int, end: int, target: int, isFinally: bool, kindReg: int = -1, valueReg: int = -1, finallyStart: int = -1, contextDepth: int = 0)`](#Handler.init)
  - [`var Start: int`](#Handler.Start)
  - [`var End: int`](#Handler.End)
  - [`var Target: int`](#Handler.Target)
  - [`var IsFinally: bool`](#Handler.IsFinally)
  - [`var KindReg: int`](#Handler.KindReg)
  - [`var ValueReg: int`](#Handler.ValueReg)
  - [`var FinallyStart: int`](#Handler.FinallyStart)
  - [`var ContextDepth: int`](#Handler.ContextDepth)
- [`struct Instruction`](#struct-Instruction)
  - [`init(_ op: Opcode, _ a: int32 = 0, _ b: int32 = 0, _ c: int32 = 0)`](#Instruction.init)
  - [`var Op: Opcode`](#Instruction.Op)
  - [`var A: int32`](#Instruction.A)
  - [`var B: int32`](#Instruction.B)
  - [`var C: int32`](#Instruction.C)
- [`enum Opcode: Equatable`](#enum-Opcode)
- [`final class ScopeInfo`](#class-ScopeInfo)
  - [`init()`](#ScopeInfo.init)
  - [`var Names: [str.JSString] = []`](#ScopeInfo.Names)
  - [`var Const: [bool] = []`](#ScopeInfo.Const)
  - [`var Lexical: [bool] = []`](#ScopeInfo.Lexical)
  - [`var IsFunctionScope: bool = false`](#ScopeInfo.IsFunctionScope)
  - [`func Find(_ name: str.JSString) -> int`](#ScopeInfo.Find)
- [`final class SourceText`](#class-SourceText)
  - [`init(filename: string, text: string)`](#SourceText.init)
  - [`var Hidden: bool = false`](#SourceText.Hidden)
  - [`let Filename: string`](#SourceText.Filename)
  - [`let Bytes: [uint8]`](#SourceText.Bytes)
  - [`func Slice(_ start: int, _ end: int) -> string`](#SourceText.Slice)
- [`final class TemplateInfo`](#class-TemplateInfo)
  - [`init(cooked: [str.JSString?], raw: [str.JSString])`](#TemplateInfo.init)
  - [`let Cooked: [str.JSString?]`](#TemplateInfo.Cooked)
  - [`let Raw: [str.JSString]`](#TemplateInfo.Raw)
  - [`let ID: int`](#TemplateInfo.ID)

## Functions

### func Disassemble <a id="func-Disassemble"></a>

```vertex
public func Disassemble(_ fn: FunctionTemplate) -> string
```

Disassemble prints a function and the functions nested in it.

## Types

### enum Constant <a id="enum-Constant"></a>

```vertex
public enum Constant
```

Constant is one entry of a function's constant pool.

#### Cases

<a id="Constant.number"></a>

```vertex
case number(float64)
```

<a id="Constant.string"></a>

```vertex
case string(str.JSString)
```

<a id="Constant.key"></a>

```vertex
case key(value.PropertyKey)
```

<a id="Constant.bigint"></a>

```vertex
case bigint(value.BigInt)
```

<a id="Constant.function"></a>

```vertex
case function(FunctionTemplate)
```

<a id="Constant.template"></a>

```vertex
case template(TemplateInfo)
```

<a id="Constant.globals"></a>

```vertex
case globals(GlobalDecls)
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

<a id="FunctionKind.script"></a>

```vertex
case script
```

<a id="FunctionKind.module"></a>

```vertex
case module
```

<a id="FunctionKind.eval"></a>

```vertex
case eval
```

### class FunctionTemplate <a id="class-FunctionTemplate"></a>

```vertex
public final class FunctionTemplate
```

FunctionTemplate is a compiled function: code plus everything a
closure of it needs.

#### Initializers

<a id="FunctionTemplate.init"></a>

```vertex
public init(name: str.JSString, kind: FunctionKind)
```

#### Properties

<a id="FunctionTemplate.Name"></a>

```vertex
public var Name: str.JSString
```

<a id="FunctionTemplate.Kind"></a>

```vertex
public var Kind: FunctionKind
```

<a id="FunctionTemplate.Code"></a>

```vertex
public var Code: [Instruction] = []
```

<a id="FunctionTemplate.Constants"></a>

```vertex
public var Constants: [Constant] = []
```

<a id="FunctionTemplate.Handlers"></a>

```vertex
public var Handlers: [Handler] = []
```

<a id="FunctionTemplate.Scopes"></a>

```vertex
public var Scopes: [ScopeInfo] = []
```

<a id="FunctionTemplate.FunctionScope"></a>

```vertex
public var FunctionScope: int = -1
```

FunctionScope is the index in Scopes of the function's own context,
made at entry, or -1 when it needs none.

<a id="FunctionTemplate.FunctionContextSlots"></a>

```vertex
public var FunctionContextSlots: int = 0
```

<a id="FunctionTemplate.RegisterCount"></a>

```vertex
public var RegisterCount: int = 0
```

<a id="FunctionTemplate.Length"></a>

```vertex
public var Length: int = 0
```

Length is the function's "length": parameters before the first
default or rest.

<a id="FunctionTemplate.ParamCount"></a>

```vertex
public var ParamCount: int = 0
```

<a id="FunctionTemplate.Strict"></a>

```vertex
public var Strict: bool = false
```

<a id="FunctionTemplate.IsAsync"></a>

```vertex
public var IsAsync: bool = false
```

<a id="FunctionTemplate.IsGenerator"></a>

```vertex
public var IsGenerator: bool = false
```

<a id="FunctionTemplate.NeedsFunctionEnv"></a>

```vertex
public var NeedsFunctionEnv: bool = false
```

NeedsFunctionEnv is set when arrows or eval inside read this,
new.target or super, so the frame's must be shared.

<a id="FunctionTemplate.IsDefaultDerivedConstructor"></a>

```vertex
public var IsDefaultDerivedConstructor: bool = false
```

<a id="FunctionTemplate.IsClassFieldInit"></a>

```vertex
public var IsClassFieldInit: bool = false
```

HasFields marks a class constructor whose class has instance
fields or private methods.

<a id="FunctionTemplate.Source"></a>

```vertex
public var Source: SourceText? = nil
```

Source, Start and End give the function's source text, for
toString; Filename and Line, for stack traces.

<a id="FunctionTemplate.Start"></a>

```vertex
public var Start: int = 0
```

<a id="FunctionTemplate.End"></a>

```vertex
public var End: int = 0
```

<a id="FunctionTemplate.Line"></a>

```vertex
public var Line: int = 0
```

<a id="FunctionTemplate.Lines"></a>

```vertex
public var Lines: [int] = []
```

Lines maps instruction indexes to source lines: pairs of (pc, line).

<a id="FunctionTemplate.CalleeText"></a>

```vertex
public var CalleeText: [int: string] = [:]
```

CalleeText renders the callee of the call or new at an instruction,
for "x is not a function".

<a id="FunctionTemplate.MappedParams"></a>

```vertex
public var MappedParams: [int] = []
```

MappedParams gives, per parameter, the function context slot a
sloppy mapped arguments object aliases (-1 for none).

<a id="FunctionTemplate.IsArrow"></a>

```vertex
public var IsArrow: bool { get }
```

<a id="FunctionTemplate.IsClassConstructor"></a>

```vertex
public var IsClassConstructor: bool { get }
```

<a id="FunctionTemplate.IsConstructor"></a>

```vertex
public var IsConstructor: bool { get }
```

IsConstructor: ordinary functions and class constructors.

<a id="FunctionTemplate.SourceString"></a>

```vertex
public var SourceString: string { get }
```

SourceText is the function's source, for Function.prototype.toString.

#### Methods

<a id="FunctionTemplate.LineAt"></a>

```vertex
public func LineAt(_ pc: int) -> int
```

LineAt is the source line of the instruction at pc.

### class GlobalDecls <a id="class-GlobalDecls"></a>

```vertex
public final class GlobalDecls
```

GlobalDecls is what a script declares at its top level, for
GlobalDeclarationInstantiation.

#### Initializers

<a id="GlobalDecls.init"></a>

```vertex
public init()
```

#### Properties

<a id="GlobalDecls.VarNames"></a>

```vertex
public var VarNames: [str.JSString] = []
```

<a id="GlobalDecls.FunctionNames"></a>

```vertex
public var FunctionNames: [str.JSString] = []
```

<a id="GlobalDecls.LexNames"></a>

```vertex
public var LexNames: [str.JSString] = []
```

<a id="GlobalDecls.ConstNames"></a>

```vertex
public var ConstNames: [str.JSString] = []
```

<a id="GlobalDecls.IsEval"></a>

```vertex
public var IsEval: bool = false
```

IsEval makes vars configurable, as eval's are.

### struct Handler <a id="struct-Handler"></a>

```vertex
public struct Handler
```

Handler is one entry of the exception table: a throw from an
instruction in [Start, End) goes to Target with the exception in the
accumulator. A finally handler also records its completion registers,
so a generator's return can run it: the interpreter sets r[KindReg] to 2
and r[ValueReg] to the value, and jumps to FinallyStart.

#### Initializers

<a id="Handler.init"></a>

```vertex
public init(start: int, end: int, target: int, isFinally: bool, kindReg: int = -1, valueReg: int = -1, finallyStart: int = -1, contextDepth: int = 0)
```

#### Properties

<a id="Handler.Start"></a>

```vertex
public var Start: int
```

<a id="Handler.End"></a>

```vertex
public var End: int
```

<a id="Handler.Target"></a>

```vertex
public var Target: int
```

<a id="Handler.IsFinally"></a>

```vertex
public var IsFinally: bool
```

<a id="Handler.KindReg"></a>

```vertex
public var KindReg: int
```

<a id="Handler.ValueReg"></a>

```vertex
public var ValueReg: int
```

<a id="Handler.FinallyStart"></a>

```vertex
public var FinallyStart: int
```

<a id="Handler.ContextDepth"></a>

```vertex
public var ContextDepth: int
```

ContextDepth is how many contexts the handler's code expects above
the function's own: the interpreter pops the rest.

### struct Instruction <a id="struct-Instruction"></a>

```vertex
public struct Instruction
```

Instruction is one operation and its operands.

#### Initializers

<a id="Instruction.init"></a>

```vertex
public init(_ op: Opcode, _ a: int32 = 0, _ b: int32 = 0, _ c: int32 = 0)
```

#### Properties

<a id="Instruction.Op"></a>

```vertex
public var Op: Opcode
```

<a id="Instruction.A"></a>

```vertex
public var A: int32
```

<a id="Instruction.B"></a>

```vertex
public var B: int32
```

<a id="Instruction.C"></a>

```vertex
public var C: int32
```

### enum Opcode <a id="enum-Opcode"></a>

```vertex
public enum Opcode: Equatable
```

#### Cases

<a id="Opcode.ldaUndefined"></a>

```vertex
case ldaUndefined
```

Accumulator loads.

<a id="Opcode.ldaNull"></a>

```vertex
case ldaNull
```

<a id="Opcode.ldaTrue"></a>

```vertex
case ldaTrue
```

<a id="Opcode.ldaFalse"></a>

```vertex
case ldaFalse
```

<a id="Opcode.ldaEmpty"></a>

```vertex
case ldaEmpty
```

<a id="Opcode.ldaSmi"></a>

```vertex
case ldaSmi
```

the hole: an uninitialized let, const or class

<a id="Opcode.ldaConst"></a>

```vertex
case ldaConst
```

acc = A

<a id="Opcode.ldar"></a>

```vertex
case ldar
```

acc = constant A

<a id="Opcode.star"></a>

```vertex
case star
```

acc = r[A]

<a id="Opcode.mov"></a>

```vertex
case mov
```

r[A] = acc

<a id="Opcode.ldaArg"></a>

```vertex
case ldaArg
```

The frame.

<a id="Opcode.createRest"></a>

```vertex
case createRest
```

acc = argument A, or undefined

<a id="Opcode.createArguments"></a>

```vertex
case createArguments
```

acc = an array of the arguments from A on

<a id="Opcode.ldaThis"></a>

```vertex
case ldaThis
```

acc = the arguments object; A = 1 for a mapped one

<a id="Opcode.ldaNewTarget"></a>

```vertex
case ldaNewTarget
```

acc = this (checked in derived constructors)

<a id="Opcode.ldaCallee"></a>

```vertex
case ldaCallee
```

<a id="Opcode.ldaHomeObject"></a>

```vertex
case ldaHomeObject
```

acc = the running function

<a id="Opcode.pushContext"></a>

```vertex
case pushContext
```

Contexts.

<a id="Opcode.popContext"></a>

```vertex
case popContext
```

enter a scope: A slots, scope info B (-1 for none)

<a id="Opcode.cloneContext"></a>

```vertex
case cloneContext
```

<a id="Opcode.ldaCtx"></a>

```vertex
case ldaCtx
```

replace the current context with a copy (per-iteration bindings)

<a id="Opcode.ldaCtxChecked"></a>

```vertex
case ldaCtxChecked
```

acc = context(A).slot[B]

<a id="Opcode.staCtx"></a>

```vertex
case staCtx
```

same, throwing a ReferenceError for constant C's name if it is the hole

<a id="Opcode.checkHole"></a>

```vertex
case checkHole
```

context(A).slot[B] = acc

<a id="Opcode.checkHoleCtx"></a>

```vertex
case checkHoleCtx
```

throw a ReferenceError for constant B's name if r[A] is the hole

<a id="Opcode.throwIfHole"></a>

```vertex
case throwIfHole
```

same for context(A).slot[B], name constant C

<a id="Opcode.throwConstAssign"></a>

```vertex
case throwConstAssign
```

throw a ReferenceError for constant A's name if acc is the hole

<a id="Opcode.ldaGlobal"></a>

```vertex
case ldaGlobal
```

Globals and dynamic names.

<a id="Opcode.ldaGlobalTypeof"></a>

```vertex
case ldaGlobalTypeof
```

acc = the global named by constant A; ReferenceError if none

<a id="Opcode.staGlobal"></a>

```vertex
case staGlobal
```

same, undefined if none (for typeof)

<a id="Opcode.initGlobalLexical"></a>

```vertex
case initGlobalLexical
```

assign the global named by A; B = 1 in strict code

<a id="Opcode.declareGlobals"></a>

```vertex
case declareGlobals
```

initialize the top-level let/const/class A from acc

<a id="Opcode.ldaLookup"></a>

```vertex
case ldaLookup
```

GlobalDeclarationInstantiation with declarations constant A

<a id="Opcode.ldaLookupTypeof"></a>

```vertex
case ldaLookupTypeof
```

acc = the name A, resolved through contexts, with and eval scopes

<a id="Opcode.ldaLookupThis"></a>

```vertex
case ldaLookupThis
```

<a id="Opcode.staLookup"></a>

```vertex
case staLookup
```

acc = name A; r[B] = the with object it came from, or undefined

<a id="Opcode.deleteLookup"></a>

```vertex
case deleteLookup
```

assign name A; B = 1 in strict code

<a id="Opcode.declareEvalVar"></a>

```vertex
case declareEvalVar
```

acc = delete name A

<a id="Opcode.declareEvalFunction"></a>

```vertex
case declareEvalFunction
```

a sloppy eval's var A: declare it in the caller's var scope

<a id="Opcode.getNamed"></a>

```vertex
case getNamed
```

Properties.

<a id="Opcode.getKeyed"></a>

```vertex
case getKeyed
```

acc = r[A][key constant B]

<a id="Opcode.setNamed"></a>

```vertex
case setNamed
```

acc = r[A][acc]

<a id="Opcode.setKeyed"></a>

```vertex
case setKeyed
```

r[A][key B] = acc; C = 1 in strict code

<a id="Opcode.defineNamed"></a>

```vertex
case defineNamed
```

r[A][r[B]] = acc; C = 1 in strict code

<a id="Opcode.defineKeyed"></a>

```vertex
case defineKeyed
```

CreateDataProperty(r[A], key B, acc)

<a id="Opcode.defineGetter"></a>

```vertex
case defineGetter
```

CreateDataProperty(r[A], r[B], acc)

<a id="Opcode.defineSetter"></a>

```vertex
case defineSetter
```

define getter acc on r[A] for key r[B]; C = 1 if enumerable

<a id="Opcode.defineMethod"></a>

```vertex
case defineMethod
```

<a id="Opcode.setFunctionName"></a>

```vertex
case setFunctionName
```

define method acc on r[A] for key r[B] (home object r[A]); C = 1 if enumerable

<a id="Opcode.setProto"></a>

```vertex
case setProto
```

name the function in acc from key r[A]; B: 0 plain, 1 "get ", 2 "set "

<a id="Opcode.setHomeObject"></a>

```vertex
case setHomeObject
```

r[A].[[Prototype]] = acc, if acc is an object or null (__proto__: v)

<a id="Opcode.deleteProperty"></a>

```vertex
case deleteProperty
```

the function in acc gets home object r[A] (acc unchanged)

<a id="Opcode.getSuper"></a>

```vertex
case getSuper
```

acc = delete r[A][acc]; B = 1 in strict code

<a id="Opcode.setSuper"></a>

```vertex
case setSuper
```

acc = super[r[A]]

<a id="Opcode.getPrivate"></a>

```vertex
case getPrivate
```

super[r[A]] = acc

<a id="Opcode.setPrivate"></a>

```vertex
case setPrivate
```

acc = r[A].#(private name r[B])

<a id="Opcode.definePrivate"></a>

```vertex
case definePrivate
```

r[A].#(r[B]) = acc

<a id="Opcode.privateIn"></a>

```vertex
case privateIn
```

add private field r[B] = acc to r[A]

<a id="Opcode.copyDataProperties"></a>

```vertex
case copyDataProperties
```

acc = #(r[A]) in acc

<a id="Opcode.toPropertyKey"></a>

```vertex
case toPropertyKey
```

copy acc's own enumerable properties into r[A]; B = register of an excluded-keys array, or -1

<a id="Opcode.requireObjectCoercible"></a>

```vertex
case requireObjectCoercible
```

acc = ToPropertyKey(acc)

<a id="Opcode.add"></a>

```vertex
case add
```

Operators: acc = r[A] op acc.

<a id="Opcode.sub"></a>

```vertex
case sub
```

<a id="Opcode.mul"></a>

```vertex
case mul
```

<a id="Opcode.div"></a>

```vertex
case div
```

<a id="Opcode.mod"></a>

```vertex
case mod
```

<a id="Opcode.exp"></a>

```vertex
case exp
```

<a id="Opcode.bitAnd"></a>

```vertex
case bitAnd
```

<a id="Opcode.bitOr"></a>

```vertex
case bitOr
```

<a id="Opcode.bitXor"></a>

```vertex
case bitXor
```

<a id="Opcode.shl"></a>

```vertex
case shl
```

<a id="Opcode.sar"></a>

```vertex
case sar
```

<a id="Opcode.shr"></a>

```vertex
case shr
```

<a id="Opcode.testEq"></a>

```vertex
case testEq
```

<a id="Opcode.testNe"></a>

```vertex
case testNe
```

<a id="Opcode.testStrictEq"></a>

```vertex
case testStrictEq
```

<a id="Opcode.testStrictNe"></a>

```vertex
case testStrictNe
```

<a id="Opcode.testLt"></a>

```vertex
case testLt
```

<a id="Opcode.testGt"></a>

```vertex
case testGt
```

<a id="Opcode.testLe"></a>

```vertex
case testLe
```

<a id="Opcode.testGe"></a>

```vertex
case testGe
```

<a id="Opcode.testIn"></a>

```vertex
case testIn
```

<a id="Opcode.testInstanceOf"></a>

```vertex
case testInstanceOf
```

acc = r[A] in acc

<a id="Opcode.inc"></a>

```vertex
case inc
```

acc = r[A] instanceof acc
Unary operators on acc.

<a id="Opcode.dec"></a>

```vertex
case dec
```

<a id="Opcode.negate"></a>

```vertex
case negate
```

<a id="Opcode.bitNot"></a>

```vertex
case bitNot
```

<a id="Opcode.not"></a>

```vertex
case not
```

<a id="Opcode.typeOf"></a>

```vertex
case typeOf
```

<a id="Opcode.toNumeric"></a>

```vertex
case toNumeric
```

<a id="Opcode.toNumber"></a>

```vertex
case toNumber
```

<a id="Opcode.toString"></a>

```vertex
case toString
```

<a id="Opcode.jump"></a>

```vertex
case jump
```

Control flow.

<a id="Opcode.jumpIfTrue"></a>

```vertex
case jumpIfTrue
```

to A

<a id="Opcode.jumpIfFalse"></a>

```vertex
case jumpIfFalse
```

if ToBoolean(acc)

<a id="Opcode.jumpIfNullish"></a>

```vertex
case jumpIfNullish
```

<a id="Opcode.jumpIfNotNullish"></a>

```vertex
case jumpIfNotNullish
```

<a id="Opcode.jumpIfUndefined"></a>

```vertex
case jumpIfUndefined
```

<a id="Opcode.jumpIfNotUndefined"></a>

```vertex
case jumpIfNotUndefined
```

<a id="Opcode.jumpIfEmpty"></a>

```vertex
case jumpIfEmpty
```

<a id="Opcode.returnOp"></a>

```vertex
case returnOp
```

if acc is the hole

<a id="Opcode.throwOp"></a>

```vertex
case throwOp
```

<a id="Opcode.throwError"></a>

```vertex
case throwError
```

<a id="Opcode.debugger"></a>

```vertex
case debugger
```

throw a new error: A = constant message, B = kind (0 TypeError, 1 ReferenceError, 2 SyntaxError, 3 RangeError)

<a id="Opcode.call"></a>

```vertex
case call
```

Calls.

<a id="Opcode.callMethod"></a>

```vertex
case callMethod
```

acc = r[A](r[B] ... r[B+C-1]), this undefined

<a id="Opcode.callSpread"></a>

```vertex
case callSpread
```

acc = r[A] called with this r[B] and args r[B+1] ... r[B+C]

<a id="Opcode.callEval"></a>

```vertex
case callEval
```

acc = r[A] called with this r[B] and the array r[C] as arguments

<a id="Opcode.construct"></a>

```vertex
case construct
```

like call, but a direct eval if r[A] is the realm's eval

<a id="Opcode.constructSpread"></a>

```vertex
case constructSpread
```

acc = new r[A](r[B] ... r[B+C-1]), new.target r[A]

<a id="Opcode.superCall"></a>

```vertex
case superCall
```

acc = new r[A](...array r[B])

<a id="Opcode.superCallSpread"></a>

```vertex
case superCallSpread
```

acc = super(r[B] ... r[B+C-1]); binds this

<a id="Opcode.superCallForward"></a>

```vertex
case superCallForward
```

acc = super(...array r[B])

<a id="Opcode.createObject"></a>

```vertex
case createObject
```

Literals.

<a id="Opcode.createArray"></a>

```vertex
case createArray
```

<a id="Opcode.arrayPush"></a>

```vertex
case arrayPush
```

<a id="Opcode.arrayHole"></a>

```vertex
case arrayHole
```

push acc onto the array r[A]

<a id="Opcode.arraySpread"></a>

```vertex
case arraySpread
```

push a hole onto r[A]

<a id="Opcode.createRegExp"></a>

```vertex
case createRegExp
```

push acc's iterated values onto r[A]

<a id="Opcode.createClosure"></a>

```vertex
case createClosure
```

acc = new RegExp(constant A, flags constant B)

<a id="Opcode.getTemplateObject"></a>

```vertex
case getTemplateObject
```

acc = a closure of function constant A

<a id="Opcode.createClass"></a>

```vertex
case createClass
```

Classes.

<a id="Opcode.addField"></a>

```vertex
case addField
```

acc = constructor of function constant A with heritage r[B] (B = -1: no extends; r[B] = null allowed); r[C] = the prototype

<a id="Opcode.addPrivateMethod"></a>

```vertex
case addPrivateMethod
```

record an instance field on class r[A]: key r[B], initializer r[C] (or -1)

<a id="Opcode.addStaticPrivateMethod"></a>

```vertex
case addStaticPrivateMethod
```

record private method acc named r[B] on class r[A]; C: 0 method, 1 getter, 2 setter

<a id="Opcode.initFields"></a>

```vertex
case initFields
```

install private method acc named r[B] on r[A] now; C as above

<a id="Opcode.newPrivateName"></a>

```vertex
case newPrivateName
```

run the running class constructor's field initializers on this

<a id="Opcode.getIterator"></a>

```vertex
case getIterator
```

Iteration.

<a id="Opcode.getAsyncIterator"></a>

```vertex
case getAsyncIterator
```

r[A] = iterator of acc, r[A+1] = its next method, r[A+2] = done

<a id="Opcode.iteratorStep"></a>

```vertex
case iteratorStep
```

same, for for-await and yield* in async generators

<a id="Opcode.iteratorNext"></a>

```vertex
case iteratorNext
```

call r[A+1] on r[A]; if done, set r[A+2] and jump to B; else acc = value

<a id="Opcode.iteratorResult"></a>

```vertex
case iteratorResult
```

acc = the result of calling r[A+1] on r[A] with acc (unchecked)

<a id="Opcode.iteratorClose"></a>

```vertex
case iteratorClose
```

acc must be an object: if done, set r[A+2] and jump to B, else acc = value

<a id="Opcode.iteratorCloseThrow"></a>

```vertex
case iteratorCloseThrow
```

IteratorClose r[A] for a normal completion (if not done)

<a id="Opcode.asyncIteratorClose"></a>

```vertex
case asyncIteratorClose
```

IteratorClose r[A] for a throw completion: errors from return are dropped

<a id="Opcode.iteratorToArray"></a>

```vertex
case iteratorToArray
```

acc = the awaitable result of calling return on r[A], or undefined; jumps to B if there is no return method

<a id="Opcode.forInPrepare"></a>

```vertex
case forInPrepare
```

acc = an array of the remaining values of iterator r[A]

<a id="Opcode.forInNext"></a>

```vertex
case forInNext
```

r[A] = a for-in enumerator of acc

<a id="Opcode.generatorStart"></a>

```vertex
case generatorStart
```

Generators and async functions.

<a id="Opcode.yieldOp"></a>

```vertex
case yieldOp
```

suspend at the start: the call returns the generator object

<a id="Opcode.awaitOp"></a>

```vertex
case awaitOp
```

suspend with acc; on resume r[A] = mode (0 next, 1 throw, 2 return), r[B] = the value sent

<a id="Opcode.asyncReturnAwait"></a>

```vertex
case asyncReturnAwait
```

suspend until acc settles: acc = its value, or throw its reason

<a id="Opcode.createDisposeScope"></a>

```vertex
case createDisposeScope
```

Explicit resource management (ES2026).

<a id="Opcode.addDisposable"></a>

```vertex
case addDisposable
```

r[A] = a new dispose capability

<a id="Opcode.disposeNext"></a>

```vertex
case disposeNext
```

add acc (using x = acc) to r[A]'s resources; B is 1 for await using

<a id="Opcode.disposeError"></a>

```vertex
case disposeError
```

dispose r[A]'s newest resource: acc = 0 when none are left, 1 when disposed, 2 when r[B] is to be awaited

<a id="Opcode.disposeFinish"></a>

```vertex
case disposeFinish
```

record acc as thrown in r[A]'s scope (combined as SuppressedError)

<a id="Opcode.importCall"></a>

```vertex
case importCall
```

Modules.

<a id="Opcode.importMeta"></a>

```vertex
case importMeta
```

acc = import(acc)

<a id="Opcode.nop"></a>

```vertex
case nop
```

### class ScopeInfo <a id="class-ScopeInfo"></a>

```vertex
public final class ScopeInfo
```

ScopeInfo names the slots of a context, so that eval and with can find
bindings by name at runtime.

#### Initializers

<a id="ScopeInfo.init"></a>

```vertex
public init()
```

#### Properties

<a id="ScopeInfo.Names"></a>

```vertex
public var Names: [str.JSString] = []
```

<a id="ScopeInfo.Const"></a>

```vertex
public var Const: [bool] = []
```

<a id="ScopeInfo.Lexical"></a>

```vertex
public var Lexical: [bool] = []
```

Lexical marks let, const and class slots, which a sloppy eval's var
may not redeclare.

<a id="ScopeInfo.IsFunctionScope"></a>

```vertex
public var IsFunctionScope: bool = false
```

IsFunctionScope marks the context that holds a function's vars:
where a sloppy eval's vars go.

#### Methods

<a id="ScopeInfo.Find"></a>

```vertex
public func Find(_ name: str.JSString) -> int
```

### class SourceText <a id="class-SourceText"></a>

```vertex
public final class SourceText
```

SourceText is a script's text, shared by its functions.

#### Initializers

<a id="SourceText.init"></a>

```vertex
public init(filename: string, text: string)
```

#### Properties

<a id="SourceText.Hidden"></a>

```vertex
public var Hidden: bool = false
```

Hidden is set on a built-in's self-hosted source: its functions
show [native code], as native ones do.

<a id="SourceText.Filename"></a>

```vertex
public let Filename: string
```

<a id="SourceText.Bytes"></a>

```vertex
public let Bytes: [uint8]
```

#### Methods

<a id="SourceText.Slice"></a>

```vertex
public func Slice(_ start: int, _ end: int) -> string
```

### class TemplateInfo <a id="class-TemplateInfo"></a>

```vertex
public final class TemplateInfo
```

TemplateInfo is a tagged template call site's strings.

#### Initializers

<a id="TemplateInfo.init"></a>

```vertex
public init(cooked: [str.JSString?], raw: [str.JSString])
```

#### Properties

<a id="TemplateInfo.Cooked"></a>

```vertex
public let Cooked: [str.JSString?]
```

<a id="TemplateInfo.Raw"></a>

```vertex
public let Raw: [str.JSString]
```

<a id="TemplateInfo.ID"></a>

```vertex
public let ID: int
```

ID identifies the call site, for the realm's template cache.

## Files

- bytecode.vs
