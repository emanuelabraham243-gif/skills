"use client";

import { useSyncExternalStore } from "react";

// Client-side "compare" tray (up to 4 cars), persisted to localStorage.
// Same store/hook pattern as wishlist.ts.

const COMPARE_EVENT = "comparechange";
const STORAGE_KEY = "compare_car_ids";
export const MAX_COMPARE = 4;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(COMPARE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COMPARE_EVENT, callback);
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

export function useCompareList(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function isComparing(carId: string): boolean {
  return readIds().includes(carId);
}

function write(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(COMPARE_EVENT));
}

export function addToCompare(carId: string): boolean {
  const ids = readIds();
  if (ids.includes(carId)) return true;
  if (ids.length >= MAX_COMPARE) return false;
  write([...ids, carId]);
  return true;
}

export function removeFromCompare(carId: string) {
  write(readIds().filter((id) => id !== carId));
}

export function clearCompare() {
  write([]);
}
