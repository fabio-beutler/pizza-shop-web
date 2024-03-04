import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string | null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage = null, ...props }, ref) => {
    const hasErrorMessage = errorMessage !== null
    const Comp = hasErrorMessage ? 'div' : React.Fragment

    return (
      <Comp>
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {hasErrorMessage && (
          <span className="block h-4 text-xs text-red-500 dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </Comp>
    )
  },
)
Input.displayName = 'Input'

export { Input }
