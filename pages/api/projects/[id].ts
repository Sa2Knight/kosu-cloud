import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

function parseIdFromQuery(req: NextApiRequest): number {
  const id = req.query.id
  return Array.isArray(id) ? Number(id[0]) : Number(id)
}

async function deleteProject(id: number, res: NextApiResponse) {
  await prisma.project.delete({ where: { id } })
  return res.status(200).json({ message: 'success' })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseIdFromQuery(req)
  const project = await prisma.project.findFirst({ where: { id } })
  if (!project) return res.status(404).json({ message: 'not found' })

  switch (req.method) {
    case 'DELETE':
      return await deleteProject(id, res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
