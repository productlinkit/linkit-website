import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import BgTriangles from './BgTriangles.jsx'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/**
 * How It Works — pinned, scroll-driven step-through on a navy (#1E3A50) stage.
 * A dashed arc spans the section; each step (Launch → Advertise → Monetize →
 * Personalize → Scale & Grow) slides ALONG that arc — in from the right end to
 * the centre, then out to the left end — as the user scrolls.
 */
const STEPS = [
  { n: '01', title: 'Launch', desc: 'Deploy digital products across gaming, learning, lifestyle, entertainment, and more.' },
  { n: '02', title: 'Advertise', desc: 'Reach and acquire users with targeted advertising and ad insertion across the operator network.' },
  { n: '03', title: 'Monetize', desc: 'Activate carrier billing, subscriptions, and payment flows with AirPay.' },
  { n: '04', title: 'Personalize', desc: 'Apply AI to recommend, automate, and personalize every interaction.' },
  { n: '05', title: 'Scale & Grow', desc: 'Run on carrier-grade platforms to grow engagement, ARPU, and recurring revenue.' },
]

const CENTER = 0.5 // path param where the active step rests

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const pathRef = useRef(null)
  const panelRefs = useRef([])
  const N = STEPS.length

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const mm = gsap.matchMedia()

    // Desktop: pin the 100vh stage and move the steps along the dashed arc.
    mm.add('(min-width: 992px)', () => {
      const panels = panelRefs.current.filter(Boolean)
      const path = pathRef.current
      if (!panels.length || !path) return

      const onPath = (start, end) => ({
        motionPath: { path, align: path, alignOrigin: [0.5, 0.32], start, end },
      })

      // step 0 rests at the centre; the rest wait off the right end of the arc
      gsap.set(panels[0], { ...onPath(CENTER, CENTER), autoAlpha: 1 })
      panels.slice(1).forEach((p) => gsap.set(p, { ...onPath(1, 1), autoAlpha: 0 }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + N * window.innerHeight * 0.95,
          pin: true,
          pinSpacing: true,
          scrub: 1.2, // higher scrub = smoother catch-up between steps
          anticipatePin: 1,
          refreshPriority: 1.1, // between Our Platforms (1.25) and Digital Services (1)
          invalidateOnRefresh: true,
        },
      })

      for (let i = 1; i < N; i++) {
        // outgoing step glides from the centre off to the left end
        tl.to(panels[i - 1], { ...onPath(CENTER, 0), autoAlpha: 0, ease: 'sine.inOut', duration: 0.92 }, i - 0.46)
        // incoming step glides from the right end into the centre, overlapping the exit
        tl.to(panels[i], { ...onPath(1, CENTER), autoAlpha: 1, ease: 'sine.inOut', duration: 0.92 }, i - 0.46)
      }
      tl.to({}, { duration: 0.5 }) // hold the final step before un-pinning

      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill()
        tl.kill()
        gsap.set(panels, { clearProps: 'all' })
      }
    })

    return () => mm.revert()
  }, [N])

  return (
    <section id="how-it-works" className="section how-it-works" ref={sectionRef}>
      <BgTriangles className="hiw-tris" />
      <div className="w-layout-blockcontainer container w-container hiw-container">
        <div className="hiw-head">
          <div className="overflow-hidden">
            <span data-reveal="up" className="hiw-eyebrow">How It Works</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="hiw-heading">
              How LinkIT360 turns digital services into recurring revenue.
            </h2>
          </div>
        </div>

        <div className="hiw-stage" ref={stageRef}>
          <svg className="hiw-arc" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
            <path ref={pathRef} className="hiw-arc-path" d="M -60 300 Q 500 30 1060 210" fill="none" />
          </svg>

          {STEPS.map((s, i) => (
            <div className="hiw-panel" key={s.title} ref={(el) => (panelRefs.current[i] = el)}>
              <span className="hiw-num" aria-hidden="true">{s.n}</span>
              <span className="hiw-badge">
                <span className="hiw-badge-dot" aria-hidden="true">•</span>
                {s.title}
                <span className="hiw-badge-dot" aria-hidden="true">•</span>
              </span>
              <p className="hiw-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
