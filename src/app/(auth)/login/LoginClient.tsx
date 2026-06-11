"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-sm rounded-3xl p-8 border border-black/5">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-stamp dark-blue tracking-wide">
              ConTrack
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Welcome back! Log in to continue your study journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={login} className="space-y-5">
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                placeholder="you@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                transition shadow-sm"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-main py-3 rounded-xl font-semibold
              shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            No account yet?{" "}
            <Link
              href="/signup"
              className="dark-blue font-medium hover:underline transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}