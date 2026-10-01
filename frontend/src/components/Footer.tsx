import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowUp, FiGithub } from 'react-icons/fi'

interface FooterLink {
  label: string
  to?: string
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const columns: FooterColumn[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Overview', to: '/docs/overview' },
      { label: 'Quickstart', to: '/docs/quickstart' },
      { label: 'Language Basics', to: '/docs/values' },
      { label: 'Collections', to: '/docs/arrays' },
      { label: 'Functions & Closures', to: '/docs/functions' },
      { label: 'Structs & Classes', to: '/docs/structs' },
      { label: 'Protocols & Generics', to: '/docs/protocols' },
    ],
  },
  {
    title: 'Language',
    links: [
      { label: 'Errors', to: '/docs/errors' },
      { label: 'ARC & References', to: '/docs/arc' },
      { label: 'Ownership', to: '/docs/ownership' },
      { label: 'Concurrency', to: '/docs/async-await' },
      { label: 'Language Reference', to: '/docs/reference' },
    ],
  },
  {
    title: 'Toolchain',
    links: [
      { label: 'CLI', to: '/docs/cli' },
      { label: 'Build from Source', to: '/docs/build-from-source' },
      { label: 'SDK & Compilers', to: '/sdk' },
      { label: 'C++ Modules', to: '/docs/cpp-modules' },
      { label: 'GPU Kernels', to: '/docs/kernels' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    title: 'Packages',
    links: [
      { label: 'Package Directory', to: '/packages' },
      { label: 'Standard Library', to: '/docs/stdlib' },
      { label: 'Packages & Imports', to: '/docs/packages' },
      { label: 'Networking', to: '/packages?category=Networking' },
      { label: 'AI & Compute', to: '/packages?category=AI+%26+Accelerated+Compute' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'AI & Agents', to: '/solutions/ai' },
      { label: 'Desktop & Mobile Apps', to: '/solutions/apps-ui' },
      { label: 'Multi-Platform', to: '/solutions/multi-platform' },
      { label: 'Systems Scaling', to: '/solutions/scaling' },
      { label: 'Embedded & Edge', to: '/solutions/bare-metal' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner} className="footer-inner">
        <div style={styles.footerLinksGrid} className="footer-grid">
          {columns.map((col) => (
            <nav key={col.title} style={styles.footerCol} aria-label={col.title}>
              <h5 style={styles.footerColHeader}>{col.title}</h5>
              {col.links.map((link) =>
                link.href ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={styles.footerLink} className="footer-link">
                    {link.label} <FiArrowUpRight size={12} style={styles.extIcon} />
                  </a>
                ) : (
                  <Link key={link.label} to={link.to!} style={styles.footerLink} className="footer-link">
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <div style={styles.footerBottomBar} className="footer-bottom">
          <div style={styles.socialRow} className="footer-social">
            <a href="https://github.com/vertex-language" target="_blank" rel="noreferrer" aria-label="GitHub" style={styles.socialIcon} className="footer-link">
              <FiGithub size={18} />
            </a>
          </div>

          <div style={styles.footerCopyright} className="footer-copy">
            © 2026 Netangular Technologies
          </div>

          <div style={styles.footerLanguage} className="footer-lang">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={styles.toTop} className="footer-link">
              Back to top <FiArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#FCFCFB',
    borderTop: '1px solid #E8E6DF',
    padding: '4rem 0 2.5rem 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    width: '100%',
    boxSizing: 'border-box',
  },
  footerInner: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  footerLinksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    alignItems: 'start',
    gap: '2rem',
    marginBottom: '5rem',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
  },
  footerColHeader: {
    fontSize: '13px',
    color: '#8F8D87',
    fontWeight: 500,
    margin: '0 0 0.65rem 0',
  },
  footerLink: {
    color: '#666660',
    fontSize: '13.5px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    transition: 'color 0.15s',
  },
  extIcon: {
    color: '#8F8D87',
  },
  footerBottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #E8E6DF',
    paddingTop: '2rem',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  socialRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    flex: 1,
  },
  socialIcon: {
    color: '#666660',
    textDecoration: 'none',
    display: 'flex',
    transition: 'color 0.15s',
  },
  footerCopyright: {
    fontSize: '13px',
    color: '#8F8D87',
    flex: 1,
    textAlign: 'center',
  },
  footerLanguage: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
  toTop: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#666660',
    fontSize: '13px',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  languagePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#F3F1EC',
    border: '1px solid #E8E6DF',
    padding: '0.4rem 0.85rem',
    borderRadius: '999px',
    fontSize: '13px',
    cursor: 'pointer',
  },
}
