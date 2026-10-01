import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { docSections } from '../../features/docs/content'

export default function DocsSidebar({ activeId }: { activeId: string }) {
  const navRef = useRef<HTMLElement>(null)

  // Bring the current page into view, so a long list opens where you are.
  useEffect(() => {
    navRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' })
  }, [activeId])

  return (
    <div style={styles.wrap} className="docs-sidebar">
      {/* Pinned — never scrolls */}
      <button style={styles.searchBox} type="button">
        <FiSearch size={14} color="#8F8D87" />
        <span style={styles.searchPlaceholder}>Search docs...</span>
        <div style={styles.searchShortcutWrap}>
          <kbd className="keycap">⌘</kbd>
          <kbd className="keycap">K</kbd>
        </div>
      </button>

      {/* Owns its own scroll — independent of main content and toc */}
      <nav ref={navRef} style={styles.sidebar} className="docs-scroll">
        {docSections.map((section) => (
          <div key={section.title} style={styles.section}>
            <div style={styles.sectionTitle}>{section.title}</div>
            {section.items.map((item: any) => {
              const identifier = item.slug || item.id
              const isActive = identifier === activeId
              return (
                <Link
                  key={identifier}
                  to={`/docs/${identifier}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={isActive ? { ...styles.link, ...styles.linkActive } : styles.link}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  wrap: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #E8E6DF',
    boxSizing: 'border-box',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: 'calc(100% - 1rem)',
    boxSizing: 'border-box',
    padding: '0.4rem 0.65rem',
    margin: '1.5rem 1rem 1.25rem 0',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchPlaceholder: {
    fontSize: '12.5px',
    color: '#8F8D87',
    flex: 1,
    textAlign: 'left',
  },
  searchShortcutWrap: {
    display: 'flex',
    gap: '2px',
  },
  sidebar: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingRight: '1rem',
    paddingBottom: '2rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1F1E1D',
    marginBottom: '0.5rem',
    padding: '0 0.6rem',
  },
  link: {
    display: 'block',
    fontSize: '13px',
    color: '#666660',
    textDecoration: 'none',
    padding: '0.35rem 0.6rem',
    borderRadius: '6px',
    marginBottom: '2px',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  },
  linkActive: {
    backgroundColor: '#E8E6DF',
    color: '#1F1E1D',
    fontWeight: 500,
  },
}