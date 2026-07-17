import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminOrNull } from "@/lib/auth";

const ALLOWED = new Set(["Pending", "Done", "Completed", "Resolved"]);

/**
 * PATCH /api/contacts/[id]/status
 * Admin-only — update a contact submission status.
 */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminOrNull();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const status =
      body && typeof body === "object" && "status" in body
        ? String((body as { status: unknown }).status)
        : "";

    if (!ALLOWED.has(status)) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Use Pending, Done, Completed, or Resolved.",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.contact.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 });
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      contact: {
        id: updated.id,
        status: updated.status,
      },
    });
  } catch (error) {
    console.error("[api/contacts/status]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
