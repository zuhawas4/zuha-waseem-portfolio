import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import ContactsTable from "@/components/admin/ContactsTable";

export const metadata = {
  title: "Contact Queries — Zuha Waseem",
};

export default async function ContactsPage() {
  await requireAdmin();

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = contacts.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    subject: c.subject,
    message: c.message,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
        Inbox
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        Contact Queries
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft">
        Review submissions and update their status.
      </p>

      <div className="mt-8">
        <ContactsTable contacts={rows} />
      </div>
    </div>
  );
}
