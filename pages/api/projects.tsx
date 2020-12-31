import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function fetchAllProjects() {
  return prisma.project.findMany()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const projects = await fetchAllProjects()
      return res.status(200).json({ projects })
  }
}
