import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .enum([
      'all',
      'pending',
      'canceled',
      'processing',
      'delivering',
      'delivered',
    ])
    .optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        status:
          (searchParams.get('status') as OrderFiltersSchema['status']) ?? 'all',
        orderId:
          (searchParams.get('orderId') as OrderFiltersSchema['orderId']) ?? '',
        customerName:
          (searchParams.get(
            'customerName',
          ) as OrderFiltersSchema['customerName']) ?? '',
      },
    })

  function handleFilter(data: OrderFiltersSchema) {
    setSearchParams((urlState) => {
      if (data.orderId) {
        urlState.set('orderId', data.orderId)
      } else {
        urlState.delete('orderId')
      }

      if (data.customerName) {
        urlState.set('customerName', data.customerName)
      } else {
        urlState.delete('customerName')
      }

      if (data.status && data.status !== 'all') {
        urlState.set('status', data.status)
      } else {
        urlState.delete('status')
      }

      urlState.set('page', '1')

      return urlState
    })
  }

  function handleClearFilters() {
    setSearchParams((urlState) => {
      urlState.delete('orderId')
      urlState.delete('customerName')
      urlState.delete('status')
      urlState.set('page', '1')
      return urlState
    })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        type="text"
        placeholder="ID do pedido"
        className="h-8 w-auto"
        id="orderId"
        autoComplete="off"
        {...register('orderId')}
      />
      <Input
        type="text"
        placeholder="Nome do cliente"
        className="h-8 w-80"
        id="customerName"
        autoComplete="off"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            defaultValue="all"
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
            disabled={field.disabled}
          >
            <SelectTrigger className="h-8 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 size-4" />
        Remover filtros
      </Button>
    </form>
  )
}
