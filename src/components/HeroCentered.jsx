import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HeroCentered — full-height (100vh) navy hero with a centred composition:
 * the heading + CTAs are stacked and centred at the top, the hand animation
 * floats in the middle of the stage (its black source frame is dropped with a
 * `screen` blend so it reads as transparent on the navy), and two footer blocks
 * are anchored to the bottom corners — the positioning paragraph on the left and
 * a trust + audience card on the right. Matches the site tokens (Clashdisplay /
 * Inter Tight, navy #041337, gold accent). The media drifts on a scrubbed
 * ScrollTrigger for a smooth parallax as the hero scrolls away.
 */
const AUDIENCE = [
  {
    label: 'Operators',
    icon: <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  },
  {
    label: 'Enterprises',
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M8 8h3M8 12h3M8 16h3M15 8h1M15 12h1M15 16h1" />
      </>
    ),
  },
  {
    label: 'Government',
    icon: (
      <>
        <path d="M3 9l9-5 9 5" />
        <path d="M5 9v9M10 9v9M14 9v9M19 9v9M3 21h18" />
      </>
    ),
  },
  {
    label: 'Content Owners',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
      </>
    ),
  },
]

export default function HeroCentered() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    // Smooth parallax: the media drifts downward slower than the page as the
    // hero scrolls out, giving depth. Scrubbed → follows Lenis smooth-scroll.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      gsap.fromTo(
        video,
        { yPercent: -6 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="home" ref={sectionRef} className="section hero-c">
      <div className="w-layout-blockcontainer container w-container hero-c-container">
        {/* TOP — heading + CTAs, centred */}
        <div className="hero-c-top">
          <div className="overflow-hidden">
            <h1 data-reveal="up" className="hero-c-heading">
              Launch, monetize, and scale digital services on one connected platform.
            </h1>
          </div>

          <div data-reveal="fade-up" className="hero-c-actions">
            <a href="#contact" className="hero-c-btn hero-c-btn--primary">
              Talk to Us
            </a>
            <a href="#platforms" className="hero-c-btn hero-c-btn--ghost">
              Get the Capabilities Deck
            </a>
          </div>
        </div>

        {/* MEDIA — hand animation floating on the navy stage. z-index sits below
            the wording; the black source frame is dropped via `screen` blend. */}
        <div data-reveal="fade" className="hero-c-media">
          <video
            ref={videoRef}
            className="hero-c-video"
            src="/assets/videos/hero-hand-new.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        {/* BOTTOM — positioning note (left) + trust / audience card (right) */}
        <div className="hero-c-bottom">
          {/* No scroll-reveal on the bottom blocks: they sit below the reveal
              trigger line on a non-scrolling hero, which would leave them hidden. */}
          <p className="hero-c-note">
            LinkIT360 connects digital products, AirPay carrier billing, AI personalization,
            and carrier-grade infrastructure into one ecosystem — so telecom operators,
            enterprises, and institutions grow recurring digital revenue, faster.
          </p>

          <div className="hero-c-card">
            <div className="hero-c-trust">
              <span className="hero-c-trust-dot" aria-hidden="true">•</span>
              Trusted by <strong>94 telecom partners</strong> across{' '}
              <strong>48+ countries</strong>.
            </div>

            <div className="hero-c-card-divider" aria-hidden="true" />

            <ul className="hero-c-audience">
              {AUDIENCE.map((a) => (
                <li className="hero-c-audience-item" key={a.label}>
                  <svg
                    className="hero-c-audience-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {a.icon}
                  </svg>
                  {a.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
