import React, { useState } from 'react'
import { 
  FiCheck, 
  FiCopy, 
  FiCode, 
  FiPlay, 
  FiTrendingDown 
} from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

const VSX_DASHBOARD_CODE = `package main

import (
    "ui/app"
    "ui/chart"
    "ui/state"
)

func Dashboard() -> Node {
    @state.State var avgLatency = 14.2
    @state.State var status = "-41.3% faster"
    @state.State var points: [Double] = [24.2, 21.0, 22.4, 18.1, 19.2, 15.6, 14.2]

    return (
        <div class="dashboard">
            <header class="header">
                <h1>Dashboard</h1>
                <span class="period">Past 7 days</span>
            </header>

            <section class="chart-card">
                <span class="label">Avg. Latency</span>
                <div class="stat-row">
                    <span class="value">{avgLatency} ms</span>
                    <span class="trend-badge">{status}</span>
                </div>

                <chart.LineGraph 
                    data={points} 
                    curve="smooth" 
                    stroke="#2160C4" 
                    fill="gradient" 
                />
            </section>
        </div>
    )
}
`

export default function DashboardGraphDemo() {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [activePoint, setActivePoint] = useState<number | null>(6)

  const handleCopy = () => {
    navigator.clipboard.writeText(VSX_DASHBOARD_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Data points for the latency line graph (improving latency over the week)
  const points = [
    { x: 10, y: 35, label: 'Mon', val: '24.2 ms' },
    { x: 55, y: 55, label: 'Tue', val: '21.0 ms' },
    { x: 100, y: 48, label: 'Wed', val: '22.4 ms' },
    { x: 145, y: 78, label: 'Thu', val: '18.1 ms' },
    { x: 190, y: 70, label: 'Fri', val: '19.2 ms' },
    { x: 235, y: 102, label: 'Sat', val: '15.6 ms' },
    { x: 280, y: 116, label: 'Sun', val: '14.2 ms' },
  ]

  // Smooth SVG Path definition (cubic bezier)
  const pathD = `
    M ${points[0].x} ${points[0].y}
    C 30 40, 40 50, ${points[1].x} ${points[1].y}
    C 70 60, 85 44, ${points[2].x} ${points[2].y}
    C 115 52, 130 74, ${points[3].x} ${points[3].y}
    C 160 82, 175 66, ${points[4].x} ${points[4].y}
    C 205 74, 220 98, ${points[5].x} ${points[5].y}
    C 250 106, 265 114, ${points[6].x} ${points[6].y}
  `

  const fillD = `
    ${pathD}
    L 280 145
    L 10 145
    Z
  `

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

      {/* Main Container: Minimal Clean Dashboard Frame */}
      {mode === 'preview' ? (
        <div style={styles.deviceFrame}>
          {/* Status Bar */}
          <div style={styles.statusBar}>
            <span style={styles.statusTime}>9:41</span>
            <div style={styles.statusIcons}>
              <svg width="15" height="11" viewBox="0 0 17 11" fill="none">
                <rect x="0.5" y="8" width="2.5" height="3" rx="0.5" fill="#1F1E1D" />
                <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill="#1F1E1D" />
                <rect x="8.5" y="3" width="2.5" height="8" rx="0.5" fill="#1F1E1D" />
                <rect x="12.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill="#1F1E1D" />
              </svg>
              <svg width="15" height="11" viewBox="0 0 16 11" fill="none">
                <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.6C13.9 1.5 11.1 0.2 8 0.2C4.9 0.2 2.1 1.5 0 3.6L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5Z" fill="#1F1E1D" />
                <path d="M8 6.5C9.7 6.5 11.2 7.2 12.4 8.4L14 6.8C12.5 5.3 10.4 4.3 8 4.3C5.6 4.3 3.5 5.3 2 6.8L3.6 8.4C4.8 7.2 6.3 6.5 8 6.5Z" fill="#1F1E1D" />
                <circle cx="8" cy="10" r="1.5" fill="#1F1E1D" />
              </svg>
              <div style={styles.batteryPill}>
                <div style={styles.batteryFill} />
              </div>
            </div>
          </div>

          {/* Clean Generic Header */}
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>Dashboard</h2>
            <span style={styles.periodBadge}>Past 7 days</span>
          </div>

          {/* Main Line Graph Card */}
          <div style={styles.contentBody}>
            <div style={styles.mainChartCard}>
              <div style={styles.metricRow}>
                <div>
                  <span style={styles.metricLabel}>Avg. Latency</span>
                  <div style={styles.metricValueBlock}>
                    <span style={styles.metricValue}>14.2 ms</span>
                  </div>
                </div>
                <div style={styles.trendPill}>
                  <FiTrendingDown size={11} color="#2E7D52" />
                  <span>-41.3%</span>
                </div>
              </div>

              {/* Line Graph SVG Container */}
              <div style={styles.chartContainer}>
                {/* Horizontal reference dashed lines */}
                <div style={{ ...styles.gridLine, top: '20%' }} />
                <div style={{ ...styles.gridLine, top: '55%' }} />
                <div style={{ ...styles.gridLine, top: '90%' }} />

                <svg 
                  viewBox="0 0 290 150" 
                  style={styles.lineSvg}
                >
                  <defs>
                    <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2160C4" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#2160C4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill */}
                  <path d={fillD} fill="url(#latencyGrad)" />

                  {/* Smooth Primary Stroke Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#2160C4"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                  />

                  {/* Interactive Points */}
                  {points.map((pt, idx) => {
                    const isSelected = activePoint === idx
                    return (
                      <g 
                        key={idx} 
                        onClick={() => setActivePoint(idx)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 5.5 : 3.5}
                          fill="#FFFFFF"
                          stroke="#2160C4"
                          strokeWidth={isSelected ? 2.5 : 2}
                        />
                        {isSelected && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={9}
                            fill="#2160C4"
                            opacity="0.15"
                          />
                        )}
                      </g>
                    )
                  })}
                </svg>

                {/* Floating Active Point Tooltip */}
                {activePoint !== null && (
                  <div
                    style={{
                      ...styles.tooltip,
                      left: `${(points[activePoint].x / 290) * 100}%`,
                      top: `${points[activePoint].y - 28}px`,
                    }}
                  >
                    <span>{points[activePoint].val}</span>
                  </div>
                )}

                {/* X-axis Day Labels */}
                <div style={styles.xAxisRow}>
                  {points.map((pt, idx) => (
                    <span 
                      key={idx} 
                      onClick={() => setActivePoint(idx)}
                      style={{
                        ...styles.xAxisLabel,
                        color: activePoint === idx ? '#2160C4' : '#94A3B8',
                        fontWeight: activePoint === idx ? 600 : 400,
                        cursor: 'pointer',
                      }}
                    >
                      {pt.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics (2 simple generic stats, no clutter) */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Throughput</span>
                <div style={styles.statNumberRow}>
                  <span style={styles.statNumber}>94.2k req/s</span>
                  <span style={styles.statGreen}>+14.8%</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Uptime</span>
                <div style={styles.statNumberRow}>
                  <span style={styles.statNumber}>99.99%</span>
                  <span style={styles.statGreen}>Stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Bottom Home Bar */}
          <div style={styles.bottomArea}>
            <div style={styles.homeBar} />
          </div>
        </div>
      ) : (
        /* Clean Code Frame */
        <div style={styles.codeFrame}>
          <div style={styles.codeHeader}>
            <div style={styles.codeTab}>
              <span style={styles.codeDot} />
              <span>Dashboard.vsx</span>
            </div>
            <span style={styles.codeBadge}>ui/chart</span>
          </div>

          <div style={styles.codeContent}>
            <VertexCode
              code={VSX_DASHBOARD_CODE}
              language="vertex"
              theme={vertexFreshLightTheme}
              style={{
                fontSize: '11.5px',
                lineHeight: 1.5,
                backgroundColor: 'transparent',
                padding: '1rem',
                margin: 0,
                fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
              }}
            />
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
    maxWidth: '350px',
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
    right: '0',
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

  // Minimal Device Frame
  deviceFrame: {
    width: '100%',
    maxWidth: '350px',
    height: '520px',
    backgroundColor: '#FAF9F6',
    borderRadius: '28px',
    border: '1px solid #CBD5E1',
    boxShadow: '0 20px 48px -8px rgba(15, 23, 42, 0.12), 0 4px 16px -2px rgba(15, 23, 42, 0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  // Status Bar
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 18px 4px 18px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#1F1E1D',
    backgroundColor: '#FAF9F6',
    flexShrink: 0,
  },
  statusTime: {
    letterSpacing: '-0.02em',
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  batteryPill: {
    width: '18px',
    height: '9px',
    borderRadius: '2.5px',
    border: '1px solid #1F1E1D',
    padding: '1px',
    display: 'flex',
    alignItems: 'center',
  },
  batteryFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#1F1E1D',
    borderRadius: '1px',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.65rem 1rem 0.5rem 1rem',
    backgroundColor: '#FAF9F6',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F1E1D',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  periodBadge: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#73726C',
    backgroundColor: '#E8E6DF',
    padding: '3px 8px',
    borderRadius: '999px',
  },

  // Content Body
  contentBody: {
    flex: 1,
    padding: '0.5rem 0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  // Main Chart Card
  mainChartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E8E6DF',
    padding: '1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  },
  metricLabel: {
    fontSize: '11.5px',
    fontWeight: 500,
    color: '#73726C',
    display: 'block',
    marginBottom: '2px',
  },
  metricValueBlock: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  },
  trendPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    backgroundColor: '#E8F3EC',
    color: '#2E7D52',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '999px',
  },

  // Chart Container
  chartContainer: {
    width: '100%',
    height: '165px',
    position: 'relative',
    marginTop: '0.5rem',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTop: '1px dashed #F3F1EC',
  },
  lineSvg: {
    width: '100%',
    height: '140px',
    display: 'block',
    overflow: 'visible',
  },
  tooltip: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    backgroundColor: '#1F1E1D',
    color: '#FFFFFF',
    fontSize: '10px',
    fontWeight: 600,
    padding: '3px 7px',
    borderRadius: '4px',
    pointerEvents: 'none',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    whiteSpace: 'nowrap',
    zIndex: 2,
  },
  xAxisRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px',
    marginTop: '2px',
  },
  xAxisLabel: {
    fontSize: '9px',
    transition: 'all 0.15s ease',
  },

  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E8E6DF',
    padding: '0.65rem 0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  statLabel: {
    fontSize: '10.5px',
    color: '#73726C',
    fontWeight: 500,
  },
  statNumberRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  statNumber: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.02em',
  },
  statGreen: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#2E7D52',
  },

  // Bottom Area
  bottomArea: {
    padding: '8px 0 10px 0',
    backgroundColor: '#FAF9F6',
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
  },
  homeBar: {
    width: '100px',
    height: '4px',
    backgroundColor: '#1F1E1D',
    borderRadius: '2px',
  },

  // Code Frame
  codeFrame: {
    width: '100%',
    maxWidth: '350px',
    height: '520px',
    backgroundColor: '#FAFAF8',
    borderRadius: '20px',
    border: '1px solid #E8E6DF',
    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 0.85rem',
    backgroundColor: '#F0EEE6',
    borderBottom: '1px solid #E8E6DF',
  },
  codeTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#2E2D29',
  },
  codeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#2160C4',
  },
  codeBadge: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#2160C4',
    backgroundColor: '#EEF4FC',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  codeContent: {
    flex: 1,
    overflowY: 'auto',
  },
}
