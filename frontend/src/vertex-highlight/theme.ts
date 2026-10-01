import { TokenType } from "./tokenTypes";

/**
 * Palette configuration for Vertex syntax highlighting.
 * Every key is optional and will fall back to `defaultTheme`.
 */
export interface VertexTheme extends Partial<Record<TokenType, string>> {
  /** Background of the outer code block. */
  background?: string;
  /** Gutter line numbers colour. */
  lineNumber?: string;
}

/**
 * Fresh Modern Light Flow for Vertex.
 * Designed with deliberate semantic contrast and balanced chromatic rhythm:
 * - Control & Flow: Refined Amethyst Violet (#7C3AED)
 * - Declarations & Storage: Clear Royal Sapphire (#2563EB)
 * - Effects & Ownership: Modern Indigo (#4F46E5)
 * - Accelerated Compute: Electric Cyber Teal (#0D9488)
 * - Types (Core & Primitive): Deep Oceanic Cyan (#0891B2)
 * - Functions & Invocations: Warm Luminous Amber (#B45309 / #D97706)
 * - Argument Labels: Warm Terracotta Sienna (#C2410C)
 * - Member Access & Properties: Vivid Sky (#0284C7)
 * - Strings & Characters: Crisp Forest Emerald (#15803D)
 * - Numbers & Booleans: Sunset Orange (#EA580C)
 * - Directives & Attributes: Vivid Magenta (#A21CAF)
 * - Comments: Elegant Muted Warm Slate (#71717A)
 * - Delimiters & Operators: Soft Neutral Charcoal (#4B5563 / #6B7280)
 */
export const vertexFreshLightTheme: VertexTheme = {
  background: "transparent",
  lineNumber: "#A1A1AA",

  // Flow & Statements
  [TokenType.ControlKeyword]: "#7C3AED",

  // Declarations & Structural
  [TokenType.Keyword]: "#2563EB",
  [TokenType.Package]: "#2563EB",
  [TokenType.Import]: "#2563EB",

  // Modifiers & Effects
  [TokenType.EffectKeyword]: "#4F46E5",
  [TokenType.ContextualKeyword]: "#4F46E5",

  // Accelerated Compute (Vertex superpower)
  [TokenType.ExecutionModifier]: "#0D9488",

  // Types
  [TokenType.PredefinedType]: "#0891B2",
  [TokenType.TypeName]: "#0891B2",

  // Functions & Methods
  [TokenType.FunctionName]: "#B45309",
  [TokenType.FunctionCall]: "#D97706",

  // Parameters & Members
  [TokenType.ArgumentLabel]: "#C2410C",
  [TokenType.ParameterName]: "#374151",
  [TokenType.Member]: "#0284C7",
  [TokenType.Namespace]: "#1E293B",

  // Literals & Constants
  [TokenType.String]: "#15803D",
  [TokenType.RawString]: "#15803D",
  [TokenType.Char]: "#15803D",
  [TokenType.StringInterpolation]: "#7C3AED",
  [TokenType.Number]: "#EA580C",
  [TokenType.Boolean]: "#EA580C",
  [TokenType.Nil]: "#EA580C",

  // Directives & Attributes
  [TokenType.Directive]: "#A21CAF",
  [TokenType.Attribute]: "#A21CAF",

  // Identifiers & Variables
  [TokenType.Self]: "#9333EA",
  [TokenType.DollarIdentifier]: "#9333EA",
  [TokenType.BlankIdentifier]: "#71717A",
  [TokenType.Identifier]: "#18181B",

  // Syntax & Comments
  [TokenType.Operator]: "#4B5563",
  [TokenType.Punctuator]: "#6B7280",
  [TokenType.LineComment]: "#71717A",
  [TokenType.DocComment]: "#52525B",
  [TokenType.BlockComment]: "#71717A",
  [TokenType.CommentTag]: "#DC2626",
  [TokenType.Hashbang]: "#71717A",
  [TokenType.RegExp]: "#16A34A",
  [TokenType.Whitespace]: "inherit",
  [TokenType.Invalid]: "#DC2626",

  // Markup & VSX
  [TokenType.VsxTag]: "#0284C7",
  [TokenType.VsxComponent]: "#0891B2",
  [TokenType.VsxAttribute]: "#9333EA",
  [TokenType.VsxEvent]: "#D97706",
  [TokenType.VsxNamespace]: "#4F46E5",
  [TokenType.VsxTagPunctuation]: "#6B7280",
  [TokenType.VsxEntity]: "#15803D",
  [TokenType.VsxSpread]: "#4F46E5",
  [TokenType.VsxText]: "#18181B",

  // Stylesheet & VSS
  [TokenType.CssSelector]: "#7C3AED",
  [TokenType.CssProperty]: "#0284C7",
  [TokenType.CssCustomProperty]: "#0D9488",
  [TokenType.CssAtRule]: "#A21CAF",
  [TokenType.CssUnit]: "#EA580C",

  // Backwards compatibility aliases
  [TokenType.LiteralKeyword]: "#EA580C",
  [TokenType.PredeclaredType]: "#0891B2",
  [TokenType.TensorType]: "#0891B2",
  [TokenType.Constraint]: "#4F46E5",
  [TokenType.ReservedBuiltin]: "#2563EB",
  [TokenType.Decorator]: "#A21CAF",
  [TokenType.PrivateIdentifier]: "#18181B",
  [TokenType.Template]: "#15803D",
  [TokenType.Punctuation]: "#6B7280",
  [TokenType.Unknown]: "#DC2626",
};

/**
 * Fresh Modern Dark Flow for Vertex.
 */
