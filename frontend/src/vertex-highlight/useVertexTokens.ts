import { useMemo } from "react";
import { Token } from "./tokenTypes";
import { tokenize } from "./tokenizer";
import { contextualize } from "./contextualize";

/**
 * React hook that tokenizes and contextualizes Vertex source code,
 * memoized on the input string and file extension (.vs, .vsx, .vss).
 */
export function useVertexTokens(code: string, extension: string = ".vs"): Token[] {
  return useMemo(() => contextualize(tokenize(code, extension)), [code, extension]);
}
