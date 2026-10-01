export interface SymbolItem {
  name?: string;
  signature?: string;
  kind?: string;
  anchor: string;
  members?: Array<{ signature: string; anchor: string }>;
}

export interface IndexTree {
  constants: SymbolItem[];
  variables: SymbolItem[];
  functions: SymbolItem[];
  types: SymbolItem[];
  files: string[];
}

export interface PackageSummary {
  id: string;
  slug: string;
  name: string;
  importPath: string;
  module: string;
  repo: string;
  repository: string;
  version: string;
  license: string;
  category: string;
  synopsis: string;
  keywords: string[];
  /** A few real exported names (types first), shown on cards and searchable. */
  topSymbols: string[];
  docFile: string;
  symbolCounts: {
    functions: number;
    types: number;
    constants: number;
    variables: number;
    files: number;
  };
}

export interface PackageDetail extends PackageSummary {
  indexTree: IndexTree;
  content: string;
  readme: string;
}

