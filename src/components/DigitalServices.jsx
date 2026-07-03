import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services as SERVICES } from "../data/services.js";

gsap.registerPlugin(ScrollTrigger);

// Cards = 8 services + 1 CTA, laid out along a circular arc (fan). Scrolling
// rotates the whole wheel so the next card swings up to the top-center.
const CARDS = [...SERVICES, { cta: true, idx: "09" }];
const N = CARDS.length;
const SPACING = 13; // degrees between adjacent cards on the arc
const HALF = ((N - 1) / 2) * SPACING; // sweep from +HALF (first card up) to -HALF (last)
const LIGHT_AT = 3; // card 4 (zero-based) → flips the section to the light theme

export default function DigitalServices() {
  const sectionRef = useRef(null);
  const arcRef = useRef(null);
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const arc = arcRef.current;
    const wrap = wrapRef.current;
    if (!section || !arc) return;

    // Mobile (swipe row): flip the theme from card 4's live position.
    const updateThemeRect = () => {
      const card = cardRefs.current[LIGHT_AT];
      if (!card) return;
      const r = card.getBoundingClientRect();
      section.classList.toggle("is-light", r.left <= window.innerWidth * 0.5);
    };
    wrap && wrap.addEventListener("scroll", updateThemeRect, { passive: true });

    // Desktop: pin the 100vh section and rotate the arc as the user scrolls.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const tween = gsap.fromTo(
        arc,
        { rotation: HALF },
        {
          rotation: -HALF,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (N - 1) * window.innerHeight * 0.55,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            refreshPriority: 1, // now sits below Our Platforms (1.25) in the DOM → refresh after it
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // active card index ≈ progress * (N-1); flip once card 4 reaches top
              section.classList.toggle(
                "is-light",
                self.progress >= LIGHT_AT / (N - 1),
              );
            },
          },
        },
      );

      return () => {
        tween.scrollTrigger && tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(arc, { clearProps: "transform" });
      };
    });

    return () => {
      wrap && wrap.removeEventListener("scroll", updateThemeRect);
      section.classList.remove("is-light");
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      className="section digital-services"
      ref={sectionRef}>
      <div className="digital-inner">
        <div className="w-layout-blockcontainer container w-container">
          <div className="digital-head sub-heading-content">
            <div className="sub-heading-block">
              <div className="overflow-hidden">
                <span data-reveal="up" className="ds-eyebrow">Digital Products</span>
              </div>
              <div className="overflow-hidden">
                <h2 data-reveal="up" className="sub-heading ds-heading">
                  Ready-to-launch products that drive daily engagement and recurring ARPU.
                </h2>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="work-content-block">
                <p data-reveal="up" className="para-1">
                  Transforming conventional telco services from your Subscribers
                  into innovative and engaging new digital services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="digital-arc-wrap" ref={wrapRef}>
          <div className="digital-arc" ref={arcRef}>
            {CARDS.map((c, i) => {
              const a = (i - (N - 1) / 2) * SPACING;
              if (c.cta) {
                return (
                  <Link
                    key="cta"
                    to="/products"
                    className="ds-card ds-card--cta"
                    style={{ "--a": `${a}deg` }}>
                    <div className="ds-card-inner">
                      <div className="ds-card-top">
                        <span className="ds-card-index">{c.idx}</span>
                        <span className="ds-card-tag">All Products</span>
                      </div>
                      <div className="ds-card-bottom">
                        <h3 className="ds-card-title">View All Products</h3>
                        <p className="ds-card-desc">
                          Explore the full suite of LinkIT digital products.
                        </p>
                        <span className="ds-card-arrow" aria-hidden="true">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }
              return (
                <article
                  key={c.idx}
                  className="ds-card"
                  ref={(el) => (cardRefs.current[i] = el)}
                  style={{ "--a": `${a}deg` }}>
                  <div
                    className="ds-card-inner"
                    style={{
                      backgroundImage: `url(${c.image}), url(${c.mockup}), ${c.grad}`,
                    }}>
                    <div className="ds-card-top">
                      <span className="ds-card-index">{c.idx}</span>
                      <span className="ds-card-tag">{c.tag}</span>
                    </div>
                    <div className="ds-card-bottom">
                      <h3 className="ds-card-title">{c.title}</h3>
                      <p className="ds-card-desc">{c.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
