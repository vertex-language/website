export { TokenType } from "./tokenTypes";
export type { Token } from "./tokenTypes";

export { tokenize, tokenizeVs, tokenizeVss, resolveFileType } from "./tokenizer";
export type { VertexFileType } from "./tokenizer";
export { contextualize } from "./contextualize";

export {
  CONTROL_KEYWORDS,
  DECLARATION_KEYWORDS,
  ACCESS_MODIFIERS,
  CONTEXTUAL_MODIFIERS,
  EFFECT_KEYWORDS,
  EXECUTION_MODIFIERS,
  PRIMITIVE_TYPES,
  CORE_TYPES,
  PREDEFINED_TYPES,
  LITERAL_KEYWORDS,
  SPECIAL_IDENTIFIERS,
  POUND_WORDS,
  POUND_DIRECTIVES,
  RESERVED_WORDS,
  isReserved,
} from "./keywords";

export {
  defaultTheme,
  vertexFreshLightTheme,
  vertexFreshDarkTheme,
  resolveTheme,
} from "./theme";
export type { VertexTheme } from "./theme";

export { useVertexTokens } from "./useVertexTokens";
export { VertexCode } from "./VertexCode";
export type { VertexCodeProps } from "./VertexCode";
