import { Utensils } from 'lucide-react'

import { useGetDayOrdersAmountQuery } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function DayOrdersAmountCard() {
  const getDayOrdersAmountQuery = useGetDayOrdersAmountQuery()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {getDayOrdersAmountQuery.isLoading && <MetricCardSkeleton />}
        {getDayOrdersAmountQuery.isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {getDayOrdersAmountQuery.data.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {getDayOrdersAmountQuery.data.diffFromYesterday >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{getDayOrdersAmountQuery.data.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {getDayOrdersAmountQuery.data.diffFromYesterday}%
                </span>
              )}{' '}
              em relação ao dia anterior
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
