import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const {
    data: monthRevenue,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isSuccess && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthRevenue.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}%
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
