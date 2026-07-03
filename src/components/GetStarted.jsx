// Get Started — navy CTA band shown just before the contact form.

export default function GetStarted() {
  return (
    <section id="get-started" className="section get-started">
      <div className="w-layout-blockcontainer container w-container">
        <div className="gs-inner">
          <div className="overflow-hidden">
            <span data-reveal="up" className="gs-eyebrow">Get Started</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="gs-heading">Ready to grow recurring digital revenue?</h2>
          </div>
          <p data-reveal="fade-up" className="gs-sub">
            Connect digital products, AirPay carrier billing, AI, and carrier-grade infrastructure into one
            growth engine — in weeks, not quarters.
          </p>
          <div data-reveal="fade-up" className="gs-actions">
            <a href="#contact" className="gs-btn gs-btn--primary">Talk to Us <span aria-hidden="true">→</span></a>
            <a href="#" className="gs-btn gs-btn--ghost">Get the Capabilities Deck <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
