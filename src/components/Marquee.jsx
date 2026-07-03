/**
 * Infinite CSS marquee. Renders the children group twice so the -50%
 * keyframe loops seamlessly. `direction` = 'left' | 'right'.
 */
export default function Marquee({ children, direction = 'left', duration = 40, className = '' }) {
  return (
    <div className={`marquee-viewport ${className}`}>
      <div className={`marquee-track ${direction}`} style={{ '--marquee-dur': `${duration}s` }}>
        {children}
        {children}
      </div>
    </div>
  )
}
