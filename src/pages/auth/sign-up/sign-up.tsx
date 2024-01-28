import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useRegisterRestaurantMutation } from '@/api/register-restaurant'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

const signUpForm = z.object({
  restaurantName: z
    .string()
    .min(1, { message: 'Nome do restaurante é obrigatório' }),
  managerName: z.string().min(1, { message: 'Nome do gerente é obrigatório' }),
  phone: z.string().min(8, { message: 'Telefone é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  useEffect(() => {
    console.log(formState.errors)
  }, [formState])

  const registerRestaurantMutation = useRegisterRestaurantMutation()

  function handleSignUp(data: SignUpForm) {
    try {
      registerRestaurantMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Restaurante cadastrado com sucesso!', {
            action: {
              label: 'Login',
              onClick: () =>
                navigate(`/sign-in?email=${encodeURIComponent(data.email)}`),
            },
          })
        },
        onError: () => {
          toast.error('Ocorreu um erro ao cadastrar o restaurante')
        },
      })
    } catch {
      console.log('error')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-80 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2x font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                autoComplete="off"
                id="restaurantName"
                type="text"
                errorMessage={formState.errors.restaurantName?.message}
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                autoComplete="name"
                id="managerName"
                type="text"
                errorMessage={formState.errors.managerName?.message}
                {...register('managerName')}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                autoComplete="email"
                id="email"
                type="email"
                errorMessage={formState.errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                autoComplete="tel"
                id="phone"
                type="tel"
                errorMessage={formState.errors.phone?.message}
                {...register('phone')}
              />
            </div>
            <Button
              disabled={formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-4">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
