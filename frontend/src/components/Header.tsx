import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiGithub, FiChevronDown, FiSearch, FiX, FiDownload, FiMenu } from 'react-icons/fi'
import { useIsMobile } from '../hooks/useMediaQuery'
import logo from '../assets/logo_lite.png'

const navLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'SDK', href: '/sdk' },
  { label: 'Packages', href: '/packages' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false)
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/packages?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  const isActive = (href: string) => {
    if (href === '/docs') return location.pathname.startsWith('/docs')
    if (href === '/sdk') return location.pathname.startsWith('/sdk') || location.pathname.startsWith('/build-sdk')
    if (href === '/packages') return location.pathname.startsWith('/packages')
    return false
  }

  if (isMobile) {
    return (
      <header style={styles.header}>
        <div style={styles.mobileBar}>
          <Link to="/" style={styles.logoLink}>
            <img src={logo} alt="Vertex Logo" style={styles.logo} />
            <span style={styles.logoText}>Vertex</span>
          </Link>
          <div style={styles.mobileActions}>
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false) }}
              style={styles.mobileIconBtn}
              aria-label="Search packages"
            >
              <FiSearch size={18} />
            </button>
            <button
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false) }}
              style={styles.mobileIconBtn}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearchSubmit} style={styles.mobileSearchRow}>
            <FiSearch size={15} color="#8F8D87" style={{ flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              style={styles.mobileSearchInput}
            />
          </form>
        )}

        {menuOpen && (
          <nav style={styles.mobileMenu}>
            {navLinks.map(item => (
              <Link
                key={item.label}
                to={item.href}
                style={isActive(item.href) ? { ...styles.mobileLink, ...styles.mobileLinkActive } : styles.mobileLink}
              >
                {item.label}
              </Link>
            ))}
            <div style={styles.mobileGroupLabel}>Solutions</div>
            <Link to="/solutions/ai" style={styles.mobileSubLink}>AI & Agents</Link>
            <Link to="/solutions/apps-ui" style={styles.mobileSubLink}>Desktop & Mobile Apps</Link>
            <Link to="/solutions/multi-platform" style={styles.mobileSubLink}>Multi-Platform</Link>
            <Link to="/solutions/scaling" style={styles.mobileSubLink}>Systems Scaling</Link>
            <Link to="/solutions/bare-metal" style={styles.mobileSubLink}>Embedded & Edge</Link>
            <div style={styles.mobileFooterRow}>
              <a href="https://github.com/vertex-language" target="_blank" rel="noopener noreferrer" style={styles.mobileGithub}>
                <FiGithub size={16} /> GitHub
              </a>
              <Link to="/download" style={styles.headerPrimaryBtn}>
                <FiDownload size={14} />
                <span>Download</span>
              </Link>
            </div>
          </nav>
        )}
      </header>
    )
  }

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        
        {/* LEFT: Logo */}
        <div style={styles.left}>
          <Link to="/" style={styles.logoLink}>
            <img src={logo} alt="Vertex Logo" style={styles.logo} />
            <span style={styles.logoText}>Vertex</span>
          </Link>
        </div>

        {/* CENTER: Navigation with Dropdown */}
        <nav style={styles.center}>
          
          {/* Solutions Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button 
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              style={{
                ...styles.navLink,
                ...(solutionsOpen ? styles.navLinkActive : {}),
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Solutions <FiChevronDown size={14} style={{ marginTop: '2px' }} />
            </button>

            {solutionsOpen && (
              <div style={styles.dropdownMenu}>
                <Link to="/solutions/ai" style={styles.dropdownItem} onClick={() => setSolutionsOpen(false)}>AI & Agents</Link>
                <Link to="/solutions/apps-ui" style={styles.dropdownItem} onClick={() => setSolutionsOpen(false)}>Desktop & Mobile Apps</Link>
                <Link to="/solutions/multi-platform" style={styles.dropdownItem} onClick={() => setSolutionsOpen(false)}>Multi-Platform</Link>
                <Link to="/solutions/scaling" style={styles.dropdownItem} onClick={() => setSolutionsOpen(false)}>Systems Scaling</Link>
                <Link to="/solutions/bare-metal" style={styles.dropdownItem} onClick={() => setSolutionsOpen(false)}>Embedded & Edge</Link>
              </div>
            )}
          </div>

          {/* Remaining Core Links */}
          {navLinks.map(item => {
            const active = isActive(item.href)
            const pillStyle = active ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink
            return (
              <Link key={item.label} to={item.href} style={pillStyle}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT: Search + Theme + Lang + GitHub + Primary Action */}
        <div style={styles.right}>
          <div ref={searchContainerRef} style={styles.searchContainer}>
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} style={styles.searchSlideForm}>
                <FiSearch size={14} color="#8F8D87" style={{ flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false)
                  }}
                  placeholder="Search packages..."
                  style={styles.searchSlideInput}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={styles.searchSlideClear}
                    aria-label="Clear"
                  >
                    <FiX size={12} color="#8F8D87" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  style={styles.searchSlideClose}
                  aria-label="Close search"
                >
                  <FiX size={13} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                style={styles.searchTriggerBtn}
                title="Search packages"
                aria-label="Search packages"
              >
                <FiSearch size={15} />
                <span style={styles.searchTriggerText}>Search</span>
                <kbd className="keycap" style={styles.headerKeycap}>/</kbd>
              </button>
            )}
          </div>
          
          <div style={styles.divider} />

          <a 
            href="https://github.com/vertex-language" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.iconBtn}
            aria-label="GitHub"
          >
            <FiGithub size={15} />
          </a>

          <Link to="/download" style={styles.headerPrimaryBtn}>
            <FiDownload size={14} />
            <span>Download</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

