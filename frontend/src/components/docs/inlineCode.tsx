import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const codeStyle = {
  fontFamily: "'SF Mono', ui-monospace, Menlo, Consolas, monospace",
  fontSize: '12.5px',
  padding: '1.5px 5.5px',
  borderRadius: '5px',
  backgroundColor: '#F3F1EC',
  border: '1px solid #E4E1D8',
  color: '#1F1E1D',
} as const

const linkStyle = {
  color: '#2160C4',
  textDecoration: 'underline',
  textDecorationColor: '#D4E2F6',
  textUnderlineOffset: '3px',
} as const

// Inline markup, in priority order: `code`, [text](url), **bold**, *italic*.
const INLINE = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<![\w*])\*([^*\s][^*]*?)\*(?![\w*])/g

/** Renders a string with inline markdown (code, links, bold, italic) as React nodes. */
export function formatInlineCode(content: ReactNode): ReactNode {
  if (typeof content !== 'string') return content

  const out: ReactNode[] = []
  let last = 0
  let key = 0

  for (const m of content.matchAll(INLINE)) {
    const at = m.index ?? 0
    if (at > last) out.push(content.slice(last, at))
    const [, code, linkText, href, bold, italic] = m

    if (code !== undefined) {
      out.push(<code key={key++} style={codeStyle}>{code}</code>)
    } else if (linkText !== undefined) {
      const label = formatInlineCode(linkText)
      out.push(
        href.startsWith('/')
          ? <Link key={key++} to={href} style={linkStyle}>{label}</Link>
          : <a key={key++} href={href} target="_blank" rel="noreferrer" style={linkStyle}>{label}</a>,
      )
    } else if (bold !== undefined) {
      out.push(<strong key={key++} style={{ fontWeight: 600 }}>{formatInlineCode(bold)}</strong>)
    } else if (italic !== undefined) {
      out.push(<em key={key++}>{formatInlineCode(italic)}</em>)
    }
    last = at + m[0].length
  }

  if (out.length === 0) return content
  if (last < content.length) out.push(content.slice(last))
  return out
}
