import { useState, type ReactNode, type CSSProperties } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

interface PackageDocViewerProps {
  content: string
}

function CodeBlockRenderer({ children, className }: { children: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)
  const codeText = String(children).replace(/\n$/, '')
  // Check if inline or block
  const isBlock = Boolean(className) || codeText.includes('\n')

  if (!isBlock) {
    return <code style={styles.inlineCode}>{children}</code>
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={styles.codeBlockWrapper}>
      <button
        onClick={handleCopy}
        style={styles.codeCopyBtn}
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? <FiCheck size={13} color="#1F1E1D" /> : <FiCopy size={13} />}
      </button>
      <VertexCode
        code={codeText}
        theme={vertexFreshLightTheme}
        className="package-doc-code"
      />
    </div>
  )
}

export default function PackageDocViewer({ content }: PackageDocViewerProps) {
  return (
    <div style={styles.container} className="package-doc-content">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre({ children }) {
            return <>{children}</>
          },
          code({ className, children, ...props }) {

            return (
              <CodeBlockRenderer className={className} {...props}>
                {children}
              </CodeBlockRenderer>
            )
          },
          h1({ children, ...props }) {
            return (
              <h1 style={styles.h1} {...props}>
                {children}
              </h1>
            )
          },
          h2({ children, ...props }) {
            const text = String(children)
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            return (
              <h2 id={id} style={styles.h2} {...props}>
                {children}
              </h2>
            )
          },
          h3({ children, ...props }) {
            // If header contains anchor tag text, extract id
            return (
              <h3 style={styles.h3} {...props}>
                {children}
              </h3>
            )
          },
          h4({ children, ...props }) {
            return (
              <h4 style={styles.h4} {...props}>
                {children}
              </h4>
            )
          },
          p({ children, ...props }) {
            return (
              <p style={styles.p} {...props}>
                {children}
              </p>
            )
          },
          ul({ children, ...props }) {
            return (
              <ul style={styles.ul} {...props}>
                {children}
              </ul>
            )
          },
          li({ children, ...props }) {
            return (
              <li style={styles.li} {...props}>
                {children}
              </li>
            )
          },
          a({ href, children, ...props }) {
            return (
              <a href={href} style={styles.a} {...props}>
                {children}
              </a>
            )
          },
          table({ children, ...props }) {
            return (
              <div style={styles.tableWrap}>
                <table style={styles.table} {...props}>
                  {children}
                </table>
              </div>
            )
          },
          th({ children, ...props }) {
            return (
              <th style={styles.th} {...props}>
                {children}
              </th>
            )
          },
          td({ children, ...props }) {
            return (
              <td style={styles.td} {...props}>
                {children}
              </td>
            )
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    color: '#1F1E1D',
    lineHeight: 1.65,
    fontSize: '0.9375rem',
    wordBreak: 'break-word',
  },
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    color: '#18181B',
    marginBottom: '1rem',
    marginTop: 0,
  },
  h2: {
    fontSize: '1.35rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: '#18181B',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.4rem',
    borderBottom: '1px solid #E8E6DF',
  },
  h3: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#18181B',
    marginTop: '1.75rem',
    marginBottom: '0.5rem',
  },
  h4: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#52525B',
    marginTop: '1.25rem',
    marginBottom: '0.35rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  p: {
    marginBottom: '1rem',
    color: '#3F3F46',
  },
  ul: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  },
  li: {
    marginBottom: '0.35rem',
    color: '#3F3F46',
  },
  a: {
    color: '#2563EB',
    textDecoration: 'none',
  },
  inlineCode: {
    fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    fontSize: '0.86em',
    backgroundColor: '#F3F1EC',
    border: '1px solid #E8E6DF',
    borderRadius: '4px',
    padding: '0.15em 0.35em',
    color: '#1F1E1D',
  },
  codeBlockWrapper: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '8px',
    margin: '1.15rem 0',
    overflow: 'hidden',
  },
  codeCopyBtn: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 2,
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#71717A',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableWrap: {
    overflowX: 'auto',
    margin: '1.25rem 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
  },
  th: {
    backgroundColor: '#F8FAFC',
    borderBottom: '2px solid #E2E8F0',
    textAlign: 'left',
    padding: '8px 12px',
    fontWeight: 600,
    color: '#334155',
  },
  td: {
    borderBottom: '1px solid #E2E8F0',
    padding: '8px 12px',
    color: '#475569',
  },
}