const styles: Record<string, React.CSSProperties> = {
  mobileBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    minHeight: '56px',
  },
  mobileActions: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  mobileIconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1F1E1D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
  },
  mobileSearchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 1rem 0.75rem',
    padding: '0.55rem 0.85rem',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '10px',
  },
  mobileSearchInput: {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '16px', // 16px stops iOS Safari from zooming the page on focus
    fontFamily: 'inherit',
    color: '#1F1E1D',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.25rem 1rem 1.25rem',
    borderTop: '1px solid #E8E6DF',
    maxHeight: 'calc(100vh - 57px)',
    overflowY: 'auto',
    backgroundColor: '#FCFCFB',
  },
  mobileLink: {
    textDecoration: 'none',
    color: '#1F1E1D',
    fontSize: '16px',
    padding: '0.85rem 0.25rem',
    borderBottom: '1px solid #F0EEE6',
  },
  mobileLinkActive: { fontWeight: 600 },
  mobileGroupLabel: {
    fontSize: '11.5px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#8F8D87',
    padding: '1.1rem 0.25rem 0.35rem',
  },
  mobileSubLink: {
    textDecoration: 'none',
    color: '#4A4843',
    fontSize: '15px',
    padding: '0.65rem 0.25rem',
  },
  mobileFooterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1.25rem',
    paddingTop: '1rem',
    borderTop: '1px solid #E8E6DF',
  },
  mobileGithub: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#4A4843',
    fontSize: '15px',
  },
  header: {
    backgroundColor: '#FCFCFB',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    borderBottom: '1px solid #E8E6DF',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem 1.75rem',
    minHeight: '56px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    textDecoration: 'none',
  },
  logo: {
    height: '24px',
    width: 'auto',
    display: 'block',
  },
  logoText: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#1F1E1D',
    letterSpacing: '-0.01em',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.2rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#666660',
    fontSize: '13.5px',
    fontWeight: 400,
    padding: '0.35rem 0.85rem',
    borderRadius: '999px',
    backgroundColor: 'transparent',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    backgroundColor: '#E8E6DF',
    color: '#1F1E1D',
    fontWeight: 500,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(31, 30, 29, 0.08)',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: '240px',
    zIndex: 101,
  },
  dropdownItem: {
    textDecoration: 'none',
    color: '#1F1E1D',
    fontSize: '13.5px',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'background-color 0.15s',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  searchTriggerBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666660',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 0.6rem',
    borderRadius: '6px',
    fontSize: '13.5px',
    transition: 'color 0.15s ease, background-color 0.15s ease',
    fontFamily: 'inherit',
  },
  searchTriggerText: {
    fontSize: '13.5px',
    color: '#666660',
  },
  headerKeycap: {
    fontSize: '10px',
    minWidth: '16px',
    height: '16px',
    padding: '0 3px',
    marginLeft: '2px',
  },
  searchSlideForm: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '999px',
    padding: '0.3rem 0.7rem',
    gap: '0.45rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    width: '240px',
    boxSizing: 'border-box',
  },
  searchSlideInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#1F1E1D',
    fontFamily: 'inherit',
    minWidth: 0,
  },
  searchSlideClear: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSlideClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8F8D87',
  },
  divider: {
    width: '1px',
    height: '16px',
    backgroundColor: '#E8E6DF',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666660',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '6px',
    transition: 'color 0.15s',
  },
  dropdownBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666660',
    fontSize: '12.5px',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  },
  headerPrimaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    textDecoration: 'none',
    backgroundColor: '#1F1E1D',
    color: '#FCFCFB',
    fontSize: '13px',
    fontWeight: 500,
    padding: '0.4rem 0.9rem',
    borderRadius: '8px',
    transition: 'background-color 0.15s',
    whiteSpace: 'nowrap',
  },
}