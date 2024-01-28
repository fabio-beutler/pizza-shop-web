import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { useUpdateOrderStatusMutation } from '@/api/update-order-status'
import { currencyFormat } from '@/lib/format'
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

  const updateOrderMutation = useUpdateOrderStatusMutation({
    orderId: order.orderId,
  })

  const hasNextStep =
    ['pending', 'processing', 'delivering'].includes(order.status) &&
    !updateOrderMutation.isPending

  const isLoadingNextStep =
    Object.values(NextStepOrderStatus).includes(
      updateOrderMutation.variables?.status as NextStepOrderStatus,
    ) && updateOrderMutation.isPending

  const isCancelingOrder =
    updateOrderMutation.variables?.status === 'canceled' &&
    updateOrderMutation.isPending

  const nextStepOrderStatus = order.status as keyof typeof NextStepOrderStatus

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
        {currencyFormat(order.total / 100)}
      </TableCell>
      <TableCell>
        {isLoadingNextStep && (
          <ButtonLoading disabled variant="outline" size="xs">
            {NextStepOrderStatusText[nextStepOrderStatus]}
          </ButtonLoading>
        )}
        {hasNextStep && (
          <Button
            onClick={() =>
              updateOrderMutation.mutate({
                orderId: order.orderId,
                status: NextStepOrderStatus[nextStepOrderStatus],
              })
            }
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            {NextStepOrderStatusText[nextStepOrderStatus]}
          </Button>
        )}
      </TableCell>
      <TableCell>
        {isCancelingOrder ? (
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
