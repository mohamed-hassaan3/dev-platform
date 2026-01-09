import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient; pool?: Pool };

function getPrismaClient() {
  // Only create pool and adapter when DATABASE_URL is available (runtime, not build time)
  if (!process.env.DATABASE_URL) {
    // During build time or when DATABASE_URL is not set, return a client without adapter
    // This allows the build to complete without database connection
    return new PrismaClient();
  }

  // Reuse pool if it exists (for hot reloading in development)
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  const adapter = new PrismaPg(globalForPrisma.pool);
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma || getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;