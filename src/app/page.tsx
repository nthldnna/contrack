import Link from "next/link";
import { cookies } from "next/headers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/src/utils/supabase/server";
import Logo from "@/src/app/components/brand/Logo";
import Marquee from "@/src/app/components/brand/Marquee";
import {
  Bricks,
  CementBag,
  Clipboard,
  Cone,
  HardHat,
  PixelCursor,
  Star,
  TapeMeasure,
  TypingBubble,
} from "@/src/app/components/brand/Stickers";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#stockroom", label: "How it works" },
  { href: "#story", label: "Why us" },
  { href: "#join", label: "Contact" },
];

const features = [
  {
    title: "Track every material",
    body: "Cement, rebar, timber, fixings. Give each one a category and a unit, then see the count live.",
    cta: "Open materials",
    href: "/materials",
    bg: "bg-blush",
    dot: "var(--blush-deep)",
  },
  {
    title: "Log stock in and out",
    body: "Deliveries in, pulls to site out. Every movement is timestamped, so the count always adds up.",
    cta: "Log a delivery",
    href: "/stocks",
    bg: "bg-powder",
    dot: "var(--powder-deep)",
  },
  {
    title: "Know who supplies what",
    body: "Keep supplier contacts next to the materials they deliver. One tap from running low to who to call.",
    cta: "View suppliers",
    href: "/suppliers",
    bg: "bg-sage",
    dot: "#9DB46A",
  },
];

