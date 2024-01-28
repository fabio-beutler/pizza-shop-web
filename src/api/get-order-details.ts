import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import type { OrderStatus } from '@/types/order-status'

export interface GetOrderDetailsParams {
  orderId: string
}

interface GetOrderDetailsQueryParams extends GetOrderDetailsParams {
  open?: boolean
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: Date
  status: OrderStatus
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

async function getOrderDetails(params: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/orders/${params.orderId}`,
  )
  return response.data
}

export function useGetOrderDetailsQuery(params: GetOrderDetailsQueryParams) {
  return useQuery({
    queryKey: ['order', params.orderId],
    queryFn: () => getOrderDetails({ orderId: params.orderId }),
    enabled: params.open ?? true,
  })
}
