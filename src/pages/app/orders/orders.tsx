import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/table'

import {
  OrdersPagination,
  OrderTableFilters,
  OrderTableRow,
  OrderTableSkeleton,
} from './components'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') || 1)

  const {
    data: ordersResponse,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', String(pageIndex + 1))
      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16"></TableHead>
                  <TableHead className="w-36">Identificador</TableHead>
                  <TableHead className="w-44">Realizado há</TableHead>
                  <TableHead className="w-36">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-40">Total do pedido</TableHead>
                  <TableHead className="w-40"></TableHead>
                  <TableHead className="w-40"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isSuccess &&
                  ordersResponse.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
                {isLoading && <OrderTableSkeleton />}
              </TableBody>
            </Table>
          </div>
          {isSuccess && (
            <OrdersPagination
              pageIndex={ordersResponse.meta.pageIndex}
              totalCount={ordersResponse.meta.totalCount}
              perPage={ordersResponse.meta.perPage}
              siblingsCount={2}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
