import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { GetOrdersResponse } from '@/api/get-orders'
import { updateOrderStatus } from '@/api/update-order-status'
import { Button, ButtonLoading } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

enum NextStepOrderStatus {
  pending = 'processing',
  processing = 'delivering',
  delivering = 'delivered',
}

enum NextStepOrderStatusText {
  pending = 'Aprovar',
  processing = 'Em entrega',
  delivering = 'Entregue',
}

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  const hasNextStep =
    order.status === 'pending' ||
    order.status === 'processing' ||
    order.status === 'delivering'

  const updateOrderMutation = useMutation({
    mutationKey: ['update-order-status', order.orderId],
    mutationFn: updateOrderStatus,
    onSuccess: async (_, { orderId, status }) => {
      queryClient.setQueriesData<GetOrdersResponse>(
        { queryKey: ['orders'] },
        (cached) => {
          if (!cached) return
          return {
            ...cached,
            orders: cached.orders.map((order) => {
              if (order.orderId !== orderId) return order
              return { ...order, status }
            }),
          }
        },
      )
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {hasNextStep &&
          (Object.values(NextStepOrderStatus).includes(
            updateOrderMutation.variables?.status as NextStepOrderStatus,
          ) && updateOrderMutation.isPending ? (
            <ButtonLoading disabled variant="outline" size="xs">
              {
                NextStepOrderStatusText[
                  order.status as keyof typeof NextStepOrderStatus
                ]
              }
            </ButtonLoading>
          ) : (
            <Button
              onClick={() =>
                updateOrderMutation.mutate({
                  orderId: order.orderId,
                  status:
                    NextStepOrderStatus[
                      order.status as keyof typeof NextStepOrderStatus
                    ],
                })
              }
              variant="outline"
              size="xs"
            >
              <ArrowRight className="mr-2 size-3" />
              {
                NextStepOrderStatusText[
                  order.status as keyof typeof NextStepOrderStatus
                ]
              }
            </Button>
          ))}
      </TableCell>
      <TableCell>
        {updateOrderMutation.variables?.status === 'canceled' &&
        updateOrderMutation.isPending ? (
          <ButtonLoading disabled variant="ghost" size="xs">
            Cancelando
          </ButtonLoading>
        ) : (
          <Button
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              (updateOrderMutation.variables?.status === 'canceled' &&
                updateOrderMutation.isPending)
            }
            onClick={() =>
              updateOrderMutation.mutate({
                orderId: order.orderId,
                status: 'canceled',
              })
            }
            variant="ghost"
            size="xs"
          >
            <X className="mr-2 size-3" />
            Cancelar
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
