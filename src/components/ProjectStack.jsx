import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Latest Projects — card-stack peel-on-scroll.
 *
 * Stacked cards peel off one by one as the user scrolls (generalised to N
 * cards; the original spec describes 5). Layout:
 *   - outer wrapper:  height = N * 120vh  (one ~viewport of scroll per card)
 *   - inner sticky:   100vh, centered, pins via CSS position:sticky
 *   - cards:          absolutely stacked, animated by a scrubbed gsap timeline
 *
 * INITIAL STACK (gsap.set on mount):
 *   card[i]: scale 1 - i*0.05, y i*16px, z-index N - i
 * SCROLL (scrub: 1):
 *   each card gets one removal segment. At its turn it animates out
 *   (y -> -120%, scale -> 0.85, opacity -> 0) while every card below it
 *   "rises" one level (smaller y / larger scale). The last card stays as the
 *   final resting card so the section never ends empty.
 */
const STEP_Y = 16
const STEP_SCALE = 0.05

export default function ProjectStack({ projects }) {
  const outerRef = useRef(null)
  const stageRef = useRef(null)
  const cardsRef = useRef([])
  const N = projects.length

  useLayoutEffect(() => {
    const outer = outerRef.current
    const stage = stageRef.current
    const cards = cardsRef.current.filter(Boolean)
    if (!outer || !stage || cards.length === 0) return

    const ctx = gsap.context(() => {
      // --- initial stacked setup -------------------------------------
      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: 1 - i * STEP_SCALE,
          y: i * STEP_Y,
          zIndex: N - i,
          autoAlpha: 1,
          transformOrigin: 'center center',
        })
      })

      const SEG = 1
      // Pin via ScrollTrigger (not CSS position:sticky) so the global
      // `.section{overflow:hidden}` ancestor can't break the pinning.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => '+=' + N * window.innerHeight,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          refreshPriority: 1, // lowest pin on the page → refresh last (after hero + about spacers exist)
          invalidateOnRefresh: true,
        },
      })

      // --- peel the top N-1 cards; keep the last one as the final card
      for (let i = 0; i < N - 1; i++) {
        const t = i * SEG
        // card i flies up and fades out
        tl.to(
          cards[i],
          { yPercent: -120, scale: 0.85, autoAlpha: 0, ease: 'power2.in', duration: SEG * 0.85 },
          t,
        )
        // every card below rises one level toward the top of the stack
        for (let j = i + 1; j < N; j++) {
          const level = j - i - 1
          tl.to(
            cards[j],
            { y: level * STEP_Y, scale: 1 - level * STEP_SCALE, ease: 'none', duration: SEG * 0.85 },
            t,
          )
        }
      }
      // final hold so the last card lingers before the section ends
      tl.to({}, { duration: SEG }, (N - 1) * SEG)
    }, outerRef)

    // keep trigger positions correct once the (large) card art has loaded
    const refresh = () => ScrollTrigger.refresh()
    const imgs = outer.querySelectorAll('img')
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })
    const timer = setTimeout(refresh, 300)

    return () => {
      ctx.revert()
      clearTimeout(timer)
      imgs.forEach((img) => img.removeEventListener('load', refresh))
    }
  }, [N])

  return (
    <div className="project-stack-outer" ref={outerRef}>
      <div className="project-stack-sticky" ref={stageRef}>
        <div className="project-stack">
          {projects.map((p, i) => (
            <div className="project-stack-card" key={p.slug} ref={(el) => (cardsRef.current[i] = el)}>
              <Link to={`/project/${p.slug}`} className="single-project-wrapper w-inline-block">
                <img src={p.card} loading="eager" alt="" className="project-card-img" />
                <div className="project-card-mask">
                  <div className="category-year-wrapper">
                    <div className="category-bg"><div className="category-name">{p.category}</div></div>
                    <div className="year-wrap"><div className="heading-2">//{p.year}</div></div>
                  </div>
                </div>
                <div className="project-sponser-logo-wrap">
                  <img src={p.logo} loading="lazy" alt="" className="project-sponser-logo" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
