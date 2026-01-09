import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// For prisma generate, we can use a placeholder if DATABASE_URL is not set
// The actual connection is handled in lib/prisma.ts
const databaseUrl = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
    ...(process.env.DIRECT_URL && { directUrl: process.env.DIRECT_URL }),
  },
});

