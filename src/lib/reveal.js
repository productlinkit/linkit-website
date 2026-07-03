import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Recompute trigger positions on the events that actually change layout.
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
})

/**
 * Scroll-reveal system that mirrors the original Webflow IX2 interactions.
 * Add `data-reveal="<type>"` to any element inside a scoped page:
 *   - "up"      : text/element slides up from below (inside an .overflow-hidden mask)
 *   - "fade"    : opacity 0 -> 1
 *   - "fade-up" : opacity + slide up
 *   - "scale"   : ken-burns scale 1.2 -> 1 (scrubbed, used for images)
 * Optional: data-reveal-delay (seconds).
 *
 * Reliability: triggers use invalidateOnRefresh and the whole set is refreshed
 * whenever images finish loading / the window loads / resizes, so lazy-loaded
 * media that grows the page can't leave the start positions stale.
 */
export function useScrollReveals(scopeRef, deps = []) {
  useLayoutEffect(() => {
    const root = scopeRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('[data-reveal]')
      items.forEach((el) => {
        const type = el.getAttribute('data-reveal')
        const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0')
        const st = {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
        const base = { duration: 1.1, ease: 'expo.out', delay, scrollTrigger: st }

        if (type === 'up') {
          gsap.fromTo(el, { yPercent: 115 }, { yPercent: 0, ...base })
        } else if (type === 'fade') {
          gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, ...base })
        } else if (type === 'fade-up') {
          gsap.fromTo(el, { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, ...base })
        } else if (type === 'scale') {
          gsap.fromTo(
            el,
            { scale: 1.2 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-reveal-scope]') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        }
      })
    }, root)

    // --- keep trigger positions correct despite lazy media / late fonts ---
    const refresh = () => ScrollTrigger.refresh()
    const imgs = root.querySelectorAll('img')
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)
    const timers = [400, 1200, 2500].map((t) => setTimeout(refresh, t))
    // settle once after initial layout
    requestAnimationFrame(refresh)

    return () => {
      ctx.revert()
      window.removeEventListener('load', refresh)
      imgs.forEach((img) => img.removeEventListener('load', refresh))
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Hero intro timeline that plays once on mount (matches the load animation).
 *  Uses fromTo with explicit destinations so React 18 StrictMode's double
 *  mount (which kills + recreates the timeline) can't leave an element stuck
 *  at an intermediate "from" value — every tween always resolves to its end. */
export function playHeroIntro(scope) {
  const q = gsap.utils.selector(scope)
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.4 } })

  tl.fromTo(q('[data-hero="big"]'), { yPercent: 114 }, { yPercent: 0, duration: 1.6 }, 0.1)
    .fromTo(q('[data-hero="left"]'), { autoAlpha: 0 }, { autoAlpha: 1 }, 0.3)
    .fromTo(q('[data-hero="right"]'), { autoAlpha: 0 }, { autoAlpha: 1 }, 0.4)
    .fromTo(q('[data-hero="thumb"]'), { autoAlpha: 0 }, { autoAlpha: 1 }, 0.6)

  return tl
}
