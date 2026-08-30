"use client";

import { useSyncExternalStore } from "react";

// Client-side wishlist (heart icon + count in the header), persisted to
// localStorage per-visitor. Not tied to an account — matches the reference
// site's guest-friendly wishlist behavior.

const WISHLIST_EVENT = "wishlistchange";
const STORAGE_KEY = "wishlist_car_ids";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_EVENT, callback);
  };
}

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

let cachedSnapshot: string[] = [];
let cachedRaw: string | null = null;

function getSnapshot(): string[] {
  const raw = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  })();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = readIds();
  }
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return [];
}

export function useWishlist(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function isWishlisted(carId: string): boolean {
  return readIds().includes(carId);
}

export function toggleWishlist(carId: string) {
  const ids = readIds();
  const next = ids.includes(carId) ? ids.filter((id) => id !== carId) : [...ids, carId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}
