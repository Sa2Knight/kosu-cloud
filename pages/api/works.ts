import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

// FIXME: どのAPIでも使えそうなので切り出す
function parseQueryValue<T = string>(queryValue: T | T[]) {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue
}

function parseGetQueries(req: NextApiRequest) {
  const userId = parseQueryValue(req.query.userId)
  const dateFrom = parseQueryValue(req.query.dateFrom)
  const dateTo = parseQueryValue(req.query.dateTo)
  return {
    userId: userId ? Number(userId) : undefined,
    dateFrom: dateFrom ? new Date(dateFrom) : new Date('1980/01/01'),
    dateTo: dateTo ? new Date(dateTo) : new Date()
  }
}

async function getWorks(req: NextApiRequest, res: NextApiResponse) {
  const { userId, dateFrom, dateTo } = parseGetQueries(req)
  const works = await prisma.work.findMany({
    where: {
      userId,
      date: {
        gte: dateFrom,
        lte: dateTo
      }
    },
    select: {
      id: true,
      date: true,
      hour: true,
      user: {
        select: {
          id: true,
          name: true
        }
      },
      project: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  return res.status(200).json(works)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await getWorks(req, res)
    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}
