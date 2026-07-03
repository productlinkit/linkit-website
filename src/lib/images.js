// Semantic map of local asset paths (all files live in /public/assets).
// Original Webflow CDN files were downloaded verbatim; see src/lib/assets.js for
// the raw URL -> local map. These friendly names keep the components readable.

export const brandLogo = '/assets/portolio.svg'

// Hero: full-bleed background slides (v1)
export const heroBg = [
  '/assets/Rectangle-1-4-.svg',
  '/assets/Rectangle-1-1-1-.svg',
  '/assets/Rectangle-1-2-1-.svg',
]

// Hero: small thumbnail slides (v2)
export const heroThumb = [
  '/assets/Rectangle-3.webp',
  '/assets/Rectangle-2-1-.webp',
  '/assets/Rectangle-2-2-1-.svg',
]

// About: marquee of client/sponsor logos (one cycle = 5 logos + repeat of #1)
export const sponsorLogos = [
  '/assets/Logo-38-.svg',
  '/assets/Logo-39-.svg',
  '/assets/Logo-36-.svg',
  '/assets/Logo-37-.svg',
  '/assets/Logo-34-.svg',
  '/assets/Logo-38-.svg',
]
export const sponsorClass = ['_1', '_2', '_3', '_4', '_5', '_6']

// Icons
export const plusIconLarge = '/assets/Frame-35-.svg' // service heading +
export const servicePlusIcon = '/assets/Frame.svg' // small + in service list (desktop)
export const servicePlusIconTablet = '/assets/Frame-36-.svg'
export const footerArrow = '/assets/Frame-37-.svg'
export const ratingStar = '/assets/Frame-38-.svg'
export const ctaStar = '/assets/Triangle-rounded.svg'

// Testimonial avatars + contact avatar
export const avatars = [
  '/assets/Ellipse-3-1-.svg',
  '/assets/Ellipse-3-2-.svg',
  '/assets/Ellipse-3-3-.svg',
  '/assets/Ellipse-3-4-.svg',
  '/assets/Ellipse-3-5-.svg',
]
export const contactAvatar = '/assets/Ellipse-4-7-.svg'

// Big sticky image (+ responsive srcset variants)
export const bigImage = '/assets/image-7-1-.webp'
export const bigImageSrcset =
  '/assets/image-7-1--p-500.webp 500w, /assets/image-7-1--p-800.webp 800w, /assets/image-7-1--p-1080.webp 1080w, /assets/image-7-1--p-1600.webp 1600w, /assets/image-7-1--p-2000.webp 2000w, /assets/image-7-1--p-2600.webp 2600w, /assets/image-7-1--p-3200.webp 3200w, /assets/image-7-1-.webp 6000w'

// Project-detail banner shadow overlay
export const bannerShadow = '/assets/Rectangle-5.svg'
