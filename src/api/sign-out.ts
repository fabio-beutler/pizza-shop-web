import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { api } from '@/lib/axios'

async function signOut() {
  await api.post('/sign-out')
}

export function useSignOutMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })
}
