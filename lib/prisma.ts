import { PrismaClient } from '@prisma/client'

// Define proper interface for global Prisma
interface GlobalForPrisma {
  prisma: PrismaClient | undefined
}

// Type the global object properly
const globalForPrisma = globalThis as unknown as GlobalForPrisma

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma