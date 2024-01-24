import '@/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/react-query'
import { router } from '@/router.tsx'

let rootElement = document.getElementById('root')

if (rootElement === null) {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
  rootElement = root
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <ThemeProvider storageKey="@pizzashop-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </QueryClientProvider>
        <Toaster richColors />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
