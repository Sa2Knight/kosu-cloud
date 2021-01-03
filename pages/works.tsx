import React, { useState } from 'react'
import dayjs from 'dayjs'
import MonthSelector from '../components/MonthSelector'
import useUsers from '../hooks/useUsers'
import { useQueryClient } from 'react-query'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { User } from '@prisma/client'

export default function Works() {
  const usersQuery = useUsers(useQueryClient()).query
  const users = usersQuery.data
  const [currentUserId, setCurrentUserId] = useState<number | null>(null) // FIXME: 美味いこと状態の依存関係作れないかな

  if (usersQuery.isLoading) return <div>...Loading</div>
  if (usersQuery.isError) return <div>...Error</div>
  if (users && currentUserId === null) setCurrentUserId(users[0].id)

  return (
    <div className="works">
      <div className="header">
        <MonthSelector date={dayjs()} fontSize="1.25em" onClickNext={() => {}} onClickPrev={() => {}} />
        <Select value={currentUserId} onChange={e => setCurrentUserId(Number(e.target.value))}>
          {users?.map(user => (
            <MenuItem value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </div>
      <hr />
      <div>工数入力予定地</div>

      <style jsx>{`
        .works {
          padding: 1em;
          .header {
            display: flex;
            justify-content: space-between;
          }
          hr {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
