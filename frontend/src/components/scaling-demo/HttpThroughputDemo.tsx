import React, { useState } from 'react'
import { 
  FiCheck, 
  FiCopy, 
  FiCode, 
  FiPlay, 
  FiTrendingUp,
  FiServer
} from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

const HTTP_SERVER_CODE = `package main

import (
    "net/http"
    "time"
)

func main() async -> int32 {
    let server = http.NewServer(port: 8080)

    // Ultra-fast async request handler
    server.Get("/api/health") { req in
        return http.Response(status: 200, body: "OK")
    }

    server.Get("/api/metrics") { req in
        return http.JSON({
            "status": "healthy",
            "uptime_sec": time.Uptime().Seconds(),
            "req_per_sec": 1248500
        })
    }

    print("HTTP Server listening on :8080")
    return await server.Listen()
}
`

export default function HttpThroughputDemo() {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [activePoint, setActivePoint] = useState<number | null>(6)

  const handleCopy = () => {
    navigator.clipboard.writeText(HTTP_SERVER_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Throughput data points for requests per second (in thousands)
  const points = [
    { x: 10, y: 85, label: '00s', val: '1.12M req/s' },
    { x: 55, y: 70, label: '10s', val: '1.18M req/s' },
    { x: 100, y: 78, label: '20s', val: '1.15M req/s' },
    { x: 145, y: 50, label: '30s', val: '1.22M req/s' },
    { x: 190, y: 58, label: '40s', val: '1.20M req/s' },
    { x: 235, y: 32, label: '50s', val: '1.24M req/s' },
    { x: 280, y: 24, label: '60s', val: '1.25M req/s' },
  ]

  // Smooth SVG Path definition (cubic bezier)
  const pathD = `
    M ${points[0].x} ${points[0].y}
    C 30 78, 40 72, ${points[1].x} ${points[1].y}
    C 70 68, 85 82, ${points[2].x} ${points[2].y}
    C 115 74, 130 54, ${points[3].x} ${points[3].y}
    C 160 46, 175 62, ${points[4].x} ${points[4].y}
    C 205 54, 220 36, ${points[5].x} ${points[5].y}
    C 250 28, 265 24, ${points[6].x} ${points[6].y}
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
            <FiPlay size={11} /> Live Server
          </button>
          <button
            onClick={() => setMode('code')}
            style={{
              ...styles.toggleBtn,
              ...(mode === 'code' ? styles.toggleBtnActive : {}),
            }}
          >
            <FiCode size={11} /> Server Code
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

      {/* Main Container */}
      {mode === 'preview' ? (
        <div style={styles.serverCard}>
          {/* Header */}
          <div style={styles.serverHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.serverIcon}>
                <FiServer size={14} color="#2160C4" />
              </div>
              <div>
                <h3 style={styles.serverTitle}>HTTP Server</h3>
                <span style={styles.serverSub}>Port :8080 • High-concurrency listener</span>
              </div>
            </div>
            <div style={styles.statusPill}>
              <span style={styles.pulseDot} />
              Active
            </div>
          </div>

          {/* Primary Throughput Metric & Chart Card */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <span style={styles.statLabel}>Throughput</span>
                <div style={styles.statRow}>
                  <span style={styles.statValue}>1,248,500</span>
                  <span style={styles.statUnit}>req/s</span>
                </div>
              </div>
              <div style={styles.trendBadge}>
                <FiTrendingUp size={12} color="#2E7D52" />
                <span>+22.4%</span>
              </div>
            </div>

            {/* Smooth SVG Line Graph */}
            <div style={styles.graphContainer}>
              <svg viewBox="0 0 290 150" style={styles.svgChart}>
                <defs>
                  <linearGradient id="serverGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2160C4" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#2160C4" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="10" y1="35" x2="280" y2="35" stroke="#F0EEE6" strokeDasharray="3 3" />
                <line x1="10" y1="75" x2="280" y2="75" stroke="#F0EEE6" strokeDasharray="3 3" />
                <line x1="10" y1="115" x2="280" y2="115" stroke="#F0EEE6" strokeDasharray="3 3" />

                {/* Area Gradient Fill */}
                <path d={fillD} fill="url(#serverGradient)" />

                {/* Smooth Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#2160C4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {points.map((p, idx) => {
                  const isHovered = activePoint === idx
                  return (
                    <g key={idx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 4.5 : 3}
                        fill="#FFFFFF"
                        stroke="#2160C4"
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                        onMouseEnter={() => setActivePoint(idx)}
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Tooltip for the active point */}
              {activePoint !== null && (
                <div
                  style={{
                    ...styles.tooltip,
                    left: `${(points[activePoint].x / 290) * 100}%`,
                    top: `${(points[activePoint].y / 150) * 100 - 28}%`,
                  }}
                >
                  <span style={styles.tooltipText}>{points[activePoint].val}</span>
                </div>
              )}

              {/* X-Axis labels */}
              <div style={styles.xAxis}>
                {points.map((p, i) => (
                  <span key={i} style={styles.xLabel}>
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Spacious Highlight Metrics Box */}
          <div style={styles.metricsBox}>
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>0.38 ms</span>
              <span style={styles.metricLabel}>Avg. Latency</span>
            </div>
            <div style={styles.metricDivider} />
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>24.6 MB</span>
              <span style={styles.metricLabel}>Memory Usage</span>
            </div>
            <div style={styles.metricDivider} />
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>99.99%</span>
              <span style={styles.metricLabel}>Success Rate</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.codeContainer}>
          <VertexCode
            code={HTTP_SERVER_CODE}
            theme={vertexFreshLightTheme}
            language="vertex"
            style={styles.codeBlock}
          />
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#FAF9F6',
    borderBottom: '1px solid #F0EEE6',
  },
  segmentedToggle: {
    display: 'flex',
    backgroundColor: '#F0EEE6',
    padding: '3px',
    borderRadius: '8px',
    gap: '2px',
  },
  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
  },
  copyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 500,
    color: '#666660',
    backgroundColor: 'transparent',
    border: '1px solid #E8E6DF',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  serverCard: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    backgroundColor: '#FFFFFF',
  },
  serverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  serverIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#EEF4FC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serverTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.02em',
    margin: '0 0 2px 0',
  },
  serverSub: {
    fontSize: '12px',
    color: '#73726C',
  },
  statusPill: {
    fontSize: '11.5px',
    fontWeight: 600,
    color: '#2E7D52',
    backgroundColor: '#E8F3EC',
    padding: '3px 9px',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#2E7D52',
  },
  chartCard: {
    backgroundColor: '#FAF9F6',
    border: '1px solid #F0EEE6',
    borderRadius: '12px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: '11.5px',
    fontWeight: 500,
    color: '#73726C',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  statRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    marginTop: '2px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.025em',
  },
  statUnit: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#73726C',
  },
  trendBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#2E7D52',
    backgroundColor: '#E8F3EC',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  graphContainer: {
    position: 'relative',
    width: '100%',
  },
  svgChart: {
    width: '100%',
    height: '110px',
    overflow: 'visible',
  },
  tooltip: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    backgroundColor: '#1F1E1D',
    color: '#FFFFFF',
    padding: '3px 7px',
    borderRadius: '4px',
    fontSize: '10.5px',
    fontWeight: 600,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  tooltipText: {
    color: '#FFFFFF',
  },
  xAxis: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '6px',
  },
  xLabel: {
    fontSize: '10.5px',
    color: '#9E9D95',
  },
  metricsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FAF9F6',
    border: '1px solid #F0EEE6',
    borderRadius: '12px',
    padding: '1rem 0.5rem',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  metricVal: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.01em',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#73726C',
  },
  metricDivider: {
    width: '1px',
    height: '28px',
    backgroundColor: '#E8E6DF',
  },
  codeContainer: {
    padding: '1.25rem',
    backgroundColor: '#FAF9F6',
    overflowX: 'auto',
    maxHeight: '380px',
  },
  codeBlock: {
    margin: 0,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '12px',
    lineHeight: 1.55,
  },
}