export const vertexFreshDarkTheme: VertexTheme = {
  background: "#0F172A",
  lineNumber: "#64748B",

  [TokenType.ControlKeyword]: "#C084FC",
  [TokenType.Keyword]: "#60A5FA",
  [TokenType.Package]: "#60A5FA",
  [TokenType.Import]: "#60A5FA",
  [TokenType.EffectKeyword]: "#818CF8",
  [TokenType.ContextualKeyword]: "#818CF8",
  [TokenType.ExecutionModifier]: "#2DD4BF",
  [TokenType.PredefinedType]: "#38BDF8",
  [TokenType.TypeName]: "#38BDF8",
  [TokenType.FunctionName]: "#FCD34D",
  [TokenType.FunctionCall]: "#FBBF24",
  [TokenType.ArgumentLabel]: "#FB923C",
  [TokenType.ParameterName]: "#E2E8F0",
  [TokenType.Member]: "#38BDF8",
  [TokenType.Namespace]: "#F1F5F9",
  [TokenType.String]: "#4ADE80",
  [TokenType.RawString]: "#4ADE80",
  [TokenType.Char]: "#4ADE80",
  [TokenType.StringInterpolation]: "#C084FC",
  [TokenType.Number]: "#FB923C",
  [TokenType.Boolean]: "#FB923C",
  [TokenType.Nil]: "#FB923C",
  [TokenType.Directive]: "#F472B6",
  [TokenType.Attribute]: "#F472B6",
  [TokenType.Self]: "#C084FC",
  [TokenType.DollarIdentifier]: "#C084FC",
  [TokenType.BlankIdentifier]: "#94A3B8",
  [TokenType.Identifier]: "#F8FAFC",
  [TokenType.Operator]: "#94A3B8",
  [TokenType.Punctuator]: "#64748B",
  [TokenType.LineComment]: "#94A3B8",
  [TokenType.DocComment]: "#CBD5E1",
  [TokenType.BlockComment]: "#94A3B8",
  [TokenType.CommentTag]: "#F87171",
  [TokenType.Hashbang]: "#94A3B8",
  [TokenType.RegExp]: "#4ADE80",
  [TokenType.Whitespace]: "inherit",
  [TokenType.Invalid]: "#F87171",

  // Markup & VSX
  [TokenType.VsxTag]: "#38BDF8",
  [TokenType.VsxComponent]: "#22D3EE",
  [TokenType.VsxAttribute]: "#C084FC",
  [TokenType.VsxEvent]: "#FBBF24",
  [TokenType.VsxNamespace]: "#818CF8",
  [TokenType.VsxTagPunctuation]: "#94A3B8",
  [TokenType.VsxEntity]: "#4ADE80",
  [TokenType.VsxSpread]: "#818CF8",
  [TokenType.VsxText]: "#F1F5F9",

  // Stylesheet & VSS
  [TokenType.CssSelector]: "#C084FC",
  [TokenType.CssProperty]: "#38BDF8",
  [TokenType.CssCustomProperty]: "#2DD4BF",
  [TokenType.CssAtRule]: "#F472B6",
  [TokenType.CssUnit]: "#FB923C",

  // Aliases
  [TokenType.LiteralKeyword]: "#FB923C",
  [TokenType.PredeclaredType]: "#38BDF8",
  [TokenType.TensorType]: "#38BDF8",
  [TokenType.Constraint]: "#818CF8",
  [TokenType.ReservedBuiltin]: "#60A5FA",
  [TokenType.Decorator]: "#F472B6",
  [TokenType.PrivateIdentifier]: "#F8FAFC",
  [TokenType.Template]: "#4ADE80",
  [TokenType.Punctuation]: "#64748B",
  [TokenType.Unknown]: "#F87171",
};

/** Default theme is the fresh light flow */
export const defaultTheme: VertexTheme = vertexFreshLightTheme;

/** Resolves partial themes with fallback to defaults and alias synchronization */
export function resolveTheme(theme?: VertexTheme): VertexTheme {
  const base: VertexTheme = { ...defaultTheme, ...(theme ?? {}) };

  if (theme) {
    if (theme[TokenType.Decorator] && !theme[TokenType.Attribute]) {
      base[TokenType.Attribute] = theme[TokenType.Decorator];
    }
    if (theme[TokenType.Attribute] && !theme[TokenType.Decorator]) {
      base[TokenType.Decorator] = theme[TokenType.Attribute];
    }
    if (theme[TokenType.Punctuation] && !theme[TokenType.Punctuator]) {
      base[TokenType.Punctuator] = theme[TokenType.Punctuation];
    }
    if (theme[TokenType.Punctuator] && !theme[TokenType.Punctuation]) {
      base[TokenType.Punctuation] = theme[TokenType.Punctuator];
    }
    if (theme[TokenType.PredeclaredType] && !theme[TokenType.PredefinedType]) {
      base[TokenType.PredefinedType] = theme[TokenType.PredeclaredType];
    }
    if (theme[TokenType.PredefinedType] && !theme[TokenType.PredeclaredType]) {
      base[TokenType.PredeclaredType] = theme[TokenType.PredefinedType];
    }
    if (theme[TokenType.Template] && !theme[TokenType.StringInterpolation]) {
      base[TokenType.StringInterpolation] = theme[TokenType.Template];
    }
    if (theme[TokenType.Unknown] && !theme[TokenType.Invalid]) {
      base[TokenType.Invalid] = theme[TokenType.Unknown];
    }
    if (theme[TokenType.PrivateIdentifier] && !theme[TokenType.DollarIdentifier]) {
      base[TokenType.DollarIdentifier] = theme[TokenType.PrivateIdentifier];
    }
  }

  return base;
}
