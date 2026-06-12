"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Truck,
  Boxes,
  Menu,
  X,
  LogOut,
  Settings, ChevronDown, ChevronUp,
  Tags,
  Ruler,
} from "lucide-react";

import Image from "next/image";
import logo from "@/src/app/icon.png";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";

type SidebarProps = {
  userName?: string;
  onLogout?: () => Promise<void>;
};

export default function Sidebar({ userName, onLogout }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/stocks",
      label: "Stocks",
      icon: Boxes,
    },
    {
      href: "/materials",
      label: "Materials",
      icon: Package,
    },
    {
      href: "/suppliers",
      label: "Suppliers",
      icon: Truck,
    },
  ];

  const settingsItems = [
    {
      href: "/categories",
      label: "Categories",
      icon: Tags,
    },
    {
      href: "/units",
      label: "Units",
      icon: Ruler,
    },
  ];

  const pathname = usePathname();

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.replace("/login");
    router.refresh();
  };
  
  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--white-blue)] backdrop-blur border-b border-blue-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt="ConTrack"
              className="w-6 h-6 object-contain"
            />
          </div>

          <h1 className="font-bold text-lg text-[var(--dark-blue)]">
            ConTrack
          </h1>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl bg-white border border-black/10 dark-blue"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-18 left-4 right-4 z-40 bg-white rounded-3xl shadow-xl border border-pink-100 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 transition"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Settings Dropdown */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-blue-50 transition"
            >
              <span className="flex items-center gap-3">
                <Settings size={18} />
                Settings
              </span>

              <span>{settingsOpen ? "−" : "+"}</span>
            </button>

            {settingsOpen && (
              <div className="ml-4 mt-2 space-y-2">
                {settingsItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 text-sm"
                    >
                      <Icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-pink-100 mt-4 pt-4">
            <p className="text-sm text-gray-500 truncate">
              {userName ?? "Guest"}
            </p>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="mt-3 w-full btn-sub border border-black/10 py-2 rounded-2xl transition"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[var(--white-blue)] border-r border-blue-100 flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt="ConTrack Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div>
              <h2 className="font-bold text-2xl text-[var(--dark-blue)]">
                ConTrack
              </h2>
              <p className="text-xs text-gray-500">
                Track smarter today
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
        relative flex items-center gap-3 p-3 rounded-2xl transition-all
        ${isActive
                      ? "bg-white shadow-sm dark-blue font-semibold"
                      : "text-gray-700 hover:bg-white hover:shadow-sm"
                    }
      `}
                >

                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
{/* Settings Dropdown */}
<div>
  <button
    onClick={() => setSettingsOpen(!settingsOpen)}
    className="flex items-center gap-3 p-3 rounded-2xl w-full text-left text-gray-700 hover:bg-white hover:shadow-sm transition"
  >
    <Settings size={18} />
    <span>Settings</span>

    {settingsOpen ? (
      <ChevronUp size={16} className="ml-auto text-gray-500" />
    ) : (
      <ChevronDown size={16} className="ml-auto text-gray-500" />
    )}
  </button>

{settingsOpen && (
  <div className="ml-6 mt-2 pl-4 border-l-2 border-slate-200 space-y-1">
    {settingsItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`relative flex items-center gap-2 p-2 rounded-xl text-sm transition ${
            isActive
              ? "font-semibold dark-blue"
              : "hover:dark-blue hover:font-semibold"
          }`}
        >
          {isActive && (
            <span className="absolute -left-[17px] h-6 w-1 rounded-full bg-[var(--dark-blue)]" />
          )}

          <Icon size={16} />
          {item.label}
        </Link>
      );
    })}
  </div>
)}
</div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-pink-100">
          <p className="text-xs text-gray-400 mb-1">
            Logged in as
          </p>

          <p className="font-medium text-sm truncate mb-4">
            {userName ?? "Guest"}
          </p>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 btn-sub border border-black/10 py-2.5 rounded-2xl transition"
          >
            <LogOut size={16} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}