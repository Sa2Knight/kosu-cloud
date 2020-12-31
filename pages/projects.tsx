import { useQuery } from 'react-query'
import React from 'react'
import { Project } from '@prisma/client'
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

const useStyles = makeStyles({
  container: {
    maxHeight: '100%'
  }
})

export default function Projects() {
  const tableClasses = useStyles()
  const { isLoading, data, error } = useQuery<Project[], Error>(
    'projects',
    async () => (await fetch('/api/projects').then(res => res.json())) as Project[]
  )

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
              <TableRow key={project.id}>
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

      <style jsx>{`
        .projects {
          height: 100%;
        }
      `}</style>
    </div>
  )
}
