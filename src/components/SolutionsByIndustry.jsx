import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Solutions by Industry — scrollytelling layout. The left column (heading +
 * the per-industry image/wording blocks) scrolls up normally; the right
 * industry list is pinned (CSS sticky) and highlights whichever block is
 * currently centred in the viewport.
 */
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`

const INDUSTRIES = [
  { n: '01', title: 'Telecom Operators', desc: 'Grow ARPU, reduce churn, and launch new VAS revenue streams.', cta: 'For Operators', img: UNSPLASH('photo-1521405924368-64c5b84bec60') },
  { n: '02', title: 'Enterprises', desc: 'Build engagement and monetize digital services via AI and payment.', cta: 'For Enterprises', img: UNSPLASH('photo-1521737604893-d14cc237f11d') },
  { n: '03', title: 'Government', desc: 'Deliver e-government digital services securely and at scale.', cta: 'For Government', img: UNSPLASH('photo-1529107386315-e1a2ed48a620') },
  { n: '04', title: 'Content Owners', desc: 'Distribute and monetize content through carrier billing across markets.', cta: 'For Content Owners', img: UNSPLASH('photo-1492724441997-5dc865305da7') },
  { n: '05', title: 'Service Partners / ISVs', desc: 'Plug into carrier billing and reach subscribers through one integration.', cta: 'For Partners', img: UNSPLASH('photo-1517180102446-f3ece451e9d8') },
]

export default function SolutionsByIndustry() {
  const sectionRef = useRef(null)
  const blockRefs = useRef([])
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: highlight the industry whose block is centred in the viewport.
    mm.add('(min-width: 992px)', () => {
      const triggers = INDUSTRIES.map((_, i) =>
        ScrollTrigger.create({
          trigger: blockRefs.current[i],
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(i)
          },
        }),
      )
      return () => triggers.forEach((t) => t.kill())
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="industries" className="section solutions-industry" ref={sectionRef}>
      <div className="w-layout-blockcontainer container w-container">
        <div className="sbi-head">
          <div className="overflow-hidden">
            <span data-reveal="up" className="sbi-eyebrow">Solutions by Industry</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="sbi-heading">
              Built for operators, enterprises, institutions, and partners.
            </h2>
          </div>
        </div>

        <div className="sbi-grid">
          {/* left: scrolling image + wording blocks */}
          <div className="sbi-left">
            {INDUSTRIES.map((it, i) => (
              <article className="sbi-block" key={it.title} ref={(el) => (blockRefs.current[i] = el)}>
                <div className="sbi-block-media">
                  <img src={it.img} alt={it.title} loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
                <div className="sbi-block-text">
                  <span className="sbi-block-num">[{it.n}]</span>
                  <h3 className="sbi-block-title">{it.title}</h3>
                  <p className="sbi-block-desc">{it.desc}</p>
                  <a className="sbi-block-link" href="#">{it.cta} <span aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>

          {/* right: pinned (sticky) industry list */}
          <aside className="sbi-right">
            <ul className="sbi-list">
              {INDUSTRIES.map((it, i) => (
                <li className={`sbi-row${i === active ? ' is-active' : ''}`} key={it.title}>
                  <span className="sbi-row-title">{it.title}</span>
                  <span className="sbi-row-num">[{it.n}]</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
