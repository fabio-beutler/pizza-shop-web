import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useSignInMutation } from '@/api/sign-in'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

const signInFormSchema = z.object({
  email: z.string().email(),
})

const signInSearchQueryParamsSchema = signInFormSchema.merge(
  z.object({
    email: z.string().email().optional(),
  }),
)

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const signInSearchQueryParams = signInSearchQueryParamsSchema.parse(
    Object.fromEntries(searchParams.entries()),
  )

  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInSearchQueryParams,
  })

  const signInMutation = useSignInMutation()

  async function handleSignIn(data: SignInForm) {
    await signInMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Enviamos um link de autenticação para o seu e-mail', {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
        })
      },
      onError: () => {
        toast.error('Ocorreu um erro ao enviar o link de autenticação')
      },
    })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
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
