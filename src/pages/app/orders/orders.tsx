import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useGetOrdersQuery } from '@/api/get-orders'
import { OrderStatusMap } from '@/types/order-status'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/table'

import {
  OrdersPagination,
  OrderTableFilters,
  OrderTableRow,
  OrderTableSkeleton,
} from './components'

const searchOrderFiltersSchema = z
  .object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.enum(['all', ...Object.keys(OrderStatusMap)]).optional(),
    page: z
      .string()
      .transform((page) => Number(page) - 1)
      .default('1'),
  })
  .transform(({ page, ...data }) => ({
    ...data,
    pageIndex: page,
  }))

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchOrderFilterQueryParams = searchOrderFiltersSchema.parse(
    Object.fromEntries(searchParams.entries()),
  )

  const getOrdersQuery = useGetOrdersQuery(searchOrderFilterQueryParams)

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
                {getOrdersQuery.isLoading && <OrderTableSkeleton />}
                {getOrdersQuery.isSuccess &&
                  getOrdersQuery.data.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>
          {getOrdersQuery.isSuccess && (
            <OrdersPagination
              pageIndex={getOrdersQuery.data.meta.pageIndex}
              totalCount={getOrdersQuery.data.meta.totalCount}
              perPage={getOrdersQuery.data.meta.perPage}
              siblingsCount={2}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
