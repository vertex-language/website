/**
 * Token kinds emitted by the Vertex language highlighter,
 * aligned with the formal vscode-vertex grammar specification (.vs files).
 */
export enum TokenType {
  // Declarations & Structural
  Keyword = "keyword", // func, let, var, struct, class, enum, protocol, actor, extension, typealias, associatedtype
  Package = "package", // package
  Import = "import", // import

  // Flow & Statements
  ControlKeyword = "control-keyword", // if, else, guard, switch, case, default, for, in, while, repeat, return, throw, defer, break, continue, fallthrough, catch, do

  // Contextual modifiers & effects
  ContextualKeyword = "contextual-keyword", // mutating, nonmutating, lazy, weak, unowned, convenience, required, dynamic, final, override, indirect, open, isolated
  EffectKeyword = "effect-keyword", // async, await, throws, rethrows, reasync
  ExecutionModifier = "execution-modifier", // kernel, graph (Vertex accelerated compute)

  // Types
  PredefinedType = "predefined-type", // int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, float, float32, double, float64, bool, char, string, void, never, any
  TypeName = "type-name", // Capitalized types: Int, String, Float, AsyncStream, Worker, Point, Task, Tensor, Buffer

  // Symbols & Call sites
  FunctionName = "function-name", // Declared function name
  FunctionCall = "function-call", // Invocation name
  ArgumentLabel = "argument-label", // External parameter label or argument name (e.g. `prompt:`, `device:`, `by factor:`)
  ParameterName = "parameter-name", // Local parameter name
  Member = "member", // Member access / property / enum case (.gpu, .text, .count)
  Namespace = "namespace", // Package name, imported module alias
  Identifier = "identifier", // General identifiers

  // Special identifiers
  Self = "self", // self, super, Self
  DollarIdentifier = "dollar-identifier", // $0, $1, $value
  BlankIdentifier = "blank-identifier", // _

  // Literals & Constants
  Number = "number", // 42, 0.7, 0x1F, 1_000.5e-3
  String = "string", // "...", """..."""
  RawString = "raw-string", // #"..."#
  Char = "char", // 'c'
  StringInterpolation = "string-interpolation", // \( and \)
  RegExp = "regexp", // /.../ or #/.../#
  Boolean = "boolean", // true, false
  Nil = "nil", // nil

  // Directives & Metadata
  Directive = "directive", // #if, #else, #available, #warning, #error, etc.
  Attribute = "attribute", // @inlinable, @testable, @escaping, etc.

  // Operators & Delimiters
  Operator = "operator", // ->, ??, ==, !=, <=, >=, &&, ||, =, +, -, *, /, ...
  Punctuator = "punctuator", // (, ), [, ], {, }, comma, colon, semicolon, dot

  // Comments
  LineComment = "line-comment", // // ...
  DocComment = "doc-comment", // /// ...
  BlockComment = "block-comment", // /* ... */
  CommentTag = "comment-tag", // TODO, MARK, FIXME
  Hashbang = "hashbang", // #!...

  // Whitespace & Special
  Whitespace = "whitespace",
  Invalid = "invalid",

  // --- Markup & VSX tokens (aligned with vscode-vertex source.vtx.vsx) ---
  VsxTag = "vsx-tag", // HTML elements: div, span, button, p, etc.
  VsxComponent = "vsx-component", // UI components: Counter, app.Window, Theme.Card
  VsxAttribute = "vsx-attribute", // Attributes: title, data-p, done, id, class
  VsxEvent = "vsx-event", // Events: onClick, onChange, onSubmit
  VsxNamespace = "vsx-namespace", // Namespace prefixes: class, style
  VsxTagPunctuation = "vsx-tag-punctuation", // <, >, />, </
  VsxEntity = "vsx-entity", // &lt;, &gt;, &amp;, etc.
  VsxSpread = "vsx-spread", // ... in {...attrs}
  VsxText = "vsx-text", // Children text between tags: "Clicked ", " times"

  // --- Stylesheet & VSS tokens (aligned with vscode-vertex source.vss) ---
  CssSelector = "css-selector", // .class, #id, tag, pseudo-classes
  CssProperty = "css-property", // display, color, margin, padding
  CssCustomProperty = "css-custom-property", // --kit-accent, --theme-bg
  CssAtRule = "css-at-rule", // @media, @layer, @scope, @property
  CssUnit = "css-unit", // px, rem, em, %, ms, s, deg

  // --- Aliases for backwards compatibility ---
  Tag = "vsx-tag",
  Component = "vsx-component",
  LiteralKeyword = "literal-keyword",
  PredeclaredType = "predeclared-type",
  TensorType = "tensor-type",
  Constraint = "constraint",
  ReservedBuiltin = "reserved-builtin",
  Decorator = "decorator",
  PrivateIdentifier = "private-identifier",
  Template = "template",
  Punctuation = "punctuation",
  Unknown = "unknown",
}

export interface Token {
  type: TokenType;
  /** Exact source slice. `tokens.map(t => t.value).join("") === input`. */
  value: string;
  /** Inclusive start offset into the source string. */
  start: number;
  /** Exclusive end offset into the source string. */
  end: number;
  /** Line number (1-based) where the token starts. */
  line?: number;
  /** Column number (1-based) where the token starts. */
  column?: number;
}
