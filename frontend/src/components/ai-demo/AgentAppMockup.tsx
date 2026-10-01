import React, { useState } from 'react'
import { FiFileText, FiArrowUp, FiChevronDown } from 'react-icons/fi'

export default function AgentAppMockup() {
  const [promptText, setPromptText] = useState('')
  const [selectedModel] = useState('Auto')

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>Build Showcase View</span>
        <span style={styles.sdkBadge}>Built with Vertex</span>
      </div>

      <div style={styles.body}>
        {/* User Request Bubble Card */}
        <div style={styles.requestCard}>
          <p style={styles.requestText}>
            generate a clean product showcase view using the attached design guidelines and specifications
          </p>
        </div>

        {/* Action Steps Trace */}
        <div style={styles.stepsTrace}>
          <div style={styles.traceRow}>
            <span style={styles.traceAction}>Read</span>
            <span style={styles.traceTarget}>spec-overview.md</span>
          </div>
          <div style={styles.traceRow}>
            <span style={styles.traceAction}>Read</span>
            <span style={styles.traceTarget}>design-tokens.json</span>
          </div>
          <div style={styles.traceRow}>
            <span style={styles.traceThought}>Thought</span>
            <span style={styles.traceDuration}>4s</span>
          </div>
        </div>

        {/* Agent Reasoning */}
        <p style={styles.agentSpeech}>
          I'll build a responsive, typography-focused showcase component matching your project theme.
        </p>

        {/* Modified File Cards */}
        <div style={styles.fileCardsRow}>
          <div style={styles.fileCard}>
            <div style={styles.fileLeft}>
              <FiFileText size={14} color="#73726C" />
              <span style={styles.fileName}>src/views/Showcase.vsx</span>
            </div>
            <div style={styles.fileStats}>
              <span style={styles.statAdd}>+64</span>
              <span style={styles.statDel}>-0</span>
            </div>
          </div>

          <div style={styles.fileCard}>
            <div style={styles.fileLeft}>
              <FiFileText size={14} color="#73726C" />
              <span style={styles.fileName}>src/styles/theme.css</span>
            </div>
            <div style={styles.fileStats}>
              <span style={styles.statAdd}>+16</span>
              <span style={styles.statDel}>-0</span>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <p style={styles.completionText}>
          Done. Asset preloads configured, styles inlined, and theme variables bound for instant zero-flash rendering. 230ms first paint.
        </p>

        {/* Bottom Floating Prompt Card */}
        <div style={styles.promptContainer}>
          <input
            type="text"
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            placeholder="Plan, search, build, or automate tasks..."
            style={styles.promptInput}
          />

          <div style={styles.promptBottomRow}>
            <div style={styles.pillsLeft}>
              <div style={styles.agentModePill}>
                <span style={styles.infinityIcon}>∞</span>
                <span>Agent</span>
                <FiChevronDown size={11} color="#73726C" />
              </div>

              <div style={styles.modelPill}>
                <span>{selectedModel}</span>
                <FiChevronDown size={11} color="#73726C" />
              </div>
            </div>

            <button style={styles.sendArrowBtn} aria-label="Submit prompt">
              <FiArrowUp size={14} color="#4B4A45" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '24px',
    boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.06), 0 4px 16px -2px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.9rem 1.25rem 0.5rem 1.25rem',
  },
  headerTitle: {
    fontSize: '14.5px',
    fontWeight: 600,
    color: '#1F1E1D',
  },
  sdkBadge: {
    fontSize: '10.5px',
    fontWeight: 500,
    color: '#2160C4',
    backgroundColor: '#EEF4FC',
    padding: '2px 8px',
    borderRadius: '999px',
    border: '1px solid #DBEAFE',
  },
  body: {
    padding: '0.75rem 1.25rem 1.25rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    padding: '0.75rem 0.95rem',
  },
  requestText: {
    margin: 0,
    fontSize: '13.5px',
    color: '#1F1E1D',
    lineHeight: 1.45,
  },
  stepsTrace: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    paddingLeft: '2px',
  },
  traceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
  },
  traceAction: {
    color: '#73726C',
  },
  traceTarget: {
    color: '#4B4A45',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '12.5px',
  },
  traceThought: {
    color: '#73726C',
  },
  traceDuration: {
    color: '#9E9D95',
  },
  agentSpeech: {
    margin: 0,
    fontSize: '13.5px',
    color: '#1F1E1D',
    lineHeight: 1.5,
  },
  fileCardsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
  },
  fileCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '10px',
    padding: '0.55rem 0.85rem',
  },
  fileLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fileName: {
    fontSize: '12.5px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontWeight: 500,
    color: '#1F1E1D',
  },
  fileStats: {
    display: 'flex',
    gap: '5px',
    fontSize: '11.5px',
    fontWeight: 600,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  statAdd: {
    color: '#2E7D52',
  },
  statDel: {
    color: '#B4432F',
  },
  completionText: {
    margin: 0,
    fontSize: '13px',
    color: '#1F1E1D',
    lineHeight: 1.55,
  },
  promptContainer: {
    marginTop: '0.4rem',
    backgroundColor: '#F3F1EC',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    padding: '0.75rem 0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  promptInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#1F1E1D',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  promptBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pillsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  agentModePill: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#E8E6DF',
    padding: '3px 8px',
    borderRadius: '999px',
    fontSize: '11.5px',
    fontWeight: 500,
    color: '#4B4A45',
    cursor: 'pointer',
  },
  infinityIcon: {
    fontSize: '13px',
    lineHeight: 1,
    color: '#4B4A45',
  },
  modelPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11.5px',
    color: '#4B4A45',
    cursor: 'pointer',
  },
  sendArrowBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#E8E6DF',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
}
