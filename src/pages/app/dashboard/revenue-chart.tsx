import { useState } from 'react'
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 900 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 2300 },
  { date: '15/12', revenue: 800 },
  { date: '16/12', revenue: 640 },
]

export function RevenueChart() {
  const [chartWidth, setChartWidth] = useState(0)

  return (
    <Card className="col-span-6">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-base font-medium">
          Receita no período
        </CardTitle>
        <CardDescription>Receita diária no período</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={240}
          onResize={(width) => setChartWidth(width)}
        >
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              dataKey="revenue"
              stroke={colors.neutral['500']}
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                background: `transparent`,
                border: 'none',
              }}
              position={{ x: chartWidth - 128, y: -60 }}
              animationDuration={1000}
              formatter={(value: number) => [
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }),
                'Receita',
              ]}
              labelFormatter={(value: string) => `Dia: ${value}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
