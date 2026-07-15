import { Resend } from "resend";

/**
 * Sends an admin notification email after a contact form submission.
 * Uses Resend — https://resend.com/docs
 *
 * Required env:
 * - RESEND_API_KEY
 * - ADMIN_EMAIL          (inbox that receives alerts)
 * - RESEND_FROM_EMAIL    (optional; defaults to Resend onboarding sender)
 */
export async function sendContactAlertEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured.");
  }

  const resend = new Resend(apiKey);

  // Short snippet for the email body / subject line
  const snippet =
    input.message.length > 160
      ? `${input.message.slice(0, 157).trim()}...`
      : input.message;

  const result = await resend.emails.send({
    from: fromEmail,
    to: [adminEmail],
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    text: [
      "You received a new contact form submission.",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject}`,
      "",
      "Message:",
      input.message,
      "",
      `Snippet: ${snippet}`,
    ].join("\n"),
    html: `
      <div style="font-family: Georgia, serif; color: #1a221c; line-height: 1.5;">
        <h2 style="color: #5a7354;">New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f7f3; padding: 12px; border-radius: 8px;">
          ${escapeHtml(input.message)}
        </p>
        <p style="color: #4a5a50; font-size: 14px;"><strong>Snippet:</strong> ${escapeHtml(snippet)}</p>
      </div>
    `,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
