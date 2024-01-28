import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { useUpdateOrderStatusMutation } from '@/api/update-order-status'
import {
  NextStepOrderStatus,
  NextStepOrderStatusText,
  type OrderStatusTypes,
} from '@/types/order-status'
import { Button, ButtonLoading } from '@/ui/button'
import { Dialog, DialogTrigger } from '@/ui/dialog'
import { TableCell, TableRow } from '@/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: Date
    status: OrderStatusTypes
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const hasNextStep =
    order.status === 'pending' ||
    order.status === 'processing' ||
    order.status === 'delivering'

  const updateOrderMutation = useUpdateOrderStatusMutation({
    orderId: order.orderId,
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
