import Marquee from './Marquee.jsx'
import { ctaStar } from '../lib/images.js'

const WORDS = ['Engage', 'Advertise', 'Monetize', 'Personalize', 'Scale']

function Row() {
  return (
    <>
      {WORDS.map((w, i) => (
        <div className="top-loading-content" key={i}>
          <img src={ctaStar} loading="lazy" alt="" className="star-icon" />
          <h2 className="top-loading-title">{w}</h2>
        </div>
      ))}
    </>
  )
}

export default function CtaSection() {
  return (
    <section className="section cta">
      <div className="cta-top-loading-wrapper">
        <div className="top-loading-left">
          <Marquee direction="left" duration={30}>
            <Row />
          </Marquee>
        </div>
        <div className="top-loading-right">
          <Marquee direction="right" duration={30}>
            <Row />
          </Marquee>
        </div>
      </div>
      <div className="w-layout-blockcontainer container w-container">
        <div className="overflow-hidden">
          <div className="cta-main-wrapper">
            <div data-reveal="fade-up" className="para-1">
              Reach out if you’re ready to make something amazing together.
            </div>
            <a href="mailto:info@linkit.com" className="contact-mail-wrap w-inline-block">
              <h3 data-reveal="fade-up" className="content-title">
                info@linkit.com
              </h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
