"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Package,
  TrendingUp,
  Shield,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import logo from "@/src/app/icon.png";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "features", label: "FEATURES" },
  { id: "why-us", label: "WHY US" },
  { id: "contact", label: "CONTACT" },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      let current = "home";
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = id;
        }
      }
      setActive(current);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen font-[var(--font-outfit)]" style={{ backgroundColor: "var(--white-blue)" }}>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={logo}
                alt="ConTrack"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="font-bold text-xl" style={{ color: "var(--dark-blue)" }}>
              ConTrack
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <div
              className="flex items-center rounded-full px-1 py-1"
              style={{ backgroundColor: "var(--light-blue)" }}
            >
              {navItems.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setActive(id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-black/60 hover:text-black/80"
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--dark-blue)" : "transparent",
                    }}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <a
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md"
                  style={{ backgroundColor: "var(--dark-blue)" }}
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-sm"
                  style={{
                    color: "var(--dark-blue)",
                    border: "1.5px solid var(--light-blue)",
                  }}
                >
                  Login
                </a>
              )}
            </div>
            <div className="md:hidden">
              <MobileMenu active={active} setActive={setActive} />
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: "var(--light-blue)" }}
          />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#a8d5e2" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--light-blue)", backgroundColor: "rgba(220, 234, 255, 0.4)" }}>
                <Zap size={14} style={{ color: "var(--dark-blue)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--dark-blue)" }}>
                  Smart Inventory Management
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl font-bold leading-tight"
                style={{ color: "var(--dark-blue)" }}
              >
                Inventory Management
                <span
                  className="block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                >
                  Made Simple
                </span>
              </h1>
            </div>

            <p
              className="text-lg leading-relaxed max-w-md"
              style={{ color: "var(--dark-blue)", opacity: 0.7 }}
            >
              Track materials, manage suppliers, and monitor stock levels in real-time with our
              intelligent inventory system built for modern businesses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/signup"
                className="px-6 py-3.5 rounded-lg text-white font-medium flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: "var(--dark-blue)" }}
              >
                Get Started <ArrowRight size={16} />
              </a>
              <a
                href="#features"
                className="px-6 py-3.5 rounded-lg font-medium flex items-center gap-2 hover:shadow-md transition-all"
                style={{
                  color: "var(--dark-blue)",
                  border: "1.5px solid var(--light-blue)",
                }}
              >
                Learn More
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold" style={{ color: "var(--dark-blue)" }}>
                  500+
                </div>
                <div className="text-sm" style={{ color: "var(--dark-blue)", opacity: 0.6 }}>
                  Materials Tracked
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: "var(--dark-blue)" }}>
                  24/7
                </div>
                <div className="text-sm" style={{ color: "var(--dark-blue)", opacity: 0.6 }}>
                  Real-time Monitoring
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden md:block relative h-96">
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(13, 50, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
              }}
            >
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Glowing Elements */}
              <div className="absolute top-12 right-12 w-24 h-24 rounded-full blur-2xl opacity-50" style={{ backgroundColor: "#22d3ee" }} />
              <div className="absolute bottom-12 left-12 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ backgroundColor: "#3b82f6" }} />

              {/* Demo Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-white p-8 z-10">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto mb-4 opacity-80" />
                  <h3 className="text-xl font-semibold mb-2">Dashboard Analytics</h3>
                  <p className="text-white/70 text-sm">Real-time inventory insights at your fingertips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--dark-blue)" }}
            >
              Powerful Features
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--dark-blue)", opacity: 0.7 }}
            >
              Everything you need to manage inventory efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: "Real-time Tracking",
                description: "Monitor stock levels instantly across all locations and materials",
              },
              {
                icon: TrendingUp,
                title: "Analytics & Insights",
                description: "Data-driven dashboards to optimize inventory and reduce waste",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: "white",
                  borderColor: "var(--light-blue)",
                }}
              >
                <feature.icon
                  size={32}
                  style={{ color: "var(--dark-blue)", marginBottom: "1rem" }}
                />
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--dark-blue)" }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "var(--dark-blue)", opacity: 0.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-8"
                style={{ color: "var(--dark-blue)" }}
              >
                Why Choose ConTrack?
              </h2>

              <div className="space-y-6">
                {[
                  "Intuitive interface that requires minimal training",
                  "Scalable solutions for businesses of any size",
                  "Dedicated customer support & regular updates",
                  "Seamless integration with existing systems",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle2
                      size={24}
                      style={{ color: "var(--dark-blue)", flexShrink: 0 }}
                    />
                    <p
                      className="text-lg"
                      style={{ color: "var(--dark-blue)", opacity: 0.8 }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/signup"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-white font-medium hover:shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: "var(--dark-blue)" }}
              >
                Start Free Trial <ArrowRight size={16} />
              </a>
            </div>

            <div className="relative h-96">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(13, 50, 59, 0.85) 0%, rgba(30, 58, 138, 0.85) 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-[0.1]" style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }} />

                <div className="absolute top-16 right-16 w-32 h-32 rounded-full blur-3xl opacity-40" style={{ backgroundColor: "#22d3ee" }} />
                <div className="absolute bottom-16 left-16 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ backgroundColor: "#3b82f6" }} />

                <div className="relative h-full flex items-center justify-center text-white p-8 z-10">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
                    <p className="text-white/70 text-sm">Optimize operations with intelligent inventory management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--dark-blue)" }}
          >
            Ready to Transform Your Inventory?
          </h2>

          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--dark-blue)", opacity: 0.7 }}
          >
            Join hundreds of businesses already using ConTrack to streamline their operations
            and reduce costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/signup"
              className="px-8 py-4 rounded-lg text-white font-medium text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: "var(--dark-blue)" }}
            >
              Start Free Today <ArrowRight size={20} />
            </a>
            <a
              href="mailto:nthldnna@gmail.com"
              className="px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 hover:shadow-md transition-all"
              style={{
                color: "var(--dark-blue)",
                border: "1.5px solid var(--light-blue)",
              }}
            >
              Contact Sales
            </a>
          </div>

          <p
            className="text-sm"
            style={{ color: "var(--dark-blue)", opacity: 0.6 }}
          >
            Questions? Email us at{" "}
            <a
              href="mailto:nthldnna@gmail.com"
              className="font-semibold hover:underline"
            >
              nthldnna@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 border-t"
        style={{ borderColor: "var(--light-blue)", backgroundColor: "white/40" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p style={{ color: "var(--dark-blue)", opacity: 0.6 }} className="text-sm">
            © 2024 ConTrack. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--dark-blue)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

function MobileMenu({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-lg transition-all"
        style={{ backgroundColor: "var(--light-blue)" }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 mt-3 w-48 rounded-xl shadow-lg overflow-hidden z-50 border"
            style={{ backgroundColor: "white", borderColor: "var(--light-blue)" }}
          >
            <div className="p-4 space-y-2">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => {
                    setActive(id);
                    setOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: active === id ? "white" : "var(--dark-blue)",
                    backgroundColor: active === id ? "var(--dark-blue)" : "transparent",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen z-10 font-[var(--font-outfit)] text-black dark:bg-black dark:text-white transition-colors duration-500">

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-500 ${active !== "home" ? "bg-white/80 backdrop-blur-md border-b border-black/5 dark:bg-black" : "bg-transparent"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center justify-start">
            <h1 className="font-bold text-[20px] md:text-[30px] tracking-wide leading-none">
              ConTrack
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex justify-center">
            <div className="flex items-center rounded-full bg-white/40  border border-black/50 dark:border-white/50 dark:bg-black font-semibold">		{navItems.map(({ id, label }) => {
              const isActive = active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActive(id)}
                  className={`
						px-4 py-2 rounded-full text-[10px] tracking-wide
						transition-all duration-200
						${isActive
                      ? "bg-black text-white font-semibold dark:bg-white dark:text-black"
                      : "text-black/70 dark:text-white/70 hover:bg-black/5"
                    }
					`}
                >
                  {label}
                </a>
              );
            })}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">

  {isLoggedIn ? (
    <a
      href="/dashboard"
      className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-medium hover:opacity-90 transition"
    >
      Dashboard
    </a>
  ) : (
    <a
      href="/login"
      className="px-4 py-2 rounded-full border border-black/20 dark:border-white/20 text-[11px] font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
    >
      Login
    </a>
  )}

</div>
            {/* MOBILE ACTIONS (theme + menu) */}
            <div className="flex md:hidden items-center gap-2">

              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>

        </div>
      </header>

      <div className="relative">

        {/* GLOBAL BACKGROUND ORBS */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="
	absolute w-[300px] md:w-[600px]
	h-[300px] md:h-[600px]
	bg-pink-300/40
	dark:bg-blue-500/20
	rounded-full blur-3xl animate-float1
	top-[10%] left-1/2 -translate-x-1/2
"
          />

          <div
            className="
	absolute w-[220px] md:w-[450px]
	h-[220px] md:h-[450px]
	bg-rose-300/30
	dark:bg-indigo-500/15
	rounded-full blur-3xl animate-float2
	bottom-[10%] right-[10%]
"
          />

          <div
            className="
	absolute w-[180px] md:w-[350px]
	h-[180px] md:h-[350px]
	bg-fuchsia-300/30
	dark:bg-cyan-500/10
	rounded-full blur-3xl animate-float3
	top-[40%] left-[15%]
"
          />
        </div>

        <section
          id="home"
          className="relative isolate min-h-screen scroll-mt-24 flex items-center"
        >
          <div className="w-full flex flex-col lg:flex-row">

            {/* LEFT SIDE - YOUR VISUAL */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#1e3a8a] items-center justify-center relative overflow-hidden">

              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-16 left-16 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
              </div>

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              {/* Animated waves */}
              <div className="absolute inset-0 opacity-15">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 1440 900"
                  fill="none"
                >
                  <path
                    d="M0 720 C 180 640, 360 820, 540 730 C 720 640, 900 600, 1080 690 C 1260 780, 1380 720, 1440 650"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <path
                    d="M0 800 C 200 760, 420 840, 600 780 C 780 720, 960 680, 1140 740 C 1320 800, 1440 760, 1440 760"
                    stroke="url(#grad2)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1440" y2="0">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>

                    <linearGradient id="grad2" x1="0" y1="0" x2="1440" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Text */}
              <div className="relative z-10 max-w-lg px-10 text-white">
                <h1 className="text-4xl font-bold mb-3">
                  ConTrack
                </h1>

                <p className="text-white/70 mb-6">
                  Smart Inventory Tracking System for materials, suppliers, and real-time stock monitoring.
                </p>

                <div className="space-y-3 text-sm text-white/70">
                  <p>• Real-time inventory tracking</p>
                  <p>• Supplier & material management</p>
                  <p>• Stock alerts & analytics</p>
                  <p>• Centralized dashboard system</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - CTA */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 text-center">

              <div className="max-w-xl">
                <p className="text-xs tracking-widest uppercase text-black/50 mb-4">
                  Inventory Management System
                </p>

                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Manage inventory
                  <span className="block text-black/60">
                    the smart way
                  </span>
                </h2>

                <p className="mt-5 text-black/60">
                  Track materials, monitor stock levels, and manage suppliers in one unified system built for efficiency.
                </p>

                <div className="mt-8 flex justify-center gap-3 flex-wrap">
                  <a href="#modules" className="px-6 py-3 rounded-full bg-black text-white text-sm">
                    View Modules
                  </a>

                  <a href="#contact" className="px-6 py-3 rounded-full border border-black/20 text-sm">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section
          id="modules"
          className="min-h-screen scroll-mt-24 px-6 py-20"
        >
          <h2 className="text-3xl font-bold mb-6">Modules</h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl border bg-white">
              <h3 className="font-semibold mb-2">Inventory Tracking</h3>
              <p className="text-sm text-black/60">Monitor stock levels in real-time.</p>
            </div>

            <div className="p-6 rounded-2xl border bg-white">
              <h3 className="font-semibold mb-2">Supplier Management</h3>
              <p className="text-sm text-black/60">Organize and manage suppliers efficiently.</p>
            </div>

            <div className="p-6 rounded-2xl border bg-white">
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-black/60">Visual insights for better decision-making.</p>
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="min-h-screen scroll-mt-24 flex items-center justify-center px-6"
        >
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-4">About ConTrack</h2>

            <p className="text-black/60">
              ConTrack is a smart inventory management system designed to help businesses
              efficiently track materials, suppliers, and stock movement in real time.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-4 md:px-6 relative overflow-hidden">
          <div className="text-center max-w-2xl w-full flex flex-col items-center justify-center">

            {/* Envelope image */}
            <div className="mb-4">
              <Image
                src={envelope}
                alt="Envelope"
                width={100}
                height={100}
                className="mx-auto opacity-90"
              />
            </div>
            {/* Heading */}
            <h2 className="text-4xl font-semibold tracking-tight">
              Let’s work together
            </h2>

            {/* Invite message with highlights */}
            <p className="mt-4 text-black/60 text-sm md:text-base leading-relaxed dark:text-white">
              I’m always open to{" "}
              <span className="bg-[var(--light-blue)] text-black">
                collaborations
              </span> and{" "}
              <span className="bg-[var(--beige)] text-black">
                meaningful projects
              </span>.
              <br />
              If you’ve got an idea, a role, or just want to build something that actually works—
              <span className="bg-[var(--pastel-pink)] text-black">
                let’s talk
              </span>.
            </p>

            <p className="text-sm md:text-base mt-2">
              Email me at{" "}
              <a
                href="mailto:nthldnna@gmail.com"
                className="block md:inline font-medium hover:underline"
              >
                nthldnna@gmail.com
              </a>
            </p>
            {/* Buttons */}
            <div className="mt-5 flex flex-row items-center justify-center gap-3 flex-wrap">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nathalie-deanna-uba/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[var(--light-blue)] border border-black/10 text-black text-sm flex items-center gap-2 hover:scale-[1.03] hover:shadow-sm transition font-medium"
              >
                <Coffee size={16} />
                LinkedIn
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/nthldnna"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[var(--pastel-pink)] border border-black/10 text-black text-sm flex items-center gap-2 hover:scale-[1.03] hover:shadow-sm transition font-medium"
              >
                <GitBranch size={16} />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
}


function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full bg-white/70 border border-black/10 dark:border-white/10 dark:text-white dark:bg-black "
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 mt-3 w-56 z-50">
            <div className="rounded-2xl bg-white dark:bg-black dark:text-white border border-black/10 shadow-xl overflow-hidden animate-fadeDown">

              {/* Header */}
              <div className="px-4 py-3 border-b border-black/5">
                <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest">
                  Menu
                </p>
              </div>

              {/* Links */}
              <div className="p-2 flex flex-col">
                {navItems.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-black/70 dark:text-white/70 hover:bg-black/5 transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
