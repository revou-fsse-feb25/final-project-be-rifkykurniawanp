import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Di Edge function, PrismaClient **tidak boleh disimpan global**
export const prisma = new PrismaClient().$extends(withAccelerate())
