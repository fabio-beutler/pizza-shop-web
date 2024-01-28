import { Utensils } from 'lucide-react'

import { useGetMonthOrdersAmount } from '@/api/get-month-orders-amout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthOrdersAmountCard() {
  const getMonthOrdersAmountQuery = useGetMonthOrdersAmount()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {getMonthOrdersAmountQuery.isLoading && <MetricCardSkeleton />}
        {getMonthOrdersAmountQuery.isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {getMonthOrdersAmountQuery.data.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {getMonthOrdersAmountQuery.data.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{getMonthOrdersAmountQuery.data.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {getMonthOrdersAmountQuery.data.diffFromLastMonth}%
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
