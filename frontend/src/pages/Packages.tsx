import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  FiSearch,
  FiX,
  FiPackage,
  FiArrowRight,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi'
import { useIsMobile } from '../hooks/useMediaQuery'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PackageCard from '../components/packages/PackageCard'
import {
  searchPackages,
  getCategoriesFor,
  getAllPackages,
} from '../features/packages/packageService'
import logo from '../assets/logo_lite.png'

const SUGGESTIONS = ['net/tcp', 'net/http', 'llm', 'gpu', 'crypto', 'tts']
const SIDEBAR_TAGS = ['net/tcp', 'net/http', 'llm', 'gpu', 'crypto', 'tts', 'fs', 'json']

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeQuery = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || 'All'
  const isAll = searchParams.get('all') === 'true'

  // Dedicated results mode is active when URL has search params
  const isResultsMode = Boolean(activeQuery.trim() || activeCategory !== 'All' || isAll)

  // Local input state for landing search bar (typing does NOT trigger real-time search)
  const [inputVal, setInputVal] = useState(activeQuery)
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'functions'>('relevance')
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sync local input with active URL query when URL changes
  useEffect(() => {
    setInputVal(activeQuery)
  }, [activeQuery])

  // Keyboard shortcut '/' to focus search input (only on landing page)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !isResultsMode &&
        document.activeElement !== searchInputRef.current &&
        !(document.activeElement instanceof HTMLInputElement)
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isResultsMode])

  // Commit search to URL on submit / Enter / one-click
  const handleCommitSearch = (queryStr: string, cat = activeCategory) => {
    const trimmed = queryStr.trim()
    const params: Record<string, string> = {}
    if (trimmed) params.q = trimmed
    if (cat && cat !== 'All') params.category = cat
    if (!trimmed && (!cat || cat === 'All')) {
      setSearchParams({})
      return
    }
    setSearchParams(params)
  }

  const handleLandingSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    handleCommitSearch(inputVal, 'All')
  }

  const handleTagClick = (tag: string) => {
    setInputVal(tag)
    handleCommitSearch(tag, 'All')
  }

  const handleCategorySelect = (catName: string) => {
    const nextCat = activeCategory === catName ? 'All' : catName
    const params: Record<string, string> = {}
    if (activeQuery.trim()) params.q = activeQuery.trim()
    if (nextCat !== 'All') params.category = nextCat
    if (!activeQuery.trim() && nextCat === 'All') {
      params.all = 'true'
    }
    setFiltersOpen(false)
    setSearchParams(params)
  }

  const handleBrowseAll = () => {
    setInputVal('')
    setSearchParams({ all: 'true' })
  }

  const handleClear = () => {
    setInputVal('')
    setSearchParams({})
  }

  // The whole catalog, for the landing page's total.
  const catalogSize = useMemo(() => getAllPackages().length, [])

  // Sidebar counts follow the current search, so each number is what you get by
  // clicking it. The chosen category stays listed even when it has no matches,
  // so it can always be turned off.
  const categories = useMemo(() => {
    const list = getCategoriesFor(activeQuery)
    if (activeCategory !== 'All' && !list.some((c) => c.name === activeCategory)) {
      list.push({ name: activeCategory, count: 0 })
    }
    return list
  }, [activeQuery, activeCategory])
  const totalPackagesCount = useMemo(
    () => categories.reduce((sum, c) => sum + c.count, 0),
    [categories],
  )

  // Filtered and sorted packages based on URL params
  const results = useMemo(() => {
    if (!isResultsMode) return []
    let list = searchPackages(activeQuery, activeCategory)

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.importPath.localeCompare(b.importPath))
    } else if (sortBy === 'functions') {
      list = [...list].sort(
        (a, b) => b.symbolCounts.functions - a.symbolCounts.functions
      )
    }

    return list
  }, [activeQuery, activeCategory, sortBy, isResultsMode])

  return (
    <div style={styles.page}>
      <Header />

      {!isResultsMode ? (
        /* Landing View: Centered, serene, classic one-click search */
        <main style={styles.landingCenterContainer}>
          <div style={styles.heroInner}>
            {/* Centered Vertex Logo lockup */}
            <div style={styles.brandingLockup}>
              <img src={logo} alt="Vertex Logo" style={styles.logoImg} />
              <span style={styles.logoText}>Vertex</span>
            </div>

            {/* Floating Pill Search Form: Submit commits search to URL ?q= */}
            <form onSubmit={handleLandingSubmit} style={{ width: '100%' }}>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  ...styles.searchBox,
                  ...(isFocused || isHovered ? styles.searchBoxElevated : {}),
                }}
              >
                <FiSearch size={18} color="#8F8D87" style={styles.searchIcon} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search packages, keywords, protocols..."
                  style={styles.searchInput}
                  autoFocus
                />
                {inputVal && (
                  <button
                    type="button"
                    onClick={() => setInputVal('')}
                    style={styles.clearBtn}
                    aria-label="Clear"
                  >
                    <FiX size={15} color="#8F8D87" />
                  </button>
                )}
                <kbd className="keycap" style={styles.shortcutKey}>/</kbd>
              </div>
            </form>

            {/* Suggestion Tags (One-click opens dedicated URL ?q=tag) */}
            <div style={styles.chipRow}>
              {SUGGESTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  style={styles.chip}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* 157 Standard Library Info Message Box */}
            <div style={styles.landingOverviewCard}>
              <div style={styles.landingCardText}>
                <span style={styles.overviewCount}>{catalogSize} standard library packages</span>
                <span style={styles.overviewSub}>
                  Hardware-accelerated compute kernels, async networking, cryptography, and systems runtime.
                </span>
              </div>
              <button
                onClick={handleBrowseAll}
                style={styles.browseAllBtn}
                title="Browse all packages"
              >
                <span>Browse all</span>
                <FiArrowRight size={13} />
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* Dedicated Results Page: GitHub-Style 3-Column Body Layer (No redundant search bar under header) */
        <div style={isMobile ? { ...styles.githubLayoutContainer, padding: '1rem 1rem 3rem' } : styles.githubLayoutContainer}>
          <div style={isMobile ? { ...styles.githubInner, ...styles.innerMobile } : styles.githubInner}>
            
            {/* LEFT COLUMN: Filter by Sidebar */}
            <aside style={isMobile ? { ...styles.githubSidebar, ...styles.sidebarMobile } : styles.githubSidebar}>
              {isMobile ? (
                <button
                  style={styles.filterToggle}
                  onClick={() => setFiltersOpen((o) => !o)}
                  aria-expanded={filtersOpen}
                >
                  <FiFilter size={14} />
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    Filter{activeCategory !== 'All' ? `: ${activeCategory}` : ''}
                  </span>
                  <FiChevronDown size={14} style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
              ) : (
                <div style={styles.filterByTitle}>Filter by</div>
              )}

              {(!isMobile || filtersOpen) && (
                <>

              {/* Category Filter List (like GitHub Repositories/Issues list) */}
              <nav style={styles.categoryNavList}>
                <button
                  onClick={() => handleCategorySelect('All')}
                  style={{
                    ...styles.categoryNavItem,
                    ...(activeCategory === 'All' ? styles.categoryNavItemActive : {}),
                  }}
                >
                  <span style={styles.catNavLabel}>All Packages</span>
                  <span
                    style={
                      activeCategory === 'All'
                        ? styles.catNavCountActive
                        : styles.catNavCount
                    }
                  >
                    {totalPackagesCount}
                  </span>
                </button>

                {categories.map((cat) => {
                  const active = activeCategory === cat.name
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      style={{
                        ...styles.categoryNavItem,
                        ...(active ? styles.categoryNavItemActive : {}),
                      }}
                    >
                      <span style={styles.catNavLabel}>{cat.name}</span>
                      <span
                        style={
                          active
                            ? styles.catNavCountActive
                            : styles.catNavCount
                        }
                      >
                        {cat.count}
                      </span>
                    </button>
                  )
                })}
              </nav>

              <div style={styles.sidebarDivider} />

              {/* Popular Tags Section (like Languages in GitHub search) */}
              <div style={styles.filterBySubTitle}>Popular Tags</div>
              <div style={styles.quickTagsList}>
                {SIDEBAR_TAGS.map((t) => {
                  const active = activeQuery.toLowerCase() === t.toLowerCase()
                  return (
                    <button
                      key={t}
                      onClick={() => handleTagClick(t)}
                      style={{
                        ...styles.quickTagBtn,
                        ...(active ? styles.quickTagBtnActive : {}),
                      }}
                    >
                      <span style={styles.tagDot} />
                      <span>{t}</span>
                    </button>
                  )
                })}
              </div>
                </>
              )}
            </aside>

            {/* CENTER COLUMN: Search Results List */}
            <main style={styles.githubResultsMain}>
              {/* Results Top Header */}
              <div style={styles.githubResultsHeader}>
                <div style={styles.resultsCountText}>
                  <strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'}
                  {activeQuery.trim() && (
                    <span> for &ldquo;<strong>{activeQuery.trim()}</strong>&rdquo;</span>
                  )}
                  {activeCategory !== 'All' && (
                    <span> in <strong>{activeCategory}</strong></span>
                  )}
                </div>

                <div style={styles.sortWrap}>
                  <label htmlFor="sort-select" style={styles.sortLabel}>
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={styles.githubSortSelect}
                  >
                    <option value="relevance">Best match</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="functions">Most functions</option>
                  </select>
                </div>
              </div>

              {/* Package Cards List */}
              {results.length > 0 ? (
                <div style={styles.cardList}>
                  {results.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      query={activeQuery}
                      onTagClick={(tag) => handleTagClick(tag)}
                    />
                  ))}
                </div>
              ) : (
                <div style={styles.noResultsBox}>
                  <FiPackage size={40} color="#8F8D87" />
                  <h3 style={styles.noResultsTitle}>No packages matched your query</h3>
                  <p style={styles.noResultsDesc}>
                    Try searching for broader keywords like <code>net</code>, <code>gpu</code>,{' '}
                    <code>http</code>, or <code>crypto</code>.
                  </p>
                  <button
                    onClick={handleClear}
                    style={styles.resetSearchBtn}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </main>

            {/* RIGHT COLUMN: Info / ProTip Rail (matching GitHub screenshot) */}
            <aside style={isMobile ? { display: 'none' } : styles.githubRightRail}>
              {/* Vertex Library Info Box */}
              <div style={styles.railCard}>
                <div style={styles.railCardTitle}>Vertex Standard Library</div>
                <p style={styles.railCardDesc}>
                  {catalogSize} production-grade packages compiled with deterministic guarantees and static memory safety.
                </p>
                <button
                  onClick={handleBrowseAll}
                  style={styles.railActionBtn}
                >
                  Browse all packages →
                </button>
              </div>

              {/* ProTip Box */}
              <div style={styles.protipBox}>
                <span style={styles.protipLabel}>ProTip!</span>
                <span style={styles.protipText}>
                  Press <kbd className="keycap">/</kbd> anytime to activate the header search bar and adjust your query.
                </span>
              </div>
            </aside>

          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FCFCFB',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  /* Landing View Centering */
  landingCenterContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1.5rem 5rem',
    minHeight: 'calc(100vh - 160px)',
    boxSizing: 'border-box',
  },
  heroInner: {
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandingLockup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    userSelect: 'none',
  },
  logoImg: {
    height: '44px',
    width: 'auto',
    display: 'block',
  },
  logoText: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.5rem',
    fontWeight: 500,
    color: '#1F1E1D',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '999px',
    padding: '0.8rem 1.25rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.04)',
    transition: 'box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    gap: '0.75rem',
    boxSizing: 'border-box',
  },
  searchBoxElevated: {
    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.09), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  },
  searchIcon: {
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#1F1E1D',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  shortcutKey: {
    marginLeft: 'auto',
    flexShrink: 0,
  },
  chipRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1.25rem',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.85rem',
    borderRadius: '999px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    color: '#666660',
    fontSize: '13px',
    fontWeight: 400,
    cursor: 'pointer',
    fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
    transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
  },
  landingOverviewCard: {
    marginTop: '2.25rem',
    width: '100%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    padding: '1.15rem 1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    gap: '1rem',
    boxSizing: 'border-box',
    boxShadow: '0 1px 4px rgba(31, 30, 29, 0.02)',
  },
  landingCardText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  overviewCount: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#1F1E1D',
  },
  overviewSub: {
    fontSize: '12.5px',
    color: '#666660',
    lineHeight: 1.4,
  },
  browseAllBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.45rem 0.85rem',
    borderRadius: '6px',
    backgroundColor: '#F5F4F0',
    border: '1px solid #E8E6DF',
    color: '#1F1E1D',
    fontSize: '12.5px',
    fontWeight: 500,
    cursor: 'pointer',
    flexShrink: 0,
    fontFamily: 'inherit',
    transition: 'border-color 0.15s ease',
  },

  /* GitHub-Style 3-Column Results Body Layer */
  githubLayoutContainer: {
    flex: 1,
    padding: '2rem 2rem 4rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  githubInner: {
    display: 'flex',
    gap: '2rem',
    maxWidth: '1280px',
    width: '100%',
    alignItems: 'flex-start',
  },

  innerMobile: { flexDirection: 'column', gap: '1rem' },
  sidebarMobile: { width: '100%', position: 'static' },
  filterToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.65rem 0.85rem',
    background: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#1F1E1D',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },

  /* Left Filter by Sidebar */
  githubSidebar: {
    width: '230px',
    flexShrink: 0,
    position: 'sticky',
    top: '76px',
    display: 'flex',
    flexDirection: 'column',
  },
  filterByTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1F1E1D',
    paddingBottom: '0.65rem',
    marginBottom: '0.35rem',
    letterSpacing: '-0.01em',
  },
  categoryNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  categoryNavItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.42rem 0.65rem',
    borderRadius: '6px',
    border: 'none',
    background: 'transparent',
    color: '#666660',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    fontFamily: 'inherit',
    width: '100%',
  },
  categoryNavItemActive: {
    backgroundColor: '#F3F1EC',
    color: '#1F1E1D',
    fontWeight: 600,
  },
  catNavLabel: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '0.5rem',
  },
  catNavCount: {
    backgroundColor: '#F3F1EC',
    color: '#8F8D87',
    padding: '1px 7px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 500,
    flexShrink: 0,
  },
  catNavCountActive: {
    backgroundColor: '#E8E6DF',
    color: '#1F1E1D',
    padding: '1px 7px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    flexShrink: 0,
  },
  sidebarDivider: {
    height: '1px',
    backgroundColor: '#E8E6DF',
    margin: '1rem 0 0.85rem',
  },
  filterBySubTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1F1E1D',
    marginBottom: '0.45rem',
  },
  quickTagsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  quickTagBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.35rem 0.65rem',
    borderRadius: '6px',
    border: 'none',
    background: 'transparent',
    color: '#666660',
    fontSize: '12.5px',
    cursor: 'pointer',
    fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
    textAlign: 'left',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    width: '100%',
  },
  quickTagBtnActive: {
    backgroundColor: '#F3F1EC',
    color: '#1F1E1D',
    fontWeight: 600,
  },
  tagDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#8F8D87',
    flexShrink: 0,
  },

  /* Center Results Main */
  githubResultsMain: {
    flex: 1,
    minWidth: 0,
  },
  githubResultsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '0.85rem',
    borderBottom: '1px solid #E8E6DF',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  resultsCountText: {
    fontSize: '14.5px',
    color: '#1F1E1D',
  },
  sortWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  sortLabel: {
    fontSize: '12.5px',
    color: '#666660',
  },
  githubSortSelect: {
    fontSize: '12.5px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #E8E6DF',
    backgroundColor: '#FFFFFF',
    color: '#1F1E1D',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'inherit',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
  },
  noResultsBox: {
    textAlign: 'center',
    padding: '4rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '8px',
  },
  noResultsTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1F1E1D',
    margin: 0,
  },
  noResultsDesc: {
    fontSize: '0.875rem',
    color: '#666660',
    maxWidth: '420px',
    margin: 0,
    lineHeight: 1.5,
  },
  resetSearchBtn: {
    marginTop: '0.5rem',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    border: '1px solid #E8E6DF',
    backgroundColor: '#F5F4F0',
    color: '#1F1E1D',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  /* Right Rail */
  githubRightRail: {
    width: '260px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'sticky',
    top: '76px',
  },
  railCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '6px',
    padding: '1.15rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    boxShadow: '0 1px 3px rgba(31, 30, 29, 0.02)',
  },
  railCardTitle: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#1F1E1D',
  },
  railCardDesc: {
    fontSize: '12.5px',
    color: '#666660',
    lineHeight: 1.45,
    margin: 0,
  },
  railActionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1F1E1D',
    fontSize: '12.5px',
    fontWeight: 500,
    padding: 0,
    textAlign: 'left',
    marginTop: '0.25rem',
    textDecoration: 'underline',
    fontFamily: 'inherit',
  },
  protipBox: {
    backgroundColor: '#FCFCFB',
    border: '1px solid #E8E6DF',
    borderRadius: '6px',
    padding: '0.9rem 1.1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    fontSize: '12px',
    color: '#666660',
    lineHeight: 1.45,
  },
  protipLabel: {
    fontWeight: 600,
    color: '#1F1E1D',
  },
  protipText: {
    color: '#666660',
  },
}
