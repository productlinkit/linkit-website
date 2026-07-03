/**
 * HeroNew — full-height (100vh) hero on a deep-navy (#061234) stage.
 * Left column carries the wording (eyebrow · heading · paragraph · CTAs ·
 * trust line · audience row); the right column plays a looping 3D animation
 * whose blue background has been keyed to the same navy, so the illustration
 * appears to float directly on the hero. Fonts/buttons follow the rest of the
 * site (Clashdisplay headings, Inter Tight body, gs-btn-style actions).
 */
const AUDIENCE = [
  {
    label: 'Operators',
    icon: (
      <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />
    ),
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

export default function HeroNew() {
  return (
    <section id="home" className="section hero-new">
      <div className="w-layout-blockcontainer container w-container hero-new-container">
        <div className="hero-new-grid">
          <div className="hero-new-left">
            <div className="overflow-hidden">
              <span data-reveal="up" className="hero-new-eyebrow">
                Carrier Billing · Telecom VAS · AI · Digital Monetization
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 data-reveal="up" className="hero-new-heading">
                Launch, monetize, and scale digital services —{' '}
                <em className="hero-new-heading-em">on one connected platform.</em>
              </h1>
            </div>

            <p data-reveal="fade-up" className="hero-new-para">
              LinkIT360 connects digital products, AirPay carrier billing, AI personalization,
              and carrier-grade infrastructure into one ecosystem — so telecom operators,
              enterprises, and institutions grow recurring digital revenue, faster.
            </p>

            <div data-reveal="fade-up" className="hero-new-actions">
              <a href="#contact" className="hero-new-btn hero-new-btn--primary">
                Talk to Us <span aria-hidden="true">→</span>
              </a>
              <a href="#platforms" className="hero-new-btn hero-new-btn--ghost">
                Get the Capabilities Deck <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div data-reveal="fade" className="hero-new-trust">
              <span className="hero-new-trust-dot" aria-hidden="true">•</span>
              Trusted by <strong>94 telecom partners</strong> across{' '}
              <strong>48+ countries</strong>.
            </div>

            <div className="hero-new-divider" aria-hidden="true" />

            <ul data-reveal="fade" className="hero-new-audience">
              {AUDIENCE.map((a) => (
                <li className="hero-new-audience-item" key={a.label}>
                  <svg
                    className="hero-new-audience-icon"
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

          <div data-reveal="fade" className="hero-new-media">
            {/* Transparent VP8 WebM (real alpha) — the CSS navy shows through
                directly, so there's no baked colour that could shift on
                hardware decode and box the clip. */}
            <video
              className="hero-new-video"
              src="/assets/videos/hero-new-transparent.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
