import { QueryClient, useMutation } from 'react-query'
import { Project } from '@prisma/client'
import axios from 'axios'

type Payload = {
  id: number
}

export default function useProjectDelete(queryClient: QueryClient) {
  return useMutation<Project, Error, Payload>(
    ({ id }) => {
      return axios.delete(`/api/projects/${id}`)
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの更新に失敗しました')
    }
  )
}
