import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Home', target: '#home' },
  { label: 'About', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Platforms', target: '#platforms' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false) // slid up out of view (scrolling down)
  const [scrolled, setScrolled] = useState(false) // past the top → show solid backdrop
  const navigate = useNavigate()
  const location = useLocation()

  // Hide the bar while scrolling down; slide it back in when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY || 0
    let ticking = false
    const evaluate = () => {
      ticking = false
      const y = window.scrollY || 0
      setScrolled(y > 40)
      if (y < 80) setHidden(false) // always visible near the very top
      else if (y > lastY + 4) setHidden(true) // scrolling down
      else if (y < lastY - 4) setHidden(false) // scrolling up
      lastY = y
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(evaluate)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Lenis drives smooth scrolling; subscribe too in case native events lag.
    const lenis = window.__lenis
    if (lenis && lenis.on) lenis.on('scroll', onScroll)
    evaluate()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (lenis && lenis.off) lenis.off('scroll', onScroll)
    }
  }, [])

  // Smooth-scroll to an in-page section; if we're on a sub-page, go home first.
  const go = (e, target) => {
    e.preventDefault()
    setOpen(false)
    const scroll = () => {
      const id = target.replace('#', '')
      const el = document.getElementById(id)
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 350)
    } else {
      scroll()
    }
  }

  return (
    <div
      role="banner"
      className={`navbar w-nav${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}`}
    >
      <div className="navbar-main">
        <div className="container w-container">
          <div className="navbar-content-flex">
            <div className="brand-logo-block">
              <a
                href="/"
                onClick={(e) => go(e, '#home')}
                aria-current="page"
                className="brand-logo-link w-nav-brand w--current"
              >
                <img src="/assets/logo-linkit-white.png" alt="LinkIT360" className="brand-logo-img" />
              </a>
            </div>

            <nav role="navigation" className={`nav-menu w-nav-menu ${open ? 'is-open' : ''}`}>
              <div className="nav-menu-flex-down">
                {LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.target}
                    onClick={(e) => go(e, l.target)}
                    className="nav-menu-link w-inline-block"
                  >
                    <div className="nav-menu-dot"></div>
                    <div className="nav-text">{l.label}</div>
                  </a>
                ))}
                <div className="button-wrap nav-tablet">
                  <a href="#contact" onClick={(e) => go(e, '#contact')} className="nav-button w-inline-block">
                    <div className="nav-button-dot"></div>
                    <div className="nav-button-text-wrap">
                      <div className="nav-button-text">Contact</div>
                      <div className="nav-button-text">Contact</div>
                    </div>
                  </a>
                </div>
              </div>
            </nav>

            <div className="navbar-button-humber-wrapper">
              <div className="button-wrap nav">
                <a href="#contact" onClick={(e) => go(e, '#contact')} className="nav-button w-inline-block">
                  <div className="nav-button-dot"></div>
                  <div className="nav-button-text-wrap">
                    <div className="nav-button-text">Contact</div>
                    <div className="nav-button-text">Contact</div>
                  </div>
                </a>
              </div>
              <div
                className="nav-menu-button w-nav-button"
                onClick={() => setOpen((o) => !o)}
                role="button"
                aria-label="Menu"
              >
                <div className={`hamburger ${open ? 'is-open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
