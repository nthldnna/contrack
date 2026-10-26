// Scrolling ticker band. Items are duplicated so the -50% loop is seamless.

export default function Marquee({
  items,
  className = "",
  separator,
  label,
}: {
  items: string[];
  className?: string;
  separator?: React.ReactNode;
  label?: string;
}) {
  if (items.length === 0) return null;

  // repeat until the track is comfortably wider than the viewport
  const base: string[] = [];
  while (base.length < 8) base.push(...items);
  const loop = [...base, ...base];

  return (
    <div className={`marquee label text-[11px] py-2 ${className}`} aria-label={label} role={label ? "region" : undefined}>
      <div className="marquee-track" aria-hidden={label ? "true" : undefined}>
        {loop.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-6">
            {text}
            {separator ?? <BlockMark />}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlockMark() {
  return (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="3" fill="#CFDDA6" stroke="#1E1E1C" strokeWidth="2" transform="rotate(12 10 10)" />
    </svg>
  );
}
