"use client";

import { useSyncExternalStore } from "react";

// Lightweight, fully client-side "session" used only to gate pricing behind
// a Login/Register wall, matching the reference site's UX. This is NOT real
// authentication — there's no password check, no server session, and no
// Supabase Auth wiring yet (the project only has an anon-key read client so
// far). It's a local, honest stand-in: swap this file for real Supabase Auth
// once the project is ready, and every price-gated surface (AuthGate,
// SiteHeader) already reads through the one useAuthUser() hook below.

const AUTH_EVENT = "authchange";
const STORAGE_KEY = "demo_auth_user";

export interface AuthUser {
  fullName: string;
  email: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// The server can't know localStorage, so it always renders "signed out" —
// corrected (without a hydration mismatch) once mounted, same pattern as
// the theme toggle.
function getServerSnapshot(): string | null {
  return null;
}

export function useAuthUser(): AuthUser | null {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function signIn(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
