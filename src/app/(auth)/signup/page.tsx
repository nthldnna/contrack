"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/app/icon.png";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setLoading(true);

    // Validation
    if (!email || !password || !confirmPassword) {
      setPasswordError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setPasswordError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
      });
    }

    alert("Check your email for confirmation!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#1e3a8a] items-center justify-center relative overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
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

        {/* Animated Chart Background (NOW PROPER LAYER) */}
        <div className="absolute inset-0 opacity-15">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 720 C 180 640, 360 820, 540 730 C 720 640, 900 600, 1080 690 C 1260 780, 1380 720, 1440 650"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />

            <path
              d="M0 800 C 200 760, 420 840, 600 780 C 780 720, 960 680, 1140 740 C 1320 800, 1440 760, 1440 760"
              stroke="url(#grad2)"
              strokeWidth="1.5"
              strokeLinecap="round"
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

        {/* Main Content */}
        <div className="relative z-10 max-w-lg px-8">

          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">

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

          {/* Heading */}
          <h1 className="text-5xl font-bold text-white leading-tight mb-5">
            Smart Inventory
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Tracking Made Easy
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/70 text-base leading-relaxed mb-7">
            Manage materials, suppliers, and stock in real time with a centralized
            inventory system built for efficiency and accuracy.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-3 mb-8 text-white/70 text-sm">

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Real-time inventory tracking
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Supplier & material management
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Stock alerts & monitoring
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Centralized dashboard analytics
            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-[11px] text-white/60">Active</span>
              </div>

              <h3 className="text-2xl font-bold text-white">500+</h3>
              <p className="text-xs text-white/50">Materials</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-[11px] text-white/60">Live</span>
              </div>

              <h3 className="text-2xl font-bold text-white">24/7</h3>
              <p className="text-xs text-white/50">Monitoring</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-[11px] text-white/60">Secure</span>
              </div>

              <h3 className="text-2xl font-bold text-white">High</h3>
              <p className="text-xs text-white/50">Cloud</p>
            </div>

          </div>

        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Logo & Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold dark-blue text-center mb-3">
              Create Account
            </h1>
            <p className="text-center dark-blue opacity-60 text-sm leading-relaxed">
              Join us and start managing your inventory with ease
            </p>
          </div>

          {/* Form */}
          <form onSubmit={signup} className="space-y-6">

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium dark-blue mb-2.5">
                Full Name
              </label>
              <input
                className="w-full px-5 py-3.5 bg-white border border-black/10 rounded-lg dark-blue
    placeholder-gray-400 focus:outline-none focus:border-dark-blue focus:ring-2 focus:ring-light-blue
    transition duration-200"
                placeholder="John Doe"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <label className="block text-sm font-medium dark-blue mb-2.5">
                Password
              </label>
              <input
                className="w-full px-5 py-3.5 bg-white border border-black/10 rounded-lg dark-blue 
                placeholder-gray-400 focus:outline-none focus:border-dark-blue focus:ring-2 focus:ring-light-blue
                transition duration-200"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs dark-blue opacity-60 mt-1.5">
                At least 6 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium dark-blue mb-2.5">
                Confirm Password
              </label>
              <input
                className="w-full px-5 py-3.5 bg-white border border-black/10 rounded-lg dark-blue 
                placeholder-gray-400 focus:outline-none focus:border-dark-blue focus:ring-2 focus:ring-light-blue
                transition duration-200"
                placeholder="••••••••"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{passwordError}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-sub w-full rounded-lg py-3.5 transition mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-light-blue"></div>
            <span className="px-4 text-xs dark-blue opacity-50">or</span>
            <div className="flex-1 h-px bg-light-blue"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm dark-blue">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold dark-blue hover:opacity-80 transition underline"
            >
              Sign in
            </Link>
          </p>

          {/* Footer Text */}
          <p className="text-xs text-center dark-blue opacity-50 mt-3">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
