const LOREM1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'

const TYPE = [
  { size: '204px', el: <h1>h1 - heading</h1> },
  { size: '92px', el: <h2>h2 - heading</h2> },
  { size: '72px', el: <h3>h3 - heading</h3> },
  { size: '36px', el: <h4>h4 - heading</h4> },
  { size: '32px', el: <h5>h5 - heading</h5> },
  { size: '24px', el: <h6 className="heading">h6 - heading</h6> },
  { size: 'Paragraph - 20px', el: <p className="paragraph-1">{LOREM1}</p> },
  { size: 'Paragraph - 16px', el: <p className="paragraph-2">{LOREM1}</p> },
]

const COLORS = [
  { cls: 'primary', name: 'Red', code: '#F51B2D', black: false },
  { cls: 'white', name: 'White', code: '#FFFFFF', black: true },
  { cls: 'smoky-black', name: 'Smoky Black', code: '#0D0D0D', black: false },
  { cls: 'gray', name: 'Gray', code: '#808080', black: false },
  { cls: 'dark-charcoal', name: 'Dark Charcoal', code: '#333333', black: false },
]

export default function StyleGuide() {
  return (
    <section className="section style-guide">
      <div className="w-layout-blockcontainer container w-container">
        <div className="style-guide-wrapper">
          <div className="style-guide-title-wrapper">
            <h1 className="style-guide-title">Style Guide</h1>
          </div>

          <div className="style-guide-font-wrapper">
            <div className="style-sub-title-wrapper">
              <div className="style-sub-title">Typography</div>
            </div>
            <div className="all-font-size-wrapper">
              {TYPE.map((t, i) => (
                <div className="single-font-wrapper" key={i}>
                  <div className="text-size">{t.size}</div>
                  {t.el}
                </div>
              ))}
            </div>
          </div>

          <div className="style-guide-font-wrapper _2">
            <div className="style-sub-title-wrapper">
              <div className="style-sub-title">color Palette</div>
            </div>
            <div className="all-color-wrapper">
              {COLORS.map((c) => (
                <div className={`color-box ${c.cls}`} key={c.name}>
                  <h6 className={`color-name ${c.black ? 'black' : ''}`}>{c.name}</h6>
                  <h6 className={`color-code ${c.black ? 'black' : ''}`}>{c.code}</h6>
                </div>
              ))}
            </div>
          </div>

          <div className="style-guide-font-wrapper _2">
            <div className="style-sub-title-wrapper">
              <div className="style-sub-title">Button</div>
            </div>
            <div className="button-wrapper">
              <a href="#" className="nav-button w-inline-block">
                <div className="nav-button-dot"></div>
                <div className="nav-button-text-wrap">
                  <div className="nav-button-text">Button</div>
                  <div className="nav-button-text">Button</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
