import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * AI Solution — pinned horizontal scroll on a navy (#1E3A50) stage. A fixed
 * intro sits on the left; the card track on the right scrolls sideways as the
 * user scrolls down, moving through the five capabilities until the last card
 * (Analytics & Insights) reaches the right edge.
 */
// 3:4 portrait imagery per capability (Unsplash, cropped to ratio)
const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=80`
const CARDS = [
  { n: '01', title: 'Personalization', desc: 'Deliver the right offer to the right subscriber.', img: IMG('photo-1522202176988-66273c2fd55f') },
  { n: '02', title: 'Smart Recommendations', desc: 'Surface the content most likely to convert.', img: IMG('photo-1720962158789-9389a4f399da') },
  { n: '03', title: 'Journey Automation', desc: 'Automate onboarding, retention, and re-engagement.', img: IMG('photo-1485827404703-89b55fcc595e') },
  { n: '04', title: 'Engagement', desc: 'Chatbots and automation across every channel.', img: IMG('photo-1611746872915-64382b5c76da') },
  { n: '05', title: 'Analytics & Insights', desc: 'Understand behavior and optimize revenue.', img: IMG('photo-1551288049-bebda4e38f71') },
]

export default function AiSolution() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const mm = gsap.matchMedia()

    // Desktop: pin the section and translate the track sideways with the scroll.
    mm.add('(min-width: 992px)', () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return

      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          refreshPriority: 1.02, // between How It Works (1.1) and Digital Services (1)
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger && tween.scrollTrigger.kill()
        tween.kill()
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="ai-solution" className="section ai-solution" ref={sectionRef}>
      <div className="ai-wrap">
        <div className="ai-intro">
          <div className="overflow-hidden">
            <span data-reveal="up" className="ai-eyebrow">AI Solutions</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="ai-heading">
              AI that lifts ARPU and retention by personalizing every interaction.
            </h2>
          </div>
          <p data-reveal="fade-up" className="ai-intro-sub">
            From smart recommendations to automated journeys — AI turns subscriber data into measurable
            engagement and revenue.
          </p>
        </div>

        <div className="ai-viewport" ref={viewportRef}>
          <div className="ai-track" ref={trackRef}>
            {CARDS.map((c) => (
              <article className="ai-card" key={c.title}>
                <span className="ai-card-step">
                  Capability {c.n}
                  <span className="ai-card-dot" aria-hidden="true">.</span>
                </span>
                <div className="ai-card-media">
                  <img src={c.img} loading="lazy" alt="" />
                </div>
                <div className="ai-card-body">
                  <h3 className="ai-card-title">{c.title}</h3>
                  <p className="ai-card-desc">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
