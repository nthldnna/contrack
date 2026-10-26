import Link from "next/link";

export default function Logo({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "w-8 h-8 text-base rounded-[9px]" : "w-9 h-9 text-lg rounded-[10px]";
  const word = size === "sm" ? "text-lg" : "text-xl";

  return (
    <Link href={href} className="inline-flex items-center gap-2" aria-label="ConTrack home">
      <span
        className={`inline-grid place-items-center bg-butter border-2 border-ink font-bubble leading-none ${box}`}
      >
        c
      </span>
      <span className={`font-display font-extrabold tracking-[-0.03em] ${word}`}>contrack</span>
    </Link>
  );
}
