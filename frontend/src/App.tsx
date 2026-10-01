import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Docs from './pages/Docs'

// Import the solution pages
import SolutionAI from './pages/SolutionAI'
import SolutionGraphics from './pages/SolutionGraphics'
import SolutionMultiPlatform from './pages/SolutionMultiPlatform'
import SolutionScaling from './pages/SolutionScaling'
import SolutionBareMetal from './pages/SolutionBareMetal'

// Import the Download and Build SDK pages
import Download from './pages/Download'
import BuildSDK from './pages/BuildSDK'
import Packages from './pages/Packages'
import PackageDetailView from './pages/PackageDetailView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Top-Level Routes */}
        <Route path="/download" element={<Download />} />
        <Route path="/releases" element={<Download />} />
        <Route path="/sdk" element={<BuildSDK />} />
        <Route path="/sdk/:slug" element={<BuildSDK />} />
        <Route path="/build-sdk" element={<BuildSDK />} />
        <Route path="/build-sdk/:slug" element={<BuildSDK />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/*" element={<PackageDetailView />} />

        {/* Solution Routes */}
        <Route path="/solutions/ai" element={<SolutionAI />} />
        <Route path="/solutions/apps-ui" element={<SolutionGraphics />} />
        <Route path="/solutions/desktop-mobile" element={<SolutionGraphics />} />
        <Route path="/solutions/graphics" element={<SolutionGraphics />} />
        <Route path="/solutions/multi-platform" element={<SolutionMultiPlatform />} />
        <Route path="/solutions/scaling" element={<SolutionScaling />} />
        <Route path="/solutions/bare-metal" element={<SolutionBareMetal />} />

        {/* Doc Routes */}
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App