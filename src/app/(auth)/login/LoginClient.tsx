"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-dark-blue to-light-blue rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
            </div>
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
                className="w-full px-5 py-3.5 bg-white border border-light-blue rounded-lg dark-blue 
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
                  Forgot?
                </Link>
              </div>
              <input
                className="w-full px-5 py-3.5 bg-white border border-light-blue rounded-lg dark-blue 
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
              className="w-full py-3.5 bg-gradient-to-r from-dark-blue to-dark-blue text-white font-semibold 
              rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
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
          <p className="text-xs text-center dark-blue opacity-50 mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-dark-blue via-dark-blue to-light-blue items-center justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-light-blue opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <div className="inline-block mb-8 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Inventory Management
            </h2>
            <p className="text-white text-opacity-90 max-w-xs">
              Track, organize, and manage all your materials in one powerful dashboard
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-12 max-w-xs">
            <div className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-xs text-white text-opacity-80">Materials</div>
            </div>
            <div className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20">
              <div className="text-2xl font-bold text-white mb-1">Real-time</div>
              <div className="text-xs text-white text-opacity-80">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
