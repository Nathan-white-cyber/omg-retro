"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  orderNumber: z.string().optional(),
  subject: z.enum([
    "General Inquiry",
    "Order Issue",
    "Return Request",
    "Warranty Claim",
    "Authenticity Question",
    "Other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactFormData, string>>;

const initialForm: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  orderNumber: "",
  subject: "General Inquiry",
  message: "",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto h-14 w-14 rounded-full bg-status-success/10 p-3 text-status-success" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-[12px] font-bold text-brand-red">{message}</p> : null;
}

const inputClass =
  "h-11 w-full rounded-btn border border-[#333] bg-[#1A1A1A] px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-red focus:ring-2 focus:ring-brand-red/25";

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [sentData, setSentData] = useState<ContactFormData | null>(null);

  const setValue = (key: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const nextErrors: ContactErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          nextErrors[field as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    window.setTimeout(() => {
      console.log("CONTACT FORM SUBMITTED:", result.data);
      setIsSending(false);
      setSentData(result.data);
    }, 1000);
  };

  if (sentData) {
    return (
      <div className="rounded-card border border-border-cream bg-bg-cream p-8 text-center">
        <CheckIcon />
        <h3 className="mt-4 font-display text-5xl uppercase leading-none text-text-dark">
          MESSAGE SENT!
        </h3>
        <p className="mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-text-dark-muted">
          Thank you {sentData.firstName}. We will get back to you at {sentData.email} within 24 hours.
        </p>
        <button
          type="button"
          className="mt-6 h-11 rounded-btn border border-border-cream px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red"
          onClick={() => {
            setForm(initialForm);
            setSentData(null);
            setErrors({});
          }}
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">First Name</span>
          <input
            required
            value={form.firstName}
            onChange={(event) => setValue("firstName", event.target.value)}
            className={inputClass}
          />
          <ErrorText message={errors.firstName} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Last Name</span>
          <input
            required
            value={form.lastName}
            onChange={(event) => setValue("lastName", event.target.value)}
            className={inputClass}
          />
          <ErrorText message={errors.lastName} />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setValue("email", event.target.value)}
          className={inputClass}
        />
        <ErrorText message={errors.email} />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Order number optional</span>
        <input
          value={form.orderNumber}
          onChange={(event) => setValue("orderNumber", event.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Subject</span>
        <select
          value={form.subject}
          onChange={(event) => setValue("subject", event.target.value)}
          className={inputClass}
        >
          {[
            "General Inquiry",
            "Order Issue",
            "Return Request",
            "Warranty Claim",
            "Authenticity Question",
            "Other",
          ].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ErrorText message={errors.subject} />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Message</span>
        <textarea
          rows={6}
          value={form.message}
          onChange={(event) => setValue("message", event.target.value)}
          className="w-full rounded-btn border border-[#333] bg-[#1A1A1A] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-red focus:ring-2 focus:ring-brand-red/25"
        />
        <ErrorText message={errors.message} />
      </label>

      <button
        type="submit"
        disabled={isSending}
        className="h-11 w-full rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70 md:w-auto"
      >
        {isSending ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
