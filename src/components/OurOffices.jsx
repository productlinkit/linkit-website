// Our Offices — same layout/animation as the old "client feedback" section
// (sticky centred title + cards floating up alternately left/right/centre,
// fading in), but the cards are the 8 region cards (cover + flag/country list).
const REGIONS = [
  {
    name: 'Southeast Asia',
    cover: '/assets/images/offices/southeast_asia.webp',
    countries: [
      ['🇮🇩', 'Indonesia'], ['🇲🇾', 'Malaysia'], ['🇰🇭', 'Cambodia'], ['🇱🇦', 'Laos'],
      ['🇻🇳', 'Vietnam'], ['🇲🇲', 'Myanmar'], ['🇵🇭', 'Philippines'], ['🇹🇱', 'Timor Leste'],
    ],
  },
  {
    name: 'Europe',
    cover: '/assets/images/offices/europe.webp',
    countries: [
      ['🇷🇺', 'Russia'], ['🇸🇪', 'Sweden'], ['🇨🇭', 'Switzerland'], ['🇷🇸', 'Serbia'],
      ['🇳🇴', 'Norway'], ['🇨🇿', 'Czech Republic'], ['🇬🇷', 'Greece'], ['🇧🇾', 'Belarus'], ['🇵🇹', 'Portugal'],
    ],
  },
  {
    name: 'Middle East',
    cover: '/assets/images/offices/middle_east.webp',
    countries: [
      ['🇴🇲', 'Oman'], ['🇸🇦', 'Saudi Arabia'], ['🇦🇪', 'UAE'], ['🇧🇭', 'Bahrain'], ['🇰🇼', 'Kuwait'], ['🇮🇶', 'Iraq'],
    ],
  },
  {
    name: 'North Africa',
    cover: '/assets/images/offices/north_africa.webp',
    countries: [
      ['🇪🇬', 'Egypt'], ['🇩🇿', 'Algeria'], ['🇲🇦', 'Morocco'], ['🇱🇾', 'Libya'], ['🇲🇷', 'Mauritania'],
    ],
  },
  {
    name: 'Sub-Saharan Africa',
    cover: '/assets/images/offices/sub_saharan_africa.webp',
    countries: [
      ['🇰🇪', 'Kenya'], ['🇳🇬', 'Nigeria'], ['🇿🇦', 'South Africa'], ['🇸🇳', 'Senegal'], ['🇲🇿', 'Mozambique'],
    ],
  },
  {
    name: 'South Asia',
    cover: '/assets/images/offices/south_asia.webp',
    countries: [
      ['🇦🇫', 'Afghanistan'], ['🇱🇰', 'Sri Lanka'], ['🇧🇩', 'Bangladesh'],
    ],
  },
  {
    name: 'Americas',
    cover: '/assets/images/offices/americas.webp',
    countries: [
      ['🇲🇽', 'Mexico'], ['🇻🇪', 'Venezuela'],
    ],
  },
  {
    name: 'Middle East (Levant)',
    cover: '/assets/images/offices/middle_east_levant.webp',
    countries: [
      ['🇵🇸', 'Palestine'],
    ],
  },
]

// horizontal placement per card as it floats up past the sticky title
const POS = ['left', 'right', 'center', 'right', 'left', 'center', 'right', 'left']

export default function OurOffices() {
  return (
    <section id="offices" className="section offices">
      <div className="w-layout-blockcontainer container w-container">
        <div className="offices-inner">
          <div className="offices-sticky">
            <div className="overflow-hidden">
              <div className="centered-header">
                <h2 data-reveal="up" className="sub-heading">Our Offices</h2>
              </div>
            </div>
          </div>

          <div className="offices-stack">
            {REGIONS.map((r, i) => (
              <div className={`offices-item pos-${POS[i % POS.length]}`} key={r.name}>
                <article className="office-card" data-reveal="fade-up">
                  <div className="office-card-cover" style={{ backgroundImage: `url(${r.cover})` }}>
                    <h3 className="office-region">{r.name}</h3>
                  </div>
                  <ul className="office-list">
                    {r.countries.map(([flag, country]) => (
                      <li className="office-row" key={country}>
                        <span className="office-flag" aria-hidden="true">{flag}</span>
                        <span className="office-country">{country}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
