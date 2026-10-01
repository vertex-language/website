import { Token, TokenType } from "./tokenTypes";
import {
  PRIMITIVE_TYPES,
  CORE_TYPES,
  CONTEXTUAL_MODIFIERS,
  EFFECT_KEYWORDS,
  EXECUTION_MODIFIERS,
  ACCESS_MODIFIERS,
  ACCESSORS,
  PLATFORMS,
  CONDITIONS,
} from "./keywords";

/**
 * Contextual pass over the token stream that classifies tokens into their
 * exact grammatical roles matching the vscode-vertex TextMate grammar.
 */
export function contextualize(tokens: readonly Token[]): Token[] {
  const out = tokens.map(t => ({ ...t }));
  const len = out.length;

  // Filter significant token indices (ignoring whitespace and comments)
  const sigIndices: number[] = [];
  for (let i = 0; i < len; i++) {
    if (isSignificant(out[i])) {
      sigIndices.push(i);
    }
  }

  const sigLen = sigIndices.length;
  const getSig = (s: number): Token | null =>
    s >= 0 && s < sigLen ? out[sigIndices[s]] : null;
  const getSigIndex = (s: number): number =>
    s >= 0 && s < sigLen ? sigIndices[s] : -1;

  for (let s = 0; s < sigLen; s++) {
    const rawIdx = sigIndices[s];
    const tok = out[rawIdx];

    // Skip already classified VSX and VSS tokens
    if (
      tok.type === TokenType.VsxTag ||
      tok.type === TokenType.VsxComponent ||
      tok.type === TokenType.VsxAttribute ||
      tok.type === TokenType.VsxEvent ||
      tok.type === TokenType.VsxNamespace ||
      tok.type === TokenType.VsxTagPunctuation ||
      tok.type === TokenType.VsxEntity ||
      tok.type === TokenType.VsxSpread ||
      tok.type === TokenType.VsxText ||
      tok.type === TokenType.CssSelector ||
      tok.type === TokenType.CssProperty ||
      tok.type === TokenType.CssCustomProperty ||
      tok.type === TokenType.CssAtRule ||
      tok.type === TokenType.CssUnit
    ) {
      continue;
    }

    const prev = getSig(s - 1);
    const prev2 = getSig(s - 2);
    const next = getSig(s + 1);
    const next2 = getSig(s + 2);

    // 1. Package declarations: `package http`
    if (tok.type === TokenType.Package) {
      if (next && isIdentOrKeyword(next) && (!next2 || next2.value !== "(")) {
        // `package name`
        const nextIdx = sigIndices[s + 1];
        out[nextIdx] = { ...next, type: TokenType.Namespace };
        continue;
      } else {
        // `package func` or `package(set)` -> access modifier
        out[rawIdx] = { ...tok, type: TokenType.ContextualKeyword };
        continue;
      }
    }

    // 2. Import declarations: `import "net/tcp"`, `import geom "./geom"`, `import Foundation`
    if (tok.type === TokenType.Import) {
      let lookAhead = s + 1;
      let target = getSig(lookAhead);

      // Multiple imports inside parentheses: `import ( "a" \n q "b" )`
      if (target && target.value === "(") {
        let cur = lookAhead + 1;
        while (cur < sigLen) {
          const t = getSig(cur);
          if (!t || t.value === ")") break;
          const tNext = getSig(cur + 1);
          if (
            (t.type === TokenType.Identifier || t.type === TokenType.TypeName) &&
            tNext &&
            (tNext.type === TokenType.String || tNext.type === TokenType.RawString)
          ) {
            out[getSigIndex(cur)] = { ...t, type: TokenType.Namespace };
            cur += 2;
            continue;
          }
          cur++;
        }
        continue;
      }

      if (target && (target.type === TokenType.Identifier || target.type === TokenType.TypeName)) {
        const afterTarget = getSig(lookAhead + 1);
        if (afterTarget && (afterTarget.type === TokenType.String || afterTarget.type === TokenType.RawString)) {
          // `import alias "path"` -> alias is namespace
          out[getSigIndex(lookAhead)] = { ...target, type: TokenType.Namespace };
        } else if (
          ["struct", "class", "enum", "protocol", "let", "var", "func", "typealias"].includes(target.value)
        ) {
          // `import struct Foo.Bar`
          out[getSigIndex(lookAhead)] = { ...target, type: TokenType.Keyword };
          let nextMod = getSig(lookAhead + 1);
          if (nextMod && (nextMod.type === TokenType.Identifier || nextMod.type === TokenType.TypeName)) {
            out[getSigIndex(lookAhead + 1)] = { ...nextMod, type: TokenType.Namespace };
          }
        } else {
          // `import Module`
          out[getSigIndex(lookAhead)] = { ...target, type: TokenType.Namespace };
        }
      }
      continue;
    }

    // 3. Import path string styling
    if (prev && prev.type === TokenType.Import && (tok.type === TokenType.String || tok.type === TokenType.RawString)) {
      continue;
    }

    // 4. Function declarations: `func [receiver] name<generics>(...)`
    if (tok.type === TokenType.Keyword && (tok.value === "func" || tok.value === "init" || tok.value === "deinit" || tok.value === "subscript")) {
      let cur = s + 1;
      let curTok = getSig(cur);

      // Check for receiver method: `func (v: inout Vec2) scale(...)`
      if (curTok && curTok.value === "(") {
        cur++;
        curTok = getSig(cur);
        if (curTok && isIdentOrKeyword(curTok)) {
          // Receiver parameter name
          out[getSigIndex(cur)] = { ...curTok, type: TokenType.ParameterName };
        }
        // Advance past receiver closing `)`
        let pDepth = 1;
        while (cur < sigLen && pDepth > 0) {
          const t = getSig(cur);
          if (t?.value === "(") pDepth++;
          if (t?.value === ")") pDepth--;
          cur++;
        }
        curTok = getSig(cur);
      }

      // Next is function name
      if (curTok && (curTok.type === TokenType.Identifier || curTok.type === TokenType.Operator)) {
        if (!["async", "throws", "rethrows", "kernel", "graph", "where"].includes(curTok.value)) {
          out[getSigIndex(cur)] = { ...curTok, type: TokenType.FunctionName };
        }
      }
      continue;
    }

    // 5. Type declarations: `struct`, `class`, `enum`, `protocol`, `actor`, `extension`, `typealias`, `associatedtype`
    if (
      tok.type === TokenType.Keyword &&
      ["struct", "class", "enum", "protocol", "actor", "extension", "typealias", "associatedtype"].includes(tok.value)
    ) {
      if (next && next.type === TokenType.Identifier) {
        out[getSigIndex(s + 1)] = { ...next, type: TokenType.TypeName };
      }
      continue;
    }

    // 6. Enum cases: `case alpha(x: Int)`
    if (tok.type === TokenType.ControlKeyword && tok.value === "case") {
      if (next && next.type === TokenType.Identifier && !["let", "var", "is"].includes(next.value)) {
        out[getSigIndex(s + 1)] = { ...next, type: TokenType.Member };
      }
      continue;
    }

    // 7. Member access: `.member` (e.g. `.gpu`, `.load`, `.count`, `.text`, `.MutableSpan`, `self.init`)
    if (prev && prev.value === ".") {
      if (
        tok.type === TokenType.Identifier ||
        tok.type === TokenType.TypeName ||
        tok.type === TokenType.Keyword
      ) {
        if (prev2 && prev2.value === "self") {
          out[rawIdx] = { ...tok, type: TokenType.Member };
          continue;
        }
        if (tok.value === "init" || tok.value === "subscript") {
          out[rawIdx] = { ...tok, type: TokenType.FunctionCall };
          continue;
        }
        if (isPascalCase(tok.value)) {
          out[rawIdx] = { ...tok, type: TokenType.TypeName };
          continue;
        }
        if (next && next.value === "(") {
          out[rawIdx] = { ...tok, type: TokenType.FunctionCall };
        } else {
          out[rawIdx] = { ...tok, type: TokenType.Member };
        }
        continue;
      }
    }

    // Platform names in #available: macOS, iOS, Linux, Windows, etc.
    if (PLATFORMS.has(tok.value)) {
      out[rawIdx] = { ...tok, type: TokenType.ContextualKeyword };
      continue;
    }

    // Compiler conditions: os, arch, canImport, etc.
    if (CONDITIONS.has(tok.value) && next && next.value === "(") {
      out[rawIdx] = { ...tok, type: TokenType.FunctionCall };
      continue;
    }

    // 8. Parameter names and argument labels: `by factor:` or `name:`
    // Two words before colon: `by factor: float32` or `_ out: gpu...`
    if (
      (tok.type === TokenType.Identifier || tok.type === TokenType.BlankIdentifier) &&
      prev &&
      (prev.type === TokenType.Identifier || prev.type === TokenType.BlankIdentifier) &&
      next &&
      next.value === ":" &&
      (!next2 || next2.value !== ":")
    ) {
      out[getSigIndex(s - 1)] = { ...prev, type: TokenType.ArgumentLabel };
      out[rawIdx] = { ...tok, type: TokenType.ParameterName };
      continue;
    }

    // Single word before colon: `name:` (argument label)
    if (
      (tok.type === TokenType.Identifier || tok.type === TokenType.BlankIdentifier) &&
      next &&
      next.value === ":" &&
      (!next2 || next2.value !== ":")
    ) {
      // If preceded by `let`, `var`, `case` etc., it's a declared variable or case
      if (prev && ["let", "var", "case"].includes(prev.value)) {
        continue;
      }
      out[rawIdx] = { ...tok, type: TokenType.ArgumentLabel };
      continue;
    }

    // 9. Function calls: `name(...)`
    if (
      tok.type === TokenType.Identifier &&
      next &&
      next.value === "(" &&
      !["if", "guard", "while", "for", "switch", "catch", "return", "case"].includes(tok.value)
    ) {
      // If PascalCase, it's a type constructor: `Worker(id: 42)` -> TypeName
      if (isPascalCase(tok.value)) {
        out[rawIdx] = { ...tok, type: TokenType.TypeName };
      } else {
        out[rawIdx] = { ...tok, type: TokenType.FunctionCall };
      }
      continue;
    }

    // 10. Execution modifiers: `kernel`, `graph` in function signature
    if (EXECUTION_MODIFIERS.has(tok.value)) {
      // In signature: after `)`, `async`, `throws` and before `->`, `{`, `where`
      const isSigPosition =
        (prev && (prev.value === ")" || prev.value === "throws" || prev.value === "async" || prev.value === "rethrows")) ||
        (next && (next.value === "->" || next.value === "{" || next.value === "where"));

      if (isSigPosition && !isDeclVariable(prev)) {
        out[rawIdx] = { ...tok, type: TokenType.ExecutionModifier };
        continue;
      }
    }

    // 11. Effect keywords: `async`, `await`, `throws`, `rethrows`, `reasync`
    if (EFFECT_KEYWORDS.has(tok.value)) {
      if (!isDeclVariable(prev)) {
        out[rawIdx] = { ...tok, type: TokenType.EffectKeyword };
        continue;
      }
    }

    // 12. Contextual modifiers & accessors
    if (ACCESS_MODIFIERS.has(tok.value) || CONTEXTUAL_MODIFIERS.has(tok.value)) {
      if (!isDeclVariable(prev)) {
        out[rawIdx] = { ...tok, type: TokenType.ContextualKeyword };
        continue;
      }
    }

    if (ACCESSORS.has(tok.value)) {
      if (
        (prev && ["{", ";", "get", "set", "mutating", "nonmutating"].includes(prev.value)) ||
        (next && ["{", "}", ";", "get", "set", "mutating", "nonmutating"].includes(next.value))
      ) {
        out[rawIdx] = { ...tok, type: TokenType.ContextualKeyword };
        continue;
      }
    }

    // `any Error`, `some Collection`
    if ((tok.value === "any" || tok.value === "some") && next && isIdentOrKeyword(next) && next.value !== ":") {
      out[rawIdx] = { ...tok, type: TokenType.Keyword };
      continue;
    }

    // 13. Primitive types: `int`, `int32`, `float32`, `string`, `bool`, etc.
    if (PRIMITIVE_TYPES.has(tok.value)) {
      if (!isDeclVariable(prev)) {
        out[rawIdx] = { ...tok, type: TokenType.PredefinedType };
        continue;
      }
    }

    // 14. Core types & PascalCase custom types: `Int`, `String`, `Worker`, `Point`
    if (CORE_TYPES.has(tok.value) || (tok.type === TokenType.Identifier && isPascalCase(tok.value))) {
      if (!isDeclVariable(prev)) {
        out[rawIdx] = { ...tok, type: TokenType.TypeName };
        continue;
      }
    }
  }

  return out;
}

function isSignificant(token: Token): boolean {
  switch (token.type) {
    case TokenType.Whitespace:
    case TokenType.LineComment:
    case TokenType.DocComment:
    case TokenType.BlockComment:
    case TokenType.Hashbang:
    case TokenType.VsxText:
    case TokenType.VsxTagPunctuation:
      return false;
    default:
      return true;
  }
}

function isPascalCase(word: string): boolean {
  if (word.length === 0) return false;
  const first = word[0];
  return first >= "A" && first <= "Z";
}

function isIdentOrKeyword(token: Token): boolean {
  return (
    token.type === TokenType.Identifier ||
    token.type === TokenType.Keyword ||
    token.type === TokenType.ControlKeyword ||
    token.type === TokenType.PredefinedType ||
    token.type === TokenType.TypeName
  );
}

function isDeclVariable(prev: Token | null): boolean {
  if (!prev) return false;
  return prev.type === TokenType.Keyword && ["let", "var"].includes(prev.value);
}
