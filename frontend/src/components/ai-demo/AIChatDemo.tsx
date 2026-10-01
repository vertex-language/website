import React, { useState } from 'react'
import { 
  FiPlus, 
  FiMic, 
  FiMoreHorizontal, 
  FiEdit3, 
  FiCode, 
  FiPlay, 
  FiCopy, 
  FiCheck,
  FiWifi
} from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

const LLM_VS_CODE = `// You can hook this up to .vsx to create AI applications with reactive state
package main

import (
    "agent"
    "gpu"
    "llm"
    "os"
)

func main() async {
    // Select GPU device (Metal on macOS, Vulkan on Linux/Windows)
    let device = gpu.Default()

    // Load open-weight model directly from Hugging Face or local checkpoint
    let ref = "hf.co/meta-llama/Llama-3.2-1B-Instruct"
    let model = try await llm.Load(ref, on: device)

    // Spin up an autonomous agent with local tool dispatch
    let orchestrator = agent.New(
        model: model,
        systemPrompt: "You are a local autonomous systems assistant.",
        tools: [agent.Tool("fs.read", os.ReadFile)]
    )

    let prompt = "How do I design a progressive endurance training routine?"

    // Stream generated response with direct hardware acceleration and minimal latency
    let stream = try await orchestrator.Execute(prompt)
    for await token in stream {
        os.Stdout.Write(token)
    }
}
`

