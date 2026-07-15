import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateContactPayload } from "@/lib/contact-validation";
import { sendContactAlertEmail } from "@/lib/email";

/**
 * POST /api/contact
 *
 * 1. Re-validate every field on the server (never trust the client alone)
 * 2. Save a Contact row with status "Pending"
 * 3. Try to email the admin via Resend — email failure must NOT fail the request
 */
export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    // Reject non-object payloads early
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;

    // Server-side validation — same rules as the client, applied again here
    const result = validateContactPayload({
      name: typeof payload.name === "string" ? payload.name : "",
      email: typeof payload.email === "string" ? payload.email : "",
      subject: typeof payload.subject === "string" ? payload.subject : "",
      message: typeof payload.message === "string" ? payload.message : "",
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "Validation failed.", errors: result.errors },
        { status: 400 },
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
        status: "Pending",
      },
    });

    // Email is best-effort: the visitor still sees success if Resend fails
    try {
      await sendContactAlertEmail({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      });
    } catch (emailError) {
      console.error("[api/contact] Resend email failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for reaching out! I'll get back to you soon.",
        id: contact.id,
      },
      { status: 201 },
    );
  } catch (error) {
    // Never leak DB / stack details to the client
    console.error("[api/contact] Failed to save contact:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }
}
