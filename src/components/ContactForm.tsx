"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="lg:col-span-2 rounded-2xl bg-white border border-border p-8 grid gap-3"
    >
      <h3 className="text-2xl font-bold mb-2">Send us a message</h3>

      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input required name="fullName" placeholder="Full name" className={inputClass} />
        <input required type="email" name="email" placeholder="Email" className={inputClass} />
      </div>
      <input name="phone" placeholder="Phone" className={inputClass} />
      <input name="subject" placeholder="Subject" className={inputClass} />
      <textarea
        required
        name="message"
        rows={6}
        placeholder="Your message"
        className={inputClass}
      />

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="rounded-md bg-brand text-white font-semibold px-4 py-2.5 text-sm hover:bg-brand-dark transition-colors w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status.kind === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status.kind === "success" && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
          Thanks — your message was received. We&rsquo;ll respond within one business day.
        </p>
      )}
      {status.kind === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {status.message}
        </p>
      )}
    </form>
  );
}
