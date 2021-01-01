import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

function parseIdFromQuery(req: NextApiRequest): number {
  const id = req.query.id
  return Array.isArray(id) ? Number(id[0]) : Number(id)
}

function parseRequestBody(req: NextApiRequest) {
  const id = req.body.id as number
  const name = req.body.name as string
  return id && name ? { id, name } : false
}

async function updateProject(id: number, req: NextApiRequest, res: NextApiResponse) {
  const params = parseRequestBody(req)
  if (!params) return res.status(400).json({ message: 'params invalid' })

  if (id !== params.id) {
    const sameIdProject = await prisma.project.findFirst({ where: { id: params.id } })
    if (sameIdProject) return res.status(400).json({ message: 'same id project already exists' })
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: { id: params.id, name: params.name }
  })
  return res.status(200).json(updatedProject)
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
    case 'PATCH':
    case 'PUT':
      return await updateProject(id, req, res)
    case 'DELETE':
      return await deleteProject(id, res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
