import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { DocBlock } from '../../features/docs/types'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export default function DocsToc({ blocks }: { blocks: DocBlock[] }) {
  const entries: TocEntry[] = blocks
    .filter((b): b is Extract<DocBlock, { type: 'heading' }> => b.type === 'heading')
    .map((b) => ({ id: b.id, text: b.text, level: b.level }))

  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headingEls = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => !!el)

    if (headingEls.length === 0) return

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      // root: null tracks the actual browser viewport, so this stays accurate
      // regardless of which element is the page's scroll container.
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    )

    headingEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks])

  // As the page scrolls and activeId updates, keep that entry visible inside
  // the toc's own scroll area (in case the list itself is taller than it).
  useEffect(() => {
    if (!activeId || !listRef.current) return
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`)
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (entries.length === 0) return null

  return (
    <div style={styles.wrap} className="docs-scroll">
      <div style={styles.tocTitle}>On this page</div>
      <div style={styles.tocList} ref={listRef}>
        {entries.map((entry) => (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            data-toc-id={entry.id}
            onClick={(e) => {
              e.preventDefault()
              handleClick(entry.id)
            }}
            style={{
              ...styles.tocLink,
              ...(entry.level === 3 ? styles.tocLinkNested : {}),
              ...(entry.id === activeId ? styles.tocLinkActive : {}),
            }}
          >
            {entry.text}
          </a>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  wrap: {
    width: '220px',
    height: '100%',
    overflowY: 'auto',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    boxSizing: 'border-box',
  },
  tocTitle: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#8F8D87',
    marginBottom: '0.75rem',
    paddingLeft: '0.9rem',
  },
  tocList: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #E8E6DF',
  },
  tocLink: {
    fontSize: '13px',
    color: '#666660',
    textDecoration: 'none',
    padding: '0.35rem 0 0.35rem 0.9rem',
    borderLeft: '2px solid transparent',
    marginLeft: '-1px',
    lineHeight: 1.45,
    transition: 'color 0.15s ease',
  },
  tocLinkNested: {
    paddingLeft: '1.6rem',
    fontSize: '12.5px',
    color: '#8F8D87',
  },
  tocLinkActive: {
    color: '#1F1E1D',
    fontWeight: 500,
    borderLeft: '2px solid #1F1E1D',
  },
}