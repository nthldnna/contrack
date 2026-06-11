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

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email for confirmation!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md shadow-sm rounded-3xl p-8 border border-black/5">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold dark-blue tracking-wide">
              ConTrack
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Create an account and start tracking your materials.
            </p>
          </div>

          <form onSubmit={signup} className="mt-6 space-y-4">

            {/* Email */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                placeholder="you@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Password</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-sub py-3 rounded-xl font-semibold
              shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="dark-blue font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}