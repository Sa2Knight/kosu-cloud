import { QueryClient, useMutation, useQuery } from 'react-query'
import { Project } from '@prisma/client'
import axios from 'axios'

type createMutationVariablesType = {
  id: number
  name: string
}

type updateMutationVariablesType = {
  id: number
  newId: number
  newName: string
}

type deleteMutationVariablesType = {
  id: number
}

export default function useProjects(queryClient: QueryClient) {
  const query = useQuery<Project[], Error>(
    'projects',
    async () => (await fetch('/api/projects').then(res => res.json())) as Project[]
  )

  const createMutation = useMutation<Project, Error, createMutationVariablesType>(
    ({ id, name }) => {
      return axios.post(`/api/projects`, { id, name })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの作成に失敗しました')
    }
  )

  const updateMutation = useMutation<Project, Error, updateMutationVariablesType>(
    ({ id, newId, newName }) => {
      return axios.patch(`/api/projects/${id}`, { id: newId, name: newName })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの更新に失敗しました')
    }
  )

  const deleteMutation = useMutation<Project, Error, deleteMutationVariablesType>(
    ({ id }) => {
      return axios.delete(`/api/projects/${id}`)
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      onError: e => alert('プロジェクトの更新に失敗しました')
    }
  )

  return { query, createMutation, updateMutation, deleteMutation }
}
