import type { CSSProperties } from 'react'
import { VertexCode } from '../../vertex-highlight'
import { docsCodeTheme } from '../../features/docs/theme'
import snippets from '../../content/solutionSnippets.json'

type SnippetId = keyof typeof snippets

/**
 * A few lines of real Vertex for a card. Every snippet lives in
 * content/solutionSnippets.json and is compiled by scripts/check_snippets.mjs.
 */
export default function CodeCard({ id }: { id: SnippetId }) {
  const snippet = snippets[id] as { code: string; language?: string }

  return (
    <div style={styles.frame}>
      <VertexCode
        code={snippet.code}
        language={snippet.language ?? 'vs'}
        theme={docsCodeTheme}
        style={styles.code}
      />
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  frame: {
    minWidth: 0,
    height: '208px',
    marginBottom: '1.5rem',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  code: {
    height: '100%',
    padding: '1rem 1.1rem',
    fontSize: '12px',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  },
}
