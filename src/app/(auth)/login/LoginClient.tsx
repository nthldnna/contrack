"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import { useRouter } from "next/navigation";
import AuthShell, { FormError } from "../AuthShell";

export default function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/dashboard");
  };

  return (
    <AuthShell
      mode="login"
      title="welcome back"
      subtitle="Use the email your site office signed up with."
    >
      <form onSubmit={login} className="flex flex-col gap-3.5">
        <div>
          <label htmlFor="login-email" className="field-label">
            Email
          </label>
          <input
            id="login-email"
            className="field field-round"
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <label htmlFor="login-password" className="field-label">
              Password
            </label>
          </div>
          <input
            id="login-password"
            className="field field-round"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <FormError message={error} />}

        <button type="submit" disabled={loading} className="pill pill-dark mt-1">
          <span className="dot" />
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-xs text-muted text-center">
        By logging in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </AuthShell>
  );
}
