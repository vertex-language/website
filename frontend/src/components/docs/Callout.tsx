import React, { type ReactNode } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { LuLightbulb } from 'react-icons/lu'
import { formatInlineCode } from './inlineCode'

export interface CalloutProps {
  tone?: 'tip' | 'info' | 'warning'
  title?: string
  children: ReactNode
}

export default function Callout({ tone = 'info', children }: CalloutProps) {
  const meta = toneConfig[tone] ?? toneConfig.info
  const Icon = meta.icon

  return (
    <div style={styles.card}>
      <div style={styles.iconWrap}>
        <Icon size={16} />
      </div>
      <div style={styles.body}>
        {formatInlineCode(children)}
      </div>
    </div>
  )
}

const toneConfig = {
  info: {
    icon: ({ size = 16 }: { size?: number }) => <LuLightbulb size={size} color="#4A4844" style={{ flexShrink: 0 }} />,
  },
  tip: {
    icon: ({ size = 16 }: { size?: number }) => <LuLightbulb size={size} color="#4A4844" style={{ flexShrink: 0 }} />,
  },
  warning: {
    icon: ({ size = 16 }: { size?: number }) => <FiAlertCircle size={size} color="#4A4844" style={{ flexShrink: 0 }} />,
  },
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.85rem',
    backgroundColor: 'transparent',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    margin: '1.5rem 0',
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '3px',
  },
  body: {
    fontSize: '14.5px',
    lineHeight: 1.65,
    color: '#383734',
    flex: 1,
  },
}
