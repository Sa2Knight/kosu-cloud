import { useQuery } from 'react-query'
import axios from 'axios'
import { Dayjs } from 'dayjs'

// FIXME: せっかくサーバと密なんだからこれ共有できるのでは
type WorksResponse = {
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

export default function useWorks(userId: number, date?: Dayjs) {
  const params = {
    userId,
    dateFrom: date?.startOf('month').format('YYYY/MM/DD'),
    dateTo: date?.endOf('month').format('YYYY/MM/DD')
  }
  const query = useQuery<WorksResponse, Error>(['works', { userId, date }], async () => {
    const response = await axios.get('/api/works', { params })
    return response.data as WorksResponse
  })

  return { query }
}
