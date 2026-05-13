"use client";

import { useState } from "react";

type Props = {
  courseSlug: string;
  courseTitle: string;
  feeUSD: number;
  paymentsEnabled?: boolean;
};

const inputClass =
  "w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 bg-white";

export default function RegistrationForm({
  courseSlug,
  courseTitle,
  feeUSD,
  paymentsEnabled = false,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (!fd.get("terms")) {
      setError("You must accept the terms and conditions to continue.");
      return;
    }

    const payload = {
      courseSlug,
      courseTitle,
      feeUSD,
      participant: {
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        jobTitle: String(fd.get("jobTitle") ?? ""),
        organization: String(fd.get("organization") ?? ""),
        country: String(fd.get("country") ?? ""),
      },
      billing: {
        billingName: String(fd.get("billingName") ?? ""),
        billingEmail: String(fd.get("billingEmail") ?? ""),
        billingAddress: String(fd.get("billingAddress") ?? ""),
        billingCity: String(fd.get("billingCity") ?? ""),
        billingCountry: String(fd.get("billingCountry") ?? ""),
        vatNumber: String(fd.get("vatNumber") ?? ""),
      },
      notes: String(fd.get("notes") ?? ""),
    };

    const endpoint = paymentsEnabled ? "/api/checkout" : "/api/register";
    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { url?: string; redirectUrl?: string; error?: string } =
        await res.json();
      const next = paymentsEnabled ? data.url : data.redirectUrl;
      if (!res.ok || !next) {
        throw new Error(
          data.error ??
            (paymentsEnabled
              ? "Could not start checkout. Please try again."
              : "Could not submit your registration. Please try again."),
        );
      }
      window.location.href = next;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-6 sm:p-8 grid gap-6"
    >
      <div>
        <h2 className="text-xl font-bold mb-1">Participant details</h2>
        <p className="text-sm text-muted">
          The person who will attend the course. Joining instructions will be
          sent to this email.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input required name="firstName" placeholder="First name *" className={inputClass} />
        <input required name="lastName" placeholder="Last name *" className={inputClass} />
        <input required name="email" type="email" placeholder="Email *" className={inputClass} />
        <input required name="phone" placeholder="Phone *" className={inputClass} />
        <input name="jobTitle" placeholder="Job title" className={inputClass} />
        <input name="organization" placeholder="Organisation" className={inputClass} />
        <input required name="country" placeholder="Country *" className={inputClass} />
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="text-xl font-bold mb-1">Billing details</h2>
        <p className="text-sm text-muted mb-3">
          Used for the invoice. Leave blank to reuse the participant details.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="billingName" placeholder="Billing contact name" className={inputClass} />
          <input name="billingEmail" type="email" placeholder="Billing email" className={inputClass} />
          <input name="billingAddress" placeholder="Address line" className={`${inputClass} sm:col-span-2`} />
          <input name="billingCity" placeholder="City" className={inputClass} />
          <input name="billingCountry" placeholder="Country" className={inputClass} />
          <input name="vatNumber" placeholder="VAT / Tax ID (optional)" className={`${inputClass} sm:col-span-2`} />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="text-xl font-bold mb-1">Anything we should know?</h2>
        <textarea
          name="notes"
          rows={3}
          placeholder="Dietary requirements, accessibility needs, group booking notes..."
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-foreground/80">
        <input type="checkbox" name="terms" className="mt-1" />
        <span>
          I accept the terms &amp; conditions and the cancellation policy, and
          confirm the details above are correct.
        </span>
      </label>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-6">
        <div className="text-sm text-muted">
          {paymentsEnabled ? "Total to pay: " : "Course fee: "}
          <span className="font-semibold text-foreground">${feeUSD}.00 USD</span>
          {!paymentsEnabled && (
            <span className="block text-xs mt-1">
              No payment due now — we&rsquo;ll send invoicing details after we
              confirm your seat.
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-brand text-white font-semibold px-6 py-3 text-sm hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting
            ? paymentsEnabled
              ? "Redirecting to payment..."
              : "Submitting..."
            : paymentsEnabled
              ? "Continue to secure payment"
              : "Submit registration"}
        </button>
      </div>
    </form>
  );
}
