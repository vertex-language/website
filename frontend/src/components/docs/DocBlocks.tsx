import type { CSSProperties } from 'react'
import type { DocBlock } from '../../features/docs/types'
import CodeBlock from './CodeBlock'
import Callout from './Callout'
import { formatInlineCode } from './inlineCode'

export default function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : 'h3'
            const style = block.level === 2 ? styles.h2 : styles.h3
            return (
              <Tag key={i} id={block.id} data-heading style={style}>
                {block.text}
              </Tag>
            )
          }
          case 'paragraph':
            return (
              <p key={i} style={styles.p}>
                {formatInlineCode(block.text)}
              </p>
            )
          case 'code':
            return <CodeBlock key={i} code={block.code} label={block.label} />
          case 'callout':
            return (
              <Callout key={i} tone={block.tone}>
                {block.text}
              </Callout>
            )
          case 'list':
            return block.ordered ? (
              <ol key={i} style={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j} style={styles.listItem}>
                    {formatInlineCode(item)}
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} style={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j} style={styles.listItem}>
                    {formatInlineCode(item)}
                  </li>
                ))}
              </ul>
            )
          case 'table':
            return (
              <div key={i} style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead style={{ background: '#F0F0EF' }}>
                    <tr>
                      {block.headers.map((h, j) => {
                        const isFirst = j === 0
                        const isLast = j === block.headers.length - 1
                        return (
                          <th
                            key={j}
                            style={{
                              ...styles.th,
                              borderTopLeftRadius: isFirst ? '11px' : 0,
                              borderTopRightRadius: isLast ? '11px' : 0,
                            }}
                          >
                            {h}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} style={styles.tr}>
                        {row.map((cell, c) => (
                          <td key={c} style={styles.td}>
                            {formatInlineCode(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}

const styles: Record<string, CSSProperties> = {
  h2: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.6rem',
    fontWeight: 500,
    color: '#1F1E1D',
    letterSpacing: '-0.015em',
    margin: '2.5rem 0 1rem 0',
    scrollMarginTop: '90px',
  },
  h3: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#1F1E1D',
    letterSpacing: '-0.01em',
    margin: '2rem 0 0.75rem 0',
    scrollMarginTop: '90px',
  },
  p: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: '#2E2D2A',
    margin: '0 0 1.15rem 0',
  },
  list: {
    margin: '0 0 1.25rem 1.35rem',
    padding: 0,
  },
  listItem: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: '#2E2D2A',
    marginBottom: '0.45rem',
  },
  tableWrap: {
    overflowX: 'auto',
    margin: '1.5rem 0 1.75rem 0',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    background: 'transparent',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: '14px',
    background: 'transparent',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem 1.15rem',
    borderBottom: '1px solid #E8E6DF',
    color: '#1F1E1D',
    fontWeight: 600,
    background: '#F0F0EF',
    whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  tr: {
    borderBottom: '1px solid #EFECE6',
    background: 'transparent',
  },
  td: {
    textAlign: 'left',
    padding: '0.75rem 1.15rem',
    color: '#2E2D2A',
    verticalAlign: 'top',
    lineHeight: 1.6,
    background: 'transparent',
  },
}