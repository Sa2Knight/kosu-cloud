import { QueryClient, useMutation } from 'react-query'
import { Project } from '@prisma/client'
import axios from 'axios'

type Payload = {
  id: number
  name: string
}

export default function useProjectCreate(queryClient: QueryClient) {
  return useMutation<Project, Error, Payload>(
    ({ id, name }) => {
      return axios.post(`/api/projects`, { id, name })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの作成に失敗しました')
    }
  )
}
