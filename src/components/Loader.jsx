import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

const BRAND = 'LINKIT360'

/**
 * Wordmark loader. Letters slide up one-by-one, hold while an underline draws,
 * slide back down, then the black overlay wipes up as the page fades in.
 *
 * Adapted to this project (React JSX + GSAP + plain CSS instead of Next/TS/
 * Tailwind). Timeline phases mirror the brief exactly:
 *   P1 0.0s  letters up   (y 110%→0, 0.6s, ease[0.76,0,0.24,1], stagger 0.07)
 *   P2 0.8s  underline    (width 0→100%, 0.5s, power3.out)
 *   P3 1.6s  letters down (y 0→110%, 0.4s, same ease, stagger 0.05)
 *   P4 2.0s  overlay wipe (y 0→-100%, 0.7s) + page fades in simultaneously
 */
export default function Loader({ onComplete }) {
  const overlayRef = useRef(null)

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const ease = CustomEase.create('loader76', 'M0,0 C0.76,0 0.24,1 1,1')
    const q = gsap.utils.selector(overlay)
    const chars = q('.loader-char-inner')
    const underline = q('.loader-underline')
    const appContent = document.getElementById('app-content')

    gsap.set(chars, { yPercent: 110 })
    gsap.set(underline, { width: '0%' })
    if (appContent) gsap.set(appContent, { opacity: 0 })

    const tl = gsap.timeline({ onComplete })
    // Phase 1 — letters slide up, left to right
    tl.to(chars, { yPercent: 0, duration: 0.6, ease, stagger: 0.07 }, 0)
      // Phase 2 — underline draws under the wordmark
      .to(underline, { width: '100%', duration: 0.5, ease: 'power3.out' }, 0.8)
      // Phase 3 — letters slide down and out
      .to(chars, { yPercent: 110, duration: 0.4, ease, stagger: 0.05 }, 1.6)
      // Phase 4 — overlay wipes away while the page fades in
      .to(overlay, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, 2.0)
    if (appContent) tl.to(appContent, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 2.0)

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader-overlay" ref={overlayRef} aria-hidden="true">
      <div className="loader-wordmark">
        {BRAND.split('').map((c, i) => (
          <span className="loader-char" key={i}>
            <span className="loader-char-inner">{c}</span>
          </span>
        ))}
        <span className="loader-underline" />
      </div>
    </div>
  )
}
