import { QueryClient, useQuery } from 'react-query'
import { Work } from '@prisma/client'

// FIXME: せっかくサーバと密なんだからこれ共有できるのでは
type WorksResponse = {
  id: number
  date: string
  hour: number
  user: {
    id: number
    name: string
  }
  project: {
    id: number
    name: string
  }
}[]

export default function useWorks(queryClient: QueryClient) {
  const query = useQuery<WorksResponse, Error>(
    'works',
    async () => (await fetch('/api/works').then(res => res.json())) as WorksResponse
  )

  return { query }
}
