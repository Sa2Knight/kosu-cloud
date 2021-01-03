import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

async function getUsers(res: NextApiResponse) {
  const projects = await prisma.user.findMany()
  return res.status(200).json(projects)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await getUsers(res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
