import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export interface GetOrdersSearchParams {
  pageIndex?: number
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

async function getOrders(searchParams: GetOrdersSearchParams) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: searchParams,
  })

  return response.data
}

export function useGetOrdersQuery(searchParams: GetOrdersSearchParams) {
  return useQuery({
    queryKey: ['orders', ...Object.values(searchParams)],
    queryFn: () => getOrders(searchParams),
  })
}
