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