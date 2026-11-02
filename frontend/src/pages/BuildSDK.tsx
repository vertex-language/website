import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiCopy, FiCheck, FiTerminal, FiLayers, FiCpu, FiCode, FiCommand } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useIsMobile } from '../hooks/useMediaQuery'

interface SDKSection {
  id: string
  title: string
  category: string
  description: string
  content: React.ReactNode
}

export default function BuildSDK() {
  const { slug } = useParams<{ slug?: string }>()
  const [copied, setCopied] = useState(false)
  const isMobile = useIsMobile()

  const sections: SDKSection[] = useMemo(() => [
    {
      id: 'overview',
      category: 'Introduction',
      title: 'Vertex SDK',
      description: 'A unified suite of from-scratch compilers for Vertex, C++23, C, and Objective-C with shared VIR SSA lowering and native in-process linkers.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>The Multi-Language Toolchain</h2>
          <p style={styles.paragraph}>
            The Vertex SDK provides a cohesive collection of native compilers engineered from scratch in Go.
            Every compiler in the SDK shares a common architectural foundation: a typed intermediate representation
            (<strong>VIR</strong>) and native in-process linkers emitting standalone Mach-O, ELF, and PE executables.
          </p>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Tool</th>
                  <th style={styles.th}>Language</th>
                  <th style={styles.th}>Front-End</th>
                  <th style={styles.th}>Backend</th>
                  <th style={styles.th}>Linker Output</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tr}>
                  <td style={styles.tdBold}>vsc</td>
                  <td style={styles.td}>Vertex (<code>.vs</code>)</td>
                  <td style={styles.td}>Vertex AST & Ownership Sema</td>
                  <td style={styles.td}>VIR Typed SSA</td>
                  <td style={styles.td}>Mach-O, ELF, PE</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.tdBold}>v++ (vcx)</td>
                  <td style={styles.td}>ISO C++23 (<code>.cpp</code>, <code>.cc</code>)</td>
                  <td style={styles.td}>Full C++23 Parser & Sema</td>
                  <td style={styles.td}>VIR + PTX + AIR</td>
                  <td style={styles.td}>Mach-O, ELF, PE, Metallib</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.tdBold}>vcc</td>
                  <td style={styles.td}>ISO C17 / C23 (<code>.c</code>)</td>
                  <td style={styles.td}>Fast C AST & Diagnostics</td>
                  <td style={styles.td}>VIR Typed SSA</td>
                  <td style={styles.td}>Mach-O, ELF, PE</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.tdBold}>objv</td>
                  <td style={styles.td}>Objective-C / C++ (<code>.m</code>, <code>.mm</code>)</td>
                  <td style={styles.td}>Modern Obj-C Runtime ABI</td>
                  <td style={styles.td}>VIR Typed SSA</td>
                  <td style={styles.td}>Mach-O, ELF, PE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={styles.sectionHeading}>SDK CLI Commands & Common Workflows</h2>
          <p style={styles.paragraph}>
            The Vertex SDK provides unified CLI tools across all supported languages. You can compile, test, and run native applications directly from your terminal:
          </p>

          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH — TOOLCHAIN CLI WORKFLOWS</span>
            </div>
            <pre style={styles.pre}>
{`# --- Vertex (vsc) ---
# Run a Vertex program directly in memory
vsc run main.vs

# Build an optimized native executable
vsc build -O3 -o server main.vs

# Cross-compile for Linux AMD64 or ARM64 from macOS without extra toolchains
vsc build --target=linux/amd64 -o server_linux main.vs
vsc build --target=linux/arm64 -o server_arm64 main.vs

# --- ISO C++23 (v++ / vcx) ---
# Compile and link modern C++23 source
v++ -std=c++23 -O3 -o engine main.cpp

# Compile standalone relocatable object file
v++ -std=c++23 -c -o engine.o engine.cpp

# --- ISO C (vcc) ---
# Compile standard C17/C23 source with full optimization
vcc -O2 -o sysutil main.c

# Run directly without manual linker invocation
vcc run main.c

# --- Objective-C (objv) ---
# Compile modern Objective-C with ARC and system frameworks
objv -fobjc-arc -o app main.m -framework Cocoa`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'vcx',
      category: 'Compilers',
      title: 'v++ (vcx) — C++23 Compiler',
      description: 'An independent, from-scratch ISO C++23 front-end and compiler lowering directly to VIR and native object files with full Itanium and Microsoft MSVC ABI parity.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>ISO C++23 Compilation</h2>
          <p style={styles.paragraph}>
            <strong>vcx</strong> (CLI command: <code>v++</code>) is the Vertex C++ compiler. It provides a completely
            independent ISO C++23 implementation written in Go: lexical scanner, ISO phase 4 preprocessor, recursive-descent
            parser, template instantiation engine, semantic analyzer, and compile-time constant evaluator.
          </p>

          <h3 style={styles.subHeading}>Dual ABI Parity</h3>
          <p style={styles.paragraph}>
            <code>v++</code> natively implements both major C++ ABI specifications:
          </p>
          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>
              <strong>Itanium C++ ABI:</strong> Complete virtual tables, RTTI structures, construction vtables, and mangling for Linux, macOS, and bare-metal ELF targets.
            </li>
            <li style={styles.bulletItem}>
              <strong>Microsoft C++ ABI:</strong> Full MSVC layout parity, virtual base pointers (<code>vbptr</code>/<code>vbtable</code>), complete object layout, and Microsoft symbol mangling for Windows.
            </li>
          </ul>

          <h3 style={styles.subHeading}>CLI Usage</h3>
          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH</span>
            </div>
            <pre style={styles.pre}>
{`# Compile C++ source to a native relocatable object file
v++ build -o app.o main.cpp

# Inspect lowered VIR (Vertex IR) representation
v++ build --emit vir main.cpp

# Parse and type-check an entire source directory
v++ check src/

# Inspect memory layout of structs and classes (record layout)
v++ layout record.cpp

# Inspect mangled symbol tables
v++ symbols main.cpp

# Dump abstract syntax tree
v++ ast main.cpp`}
            </pre>
          </div>

          <h3 style={styles.subHeading}>Installation</h3>
          <p style={styles.paragraph}>
            Install the <code>v++</code> compiler directly via the Go toolchain:
          </p>
          <div style={styles.codeBlock}>
            <pre style={styles.pre}>
{`go install github.com/vertex-language/vcx/cmd/v++@latest`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'vcc',
      category: 'Compilers',
      title: 'vcc — Vertex C Compiler',
      description: 'Ultra-fast, zero-dependency ISO C17 and C23 compiler with static memory verification and direct Vertex FFI interoperability.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>Fast, Deterministic C Compilation</h2>
          <p style={styles.paragraph}>
            <strong>vcc</strong> is the dedicated C front-end within the Vertex SDK. Tailored for infrastructure
            programming and high-performance system libraries, <code>vcc</code> parses standard C17 and C23 code, applies
            rigorous semantic checks, and lowers straight into VIR.
          </p>

          <h3 style={styles.subHeading}>Key Capabilities</h3>
          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>
              <strong>Zero External Headers Required:</strong> Ships with self-contained freestanding C runtime headers for standard types, limits, and atomics.
            </li>
            <li style={styles.bulletItem}>
              <strong>Direct FFI Integration:</strong> C header files and modules compiled with <code>vcc</code> link seamlessly against Vertex (<code>vsc</code>) packages without manual wrapper bindings.
            </li>
            <li style={styles.bulletItem}>
              <strong>Static Buffer & Memory Analysis:</strong> Detects uninitialized variables, array bounds overflows, and invalid pointer casts at compile time.
            </li>
          </ul>

          <h3 style={styles.subHeading}>Common Commands</h3>
          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH</span>
            </div>
            <pre style={styles.pre}>
{`# Compile a C source file to an object file
vcc build -o module.o module.c

# Execute immediately in a temporary sandbox
vcc run main.c

# Verify syntax and static types
vcc check src/`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'objv',
      category: 'Compilers',
      title: 'objv — Objective-C Compiler',
      description: 'Modern Objective-C 2.0 and Objective-C++ compiler front-end with non-fragile ivar support, block captures, and automatic reference counting (ARC).',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>Objective-C & Objective-C++ Compilation</h2>
          <p style={styles.paragraph}>
            <strong>objv</strong> provides modern Objective-C and Objective-C++ (<code>.m</code> and <code>.mm</code>)
            compilation directly in Go. It lowers message sends (<code>objc_msgSend</code>), property syntheses, protocol
            conformances, and block captures directly into VIR typed SSA.
          </p>

          <h3 style={styles.subHeading}>Runtime ABI Compliance</h3>
          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>
              <strong>Non-Fragile Instance Variables:</strong> Computes ivar offsets dynamically via runtime symbol indirection, ensuring binary compatibility across OS updates.
            </li>
            <li style={styles.bulletItem}>
              <strong>Automatic Reference Counting (ARC):</strong> Emits inline retains, releases, and autorelease pool boundaries with static lifetime tracking.
            </li>
            <li style={styles.bulletItem}>
              <strong>Cross-Platform Support:</strong> Targets Apple Mach-O runtime on macOS/iOS, and the GNUstep libobjc2 modern runtime on Linux and Windows.
            </li>
          </ul>

          <h3 style={styles.subHeading}>Compilation Commands</h3>
          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH</span>
            </div>
            <pre style={styles.pre}>
{`# Compile Objective-C source file
objv build -o controller.o controller.m

# Compile Objective-C++ file with C++23 features
objv build -o bridge.o bridge.mm

# Run an Objective-C script
objv run test.m`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'cuda-hip',
      category: 'Accelerators',
      title: 'CUDA & HIP GPU Kernels',
      description: 'Compile and run GPU compute kernels directly on host NVIDIA and AMD hardware with native device binary emission.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>Native GPU Offloading</h2>
          <p style={styles.paragraph}>
            In the Vertex SDK, a <code>.cu</code> or <code>.hip</code> file is an offload unit. The compiler handles
            device binary generation and host runtime integration directly:
          </p>

          <h3 style={styles.subHeading}>Two-Pass Compilation</h3>
          <p style={styles.paragraph}>
            When compiling an offload unit, <code>v++</code> compiles the file twice:
          </p>
          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>
              <strong>Device Pass:</strong> Kernels compile directly into PTX (for NVIDIA GPUs) or HSA code objects (for AMD GPUs).
            </li>
            <li style={styles.bulletItem}>
              <strong>Host Pass:</strong> Host code compiles to an object file that embeds the device binaries and registers kernels through vcx's built-in driver runtime.
            </li>
          </ul>

          <h3 style={styles.subHeading}>Execution</h3>
          <p style={styles.paragraph}>
            Running <code>v++ run main.cu</code> executes directly on the GPU through the installed graphics driver,
            utilizing vcx's built-in driver runtime:
          </p>
          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH</span>
            </div>
            <pre style={styles.pre}>
{`# Run directly on an NVIDIA GPU (requires driver only)
v++ run gemm.cu

# Compile to a standalone fat binary targeting compute architectures 80 and 90
v++ --offload-arch=sm_80,sm_90 -o gemm gemm.cu`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'metal',
      category: 'Accelerators',
      title: 'Metal Shading Language',
      description: 'Compile Metal shading language (.metal) kernels directly to .metallib library binaries.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>Apple Metal Pipelines</h2>
          <p style={styles.paragraph}>
            With <code>v++</code>, a <code>.metal</code> source file compiles directly to a native <code>.metallib</code> library binary:
          </p>

          <div style={styles.codeBlock}>
            <div style={styles.codeHeader}>
              <span>BASH</span>
            </div>
            <pre style={styles.pre}>
{`# Compile Metal source directly to a loadable library
v++ kernels.metal -o kernels.metallib`}
            </pre>
          </div>

          <p style={styles.paragraph}>
            The source lowers through VIR to Apple Intermediate Representation (AIR) and is packaged by Vertex's
            native <code>air</code> module. The resulting libraries load directly in macOS and iOS applications.
          </p>
        </div>
      ),
    },
    {
      id: 'linkers',
      category: 'Architecture',
      title: 'Native In-Process Linkers',
      description: 'Zero-dependency linkers for Mach-O, ELF, and PE generating executables, shared libraries, and relocatable objects.',
      content: (
        <div>
          <h2 style={styles.sectionHeading}>Independent Binary Linking</h2>
          <p style={styles.paragraph}>
            The Vertex SDK embeds native in-process linkers written in Go to produce complete executables, shared libraries, and relocatable objects:
          </p>

          <ul style={styles.bulletList}>
            <li style={styles.bulletItem}>
              <strong>Mach-O Linker:</strong> Generates valid signed macOS and iOS executables, dylibs, and object files supporting modern arm64e/arm64 load commands.
            </li>
            <li style={styles.bulletItem}>
              <strong>ELF Linker:</strong> Emits standard System V ELF executables and shared objects with dynamic symbol tables, string tables, and GNU hash sections.
            </li>
            <li style={styles.bulletItem}>
              <strong>PE/COFF Linker:</strong> Emits Windows PE32+ executables with import address tables (IAT), export tables, and structured exception handling data.
            </li>
          </ul>
        </div>
      ),
    },
  ], [])

  const currentSection = useMemo(() => {
    if (slug) {
      const found = sections.find(s => s.id === slug)
      if (found) return found
    }
    return sections[0]
  }, [slug, sections])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={styles.page}>
      <Header />

      <div style={isMobile ? { ...styles.body, ...styles.bodyMobile } : styles.body}>
        {/* Left Sticky Sidebar (a scrolling tab strip on phones) */}
        <aside style={isMobile ? { ...styles.sidebar, ...styles.sidebarMobile } : styles.sidebar}>
          {!isMobile && (
            <div style={styles.sidebarHeader}>
              <span style={styles.sidebarCategory}>SDK</span>
            </div>
          )}

          <nav style={isMobile ? { ...styles.navGroup, ...styles.navGroupMobile } : styles.navGroup}>
            {sections.map(sec => {
              const active = sec.id === currentSection.id
              return (
                <Link
                  key={sec.id}
                  to={`/sdk/${sec.id}`}
                  style={{ ...(active ? styles.navItemActive : styles.navItem), ...(isMobile ? styles.navItemMobile : {}) }}
                >
                  {sec.id === 'overview' && <FiLayers size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'vcx' && <FiCode size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'vcc' && <FiTerminal size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'objv' && <FiCommand size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'cuda-hip' && <FiCpu size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'metal' && <FiCpu size={13} style={{ flexShrink: 0 }} />}
                  {sec.id === 'linkers' && <FiLayers size={13} style={{ flexShrink: 0 }} />}
                  <span>{sec.title.split('—')[0].trim()}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Center Main Column */}
        <main style={styles.mainCol}>
          <div style={styles.breadcrumb}>
            SDK <span style={styles.breadcrumbSep}>/</span> {currentSection.category}
          </div>

          <div style={isMobile ? { ...styles.titleRow, ...styles.titleRowMobile } : styles.titleRow}>
            <div>
              <h1 style={isMobile ? { ...styles.title, fontSize: '1.85rem' } : styles.title}>{currentSection.title}</h1>
              <p style={styles.description}>{currentSection.description}</p>
            </div>
            <button type="button" onClick={handleCopy} style={styles.copyBtn}>
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>

          <div style={styles.contentBody}>
            {currentSection.content}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FCFCFB',
    color: '#1F1E1D',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  body: {
    display: 'flex',
    maxWidth: '1280px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 65px)',
    padding: '2.5rem 2rem 5rem 2rem',
    gap: '3rem',
  },

  bodyMobile: { flexDirection: 'column', padding: '1rem 1.25rem 3rem', gap: '1.25rem' },
  sidebarMobile: { width: '100%', position: 'static' },
  navGroupMobile: { flexDirection: 'row', overflowX: 'auto', gap: '0.4rem', paddingBottom: '0.25rem' },
  navItemMobile: { whiteSpace: 'nowrap', flexShrink: 0, border: '1px solid #E8E6DF', borderRadius: '999px' },
  titleRowMobile: { flexDirection: 'column', gap: '0.85rem' },

  // Sidebar
  sidebar: {
    width: '240px',
    flexShrink: 0,
    position: 'sticky',
    top: '80px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  sidebarHeader: {
    padding: '0.4rem 0.75rem',
    marginBottom: '0.25rem',
  },
  sidebarCategory: {
    fontSize: '11.5px',
    fontWeight: 600,
    color: '#8F8D87',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    padding: '0.45rem 0.75rem',
    borderRadius: '6px',
    fontSize: '13.5px',
    color: '#666660',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    padding: '0.45rem 0.75rem',
    borderRadius: '6px',
    fontSize: '13.5px',
    fontWeight: 600,
    backgroundColor: '#F3F1EC',
    color: '#1F1E1D',
    textDecoration: 'none',
  },

  // Main Column
  mainCol: {
    flex: 1,
    minWidth: 0,
  },
  breadcrumb: {
    fontSize: '12.5px',
    color: '#8F8D87',
    marginBottom: '1rem',
  },
  breadcrumbSep: {
    margin: '0 0.35rem',
    color: '#CCC9C0',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
    borderBottom: '1px solid #ECEAE4',
    paddingBottom: '1.5rem',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.25rem',
    fontWeight: 400,
    color: '#1F1E1D',
    margin: '0 0 0.65rem 0',
    letterSpacing: '-0.015em',
    lineHeight: 1.18,
  },
  description: {
    fontSize: '15px',
    color: '#666660',
    margin: 0,
    lineHeight: 1.6,
  },
  copyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D5D3CC',
    borderRadius: '6px',
    padding: '0.35rem 0.65rem',
    fontSize: '12px',
    fontWeight: 500,
    color: '#1F1E1D',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '0.25rem',
  },

  // Content Blocks
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeading: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.6rem',
    fontWeight: 500,
    color: '#1F1E1D',
    margin: '2.5rem 0 1rem 0',
    letterSpacing: '-0.015em',
  },
  subHeading: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#1F1E1D',
    margin: '2rem 0 0.75rem 0',
    letterSpacing: '-0.01em',
  },
  paragraph: {
    fontSize: '14.5px',
    color: '#44433E',
    lineHeight: 1.7,
    margin: '0 0 1rem 0',
  },
  bulletList: {
    margin: '0 0 1.25rem 0',
    paddingLeft: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  bulletItem: {
    fontSize: '14px',
    color: '#44433E',
    lineHeight: 1.6,
  },

  // Code Block
  codeBlock: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '1rem 0 1.75rem 0',
  },
  codeHeader: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#8F8D87',
    padding: '0.5rem 0.85rem',
    borderBottom: '1px solid #F0EEE8',
    backgroundColor: '#FAF9F6',
    letterSpacing: '0.05em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  pre: {
    margin: 0,
    padding: '1rem',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#1F1E1D',
    overflowX: 'auto',
  },

  // Table
  tableWrapper: {
    overflowX: 'auto',
    margin: '1.25rem 0 2rem 0',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13.5px',
    textAlign: 'left',
  },
  th: {
    padding: '0.75rem 1rem',
    backgroundColor: '#FAF9F6',
    borderBottom: '1px solid #E5E2DC',
    fontWeight: 600,
    color: '#1F1E1D',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #F0EEE8',
  },
  td: {
    padding: '0.75rem 1rem',
    color: '#44433E',
    whiteSpace: 'nowrap',
  },
  tdBold: {
    padding: '0.75rem 1rem',
    fontWeight: 600,
    color: '#1F1E1D',
    whiteSpace: 'nowrap',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
}
