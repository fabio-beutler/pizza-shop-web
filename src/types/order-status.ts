export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export enum OrderStatusMap {
  pending = 'Pendente',
  canceled = 'Cancelado',
  processing = 'Em preparo',
  delivering = 'Em entrega',
  delivered = 'Entregue',
}
