import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import MonthSelector from '../components/MonthSelector'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import BaseTable from '../components/BaseTable'
import useUsersFetch from '../hooks/users/useFetch'
import useWorksFetch from '../hooks/works/useFetch'

export default function Works() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [currentUserId, setCurrentUserId] = useState<number>(-1) // FIXME: 美味いこと状態の依存関係作れないかな
  const usersQuery = useUsersFetch()
  const worksQuery = useWorksFetch(currentUserId, currentDate)

  const users = usersQuery.data
  const works = worksQuery.data

  if (usersQuery.isError || worksQuery.isError) return <div>...Error</div>
  if (usersQuery.isLoading || worksQuery.isLoading) return <div>...Loading</div>
  if (!users || !works) return <div>...Loading</div>

  if (currentUserId === -1) setCurrentUserId(users[0].id)

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
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <hr />
      <div className="table-wrapper">
        <BaseTable
          headerValues={['日付', 'プロジェクト名', 'ユーザー名', '時間']}
          bodyValuesList={works.map(work => [
            dayjs(work.date).format('YYYY/MM/DD'),
            work.project.name,
            work.user.name,
            work.hour
          ])}
          onClickRow={_ => {}}
        />
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
