/**
 * Helpers for IP-based login rate limiting.
 * Blocks after more than 5 failed attempts in a short window.
 */

import { prisma } from "@/lib/prisma";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_MS = 30 * 60 * 1000; // 30 minutes

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function checkLoginRateLimit(ipAddress: string): Promise<{
  allowed: boolean;
  message?: string;
}> {
  const row = await prisma.loginAttempt.findUnique({ where: { ipAddress } });
  if (!row) {
    return { allowed: true };
  }

  if (row.blockedUntil && row.blockedUntil.getTime() > Date.now()) {
    return {
      allowed: false,
      message: "Too many attempts, try again later.",
    };
  }

  // Reset window if last attempt was long ago
  if (Date.now() - row.lastAttemptAt.getTime() > WINDOW_MS) {
    await prisma.loginAttempt.update({
      where: { ipAddress },
      data: { attempts: 0, blockedUntil: null },
    });
  }

  return { allowed: true };
}

export async function recordFailedLogin(ipAddress: string) {
  const existing = await prisma.loginAttempt.findUnique({ where: { ipAddress } });

  if (!existing) {
    await prisma.loginAttempt.create({
      data: { ipAddress, attempts: 1, lastAttemptAt: new Date() },
    });
    return;
  }

  const withinWindow =
    Date.now() - existing.lastAttemptAt.getTime() <= WINDOW_MS;
  const attempts = withinWindow ? existing.attempts + 1 : 1;

  const blockedUntil =
    attempts > MAX_ATTEMPTS ? new Date(Date.now() + BLOCK_MS) : null;

  await prisma.loginAttempt.update({
    where: { ipAddress },
    data: {
      attempts,
      lastAttemptAt: new Date(),
      blockedUntil,
    },
  });
}

export async function resetLoginAttempts(ipAddress: string) {
  await prisma.loginAttempt.upsert({
    where: { ipAddress },
    update: { attempts: 0, blockedUntil: null, lastAttemptAt: new Date() },
    create: { ipAddress, attempts: 0 },
  });
}
