import { QueryClient, useMutation, useQuery } from 'react-query'
import { User } from '@prisma/client'

export default function useUsers(queryClient: QueryClient) {
  const query = useQuery<User[], Error>(
    'users',
    async () => (await fetch('/api/users').then(res => res.json())) as User[]
  )

  return { query }
}
