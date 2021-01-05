import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Project } from '@prisma/client'
import { ProjectEditDialog } from '../components/ProjectEditDialog'
import { ProjectCreateDialog } from '../components/ProjectCreateDialog'
import { Fab } from '@material-ui/core'
import BaseTable from '../components/BaseTable'
import AddIcon from '@material-ui/icons/Add'
import useProjects from '../hooks/useProjects'

export default function Projects() {
  const { query, createMutation, updateMutation, deleteMutation } = useProjects(useQueryClient())
  const { isLoading, data, error } = query

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (isLoading) return <div>...loading</div>
  if (error) return <div>{error.message}</div>
  if (!data) return <div>...failed</div>

  return (
    <div className="projects">
      <BaseTable
        key="id"
        headerValues={['ID', 'プロジェクト名', '累計時間']}
        bodyValuesList={data.map(project => [project.id, project.name, 0])}
        onClickRow={row => setSelectedProject(data[row])}
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
