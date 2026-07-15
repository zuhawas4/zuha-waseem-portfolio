/**
 * Shared validation for contact form payloads.
 * Used by both the Contact form (client) and /api/contact (server).
 */

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  data: Partial<ContactPayload>,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email is too long.";
  }

  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length > 200) {
    errors.subject = "Subject must be 200 characters or fewer.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 20) {
    errors.message = "Message must be at least 20 characters.";
  } else if (message.length > 5000) {
    errors.message = "Message must be 5000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, email, subject, message },
  };
}
