import { api } from '@/lib/axios'

type OrderStatus = 'canceled' | 'processing' | 'delivering' | 'delivered'

enum OrderStatusPatchPath {
  canceled = 'cancel',
  processing = 'approve',
  delivering = 'dispatch',
  delivered = 'deliver',
}

interface UpdateOrderStatusParams {
  orderId: string
  status: OrderStatus
}

export async function updateOrderStatus(params: UpdateOrderStatusParams) {
  await api.patch(
    `/orders/${params.orderId}/${OrderStatusPatchPath[params.status]}`,
  )
}
