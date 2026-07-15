"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  validateContactPayload,
  type ContactFieldErrors,
  type ContactPayload,
} from "@/lib/contact-validation";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialValues: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (field: keyof ContactPayload, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear field error as the user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Client-side check first (same rules as the API)
    const clientResult = validateContactPayload(values);
    if (!clientResult.ok) {
      setErrors(clientResult.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientResult.data),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        errors?: ContactFieldErrors;
      };

      if (!response.ok) {
        // Show field errors from the server when present
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
        setStatusMessage(
          data.error ?? "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        data.message ?? "Thanks for reaching out! I'll get back to you soon.",
      );
      setValues(initialValues);
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl"
          >
            Let&apos;s build something together
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Have a project, question, or opportunity? Send a message and
            I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
          aria-describedby={
            status === "success" || status === "error"
              ? "contact-status"
              : undefined
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Name <span className="text-danger">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-soft/50 ${
                  errors.name
                    ? "border-danger"
                    : "border-line focus:border-sage"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-danger" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-soft/50 ${
                  errors.email
                    ? "border-danger"
                    : "border-line focus:border-sage"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-danger" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Subject <span className="text-danger">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-soft/50 ${
                errors.subject
                  ? "border-danger"
                  : "border-line focus:border-sage"
              }`}
              placeholder="What's this about?"
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-sm text-danger" role="alert">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full resize-y rounded-md border bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-soft/50 ${
                errors.message
                  ? "border-danger"
                  : "border-line focus:border-sage"
              }`}
              placeholder="Tell me a bit about your project or question..."
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-sm text-danger" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Status banners */}
          {status === "success" && (
            <div
              id="contact-status"
              className="flex items-start gap-2 rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
              role="status"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p>{statusMessage}</p>
            </div>
          )}

          {status === "error" && (
            <div
              id="contact-status"
              className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              role="alert"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p>{statusMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-11 min-w-[9rem] items-center justify-center gap-2 rounded-md bg-sage px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>Sending…</span>
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
