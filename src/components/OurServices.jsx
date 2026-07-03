import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    img: '/assets/images/game-studio.webp',
    title: 'Game Studio',
    desc: 'We have in house game studio for our games and we build experiences for our customers through our unique gameplay.',
  },
  {
    img: '/assets/images/ip-character.webp',
    title: 'IP Character Creation',
    desc: 'The IP Character Creation Service offers comprehensive assistance in crafting unique and compelling characters tailored to various projects, including books, films, comics, video games, and branding campaigns.',
  },
]

export default function OurServices() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const revealRef = useRef(null)
  const introImgRef = useRef(null)
  const finalRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Desktop only: pin the 100vh section. The stacked "OUR / SERVICES" title
    // opens vertically as the two images reveal from the centre, then the intro
    // cross-dissolves into the final layout — where the heading fades in up, the
    // images scale to the end, and each card's text slides down from its image.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const intro = introRef.current
      const reveal = revealRef.current
      const final = finalRef.current
      if (!intro || !reveal || !final) return

      const heading = final.querySelector('.os-final-heading')
      const imgs = final.querySelectorAll('.os-card-media img')
      const texts = final.querySelectorAll('.os-card-text-inner')

      gsap.set(intro, { autoAlpha: 1 })
      gsap.set(reveal, { height: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=170%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl
        // 1. images open from the centre, pushing OUR up and SERVICES down
        .fromTo(
          reveal,
          { height: 0 },
          { height: () => introImgRef.current.offsetHeight, ease: 'power2.inOut', duration: 0.45 },
          0,
        )
        // 2. the opaque intro cross-dissolves away to reveal the final layout
        .to(intro, { autoAlpha: 0, scale: 1.05, ease: 'power2.in', duration: 0.2 }, 0.5)
        // 3a. heading: fade in + slide up
        .fromTo(
          heading,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.32 },
          0.58,
        )
        // 3b. images: keep scaling all the way to the end
        .fromTo(imgs, { scale: 1.18 }, { scale: 1, ease: 'none', duration: 0.42 }, 0.58)
        // 3c. card text: fade in + slide down from under each image
        .fromTo(
          texts,
          { autoAlpha: 0, y: -48 },
          { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.34, stagger: 0.1 },
          0.66,
        )

      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill()
        tl.kill()
        gsap.set([intro, final, reveal, heading, imgs, texts], { clearProps: 'all' })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="our-services" className="section our-services" ref={sectionRef}>
      <div className="os-stage">
        {/* INTRO — stacked title that opens to reveal the images from the centre */}
        <div className="os-intro" ref={introRef} aria-hidden="true">
          <span className="os-intro-word">OUR</span>
          <div className="os-intro-reveal" ref={revealRef}>
            {SERVICES.map((s, i) => (
              <img
                key={s.title}
                ref={i === 0 ? introImgRef : null}
                src={s.img}
                alt=""
                className="os-intro-img"
              />
            ))}
          </div>
          <span className="os-intro-word">SERVICES</span>
        </div>

        {/* FINAL — resolved layout (heading + cards) */}
        <div className="os-final" ref={finalRef}>
          <div className="w-layout-blockcontainer container w-container">
            <h2 className="os-final-heading">Our Services</h2>
            <div className="os-final-grid">
              {SERVICES.map((s) => (
                <article className="os-card" key={s.title}>
                  <div className="os-card-media">
                    <img src={s.img} alt={s.title} loading="lazy" />
                  </div>
                  <div className="os-card-text">
                    <div className="os-card-text-inner">
                      <h3 className="os-card-title">{s.title}</h3>
                      <p className="os-card-desc">{s.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
