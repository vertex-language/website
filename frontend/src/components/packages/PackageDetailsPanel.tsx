import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiCopy, FiCheck, FiPackage, FiLayers } from 'react-icons/fi'
import { PackageDetail, PackageSummary } from '../../features/packages/types'

interface PackageDetailsPanelProps {
  pkg: PackageDetail
  siblings?: PackageSummary[]
}

export default function PackageDetailsPanel({ pkg, siblings = [] }: PackageDetailsPanelProps) {
  const [copied, setCopied] = useState(false)

  const copyInstallCmd = () => {
    navigator.clipboard.writeText(`import "${pkg.importPath}"`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Repository display path (e.g. github.com/vertex-language/net)
  const repoDisplay = pkg.repository
    ? pkg.repository.replace(/^https?:\/\//, '')
    : `github.com/vertex-language/${pkg.repo}`

  return (
    <aside style={styles.container}>
      {/* Install Box (NPM Style) */}
      <div style={styles.section}>
        <div style={styles.label}>Install</div>
        <div style={styles.installBox} onClick={copyInstallCmd} role="button" tabIndex={0} title="Click to copy import">
          <div style={styles.installCmd}>
            <span style={styles.promptSign}>&gt;</span>
            <span style={styles.importCode}>import &quot;{pkg.importPath}&quot;</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              copyInstallCmd()
            }}
            style={styles.copyBtn}
            aria-label="Copy import code"
            title="Copy import"
          >
            {copied ? <FiCheck size={14} color="#16A34A" /> : <FiCopy size={14} color="#6B7280" />}
          </button>
        </div>
      </div>

      {/* Repository */}
      <div style={styles.section}>
        <div style={styles.label}>Repository</div>
        <a
          href={pkg.repository}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.linkRow}
        >
          <FiGithub size={14} style={{ color: '#1F1E1D', flexShrink: 0 }} />
          <span style={styles.linkText}>{repoDisplay}</span>
        </a>
      </div>

      {/* Module */}
      <div style={styles.section}>
        <div style={styles.label}>Module</div>
        <div style={styles.textRow}>
          <FiPackage size={14} style={{ color: '#6B7280', flexShrink: 0 }} />
          <span style={styles.plainText}>{pkg.module}</span>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Version & License Grid */}
      <div style={styles.metaGrid}>
        <div>
          <div style={styles.label}>Version</div>
          <div style={styles.valueStrong}>{pkg.version}</div>
        </div>
        <div>
          <div style={styles.label}>License</div>
          <div style={styles.valueStrong}>{pkg.license || 'MIT'}</div>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Symbols Breakdown */}
      <div style={styles.section}>
        <div style={styles.label}>Symbols</div>
        <div style={styles.symbolsGrid}>
          <div style={styles.symbolStat}>
            <span style={styles.symbolNum}>{pkg.symbolCounts?.functions || 0}</span>
            <span style={styles.symbolLabel}>Functions</span>
          </div>
          <div style={styles.symbolStat}>
            <span style={styles.symbolNum}>{pkg.symbolCounts?.types || 0}</span>
            <span style={styles.symbolLabel}>Types</span>
          </div>
          <div style={styles.symbolStat}>
            <span style={styles.symbolNum}>{pkg.symbolCounts?.constants || 0}</span>
            <span style={styles.symbolLabel}>Constants</span>
          </div>
        </div>
      </div>

      {/* Sibling Packages in this module if any */}
      {siblings.length > 0 && (
        <>
          <div style={styles.divider} />
          <div style={styles.section}>
            <div style={styles.label}>
              <FiLayers size={11} style={{ marginRight: 4 }} />
              In this module ({siblings.length})
            </div>
            <div style={styles.siblingList}>
              {siblings.slice(0, 10).map((s) => (
                <Link
                  key={s.id}
                  to={`/packages/${s.slug}`}
                  style={styles.siblingLink}
                  title={s.synopsis}
                >
                  {s.importPath}
                </Link>
              ))}
              {siblings.length > 10 && (
                <span style={styles.moreCount}>+{siblings.length - 10} more</span>
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '0.8125rem',
    color: '#374151',
  },
  section: {
    marginBottom: '1.25rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  installBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  installCmd: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  promptSign: {
    color: '#9CA3AF',
    fontFamily: 'ui-monospace, "SF Mono", monospace',
    fontWeight: 600,
  },
  importCode: {
    fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    fontSize: '0.8125rem',
    color: '#111827',
  },
  copyBtn: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: '0.5rem',
  },
  linkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    color: '#111827',
    textDecoration: 'none',
    fontSize: '0.8125rem',
    fontWeight: 500,
    wordBreak: 'break-all',
  },
  linkText: {
    color: '#111827',
  },
  textRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    fontSize: '0.8125rem',
  },
  plainText: {
    color: '#4B5563',
    wordBreak: 'break-all',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ECEAE4',
    margin: '1.25rem 0',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  valueStrong: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: '#111827',
  },
  symbolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
    textAlign: 'center',
  },
  symbolStat: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #ECEAE4',
    borderRadius: '6px',
    padding: '6px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  symbolNum: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: '#111827',
  },
  symbolLabel: {
    fontSize: '0.6875rem',
    color: '#6B7280',
    marginTop: '1px',
  },
  siblingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  siblingLink: {
    color: '#2563EB',
    textDecoration: 'none',
    fontSize: '0.78125rem',
    fontFamily: 'ui-monospace, "SF Mono", monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  moreCount: {
    fontSize: '0.75rem',
    color: '#9CA3AF',
    marginTop: '0.2rem',
  },
}
