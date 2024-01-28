import { useQuery } from '@tanstack/react-query'
import { CircleSlash } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const {
    data: monthCanceledOrdersAmount,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <CircleSlash className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              )}{' '}
              relação ao mês anterior
            </p>
          </>
        )}
        {isLoading && <MetricCardSkeleton />}
        {isError && <h3>Erro ao carregar</h3>}
      </CardContent>
    </Card>
  )
}
