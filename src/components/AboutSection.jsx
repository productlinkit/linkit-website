import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from './Marquee.jsx'
import { sponsorLogos, sponsorClass } from '../lib/images.js'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'Innovating the Future'

// Description typed across three lines; the cursor follows the active line.
const LINES = [
  'Founded in 2010, LinkIT Group has grown into a global technology leader with 20+ offices and operations in over 48 countries.',
  'We specialize in Telecom VAS, partnering with mobile operators to deliver scalable, revenue-driven digital services.',
  "Today, we're expanding into a powerful AI and Fintech-driven ecosystem to accelerate seamless digital transformation worldwide.",
]
const TOTAL = LINES.reduce((sum, l) => sum + l.length, 0)
const PX_PER_CHAR = 7 // pin/scroll distance per typed character

export default function AboutSection() {
  const sectionRef = useRef(null)
  const textRefs = useRef([])
  const cursorRefs = useRef([])
  const towerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Map scroll progress (0→1) to the number of typed characters, filling the
    // lines in order. The cursor sits on whichever line is currently revealing.
    const render = (progress) => {
      let remaining = Math.round(progress * TOTAL)
      let active = 0
      for (let i = 0; i < LINES.length; i++) {
        const len = LINES[i].length
        const shown = Math.max(0, Math.min(len, remaining))
        const el = textRefs.current[i]
        if (el) el.textContent = LINES[i].slice(0, shown)
        if (shown > 0) active = i
        remaining -= len
      }
      cursorRefs.current.forEach((c, i) => c && c.classList.toggle('is-visible', i === active))
    }

    render(0) // start empty, cursor blinking on the first line

    // Pin the 100vh section and scrub the typewriter with the scroll. The pin
    // holds until every character is typed, then releases into Work Process.
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + Math.round(TOTAL * PX_PER_CHAR),
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      refreshPriority: 2, // second pin on the page → refresh after the hero, before the project stack
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
    })

    // Tower image: fade-in-up once the about section comes into view.
    const towerTween = gsap.fromTo(
      towerRef.current,
      { y: 60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 35%', once: true },
      },
    )

    return () => {
      st.kill()
      towerTween.scrollTrigger && towerTween.scrollTrigger.kill()
      towerTween.kill()
    }
  }, [])

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="w-layout-blockcontainer container w-container">
        <div className="about-wrapper">
          <div className="about-left-box">
            <div className="overflow-hidden">
              <div data-reveal="up" className="about-title">® About</div>
            </div>
            <img
              ref={towerRef}
              src="/assets/images/tower-linkit.webp"
              alt="LinkIT tower"
              className="about-tower"
              loading="lazy"
            />
          </div>
          <div className="about-right-box">
            <h2 className="about-headline">{HEADLINE}</h2>
            <div className="about-typewriter">
              {LINES.map((line, i) => (
                <p className="about-type-line" key={i}>
                  <span className="type-text" ref={(el) => (textRefs.current[i] = el)} />
                  <span
                    className="type-cursor"
                    ref={(el) => (cursorRefs.current[i] = el)}
                    aria-hidden="true"
                  >
                    |
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sponser-logo-wrapper">
        <Marquee direction="left" duration={35}>
          <div className="sponser-logo-wrap">
            {sponsorLogos.map((src, i) => (
              <img key={i} src={src} loading="lazy" alt="" className={`sponser-logo-img ${sponsorClass[i]}`} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}
