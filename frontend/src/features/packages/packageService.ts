import { PackageSummary, PackageDetail } from "./types";
import catalogData from "../../content/packagesCatalog.json";

// Vite lazy markdown glob loader
const docModules = import.meta.glob<string>('/src/content/packages/*.md', {
  query: '?raw',
  import: 'default',
})

// Vite lazy readme glob loader
const readmeModules = import.meta.glob<string>('/src/content/readmes/*.md', {
  query: '?raw',
  import: 'default',
})

const packagesCatalog = catalogData as unknown as Array<PackageDetail>;

// Map for O(1) lookup by id or slug or importPath
const packageMap = new Map<string, PackageDetail>();
for (const pkg of packagesCatalog) {
  packageMap.set(pkg.id.toLowerCase(), pkg);
  packageMap.set(pkg.slug.toLowerCase(), pkg);
  packageMap.set(pkg.importPath.toLowerCase(), pkg);
}

/**
 * Returns all available packages summary list.
 */
export function getAllPackages(): PackageSummary[] {
  return packagesCatalog.map(({ indexTree, content: _c, readme: _r, ...summary }) => ({
    ...summary,
    topSymbols: topSymbolsOf(indexTree),
  }));
}

/** Up to three real exports, types before functions, for cards to show. */
function topSymbolsOf(tree: PackageDetail['indexTree']): string[] {
  const names = [
    ...tree.types.map((t) => t.name),
    ...tree.functions.map((f) => f.name),
  ].filter((n): n is string => Boolean(n))
  return [...new Set(names)].slice(0, 3)
}

/**
 * Returns a specific package with full markdown content, readme, and symbol index.
 */
export async function getPackageById(idOrSlug: string): Promise<PackageDetail | null> {
  const clean = idOrSlug.trim().replace(/\/+$/, "");
  const normalized = clean.toLowerCase().replace(/\//g, "-");
  const pkg = packageMap.get(normalized) || packageMap.get(clean.toLowerCase());
  
  if (!pkg) return null;

  // Load documentation markdown text
  const docPath = `/src/content/packages/${pkg.docFile}`;
  let content = "";
  if (docModules[docPath]) {
    try {
      const res = await docModules[docPath]();
      content = typeof res === 'string' ? res : (res as any)?.default || '';
    } catch (e) {
      console.error(`Failed to load markdown for ${pkg.id}:`, e);
    }
  }

  // Load readme markdown text
  const readmePath = `/src/content/readmes/${pkg.id}.md`;
  let readme = "";
  if (readmeModules[readmePath]) {
    try {
      const res = await readmeModules[readmePath]();
      readme = typeof res === 'string' ? res : (res as any)?.default || '';
    } catch (e) {
      console.error(`Failed to load readme for ${pkg.id}:`, e);
    }
  }

  return {
    ...pkg,
    content,
    readme: readme || content,
  };
}

/** What a package is matched against, built once. */
interface SearchEntry {
  pkg: PackageDetail;
  name: string;
  path: string;
  segments: string[];
  symbols: string[];
  synopsis: string;
  words: Set<string>;
}

const searchIndex: SearchEntry[] = packagesCatalog.map((pkg) => {
  const synopsis = pkg.synopsis.toLowerCase();
  return {
    pkg,
    name: pkg.name.toLowerCase(),
    path: pkg.importPath.toLowerCase(),
    segments: pkg.importPath.toLowerCase().split("/"),
    symbols: [...pkg.indexTree.types, ...pkg.indexTree.functions]
      .map((s) => (s.name || "").toLowerCase())
      .filter(Boolean),
    synopsis,
    words: new Set(synopsis.match(/[a-z0-9]+/g) || []),
  };
});

/**
 * How well one search word matches one package. Where the word appears
 * decides the score: the package's own name and path count most, then the
 * names it exports, then its description. Short words (one or two letters)
 * only match a name or path segment, so "ui" finds ui/window and not "quic".
 */
function scoreWord(e: SearchEntry, t: string): number {
  let s = 0;
  if (e.name === t || e.path === t) s = 100;
  else if (e.segments.includes(t)) s = 80;
  else if (e.name.startsWith(t) || e.path.startsWith(t)) s = 60;
  else if (e.segments.some((seg) => seg.startsWith(t))) s = 50;
  else if (t.length >= 3 && (e.name.includes(t) || e.path.includes(t))) s = 30;

  if (t.length >= 3) {
    if (e.symbols.includes(t)) s += 25;
    else if (e.symbols.some((x) => x.startsWith(t))) s += 12;

    if (e.words.has(t)) s += 10;
    else if (e.synopsis.includes(t)) s += 4;
  }
  return s;
}

/**
 * Searches packages by name, import path, exported names, and description.
 * Every word in the query has to match, and results come best first.
 */
export function searchPackages(query: string, category?: string): PackageSummary[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const wanted = category && category !== "All" ? category.toLowerCase() : null;

  const scored: Array<{ id: string; score: number; path: string }> = [];
  for (const e of searchIndex) {
    if (wanted && e.pkg.category.toLowerCase() !== wanted) continue;
    let score = 0;
    if (words.length === 0) score = 1;
    else {
      for (const w of words) {
        const ws = scoreWord(e, w);
        if (ws === 0) { score = 0; break; }
        score += ws;
      }
    }
    if (score > 0) scored.push({ id: e.pkg.id, score, path: e.path });
  }

  scored.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
  const byId = new Map(getAllPackages().map((p) => [p.id, p]));
  return scored.map((x) => byId.get(x.id)!);
}

/**
 * Category list for the filter sidebar. With a query, each count is how many
 * of that query's results fall in the category, so the numbers add up to what
 * you would see after clicking.
 */
export function getCategoriesFor(query: string): Array<{ name: string; count: number }> {
  const counts: Record<string, number> = {};
  for (const pkg of searchPackages(query)) {
    counts[pkg.category] = (counts[pkg.category] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Sibling packages belonging to the same repo/module.
 */
export function getSiblingPackages(repo: string, currentId: string): PackageSummary[] {
  return getAllPackages().filter(
    (pkg) => pkg.repo.toLowerCase() === repo.toLowerCase() && pkg.id !== currentId
  );
}

/**
 * Featured highlight packages for the opening page.
 */
export function getFeaturedPackages(): PackageSummary[] {
  const featuredIds = [
    "net-tcp",
    "net-http",
    "time",
    "gpu-linalg",
    "llm",
    "ui-window",
    "fs",
    "crypto-sha512",
  ];
  const all = getAllPackages();
  return featuredIds
    .map((id) => all.find((p) => p.id === id))
    .filter(Boolean) as PackageSummary[];
}

/**
 * Category breakdown list with counts.
 */
export function getCategories(): Array<{ name: string; count: number }> {
  const counts: Record<string, number> = {};
  for (const pkg of packagesCatalog) {
    counts[pkg.category] = (counts[pkg.category] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
