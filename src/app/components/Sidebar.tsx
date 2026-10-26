"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Truck,
  Boxes,
  Menu,
  X,
  LogOut,
  Tags,
  Ruler,
} from "lucide-react";

import Logo from "@/src/app/components/brand/Logo";
import { createClient } from "@/src/utils/supabase/client";

type SidebarProps = {
  userName?: string;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/stocks", label: "Stocks", icon: Boxes },
  { href: "/materials", label: "Materials", icon: Package },
  { href: "/suppliers", label: "Suppliers", icon: Truck },
];

const settingsItems = [
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/units", label: "Units", icon: Ruler },
];

export default function Sidebar({ userName }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  const name = userName ?? "Guest";

  const nav = (
    <nav aria-label="App" className="flex flex-col gap-0.5">
      <SectionLabel>Workspace</SectionLabel>
      {navItems.map((item) => (
        <NavLink key={item.href} {...item} active={pathname === item.href} onNavigate={() => setOpen(false)} />
      ))}
      <SectionLabel className="pt-4">Settings</SectionLabel>
      {settingsItems.map((item) => (
        <NavLink key={item.href} {...item} active={pathname === item.href} onNavigate={() => setOpen(false)} />
      ))}
    </nav>
  );

  const userCard = (
    <div className="flex items-center gap-2.5 px-1.5">
      <span className="inline-grid place-items-center w-8 h-8 shrink-0 rounded-full bg-sage border-2 border-ink text-sm font-semibold uppercase">
        {name.charAt(0)}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold truncate">{name}</span>
        <span className="block label text-[9px] text-[#3B5A61]">Logged in</span>
      </span>
      <button
        onClick={handleLogout}
        disabled={loading}
        aria-label="Log out"
        title="Log out"
        className="inline-grid place-items-center w-9 h-9 rounded-lg border-2 border-transparent hover:border-ink hover:bg-white disabled:opacity-50"
      >
        <LogOut size={17} />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 bg-sky border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
        <Logo href="/dashboard" size="sm" />
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="pill w-10 px-0"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {open && (
        <>
          <div className="md:hidden fixed inset-0 z-30 bg-ink/30" onClick={() => setOpen(false)} />
          <div className="md:hidden fixed top-16 left-3 right-3 z-40 card card-raised bg-sky p-3 flex flex-col gap-4 pop-in">
            {nav}
            <div className="border-t-2 border-ink/15 pt-3">{userCard}</div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 bg-sky border-r-2 border-ink flex-col gap-6 px-3.5 py-5">
        <div className="px-1.5">
          <Logo href="/dashboard" size="sm" />
        </div>
        {nav}
        <div className="mt-auto">{userCard}</div>
      </aside>
    </>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`label text-[9px] text-[#3B5A61] px-3 pb-1 ${className}`}>{children}</span>;
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2.5 min-h-9 px-3 rounded-[10px] border-2 text-sm font-medium transition-colors ${
        active
          ? "bg-butter border-ink shadow-[2.5px_2.5px_0_var(--ink)]"
          : "border-transparent hover:bg-white hover:border-ink"
      }`}
    >
      <Icon size={17} strokeWidth={2} />
      {label}
    </Link>
  );
}
