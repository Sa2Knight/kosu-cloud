import { useQuery } from 'react-query'
import axios from 'axios'
import { Dayjs } from 'dayjs'

// FIXME: せっかくサーバと密なんだからこれ共有できるのでは
type Response = {
  id: number
  date: string
  hour: number
  user: {
    id: number
    name: string
  }
  project: {
    id: number
    name: string
  }
}[]

export default function useWorksFetch(userId: number, date?: Dayjs) {
  const params = {
    userId,
    dateFrom: date?.startOf('month').format('YYYY/MM/DD'),
    dateTo: date?.endOf('month').format('YYYY/MM/DD')
  }
  return useQuery<Response, Error>(['works', { userId, date }], async () => {
    const response = await axios.get('/api/works', { params })
    return response.data as Response
  })
}
