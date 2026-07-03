// "The Challenge" — light section that sits between Company in Number and
// Our Digital Services. Styled with the site tokens (Clashdisplay heading,
// navy/primary palette) so it reads as part of the same design system.

const ICONS = {
  frame: (
    <>
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
}

const CARDS = [
  {
    icon: 'frame',
    title: 'Siloed services',
    desc: 'Products launch in isolation, with no shared journey or engagement layer connecting them.',
    tag: 'ARPU left on the table',
  },
  {
    icon: 'card',
    title: 'Fragmented billing',
    desc: 'Carrier billing, subscriptions, and partner settlement run on disconnected rails that are hard to scale.',
    tag: 'Slow time-to-revenue',
  },
  {
    icon: 'user',
    title: 'Generic engagement',
    desc: 'Without AI, every subscriber gets the same experience — conversion and retention both suffer.',
    tag: 'Higher churn',
  },
]

export default function ChallengeSection() {
  return (
    <section id="challenge" className="section challenge is-light">
      <div className="w-layout-blockcontainer container w-container">
        <div className="challenge-head">
          <div className="overflow-hidden">
            <span data-reveal="up" className="challenge-eyebrow">The Challenge</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="challenge-heading">
              Digital reach is growing.<br />
              Monetization is still fragmented.
            </h2>
          </div>
        </div>

        <div className="challenge-grid">
          {CARDS.map((c, i) => (
            <article className="challenge-card" key={c.title} data-reveal="fade-up" data-reveal-delay={i * 0.08}>
              <span className="challenge-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[c.icon]}
                </svg>
              </span>
              <h3 className="challenge-card-title">{c.title}</h3>
              <p className="challenge-card-desc">{c.desc}</p>
              <span className="challenge-card-tag">
                <span className="challenge-card-tag-arrow" aria-hidden="true">↳</span>
                {c.tag}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
