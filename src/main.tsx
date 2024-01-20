import '@/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
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
    <ThemeProvider storageKey="@pizzashop-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
