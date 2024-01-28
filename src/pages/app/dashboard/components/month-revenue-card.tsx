import { DollarSign } from 'lucide-react'

import { useGetMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { currencyFormat } from '@/lib/format'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const getMonthRevenueQuery = useGetMonthRevenue()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {getMonthRevenueQuery.isLoading && <MetricCardSkeleton />}
        {getMonthRevenueQuery.isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {currencyFormat(getMonthRevenueQuery.data.receipt / 100)}
            </span>
            <p className="text-xs text-muted-foreground">
              {getMonthRevenueQuery.data.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{getMonthRevenueQuery.data.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {getMonthRevenueQuery.data.diffFromLastMonth}%
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
