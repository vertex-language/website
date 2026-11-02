import { useEffect, useState } from 'react'

/** Tracks a CSS media query, e.g. useMediaQuery('(max-width: 860px)'). */
export function useMediaQuery(query: string): boolean {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [matches, setMatches] = useState(get)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on phones and small tablets, where the desktop layouts collapse. */
export const useIsMobile = () => useMediaQuery('(max-width: 860px)')
