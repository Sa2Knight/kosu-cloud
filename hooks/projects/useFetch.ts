import { QueryClient, useQuery } from 'react-query'
import { Project } from '@prisma/client'

export default function useProjectsFetch() {
  return useQuery<Project[], Error>(
    'projects',
    async () => (await fetch('/api/projects').then(res => res.json())) as Project[]
  )
}
