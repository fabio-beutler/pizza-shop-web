import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export type GetDailyRevenueResponse = {
  date: string
  receipt: number
}[]

interface GetDailyRevenueParams {
  from?: Date
  to?: Date
}

export async function getDailyRevenue(params: GetDailyRevenueParams) {
  const response = await api.get<GetDailyRevenueResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params,
    },
  )
  return response.data
}

export function useGetDailyRevenueQuery(params: GetDailyRevenueParams) {
  return useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', params],
    queryFn: () => getDailyRevenue(params),
  })
}
