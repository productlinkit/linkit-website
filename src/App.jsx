import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLenis from './lib/useLenis.js'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import License from './pages/License.jsx'
import Changelog from './pages/Changelog.jsx'
import StyleGuide from './pages/StyleGuide.jsx'

// Reset scroll + refresh ScrollTrigger whenever the route changes.
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [pathname])
  return null
}

export default function App() {
  useLenis()

  // First-visit wordmark loader; skipped on repeat visits this session.
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem('linkit_loaded') !== '1'
    } catch {
      return true
    }
  })

  // Lock scrolling while the loader runs.
  useEffect(() => {
    if (!loading) return
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
  }, [loading])

  const finishLoader = () => {
    try {
      sessionStorage.setItem('linkit_loaded', '1')
    } catch {
      /* sessionStorage unavailable — loader simply runs again next time */
    }
    document.body.style.overflow = ''
    if (window.__lenis) window.__lenis.start()
    setLoading(false)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  return (
    <>
      {loading && <Loader onComplete={finishLoader} />}
      <div className="page-wrapper" id="app-content">
        <ScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/license" element={<License />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}
