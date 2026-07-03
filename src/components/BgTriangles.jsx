/**
 * BgTriangles — a subtle, decorative field of scattered triangles used behind
 * the navy sections (How It Works, Platform Infrastructure). Purely ornamental:
 * pointer-events off, aria-hidden, and kept very low-contrast so it reads as
 * texture rather than a highlight. Colour/opacity is controlled per section via
 * the `className` (see .hiw-tris / .pinf-tris in animations.css).
 */
const TRIS = [
  { top: '10%', left: '6%', size: 116, rot: 18, fill: true },
  { top: '60%', left: '10%', size: 64, rot: -24, fill: false },
  { top: '84%', left: '24%', size: 42, rot: 10, fill: true },
  { top: '18%', left: '40%', size: 34, rot: -14, fill: false },
  { top: '72%', left: '50%', size: 54, rot: 26, fill: true },
  { top: '12%', left: '82%', size: 132, rot: -20, fill: false },
  { top: '44%', left: '92%', size: 60, rot: 14, fill: true },
  { top: '86%', left: '76%', size: 84, rot: -8, fill: false },
  { top: '34%', left: '68%', size: 30, rot: 22, fill: true },
]

export default function BgTriangles({ className = '' }) {
  return (
    <div className={`bg-triangles ${className}`} aria-hidden="true">
      {TRIS.map((t, i) => (
        <svg
          key={i}
          className={`bg-tri ${t.fill ? 'is-fill' : 'is-line'}`}
          viewBox="0 0 100 100"
          style={{
            top: t.top,
            left: t.left,
            width: t.size,
            height: t.size,
            transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
          }}
        >
          <polygon points="50,8 92,86 8,86" />
        </svg>
      ))}
    </div>
  )
}
