import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireAdmin();

  return (
    <div className="page-atmosphere flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar adminName={profile.name} />
      <div className="flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
}
