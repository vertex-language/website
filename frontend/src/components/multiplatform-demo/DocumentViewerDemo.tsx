import React, { useState } from 'react'
import { 
  FiFileText, 
  FiCheck, 
  FiCopy, 
  FiCode, 
  FiPlay, 
  FiZoomIn, 
  FiZoomOut,
  FiBold,
  FiItalic,
  FiList
} from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

type PlatformTarget = 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android' | 'Web'

const DOC_VSX_CODE = `package main

import (
    "ui/app"
    "ui/doc"
    "ui/state"
    "io/fs"
)

struct DocumentSpec {
    var title: string
    var version: string
    var approved: bool
    var targets: [string]
}

func DocumentViewer() -> Node {
    @state.State var doc = DocumentSpec(
        title: "Multi-Platform Architecture Spec",
        version: "v2.4",
        approved: true,
        targets: ["macOS", "Windows", "Linux", "iOS", "Android", "WebAssembly"]
    )
    @state.State var zoomLevel = 100
    @state.State var searchQuery = ""

    return (
        <div class="doc-viewer-canvas">
            <header class="doc-toolbar">
                <span class="file-name">{doc.title}.docx</span>
                <span class="badge-approved">Approved</span>
            </header>

            <article class="doc-page">
                <h1>{doc.title}</h1>
                <p class="meta">Version {doc.version} • Universal Target Specification</p>

                <div class="callout-box">
                    Single-source compilation for desktop, mobile, and web targets
                    with deterministic memory and zero runtime overhead.
                </div>

                <section class="matrix-section">
                    <h3>Supported Platform Targets</h3>
                    <ul class="target-grid">
                        <For each={doc.targets} key={t in t}>
                            {t in <li class="target-pill">✓ {t}</li>}
                        </For>
                    </ul>
                </section>
            </article>
        </div>
    )
}

func main() async -> int32 {
    // Mounts directly to OS window or WebAssembly canvas
    return await app.Run(title: "Document Viewer", width: 440, height: 620) {
        <DocumentViewer />
    }
}
`

export default function DocumentViewerDemo() {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [activeTarget, setActiveTarget] = useState<PlatformTarget>('macOS')
  const [zoom, setZoom] = useState(100)

  const handleCopy = () => {
    navigator.clipboard.writeText(DOC_VSX_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const platforms: PlatformTarget[] = ['macOS', 'Windows', 'Linux', 'iOS', 'Android', 'Web']

  return (
    <div style={styles.wrapper}>
      {/* Top Segmented Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.segmentedToggle}>
          <button
            onClick={() => setMode('preview')}
            style={{
              ...styles.toggleBtn,
              ...(mode === 'preview' ? styles.toggleBtnActive : {}),
            }}
          >
            <FiPlay size={11} /> Live App
          </button>
          <button
            onClick={() => setMode('code')}
            style={{
              ...styles.toggleBtn,
              ...(mode === 'code' ? styles.toggleBtnActive : {}),
            }}
          >
            <FiCode size={11} /> See Code
          </button>
        </div>

        {mode === 'code' && (
          <button onClick={handleCopy} style={styles.copyBtn}>
            {copied ? (
              <>
                <FiCheck size={11} color="#2E7D52" /> Copied
              </>
            ) : (
              <>
                <FiCopy size={11} /> Copy Code
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Container: Document Viewer App Frame */}
      {mode === 'preview' ? (
        <div style={styles.appContainer}>
          {/* Top Window Bar with Target Switcher */}
          <div style={styles.windowHeader}>
            <div style={styles.fileInfo}>
              <div style={styles.docIconBox}>
                <FiFileText size={14} color="#FFFFFF" />
              </div>
              <div>
                <span style={styles.docTitle}>Architecture_Spec.docx</span>
                <span style={styles.docSub}>Word Document Viewer</span>
              </div>
            </div>

            {/* Target Platform Selector */}
            <div style={styles.targetPillGroup}>
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setActiveTarget(p)}
                  style={{
                    ...styles.targetBtn,
                    ...(activeTarget === p ? styles.targetBtnActive : {}),
                  }}
                  title={`Running on ${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Mini Formatting & Action Ribbon */}
          <div style={styles.formatRibbon}>
            <div style={styles.ribbonLeft}>
              <span style={styles.fontSelect}>Normal text</span>
              <div style={styles.divider} />
              <button style={styles.ribbonBtn} title="Bold"><FiBold size={12} /></button>
              <button style={styles.ribbonBtn} title="Italic"><FiItalic size={12} /></button>
              <button style={styles.ribbonBtn} title="List"><FiList size={12} /></button>
            </div>

            <div style={styles.ribbonRight}>
              <div style={styles.zoomControl}>
                <button 
                  onClick={() => setZoom(z => Math.max(80, z - 10))} 
                  style={styles.zoomBtn}
                  aria-label="Zoom out"
                >
                  <FiZoomOut size={11} />
                </button>
                <span style={styles.zoomVal}>{zoom}%</span>
                <button 
                  onClick={() => setZoom(z => Math.min(120, z + 10))} 
                  style={styles.zoomBtn}
                  aria-label="Zoom in"
                >
                  <FiZoomIn size={11} />
                </button>
              </div>

              <div style={styles.targetBadge}>
                <span style={styles.targetDot} />
                <span>{activeTarget} Target</span>
              </div>
            </div>
          </div>

          {/* Scrollable Canvas Area with Document Page */}
          <div style={styles.canvasScrollArea}>
            <div 
              style={{
                ...styles.documentSheet,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              {/* Document Header */}
              <div style={styles.docHeaderSection}>
                <div style={styles.docStatusRow}>
                  <span style={styles.docBadge}>System Architecture</span>
                  <span style={styles.approvedBadge}>✓ Approved Spec</span>
                </div>
                <h1 style={styles.sheetMainTitle}>Vertex Multi-Platform Specification</h1>
                <p style={styles.sheetSubtitle}>
                  Version 2.4 • Universal Deployment Architecture • Cross-Platform Engine
                </p>
              </div>

              {/* Callout Quote Block */}
              <div style={styles.calloutCard}>
                <p style={styles.calloutText}>
                  "Single-source compilation for desktop, mobile, server, and web targets with deterministic memory and zero runtime overhead."
                </p>
              </div>

              {/* Section 1: Platform Compatibility Matrix */}
              <div style={styles.docSection}>
                <h2 style={styles.sectionHeading}>1. Target Compatibility Matrix</h2>
                <div style={styles.matrixTable}>
                  <div style={styles.tableHeaderRow}>
                    <span style={styles.thCol1}>Target Platform</span>
                    <span style={styles.thCol2}>Architecture</span>
                    <span style={styles.thCol3}>Status</span>
                  </div>
                  <div style={styles.tableRow}>
                    <span style={styles.tdCol1}>macOS & iOS</span>
                    <span style={styles.tdCol2}>ARM64 / x86_64</span>
                    <span style={styles.statusActive}>✓ Verified</span>
                  </div>
                  <div style={styles.tableRow}>
                    <span style={styles.tdCol1}>Linux & Android</span>
                    <span style={styles.tdCol2}>ARM64 / x86_64</span>
                    <span style={styles.statusActive}>✓ Verified</span>
                  </div>
                  <div style={styles.tableRow}>
                    <span style={styles.tdCol1}>Windows</span>
                    <span style={styles.tdCol2}>x86_64 / ARM64</span>
                    <span style={styles.statusActive}>✓ Verified</span>
                  </div>
                  <div style={styles.tableRow}>
                    <span style={styles.tdCol1}>WebAssembly</span>
                    <span style={styles.tdCol2}>wasm32-wasi</span>
                    <span style={styles.statusActive}>✓ Verified</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Unified Execution */}
              <div style={styles.docSection}>
                <h2 style={styles.sectionHeading}>2. Execution & UI Surfaces</h2>
                <p style={styles.bodyParagraph}>
                  User interface components and data models compiled with Vertex execute identically on host display surfaces without platform-specific forks or emulation layers.
                </p>
              </div>

              {/* Document Footer */}
              <div style={styles.sheetFooter}>
                <span>Page 1 of 1</span>
                <span>Compiled with Vertex Toolchain</span>
              </div>
            </div>
          </div>

          {/* Bottom App Footer Info Bar */}
          <div style={styles.appStatusBar}>
            <span>100% Cross-Platform Codebase</span>
            <span style={styles.syncStatus}>● Synchronized across all targets</span>
          </div>
        </div>
      ) : (
        /* See Code View */
        <div style={styles.codeFrame}>
          <div style={styles.codeHeader}>
            <span style={styles.codeTitle}>DocumentViewer.vsx • package main</span>
            <span style={styles.codeBadge}>Universal Target</span>
          </div>

          <div style={styles.codeScroll}>
            <VertexCode
              code={DOC_VSX_CODE}
              theme={vertexFreshLightTheme}
            />
          </div>

          <div style={styles.codeFooter}>
            <span>Compiles to macOS, Windows, Linux, iOS, Android, and WebAssembly with zero code changes.</span>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  toolbar: {
    width: '100%',
    maxWidth: '460px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0 4px',
  },
  segmentedToggle: {
    display: 'flex',
    backgroundColor: '#F0EEE6',
    padding: '2px',
    borderRadius: '8px',
    gap: '2px',
  },
  toggleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    fontSize: '11.5px',
    fontWeight: 500,
    color: '#666660',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    color: '#1F1E1D',
    fontWeight: 600,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  copyBtn: {
    position: 'absolute',
    right: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 500,
    color: '#4B4A45',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },

  // Document Viewer App Window
  appContainer: {
    width: '100%',
    maxWidth: '460px',
    height: '630px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    border: '1px solid #E8E6DF',
    boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.08), 0 4px 16px -2px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  // Window Header with File info and Target Switcher
  windowHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px 14px 8px 14px',
    backgroundColor: '#FAF9F6',
    borderBottom: '1px solid #F0EEE6',
    flexShrink: 0,
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  docIconBox: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: '#2160C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  docTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1F1E1D',
    display: 'block',
    lineHeight: 1.2,
  },
  docSub: {
    fontSize: '10px',
    color: '#73726C',
    display: 'block',
  },
  targetPillGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap',
  },
  targetBtn: {
    padding: '2px 8px',
    fontSize: '10px',
    fontWeight: 500,
    borderRadius: '12px',
    border: '1px solid #E8E6DF',
    backgroundColor: '#FFFFFF',
    color: '#666660',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  targetBtnActive: {
    backgroundColor: '#2160C4',
    borderColor: '#2160C4',
    color: '#FFFFFF',
    fontWeight: 600,
  },

  // Ribbon
  formatRibbon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 14px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F0EEE6',
    fontSize: '11px',
    flexShrink: 0,
  },
  ribbonLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  fontSelect: {
    fontSize: '11px',
    color: '#4B4A45',
    fontWeight: 500,
  },
  divider: {
    width: '1px',
    height: '14px',
    backgroundColor: '#E8E6DF',
    margin: '0 2px',
  },
  ribbonBtn: {
    background: 'none',
    border: 'none',
    padding: '3px 5px',
    color: '#666660',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribbonRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  zoomControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#F3F1EC',
    borderRadius: '6px',
    padding: '1px 5px',
  },
  zoomBtn: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#4B4A45',
  },
  zoomVal: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#4B4A45',
    minWidth: '28px',
    textAlign: 'center',
  },
  targetBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#2E7D52',
    backgroundColor: '#E8F3EC',
    padding: '1px 6px',
    borderRadius: '10px',
  },
  targetDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#2E7D52',
  },

  // Canvas
  canvasScrollArea: {
    flexGrow: 1,
    overflowY: 'auto',
    backgroundColor: '#F7F6F2',
    padding: '14px 12px',
    display: 'flex',
    justifyContent: 'center',
  },
  documentSheet: {
    width: '100%',
    maxWidth: '410px',
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    border: '1px solid #E8E6DF',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'transform 0.2s ease',
  },
  docHeaderSection: {
    borderBottom: '1px solid #F0EEE6',
    paddingBottom: '10px',
  },
  docStatusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  docBadge: {
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#2160C4',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  approvedBadge: {
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#2E7D52',
    backgroundColor: '#E8F3EC',
    padding: '1px 5px',
    borderRadius: '4px',
  },
  sheetMainTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#1F1E1D',
    lineHeight: 1.25,
    margin: '0 0 4px 0',
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  },
  sheetSubtitle: {
    fontSize: '10px',
    color: '#73726C',
    margin: 0,
  },
  calloutCard: {
    backgroundColor: '#FAF9F6',
    borderLeft: '3px solid #2160C4',
    padding: '8px 10px',
    borderRadius: '0 6px 6px 0',
  },
  calloutText: {
    fontSize: '10.5px',
    fontStyle: 'italic',
    color: '#334155',
    lineHeight: 1.45,
    margin: 0,
  },
  docSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionHeading: {
    fontSize: '11.5px',
    fontWeight: 700,
    color: '#1F1E1D',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  matrixTable: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #F0EEE6',
    borderRadius: '6px',
    overflow: 'hidden',
    fontSize: '10px',
  },
  tableHeaderRow: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1.2fr 0.8fr',
    padding: '5px 8px',
    backgroundColor: '#FAF9F6',
    fontWeight: 600,
    color: '#4B4A45',
    borderBottom: '1px solid #F0EEE6',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1.2fr 0.8fr',
    padding: '5px 8px',
    borderBottom: '1px solid #F6F5F2',
    color: '#1F1E1D',
    alignItems: 'center',
  },
  thCol1: {},
  thCol2: {},
  thCol3: { textAlign: 'right' },
  tdCol1: { fontWeight: 500 },
  tdCol2: { color: '#73726C', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '9px' },
  statusActive: {
    fontSize: '9.5px',
    fontWeight: 600,
    color: '#2E7D52',
    textAlign: 'right',
  },
  bodyParagraph: {
    fontSize: '10px',
    color: '#55544E',
    lineHeight: 1.5,
    margin: 0,
  },
  sheetFooter: {
    marginTop: 'auto',
    paddingTop: '8px',
    borderTop: '1px dashed #E8E6DF',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '8.5px',
    color: '#9E9D95',
  },

  // App Status Bar
  appStatusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 14px',
    backgroundColor: '#FAF9F6',
    borderTop: '1px solid #F0EEE6',
    fontSize: '10px',
    color: '#666660',
    flexShrink: 0,
  },
  syncStatus: {
    color: '#2160C4',
    fontWeight: 500,
  },

  // Code Frame
  codeFrame: {
    width: '100%',
    maxWidth: '460px',
    height: '630px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    border: '1px solid #E8E6DF',
    boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.65rem 0.85rem',
    backgroundColor: '#FAF9F6',
    borderBottom: '1px solid #F0EEE6',
  },
  codeTitle: {
    fontSize: '11.5px',
    fontWeight: 600,
    color: '#4B4A45',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  codeBadge: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#2160C4',
    backgroundColor: '#EEF4FC',
    padding: '1px 6px',
    borderRadius: '4px',
  },
  codeScroll: {
    flexGrow: 1,
    overflowY: 'auto',
    fontSize: '11px',
  },
  codeFooter: {
    padding: '0.65rem 0.85rem',
    backgroundColor: '#FAF9F6',
    borderTop: '1px solid #F0EEE6',
    fontSize: '10.5px',
    color: '#2160C4',
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: 1.4,
  },
}
