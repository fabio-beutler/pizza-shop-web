import { api } from '@/lib/axios'

interface UpdateStoreProfileBody {
  name: string
  description: string | null
}

export async function updateStoreProfile(body: UpdateStoreProfileBody) {
  await api.put('/profile', body)
}
