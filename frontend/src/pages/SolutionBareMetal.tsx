import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiChevronRight, FiCpu } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Modern interactive bare-metal & edge UI mockups
import EdgeComputeDemo from '../components/metal-demo/EdgeComputeDemo'
import FeatureChecklist from '../components/solutions/FeatureChecklist'
import CodeCard from '../components/solutions/CodeCard'

export default function SolutionBareMetal() {
  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>

        {/* HERO */}
        <section style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <span style={styles.eyebrow}>Embedded & edge</span>
            <h1 style={styles.heroTitle}>
              Software that runs close to the hardware.
            </h1>
            <p style={styles.heroSubtitle}>
              Write programs for small devices and tightly timed systems, and bring your existing C++ along.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/docs/quickstart" style={styles.btnPrimary}>Get Started</Link>
              <Link to="/packages" style={styles.btnSecondary}>Explore Packages</Link>
            </div>
          </div>
          <div style={styles.heroRight}>
            <EdgeComputeDemo />
          </div>
        </section>

        {/* WHAT YOU CAN BUILD */}
        <section style={styles.gridSection}>
          <h2 style={styles.sectionTitleCenter}>What you can build</h2>
          <p style={styles.sectionSubtitleCenter}>
            Start with the part of the system you care about.
          </p>

          <div style={styles.grid3}>
            <div style={styles.card}>
              <CodeCard id="edge-small" />
              <h3 style={styles.cardTitle}>Small, self-contained programs</h3>
              <p style={styles.cardDesc}>
                Build programs that carry nothing extra, for devices where space is tight.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/packages?category=System+%26+OS" style={styles.btnFullWidthSecondary}>
                Explore system packages
              </Link>
            </div>

            <div style={styles.card}>
              <CodeCard id="edge-cpp" />
              <h3 style={styles.cardTitle}>Your existing C++</h3>
              <p style={styles.cardDesc}>
                Use the drivers and libraries you already have, directly from Vertex.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/docs/cpp-modules" style={styles.btnFullWidthSecondary}>
                Read about C++ modules
              </Link>
            </div>

            <div style={styles.card}>
              <CodeCard id="edge-release" />
              <h3 style={styles.cardTitle}>Predictable timing</h3>
              <p style={styles.cardDesc}>
                Memory is released at known moments, so nothing pauses your program unexpectedly.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/docs/arc" style={styles.btnFullWidthSecondary}>
                How memory works
              </Link>
            </div>
          </div>
        </section>

        {/* WHY VERTEX */}
        <section style={styles.featureSplitSection}>
          <div style={styles.featureLeft}>
            <span style={styles.eyebrow}>Why Vertex</span>
            <h2 style={styles.featureTitle}>
              Control, without the hassle.
            </h2>
            <p style={styles.featureSubtitle}>
              Work close to the hardware while keeping everyday code readable and safe. One compiler builds for each device you target.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/sdk" style={styles.btnPrimary}>
                Get the SDK <FiArrowUpRight size={16} />
              </Link>
              <Link to="/docs/quickstart" style={styles.btnSecondary}>Quickstart</Link>
            </div>
          </div>
          <div style={styles.featureRight}>
            <FeatureChecklist
              title="Made for the edge"
              icon={FiCpu}
              items={[
              { title: "Works with the code you already have", description: "Bring your existing C++ along and use it directly from Vertex." },
              { title: "Predictable timing", description: "Nothing runs in the background to interrupt your program at the wrong moment." },
              { title: "Light when space is tight", description: "When every byte counts, you can build with nothing extra attached." },
              { title: "Ready for each device", description: "The compiler produces the right kind of program for each platform it supports." },
              ]}
            />
          </div>
        </section>

        {/* KEEP EXPLORING */}
        <section style={styles.resourcesSection}>
          <h2 style={styles.sectionTitleCenter}>Keep exploring</h2>

          <div style={styles.resourceList}>
            <Link to="/docs/cli#targets" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>Freestanding builds</h4>
                <p style={styles.resourceItemDesc}>Build without platform libraries, and choose what to build for.</p>
              </div>
              <span style={styles.resourceArrow}>
                Learn more <FiChevronRight size={16} />
              </span>
            </Link>

            <Link to="/docs/cpp-modules" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>C++ modules</h4>
                <p style={styles.resourceItemDesc}>Call C++ code from Vertex with no bindings to write.</p>
              </div>
              <span style={styles.resourceArrow}>
                Learn more <FiChevronRight size={16} />
              </span>
            </Link>

            <Link to="/packages?category=System+%26+OS" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>System packages</h4>
                <p style={styles.resourceItemDesc}>Processes, files, signals, and other building blocks.</p>
              </div>
              <span style={styles.resourceArrow}>
                Learn more <FiChevronRight size={16} />
              </span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

// --- Styles harmonized with the platform's warm editorial palette ---
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FCFCFB',
    color: '#1F1E1D',
    fontFamily: "'Inter', sans-serif",
  },
  main: {
    width: '100%',
    paddingBottom: '8rem',
  },
  
  // Hero
  heroSection: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '6rem 2rem 4rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1.15fr',
    gap: '3.5rem',
    alignItems: 'center',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  eyebrow: {
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#2160C4',
    marginBottom: '0.85rem',
  },
  heroTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.85rem',
    fontWeight: 400,
    lineHeight: 1.14,
    letterSpacing: '-0.025em',
    color: '#1F1E1D',
    margin: '0 0 1.25rem 0',
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    fontWeight: 400,
    color: '#55544E',
    lineHeight: 1.6,
    margin: '0 0 2rem 0',
    maxWidth: '480px',
  },
  heroRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Buttons
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    transition: 'all 0.15s ease',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#1F1E1D',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    border: '1px solid #E5E2DC',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    transition: 'all 0.15s ease',
  },
  btnSecondaryAlt: {
    backgroundColor: 'transparent',
    color: '#1F1E1D',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #E5E2DC',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  },
  
  // 3-Column Grid
  gridSection: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '5rem 2rem',
  },
  sectionTitleCenter: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.75rem',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: '#1F1E1D',
    textAlign: 'center',
    marginBottom: '1rem',
    lineHeight: 1.15,
  },
  sectionSubtitleCenter: {
    fontSize: '1.1rem',
    color: '#666660',
    textAlign: 'center',
    maxWidth: '620px',
    margin: '0 auto 3.5rem auto',
    lineHeight: 1.6,
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '2rem',
  },
  card: {
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
  },
  cardTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '1.45rem',
    fontWeight: 500,
    color: '#1F1E1D',
    marginBottom: '0.5rem',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#55544E',
    marginBottom: '1.25rem',
    lineHeight: 1.6,
  },
  cardList: {
    paddingLeft: '1.25rem',
    margin: '0 0 1.5rem 0',
    color: '#55544E',
    fontSize: '13.5px',
    lineHeight: 1.65,
  },
  cardSpacer: {
    flexGrow: 1,
  },
  btnFullWidth: {
    width: '100%',
    backgroundColor: '#1F1E1D',
    color: '#FCFCFB',
    padding: '0.75rem',
    borderRadius: '999px',
    fontSize: '13.5px',
    fontWeight: 500,
    border: '1px solid #1F1E1D',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    textDecoration: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.15s ease',
  },
  btnFullWidthSecondary: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    color: '#1F1E1D',
    padding: '0.75rem',
    borderRadius: '999px',
    fontSize: '13.5px',
    fontWeight: 500,
    border: '1px solid #E8E6DF',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    textDecoration: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.15s ease',
  },

  // Feature Split (Left Text, Right Mockup)
  featureSplitSection: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '5rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '4.5rem',
    alignItems: 'center',
  },
  featureLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  featureTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '3rem',
    fontWeight: 400,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
    color: '#1F1E1D',
    margin: '0 0 1.5rem 0',
  },
  featureSubtitle: {
    fontSize: '1.1rem',
    color: '#55544E',
    lineHeight: 1.65,
    marginBottom: '2.25rem',
  },
  featureRight: {
    width: '100%',
  },

  // Centered Callout Banner
  bannerSection: {
    maxWidth: '860px',
    margin: '4rem auto',
    padding: '4.5rem 3rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8E6DF',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
  },
  bannerTitle: {
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    fontSize: '2.25rem',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: '#1F1E1D',
    marginBottom: '1rem',
  },
  bannerSubtitle: {
    fontSize: '1.05rem',
    color: '#55544E',
    lineHeight: 1.65,
    marginBottom: '2rem',
    maxWidth: '640px',
  },

  // Resources List
  resourcesSection: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '4rem 2rem 5rem 2rem',
  },
  resourceList: {
    marginTop: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  resourceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.75rem 0',
    borderTop: '1px solid #E8E6DF',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background 0.15s ease',
  },
  resourceText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  resourceItemTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1F1E1D',
    margin: 0,
  },
  resourceItemDesc: {
    fontSize: '14px',
    color: '#666660',
    margin: 0,
  },
  resourceArrow: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#2160C4',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.2rem',
    flexShrink: 0,
  },
}