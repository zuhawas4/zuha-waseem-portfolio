"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const STATUSES = ["Pending", "Done", "Completed", "Resolved"] as const;

type ContactRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export default function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateStatus = async (id: string, status: string) => {
    setError("");
    setPendingId(id);

    try {
      const res = await fetch(`/api/contacts/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not update status.");
        return;
      }

      startTransition(() => {
        router.refresh();
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPendingId(null);
    }
  };

  if (contacts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
        No contact queries yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-line bg-surface-elevated">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-sage-light/30 text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">Subject / message</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {contacts.map((contact) => (
              <tr key={contact.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-ink">{contact.name}</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sage-dark hover:underline"
                  >
                    {contact.email}
                  </a>
                </td>
                <td className="px-4 py-4 max-w-md">
                  <p className="font-medium text-ink">
                    {contact.subject || "No subject"}
                  </p>
                  <p className="mt-1 line-clamp-3 text-ink-soft">
                    {contact.message}
                  </p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-ink-soft">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  <select
                    value={contact.status}
                    disabled={pendingId === contact.id || isPending}
                    onChange={(e) => updateStatus(contact.id, e.target.value)}
                    className="rounded-md border border-line bg-white px-2.5 py-2 text-sm text-ink outline-none focus:border-sage disabled:opacity-60"
                    aria-label={`Status for ${contact.name}`}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
