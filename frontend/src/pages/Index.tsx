import Footer from '../components/Footer'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiSearch, FiCheck, FiCopy, FiDownload,
  FiMonitor, FiGlobe, FiServer, FiCpu, FiBookOpen, 
  FiTerminal, FiArrowUpRight, FiPackage 
} from 'react-icons/fi'
import { LuBrain } from 'react-icons/lu'
import Header from '../components/Header'
import { VertexCode, vertexFreshLightTheme } from '../vertex-highlight'
// Fresh modern color flow for Vertex, harmonized with the platform palette.
const vertexLightTheme = vertexFreshLightTheme


// Tab definitions highlighting real Vertex standard library packages
const TABS = [
  {
    id: 'ai',
    label: 'AI & Models',
    code: `package main

import (
    "gpu"
    "llm"
)

// Load weights by reference and execute local model inference.
func main() async throws {
    let ref = "hf.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0"
    let model = try await llm.Load(ref, on: gpu.Default())

    let prompt = "Explain Vertex memory safety in one sentence."
    print("Prompt: \\(prompt)")

    // Generate response tokens on GPU device
    let tokens = try await llm.Generate(model, prompt, tokens: 64)
    let output = model.Tokenizer.Decode(tokens)

    print("Response: \\(output)")
}`
  },
  {
    id: 'http',
    label: 'HTTP Server',
    code: `package main

import (
    "encoding/json"
    "net/http"
)

// Production-grade async HTTP server with JSON routing.
func main() async throws {
    var server = http.Server { req in
        var w = http.ResponseWriter()
        w.SetHeader("Content-Type", "application/json")
        w.SetStatus(200)

        let payload = json.Object([
            "status": .string("ok"),
            "runtime": .string("vertex-0.1.0"),
            "threads": .number(8)
        ])
        w.WriteText(json.Encode(.object(payload), indent: "  "))
        return w
    }

    print("Serving HTTP traffic on http://localhost:8080")
    try await server.Listen(on: ":8080")
}`
  },
  {
    id: 'compute',
    label: 'GPU Compute',
    code: `package main

import (
    "gpu"
    "gpu/linalg"
)

// Accelerated matrix-vector kernel on SIMD & GPU hardware.
func main() async throws {
    let device = gpu.Default()
    let m = 1024
    let k = 2048

    // Allocate device buffers with zero-copy unified memory
    let matrix = try device.Buffer(of: float32.self, count: m * k)
    let vector = try device.Buffer(of: float32.self, count: k)
    var result = try device.Buffer(of: float32.self, count: m)

    // Execute accelerated GEMV matrix product
    try await linalg.Gemv(
        [matrix],
        rows: [m],
        vector,
        into: result,
        k: k,
        accumulate: false
    )

    print("Computed \\(m)x\\(k) linear algebra transform on \\(device.Name)")
}`
  },
  {
    id: 'json',
    label: 'JSON & Files',
    code: `package main

import (
    "encoding/json"
    "fs"
)

// Read config file, parse JSON tree, and emit transformed data.
func main() throws {
    let path = fs.Path("config.json")
    let raw = try fs.ReadFile(path)

    let doc = try json.Parse(bytes: raw)
    guard case let .object(map) = doc else {
        fatalError("Expected root JSON object")
    }

    let version = map["version"]?.asString() ?? "1.0.0"
    print("Loaded configuration v\\(version) from \\(path)")

    // Format indented output back to disk
    let output = json.Encode(doc, indent: "  ")
    try fs.WriteFile(fs.Path("build/manifest.json"), [uint8](output.utf8))
}`
  },
  {
    id: 'ui',
    label: 'UI',
    ext: '.vsx',
    code: `package main

import (
    "ui"
    "ui/state"
)

// Reactive native UI component with state bindings and VSX markup.
struct Counter: View {
    @state.State var count = 0

    func render() -> vsx {
        return (
            <div class="counter-card">
                <h3 style:--accent="#7C3AED">Interactive Counter</h3>
                <p>Reactive state updates without virtual DOM overhead:</p>
                <div class="actions">
                    <button onClick={count -= 1}>-</button>
                    <span class="count-value">{count}</span>
                    <button class:accent={count > 0} onClick={count += 1}>+</button>
                </div>
            </div>
        )
    }
}`
  }
]

export default function Index() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const activeTabObj = TABS.find(t => t.id === activeTab) || TABS[0]
  const activeCode = activeTabObj.code

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/packages?q=${encodeURIComponent(q)}` : '/packages')
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        {/* --- HERO SECTION --- */}
        <section style={styles.heroContainer}>
          <div style={styles.heroTextSide}>
            <span style={styles.eyebrow}>Language • SDK • Frameworks</span>
            <h1 style={styles.heroTitle}>Start building<br />with Vertex</h1>
            <p style={styles.heroSubtitle}>
              A modern systems language with an integrated compiler SDK and standard frameworks for AI, scalable networking, and multi-platform UI.
            </p>

            <form onSubmit={handleSearchSubmit} style={styles.searchBar}>
              <FiSearch color="#8F8D87" size={15} style={{ flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages..."
                style={styles.searchInput}
                aria-label="Search packages"
              />
              <div style={styles.searchShortcut}>
                <kbd className="keycap">Ctrl</kbd>
                <kbd className="keycap">K</kbd>
              </div>
            </form>

            <div style={styles.heroActions}>
              <Link to="/docs" style={styles.heroActionBtn}>
                <FiBookOpen size={13} /> Language Guide
              </Link>
              <Link to="/download" style={styles.heroActionBtn}>
                <FiDownload size={13} /> Install vsc
              </Link>
              <Link to="/packages" style={styles.heroActionBtn}>
                <FiPackage size={13} /> All Packages
              </Link>
            </div>
          </div>

          <div style={styles.heroCodeSide}>
            <div style={styles.codeWindow}>
              <div style={styles.codeHeader}>
                <div style={styles.tabList} role="tablist">
                  {TABS.map(tab => {
                    const isActive = tab.id === activeTab
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        style={isActive ? styles.tabBtnActive : styles.tabBtn}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
                <button style={styles.copyBtn} onClick={handleCopy} aria-label="Copy">
                  {copied ? <FiCheck size={14} color="#111" /> : <FiCopy size={14} />}
                </button>
              </div>
              <VertexCode code={activeCode} extension={activeTabObj.ext} theme={vertexLightTheme} className="vertex-hero-code" />
            </div>
          </div>
        </section>

        {/* --- SOLUTIONS & FRAMEWORKS PANELS --- */}
        <section style={styles.sectionWhite}>
          <div style={styles.contentWidth}>
            <span style={styles.sectionEyebrow}>Frameworks</span>
            <h2 style={styles.sectionTitleSerif}>Architect your stack</h2>
            <p style={styles.sectionSubtitle}>
              Pick the standard frameworks that match your workflow, from high-level application and AI modules to low-level systems packages.
            </p>

            <div style={styles.splitPanels}>
              
              <div style={styles.panelCard}>
                <div style={styles.panelVisual}>
                  <FiMonitor size={56} color="#9a9a96" strokeWidth={1} />
                </div>
                <div style={styles.panelBody}>
                  <h3 style={styles.panelTitle}>Application Frameworks</h3>
                  <p style={styles.panelDesc}>
                    Leverage compiled packages for UI, web rendering, and local AI pipelines. Import standard modules to build multi-platform interfaces, run open-weight models, and deploy autonomous workflows without external glue code.
                  </p>
                  <div style={styles.panelLinks}>
                    <Link to="/solutions/ai" style={styles.panelLinkItem}>
                      <LuBrain size={14} /> AI & Agents Framework
                    </Link>
                    <Link to="/solutions/apps-ui" style={styles.panelLinkItem}>
                      <FiMonitor size={14} /> Desktop & Mobile Apps
                    </Link>
                    <Link to="/solutions/multi-platform" style={styles.panelLinkItem}>
                      <FiGlobe size={14} /> Multi-Platform Targets
                    </Link>
                  </div>
                  <div style={styles.packagePillsContainer}>
                    <span style={styles.packagePillsLabel}>Key Packages:</span>
                    <Link to="/packages/llm" style={styles.packagePill}>llm</Link>
                    <Link to="/packages/model" style={styles.packagePill}>model</Link>
                    <Link to="/packages/ui-window" style={styles.packagePill}>ui/window</Link>
                    <Link to="/packages/web" style={styles.packagePill}>web</Link>
                    <Link to="/packages/image-draw" style={styles.packagePill}>image/draw</Link>
                  </div>
                </div>
              </div>

              <div style={styles.panelCard}>
                <div style={styles.panelVisual}>
                  <FiServer size={56} color="#9a9a96" strokeWidth={1} />
                </div>
                <div style={styles.panelBody}>
                  <h3 style={styles.panelTitle}>Systems Packages</h3>
                  <p style={styles.panelDesc}>
                    Drop down to bare-metal primitives with core infrastructure packages. Deploy deterministic backends, engineer stackless async state machines, or interface directly with hardware compute kernels.
                  </p>
                  <div style={styles.panelLinks}>
                    <Link to="/solutions/scaling" style={styles.panelLinkItem}>
                      <FiServer size={14} /> Systems & Async I/O
                    </Link>
                    <Link to="/solutions/bare-metal" style={styles.panelLinkItem}>
                      <FiCpu size={14} /> Embedded & Edge
                    </Link>
                    <Link to="/sdk" style={styles.panelLinkItem}>
                      <FiTerminal size={14} /> The SDK & Compilers
                    </Link>
                  </div>
                  <div style={styles.packagePillsContainer}>
                    <span style={styles.packagePillsLabel}>Key Packages:</span>
                    <Link to="/packages/net-http" style={styles.packagePill}>net/http</Link>
                    <Link to="/packages/net-quic" style={styles.packagePill}>net/quic</Link>
                    <Link to="/packages/gpu-linalg" style={styles.packagePill}>gpu/linalg</Link>
                    <Link to="/packages/db-sqlite" style={styles.packagePill}>db/sqlite</Link>
                    <Link to="/packages/encoding-json" style={styles.packagePill}>encoding/json</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- PILLARS GRID: LANGUAGE, SDK, FRAMEWORKS --- */}
        <section style={styles.sectionWhite}>
          <div style={styles.contentWidth}>
            <span style={styles.sectionEyebrow}>Ecosystem</span>
            <h2 style={styles.sectionTitleSerif}>Language, SDK, and packages</h2>
            
            <div style={styles.resourcesGrid}>
              <Link to="/docs" style={styles.resourceCard}>
                <FiBookOpen size={20} color="#444" style={{ marginBottom: '1.5rem' }} />
                <h4 style={styles.resourceCardTitle}>The Language <FiArrowUpRight size={14} /></h4>
                <p style={styles.resourceCardDesc}>Comprehensive syntax documentation, memory ownership semantics, type system, and async concurrency primitives.</p>
              </Link>

              <Link to="/sdk" style={styles.resourceCard}>
                <FiTerminal size={20} color="#444" style={{ marginBottom: '1.5rem' }} />
                <h4 style={styles.resourceCardTitle}>The SDK & Compilers <FiArrowUpRight size={14} /></h4>
                <p style={styles.resourceCardDesc}>Explore the multi-compiler SDK featuring vsc, vcx (C++23), vcc, objv, in-process linkers, and zero-dependency GPU compilers.</p>
              </Link>

              <Link to="/packages" style={styles.resourceCard}>
                <FiPackage size={20} color="#444" style={{ marginBottom: '1.5rem' }} />
                <h4 style={styles.resourceCardTitle}>Standard Packages <FiArrowUpRight size={14} /></h4>
                <p style={styles.resourceCardDesc}>Explore over 150 standard library packages for networking, GPU compute, AI inference, graphics, and serialization.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* --- CORE GUARANTEES BLOCK --- */}
        <section style={styles.enterpriseSection}>
          <div style={styles.contentWidth}>
            <div style={styles.enterpriseHeader}>
              <span style={styles.sectionEyebrow}>Core Guarantees</span>
              <h2 style={styles.enterpriseTitle}>Engineered for performance,<br />correctness, and scale</h2>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/packages" style={styles.enterpriseBtn}>
                  Browse All Packages <FiArrowUpRight size={13} style={{ marginLeft: 3 }} />
                </Link>
                <Link to="/docs" style={{ ...styles.enterpriseBtn, backgroundColor: 'transparent' }}>
                  Language Documentation <FiArrowUpRight size={13} style={{ marginLeft: 3 }} />
                </Link>
              </div>
            </div>

            <div style={styles.enterpriseGrid}>
              
              {/* Card 1: Language */}
              <div style={styles.enterpriseCard}>
                <h3 style={styles.enterpriseCardTitle}>1. Language</h3>
                <ul style={styles.enterpriseList}>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Static liveness tracking at compile time</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Zero garbage collection pauses</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Data-race prevention via exclusive bindings</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Deterministic memory layouts for hardware</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Safe C/C++ FFI boundaries</li>
                </ul>
                <div style={styles.cardFooterLink}>
                  <Link to="/docs" style={styles.cardLink}>
                    Language Guide <FiArrowUpRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 2: SDK */}
              <div style={styles.enterpriseCard}>
                <h3 style={styles.enterpriseCardTitle}>2. SDK</h3>
                <ul style={styles.enterpriseList}>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Unified multi-platform vsc compiler</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Deterministic, reproducible builds</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Built-in package and dependency management</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> No external CMake or Makefiles required</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> WebAssembly target out of the box</li>
                </ul>
                <div style={styles.cardFooterLink}>
                  <Link to="/sdk" style={styles.cardLink}>
                    SDK & Compilers <FiArrowUpRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 3: Frameworks */}
              <div style={styles.enterpriseCard}>
                <h3 style={styles.enterpriseCardTitle}>3. Frameworks</h3>
                <ul style={styles.enterpriseList}>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> 150+ compiled standard packages</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Built-in AI & tensor execution (llm, model)</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> High-throughput networking (net/http, quic)</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Accelerated compute & linear algebra (gpu)</li>
                  <li style={styles.enterpriseListItem}><FiCheck size={16} style={styles.enterpriseCheck} /> Multi-platform UI and vector graphics engine</li>
                </ul>
                <div style={styles.cardFooterLink}>
                  <Link to="/packages" style={styles.cardLink}>
                    Explore All Packages <FiArrowUpRight size={12} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaContainer}>
            <h2 style={styles.ctaTitle}>
              Start coding smarter with a language that<br />builds, tests, and ships directly
            </h2>
            <p style={styles.ctaSubtitle}>
              Experience modern systems programming, accelerated AI loops, and fearless concurrency.
            </p>
            <div style={styles.ctaButtonGroup}>
              <Link to="/download" style={styles.btnPrimary}>
                Get the SDK <FiArrowUpRight size={14} />
              </Link>
              <Link to="/packages" style={styles.btnSecondaryAlt}>
                Explore Packages
              </Link>
              <Link to="/docs" style={styles.btnSecondaryAlt}>
                Language Docs
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', backgroundColor: '#FCFCFB', color: '#1F1E1D', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  main: { width: '100%' },
  heroContainer: {
    maxWidth: '1300px', margin: '0 auto', padding: '6rem 2rem 5rem',
    display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '4.5rem', alignItems: 'start',
  },
  heroTextSide: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', minWidth: 0, paddingTop: '0.75rem' },
  eyebrow: { fontSize: '13.5px', fontWeight: 500, color: '#8F8D87', marginBottom: '0.85rem' },
  heroTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.85rem', fontWeight: 400, lineHeight: 1.14, letterSpacing: '-0.025em', color: '#1F1E1D', margin: '0 0 1.25rem 0',
    maxWidth: '480px', width: '100%',
  },
  heroSubtitle: { fontSize: '1rem', fontWeight: 400, color: '#666660', lineHeight: 1.6, margin: '0 0 1.75rem 0', maxWidth: '440px', width: '100%' },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '340px',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
    padding: '0.45rem 0.75rem',
    marginBottom: '1.75rem',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  searchInput: {
    marginLeft: '0.55rem',
    color: '#1F1E1D',
    fontSize: '13px',
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  searchShortcut: { display: 'flex', gap: '3px', flexShrink: 0 },
  heroActions: { display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' },
  heroActionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.45rem 0.95rem',
    backgroundColor: 'transparent',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
    color: '#1F1E1D',
    fontSize: '13.5px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  },
  heroBtnBracket: {
    fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
    fontSize: '12px',
    fontWeight: 500,
    color: '#1F1E1D',
  },
  heroCodeSide: { width: '100%', minWidth: 0 },
  codeWindow: {
    border: '1px solid #E8E6DF',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 0,
    height: '520px',
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.65rem 0.85rem 0.45rem 0.85rem',
    borderBottom: '1px solid #F0EEE6',
    backgroundColor: '#FFFFFF',
    overflowX: 'auto',
    flexShrink: 0,
  },
  tabList: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  tabBtn: {
    background: 'none',
    border: 'none',
    padding: '0.35rem 0.75rem',
    fontSize: '13px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#73716C',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    fontWeight: 400,
  },
  tabBtnActive: {
    backgroundColor: '#F3F1EC',
    border: 'none',
    padding: '0.35rem 0.75rem',
    fontSize: '13px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#1F1E1D',
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  },
  copyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#8F8D87',
    padding: '0.35rem',
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.25rem',
  },

  contentWidth: {
    maxWidth: '1300px', margin: '0 auto', padding: '0 2rem',
  },
  sectionWhite: {
    backgroundColor: '#FCFCFB',
    padding: '5.5rem 0',
  },
  sectionEyebrow: {
    fontSize: '13px', fontWeight: 500, color: '#8F8D87', marginBottom: '0.65rem', display: 'block'
  },
  sectionTitleSerif: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.4rem', fontWeight: 400, color: '#1F1E1D', margin: '0 0 0.85rem 0', letterSpacing: '-0.015em'
  },
  sectionSubtitle: {
    fontSize: '1.05rem', color: '#666660', marginBottom: '2.75rem', maxWidth: '600px', lineHeight: 1.6
  },
  splitPanels: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'
  },
  panelCard: {
    backgroundColor: 'transparent', border: '1px solid #E8E6DF', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column'
  },
  panelVisual: {
    height: '200px', backgroundColor: '#F9F9F7', borderBottom: '1px solid #E8E6DF',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  panelBody: {
    padding: '2.25rem', display: 'flex', flexDirection: 'column', flex: 1
  },
  panelTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontSize: '1.65rem', fontWeight: 400, color: '#1F1E1D', margin: '0 0 0.85rem 0'
  },
  panelDesc: {
    fontSize: '14.5px', color: '#666660', lineHeight: 1.65, marginBottom: '2rem'
  },
  panelLinks: {
    display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto'
  },
  panelLinkItem: {
    display: 'inline-flex', alignItems: 'center', gap: '0.65rem', color: '#1F1E1D', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.15s'
  },
  resourcesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2.5rem'
  },
  resourceCard: {
    display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', border: '1px solid #E8E6DF', borderRadius: '14px', padding: '2rem', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.15s'
  },
  resourceCardTitle: {
    fontSize: '1.1rem', fontWeight: 500, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1F1E1D'
  },
  resourceCardDesc: {
    fontSize: '14px', color: '#666660', margin: 0, lineHeight: 1.6
  },

  packagePillsContainer: {
    marginTop: '1.5rem',
    paddingTop: '1.15rem',
    borderTop: '1px solid #ECEAE4',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.45rem',
    alignItems: 'center',
  },
  packagePillsLabel: {
    fontSize: '12px',
    color: '#8F8D87',
    width: '100%',
    marginBottom: '2px',
    fontWeight: 500,
  },
  packagePill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.55rem',
    borderRadius: '4px',
    backgroundColor: '#F3F1EC',
    border: '1px solid #E8E6DF',
    fontSize: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    color: '#1F1E1D',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  },
  cardFooterLink: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ECEAE4',
  },
  cardLink: {
    fontSize: '13px',
    color: '#1F1E1D',
    textDecoration: 'none',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },

  enterpriseSection: {
    backgroundColor: '#FCFCFB',
    padding: '3rem 0 6rem 0',
  },
  enterpriseHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '3.5rem',
  },
  enterpriseTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.75rem',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: '#1F1E1D',
    lineHeight: 1.15,
    marginBottom: '1.25rem',
  },
  enterpriseBtn: {
    backgroundColor: '#F3F1EC',
    color: '#1F1E1D',
    border: '1px solid #E8E6DF',
    padding: '0.55rem 1.15rem',
    borderRadius: '999px',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },
  enterpriseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  enterpriseCard: {
    border: '1px solid #E8E6DF',
    borderRadius: '14px',
    padding: '2.25rem',
    backgroundColor: 'transparent',
  },
  enterpriseCardTitle: {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#1F1E1D',
    marginBottom: '1.5rem',
  },
  enterpriseList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  enterpriseListItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '13.5px',
    color: '#1F1E1D',
    lineHeight: 1.5,
  },
  enterpriseCheck: {
    color: '#2160C4',
    flexShrink: 0,
    marginTop: '2px',
  },

  ctaSection: {
    backgroundColor: '#FCFCFB',
    padding: '0 2rem 6rem 2rem',
  },
  ctaContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    backgroundColor: 'transparent',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    padding: '5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  ctaTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.5rem',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: '#1F1E1D',
    marginBottom: '0.85rem',
    lineHeight: 1.15,
  },
  ctaSubtitle: {
    fontSize: '1.05rem',
    color: '#666660',
    marginBottom: '2.25rem',
    maxWidth: '580px',
    lineHeight: 1.6,
  },
  ctaButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
  },
  btnPrimary: {
    backgroundColor: '#1F1E1D',
    color: '#FCFCFB',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    border: '1px solid #1F1E1D',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  btnSecondaryAlt: {
    backgroundColor: 'transparent',
    border: '1px solid #E5E2DC',
    color: '#1F1E1D',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  },
}