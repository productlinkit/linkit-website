// Latest Insights — wording from the insights reference, laid out like the
// blog grid (a wider featured card + two more). Each card image zooms in
// (scale) on hover, masked by its rounded frame.

const UNSPLASH = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const POSTS = [
  {
    cat: 'Carrier Billing',
    title: 'What is Direct Carrier Billing (DCB) and how it works',
    meta: 'Pillar guide · 8 min read',
    img: UNSPLASH('photo-1556656793-08538906a9f8'),
  },
  {
    cat: 'Telecom VAS',
    title: 'How telecom operators grow ARPU with value-added services',
    meta: 'Strategy · 6 min read',
    img: UNSPLASH('photo-1460925895917-afdab827c52f'),
  },
  {
    cat: 'AI',
    title: 'How AI personalization improves telco customer engagement',
    meta: 'Playbook · 7 min read',
    img: UNSPLASH('photo-1677442136019-21780ecad995'),
  },
]

export default function LatestInsights() {
  return (
    <section id="latest-insights" className="section latest-insights">
      <div className="w-layout-blockcontainer container w-container">
        <div className="li-head">
          <div className="li-head-left">
            <div className="overflow-hidden">
              <span data-reveal="up" className="li-eyebrow">Latest Insights</span>
            </div>
            <div className="overflow-hidden">
              <h2 data-reveal="up" className="li-heading">
                On telecom VAS, carrier billing, AI, and digital monetization.
              </h2>
            </div>
          </div>
          <a data-reveal="fade-up" className="li-viewall" href="#">
            View all insights <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="li-grid">
          {POSTS.map((p, i) => (
            <article className={`li-card${i === 0 ? ' is-featured' : ''}`} key={p.title} data-reveal="fade-up" data-reveal-delay={i * 0.08}>
              <a className="li-card-media" href="#" aria-label={p.title}>
                <img src={p.img} alt={p.title} loading="lazy" />
              </a>
              <div className="li-card-info">
                <div className="li-card-meta">
                  <span className="li-card-cat">{p.cat}</span>
                  <span className="li-card-read">{p.meta}</span>
                </div>
                <h3 className="li-card-title">
                  <a href="#">{p.title}</a>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
