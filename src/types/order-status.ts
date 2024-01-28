export type OrderStatusTypes =
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

export enum NextStepOrderStatus {
  pending = 'processing',
  processing = 'delivering',
  delivering = 'delivered',
}

export enum NextStepOrderStatusText {
  pending = 'Aprovar',
  processing = 'Em entrega',
  delivering = 'Entregue',
}
