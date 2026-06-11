"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setPasswordError(error.message);
      setLoading(false);
      return;
    }

    alert("Check your email for confirmation!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-light-blue via-white-blue to-white items-center justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 -right-40 w-80 h-80 bg-dark-blue opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-dark-blue opacity-5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <div className="inline-block mb-8 p-6 bg-dark-blue bg-opacity-5 backdrop-blur-md rounded-2xl border border-dark-blue border-opacity-10">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-bold dark-blue mb-4">
              Get Started Today
            </h2>
            <p className="dark-blue opacity-70 max-w-xs">
              Join thousands of warehouse managers optimizing their inventory with ConTrack
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mt-12 max-w-xs">
            <div className="flex items-center justify-center gap-3 p-3 bg-dark-blue bg-opacity-5 backdrop-blur-md rounded-lg border border-dark-blue border-opacity-10">
              <span className="text-lg">✓</span>
              <span className="text-sm dark-blue opacity-80">Instant Setup</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 bg-dark-blue bg-opacity-5 backdrop-blur-md rounded-lg border border-dark-blue border-opacity-10">
              <span className="text-lg">✓</span>
              <span className="text-sm dark-blue opacity-80">Real-time Analytics</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 bg-dark-blue bg-opacity-5 backdrop-blur-md rounded-lg border border-dark-blue border-opacity-10">
              <span className="text-lg">✓</span>
              <span className="text-sm dark-blue opacity-80">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              Create Account
            </h1>
            <p className="text-center dark-blue opacity-60 text-sm leading-relaxed">
              Join us and start managing your inventory with ease
            </p>
          </div>

          {/* Form */}
          <form onSubmit={signup} className="space-y-6">
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
              <label className="block text-sm font-medium dark-blue mb-2.5">
                Password
              </label>
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
                className="w-full px-5 py-3.5 bg-white border border-light-blue rounded-lg dark-blue 
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
              className="w-full py-3.5 bg-gradient-to-r from-dark-blue to-dark-blue text-white font-semibold 
              rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
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
          <p className="text-xs text-center dark-blue opacity-50 mt-8">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
