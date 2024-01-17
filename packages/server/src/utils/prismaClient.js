import { env } from 'node:process'

import { PrismaClient } from '@prisma/client'

export const prisma = globalThis.prisma || new PrismaClient()

if (env.NODE_ENV === 'development')
  globalThis.prisma = prisma
