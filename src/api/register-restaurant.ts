import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant(body: RegisterRestaurantBody) {
  await api.post('/restaurants', body)
}

export function useRegisterRestaurantMutation() {
  return useMutation({
    mutationFn: registerRestaurant,
  })
}
