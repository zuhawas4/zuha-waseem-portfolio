import { PrismaClient } from "@prisma/client";

/**
 * Shared Prisma client for the Next.js app.
 *
 * In development, Next.js hot-reloads modules — without this singleton,
 * you'd create a new DB connection on every reload and exhaust the pool.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
