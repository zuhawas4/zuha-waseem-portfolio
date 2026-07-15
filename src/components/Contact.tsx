"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialValues: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Client-side validation helpers.
 * Server-side validation will be added in Phase 3/4 when the API is wired up.
 */
function validate(values: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    field: keyof FormFields,
    value: string,
  ) => {
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

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // Phase 1: simulate submit UI states.
    // Phase 3 will replace this with a real POST to /api/contact.
    setStatus("loading");
    setStatusMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Placeholder success — backend wiring comes in Phase 3
      setStatus("success");
      setStatusMessage(
        "Thanks for reaching out! Your message is ready to send once the contact API is connected.",
      );
      setValues(initialValues);
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please try again in a moment.",
      );
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
