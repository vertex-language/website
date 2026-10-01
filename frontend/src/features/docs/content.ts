import type { DocPage, DocSectionDef } from './types'
import { generatedPages, generatedSections } from './pages/generated'

// Sections and pages are generated from docs-src/*.md by scripts/build_docs.mjs.
export const docSections: DocSectionDef[] = generatedSections

export const docPages: DocPage[] = generatedPages

export const defaultDocSlug = 'overview'

// Slugs from the previous docs layout, mapped to where that material lives now.
export const legacyDocSlugs: Record<string, string> = {
  grammar: 'reference',
  'let-var': 'values', 'type-annotations': 'values', 'type-aliases': 'values',
  arithmetic: 'operators', comparison: 'operators', ranges: 'operators', bitwise: 'operators', casting: 'switch',
  maps: 'dictionaries-sets', dictionaries: 'dictionaries-sets',
  'if-else': 'branching', 'for-in': 'loops', while: 'loops', 'break-continue-defer': 'defer',
  'type-parameters': 'generics', constraints: 'generics', instantiation: 'generics',
  'error-handling': 'errors', 'compiler-testing': 'errors',
  'access-conventions': 'ownership', transfer: 'ownership', 'heap-values': 'arc', exclusivity: 'ownership',
  threads: 'tasks', channels: 'actors', select: 'async-await',
  gpu: 'kernels', npu: 'kernels', vector: 'kernels',
  'abstract-handles': 'cpp-modules', 'declare-blocks': 'cpp-modules', 'typed-ptr': 'cpp-modules', allocation: 'cpp-modules',
}
