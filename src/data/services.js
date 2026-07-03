// Digital service products — shared by the home "Digital Products" gallery
// and the full /products page.
//   image  : product cover (external CDN render) — layered on top, wins when it loads
//   mockup : built-in premium SVG mockup (fallback while the image loads / if it fails)
//   grad   : final colored fallback
// Card backgrounds layer them as: url(image), url(mockup), grad.
const CDN = (id) =>
  `https://cdn.builder.io/api/v1/image/assets%2F94e22e35aef9479b9d5d64cf64b650f5%2F${id}`

export const services = [
  { idx: '01', tag: 'Learning', title: 'Speakeasy', desc: 'Language learning that blends structured lessons with real conversation.', image: CDN('6f9e424e2e5f46119838a21ec6d48c61'), mockup: '/assets/images/services/ds-1.svg', grad: 'linear-gradient(155deg, #2563eb, #7c3aed)', rot: -6, shift: 26 },
  { idx: '02', tag: 'Sports', title: 'Fantasy Eleven', desc: 'Fantasy football where fans build teams and compete for fun.', image: CDN('d53d24a5df8f4e689e8c411638dac95c'), mockup: '/assets/images/services/ds-2.svg', grad: 'linear-gradient(155deg, #15803d, #22c55e)', rot: 4, shift: -18 },
  { idx: '03', tag: 'Reading', title: 'Booksnap', desc: 'Bite-sized book summaries in a modern reading companion.', image: CDN('38d2b908cf4c43529733638850946f1f'), mockup: '/assets/images/services/ds-3.svg', grad: 'linear-gradient(155deg, #b45309, #f59e0b)', rot: -2, shift: 32 },
  { idx: '04', tag: 'Security', title: 'RusVPN', desc: 'Secure VPN service for everyday privacy and protection.', image: CDN('91b48285fc2147db914a81f1ccd67cff'), mockup: '/assets/images/services/ds-4.svg', grad: 'linear-gradient(155deg, #1e3a8a, #0ea5e9)', rot: 5, shift: -24 },
  { idx: '05', tag: 'Health', title: 'Getwellsoon', desc: 'Healthcare and wellness services in one connected platform.', image: CDN('b753f07c35c3413089bd6ecb146c6e5a'), mockup: '/assets/images/services/ds-5.svg', grad: 'linear-gradient(155deg, #047857, #14b8a6)', rot: -5, shift: 20 },
  { idx: '06', tag: 'Wellness', title: 'Lulladream', desc: 'AI-powered sleep stories and relaxation to help you rest better.', image: CDN('addfa121d0254b52b04472bd256693d3'), mockup: '/assets/images/services/ds-6.svg', grad: 'linear-gradient(155deg, #312e81, #6d28d9)', rot: 3, shift: -30 },
  { idx: '07', tag: 'Lifestyle', title: 'Tasliya / Mazah', desc: 'Islamic lifestyle and content for everyday inspiration.', image: CDN('061582b079ba4977a6f167d3134f618c'), mockup: '/assets/images/services/ds-7.svg', grad: 'linear-gradient(155deg, #065f46, #ca8a04)', rot: -4, shift: 28 },
  { idx: '08', tag: 'Fitness', title: 'Lifefit', desc: 'Health and fitness tracking to stay on top of your goals.', image: CDN('226d9ab2476f40988ff37793dd6fe059'), mockup: '/assets/images/services/ds-8.svg', grad: 'linear-gradient(155deg, #c2410c, #f59e0b)', rot: 6, shift: -16 },
]
