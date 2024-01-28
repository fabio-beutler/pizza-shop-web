import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { GetOrdersResponse } from './get-orders'

enum OrderStatusPatchPath {
  canceled = 'cancel',
  processing = 'approve',
  delivering = 'dispatch',
  delivered = 'deliver',
}

interface UpdateOrderStatusParams {
  orderId: string
  status: keyof typeof OrderStatusPatchPath
}

export async function updateOrderStatus(params: UpdateOrderStatusParams) {
  await api.patch(
    `/orders/${params.orderId}/${OrderStatusPatchPath[params.status]}`,
  )
}

export function useUpdateOrderStatusMutation(
  params: Pick<UpdateOrderStatusParams, 'orderId'>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-order-status', params.orderId],
    mutationFn: updateOrderStatus,
    onSuccess: async (_, variables) => {
      queryClient.setQueriesData<GetOrdersResponse>(
        { queryKey: ['orders'] },
        (cached) => {
          if (!cached) return
          return {
            ...cached,
            orders: cached.orders.map((order) => {
              if (order.orderId !== variables.orderId) return order
              return { ...order, status: variables.status }
            }),
          }
        },
      )
    },
  })
}
