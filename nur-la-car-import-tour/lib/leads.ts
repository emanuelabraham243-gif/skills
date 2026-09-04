"use client";

import { getSupabaseClient } from "./supabase/client";
import type { WebLeadInput } from "./types";

/**
 * Every lead-generating form on the site (test drive booking, "I'm
 * interested", waitlist, notify me, trade-in, custom vehicle request, tour
 * booking inquiry) goes through this single function, which calls the
 * `submit_web_lead` Postgres RPC. Nothing on the client ever inserts into
 * `leads` or `customers` directly.
 *
 * IMPORTANT: the parameter names below (`p_*`) are a best-guess placeholder
 * shape. Once the real `submit_web_lead` signature + project credentials are
 * provided, update ONLY the `rpc(...)` call below to match — every form
 * already funnels through this one function, so that's the single edit
 * point for the whole site.
 */
export async function submitWebLead(
  input: WebLeadInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn("[submitWebLead] Supabase not configured — lead not sent:", input);
    return {
      ok: false,
      error:
        "Lead submission isn't connected yet (Supabase credentials pending). Please reach us on WhatsApp in the meantime.",
    };
  }

  const { error } = await supabase.rpc("submit_web_lead", {
    p_lead_type: input.leadType,
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_email: input.email ?? null,
    p_message: input.message ?? null,
    p_car_id: input.carId ?? null,
    p_tour_id: input.tourId ?? null,
    p_preferred_date: input.preferredDate ?? null,
    p_metadata: input.metadata ?? null,
    p_source: "website",
  });

  if (error) {
    console.error("[submitWebLead] RPC error:", error);
    return { ok: false, error: "Something went wrong sending your request. Please try again or message us on WhatsApp." };
  }

  return { ok: true };
}
