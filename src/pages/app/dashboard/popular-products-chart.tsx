import { BarChart } from 'lucide-react'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { product: 'Pepperoni', amount: 40 },
  { product: 'Mussarela', amount: 30 },
  { product: 'Marguerita', amount: 50 },
  { product: 'Quatro Queijos', amount: 16 },
  { product: 'Portuguesa', amount: 26 },
]

const COLORS = [
  colors.sky['500'],
  colors.amber['500'],
  colors.violet['500'],
  colors.emerald['500'],
  colors.rose['500'],
]

export function PopularProductsChart() {
  const [chartWidth, setChartWidth] = useState(0)

  return (
    <Card className="col-span-3">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <CardTitle className="text-base font-medium">
          Produtos populares
        </CardTitle>
        <BarChart className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={240}
          onResize={(width) => setChartWidth(width)}
        >
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey={'amount'}
              nameKey={'product'}
              cx={'50%'}
              cy={'50%'}
              innerRadius={64}
              outerRadius={86}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 15
                      ? data[index].product.substring(0, 15).concat('...')
                      : data[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.product}
                  fill={COLORS[index]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
