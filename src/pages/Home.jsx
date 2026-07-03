import { useRef, useState } from 'react'
import HeroVideoScroll from '../components/HeroVideoScroll.jsx'
import HeroNew from '../components/HeroNew.jsx'
import HeroCentered from '../components/HeroCentered.jsx'
import AboutSection from '../components/AboutSection.jsx'
import CompanyNumber from '../components/CompanyNumber.jsx'
import ChallengeSection from '../components/ChallengeSection.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import SolutionsByIndustry from '../components/SolutionsByIndustry.jsx'
import AirpayPayment from '../components/AirpayPayment.jsx'
import AiSolution from '../components/AiSolution.jsx'
import PlatformInfrastructure from '../components/PlatformInfrastructure.jsx'
import DigitalServices from '../components/DigitalServices.jsx'
import ProvenOutcomes from '../components/ProvenOutcomes.jsx'
import LatestInsights from '../components/LatestInsights.jsx'
import GetStarted from '../components/GetStarted.jsx'
import CtaSection from '../components/CtaSection.jsx'
import PlatformStack from '../components/PlatformStack.jsx'
import { useScrollReveals } from '../lib/reveal.js'

export default function Home() {
  const scope = useRef(null)
  useScrollReveals(scope, [])

  return (
    <div ref={scope}>
      {/* HERO — centred 100vh navy hero (heading + CTAs on top, hand video
          floating, note + trust card anchored to the bottom corners) */}
      <HeroCentered />

      {/* PREVIOUS HERO (two-column) — hidden for now */}
      {/* <HeroNew /> */}

      {/* OLD HERO — hidden for now */}
      {/* <HeroVideoScroll /> */}

      {/* ABOUT — hidden for now */}
      {/* <AboutSection /> */}

      {/* COMPANY IN NUMBER */}
      <CompanyNumber />

      {/* THE CHALLENGE */}
      <ChallengeSection />

      {/* OUR PLATFORMS */}
      <section id="platforms" className="section project is-light">
        <div className="w-layout-blockcontainer container w-container">
          <div className="project-showcase">
            <div className="sub-heading-content">
              <div className="sub-heading-block">
                <div className="overflow-hidden">
                  <span data-reveal="up" className="platforms-eyebrow">The Ecosystem</span>
                </div>
                <div className="overflow-hidden">
                  <h2 data-reveal="up" className="sub-heading platforms-heading">
                    Five connected layers that turn digital reach into recurring revenue
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="project-wrapper">
            <PlatformStack />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (pinned step-through) */}
      <HowItWorks />

      {/* SOLUTIONS BY INDUSTRY (pinned active-list) */}
      <SolutionsByIndustry />

      {/* AIRPAY PAYMENT (icon-card grid) */}
      <AirpayPayment />

      {/* AI SOLUTION (pinned horizontal scroll) */}
      <AiSolution />

      {/* PLATFORM INFRASTRUCTURE (pinned masked image + counter-mask text) */}
      <PlatformInfrastructure />

      {/* OUR DIGITAL SERVICES (pinned horizontal gallery) */}
      <DigitalServices />

      {/* PROVEN OUTCOMES (stat cards) */}
      <ProvenOutcomes />

      {/* OUR SERVICES — hidden for now */}
      {/* <OurServices /> */}

      {/* OUR OFFICES — hidden for now */}
      {/* <OurOffices /> */}

      {/* LATEST INSIGHTS (blog grid, hover zoom-mask) */}
      <LatestInsights />

      {/* GET STARTED (CTA band) */}
      <GetStarted />

      {/* CONTACT — maps (big image) section hidden for now */}
      <ContactSection />

      <CtaSection />
    </div>
  )
}

function ContactSection() {
  const [done, setDone] = useState(false)
  return (
    <section id="contact" className="section contact">
      <div className="w-layout-blockcontainer container w-container">
        <div className="contact-main-wrapper">
          <div className="conatct-left-content">
            <div className="overflow-hidden">
              <div className="conact-left-content-wrapper">
                <h2 data-reveal="fade" className="sub-heading">Let’s Talk</h2>
                <div className="contact-para-user-block">
                  <div data-reveal="fade" className="contact-para">
                    Have an idea in mind? Let’s connect and explore how we can help bring it to life.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right-content">
            <div className="contact-right-content-wrapper">
              <div className="contact-form-block w-form">
                {!done ? (
                  <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
                    <input className="contact-text-field w-input" maxLength={256} name="name" placeholder="Your Name*" type="text" required />
                    <input className="contact-text-field w-input" maxLength={256} name="email" placeholder="Your Email*" type="email" required />
                    <textarea className="contact-text-field message w-input" maxLength={5000} name="field" placeholder="Your Massage*" required />
                    <input type="submit" className="contact-submit-button w-button" value="Contact" />
                  </form>
                ) : (
                  <div className="success-message w-form-done" style={{ display: 'block' }}>
                    <div className="success-message-text">Thank you! Your submission has been received!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
