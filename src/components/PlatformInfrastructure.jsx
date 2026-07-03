import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BgTriangles from './BgTriangles.jsx'

gsap.registerPlugin(ScrollTrigger)

/**
 * Platform Infrastructure — pinned stage on a navy (#1E3A50) background.
 * As the user scrolls, the right-hand image scales up (medium → large) and
 * drifts upward inside a fixed mask, while the pinned left column swaps between
 * the three categories with a counter-mask text roll (old rolls up out, new
 * rolls up in). Driven by scroll, no page movement during the swap.
 */
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1300&q=80`

const CATS = [
  {
    n: '01',
    title: 'Service Delivery',
    desc: 'Provision and deliver digital services reliably, integrated with operator core.',
    items: ['SDP Platform', 'USSD Gateway', 'Selfcare Platform'],
    img: '/assets/images/platforms/selfcare.webp',
  },
  {
    n: '02',
    title: 'Engagement & Channels',
    desc: 'Reach and engage subscribers across every touchpoint and moment.',
    items: ['Omnichannel', 'WhatsApp Business (WABA)', 'Post-Call Notification', 'Ads Insert'],
    img: UNSPLASH('photo-1563013544-824ae1b704d3'),
  },
  {
    n: '03',
    title: 'Subscriber Intelligence',
    desc: 'Identify, locate, and act on subscriber context in real time.',
    items: ['XSIM & ZeroBalance', 'Location-Based Services (LBS)'],
    img: UNSPLASH('photo-1551288049-bebda4e38f71'),
  },
]

const N = CATS.length

export default function PlatformInfrastructure() {
  const stageRef = useRef(null)
  const mediaRef = useRef(null)
  const imgRefs = useRef([])
  const numRefs = useRef([])
  const titleRefs = useRef([])
  const panelRefs = useRef([])
  const navRefs = useRef([])
  const activeRef = useRef(0)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const mm = gsap.matchMedia()

    mm.add('(min-width: 992px)', () => {
      const nums = numRefs.current
      const titles = titleRefs.current
      const panels = panelRefs.current
      const imgs = imgRefs.current
      const navs = navRefs.current

      // initial state: only category 0 is shown
      gsap.set([...nums, ...titles], { yPercent: 110 })
      gsap.set([nums[0], titles[0]], { yPercent: 0 })
      gsap.set(panels, { autoAlpha: 0, y: 16 })
      gsap.set(panels[0], { autoAlpha: 1, y: 0 })
      gsap.set(imgs, { autoAlpha: 0, yPercent: 11 })
      gsap.set(imgs[0], { autoAlpha: 1 })
      gsap.set(mediaRef.current, { yPercent: 30 }) // frame starts low, then scrolls up
      navs.forEach((el, i) => el && el.classList.toggle('is-active', i === 0))

      const roll = (arr, prev, idx, dir) => {
        if (arr[prev]) gsap.to(arr[prev], { yPercent: -110 * dir, duration: 0.6, ease: 'power3.inOut' })
        if (arr[idx]) gsap.fromTo(arr[idx], { yPercent: 110 * dir }, { yPercent: 0, duration: 0.6, ease: 'power3.inOut' })
      }
      const goTo = (idx, prev) => {
        const dir = idx > prev ? 1 : -1
        navs.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
        roll(nums, prev, idx, dir)
        roll(titles, prev, idx, dir)
        if (panels[prev]) gsap.to(panels[prev], { autoAlpha: 0, y: -12 * dir, duration: 0.4, ease: 'power2.in' })
        if (panels[idx]) gsap.fromTo(panels[idx], { autoAlpha: 0, y: 14 * dir }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.08 })
        imgs.forEach((el, i) => el && gsap.to(el, { autoAlpha: i === idx ? 1 : 0, duration: 0.6, ease: 'power2.out' }))
      }

      const st = ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => '+=' + N * window.innerHeight * 0.9,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        refreshPriority: 1.01, // between AI Solution (1.02) and Digital Services (1)
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // two layers of upward motion:
          // 1) the whole frame scrolls up across the section (bottom → top)
          gsap.set(mediaRef.current, { yPercent: 30 - self.progress * 60 }) // +30% -> -30%
          // 2) inside the frame, the image pans up too (kept from before), masked
          const yP = 11 - self.progress * 22 // +11% -> -11%  (rolls upward)
          imgRefs.current.forEach((img) => img && gsap.set(img, { yPercent: yP }))
          // swap the category (content crossfade + counter-mask text) on segment change
          const idx = Math.min(N - 1, Math.floor(self.progress * N))
          if (idx !== activeRef.current) {
            const prev = activeRef.current
            activeRef.current = idx
            goTo(idx, prev)
          }
        },
      })

      return () => {
        st.kill()
        gsap.set([...nums, ...titles, ...panels, ...imgs, mediaRef.current], { clearProps: 'all' })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="platform-infrastructure" className="section platform-infra">
      <BgTriangles className="pinf-tris" />
      <div className="w-layout-blockcontainer container w-container">
        <div className="pinf-head">
          <div className="pinf-head-left">
            <div className="overflow-hidden">
              <span data-reveal="up" className="pinf-eyebrow">Platform Infrastructure</span>
            </div>
            <div className="overflow-hidden">
              <h2 data-reveal="up" className="pinf-heading">
                Carrier-grade infrastructure that runs digital services at national scale.
              </h2>
            </div>
          </div>
          <a data-reveal="fade-up" className="pinf-headlink" href="#">
            View all platform capabilities <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* pinned stage: left swapping text · right masked scaling image */}
      <div className="pinf-stage" ref={stageRef}>
        <div className="w-layout-blockcontainer container pinf-grid">
          <div className="pinf-left">
            <div className="pinf-top">
              <div className="pinf-num-mask">
                {CATS.map((c, i) => (
                  <span className="pinf-num" key={c.title} ref={(el) => (numRefs.current[i] = el)}>{c.n}.</span>
                ))}
              </div>
              <ul className="pinf-nav">
                {CATS.map((c, i) => (
                  <li className="pinf-nav-item" key={c.title} ref={(el) => (navRefs.current[i] = el)}>
                    <span className="pinf-nav-dash" aria-hidden="true">—</span>
                    {c.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pinf-detail">
              <div className="pinf-title-mask">
                {CATS.map((c, i) => (
                  <h3 className="pinf-title" key={c.title} ref={(el) => (titleRefs.current[i] = el)}>{c.title}</h3>
                ))}
              </div>
              <div className="pinf-panels">
                {CATS.map((c, i) => (
                  <div className="pinf-panel" key={c.title} ref={(el) => (panelRefs.current[i] = el)}>
                    <p className="pinf-desc">{c.desc}</p>
                    <ul className="pinf-items">
                      {c.items.map((it) => (
                        <li className="pinf-item" key={it}>
                          <span className="pinf-check" aria-hidden="true">✓</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pinf-media" ref={mediaRef}>
            {CATS.map((c, i) => (
              <img
                key={c.title}
                src={c.img}
                alt={c.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="pinf-img"
                ref={(el) => (imgRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* mobile: simple stacked cards */}
      <div className="w-layout-blockcontainer container w-container pinf-mobile">
        {CATS.map((c) => (
          <article className="pinf-card" key={c.title} data-reveal="fade-up">
            <div className="pinf-card-media"><img src={c.img} alt={c.title} loading="lazy" /></div>
            <span className="pinf-card-num">{c.n}.</span>
            <h3 className="pinf-card-title">{c.title}</h3>
            <p className="pinf-card-desc">{c.desc}</p>
            <ul className="pinf-items">
              {c.items.map((it) => (
                <li className="pinf-item" key={it}>
                  <span className="pinf-check" aria-hidden="true">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
