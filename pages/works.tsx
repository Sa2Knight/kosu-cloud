import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import MonthSelector from '../components/MonthSelector'
import useUsers from '../hooks/useUsers'
import { useQueryClient } from 'react-query'
import { makeStyles, Paper, Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import useWorks from '../hooks/useWorks'

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

export default function Works() {
  const queryClient = useQueryClient()
  const usersQuery = useUsers(queryClient).query
  const worksQuery = useWorks(queryClient).query
  const tableClasses = useStyles()
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [currentUserId, setCurrentUserId] = useState<number | null>(null) // FIXME: 美味いこと状態の依存関係作れないかな

  const users = usersQuery.data
  const works = worksQuery.data

  if (usersQuery.isError || worksQuery.isError) return <div>...Error</div>
  if (!users || !works) return <div>...Loading</div>

  if (currentUserId === null) setCurrentUserId(users[0].id)

  return (
    <div className="works">
      <div className="header">
        <MonthSelector
          date={currentDate}
          fontSize="1.25em"
          onClickNext={() => setCurrentDate(currentDate.add(1, 'month'))}
          onClickPrev={() => setCurrentDate(currentDate.add(-1, 'month'))}
        />
        <Select value={currentUserId} onChange={e => setCurrentUserId(Number(e.target.value))}>
          {users?.map(user => (
            <MenuItem value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </div>
      <hr />
      <div className="table-wrapper">
        <TableContainer className={tableClasses.container} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>プロジェクト名</TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {works.map(work => (
                <TableRow className={tableClasses.row} key={work.id} onClick={() => {}}>
                  <TableCell component="th" scope="row">
                    {dayjs(work.date).format('YYYY/MM')}
                  </TableCell>
                  <TableCell>{work.project.name}</TableCell>
                  <TableCell>{work.user.name}</TableCell>
                  <TableCell>{work.hour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <style jsx>{`
        .works {
          position: relative;
          padding: 10px;
          box-sizing: border-box;
          height: 100%;
          .header {
            display: flex;
            height: 32px;
            justify-content: space-between;
            align-content: center;
          }
          hr {
            margin-top: 10px;
            margin-bottom: 10px;
            opacity: 0.7;
          }
          .table-wrapper {
            position: relative;
            height: calc(100% - 64px);
          }
        }
      `}</style>
    </div>
  )
}
