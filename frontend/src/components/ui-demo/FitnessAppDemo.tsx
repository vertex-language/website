import React, { useState } from 'react'
import { FiCheck, FiCopy, FiCode, FiPlay } from 'react-icons/fi'
import { VertexCode, vertexFreshLightTheme } from '../../vertex-highlight'

interface TaskItem {
  id: number
  title: string
  completed: boolean
}

const INITIAL_TASKS: TaskItem[] = [
  { id: 1, title: 'Design system tokens', completed: true },
  { id: 2, title: 'Responsive layout components', completed: true },
  { id: 3, title: 'Compile multi-platform release', completed: false },
]

const VSX_APP_CODE = `package main

import (
    "ui/app"
    "ui/state"
)

struct Task {
    var title: string
    var completed: bool
}

func TasksApp() -> Node {
    @state.State var tasks = [
        Task(title: "Design system tokens", completed: true),
        Task(title: "Responsive layout components", completed: true),
        Task(title: "Compile multi-platform release", completed: false),
    ]

    return (
        <div class="task-card">
            <header class="task-header">
                <h2>Tasks</h2>
                <span>{tasks.filter { $0.completed }.count} completed</span>
            </header>

            <ul class="task-list">
                <For each={tasks} key={t in t.title}>
                    {t in
                        <li class:done={t.completed} onClick={t.completed = !t.completed}>
                            <span>{t.completed ? "✓" : "○"}</span>
                            <span>{t.title}</span>
                        </li>
                    }
                </For>
            </ul>
        </div>
    )
}
`

export default function FitnessAppDemo() {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const completedCount = tasks.filter(t => t.completed).length

  const handleCopy = () => {
    navigator.clipboard.writeText(VSX_APP_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <FiCode size={11} /> Markup (.vsx)
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
        <div style={styles.appCard}>
          {/* Clean App Header */}
          <div style={styles.appHeader}>
            <div>
              <h3 style={styles.appTitle}>Tasks</h3>
              <span style={styles.appSub}>Declarative reactive interface</span>
            </div>
            <div style={styles.statusPill}>
              {completedCount} of {tasks.length} Done
            </div>
          </div>

          {/* Interactive Task List */}
          <div style={styles.taskList}>
            {tasks.map(t => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                style={{
                  ...styles.taskRow,
                  ...(t.completed ? styles.taskRowDone : {}),
                }}
              >
                <div
                  style={{
                    ...styles.checkbox,
                    ...(t.completed ? styles.checkboxChecked : {}),
                  }}
                >
                  {t.completed && <FiCheck size={12} color="#FFFFFF" strokeWidth={2.5} />}
                </div>
                <span
                  style={{
                    ...styles.taskText,
                    ...(t.completed ? styles.taskTextDone : {}),
                  }}
                >
                  {t.title}
                </span>
              </div>
            ))}
          </div>

          {/* Spacious Highlight Metrics Box */}
          <div style={styles.metricsBox}>
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>12 ms</span>
              <span style={styles.metricLabel}>Cold Start</span>
            </div>
            <div style={styles.metricDivider} />
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>14.2 MB</span>
              <span style={styles.metricLabel}>Memory Footprint</span>
            </div>
            <div style={styles.metricDivider} />
            <div style={styles.metricItem}>
              <span style={styles.metricVal}>60 FPS</span>
              <span style={styles.metricLabel}>Fluid Gestures</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.codeContainer}>
          <VertexCode
            code={VSX_APP_CODE}
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
  appCard: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    backgroundColor: '#FFFFFF',
  },
  appHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1F1E1D',
    letterSpacing: '-0.02em',
    margin: '0 0 2px 0',
  },
  appSub: {
    fontSize: '12px',
    color: '#73726C',
  },
  statusPill: {
    fontSize: '11.5px',
    fontWeight: 600,
    color: '#2160C4',
    backgroundColor: '#EEF4FC',
    padding: '4px 10px',
    borderRadius: '999px',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0.75rem 1rem',
    backgroundColor: '#FAF9F6',
    border: '1px solid #F0EEE6',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  taskRowDone: {
    backgroundColor: '#F7F7F4',
    borderColor: '#E8E8E2',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '1.5px solid #C8C7C0',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s ease',
  },
  checkboxChecked: {
    backgroundColor: '#2160C4',
    borderColor: '#2160C4',
  },
  taskText: {
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#1F1E1D',
    flexGrow: 1,
    transition: 'all 0.15s ease',
  },
  taskTextDone: {
    textDecoration: 'line-through',
    color: '#8F8E88',
  },
  metricsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FAF9F6',
    border: '1px solid #F0EEE6',
    borderRadius: '12px',
    padding: '1rem 0.5rem',
    marginTop: '0.25rem',
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
