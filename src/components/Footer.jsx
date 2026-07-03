import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { footerArrow } from '../lib/images.js'

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
]

// Footer menu wording adjusted to the new site sections.
const SECTIONS = [
  { label: 'Digital Services', target: '#services' },
  { label: 'AirPay Payment', target: '#airpay-payment' },
  { label: 'AI Solutions', target: '#ai-solution' },
  { label: 'Platform Infrastructure', target: '#platform-infrastructure' },
  { label: 'E-Government', target: '#industries' },
]

function FooterArrow() {
  return (
    <div className="footer-hover-icon-block">
      <img src={footerArrow} loading="lazy" alt="" className="footer-menu-arrow _1" />
      <img src={footerArrow} loading="lazy" alt="" className="footer-menu-arrow _2" />
    </div>
  )
}

export default function Footer() {
  const [done, setDone] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const go = (e, target) => {
    e.preventDefault()
    const scroll = () => {
      const el = document.getElementById(target.replace('#', ''))
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 350)
    } else scroll()
  }

  return (
    <div className="footer-section">
      <section className="section footer">
        <div className="footer-top-content">
          <div className="w-layout-blockcontainer container w-container">
            <div className="footer-main-wrapper">
              <div className="overflow-hidden">
                <div className="footer-menu-block">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-menu-link w-inline-block"
                    >
                      <h6 className="footer-menu-iteam">{s.label}</h6>
                      <FooterArrow />
                    </a>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="footer-menu-block">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.label}
                      href={s.target}
                      onClick={(e) => go(e, s.target)}
                      className="footer-section-id-link w-inline-block"
                    >
                      <h6 className="footer-menu-iteam hover">{s.label}</h6>
                    </a>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden _3">
                <div className="sign-up-block">
                  <p className="sign-up-para">
                    Updates on digital monetization, payment, AI, and telecom innovation.
                  </p>
                  <div className="footer-form-block w-form">
                    {!done ? (
                      <form
                        className="footer-form"
                        onSubmit={(e) => {
                          e.preventDefault()
                          setDone(true)
                        }}
                      >
                        <input
                          className="footer-text-field w-input"
                          maxLength={256}
                          name="Footer-Email"
                          placeholder="Enter email address"
                          type="email"
                          required
                        />
                        <input type="submit" className="footer-submit-button w-button" value="Subscribe" />
                      </form>
                    ) : (
                      <div className="success-message w-form-done" style={{ display: 'block' }}>
                        <div className="success-message-text">
                          Thank you! Your submission has been received!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-layout-blockcontainer container w-container">
            <div className="footer-bottom-wrap">
            <div className="overflow-hidden">
              <div className="footer-info-left-wrap">
                <div className="footer-info-text">
                  <span className="span-text-pimary-color">©</span> 2026 LinkIT360. All rights reserved.
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="footer-info-middle-wrap">
                <Link to="/license" className="utility-page-link w-inline-block">
                  <div className="footer-info-text hover">License</div>
                </Link>
                <Link to="/changelog" className="utility-page-link w-inline-block">
                  <div className="footer-info-text hover">Changelog</div>
                </Link>
                <Link to="/style-guide" className="utility-page-link w-inline-block">
                  <div className="footer-info-text hover">Style Guide</div>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="footer-info-right-wrap">
                <div className="footer-info-text">Privacy Policy · Terms of Use</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
