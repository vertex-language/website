import { Token, TokenType } from "./tokenTypes";
import {
  CONTROL_KEYWORDS,
  DECLARATION_KEYWORDS,
  LITERAL_KEYWORDS,
  SPECIAL_IDENTIFIERS,
  POUND_WORDS,
} from "./keywords";

const WHITESPACE = /^\s+/;
const DIGIT = /^[0-9]/;
const HEX_DIGIT = /^[0-9A-Fa-f]/;
const BIN_DIGIT = /^[01]/;
const OCT_DIGIT = /^[0-7]/;
const ID_START = /^[A-Za-z_]/;
const ID_PART = /^[A-Za-z0-9_]/;

// VSX regexes directly matching vscode-vertex scripts/vertex.py
const COMPONENT_RE = /^(?:[A-Z][\w$]*(?:\.[\w$]+)*|[\w$]+(?:\.[\w$]+)+)/;
const ELEMENT_RE = /^[a-z_$][\w$]*(?:[:-][\w$-]+)*/;
const EVENT_ATTR_RE = /^on[A-Z][\w$]*(?=\s*=)/;
const NAMESPACE_ATTR_RE = /^(class|style):([\w$-]+)/;
const GENERAL_ATTR_RE = /^[A-Za-z_$][\w$]*(?:[:.-][\w$-]+)*/;
const ENTITY_RE = /^&(?:[A-Za-z][A-Za-z0-9]*|#[0-9]+|#x[0-9A-Fa-f]+);/;

export type VertexFileType = "vs" | "vsx" | "vss";

/**
 * Normalizes a file extension, filename, or language identifier to 'vs', 'vsx', or 'vss'.
 * Defaults to 'vs' if unspecified.
 */
export function resolveFileType(extOrLang?: string): VertexFileType {
  if (!extOrLang) return "vs";
  let clean = extOrLang.toLowerCase().trim();
  if (clean.includes(".")) {
    const parts = clean.split(".");
    clean = parts[parts.length - 1];
  }
  if (clean === "vss" || clean === "css") return "vss";
  if (clean === "vsx" || clean === "jsx" || clean === "tsx") return "vsx";
  return "vs";
}

interface InterpolationState {
  quoteType: string; // '"' or '"""'
  poundCount: number; // 0 for standard, 1+ for raw
  parenDepth: number; // depth of nested parens inside \( ... )
}

enum VsxMode {
  Code,
  TagAttributes,
  TagChildren,
  EmbeddedExpr,
}

interface VsxStackFrame {
  mode: VsxMode;
  braceDepth?: number;
}

/**
 * Tokenizes Vertex source code into a linear sequence of tokens.
 * Selects the appropriate scanner based on the file extension (.vs, .vsx, .vss),
 * defaulting to .vs if not specified.
 */
export function tokenize(input: string, extensionOrLang: string = ".vs"): Token[] {
  const fileType = resolveFileType(extensionOrLang);
  if (fileType === "vss") {
    return tokenizeVss(input);
  }
  return tokenizeVs(input, fileType === "vsx");
}

/**
 * Tokenizes Vertex Stylesheet (.vss) source code, aligned with vscode-vertex source.vss.
 */
export function tokenizeVss(input: string): Token[] {
  const tokens: Token[] = [];
  const len = input.length;
  let pos = 0;
  let line = 1;
  let column = 1;

  function push(type: TokenType, start: number, end: number) {
    if (start >= end) return;
    const value = input.slice(start, end);
    tokens.push({ type, value, start, end, line, column });
    for (let i = start; i < end; i++) {
      if (input[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
  }

  let braceDepth = 0;
  let inValue = false; // inside property declaration: true after ':' until ';' or '}'

  while (pos < len) {
    const ch = input[pos];

    // 1. Whitespace
    if (/\s/.test(ch)) {
      let i = pos + 1;
      while (i < len && /\s/.test(input[i])) i++;
      push(TokenType.Whitespace, pos, i);
      pos = i;
      continue;
    }

    // 2. Line comment //
    if (ch === "/" && input[pos + 1] === "/") {
      let eol = input.indexOf("\n", pos);
      if (eol === -1) eol = len;
      push(TokenType.LineComment, pos, eol);
      pos = eol;
      continue;
    }

    // 3. Block comment /* */
    if (ch === "/" && input[pos + 1] === "*") {
      let end = input.indexOf("*/", pos + 2);
      if (end === -1) end = len;
      else end += 2;
      push(TokenType.BlockComment, pos, end);
      pos = end;
      continue;
    }

    // 4. Header: `package <name>`
    if (braceDepth === 0) {
      const pkgMatch = input.slice(pos).match(/^package\s+([A-Za-z_][A-Za-z0-9_]*)/);
      if (pkgMatch) {
        push(TokenType.Package, pos, pos + 7);
        pos += 7;
        const wsStart = pos;
        while (pos < len && /\s/.test(input[pos])) pos++;
        if (pos > wsStart) push(TokenType.Whitespace, wsStart, pos);
        push(TokenType.Namespace, pos, pos + pkgMatch[1].length);
        pos += pkgMatch[1].length;
        continue;
      }

      // `import "path"` or `import ( ... )`
      if (input.slice(pos).startsWith("import")) {
        push(TokenType.Import, pos, pos + 6);
        pos += 6;
        continue;
      }
    }

    // 5. At-rules: @media, @layer, @scope, @keyframes, @property, @font-face
    if (ch === "@") {
      let i = pos + 1;
      while (i < len && /[A-Za-z0-9_-]/.test(input[i])) i++;
      push(TokenType.CssAtRule, pos, i);
      pos = i;
      continue;
    }

    // 6. CSS Custom properties: --kit-accent
    if (ch === "-" && input[pos + 1] === "-") {
      let i = pos + 2;
      while (i < len && /[A-Za-z0-9_-]/.test(input[i])) i++;
      push(TokenType.CssCustomProperty, pos, i);
      pos = i;
      continue;
    }

    // 7. Strings
    if (ch === '"' || ch === "'") {
      const q = ch;
      let i = pos + 1;
      while (i < len && input[i] !== q && input[i] !== "\n") {
        if (input[i] === "\\") i += 2;
        else i++;
      }
      if (input[i] === q) i++;
      push(TokenType.String, pos, i);
      pos = i;
      continue;
    }

    // 8. Braces
    if (ch === "{") {
      push(TokenType.Punctuator, pos, pos + 1);
      braceDepth++;
      inValue = false;
      pos += 1;
      continue;
    }
    if (ch === "}") {
      push(TokenType.Punctuator, pos, pos + 1);
      if (braceDepth > 0) braceDepth--;
      inValue = false;
      pos += 1;
      continue;
    }

    // 9. Semicolon & Colon
    if (ch === ";") {
      push(TokenType.Punctuator, pos, pos + 1);
      inValue = false;
      pos += 1;
      continue;
    }
    if (ch === ":") {
      if (braceDepth > 0 && !inValue) {
        push(TokenType.Punctuator, pos, pos + 1);
        inValue = true;
        pos += 1;
        continue;
      } else {
        // Pseudo-classes / pseudo-elements in selectors
        let i = pos + 1;
        if (input[i] === ":") i++;
        while (i < len && /[A-Za-z0-9_-]/.test(input[i])) i++;
        push(TokenType.CssSelector, pos, i);
        pos = i;
        continue;
      }
    }

    // 10. Inside property value (after :)
    if (inValue) {
      // Hex colors: #fff, #7C3AED
      if (ch === "#") {
        let i = pos + 1;
        while (i < len && /[0-9A-Fa-f]/.test(input[i])) i++;
        push(TokenType.Number, pos, i);
        pos = i;
        continue;
      }

      // Numbers with units: 12px, 1.5rem, 100%, 0.5s
      if (DIGIT.test(ch) || (ch === "." && DIGIT.test(input[pos + 1] ?? ""))) {
        let i = pos;
        while (i < len && (DIGIT.test(input[i]) || input[i] === ".")) i++;
        push(TokenType.Number, pos, i);
        pos = i;
        // check unit
        let u = pos;
        if (input[u] === "%") {
          push(TokenType.CssUnit, u, u + 1);
          pos = u + 1;
        } else if (/[A-Za-z]/.test(input[u] ?? "")) {
          while (u < len && /[A-Za-z]/.test(input[u])) u++;
          push(TokenType.CssUnit, pos, u);
          pos = u;
        }
        continue;
      }

      // Identifiers / keywords / functions inside value: flex, var, rgb, url, etc.
      if (ID_START.test(ch)) {
        let i = pos + 1;
        while (i < len && (ID_PART.test(input[i]) || input[i] === "-")) i++;
        if (input[i] === "(") {
          push(TokenType.FunctionCall, pos, i);
        } else {
          push(TokenType.Keyword, pos, i);
        }
        pos = i;
        continue;
      }

      if ("(),".includes(ch)) {
        push(TokenType.Punctuator, pos, pos + 1);
        pos += 1;
        continue;
      }
    }

    // 11. Property names inside { ... } before :
    if (braceDepth > 0 && !inValue) {
      if (ID_START.test(ch) || ch === "-") {
        let i = pos + 1;
        while (i < len && (ID_PART.test(input[i]) || input[i] === "-")) i++;
        push(TokenType.CssProperty, pos, i);
        pos = i;
        continue;
      }
    }

    // 12. Selectors: .class, #id, tag, >, +
    if (ch === "." || ch === "#") {
      let i = pos + 1;
      while (i < len && (ID_PART.test(input[i]) || input[i] === "-")) i++;
      push(TokenType.CssSelector, pos, i);
      pos = i;
      continue;
    }

    if (ID_START.test(ch)) {
      let i = pos + 1;
      while (i < len && (ID_PART.test(input[i]) || input[i] === "-")) i++;
      push(TokenType.CssSelector, pos, i);
      pos = i;
      continue;
    }

    if (">~+*,".includes(ch)) {
      push(ch === "," ? TokenType.Punctuator : TokenType.Operator, pos, pos + 1);
      pos += 1;
      continue;
    }

    push(TokenType.Punctuator, pos, pos + 1);
    pos += 1;
  }

  return tokens;
}

/**
 * Tokenizes Vertex (.vs) and Vertex Markup (.vsx) source code.
 */
export function tokenizeVs(input: string, isVsx: boolean = false): Token[] {
  const tokens: Token[] = [];
  const len = input.length;
  let pos = 0;
  let line = 1;
  let column = 1;

  const interpStack: InterpolationState[] = [];
  const modeStack: VsxStackFrame[] = [{ mode: VsxMode.Code }];

  function push(type: TokenType, start: number, end: number) {
    if (start >= end) return;
    const value = input.slice(start, end);
    tokens.push({ type, value, start, end, line, column });

    // Track line and column numbers
    for (let i = start; i < end; i++) {
      if (input[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
  }

  // 1. Shebang line at offset 0
  if (input.startsWith("#!")) {
    let eol = input.indexOf("\n");
    if (eol === -1) eol = len;
    push(TokenType.Hashbang, 0, eol);
    pos = eol;
  }

  while (pos < len) {
    const ch = input[pos];
    const curFrame = modeStack[modeStack.length - 1];

    // --- VSX Tag Children Mode ---
    if (isVsx && curFrame.mode === VsxMode.TagChildren) {
      // 1. Closing tag: `</tag>` or `</>`
      if (input.startsWith("</", pos)) {
        const start = pos;
        pos += 2;
        push(TokenType.VsxTagPunctuation, start, pos);
        while (pos < len && /\s/.test(input[pos])) pos++;
        if (input[pos] === ">") {
          push(TokenType.VsxTagPunctuation, pos, pos + 1);
          pos += 1;
          modeStack.pop();
          continue;
        }
        const rest = input.slice(pos);
        const compMatch = rest.match(COMPONENT_RE);
        const elemMatch = rest.match(ELEMENT_RE);
        const match = compMatch || elemMatch;
        if (match) {
          push(compMatch ? TokenType.VsxComponent : TokenType.VsxTag, pos, pos + match[0].length);
          pos += match[0].length;
          while (pos < len && /\s/.test(input[pos])) pos++;
          if (input[pos] === ">") {
            push(TokenType.VsxTagPunctuation, pos, pos + 1);
            pos += 1;
          }
          modeStack.pop();
          continue;
        }
      }

      // 2. Nested opening tag
      if (ch === "<") {
        const tag = matchTagStart(input, pos, true);
        if (tag) {
          push(TokenType.VsxTagPunctuation, pos, pos + 1);
          pos += 1;
          if (tag.isFragment) {
            push(TokenType.VsxTagPunctuation, pos, pos + 1);
            pos += 1;
            modeStack.push({ mode: VsxMode.TagChildren });
          } else {
            push(tag.isComponent ? TokenType.VsxComponent : TokenType.VsxTag, pos, pos + tag.tagName.length);
            pos += tag.tagName.length;
            modeStack.push({ mode: VsxMode.TagAttributes });
          }
          continue;
        }
      }

      // 3. Embedded expression: `{...}`
      if (ch === "{") {
        push(TokenType.Punctuator, pos, pos + 1);
        pos += 1;
        modeStack.push({ mode: VsxMode.EmbeddedExpr, braceDepth: 1 });
        continue;
      }

      // 4. Character entity: `&lt;`, `&amp;`, `&#123;`
      if (ch === "&") {
        const entMatch = input.slice(pos).match(ENTITY_RE);
        if (entMatch) {
          push(TokenType.VsxEntity, pos, pos + entMatch[0].length);
          pos += entMatch[0].length;
          continue;
        }
      }

      // 5. Child text
      let end = pos;
      while (end < len && input[end] !== "<" && input[end] !== "{" && input[end] !== "&") {
        end++;
      }
      if (end > pos) {
        const text = input.slice(pos, end);
        if (/^\s+$/.test(text)) {
          push(TokenType.Whitespace, pos, end);
        } else {
          push(TokenType.VsxText, pos, end);
        }
        pos = end;
        continue;
      }
    }

    // --- VSX Tag Attributes Mode ---
    if (isVsx && curFrame.mode === VsxMode.TagAttributes) {
      // 1. Whitespace
      if (/\s/.test(ch)) {
        let i = pos + 1;
        while (i < len && /\s/.test(input[i])) i++;
        push(TokenType.Whitespace, pos, i);
        pos = i;
        continue;
      }

      // 2. Comments in tag
      if (ch === "/" && input[pos + 1] === "/") {
        let eol = input.indexOf("\n", pos);
        if (eol === -1) eol = len;
        push(TokenType.LineComment, pos, eol);
        pos = eol;
        continue;
      }
      if (ch === "/" && input[pos + 1] === "*") {
        let end = input.indexOf("*/", pos + 2);
        if (end === -1) end = len;
        else end += 2;
        push(TokenType.BlockComment, pos, end);
        pos = end;
        continue;
      }

      // 3. Self-closing `/>`
      if (input.startsWith("/>", pos)) {
        push(TokenType.VsxTagPunctuation, pos, pos + 2);
        pos += 2;
        modeStack.pop();
        continue;
      }

      // 4. Closing delimiter `>`
      if (ch === ">") {
        push(TokenType.VsxTagPunctuation, pos, pos + 1);
        pos += 1;
        modeStack.pop();
        modeStack.push({ mode: VsxMode.TagChildren });
        continue;
      }

      // 5. Spread attribute: `{...attrs}`
      if (input.startsWith("{...", pos)) {
        push(TokenType.Punctuator, pos, pos + 1);
        push(TokenType.VsxSpread, pos + 1, pos + 4);
        pos += 4;
        modeStack.push({ mode: VsxMode.EmbeddedExpr, braceDepth: 1 });
        continue;
      }

      // 6. Embedded expression attribute: `{value}`
      if (ch === "{") {
        push(TokenType.Punctuator, pos, pos + 1);
        pos += 1;
        modeStack.push({ mode: VsxMode.EmbeddedExpr, braceDepth: 1 });
        continue;
      }

      // 7. Event handler attributes: `onClick`, `onChange`
      const eventMatch = input.slice(pos).match(EVENT_ATTR_RE);
      if (eventMatch) {
        push(TokenType.VsxEvent, pos, pos + eventMatch[0].length);
        pos += eventMatch[0].length;
        continue;
      }

      // 8. Namespace attributes: `class:done`, `style:--kit-accent`
      const nsMatch = input.slice(pos).match(NAMESPACE_ATTR_RE);
      if (nsMatch) {
        const nsLen = nsMatch[1].length;
        push(TokenType.VsxNamespace, pos, pos + nsLen);
        push(TokenType.Punctuator, pos + nsLen, pos + nsLen + 1);
        const attrStart = pos + nsLen + 1;
        const attrEnd = pos + nsMatch[0].length;
        push(TokenType.VsxAttribute, attrStart, attrEnd);
        pos = attrEnd;
        continue;
      }

      // 9. General attributes: `title`, `data-p`, `id`, `class`
      const attrMatch = input.slice(pos).match(GENERAL_ATTR_RE);
      if (attrMatch) {
        push(TokenType.VsxAttribute, pos, pos + attrMatch[0].length);
        pos += attrMatch[0].length;
        continue;
      }

      // 10. Assignment `=`
      if (ch === "=") {
        push(TokenType.Operator, pos, pos + 1);
        pos += 1;
        continue;
      }

      // 11. Quoted string attribute values
      if (ch === '"' || ch === "'") {
        const q = ch;
        let i = pos + 1;
        while (i < len && input[i] !== q && input[i] !== "\n") {
          if (input[i] === "\\") i += 2;
          else i++;
        }
        if (input[i] === q) i++;
        push(TokenType.String, pos, i);
        pos = i;
        continue;
      }
    }

    // --- Embedded Expression Mode Closing Check ---
    if (isVsx && curFrame.mode === VsxMode.EmbeddedExpr) {
      if (ch === "{") {
        curFrame.braceDepth = (curFrame.braceDepth ?? 1) + 1;
      } else if (ch === "}") {
        curFrame.braceDepth = (curFrame.braceDepth ?? 1) - 1;
        if (curFrame.braceDepth <= 0) {
          push(TokenType.Punctuator, pos, pos + 1);
          pos += 1;
          modeStack.pop();
          continue;
        }
      }
    }

    // 2. Whitespace
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      let i = pos + 1;
      while (i < len && (input[i] === " " || input[i] === "\t" || input[i] === "\n" || input[i] === "\r")) {
        i++;
      }
      push(TokenType.Whitespace, pos, i);
      pos = i;
      continue;
    }

    // Inside String Interpolation: check if we hit closing `)`
    if (interpStack.length > 0) {
      const top = interpStack[interpStack.length - 1];
      if (ch === "(") {
        top.parenDepth++;
      } else if (ch === ")") {
        if (top.parenDepth === 0) {
          push(TokenType.StringInterpolation, pos, pos + 1);
          pos += 1;
          scanStringTail(top);
          continue;
        } else {
          top.parenDepth--;
        }
      }
    }

    // 3. Documentation line comments `///`
    if (ch === "/" && input[pos + 1] === "/" && input[pos + 2] === "/") {
      let eol = input.indexOf("\n", pos);
      if (eol === -1) eol = len;
      push(TokenType.DocComment, pos, eol);
      pos = eol;
      continue;
    }

    // 4. Standard line comments `//`
    if (ch === "/" && input[pos + 1] === "/") {
      let eol = input.indexOf("\n", pos);
      if (eol === -1) eol = len;
      const commentText = input.slice(pos, eol);
      const tagMatch = commentText.match(/^\/\/\s*(MARK|TODO|FIXME|NOTE|HACK|XXX)\b(:)?/);
      if (tagMatch) {
        const tagStart = pos + commentText.indexOf(tagMatch[1]);
        push(TokenType.LineComment, pos, tagStart);
        const tagEnd = tagStart + tagMatch[1].length;
        push(TokenType.CommentTag, tagStart, tagEnd);
        push(TokenType.LineComment, tagEnd, eol);
      } else {
        push(TokenType.LineComment, pos, eol);
      }
      pos = eol;
      continue;
    }

    // 5. Block comments `/* ... */` with nesting support
    if (ch === "/" && input[pos + 1] === "*") {
      const isDoc = input[pos + 2] === "*" && input[pos + 3] !== "/";
      let depth = 1;
      let i = pos + 2;
      while (i < len && depth > 0) {
        if (input[i] === "/" && input[i + 1] === "*") {
          depth++;
          i += 2;
        } else if (input[i] === "*" && input[i + 1] === "/") {
          depth--;
          i += 2;
        } else {
          i++;
        }
      }
      push(isDoc ? TokenType.DocComment : TokenType.BlockComment, pos, i);
      pos = i;
      continue;
    }

    // --- VSX Tag Opening in Prefix Position ---
    if (isVsx && ch === "<") {
      const tag = matchTagStart(input, pos);
      if (tag) {
        push(TokenType.VsxTagPunctuation, pos, pos + 1);
        pos += 1;
        if (tag.isFragment) {
          push(TokenType.VsxTagPunctuation, pos, pos + 1);
          pos += 1;
          modeStack.push({ mode: VsxMode.TagChildren });
        } else {
          push(tag.isComponent ? TokenType.VsxComponent : TokenType.VsxTag, pos, pos + tag.tagName.length);
          pos += tag.tagName.length;
          modeStack.push({ mode: VsxMode.TagAttributes });
        }
        continue;
      }
    }

    // 6. Raw strings / regex: `#"..."#` or `#/.../#`
    if (ch === "#") {
      let pCount = 0;
      while (pos + pCount < len && input[pos + pCount] === "#") pCount++;

      // Raw regex `#/ ... /#`
      if (input[pos + pCount] === "/") {
        const regexEnd = scanRawRegex(pos + pCount, pCount);
        if (regexEnd !== null) {
          push(TokenType.RegExp, pos, regexEnd);
          pos = regexEnd;
          continue;
        }
      }

      // Raw multiline string `#{n}"""`
      if (input.startsWith('"""', pos + pCount)) {
        const quoteStart = pos + pCount;
        const endStr = '"""' + "#".repeat(pCount);
        let i = quoteStart + 3;
        while (i < len && !input.startsWith(endStr, i)) {
          if (pCount === 1 && input.startsWith("\\#(", i)) {
            push(TokenType.RawString, pos, i);
            push(TokenType.StringInterpolation, i, i + 3);
            pos = i + 3;
            interpStack.push({ quoteType: '"""', poundCount: pCount, parenDepth: 0 });
            break;
          }
          i++;
        }
        if (pos === i + 3) continue;
        const end = Math.min(len, i + endStr.length);
        push(TokenType.RawString, pos, end);
        pos = end;
        continue;
      }

      // Raw single-line string `#{n}"`
      if (input[pos + pCount] === '"') {
        const quoteStart = pos + pCount;
        const endStr = '"' + "#".repeat(pCount);
        let i = quoteStart + 1;
        while (i < len && input[i] !== "\n" && !input.startsWith(endStr, i)) {
          if (pCount === 1 && input.startsWith("\\#(", i)) {
            push(TokenType.RawString, pos, i);
            push(TokenType.StringInterpolation, i, i + 3);
            pos = i + 3;
            interpStack.push({ quoteType: '"', poundCount: pCount, parenDepth: 0 });
            break;
          }
          i++;
        }
        if (pos === i + 3) continue;
        const end = input.startsWith(endStr, i) ? i + endStr.length : i;
        push(TokenType.RawString, pos, end);
        pos = end;
        continue;
      }

      // Directive / pound words: `#if`, `#available`, etc.
      let idEnd = pos + pCount;
      while (idEnd < len && ID_PART.test(input[idEnd])) idEnd++;
      const poundWord = input.slice(pos + pCount, idEnd);
      if (POUND_WORDS.has(poundWord)) {
        push(TokenType.Directive, pos, idEnd);
        pos = idEnd;
        continue;
      } else if (poundWord.length > 0) {
        push(TokenType.Directive, pos, idEnd);
        pos = idEnd;
        continue;
      }
    }

    // 7. Attributes: `@inlinable`, `@state.State`, `@testable`, etc.
    if (ch === "@") {
      let i = pos + 1;
      while (i < len && (ID_PART.test(input[i]) || (input[i] === "." && ID_PART.test(input[i + 1] ?? "")))) i++;
      if (i > pos + 1) {
        push(TokenType.Attribute, pos, i);
        pos = i;
        continue;
      }
    }

    // 8. Triple-quoted multiline strings `"""..."""`
    if (input.startsWith('"""', pos)) {
      let i = pos + 3;
      while (i < len && !input.startsWith('"""', i)) {
        if (input[i] === "\\" && input[i + 1] === "(") {
          push(TokenType.String, pos, i);
          push(TokenType.StringInterpolation, i, i + 2);
          pos = i + 2;
          interpStack.push({ quoteType: '"""', poundCount: 0, parenDepth: 0 });
          break;
        }
        if (input[i] === "\\") i += 2;
        else i++;
      }
      if (pos === i + 2) continue;
      const end = input.startsWith('"""', i) ? i + 3 : Math.min(len, i);
      push(TokenType.String, pos, end);
      pos = end;
      continue;
    }

    // 9. Standard double-quoted strings `"..."`
    if (ch === '"') {
      let i = pos + 1;
      while (i < len && input[i] !== '"' && input[i] !== "\n") {
        if (input[i] === "\\" && input[i + 1] === "(") {
          push(TokenType.String, pos, i);
          push(TokenType.StringInterpolation, i, i + 2);
          pos = i + 2;
          interpStack.push({ quoteType: '"', poundCount: 0, parenDepth: 0 });
          break;
        }
        if (input[i] === "\\") i += 2;
        else i++;
      }
      if (pos === i + 2) continue;
      const end = input[i] === '"' ? i + 1 : i;
      push(TokenType.String, pos, end);
      pos = end;
      continue;
    }

    // 10. Character literals `'c'`
    if (ch === "'") {
      let i = pos + 1;
      if (i < len && input[i] === "\\") i += 2;
      else if (i < len) i++;
      if (i < len && input[i] === "'") i++;
      push(TokenType.Char, pos, i);
      pos = i;
      continue;
    }

    // 11. Escaped identifiers `` `name` ``
    if (ch === "`") {
      let i = pos + 1;
      while (i < len && input[i] !== "`" && input[i] !== "\n") i++;
      if (i < len && input[i] === "`") i++;
      push(TokenType.Identifier, pos, i);
      pos = i;
      continue;
    }

    // 12. Dollar Identifiers: `$0`, `$1`, `$value`
    if (ch === "$") {
      let i = pos + 1;
      if (i < len && (DIGIT.test(input[i]) || ID_START.test(input[i]))) {
        while (i < len && ID_PART.test(input[i])) i++;
        push(TokenType.DollarIdentifier, pos, i);
        pos = i;
        continue;
      }
    }

    // 13. Wildcard `_`
    if (ch === "_" && !ID_PART.test(input[pos + 1] ?? "")) {
      push(TokenType.BlankIdentifier, pos, pos + 1);
      pos += 1;
      continue;
    }

    // 14. Bare regex `/pattern/`
    if (ch === "/" && canBeRegex(tokens, input, pos)) {
      const regexEnd = scanBareRegex(pos);
      if (regexEnd !== null) {
        push(TokenType.RegExp, pos, regexEnd);
        pos = regexEnd;
        continue;
      }
    }

    // 15. Numeric Literals
    if (DIGIT.test(ch)) {
      const numEnd = scanNumber(pos);
      if (isIllegalNumeric(pos, numEnd)) {
        push(TokenType.Invalid, pos, numEnd);
      } else {
        push(TokenType.Number, pos, numEnd);
      }
      pos = numEnd;
      continue;
    }

    // 16. Identifiers and Keywords
    if (ID_START.test(ch)) {
      let i = pos + 1;
      while (i < len && ID_PART.test(input[i])) i++;
      const word = input.slice(pos, i);

      if (LITERAL_KEYWORDS.has(word)) {
        push(word === "nil" ? TokenType.Nil : TokenType.Boolean, pos, i);
      } else if (SPECIAL_IDENTIFIERS.has(word)) {
        push(TokenType.Self, pos, i);
      } else if (word === "package") {
        push(TokenType.Package, pos, i);
      } else if (word === "import") {
        push(TokenType.Import, pos, i);
      } else if (word === "try" || word === "await") {
        push(TokenType.EffectKeyword, pos, i);
      } else if (word === "as" || word === "is" || word === "some") {
        push(TokenType.Keyword, pos, i);
      } else if (CONTROL_KEYWORDS.has(word)) {
        push(TokenType.ControlKeyword, pos, i);
      } else if (DECLARATION_KEYWORDS.has(word)) {
        push(TokenType.Keyword, pos, i);
      } else {
        push(TokenType.Identifier, pos, i);
      }
      pos = i;
      continue;
    }

    // 17. Range operators starting with dot: `...`, `..<`
    if (ch === "." && input[pos + 1] === ".") {
      let i = pos + 2;
      if (input[i] === "." || input[i] === "<") i++;
      push(TokenType.Operator, pos, i);
      pos = i;
      continue;
    }

    // 18. Member access dot `.`
    if (ch === "." && (ID_START.test(input[pos + 1] ?? "") || DIGIT.test(input[pos + 1] ?? ""))) {
      push(TokenType.Punctuator, pos, pos + 1);
      pos += 1;
      continue;
    }

    // 19. Multi-character and compound operators
    const op = matchOperator(pos);
    if (op !== null) {
      push(TokenType.Operator, pos, pos + op.length);
      pos += op.length;
      continue;
    }

    // 20. Punctuators: `(`, `)`, `[`, `]`, `{`, `}`, `,`, `:`, `;`, `.`
    if ("()[]{};,:.".includes(ch)) {
      push(TokenType.Punctuator, pos, pos + 1);
      pos += 1;
      continue;
    }

    // 21. Backslash `\` (keypath or escape)
    if (ch === "\\") {
      push(TokenType.Operator, pos, pos + 1);
      pos += 1;
      continue;
    }

    // 22. Unknown fallback character
    push(TokenType.Invalid, pos, pos + 1);
    pos += 1;
  }

  return tokens;

  // --- Helper Scanners ---

  function matchTagStart(source: string, p: number, isInner: boolean = false): {
    isComponent: boolean;
    tagName: string;
    isFragment: boolean;
  } | null {
    if (source[p] !== "<") return null;

    // Check prefix position only outside markup children: (?:^|(?<=[\s(\[{,;:]))
    if (!isInner && p > 0) {
      const prevChar = source[p - 1];
      if (!/[\s(\[{,;:=]/.test(prevChar)) {
        return null;
      }
    }

    // Fragment <>
    if (source[p + 1] === ">") {
      return { isComponent: false, tagName: "", isFragment: true };
    }

    // Lookahead for component or element name
    const rest = source.slice(p + 1);
    const compMatch = rest.match(COMPONENT_RE);
    if (compMatch) {
      const after = rest[compMatch[0].length] ?? "";
      if (/[\s/>{]/.test(after) || after === "") {
        return { isComponent: true, tagName: compMatch[0], isFragment: false };
      }
    }

    const elemMatch = rest.match(ELEMENT_RE);
    if (elemMatch) {
      const after = rest[elemMatch[0].length] ?? "";
      if (/[\s/>{]/.test(after) || after === "") {
        return { isComponent: false, tagName: elemMatch[0], isFragment: false };
      }
    }

    return null;
  }

  function scanStringTail(top: InterpolationState) {
    const endStr = top.quoteType === '"""'
      ? '"""' + "#".repeat(top.poundCount)
      : '"' + "#".repeat(top.poundCount);

    const isRaw = top.poundCount > 0;
    let i = pos;

    while (i < len) {
      if (top.quoteType === '"' && input[i] === "\n") break;
      if (input.startsWith(endStr, i)) {
        const end = i + endStr.length;
        push(isRaw ? TokenType.RawString : TokenType.String, pos, end);
        pos = end;
        interpStack.pop();
        return;
      }
      if (!isRaw && input[i] === "\\" && input[i + 1] === "(") {
        push(TokenType.String, pos, i);
        push(TokenType.StringInterpolation, i, i + 2);
        pos = i + 2;
        top.parenDepth = 0;
        return;
      }
      if (isRaw && top.poundCount === 1 && input.startsWith("\\#(", i)) {
        push(TokenType.RawString, pos, i);
        push(TokenType.StringInterpolation, i, i + 3);
        pos = i + 3;
        top.parenDepth = 0;
        return;
      }
      if (input[i] === "\\") i += 2;
      else i++;
    }

    const end = Math.min(len, i);
    push(isRaw ? TokenType.RawString : TokenType.String, pos, end);
    pos = end;
    interpStack.pop();
  }

  function scanBareRegex(start: number): number | null {
    let i = start + 1;
    let inClass = false;
    while (i < len) {
      const c = input[i];
      if (c === "\n" || c === "\r") return null;
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (inClass) {
        if (c === "]") inClass = false;
        i++;
        continue;
      }
      if (c === "[") {
        inClass = true;
        i++;
        continue;
      }
      if (c === "/") return i + 1;
      i++;
    }
    return null;
  }

  function scanRawRegex(startSlash: number, pounds: number): number | null {
    let i = startSlash + 1;
    let inClass = false;
    while (i < len) {
      const c = input[i];
      if (c === "\n" || c === "\r") return null;
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (inClass) {
        if (c === "]") inClass = false;
        i++;
        continue;
      }
      if (c === "[") {
        inClass = true;
        i++;
        continue;
      }
      if (c === "/") {
        let p = 0;
        while (i + 1 + p < len && input[i + 1 + p] === "#") p++;
        if (p === pounds) return i + 1 + p;
      }
      i++;
    }
    return null;
  }

  function scanNumber(start: number): number {
    let i = start;

    // Hex: 0x...
    if (input[i] === "0" && (input[i + 1] === "x" || input[i + 1] === "X")) {
      i += 2;
      while (i < len && (HEX_DIGIT.test(input[i]) || input[i] === "_")) i++;
      if (input[i] === "." && HEX_DIGIT.test(input[i + 1] ?? "") && input[i + 2] !== ".") {
        i++;
        while (i < len && (HEX_DIGIT.test(input[i]) || input[i] === "_")) i++;
      }
      if (input[i] === "p" || input[i] === "P") {
        let j = i + 1;
        if (input[j] === "+" || input[j] === "-") j++;
        if (DIGIT.test(input[j] ?? "")) {
          i = j;
          while (i < len && (DIGIT.test(input[i]) || input[i] === "_")) i++;
        }
      }
      return i;
    }

    // Binary: 0b...
    if (input[i] === "0" && (input[i + 1] === "b" || input[i + 1] === "B")) {
      i += 2;
      while (i < len && (BIN_DIGIT.test(input[i]) || input[i] === "_")) i++;
      while (i < len && ID_PART.test(input[i])) i++;
      return i;
    }

    // Octal: 0o...
    if (input[i] === "0" && (input[i + 1] === "o" || input[i + 1] === "O")) {
      i += 2;
      while (i < len && (OCT_DIGIT.test(input[i]) || input[i] === "_")) i++;
      while (i < len && ID_PART.test(input[i])) i++;
      return i;
    }

    // Decimal
    while (i < len && (DIGIT.test(input[i]) || input[i] === "_")) i++;

    if (input[i] === "." && DIGIT.test(input[i + 1] ?? "") && input[i + 2] !== ".") {
      i++;
      while (i < len && (DIGIT.test(input[i]) || input[i] === "_")) i++;
    }

    if (input[i] === "e" || input[i] === "E") {
      let j = i + 1;
      if (input[j] === "+" || input[j] === "-") j++;
      if (DIGIT.test(input[j] ?? "")) {
        i = j;
        while (i < len && (DIGIT.test(input[i]) || input[i] === "_")) i++;
      }
    }

    if (i < len && ID_START.test(input[i])) {
      while (i < len && ID_PART.test(input[i])) i++;
    }

    return i;
  }

  function isIllegalNumeric(start: number, end: number): boolean {
    const text = input.slice(start, end);
    if (/^0[bB].*[^01_]/.test(text)) return true;
    if (/^0[oO].*[^0-7_]/.test(text)) return true;
    if (/[0-9][A-Za-z_]/.test(text) && !/^0[xX]/.test(text) && !/[eEpP][+-]?[0-9]/.test(text)) return true;
    return false;
  }

  function matchOperator(start: number): string | null {
    const ops = [
      "===", "!==", "...", "..<", "->", "??", "==", "!=",
      "<=", ">=", "&&", "||", "<<", ">>", "+=", "-=", "*=",
      "/=", "%=", "&=", "|=", "^=", "&+", "&-", "&*", "&<<", "&>>",
      "+", "-", "*", "/", "%", "<", ">", "=", "!", "?", "&", "|", "^", "~"
    ];
    for (const op of ops) {
      if (input.startsWith(op, start)) {
        if (op === "/" && (input[start + 1] === "/" || input[start + 1] === "*")) {
          continue;
        }
        return op;
      }
    }
    return null;
  }
}

function canBeRegex(tokens: readonly Token[], input: string, pos: number): boolean {
  if (pos + 1 >= input.length) return false;
  const next = input[pos + 1];
  if (next === "/" || next === "*" || WHITESPACE.test(next)) return false;

  let last: Token | null = null;
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].type !== TokenType.Whitespace) {
      last = tokens[i];
      break;
    }
  }

  if (last === null) return true;
  if (last.type === TokenType.Operator) return true;
  if (last.type === TokenType.Punctuator && "([{:;,=".includes(last.value)) return true;
  if (last.type === TokenType.ControlKeyword && ["return", "throw", "yield", "case"].includes(last.value)) return true;

  return false;
}
