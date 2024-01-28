import { NavLink as Link, NavLinkProps as LinkProps } from 'react-router-dom'

import { cn } from '@/lib/utils'

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  return (
    <Link
      className={({ isActive }) =>
        cn(
          'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground',
          { 'text-foreground': isActive },
        )
      }
      {...props}
    />
  )
}
