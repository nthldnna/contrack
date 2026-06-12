"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/app/icon.png";

export default function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Logo & Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold dark-blue text-center mb-3">
              Welcome Back
            </h1>
            <p className="text-center dark-blue opacity-60 text-sm leading-relaxed">
              Access your inventory dashboard and manage your materials with ease
            </p>
          </div>

          {/* Form */}
          <form onSubmit={login} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium dark-blue mb-2.5">
                Email Address
              </label>
              <input
                className="w-full px-5 py-3.5 bg-white border border-black/10 rounded-lg dark-blue 
                placeholder-gray-400 focus:outline-none focus:border-dark-blue focus:ring-2 focus:ring-light-blue
                transition duration-200"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="block text-sm font-medium dark-blue">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs dark-blue opacity-70 hover:opacity-100 transition"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                className="w-full px-5 py-3.5 bg-white border border-black/10 blue rounded-lg dark-blue 
                placeholder-gray-400 focus:outline-none focus:border-dark-blue focus:ring-2 focus:ring-light-blue
                transition duration-200"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-sub w-full rounded-lg py-3.5 transition mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-light-blue"></div>
            <span className="px-4 text-xs dark-blue opacity-50">or</span>
            <div className="flex-1 h-px bg-light-blue"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm dark-blue">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold dark-blue hover:opacity-80 transition underline"
            >
              Create one
            </Link>
          </p>

          {/* Footer Text */}
          <p className="text-xs text-center dark-blue opacity-50 mt-3">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      {/* Left Side - Visual (LOGIN VERSION) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#1e3a8a] items-center justify-center relative overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Subtle Animated Chart Background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 760 C 200 680, 400 820, 600 740 C 800 660, 1000 700, 1200 760 C 1300 800, 1400 740, 1440 700"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />

            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1440" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-md text-center">

          {/* Brand */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">

            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
              <Image
                src={logo}
                alt="ConTrack"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>

            <span className="text-white text-sm font-medium">
              ConTrack Inventory System
            </span>

          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-white leading-tight mb-5">
            Smart Inventory
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Tracking Made Easy
            </span>
          </h1>

          <p className="text-white/60 text-sm mb-8">
            Sign in to access your inventory dashboard, monitor stocks,
            and manage materials in real time.
          </p>

          {/* Key Value Points */}
          <div className="space-y-3 text-sm text-white/70 mb-10">

            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Secure authentication powered by Supabase
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Real-time inventory synchronization
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Role-based access for teams
            </div>

          </div>

          {/* Trust Stats (simplified for login) */}
          <div className="grid grid-cols-3 gap-3">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3">
              <h3 className="text-lg font-bold text-white">99.9%</h3>
              <p className="text-[10px] text-white/50">Uptime</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3">
              <h3 className="text-lg font-bold text-white">Fast</h3>
              <p className="text-[10px] text-white/50">Access</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3">
              <h3 className="text-lg font-bold text-white">Secure</h3>
              <p className="text-[10px] text-white/50">Auth</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
