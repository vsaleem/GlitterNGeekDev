"use client";
import { FormEvent, useState } from "react";

interface SubscribeSignupProps {
  className?: string;
  unstyled?: boolean;
}

export function SubscribeSignup({ className = "", unstyled = false }: SubscribeSignupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: hook up to API route or external service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md ${unstyled ? "p-0 bg-transparent border-0 shadow-none" : "bg-white/95 rounded-md p-4 sm:p-5 shadow-lg border border-white/60"} flex flex-col gap-3 text-left mx-auto md:mx-0 ${className}`}
      aria-describedby="subscribe-to-updates-desc"
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor="subscribe-to-updates-email"
          className={`text-[11px] font-medium uppercase tracking-wide ${unstyled ? "text-white/85 drop-shadow-sm" : "text-gray-700"}`}
        >
          Sign up for updates and more
        </label>
      </div>
  <div className="flex flex-row gap-2 max-[359px]:flex-col">
        <input
          id="subscribe-to-updates-email"
          name="email"
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 border ${unstyled ? "bg-white/15 border-white/30 text-white placeholder:text-white/55" : "border-gray-300 bg-white/90 text-gray-800 placeholder:text-gray-400"}`}
          aria-label="Email address"
        />
        <button
          type="submit"
          className={`rounded-sm px-5 py-2 text-sm font-semibold tracking-wide shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 max-[359px]:w-full ${unstyled ? "bg-pink-500/90 hover:bg-pink-500 active:bg-pink-600" : "bg-purple-800 hover:bg-purple-700 active:bg-purple-900 text-white"}`}
        >
          Sign Up
        </button>
      </div>
      <p id="subscribe-to-updates-desc" className={`text-[10px] leading-snug ${unstyled ? "text-white/60" : "text-gray-500"}`}>
        By signing up you agree to receive occasional updates. No spam, unsubscribe anytime.
      </p>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {submitted ? "Subscription added successfully" : ""}
      </div>
    </form>
  );
}

export default SubscribeSignup;
