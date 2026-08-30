"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn, useAuthUser, signOut } from "@/lib/auth";

export default function AccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const redirectTo = searchParams.get("redirect") || "/cars";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn({ fullName, email });
    router.push(redirectTo);
  }

  if (user) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-sm text-ink-soft">Signed in as</p>
        <p className="mt-1 font-display text-lg text-ink">{user.fullName || user.email}</p>
        <p className="text-sm text-ink-soft">{user.email}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push(redirectTo)}
            className="rounded-full bg-purple px-6 py-3 text-sm font-medium text-purple-ink hover:opacity-90"
          >
            Continue browsing
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-purple focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <p className="mb-5 rounded-lg bg-purple-soft px-4 py-3 text-xs leading-relaxed text-purple">
        This is a lightweight demo sign-in used only to preview price-gated listings on this
        site. It doesn&rsquo;t create a real account or send a password anywhere — a real
        sign-in system will replace this once the site is connected to a backend.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full name</label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="09xx xxx xxx"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-car-gradient px-6 py-3 text-sm font-medium text-white hover:opacity-90 sm:w-auto"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
