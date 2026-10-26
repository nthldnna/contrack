import Link from "next/link";
import Logo from "@/src/app/components/brand/Logo";
import { HardHat, Cone, TapeMeasure, Star } from "@/src/app/components/brand/Stickers";

export default function AuthShell({
  mode,
  title,
  subtitle,
  children,
}: {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-paper">
      {/* brand panel */}
      <section className="grid-paper relative overflow-hidden bg-blush border-b-2 lg:border-b-0 lg:border-r-2 border-ink lg:w-1/2 px-5 md:px-10 py-6 lg:py-8 flex flex-col gap-5">
        <Logo />
        <h2
          className="hidden lg:block mt-8 font-display font-extrabold text-[clamp(40px,4.2vw,62px)] leading-[0.95] tracking-[-0.045em] text-balance"
          style={{ textShadow: "3px 3px 0 #fff" }}
        >
          stock counts weren&apos;t supposed to be a guessing game
        </h2>
        <p className="hidden lg:block max-w-sm text-[15px] leading-relaxed text-[#2C2A26]">
          See what came in, what went out, and what needs ordering before the next pour.
        </p>
        <div className="hidden lg:flex mt-auto items-end gap-4 h-40">
          <HardHat className="sticker w-36 -rotate-[8deg]" />
          <Cone className="sticker w-20 rotate-[5deg]" />
          <TapeMeasure className="sticker w-32 -rotate-[4deg] -translate-y-2" color="#CDE7EE" />
        </div>
        <Star className="absolute right-[9%] top-6 lg:top-20 w-8 lg:w-10" />
      </section>

      {/* form */}
      <section className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm flex flex-col gap-5">
          <nav aria-label="Account" className="flex p-1 border-2 border-ink rounded-full bg-white">
            <TabLink href="/login" active={mode === "login"}>
              Log in
            </TabLink>
            <TabLink href="/signup" active={mode === "signup"}>
              Sign up
            </TabLink>
          </nav>

          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em]">{title}</h1>
            <p className="text-sm text-muted">{subtitle}</p>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}

function TabLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex-1 text-center rounded-full py-2 text-sm font-semibold transition-colors ${
        active ? "bg-ink text-white" : "hover:bg-paper"
      }`}
    >
      {children}
    </Link>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-sm bg-blush border-2 border-ink rounded-xl px-3 py-2">
      {message}
    </p>
  );
}
