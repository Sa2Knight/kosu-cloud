import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

function parseIdFromQuery(req: NextApiRequest): number {
  const id = req.query.id
  return Array.isArray(id) ? Number(id[0]) : Number(id)
}

function fetchProject(id: number) {
  return prisma.project.findFirst({ where: { id } })
}

function deleteProject(id: number) {
  return prisma.project.delete({ where: { id } })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseIdFromQuery(req)
  const project = await fetchProject(id)
  if (!project) return res.status(404).json({ message: 'not found' })

  switch (req.method) {
    case 'DELETE':
      await deleteProject(project.id)
      return res.status(200).json({ message: 'success' })
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
