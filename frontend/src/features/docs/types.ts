import type { ReactNode } from 'react'

export type DocBlock =
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'paragraph'; text: ReactNode }
  | { type: 'code'; code: string; label?: string }
  | { type: 'table'; headers: string[]; rows: ReactNode[][] }
  | { type: 'list'; items: ReactNode[]; ordered?: boolean }
  | { type: 'callout'; tone?: 'tip' | 'info' | 'warning'; text: ReactNode }

export interface DocPage {
  id?: string
  slug: string
  title: string
  description: string
  breadcrumb: string
  blocks: DocBlock[]
}

export interface DocSectionItem {
  slug: string
  id?: string
  label: string
}

export interface DocSectionDef {
  title: string
  items: DocSectionItem[]
}

export interface NavItem {
  id: string
  label: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}