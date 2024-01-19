import '@/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App.tsx'

let rootElement = document.getElementById('root')

if (rootElement === null) {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
  rootElement = root
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
