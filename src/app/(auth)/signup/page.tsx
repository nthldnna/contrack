"use client";

import { useState } from "react";
import { supabase } from "@/src/utils/supabase/browser";
import Link from "next/link";
import AuthShell, { FormError } from "../AuthShell";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [done, setDone] = useState(false);

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

    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <AuthShell mode="signup" title="check your inbox" subtitle={`We sent a confirmation link to ${email}.`}>
        <p className="text-sm leading-relaxed">
          Open the link in that email to activate your account, then come back and log in.
        </p>
        <Link href="/login" className="pill pill-dark">
          <span className="dot" />
          Go to log in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell mode="signup" title="join the crew" subtitle="Set up your stockroom in a few minutes.">
      <form onSubmit={signup} className="flex flex-col gap-3.5">
        <div>
          <label htmlFor="signup-name" className="field-label">
            Full name
          </label>
          <input
            id="signup-name"
            className="field field-round"
            placeholder="Juan Dela Cruz"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="field-label">
            Email
          </label>
          <input
            id="signup-email"
            className="field field-round"
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="signup-password" className="field-label">
              Password
            </label>
            <input
              id="signup-password"
              className="field field-round"
              placeholder="6+ characters"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="signup-confirm" className="field-label">
              Confirm
            </label>
            <input
              id="signup-confirm"
              className="field field-round"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {passwordError && <FormError message={passwordError} />}

        <button type="submit" disabled={loading} className="pill pill-dark mt-1">
          <span className="dot" />
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-xs text-muted text-center">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </AuthShell>
  );
}
