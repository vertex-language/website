import type { CSSProperties, ComponentType } from 'react'
import { FiCheck } from 'react-icons/fi'

export interface ChecklistItem {
  title: string
  description: string
}

interface FeatureChecklistProps {
  title: string
  icon: ComponentType<{ size?: number; color?: string }>
  items: ChecklistItem[]
}

/** A single quiet card: a title and a short list of what you get. */
export default function FeatureChecklist({ title, icon: Icon, items }: FeatureChecklistProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Icon size={14} color="#2160C4" />
        <span style={styles.headerTitle}>{title}</span>
      </div>
      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.title} style={styles.row}>
            <span style={styles.check}>
              <FiCheck size={13} color="#2E7D52" strokeWidth={2.5} />
            </span>
            <div>
              <div style={styles.itemTitle}>{item.title}</div>
              <p style={styles.itemDesc}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '1rem 1.5rem',
    backgroundColor: '#FAF9F6',
    borderBottom: '1px solid #F0EEE6',
  },
  headerTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1F1E1D',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  check: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#E8F3EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
  },
  itemTitle: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#1F1E1D',
    marginBottom: '2px',
  },
  itemDesc: {
    fontSize: '12.5px',
    color: '#666660',
    margin: 0,
    lineHeight: 1.5,
  },
}
