import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { useGetDailyRevenueQuery } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { currencyFormat } from '@/lib/format'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const getDailyRevenueQuery = useGetDailyRevenueQuery({
    from: dateRange?.from,
    to: dateRange?.to,
  })

  const chartData = useMemo(() => {
    if (!getDailyRevenueQuery.data) return []

    return getDailyRevenueQuery.data.map((dailyRevenue) => ({
      date: dailyRevenue.date,
      receipt: dailyRevenue.receipt / 100,
    }))
  }, [getDailyRevenueQuery.data])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <Label className="flex items-center gap-3">
          Período
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </Label>
      </CardHeader>
      {getDailyRevenueQuery.isLoading && (
        <div className="flex h-[240px] w-full items-center justify-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {getDailyRevenueQuery.isSuccess && (
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                dataKey="receipt"
                stroke={colors.neutral['500']}
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => currencyFormat(value)}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: `transparent`,
                  border: 'none',
                }}
                animationDuration={1000}
                formatter={(value: number) => [
                  currencyFormat(value),
                  'Receita',
                ]}
                labelFormatter={(value: string) => `Dia: ${value}`}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  )
}
