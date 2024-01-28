import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'

import { useGetManagedRestaurantQuery } from '@/api/get-managed-restaurant'
import { useGetProfileQuery } from '@/api/get-profile'
import { useSignOutMutation } from '@/api/sign-out'
import { Button } from '@/ui/button'
import { Dialog, DialogTrigger } from '@/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Skeleton } from '@/ui/skeleton'

import { StoreProfileDialog } from './store-profile-dialog'

export function AccountMenu() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const getProfileQuery = useGetProfileQuery()

  const getManagedRestaurantQuery = useGetManagedRestaurantQuery()

  const signOutMutation = useSignOutMutation()

  function handleSignOut(event: Event) {
    event.preventDefault()
    if (signOutMutation.isPending) return
    signOutMutation.mutate()
  }

  return (
    <Dialog open={accountMenuOpen} onOpenChange={setAccountMenuOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {getManagedRestaurantQuery.isLoading && (
              <Skeleton className="h-4 w-32" />
            )}
            {getManagedRestaurantQuery.isSuccess &&
              getManagedRestaurantQuery.data.name}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {getProfileQuery.isLoading && (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-36" />
              </div>
            )}
            {getProfileQuery.isSuccess && (
              <>
                <span>{getProfileQuery.data.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {getProfileQuery.data.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              Perfil da loja
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onSelect={handleSignOut}
            disabled={signOutMutation.isPending}
            className="text-rose-500 dark:text-rose-400"
          >
            <LogOut className="mr-2 size-4" />
            {signOutMutation.isPending ? 'Saindo...' : 'Sair'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog onCloseDialog={() => setAccountMenuOpen(false)} />
    </Dialog>
  )
}
