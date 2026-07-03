import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Grid cells in row-major order:
//   [ 19 Offices ] [ company-1 ] [ 248Mn Offices ]
//   [ 94 Telcos  ] [ company-2 ] [ 21 Services    ]
// company-2 is the cell that scales up to cover the whole pinned section.
const CELLS = [
  { type: 'stat', value: 19, suffix: '', label: 'Offices' },
  { type: 'img', src: '/assets/images/company-1.webp', alt: 'LinkIT headquarters' },
  { type: 'stat', value: 248, suffix: 'Mn', label: 'Offices' },
  { type: 'stat', value: 94, suffix: '', label: 'Telcos in 48 Countries' },
  { type: 'img', src: '/assets/images/company-2.webp', alt: 'LinkIT campus', cover: true },
  { type: 'stat', value: 21, suffix: '', label: 'In-House Digital Services' },
]

export default function CompanyNumber() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const numRefs = useRef([])
  const coverWrapRef = useRef(null)
  const coverImgRef = useRef(null)
  const overlayRef = useRef(null)
  const playWordRef = useRef(null)
  const videoWordRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tweens = []
    const triggers = []

    // ---- 1. Title + sub: fade-in slide-up reveal as the section enters ----
    tweens.push(
      gsap.fromTo(
        [headingRef.current, subRef.current],
        { yPercent: 120, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.14,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      ),
    )

    // ---- 2. Counters: count up once, then LOCK to the final value ----
    // Decoupled from ScrollTrigger refreshes (no invalidateOnRefresh on the
    // tween + an explicit onComplete) so a later refresh can never reset it to 0.
    numRefs.current.forEach((el) => {
      if (!el) return
      const value = Number(el.dataset.value)
      const suffix = el.dataset.suffix || ''
      el.textContent = '0' + suffix // start from zero before it scrolls into view
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          once: true,
          onEnter: () => {
            const obj = { v: 0 }
            gsap.to(obj, {
              v: value,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(obj.v) + suffix
              },
              onComplete: () => {
                el.textContent = value + suffix // freeze on the exact final number
              },
            })
          },
        }),
      )
    })

    // ---- 3. Desktop: pin the 100vh section, scale company-2 to full cover, ----
    //         then parallax it out as we move into the next section.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const wrap = coverWrapRef.current
      const img = coverImgRef.current
      const overlay = overlayRef.current
      const playWord = playWordRef.current
      const videoWord = videoWordRef.current
      if (!wrap || !img) return

      // FLIP-style cover transform: where to translate/scale the image so it
      // exactly covers the viewport while pinned. Recomputed on every refresh.
      const cover = { dx: 0, dy: 0, scale: 1 }
      const OVERSCAN = 1.2 // a touch larger than the viewport → headroom for parallax

      const measure = () => {
        gsap.set(img, { x: 0, y: 0, scale: 1 })
        gsap.set(wrap, { y: 0 })
        const ir = img.getBoundingClientRect()
        const sr = section.getBoundingClientRect()
        const w = ir.width
        const h = ir.height
        if (!w || !h) return
        // Horizontal position is scroll-independent; vertical is taken as the
        // image's offset *within the section* (== its viewport top once pinned).
        const left = ir.left - sr.left
        const top = ir.top - sr.top
        const vw = window.innerWidth
        const vh = window.innerHeight
        cover.scale = Math.max(vw / w, vh / h) * OVERSCAN
        cover.dx = vw / 2 - (left + w / 2)
        cover.dy = vh / 2 - (top + h / 2)
      }

      measure()
      ScrollTrigger.addEventListener('refreshInit', measure)

      // Pinned scale: company-2 grows from its grid cell to a full-bleed cover.
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          refreshPriority: 1.5, // below About (2), above ProjectStack (1)
          invalidateOnRefresh: true,
        },
      })
      scaleTl
        .fromTo(
          img,
          { x: 0, y: 0, scale: 1, transformOrigin: '50% 50%' },
          {
            x: () => cover.dx,
            y: () => cover.dy,
            scale: () => cover.scale,
            ease: 'none',
            duration: 0.8,
          },
          0,
        )
        // play-video overlay + icon fade in while the image is enlarging
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.42)
        // once the image fully covers the screen, "PLAY" slides out of the icon
        // to the left and "VIDEO" slides out to the right
        .fromTo(playWord, { xPercent: 100 }, { xPercent: 0, ease: 'power3.out', duration: 0.22 }, 0.78)
        .fromTo(videoWord, { xPercent: -100 }, { xPercent: 0, ease: 'power3.out', duration: 0.22 }, 0.78)

      // Parallax handoff: once un-pinned, the big image lags the scroll as the
      // section leaves and Work Process rises into view. Anchored to the exact
      // pixel where the pin releases (scaleTl's ST end) so it starts seamlessly
      // — scaleTl refreshes first (higher priority), so .end is ready here.
      const parallax = gsap.fromTo(
        wrap,
        { y: 0 },
        {
          y: () => window.innerHeight * 0.07,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => scaleTl.scrollTrigger.end,
            end: () => scaleTl.scrollTrigger.end + window.innerHeight,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', measure)
        scaleTl.scrollTrigger && scaleTl.scrollTrigger.kill()
        scaleTl.kill()
        parallax.scrollTrigger && parallax.scrollTrigger.kill()
        parallax.kill()
        gsap.set([img, wrap], { clearProps: 'transform' })
        gsap.set([overlay, playWord, videoWord], { clearProps: 'all' })
      }
    })

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger && t.scrollTrigger.kill()
        t.kill()
      })
      triggers.forEach((t) => t.kill())
      mm.revert()
    }
  }, [])

  let numIdx = 0
  return (
    <section className="section company" ref={sectionRef}>
      <div className="w-layout-blockcontainer container w-container">
        <div className="company-head">
          <div className="overflow-hidden">
            <h2 ref={headingRef} className="company-heading">Company in Number</h2>
          </div>
          <div className="overflow-hidden">
            <p ref={subRef} className="company-sub">
              12 Years Creating and Developing Digital Solutions All Over The World.
            </p>
          </div>
        </div>

        <div className="company-grid">
          {CELLS.map((c, i) => {
            if (c.type === 'img') {
              if (c.cover) {
                return (
                  <div className="company-img-wrap" key={i} ref={coverWrapRef}>
                    <img
                      ref={coverImgRef}
                      src={c.src}
                      alt={c.alt}
                      loading="eager"
                      className="company-img company-img--cover"
                    />
                  </div>
                )
              }
              return (
                <img
                  key={i}
                  src={c.src}
                  alt={c.alt}
                  loading="lazy"
                  className="company-img"
                  data-reveal="fade-up"
                />
              )
            }
            const idx = numIdx++
            return (
              <div className="company-stat" key={i} data-reveal="fade-up">
                <div
                  className="company-stat-num"
                  ref={(el) => (numRefs.current[idx] = el)}
                  data-value={c.value}
                  data-suffix={c.suffix}
                >
                  {c.value}
                  {c.suffix}
                </div>
                <div className="company-stat-label">{c.label}</div>
              </div>
            )
          })}
        </div>

        {/* Trust strip: leading operators + compliance badges */}
        <div className="company-trust" data-reveal="fade-up">
          <div className="company-trust-row">
            <span className="company-trust-label">Trusted by leading operators</span>
            <div className="company-trust-logos">
              {['Operator', 'Carrier Group', 'Telco', 'MNO Partner', 'Enterprise'].map((name) => (
                <span className="company-trust-logo" key={name}>
                  <span className="company-trust-logo-mark" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="company-trust-badges">
            {['PCI-DSS', 'ISO 27001', 'GDPR / PDP Compliant', '99.9% Uptime SLA'].map((badge) => (
              <span className="company-trust-badge" key={badge}>
                <svg className="company-trust-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Play-video overlay: appears as company-2 scales up to cover the screen.
          At full cover, PLAY slides out left of the icon and VIDEO slides right. */}
      <div className="company-video-overlay" ref={overlayRef} aria-hidden="true">
        <div className="cv-play">
          <div className="cv-side cv-side--left">
            <span className="cv-word" ref={playWordRef}>PLAY</span>
          </div>
          <svg className="cv-icon" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="2" />
            <path d="M40 31 L72 50 L40 69 Z" fill="#fff" />
          </svg>
          <div className="cv-side cv-side--right">
            <span className="cv-word" ref={videoWordRef}>VIDEO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
