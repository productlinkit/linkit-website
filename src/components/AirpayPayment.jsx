// AirPay Payment — wording from the AirPay reference, laid out in the
// "Automation solutions" grid style: eyebrow + large heading on the left, a
// supporting paragraph on the right, then a 2-then-3 grid of icon-forward
// cards with a hover lift/fill animation.

const CARDS = [
  { img: '/assets/airpay/edc-feature-04.webp', title: 'Carrier Billing (DCB)', desc: 'Charge directly to the operator bill — no card required.' },
  { img: '/assets/airpay/home-builtfor-01.webp', title: 'Payment API', desc: 'Integrate billing into any product in days, not months.' },
  { img: '/assets/airpay/home-builtfor-03.webp', title: 'Subscription Billing', desc: 'Recurring charges, renewals, and dunning handled end-to-end.' },
  { img: '/assets/airpay/home-builtfor-02.webp', title: 'Settlement & Reconciliation', desc: 'Automated partner payouts and revenue reconciliation.' },
  { img: '/assets/airpay/home-builtfor-04.webp', title: 'Transaction Analytics', desc: 'Real-time visibility into revenue, success rates, and trends.' },
]

export default function AirpayPayment() {
  return (
    <section id="airpay-payment" className="section airpay-pay">
      <div className="w-layout-blockcontainer container w-container">
        <div className="apay-head">
          <div className="apay-head-left">
            <div className="overflow-hidden">
              <span data-reveal="up" className="apay-eyebrow">AirPay · Payment Infrastructure</span>
            </div>
            <div className="overflow-hidden">
              <h2 data-reveal="up" className="apay-heading">
                Carrier billing and payment infrastructure that turns products into recurring revenue.
              </h2>
            </div>
          </div>
          <p data-reveal="fade-up" className="apay-intro">
            Direct carrier billing (DCB), payment APIs, subscription billing, settlement, and transaction
            analytics — in one payment layer built for telco scale.
          </p>
        </div>

        <div className="apay-grid">
          {CARDS.map((c, i) => (
            <article className="apay-card" key={c.title} data-reveal="fade-up" data-reveal-delay={i * 0.07}>
              <span className="apay-card-media" aria-hidden="true">
                <img src={c.img} loading="lazy" alt="" />
              </span>
              <div className="apay-card-body">
                <h3 className="apay-card-title">{c.title}</h3>
                <p className="apay-card-desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <a data-reveal="fade-up" className="apay-cta" href="#">
          Explore AirPay carrier billing <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
