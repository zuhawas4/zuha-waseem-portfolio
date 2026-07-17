/**
 * Seed the one-and-only Admin account.
 *
 * Creates the user in Supabase Auth (service role) and a matching Profile row.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Required env (in .env / .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   DATABASE_URL
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 *   ADMIN_NAME (optional)
 */
import "dotenv/config";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local as well (Next.js style)
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Portfolio Admin";

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in env");
  }
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`Seeding admin: ${email}`);

  // Try to find an existing auth user with this email
  const { data: listData, error: listError } =
    await supabase.auth.admin.listUsers({ perPage: 200 });

  if (listError) {
    throw new Error(`Failed to list users: ${listError.message}`);
  }

  let authUserId = listData.users.find(
    (u) => u.email?.toLowerCase() === email,
  )?.id;

  if (authUserId) {
    // Update password / metadata so re-running the script is safe
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      authUserId,
      {
        password,
        email_confirm: true,
        user_metadata: { name, role: "Admin" },
      },
    );
    if (updateError) {
      throw new Error(`Failed to update auth user: ${updateError.message}`);
    }
    console.log("Updated existing Supabase Auth user.");
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "Admin" },
    });
    if (error || !data.user) {
      throw new Error(`Failed to create auth user: ${error?.message}`);
    }
    authUserId = data.user.id;
    console.log("Created Supabase Auth user.");
  }

  const profile = await prisma.profile.upsert({
    where: { authUserId },
    update: { name, email, role: "Admin" },
    create: {
      authUserId,
      name,
      email,
      role: "Admin",
    },
  });

  console.log("Profile ready:", {
    id: profile.id,
    email: profile.email,
    role: profile.role,
  });
  console.log("Done. Log in at /login with ADMIN_EMAIL / ADMIN_PASSWORD.");
}

main()
  .catch((err) => {
    console.error("seed-admin failed:", err.message || err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
