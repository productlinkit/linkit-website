import { useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import CtaSection from '../components/CtaSection.jsx'
import { getProject } from '../data/projects.js'
import { useScrollReveals } from '../lib/reveal.js'
import { bannerShadow } from '../lib/images.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const scope = useRef(null)
  useScrollReveals(scope, [slug])

  if (!project) return <Navigate to="/" replace />

  const { title, summary, banner, grid, blocks, detailImgs } = project

  return (
    <div ref={scope}>
      <section className="section-banner fixed">
        <div className="project-banner-fixed">
          <div className="banner-image-wrap">
            <img src={banner} loading="lazy" alt="" className="banner-img-fixed zoom" />
            <img src={bannerShadow} loading="lazy" alt="" className="banner-img-shadow" />
          </div>
          <div className="project-banner-info">
            <div className="w-layout-blockcontainer container w-container">
              <div className="project-name-summary">
                <div className="overflow-hidden">
                  <h2 data-reveal="fade" className="sub-heading">{title}</h2>
                </div>
                <div className="overflow-hidden">
                  <div data-reveal="fade" className="summary-box">
                    <p className="summary-tesxt">{summary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section project-details">
        <div className="w-layout-blockcontainer container w-container">
          <div className="project-details-wrapper">
            <div className="details-top-grid">
              {grid.map(([k, v]) => (
                <div className="grid-detail" data-reveal="fade" key={k}>
                  <div className="para-1">{k}</div>
                  <div className="grid-main-content">{v}</div>
                </div>
              ))}
            </div>

            <div className="project-description-wrapper">
              {blocks.map((b, i) => (
                <FragmentBlock
                  key={i}
                  block={b}
                  img={i === 1 ? detailImgs[0] : i === 3 ? detailImgs[1] : null}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}

function FragmentBlock({ block, img }) {
  return (
    <>
      <div className="overflow-hidden">
        <div data-reveal="fade" className="details-wrap">
          <div className="detail-title">{block.title}</div>
          <div className="detail-content-wrap">
            <p className="para-2">{block.text}</p>
          </div>
        </div>
      </div>
      {img && (
        <div className="detail-img-box">
          <img src={img} loading="lazy" alt="" className="detail-img zoom" />
        </div>
      )}
    </>
  )
}
