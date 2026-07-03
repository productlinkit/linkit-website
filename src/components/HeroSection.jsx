import { useEffect, useRef, useState } from 'react'
import { heroBg, heroThumb } from '../lib/images.js'
import { playHeroIntro } from '../lib/reveal.js'

const DELAY = 4000 // autoplay interval (matches data-delay="4000")
const N = 3

export default function HeroSection() {
  const scope = useRef(null)
  const [active, setActive] = useState(0)
  const [fill, setFill] = useState(false)

  // autoplay + progress-bar fill cycle
  useEffect(() => {
    setFill(false)
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setFill(true)),
    )
    const t = setTimeout(() => setActive((a) => (a + 1) % N), DELAY)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [active])

  // hero intro timeline on mount
  useEffect(() => {
    const tl = playHeroIntro(scope.current)
    return () => tl.kill()
  }, [])

  const barStyle = (i) => {
    if (i < active) return { width: '100%', transition: 'none' }
    if (i === active)
      return { width: fill ? '100%' : '0%', transition: `width ${DELAY}ms linear` }
    return { width: '0%', transition: 'none' }
  }

  return (
    <section id="home" className="section-banner fixed" ref={scope}>
      <div className="fixed-banner">
        {/* Full-bleed background crossfade slider (hero v1) */}
        <div className="hero-slider-v1 w-slider">
          <div className="hero-v1-mask w-slider-mask cf-slider">
            {heroBg.map((src, i) => (
              <div key={i} className={`hero-v1-slide-item w-slide cf-slide ${i === active ? 'is-active' : ''}`}>
                <div className="hero-v1-slide-item-wrap">
                  <img src={src} loading="lazy" alt="" className="slider-image-wrap" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="banner-info">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-content-wrapper">
              <div className="overflow-hidden">
                <div className="hero-text-wrapper">
                  <div data-hero="left" style={{ opacity: 0 }} className="hero-left-text">
                    <p className="hero-text">
                      We&nbsp;&nbsp;patner with brands to create digital design that drives
                      conversion and commands attention.
                    </p>
                  </div>
                  <div data-hero="right" style={{ opacity: 0 }} className="hero-right-text">
                    <p className="hero-text">Brand Identity</p>
                    <p className="hero-text">UI/UX Design</p>
                    <p className="hero-text">Development</p>
                    <p className="hero-text">Product Design</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-bottom-content">
                  <div data-hero="big" className="hero-big-text-wrapper">
                    <h1 className="hero-big-text">LinkIT</h1>
                  </div>

                  <div data-hero="thumb" style={{ opacity: 0 }} className="hero-slider-v2-wrap">
                    <div className="overflow-hidden">
                      <div className="slider-v2-wrapper">
                        <div className="hero-slider-v2 w-slider">
                          <div className="hero-v2-mask w-slider-mask cf-slider">
                            {heroThumb.map((src, i) => (
                              <div
                                key={i}
                                className={`hero-v2-slide-item w-slide cf-slide ${i === active ? 'is-active' : ''}`}
                              >
                                <div className="hero-v2-slide-item-wrap">
                                  <img src={src} loading="lazy" alt="" className="slider-img-v2" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="countable-line-grid">
                      {[0, 1, 2].map((i) => (
                        <div className={`line-block-${i + 1}`} key={i}>
                          <div className={`inner-line-${i + 1}`} style={barStyle(i)}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
