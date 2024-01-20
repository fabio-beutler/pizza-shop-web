import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // throw new Error('Erro')
      toast.success('Enviamos um link de autenticação para o seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Ocorreu um erro ao enviar o link de autenticação')
    } finally {
      console.log(data)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-80 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2x font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                autoComplete="email"
                id="email"
                type="email"
                {...register('email')}
              />
            </div>
            <Button
              disabled={formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
