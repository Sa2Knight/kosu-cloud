import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Project } from '@prisma/client'
import { ProjectEditDialog } from '../components/ProjectEditDialog'
import { ProjectCreateDialog } from '../components/ProjectCreateDialog'
import { Fab } from '@material-ui/core'
import BaseTable from '../components/BaseTable'
import AddIcon from '@material-ui/icons/Add'
import useProjectsFetch from '../hooks/projects/useFetch'
import useProjectCreate from '../hooks/projects/useCreate'
import useProjectUpdate from '../hooks/projects/useUpdate'
import useProjectDelete from '../hooks/projects/useDelete'

export default function Projects() {
  const query = useProjectsFetch()
  const createMutation = useProjectCreate(useQueryClient())
  const updateMutation = useProjectUpdate(useQueryClient())
  const deleteMutation = useProjectDelete(useQueryClient())

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (query.isLoading) return <div>...loading</div>
  if (query.error) return <div>{query.error.message}</div>
  if (!query.data) return <div>...failed</div>

  return (
    <div className="projects">
      <BaseTable
        headerValues={['ID', 'プロジェクト名', '累計時間']}
        bodyValuesList={query.data.map(project => [project.id, project.name, 0])}
        onClickRow={row => setSelectedProject(query.data[row])}
      />

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