export default function AIChatDemo() {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [question, setQuestion] = useState('How do I design a progressive endurance training routine?')
  const [isAnswering, setIsAnswering] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(LLM_VS_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim() || isAnswering) return
    setQuestion(inputVal.trim())
    setInputVal('')
    setIsAnswering(true)
    setTimeout(() => setIsAnswering(false), 300)
  }

  return (
    <div style={styles.wrapper}>
      {/* Top Toggle Toolbar */}
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

      {/* Main Container: Mobile Frame Clone */}
      {mode === 'preview' ? (
        <div style={styles.phoneFrame}>
          {/* Mobile Status Bar */}
          <div style={styles.statusBar}>
            <span style={styles.statusTime}>9:41</span>
            <div style={styles.statusIcons}>
              {/* Cellular Signal Bars */}
              <svg width="15" height="11" viewBox="0 0 17 11" fill="none">
                <rect x="0.5" y="8" width="2.5" height="3" rx="0.5" fill="#1F1E1D" />
                <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill="#1F1E1D" />
                <rect x="8.5" y="3" width="2.5" height="8" rx="0.5" fill="#1F1E1D" />
                <rect x="12.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill="#1F1E1D" />
              </svg>
              {/* WiFi */}
              <FiWifi size={13} color="#1F1E1D" strokeWidth={2.5} />
              {/* Battery */}
              <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
                <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="#1F1E1D" strokeWidth="1" />
                <rect x="2" y="2" width="15" height="8" rx="1.5" fill="#1F1E1D" />
                <path d="M22 4.5C22.5 4.8 23 5.3 23 6C23 6.7 22.5 7.2 22 7.5V4.5Z" fill="#1F1E1D" />
              </svg>
            </div>
          </div>

          {/* Navigation Bar */}
          <div style={styles.navBar}>
            {/* Left Circular Menu Button */}
            <button style={styles.circleMenuBtn} aria-label="Menu">
              <span style={styles.menuLineTop} />
              <span style={styles.menuLineBottom} />
            </button>

            {/* Right Action Capsule */}
            <div style={styles.navActionCapsule}>
              <button style={styles.capsuleIconBtn} aria-label="Compose">
                <FiEdit3 size={15} color="#1F1E1D" />
              </button>
              <button style={styles.capsuleIconBtn} aria-label="More">
                <FiMoreHorizontal size={17} color="#1F1E1D" />
              </button>
            </div>
          </div>

          {/* Chat Content Body */}
          <div style={styles.chatScrollBody}>
            {/* User Question Bubble */}
            <div style={styles.userBubbleRow}>
              <div style={styles.userBubble}>
                {question}
              </div>
            </div>

            {/* Assistant Response (Clean Editorial Text) */}
            <div style={styles.assistantTextBody}>
              <p style={styles.paragraph}>
                Building long-term endurance requires{' '}
                <strong>progressive weekly volume</strong>,{' '}
                <strong>structured recovery days</strong>, and{' '}
                <strong>aerobic base pacing</strong>. Most structured regimens follow a{' '}
                <strong>12–16 week progression</strong> with gradual volume steps. Here is a practical roadmap. 🏃
              </p>

              <h3 style={styles.heading}>1. Establish an Aerobic Base</h3>

              <p style={styles.subtext}>
                Before adding intensity, ensure you can comfortably manage:
              </p>

              <ul style={styles.bulletList}>
                <li>• <strong>3–4 steady sessions</strong> per week at conversational pace</li>
                <li>• <strong>30–45 minutes</strong> of continuous aerobic movement</li>
                <li>• Consistent adherence over a <strong>3-week baseline phase</strong></li>
              </ul>

              <p style={styles.paragraph}>
                Focus on staying in Zone 2 to build mitochondrial efficiency before introducing speed intervals.
              </p>

              <h3 style={styles.heading}>2. Progressive Weekly Load</h3>

              <p style={styles.subtext}>
                Structure each week with distinct session objectives:
              </p>

              <ul style={styles.bulletList}>
                <li>• <strong>70–80%</strong> easy aerobic volume to protect joints</li>
                <li>• <strong>1 weekly long effort</strong> increasing by no more than 10%</li>
                <li>• <strong>1 dedicated tempo session</strong> to improve lactate threshold</li>
              </ul>
            </div>
          </div>

          {/* Floating Pill Input Bar */}
          <div style={styles.inputBarWrapper}>
            <form onSubmit={handleSubmit} style={styles.inputBarPill}>
              {/* Plus button */}
              <button type="button" style={styles.plusBtn} aria-label="Add attachment">
                <FiPlus size={16} color="#4B4A45" />
              </button>

              {/* Text Input with "Ask Anything" */}
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Ask Anything..."
                style={styles.pillInput}
              />

              {/* Right mic & voice buttons */}
              <div style={styles.pillActionsRight}>
                <button type="button" style={styles.micBtn} aria-label="Voice input">
                  <FiMic size={16} color="#1F1E1D" />
                </button>
                <button
                  type="submit"
                  style={styles.voiceOrbBtn}
                  aria-label="Send or voice"
                >
                  {/* Waveform vertical bars */}
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="5" width="2" height="6" rx="1" fill="#FFFFFF" />
                    <rect x="6" y="2" width="2" height="12" rx="1" fill="#FFFFFF" />
                    <rect x="10" y="4" width="2" height="8" rx="1" fill="#FFFFFF" />
                    <rect x="14" y="6" width="2" height="4" rx="1" fill="#FFFFFF" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* See Code View */
        <div style={styles.codeFrame}>
          <div style={styles.codeHeader}>
            <span style={styles.codeTitle}>main.vs • package llm</span>
            <span style={styles.codeBadge}>Vertex SDK</span>
          </div>

          <div style={styles.codeScroll}>
            <VertexCode
              code={LLM_VS_CODE}
              extension=".vs"
              theme={vertexFreshLightTheme}
            />
          </div>

          <div style={styles.codeFooter}>
            <span>You can hook this up to <code>.vsx</code> to create AI applications with reactive state</span>
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
    maxWidth: '360px',
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
  
  // Mobile Phone Frame Clone
  phoneFrame: {
    width: '100%',
    maxWidth: '360px',
    height: '630px',
    backgroundColor: '#FFFFFF',
    borderRadius: '34px',
    border: '1px solid #E8E6DF',
    boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.08), 0 4px 16px -2px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1.4rem 0.4rem 1.4rem',
  },
  statusTime: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.02em',
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
  },
  circleMenuBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#F3F1EC',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
  },
  menuLineTop: {
    width: '14px',
    height: '1.8px',
    backgroundColor: '#1F1E1D',
    borderRadius: '1px',
  },
  menuLineBottom: {
    width: '14px',
    height: '1.8px',
    backgroundColor: '#1F1E1D',
    borderRadius: '1px',
  },
  navActionCapsule: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F3F1EC',
    borderRadius: '999px',
    padding: '3px 8px',
    gap: '6px',
  },
  capsuleIconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatScrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '0.85rem 1.25rem 5rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  userBubbleRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  userBubble: {
    backgroundColor: '#EEF4FC',
    color: '#2160C4',
    padding: '0.65rem 1.1rem',
    borderRadius: '18px',
    fontSize: '13.5px',
    fontWeight: 500,
    maxWidth: '85%',
    lineHeight: 1.4,
  },
  assistantTextBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    color: '#1F1E1D',
    fontSize: '13px',
    lineHeight: 1.55,
  },
  paragraph: {
    margin: 0,
    color: '#1F1E1D',
  },
  heading: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1F1E1D',
    margin: '0.4rem 0 0.1rem 0',
    lineHeight: 1.35,
  },
  subtext: {
    margin: 0,
    color: '#4B4A45',
  },
  bulletList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    color: '#1F1E1D',
  },
  
  // Floating Input Bar
  inputBarWrapper: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  inputBarPill: {
    width: '100%',
    height: '46px',
    backgroundColor: '#F3F1EC',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px 0 10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
    border: '1px solid #E8E6DF',
  },
  plusBtn: {
    background: 'none',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillInput: {
    flexGrow: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    color: '#1F1E1D',
    padding: '0 6px',
  },
  pillActionsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  micBtn: {
    background: 'none',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceOrbBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#2160C4',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  // Code View Frame
  codeFrame: {
    width: '100%',
    maxWidth: '360px',
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
