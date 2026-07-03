import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Our Platforms — card-stack peel-on-scroll (same interaction as the old
 * project stack). Five connected layers peel off one by one as the user
 * scrolls. Each card shows a cover image, a category badge, and the layer name.
 */
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const PLATFORMS = [
  { slug: 'engage', name: 'Engage', category: 'Digital Products', cover: '/assets/images/engage.webp' },
  { slug: 'advertise', name: 'Advertise', category: 'Ads Platform', cover: UNSPLASH('photo-1608222351212-18fe0ec7b13b') },
  { slug: 'airpay', name: 'Monetize', category: 'AirPay Payment', cover: '/assets/images/platforms/airpay.webp' },
  { slug: 'personalize', name: 'Personalize', category: 'AI Solutions', cover: UNSPLASH('photo-1677442136019-21780ecad995') },
  { slug: 'scale', name: 'Scale', category: 'Platform Infra', cover: UNSPLASH('photo-1558494949-ef010cbdcc31') },
]

const STEP_Y = 16
const STEP_SCALE = 0.05

export default function PlatformStack() {
  const outerRef = useRef(null)
  const stageRef = useRef(null)
  const cardsRef = useRef([])
  const N = PLATFORMS.length

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => '+=' + N * window.innerHeight,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          refreshPriority: 1.25, // above Digital Services (1), below Company (1.5) — matches DOM order
          invalidateOnRefresh: true,
        },
      })

      // --- peel the top N-1 cards; keep the last one as the final card
      for (let i = 0; i < N - 1; i++) {
        const t = i * SEG
        tl.to(
          cards[i],
          { yPercent: -120, scale: 0.85, autoAlpha: 0, ease: 'power2.in', duration: SEG * 0.85 },
          t,
        )
        for (let j = i + 1; j < N; j++) {
          const level = j - i - 1
          tl.to(
            cards[j],
            { y: level * STEP_Y, scale: 1 - level * STEP_SCALE, ease: 'none', duration: SEG * 0.85 },
            t,
          )
        }
      }
      // last card (Scale) drifts up with a parallax as the pin releases, so the
      // next section appears to scroll up and cover it. Start the drift the
      // instant the previous card finishes settling (no dead-zone) and use a
      // constant-velocity (linear) ease so there's no acceleration snap right at
      // the un-pin — this is what makes the handoff into How It Works smooth.
      const lastSettle = (N - 2) * SEG + SEG * 0.85
      tl.to(
        cards[N - 1],
        { yPercent: -22, ease: 'none', duration: N * SEG - lastSettle },
        lastSettle,
      )
    }, outerRef)

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
          {PLATFORMS.map((p, i) => (
            <div className="project-stack-card" key={p.slug} ref={(el) => (cardsRef.current[i] = el)}>
              <div className="single-project-wrapper w-inline-block">
                <img src={p.cover} loading="eager" alt={p.name} className="project-card-img" />
                <div className="project-card-mask">
                  <div className="category-year-wrapper">
                    <div className="category-bg"><div className="category-name">{p.category}</div></div>
                  </div>
                </div>
                <div className="project-sponser-logo-wrap">
                  <div className="platform-name-text">{p.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
