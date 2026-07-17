"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessagesSquare, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/contacts",
    label: "Contact Queries",
    icon: MessagesSquare,
  },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <aside className="flex w-full flex-col border-b border-line bg-ink text-sage-light lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
      <div className="px-5 py-6">
        <p className="font-display text-xl text-white">Admin</p>
        <p className="mt-1 truncate text-sm text-sage-muted">{adminName}</p>
      </div>

      <nav className="flex gap-1 px-3 pb-4 lg:flex-1 lg:flex-col" aria-label="Admin">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sage/25 text-white"
                  : "text-sage-light hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-sage-light transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
        <Link
          href="/"
          className="mt-1 block px-3 py-2 text-xs text-sage-muted transition-colors hover:text-sage-light"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
