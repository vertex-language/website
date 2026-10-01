import { useState, type CSSProperties } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { VertexCode } from '../../vertex-highlight'
import { docsCodeTheme } from '../../features/docs/theme'

export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Captured program output and compiler diagnostics: plain, muted, attached
  // to the example above it rather than highlighted as Vertex source.
  if (label === 'output') {
    return (
      <div style={styles.outputWrap}>
        <div style={styles.outputLabel}>Output</div>
        <pre style={styles.outputText}>{code}</pre>
      </div>
    )
  }

  return (
    <div style={styles.wrap}>
      <button
        style={{
          ...styles.copyBtn,
          opacity: hovered || copied ? 1 : 0.65,
          backgroundColor: hovered ? '#F0F0EF' : 'transparent',
        }}
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? <FiCheck size={14} color="#1F1E1D" /> : <FiCopy size={14} />}
      </button>
      <VertexCode code={code} theme={docsCodeTheme} className="docs-code-block" />
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  outputWrap: {
    border: '1px solid #E8E6DF',
    borderTop: '1px dashed #E1DED5',
    borderRadius: '0 0 12px 12px',
    backgroundColor: '#FAF9F6',
    margin: '-1.5rem 0 1.5rem',
    padding: '0.6rem 1.1rem 0.8rem',
    overflowX: 'auto',
  },
  outputLabel: {
    fontSize: '10.5px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#A09D95',
    marginBottom: '0.3rem',
  },
  outputText: {
    margin: 0,
    fontFamily: "'SF Mono', ui-monospace, Menlo, Consolas, monospace",
    fontSize: '12.5px',
    lineHeight: 1.6,
    color: '#4A4843',
    whiteSpace: 'pre',
  },
  wrap: {
    position: 'relative',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    margin: '1.5rem 0',
  },
  copyBtn: {
    position: 'absolute',
    top: '0.65rem',
    right: '0.65rem',
    zIndex: 2,
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#8F8D87',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    transition: 'opacity 0.15s ease, background-color 0.15s ease',
  },
}