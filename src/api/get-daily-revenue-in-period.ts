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
      params: {
        from: params.from,
        to: params.to,
      },
    },
  )
  return response.data
}
