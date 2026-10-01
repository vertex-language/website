import { useState, useEffect, useMemo } from 'react'
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiPackage, FiFileText, FiCode } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PackageDocViewer from '../components/packages/PackageDocViewer'
import PackageDetailsPanel from '../components/packages/PackageDetailsPanel'
import { getPackageById, getSiblingPackages } from '../features/packages/packageService'
import { PackageDetail, PackageSummary } from '../features/packages/types'

export default function PackageDetailView() {
  const params = useParams()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const slug = params['*'] || params.slug || ''
  const [pkg, setPkg] = useState<PackageDetail | null>(null)
  const [siblings, setSiblings] = useState<PackageSummary[]>([])
  const [loading, setLoading] = useState(true)

  // Active tab: 'readme' or 'doc'
  const initialTab =
    location.hash || searchParams.get('tab') === 'doc' || searchParams.get('tab') === 'documentation'
      ? 'doc'
      : 'readme'
  const [activeTab, setActiveTab] = useState<'readme' | 'doc'>(initialTab)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    if (slug) {
      getPackageById(slug).then((data) => {
        if (isMounted) {
          setPkg(data)
          if (data) {
            setSiblings(getSiblingPackages(data.repo, data.id))
          }
          setLoading(false)

          // If there was a hash in URL on initial load, scroll to it smoothly
          if (location.hash) {
            setActiveTab('doc')
            setTimeout(() => {
              const el = document.getElementById(location.hash.slice(1))
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          } else {
            window.scrollTo(0, 0)
          }
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [slug])

  // Handle tab switching
  const handleTabChange = (tab: 'readme' | 'doc') => {
    setActiveTab(tab)
    const nextParams = new URLSearchParams(searchParams)
    if (tab === 'doc') {
      nextParams.set('tab', 'doc')
    } else {
      nextParams.delete('tab')
    }
    setSearchParams(nextParams, { replace: true })
  }

  // Documentation markdown: strip redundant top `# package <name>` and `import "..."`
  // so it jumps directly into `## Index` after our Overview section.
  const cleanDocContent = useMemo(() => {
    if (!pkg?.content) return ''
    let text = pkg.content
    // Strip leading '# package ...'
    text = text.replace(/^#\s+package\s+[^\n]+\n+/, '')
    // Strip leading codeblock '```vertex \n import "..." \n ```'
    text = text.replace(/^```vertex\s+import\s+["'][^"']+["']\s*```\n+/m, '')
    return text.trim()
  }, [pkg?.content])

  if (loading) {
    return (
      <div style={styles.page}>
        <Header />
        <main style={styles.loadingContainer}>
          <div style={styles.loadingSpinner} />
          <p style={styles.loadingText}>Loading documentation for {slug}...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!pkg) {
    return (
      <div style={styles.page}>
        <Header />
        <main style={styles.errorContainer}>
          <FiPackage size={40} color="#9CA3AF" />
          <h2 style={styles.errorTitle}>Package Not Found</h2>
          <p style={styles.errorMsg}>We couldn't find a package matching &quot;{slug}&quot;.</p>
          <Link to="/packages" style={styles.backBtn}>
            <FiArrowLeft size={14} /> Back to Packages
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Header />

      {/* Package Header Banner (Transparent background, centered 1px middle bottom border) */}
      <section style={styles.topBanner}>
        <div style={styles.bannerInner}>
          {/* Package Title */}
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{pkg.name}</h1>
          </div>

          {/* Subtitle / Meta Bar */}
          <div style={styles.metaBar}>
            <span style={styles.metaItem}>{pkg.version}</span>
            <span style={styles.metaDot}>•</span>
            <span style={styles.metaItem}>Public</span>
            <span style={styles.metaDot}>•</span>
            <span style={styles.metaItem}>Published vertex-language</span>
            <span style={styles.metaDot}>•</span>
            <span style={styles.metaItem}>Standard Library</span>
          </div>

          {/* Tab Navigation Row */}
          <div style={styles.tabsRow}>
            <button
              onClick={() => handleTabChange('readme')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'readme' ? styles.tabButtonActive : {}),
              }}
            >
              <FiFileText size={15} style={styles.tabIcon} />
              <span>Readme</span>
            </button>

            <button
              onClick={() => handleTabChange('doc')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'doc' ? styles.tabButtonActive : {}),
              }}
            >
              <FiCode size={15} style={styles.tabIcon} />
              <span>Documentation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Flat 2-Column Body (No Left Sidebar!) */}
      <div style={styles.contentWrap}>
        <div className="package-detail-flex">
          {/* Left/Main Column: Rendered Markdown Content */}
          <main style={styles.mainCol}>
            {activeTab === 'readme' ? (
              <article style={styles.docArticle}>
                <PackageDocViewer content={pkg.readme} />
              </article>
            ) : (
              <article style={styles.docArticle}>
                {/* Header matching Documentation screenshot */}
                <div style={styles.docSectionHeader}>
                  <div style={styles.docSectionTitle}>
                    <FiCode size={18} style={{ marginRight: '0.5rem', color: '#1F1E1D' }} />
                    <span>Documentation</span>
                  </div>
                </div>

                {/* Overview Section */}
                {pkg.synopsis && (
                  <section style={styles.overviewSection}>
                    <h2 style={styles.overviewHeading}>Overview</h2>
                    <p style={styles.overviewText}>{pkg.synopsis}</p>
                  </section>
                )}

                {/* Go-doc Index and Full Symbol API Documentation */}
                <PackageDocViewer content={cleanDocContent} />
              </article>
            )}
          </main>

          {/* Right Column: NPM-style sidebar */}
          <aside className="package-detail-sidebar" style={styles.sidebarCol}>
            <div style={styles.stickySidebar}>
              <PackageDetailsPanel pkg={pkg} siblings={siblings} />
            </div>
          </aside>
        </div>
      </div>

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
  topBanner: {
    backgroundColor: 'transparent',
    paddingTop: '2rem',
  },
  bannerInner: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '0 1.5rem',
    borderBottom: '1px solid #ECEAE4',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.35rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  metaBar: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    fontSize: '0.84rem',
    color: '#71717A',
    marginBottom: '1.25rem',
  },
  metaItem: {
    color: '#71717A',
  },
  metaDot: {
    color: '#D4D4D8',
    fontSize: '0.75rem',
  },
  tabsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '1px solid #ECEAE4',
    marginTop: '0.5rem',
    marginBottom: '-1px',
  },
  tabButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.65rem 1.15rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#6B7280',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'color 0.15s ease, border-color 0.15s ease',
  },
  tabButtonActive: {
    color: '#111827',
    fontWeight: 600,
    borderBottom: '2px solid #111827',
  },
  tabIcon: {
    flexShrink: 0,
  },
  contentWrap: {
    maxWidth: '1240px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    flex: 1,
  },
  layoutFlex: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '3rem',
  },
  mainCol: {
    flex: 1,
    minWidth: 0,
  },
  sidebarCol: {
    width: '290px',
    flexShrink: 0,
  },
  stickySidebar: {
    position: 'sticky',
    top: '80px',
  },
  docArticle: {
    lineHeight: 1.6,
  },
  docSectionHeader: {
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #ECEAE4',
    marginBottom: '1.75rem',
  },
  docSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#111827',
    letterSpacing: '-0.02em',
  },
  overviewSection: {
    marginBottom: '2rem',
  },
  overviewHeading: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111827',
    marginTop: 0,
    marginBottom: '0.5rem',
    letterSpacing: '-0.015em',
  },
  overviewText: {
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: '#374151',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '1rem',
  },
  loadingSpinner: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #E5E7EB',
    borderTopColor: '#1F1E1D',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: '0.875rem',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '0.75rem',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  errorMsg: {
    color: '#6B7280',
    fontSize: '0.875rem',
    margin: 0,
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    textDecoration: 'none',
  },
}
