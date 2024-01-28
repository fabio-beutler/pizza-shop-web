import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { GetManagedRestaurantResponse } from './get-managed-restaurant'

export interface UpdateStoreProfileBody {
  name: string
  description: string | null
}

async function updateStoreProfile(body: UpdateStoreProfileBody) {
  await api.put('/profile', body)
}

export function useUpdateStoreProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStoreProfile,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        (old) => {
          if (old) return { ...old, ...variables }
        },
      )
    },
  })
}
