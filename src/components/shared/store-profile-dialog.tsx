import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetManagedRestaurantQuery } from '@/api/get-managed-restaurant'
import { useUpdateStoreProfileMutation } from '@/api/update-store-profile'
import { Button, ButtonLoading } from '@/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Textarea } from '@/ui/textarea'

interface StoreProfileDialogProps {
  onCloseDialog: () => void
}

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(props: StoreProfileDialogProps) {
  const getManagedRestaurantQuery = useGetManagedRestaurantQuery()

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: getManagedRestaurantQuery.data?.name ?? '',
      description: getManagedRestaurantQuery.data?.description ?? '',
    },
  })

  const updateStoreProfileMutation = useUpdateStoreProfileMutation()

  function handleUpdateStoreProfile(formData: StoreProfileSchema) {
    updateStoreProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Perfil da loja atualizado com sucesso')
        props.onCloseDialog()
      },
      onError: () => {
        toast.error(
          'Não foi possível atualizar o perfil da loja, tente novamente mais tarde',
        )
      },
    })
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
              id="name"
              autoComplete="off"
              className="col-span-3"
              {...register('name')}
            />
            <Label className="mt-3 self-start text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
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
          {updateStoreProfileMutation.isPending && (
            <ButtonLoading variant={'success'} className="min-w-32">
              Salvando...
            </ButtonLoading>
          )}
          {!updateStoreProfileMutation.isPending && (
            <Button type="submit" variant={'success'} className="min-w-32">
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
