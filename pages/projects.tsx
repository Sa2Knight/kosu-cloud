import { useQuery } from 'react-query'
import React, { useState } from 'react'
import { Project } from '@prisma/client'
import { ProjectDialog } from '../components/ProjectDialog'
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'

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
  const [isOpenProjectDialog, setIsOpenProjectDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  // FIXME: queryHook は切り出す?
  const { isLoading, data, error } = useQuery<Project[], Error>(
    'projects',
    async () => (await fetch('/api/projects').then(res => res.json())) as Project[]
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
                onClick={() => {
                  setSelectedProject(project)
                  setIsOpenProjectDialog(true)
                }}
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

      <ProjectDialog
        open={isOpenProjectDialog}
        onClose={() => setIsOpenProjectDialog(false)}
        id={selectedProject?.id}
        name={selectedProject?.name}
      />

      <style jsx>{`
        .projects {
          height: 100%;
        }
      `}</style>
    </div>
  )
}
