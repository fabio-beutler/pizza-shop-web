import { cva } from 'class-variance-authority'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

const orderStatusIconVariants = cva('size-2 rounded-full', {
  variants: {
    status: {
      pending: 'bg-slate-400',
      canceled: 'bg-rose-400',
      processing: 'bg-amber-400',
      delivering: 'bg-amber-400',
      delivered: 'bg-emerald-400',
    },
  },
})

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={orderStatusIconVariants({ status })} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
