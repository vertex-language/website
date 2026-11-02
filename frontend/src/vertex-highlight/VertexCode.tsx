import { useMemo, type ReactNode, type CSSProperties } from "react";
import { Token, TokenType } from "./tokenTypes";
import { VertexTheme, resolveTheme } from "./theme";
import { useVertexTokens } from "./useVertexTokens";

export interface VertexCodeProps {
  /** Vertex source code to highlight. */
  code: string;
  /** File extension (e.g. '.vs', '.vsx', '.vss') or filename (e.g. 'Counter.vsx'). Defaults to '.vs'. */
  extension?: string;
  /** Optional language / file extension alias (e.g. 'vs', 'vsx', 'vss'). */
  language?: string;
  /** Optional filename to infer extension from. */
  filename?: string;
  /** Custom theme overrides; unset tokens fall back to the fresh theme. */
  theme?: VertexTheme;
  /** Whether to render a gutter with 1-based line numbers. */
  showLineNumbers?: boolean;
  /** Optional CSS class name applied to outer `<pre>`. */
  className?: string;
  /** Optional inline styles applied to outer `<pre>`. */
  style?: CSSProperties;
}

const MONO_FONT_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

interface Piece {
  type: TokenType;
  value: string;
}

export function VertexCode({
  code,
  extension,
  language,
  filename,
  theme,
  showLineNumbers = false,
  className,
  style,
}: VertexCodeProps) {
  // Infer file extension, defaulting to '.vs' if not specified
  const fileExt = extension || language || filename || ".vs";
  // Normalize newline endings
  const source = useMemo(() => code.replace(/\r\n?/g, "\n"), [code]);
  const tokens = useVertexTokens(source, fileExt);
  const resolved = useMemo(() => resolveTheme(theme), [theme]);

  const lines = useMemo(
    () => (showLineNumbers ? splitLines(tokens) : null),
    [tokens, showLineNumbers]
  );

  const getStyleForToken = (type: TokenType): CSSProperties => {
    const color = resolved[type];
    const isComment =
      type === TokenType.LineComment ||
      type === TokenType.DocComment ||
      type === TokenType.BlockComment;

    const isImportantKeyword =
      type === TokenType.ExecutionModifier ||
      type === TokenType.ControlKeyword ||
      type === TokenType.Keyword ||
      type === TokenType.VsxComponent ||
      type === TokenType.CssSelector;

    return {
      color: color === "inherit" ? undefined : color,
      fontStyle: isComment ? "italic" : undefined,
      fontWeight: isImportantKeyword ? 500 : undefined,
    };
  };

  const renderPieces = (pieces: readonly Piece[], keyPrefix: string): ReactNode[] =>
    pieces.map((piece, i) => (
      <span key={`${keyPrefix}-${i}`} style={getStyleForToken(piece.type)}>
        {piece.value}
      </span>
    ));

  const preStyle: CSSProperties = {
    background: resolved.background ?? "transparent",
    color: resolved[TokenType.Identifier] ?? "#18181B",
    margin: 0,
    padding: "1rem",
    overflow: "auto",
    fontFamily: MONO_FONT_STACK,
    fontSize: "0.8125rem",
    lineHeight: 1.55,
    tabSize: 2,
    ...style,
  };

  if (lines === null) {
    return (
      <pre className={className} style={preStyle}>
        <code>{renderPieces(tokens, "t")}</code>
      </pre>
    );
  }

  const gutterWidth = `${String(lines.length).length}ch`;

  return (
    <pre className={className} style={preStyle}>
      <code>
        {lines.map((pieces, i) => (
          <span
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: `${gutterWidth} 1fr`,
              columnGap: "1rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                textAlign: "right",
                color: resolved.lineNumber ?? "#A1A1AA",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {i + 1}
            </span>
            <span>{renderPieces(pieces, `l${i}`)}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function splitLines(tokens: readonly Token[]): Piece[][] {
  const lines: Piece[][] = [[]];

  for (const token of tokens) {
    const parts = token.value.split("\n");
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) lines.push([]);
      if (parts[i] !== "") {
        lines[lines.length - 1].push({ type: token.type, value: parts[i] });
      }
    }
  }

  return lines;
}
