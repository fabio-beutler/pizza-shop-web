import { BarChart, Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { useGetPopularProductsQuery } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [
  colors.sky['500'],
  colors.amber['500'],
  colors.violet['500'],
  colors.emerald['500'],
  colors.rose['500'],
]

export function PopularProductsChart() {
  const getPopularProductsQuery = useGetPopularProductsQuery()

  return (
    <Card className="col-span-3">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <CardTitle className="text-base font-medium">
          Produtos populares
        </CardTitle>
        <BarChart className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {getPopularProductsQuery.isSuccess && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={getPopularProductsQuery.data}
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
                      {getPopularProductsQuery.data[index].product.length > 15
                        ? getPopularProductsQuery.data[index].product
                            .substring(0, 15)
                            .concat('...')
                        : getPopularProductsQuery.data[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {getPopularProductsQuery.data.map((entry, index) => (
                  <Cell
                    key={entry.product}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
        {getPopularProductsQuery.isLoading && (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
