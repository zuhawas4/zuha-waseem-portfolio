import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Dashboard — Zuha Waseem",
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-elevated p-5">
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-4xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-sage-dark">{hint}</p>
    </div>
  );
}

export default async function DashboardPage() {
  await requireAdmin();

  const [total, pending, done, completed, resolved, recent] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "Pending" } }),
    prisma.contact.count({ where: { status: "Done" } }),
    prisma.contact.count({ where: { status: "Completed" } }),
    prisma.contact.count({ where: { status: "Resolved" } }),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const finished = done + completed + resolved;

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
        Overview
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        Dashboard
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft">
        Contact submissions from your portfolio form.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total contacts" value={total} hint="All time" />
        <StatCard label="Pending" value={pending} hint="Needs attention" />
        <StatCard
          label="Resolved / done"
          value={finished}
          hint="Done + Completed + Resolved"
        />
        <StatCard
          label="Completed"
          value={completed}
          hint="Marked completed"
        />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-ink">Recent contacts</h2>
          <Link
            href="/dashboard/contacts"
            className="text-sm font-semibold text-sage-dark hover:text-ink"
          >
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
            No contact messages yet.
          </p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface-elevated">
            {recent.map((contact) => (
              <li
                key={contact.id}
                className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-ink">{contact.name}</p>
                  <p className="truncate text-sm text-ink-soft">
                    {contact.subject || "No subject"} — {contact.email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-sm">
                  <span className="rounded-md bg-sage/10 px-2 py-0.5 font-medium text-sage-dark">
                    {contact.status}
                  </span>
                  <time className="text-ink-soft">
                    {contact.createdAt.toLocaleDateString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
