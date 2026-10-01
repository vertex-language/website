import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiChevronRight, FiLayers } from 'react-icons/fi'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Modern interactive multi-platform UI mockups
import DashboardGraphDemo from '../components/multiplatform-demo/DashboardGraphDemo'
import FeatureChecklist from '../components/solutions/FeatureChecklist'
import CodeCard from '../components/solutions/CodeCard'

export default function SolutionMultiPlatform() {
  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>

        {/* HERO */}
        <section style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <span style={styles.eyebrow}>Cross-platform</span>
            <h1 style={styles.heroTitle}>
              Build once, run in more places.
            </h1>
            <p style={styles.heroSubtitle}>
              Create apps for desktop and mobile from one codebase, and keep each platform feeling like itself.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/docs/quickstart" style={styles.btnPrimary}>Get Started</Link>
              <Link to="/packages" style={styles.btnSecondary}>Explore Packages</Link>
            </div>
          </div>
          <div style={styles.heroRight}>
            <DashboardGraphDemo />
          </div>
        </section>

        {/* WHAT YOU CAN BUILD */}
        <section style={styles.gridSection}>
          <h2 style={styles.sectionTitleCenter}>One codebase, every platform</h2>
          <p style={styles.sectionSubtitleCenter}>
            Share what matters and let each platform do its own thing where it should.
          </p>

          <div style={styles.grid3}>
            <div style={styles.card}>
              <CodeCard id="multi-window" />
              <h3 style={styles.cardTitle}>Desktop apps</h3>
              <p style={styles.cardDesc}>
                Open real windows on Mac and Windows from the same code.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/packages/ui-window" style={styles.btnFullWidthSecondary}>
                Explore ui/window
              </Link>
            </div>

            <div style={styles.card}>
              <CodeCard id="multi-web" />
              <h3 style={styles.cardTitle}>Web content</h3>
              <p style={styles.cardDesc}>
                Show web pages inside your app, or render HTML on your own.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/packages/web" style={styles.btnFullWidthSecondary}>
                Explore the web packages
              </Link>
            </div>

            <div style={styles.card}>
              <CodeCard id="multi-targets" />
              <h3 style={styles.cardTitle}>Mobile apps</h3>
              <p style={styles.cardDesc}>
                Build for Android from the same code you use on the desktop.
              </p>
              <div style={styles.cardSpacer} />
              <Link to="/docs/packages#targets" style={styles.btnFullWidthSecondary}>
                See supported targets
              </Link>
            </div>
          </div>
        </section>

        {/* WHY VERTEX */}
        <section style={styles.featureSplitSection}>
          <div style={styles.featureLeft}>
            <span style={styles.eyebrow}>Why Vertex</span>
            <h2 style={styles.featureTitle}>
              One way of working, everywhere.
            </h2>
            <p style={styles.featureSubtitle}>
              Share the code that matters and keep platform details in their own files. The same tools and commands work on every machine.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/download" style={styles.btnPrimary}>
                Get the SDK <FiArrowUpRight size={16} />
              </Link>
              <Link to="/docs/quickstart" style={styles.btnSecondary}>Quickstart</Link>
            </div>
          </div>
          <div style={styles.featureRight}>
            <FeatureChecklist
              title="One approach, every platform"
              icon={FiLayers}
              items={[
              { title: "Write it once", description: "Build for Mac, Windows, Linux, and Android from the same code." },
              { title: "Room for platform differences", description: "When one system needs something special, it can live in its own file." },
              { title: "Feels at home", description: "Windows and menus use each platform's own system, so apps behave the way people expect." },
              { title: "Nothing extra to set up", description: "The compiler comes with everything it needs, so every machine builds the same way." },
              ]}
            />
          </div>
        </section>

        {/* KEEP EXPLORING */}
        <section style={styles.resourcesSection}>
          <h2 style={styles.sectionTitleCenter}>Keep exploring</h2>

          <div style={styles.resourceList}>
            <Link to="/docs/packages#targets" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>Supported targets</h4>
                <p style={styles.resourceItemDesc}>See which platforms you can build for.</p>
              </div>
              <span style={styles.resourceArrow}>
                Learn more <FiChevronRight size={16} />
              </span>
            </Link>

            <Link to="/docs/packages#platform-specific-files" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>Platform-specific files</h4>
                <p style={styles.resourceItemDesc}>How a file name picks the right code for each platform.</p>
              </div>
              <span style={styles.resourceArrow}>
                Learn more <FiChevronRight size={16} />
              </span>
            </Link>

            <Link to="/packages/ui-window" style={styles.resourceItem}>
              <div style={styles.resourceText}>
                <h4 style={styles.resourceItemTitle}>Window packages</h4>
                <p style={styles.resourceItemDesc}>Open and manage native windows.</p>
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
    backgroundColor: '#1F1E1D',
    color: '#FCFCFB',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #1F1E1D',
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
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1F1E1D',
    margin: '0.25rem 0 0.5rem 0',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#55544E',
    lineHeight: 1.55,
    margin: '0 0 1rem 0',
  },
  cardList: {
    paddingLeft: '1.2rem',
    margin: '0 0 1.5rem 0',
    fontSize: '13.5px',
    color: '#55544E',
    lineHeight: 1.55,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  cardSpacer: {
    flexGrow: 1,
  },
  btnFullWidth: {
    width: '100%',
    padding: '0.65rem 0',
    backgroundColor: '#FFFFFF',
    color: '#1F1E1D',
    border: '1px solid #E5E2DC',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
    display: 'block',
    transition: 'all 0.15s ease',
  },
  btnFullWidthSecondary: {
    width: '100%',
    padding: '0.65rem 0',
    backgroundColor: '#FFFFFF',
    color: '#2160C4',
    border: '1px solid #E8E6DF',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
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