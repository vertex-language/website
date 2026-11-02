/**
 * Word lists, symbol tables, and constants directly matching
 * the official vscode-vertex grammar (syntaxes/vertex.tmLanguage.json
 * and scripts/vertex.py).
 */

/** Control flow statements and error handling */
export const CONTROL_KEYWORDS: ReadonlySet<string> = new Set([
  "if", "else", "guard", "switch", "case", "default", "for", "in",
  "while", "repeat", "do", "break", "continue", "fallthrough",
  "return", "throw", "defer", "catch", "where",
]);

/** Declaration and structural keywords */
export const DECLARATION_KEYWORDS: ReadonlySet<string> = new Set([
  "func", "var", "let", "struct", "class", "enum", "protocol",
  "extension", "typealias", "associatedtype", "init", "deinit",
  "subscript", "operator", "precedencegroup", "import", "actor", "macro",
]);

/** Access level modifiers */
export const ACCESS_MODIFIERS: ReadonlySet<string> = new Set([
  "public", "private", "fileprivate", "internal",
]);

/** Contextual modifiers */
export const CONTEXTUAL_MODIFIERS: ReadonlySet<string> = new Set([
  "open", "package", "mutating", "nonmutating", "lazy", "weak",
  "unowned", "convenience", "required", "dynamic", "final", "override",
  "indirect", "optional", "nonisolated", "distributed", "infix",
  "prefix", "postfix", "borrowing", "consuming", "__consuming",
  "_const", "_local", "isolated", "sending", "inout", "__shared", "__owned",
]);

/** Effect modifiers */
export const EFFECT_KEYWORDS: ReadonlySet<string> = new Set([
  "async", "await", "throws", "rethrows", "reasync",
]);

/** Vertex accelerated compute modifiers (§3.4 execution modifier) */
export const EXECUTION_MODIFIERS: ReadonlySet<string> = new Set([
  "kernel", "graph",
]);

/** Built-in primitive types (lowercase Vertex dialect) */
export const PRIMITIVE_TYPES: ReadonlySet<string> = new Set([
  "bool", "char", "string", "void", "never",
  "int", "int8", "int16", "int32", "int64",
  "uint", "uint8", "uint16", "uint32", "uint64",
  "float", "float32", "double", "float64", "any", "vsx",
]);

/** Core standard library & compute types */
export const CORE_TYPES: ReadonlySet<string> = new Set([
  "Int", "Int8", "Int16", "Int32", "Int64",
  "UInt", "UInt8", "UInt16", "UInt32", "UInt64",
  "Float", "Float32", "Float64", "Double",
  "Bool", "String", "Character", "Substring",
  "Array", "Dictionary", "Set", "Optional", "Result", "Never", "Void", "Error",
  "Sendable", "Equatable", "Hashable", "Comparable", "Codable", "Encodable", "Decodable", "Identifiable",
  "Sequence", "Collection", "BidirectionalCollection", "RandomAccessCollection", "MutableCollection",
  "RangeReplaceableCollection", "IteratorProtocol", "Range", "ClosedRange", "StaticString",
  "UnsafePointer", "UnsafeMutablePointer", "UnsafeRawPointer", "UnsafeMutableRawPointer",
  "UnsafeBufferPointer", "UnsafeMutableBufferPointer", "UnsafeRawBufferPointer", "UnsafeMutableRawBufferPointer",
  "OpaquePointer", "AnyObject", "AnyHashable", "Task", "CustomStringConvertible", "Numeric",
  "BinaryInteger", "FixedWidthInteger", "SignedInteger", "UnsignedInteger", "FloatingPoint",
  "BinaryFloatingPoint", "ExpressibleByIntegerLiteral", "ExpressibleByStringLiteral",
  "ExpressibleByArrayLiteral", "Copyable", "Escapable",
  // Vertex compute & concurrency additions
  "AsyncStream", "Span", "MutableSpan", "buffer", "tensor", "Channel", "Promise",
  // Vertex UI & component types
  "View", "Component",
]);

/** Predefined types combination */
export const PREDEFINED_TYPES: ReadonlySet<string> = new Set([
  ...PRIMITIVE_TYPES,
  ...CORE_TYPES,
]);

/** Boolean & nil literals */
export const LITERAL_KEYWORDS: ReadonlySet<string> = new Set([
  "true", "false", "nil",
]);

/** Language variables */
export const SPECIAL_IDENTIFIERS: ReadonlySet<string> = new Set([
  "self", "super", "Self",
]);

/** Property and subscript accessors */
export const ACCESSORS: ReadonlySet<string> = new Set([
  "get", "set", "willSet", "didSet", "_read", "_modify",
  "unsafeAddress", "unsafeMutableAddress",
]);

/** Directives and pound words */
export const POUND_WORDS: ReadonlySet<string> = new Set([
  "available", "unavailable", "selector", "keyPath", "sourceLocation",
  "file", "fileID", "filePath", "line", "column", "function", "dsohandle",
  "colorLiteral", "fileLiteral", "imageLiteral", "if", "elseif", "else", "endif",
  "error", "warning",
]);

/** Supported compiler condition identifiers */
export const CONDITIONS: ReadonlySet<string> = new Set([
  "os", "arch", "canImport", "targetEnvironment", "swift", "compiler",
  "hasFeature", "hasAttribute", "_endian", "_pointerBitWidth", "_runtime",
  "_ptrauth", "_hasAtomicBitWidth", "_compiler_version",
]);

/** Target platforms in #available */
export const PLATFORMS: ReadonlySet<string> = new Set([
  "macOS", "macOSApplicationExtension", "iOS", "iOSApplicationExtension",
  "tvOS", "watchOS", "visionOS", "macCatalyst", "Linux", "Windows",
  "Android", "FreeBSD", "OpenBSD", "WASI", "Cygwin", "Haiku",
]);

/** All reserved words for lookup */
export const RESERVED_WORDS: ReadonlySet<string> = new Set([
  ...CONTROL_KEYWORDS,
  ...DECLARATION_KEYWORDS,
  ...ACCESS_MODIFIERS,
  "package", "as", "is", "try", "await", "some", "any",
  "self", "super", "Self", "nil", "true", "false", "where",
  "consume", "copy", "discard", "yield",
]);

export function isReserved(word: string): boolean {
  return RESERVED_WORDS.has(word);
}

export const POUND_DIRECTIVES: ReadonlySet<string> = new Set(
  Array.from(POUND_WORDS).map(w => `#${w}`)
);

export const CONTEXTUAL_KEYWORDS: ReadonlySet<string> = new Set([
  ...CONTEXTUAL_MODIFIERS,
  ...EFFECT_KEYWORDS,
  ...EXECUTION_MODIFIERS,
  ...ACCESSORS,
  "some", "any", "consume", "copy", "discard", "yield",
  "higherThan", "lowerThan", "associativity", "assignment", "each",
]);
