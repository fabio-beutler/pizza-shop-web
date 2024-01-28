import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )
  return response.data
}

export function useGetPopularProductsQuery() {
  return useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })
}
