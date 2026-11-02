import { useState, useMemo, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiChevronRight, FiSearch, FiFolder } from 'react-icons/fi'
import { PackageDetail, PackageSummary } from '../../features/packages/types'

interface PackageSidebarProps {
  pkg: PackageDetail
  siblings: PackageSummary[]
}

export default function PackageSidebar({ pkg, siblings }: PackageSidebarProps) {
  const [filter, setFilter] = useState('')
  const [functionsOpen, setFunctionsOpen] = useState(true)
  const [typesOpen, setTypesOpen] = useState(true)
  const [filesOpen, setFilesOpen] = useState(false)
  const [dirsOpen, setDirsOpen] = useState(true)

  const tree = pkg.indexTree

  const filteredFunctions = useMemo(() => {
    if (!filter) return tree.functions
    const q = filter.toLowerCase()
    return tree.functions.filter((fn) => fn.name?.toLowerCase().includes(q))
  }, [tree.functions, filter])

  const filteredTypes = useMemo(() => {
    if (!filter) return tree.types
    const q = filter.toLowerCase()
    return tree.types.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.members?.some((m) => m.signature.toLowerCase().includes(q))
    )
  }, [tree.types, filter])

  const scrollToAnchor = (anchor: string) => {
    const el = document.getElementById(anchor) || document.querySelector(`a[id="${anchor}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside style={styles.sidebar}>
      {/* Jump to search input */}
      <div style={styles.jumpWrap}>
        <div style={styles.jumpInputContainer}>
          <FiSearch size={13} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Jump to..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.jumpInput}
          />
          {filter && (
            <button onClick={() => setFilter('')} style={styles.clearBtn}>
              ×
            </button>
          )}
        </div>
      </div>

      <div style={styles.sectionHeader}>Documentation</div>

      <nav style={styles.nav}>
        {/* Overview */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={styles.navLink}
        >
          Overview
        </a>

        {/* Index */}
        <a
          href="#index"
          onClick={(e) => {
            e.preventDefault()
            scrollToAnchor('index')
          }}
          style={styles.navLink}
        >
          Index
        </a>

        {/* Constants */}
        {tree.constants && tree.constants.length > 0 && (
          <a
            href="#constants"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('constants')
            }}
            style={styles.navLink}
          >
            Constants
          </a>
        )}

        {/* Variables */}
        {tree.variables && tree.variables.length > 0 && (
          <a
            href="#variables"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('variables')
            }}
            style={styles.navLink}
          >
            Variables
          </a>
        )}

        {/* Functions Section */}
        {filteredFunctions.length > 0 && (
          <div style={styles.group}>
            <button
              onClick={() => setFunctionsOpen(!functionsOpen)}
              style={styles.groupBtn}
            >
              {functionsOpen ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
              <span>Functions ({filteredFunctions.length})</span>
            </button>
            {functionsOpen && (
              <div style={styles.groupList}>
                {filteredFunctions.map((fn, idx) => (
                  <a
                    key={`${fn.anchor}-${idx}`}
                    href={`#${fn.anchor}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToAnchor(fn.anchor)
                    }}
                    style={styles.subLink}
                    title={fn.signature}
                  >
                    func {fn.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Types Section */}
        {filteredTypes.length > 0 && (
          <div style={styles.group}>
            <button
              onClick={() => setTypesOpen(!typesOpen)}
              style={styles.groupBtn}
            >
              {typesOpen ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
              <span>Types ({filteredTypes.length})</span>
            </button>
            {typesOpen && (
              <div style={styles.groupList}>
                {filteredTypes.map((t, idx) => (
                  <div key={`${t.anchor}-${idx}`} style={styles.typeBlock}>
                    <a
                      href={`#${t.anchor}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToAnchor(t.anchor)
                      }}
                      style={styles.typeLink}
                    >
                      <span style={styles.typeKind}>{t.kind}</span> {t.name}
                    </a>
                    {t.members && t.members.length > 0 && (
                      <div style={styles.memberList}>
                        {t.members.slice(0, 8).map((m, mIdx) => (
                          <a
                            key={`${m.anchor}-${mIdx}`}
                            href={`#${m.anchor}`}
                            onClick={(e) => {
                              e.preventDefault()
                              scrollToAnchor(m.anchor)
                            }}
                            style={styles.memberLink}
                            title={m.signature}
                          >
                            {m.signature.replace(/\{.*?\}|->.*/g, '').trim()}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Source Files */}
        {tree.files && tree.files.length > 0 && (
          <div style={styles.group}>
            <button
              onClick={() => setFilesOpen(!filesOpen)}
              style={styles.groupBtn}
            >
              {filesOpen ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
              <span>Source Files ({tree.files.length})</span>
            </button>
            {filesOpen && (
              <div style={styles.groupList}>
                {tree.files.map((f) => (
                  <span key={f} style={styles.fileItem}>
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Directories / Sibling Packages */}
        {siblings.length > 0 && (
          <div style={styles.group}>
            <button
              onClick={() => setDirsOpen(!dirsOpen)}
              style={styles.groupBtn}
            >
              {dirsOpen ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
              <span>Directories ({siblings.length})</span>
            </button>
            {dirsOpen && (
              <div style={styles.groupList}>
                {siblings.map((sib) => (
                  <Link
                    key={sib.id}
                    to={`/packages/${sib.slug}`}
                    style={styles.sibLink}
                  >
                    <FiFolder size={11} color="#6B7280" />
                    <span>{sib.importPath}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  )
}

const styles: Record<string, CSSProperties> = {
  sidebar: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '0.8125rem',
    color: '#374151',
    width: '100%',
  },
  jumpWrap: {
    marginBottom: '1rem',
  },
  jumpInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    padding: '5px 8px',
  },
  jumpInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.8125rem',
    width: '100%',
    color: '#1F2937',
    fontFamily: 'inherit',
    background: 'transparent',
  },
  clearBtn: {
    border: 'none',
    background: 'transparent',
    color: '#9CA3AF',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: 1,
    padding: '0 2px',
  },
  sectionHeader: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.65rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  navLink: {
    display: 'block',
    padding: '4px 8px',
    color: '#374151',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.15s',
  },
  group: {
    marginTop: '0.4rem',
  },
  groupBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    width: '100%',
    padding: '4px 6px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#1F2937',
    fontWeight: 500,
    fontSize: '0.8125rem',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  groupList: {
    paddingLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
    marginTop: '0.2rem',
  },
  subLink: {
    color: '#0284C7',
    textDecoration: 'none',
    padding: '2px 4px',
    fontSize: '0.75rem',
    fontFamily: 'ui-monospace, "SF Mono", monospace',
    borderRadius: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  typeBlock: {
    marginBottom: '0.3rem',
  },
  typeLink: {
    color: '#0284C7',
    textDecoration: 'none',
    fontSize: '0.78125rem',
    fontFamily: 'ui-monospace, "SF Mono", monospace',
    display: 'block',
    padding: '2px 4px',
  },
  typeKind: {
    color: '#6B7280',
    fontSize: '0.6875rem',
    fontFamily: 'inherit',
  },
  memberList: {
    paddingLeft: '0.65rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.1rem',
  },
  memberLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontSize: '0.71875rem',
    fontFamily: 'ui-monospace, "SF Mono", monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '1px 2px',
  },
  fileItem: {
    color: '#6B7280',
    fontSize: '0.75rem',
    padding: '2px 4px',
    fontFamily: 'ui-monospace, monospace',
  },
  sibLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    color: '#2563EB',
    textDecoration: 'none',
    padding: '3px 4px',
    fontSize: '0.75rem',
  },
}
