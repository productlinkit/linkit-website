import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveals } from '../lib/reveal.js'
import { services } from '../data/services.js'

export default function Products() {
  const scope = useRef(null)
  useScrollReveals(scope, [])

  return (
    <div ref={scope}>
      <section className="section products-page">
        <div className="w-layout-blockcontainer container w-container">
          <div className="products-head sub-heading-content">
            <div className="overflow-hidden">
              <div className="sub-heading-block">
                <h1 data-reveal="up" className="sub-heading">All Digital Products</h1>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="work-content-block">
                <p data-reveal="up" className="para-1">
                  The complete suite of LinkIT digital products — turning conventional telco
                  services into engaging, revenue-driving experiences for your subscribers.
                </p>
              </div>
            </div>
          </div>

          <div className="products-grid">
            {services.map((s) => (
              <article className="product-card" key={s.idx} data-reveal="fade-up">
                <div
                  className="product-card-media"
                  style={{ backgroundImage: `url(${s.image}), url(${s.mockup}), ${s.grad}` }}
                >
                  <span className="ds-card-index">{s.idx}</span>
                  <span className="ds-card-tag">{s.tag}</span>
                </div>
                <div className="product-card-body">
                  <h2 className="product-card-title">{s.title}</h2>
                  <p className="para-2">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="products-back">
            <Link to="/" className="products-back-link">← Back to home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
