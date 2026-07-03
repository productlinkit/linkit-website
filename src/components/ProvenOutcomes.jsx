// Proven Outcomes — stat cards (gambar2). Each card: a dark top with a gold
// headline figure + metric, and a white body with the client tag + description.

const OUTCOMES = [
  {
    stat: '+32%',
    unit: '',
    metric: 'ARPU uplift',
    tag: 'Tier-1 Operator · SEA',
    desc: 'Unified digital products and carrier billing into one journey, lifting average revenue per user in two quarters.',
  },
  {
    stat: '90',
    unit: 'days',
    metric: 'to launch a new VAS',
    tag: 'Content Partner · Global',
    desc: 'Went from contract to live, billable service in under a quarter using AirPay and the SDP platform.',
  },
  {
    stat: '−18%',
    unit: '',
    metric: 'subscriber churn',
    tag: 'Enterprise · MEA',
    desc: 'AI-driven journeys and personalization reduced churn across a multi-million subscriber base.',
  },
]

export default function ProvenOutcomes() {
  return (
    <section id="proven-outcomes" className="section proven-outcomes">
      <div className="w-layout-blockcontainer container w-container">
        <div className="po-head">
          <div className="overflow-hidden">
            <span data-reveal="up" className="po-eyebrow">Proven Outcomes</span>
          </div>
          <div className="overflow-hidden">
            <h2 data-reveal="up" className="po-heading">Results with operators and enterprises.</h2>
          </div>
        </div>

        <div className="po-grid">
          {OUTCOMES.map((o, i) => (
            <article className="po-card" key={o.metric} data-reveal="fade-up" data-reveal-delay={i * 0.08}>
              <div className="po-card-top">
                <div className="po-stat">
                  <span className="po-stat-num">{o.stat}</span>
                  {o.unit && <span className="po-stat-unit">{o.unit}</span>}
                </div>
                <span className="po-metric">{o.metric}</span>
              </div>
              <div className="po-card-body">
                <span className="po-tag">{o.tag}</span>
                <p className="po-desc">{o.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal="fade" className="po-note">
          Figures are illustrative placeholders for the wireframe — replace with verified client results before publishing.
        </p>
      </div>
    </section>
  )
}
