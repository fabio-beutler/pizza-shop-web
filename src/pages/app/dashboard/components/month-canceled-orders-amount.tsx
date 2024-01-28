import { CircleSlash } from 'lucide-react'

import { useGetMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const getMonthCanceledOrdersAmountQuery = useGetMonthCanceledOrdersAmount()
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <CircleSlash className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {getMonthCanceledOrdersAmountQuery.isLoading && <MetricCardSkeleton />}
        {getMonthCanceledOrdersAmountQuery.isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {getMonthCanceledOrdersAmountQuery.data.amount.toLocaleString(
                'pt-BR',
              )}
            </span>
            <p className="text-xs text-muted-foreground">
              {getMonthCanceledOrdersAmountQuery.data.diffFromLastMonth <= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{getMonthCanceledOrdersAmountQuery.data.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {getMonthCanceledOrdersAmountQuery.data.diffFromLastMonth}%
                </span>
              )}{' '}
              relação ao mês anterior
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
