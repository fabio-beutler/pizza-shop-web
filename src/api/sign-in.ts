import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

async function signIn(body: SignInBody) {
  await api.post('/authenticate', body)
}

export function useSignInMutation() {
  return useMutation({ mutationFn: signIn })
}
