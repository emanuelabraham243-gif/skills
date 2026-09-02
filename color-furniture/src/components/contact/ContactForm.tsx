"use client";

import { useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/data/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Hello ${site.name}, my name is ${name}.`,
      phone && `Phone: ${phone}`,
      email && `Email: ${email}`,
      message && `Message: ${message}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Name" htmlFor="name" required>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your full name"
          className="w-full border border-line bg-ivory px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal-soft/40 focus:border-charcoal focus:outline-none"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" required>
          <input
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="+251 9xx xxx xxx"
            className="w-full border border-line bg-ivory px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal-soft/40 focus:border-charcoal focus:outline-none"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full border border-line bg-ivory px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal-soft/40 focus:border-charcoal focus:outline-none"
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="message" required>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell us about your space, or the piece you're looking for…"
          className="w-full resize-none border border-line bg-ivory px-4 py-3 text-[14px] text-charcoal placeholder:text-charcoal-soft/40 focus:border-charcoal focus:outline-none"
        />
      </Field>

      <button
        type="submit"
        className="w-full bg-charcoal py-4 text-[13px] uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-wood-dark sm:w-auto sm:px-10"
      >
        Send Message
      </button>

      {sent && (
        <p role="status" className="text-[13px] text-charcoal-soft/70">
          Opening WhatsApp with your message — if it didn&rsquo;t open, message us
          directly at {site.phone}.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
        {label} {required && <span className="text-wood-dark">*</span>}
      </label>
      {children}
    </div>
  );
}