// illustrative cards for the "stockroom" carousel (not live data)
const sampleCards = [
  { tag: "Low stock", name: "Portland cement 40kg", qty: "12", unit: "bags", note: "Last pull: Block C slab.", bg: "bg-blush" },
  { tag: "Delivered", name: "Rebar 12mm × 6m", qty: "310", unit: "pcs", note: "+120 from Northgate Steel this morning.", bg: "bg-powder" },
  { tag: "Steady", name: "Plywood 18mm", qty: "84", unit: "sheets", note: "About 3 weeks left at current use.", bg: "bg-sage" },
  { tag: "Low stock", name: "Tie wire 1.6mm", qty: "4", unit: "rolls", note: "Running out before Friday.", bg: "bg-butter" },
  { tag: "Delivered", name: "Sand, washed", qty: "18", unit: "m³", note: "+6 m³ from Riverbend Aggregates.", bg: "bg-blush" },
  { tag: "Steady", name: 'Concrete blocks 6"', qty: "1,450", unit: "pcs", note: "Enough for Level 2 walls.", bg: "bg-powder" },
];

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const primaryHref = user ? "/dashboard" : "/signup";

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="grid-paper relative bg-sky border-b-2 border-ink">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-paper/75" />

        <header className="relative max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <Logo />
          <nav aria-label="Main" className="hidden md:flex items-center gap-6 label text-[11px]">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:underline underline-offset-4 decoration-2">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/dashboard" className="pill">
                <span className="dot" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="label text-[11px] px-2 hover:underline underline-offset-4">
                  Log in
                </Link>
                <Link href="/signup" className="pill">
                  <span className="dot" />
                  Get started
                </Link>
              </>
            )}
          </div>
        </header>

        <Star className="bob absolute left-[7%] top-28 w-10" />
        <Star className="absolute right-[12%] top-24 w-5" />
        <Star className="absolute left-[30%] top-24 w-4 hidden md:block" />
        <Star className="absolute right-[4%] top-56 w-4" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 pt-6 flex flex-col items-center text-center gap-4">
          <div className="flex items-end gap-3">
            <span className="speech-tag bg-blush -rotate-3">Inventory, sorted</span>
            <TypingBubble className="-translate-y-5" />
          </div>

          <h1 className="flex flex-wrap justify-center items-baseline gap-x-[0.14em] leading-[0.9] tracking-[-0.04em] text-[clamp(52px,9.5vw,132px)]">
            <span className="font-display font-extrabold">the</span>
            <span className="inline-flex items-baseline">
              <span
                className="font-bubble text-blush-deep text-[1.12em]"
                style={{ WebkitTextStroke: "3px var(--ink)", paintOrder: "stroke fill", textShadow: "5px 5px 0 var(--ink)" }}
              >
                S
              </span>
              <span className="font-display font-extrabold text-outline">to</span>
              <span className="font-pixel font-bold text-[0.78em] bg-butter border-[2.5px] border-ink rounded-xl px-[0.08em] tracking-[-0.06em]">
                ck
              </span>
            </span>
            <span className="font-display font-extrabold">
              room<span className="text-powder-deep">.</span>
            </span>
          </h1>

          <p className="max-w-md text-[15px] leading-relaxed text-[#3B3934] text-balance">
            Track every material, supplier and stock movement across your sites. See what&apos;s running low
            before the crew does.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href={primaryHref} className="pill pill-dark">
              <span className="dot" />
              {user ? "Go to dashboard" : "Start tracking, free"}
            </Link>
            <a href="#features" className="pill">
              See what&apos;s inside
            </a>
          </div>
        </div>

        {/* sticker row sitting on the band edge */}
        <div className="relative max-w-6xl mx-auto mt-6 px-4 md:px-6 h-[120px] md:h-[150px] flex justify-between items-end gap-2">
          <Cone className="sticker w-[9%] min-w-12 -rotate-6 translate-y-2" />
          <Bricks className="sticker w-[13%] min-w-16" />
          <HardHat className="sticker bob w-[15%] min-w-20" />
          <CementBag className="sticker w-[10%] min-w-12 rotate-3 hidden sm:block" />
          <TapeMeasure className="sticker bob w-[14%] min-w-18 [animation-delay:-2s]" />
          <Clipboard className="sticker w-[10%] min-w-12 -rotate-3 translate-y-1 hidden sm:block" />
        </div>
      </section>

      <Marquee
        items={["Track every brick", "Stock in", "Stock out", "Know what's low"]}
        className="bg-paper border-b-2 border-ink"
      />

      {/* FEATURES */}
      <section id="features" className="bg-paper border-b-2 border-ink">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 flex flex-col items-center gap-7">
          <span className="label text-[10px] text-muted">What&apos;s inside</span>

          <div className="relative flex flex-wrap justify-center items-center gap-x-3 gap-y-2 max-w-xl text-[clamp(24px,3vw,36px)]">
            <span className="keycap bg-butter -rotate-3">materials</span>
            <span className="keycap bg-blush translate-y-2.5">suppliers</span>
            <span className="keycap bg-powder rotate-[4deg] -translate-y-2">stock.</span>
            <span className="keycap bg-sage font-pixel! -rotate-6 translate-y-2">kg</span>
            <PixelCursor className="absolute -left-9 top-6 w-7 hidden sm:block" />
          </div>

          <p className="max-w-sm text-center text-[15px] leading-relaxed text-[#3B3934]">
            Everything the site office keeps on clipboards, in one place the whole team can check.
          </p>

          <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className={`${f.bg} border-2 border-ink rounded-2xl p-5 flex flex-col gap-3`}>
                <h3 className="font-display font-bold text-lg tracking-[-0.02em] pb-3 border-b-[1.5px] border-ink/25">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#2C2A26] flex-1">{f.body}</p>
                <Link href={f.href} className="pill self-start min-h-9 text-[13px]">
                  <span className="dot" style={{ background: f.dot }} />
                  {f.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STOCKROOM CAROUSEL */}
      <section id="stockroom" className="grid-paper bg-paper border-b-2 border-ink">
        <div className="max-w-6xl mx-auto py-14 flex flex-col gap-6">
          <div className="px-4 md:px-6 flex flex-wrap justify-between items-end gap-3">
            <h2 className="font-display font-bold text-[clamp(26px,3vw,38px)] tracking-[-0.03em] text-balance">
              What the stockroom looks like today
            </h2>
            <span className="chip font-medium">Example</span>
          </div>

          <div className="flex gap-4 overflow-x-auto px-4 md:px-6 pb-3 snap-x">
            {sampleCards.map((c) => (
              <article
                key={c.name}
                className={`${c.bg} snap-start shrink-0 w-[220px] border-2 border-ink rounded-2xl p-4 flex flex-col gap-2.5`}
              >
                <span className="chip self-start font-medium">{c.tag}</span>
                <h3 className="font-display font-bold text-lg leading-tight tracking-[-0.02em]">{c.name}</h3>
                <div className="flex items-baseline gap-1.5 pt-2 border-t-[1.5px] border-ink/25">
                  <span className="font-display font-extrabold text-3xl tabular-nums">{c.qty}</span>
                  <span className="label text-[10px]">{c.unit}</span>
                </div>
                <p className="text-xs text-[#3B3934]">{c.note}</p>
              </article>
            ))}
          </div>

          <div className="flex justify-center gap-2" aria-hidden="true">
            <span className="pill w-10 px-0">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </span>
            <span className="pill w-10 px-0">
              <ChevronRight size={18} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-white border-b-2 border-ink">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 grid gap-10 md:grid-cols-2 items-center">
          <div className="flex flex-col items-start gap-4 min-w-0">
            <span className="speech-tag bg-blush">Why we built it</span>
            <h2 className="font-serif text-[clamp(40px,5vw,60px)] leading-[0.95] tracking-[-0.035em]">
              born on a<br />
              clipboard
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-[#3B3934]">
              Stock lived on a whiteboard, three spreadsheets and someone&apos;s memory. Orders went out late,
              materials got counted twice, and nobody trusted the numbers. ConTrack keeps one count, logged
              every time something comes in or goes out.
            </p>
          </div>

          {/* stock slip */}
          <div className="flex justify-center min-w-0">
            <div className="relative w-full max-w-sm bg-butter border-2 border-ink rounded-2xl p-4 rotate-2 card-raised">
              <div className="bg-white border-2 border-dashed border-ink rounded-lg p-4 flex flex-col gap-2.5">
                <div className="label text-[10px] flex justify-between">
                  <span>Stock slip #0418</span>
                  <span>07:42</span>
                </div>
                <div className="font-display font-extrabold text-xl tracking-[-0.02em]">Rebar 12mm × 6m</div>
                <div className="grid grid-cols-3 gap-2 tabular-nums">
                  <SlipFigure label="In" value="+120 pcs" className="text-[#2F6B3A]" />
                  <SlipFigure label="Out" value="−45 pcs" className="text-[#A3362E]" />
                  <SlipFigure label="On hand" value="310 pcs" />
                </div>
                <div className="label text-[10px] pt-2 border-t-[1.5px] border-ink/20">Supplier · Northgate Steel</div>
              </div>
              <Star className="absolute -right-4 -top-4 w-9" />
            </div>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="bg-paper">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 flex flex-col items-center gap-4 text-center">
          <h2
            className="font-serif text-[clamp(44px,6vw,76px)] leading-[0.95] tracking-[-0.04em] text-night"
            style={{ textShadow: "3px 3px 0 var(--blush)" }}
          >
            join the crew
          </h2>
          <p className="text-sm text-muted max-w-sm">
            Set up your materials, suppliers and units in an afternoon. Free while you get started.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Link href={primaryHref} className="pill bg-blush!">
              <span className="dot" style={{ background: "#fff" }} />
              {user ? "Go to dashboard" : "Create account"}
            </Link>
            <a href="mailto:nthldnna@gmail.com" className="pill pill-flat">
              nthldnna@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-night text-paper">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-6 flex flex-col gap-8">
          <div className="flex flex-wrap justify-between gap-8">
            <p className="max-w-[240px] font-display font-bold text-lg leading-tight">
              Stock control for the people who build things.
            </p>
            <div className="flex flex-wrap gap-14">
              <FooterCol
                title="Product"
                links={[
                  ["Materials", "/materials"],
                  ["Stocks", "/stocks"],
                  ["Suppliers", "/suppliers"],
                ]}
              />
              <FooterCol
                title="More"
                links={[
                  ["Contact", "mailto:nthldnna@gmail.com"],
                  ["Log in", "/login"],
                  ["GitHub", "https://github.com/nthldnna/contrack"],
                ]}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="flex justify-center items-baseline flex-wrap leading-[0.85] tracking-[-0.05em] text-[clamp(56px,13vw,180px)]"
          >
            <span className="font-display font-extrabold text-night" style={{ WebkitTextStroke: "2.5px var(--paper)" }}>
              con
            </span>
            <span className="font-bubble text-blush">T</span>
            <span className="font-display font-extrabold">rack</span>
            <span className="font-display font-extrabold text-powder-deep">.</span>
          </div>

          <div className="label text-[10px] text-[#C9C5BC] flex flex-wrap gap-x-5 gap-y-2 border-t border-[#4A4844] pt-4">
            <span>© ConTrack {new Date().getFullYear()}</span>
            <a href="#" className="hover:text-paper">Privacy</a>
            <a href="#" className="hover:text-paper">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SlipFigure({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="label text-[9px] text-muted">{label}</span>
      <span className={`font-semibold text-base ${className}`}>{value}</span>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-display font-bold">{title}</span>
      {links.map(([label, href]) => (
        <a key={label} href={href} className="label text-[11px] hover:text-butter">
          {label}
        </a>
      ))}
    </div>
  );
}
