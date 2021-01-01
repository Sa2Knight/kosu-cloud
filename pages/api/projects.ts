import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  log: ['query']
})

function parseRequestBody(req: NextApiRequest) {
  const id = req.body.id as number
  const name = req.body.name as string
  return id && name ? { id, name } : false
}

async function getProjects(res: NextApiResponse) {
  const projects = await prisma.project.findMany()
  return res.status(200).json(projects)
}

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  const params = parseRequestBody(req)
  if (!params) return res.status(400).json({ message: 'params invalid' })

  const existProject = await prisma.project.findFirst({ where: { id: params.id } })
  if (existProject) return res.status(400).json({ message: 'project already exists' })

  const createdProject = await prisma.project.create({ data: { id: params.id, name: params.name } })
  return res.status(200).json(createdProject)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await getProjects(res)
    case 'POST':
      return await createProject(req, res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
