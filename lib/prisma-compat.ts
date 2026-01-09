// Compatibility shim for @auth/prisma-adapter with Prisma 7
// This file provides the runtime library exports that the adapter expects
// The adapter only needs PrismaClientKnownRequestError
// In Prisma 7, it's exported from @prisma/client/runtime/client

export { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

