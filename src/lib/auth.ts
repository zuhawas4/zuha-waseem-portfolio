import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Require a logged-in Admin (Supabase session + Profile.role).
 * Use in dashboard pages and protected API routes.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { authUserId: user.id },
  });

  if (!profile || profile.role !== "Admin") {
    redirect("/login?error=unauthorized");
  }

  return { user, profile };
}

/** Same check for API routes — returns null instead of redirecting */
export async function getAdminOrNull() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await prisma.profile.findUnique({
    where: { authUserId: user.id },
  });

  if (!profile || profile.role !== "Admin") return null;

  return { user, profile };
}
