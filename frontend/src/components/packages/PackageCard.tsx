import React from 'react'
import { Link } from 'react-router-dom'
import { FiPackage } from 'react-icons/fi'
import { PackageSummary } from '../../features/packages/types'
import { formatInlineCode } from '../docs/inlineCode'

interface PackageCardProps {
  pkg: PackageSummary
  query?: string
  onTagClick?: (tag: string) => void
}

export default function PackageCard({ pkg, onTagClick }: PackageCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div style={styles.card}>
      {/* Title */}
      <div style={styles.headerRow}>
        <Link
          to={`/packages/${pkg.slug}`}
          className="package-item-title"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            ...styles.titleLink,
            textDecoration: isHovered ? 'underline' : 'none',
            textDecorationColor: '#1F1E1D',
          }}
        >
          <span style={styles.pkgName}>{pkg.importPath}</span>
        </Link>
      </div>

      {/* Synopsis */}
      <p style={styles.synopsis}>{formatInlineCode(pkg.synopsis)}</p>

      {/* A few real exports; clicking one searches for it */}
      {pkg.topSymbols && pkg.topSymbols.length > 0 && (
        <div style={styles.tagList}>
          {pkg.topSymbols.map((name) => (
            <button
              key={name}
              onClick={(e) => {
                e.preventDefault()
                onTagClick?.(name.toLowerCase())
              }}
              style={styles.tag}
              title={`Search for ${name}`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Metadata Line */}
      <div style={styles.metaRow}>
        <span style={styles.publisherBadge}>
          <span style={styles.avatarDot}>
            <FiPackage size={11} color="#666660" />
          </span>
          <span style={styles.publisherText}>vertex-language</span>
        </span>
        <span style={styles.metaSep}>•</span>
        <span style={styles.metaItem}>{pkg.version}</span>
        <span style={styles.metaSep}>•</span>
        <span style={styles.metaItem}>
          {pkg.symbolCounts.functions} funcs, {pkg.symbolCounts.types} types
        </span>
        <span style={styles.metaSep}>•</span>
        <span style={styles.metaItem}>{pkg.license}</span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ECEAE4',
    padding: '1.15rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
  },
  titleLink: {
    textDecoration: 'none',
    color: '#1F1E1D',
  },
  pkgName: {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: '#1F1E1D',
    letterSpacing: '-0.015em',
  },
  synopsis: {
    fontSize: '0.875rem',
    color: '#555550',
    lineHeight: 1.45,
    margin: '0.05rem 0',
    // Long descriptions stop at three lines; the package page has the rest.
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
    margin: '0.15rem 0',
  },
  tag: {
    background: '#F3F1EC',
    border: '1px solid #E8E6DF',
    borderRadius: '3px',
    padding: '2px 6px',
    fontSize: '0.72rem',
    color: '#555550',
    cursor: 'pointer',
    fontFamily: "'SF Mono', ui-monospace, Menlo, Consolas, monospace",
    transition: 'border-color 0.15s, color 0.15s, background-color 0.15s',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0.15rem',
    fontSize: '0.8125rem',
    color: '#8F8D87',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  publisherBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  avatarDot: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#F3F1EC',
    border: '1px solid #E8E6DF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publisherText: {
    fontWeight: 500,
    color: '#1F1E1D',
  },
  metaSep: {
    color: '#D8D5CD',
  },
  metaItem: {
    color: '#73716C',
  },
}
