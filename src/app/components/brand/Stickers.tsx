// Decorative cut-out illustrations used on the landing and auth pages.
// All are aria-hidden; size them with className (width) and they keep their aspect ratio.

type Props = { className?: string; style?: React.CSSProperties };

const INK = "#1E1E1C";

export function HardHat({ className, style }: Props) {
  return (
    <svg viewBox="0 0 170 110" className={className} style={style} aria-hidden="true">
      <path d="M22 82 Q22 18 85 16 Q148 18 148 82 Z" fill="#F6C33B" stroke={INK} strokeWidth="4" />
      <path d="M72 18 h26 v62 h-26z" fill="#FAD35E" stroke={INK} strokeWidth="4" />
      <rect x="6" y="78" width="158" height="18" rx="9" fill="#F2B01E" stroke={INK} strokeWidth="4" />
    </svg>
  );
}

export function Cone({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 150" className={className} style={style} aria-hidden="true">
      <path d="M60 8 L104 136 H16 Z" fill="#F59A5B" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M45 52 H75 L82 74 H38 Z M31 94 H89 L96 114 H24 Z" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="4" y="132" width="112" height="14" rx="5" fill="#F59A5B" stroke={INK} strokeWidth="4" />
    </svg>
  );
}

export function Bricks({ className, style }: Props) {
  return (
    <svg viewBox="0 0 170 130" className={className} style={style} aria-hidden="true">
      <g stroke={INK} strokeWidth="4">
        <rect x="8" y="88" width="76" height="36" rx="4" fill="#E08A6E" />
        <rect x="86" y="88" width="76" height="36" rx="4" fill="#E79A7F" />
        <rect x="46" y="48" width="76" height="36" rx="4" fill="#E79A7F" />
        <rect x="66" y="8" width="76" height="36" rx="4" fill="#E08A6E" />
      </g>
    </svg>
  );
}

export function CementBag({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 160" className={className} style={style} aria-hidden="true">
      <path d="M14 30 Q14 14 30 12 H90 Q106 14 106 30 V146 H14 Z" fill="#CDE7EE" stroke={INK} strokeWidth="4" />
      <path d="M14 30 Q36 22 60 30 Q84 38 106 30" fill="none" stroke={INK} strokeWidth="3" />
      <rect x="28" y="64" width="64" height="44" rx="6" fill="#fff" stroke={INK} strokeWidth="3" />
      <text x="60" y="93" textAnchor="middle" fontWeight="800" fontSize="20" fill={INK} style={{ fontFamily: "var(--font-bricolage)" }}>
        40kg
      </text>
    </svg>
  );
}

export function TapeMeasure({ className, style, color = "#F7A9BC" }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 180 130" className={className} style={style} aria-hidden="true">
      <rect x="6" y="14" width="104" height="104" rx="28" fill={color} stroke={INK} strokeWidth="4" />
      <circle cx="58" cy="66" r="28" fill="#fff" stroke={INK} strokeWidth="4" />
      <circle cx="58" cy="66" r="8" fill={INK} />
      <path d="M108 90 h66 v20 h-66z" fill="#FBE27A" stroke={INK} strokeWidth="4" />
      <path d="M120 90v9M133 90v13M146 90v9M159 90v13" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Clipboard({ className, style }: Props) {
  return (
    <svg viewBox="0 0 130 160" className={className} style={style} aria-hidden="true">
      <rect x="10" y="16" width="110" height="140" rx="10" fill="#CFDDA6" stroke={INK} strokeWidth="4" />
      <rect x="40" y="6" width="50" height="22" rx="6" fill="#fff" stroke={INK} strokeWidth="4" />
      <path d="M30 56h70M30 80h70M30 104h46" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M84 112 l8 8 l16 -18" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Star({ className, style }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path
        d="M20 2l5.3 11.6L38 15l-9.5 8.6L31 36l-11-6.3L9 36l2.5-12.4L2 15l12.7-1.4z"
        fill="#E9B949"
        stroke={INK}
        strokeWidth="2"
      />
    </svg>
  );
}

export function PixelCursor({ className, style }: Props) {
  return (
    <svg viewBox="0 0 24 30" className={className} style={{ shapeRendering: "crispEdges", ...style }} aria-hidden="true">
      <path
        d="M2 2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h-6v2h2v2h2v2h-2v2h-4v-2h-2v-2h-2v-2h-2v2h-2v2h-2z"
        fill="#fff"
        stroke={INK}
        strokeWidth="2"
      />
    </svg>
  );
}

export function TypingBubble({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex gap-1 px-3 py-2 bg-white border-2 border-ink rounded-2xl ${className ?? ""}`}
    >
      <i className="w-1.5 h-1.5 rounded-full bg-ink" />
      <i className="w-1.5 h-1.5 rounded-full bg-ink" />
      <i className="w-1.5 h-1.5 rounded-full bg-ink" />
    </span>
  );
}
