# package object

```vertex
import "js/object"
```

Package object is the runtime's object model: the Value type, objects
and their internal methods (ECMA-262 §10), the realm and its
intrinsics, and the abstract operations of §7 that everything above
(the interpreter, the built-ins) is written in terms of.

## Index

- [`func Add(_ x: Value, _ y: Value) throws -> Value`](#func-Add)
- [`func Arg(_ args: [Value], _ i: int) -> Value`](#func-Arg)
- [`func Arithmetic(_ op: ArithOp, _ x: Value, _ y: Value) throws -> Value`](#func-Arithmetic)
- [`func ArrayCreate(_ length: float64, proto: JSObject? = nil) throws -> ArrayObject`](#func-ArrayCreate)
- [`func ArraySpeciesCreate(_ original: JSObject, _ length: float64) throws -> JSObject`](#func-ArraySpeciesCreate)
- [`func AwaitValue(_ v: Value, onFulfilled: @escaping (Value) throws -> Value, onRejected: @escaping (Value) throws -> Value) throws`](#func-AwaitValue)
- [`func BigIntOp(_ op: ArithOp, _ a: value.BigInt, _ b: value.BigInt) throws -> value.BigInt`](#func-BigIntOp)
- [`func Call(_ f: Value, _ this: Value, _ args: [Value]) throws -> Value`](#func-Call)
- [`func ClassNameOf(_ o: JSObject) -> string`](#func-ClassNameOf)
- [`func CompletePropertyDescriptor(_ d: PropertyDescriptor) -> PropertyDescriptor`](#func-CompletePropertyDescriptor)
- [`func Construct(_ f: JSObject, _ args: [Value], _ newTarget: JSObject? = nil) throws -> Value`](#func-Construct)
- [`func CopyDataProperties(_ target: JSObject, _ source: Value, excluded: [value.PropertyKey]) throws`](#func-CopyDataProperties)
- [`func CreateArrayFromList(_ r: Realm, _ list: [Value]) -> ArrayObject`](#func-CreateArrayFromList)
- [`func CreateAsyncFromSyncIterator(_ sync: IteratorRecord) -> IteratorRecord`](#func-CreateAsyncFromSyncIterator)
- [`func CreateDataProperty(_ o: JSObject, _ key: value.PropertyKey, _ v: Value) throws -> bool`](#func-CreateDataProperty)
- [`func CreateDataPropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey, _ v: Value) throws`](#func-CreateDataPropertyOrThrow)
- [`func CreateIterResultObject(_ v: Value, _ done: bool) -> JSObject`](#func-CreateIterResultObject)
- [`func CreateListFromArrayLike(_ v: Value) throws -> [Value]`](#func-CreateListFromArrayLike)
- [`func CreateResolvingFunctions(_ p: PromiseObject) -> (Value, Value)`](#func-CreateResolvingFunctions)
- [`func CurrentRealm() -> Realm`](#func-CurrentRealm)
- [`func CurrentRealmOrNil() -> Realm?`](#func-CurrentRealmOrNil)
- [`func DefinePropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey, _ d: PropertyDescriptor) throws`](#func-DefinePropertyOrThrow)
- [`func DeletePropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey) throws`](#func-DeletePropertyOrThrow)
- [`func Describe(_ v: Value) -> string`](#func-Describe)
- [`func DescribeIterable(_ v: Value) -> string`](#func-DescribeIterable)
- [`func EnumerableOwnProperties(_ o: JSObject, _ kind: EnumKind) throws -> [Value]`](#func-EnumerableOwnProperties)
- [`func FromPropertyDescriptor(_ d: PropertyDescriptor?) -> Value`](#func-FromPropertyDescriptor)
- [`func FulfillPromise(_ p: PromiseObject, _ v: Value)`](#func-FulfillPromise)
- [`func Get(_ o: JSObject, _ key: value.PropertyKey) throws -> Value`](#func-Get)
- [`func GetAsyncIterator(_ obj: Value) throws -> IteratorRecord`](#func-GetAsyncIterator)
- [`func GetIterator(_ obj: Value) throws -> IteratorRecord`](#func-GetIterator)
- [`func GetIteratorFromMethod(_ obj: Value, _ method: Value) throws -> IteratorRecord`](#func-GetIteratorFromMethod)
- [`func GetMethod(_ v: Value, _ key: value.PropertyKey) throws -> Value`](#func-GetMethod)
- [`func GetPrototypeFromConstructor(_ ctor: JSObject, _ fallback: JSObject) throws -> JSObject`](#func-GetPrototypeFromConstructor)
- [`func GetV(_ v: Value, _ key: value.PropertyKey) throws -> Value`](#func-GetV)
- [`func HandlerFrom(_ v: Value) -> ReactionHandler`](#func-HandlerFrom)
- [`func HasOwnProperty(_ o: JSObject, _ key: value.PropertyKey) throws -> bool`](#func-HasOwnProperty)
- [`func InstallStack(_ e: JSObject)`](#func-InstallStack)
- [`func InstanceOf(_ v: Value, _ target: Value) throws -> bool`](#func-InstanceOf)
- [`func Invoke(_ v: Value, _ key: value.PropertyKey, _ args: [Value]) throws -> Value`](#func-Invoke)
- [`func IsArray(_ v: Value) throws -> bool`](#func-IsArray)
- [`func IterableToList(_ items: Value) throws -> [Value]`](#func-IterableToList)
- [`func IteratorClose(_ r: IteratorRecord) throws`](#func-IteratorClose)
- [`func IteratorCloseOnThrow(_ r: IteratorRecord)`](#func-IteratorCloseOnThrow)
- [`func IteratorComplete(_ o: JSObject) throws -> bool`](#func-IteratorComplete)
- [`func IteratorNext(_ r: IteratorRecord, _ v: Value? = nil) throws -> JSObject`](#func-IteratorNext)
- [`func IteratorStepValue(_ r: IteratorRecord) throws -> Value?`](#func-IteratorStepValue)
- [`func IteratorValue(_ o: JSObject) throws -> Value`](#func-IteratorValue)
- [`func Key(_ s: string) -> value.PropertyKey`](#func-Key)
- [`func KeyDisplay(_ k: value.PropertyKey) -> string`](#func-KeyDisplay)
- [`func KeyToValue(_ k: value.PropertyKey) -> Value`](#func-KeyToValue)
- [`func LengthOfArrayLike(_ o: JSObject) throws -> int`](#func-LengthOfArrayLike)
- [`func LessThan(_ x: Value, _ y: Value, leftFirst: bool) throws -> bool?`](#func-LessThan)
- [`func LooseEquals(_ x: Value, _ y: Value) throws -> bool`](#func-LooseEquals)
- [`func MakeConstructor(_ f: JSObject, realm: Realm, proto: JSObject? = nil, writable: bool = true)`](#func-MakeConstructor)
- [`func MakeError(_ proto: JSObject, _ message: str.JSString) -> JSObject`](#func-MakeError)
- [`func NewObject(_ proto: JSObject?) -> JSObject`](#func-NewObject)
- [`func NewPromise() -> PromiseObject`](#func-NewPromise)
- [`func NewPromiseCapability(_ c: Value) throws -> PromiseCapability`](#func-NewPromiseCapability)
- [`func NumberMod(_ a: float64, _ b: float64) -> float64`](#func-NumberMod)
- [`func NumberOp(_ op: ArithOp, _ a: float64, _ b: float64) -> float64`](#func-NumberOp)
- [`func NumberPow(_ base: float64, _ e: float64) -> float64`](#func-NumberPow)
- [`func OrdinaryCreateFromConstructor(_ ctor: JSObject?, _ fallback: JSObject) throws -> JSObject`](#func-OrdinaryCreateFromConstructor)
- [`func OrdinaryHasInstance(_ c: Value, _ o: Value) throws -> bool`](#func-OrdinaryHasInstance)
- [`func OrdinaryToPrimitive(_ o: JSObject, _ hint: Hint) throws -> Value`](#func-OrdinaryToPrimitive)
- [`func PerformPromiseThen(_ p: PromiseObject, _ onFulfilled: ReactionHandler, _ onRejected: ReactionHandler, _ cap: PromiseCapability?)`](#func-PerformPromiseThen)
- [`func PromiseResolve(_ c: JSObject, _ x: Value) throws -> JSObject`](#func-PromiseResolve)
- [`func PutProperty(_ base: Value, _ key: value.PropertyKey, _ v: Value, strict: bool) throws`](#func-PutProperty)
- [`func RejectPromise(_ p: PromiseObject, _ reason: Value)`](#func-RejectPromise)
- [`func RequireObjectCoercible(_ v: Value) throws`](#func-RequireObjectCoercible)
- [`func ResolvePromise(_ p: PromiseObject, _ resolution: Value)`](#func-ResolvePromise)
- [`func SameValue(_ x: Value, _ y: Value) -> bool`](#func-SameValue)
- [`func SameValueZero(_ x: Value, _ y: Value) -> bool`](#func-SameValueZero)
- [`func SetCurrentRealm(_ r: Realm?)`](#func-SetCurrentRealm)
- [`func SetFunctionName(_ f: JSObject, _ key: value.PropertyKey, prefix: string = "")`](#func-SetFunctionName)
- [`func SetIntegrityLevel(_ o: JSObject, frozen: bool) throws -> bool`](#func-SetIntegrityLevel)
- [`func SetProperty(_ o: JSObject, _ key: value.PropertyKey, _ v: Value, throwing: bool) throws`](#func-SetProperty)
- [`func SpeciesConstructor(_ o: JSObject, _ def: JSObject) throws -> JSObject`](#func-SpeciesConstructor)
- [`func StrictEquals(_ x: Value, _ y: Value) -> bool`](#func-StrictEquals)
- [`func SymKey(_ s: value.Symbol) -> value.PropertyKey`](#func-SymKey)
- [`func TestIntegrityLevel(_ o: JSObject, frozen: bool) throws -> bool`](#func-TestIntegrityLevel)
- [`func ThrowRangeError(_ msg: string) -> Completion`](#func-ThrowRangeError)
- [`func ThrowReferenceError(_ msg: string) -> Completion`](#func-ThrowReferenceError)
- [`func ThrowSyntaxError(_ msg: string) -> Completion`](#func-ThrowSyntaxError)
- [`func ThrowTypeError(_ msg: string) -> Completion`](#func-ThrowTypeError)
- [`func ThrowURIError(_ msg: string) -> Completion`](#func-ThrowURIError)
- [`func ToBigInt(_ v: Value) throws -> value.BigInt`](#func-ToBigInt)
- [`func ToIndex(_ v: Value) throws -> int`](#func-ToIndex)
- [`func ToInt32(_ v: Value) throws -> int32`](#func-ToInt32)
- [`func ToIntegerOrInfinity(_ v: Value) throws -> float64`](#func-ToIntegerOrInfinity)
- [`func ToLength(_ v: Value) throws -> float64`](#func-ToLength)
- [`func ToNumber(_ v: Value) throws -> float64`](#func-ToNumber)
- [`func ToNumeric(_ v: Value) throws -> Value`](#func-ToNumeric)
- [`func ToObject(_ v: Value) throws -> JSObject`](#func-ToObject)
- [`func ToPrimitive(_ v: Value, _ hint: Hint = .defaultHint) throws -> Value`](#func-ToPrimitive)
- [`func ToPropertyDescriptor(_ v: Value) throws -> PropertyDescriptor`](#func-ToPropertyDescriptor)
- [`func ToPropertyKey(_ v: Value) throws -> value.PropertyKey`](#func-ToPropertyKey)
- [`func ToString(_ v: Value) throws -> str.JSString`](#func-ToString)
- [`func ToUint32(_ v: Value) throws -> uint32`](#func-ToUint32)
- [`func TypeOfValue(_ v: Value) -> Value`](#func-TypeOfValue)
- [`func isPristineArrayIteration(_ a: ArrayObject) -> bool`](#func-isPristineArrayIteration)
- [`final class Agent`](#class-Agent)
  - [`init()`](#Agent.init)
  - [`var SymbolRegistry: [str.JSString: value.Symbol] = [:]`](#Agent.SymbolRegistry)
  - [`var OnRejectionTracker: ((JSObject, bool) -> Void)? = nil`](#Agent.OnRejectionTracker)
  - [`var OnJobError: ((Value) -> Void)? = nil`](#Agent.OnJobError)
  - [`var KeptAlive: [JSObject] = []`](#Agent.KeptAlive)
  - [`var HasJobs: bool { get }`](#Agent.HasJobs)
  - [`func Enqueue(_ job: @escaping Job)`](#Agent.Enqueue)
  - [`func RunJobs()`](#Agent.RunJobs)
- [`final class ArgumentsObject: JSObject`](#class-ArgumentsObject)
  - [`override init(proto: JSObject?)`](#ArgumentsObject.init)
  - [`var Map: [int] = []`](#ArgumentsObject.Map)
  - [`var Env: Context? = nil`](#ArgumentsObject.Env)
  - [`override var isOrdinaryLookup: bool { get }`](#ArgumentsObject.isOrdinaryLookup)
  - [`override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?`](#ArgumentsObject.GetOwnProperty)
  - [`override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#ArgumentsObject.DefineOwnProperty)
  - [`override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#ArgumentsObject.Get)
  - [`override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#ArgumentsObject.Set)
  - [`override func Delete(_ key: value.PropertyKey) throws -> bool`](#ArgumentsObject.Delete)
- [`enum ArithOp`](#enum-ArithOp)
- [`final class ArrayObject: JSObject`](#class-ArrayObject)
  - [`override init(proto: JSObject?)`](#ArrayObject.init)
  - [`var Dense: [Value] = []`](#ArrayObject.Dense)
  - [`var Length: uint32 = 0`](#ArrayObject.Length)
  - [`var LengthWritable: bool = true`](#ArrayObject.LengthWritable)
  - [`var Sparse: bool = false`](#ArrayObject.Sparse)
  - [`var IsDenseSimple: bool { get }`](#ArrayObject.IsDenseSimple)
  - [`override var isOrdinaryLookup: bool { get }`](#ArrayObject.isOrdinaryLookup)
  - [`override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?`](#ArrayObject.GetOwnProperty)
  - [`override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#ArrayObject.DefineOwnProperty)
  - [`func truncate(to n: uint32) -> bool`](#ArrayObject.truncate)
  - [`override func HasProperty(_ key: value.PropertyKey) throws -> bool`](#ArrayObject.HasProperty)
  - [`override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#ArrayObject.Get)
  - [`override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#ArrayObject.Set)
  - [`override func Delete(_ key: value.PropertyKey) throws -> bool`](#ArrayObject.Delete)
  - [`override func OwnPropertyKeys() throws -> [value.PropertyKey]`](#ArrayObject.OwnPropertyKeys)
  - [`func Push(_ v: Value)`](#ArrayObject.Push)
- [`final class AsyncFromSyncIterator: JSObject`](#class-AsyncFromSyncIterator)
  - [`init(_ sync: IteratorRecord, proto: JSObject)`](#AsyncFromSyncIterator.init)
  - [`let Sync: IteratorRecord`](#AsyncFromSyncIterator.Sync)
- [`final class BoundFunction: JSObject`](#class-BoundFunction)
  - [`init(target: JSObject, boundThis: Value, boundArgs: [Value], proto: JSObject?)`](#BoundFunction.init)
  - [`let Target: JSObject`](#BoundFunction.Target)
  - [`let BoundThis: Value`](#BoundFunction.BoundThis)
  - [`let BoundArgs: [Value]`](#BoundFunction.BoundArgs)
  - [`override var IsCallable: bool { get }`](#BoundFunction.IsCallable)
  - [`override var IsConstructor: bool { get }`](#BoundFunction.IsConstructor)
  - [`override func Call(_ this: Value, _ args: [Value]) throws -> Value`](#BoundFunction.Call)
  - [`override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value`](#BoundFunction.Construct)
- [`final class ClassField`](#class-ClassField)
  - [`init(key: value.PropertyKey, initializer: JSObject?)`](#ClassField.init)
  - [`let Key: value.PropertyKey`](#ClassField.Key)
  - [`let Initializer: JSObject?`](#ClassField.Initializer)
- [`final class Completion: Error`](#class-Completion)
  - [`init(_ v: Value)`](#Completion.init)
  - [`let Value: Value`](#Completion.Value)
  - [`static func thrown(_ v: Value) -> Completion`](#Completion.thrown)
- [`final class Context`](#class-Context)
  - [`init(slots: int, parent: Context?, info: bytecode.ScopeInfo?)`](#Context.init)
  - [`init(copying c: Context)`](#Context.init-2)
  - [`var Slots: [Value]`](#Context.Slots)
  - [`let Parent: Context?`](#Context.Parent)
  - [`let Info: bytecode.ScopeInfo?`](#Context.Info)
  - [`var WithObject: JSObject? = nil`](#Context.WithObject)
  - [`var Extension: JSObject? = nil`](#Context.Extension)
- [`protocol Engine: AnyObject`](#protocol-Engine)
  - [`func CallFunction(_ f: JSFunction, _ this: Value, _ args: [Value]) throws -> Value`](#Engine.CallFunction)
  - [`func ConstructFunction(_ f: JSFunction, _ args: [Value], _ newTarget: JSObject) throws -> Value`](#Engine.ConstructFunction)
  - [`func IndirectEval(_ realm: Realm, _ source: str.JSString) throws -> Value`](#Engine.IndirectEval)
  - [`func CreateDynamicFunction(_ realm: Realm, _ args: [Value], _ newTarget: JSObject?, isAsync: bool, isGenerator: bool) throws -> JSObject`](#Engine.CreateDynamicFunction)
  - [`func StackTrace() -> string`](#Engine.StackTrace)
- [`enum EnumKind`](#enum-EnumKind)
- [`final class FunctionEnv`](#class-FunctionEnv)
  - [`init(this: Value, newTarget: Value, function: JSFunction?)`](#FunctionEnv.init)
  - [`var This: Value`](#FunctionEnv.This)
  - [`var NewTarget: Value`](#FunctionEnv.NewTarget)
  - [`var Function: JSFunction?`](#FunctionEnv.Function)
- [`final class FunctionPrototypeObject: JSObject`](#class-FunctionPrototypeObject)
  - [`override init(proto: JSObject?)`](#FunctionPrototypeObject.init)
  - [`override var IsCallable: bool { get }`](#FunctionPrototypeObject.IsCallable)
  - [`override func Call(_ this: Value, _ args: [Value]) throws -> Value`](#FunctionPrototypeObject.Call)
- [`final class GlobalBinding`](#class-GlobalBinding)
  - [`init(value: Value, isConst: bool)`](#GlobalBinding.init)
  - [`var Value: Value`](#GlobalBinding.Value)
  - [`let IsConst: bool`](#GlobalBinding.IsConst)
- [`enum Hint`](#enum-Hint)
- [`final class IteratorRecord`](#class-IteratorRecord)
  - [`init(iterator: JSObject, next: Value)`](#IteratorRecord.init)
  - [`let Iterator: JSObject`](#IteratorRecord.Iterator)
  - [`let NextMethod: Value`](#IteratorRecord.NextMethod)
  - [`var Done: bool = false`](#IteratorRecord.Done)
- [`final class JSFunction: JSObject`](#class-JSFunction)
  - [`init(template: bytecode.FunctionTemplate, env: Context?, realm: Realm, proto: JSObject)`](#JSFunction.init)
  - [`let Template: bytecode.FunctionTemplate`](#JSFunction.Template)
  - [`let Env: Context?`](#JSFunction.Env)
  - [`var FuncEnv: FunctionEnv?`](#JSFunction.FuncEnv)
  - [`var HomeObject: JSObject?`](#JSFunction.HomeObject)
  - [`var Fields: [ClassField] = []`](#JSFunction.Fields)
  - [`var PrivateMethods: [PrivateMethod] = []`](#JSFunction.PrivateMethods)
  - [`let Realm: Realm`](#JSFunction.Realm)
  - [`var Module: JSObject? = nil`](#JSFunction.Module)
  - [`override var IsCallable: bool { get }`](#JSFunction.IsCallable)
  - [`override var IsConstructor: bool { get }`](#JSFunction.IsConstructor)
  - [`var IsClassConstructor: bool { get }`](#JSFunction.IsClassConstructor)
  - [`override func Call(_ this: Value, _ args: [Value]) throws -> Value`](#JSFunction.Call)
  - [`override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value`](#JSFunction.Construct)
- [`class JSObject`](#class-JSObject)
  - [`init(proto: JSObject?)`](#JSObject.init)
  - [`var Proto: JSObject?`](#JSObject.Proto)
  - [`var Extensible: bool = true`](#JSObject.Extensible)
  - [`var Kind: Kind = .ordinary`](#JSObject.Kind)
  - [`var IsHTMLDDA: bool = false`](#JSObject.IsHTMLDDA)
  - [`var PrimitiveValue: Value = .undefined`](#JSObject.PrimitiveValue)
  - [`let Serial: int`](#JSObject.Serial)
  - [`var StoredKeys: [value.PropertyKey] { get }`](#JSObject.StoredKeys)
  - [`var StoredCount: int { get }`](#JSObject.StoredCount)
  - [`var isOrdinaryLookup: bool { get }`](#JSObject.isOrdinaryLookup)
  - [`var IsCallable: bool { get }`](#JSObject.IsCallable)
  - [`var IsConstructor: bool { get }`](#JSObject.IsConstructor)
  - [`func find(_ key: value.PropertyKey) -> int`](#JSObject.find)
  - [`func OwnSlot(_ key: value.PropertyKey) -> Slot?`](#JSObject.OwnSlot)
  - [`func store(_ key: value.PropertyKey, _ slot: Slot)`](#JSObject.store)
  - [`func remove(_ key: value.PropertyKey)`](#JSObject.remove)
  - [`func DefineData(_ key: value.PropertyKey, _ v: Value, writable: bool = true, enumerable: bool = true, configurable: bool = true)`](#JSObject.DefineData)
  - [`func DefineAccessorDirect(_ key: value.PropertyKey, getter: JSObject?, setter: JSObject?, enumerable: bool = false, configurable: bool = true)`](#JSObject.DefineAccessorDirect)
  - [`func hasIndexKeys() -> bool`](#JSObject.hasIndexKeys)
  - [`func GetPrototypeOf() throws -> JSObject?`](#JSObject.GetPrototypeOf)
  - [`func SetPrototypeOf(_ v: JSObject?) throws -> bool`](#JSObject.SetPrototypeOf)
  - [`func OrdinarySetPrototypeOf(_ v: JSObject?) -> bool`](#JSObject.OrdinarySetPrototypeOf)
  - [`func IsExtensibleObject() throws -> bool`](#JSObject.IsExtensibleObject)
  - [`func PreventExtensions() throws -> bool`](#JSObject.PreventExtensions)
  - [`func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?`](#JSObject.GetOwnProperty)
  - [`func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#JSObject.DefineOwnProperty)
  - [`func OrdinaryDefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#JSObject.OrdinaryDefineOwnProperty)
  - [`func ValidateAndApply(_ key: value.PropertyKey, _ extensible: bool, _ desc: PropertyDescriptor, _ current: PropertyDescriptor?) -> bool`](#JSObject.ValidateAndApply)
  - [`func HasProperty(_ key: value.PropertyKey) throws -> bool`](#JSObject.HasProperty)
  - [`func HasPropertySlow(_ key: value.PropertyKey) throws -> bool`](#JSObject.HasPropertySlow)
  - [`func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#JSObject.Get)
  - [`func GetSlow(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#JSObject.GetSlow)
  - [`func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#JSObject.Set)
  - [`func OrdinarySet(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#JSObject.OrdinarySet)
  - [`func Delete(_ key: value.PropertyKey) throws -> bool`](#JSObject.Delete)
  - [`func OwnPropertyKeys() throws -> [value.PropertyKey]`](#JSObject.OwnPropertyKeys)
  - [`func OrdinaryOwnPropertyKeys() -> [value.PropertyKey]`](#JSObject.OrdinaryOwnPropertyKeys)
  - [`func Call(_ this: Value, _ args: [Value]) throws -> Value`](#JSObject.Call)
  - [`func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value`](#JSObject.Construct)
  - [`func PrivateFind(_ name: value.Symbol) -> int`](#JSObject.PrivateFind)
- [`typealias Job = () throws -> Void`](#typealias-Job)
- [`enum Kind: Equatable`](#enum-Kind)
- [`typealias NativeFn = (Value, [Value], JSObject?) throws -> Value`](#typealias-NativeFn)
- [`final class NativeFunction: JSObject`](#class-NativeFunction)
  - [`init(realm: Realm, name: string, length: int, constructor: bool = false, proto: JSObject? = nil, _ fn: @escaping NativeFn)`](#NativeFunction.init)
  - [`init(realm: Realm, symbolName: value.Symbol, prefix: string, length: int, _ fn: @escaping NativeFn)`](#NativeFunction.init-2)
  - [`let Realm: Realm`](#NativeFunction.Realm)
  - [`override var IsCallable: bool { get }`](#NativeFunction.IsCallable)
  - [`override var IsConstructor: bool { get }`](#NativeFunction.IsConstructor)
  - [`override func Call(_ this: Value, _ args: [Value]) throws -> Value`](#NativeFunction.Call)
  - [`override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value`](#NativeFunction.Construct)
- [`final class PrivateMethod`](#class-PrivateMethod)
  - [`init(name: value.Symbol)`](#PrivateMethod.init)
  - [`let Name: value.Symbol`](#PrivateMethod.Name)
  - [`var Method: JSObject?`](#PrivateMethod.Method)
  - [`var Getter: JSObject?`](#PrivateMethod.Getter)
  - [`var Setter: JSObject?`](#PrivateMethod.Setter)
- [`final class PromiseCapability`](#class-PromiseCapability)
  - [`init(promise: JSObject, resolve: Value, reject: Value)`](#PromiseCapability.init)
  - [`let Promise: JSObject`](#PromiseCapability.Promise)
  - [`let Resolve: Value`](#PromiseCapability.Resolve)
  - [`let Reject: Value`](#PromiseCapability.Reject)
- [`final class PromiseObject: JSObject`](#class-PromiseObject)
  - [`override init(proto: JSObject?)`](#PromiseObject.init)
  - [`var State: PromiseState = .pending`](#PromiseObject.State)
  - [`var Result: Value = .undefined`](#PromiseObject.Result)
  - [`var FulfillReactions: [PromiseReaction] = []`](#PromiseObject.FulfillReactions)
  - [`var RejectReactions: [PromiseReaction] = []`](#PromiseObject.RejectReactions)
  - [`var IsHandled: bool = false`](#PromiseObject.IsHandled)
- [`final class PromiseReaction`](#class-PromiseReaction)
  - [`init(capability: PromiseCapability?, isFulfill: bool, handler: ReactionHandler)`](#PromiseReaction.init)
  - [`let Capability: PromiseCapability?`](#PromiseReaction.Capability)
  - [`let IsFulfill: bool`](#PromiseReaction.IsFulfill)
  - [`let Handler: ReactionHandler`](#PromiseReaction.Handler)
- [`enum PromiseState: Equatable`](#enum-PromiseState)
- [`struct PropertyDescriptor`](#struct-PropertyDescriptor)
  - [`init()`](#PropertyDescriptor.init)
  - [`var Value: Value?`](#PropertyDescriptor.Value)
  - [`var Writable: bool?`](#PropertyDescriptor.Writable)
  - [`var Get: Value?`](#PropertyDescriptor.Get)
  - [`var Set: Value?`](#PropertyDescriptor.Set)
  - [`var Enumerable: bool?`](#PropertyDescriptor.Enumerable)
  - [`var Configurable: bool?`](#PropertyDescriptor.Configurable)
  - [`var IsAccessor: bool { get }`](#PropertyDescriptor.IsAccessor)
  - [`var IsData: bool { get }`](#PropertyDescriptor.IsData)
  - [`var IsGeneric: bool { get }`](#PropertyDescriptor.IsGeneric)
  - [`static func Data(_ v: Value, writable: bool = true, enumerable: bool = true, configurable: bool = true) -> PropertyDescriptor`](#PropertyDescriptor.Data)
  - [`static func Accessor(get: Value, set: Value, enumerable: bool = false, configurable: bool = true) -> PropertyDescriptor`](#PropertyDescriptor.Accessor)
- [`final class ProxyObject: JSObject`](#class-ProxyObject)
  - [`init(target: JSObject, handler: JSObject)`](#ProxyObject.init)
  - [`var Target: JSObject?`](#ProxyObject.Target)
  - [`var Handler: JSObject?`](#ProxyObject.Handler)
  - [`override var isOrdinaryLookup: bool { get }`](#ProxyObject.isOrdinaryLookup)
  - [`override var IsCallable: bool { get }`](#ProxyObject.IsCallable)
  - [`override var IsConstructor: bool { get }`](#ProxyObject.IsConstructor)
  - [`override func GetPrototypeOf() throws -> JSObject?`](#ProxyObject.GetPrototypeOf)
  - [`override func SetPrototypeOf(_ v: JSObject?) throws -> bool`](#ProxyObject.SetPrototypeOf)
  - [`override func IsExtensibleObject() throws -> bool`](#ProxyObject.IsExtensibleObject)
  - [`override func PreventExtensions() throws -> bool`](#ProxyObject.PreventExtensions)
  - [`override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?`](#ProxyObject.GetOwnProperty)
  - [`override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#ProxyObject.DefineOwnProperty)
  - [`override func HasProperty(_ key: value.PropertyKey) throws -> bool`](#ProxyObject.HasProperty)
  - [`override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value`](#ProxyObject.Get)
  - [`override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool`](#ProxyObject.Set)
  - [`override func Delete(_ key: value.PropertyKey) throws -> bool`](#ProxyObject.Delete)
  - [`override func OwnPropertyKeys() throws -> [value.PropertyKey]`](#ProxyObject.OwnPropertyKeys)
  - [`override func Call(_ this: Value, _ args: [Value]) throws -> Value`](#ProxyObject.Call)
  - [`override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value`](#ProxyObject.Construct)
- [`enum ReactionHandler`](#enum-ReactionHandler)
- [`final class Realm`](#class-Realm)
  - [`init(agent: Agent)`](#Realm.init)
  - [`let Agent: Agent`](#Realm.Agent)
  - [`var Engine: Engine? = nil`](#Realm.Engine)
  - [`var Global: JSObject`](#Realm.Global)
  - [`var GlobalLexicals: [str.JSString: GlobalBinding] = [:]`](#Realm.GlobalLexicals)
  - [`var TemplateMap: [int: JSObject] = [:]`](#Realm.TemplateMap)
  - [`var Intrinsics: [string: JSObject] = [:]`](#Realm.Intrinsics)
  - [`let ObjectPrototype: JSObject`](#Realm.ObjectPrototype)
  - [`let FunctionPrototype: JSObject`](#Realm.FunctionPrototype)
  - [`var ArrayPrototype: JSObject`](#Realm.ArrayPrototype)
  - [`var ErrorPrototype: JSObject`](#Realm.ErrorPrototype)
  - [`var TypeErrorPrototype: JSObject`](#Realm.TypeErrorPrototype)
  - [`var RangeErrorPrototype: JSObject`](#Realm.RangeErrorPrototype)
  - [`var ReferenceErrorPrototype: JSObject`](#Realm.ReferenceErrorPrototype)
  - [`var SyntaxErrorPrototype: JSObject`](#Realm.SyntaxErrorPrototype)
  - [`var EvalErrorPrototype: JSObject`](#Realm.EvalErrorPrototype)
  - [`var URIErrorPrototype: JSObject`](#Realm.URIErrorPrototype)
  - [`var AggregateErrorPrototype: JSObject`](#Realm.AggregateErrorPrototype)
  - [`var StringPrototype: JSObject`](#Realm.StringPrototype)
  - [`var NumberPrototype: JSObject`](#Realm.NumberPrototype)
  - [`var BooleanPrototype: JSObject`](#Realm.BooleanPrototype)
  - [`var SymbolPrototype: JSObject`](#Realm.SymbolPrototype)
  - [`var BigIntPrototype: JSObject`](#Realm.BigIntPrototype)
  - [`var IteratorPrototype: JSObject`](#Realm.IteratorPrototype)
  - [`var AsyncIteratorPrototype: JSObject`](#Realm.AsyncIteratorPrototype)
  - [`var ArrayIteratorPrototype: JSObject`](#Realm.ArrayIteratorPrototype)
  - [`var GeneratorPrototype: JSObject`](#Realm.GeneratorPrototype)
  - [`var AsyncGeneratorPrototype: JSObject`](#Realm.AsyncGeneratorPrototype)
  - [`var GeneratorFunctionPrototype: JSObject`](#Realm.GeneratorFunctionPrototype)
  - [`var AsyncFunctionPrototype: JSObject`](#Realm.AsyncFunctionPrototype)
  - [`var AsyncGeneratorFunctionPrototype: JSObject`](#Realm.AsyncGeneratorFunctionPrototype)
  - [`var AsyncFromSyncIteratorPrototype: JSObject`](#Realm.AsyncFromSyncIteratorPrototype)
  - [`var PromisePrototype: JSObject`](#Realm.PromisePrototype)
  - [`var RegExpPrototype: JSObject`](#Realm.RegExpPrototype)
  - [`var DatePrototype: JSObject`](#Realm.DatePrototype)
  - [`var MapPrototype: JSObject`](#Realm.MapPrototype)
  - [`var SetPrototype: JSObject`](#Realm.SetPrototype)
  - [`var ObjectConstructor: JSObject? = nil`](#Realm.ObjectConstructor)
  - [`var FunctionConstructor: JSObject? = nil`](#Realm.FunctionConstructor)
  - [`var ArrayConstructor: JSObject? = nil`](#Realm.ArrayConstructor)
  - [`var PromiseConstructor: JSObject? = nil`](#Realm.PromiseConstructor)
  - [`var RegExpConstructor: JSObject? = nil`](#Realm.RegExpConstructor)
  - [`var EvalFunction: JSObject? = nil`](#Realm.EvalFunction)
  - [`var ThrowTypeError: JSObject? = nil`](#Realm.ThrowTypeError)
  - [`var CreateRegExp: ((str.JSString, str.JSString) throws -> JSObject)? = nil`](#Realm.CreateRegExp)
  - [`func Function(_ name: string, _ length: int, _ fn: @escaping NativeFn) -> NativeFunction`](#Realm.Function)
  - [`func SelfHosted(_ source: string, _ helpers: [Value]) throws -> JSObject`](#Realm.SelfHosted)
  - [`func Method(_ on: JSObject, _ name: string, _ length: int, _ fn: @escaping NativeFn)`](#Realm.Method)
  - [`func SymbolMethod(_ on: JSObject, _ sym: value.Symbol, _ length: int, writable: bool = true, configurable: bool = true, _ fn: @escaping NativeFn)`](#Realm.SymbolMethod)
  - [`func Getter(_ on: JSObject, _ key: value.PropertyKey, _ fn: @escaping NativeFn)`](#Realm.Getter)
  - [`func Accessor(_ on: JSObject, _ name: string, get: @escaping NativeFn, set: @escaping NativeFn)`](#Realm.Accessor)
  - [`func Constructor(_ name: string, _ length: int, prototype: JSObject, global: bool = true, _ fn: @escaping NativeFn) -> NativeFunction`](#Realm.Constructor)
  - [`func DefineGlobal(_ name: string, _ v: Value)`](#Realm.DefineGlobal)
- [`struct Slot`](#struct-Slot)
  - [`init(value: Value, flags: uint8)`](#Slot.init)
  - [`var Value: Value`](#Slot.Value)
  - [`var Getter: JSObject?`](#Slot.Getter)
  - [`var Setter: JSObject?`](#Slot.Setter)
  - [`var Flags: uint8`](#Slot.Flags)
  - [`var Writable: bool { get }`](#Slot.Writable)
  - [`var Enumerable: bool { get }`](#Slot.Enumerable)
  - [`var Configurable: bool { get }`](#Slot.Configurable)
  - [`var IsAccessor: bool { get }`](#Slot.IsAccessor)
  - [`var Descriptor: PropertyDescriptor { get }`](#Slot.Descriptor)
- [`final class StringObject: JSObject`](#class-StringObject)
  - [`init(_ s: str.JSString, proto: JSObject?)`](#StringObject.init)
  - [`let Str: str.JSString`](#StringObject.Str)
  - [`override var isOrdinaryLookup: bool { get }`](#StringObject.isOrdinaryLookup)
  - [`override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?`](#StringObject.GetOwnProperty)
  - [`override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool`](#StringObject.DefineOwnProperty)
  - [`override func OwnPropertyKeys() throws -> [value.PropertyKey]`](#StringObject.OwnPropertyKeys)
- [`enum Value`](#enum-Value)
  - [`static let True = Value.bool(true)`](#Value.True)
  - [`static let False = Value.bool(false)`](#Value.False)
  - [`static let Zero = Value.number(0)`](#Value.Zero)
  - [`var IsUndefined: bool { get }`](#Value.IsUndefined)
  - [`var IsNull: bool { get }`](#Value.IsNull)
  - [`var IsNullish: bool { get }`](#Value.IsNullish)
  - [`var IsEmpty: bool { get }`](#Value.IsEmpty)
  - [`var IsObject: bool { get }`](#Value.IsObject)
  - [`var AsObject: JSObject? { get }`](#Value.AsObject)
  - [`var IsString: bool { get }`](#Value.IsString)
  - [`var IsNumber: bool { get }`](#Value.IsNumber)
  - [`var IsCallable: bool { get }`](#Value.IsCallable)
  - [`var IsConstructor: bool { get }`](#Value.IsConstructor)
  - [`var TypeOf: string { get }`](#Value.TypeOf)
  - [`var Truthy: bool { get }`](#Value.Truthy)
  - [`static func Str(_ s: string) -> Value`](#Value.Str)
  - [`static func Name(_ s: string) -> Value`](#Value.Name)
  - [`static func Int(_ i: int) -> Value`](#Value.Int)

## Functions

### func Add <a id="func-Add"></a>

```vertex
public func Add(_ x: Value, _ y: Value) throws -> Value
```

Add is the + operator.

### func Arg <a id="func-Arg"></a>

```vertex
public func Arg(_ args: [Value], _ i: int) -> Value
```

Arg is argument i, or undefined.

### func Arithmetic <a id="func-Arithmetic"></a>

```vertex
public func Arithmetic(_ op: ArithOp, _ x: Value, _ y: Value) throws -> Value
```

Arithmetic applies a numeric operator after ToNumeric.

### func ArrayCreate <a id="func-ArrayCreate"></a>

```vertex
public func ArrayCreate(_ length: float64, proto: JSObject? = nil) throws -> ArrayObject
```

ArrayCreate (§10.4.2.2).

### func ArraySpeciesCreate <a id="func-ArraySpeciesCreate"></a>

```vertex
public func ArraySpeciesCreate(_ original: JSObject, _ length: float64) throws -> JSObject
```

ArraySpeciesCreate (§10.4.2.3).

### func AwaitValue <a id="func-AwaitValue"></a>

```vertex
public func AwaitValue(_ v: Value, onFulfilled: @escaping (Value) throws -> Value, onRejected: @escaping (Value) throws -> Value) throws
```

AwaitValue is the core of Await (§6.2.3.1): resolve v to a promise and
react to it with Vertex closures.

### func BigIntOp <a id="func-BigIntOp"></a>

```vertex
public func BigIntOp(_ op: ArithOp, _ a: value.BigInt, _ b: value.BigInt) throws -> value.BigInt
```

### func Call <a id="func-Call"></a>

```vertex
public func Call(_ f: Value, _ this: Value, _ args: [Value]) throws -> Value
```

Call (§7.3.14).

### func ClassNameOf <a id="func-ClassNameOf"></a>

```vertex
public func ClassNameOf(_ o: JSObject) -> string
```

ClassNameOf is the constructor name V8 shows in #<Name>.

### func CompletePropertyDescriptor <a id="func-CompletePropertyDescriptor"></a>

```vertex
public func CompletePropertyDescriptor(_ d: PropertyDescriptor) -> PropertyDescriptor
```

CompletePropertyDescriptor (§6.2.6.6).

### func Construct <a id="func-Construct"></a>

```vertex
public func Construct(_ f: JSObject, _ args: [Value], _ newTarget: JSObject? = nil) throws -> Value
```

Construct (§7.3.15).

### func CopyDataProperties <a id="func-CopyDataProperties"></a>

```vertex
public func CopyDataProperties(_ target: JSObject, _ source: Value, excluded: [value.PropertyKey]) throws
```

CopyDataProperties (§7.3.25).

### func CreateArrayFromList <a id="func-CreateArrayFromList"></a>

```vertex
public func CreateArrayFromList(_ r: Realm, _ list: [Value]) -> ArrayObject
```

CreateArrayFromList (§7.3.18).

### func CreateAsyncFromSyncIterator <a id="func-CreateAsyncFromSyncIterator"></a>

```vertex
public func CreateAsyncFromSyncIterator(_ sync: IteratorRecord) -> IteratorRecord
```

### func CreateDataProperty <a id="func-CreateDataProperty"></a>

```vertex
public func CreateDataProperty(_ o: JSObject, _ key: value.PropertyKey, _ v: Value) throws -> bool
```

CreateDataProperty (§7.3.5).

### func CreateDataPropertyOrThrow <a id="func-CreateDataPropertyOrThrow"></a>

```vertex
public func CreateDataPropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey, _ v: Value) throws
```

CreateDataPropertyOrThrow (§7.3.7).

### func CreateIterResultObject <a id="func-CreateIterResultObject"></a>

```vertex
public func CreateIterResultObject(_ v: Value, _ done: bool) -> JSObject
```

CreateIterResultObject (§7.4.14).

### func CreateListFromArrayLike <a id="func-CreateListFromArrayLike"></a>

```vertex
public func CreateListFromArrayLike(_ v: Value) throws -> [Value]
```

CreateListFromArrayLike (§7.3.19).

### func CreateResolvingFunctions <a id="func-CreateResolvingFunctions"></a>

```vertex
public func CreateResolvingFunctions(_ p: PromiseObject) -> (Value, Value)
```

CreateResolvingFunctions (§27.2.1.3).

### func CurrentRealm <a id="func-CurrentRealm"></a>

```vertex
public func CurrentRealm() -> Realm
```

CurrentRealm is the realm of the running code (the spec's current
realm record). Built-ins and the interpreter set it as they run.

### func CurrentRealmOrNil <a id="func-CurrentRealmOrNil"></a>

```vertex
public func CurrentRealmOrNil() -> Realm?
```

CurrentRealmOrNil is the current realm, if code is running.

### func DefinePropertyOrThrow <a id="func-DefinePropertyOrThrow"></a>

```vertex
public func DefinePropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey, _ d: PropertyDescriptor) throws
```

DefinePropertyOrThrow (§7.3.8).

### func DeletePropertyOrThrow <a id="func-DeletePropertyOrThrow"></a>

```vertex
public func DeletePropertyOrThrow(_ o: JSObject, _ key: value.PropertyKey) throws
```

DeletePropertyOrThrow (§7.3.9).

### func Describe <a id="func-Describe"></a>

```vertex
public func Describe(_ v: Value) -> string
```

Describe is a short form of a value for error messages, as V8 writes them.

### func DescribeIterable <a id="func-DescribeIterable"></a>

```vertex
public func DescribeIterable(_ v: Value) -> string
```

DescribeIterable names a value in "x is not iterable" as V8 does.

### func EnumerableOwnProperties <a id="func-EnumerableOwnProperties"></a>

```vertex
public func EnumerableOwnProperties(_ o: JSObject, _ kind: EnumKind) throws -> [Value]
```

### func FromPropertyDescriptor <a id="func-FromPropertyDescriptor"></a>

```vertex
public func FromPropertyDescriptor(_ d: PropertyDescriptor?) -> Value
```

FromPropertyDescriptor (§6.2.6.4).

### func FulfillPromise <a id="func-FulfillPromise"></a>

```vertex
public func FulfillPromise(_ p: PromiseObject, _ v: Value)
```

FulfillPromise (§27.2.1.4).

### func Get <a id="func-Get"></a>

```vertex
public func Get(_ o: JSObject, _ key: value.PropertyKey) throws -> Value
```

Get (§7.3.2).

### func GetAsyncIterator <a id="func-GetAsyncIterator"></a>

```vertex
public func GetAsyncIterator(_ obj: Value) throws -> IteratorRecord
```

GetAsyncIterator is GetIterator(obj, async): a sync iterator is wrapped
in an async-from-sync iterator.

### func GetIterator <a id="func-GetIterator"></a>

```vertex
public func GetIterator(_ obj: Value) throws -> IteratorRecord
```

GetIterator (§7.4.3) for sync iteration.

### func GetIteratorFromMethod <a id="func-GetIteratorFromMethod"></a>

```vertex
public func GetIteratorFromMethod(_ obj: Value, _ method: Value) throws -> IteratorRecord
```

GetIteratorFromMethod (§7.4.2).

### func GetMethod <a id="func-GetMethod"></a>

```vertex
public func GetMethod(_ v: Value, _ key: value.PropertyKey) throws -> Value
```

GetMethod (§7.3.11): undefined for null or undefined, else it must be callable.

### func GetPrototypeFromConstructor <a id="func-GetPrototypeFromConstructor"></a>

```vertex
public func GetPrototypeFromConstructor(_ ctor: JSObject, _ fallback: JSObject) throws -> JSObject
```

GetPrototypeFromConstructor (§10.1.14).

### func GetV <a id="func-GetV"></a>

```vertex
public func GetV(_ v: Value, _ key: value.PropertyKey) throws -> Value
```

GetV (§7.3.3) gets a property of any value, looking primitives up on
their prototype.

### func HandlerFrom <a id="func-HandlerFrom"></a>

```vertex
public func HandlerFrom(_ v: Value) -> ReactionHandler
```

HandlerFrom turns a then argument into a reaction handler.

### func HasOwnProperty <a id="func-HasOwnProperty"></a>

```vertex
public func HasOwnProperty(_ o: JSObject, _ key: value.PropertyKey) throws -> bool
```

HasOwnProperty (§7.3.13).

### func InstallStack <a id="func-InstallStack"></a>

```vertex
public func InstallStack(_ e: JSObject)
```

InstallStack gives an error its stack property: its name and message,
then the running frames.

### func InstanceOf <a id="func-InstanceOf"></a>

```vertex
public func InstanceOf(_ v: Value, _ target: Value) throws -> bool
```

InstanceofOperator (§13.10.2).

### func Invoke <a id="func-Invoke"></a>

```vertex
public func Invoke(_ v: Value, _ key: value.PropertyKey, _ args: [Value]) throws -> Value
```

Invoke (§7.3.21): call a method by name.

### func IsArray <a id="func-IsArray"></a>

```vertex
public func IsArray(_ v: Value) throws -> bool
```

IsArray (§7.2.2) sees through proxies.

### func IterableToList <a id="func-IterableToList"></a>

```vertex
public func IterableToList(_ items: Value) throws -> [Value]
```

IterableToList (§7.4.15).

### func IteratorClose <a id="func-IteratorClose"></a>

```vertex
public func IteratorClose(_ r: IteratorRecord) throws
```

IteratorClose (§7.4.9) for a normal completion: errors from return
propagate, and a non-object result is a TypeError.

### func IteratorCloseOnThrow <a id="func-IteratorCloseOnThrow"></a>

```vertex
public func IteratorCloseOnThrow(_ r: IteratorRecord)
```

IteratorCloseOnThrow is IteratorClose for a throw completion: the
original exception wins over anything return does.

### func IteratorComplete <a id="func-IteratorComplete"></a>

```vertex
public func IteratorComplete(_ o: JSObject) throws -> bool
```

IteratorComplete (§7.4.5).

### func IteratorNext <a id="func-IteratorNext"></a>

```vertex
public func IteratorNext(_ r: IteratorRecord, _ v: Value? = nil) throws -> JSObject
```

IteratorNext (§7.4.4).

### func IteratorStepValue <a id="func-IteratorStepValue"></a>

```vertex
public func IteratorStepValue(_ r: IteratorRecord) throws -> Value?
```

IteratorStepValue (§7.4.8): the next value, or nil when done.

### func IteratorValue <a id="func-IteratorValue"></a>

```vertex
public func IteratorValue(_ o: JSObject) throws -> Value
```

IteratorValue (§7.4.6).

### func Key <a id="func-Key"></a>

```vertex
public func Key(_ s: string) -> value.PropertyKey
```

Key helpers.

### func KeyDisplay <a id="func-KeyDisplay"></a>

```vertex
public func KeyDisplay(_ k: value.PropertyKey) -> string
```

KeyDisplay is a key as V8 quotes it in messages.

### func KeyToValue <a id="func-KeyToValue"></a>

```vertex
public func KeyToValue(_ k: value.PropertyKey) -> Value
```

KeyToValue is a property key as a language value.

### func LengthOfArrayLike <a id="func-LengthOfArrayLike"></a>

```vertex
public func LengthOfArrayLike(_ o: JSObject) throws -> int
```

LengthOfArrayLike (§7.3.18).

### func LessThan <a id="func-LessThan"></a>

```vertex
public func LessThan(_ x: Value, _ y: Value, leftFirst: bool) throws -> bool?
```

IsLessThan (§7.2.13): true, false, or nil for undefined (a NaN).

### func LooseEquals <a id="func-LooseEquals"></a>

```vertex
public func LooseEquals(_ x: Value, _ y: Value) throws -> bool
```

IsLooselyEqual (§7.2.14), the == operator.

### func MakeConstructor <a id="func-MakeConstructor"></a>

```vertex
public func MakeConstructor(_ f: JSObject, realm: Realm, proto: JSObject? = nil, writable: bool = true)
```

MakeConstructor gives a function its prototype object (§10.2.5).

### func MakeError <a id="func-MakeError"></a>

```vertex
public func MakeError(_ proto: JSObject, _ message: str.JSString) -> JSObject
```

MakeError creates an error object with a message and a stack trace.

### func NewObject <a id="func-NewObject"></a>

```vertex
public func NewObject(_ proto: JSObject?) -> JSObject
```

OrdinaryObject is a plain object with a given prototype.

### func NewPromise <a id="func-NewPromise"></a>

```vertex
public func NewPromise() -> PromiseObject
```

NewPromise makes a pending %Promise% of the current realm.

### func NewPromiseCapability <a id="func-NewPromiseCapability"></a>

```vertex
public func NewPromiseCapability(_ c: Value) throws -> PromiseCapability
```

NewPromiseCapability (§27.2.1.5).

### func NumberMod <a id="func-NumberMod"></a>

```vertex
public func NumberMod(_ a: float64, _ b: float64) -> float64
```

NumberMod is the % operator: the result takes the dividend's sign.

### func NumberOp <a id="func-NumberOp"></a>

```vertex
public func NumberOp(_ op: ArithOp, _ a: float64, _ b: float64) -> float64
```

### func NumberPow <a id="func-NumberPow"></a>

```vertex
public func NumberPow(_ base: float64, _ e: float64) -> float64
```

NumberPow is Number::exponentiate (§6.1.6.1.3).

### func OrdinaryCreateFromConstructor <a id="func-OrdinaryCreateFromConstructor"></a>

```vertex
public func OrdinaryCreateFromConstructor(_ ctor: JSObject?, _ fallback: JSObject) throws -> JSObject
```

OrdinaryCreateFromConstructor (§10.1.13).

### func OrdinaryHasInstance <a id="func-OrdinaryHasInstance"></a>

```vertex
public func OrdinaryHasInstance(_ c: Value, _ o: Value) throws -> bool
```

OrdinaryHasInstance (§7.3.22).

### func OrdinaryToPrimitive <a id="func-OrdinaryToPrimitive"></a>

```vertex
public func OrdinaryToPrimitive(_ o: JSObject, _ hint: Hint) throws -> Value
```

OrdinaryToPrimitive (§7.1.1.1).

### func PerformPromiseThen <a id="func-PerformPromiseThen"></a>

```vertex
public func PerformPromiseThen(_ p: PromiseObject, _ onFulfilled: ReactionHandler, _ onRejected: ReactionHandler, _ cap: PromiseCapability?)
```

PerformPromiseThen (§27.2.5.4.1).

### func PromiseResolve <a id="func-PromiseResolve"></a>

```vertex
public func PromiseResolve(_ c: JSObject, _ x: Value) throws -> JSObject
```

PromiseResolve (§27.2.4.7.1).

### func PutProperty <a id="func-PutProperty"></a>

```vertex
public func PutProperty(_ base: Value, _ key: value.PropertyKey, _ v: Value, strict: bool) throws
```

PutValue for a property reference on any base value, as the
interpreter's assignments do it.

### func RejectPromise <a id="func-RejectPromise"></a>

```vertex
public func RejectPromise(_ p: PromiseObject, _ reason: Value)
```

RejectPromise (§27.2.1.7).

### func RequireObjectCoercible <a id="func-RequireObjectCoercible"></a>

```vertex
public func RequireObjectCoercible(_ v: Value) throws
```

RequireObjectCoercible (§7.2.1).

### func ResolvePromise <a id="func-ResolvePromise"></a>

```vertex
public func ResolvePromise(_ p: PromiseObject, _ resolution: Value)
```

ResolvePromise is the body of a promise resolve function.

### func SameValue <a id="func-SameValue"></a>

```vertex
public func SameValue(_ x: Value, _ y: Value) -> bool
```

SameValue (§7.2.10): NaN is itself, and +0 and -0 differ.

### func SameValueZero <a id="func-SameValueZero"></a>

```vertex
public func SameValueZero(_ x: Value, _ y: Value) -> bool
```

SameValueZero (§7.2.11): NaN is itself, and +0 equals -0.

### func SetCurrentRealm <a id="func-SetCurrentRealm"></a>

```vertex
public func SetCurrentRealm(_ r: Realm?)
```

### func SetFunctionName <a id="func-SetFunctionName"></a>

```vertex
public func SetFunctionName(_ f: JSObject, _ key: value.PropertyKey, prefix: string = "")
```

SetFunctionName (§10.2.9) defines a function's name property.

### func SetIntegrityLevel <a id="func-SetIntegrityLevel"></a>

```vertex
public func SetIntegrityLevel(_ o: JSObject, frozen: bool) throws -> bool
```

SetIntegrityLevel (§7.3.16): sealed or frozen.

### func SetProperty <a id="func-SetProperty"></a>

```vertex
public func SetProperty(_ o: JSObject, _ key: value.PropertyKey, _ v: Value, throwing: bool) throws
```

SetOrThrow is Set(O, P, V, Throw) (§7.3.4).

### func SpeciesConstructor <a id="func-SpeciesConstructor"></a>

```vertex
public func SpeciesConstructor(_ o: JSObject, _ def: JSObject) throws -> JSObject
```

SpeciesConstructor (§7.3.23).

### func StrictEquals <a id="func-StrictEquals"></a>

```vertex
public func StrictEquals(_ x: Value, _ y: Value) -> bool
```

StrictEquals is IsStrictlyEqual (§7.2.15), the === operator.

### func SymKey <a id="func-SymKey"></a>

```vertex
public func SymKey(_ s: value.Symbol) -> value.PropertyKey
```

### func TestIntegrityLevel <a id="func-TestIntegrityLevel"></a>

```vertex
public func TestIntegrityLevel(_ o: JSObject, frozen: bool) throws -> bool
```

TestIntegrityLevel (§7.3.17).

### func ThrowRangeError <a id="func-ThrowRangeError"></a>

```vertex
public func ThrowRangeError(_ msg: string) -> Completion
```

### func ThrowReferenceError <a id="func-ThrowReferenceError"></a>

```vertex
public func ThrowReferenceError(_ msg: string) -> Completion
```

### func ThrowSyntaxError <a id="func-ThrowSyntaxError"></a>

```vertex
public func ThrowSyntaxError(_ msg: string) -> Completion
```

### func ThrowTypeError <a id="func-ThrowTypeError"></a>

```vertex
public func ThrowTypeError(_ msg: string) -> Completion
```

### func ThrowURIError <a id="func-ThrowURIError"></a>

```vertex
public func ThrowURIError(_ msg: string) -> Completion
```

### func ToBigInt <a id="func-ToBigInt"></a>

```vertex
public func ToBigInt(_ v: Value) throws -> value.BigInt
```

ToBigInt (§7.1.13).

### func ToIndex <a id="func-ToIndex"></a>

```vertex
public func ToIndex(_ v: Value) throws -> int
```

ToIndex (§7.1.22).

### func ToInt32 <a id="func-ToInt32"></a>

```vertex
public func ToInt32(_ v: Value) throws -> int32
```

### func ToIntegerOrInfinity <a id="func-ToIntegerOrInfinity"></a>

```vertex
public func ToIntegerOrInfinity(_ v: Value) throws -> float64
```

ToIntegerOrInfinity (§7.1.5).

### func ToLength <a id="func-ToLength"></a>

```vertex
public func ToLength(_ v: Value) throws -> float64
```

ToLength (§7.1.20).

### func ToNumber <a id="func-ToNumber"></a>

```vertex
public func ToNumber(_ v: Value) throws -> float64
```

ToNumber (§7.1.4).

### func ToNumeric <a id="func-ToNumeric"></a>

```vertex
public func ToNumeric(_ v: Value) throws -> Value
```

ToNumeric (§7.1.3): a number or a BigInt.

### func ToObject <a id="func-ToObject"></a>

```vertex
public func ToObject(_ v: Value) throws -> JSObject
```

ToObject (§7.1.18).

### func ToPrimitive <a id="func-ToPrimitive"></a>

```vertex
public func ToPrimitive(_ v: Value, _ hint: Hint = .defaultHint) throws -> Value
```

ToPrimitive (§7.1.1).

### func ToPropertyDescriptor <a id="func-ToPropertyDescriptor"></a>

```vertex
public func ToPropertyDescriptor(_ v: Value) throws -> PropertyDescriptor
```

ToPropertyDescriptor (§6.2.6.5).

### func ToPropertyKey <a id="func-ToPropertyKey"></a>

```vertex
public func ToPropertyKey(_ v: Value) throws -> value.PropertyKey
```

ToPropertyKey (§7.1.19).

### func ToString <a id="func-ToString"></a>

```vertex
public func ToString(_ v: Value) throws -> str.JSString
```

ToString (§7.1.17).

### func ToUint32 <a id="func-ToUint32"></a>

```vertex
public func ToUint32(_ v: Value) throws -> uint32
```

### func TypeOfValue <a id="func-TypeOfValue"></a>

```vertex
public func TypeOfValue(_ v: Value) -> Value
```

TypeOfValue is the typeof operator as a string value.

### func isPristineArrayIteration <a id="func-isPristineArrayIteration"></a>

```vertex
public func isPristineArrayIteration(_ a: ArrayObject) -> bool
```

isPristineArrayIteration says an array iterates as the built-in array
iterator would, so its elements can be read directly.

## Types

### class Agent <a id="class-Agent"></a>

```vertex
public final class Agent
```

Agent is the spec's agent: the job queue and the state shared by the
realms that run on one thread.

#### Initializers

<a id="Agent.init"></a>

```vertex
public init()
```

#### Properties

<a id="Agent.SymbolRegistry"></a>

```vertex
public var SymbolRegistry: [str.JSString: value.Symbol] = [:]
```

SymbolRegistry is Symbol.for's table.

<a id="Agent.OnRejectionTracker"></a>

```vertex
public var OnRejectionTracker: ((JSObject, bool) -> Void)? = nil
```

OnUnhandledRejection is told of promises rejected with no handler,
and of handlers added later (HostPromiseRejectionTracker).

<a id="Agent.OnJobError"></a>

```vertex
public var OnJobError: ((Value) -> Void)? = nil
```

OnUncaughtJobError is told of an exception thrown out of a job.

<a id="Agent.KeptAlive"></a>

```vertex
public var KeptAlive: [JSObject] = []
```

KeptAlive holds WeakRef targets until the job queue drains (§9.9.1).

<a id="Agent.HasJobs"></a>

```vertex
public var HasJobs: bool { get }
```

#### Methods

<a id="Agent.Enqueue"></a>

```vertex
public func Enqueue(_ job: @escaping Job)
```

<a id="Agent.RunJobs"></a>

```vertex
public func RunJobs()
```

RunJobs drains the microtask queue.

### class ArgumentsObject <a id="class-ArgumentsObject"></a>

```vertex
public final class ArgumentsObject: JSObject
```

ArgumentsObject is an arguments exotic object (§10.4.4). A mapped one
aliases its elements to the function's parameter slots in a context.

#### Initializers

<a id="ArgumentsObject.init"></a>

```vertex
public override init(proto: JSObject?)
```

#### Properties

<a id="ArgumentsObject.Map"></a>

```vertex
public var Map: [int] = []
```

Map holds, per argument index, the context slot it aliases, or -1.

<a id="ArgumentsObject.Env"></a>

```vertex
public var Env: Context? = nil
```

<a id="ArgumentsObject.isOrdinaryLookup"></a>

```vertex
public override var isOrdinaryLookup: bool { get }
```

#### Methods

<a id="ArgumentsObject.GetOwnProperty"></a>

```vertex
public override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?
```

<a id="ArgumentsObject.DefineOwnProperty"></a>

```vertex
public override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="ArgumentsObject.Get"></a>

```vertex
public override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="ArgumentsObject.Set"></a>

```vertex
public override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

<a id="ArgumentsObject.Delete"></a>

```vertex
public override func Delete(_ key: value.PropertyKey) throws -> bool
```

### enum ArithOp <a id="enum-ArithOp"></a>

```vertex
public enum ArithOp
```

Arithmetic is the numeric operators of §6.1.6 and §13.15.3's
ApplyStringOrNumericBinaryOperator (without +'s string case).

#### Cases

<a id="ArithOp.add"></a>

```vertex
case add
```

<a id="ArithOp.sub"></a>

```vertex
case sub
```

<a id="ArithOp.mul"></a>

```vertex
case mul
```

<a id="ArithOp.div"></a>

```vertex
case div
```

<a id="ArithOp.mod"></a>

```vertex
case mod
```

<a id="ArithOp.exp"></a>

```vertex
case exp
```

<a id="ArithOp.shl"></a>

```vertex
case shl
```

<a id="ArithOp.sar"></a>

```vertex
case sar
```

<a id="ArithOp.shr"></a>

```vertex
case shr
```

<a id="ArithOp.and"></a>

```vertex
case and
```

<a id="ArithOp.or"></a>

```vertex
case or
```

<a id="ArithOp.xor"></a>

```vertex
case xor
```

### class ArrayObject <a id="class-ArrayObject"></a>

```vertex
public final class ArrayObject: JSObject
```

ArrayObject is an Array exotic object (§10.4.2). Elements live in a
dense vector with .empty for holes; an array that gets an accessor or
a non-default attribute on an element, or a far-out index, moves its
elements into ordinary property storage and stays sparse.

#### Initializers

<a id="ArrayObject.init"></a>

```vertex
public override init(proto: JSObject?)
```

#### Properties

<a id="ArrayObject.Dense"></a>

```vertex
public var Dense: [Value] = []
```

<a id="ArrayObject.Length"></a>

```vertex
public var Length: uint32 = 0
```

<a id="ArrayObject.LengthWritable"></a>

```vertex
public var LengthWritable: bool = true
```

<a id="ArrayObject.Sparse"></a>

```vertex
public var Sparse: bool = false
```

<a id="ArrayObject.IsDenseSimple"></a>

```vertex
public var IsDenseSimple: bool { get }
```

IsDenseSimple says the elements are all in Dense.

<a id="ArrayObject.isOrdinaryLookup"></a>

```vertex
public override var isOrdinaryLookup: bool { get }
```

#### Methods

<a id="ArrayObject.GetOwnProperty"></a>

```vertex
public override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?
```

<a id="ArrayObject.DefineOwnProperty"></a>

```vertex
public override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="ArrayObject.truncate"></a>

```vertex
public func truncate(to n: uint32) -> bool
```

truncate deletes elements from the new length up; it stops at a
non-configurable one.

<a id="ArrayObject.HasProperty"></a>

```vertex
public override func HasProperty(_ key: value.PropertyKey) throws -> bool
```

<a id="ArrayObject.Get"></a>

```vertex
public override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="ArrayObject.Set"></a>

```vertex
public override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

<a id="ArrayObject.Delete"></a>

```vertex
public override func Delete(_ key: value.PropertyKey) throws -> bool
```

<a id="ArrayObject.OwnPropertyKeys"></a>

```vertex
public override func OwnPropertyKeys() throws -> [value.PropertyKey]
```

<a id="ArrayObject.Push"></a>

```vertex
public func Push(_ v: Value)
```

Push appends without the generic protocol, for built-ins that made
the array themselves.

### class AsyncFromSyncIterator <a id="class-AsyncFromSyncIterator"></a>

```vertex
public final class AsyncFromSyncIterator: JSObject
```

AsyncFromSyncIterator is §27.1.6's wrapper: its methods live on
%AsyncFromSyncIteratorPrototype%, installed by the built-ins.

#### Initializers

<a id="AsyncFromSyncIterator.init"></a>

```vertex
public init(_ sync: IteratorRecord, proto: JSObject)
```

#### Properties

<a id="AsyncFromSyncIterator.Sync"></a>

```vertex
public let Sync: IteratorRecord
```

### class BoundFunction <a id="class-BoundFunction"></a>

```vertex
public final class BoundFunction: JSObject
```

BoundFunction is a bound function exotic object (§10.4.1).

#### Initializers

<a id="BoundFunction.init"></a>

```vertex
public init(target: JSObject, boundThis: Value, boundArgs: [Value], proto: JSObject?)
```

#### Properties

<a id="BoundFunction.Target"></a>

```vertex
public let Target: JSObject
```

<a id="BoundFunction.BoundThis"></a>

```vertex
public let BoundThis: Value
```

<a id="BoundFunction.BoundArgs"></a>

```vertex
public let BoundArgs: [Value]
```

<a id="BoundFunction.IsCallable"></a>

```vertex
public override var IsCallable: bool { get }
```

<a id="BoundFunction.IsConstructor"></a>

```vertex
public override var IsConstructor: bool { get }
```

#### Methods

<a id="BoundFunction.Call"></a>

```vertex
public override func Call(_ this: Value, _ args: [Value]) throws -> Value
```

<a id="BoundFunction.Construct"></a>

```vertex
public override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value
```

### class ClassField <a id="class-ClassField"></a>

```vertex
public final class ClassField
```

ClassField is one instance field a class constructor defines.

#### Initializers

<a id="ClassField.init"></a>

```vertex
public init(key: value.PropertyKey, initializer: JSObject?)
```

#### Properties

<a id="ClassField.Key"></a>

```vertex
public let Key: value.PropertyKey
```

<a id="ClassField.Initializer"></a>

```vertex
public let Initializer: JSObject?
```

### class Completion <a id="class-Completion"></a>

```vertex
public final class Completion: Error
```

Completion is how an ECMAScript exception travels through Vertex code:
every internal method and abstract operation that can throw throws one,
carrying the thrown value. (A class, not an enum with a payload: vsc
can't yet put a payload enum declared here into an Error existential.)

#### Initializers

<a id="Completion.init"></a>

```vertex
public init(_ v: Value)
```

#### Properties

<a id="Completion.Value"></a>

```vertex
public let Value: Value
```

#### Methods

<a id="Completion.thrown"></a>

```vertex
public static func thrown(_ v: Value) -> Completion
```

### class Context <a id="class-Context"></a>

```vertex
public final class Context
```

Context is a heap environment: the slots of the bindings closures
capture, chained to the context outside it.

#### Initializers

<a id="Context.init"></a>

```vertex
public init(slots: int, parent: Context?, info: bytecode.ScopeInfo?)
```

<a id="Context.init-2"></a>

```vertex
public init(copying c: Context)
```

#### Properties

<a id="Context.Slots"></a>

```vertex
public var Slots: [Value]
```

<a id="Context.Parent"></a>

```vertex
public let Parent: Context?
```

<a id="Context.Info"></a>

```vertex
public let Info: bytecode.ScopeInfo?
```

Info names the slots, for eval and with.

<a id="Context.WithObject"></a>

```vertex
public var WithObject: JSObject? = nil
```

WithObject makes this a with statement's object environment.

<a id="Context.Extension"></a>

```vertex
public var Extension: JSObject? = nil
```

Extension holds the vars a sloppy direct eval declared here.

### protocol Engine <a id="protocol-Engine"></a>

```vertex
public protocol Engine: AnyObject
```

Engine is what runs ECMAScript function code: the interpreter,
installed on the realm. The object model calls through it so it needs
no knowledge of bytecode execution.

#### Methods

<a id="Engine.CallFunction"></a>

```vertex
func CallFunction(_ f: JSFunction, _ this: Value, _ args: [Value]) throws -> Value
```

<a id="Engine.ConstructFunction"></a>

```vertex
func ConstructFunction(_ f: JSFunction, _ args: [Value], _ newTarget: JSObject) throws -> Value
```

<a id="Engine.IndirectEval"></a>

```vertex
func IndirectEval(_ realm: Realm, _ source: str.JSString) throws -> Value
```

IndirectEval runs eval(x) not called directly: global scope.

<a id="Engine.CreateDynamicFunction"></a>

```vertex
func CreateDynamicFunction(_ realm: Realm, _ args: [Value], _ newTarget: JSObject?, isAsync: bool, isGenerator: bool) throws -> JSObject
```

CreateDynamicFunction is the Function, GeneratorFunction,
AsyncFunction and AsyncGeneratorFunction constructors (§20.2.1.1.1).

<a id="Engine.StackTrace"></a>

```vertex
func StackTrace() -> string
```

StackTrace describes the running frames, for Error.prototype.stack.

### enum EnumKind <a id="enum-EnumKind"></a>

```vertex
public enum EnumKind
```

EnumerableOwnProperties (§7.3.24): keys, values or entries.

#### Cases

<a id="EnumKind.keys"></a>

```vertex
case keys
```

<a id="EnumKind.values"></a>

```vertex
case values
```

<a id="EnumKind.entries"></a>

```vertex
case entries
```

### class FunctionEnv <a id="class-FunctionEnv"></a>

```vertex
public final class FunctionEnv
```

FunctionEnv is the part of a function's environment that arrows and
eval share with it: this, new.target and the function itself (for
super and the home object).

#### Initializers

<a id="FunctionEnv.init"></a>

```vertex
public init(this: Value, newTarget: Value, function: JSFunction?)
```

#### Properties

<a id="FunctionEnv.This"></a>

```vertex
public var This: Value
```

This is .empty in a derived constructor until super() returns.

<a id="FunctionEnv.NewTarget"></a>

```vertex
public var NewTarget: Value
```

<a id="FunctionEnv.Function"></a>

```vertex
public var Function: JSFunction?
```

### class FunctionPrototypeObject <a id="class-FunctionPrototypeObject"></a>

```vertex
public final class FunctionPrototypeObject: JSObject
```

FunctionPrototypeObject is %Function.prototype%: a function that
accepts any arguments and returns undefined (§20.2.3).

#### Initializers

<a id="FunctionPrototypeObject.init"></a>

```vertex
public override init(proto: JSObject?)
```

#### Properties

<a id="FunctionPrototypeObject.IsCallable"></a>

```vertex
public override var IsCallable: bool { get }
```

#### Methods

<a id="FunctionPrototypeObject.Call"></a>

```vertex
public override func Call(_ this: Value, _ args: [Value]) throws -> Value
```

### class GlobalBinding <a id="class-GlobalBinding"></a>

```vertex
public final class GlobalBinding
```

GlobalBinding is a top-level let, const or class.

#### Initializers

<a id="GlobalBinding.init"></a>

```vertex
public init(value: Value, isConst: bool)
```

#### Properties

<a id="GlobalBinding.Value"></a>

```vertex
public var Value: Value
```

<a id="GlobalBinding.IsConst"></a>

```vertex
public let IsConst: bool
```

### enum Hint <a id="enum-Hint"></a>

```vertex
public enum Hint
```

#### Cases

<a id="Hint.defaultHint"></a>

```vertex
case defaultHint
```

<a id="Hint.number"></a>

```vertex
case number
```

<a id="Hint.string"></a>

```vertex
case string
```

### class IteratorRecord <a id="class-IteratorRecord"></a>

```vertex
public final class IteratorRecord
```

IteratorRecord is the spec's Iterator Record (§7.4.1).

#### Initializers

<a id="IteratorRecord.init"></a>

```vertex
public init(iterator: JSObject, next: Value)
```

#### Properties

<a id="IteratorRecord.Iterator"></a>

```vertex
public let Iterator: JSObject
```

<a id="IteratorRecord.NextMethod"></a>

```vertex
public let NextMethod: Value
```

<a id="IteratorRecord.Done"></a>

```vertex
public var Done: bool = false
```

### class JSFunction <a id="class-JSFunction"></a>

```vertex
public final class JSFunction: JSObject
```

JSFunction is an ECMAScript function object (§10.2): compiled code
closed over a context.

#### Initializers

<a id="JSFunction.init"></a>

```vertex
public init(template: bytecode.FunctionTemplate, env: Context?, realm: Realm, proto: JSObject)
```

#### Properties

<a id="JSFunction.Template"></a>

```vertex
public let Template: bytecode.FunctionTemplate
```

<a id="JSFunction.Env"></a>

```vertex
public let Env: Context?
```

<a id="JSFunction.FuncEnv"></a>

```vertex
public var FuncEnv: FunctionEnv?
```

FuncEnv is the enclosing function's environment, for an arrow.

<a id="JSFunction.HomeObject"></a>

```vertex
public var HomeObject: JSObject?
```

<a id="JSFunction.Fields"></a>

```vertex
public var Fields: [ClassField] = []
```

Fields and PrivateMethods are a class constructor's instance
elements, in order.

<a id="JSFunction.PrivateMethods"></a>

```vertex
public var PrivateMethods: [PrivateMethod] = []
```

<a id="JSFunction.Realm"></a>

```vertex
public let Realm: Realm
```

<a id="JSFunction.Module"></a>

```vertex
public var Module: JSObject? = nil
```

ScriptOrModule is the module a function belongs to, for import().

<a id="JSFunction.IsCallable"></a>

```vertex
public override var IsCallable: bool { get }
```

<a id="JSFunction.IsConstructor"></a>

```vertex
public override var IsConstructor: bool { get }
```

<a id="JSFunction.IsClassConstructor"></a>

```vertex
public var IsClassConstructor: bool { get }
```

#### Methods

<a id="JSFunction.Call"></a>

```vertex
public override func Call(_ this: Value, _ args: [Value]) throws -> Value
```

<a id="JSFunction.Construct"></a>

```vertex
public override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value
```

### class JSObject <a id="class-JSObject"></a>

```vertex
open class JSObject
```

#### Initializers

<a id="JSObject.init"></a>

```vertex
public init(proto: JSObject?)
```

#### Properties

<a id="JSObject.Proto"></a>

```vertex
public var Proto: JSObject?
```

<a id="JSObject.Extensible"></a>

```vertex
public var Extensible: bool = true
```

<a id="JSObject.Kind"></a>

```vertex
public var Kind: Kind = .ordinary
```

<a id="JSObject.IsHTMLDDA"></a>

```vertex
public var IsHTMLDDA: bool = false
```

IsHTMLDDA marks the one object (document.all) that is falsy and typeof "undefined".

<a id="JSObject.PrimitiveValue"></a>

```vertex
public var PrimitiveValue: Value = .undefined
```

PrimitiveValue is a wrapper's [[BooleanData]], [[NumberData]] and so
on, or a Date's time value.

<a id="JSObject.Serial"></a>

```vertex
public let Serial: int
```

Serial is the object's identity as a number, unique in the process:
what Map, Set and WeakMap hash an object key by.

<a id="JSObject.StoredKeys"></a>

```vertex
public var StoredKeys: [value.PropertyKey] { get }
```

StoredKeys are the own stored keys in insertion order.

<a id="JSObject.StoredCount"></a>

```vertex
public var StoredCount: int { get }
```

StoredCount is the number of own stored properties.

<a id="JSObject.isOrdinaryLookup"></a>

```vertex
open var isOrdinaryLookup: bool { get }
```

isOrdinaryLookup says whether GetOwnProperty is the ordinary one,
so lookups can read storage directly.

<a id="JSObject.IsCallable"></a>

```vertex
open var IsCallable: bool { get }
```

<a id="JSObject.IsConstructor"></a>

```vertex
open var IsConstructor: bool { get }
```

#### Methods

<a id="JSObject.find"></a>

```vertex
public func find(_ key: value.PropertyKey) -> int
```

find is the slot number of an own stored key, or -1.

<a id="JSObject.OwnSlot"></a>

```vertex
public func OwnSlot(_ key: value.PropertyKey) -> Slot?
```

OwnSlot is the stored property for a key, if any.

<a id="JSObject.store"></a>

```vertex
public func store(_ key: value.PropertyKey, _ slot: Slot)
```

store adds or replaces a stored property.

<a id="JSObject.remove"></a>

```vertex
public func remove(_ key: value.PropertyKey)
```

remove deletes a stored property.

<a id="JSObject.DefineData"></a>

```vertex
public func DefineData(_ key: value.PropertyKey, _ v: Value, writable: bool = true, enumerable: bool = true, configurable: bool = true)
```

DefineData adds a data property directly, for building built-ins
and fresh objects: no checks.

<a id="JSObject.DefineAccessorDirect"></a>

```vertex
public func DefineAccessorDirect(_ key: value.PropertyKey, getter: JSObject?, setter: JSObject?, enumerable: bool = false, configurable: bool = true)
```

DefineAccessor adds an accessor property directly.

<a id="JSObject.hasIndexKeys"></a>

```vertex
public func hasIndexKeys() -> bool
```

hasIndexKeys says whether an index key was ever stored here.

<a id="JSObject.GetPrototypeOf"></a>

```vertex
open func GetPrototypeOf() throws -> JSObject?
```

<a id="JSObject.SetPrototypeOf"></a>

```vertex
open func SetPrototypeOf(_ v: JSObject?) throws -> bool
```

<a id="JSObject.OrdinarySetPrototypeOf"></a>

```vertex
public func OrdinarySetPrototypeOf(_ v: JSObject?) -> bool
```

<a id="JSObject.IsExtensibleObject"></a>

```vertex
open func IsExtensibleObject() throws -> bool
```

<a id="JSObject.PreventExtensions"></a>

```vertex
open func PreventExtensions() throws -> bool
```

<a id="JSObject.GetOwnProperty"></a>

```vertex
open func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?
```

<a id="JSObject.DefineOwnProperty"></a>

```vertex
open func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="JSObject.OrdinaryDefineOwnProperty"></a>

```vertex
public func OrdinaryDefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="JSObject.ValidateAndApply"></a>

```vertex
public func ValidateAndApply(_ key: value.PropertyKey, _ extensible: bool, _ desc: PropertyDescriptor, _ current: PropertyDescriptor?) -> bool
```

ValidateAndApply is ValidateAndApplyPropertyDescriptor (§10.1.6.3)
for this object's own storage.

<a id="JSObject.HasProperty"></a>

```vertex
open func HasProperty(_ key: value.PropertyKey) throws -> bool
```

<a id="JSObject.HasPropertySlow"></a>

```vertex
public func HasPropertySlow(_ key: value.PropertyKey) throws -> bool
```

<a id="JSObject.Get"></a>

```vertex
open func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="JSObject.GetSlow"></a>

```vertex
public func GetSlow(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="JSObject.Set"></a>

```vertex
open func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

<a id="JSObject.OrdinarySet"></a>

```vertex
public func OrdinarySet(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

OrdinarySet is OrdinarySetWithOwnDescriptor (§10.1.9.2).

<a id="JSObject.Delete"></a>

```vertex
open func Delete(_ key: value.PropertyKey) throws -> bool
```

<a id="JSObject.OwnPropertyKeys"></a>

```vertex
open func OwnPropertyKeys() throws -> [value.PropertyKey]
```

<a id="JSObject.OrdinaryOwnPropertyKeys"></a>

```vertex
public func OrdinaryOwnPropertyKeys() -> [value.PropertyKey]
```

OrdinaryOwnPropertyKeys orders keys: integer indices ascending, then
strings and then symbols in the order they were added.

<a id="JSObject.Call"></a>

```vertex
open func Call(_ this: Value, _ args: [Value]) throws -> Value
```

Call is [[Call]]; only callable objects have it.

<a id="JSObject.Construct"></a>

```vertex
open func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value
```

Construct is [[Construct]]; only constructors have it.

<a id="JSObject.PrivateFind"></a>

```vertex
public func PrivateFind(_ name: value.Symbol) -> int
```

### typealias Job <a id="typealias-Job"></a>

```vertex
public typealias Job = () throws -> Void
```

Job is a queued microtask (a promise reaction or a host job).

### enum Kind <a id="enum-Kind"></a>

```vertex
public enum Kind: Equatable
```

Kind is what built-in an object is, for the checks the spec makes on
internal slots and for Object.prototype.toString.

#### Cases

<a id="Kind.ordinary"></a>

```vertex
case ordinary
```

<a id="Kind.array"></a>

```vertex
case array
```

<a id="Kind.function"></a>

```vertex
case function
```

<a id="Kind.error"></a>

```vertex
case error
```

<a id="Kind.boolean"></a>

```vertex
case boolean
```

<a id="Kind.number"></a>

```vertex
case number
```

<a id="Kind.string"></a>

```vertex
case string
```

<a id="Kind.symbol"></a>

```vertex
case symbol
```

<a id="Kind.bigint"></a>

```vertex
case bigint
```

<a id="Kind.date"></a>

```vertex
case date
```

<a id="Kind.regexp"></a>

```vertex
case regexp
```

<a id="Kind.arguments"></a>

```vertex
case arguments
```

<a id="Kind.map"></a>

```vertex
case map
```

<a id="Kind.set"></a>

```vertex
case set
```

<a id="Kind.weakMap"></a>

```vertex
case weakMap
```

<a id="Kind.weakSet"></a>

```vertex
case weakSet
```

<a id="Kind.weakRef"></a>

```vertex
case weakRef
```

<a id="Kind.finalizationRegistry"></a>

```vertex
case finalizationRegistry
```

<a id="Kind.promise"></a>

```vertex
case promise
```

<a id="Kind.proxy"></a>

```vertex
case proxy
```

<a id="Kind.arrayBuffer"></a>

```vertex
case arrayBuffer
```

<a id="Kind.sharedArrayBuffer"></a>

```vertex
case sharedArrayBuffer
```

<a id="Kind.dataView"></a>

```vertex
case dataView
```

<a id="Kind.typedArray"></a>

```vertex
case typedArray
```

<a id="Kind.generator"></a>

```vertex
case generator
```

<a id="Kind.asyncGenerator"></a>

```vertex
case asyncGenerator
```

<a id="Kind.iterator"></a>

```vertex
case iterator
```

<a id="Kind.module"></a>

```vertex
case module
```

<a id="Kind.global"></a>

```vertex
case global
```

### typealias NativeFn <a id="typealias-NativeFn"></a>

```vertex
public typealias NativeFn = (Value, [Value], JSObject?) throws -> Value
```

### class NativeFunction <a id="class-NativeFunction"></a>

```vertex
public final class NativeFunction: JSObject
```

NativeFunction is a built-in function object (§10.3).

#### Initializers

<a id="NativeFunction.init"></a>

```vertex
public init(realm: Realm, name: string, length: int, constructor: bool = false, proto: JSObject? = nil, _ fn: @escaping NativeFn)
```

<a id="NativeFunction.init-2"></a>

```vertex
public init(realm: Realm, symbolName: value.Symbol, prefix: string, length: int, _ fn: @escaping NativeFn)
```

#### Properties

<a id="NativeFunction.Realm"></a>

```vertex
public let Realm: Realm
```

<a id="NativeFunction.IsCallable"></a>

```vertex
public override var IsCallable: bool { get }
```

<a id="NativeFunction.IsConstructor"></a>

```vertex
public override var IsConstructor: bool { get }
```

#### Methods

<a id="NativeFunction.Call"></a>

```vertex
public override func Call(_ this: Value, _ args: [Value]) throws -> Value
```

<a id="NativeFunction.Construct"></a>

```vertex
public override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value
```

### class PrivateMethod <a id="class-PrivateMethod"></a>

```vertex
public final class PrivateMethod
```

PrivateMethod is an instance private method or accessor.

#### Initializers

<a id="PrivateMethod.init"></a>

```vertex
public init(name: value.Symbol)
```

#### Properties

<a id="PrivateMethod.Name"></a>

```vertex
public let Name: value.Symbol
```

<a id="PrivateMethod.Method"></a>

```vertex
public var Method: JSObject?
```

<a id="PrivateMethod.Getter"></a>

```vertex
public var Getter: JSObject?
```

<a id="PrivateMethod.Setter"></a>

```vertex
public var Setter: JSObject?
```

### class PromiseCapability <a id="class-PromiseCapability"></a>

```vertex
public final class PromiseCapability
```

PromiseCapability is the spec's PromiseCapability Record (§27.2.1.1).

#### Initializers

<a id="PromiseCapability.init"></a>

```vertex
public init(promise: JSObject, resolve: Value, reject: Value)
```

#### Properties

<a id="PromiseCapability.Promise"></a>

```vertex
public let Promise: JSObject
```

<a id="PromiseCapability.Resolve"></a>

```vertex
public let Resolve: Value
```

<a id="PromiseCapability.Reject"></a>

```vertex
public let Reject: Value
```

### class PromiseObject <a id="class-PromiseObject"></a>

```vertex
public final class PromiseObject: JSObject
```

PromiseObject is a promise instance (§27.2.6).

#### Initializers

<a id="PromiseObject.init"></a>

```vertex
public override init(proto: JSObject?)
```

#### Properties

<a id="PromiseObject.State"></a>

```vertex
public var State: PromiseState = .pending
```

<a id="PromiseObject.Result"></a>

```vertex
public var Result: Value = .undefined
```

<a id="PromiseObject.FulfillReactions"></a>

```vertex
public var FulfillReactions: [PromiseReaction] = []
```

<a id="PromiseObject.RejectReactions"></a>

```vertex
public var RejectReactions: [PromiseReaction] = []
```

<a id="PromiseObject.IsHandled"></a>

```vertex
public var IsHandled: bool = false
```

### class PromiseReaction <a id="class-PromiseReaction"></a>

```vertex
public final class PromiseReaction
```

PromiseReaction is the spec's PromiseReaction Record (§27.2.1.2).

#### Initializers

<a id="PromiseReaction.init"></a>

```vertex
public init(capability: PromiseCapability?, isFulfill: bool, handler: ReactionHandler)
```

#### Properties

<a id="PromiseReaction.Capability"></a>

```vertex
public let Capability: PromiseCapability?
```

<a id="PromiseReaction.IsFulfill"></a>

```vertex
public let IsFulfill: bool
```

<a id="PromiseReaction.Handler"></a>

```vertex
public let Handler: ReactionHandler
```

### enum PromiseState <a id="enum-PromiseState"></a>

```vertex
public enum PromiseState: Equatable
```

#### Cases

<a id="PromiseState.pending"></a>

```vertex
case pending
```

<a id="PromiseState.fulfilled"></a>

```vertex
case fulfilled
```

<a id="PromiseState.rejected"></a>

```vertex
case rejected
```

### struct PropertyDescriptor <a id="struct-PropertyDescriptor"></a>

```vertex
public struct PropertyDescriptor
```

PropertyDescriptor is the spec's Property Descriptor record: every
field may be absent.

#### Initializers

<a id="PropertyDescriptor.init"></a>

```vertex
public init()
```

#### Properties

<a id="PropertyDescriptor.Value"></a>

```vertex
public var Value: Value?
```

<a id="PropertyDescriptor.Writable"></a>

```vertex
public var Writable: bool?
```

<a id="PropertyDescriptor.Get"></a>

```vertex
public var Get: Value?
```

<a id="PropertyDescriptor.Set"></a>

```vertex
public var Set: Value?
```

<a id="PropertyDescriptor.Enumerable"></a>

```vertex
public var Enumerable: bool?
```

<a id="PropertyDescriptor.Configurable"></a>

```vertex
public var Configurable: bool?
```

<a id="PropertyDescriptor.IsAccessor"></a>

```vertex
public var IsAccessor: bool { get }
```

<a id="PropertyDescriptor.IsData"></a>

```vertex
public var IsData: bool { get }
```

<a id="PropertyDescriptor.IsGeneric"></a>

```vertex
public var IsGeneric: bool { get }
```

#### Methods

<a id="PropertyDescriptor.Data"></a>

```vertex
public static func Data(_ v: Value, writable: bool = true, enumerable: bool = true, configurable: bool = true) -> PropertyDescriptor
```

Data makes a complete data descriptor.

<a id="PropertyDescriptor.Accessor"></a>

```vertex
public static func Accessor(get: Value, set: Value, enumerable: bool = false, configurable: bool = true) -> PropertyDescriptor
```

Accessor makes a complete accessor descriptor.

### class ProxyObject <a id="class-ProxyObject"></a>

```vertex
public final class ProxyObject: JSObject
```

ProxyObject is a Proxy exotic object (§10.5). Target and Handler are
nil once revoked.

#### Initializers

<a id="ProxyObject.init"></a>

```vertex
public init(target: JSObject, handler: JSObject)
```

#### Properties

<a id="ProxyObject.Target"></a>

```vertex
public var Target: JSObject?
```

<a id="ProxyObject.Handler"></a>

```vertex
public var Handler: JSObject?
```

<a id="ProxyObject.isOrdinaryLookup"></a>

```vertex
public override var isOrdinaryLookup: bool { get }
```

<a id="ProxyObject.IsCallable"></a>

```vertex
public override var IsCallable: bool { get }
```

<a id="ProxyObject.IsConstructor"></a>

```vertex
public override var IsConstructor: bool { get }
```

#### Methods

<a id="ProxyObject.GetPrototypeOf"></a>

```vertex
public override func GetPrototypeOf() throws -> JSObject?
```

<a id="ProxyObject.SetPrototypeOf"></a>

```vertex
public override func SetPrototypeOf(_ v: JSObject?) throws -> bool
```

<a id="ProxyObject.IsExtensibleObject"></a>

```vertex
public override func IsExtensibleObject() throws -> bool
```

<a id="ProxyObject.PreventExtensions"></a>

```vertex
public override func PreventExtensions() throws -> bool
```

<a id="ProxyObject.GetOwnProperty"></a>

```vertex
public override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?
```

<a id="ProxyObject.DefineOwnProperty"></a>

```vertex
public override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="ProxyObject.HasProperty"></a>

```vertex
public override func HasProperty(_ key: value.PropertyKey) throws -> bool
```

<a id="ProxyObject.Get"></a>

```vertex
public override func Get(_ key: value.PropertyKey, _ receiver: Value) throws -> Value
```

<a id="ProxyObject.Set"></a>

```vertex
public override func Set(_ key: value.PropertyKey, _ v: Value, _ receiver: Value) throws -> bool
```

<a id="ProxyObject.Delete"></a>

```vertex
public override func Delete(_ key: value.PropertyKey) throws -> bool
```

<a id="ProxyObject.OwnPropertyKeys"></a>

```vertex
public override func OwnPropertyKeys() throws -> [value.PropertyKey]
```

<a id="ProxyObject.Call"></a>

```vertex
public override func Call(_ this: Value, _ args: [Value]) throws -> Value
```

<a id="ProxyObject.Construct"></a>

```vertex
public override func Construct(_ args: [Value], _ newTarget: JSObject) throws -> Value
```

### enum ReactionHandler <a id="enum-ReactionHandler"></a>

```vertex
public enum ReactionHandler
```

ReactionHandler is a reaction's handler: a function object, a Vertex
closure (for await and the engine's own jobs), or nothing (pass the
value through).

#### Cases

<a id="ReactionHandler.none"></a>

```vertex
case none
```

<a id="ReactionHandler.function"></a>

```vertex
case function(JSObject)
```

<a id="ReactionHandler.native"></a>

```vertex
case native((Value) throws -> Value)
```

### class Realm <a id="class-Realm"></a>

```vertex
public final class Realm
```

Realm is a realm record (§9.3): a global object, its lexical
declarations, and the intrinsic objects.

#### Initializers

<a id="Realm.init"></a>

```vertex
public init(agent: Agent)
```

#### Properties

<a id="Realm.Agent"></a>

```vertex
public let Agent: Agent
```

<a id="Realm.Engine"></a>

```vertex
public var Engine: Engine? = nil
```

<a id="Realm.Global"></a>

```vertex
public var Global: JSObject
```

<a id="Realm.GlobalLexicals"></a>

```vertex
public var GlobalLexicals: [str.JSString: GlobalBinding] = [:]
```

<a id="Realm.TemplateMap"></a>

```vertex
public var TemplateMap: [int: JSObject] = [:]
```

TemplateMap caches tagged template objects per call site.

<a id="Realm.Intrinsics"></a>

```vertex
public var Intrinsics: [string: JSObject] = [:]
```

Intrinsics holds the intrinsics without a field of their own, by
their spec names without the percent signs ("ThrowTypeError").

<a id="Realm.ObjectPrototype"></a>

```vertex
public let ObjectPrototype: JSObject
```

<a id="Realm.FunctionPrototype"></a>

```vertex
public let FunctionPrototype: JSObject
```

<a id="Realm.ArrayPrototype"></a>

```vertex
public var ArrayPrototype: JSObject
```

<a id="Realm.ErrorPrototype"></a>

```vertex
public var ErrorPrototype: JSObject
```

<a id="Realm.TypeErrorPrototype"></a>

```vertex
public var TypeErrorPrototype: JSObject
```

<a id="Realm.RangeErrorPrototype"></a>

```vertex
public var RangeErrorPrototype: JSObject
```

<a id="Realm.ReferenceErrorPrototype"></a>

```vertex
public var ReferenceErrorPrototype: JSObject
```

<a id="Realm.SyntaxErrorPrototype"></a>

```vertex
public var SyntaxErrorPrototype: JSObject
```

<a id="Realm.EvalErrorPrototype"></a>

```vertex
public var EvalErrorPrototype: JSObject
```

<a id="Realm.URIErrorPrototype"></a>

```vertex
public var URIErrorPrototype: JSObject
```

<a id="Realm.AggregateErrorPrototype"></a>

```vertex
public var AggregateErrorPrototype: JSObject
```

<a id="Realm.StringPrototype"></a>

```vertex
public var StringPrototype: JSObject
```

<a id="Realm.NumberPrototype"></a>

```vertex
public var NumberPrototype: JSObject
```

<a id="Realm.BooleanPrototype"></a>

```vertex
public var BooleanPrototype: JSObject
```

<a id="Realm.SymbolPrototype"></a>

```vertex
public var SymbolPrototype: JSObject
```

<a id="Realm.BigIntPrototype"></a>

```vertex
public var BigIntPrototype: JSObject
```

<a id="Realm.IteratorPrototype"></a>

```vertex
public var IteratorPrototype: JSObject
```

<a id="Realm.AsyncIteratorPrototype"></a>

```vertex
public var AsyncIteratorPrototype: JSObject
```

<a id="Realm.ArrayIteratorPrototype"></a>

```vertex
public var ArrayIteratorPrototype: JSObject
```

<a id="Realm.GeneratorPrototype"></a>

```vertex
public var GeneratorPrototype: JSObject
```

<a id="Realm.AsyncGeneratorPrototype"></a>

```vertex
public var AsyncGeneratorPrototype: JSObject
```

<a id="Realm.GeneratorFunctionPrototype"></a>

```vertex
public var GeneratorFunctionPrototype: JSObject
```

<a id="Realm.AsyncFunctionPrototype"></a>

```vertex
public var AsyncFunctionPrototype: JSObject
```

<a id="Realm.AsyncGeneratorFunctionPrototype"></a>

```vertex
public var AsyncGeneratorFunctionPrototype: JSObject
```

<a id="Realm.AsyncFromSyncIteratorPrototype"></a>

```vertex
public var AsyncFromSyncIteratorPrototype: JSObject
```

<a id="Realm.PromisePrototype"></a>

```vertex
public var PromisePrototype: JSObject
```

<a id="Realm.RegExpPrototype"></a>

```vertex
public var RegExpPrototype: JSObject
```

<a id="Realm.DatePrototype"></a>

```vertex
public var DatePrototype: JSObject
```

<a id="Realm.MapPrototype"></a>

```vertex
public var MapPrototype: JSObject
```

<a id="Realm.SetPrototype"></a>

```vertex
public var SetPrototype: JSObject
```

<a id="Realm.ObjectConstructor"></a>

```vertex
public var ObjectConstructor: JSObject? = nil
```

<a id="Realm.FunctionConstructor"></a>

```vertex
public var FunctionConstructor: JSObject? = nil
```

<a id="Realm.ArrayConstructor"></a>

```vertex
public var ArrayConstructor: JSObject? = nil
```

<a id="Realm.PromiseConstructor"></a>

```vertex
public var PromiseConstructor: JSObject? = nil
```

<a id="Realm.RegExpConstructor"></a>

```vertex
public var RegExpConstructor: JSObject? = nil
```

<a id="Realm.EvalFunction"></a>

```vertex
public var EvalFunction: JSObject? = nil
```

<a id="Realm.ThrowTypeError"></a>

```vertex
public var ThrowTypeError: JSObject? = nil
```

<a id="Realm.CreateRegExp"></a>

```vertex
public var CreateRegExp: ((str.JSString, str.JSString) throws -> JSObject)? = nil
```

CreateRegExp is installed by the RegExp built-in so the interpreter
can make regular expression literals.

#### Methods

<a id="Realm.Function"></a>

```vertex
public func Function(_ name: string, _ length: int, _ fn: @escaping NativeFn) -> NativeFunction
```

Function makes a built-in function.

<a id="Realm.SelfHosted"></a>

```vertex
public func SelfHosted(_ source: string, _ helpers: [Value]) throws -> JSObject
```

SelfHosted makes a built-in written in JavaScript. source is a
function expression, a factory, called once with helpers (native
functions standing in for the spec's abstract operations) and
returning the built-in. It runs while the realm is made, before any
script, so what it captures is the intrinsics, not what a script
may later put in their place. Like a native function, the result
shows no source.

<a id="Realm.Method"></a>

```vertex
public func Method(_ on: JSObject, _ name: string, _ length: int, _ fn: @escaping NativeFn)
```

Method defines a built-in method on an object: writable,
configurable, not enumerable.

<a id="Realm.SymbolMethod"></a>

```vertex
public func SymbolMethod(_ on: JSObject, _ sym: value.Symbol, _ length: int, writable: bool = true, configurable: bool = true, _ fn: @escaping NativeFn)
```

SymbolMethod defines a method keyed by a well-known symbol.

<a id="Realm.Getter"></a>

```vertex
public func Getter(_ on: JSObject, _ key: value.PropertyKey, _ fn: @escaping NativeFn)
```

Getter defines a built-in accessor with only a getter.

<a id="Realm.Accessor"></a>

```vertex
public func Accessor(_ on: JSObject, _ name: string, get: @escaping NativeFn, set: @escaping NativeFn)
```

Accessor defines a built-in accessor pair.

<a id="Realm.Constructor"></a>

```vertex
public func Constructor(_ name: string, _ length: int, prototype: JSObject, global: bool = true, _ fn: @escaping NativeFn) -> NativeFunction
```

Constructor makes a built-in constructor with its prototype object
and defines it on the global object.

<a id="Realm.DefineGlobal"></a>

```vertex
public func DefineGlobal(_ name: string, _ v: Value)
```

Value defines a global value property.

### struct Slot <a id="struct-Slot"></a>

```vertex
public struct Slot
```

Slot is one stored property.

#### Initializers

<a id="Slot.init"></a>

```vertex
public init(value: Value, flags: uint8)
```

#### Properties

<a id="Slot.Value"></a>

```vertex
public var Value: Value
```

<a id="Slot.Getter"></a>

```vertex
public var Getter: JSObject?
```

<a id="Slot.Setter"></a>

```vertex
public var Setter: JSObject?
```

<a id="Slot.Flags"></a>

```vertex
public var Flags: uint8
```

<a id="Slot.Writable"></a>

```vertex
public var Writable: bool { get }
```

<a id="Slot.Enumerable"></a>

```vertex
public var Enumerable: bool { get }
```

<a id="Slot.Configurable"></a>

```vertex
public var Configurable: bool { get }
```

<a id="Slot.IsAccessor"></a>

```vertex
public var IsAccessor: bool { get }
```

<a id="Slot.Descriptor"></a>

```vertex
public var Descriptor: PropertyDescriptor { get }
```

### class StringObject <a id="class-StringObject"></a>

```vertex
public final class StringObject: JSObject
```

StringObject is a String exotic object (§10.4.3): its code units are
read-only indexed properties.

#### Initializers

<a id="StringObject.init"></a>

```vertex
public init(_ s: str.JSString, proto: JSObject?)
```

#### Properties

<a id="StringObject.Str"></a>

```vertex
public let Str: str.JSString
```

<a id="StringObject.isOrdinaryLookup"></a>

```vertex
public override var isOrdinaryLookup: bool { get }
```

#### Methods

<a id="StringObject.GetOwnProperty"></a>

```vertex
public override func GetOwnProperty(_ key: value.PropertyKey) throws -> PropertyDescriptor?
```

<a id="StringObject.DefineOwnProperty"></a>

```vertex
public override func DefineOwnProperty(_ key: value.PropertyKey, _ desc: PropertyDescriptor) throws -> bool
```

<a id="StringObject.OwnPropertyKeys"></a>

```vertex
public override func OwnPropertyKeys() throws -> [value.PropertyKey]
```

### enum Value <a id="enum-Value"></a>

```vertex
public enum Value
```

Value is an ECMAScript language value (§6.1).

#### Cases

<a id="Value.undefined"></a>

```vertex
case undefined
```

<a id="Value.null"></a>

```vertex
case null
```

<a id="Value.bool"></a>

```vertex
case bool(bool)
```

<a id="Value.number"></a>

```vertex
case number(float64)
```

<a id="Value.string"></a>

```vertex
case string(str.JSString)
```

<a id="Value.symbol"></a>

```vertex
case symbol(value.Symbol)
```

<a id="Value.bigint"></a>

```vertex
case bigint(value.BigInt)
```

<a id="Value.object"></a>

```vertex
case object(JSObject)
```

<a id="Value.empty"></a>

```vertex
case empty
```

empty is the engine's own marker, never a language value: an
uninitialized binding (the temporal dead zone) or an array hole.

#### Properties

<a id="Value.True"></a>

```vertex
public static let True = Value.bool(true)
```

<a id="Value.False"></a>

```vertex
public static let False = Value.bool(false)
```

<a id="Value.Zero"></a>

```vertex
public static let Zero = Value.number(0)
```

<a id="Value.IsUndefined"></a>

```vertex
public var IsUndefined: bool { get }
```

<a id="Value.IsNull"></a>

```vertex
public var IsNull: bool { get }
```

<a id="Value.IsNullish"></a>

```vertex
public var IsNullish: bool { get }
```

<a id="Value.IsEmpty"></a>

```vertex
public var IsEmpty: bool { get }
```

<a id="Value.IsObject"></a>

```vertex
public var IsObject: bool { get }
```

<a id="Value.AsObject"></a>

```vertex
public var AsObject: JSObject? { get }
```

<a id="Value.IsString"></a>

```vertex
public var IsString: bool { get }
```

<a id="Value.IsNumber"></a>

```vertex
public var IsNumber: bool { get }
```

<a id="Value.IsCallable"></a>

```vertex
public var IsCallable: bool { get }
```

<a id="Value.IsConstructor"></a>

```vertex
public var IsConstructor: bool { get }
```

<a id="Value.TypeOf"></a>

```vertex
public var TypeOf: string { get }
```

TypeOf is the typeof operator's answer.

<a id="Value.Truthy"></a>

```vertex
public var Truthy: bool { get }
```

ToBoolean (§7.1.2).

#### Methods

<a id="Value.Str"></a>

```vertex
public static func Str(_ s: string) -> Value
```

<a id="Value.Name"></a>

```vertex
public static func Name(_ s: string) -> Value
```

<a id="Value.Int"></a>

```vertex
public static func Int(_ i: int) -> Value
```

## Files

- array.vs
- function.vs
- iterator.vs
- object.vs
- ops.vs
- promise.vs
- proxy.vs
- realm.vs
- value.vs
