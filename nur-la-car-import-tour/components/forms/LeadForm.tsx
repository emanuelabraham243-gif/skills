"use client";

import { useState, type FormEvent } from "react";
import { submitWebLead } from "@/lib/leads";
import type { LeadType } from "@/lib/types";

export interface LeadFormField {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea" | "date" | "number" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** base WebLeadInput field this maps to; anything else goes into metadata */
  mapsTo?: "fullName" | "phone" | "email" | "message" | "preferredDate";
}

const baseFields: LeadFormField[] = [
  { name: "fullName", label: "Full name", type: "text", required: true, mapsTo: "fullName" },
  { name: "phone", label: "Phone number", type: "tel", required: true, mapsTo: "phone", placeholder: "09xx xxx xxx" },
];

export default function LeadForm({
  leadType,
  carId,
  tourId,
  fields,
  staticMetadata,
  submitLabel,
  successMessage = "Thanks — we've received your request and will reach out shortly, usually within a few hours.",
  compact = false,
}: {
  leadType: LeadType;
  carId?: string;
  tourId?: string;
  fields: LeadFormField[];
  staticMetadata?: Record<string, unknown>;
  submitLabel: string;
  successMessage?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const allFields = [...baseFields, ...fields];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const base: Record<string, string> = {};
    const metadata: Record<string, unknown> = { ...staticMetadata };

    for (const field of allFields) {
      const value = formData.get(field.name);
      if (typeof value !== "string") continue;
      if (field.mapsTo) base[field.mapsTo] = value;
      else if (value) metadata[field.name] = value;
    }

    const result = await submitWebLead({
      leadType,
      carId,
      tourId,
      fullName: base.fullName ?? "",
      phone: base.phone ?? "",
      email: base.email || undefined,
      message: base.message || undefined,
      preferredDate: base.preferredDate || undefined,
      metadata: Object.keys(metadata).length ? metadata : undefined,
    });

    if (result.ok) {
      setStatus("success");
      e.currentTarget.reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent-soft/50 bg-accent-soft/15 p-5 text-sm text-ink">
        {successMessage}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        {allFields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
              {field.required && <span className="text-accent"> *</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select id={field.name} name={field.name} required={field.required} className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
