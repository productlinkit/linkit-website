import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-page video scroll-scrub hero (Apple-style frame-by-frame storytelling).
 *
 * Adapted to this project's real stack (Vite + React JSX + GSAP + plain CSS).
 * The original brief targeted Next.js/TS/Tailwind/Framer-Motion — the logic is
 * identical; only the syntax/styling host differs. Framer Motion drives the
 * text transitions; GSAP ScrollTrigger drives the scrub + pin.
 *
 *  - outer wrapper: 500vh of scroll distance
 *  - inner stage:   100vh, pinned by ScrollTrigger (CSS sticky is unreliable
 *                   here because `.section-banner{overflow:clip}` would clip it)
 *  - video.currentTime is driven directly from scroll progress, gated by
 *    requestVideoFrameCallback so seeks never queue up faster than the decoder
 *  - the video layer is never faded/transitioned — only overlay content changes
 */
const VIDEO_SRC = "/assets/videos/hero.mp4";

const scenes = [
  {
    from: 0,
    to: 3.3,
    title: "CONNECT",
    description:
      "Creating connected digital ecosystems that unify infrastructure, platforms, and people to unlock new opportunities worldwide.",
    services: [
      "Cloud Infrastructure",
      "Enterprise Systems",
      "Network Architecture",
      "Digital Platforms",
    ],
  },
  {
    from: 3.3,
    to: 6.6,
    title: "TRANSFORM",
    description:
      "Reimagining business operations through innovative technology solutions that simplify complexity and enable sustainable growth.",
    services: [
      "Digital Transformation",
      "Product Design",
      "AI Integration",
      "Business Automation",
    ],
  },
  {
    from: 6.6,
    to: 10,
    title: "ACCELERATE",
    description:
      "Empowering organizations to move faster with intelligent systems, actionable insights, and next-generation digital capabilities.",
    services: [
      "Artificial Intelligence",
      "Data Engineering",
      "Cyber Security",
      "Technology Consulting",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1];

// Per-element transition (enter is staggered; exit is prompt).
const enterT = (delay) => ({ duration: 0.8, ease: EASE, delay });
const exitT = { duration: 0.55, ease: EASE };
const fromState = { opacity: 0, y: 20, filter: "blur(12px)" };
const exitState = { opacity: 0, y: -12, filter: "blur(8px)" };

export default function HeroVideoScroll() {
  const outerRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!video || !outer || !stage) return;

    let duration = 10;
    let target = 0;
    let pending = false;
    let st = null;
    const hasRVFC = typeof video.requestVideoFrameCallback === "function";

    // Seek toward `target`, gated so we never issue a new seek before the last
    // frame has actually been presented (prevents the seek queue from building).
    const seek = () => {
      if (pending) return;
      if (Math.abs(video.currentTime - target) < 0.01) return;
      pending = true;
      video.currentTime = target;
      if (hasRVFC) {
        video.requestVideoFrameCallback(() => {
          pending = false;
          seek(); // keep converging to the latest target
        });
      } else {
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          pending = false;
          seek();
        };
        video.addEventListener("seeked", onSeeked);
      }
    };

    const detectScene = (t) => {
      let idx = scenes.findIndex((s) => t >= s.from && t < s.to);
      if (idx === -1)
        idx = t >= scenes[scenes.length - 1].from ? scenes.length - 1 : 0;
      // only update state when entering a NEW scene
      setActiveScene((prev) => (prev === idx ? prev : idx));
    };

    const setup = () => {
      duration = video.duration || 10;
      st = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: stage,
        pinSpacing: false, // outer already provides the 500vh of scroll length
        refreshPriority: 3, // topmost pin → refresh first (keeps lower pins' positions correct)
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = Math.min(duration - 0.001, self.progress * duration);
          detectScene(target);
          seek();
        },
      });
      ScrollTrigger.refresh();
    };

    // Prime the decoder (play→pause) so scrubbing seeks resolve quickly, then
    // drive currentTime manually. The element keeps muted/loop/playsInline.
    const prime = () => {
      const p = video.play();
      if (p && typeof p.then === "function")
        p.then(() => video.pause()).catch(() => video.pause());
      else video.pause();
      setup();
    };

    if (video.readyState >= 1) prime();
    else video.addEventListener("loadedmetadata", prime, { once: true });

    return () => {
      if (st) st.kill();
      video.removeEventListener("loadedmetadata", prime);
    };
  }, []);

  const scene = scenes[activeScene];

  return (
    <section id="home" className="hero-video-outer" ref={outerRef}>
      <div className="hero-video-stage" ref={stageRef}>
        {/* Video layer — never faded/transitioned, stays visible at all times */}
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-video-scrim" aria-hidden="true" />

        {/* Overlay content — driven by the active scene */}
        <div className="banner-info">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-content-wrapper">
              <div className="overflow-hidden">
                <div className="hero-text-wrapper">
                  <div className="hero-left-text">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`desc-${activeScene}`}
                        className="hero-text"
                        initial={fromState}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: enterT(0),
                        }}
                        exit={{ ...exitState, transition: exitT }}>
                        {scene.description}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="hero-right-text">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`svc-${activeScene}`}
                        initial={fromState}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: enterT(0.1),
                        }}
                        exit={{ ...exitState, transition: exitT }}
                        className="hero-services">
                        {scene.services.map((s) => (
                          <p className="hero-text" key={s}>
                            {s}
                          </p>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-bottom-content hero-video-bottom">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={`title-${activeScene}`}
                      className="hero-big-text"
                      initial={fromState}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: enterT(0.25),
                      }}
                      exit={{ ...exitState, transition: exitT }}>
                      {scene.title}
                    </motion.h1>
                  </AnimatePresence>

                  {/* Scene indicator */}
                  <div
                    className="scene-indicator"
                    role="tablist"
                    aria-label="Scenes">
                    {scenes.map((s, i) => (
                      <motion.span
                        key={s.title}
                        role="tab"
                        aria-selected={i === activeScene}
                        className={`scene-dot ${i === activeScene ? "is-active" : ""}`}
                        animate={{
                          width: i === activeScene ? 34 : 8,
                          backgroundColor:
                            i === activeScene
                              ? "#ffffff"
                              : "rgba(255,255,255,0.35)",
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
