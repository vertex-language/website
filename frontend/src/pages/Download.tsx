import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCopy, FiCheck, FiArrowUpRight, FiBookOpen, FiTerminal, FiPackage } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Download() {
  const [copied, setCopied] = useState(false)
  const installCmd = 'go install github.com/vertex-language/vsc/cmd/vsc@latest'

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>
          
          {/* Centered Title */}
          <h1 style={styles.title}>Vertex SDK</h1>

          {/* Centered Subtitle */}
          <p style={styles.subtitle}>
            Build high-performance, memory-safe applications with the official Vertex compiler toolchain.
            The vsc toolchain gives you zero-dependency compilation, compile-time ownership verification,
            and native code generation for AMD64, ARM64, and WebAssembly.
          </p>

          {/* Download Action Pill Button */}
          <div style={styles.downloadActionWrapper}>
            <a 
              href="https://github.com/vertex-language/vsc" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.downloadBtn}
            >
              Download
            </a>
          </div>

          {/* Clean Code Snippet Box */}
          <div style={styles.codeCard}>
            <div style={styles.codeHeader}>
              <span style={styles.shellLabel}>BASH</span>
              <button 
                type="button" 
                onClick={handleCopy} 
                style={styles.copyBtn}
                aria-label="Copy command"
                title="Copy command"
              >
                {copied ? <FiCheck size={14} color="#166534" /> : <FiCopy size={14} color="#73716C" />}
              </button>
            </div>
            <div style={styles.codeBody}>
              <pre style={{ margin: 0, padding: 0, background: 'transparent', border: 'none' }}>
                <code style={styles.codeText}>{installCmd}</code>
              </pre>
            </div>
          </div>

          {/* Important Callout Section */}
          <div style={styles.importantSection}>
            <h2 style={styles.importantTitle}>Important</h2>
            <p style={styles.importantText}>
              The Vertex SDK relies on Go 1.23 or newer installed on your system. Running{' '}
              <code style={styles.inlineCode}>go install</code> compiles and places the{' '}
              <code style={styles.inlineCode}>vsc</code> binary directly into your{' '}
              <code style={styles.inlineCode}>$GOPATH/bin</code> directory. Ensure that{' '}
              <code style={styles.inlineCode}>$GOPATH/bin</code> (or{' '}
              <code style={styles.inlineCode}>~/go/bin</code>) is added to your shell{' '}
              <code style={styles.inlineCode}>PATH</code> to run{' '}
              <code style={styles.inlineCode}>vsc</code> from any directory.
            </p>
            <p style={styles.importantSubtext}>
              Prefer tracking git source directly? Visit the{' '}
              <Link to="/docs/build-from-source" style={styles.link}>
                Build from Source
              </Link>{' '}
              guide or explore the complete suite in{' '}
              <Link to="/sdk" style={styles.link}>
                SDK <FiArrowUpRight size={12} style={{ display: 'inline', verticalAlign: '-1px' }} />
              </Link>.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={styles.nextStepsGrid}>
            <Link to="/docs/quickstart" style={styles.stepCard}>
              <FiBookOpen size={18} color="#1F1E1D" style={{ marginBottom: '0.75rem' }} />
              <h3 style={styles.stepTitle}>Quickstart <FiArrowUpRight size={13} /></h3>
              <p style={styles.stepDesc}>Write, compile, and run your first <code>fib.vs</code> program.</p>
            </Link>

            <Link to="/sdk" style={styles.stepCard}>
              <FiTerminal size={18} color="#1F1E1D" style={{ marginBottom: '0.75rem' }} />
              <h3 style={styles.stepTitle}>SDK <FiArrowUpRight size={13} /></h3>
              <p style={styles.stepDesc}>Explore <code>v++</code> (C++23), <code>vcc</code> (C), and <code>objv</code> compilers.</p>
            </Link>

            <Link to="/packages" style={styles.stepCard}>
              <FiPackage size={18} color="#1F1E1D" style={{ marginBottom: '0.75rem' }} />
              <h3 style={styles.stepTitle}>Packages <FiArrowUpRight size={13} /></h3>
              <p style={styles.stepDesc}>150+ native standard library packages ready to import.</p>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FCFCFB',
    color: '#1F1E1D',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  main: {
    width: '100%',
    padding: '5rem 0 7rem 0',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },

  title: {
    fontSize: '2.75rem',
    fontWeight: 600,
    color: '#1F1E1D',
    textAlign: 'center',
    margin: '0 0 1.25rem 0',
    letterSpacing: '-0.025em',
    lineHeight: 1.15,
  },
  subtitle: {
    fontSize: '15.5px',
    color: '#55544E',
    textAlign: 'center',
    lineHeight: 1.65,
    margin: '0 auto 2rem auto',
    maxWidth: '560px',
  },

  downloadActionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2.5rem',
  },
  downloadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: '#1F1E1D',
    color: '#FCFCFB',
    border: 'none',
    borderRadius: '999px',
    padding: '0.75rem 2.25rem',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'opacity 0.15s ease, transform 0.15s ease',
  },

  // Code Card
  codeCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E2DC',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
    marginBottom: '3rem',
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.65rem 1rem 0.5rem 1rem',
    borderBottom: '1px solid #F0EEE8',
  },
  shellLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#8F8D87',
    letterSpacing: '0.06em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  copyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBody: {
    padding: '0.9rem 1rem 1.1rem 1rem',
    overflowX: 'auto',
  },
  codeText: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '13.5px',
    color: '#1F1E1D',
    whiteSpace: 'pre',
    lineHeight: 1.5,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    borderRadius: 0,
    display: 'block',
  },

  // Important Section
  importantSection: {
    marginBottom: '3.5rem',
  },
  importantTitle: {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: '#1F1E1D',
    margin: '0 0 0.75rem 0',
  },
  importantText: {
    fontSize: '14px',
    color: '#55544E',
    lineHeight: 1.65,
    margin: '0 0 0.85rem 0',
  },
  importantSubtext: {
    fontSize: '13.5px',
    color: '#73716C',
    lineHeight: 1.6,
    margin: 0,
  },
  inlineCode: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '12.5px',
    backgroundColor: '#F3F1EC',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    color: '#1F1E1D',
  },
  link: {
    color: '#2160C4',
    textDecoration: 'none',
    fontWeight: 500,
  },

  // Next steps cards
  nextStepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    paddingTop: '2rem',
    borderTop: '1px solid #ECEAE4',
  },
  stepCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '10px',
    padding: '1.25rem',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.15s ease',
  },
  stepTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1F1E1D',
    margin: '0 0 0.35rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  stepDesc: {
    fontSize: '12.5px',
    color: '#666660',
    margin: 0,
    lineHeight: 1.5,
  },
}
