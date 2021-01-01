import { useQueryClient, useMutation, useQuery } from 'react-query'
import React, { useState } from 'react'
import { Project } from '@prisma/client'
import { ProjectEditDialog } from '../components/ProjectEditDialog'
import { ProjectCreateDialog } from '../components/ProjectCreateDialog'
import { makeStyles } from '@material-ui/core'
import { Paper, Fab } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
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

// FIXME: BaseTable 的なコンポーネントに切り出す
const useStyles = makeStyles({
  container: {
    maxHeight: '100%'
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }
})

export default function Projects() {
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // FIXME: queryHook は切り出す?
  const queryClient = useQueryClient()
  const { isLoading, data, error } = useQuery<Project[], Error>(
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

  const tableClasses = useStyles()

  if (isLoading) return <div>...loading</div>
  if (error) return <div>{error.message}</div>
  if (!data) return <div>...failed</div>

  return (
    <div className="projects">
      <TableContainer className={tableClasses.container} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>プロジェクト名</TableCell>
              <TableCell>累計時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(project => (
              <TableRow
                className={tableClasses.row}
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <TableCell component="th" scope="row">
                  {project.id}
                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isOpenCreateDialog ? (
        <ProjectCreateDialog
          onCreate={(id, name) => createMutation.mutate({ id, name })}
          onClose={() => setIsOpenCreateDialog(false)}
        />
      ) : null}

      {selectedProject ? (
        <ProjectEditDialog
          id={selectedProject.id}
          name={selectedProject.name}
          onUpdate={(newId, newName) => updateMutation.mutate({ id: selectedProject.id, newId, newName })}
          onDelete={() => deleteMutation.mutate({ id: selectedProject.id })}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}

      <div className="floating-icon">
        <Fab color="primary" aria-label="add" onClick={() => setIsOpenCreateDialog(true)}>
          <AddIcon />
        </Fab>
      </div>

      <style jsx>{`
        .projects {
          position: relative;
          height: 100%;
          .floating-icon {
            position: absolute;
            bottom: 15px;
            right: 15px;
          }
        }
      `}</style>
    </div>
  )
}
