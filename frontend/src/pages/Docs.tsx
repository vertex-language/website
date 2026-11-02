import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { FiCopy, FiCheck, FiMenu, FiX } from 'react-icons/fi'
import { useIsMobile } from '../hooks/useMediaQuery'
import Header from '../components/Header'
import DocsSidebar from '../components/docs/DocsSidebar'
import DocsToc from '../components/docs/DocsToc'
import DocBlocks from '../components/docs/DocBlocks'
import { docPages, defaultDocSlug, legacyDocSlugs } from '../features/docs/content'

const HEADER_HEIGHT = 65 // measured height of Header.tsx's rendered bar
const SIDE_COL_WIDTH = 260

export default function Docs() {
  const { slug } = useParams<{ slug?: string }>()
  const [copied, setCopied] = useState(false)
  const { hash } = useLocation()
  const [navOpen, setNavOpen] = useState(false)
  const isMobile = useIsMobile()

  const page = useMemo(() => {
    if (slug) {
      const target = legacyDocSlugs[slug] ?? slug
      const found = docPages.find((p: any) => p.slug === target || p.id === target || (target === 'vvm' && p.slug === 'cli') || (target === 'vsc' && p.slug === 'cli'))
      if (found) return found
    }
    return docPages.find((p: any) => p.slug === defaultDocSlug || p.id === defaultDocSlug)!
  }, [slug])

  const handleCopyPage = () => {
    const text = [page.title, page.description].join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const activeId = (page as any).slug || page.id

  // Jump to a heading when the URL has one (/docs/packages#targets), else to the top.
  useEffect(() => {
    const id = hash.slice(1)
    const el = id ? document.getElementById(id) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [activeId, hash])

  // Close the mobile navigation drawer after picking a page, and stop the page
  // behind it from scrolling while it is open.
  useEffect(() => { setNavOpen(false) }, [activeId])
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [navOpen])

  return (
    <div style={styles.page}>
      <Header />

      {/* Content row. Nothing here scrolls on its own — the page's normal
          document flow (via #root's overflow) is the single scroll surface,
          so the mouse wheel works over the whole page and you get the
          native browser scrollbar. The side rails are sticky so they track
          the viewport as the center column scrolls past them. This requires
          html/body/#root to be free to grow past 100vh — see index.css. */}
      {isMobile && (
        <div style={styles.mobileBar}>
          <button style={styles.mobileNavBtn} onClick={() => setNavOpen(true)} aria-label="Open docs navigation">
            <FiMenu size={16} />
            <span style={styles.mobileNavLabel}>{page.breadcrumb}</span>
          </button>
        </div>
      )}

      {isMobile && navOpen && (
        <div style={styles.drawer} role="dialog" aria-label="Docs navigation">
          <div style={styles.drawerHead}>
            <span style={styles.drawerTitle}>Documentation</span>
            <button style={styles.drawerClose} onClick={() => setNavOpen(false)} aria-label="Close navigation">
              <FiX size={20} />
            </button>
          </div>
          <div style={styles.drawerBody}>
            <DocsSidebar activeId={activeId} />
          </div>
        </div>
      )}

      <div style={isMobile ? { ...styles.body, ...styles.bodyMobile } : styles.body}>
        {!isMobile && (
          <div style={{ ...styles.sideCol, ...styles.leftCol }}>
            <DocsSidebar activeId={activeId} />
          </div>
        )}

        <div style={isMobile ? { ...styles.mainCol, ...styles.mainColMobile } : styles.mainCol}>
          <main style={isMobile ? { ...styles.main, ...styles.mainMobile } : styles.main} key={activeId}>
            <div style={styles.breadcrumb}>
              Docs <span style={styles.breadcrumbSep}>/</span> {page.breadcrumb}
            </div>

            <div style={styles.titleRow}>
              <h1 style={isMobile ? { ...styles.title, ...styles.titleMobile } : styles.title}>{page.title}</h1>
              {!isMobile && (
                <button style={styles.copyPageBtn} onClick={handleCopyPage}>
                  {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                  {copied ? 'Copied' : 'Copy page'}
                </button>
              )}
            </div>

            <p style={styles.description}>{page.description}</p>

            <div style={styles.divider} />

            <DocBlocks blocks={page.blocks} />
          </main>
        </div>

        {!isMobile && (
          <div style={{ ...styles.sideCol, ...styles.rightCol }}>
            <DocsToc blocks={page.blocks} />
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  bodyMobile: { display: 'block' },
  mainColMobile: { padding: '0 1rem' },
  mainMobile: { paddingTop: '1.25rem', paddingBottom: '4rem' },
  titleMobile: { fontSize: '1.85rem' },
  mobileBar: {
    position: 'sticky',
    top: '57px',
    zIndex: 50,
    backgroundColor: '#FCFCFB',
    borderBottom: '1px solid #E8E6DF',
    padding: '0.5rem 1rem',
  },
  mobileNavBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '10px',
    padding: '0.6rem 0.85rem',
    fontFamily: 'inherit',
    fontSize: '14px',
    color: '#1F1E1D',
    cursor: 'pointer',
    textAlign: 'left',
  },
  mobileNavLabel: { flex: 1 },
  drawer: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: '#FCFCFB',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem 0.5rem 1.25rem',
    minHeight: '56px',
    borderBottom: '1px solid #E8E6DF',
  },
  drawerTitle: { fontSize: '15px', fontWeight: 600, color: '#1F1E1D' },
  drawerClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1F1E1D',
  },
  drawerBody: { flex: 1, minHeight: 0, padding: '0 0 0 1.25rem' },
  page: {
    minHeight: '100vh',
    backgroundColor: '#FCFCFB',
    color: '#1F1E1D',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
  },
  sideCol: {
    width: `${SIDE_COL_WIDTH}px`,
    flexShrink: 0,
    // Sticks to the viewport as the page (mainCol) scrolls past it.
    position: 'sticky',
    top: `${HEADER_HEIGHT}px`,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    boxSizing: 'border-box',
  },
  leftCol: {
    paddingLeft: '2rem',
  },
  rightCol: {
    paddingRight: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mainCol: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 1rem',
  },
  main: {
    width: '100%',
    maxWidth: '780px',
    paddingTop: '2rem',
    paddingBottom: '6rem',
  },
  breadcrumb: {
    fontSize: '12.5px',
    color: '#8F8D87',
    marginBottom: '0.75rem',
  },
  breadcrumbSep: {
    margin: '0 0.35rem',
    color: '#B8B5AD',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  title: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.25rem',
    fontWeight: 400,
    color: '#1F1E1D',
    margin: 0,
    lineHeight: 1.18,
    letterSpacing: '-0.015em',
  },
  copyPageBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '12.5px',
    color: '#666660',
    background: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '8px',
    padding: '0.35rem 0.65rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginTop: '0.25rem',
    transition: 'background-color 0.15s, border-color 0.15s',
  },
  description: {
    fontSize: '15.5px',
    color: '#666660',
    lineHeight: 1.65,
    marginTop: '0.75rem',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E8E6DF',
    margin: '1.75rem 0 0.5rem 0',
  },
}