import { useQuery } from 'react-query'
import { User } from '@prisma/client'

export default function useUsersFetch() {
  return useQuery<User[], Error>(
    'users',
    async () => (await fetch('/api/users').then(res => res.json())) as User[]
  )
}
