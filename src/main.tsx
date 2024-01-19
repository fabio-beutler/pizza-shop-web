import '@/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
