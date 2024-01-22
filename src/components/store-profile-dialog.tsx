import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateStoreProfile } from '@/api/update-store-profile'
import { Button, ButtonLoading } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface StoreProfileDialogProps {
  onCloseDialog: () => void
}

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(props: StoreProfileDialogProps) {
  const queryClient = useQueryClient()

  const { data: storeProfile } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { register, handleSubmit, formState } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: storeProfile?.name ?? '',
      description: storeProfile?.description ?? '',
    },
  })

  const { mutateAsync: updateStoreProfileFn } = useMutation({
    mutationFn: updateStoreProfile,
    onMutate: () => {
      return { id: 1 }
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        (old) => {
          if (old) return { ...old, ...variables }
        },
      )
    },
  })

  async function handleUpdateStoreProfile(data: StoreProfileSchema) {
    try {
      await updateStoreProfileFn(data)
      toast.success('Perfil da loja atualizado com sucesso')
      props.onCloseDialog()
    } catch {
      toast.error(
        'Não foi possível atualizar o perfil da loja, tente novamente mais tarde',
      )
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              autoComplete="off"
              {...register('name')}
            />
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'ghost'}>
              Cancelar
            </Button>
          </DialogClose>
          {formState.isSubmitting ? (
            <ButtonLoading variant={'success'} className="min-w-32">
              Salvando...
            </ButtonLoading>
          ) : (
            <Button type="submit" variant={'success'} className="min-w-32">
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
