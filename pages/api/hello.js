// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    await prisma.table_user.create({
        data: {
          name: 'Alice',
          // email: 'alice@prisma.io',
        },
  })
  res.status(200).json({ name: 'John Doe' })
}
