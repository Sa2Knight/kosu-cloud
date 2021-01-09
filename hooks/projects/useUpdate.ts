import { QueryClient, useMutation } from 'react-query'
import { Project } from '@prisma/client'
import axios from 'axios'

type Payload = {
  id: number
  newId: number
  newName: string
}

export default function useProjectUpdate(queryClient: QueryClient) {
  return useMutation<Project, Error, Payload>(
    ({ id, newId, newName }) => {
      return axios.patch(`/api/projects/${id}`, { id: newId, name: newName })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの更新に失敗しました')
    }
  )
}
