import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateContactPayload } from "@/lib/contact-validation";

/**
 * POST /api/contact
 * Accepts a contact form submission, validates it server-side,
 * and stores a new Contact row with status "Pending".
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

    const payload =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};

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
